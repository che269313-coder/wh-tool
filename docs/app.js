const STORAGE_KEY = "warhammer-tactical-assistant-settings";
const DB_NAME = "warhammer-tactical-assistant-v1";
const DB_STORE = "library";
const ROSTER_STORAGE_KEY = "warhammer-tactical-assistant-rosters-v2";
const BATTLE_SESSION_KEY = "warhammer-tactical-assistant-battle-session-v1";
const CORE_LIBRARY_FILES = [
  "data/规则书/核心规则-可检索.md",
  "data/规则书/分遣队速查-可检索.md",
  "data/规则书/AI-战斗规则摘要.md",
];
const FACTION_PACKAGES = window.WarhammerFactionRegistry?.list() || [];
// aliases/index.js 是 data/factions/<id>/package.json 的构建产物；缺失即构建错误，
// 不再从运行时阵营注册表维护第二份回退别名。
const DEFAULT_GLM_API_KEY = "";
const DEFAULT_GLM_ENDPOINT = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
const DEFAULT_GLM_MODEL = "glm-4-flash-250414";
const PDFJS_CDN_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const PDFJS_LOAD_TIMEOUT_MS = 8000;
let pdfJsLoadPromise = null;
const DEFAULT_SETTINGS = {
  mode: "direct",
  key: DEFAULT_GLM_API_KEY,
  endpoint: DEFAULT_GLM_ENDPOINT,
  model: DEFAULT_GLM_MODEL,
  rememberKey: false,
};

const CORE_FILE_METADATA = {
  "核心规则-可检索.md": { faction: "规则书", kind: "rulebook", builtin: true },
  "分遣队速查-可检索.md": { faction: "规则书", kind: "detachment", builtin: true },
  "AI-战斗规则摘要.md": { faction: "规则书", kind: "rulebook", builtin: true },
};
const BUILTIN_FILE_METADATA = FACTION_PACKAGES.reduce((metadata, definition) => {
  definition.library.forEach(({ path, kind }) => {
    const value = { faction: definition.name, kind, builtin: true };
    metadata[path] = value;
    metadata[path.split("/").pop()] = value;
  });
  return metadata;
}, { ...CORE_FILE_METADATA });

const KIND_LABELS = {
  "army-list": "军表",
  datasheet: "数据卡",
  detachment: "分遣队规则",
  supplement: "分遣队补充",
  rulebook: "规则书",
};

const LEGACY_AUTO_EXTRACTS = new Set([
  "11版核心规则简中.txt",
  "帝皇禁军10版中文老湿腐版1.07.txt",
  "分遣队速查表.txt",
  "星际战士11版中文1.0.txt",
]);

// 对局会话：手动计算与 AI 计算共享同一份场景状态（双方选择、战斗上下文、
// 攻击模式），随军表一起持久化；刷新页面后伤口与计算现场都不丢失。
const savedBattleSession = loadBattleSession();

const state = {
  settings: loadSettings(),
  rosters: loadRosters(),
  datasheetCache: {},
  calculatorCards: [],
  calculatorSelection: { attacker: "", defender: "", ...(savedBattleSession?.calculatorSelection || {}) },
  calculatorSelections: { attacker: [""], defender: [""], ...(savedBattleSession?.calculatorSelections || {}) },
  calculatorSearch: { attacker: "", defender: "" },
  calculatorPickerSearch: { attacker: [""], defender: [""] },
  calculatorPickerOpen: { attacker: [false], defender: [false] },
  calculatorDrafts: { attacker: [], defender: [] },
  combatContext: normalizeCombatContext(savedBattleSession?.combatContext),
  attackMode: savedBattleSession?.attackMode === "melee" ? "melee" : "ranged",
};

const factionLookupEntries = FACTION_PACKAGES.flatMap((definition) => [definition.name, ...definition.aliases].map((name) => [name, definition]));
const DATASHEET_FILES = Object.fromEntries(factionLookupEntries.filter(([, definition]) => definition.data.datasheet).map(([name, definition]) => [name, definition.data.datasheet]));
const DATASHEET_JSON_FILES = Object.fromEntries(factionLookupEntries.filter(([, definition]) => definition.data.catalog).map(([name, definition]) => [name, definition.data.catalog]));
// 单位/数字版别名统一由 WarhammerAliasRegistry 提供（aliases/index.js 生成物）。
// 规范名 → 别名反向查询、候选匹配与数字版按页别名均走注册表。
const hydratedCalculatorFactions = new Set();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function unitNameCandidates(name, faction = "") {
  const source = String(name || "");
  const normalized = source.replace(/\([^)]*\)/g, "").trim();
  const definition = window.WarhammerFactionRegistry?.resolve(faction);
  const prefixes = definition
    ? [definition.name, ...(definition.aliases || [])]
    : factionLookupEntries.map(([prefix]) => prefix);
  const withoutFactionPrefixes = prefixes
    .map((prefix) => source.startsWith(prefix) ? source.slice(prefix.length).trim() : "")
    .filter(Boolean);
  const registry = window.WarhammerAliasRegistry;
  const aliases = registry
    ? [source, normalized, ...withoutFactionPrefixes]
      .flatMap((candidate) => registry.unitCandidates(candidate, faction).map((entry) => entry.canonical))
    : [];
  return [...new Set([source, normalized, ...withoutFactionPrefixes, ...aliases].filter(Boolean))];
}

function getUnitProfile(name, faction = "") {
  return findStructuredCalculatorCard(name, faction)?.data?.unit || null;
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const settings = { ...DEFAULT_SETTINGS, ...saved };
    // 将已有浏览器设置中的旧默认值整体迁移到 GLM，避免旧 Key 与新接口混用。
    const legacyDefault = saved.endpoint === "https://api.deepseek.com/chat/completions"
      || saved.model === "deepseek-v4-flash"
      || saved.model === "glm-4.7-flash";
    if (legacyDefault) {
      settings.mode = "direct";
      settings.key = DEFAULT_GLM_API_KEY;
      settings.endpoint = DEFAULT_GLM_ENDPOINT;
      settings.model = DEFAULT_GLM_MODEL;
    }
    if (!settings.key) settings.key = DEFAULT_GLM_API_KEY;
    return settings;
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  const sessionValue = { ...settings };
  const persistedValue = { ...settings };
  if (!persistedValue.rememberKey) persistedValue.key = "";
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedValue));
  state.settings = { ...state.settings, ...sessionValue };
}

function newUnit(side, values = {}) {
  const wounds = Math.max(1, Number(values.wounds ?? values.maxWounds ?? 1) || 1);
  return {
    id: values.id || `${side}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: values.name || "未命名单位",
    models: Math.max(1, Number(values.models ?? values.modelCount ?? 1) || 1),
    wounds,
    currentWounds: Math.min(wounds, Math.max(0, Number(values.currentWounds ?? values.remainingWounds ?? wounds))),
    notes: values.notes || values.loadout || "",
  };
}

function defaultRosters() {
  return {
    attacker: { id: makeId("roster"), name: "进攻方", faction: "", detachmentIds: [], detachmentNames: [], detachmentDp: 0, groups: [] },
    defender: { id: makeId("roster"), name: "防御方", faction: "", detachmentIds: [], detachmentNames: [], detachmentDp: 0, groups: [] },
  };
}

function makeId(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }

function normalizeModel(model, unitName) {
  const maximumWounds = Math.max(1, Number(model.maximumWounds || model.wounds || 1) || 1);
  return {
    id: model.id || makeId("model"),
    name: model.name || unitName,
    maximumWounds,
    currentWounds: Math.min(maximumWounds, Math.max(0, Number(model.currentWounds ?? maximumWounds))),
    woundsSource: model.woundsSource || "",
    equipment: Array.isArray(model.equipment) ? model.equipment.map((item) => ({ name: item.name || String(item), count: Math.max(1, Number(item.count || 1)) })) : [],
  };
}

function normalizeRosterUnit(unit, faction = "") {
  const profile = getUnitProfile(unit.name, faction);
  const datasheetWounds = Number(profile?.woundsPerModel || 0);
  const models = Array.isArray(unit.models) && unit.models.length ? unit.models.map((model) => {
    const normalized = normalizeModel(model, unit.name);
    if (datasheetWounds && normalized.woundsSource !== "manual" && (normalized.maximumWounds === 1 || normalized.woundsSource === "datasheet")) {
      const previousMaximumWounds = normalized.maximumWounds;
      normalized.maximumWounds = datasheetWounds;
      normalized.currentWounds = Math.min(datasheetWounds, normalized.currentWounds === previousMaximumWounds || (previousMaximumWounds === 1 && normalized.currentWounds === 1) ? datasheetWounds : normalized.currentWounds);
      normalized.woundsSource = "datasheet";
    }
    return normalized;
  }) : Array.from({ length: Math.max(1, Number(unit.models || unit.modelCount || 1)) }, () => {
    const wounds = datasheetWounds || Math.max(1, Number(unit.wounds || 1) || 1);
    const currentWounds = datasheetWounds && (unit.currentWounds === undefined || Number(unit.currentWounds) === 1)
      ? datasheetWounds
      : unit.currentWounds ?? wounds;
    return normalizeModel({ wounds, currentWounds, equipment: unit.equipment || [], woundsSource: datasheetWounds ? "datasheet" : "" }, unit.name);
  });
  return {
    id: unit.id || makeId("unit"), name: unit.name || "未命名单位", points: unit.points || "", role: unit.role || "",
    enhancement: unit.enhancement || "", enhancementName: unit.enhancementName || String(unit.enhancement || "").split(/[；;]/)[0].trim(), enhancementId: unit.enhancementId || "",
    notes: unit.notes || "", hasComposition: unit.hasComposition !== false, models,
  };
}

function normalizeGroup(group, faction = "") {
  return { id: group.id || makeId("group"), title: group.title || "单位", category: group.category || "", units: (group.units || []).map((unit) => normalizeRosterUnit(unit, faction)) };
}

function loadRosters() {
  try {
    const saved = JSON.parse(localStorage.getItem(ROSTER_STORAGE_KEY));
    if (!saved) return defaultRosters();
    return ["attacker", "defender"].reduce((result, side) => {
      const roster = saved[side] || {};
      result[side] = {
        id: roster.id || makeId("roster"),
        name: roster.name || (side === "attacker" ? "进攻方" : "防御方"),
        faction: roster.faction || "未分类",
        detachmentIds: Array.isArray(roster.detachmentIds) ? [...roster.detachmentIds] : [],
        detachmentNames: Array.isArray(roster.detachmentNames) ? [...roster.detachmentNames] : [],
        detachmentDp: Number(roster.detachmentDp || 0),
        detachmentSourceText: roster.detachmentSourceText || "",
        groups: Array.isArray(roster.groups) ? roster.groups.map((group) => normalizeGroup(group, roster.faction)) : (Array.isArray(roster.units) ? [{ id: makeId("group"), title: "已导入单位", units: roster.units.map((unit) => normalizeRosterUnit(unit, roster.faction)) }] : []),
      };
      return result;
    }, {});
  } catch {
    return defaultRosters();
  }
}

function saveRosters() {
  localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(state.rosters));
}

function normalizeCombatContext(saved) {
  const defaults = {
    targetWithinHalfRange: false, attackerAdvanced: false, attackerEngaged: false,
    attackerDeployedThisTurn: false, attackerMovedOver3: false, attackerCharged: false,
    targetHasCover: false, usingIndirectFire: false, attackerRemainedStationary: false,
    targetVisibleToFriendly: false,
  };
  const result = {};
  Object.keys(defaults).forEach((key) => { result[key] = Boolean(saved?.[key]); });
  return result;
}

function loadBattleSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(BATTLE_SESSION_KEY));
    return saved && typeof saved === "object" ? saved : null;
  } catch {
    return null;
  }
}

function saveBattleSession() {
  try {
    localStorage.setItem(BATTLE_SESSION_KEY, JSON.stringify({
      calculatorSelection: state.calculatorSelection,
      calculatorSelections: state.calculatorSelections,
      combatContext: state.combatContext,
      attackMode: state.attackMode,
    }));
  } catch {
    // 存储不可用或已满时静默降级：对局信息仍在内存中可用。
  }
}

let battleSessionSaveTimer = 0;
function scheduleBattleSessionSave() {
  window.clearTimeout(battleSessionSaveTimer);
  battleSessionSaveTimer = window.setTimeout(saveBattleSession, 250);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function setView(viewName) {
  $$(".view").forEach((view) => view.classList.toggle("is-active", view.id === `view-${viewName}`));
  $$("[data-view]").forEach((button) => button.classList.toggle("is-active", button.dataset.view === viewName));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$$('[data-view]').forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
$("#importShortcut").addEventListener("click", () => {
  setView("roster");
  window.setTimeout(() => $("#rosterFiles")?.click(), 180);
});

function sideLabel(side) { return side === "attacker" ? "进攻方" : "防御方"; }
function getRosterUnits(roster) { return roster.groups.flatMap((group) => group.units); }
function activeModels(unit) { return unit.models.filter((model) => model.currentWounds > 0); }
function countEquipment(unit) {
  return activeModels(unit).flatMap((model) => model.equipment).reduce((counts, item) => {
    counts[item.name] = (counts[item.name] || 0) + item.count;
    return counts;
  }, {});
}
function findUnit(side, groupId, unitId) {
  const group = state.rosters[side].groups.find((item) => item.id === groupId);
  const unit = group?.units.find((item) => item.id === unitId);
  return { group, unit };
}

function calculatorCardNames() {
  return [...new Map(state.calculatorCards.filter((card) => card.name).map((card) => [`${card.faction || ""}:${card.name}:${card.page || ""}`, card])).values()];
}

function calculatorCardKey(card) {
  return `card:${card.faction || ""}:${card.page || card.name}:${card.name}`;
}

function calculatorLegacyCardKey(card) {
  return `card:${card.faction || ""}:${card.page || card.name}`;
}

function calculatorRosterOptions(side) {
  const roster = state.rosters[side];
  const definition = window.WarhammerFactionRegistry?.resolve(roster.faction);
  return roster.groups.flatMap((group) => group.units.filter((unit) => activeModels(unit).length).map((unit) => ({
    key: `roster:${side}:${group.id}:${unit.id}`, name: unit.name, label: `${unit.name} · ${sideLabel(side)}军表「${roster.name}」 · ${group.title}`, side, groupId: group.id, unitId: unit.id,
    groupTitle: group.title, groupCategory: group.category, joined: group.category === "联合单位" || /^联合单位/.test(group.title || ""),
    faction: roster.faction, factionId: definition?.id || "",
  })));
}

// The calculator uses one searchable combobox per row.  Rows are kept as arrays
// so several attacking and defending units can be selected in order.
function calculatorSelectionKeys(side) {
  const keys = Array.isArray(state.calculatorSelections?.[side])
    ? state.calculatorSelections[side]
    : [state.calculatorSelection?.[side] || ""];
  if (!keys.length) keys.push("");
  state.calculatorSelections[side] = keys;
  state.calculatorSelection[side] = keys[0] || "";
  return keys;
}

let calculatorPickerOptionsCache = null;
// 卡片集合版本号：阵营水合/目录重建时递增。选项缓存与增量过滤缓存据此在
// 下一次读取时自动失效，使后台补载阵营数据不需要打断用户做整体 DOM 重建。
let calculatorCardsVersion = 0;

// 搜索语料在选项缓存构建时一次性预计算；按键过滤只做 haystack.includes，
// 不再为每个候选临时拼字符串 + toLocaleLowerCase。
const pickerOptionHaystack = (option) => [option.name, option.label, option.search].filter(Boolean).join(" ").toLocaleLowerCase();
const pickerMenuSlots = new WeakMap();
const pickerFilterCache = { attacker: {}, defender: {} };

function calculatorPickerOptions(side) {
  if (!calculatorPickerOptionsCache || calculatorPickerOptionsCache.version !== calculatorCardsVersion) {
    const rosterOptions = ["attacker", "defender"].flatMap(calculatorRosterOptions)
      .map((option) => ({ ...option, haystack: pickerOptionHaystack(option) }));
    const cardOptions = calculatorCardNames().map((card) => ({
      key: calculatorCardKey(card),
      name: card.name,
      label: card.name + " · " + (card.faction || "datasheet"),
      faction: card.faction,
      factionId: card.factionId || "",
      search: [card.name, card.faction, ...(window.WarhammerAliasRegistry?.aliasesForCanonical?.("units", card.name) || [])].join(" "),
      card,
    })).map((option) => ({ ...option, haystack: pickerOptionHaystack(option) }));
    calculatorPickerOptionsCache = { version: calculatorCardsVersion, allOptions: [...rosterOptions, ...cardOptions] };
  }
  return calculatorPickerOptionsCache;
}

// 过滤结果与增量状态：新 query 以旧 query 开头时只在上一轮结果里筛，
// 输入逐字变长时不再全量扫描；卡片集合版本变化后旧结果整体作废。
function calculatorPickerMatches(side, index, options) {
  const keys = calculatorSelectionKeys(side);
  const key = keys[index] || "";
  const search = state.calculatorPickerSearch[side]?.[index] || "";
  const query = String(search).trim().toLocaleLowerCase();
  const cached = pickerFilterCache[side][index];
  const base = query && cached?.query && query.startsWith(cached.query) && cached.version === calculatorCardsVersion
    ? cached.matches
    : options.allOptions;
  const filtered = !query ? base : base.filter((option) => option.haystack?.includes(query) || option.key === key);
  pickerFilterCache[side][index] = { query, matches: filtered, version: calculatorCardsVersion };
  const pinned = key ? filtered.find((option) => option.key === key) : null;
  const rest = pinned ? filtered.filter((option) => option.key !== key) : filtered;
  return { query, visible: [...(pinned ? [pinned] : []), ...rest].slice(0, 60), total: filtered.length };
}

function calculatorPickerMenuMarkup(side, index, options) {
  const { visible, total } = calculatorPickerMatches(side, index, options);
  if (!visible.length) return '<span class="calculator-picker-empty">没有匹配单位</span>';
  const slots = Array.from({ length: 60 }, (_, slot) => {
    const option = visible[slot];
    if (!option) return '<button type="button" class="calculator-picker-option" data-calculator-picker-option data-side="' + side + '" data-index="' + index + '" data-key="" hidden></button>';
    return '<button type="button" class="calculator-picker-option" data-calculator-picker-option data-side="' + side + '" data-index="' + index + '" data-key="' + escapeHtml(option.key) + '"><strong>' + escapeHtml(option.name) + '</strong><small>' + escapeHtml(option.label) + '</small></button>';
  }).join("");
  const hint = total > 60
    ? '<span class="calculator-picker-more" data-calculator-picker-more>共 ' + total + ' 个匹配，显示前 60 个，继续输入缩小范围</span>'
    : "";
  return slots + hint;
}

function calculatorPickerMarkup(side, index, options) {
  const keys = calculatorSelectionKeys(side);
  const key = keys[index] || "";
  const search = state.calculatorPickerSearch[side]?.[index] || "";
  const selected = options.allOptions.find((option) => option.key === key);
  const value = selected ? selected.label : search;
  const label = side === "attacker" ? `进攻单位 ${index + 1}` : `防御目标 ${index + 1}`;
  const open = Boolean(state.calculatorPickerOpen[side]?.[index]);
  return `<div class="calculator-picker-row" data-calculator-picker-row data-side="${side}" data-index="${index}"><label class="calculator-picker-label">${label}<input type="search" autocomplete="off" data-calculator-picker-input data-side="${side}" data-index="${index}" value="${escapeHtml(value)}" placeholder="输入名称或阵营自动过滤……" /><div class="calculator-picker-menu${open ? " is-open" : ""}" data-calculator-picker-menu>${calculatorPickerMenuMarkup(side, index, options)}</div></label>${keys.length > 1 ? `<button type="button" class="calculator-picker-remove" data-calculator-picker-remove data-side="${side}" data-index="${index}">移除</button>` : ""}</div>`;
}

function renderCalculatorSelectors() {
  calculatorPickerOptionsCache = null;
  // 选项集合整体重建（换阵营水合等）后，旧增量过滤缓存不再与选项集一致。
  ["attacker", "defender"].forEach((side) => { pickerFilterCache[side] = {}; });
  ["attacker", "defender"].forEach((side) => {
    const container = $(`#calculator${side === "attacker" ? "Attacker" : "Defender"}Pickers`);
    if (!container) return;
    const options = calculatorPickerOptions(side);
    const validKeys = new Set(options.allOptions.map((option) => option.key));
    const keys = calculatorSelectionKeys(side);
    keys.forEach((key, index) => {
      if (key && !validKeys.has(key)) {
        keys[index] = "";
        state.calculatorDrafts[side][index] = null;
      }
    });
    state.calculatorPickerSearch[side] ||= [];
    while (state.calculatorPickerSearch[side].length < keys.length) state.calculatorPickerSearch[side].push("");
    state.calculatorPickerOpen[side] ||= [];
    while (state.calculatorPickerOpen[side].length < keys.length) state.calculatorPickerOpen[side].push(false);
    container.innerHTML = keys.map((_, index) => calculatorPickerMarkup(side, index, options)).join("");
  });
  renderCalculatorDetails();
}

function handleCalculatorPickerInput(event) {
  const input = event.target.closest("[data-calculator-picker-input]");
  if (!input) return;
  const side = input.dataset.side;
  const index = Number(input.dataset.index || 0);
  state.calculatorPickerSearch[side] ||= [];
  state.calculatorPickerSearch[side][index] = input.value;
  const keys = calculatorSelectionKeys(side);
  keys[index] = "";
  state.calculatorPickerOpen[side] ||= [];
  state.calculatorPickerOpen[side][index] = true;
  state.calculatorSelection[side] = keys[0] || "";
  state.calculatorDrafts[side][index] = null;
  // Rebuilding hundreds of option buttons on every keystroke is the main
  // source of picker jank; debounce the re-render to keep typing responsive.
  window.clearTimeout(refreshCalculatorPickerMenu.timer);
  refreshCalculatorPickerMenu.timer = window.setTimeout(() => refreshCalculatorPickerMenu(side, index), 120);
}

// 主动预取候选所属阵营的运行时。只在结果集已经收窄时调用：打字过程中
// 对大结果集连环预取会引发多次阵营下载与水合，反而拖慢输入。
function prefetchPickerFactions(options, cap = 2) {
  const seen = new Set();
  for (const option of options) {
    const factionId = option?.factionId || option?.faction;
    if (!factionId || seen.has(factionId)) continue;
    seen.add(factionId);
    if (seen.size >= cap) break;
    ensureFactionRuntimeLoaded(factionId).catch(() => {});
  }
}

function refreshCalculatorPickerMenu(side, index) {
  const row = document.querySelector('[data-calculator-picker-row][data-side="' + side + '"][data-index="' + index + '"]');
  const menu = row?.querySelector("[data-calculator-picker-menu]");
  if (!menu) return;
  const { query, visible, total } = calculatorPickerMatches(side, index, calculatorPickerOptions(side));
  // 结果已收窄（≤15 个）说明用户即将点击，此时预取命中率最高、开销可控；
  // 大结果集不预取，交给 pointerdown 按下预取兜底。
  if (query && total <= 15) prefetchPickerFactions(visible, 2);
  if (!visible.length) {
    menu.innerHTML = '<span class="calculator-picker-empty">没有匹配单位</span>';
    pickerMenuSlots.set(menu, []);
    menu.classList.add("is-open");
    return;
  }
  let slots = pickerMenuSlots.get(menu);
  if (!slots || !slots.length) {
    if (!menu.querySelector("[data-calculator-picker-option]")) {
      menu.innerHTML = calculatorPickerMenuMarkup(side, index, calculatorPickerOptions(side));
    }
    slots = [...menu.querySelectorAll("[data-calculator-picker-option]")].map((button) => ({
      root: button, strong: button.querySelector("strong"), small: button.querySelector("small"),
    }));
    pickerMenuSlots.set(menu, slots);
  }
  slots.forEach((slot, position) => {
    const option = visible[position];
    if (!option) { slot.root.hidden = true; slot.root.dataset.key = ""; return; }
    slot.root.hidden = false;
    slot.root.dataset.key = option.key;
    slot.strong.textContent = option.name;
    slot.small.textContent = option.label;
  });
  const more = menu.querySelector("[data-calculator-picker-more]");
  if (more) {
    const showMore = total > visible.length;
    more.hidden = !showMore;
    if (showMore) more.textContent = "共 " + total + " 个匹配，显示前 " + visible.length + " 个，继续输入缩小范围";
  }
  menu.classList.add("is-open");
}

function handleCalculatorPickerFocus(event) {
  const input = event.target.closest("[data-calculator-picker-input]");
  if (!input) return;
  const side = input.dataset.side;
  const index = Number(input.dataset.index || 0);
  state.calculatorPickerOpen[side] ||= [];
  state.calculatorPickerOpen[side][index] = true;
  refreshCalculatorPickerMenu(side, index);
}

function handleCalculatorPickerClick(event) {
  const remove = event.target.closest("[data-calculator-picker-remove]");
  if (!remove) return;
  const side = remove.dataset.side;
  const index = Number(remove.dataset.index || 0);
  const keys = calculatorSelectionKeys(side);
  if (keys.length <= 1) return;
  keys.splice(index, 1);
  state.calculatorPickerSearch[side]?.splice(index, 1);
  state.calculatorDrafts[side]?.splice(index, 1);
  state.calculatorPickerOpen[side]?.splice(index, 1);
  state.calculatorSelection[side] = keys[0] || "";
  renderCalculatorSelectors();
  scheduleBattleSessionSave();
}

// 只重建受影响的单个选择行。两侧整体 innerHTML 重建（每行菜单含 60 个
// 候选按钮 × 全部行）是点击路径上最大的同步开销，手机端尤其明显。
function rerenderCalculatorPickerRow(side, index) {
  const selector = '[data-calculator-picker-row][data-side="' + side + '"][data-index="' + index + '"]';
  const row = document.querySelector(selector);
  if (!row) return;
  row.outerHTML = calculatorPickerMarkup(side, index, calculatorPickerOptions(side));
}

async function handleCalculatorPickerOption(event) {
  const option = event.target.closest("[data-calculator-picker-option]");
  if (!option) return;
  const side = option.dataset.side;
  const index = Number(option.dataset.index || 0);
  const key = option.dataset.key || "";
  const selectedOption = calculatorPickerOptions(side).allOptions.find((candidate) => candidate.key === key);
  // 乐观选中：立即落 key、收起菜单并只重建这一行，阵营运行时在后台补载。
  const keys = calculatorSelectionKeys(side);
  keys[index] = key;
  state.calculatorPickerSearch[side] ||= [];
  state.calculatorPickerSearch[side][index] = "";
  state.calculatorPickerOpen[side] ||= [];
  state.calculatorPickerOpen[side][index] = false;
  state.calculatorSelection[side] = keys[0] || "";
  state.calculatorDrafts[side][index] = null;
  rerenderCalculatorPickerRow(side, index);
  renderCalculatorDetails();
  scheduleBattleSessionSave();
  $("#calcNote").textContent = "已选择单位；请确认双方后开始计算。";
  const factionId = selectedOption?.factionId || selectedOption?.faction;
  if (!factionId) return;
  try {
    await ensureFactionRuntimeLoaded(factionId);
    // 水合后清掉按空数据建的草稿并刷新详情区即可；卡片集合版本号已在
    // hydrateCalculatorCatalog 里递增，选项/过滤缓存在下次读取时自动重建，
    // 这里不做整体 DOM 重建，避免打断用户下一步操作。
    state.calculatorDrafts[side][index] = null;
    renderCalculatorDetails();
  } catch (error) {
    console.error(error);
    showToast("阵营数据加载失败，请检查资源是否完整");
    // 仅当用户尚未改动该槽位时回滚，避免覆盖用户新的选择。
    if (calculatorSelectionKeys(side)[index] === key) {
      calculatorSelectionKeys(side)[index] = "";
      state.calculatorDrafts[side][index] = null;
      rerenderCalculatorPickerRow(side, index);
      renderCalculatorDetails();
    }
  }
}

["attacker", "defender"].forEach((side) => {
  const container = $(`#calculator${side === "attacker" ? "Attacker" : "Defender"}Pickers`);
  container?.addEventListener("input", handleCalculatorPickerInput);
  container?.addEventListener("focusin", handleCalculatorPickerFocus);
  container?.addEventListener("click", handleCalculatorPickerClick);
  container?.addEventListener("click", handleCalculatorPickerOption);
  // 悬停预取：鼠标停在候选单位上时后台加载对应阵营运行时，
  // 点击选择时大概率已完成加载，减少换阵营的等待感。
  container?.addEventListener("pointerover", (event) => {
    const option = event.target?.closest?.("[data-calculator-picker-option]");
    const key = option?.dataset?.key;
    if (!key) return;
    const selected = calculatorPickerOptions(side).allOptions.find((candidate) => candidate.key === key);
    const factionId = selected?.factionId || selected?.faction;
    if (!factionId) return;
    ensureFactionRuntimeLoaded(factionId).catch(() => {});
  });
  // 按下即预取：触屏没有 hover，pointerdown 在 click 前触发，同样为点击争取加载提前量。
  container?.addEventListener("pointerdown", (event) => {
    const option = event.target?.closest?.("[data-calculator-picker-option]");
    const key = option?.dataset?.key;
    if (!key) return;
    const selected = calculatorPickerOptions(side).allOptions.find((candidate) => candidate.key === key);
    const factionId = selected?.factionId || selected?.faction;
    if (!factionId) return;
    ensureFactionRuntimeLoaded(factionId).catch(() => {});
  });
  $(`#addCalculator${side === "attacker" ? "Attacker" : "Defender"}`)?.addEventListener("click", () => {
    calculatorSelectionKeys(side).push("");
    state.calculatorPickerSearch[side] ||= [];
    state.calculatorPickerSearch[side].push("");
    state.calculatorPickerOpen[side] ||= [];
    state.calculatorPickerOpen[side].push(false);
    state.calculatorDrafts[side].push(null);
    renderCalculatorSelectors();
    scheduleBattleSessionSave();
  });
});
document.addEventListener("click", (event) => {
  if (event.target.closest("[data-calculator-picker-row]")) return;
  ["attacker", "defender"].forEach((side) => {
    (state.calculatorPickerOpen[side] || []).fill(false);
    $(`#calculator${side === "attacker" ? "Attacker" : "Defender"}Pickers`)?.querySelectorAll("[data-calculator-picker-menu].is-open").forEach((menu) => menu.classList.remove("is-open"));
  });
});

$("#calculatorAttackMode")?.addEventListener("change", (event) => {
  state.attackMode = event.target.value;
  $("#calcNote").textContent = `已选择${state.attackMode === "ranged" ? "远程射击" : "近战"}；请确认双方后开始计算。`;
  renderCalculatorDetails();
  scheduleBattleSessionSave();
});

$("#calculatorCoreContext")?.addEventListener("change", (event) => {
  const field = event.target?.dataset?.calcContext;
  if (!field || !Object.prototype.hasOwnProperty.call(state.combatContext, field)) return;
  state.combatContext[field] = Boolean(event.target.checked);
  renderCalculatorDetails();
  scheduleBattleSessionSave();
});

function getCalculatorEntry(side, selectionKey = null) {
  const key = selectionKey ?? state.calculatorSelection[side];
  if (!key) return null;
  if (key.startsWith("roster:")) {
    const [, rosterSide, groupId, unitId] = key.split(":");
    const found = findUnit(rosterSide, groupId, unitId);
    const roster = state.rosters[rosterSide];
    return found.unit ? { key, name: found.unit.name, rosterUnit: found.unit, group: found.group, groupId, unitId, rosterSide, rosterId: roster.id, faction: roster.faction } : null;
  }
  return calculatorCardNames().find((card) => calculatorCardKey(card) === key || calculatorLegacyCardKey(card) === key) || null;
}

function findStructuredCalculatorCard(name, faction = "") {
  const aliases = unitNameCandidates(name, faction);
  const definition = window.WarhammerFactionRegistry?.resolve(faction);
  const normalize = (value) => String(value || "")
    .replace(/[\s\u00a0·•・,，。.!！:：;；/\\_\-—–]/g, "")
    .replace(/[（(][^）)]*[）)]/g, "")
    .toLowerCase();
  const candidates = new Set(aliases.map(normalize));
  return state.calculatorCards.find((card) => card.structured && card.data?.unit
    && (!definition || card.factionId === definition.id)
    && [card.name, card.data.unit.name, card.data.englishName]
    .some((candidate) => candidates.has(normalize(candidate))));
}

function normalizeCalculatorCardData(data) {
  if (!data?.unit) return data || null;
  const sourceAbilities = Array.isArray(data.abilities)
    ? data.abilities.map((ability) => ability?.text || ability?.name).filter(Boolean).join("；")
    : "";
  return {
    ...data,
    factionKeywords: cleanPdfKeywordList(data.factionKeywords),
    keywords: cleanPdfKeywordList(data.keywords),
    unit: {
      ...data.unit,
      abilities: cleanPdfAbilityText(data.unit.abilities || sourceAbilities),
      defaultEquipment: cleanPdfWatermarkText(data.unit.defaultEquipment, data.weapons),
    },
  };
}

function cleanPdfKeywordList(values) {
  return [...new Set((Array.isArray(values) ? values : [])
    .map((value) => cleanPdfWatermarkText(value))
    .filter(Boolean))];
}

function cleanPdfAbilityText(value) {
  return String(value ?? "")
    .replace(/\s+\d+\s+\d+\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanPdfWatermarkText(value, weapons = []) {
  const watermark = /[\u8001\u6e7f\u8150\u9524\u6218\u7fa4]/;
  let text = String(value ?? "").replace(/\s+/g, " ").trim();
  const weaponNames = (Array.isArray(weapons) ? weapons : [])
    .map((weapon) => String(weapon?.name || weapon || "").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .sort((left, right) => right.length - left.length);
  if (weaponNames.length) {
    text = text.split(/[，,、]/).map((part) => {
      const clause = part.trim();
      const weaponName = weaponNames.find((name) => clause.includes(name));
      if (!weaponName) return clause;
      const prefix = clause.slice(0, clause.indexOf(weaponName)).trim();
      return watermark.test(prefix) ? clause.slice(clause.indexOf(weaponName)).trim() : clause;
    }).filter(Boolean).join("，");
  }
  return text
    .replace(new RegExp(`(^|[，,、\\s])${watermark.source}(?=\\s*[\\u4e00-\\u9fffA-Za-z0-9])`, "g"), "$1")
    .replace(/[\u6e7f](?=和)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getCalculatorCardData(entry) {
  if (entry?.data?.unit) return normalizeCalculatorCardData(entry.data);
  return normalizeCalculatorCardData(findStructuredCalculatorCard(entry?.name, entry?.faction || entry?.factionId)?.data);
}

function cloneCalculatorValue(value) {
  return value === undefined ? value : JSON.parse(JSON.stringify(value));
}

function calculatorSource(entry) {
  return entry?.rosterUnit ? "军表" : "数据卡";
}

// 军表装备名与数据卡武器名的同义映射（黑图书馆军表软件译名）已迁入
// data/global/aliases.json 经 aliases/index.js 以全局 scope 注册；
// 消费统一走别名注册表，app.js 不再持有武器别名表。
function weaponAliasVariants(value) {
  const cleaned = String(value || "").replace(/[（(].*?[）)]/g, "").trim();
  const canonical = window.WarhammerAliasRegistry?.resolveWeapon("", cleaned) || cleaned;
  return canonical && canonical !== cleaned ? [cleaned, canonical] : [cleaned];
}

function weaponNameOverlaps(rosterName, catalogNames) {
  return weaponAliasVariants(rosterName).some((roster) => {
    if (!roster) return false;
    return catalogNames.some((catalogName) => weaponAliasVariants(catalogName).some((catalog) => catalog && (catalog.includes(roster) || roster.includes(catalog))));
  });
}

function weaponMatchesRoster(weapon, rosterUnit) {
  const equipment = Object.keys(countEquipment(rosterUnit || {}));
  if (!equipment.length) return true;
  const candidates = [weapon?.name, weapon?.selectionGroup]
    .map((value) => String(value || "").replace(/[（(].*?[）)]/g, "").trim())
    .filter(Boolean);
  return equipment.some((item) => weaponNameOverlaps(item, candidates));
}

function weaponModelCount(weapon, rosterUnit, fallback = 1) {
  const models = activeModels(rosterUnit || {});
  if (!models.length) return 0;
  const candidates = [weapon?.name, weapon?.selectionGroup]
    .map((value) => String(value || "").replace(/[（(].*?[）)]/g, "").trim())
    .filter(Boolean);
  if (!candidates.some(Boolean)) return models.length;
  const count = models.filter((model) => model.equipment.some((item) => weaponNameOverlaps(item.name, candidates))).length;
  return count || (Object.keys(countEquipment(rosterUnit || {})).length ? 0 : fallback);
}

function weaponMatchesEquipmentText(weapon, equipmentText) {
  const source = String(equipmentText || "");
  if (!source.trim()) return true;
  const name = String(weapon?.name || "").replace(/[（(].*?[）)]/g, "").trim();
  return name && source.includes(name);
}

const normalizeCalculatorWeaponName = (value) => String(value || "")
  .replace(/[\s\u00a0·・,，。:：()（）\[\]【】"“”'"']/g, "")
  .toLowerCase();

// 从默认装备文本解析武器数量（数据卡路径）：按 [；;，,、] 分段，段形如
// 「2x 星镖炮」→ {星镖炮: 2}，「星镖炮」→ 1。段首紧跟人数量词（名/位/员）、
// 名字过长或含叙述性字眼时视为对模型计数，忽略（与合入脚本的解析一致）。
const narrativeCountPattern = /装备|携带|分别|其中|战士|士兵|老兵|奴工|成员|其余|其他|幽灵|幽魂|机组|车组|卫兵|警卫|载具|炮手|狙击手/;

function parseDefaultEquipmentWeaponCounts(equipmentText) {
  const counts = new Map();
  for (const raw of String(equipmentText || "").split(/[；;，,、]/)) {
    const segment = String(raw || "").trim().replace(/[（(].*?[）)]/g, "").trim();
    if (!segment) continue;
    let count = 1;
    let name = segment;
    let match = segment.match(/^(\d+)\s*[xX×门个把支套挺枚座]?\s*(?!名|位|员)(.+)$/);
    if (match && match[2].trim()) {
      count = Math.max(1, Number(match[1]) || 1);
      name = match[2].trim();
    } else if ((match = segment.match(/^两\s*[xX×门个把支套挺枚座]?\s*(?!名|位|员)(.+)$/)) && match[1].trim()) {
      count = 2;
      name = match[1].trim();
    }
    const key = normalizeCalculatorWeaponName(name);
    if (!key || key.length < 2 || key.length > 16 || narrativeCountPattern.test(name)) continue;
    counts.set(key, Math.max(count, counts.get(key) || 1));
  }
  return counts;
}

// 数据卡路径的武器数量：精确名优先，其次双向子串取最长匹配，否则 1。
function weaponDefaultEquipmentCount(weapon, counts) {
  const name = normalizeCalculatorWeaponName(String(weapon?.name || "").replace(/[（(].*?[）)]/g, "").trim());
  if (!name) return 1;
  if (counts.has(name)) return counts.get(name);
  let best = 1;
  let bestLen = 0;
  for (const [segmentName, count] of counts) {
    if (segmentName.includes(name) || name.includes(segmentName)) {
      if (Math.max(segmentName.length, name.length) > bestLen) {
        bestLen = Math.max(segmentName.length, name.length);
        best = count;
      }
    }
  }
  return best;
}

function setCalculatorWeaponEnabled(weapons, index, enabled) {
  const weapon = weapons?.[Number(index)];
  if (!weapon) return;
  weapon.enabled = Boolean(enabled);
  const group = String(weapon.selectionGroup || "").trim();
  if (weapon.enabled && group) {
    weapons.forEach((candidate, candidateIndex) => {
      if (candidateIndex !== Number(index) && String(candidate.selectionGroup || "").trim() === group) candidate.enabled = false;
    });
  }
}

function weaponNameMatchesProfile(weapon, name) {
  const clean = (value) => String(value || "")
    .replace(/[（(].*?[）)]/g, "")
    .replace(/[\s\u00a0·・,，。:：]/g, "")
    .trim()
    .toLowerCase();
  const weaponName = clean(weapon?.name);
  const target = clean(name);
  return Boolean(weaponName && target && weaponName === target);
}

function enabledCalculatorWeapons(data, entryName, rosterUnit, options = {}) {
  const baseUnit = data?.unit || {};
  const baseWeapons = (Array.isArray(data?.weapons) ? cloneCalculatorValue(data.weapons) : [])
    .filter((weapon) => !Array.isArray(options.weaponNames) || options.weaponNames.some((name) => weaponNameMatchesProfile(weapon, name)));
  const defaultEquipment = cleanPdfWatermarkText(options.defaultEquipment ?? baseUnit.defaultEquipment ?? "", baseWeapons);
  const defaultEquipmentCounts = parseDefaultEquipmentWeaponCounts(defaultEquipment);
  const defaultModels = Math.max(1, Number(options.modelCount ?? (rosterUnit ? activeModels(rosterUnit).length : baseUnit.models || baseUnit.defaultModels || 1)) || 1);
  const hasRosterEquipment = rosterUnit && Object.keys(countEquipment(rosterUnit)).length > 0;
  const matching = hasRosterEquipment
    ? baseWeapons.map((weapon) => weaponMatchesRoster(weapon, rosterUnit))
    : baseWeapons.map((weapon) => weaponMatchesEquipmentText(weapon, defaultEquipment));
  const anyMatching = matching.some(Boolean);
  return window.WarhammerCombatState.initializeOptionalExclusiveWeapons(baseWeapons.map((weapon, index) => {
    // modelsCarrying = 携带该武器的模型数（用于射击/近战分配校验）；
    // modelCount = 武器数量（模型数 × 单模型同型武器数 × 档案倍率），
    // 计算页的"数量"字段直接显示并编辑武器数量。
    // 数据卡路径：默认装备文本（如「2x 星镖炮」）提供单模型同型武器数量，
    // 对齐军表路径 modelsCarrying × equipmentMultiplier 的语义。
    const modelsCarrying = weapon.modelCount ?? (hasRosterEquipment ? weaponModelCount(weapon, rosterUnit, defaultModels) : defaultModels);
    const equipmentMultiplier = hasRosterEquipment ? weaponEquipmentMultiplier(weapon, rosterUnit, 1) : 1;
    const defaultCount = hasRosterEquipment ? 1 : weaponDefaultEquipmentCount(weapon, defaultEquipmentCounts);
    return {
      ...weapon,
      enabled: anyMatching ? matching[index] : true,
      modelsCarrying,
      modelCount: modelsCarrying * equipmentMultiplier * defaultCount * Math.max(1, Number(options.weaponMultipliers?.[weapon.name] || 1)),
    };
  }));
}

function normalizeModelProfileText(value) {
  return String(value || "").replace(/[\s\u00a0·・,，。:：()（）\[\]【】]/g, "").toLowerCase();
}

function modelProfileMatchesModel(profile, model) {
  const modelName = normalizeModelProfileText(model?.name);
  if (!modelName) return false;
  const includes = Array.isArray(profile?.matchIncludes) ? profile.matchIncludes : [];
  if (includes.some((term) => {
    const normalized = normalizeModelProfileText(term);
    return normalized && modelName.includes(normalized);
  })) return true;
  const profileName = normalizeModelProfileText(profile?.name);
  return Boolean(profileName && (modelName === profileName || modelName.includes(profileName)));
}

function modelProfileAssignments(data, rosterUnit) {
  const profiles = Array.isArray(data?.modelProfiles) ? data.modelProfiles : [];
  if (!profiles.length) return [];
  const active = rosterUnit ? activeModels(rosterUnit) : [];
  const total = Math.max(1, Number(rosterUnit ? active.length : data.unit?.models || data.unit?.defaultModels || 1) || 1);
  const remainingModels = [...active];
  const assignments = [];
  profiles.filter((profile) => !profile.remaining).forEach((profile) => {
    const expected = Math.max(0, Number(profile.count || 0) || 0);
    let models = remainingModels.filter((model) => modelProfileMatchesModel(profile, model));
    models.forEach((model) => remainingModels.splice(remainingModels.indexOf(model), 1));
    if (!models.length && rosterUnit && expected > 0 && remainingModels.length) {
      models = remainingModels.splice(0, Math.min(expected, remainingModels.length));
    }
    if (!rosterUnit && expected > 0) models = Array.from({ length: expected }, (_, index) => ({ name: profile.name, id: `${profile.id}-${index}` }));
    assignments.push({ profile, models, count: rosterUnit ? models.length : expected });
  });
  profiles.filter((profile) => profile.remaining).forEach((profile) => {
    const models = rosterUnit ? remainingModels.splice(0) : Array.from({ length: Math.max(0, total - assignments.reduce((sum, item) => sum + item.count, 0)) }, (_, index) => ({ name: profile.name, id: `${profile.id}-${index}` }));
    assignments.push({ profile, models, count: models.length });
  });
  return assignments.filter((assignment) => assignment.count > 0);
}

function calculatorModelProfileMembers(data, rosterUnit, entryName) {
  return modelProfileAssignments(data, rosterUnit).map(({ profile, models, count }) => {
    const memberUnit = { ...(data.unit || {}), ...(profile.unit || {}), name: profile.name || data.unit?.name || entryName };
    const memberData = { ...data, unit: memberUnit };
    const syntheticRosterUnit = rosterUnit ? { ...rosterUnit, name: memberUnit.name, models } : null;
    const memberWeapons = enabledCalculatorWeapons(memberData, entryName, syntheticRosterUnit, {
      defaultEquipment: profile.defaultEquipment ?? memberUnit.defaultEquipment,
      modelCount: count,
      weaponNames: profile.weaponNames,
      weaponMultipliers: profile.weaponMultipliers,
    });
    return {
      id: `${rosterUnit?.id || entryName}:${profile.id}`,
      name: memberUnit.name,
      role: profile.role || "组成模型",
      unit: memberUnit,
      weapons: memberWeapons,
      modelCount: count,
      initialModelCount: count,
      remainingWounds: models.reduce((sum, model) => sum + Number(model.currentWounds || memberUnit.woundsPerModel || 1), 0),
      isModelProfile: true,
      profileId: profile.id,
      isPrimary: profile.id === "champion" || profile.id === "leader" || profile.id === "sergeant",
      ruleName: entryName,
    };
  });
}

function getCalculatorDraft(side, index = 0, selectionKey = null) {
  const keys = calculatorSelectionKeys(side);
  const key = selectionKey ?? keys[index] ?? "";
  const entry = getCalculatorEntry(side, key);
  if (!entry || !key) {
    state.calculatorDrafts[side][index] = null;
    return null;
  }
  if (state.calculatorDrafts[side]?.[index]?.key === key) {
    // 军表伤口在详情弹窗中修改后，草稿按 key 复用会保留旧的剩余伤口，
    // 导致"严重损伤"等按剩余血量生效的技能不触发；这里每次取用时刷新。
    // 计算页手动改过 W/模型 的单位以页面数值为准，不再被军表覆盖。
    const draft = state.calculatorDrafts[side][index];
    if (entry?.rosterUnit && !draft.remainingWoundsManual) {
      draft.remainingWounds = activeModels(entry.rosterUnit).reduce((sum, model) => sum + Number(model.currentWounds || 0), 0);
      if (draft.joinedMembers?.length) {
        const groupUnits = entry.group?.units || [];
        draft.joinedMembers.forEach((member) => {
          const rosterMember = member.parentId
            ? groupUnits.find((unit) => unit.id === member.parentId)
            : (groupUnits.find((unit) => unit.id === member.id) || (member.id === entry.rosterUnit.id ? entry.rosterUnit : null));
          if (rosterMember && !member.remainingWoundsManual) {
            member.remainingWounds = activeModels(rosterMember).reduce((sum, model) => sum + Number(model.currentWounds || 0), 0);
          }
        });
      }
    }
    return draft;
  }
  const card = entry.structured ? entry : findStructuredCalculatorCard(entry.name, entry.faction || entry.factionId);
  const data = getCalculatorCardData(card || entry);
  const baseUnit = cloneCalculatorValue(data?.unit || {});
  const baseWeapons = enabledCalculatorWeapons(data, entry.name, entry.rosterUnit);
  const rosterUnit = entry.rosterUnit;
  const modelCount = rosterUnit ? activeModels(rosterUnit).length : Math.max(1, Number(baseUnit.models || baseUnit.defaultModels || 1) || 1);
  const joined = rosterUnit && entry.group && (entry.group.category === "联合单位" || /^联合单位/.test(entry.group.title || ""));
  const explicitJoinedMembers = joined ? entry.group.units.filter((member) => activeModels(member).length).flatMap((member) => {
    const memberData = member.id === rosterUnit.id ? data : calculatorDataForUnit(member, entry.faction);
    const memberUnit = cloneCalculatorValue(memberData?.unit || {});
    const memberKeywords = [...(memberData?.keywords || []), ...(memberData?.factionKeywords || [])];
    const role = /领导|主将|领袖|character|leader/i.test(String(member.role || "")) ? "角色" : /护卫|bodyguard/i.test(String(member.role || "")) ? "护卫" : (memberKeywords.some((keyword) => /人物|character/i.test(String(keyword))) ? "角色" : "护卫");
    const livingModels = activeModels(member);
    const profileMembers = calculatorModelProfileMembers(memberData, member, member.name);
    if (profileMembers.length) return profileMembers.map((profileMember) => ({
      ...profileMember,
      parentId: member.id,
      parentRole: role,
      role: `${role} · ${profileMember.role}`,
    }));
    const memberWeapons = enabledCalculatorWeapons(memberData, member.name, member);
    return [{
      id: member.id, name: member.name, role, unit: memberUnit, weapons: memberWeapons, modelCount: livingModels.length,
      initialModelCount: member.models.length,
      remainingWounds: livingModels.reduce((sum, model) => sum + Number(model.currentWounds || 0), 0),
      parentId: member.id, parentRole: role, ruleName: member.name,
    }];
  }).sort((a, b) => ((a.parentRole || a.role) === "角色" ? 0 : 1) - ((b.parentRole || b.role) === "角色" ? 0 : 1)) : [];
  const modelProfileMembers = !joined ? calculatorModelProfileMembers(data, rosterUnit, entry.name) : [];
  const joinedMembers = explicitJoinedMembers.length ? explicitJoinedMembers : modelProfileMembers;
  const weapons = modelProfileMembers.length
    ? (modelProfileMembers.find((member) => member.isPrimary)?.weapons || modelProfileMembers[0].weapons)
    : baseWeapons;
  const activeRosterModels = rosterUnit ? activeModels(rosterUnit) : [];
  state.calculatorDrafts[side][index] = {
    key, entry, data, unit: baseUnit, weapons, modelCount: Math.max(1, modelCount || 1), source: calculatorSource(entry), side, joinedMembers,
    calculatorUnitIndex: index,
    sourceKey: entry.rosterUnit
      ? (window.WarhammerRosterContext?.sourceKey(side, entry.rosterId, entry.unitId) || `${side}:${entry.rosterId}:${entry.unitId}`)
      : `${side}:datasheet:${entry.key || entry.name}`,
    detachmentIds: entry.rosterUnit ? [...(state.rosters[entry.rosterSide]?.detachmentIds || [])] : [],
    enhancementAssignments: entry.rosterUnit
      ? Object.fromEntries((entry.group?.units || [entry.rosterUnit]).map((member) => [member.id, member.enhancementId || ""]))
      : { standalone: "" },
    compositionMode: explicitJoinedMembers.length ? "joined" : modelProfileMembers.length ? "modelProfiles" : "single",
    ruleSelections: {}, rerollSelections: {},
    initialModelCount: rosterUnit ? rosterUnit.models.length : Math.max(1, Number(baseUnit.models || baseUnit.defaultModels || 1)),
    remainingWounds: rosterUnit ? activeRosterModels.reduce((sum, model) => sum + Number(model.currentWounds || 0), 0) : Number(baseUnit.woundsPerModel || 1) * Math.max(1, modelCount || 1),
  };
  return state.calculatorDrafts[side][index];
}

function calculatorStat(unit, name, fallback = "") {
  return unit?.[name] ?? fallback;
}

function isTorrentWeapon(weapon) {
  const skill = String(weapon?.skill ?? "").trim().toLowerCase();
  if (skill === "torrent" || skill === "auto-hit" || skill === "自动命中") return true;
  return !/\d+\+/.test(skill) && (weapon?.abilities || []).some((ability) => /喷射|洪流|torrent/i.test(String(ability)));
}

function calculatorTargetModelCount() {
  const draft = getCalculatorDraft("defender");
  if (!draft) return 0;
  return draft.joinedMembers?.length
    ? draft.joinedMembers.reduce((sum, member) => sum + Math.max(0, Number(member.modelCount || 0)), 0)
    : Math.max(0, Number(draft.modelCount || 0));
}

function calculatorSourceKeywords(draft, sourceName = "") {
  const sourceCard = sourceName && sourceName !== draft.entry?.name ? findStructuredCalculatorCard(sourceName, draft.entry?.faction || draft.entry?.factionId) : null;
  const sourceData = sourceCard ? getCalculatorCardData(sourceCard) : draft.data;
  return [...(sourceData?.factionKeywords || []), ...(sourceData?.keywords || [])]
    .map((keyword) => String(keyword).trim().toLowerCase());
}

function calculatorSourceIsMonsterVehicle(draft, sourceName = "") {
  const keywords = calculatorSourceKeywords(draft, sourceName);
  return ["凶兽", "巨兽", "monster", "载具", "vehicle"].some((keyword) => keywords.includes(keyword));
}

function calculatorSourceWeapons(draft, sourceName = "") {
  const member = (draft.joinedMembers || []).find((candidate) => candidate.name === sourceName || candidate.ruleName === sourceName);
  return member?.weapons || draft.weapons || [];
}

function coreWeaponResolution(weapon, draft, sourceName = "") {
  const attackerMonsterVehicle = calculatorSourceIsMonsterVehicle(draft, sourceName);
  const defenderDraft = getCalculatorDraft("defender");
  const targetKeywords = [...(defenderDraft?.data?.factionKeywords || []), ...(defenderDraft?.data?.keywords || [])];
  return window.WarhammerKeywordDictionary.resolve(weapon?.abilities || [], {
    ...state.combatContext,
    mode: state.attackMode,
    attackerMonsterVehicle,
    targetEngaged: state.combatContext.attackerEngaged,
    targetModelCount: calculatorTargetModelCount(),
    allAttacksSameTarget: true,
    oneShotUsed: Boolean(weapon?.oneShotUsed),
    precisionTargetsCharacter: Boolean(weapon?.precisionTargetsCharacter),
    targetKeywords,
  });
}

function calculatorKeywordMarkup(draft) {
  const sources = [draft.data, ...(draft.joinedMembers || []).map((member) => ({
    factionKeywords: member.unit?.factionKeywords,
    keywords: member.unit?.keywords,
  }))];
  const keywords = [...new Set(sources.flatMap((source) => [
    ...(source?.factionKeywords || []),
    ...(source?.keywords || []),
  ]).filter(Boolean))];
  if (!keywords.length) return "";
  return `<section class="calculator-keywords"><div class="calculator-section-heading"><strong>关键词</strong></div><p>${escapeHtml(keywords.join("、"))}</p></section>`;
}

function calculatorRuleControlMarkup(draft, side, rule) {
  if (!rule.controls?.length) return "";
  const hasEnabledControl = rule.controls.some((control) => control.id === "enabled");
  const hasForceLeaderControl = rule.controls.some((control) => control.id === "forceLeader");
  return rule.controls.filter((control) => !(control.id === "forceLeader" && hasEnabledControl)).map((control) => {
    const key = `${rule.id}.${control.id}`;
    const current = draft.ruleSelections?.[key];
    const label = control.id === "forceLeader" && !hasEnabledControl ? "本次启用此技能" : control.label;
    const impliesForceLeader = control.id === "enabled" && hasForceLeaderControl ? ` data-calc-implies-force-leader="${escapeHtml(`${rule.id}.forceLeader`)}"` : "";
    if (control.type === "checkbox") return `<label class="check-row calculator-rule-control"><input type="checkbox" data-calc-side="${side}" data-calc-rule="${escapeHtml(key)}"${impliesForceLeader} ${current ? "checked" : ""} /><span>${escapeHtml(label)}</span></label>`;
    return `<label class="calculator-martial-control calculator-rule-control">${escapeHtml(control.label)}<select data-calc-side="${side}" data-calc-rule="${escapeHtml(key)}">${(control.options || []).map(([value, label]) => `<option value="${escapeHtml(value)}" ${(current ?? control.options?.[0]?.[0]) === value ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}</select></label>`;
  }).join("");
}

function calculatorRuleMarkup(draft, side, rules, heading) {
  if (!rules.length) return "";
  const statusFor = (rule) => {
    if (!rule.controls?.length) return rule.status || "仅供查阅";
    const active = (rule.controls || []).some((control) => {
      const value = draft.ruleSelections?.[`${rule.id}.${control.id}`];
      return control.type === "checkbox" ? Boolean(value) : Boolean(value && value !== "none");
    });
    return active ? "本次已启用并计入骰子" : "可选效果：默认未启用";
  };
  return `<section class="calculator-rule-section"><div class="calculator-section-heading"><strong>${heading}</strong></div>${rules.map((rule) => {
    const faction = draft?.entry?.faction;
    const displayUnitName = rule.unitName
      ? (window.WarhammerAliasRegistry?.resolveUnit?.(faction, rule.unitName) || rule.unitName)
      : "";
    return `<div class="calculator-ability"><strong>${escapeHtml(displayUnitName ? `${displayUnitName} · ${rule.name}` : rule.name)}</strong>${rule.text ? `<p>${escapeHtml(rule.text)}</p>` : ""}<small>${escapeHtml(statusFor(rule))}</small>${calculatorRuleControlMarkup(draft, side, rule)}</div>`;
  }).join("")}</section>`;
}

function calculatorAbilityMarkup(draft, side) {
  const unit = draft.unit || {};
  const unitNames = [draft.entry?.name, ...(draft.joinedMembers || []).map((member) => member.name)];
  const catalog = window.WarhammerRuleResolver?.rulesForUnits(draft.entry?.faction, unitNames) || { faction: [], unit: [] };
  const factionRules = calculatorRuleMarkup(draft, side, catalog.faction, "阵营技能");
  const unitRules = calculatorRuleMarkup(draft, side, catalog.unit, "单位技能");
  const legacy = !catalog.unit.length && (unit.abilities || unit.activeAbilities) ? `<section class="calculator-rule-section"><div class="calculator-section-heading"><strong>单位技能</strong></div><div class="calculator-ability"><p>${escapeHtml([unit.abilities, unit.activeAbilities || unit.active].filter(Boolean).join("；"))}</p><small>已显示，等待结构化规则补充。</small></div></section>` : "";
  return `<div class="calculator-abilities">${factionRules}${unitRules}${legacy}</div>${calculatorKeywordMarkup(draft)}`;
}

function calculatorRerollKey(kind, sourceKey, weaponIndex) {
  return `${kind}:${sourceKey}:${weaponIndex}`;
}

function rerollSelection(draft, key, threshold) {
  const configured = draft.rerollSelections?.[key];
  const fallback = Array.from({ length: Math.max(0, threshold - 1) }, (_, index) => index + 1);
  return { configured: Boolean(configured?.configured), faces: configured?.configured ? configured.faces || [] : fallback };
}

function rerollFacesMarkup(draft, side, { kind, sourceKey, weaponIndex, threshold, title, locked = false }) {
  const key = calculatorRerollKey(kind, sourceKey, weaponIndex);
  const selection = rerollSelection(draft, key, threshold);
  const faces = new Set((locked ? [1] : selection.faces).map(Number));
  const stateText = locked ? "规则固定：仅重投 1" : (selection.configured ? "已按所选骰面重投" : "默认重投失败骰");
  return `<div class="calculator-reroll-control ${locked ? "is-locked" : ""}"><strong>${escapeHtml(title)}</strong><small>成功：${threshold}+；${stateText}</small><div class="calculator-reroll-faces">${[1, 2, 3, 4, 5, 6].map((face) => `<label class="${face >= threshold ? "is-success" : "is-failure"} ${faces.has(face) ? "is-selected" : ""}"><input type="checkbox" value="${face}" data-calc-side="${side}" data-calc-reroll-kind="${kind}" data-calc-reroll-key="${escapeHtml(key)}" data-calc-reroll-face ${faces.has(face) ? "checked" : ""} ${locked && face !== 1 ? "disabled" : ""} />${face}</label>`).join("")}</div>${locked ? "" : "<small>可选择成功骰来赌暴击；选择后会覆盖默认的失败骰重投。</small>"}</div>`;
}

// ---- 重投计划（单一事实源）----
// 引擎载荷与 UI 骰面框都从这里取重投来源，不再各自推导显示条件。
// 每个授权(grant)携带来源 kind、规则 ID/名称、模式 ones|failed。

function rerollRuleIndexForFaction(draft, unitNames) {
  const index = new Map();
  const collect = (rules) => (rules || []).forEach((rule) => { if (rule?.id && !index.has(rule.id)) index.set(rule.id, rule); });
  const resolver = window.WarhammerRuleResolver;
  const faction = draft?.entry?.faction;
  if (!resolver || !faction) return index;
  collect(resolver.rulesForUnit(faction, unitNames[0] || "").faction);
  unitNames.filter(Boolean).forEach((name) => collect(resolver.rulesForUnit(faction, name).unit));
  const detachmentCatalog = resolver.rulesForDetachments(faction, draft.detachmentIds || []);
  collect(detachmentCatalog.rules);
  collect(detachmentCatalog.enhancements);
  return index;
}

function rerollGrantsFromResolution(kind, resolution, ruleIndex) {
  const grants = [];
  (resolution?.attack?.contributions || []).forEach((entry) => {
    if (entry.field !== "hitReroll" && entry.field !== "woundReroll") return;
    grants.push({
      kind,
      dice: entry.field === "hitReroll" ? "hit" : "wound",
      mode: entry.mode || "failed",
      ruleId: entry.sourceId,
      ruleName: ruleIndex.get(entry.sourceId)?.name || "规则",
    });
  });
  return grants;
}

// 按武器类型解析（相位不再用全局 attackMode），与引擎归约的来源一一对应：
// unit（含分遣队/增强）→ joined（联合单位共享）→ faction → twin-linked。
function calculatorRerollPlan(draft, sourceName, weapon, coreProfile) {
  const grants = { hit: [], wound: [] };
  const resolver = window.WarhammerRuleResolver;
  const faction = draft?.entry?.faction;
  if (!resolver || !faction) return grants;
  const joinedMembers = (draft.joinedMembers || [])
    .filter((member) => member && (member.ruleName || member.name) !== sourceName);
  const memberNames = [sourceName, ...joinedMembers.map((member) => member.ruleName || member.name)].filter(Boolean);
  const ruleIndex = rerollRuleIndexForFaction(draft, memberNames);
  const phaseOverride = { phase: weapon.type };
  const add = (resolution, kind) => {
    rerollGrantsFromResolution(kind, resolution, ruleIndex).forEach((grant) => {
      grants[grant.dice].push(grant);
    });
  };
  add(resolvedRuleEffects(draft, sourceName, phaseOverride), "unit");
  joinedMembers.forEach((member) => {
    const name = member.ruleName || member.name;
    const resolution = resolver.resolveUnitScoped(
      faction, name, "unit", draft.ruleSelections || {},
      ruleContextForDraft(draft, name, {
        ...phaseOverride,
        modelCount: member.modelCount,
        initialModelCount: member.initialModelCount,
        remainingWounds: member.remainingWounds,
      }),
    );
    add(resolution, "joined");
  });
  add(resolvedFactionEffects(draft, { unitName: sourceName, ...phaseOverride }), "faction");
  if ((coreProfile?.effects || []).some((effect) => effect.type === "twin-linked")) {
    grants.wound.push({ kind: "twin", dice: "wound", mode: "failed", ruleId: "core.twin-linked", ruleName: "双联" });
  }
  return grants;
}

// 多个重投来源合并：骰子至多重投一次。全部为 ones → 锁定重投 1；
// 否则按各来源框中选择的骰面取并集（未选择时默认重投失败骰）。
function composeRerollSelection(draft, grants, keyPrefix, sourceKey, weaponIndex, threshold) {
  if (!grants.length) return { type: "none", values: [] };
  if (grants.every((grant) => grant.mode === "ones")) return { type: "ones", values: [] };
  const faces = new Set();
  let anyConfigured = false;
  grants.forEach((grant) => {
    if (grant.mode === "ones") { faces.add(1); return; }
    const selection = rerollSelection(draft, calculatorRerollKey(keyPrefix + ":" + grant.kind + ":" + grant.ruleId, sourceKey, weaponIndex), threshold);
    if (selection.configured) anyConfigured = true;
    (selection.faces || []).forEach((face) => faces.add(Number(face)));
  });
  if (!faces.size) return { type: "failed", values: [] };
  if (anyConfigured) return { type: "specific", values: [...faces].sort((a, b) => a - b) };
  return { type: "failed", values: [] };
}

function datasheetFactionMatches(requested, actual) {
  const wanted = String(requested || "").trim();
  const found = String(actual || "").trim();
  if (!wanted || !found || wanted === found) return true;
  const wantedDefinition = window.WarhammerFactionRegistry?.resolve(wanted);
  const foundDefinition = window.WarhammerFactionRegistry?.resolve(found);
  return Boolean(wantedDefinition && foundDefinition && wantedDefinition.id === foundDefinition.id);
}

function modifyDamageExpression(value, modifier) {
  const parse = (expression) => {
    const text = String(expression ?? "0").replace(/\s+/g, "").toUpperCase();
    if (/^[+-]?\d+$/.test(text)) return { count: 0, sides: 0, constant: Number(text) };
    const match = text.match(/^(\d*)D(\d+)([+-]\d+)?$/);
    if (!match) return null;
    return { count: Number(match[1] || 1), sides: Number(match[2]), constant: Number(match[3] || 0) };
  };
  const base = parse(value ?? "1");
  const delta = parse(modifier || 0);
  if (!base || !delta || (base.sides && delta.sides && base.sides !== delta.sides)) return value;
  const count = base.count + delta.count;
  const sides = base.sides || delta.sides;
  const constant = base.constant + delta.constant;
  if (!count) return String(Math.max(1, constant));
  return `${count === 1 ? "" : count}D${sides}${constant ? `${constant > 0 ? "+" : ""}${constant}` : ""}`;
}

// 军表中某武器在每个携带模型上的数量（默认 1）。兼容旧数据把"2个酷刑炮"
// 写在装备名里的格式。
function weaponEquipmentMultiplier(weapon, rosterUnit, fallback = 1) {
  const models = activeModels(rosterUnit || {});
  const candidates = [weapon?.name, weapon?.selectionGroup]
    .map((value) => String(value || "").replace(/[（(].*?[）)]/g, "").trim())
    .filter(Boolean);
  if (!candidates.some(Boolean) || !models.length) return fallback;
  const itemCount = (item) => {
    const countMatch = String(item.name || "").match(/^(\d+)个(.+)$/);
    return Math.max(1, Number(item.count || 1)) * (countMatch ? Math.max(1, Number(countMatch[1])) : 1);
  };
  const matches = (item) => weaponNameOverlaps(item.name, candidates);
  const carrying = models.filter((model) => model.equipment.some(matches));
  if (!carrying.length) return fallback;
  const total = carrying.reduce((sum, model) => sum + model.equipment.filter(matches).reduce((count, item) => count + itemCount(item), 0), 0);
  return Math.max(1, Math.round(total / carrying.length));
}

function effectiveWoundThresholdForDisplay(threshold, modifier) {
  const base = Number(threshold || 0);
  if (!base) return base;
  return Math.min(7, Math.max(2, base - Number(modifier || 0)));
}

function defenderHitModifierForDisplay() {
  const draft = getCalculatorDraft("defender");
  if (!draft) return 0;
  const resolved = resolvedFactionEffects(draft);
  const factionModifier = window.WarhammerRuleEffects?.defenderAttackModifiers
    ? Number(window.WarhammerRuleEffects.defenderAttackModifiers(resolved, state.attackMode).hitModifier || 0)
    : 0;
  const unitModifier = [draft.entry?.name, ...(draft.joinedMembers || []).map((member) => member.name)]
    .filter(Boolean)
    .map((name) => Number(resolvedRuleEffects(draft, name).defend?.incomingHitModifier || 0))
    .reduce((result, value) => Math.min(result, value), 0);
  return factionModifier + unitModifier;
}

function defenderWoundModifierForDisplay(attackerStrength, defenderToughness) {
  const draft = getCalculatorDraft("defender");
  if (!draft) return 0;
  const effects = [draft.entry?.name, ...(draft.joinedMembers || []).map((member) => member.name)]
    .filter(Boolean)
    .map((name) => resolvedRuleEffects(draft, name).defend || {})
    .reduce((result, defend) => ({
      incomingWoundModifier: Math.min(result.incomingWoundModifier, Number(defend.incomingWoundModifier || 0)),
      incomingWoundWhenStrengthGreater: Math.min(result.incomingWoundWhenStrengthGreater, Number(defend.incomingWoundWhenStrengthGreater || 0)),
      incomingWoundWhenStrengthGreaterOrEqual: Math.min(result.incomingWoundWhenStrengthGreaterOrEqual, Number(defend.incomingWoundWhenStrengthGreaterOrEqual || 0)),
    }), { incomingWoundModifier: 0, incomingWoundWhenStrengthGreater: 0, incomingWoundWhenStrengthGreaterOrEqual: 0 });
  const conditional = attackerStrength > defenderToughness
    ? (effects.incomingWoundWhenStrengthGreater < 0
      ? effects.incomingWoundWhenStrengthGreater
      : effects.incomingWoundWhenStrengthGreaterOrEqual)
    : (attackerStrength === defenderToughness ? effects.incomingWoundWhenStrengthGreaterOrEqual : 0);
  return effects.incomingWoundModifier + conditional;
}

function calculatorWeaponRerollMarkup(weapon, draft, side, sourceName, sourceKey, weaponIndex) {
  if (side !== "attacker") return "";
  const sections = [];
  const coreProfile = coreWeaponResolution(weapon, draft, sourceName);
  const phaseOverride = { phase: weapon.type };
  const hitThreshold = isTorrentWeapon(weapon) ? 0 : parseSkill(weapon.skill);
  const defenderHitModifier = defenderHitModifierForDisplay();
  const sourceRules = resolvedRuleEffects(draft, sourceName, phaseOverride).attack || {};
  const factionEffects = resolvedFactionEffects(draft, { unitName: sourceName, ...phaseOverride }).attack || {};
  const hitModifiers = [
    defenderHitModifier,
    Number(sourceRules.hitModifier || 0),
    Number(factionEffects.hitModifier || 0),
    Number(coreProfile.hitModifier || 0),
  ].filter((value) => !(coreProfile.ignoreNegativeHitModifiers && value < 0));
  const hitState = window.WarhammerCombatState.resolveHit({
    baseTarget: hitThreshold,
    modifiers: hitModifiers.map((value, index) => ({ sourceId: `core-hit-${index}`, value })),
    reroll: { mode: "failed" },
    minimumUnmodifiedHit: coreProfile.unmodifiedHitThreshold,
  });
  const displayedHitThreshold = hitState.effectiveTarget;
  // 骰面框直接渲染重投计划：来源齐全（单位/联合/阵营/双联），相位按武器类型，
  // 与引擎载荷使用同一 composeRerollSelection 归约，不再手写显示条件。
  const plan = calculatorRerollPlan(draft, sourceName, weapon, coreProfile);
  const hitTitle = (grant) => grant.kind === "joined"
    ? grant.ruleName + " · 联合单位命中重投"
    : grant.kind === "faction"
      ? grant.ruleName + " · 阵营命中重投"
      : grant.ruleName + " · 命中重投";
  if (hitThreshold > 0 && !coreProfile.preventHitRerolls) {
    plan.hit.forEach((grant) => {
      sections.push(rerollFacesMarkup(draft, side, {
        kind: "hit:" + grant.kind + ":" + grant.ruleId, sourceKey, weaponIndex, threshold: displayedHitThreshold,
        title: hitTitle(grant), locked: grant.mode === "ones",
      }));
    });
  }
  const defenderDraft = getCalculatorDraft("defender");
  const defenderToughness = Number(defenderDraft?.unit?.toughness || 0);
  const attackerStrength = Number(weapon.strength || 0) + Number(sourceRules.strengthModifier || 0);
  const baseWoundThreshold = defenderToughness ? woundTarget(attackerStrength, defenderToughness) : 4;
  const woundModifier = Number(sourceRules.woundModifier || 0) + Number(factionEffects.woundModifier || 0) + defenderWoundModifierForDisplay(attackerStrength, defenderToughness) + Number(coreProfile.woundModifier || 0);
  const woundThreshold = effectiveWoundThresholdForDisplay(baseWoundThreshold, woundModifier);
  const woundTitle = (grant) => grant.kind === "twin"
    ? "双联 · 造伤重投"
    : grant.kind === "joined"
      ? grant.ruleName + " · 联合单位造伤重投"
      : grant.kind === "faction"
        ? grant.ruleName + " · 阵营造伤重投"
        : grant.ruleName + " · 造伤重投";
  plan.wound.forEach((grant) => {
    sections.push(rerollFacesMarkup(draft, side, {
      kind: "wound:" + grant.kind + ":" + grant.ruleId, sourceKey, weaponIndex, threshold: woundThreshold,
      title: woundTitle(grant), locked: grant.mode === "ones",
    }));
  });
  if (coreProfile.preventHitRerolls) sections.push(`<div class="calculator-reroll-control is-locked"><strong>曲射限制</strong><small>本次攻击不能重投命中骰；仅按未修正命中阈值结算。</small></div>`);
  return sections.join("");
}

function calculatorDetachmentAssignmentTargets(draft) {
  const candidates = !draft.entry?.rosterUnit
    ? [{ id: "standalone", name: draft.entry?.name || "当前单位", keywords: [...(draft.data?.keywords || []), ...(draft.data?.factionKeywords || [])] }]
    : (draft.compositionMode === "joined" ? (draft.entry.group?.units || [draft.entry.rosterUnit]) : [draft.entry.rosterUnit]).map((unit) => {
      const data = unit.id === draft.entry.rosterUnit.id ? draft.data : calculatorDataForUnit(unit, draft.entry.faction);
      return { ...unit, keywords: [...(data?.keywords || []), ...(data?.factionKeywords || [])] };
    });
  return window.WarhammerRosterContext?.enhancementTargets(candidates) || [];
}

function calculatorEnhancementEligibleForTarget(enhancement, target) {
  return window.WarhammerRosterContext?.matchesEnhancementEligibility(target, enhancement?.eligibility) !== false;
}

function calculatorSelectedEnhancements(draft) {
  const detachments = window.WarhammerRuleResolver?.rulesForDetachments(draft.entry?.faction, draft.detachmentIds || []).detachments || [];
  return detachments.flatMap((detachment) => (detachment.enhancements || []).map((enhancement) => ({ ...enhancement, detachmentName: detachment.name })));
}

function calculatorValidAssignedEnhancementIds(draft) {
  const enhancements = new Map(calculatorSelectedEnhancements(draft).map((enhancement) => [enhancement.id, enhancement]));
  return calculatorDetachmentAssignmentTargets(draft).flatMap((target) => {
    const enhancement = enhancements.get(draft.enhancementAssignments?.[target.id]);
    return enhancement && calculatorEnhancementEligibleForTarget(enhancement, target) ? [enhancement.id] : [];
  });
}

function calculatorDetachmentMarkup(draft, side) {
  const resolver = window.WarhammerRuleResolver;
  const available = resolver?.detachmentsForFaction(draft.entry?.faction) || [];
  if (!available.length) return "";
  const selectedIds = new Set(draft.detachmentIds || []);
  const selected = resolver.rulesForDetachments(draft.entry?.faction, [...selectedIds]).detachments || [];
  const totalDp = selected.reduce((total, detachment) => total + Number(detachment.dp || 0), 0);
  const sourceLabel = draft.entry?.rosterUnit
    ? `军表预设 · ${sideLabel(draft.entry.rosterSide)}「${state.rosters[draft.entry.rosterSide]?.name || "军表"}」`
    : "独立数据卡默认不启用，可手动选择";
  const choices = available.map((detachment) => `<label class="check-row calculator-detachment-choice"><input type="checkbox" data-calc-side="${side}" data-calc-detachment="${escapeHtml(detachment.id)}" ${selectedIds.has(detachment.id) ? "checked" : ""} /><span>${escapeHtml(detachment.name)}${detachment.englishName ? ` · ${escapeHtml(detachment.englishName)}` : ""}（${detachment.dp}DP）</span></label>`).join("");
  const enhancements = selected.flatMap((detachment) => (detachment.enhancements || []).map((enhancement) => ({ ...enhancement, detachmentName: detachment.name })));
  const assignmentMarkup = calculatorDetachmentAssignmentTargets(draft).map((target) => {
    const current = draft.enhancementAssignments?.[target.id] || "";
    const unresolved = !current && target.enhancement;
    const eligibleEnhancements = enhancements.filter((enhancement) => calculatorEnhancementEligibleForTarget(enhancement, target));
    const invalidCurrent = current && !eligibleEnhancements.some((enhancement) => enhancement.id === current);
    return `<label class="calculator-enhancement-select"><span>${escapeHtml(target.name)} · 增强</span><select data-calc-side="${side}" data-calc-enhancement data-calc-enhancement-target="${escapeHtml(target.id)}"><option value="">不装备增强</option>${eligibleEnhancements.map((enhancement) => `<option value="${escapeHtml(enhancement.id)}" ${current === enhancement.id ? "selected" : ""}>${escapeHtml(enhancement.name)}（${enhancement.points}分 · ${enhancement.detachmentName}${enhancement.restriction ? ` · ${enhancement.restriction}` : ""}）</option>`).join("")}</select>${unresolved ? `<small>军表中的“${escapeHtml(target.enhancement)}”未在当前分遣队中匹配，请手动选择。</small>` : ""}${invalidCurrent ? `<small>原增强不符合该角色的模型/关键词限制，已停止应用，请重新选择。</small>` : ""}</label>`;
  }).join("");
  const assignedEnhancementIds = new Set(calculatorValidAssignedEnhancementIds(draft));
  const rulesMarkup = selected.map((detachment) => {
    const rules = [
      { ...detachment.rule, name: `分遣队规则 · ${detachment.rule.name}` },
      ...(detachment.stratagems || []).map((rule) => ({ ...rule, name: `计谋 ${rule.cp}CP · ${rule.name}` })),
      ...(detachment.enhancements || []).map((rule) => assignedEnhancementIds.has(rule.id)
        ? { ...rule, name: `增强 ${rule.points}分 · ${rule.name}` }
        : { ...rule, name: `增强 ${rule.points}分 · ${rule.name}`, controls: [], status: "未分配给当前单位，仅供查阅" }),
    ];
    return `<details class="calculator-detachment-rules"><summary>${escapeHtml(detachment.name)} · 完整规则（${rules.length}条）</summary>${calculatorRuleMarkup(draft, side, rules, "")}</details>`;
  }).join("");
  return `<details class="calculator-detachments"><summary><strong>分遣队</strong><small>${escapeHtml(sourceLabel)} · 已选 ${selected.length} 个，共 ${totalDp}DP</small></summary><div class="calculator-detachment-choices">${choices}</div>${selected.length ? `<div class="calculator-enhancement-assignments">${assignmentMarkup}</div>${rulesMarkup}` : `<p class="calculator-detachment-empty">当前未启用分遣队，不应用任何分遣队规则或增强。</p>`}</details>`;
}

function calculatorWeaponMarkup(draft, side) {
  if (!draft.weapons?.length) {
    // 区分两种情况：阵营数据仍在后台加载（会自动刷新，属过渡态）与
    // 数据卡确实缺少结构化武器字段（需要补充数据）。
    const entry = draft.entry || {};
    const factionId = entry.factionId || entry.faction || (entry.rosterSide ? state.rosters[entry.rosterSide]?.faction : "");
    const definition = factionId ? window.WarhammerFactionRegistry?.resolve(factionId) : null;
    if (definition && !hydratedCalculatorFactions.has(definition.id)) {
      return `<p class="calculator-missing">「${escapeHtml(definition.name)}」数据卡正在后台加载，完成后此处自动刷新，无需重新选择。</p>`;
    }
    return `<p class="calculator-missing">这张数据卡还没有结构化武器字段，暂时无法计算。请补充数据卡 JSON 后再试。</p>`;
  }
  return `<div class="calculator-weapons"><div class="calculator-section-heading"><strong>武器与攻击参数</strong><small>当前模式：${state.attackMode === "ranged" ? "远程射击" : "近战"}；可勾选参与计算的武器；数量用于按模型分配近距离/手枪与其他远程武器</small></div>${draft.weapons.map((weapon, index) => calculatorWeaponControlMarkup(weapon, side, index, null, draft, draft.entry.name, "unit")).join("")}</div>`;
}

function calculatorWeaponControlMarkup(weapon, side, index, groupIndex = null, draft = null, sourceName = "", sourceKey = "unit") {
  const scope = groupIndex === null
    ? `data-calc-weapon-index="${index}"`
    : `data-calc-group-index="${groupIndex}" data-calc-group-weapon-index="${index}"`;
  const selectionGroup = String(weapon.selectionGroup || "").trim();
  const inputType = "checkbox";
  const selectionName = "";
  const selectionNote = selectionGroup ? ` · 档案：${escapeHtml(selectionGroup)}（最多选一项，可不选）` : "";
  const displayedSkill = isTorrentWeapon(weapon) ? "自动命中" : (weapon.skill ?? "4+");
  const sourceRules = draft && side === "attacker" && sourceName ? resolvedRuleEffects(draft, sourceName).attack || {} : {};
  const coreEffects = window.WarhammerKeywordDictionary.parse(weapon.abilities || []);
  const coreProfile = draft && side === "attacker" ? coreWeaponResolution(weapon, draft, sourceName) : null;
  const attackModifier = Number(sourceRules.attackModifier || 0) + Number(coreProfile?.attackModifier || 0);
  const strengthModifier = Number(sourceRules.strengthModifier || 0);
  const effectiveAttacks = attackModifier ? modifyDamageExpression(weapon.attacks, attackModifier) : "";
  const effectiveStrength = strengthModifier && Number.isFinite(Number(weapon.strength)) ? String(Number(weapon.strength) + strengthModifier) : "";
  const effectiveDamage = coreProfile?.damageModifier ? modifyDamageExpression(weapon.damage, coreProfile.damageModifier) : "";
  const modifierNotes = [
    effectiveAttacks ? `有效攻击：A${effectiveAttacks}（${attackModifier > 0 ? "+" : ""}${attackModifier}）` : "",
    effectiveStrength ? `有效力量：S${effectiveStrength}（${strengthModifier > 0 ? "+" : ""}${strengthModifier}）` : "",
    effectiveDamage ? `有效伤害：D${effectiveDamage}（热熔 +${coreProfile.damageModifier}）` : "",
    coreProfile?.hitModifier ? `通用命中修正：${coreProfile.hitModifier > 0 ? "+" : ""}${coreProfile.hitModifier}` : "",
    coreProfile?.woundModifier ? `通用造伤修正：+${coreProfile.woundModifier}` : "",
    coreProfile && !coreProfile.canAttack ? coreProfile.ineligibilityReasons.join("；") : "",
    coreProfile?.isExtraAttacks ? "额外攻击：可与模型的一件其他近战武器一同选择" : "",
  ].filter(Boolean).join(" · ");
  const coreControls = side === "attacker" ? [
    coreEffects.some((effect) => effect.type === "one-shot") ? `<label class="check-row"><input type="checkbox" data-calc-side="${side}" ${scope} data-calc-weapon-one-shot-used ${weapon.oneShotUsed ? "checked" : ""} /><span>这件[单发]武器本场已经使用</span></label>` : "",
    coreEffects.some((effect) => effect.type === "precision") ? `<label class="check-row"><input type="checkbox" data-calc-side="${side}" ${scope} data-calc-weapon-precision-target ${weapon.precisionTargetsCharacter ? "checked" : ""} /><span>使用[精准]优先向可见角色分配伤害</span></label>` : "",
  ].filter(Boolean).join("") : "";
  const currentClass = weapon.type === state.attackMode ? "is-current" : "";
  const ineligibleClass = coreProfile && !coreProfile.canAttack ? "is-ineligible" : "";
  return `<div class="calculator-weapon ${currentClass} ${ineligibleClass}"><label class="check-row"><input type="${inputType}"${selectionName} data-calc-side="${side}" ${scope} data-calc-weapon-enabled ${weapon.enabled !== false ? "checked" : ""} /><span>${escapeHtml(weapon.name || `武器 ${index + 1}`)} · ${weapon.type === "melee" ? "近战" : "远程"}${selectionNote}</span></label><div class="calculator-weapon-fields"><label>数量<input type="number" min="0" data-calc-side="${side}" ${scope} data-calc-weapon-count value="${escapeHtml(weapon.modelCount ?? 1)}" /></label><label>攻击<input data-calc-side="${side}" ${scope} data-calc-weapon-field="attacks" value="${escapeHtml(weapon.attacks ?? "1")}" /></label><label>命中<input data-calc-side="${side}" ${scope} data-calc-weapon-field="skill" value="${escapeHtml(displayedSkill)}" /></label><label>力量<input type="number" data-calc-side="${side}" ${scope} data-calc-weapon-field="strength" value="${escapeHtml(weapon.strength ?? "0")}" /></label><label>AP<input type="number" data-calc-side="${side}" ${scope} data-calc-weapon-field="ap" value="${escapeHtml(weapon.ap ?? "0")}" /></label><label>伤害<input data-calc-side="${side}" ${scope} data-calc-weapon-field="damage" value="${escapeHtml(weapon.damage ?? "1")}" /></label></div>${modifierNotes ? `<small class="weapon-modifiers">${escapeHtml(modifierNotes)}</small>` : ""}<small class="weapon-keywords">${escapeHtml((weapon.abilities || []).join("、") || "无关键词")}</small>${coreControls ? `<div class="calculator-core-weapon-controls">${coreControls}</div>` : ""}${draft ? calculatorWeaponRerollMarkup(weapon, draft, side, sourceName, sourceKey, index) : ""}</div>`;
}

function calculatorJoinedMembersMarkup(draft, side) {
  if (!draft.joinedMembers?.length) return "";
  const isModelProfiles = draft.compositionMode === "modelProfiles";
  const note = isModelProfiles
    ? "队长与普通队员分开计算；可分别调整数量、属性和武器"
    : side === "defender" ? "护卫先承伤，角色最后承伤；可分别调整属性" : "联合单位中的角色和护卫都会参与本次攻击；可分别调整数量";
  const selectedId = draft.entry?.rosterUnit?.id;
  const members = draft.joinedMembers.map((member, index) => {
    const selected = member.id === selectedId;
    const weapons = selected ? draft.weapons : member.weapons;
    const weaponMarkup = weapons?.length
      ? `<div class="calculator-member-weapons"><strong>武器</strong>${weapons.map((weapon, weaponIndex) => calculatorWeaponControlMarkup(weapon, side, weaponIndex, selected ? null : index, draft, member.name, selected ? "unit" : `member-${index}`)).join("")}</div>`
      : `<small class="weapon-keywords">武器：未结构化提取</small>`;
    return `<div class="calculator-joined-member"><div class="calculator-joined-member-heading"><strong>${escapeHtml(member.name)} · ${escapeHtml(member.role || "组成模型")}</strong><label>模型数量<input type="number" min="1" data-calc-side="${side}" data-calc-group-index="${index}" data-calc-group-model-count value="${escapeHtml(member.modelCount)}" /></label></div><div class="calculator-stats">${[["toughness", "坚韧"], ["save", "护甲"], ["invulnerableSave", "特殊保护"], ["woundsPerModel", "W/模型"]].map(([field, title]) => `<label>${title}<input data-calc-side="${side}" data-calc-group-index="${index}" data-calc-group-stat="${field}" value="${escapeHtml(calculatorStat(member.unit, field, field === "invulnerableSave" ? 0 : ""))}" /></label>`).join("")}</div>${weaponMarkup}</div>`;
  }).join("");
  return `<div class="calculator-joined-members"><div class="calculator-section-heading"><strong>${isModelProfiles ? "单位成员" : "联合单位成员"}</strong><small>${note}</small></div>${members}${calculatorAbilityMarkup(draft, side)}</div>`;
}

function calculatorDetailMarkup(side, index = 0) {
  const draft = getCalculatorDraft(side, index);
  const label = side === "attacker" ? "进攻方" : "防守方";
  if (!draft) return `<article class="calculator-side is-empty"><h3>${label}</h3><p>请选择${label}单位。</p></article>`;
  const unit = draft.unit || {};
  const combined = Boolean(draft.joinedMembers?.length);
  if (combined) return `<article class="calculator-side ${side}"><div class="calculator-side-heading"><div><span>${label} · ${draft.source}</span><h3>${draft.compositionMode === "modelProfiles" ? escapeHtml(draft.entry.name) : "联合单位"}</h3></div></div>${calculatorDetachmentMarkup(draft, side)}${calculatorJoinedMembersMarkup(draft, side)}</article>`;
  const stats = [["movement", "移速"], ["toughness", "坚韧"], ["save", "护甲"], ["invulnerableSave", "特殊保护"], ["woundsPerModel", "W/模型"], ["leadership", "领导"], ["objectiveControl", "OC"]];
  return `<article class="calculator-side ${side}"><div class="calculator-side-heading"><div><span>${label} · ${draft.source}</span><h3>${escapeHtml(draft.entry.name)}</h3></div><label>模型数量<input type="number" min="1" data-calc-side="${side}" data-calc-model-count value="${escapeHtml(draft.modelCount)}" /></label></div><div class="calculator-stats">${stats.map(([field, title]) => `<label>${title}<input data-calc-side="${side}" data-calc-stat="${field}" value="${escapeHtml(calculatorStat(unit, field, field === "invulnerableSave" ? 0 : ""))}" /></label>`).join("")}</div>${calculatorDetachmentMarkup(draft, side)}${calculatorAbilityMarkup(draft, side)}${calculatorWeaponMarkup(draft, side)}</article>`;
}

function renderCalculatorDetails() {
  const container = $("#calculatorDetails");
  if (!container) return;
  const detailOpenStates = [...container.querySelectorAll("details")].map((details) => details.open);
  const attackers = calculatorSelectionKeys("attacker").map((_, index) => calculatorDetailMarkup("attacker", index)).join("");
  const defenders = calculatorSelectionKeys("defender").map((_, index) => calculatorDetailMarkup("defender", index)).join("");
  container.innerHTML = `<div class="calculator-detail-grid">${attackers}${defenders}</div>`;
  [...container.querySelectorAll("details")].forEach((details, index) => {
    details.open = detailOpenStates[index] ?? false;
  });
  const sides = [...container.querySelectorAll(".calculator-side")];
  const attackerCount = calculatorSelectionKeys("attacker").length;
  sides.slice(0, attackerCount).forEach((element, index) => { element.dataset.calculatorUnitIndex = index; });
  sides.slice(attackerCount).forEach((element, index) => { element.dataset.calculatorUnitIndex = index; });
}

function updateCalculatorDraftFromControl(control) {
  const side = control.dataset.calcSide;
  const unitIndex = Number(control.closest("[data-calculator-unit-index]")?.dataset.calculatorUnitIndex || 0);
  const draft = state.calculatorDrafts[side]?.[unitIndex];
  if (!draft) return;
  const value = control.type === "checkbox" || control.type === "radio" ? control.checked : control.value;
  if (control.dataset.calcDetachment !== undefined) {
    const ids = new Set(draft.detachmentIds || []);
    if (control.checked) ids.add(control.dataset.calcDetachment);
    else ids.delete(control.dataset.calcDetachment);
    draft.detachmentIds = [...ids];
    const selectedDetachments = window.WarhammerRuleResolver?.rulesForDetachments(draft.entry?.faction, draft.detachmentIds).detachments || [];
    const validEnhancements = new Set(selectedDetachments.flatMap((detachment) => detachment.enhancements.map((item) => item.id)));
    const enhancementById = new Map(selectedDetachments.flatMap((detachment) => detachment.enhancements || []).map((enhancement) => [enhancement.id, enhancement]));
    const targetsById = new Map(calculatorDetachmentAssignmentTargets(draft).map((target) => [target.id, target]));
    Object.keys(draft.enhancementAssignments || {}).forEach((targetId) => {
      const enhancement = enhancementById.get(draft.enhancementAssignments[targetId]);
      const target = targetsById.get(targetId);
      if (!enhancement || !target || !calculatorEnhancementEligibleForTarget(enhancement, target)) {
        draft.enhancementAssignments[targetId] = "";
        const rosterTarget = draft.entry?.group?.units.find((unit) => unit.id === targetId) || (draft.entry?.rosterUnit?.id === targetId ? draft.entry.rosterUnit : null);
        if (rosterTarget) {
          rosterTarget.enhancementId = "";
          rosterTarget.enhancementName = "";
          rosterTarget.enhancement = "";
        }
      }
    });
    if (draft.entry?.rosterUnit) {
      const roster = state.rosters[draft.entry.rosterSide];
      roster.detachmentIds = [...draft.detachmentIds];
      roster.detachmentNames = selectedDetachments.map((detachment) => detachment.name);
      roster.detachmentDp = selectedDetachments.reduce((total, detachment) => total + Number(detachment.dp || 0), 0);
      roster.groups.flatMap((group) => group.units).forEach((unit) => {
        if (unit.enhancementId && !validEnhancements.has(unit.enhancementId)) {
          unit.enhancementId = "";
          unit.enhancementName = "";
          unit.enhancement = "";
        }
      });
      ["attacker", "defender"].forEach((draftSide) => (state.calculatorDrafts[draftSide] || []).filter(Boolean).forEach((candidate) => {
        if (candidate.entry?.rosterId !== draft.entry.rosterId) return;
        candidate.detachmentIds = [...draft.detachmentIds];
        Object.keys(candidate.enhancementAssignments || {}).forEach((targetId) => {
          if (!validEnhancements.has(candidate.enhancementAssignments[targetId])) candidate.enhancementAssignments[targetId] = "";
        });
      }));
      saveRosters();
    }
  }
  if (control.dataset.calcEnhancement !== undefined) {
    const targetId = control.dataset.calcEnhancementTarget || "standalone";
    draft.enhancementAssignments ||= {};
    draft.enhancementAssignments[targetId] = control.value || "";
    if (draft.entry?.rosterUnit) {
      const target = draft.entry.group?.units.find((unit) => unit.id === targetId) || (draft.entry.rosterUnit.id === targetId ? draft.entry.rosterUnit : null);
      const enhancement = window.WarhammerRuleResolver?.rulesForDetachments(draft.entry.faction, draft.detachmentIds).detachments
        .flatMap((detachment) => detachment.enhancements || []).find((item) => item.id === control.value);
      if (target) {
        target.enhancementId = enhancement?.id || "";
        target.enhancementName = enhancement?.name || "";
        target.enhancement = enhancement?.name || "";
        ["attacker", "defender"].forEach((draftSide) => (state.calculatorDrafts[draftSide] || []).filter(Boolean).forEach((candidate) => {
          if (candidate.entry?.rosterId === draft.entry.rosterId && candidate.enhancementAssignments) candidate.enhancementAssignments[targetId] = enhancement?.id || "";
        }));
        saveRosters();
      }
    }
  }
  if (control.dataset.calcModelCount !== undefined) {
    draft.modelCount = Math.max(1, Number(value) || 1);
    // 数量变化时同步剩余伤口，保证"严重损伤"等按剩余血量生效的技能正确。
    if (draft.remainingWoundsManual || !draft.entry?.rosterUnit) {
      draft.remainingWounds = Number(draft.unit.woundsPerModel || 1) * draft.modelCount;
    }
  }
  if (control.dataset.calcRule !== undefined) {
    draft.ruleSelections ||= {};
    draft.ruleSelections[control.dataset.calcRule] = control.type === "checkbox" ? Boolean(control.checked) : value;
    if (control.dataset.calcImpliesForceLeader) draft.ruleSelections[control.dataset.calcImpliesForceLeader] = control.type === "checkbox" ? Boolean(control.checked) : Boolean(value);
  }
  if (control.dataset.calcRerollFace !== undefined) {
    const key = control.dataset.calcRerollKey;
    const face = Number(control.value);
    draft.rerollSelections ||= {};
    const selection = draft.rerollSelections[key] ||= { configured: true, faces: [] };
    selection.configured = true;
    const faces = new Set((selection.faces || []).map(Number));
    if (control.checked) faces.add(face);
    else faces.delete(face);
    selection.faces = [...faces].filter((item) => item >= 1 && item <= 6).sort((a, b) => a - b);
  }
  if (control.dataset.calcStat) {
    const field = control.dataset.calcStat;
    draft.unit[field] = ["movement", "toughness", "save", "invulnerableSave", "woundsPerModel", "objectiveControl"].includes(field) ? Math.max(0, Number(value) || 0) : value;
    if (field === "woundsPerModel") {
      // 计算页直接修改 W/模型 时按"每模型 W × 模型数"刷新剩余伤口，
      // 让严重损伤(剩余 1-N 时命中 -1)立即生效；军表单位此后以本页数值为准。
      draft.remainingWounds = Math.max(1, Number(draft.unit.woundsPerModel) || 1) * Math.max(1, Number(draft.modelCount || 1));
      draft.remainingWoundsManual = true;
    }
  }
  if (control.dataset.calcGroupIndex !== undefined) {
    const member = draft.joinedMembers?.[Number(control.dataset.calcGroupIndex)];
    if (member) {
      if (control.dataset.calcGroupModelCount !== undefined) {
        member.modelCount = Math.max(1, Number(value) || 1);
        if (draft.entry?.rosterUnit?.id === member.id) draft.modelCount = member.modelCount;
        if (member.remainingWoundsManual || !draft.entry?.rosterUnit) {
          member.remainingWounds = Number(member.unit.woundsPerModel || 1) * member.modelCount;
        }
      }
      if (control.dataset.calcGroupStat) {
        const field = control.dataset.calcGroupStat;
        member.unit[field] = Math.max(0, Number(value) || 0);
        if (draft.entry?.rosterUnit?.id === member.id) draft.unit[field] = member.unit[field];
        if (field === "woundsPerModel") {
          member.remainingWounds = Math.max(1, Number(member.unit.woundsPerModel) || 1) * Math.max(1, Number(member.modelCount || 1));
          member.remainingWoundsManual = true;
        }
      }
      if (control.dataset.calcGroupWeaponIndex !== undefined) {
        const weapon = member.weapons?.[Number(control.dataset.calcGroupWeaponIndex)];
        if (weapon) {
          if (control.dataset.calcWeaponEnabled !== undefined) setCalculatorWeaponEnabled(member.weapons, Number(control.dataset.calcGroupWeaponIndex), value);
          if (control.dataset.calcWeaponCount !== undefined) weapon.modelCount = Math.max(0, Number(value) || 0);
          if (control.dataset.calcWeaponField) weapon[control.dataset.calcWeaponField] = value;
          if (control.dataset.calcWeaponOneShotUsed !== undefined) weapon.oneShotUsed = Boolean(control.checked);
          if (control.dataset.calcWeaponPrecisionTarget !== undefined) weapon.precisionTargetsCharacter = Boolean(control.checked);
        }
      }
    }
  }
  if (control.dataset.calcWeaponIndex !== undefined) {
    const weapon = draft.weapons[Number(control.dataset.calcWeaponIndex)];
    if (!weapon) return;
    if (control.dataset.calcWeaponEnabled !== undefined) setCalculatorWeaponEnabled(draft.weapons, Number(control.dataset.calcWeaponIndex), value);
    if (control.dataset.calcWeaponCount !== undefined) weapon.modelCount = Math.max(0, Number(value) || 0);
    if (control.dataset.calcWeaponField) weapon[control.dataset.calcWeaponField] = value;
    if (control.dataset.calcWeaponOneShotUsed !== undefined) weapon.oneShotUsed = Boolean(control.checked);
    if (control.dataset.calcWeaponPrecisionTarget !== undefined) weapon.precisionTargetsCharacter = Boolean(control.checked);
  }
}

$("#calculatorDetails")?.addEventListener("input", (event) => updateCalculatorDraftFromControl(event.target));
$("#calculatorDetails")?.addEventListener("change", (event) => { updateCalculatorDraftFromControl(event.target); renderCalculatorDetails(); });

function parseSkill(value, fallback = 7) {
  const number = Number(String(value ?? "").replace("+", ""));
  return Number.isFinite(number) ? number : fallback;
}

function passiveAbilityText(value) {
  return String(value ?? "").split(/⚫|•/).filter((part) => !/(每场|每回合|一次性|使用时机|使用对象|使用本技能|消耗\s*\d*CP)/.test(part)).join(" ");
}

function activeAbilityText(value) {
  return String(value ?? "").split(/⚫|•/).filter((part) => /(每场|每回合|一次性|使用时机|使用对象|消耗\s*\d*CP)/.test(part)).join(" ");
}

function ruleContextForDraft(draft, unitName, overrides = {}) {
  const member = (draft.joinedMembers || []).find((candidate) => candidate.name === unitName);
  const modelCount = member?.modelCount ?? draft.modelCount;
  const initialModelCount = member?.initialModelCount ?? draft.initialModelCount ?? modelCount;
  return {
    phase: state.attackMode,
    isJoined: Boolean(draft.entry?.rosterUnit && draft.joinedMembers?.length),
    remainingWounds: member?.remainingWounds ?? draft.remainingWounds,
    underStartingStrength: modelCount < initialModelCount,
    belowHalfStrength: modelCount * 2 < initialModelCount,
    ...overrides,
  };
}

function enhancementIdsForUnit(draft, unitName, targetId = "") {
  const assignments = draft.enhancementAssignments || {};
  const eligibleTargets = calculatorDetachmentAssignmentTargets(draft);
  const eligibleIds = new Set(eligibleTargets.map((target) => target.id));
  const enhancements = new Map(calculatorSelectedEnhancements(draft).map((enhancement) => [enhancement.id, enhancement]));
  const validForTarget = (target) => {
    const enhancement = enhancements.get(assignments[target?.id]);
    return enhancement && calculatorEnhancementEligibleForTarget(enhancement, target) ? [enhancement.id] : [];
  };
  if (targetId) return validForTarget(eligibleTargets.find((target) => target.id === targetId));
  if (!draft.entry?.rosterUnit) return eligibleIds.has("standalone") ? validForTarget(eligibleTargets.find((target) => target.id === "standalone")) : [];
  const resolveName = (value) => window.WarhammerFactionRegistry?.resolveUnitName(draft.entry?.faction, value) || String(value || "");
  const wantedName = resolveName(unitName);
  const targets = draft.entry.group?.units || [draft.entry.rosterUnit];
  return targets
    .filter((unit) => eligibleIds.has(unit.id) && resolveName(unit.name) === wantedName)
    .flatMap((unit) => validForTarget(eligibleTargets.find((target) => target.id === unit.id)));
}

function resolvedRuleEffects(draft, unitName, overrides = {}, selectionOverrides = {}) {
  if (!window.WarhammerRuleResolver) return { attack: {}, defend: {}, notes: [] };
  const selections = { ...(draft.ruleSelections || {}), ...selectionOverrides };
  if (draft.side === "attacker") {
    const defender = getCalculatorDraft("defender");
    const targetKeywords = new Set([
      ...(defender?.data?.factionKeywords || []),
      ...(defender?.data?.keywords || []),
    ].map((keyword) => String(keyword).trim().toLowerCase()));
    const targetMonsterVehicle = ["凶兽", "巨兽", "monster", "载具", "vehicle"].some((keyword) => targetKeywords.has(keyword));
    const targetInfantry = ["步兵", "infantry"].some((keyword) => targetKeywords.has(keyword));
    const rules = window.WarhammerRuleResolver.rulesForUnit(draft.entry?.faction, unitName).unit || [];
    rules.forEach((rule) => {
      const effects = Array.isArray(rule.effects) ? rule.effects : (rule.effect ? [rule.effect] : []);
      if (effects.some((effect) => effect.requiresTargetMonsterVehicle)) selections[`${rule.id}.targetMonsterVehicle`] = targetMonsterVehicle;
      if (effects.some((effect) => effect.requiresTargetInfantry)) selections[`${rule.id}.targetInfantry`] = targetInfantry;
    });
  }
  return window.WarhammerRuleResolver.resolveUnitWithDetachments(
    draft.entry?.faction,
    unitName,
    draft.detachmentIds || [],
    enhancementIdsForUnit(draft, unitName),
    selections,
    ruleContextForDraft(draft, unitName, overrides),
  );
}

function resolvedUnitAndEnhancementEffects(draft, unitName, targetId, overrides = {}, selectionOverrides = {}) {
  if (!window.WarhammerRuleResolver?.resolveUnitWithEnhancements) return { attack: {}, defend: {}, notes: [] };
  return window.WarhammerRuleResolver.resolveUnitWithEnhancements(
    draft.entry?.faction,
    unitName,
    draft.detachmentIds || [],
    enhancementIdsForUnit(draft, unitName, targetId),
    { ...(draft.ruleSelections || {}), ...selectionOverrides },
    ruleContextForDraft(draft, unitName, { ...overrides, enhancementScope: "owner", unitEffectScope: "owner" }),
  );
}

function resolvedDetachmentRuleEffects(draft, overrides = {}) {
  if (!window.WarhammerRuleResolver?.resolveDetachments) return { attack: {}, defend: {}, notes: [] };
  const eligibleIds = new Set(calculatorDetachmentAssignmentTargets(draft).map((target) => target.id));
  return window.WarhammerRuleResolver.resolveDetachments(
    draft.entry?.faction,
    draft.detachmentIds || [],
    draft.ruleSelections || {},
    ruleContextForDraft(draft, draft.entry?.name, {
      ...overrides,
      enhancementIds: calculatorValidAssignedEnhancementIds(draft),
      enhancementScope: "unit",
    }),
  );
}

function resolvedFactionEffects(draft, overrides = {}) {
  if (!draft || !window.WarhammerRuleResolver?.resolveFaction) return { attack: {}, defend: {}, notes: [] };
  return window.WarhammerRuleResolver.resolveFaction(
    draft.entry?.faction,
    draft.ruleSelections || {},
    { phase: state.attackMode, ...overrides },
  );
}

function defenderEffectsFromUnit(unit, draft, unitName) {
  const resolvedName = unitName || unit?.name || draft?.entry?.name;
  const rules = draft ? resolvedRuleEffects(draft, resolvedName) : { defend: {} };
  const defend = { ...(rules.defend || {}) };
  if (draft && window.WarhammerRuleResolver) {
    // 阵营规则同样作用于防守单位：欧克兽人瓦戈！开启后获得 5+ 无敌豁免，
    // 属于阵营规则的 defend 效果，必须并入防守方 payload 才会进入豁免结算。
    const factionDefend = resolvedFactionEffects(draft, { unitName: resolvedName }).defend || {};
    const pickBest = (left, right) => (left && right ? Math.min(left, right) : left || right);
    defend.invulnerableSave = pickBest(defend.invulnerableSave, factionDefend.invulnerableSave);
    defend.feelNoPain = pickBest(defend.feelNoPain, factionDefend.feelNoPain);
    defend.feelNoPainMortal = pickBest(defend.feelNoPainMortal, factionDefend.feelNoPainMortal);
    defend.leaderFeelNoPain = pickBest(defend.leaderFeelNoPain, factionDefend.leaderFeelNoPain);
    defend.incomingDamageModifier = Number(defend.incomingDamageModifier || 0) + Number(factionDefend.incomingDamageModifier || 0);
    defend.damageOverride = defend.damageOverride || factionDefend.damageOverride;
    defend.damageMultiplier = defend.damageMultiplier || factionDefend.damageMultiplier;
    defend.saveReroll = defend.saveReroll || factionDefend.saveReroll;
  }
  const effects = emptyDefenderEffects();
  if (defend.feelNoPain) {
    effects.feelNoPainEnabled = true;
    effects.feelNoPainThreshold = defend.feelNoPain;
  }
  if (defend.feelNoPainMortal) {
    effects.feelNoPainMortalEnabled = true;
    effects.feelNoPainMortalThreshold = defend.feelNoPainMortal;
  }
  if (defend.leaderFeelNoPain) effects.leaderFeelNoPain = defend.leaderFeelNoPain;
  if (defend.damageOverride) effects.damageOverride = defend.damageOverride;
  if (defend.incomingDamageModifier) effects.incomingDamageModifier = defend.incomingDamageModifier;
  if (defend.damageMultiplier) effects.damageMultiplier = defend.damageMultiplier;
  if (defend.invulnerableSave) effects.ruleInvulnerableSave = defend.invulnerableSave;
  if (defend.saveBonusVsDamage1) effects.saveBonusVsDamage1 = true;
  if (defend.saveReroll) {
    effects.saveRerollAllEnabled = true;
    effects.saveRerollAllType = defend.saveReroll;
  }
  if (draft && window.WarhammerRuleResolver) {
    const resolvedUnitName = unitName || unit?.name || draft.entry?.name;
    const psychicSelections = {};
    const catalog = window.WarhammerRuleResolver.rulesForUnit(draft.entry?.faction, resolvedUnitName).unit || [];
    catalog.forEach((rule) => (rule.controls || [])
      .filter((control) => control.semanticType === "incoming-psychic")
      .forEach((control) => { psychicSelections[`${rule.id}.${control.id}`] = true; }));
    if (Object.keys(psychicSelections).length) {
      const psychicDefend = resolvedRuleEffects(draft, resolvedUnitName, {}, psychicSelections).defend || {};
      if (psychicDefend.feelNoPain) {
        effects.feelNoPainPsychicEnabled = true;
        effects.feelNoPainPsychicThreshold = psychicDefend.feelNoPain;
      }
    }
  }
  return effects;
}

function calculatorDataForUnit(unit, faction) {
  const card = findStructuredCalculatorCard(unit.name, faction);
  return getCalculatorCardData(card || { name: unit.name, faction });
}

function buildDefenderGroups(defender, draft, attackerFactionEffects = {}) {
  const group = defender?.group;
  const joined = defender?.rosterUnit && group && (group.category === "联合单位" || /^联合单位/.test(group.title || ""));
  if (!joined && draft?.compositionMode === "modelProfiles" && draft.joinedMembers?.length) {
    return draft.joinedMembers.map((member) => ({
      name: `${member.name}（${member.role}）`,
      modelCount: member.modelCount,
      wounds: Number(member.unit?.woundsPerModel || 1),
      save: Math.max(2, Number(member.unit?.save || 7) + Number(attackerFactionEffects.targetSaveModifier || 0)),
      invulnerableSave: Number(member.unit?.invulnerableSave || 0),
      allocationOrder: member.isPrimary ? 2 : 1,
      isCharacter: false,
      effects: defenderEffectsFromUnit(member.unit, draft, member.ruleName || member.name),
    })).sort((a, b) => a.allocationOrder - b.allocationOrder);
  }
  if (!joined) {
    return [{
      name: defender.name,
      modelCount: draft.modelCount,
      wounds: Number(draft.unit.woundsPerModel || 1),
      save: Math.max(2, Number(draft.unit.save || 7) + Number(attackerFactionEffects.targetSaveModifier || 0)),
      invulnerableSave: Number(draft.unit.invulnerableSave || 0),
      allocationOrder: 1,
      isCharacter: [...(draft.data?.keywords || []), ...(draft.data?.factionKeywords || [])].some((keyword) => /人物|character/i.test(String(keyword))),
      effects: defenderEffectsFromUnit(draft.unit, draft, defender.name),
    }];
  }
  const members = draft.joinedMembers?.length
    ? draft.joinedMembers
    : group.units.filter((unit) => activeModels(unit).length).map((unit) => {
      const memberData = calculatorDataForUnit(unit, defender.faction);
      const memberKeywords = [...(memberData?.keywords || []), ...(memberData?.factionKeywords || [])];
      return {
        id: unit.id,
        name: unit.name,
        role: /领导|主将|领袖|character|leader/i.test(String(unit.role || "")) ? "角色" : /护卫|bodyguard/i.test(String(unit.role || "")) ? "护卫" : (memberKeywords.some((keyword) => /人物|character/i.test(String(keyword))) ? "角色" : "护卫"),
        unit: memberData?.unit || {},
        modelCount: activeModels(unit).length,
        ruleName: unit.name,
      };
    });
  const grouped = members.map((member) => {
    const roleText = String(member.parentRole || member.role || "");
    const isLeader = /角色|领导|主将|领袖|character|leader/i.test(roleText) && !/护卫/.test(roleText);
    const isGuard = /护卫|bodyguard|普通队员/i.test(roleText);
    return {
      name: `${member.name}（${member.role}）`,
      modelCount: member.modelCount,
      wounds: Number(member.unit?.woundsPerModel || 1),
      save: Math.max(2, Number(member.unit?.save || 7) + Number(attackerFactionEffects.targetSaveModifier || 0)),
      invulnerableSave: Number(member.unit?.invulnerableSave || 0),
      allocationOrder: isGuard && !isLeader ? 1 : 2,
      isLeader,
      isCharacter: isLeader,
      effects: defenderEffectsFromUnit(member.unit, draft, member.ruleName || member.name),
    };
  });
  return window.WarhammerCombatState.applyLeaderGrantedDefenses(grouped)
    .map(({ isLeader, ...group }) => group)
    .sort((a, b) => a.allocationOrder - b.allocationOrder);
}

function buildMultiSelectedRoundPayload(attackerKeys, defenderKeys) {
  const savedSelections = {
    attacker: [...calculatorSelectionKeys("attacker")],
    defender: [...calculatorSelectionKeys("defender")],
  };
  const savedLegacy = { ...state.calculatorSelection };
  const savedDrafts = state.calculatorDrafts;
  const firstDefenderKey = defenderKeys[0];
  const weaponGroups = [];
  try {
    state.calculatorDrafts = { attacker: [], defender: [] };
    attackerKeys.forEach((key) => {
      state.calculatorSelections = { attacker: [key], defender: [firstDefenderKey] };
      state.calculatorSelection = { attacker: key, defender: firstDefenderKey };
      const payload = buildSelectedRoundPayload();
      const attackerEntry = getCalculatorEntry("attacker", key);
      weaponGroups.push(...payload.weaponGroups.map((group) => ({ ...group, name: `${attackerEntry?.name || "进攻单位"} · ${group.name}` })));
    });
    state.calculatorSelections = { attacker: [attackerKeys[0]], defender: [firstDefenderKey] };
    state.calculatorSelection = { attacker: attackerKeys[0], defender: firstDefenderKey };
    const firstAttackerDraft = getCalculatorDraft("attacker");
    const attackerFactionEffects = resolvedFactionEffects(firstAttackerDraft).attack || {};
    const defenderGroups = [];
    defenderKeys.forEach((key, index) => {
      state.calculatorSelections = { attacker: [attackerKeys[0]], defender: [key] };
      state.calculatorSelection = { attacker: attackerKeys[0], defender: key };
      const entry = getCalculatorEntry("defender", key);
      const draft = getCalculatorDraft("defender");
      if (!entry || !draft) return;
      buildDefenderGroups(entry, draft, attackerFactionEffects).forEach((group) => {
        defenderGroups.push({ ...group, allocationOrder: index * 100 + Number(group.allocationOrder || 1) });
      });
    });
    if (!weaponGroups.length || !defenderGroups.length) throw new Error("请先选择至少一个有效的进攻单位和防御目标。");
    return { simulations: 1000, weaponGroups, defenderGroups };
  } finally {
    state.calculatorSelections = { attacker: savedSelections.attacker, defender: savedSelections.defender };
    state.calculatorSelection = savedLegacy;
    state.calculatorDrafts = savedDrafts;
  }
}

function buildSelectedRoundPayload() {
  const attackerKeys = calculatorSelectionKeys("attacker").filter(Boolean);
  const defenderKeys = calculatorSelectionKeys("defender").filter(Boolean);
  if (attackerKeys.length === 1 && defenderKeys.length === 1) {
    state.calculatorSelection.attacker = attackerKeys[0];
    state.calculatorSelection.defender = defenderKeys[0];
  }
  if (attackerKeys.length > 1 || defenderKeys.length > 1) return buildMultiSelectedRoundPayload(attackerKeys, defenderKeys);
  const attacker = getCalculatorEntry("attacker");
  const defender = getCalculatorEntry("defender");
  if (!attacker || !defender) throw new Error("请先选择进攻单位和防御目标");
  const attackerDraft = getCalculatorDraft("attacker");
  const defenderDraft = getCalculatorDraft("defender");
  const attackerData = attackerDraft?.data || {};
  const defenderData = defenderDraft?.data || {};
  const attackerUnit = attackerDraft?.unit || {};
  const defenderUnit = defenderDraft?.unit || {};
  if (!attackerData?.unit || !Array.isArray(attackerData.weapons) || !attackerData.weapons.length) throw new Error(`进攻单位“${attacker.name}”没有可计算的结构化武器数据`);
  if (!defenderData?.unit || !defenderUnit.woundsPerModel) throw new Error(`防御单位“${defender.name}”没有可计算的属性数据`);
  const attackerFactionEffects = resolvedFactionEffects(attackerDraft).attack || {};
  const defenderFactionResolved = resolvedFactionEffects(defenderDraft);
  const defenderFactionEffects = defenderFactionResolved.attack || {};
  const defenderFactionDefend = defenderFactionResolved.defend || {};
  const defenderFactionHitModifier = window.WarhammerRuleEffects?.defenderAttackModifiers
    ? Number(window.WarhammerRuleEffects.defenderAttackModifiers(defenderFactionResolved, state.attackMode).hitModifier || 0)
    : (state.attackMode === "melee" ? Number(defenderFactionEffects.targetMeleeHitModifier || 0) : 0);
  const defenderRuleEffects = [defender.name, ...(defenderDraft.joinedMembers || []).map((member) => member.name)]
    .map((name) => resolvedRuleEffects(defenderDraft, name).defend || {})
    .reduce((result, effects) => ({
      incomingApModifier: Math.min(result.incomingApModifier, Number(effects.incomingApModifier || 0)),
      incomingHitModifier: Math.min(result.incomingHitModifier, Number(effects.incomingHitModifier || 0)),
      incomingWoundModifier: Math.min(result.incomingWoundModifier, Number(effects.incomingWoundModifier || 0)),
      incomingWoundWhenStrengthGreater: Math.min(result.incomingWoundWhenStrengthGreater, Number(effects.incomingWoundWhenStrengthGreater || 0)),
      incomingWoundWhenStrengthGreaterOrEqual: Math.min(result.incomingWoundWhenStrengthGreaterOrEqual, Number(effects.incomingWoundWhenStrengthGreaterOrEqual || 0)),
    }), {
      incomingApModifier: Number(defenderFactionDefend.incomingApModifier || 0),
      // Faction hit penalties are already folded into
      // defenderFactionHitModifier above; do not count them a second time.
      incomingHitModifier: 0,
      incomingWoundModifier: Number(defenderFactionDefend.incomingWoundModifier || 0),
      incomingWoundWhenStrengthGreater: Math.min(0, Number(defenderFactionDefend.incomingWoundWhenStrengthGreater || 0)),
      incomingWoundWhenStrengthGreaterOrEqual: Math.min(0, Number(defenderFactionDefend.incomingWoundWhenStrengthGreaterOrEqual || 0)),
    });
  const attackerSources = attackerDraft.joinedMembers?.length
    ? attackerDraft.joinedMembers.map((member) => member.id === attacker.rosterUnit?.id
      ? {
        id: attacker.rosterUnit?.id, name: attacker.name, unit: attackerUnit, weapons: attackerDraft.weapons, modelCount: attackerDraft.modelCount,
        initialModelCount: attackerDraft.initialModelCount, remainingWounds: attackerDraft.remainingWounds,
      }
      : member)
    : [{ name: attacker.name, unit: attackerUnit, weapons: attackerDraft.weapons, modelCount: attackerDraft.modelCount, initialModelCount: attackerDraft.initialModelCount, remainingWounds: attackerDraft.remainingWounds }];
  const sourceRuleContext = (source) => ({
    initialModelCount: source.initialModelCount,
    remainingWounds: source.remainingWounds,
    underStartingStrength: Number(source.modelCount || 0) < Number(source.initialModelCount || source.modelCount || 0),
    belowHalfStrength: Number(source.modelCount || 0) * 2 < Number(source.initialModelCount || source.modelCount || 0),
  });
  const sourceRuleEntries = attackerSources.map((source) => ({
    source,
    effects: resolvedUnitAndEnhancementEffects(attackerDraft, source.ruleName || source.name, source.parentId || source.id, sourceRuleContext(source)).attack || {},
  }));
  const sourceSharedRuleEntries = attackerSources.map((source) => ({
    source,
    effects: window.WarhammerRuleResolver.resolveUnitScoped(
      attackerDraft.entry?.faction,
      source.ruleName || source.name,
      "unit",
      attackerDraft.ruleSelections || {},
      ruleContextForDraft(attackerDraft, source.ruleName || source.name, sourceRuleContext(source)),
    ).attack || {},
  }));
  const detachmentSharedEffects = resolvedDetachmentRuleEffects(attackerDraft).attack || {};
  // Rules worded as applying to a leader's unit (for example Trajann's ignore
  // modifier, Aleya's under-strength bonus and Martial Master) are shared by
  // every model in an imported joined unit. Source-specific rules remain on
  // their own weapon profiles below.
  const sharedJoinedRules = sourceSharedRuleEntries.reduce((result, entry) => ({
    hitModifier: result.hitModifier + Number(entry.effects.hitModifier || 0),
    woundModifier: result.woundModifier + Number(entry.effects.woundModifier || 0),
    hitReroll: result.hitReroll || entry.effects.hitReroll || null,
    sustainedHits: Math.max(result.sustainedHits, Number(entry.effects.sustainedHits || 0)),
    lethalHits: result.lethalHits || Boolean(entry.effects.lethalHits),
    devastating: result.devastating || Boolean(entry.effects.devastating),
    attackModifier: result.attackModifier + Number(entry.effects.attackModifier || 0),
    rapidFireAttackModifier: result.rapidFireAttackModifier + Number(entry.effects.rapidFireAttackModifier || 0),
    strengthModifier: result.strengthModifier + Number(entry.effects.strengthModifier || 0),
    apModifier: result.apModifier + Number(entry.effects.apModifier || 0),
    damageModifier: result.damageModifier + Number(entry.effects.damageModifier || 0),
    damageReroll: result.damageReroll || Boolean(entry.effects.damageReroll),
    damageRerollMode: result.damageRerollMode || entry.effects.damageRerollMode || null,
    targetToughnessModifier: result.targetToughnessModifier + Number(entry.effects.targetToughnessModifier || 0),
    ignoreHitModifiers: result.ignoreHitModifiers || Boolean(entry.effects.ignoreHitModifiers),
    weaponAttackModifiers: [...result.weaponAttackModifiers, ...(entry.effects.weaponAttackModifiers || [])],
    hitCriticalThreshold: result.hitCriticalThreshold
      ? Math.min(result.hitCriticalThreshold, Number(entry.effects.hitCriticalThreshold || result.hitCriticalThreshold))
      : Number(entry.effects.hitCriticalThreshold || 0),
    woundCriticalThreshold: result.woundCriticalThreshold
      ? Math.min(result.woundCriticalThreshold, Number(entry.effects.woundCriticalThreshold || result.woundCriticalThreshold))
      : Number(entry.effects.woundCriticalThreshold || 0),
  }), {
    hitModifier: Number(detachmentSharedEffects.hitModifier || 0),
    woundModifier: Number(detachmentSharedEffects.woundModifier || 0),
    hitReroll: detachmentSharedEffects.hitReroll || null,
    sustainedHits: Number(detachmentSharedEffects.sustainedHits || 0),
    lethalHits: Boolean(detachmentSharedEffects.lethalHits),
    devastating: Boolean(detachmentSharedEffects.devastating),
    attackModifier: Number(detachmentSharedEffects.attackModifier || 0),
    rapidFireAttackModifier: Number(detachmentSharedEffects.rapidFireAttackModifier || 0),
    weaponAttackModifiers: [...(detachmentSharedEffects.weaponAttackModifiers || [])],
    strengthModifier: Number(detachmentSharedEffects.strengthModifier || 0),
    apModifier: Number(detachmentSharedEffects.apModifier || 0),
    damageModifier: Number(detachmentSharedEffects.damageModifier || 0),
    damageReroll: Boolean(detachmentSharedEffects.damageReroll),
    damageRerollMode: detachmentSharedEffects.damageRerollMode || null,
    targetToughnessModifier: Number(detachmentSharedEffects.targetToughnessModifier || 0),
    ignoreHitModifiers: Boolean(detachmentSharedEffects.ignoreHitModifiers),
    hitCriticalThreshold: Number(detachmentSharedEffects.hitCriticalThreshold || 0),
    woundCriticalThreshold: Number(detachmentSharedEffects.woundCriticalThreshold || 0),
  });
  const toughness = Math.max(1, Number(defenderUnit.toughness || 0) + Number(attackerFactionEffects.targetToughnessModifier || 0) + Number(sharedJoinedRules.targetToughnessModifier || 0));
  const weaponGroups = attackerSources.flatMap((source) => {
    const sourceRules = sourceRuleEntries.find((entry) => entry.source === source)?.effects || {};
    const sourceKey = !attackerDraft.joinedMembers.length || (source.id && source.id === attacker.rosterUnit?.id) ? "unit" : `member-${attackerDraft.joinedMembers.indexOf(source)}`;
    const sourceFactionEffects = resolvedFactionEffects(attackerDraft, { unitName: source.ruleName || source.name }).attack || {};
    const sourceWeapons = source.weapons || [];
    if (state.attackMode === "ranged" && !state.combatContext.attackerEngaged && !calculatorSourceIsMonsterVehicle(attackerDraft, source.ruleName || source.name)) {
      const selected = sourceWeapons.filter((weapon) => weapon.enabled !== false && weapon.type === "ranged");
      const carrying = (weapon) => Number(weapon.modelsCarrying ?? weapon.modelCount ?? source.modelCount ?? 1);
      const closeRangeModelCounts = selected
        .filter((weapon) => window.WarhammerKeywordDictionary.parse(weapon.abilities || []).some((effect) => effect.type === "close-range" || effect.type === "pistol"))
        .map(carrying);
      const otherModelCounts = selected
        .filter((weapon) => !window.WarhammerKeywordDictionary.parse(weapon.abilities || []).some((effect) => effect.type === "close-range" || effect.type === "pistol"))
        .map(carrying);
      const allocation = window.WarhammerCombatState.validateRangedWeaponAllocation({ modelCount: source.modelCount, closeRangeModelCounts, otherModelCounts });
      if (!allocation.valid) throw new Error(`${source.name} 的近距离/手枪武器组使用 ${allocation.closeRangeModels} 个模型，其他远程武器组使用 ${allocation.otherModels} 个模型，超过当前 ${allocation.modelCount} 个模型；同一模型在常规射击时必须二选一`);
    }
    if (state.attackMode === "melee") {
      const selected = sourceWeapons.filter((weapon) => weapon.enabled !== false && weapon.type === "melee");
      const carrying = (weapon) => Number(weapon.modelsCarrying ?? weapon.modelCount ?? source.modelCount ?? 1);
      const extraAttackModelCounts = selected
        .filter((weapon) => window.WarhammerKeywordDictionary.parse(weapon.abilities || []).some((effect) => effect.type === "extra-attacks"))
        .map(carrying);
      const otherModelCounts = selected
        .filter((weapon) => !window.WarhammerKeywordDictionary.parse(weapon.abilities || []).some((effect) => effect.type === "extra-attacks"))
        .map(carrying);
      const allocation = window.WarhammerCombatState.validateMeleeWeaponAllocation({ modelCount: source.modelCount, extraAttackModelCounts, otherModelCounts });
      if (!allocation.valid) throw new Error(`${source.name} 的普通近战武器组使用 ${allocation.otherModels} 个模型，超过当前 ${allocation.modelCount} 个模型；每个模型可以使用所有[额外攻击]武器，但至多再选择一件其他近战武器`);
    }
    const groups = sourceWeapons.map((weapon, weaponIndex) => ({
      weapon,
      weaponIndex,
      coreProfile: coreWeaponResolution(weapon, attackerDraft, source.ruleName || source.name),
    }))
      .filter(({ weapon, coreProfile }) => weapon.enabled !== false && weapon.type === state.attackMode && Number(weapon.modelCount ?? source.modelCount ?? 1) > 0 && coreProfile.canAttack)
      .map(({ weapon, weaponIndex, coreProfile }) => {
      const scopedAttackModifier = window.WarhammerCombatState.weaponAttackModifier(
        [...(sourceRules.weaponAttackModifiers || []), ...(sharedJoinedRules.weaponAttackModifiers || []), ...(sourceFactionEffects.weaponAttackModifiers || [])],
        weapon.name,
      );
      const rapidFireAttackModifier = coreProfile.effects.some((effect) => effect.type === "rapid-fire")
        ? Number(sourceRules.rapidFireAttackModifier || 0) + Number(sharedJoinedRules.rapidFireAttackModifier || 0) + Number(sourceFactionEffects.rapidFireAttackModifier || 0)
        : 0;
      const generalAttackModifier = Number(sourceRules.attackModifier || 0) + Number(sharedJoinedRules.attackModifier || 0)
        + Number(sourceFactionEffects.attackModifier || 0)
        + rapidFireAttackModifier
        + scopedAttackModifier
        + Number(coreProfile.attackModifier || 0);
      const resolvedAttackOverride = sourceRules.weaponAttackOverride || sourceFactionEffects.weaponAttackOverride;
      const attackOverride = resolvedAttackOverride?.name === weapon.name
        ? resolvedAttackOverride.value
        : modifyDamageExpression(modifyDamageExpression(weapon.attacks, coreProfile.attackExpressionModifier || 0), generalAttackModifier);
      const ignoresHitModifiers = Boolean(sourceRules.ignoreHitModifiers || sharedJoinedRules.ignoreHitModifiers || sourceFactionEffects.ignoreHitModifiers);
      const hitContributions = [
        Number(sourceRules.hitModifier || 0),
        Number(sharedJoinedRules.hitModifier || 0),
        Number(sourceFactionEffects.hitModifier || 0),
        ignoresHitModifiers ? 0 : Number(defenderFactionHitModifier || 0),
        ignoresHitModifiers ? 0 : Number(defenderRuleEffects.incomingHitModifier || 0),
        Number(coreProfile.hitModifier || 0),
      ].filter((value) => !(coreProfile.ignoreNegativeHitModifiers && value < 0));
      const hitModifier = hitContributions.reduce((sum, value) => sum + value, 0);
      const effectiveStrength = Number(weapon.strength || 0) + Number(sourceRules.strengthModifier || 0) + Number(sharedJoinedRules.strengthModifier || 0) + Number(sourceFactionEffects.strengthModifier || 0);
      const conditionalWoundModifier = effectiveStrength > toughness
        ? (defenderRuleEffects.incomingWoundWhenStrengthGreater < 0
          ? defenderRuleEffects.incomingWoundWhenStrengthGreater
          : defenderRuleEffects.incomingWoundWhenStrengthGreaterOrEqual)
        : (effectiveStrength === toughness ? defenderRuleEffects.incomingWoundWhenStrengthGreaterOrEqual : 0);
      const woundModifier = window.WarhammerCombatState.composeWoundModifier({
        unitModifier: Number(sourceRules.woundModifier || 0) + Number(sharedJoinedRules.woundModifier || 0),
        factionModifier: sourceFactionEffects.woundModifier,
        incomingModifier: defenderRuleEffects.incomingWoundModifier,
        conditionalModifier: conditionalWoundModifier + Number(coreProfile.woundModifier || 0),
      });
      const hitThreshold = isTorrentWeapon(weapon) ? 7 : parseSkill(weapon.skill);
      const woundThreshold = woundTarget(effectiveStrength, toughness);
      const resolvedHitState = window.WarhammerCombatState.resolveHit({
        baseTarget: hitThreshold <= 6 ? hitThreshold : 0,
        modifiers: [{ sourceId: "combat.resolved-hit-modifier", value: hitModifier }],
        reroll: { mode: "failed" },
        minimumUnmodifiedHit: coreProfile.unmodifiedHitThreshold,
      });
      // 重投来源与 UI 骰面框共用同一计划与归约（见 calculatorRerollPlan）。
      const rerollPlan = calculatorRerollPlan(attackerDraft, source.ruleName || source.name, weapon, coreProfile);
      const effectiveHitReroll = coreProfile.preventHitRerolls
        ? { type: "none", values: [] }
        : composeRerollSelection(attackerDraft, rerollPlan.hit, "hit", sourceKey, weaponIndex, resolvedHitState.effectiveTarget);
      const woundReroll = composeRerollSelection(attackerDraft, rerollPlan.wound, "wound", sourceKey, weaponIndex, woundThreshold);
      return {
        name: `${source.name} · ${weapon.name}`,
        modelCount: Number(weapon.modelCount ?? source.modelCount ?? 1),
        attacks: attackOverride,
        hit: isTorrentWeapon(weapon) ? "torrent" : hitThreshold,
        wound: woundThreshold,
        ap: Math.max(0, Math.abs(Number(weapon.ap || 0)) + Number(sourceRules.apModifier || 0) + Number(sharedJoinedRules.apModifier || 0) + Number(sourceFactionEffects.apModifier || 0) + defenderRuleEffects.incomingApModifier),
        damage: modifyDamageExpression(weapon.damage, Number(sourceRules.damageModifier || 0) + Number(sharedJoinedRules.damageModifier || 0) + Number(sourceFactionEffects.damageModifier || 0) + Number(coreProfile.damageModifier || 0)),
        effects: weaponEffectsFromKeywords(weapon, { hitReroll: effectiveHitReroll }, { ...sourceRules, sustainedHits: Math.max(Number(sourceRules.sustainedHits || 0), Number(sharedJoinedRules.sustainedHits || 0), Number(sourceFactionEffects.sustainedHits || 0)), lethalHits: Boolean(sourceRules.lethalHits || sharedJoinedRules.lethalHits || sourceFactionEffects.lethalHits), devastating: Boolean(sourceRules.devastating || sharedJoinedRules.devastating || sourceFactionEffects.devastating), damageReroll: Boolean(sourceRules.damageReroll || sharedJoinedRules.damageReroll || sourceFactionEffects.damageReroll), damageRerollMode: sourceRules.damageRerollMode || sharedJoinedRules.damageRerollMode || sourceFactionEffects.damageRerollMode, woundReroll: woundReroll.type, woundRerollValues: woundReroll.values, hitCriticalThreshold: sourceRules.hitCriticalThreshold || sharedJoinedRules.hitCriticalThreshold || sourceFactionEffects.hitCriticalThreshold, woundCriticalThreshold: sourceRules.woundCriticalThreshold || sharedJoinedRules.woundCriticalThreshold || sourceFactionEffects.woundCriticalThreshold }, { hitModifier: resolvedHitState.modifierTotal, woundModifier, targetKeywords: [...(defenderData.factionKeywords || []), ...(defenderData.keywords || [])], coreProfile }),
      };
    });
    return sourceRules.repeatRanged || sourceFactionEffects.repeatRanged ? [...groups, ...groups.map((group) => ({ ...group, name: `${group.name}（枪林弹雨）` }))] : groups;
  });
  if (!weaponGroups.length) throw new Error(`进攻单位“${attacker.name}”没有当前条件下可使用的${state.attackMode === "ranged" ? "远程" : "近战"}武器，请检查突进、交战、曲射或单发状态`);
  return { simulations: 1000, weaponGroups, defenderGroups: buildDefenderGroups(defender, defenderDraft, attackerFactionEffects) };
}

function unitOverviewMarkup(unit, side, groupId) {
  const models = activeModels(unit);
  if (!models.length) return "";
  const equipment = countEquipment(unit);
  const equipmentMarkup = Object.entries(equipment).map(([name, count]) => `<li>· ${count}x ${escapeHtml(name)}</li>`).join("");
  return `<article class="roster-unit-summary ${side}" data-open-unit data-side="${side}" data-group-id="${groupId}" data-unit-id="${unit.id}">
    <button class="unit-summary-open" type="button"><div><strong>${escapeHtml(unit.name)}${unit.points ? `(${escapeHtml(unit.points)}分)` : ""}</strong>${unit.role ? `<small>进行联合的单位：${escapeHtml(unit.role)}</small>` : ""}${unit.enhancement ? `<small>强化：${escapeHtml(unit.enhancement)}</small>` : ""}</div><span>查看详情 →</span></button>
    ${unit.hasComposition ? `<p>单位组成：${models.length}x ${escapeHtml(unit.name)}</p>` : ""}
    ${equipmentMarkup ? `<ul class="equipment-summary">${equipmentMarkup}</ul>` : ""}
  </article>`;
}

function renderRosterWarnings() {
  const container = $("#rosterWarnings");
  if (!container) return;
  const unmatched = ["attacker", "defender"].flatMap((side) => {
    const definition = window.WarhammerFactionRegistry?.resolve(state.rosters[side].faction);
    const hasFactionCards = Boolean(definition && hydratedCalculatorFactions.has(definition.id));
    return hasFactionCards ? getRosterUnits(state.rosters[side])
      .filter((unit) => !findStructuredCalculatorCard(unit.name, state.rosters[side].faction))
      .map((unit) => ({ side, name: unit.name })) : [];
  });
  if (!unmatched.length) {
    container.hidden = true;
    container.innerHTML = "";
    return;
  }
  const names = unmatched.map(({ side, name }) => `${sideLabel(side)}：${name}`);
  container.hidden = false;
  container.innerHTML = `<div class="roster-warning-heading"><strong>有单位未匹配到数据卡</strong><button type="button" class="text-button" data-copy-unmatched>复制全部名称</button></div><p>这些单位仍会保留在军表中，但暂时不能自动带入完整属性。请复制名称后反馈，我会补充中文别名或数据卡。</p><textarea readonly rows="${Math.min(8, names.length)}" data-unmatched-names>${escapeHtml(names.join("\n"))}</textarea>`;
}

function renderRosters() {
  const battle = $("#battleRoster");
  const overview = $("#rosterOverview");
  const allUnits = ["attacker", "defender"].flatMap((side) => getRosterUnits(state.rosters[side]).map((unit) => ({ unit, side })));
  const livingUnits = allUnits.filter(({ unit }) => activeModels(unit).length);
  if (battle) battle.innerHTML = livingUnits.length ? livingUnits.map(({ unit, side }) => {
    const models = activeModels(unit);
    const totalWounds = models.reduce((sum, model) => sum + model.currentWounds, 0);
    const maxWounds = models.reduce((sum, model) => sum + model.maximumWounds, 0);
    const ratio = maxWounds ? Math.round((totalWounds / maxWounds) * 100) : 0;
    return `<article class="unit-card ${side}"><div class="unit-top"><span class="faction-dot ${side === "attacker" ? "gold" : "red"}"></span><span class="unit-role">${escapeHtml(sideLabel(side))}</span></div><h4>${escapeHtml(unit.name)}</h4><p>${models.length} 个存活模型 · ${escapeHtml(Object.entries(countEquipment(unit)).map(([name, count]) => `${count}x ${name}`).join(" · ") || "无装备")}</p><div class="stat-row"><span>剩余血量</span><strong>${totalWounds} / ${maxWounds}</strong></div><div class="health-bar ${side === "defender" ? "red" : ""}"><span style="width:${ratio}%"></span></div></article>`;
  }).join("") : '<div class="library-empty">导入双方军表后会在这里显示全部单位。</div>';
  if (overview) overview.innerHTML = ["attacker", "defender"].map((side) => {
    const roster = state.rosters[side];
    const groupMarkup = roster.groups.map((group) => {
      const units = group.units.map((unit) => unitOverviewMarkup(unit, side, group.id)).join("");
      return units ? `<section class="roster-group"><h3>${escapeHtml(group.title)}</h3>${units}</section>` : "";
    }).join("");
    const groups = groupMarkup || '<div class="library-empty">没有存活模型</div>';
    const detachmentSummary = roster.detachmentNames?.length ? `${roster.detachmentNames.join(" + ")}（${Number(roster.detachmentDp || 0)}DP）` : "未启用分遣队";
    return `<section class="roster-side ${side}"><div class="roster-heading"><div><span>${sideLabel(side)}</span><strong>${escapeHtml(roster.name)}</strong></div><small>${escapeHtml(roster.faction || "未识别阵营")} · ${escapeHtml(detachmentSummary)}</small></div>${groups}</section>`;
  }).join("");
  const attackers = state.rosters.attacker;
  const defenders = state.rosters.defender;
  $("#battleTitle").innerHTML = `${escapeHtml(attackers.faction || attackers.name)} <span>vs</span> ${escapeHtml(defenders.faction || defenders.name)}`;
  $("#attackerSummary").textContent = attackers.groups.length ? `${attackers.name} · ${getRosterUnits(attackers).length} 单位` : "未设置";
  $("#defenderSummary").textContent = defenders.groups.length ? `${defenders.name} · ${getRosterUnits(defenders).length} 单位` : "未设置";
  renderRosterWarnings();
  renderCalculatorSelectors();
}

async function getDatasheetPreview(faction, unitName) {
  if (!state.calculatorCards.length) await loadCalculatorCards();
  try {
    await ensureFactionRuntimeLoaded(faction);
  } catch (error) {
    console.error(error);
  }
  const factionCanonical = window.WarhammerAliasRegistry?.resolveUnit(faction, unitName) || "";
  const names = [...new Set([...unitNameCandidates(unitName, faction), ...(factionCanonical && factionCanonical !== unitName ? [factionCanonical] : [])].filter(Boolean))];
  const normalizeName = (value) => String(value || "")
    .replace(/[\s\u00a0·•・,，。.!！:：;；/\\_\-—–]/g, "")
    .replace(/[（(][^）)]*[）)]/g, "")
    .toLowerCase();
  const normalizedNames = new Set(names.map(normalizeName).filter(Boolean));
  const matchesName = (card) => {
    if (!card?.structured || !card.data?.unit) return false;
    if (!datasheetFactionMatches(faction, card.faction)) return false;
    return [card.name, card.data.unit.name, card.data.englishName, card.englishName]
      .some((candidate) => normalizedNames.has(normalizeName(candidate)));
  };
  let structured = state.calculatorCards.find(matchesName);
  // Older imported rosters may contain different punctuation or a stale
  // faction label. Resolve directly from the structured catalogue before
  // falling back to the legacy Markdown section.
  if (!structured) {
    const jsonPaths = faction && DATASHEET_JSON_FILES[faction] ? [DATASHEET_JSON_FILES[faction]] : [];
    for (const path of jsonPaths) {
      try {
        const response = await fetch(path);
        if (!response.ok) continue;
        const parsed = await response.json();
        const cards = parsed.cards || (parsed.unit ? [parsed] : []);
        const hit = cards.find((card) => {
          const data = card.unit ? card : parsed.unit ? parsed : null;
          return data && [card.name, data.unit?.name, data.englishName]
            .some((candidate) => normalizedNames.has(normalizeName(candidate)));
        });
        if (hit) {
          const data = hit.unit ? hit : parsed.unit ? parsed : null;
          structured = { faction: parsed.faction, name: hit.name || data?.unit?.name, structured: true, data };
          break;
        }
      } catch {
        // Keep trying other catalogues, then use the readable Markdown fallback.
      }
    }
  }
  if (structured?.data?.unit) return { type: "structured", data: normalizeCalculatorCardData(structured.data) };
  const path = DATASHEET_FILES[faction];
  if (!path) return null;
  if (!state.datasheetCache[path]) {
    try {
      const response = await fetch(path);
      if (!response.ok) return null;
      state.datasheetCache[path] = await response.text();
    } catch {
      return null;
    }
  }
  const text = state.datasheetCache[path] || "";
  const hit = names.map((name) => text.indexOf(name)).find((index) => index >= 0);
  if (hit === undefined) return null;
  const start = Math.max(0, text.lastIndexOf("## ", hit));
  const next = text.indexOf("\n## ", hit + 1);
  return { type: "markdown", text: text.slice(start, next >= 0 ? next : hit + 6000).slice(0, 7000).trim() };
}

function datasheetPreviewMarkup(preview) {
  if (!preview) return `<strong>数据卡属性</strong><p class="muted-copy">未找到该单位的可用数据卡条目；你仍可在上方设置模型血量。</p>`;
  if (preview.type !== "structured") {
    const rows = preview.text.split(/\r?\n/).filter((line) => /^\s*\|/.test(line) && !/^\s*\|\s*-/.test(line)).map((line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim().replace(/<br\s*\/?>(?=\S)/gi, " "))).filter((cells) => cells.some(Boolean));
    const fallbackRows = rows.map((cells) => {
      const label = cells[0] || "";
      const value = cells.slice(1).filter(Boolean).join(" · ");
      const displayValue = /单位装备|默认装备/.test(label) ? cleanPdfWatermarkText(value) : value;
      return `<article class="datasheet-fallback-row"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(displayValue || "—")}</span></article>`;
    }).join("");
    const content = fallbackRows ? `<div class="datasheet-fallback-list">${fallbackRows}</div>` : `<pre>${escapeHtml(preview.text)}</pre>`;
    return `<details open><summary>数据卡属性</summary><div class="datasheet-card-preview">${content}</div></details>`;
  }
  const data = preview.data || {};
  const unit = data.unit || {};
  const keywords = [...new Set([...(data.factionKeywords || []), ...(data.keywords || [])].filter(Boolean))];
  const save = unit.invulnerableSave ? `${unit.save}+ / ${unit.invulnerableSave}+` : `${unit.save ?? "-"}+`;
  const statRows = [["移动", unit.movement ? `${unit.movement}"` : "-"], ["坚韧", unit.toughness ?? "-"], ["护甲 / 特殊保护", save], ["血量", unit.woundsPerModel ?? "-"], ["领导力", unit.leadership ?? "-"], ["控制值", unit.objectiveControl ?? "-"]];
  const weaponRows = (data.weapons || []).map((weapon) => `<tr><td>${escapeHtml(weapon.name)}</td><td>${weapon.type === "melee" ? "近战" : "射击"}</td><td>${escapeHtml(weapon.attacks ?? "-")}</td><td>${escapeHtml(weapon.skill === "torrent" ? "自动命中" : weapon.skill ?? "-")}</td><td>${escapeHtml(weapon.strength ?? "-")}</td><td>${escapeHtml(weapon.ap ?? "-")}</td><td>${escapeHtml(weapon.damage ?? "-")}</td><td>${escapeHtml((weapon.abilities || []).join("、") || "-")}</td></tr>`).join("");
  const abilities = String(unit.abilities || "").split("⚫").map((item) => item.trim()).filter(Boolean).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `<details open><summary>数据卡属性</summary><div class="datasheet-card-preview"><div class="datasheet-stat-grid">${statRows.map(([label, value]) => `<div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}</div>${keywords.length ? `<p class="datasheet-keywords"><strong>关键词：</strong>${escapeHtml(keywords.join("、"))}</p>` : ""}${unit.defaultEquipment ? `<p class="datasheet-equipment"><strong>默认装备：</strong>${escapeHtml(unit.defaultEquipment)}</p>` : ""}${weaponRows ? `<h4>武器</h4><div class="datasheet-table-wrap"><table><thead><tr><th>武器</th><th>类型</th><th>A</th><th>命中</th><th>S</th><th>AP</th><th>D</th><th>技能</th></tr></thead><tbody>${weaponRows}</tbody></table></div>` : ""}${abilities ? `<h4>技能</h4><ul class="datasheet-abilities">${abilities}</ul>` : ""}</div></details>`;
}

function datasheetPreviewCardMarkup(preview) {
  if (!preview) return datasheetPreviewMarkup(preview);
  if (preview.type !== "structured") return datasheetPreviewMarkup(preview);
  const data = preview.data || {};
  const unit = data.unit || {};
  const keywords = [...new Set([...(data.factionKeywords || []), ...(data.keywords || [])].filter(Boolean))];
  const save = unit.invulnerableSave ? `${unit.save}+ / ${unit.invulnerableSave}+` : `${unit.save ?? "-"}+`;
  const statRows = [["移动", unit.movement ? `${unit.movement}\"` : "-"], ["坚韧", unit.toughness ?? "-"], ["护甲 / 特殊保护", save], ["血量", unit.woundsPerModel ?? "-"], ["领导力", unit.leadership ?? "-"], ["控制值", unit.objectiveControl ?? "-"]];
  const weaponRows = (data.weapons || []).map((weapon) => `<article class="datasheet-weapon-row"><div class="datasheet-weapon-heading"><strong>${escapeHtml(weapon.name)}</strong><span>${weapon.type === "melee" ? "近战" : "射击"}</span></div><div class="datasheet-weapon-stats"><div><span>A</span><strong>${escapeHtml(weapon.attacks ?? "-")}</strong></div><div><span>命中</span><strong>${escapeHtml(weapon.skill === "torrent" ? "自动" : weapon.skill ?? "-")}</strong></div><div><span>S</span><strong>${escapeHtml(weapon.strength ?? "-")}</strong></div><div><span>AP</span><strong>${escapeHtml(weapon.ap ?? "-")}</strong></div><div><span>D</span><strong>${escapeHtml(weapon.damage ?? "-")}</strong></div></div><small>${escapeHtml((weapon.abilities || []).join("、") || "无关键词")}</small></article>`).join("");
  const abilities = String(unit.abilities || "").split("⚫").map((item) => item.trim()).filter(Boolean).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `<details open><summary>数据卡属性</summary><div class="datasheet-card-preview"><div class="datasheet-stat-grid">${statRows.map(([label, value]) => `<div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}</div>${keywords.length ? `<p class="datasheet-keywords"><strong>关键词：</strong>${escapeHtml(keywords.join("、"))}</p>` : ""}${unit.defaultEquipment ? `<p class="datasheet-equipment"><strong>默认装备：</strong>${escapeHtml(unit.defaultEquipment)}</p>` : ""}${weaponRows ? `<h4>武器</h4><div class="datasheet-weapon-list">${weaponRows}</div>` : ""}${abilities ? `<h4>技能</h4><ul class="datasheet-abilities">${abilities}</ul>` : ""}</div></details>`;
}

async function openUnitDetail(side, groupId, unitId) {
  const { group, unit } = findUnit(side, groupId, unitId);
  if (!unit) return;
  const dialog = $("#unitDetail");
  const detail = $("#unitDetailContent");
  const detailKey = `${side}:${groupId}:${unitId}`;
  dialog.dataset.detailKey = detailKey;
  detail.innerHTML = `<div class="detail-heading"><div><span>${escapeHtml(group.title)}</span><h3>${escapeHtml(unit.name)}${unit.points ? ` · ${escapeHtml(unit.points)}分` : ""}</h3></div><button type="button" data-close-detail>关闭</button></div>${unit.enhancement ? `<p class="detail-note">强化：${escapeHtml(unit.enhancement)}</p>` : ""}<div class="model-list">${unit.models.map((model) => `<article class="model-row ${model.currentWounds <= 0 ? "is-destroyed" : ""}"><div><strong>${escapeHtml(model.name)}</strong><small>${model.equipment.map((item) => `${item.count}x ${item.name}`).join(" · ") || "无装备"}</small></div><label>当前伤口<input type="number" min="0" max="${model.maximumWounds}" value="${model.currentWounds}" data-model-wounds data-side="${side}" data-group-id="${groupId}" data-unit-id="${unit.id}" data-model-id="${model.id}" /></label><label>最大伤口<input type="number" min="1" value="${model.maximumWounds}" data-model-max-wounds data-side="${side}" data-group-id="${groupId}" data-unit-id="${model.id}" /></label>${model.currentWounds > 0 ? `<button type="button" class="delete-unit" data-destroy-model data-side="${side}" data-group-id="${groupId}" data-unit-id="${unit.id}" data-model-id="${model.id}">移除模型</button>` : "<em>已阵亡</em>"}</article>`).join("")}</div><section class="datasheet-preview" data-datasheet-preview><strong>数据卡属性</strong><p class="muted-copy">正在加载…</p></section>`;
  detail.querySelectorAll("label").forEach((label) => {
    if (label.querySelector("[data-model-wounds]")) label.firstChild.textContent = "当前血量";
    if (label.querySelector("[data-model-max-wounds]")) label.firstChild.textContent = "最大血量";
  });
  if (!dialog.open) dialog.showModal();
  const previewData = await getDatasheetPreview(state.rosters[side].faction, unit.name);
  if (!dialog.open || dialog.dataset.detailKey !== detailKey) return;
  const preview = detail.querySelector("[data-datasheet-preview]");
  if (preview) preview.innerHTML = datasheetPreviewCardMarkup(previewData);
}

$("#rosterOverview")?.addEventListener("click", (event) => {
  const open = event.target.closest("[data-open-unit]");
  if (open) openUnitDetail(open.dataset.side, open.dataset.groupId, open.dataset.unitId);
});
$("#unitDetail")?.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-detail]")) event.currentTarget.close();
  const button = event.target.closest("[data-destroy-model]");
  if (!button) return;
  const { unit } = findUnit(button.dataset.side, button.dataset.groupId, button.dataset.unitId);
  const model = unit?.models.find((item) => item.id === button.dataset.modelId);
  if (!model) return;
  model.currentWounds = 0;
  saveRosters(); renderRosters(); openUnitDetail(button.dataset.side, button.dataset.groupId, button.dataset.unitId);
});
$("#unitDetail")?.addEventListener("change", (event) => {
  const input = event.target;
  if (!input.dataset.modelWounds && !input.dataset.modelMaxWounds) return;
  const { unit } = findUnit(input.dataset.side, input.dataset.groupId, input.dataset.unitId);
  const model = unit?.models.find((item) => item.id === input.dataset.modelId);
  if (!model) return;
  if (input.dataset.modelMaxWounds) {
    model.maximumWounds = Math.max(1, Number(input.value) || 1);
    model.currentWounds = Math.min(model.currentWounds, model.maximumWounds);
    model.woundsSource = "manual";
  } else {
    model.currentWounds = Math.max(0, Math.min(model.maximumWounds, Number(input.value) || 0));
    model.woundsSource = "manual";
  }
  saveRosters(); renderRosters(); openUnitDetail(input.dataset.side, input.dataset.groupId, input.dataset.unitId);
});

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 2);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(DB_STORE)) request.result.createObjectStore(DB_STORE, { keyPath: "id", autoIncrement: true });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getLibraryFiles() {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const request = db.transaction(DB_STORE, "readonly").objectStore(DB_STORE).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return [];
  }
}

async function extractPdfText(file) {
  try {
    const pdfjs = await ensurePdfJsLoaded();
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buffer }).promise;
    const parts = [];
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      parts.push(content.items.map((item) => item.str).join(" "));
      if (parts.length >= 200) break;
    }
    return parts.join("\n").slice(0, 100000);
  } catch {
    return "";
  }
}

async function ensurePdfJsLoaded() {
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
    return window.pdfjsLib;
  }
  if (!pdfJsLoadPromise) {
    pdfJsLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const timeout = window.setTimeout(() => {
        script.remove();
        reject(new Error("PDF 解析器加载超时"));
      }, PDFJS_LOAD_TIMEOUT_MS);
      script.src = PDFJS_CDN_URL;
      script.async = true;
      script.onload = () => {
        window.clearTimeout(timeout);
        if (!window.pdfjsLib) {
          reject(new Error("PDF 解析器未初始化"));
          return;
        }
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
        resolve(window.pdfjsLib);
      };
      script.onerror = () => {
        window.clearTimeout(timeout);
        reject(new Error("PDF 解析器加载失败"));
      };
      document.head.append(script);
    }).catch((error) => {
      pdfJsLoadPromise = null;
      throw error;
    });
  }
  return pdfJsLoadPromise;
}

async function addLibraryFile(file, metadata = {}) {
  const isText = /text|json|markdown/.test(file.type) || /\.(txt|md|json)$/i.test(file.name);
  const isPdf = /\.pdf$/i.test(file.name);
  const content = isText ? await file.text() : isPdf ? await extractPdfText(file) : "";
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(DB_STORE, "readwrite").objectStore(DB_STORE).add({
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      content,
      blob: file,
      faction: metadata.faction || "未分类",
      kind: metadata.kind || "supplement",
      builtin: Boolean(metadata.builtin),
      createdAt: Date.now(),
    });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function libraryFileKey(file) {
  const metadata = BUILTIN_FILE_METADATA[file.path] || BUILTIN_FILE_METADATA[file.name] || {};
  return `${file.faction || metadata.faction || "未分类"}:${file.name || ""}`;
}

async function importBuiltinLibraryFiles(paths = CORE_LIBRARY_FILES) {
  try {
    const existing = await getLibraryFiles();
    const existingKeys = new Set(existing.map(libraryFileKey));
    const imported = [];
    for (const path of [...new Set(paths)]) {
      const name = path.split("/").pop();
      const metadata = BUILTIN_FILE_METADATA[path] || BUILTIN_FILE_METADATA[name] || {};
      const key = libraryFileKey({ path, name, faction: metadata.faction });
      if (existingKeys.has(key)) continue;
      try {
        const response = await fetch(path);
        if (!response.ok) continue;
        const blob = await response.blob();
        const file = new File([blob], name, { type: blob.type || "application/pdf" });
        await addLibraryFile(file, metadata);
        existingKeys.add(key);
        imported.push(name);
      } catch {
        // 本地 file:// 预览无法 fetch，跳过即可
      }
    }
    if (imported.length) showToast(`已载入 ${imported.length} 份内置规则`);
  } catch (error) {
    console.error(error);
  }
}

function appendDigitalUnitAliases(parsed = null) {
  for (const [faction, pages] of Object.entries(window.WarhammerAliasRegistry?.allDigitalUnitAliases?.() || {})) {
    const definition = window.WarhammerFactionRegistry?.resolve(faction);
    for (const [page, names] of Object.entries(pages)) {
      const key = `${faction}:${page}`;
      const sourceCard = state.calculatorCards.find((card) => card.faction === faction && Number(card.page) === Number(page));
      const source = parsed?.get(key) || sourceCard?.data;
      if (!sourceCard && !source?.unit) continue;
      names.forEach((name) => {
        const virtualCard = source?.unit
          ? { factionId: definition?.id || sourceCard?.factionId || "", faction, name, page: Number(page), structured: true, data: { ...source, unit: { ...source.unit, name } } }
          : { factionId: definition?.id || sourceCard?.factionId || "", faction, name, page: Number(page), structured: false, indexed: true, data: null };
        const existingIndex = state.calculatorCards.findIndex((card) => card.faction === faction && card.name === name);
        if (existingIndex >= 0) state.calculatorCards[existingIndex] = virtualCard;
        else state.calculatorCards.push(virtualCard);
      });
    }
  }
}

async function ensureFactionLibraryFiles(faction) {
  const definition = window.WarhammerFactionRegistry?.resolve(faction);
  if (!definition) return;
  const searchableTextPaths = (definition.library || [])
    .map((entry) => entry.path)
    .filter((path) => /\.(?:md|txt)$/i.test(path));
  await importBuiltinLibraryFiles(searchableTextPaths);
}

async function ensureLibraryFilesForFolders(folders) {
  await Promise.all([...folders]
    .filter((folder) => folder && folder !== "规则书")
    .map((folder) => ensureFactionLibraryFiles(folder)));
}

function appendCalculatorCatalog(cards, parsed, factionId = "") {
  const categoryNames = new Set(["传奇英雄人物", "战术小队", "其他步兵", "军表构成", "3", "骑乘", "终结者", "机甲", "载具", "运输载具", "飞行载具", "工事"]);
  if (!parsed || typeof parsed !== "object") return;
  if (parsed.unit?.name) cards.set(`${parsed.faction}:${parsed.unit.name}`, { factionId, faction: parsed.faction, name: parsed.unit.name, structured: true, data: parsed });
  for (const card of parsed.cards || []) {
    if (!card.name || categoryNames.has(card.name) || card.name.startsWith("⚫") || /爆弹枪|复合武器|雷霆锤/.test(card.name)) continue;
    const key = `${parsed.faction}:${card.name}`;
    const candidate = { factionId, faction: parsed.faction, name: card.name, page: card.page, structured: Boolean(card.unit), data: card.unit ? card : null };
    const existing = cards.get(key);
    if (!existing || (candidate.structured && !existing.structured)) cards.set(key, candidate);
  }
}

function hydrateCalculatorCatalog(faction) {
  const definition = window.WarhammerFactionRegistry?.resolve(faction);
  if (!definition || hydratedCalculatorFactions.has(definition.id)) return definition || null;
  const parsed = window.WarhammerCalculatorCatalogRegistry?.get(definition.id);
  if (!parsed) throw new Error(`阵营 ${definition.name} 的数据卡包未注册`);
  const cards = new Map(state.calculatorCards
    .filter((card) => card.factionId !== definition.id)
    .map((card) => [`${card.faction}:${card.name}`, card]));
  appendCalculatorCatalog(cards, parsed, definition.id);
  state.calculatorCards = [...cards.values()];
  hydratedCalculatorFactions.add(definition.id);
  appendDigitalUnitAliases();
  // 分遣队别名随运行时一并进入统一别名注册表（规范名/英文名/全部别名）。
  calculatorCardsVersion += 1;
  // 兜底刷新：乐观选中/会话恢复在水合前按空数据构建的草稿，此刻可以重建了。
  // 统一在每次水合完成后清空这类草稿并刷新详情区，确保"数据卡加载完成后
  // 占位提示自动消失"，用户无需手动重新选择。
  let hasStaleDrafts = false;
  ["attacker", "defender"].forEach((side) => {
    (state.calculatorDrafts[side] || []).forEach((draft, index) => {
      if (draft && !draft.data && !draft.weapons?.length) {
        state.calculatorDrafts[side][index] = null;
        hasStaleDrafts = true;
      }
    });
  });
  if (hasStaleDrafts) renderCalculatorDetails();
  return definition;
}

async function ensureFactionRuntimeLoaded(faction) {
  const definition = window.WarhammerFactionRegistry?.resolve(faction);
  if (!definition) return null;
  if (!hydratedCalculatorFactions.has(definition.id)) {
    if (!window.WarhammerFactionRuntimeLoader?.load) throw new Error("阵营运行时加载器不可用");
    await window.WarhammerFactionRuntimeLoader.load(definition.id);
    hydrateCalculatorCatalog(definition.id);
  }
  return definition;
}

async function loadCalculatorCards() {
  state.calculatorCards = (Array.isArray(window.WARHAMMER_CALCULATOR_INDEX) ? window.WARHAMMER_CALCULATOR_INDEX : [])
    .map((card) => ({ ...card, structured: false, indexed: true, data: null }));
  appendDigitalUnitAliases();
  calculatorCardsVersion += 1;
  renderCalculatorSelectors();
  const rosterFactions = [...new Set([state.rosters.attacker.faction, state.rosters.defender.faction].filter(Boolean))];
  for (const faction of rosterFactions) {
    try {
      await ensureFactionRuntimeLoaded(faction);
    } catch (error) {
      console.error(error);
    }
  }
  applyDatasheetWoundsToRosters();
  renderRosters();
  restoreBattleSessionRuntime();
}

// 恢复的对局场景若引用了数据卡，后台补载对应阵营运行时并重渲染计算页。
async function restoreBattleSessionRuntime() {
  try {
    const options = calculatorPickerOptions("attacker").allOptions;
    const keys = new Set([
      ...(state.calculatorSelections?.attacker || []),
      ...(state.calculatorSelections?.defender || []),
    ].filter(Boolean));
    const factionIds = new Set([...keys]
      .map((key) => options.find((option) => option.key === key)?.factionId)
      .filter(Boolean));
    if (!factionIds.size) return;
    await Promise.all([...factionIds].map((factionId) => ensureFactionRuntimeLoaded(factionId)));
    renderCalculatorSelectors();
    renderCalculatorDetails();
  } catch (error) {
    console.error(error);
  }
}

function markdownCells(line) {
  return line.split("|").slice(1, -1).map((cell) => cell.replace(/<br\s*\/?>/gi, " ").trim()).filter(Boolean);
}

function combatExpression(value, fallback = "1") {
  const text = String(value ?? "").replace(/<br\s*\/?>/gi, " ").trim();
  const dice = text.match(/\d*d\d+(?:\s*[+-]\s*\d+)?/i);
  if (dice) return dice[0].replace(/\s+/g, "");
  const numbers = text.match(/-?\d+/g);
  return numbers?.at(-1) || fallback;
}

function combatNumber(value, fallback = 0) {
  const numbers = String(value ?? "").match(/-?\d+/g);
  return numbers?.length ? Number(numbers.at(-1)) : fallback;
}

function datasheetModelCount(composition) {
  const text = String(composition || "").replace(/<br\s*\/?\s*>/gi, " ").trim();
  const number = text.match(/^\s*(\d+)/)?.[1] || [...text.matchAll(/\b(\d+)\b/g)].map((match) => Number(match[1])).find((value) => value > 0 && value <= 20);
  if (number) return Math.max(1, Number(number));
  if (/一个|一名|单个|唯一的独特模型|唯一的独特人物|唯一的独特单位/.test(text)) return 1;
  return 1;
}

function parseDigitalDatasheets(markdown, faction) {
  const result = new Map();
  const headings = [...markdown.matchAll(/## 第 ([0-9]+) 页：([^\n]+)/g)].map((match, index, all) => ({ page: Number(match[1]), name: match[2].trim(), start: match.index, end: all[index + 1]?.index ?? markdown.length }));
  headings.forEach((heading) => {
    const section = markdown.slice(heading.start, heading.end);
    const lines = section.split(/\r?\n/);
    const statHeader = lines.findIndex((line) => /\|\s*M\s*\|/.test(line) && /\|\s*T\s*\|/.test(line));
    if (statHeader < 0) return;
    let values = [];
    for (let index = statHeader + 1; index < Math.min(lines.length, statHeader + 6); index += 1) {
      if (/^\|\s*-/.test(lines[index])) continue;
      const cells = markdownCells(lines[index]);
      if (cells.filter((cell) => /\d/.test(cell)).length >= 4) { values = cells; break; }
    }
    if (values.length < 4) return;
    const stat = values.slice(0, 6);
    const saveParts = String(stat[2] || "7").split("/").map((value) => Number(value.replace("+", ""))).filter(Number.isFinite);
    const compositionText = lines.filter((line) => /^\|\s*单位构成/.test(line)).map((line) => markdownCells(line).slice(1).join(" ")).join(" ");
    const equipmentText = lines.filter((line) => /^\|\s*单位装备/.test(line)).map((line) => markdownCells(line).slice(1).join(" ")).join(" ");
    const abilityText = lines.filter((line) => /^\|\s*(?:核心技能|阵营技能|技能|能力|特殊规则)/.test(line)).map((line) => markdownCells(line).slice(1).join(" ")).join(" ");
    const unit = {
      name: heading.name,
      movement: Number(String(stat[0] || "0").replace(/[^0-9]/g, "")) || 0,
      toughness: Number(String(stat[1] || "0").replace(/[^0-9]/g, "")) || 0,
      save: saveParts[0] || 7,
      invulnerableSave: saveParts[1] || 0,
      woundsPerModel: Number(String(stat[3] || "1").replace(/[^0-9]/g, "")) || 1,
      leadership: stat[4] || "6+",
      objectiveControl: Number(String(stat[5] || "0").replace(/[^0-9]/g, "")) || 0,
      models: datasheetModelCount(compositionText),
      defaultEquipment: equipmentText,
      abilities: passiveAbilityText(abilityText),
      activeAbilities: activeAbilityText(abilityText),
    };
    const weapons = [];
    let weaponType = "ranged";
    let inWeaponTable = false;
    lines.forEach((line) => {
      if (/近战武器/.test(line)) { weaponType = "melee"; inWeaponTable = true; }
      if (/射击武器/.test(line)) { weaponType = "ranged"; inWeaponTable = true; }
      if (!inWeaponTable || !/^\|/.test(line) || /武器名|^\|\s*-/.test(line)) return;
      const cells = markdownCells(line);
      if (cells.length < 5 || !cells[0] || /^(M|M\s*$|技能|关键词)/.test(cells[0])) return;
      const skillIndex = cells.findIndex((cell) => /^\d+\+$/.test(cell));
      if (skillIndex < 2 || !/\d/.test(cells[skillIndex + 1] || "")) return;
      const strength = combatNumber(cells[skillIndex + 1], 0);
      const ap = combatNumber(cells[skillIndex + 2], 0);
      const damage = combatExpression(cells[skillIndex + 3], "1");
      weapons.push({ name: cells[0], type: weaponType, attacks: combatExpression(cells[skillIndex - 1], "1"), skill: cells[skillIndex], strength, ap, damage, abilities: cells.slice(skillIndex + 4) });
    });
    const readKeywords = (label) => {
      const line = lines.find((item) => new RegExp(`^\\|\\s*${label}\\s*\\|`).test(item));
      if (!line) return [];
      return [...new Set(line.split("|").slice(2).join(" ").replace(/<br\s*\/?>(?=\S)/gi, " ").replace(/\s+/g, " ").trim().replace(/^\s*(?:\d+\s*)+/, "").split(/[，,、]/).map((item) => item.trim()).filter(Boolean))];
    };
    result.set(`${faction}:${heading.page}`, { faction, kind: "datasheet", unit, factionKeywords: cleanPdfKeywordList(readKeywords("阵营关键词")), keywords: cleanPdfKeywordList(readKeywords("关键词")), weapons });
  });
  return result;
}

function applyDatasheetWoundsToRosters() {
  let changed = false;
  ["attacker", "defender"].forEach((side) => state.rosters[side].groups.forEach((group) => group.units.forEach((unit) => {
    const profile = getUnitProfile(unit.name, state.rosters[side].faction);
    const card = findStructuredCalculatorCard(unit.name, state.rosters[side].faction);
    const wounds = Number(card?.data?.unit?.woundsPerModel || profile?.woundsPerModel || 0);
    if (!wounds) return;
    unit.models.forEach((model) => {
      if (model.woundsSource === "manual" || (model.maximumWounds !== 1 && model.woundsSource !== "datasheet")) return;
      const previousMaximumWounds = model.maximumWounds;
      const nextCurrentWounds = model.currentWounds === previousMaximumWounds || (previousMaximumWounds === 1 && model.currentWounds === 1) ? wounds : Math.min(wounds, model.currentWounds);
      if (model.maximumWounds !== wounds || model.currentWounds !== nextCurrentWounds || model.woundsSource !== "datasheet") {
        model.maximumWounds = wounds;
        model.currentWounds = nextCurrentWounds;
        model.woundsSource = "datasheet";
        changed = true;
      }
    });
  })));
  if (changed) { saveRosters(); renderRosters(); }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function parseArmyList(content) {
  if (!content) return null;
  try {
    const parsed = JSON.parse(content);
    if (parsed.attacker || parsed.defender) return parsed;
    if (Array.isArray(parsed.groups)) return parsed;
    if (Array.isArray(parsed.units)) return { name: parsed.name || parsed.armyName || "导入军表", faction: parsed.faction || parsed.army || "未识别阵营", groups: [{ id: makeId("group"), title: "单位", category: "单位", units: parsed.units }] };
  } catch {
    // 使用当前项目军表的纯文本格式解析。
  }
  const lines = content.replace(/\r/g, "").split("\n");
  const armyName = lines.find((line) => /\(\d+分\)\s*$/.test(line.trim()))?.trim() || "导入军表";
  const faction = lines.map((line) => window.WarhammerFactionRegistry?.resolve(line.trim())).find(Boolean)?.name || "未识别阵营";
  const detachmentMetadata = window.WarhammerRosterContext?.parseMetadata(faction, content, window.WarhammerRuleResolver)
    || { detachmentIds: [], detachmentNames: [], dp: 0, sourceText: "" };
  const groups = []; let group = null; let unit = null; let inComposition = false; let modelBatch = []; let lastTargets = [];
  const ensureUnitModel = () => {
    if (!unit.models.length) unit.models.push(normalizeModel({ name: unit.name }, unit.name));
    return unit.models;
  };
  const addEquipment = (count, name) => {
    const targets = modelBatch.length ? modelBatch : ensureUnitModel();
    const chosen = count === 1 && lastTargets.length === 1 ? lastTargets : [...targets].sort((a, b) => a.equipment.length - b.equipment.length).slice(0, Math.min(count, targets.length));
    // 数量保留在模型装备上：单模型载具携带 2x 同型武器时记录 count=2，
    // 多模型单位仍按"每模型一件"分配。
    const perModel = Math.floor(Math.max(1, count) / Math.max(1, chosen.length));
    const remainder = Math.max(1, count) % Math.max(1, chosen.length);
    chosen.forEach((model, index) => model.equipment.push({ name, count: perModel + (index < remainder ? 1 : 0) }));
    lastTargets = chosen;
  };
  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed || /^-+$/.test(trimmed) || /^(由黑图书馆|版本号|感\/谢)/.test(trimmed)) continue;
    if (trimmed === armyName && !groups.length) continue;
    if (trimmed === "联合单位") { group = null; unit = null; continue; }
    if (/^联合单位：/.test(trimmed)) { group = { id: makeId("group"), title: trimmed, category: "联合单位", units: [] }; groups.push(group); unit = null; continue; }
    if (/^(人物|战线|其他单位|专属运输载具|角色|部队|CHARACTERS|BATTLELINE|OTHER DATASHEETS)/i.test(trimmed)) { group = { id: makeId("group"), title: trimmed, category: trimmed, units: [] }; groups.push(group); unit = null; continue; }
    const header = !/^·\s*\d+x\s*/.test(trimmed) && trimmed.match(/^(.+?)\((\d+)分\)\s*$/);
    if (header) {
      if (!group) { group = { id: makeId("group"), title: "单位", category: "单位", units: [] }; groups.push(group); }
      unit = { id: makeId("unit"), name: header[1].trim(), points: header[2], role: "", enhancement: "", enhancementName: "", enhancementId: "", notes: "", hasComposition: false, models: [] };
      group.units.push(unit); inComposition = false; modelBatch = []; lastTargets = []; continue;
    }
    if (!unit) continue;
    if (/^进行联合的单位：/.test(trimmed)) { unit.role = trimmed.replace(/^进行联合的单位：/, ""); continue; }
    if (/^强化：/.test(trimmed)) {
      unit.enhancement = trimmed.replace(/^强化：/, "");
      unit.enhancementName = unit.enhancement.split(/[；;]/)[0].trim();
      unit.enhancementId = window.WarhammerRosterContext?.matchEnhancement(faction, detachmentMetadata.detachmentIds, unit.enhancement, window.WarhammerRuleResolver)?.id || "";
      continue;
    }
    if (/^(单位组成|扩编次数)/.test(trimmed)) { inComposition = /^单位组成/.test(trimmed); if (inComposition) unit.hasComposition = true; continue; }
    const item = raw.match(/^\s*·\s*(\d+)x\s*(.+?)\s*$/);
    if (!item) continue;
    let count = Number(item[1]); let name = item[2]; const depth = (raw.match(/^\s*/)?.[0].replace(/\t/g, "  ").length || 0);
    // 军表软件把"2个酷刑炮"写成单件装备名，提取数量前缀以免导入后变成 1 件。
    const countPrefix = name.match(/^(\d+)个(.+)$/);
    if (countPrefix) { count = Math.max(1, Number(countPrefix[1])) * count; name = countPrefix[2].trim(); }
    if (inComposition && depth <= 2) {
      modelBatch = Array.from({ length: count }, () => normalizeModel({ name }, name));
      unit.models.push(...modelBatch); lastTargets = [];
    } else addEquipment(count, name);
  }
  const linked = new Map();
  groups.filter((item) => item.category === "联合单位").flatMap((item) => item.units).forEach((item) => linked.set(`${item.name}|${item.points}`, (linked.get(`${item.name}|${item.points}`) || 0) + 1));
  groups.filter((item) => item.category !== "联合单位").forEach((item) => {
    item.units = item.units.filter((candidate) => {
      const key = `${candidate.name}|${candidate.points}`; const count = linked.get(key) || 0;
      if (!count) return true; linked.set(key, count - 1); return false;
    });
  });
  return {
    name: armyName,
    faction,
    detachmentIds: detachmentMetadata.detachmentIds,
    detachmentNames: detachmentMetadata.detachmentNames,
    detachmentDp: detachmentMetadata.dp,
    detachmentSourceText: detachmentMetadata.sourceText,
    groups: groups.filter((item) => item.units.length),
  };
}

function importArmyToRoster(army, side) {
  if (!army?.groups?.length) return false;
  const roster = state.rosters[side];
  roster.faction = army.faction || "未识别阵营";
  roster.name = army.name || `${roster.faction}军表`;
  roster.detachmentIds = Array.isArray(army.detachmentIds) ? [...army.detachmentIds] : [];
  roster.detachmentNames = Array.isArray(army.detachmentNames) ? [...army.detachmentNames] : [];
  roster.detachmentDp = Number(army.detachmentDp || 0);
  roster.detachmentSourceText = army.detachmentSourceText || "";
  roster.groups = army.groups.map((group) => normalizeGroup({ ...group, units: group.units.map((unit) => {
    const card = findStructuredCalculatorCard(unit.name, roster.faction);
    const wounds = Number(card?.data?.unit?.woundsPerModel || getUnitProfile(unit.name, roster.faction)?.woundsPerModel || 0);
    if (!wounds || !Array.isArray(unit.models)) return unit;
    return { ...unit, models: unit.models.map((model) => model.maximumWounds === 1 && model.currentWounds === 1 ? { ...model, maximumWounds: wounds, currentWounds: wounds, woundsSource: "datasheet" } : model) };
  }) }, roster.faction));
  saveRosters();
  renderRosters();
  return true;
}

function rosterRuntimeFactions(content) {
  const values = [];
  try {
    const parsed = JSON.parse(content);
    [parsed?.faction, parsed?.army, parsed?.attacker?.faction, parsed?.defender?.faction].filter(Boolean).forEach((value) => values.push(value));
  } catch {
    // Plain-text roster detection continues below.
  }
  const source = String(content || "").toLocaleLowerCase();
  FACTION_PACKAGES.forEach((definition) => {
    if ([definition.name, definition.englishName, ...(definition.aliases || [])]
      .filter(Boolean)
      .some((alias) => source.includes(String(alias).toLocaleLowerCase()))) values.push(definition.id);
  });
  return [...new Set(values.map((value) => window.WarhammerFactionRegistry?.resolve(value)?.id).filter(Boolean))];
}

async function prepareRosterRuntime(content) {
  const factionIds = rosterRuntimeFactions(content);
  await Promise.all(factionIds.map(async (factionId) => {
    await ensureFactionRuntimeLoaded(factionId);
    await ensureFactionLibraryFiles(factionId);
  }));
}

async function importRosterText(content, side) {
  await prepareRosterRuntime(content);
  const parsed = parseArmyList(content);
  if (!parsed) return false;
  if (parsed.attacker || parsed.defender) return importArmyToRoster(parsed[side], side);
  return importArmyToRoster(parsed, side);
}

$$('[data-paste-side]').forEach((button) => button.addEventListener("click", async () => {
  const content = $("#rosterPaste")?.value.trim();
  if (!content) {
    showToast("请先粘贴军表内容");
    return;
  }
  if (await importRosterText(content, button.dataset.pasteSide)) {
    showToast(`已解析并导入${sideLabel(button.dataset.pasteSide)}军表`);
  } else showToast("未识别军表格式，请检查粘贴内容是否完整");
}));
$("#clearRosterPaste")?.addEventListener("click", () => { $("#rosterPaste").value = ""; });
$("#rosterWarnings")?.addEventListener("click", async (event) => {
  if (!event.target.closest("[data-copy-unmatched]")) return;
  const field = event.currentTarget.querySelector("[data-unmatched-names]");
  if (!field) return;
  const text = field.value;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    field.focus();
    field.select();
    document.execCommand("copy");
  }
  showToast("已复制未匹配单位名称");
});
$("#readClipboard")?.addEventListener("click", async () => {
  try {
    $("#rosterPaste").value = await navigator.clipboard.readText();
    showToast("已读取剪贴板内容");
  } catch {
    showToast("浏览器未允许读取剪贴板，请使用 Ctrl+V 粘贴");
  }
});

$("#rosterFiles")?.addEventListener("change", async (event) => {
  const files = [...event.target.files];
  if (!files.length) return;
  try {
    let importedRosterCount = 0;
    for (const file of files) {
      if (/text|json|markdown/.test(file.type) || /\.(txt|md|json|pdf)$/i.test(file.name)) {
        const content = /\.pdf$/i.test(file.name) ? await extractPdfText(file) : await file.text();
        await prepareRosterRuntime(content);
        const army = parseArmyList(content);
        if (army?.attacker || army?.defender) {
          ["attacker", "defender"].forEach((side) => {
            if (importArmyToRoster(army[side], side)) importedRosterCount += 1;
          });
        } else if (army) {
          const side = state.rosters.attacker.groups.length ? "defender" : "attacker";
          if (importArmyToRoster(army, side)) importedRosterCount += 1;
        }
      }
    }
    showToast(importedRosterCount ? `已自动解析 ${importedRosterCount} 份军表` : "未识别军表格式，请导入项目导出的 TXT 或 JSON");
  } catch (error) {
    console.error(error);
    showToast("导入失败，请检查浏览器存储权限");
  }
  event.target.value = "";
});

function woundTarget(strength, toughness) {
  if (strength >= toughness * 2) return 2;
  if (strength > toughness) return 3;
  if (strength === toughness) return 4;
  if (strength * 2 <= toughness) return 6;
  return 5;
}

function d6() { return Math.floor(Math.random() * 6) + 1; }
function rollDamage() { return d6() + 2; }

function fireWeapon({ shots, bs, strength, ap, damage, sustained = 0, lethal = false, twinLinked = false }, target) {
  let totalDamage = 0;
  const woundOn = woundTarget(strength, target.toughness);
  for (let i = 0; i < shots; i += 1) {
    const hitRoll = d6();
    if (hitRoll < bs) continue;
    const critical = hitRoll === 6;
    const hitCount = 1 + (critical ? sustained : 0);
    if (lethal && critical) {
      totalDamage += target.saveDamage(ap, damage);
      continue;
    }
    for (let hit = 0; hit < hitCount; hit += 1) {
      let woundRoll = d6();
      if (woundRoll < woundOn && twinLinked) woundRoll = d6();
      if (woundRoll < woundOn) continue;
      totalDamage += target.saveDamage(ap, damage);
    }
  }
  return totalDamage;
}

function simulateScenario(runs = 1000) {
  if (!window.WarhammerEngine) throw new Error("本地规则引擎未加载");
  const payload = { ...buildExternalRoundPayload(), simulations: runs };
  const result = window.WarhammerEngine.simulateRound(payload);
  const total = Number(result.total || runs) || runs;
  const averageDamage = window.WarhammerEngine.averageHistogram(result.totalDamage);
  const requiredModels = payload.defenderGroups.reduce((sum, group) => sum + Math.max(0, Number(group.modelCount || 0)), 0) || 1;
  const chance = result.kills.x.reduce((sum, value, index) => sum + (Number(value) >= requiredModels ? Number(result.kills.y[index] || 0) : 0), 0) / total;
  return { chance, averageDamage, engine: result };
}

function emptyWeaponEffects(overrides = {}) {
  return window.WarhammerPayloadSchema.createWeaponEffects(overrides);
}

function emptyDefenderEffects() {
  return window.WarhammerPayloadSchema.createDefenderEffects();
}

function weaponEffectsFromKeywords(weapon, rollOptions = {}, ruleEffects = {}, modifiers = {}) {
  const coreEffects = modifiers.coreProfile?.effects
    || window.WarhammerKeywordDictionary.resolve(weapon?.abilities || [], { targetKeywords: modifiers.targetKeywords || [] }).effects;
  const keywordPayload = window.WarhammerKeywordDictionary.toWeaponPayload(weapon?.abilities || [], modifiers.targetKeywords || []);
  const sustained = coreEffects.find((effect) => effect.type === "sustained-hits");
  const sustainedValue = sustained?.value || String(ruleEffects.sustainedHits || 1);
  const hasSustained = Boolean(sustained) || Number(ruleEffects.sustainedHits || 0) > 0;
  const hasKeywordLethal = coreEffects.some((effect) => effect.type === "lethal-hits");
  const hasLethal = (hasKeywordLethal && weapon.lethalAutoWound !== false) || Boolean(ruleEffects.lethalHits);
  const hasDevastating = coreEffects.some((effect) => effect.type === "devastating-wounds") || Boolean(ruleEffects.devastating);
  const hitReroll = rollOptions?.hitReroll || { type: "none", values: [] };
  const hitValues = [...new Set((hitReroll.values || []).map(Number).filter((value) => value >= 1 && value <= 6))];
  const ruleWoundReroll = ruleEffects.woundReroll || "";
  const ruleWoundRerollValues = [...new Set((ruleEffects.woundRerollValues || []).map(Number).filter((value) => value >= 1 && value <= 6))];
  const coreProfile = modifiers.coreProfile || {};
  return emptyWeaponEffects({
    ...keywordPayload,
    hitRerollAllEnabled: hitReroll.type && hitReroll.type !== "none",
    hitRerollAllType: hitReroll.type || "ones",
    hitRerollAllValues: hitValues,
    hitModifierEnabled: Boolean(modifiers.hitModifier),
    hitModifierValue: Number(modifiers.hitModifier || 0),
    woundModifierEnabled: Boolean(modifiers.woundModifier),
    woundModifierValue: Number(modifiers.woundModifier || 0),
    sustainedHitsEnabled: hasSustained,
    sustainedHitsValue: sustainedValue,
    lethalHitsEnabled: hasLethal,
    devastatingWoundsEnabled: hasDevastating || Boolean(ruleEffects.devastating),
    hitCriticalEnabled: Boolean(modifiers.criticalHitThreshold || ruleEffects.hitCriticalThreshold),
    criticalHitThreshold: Number(modifiers.criticalHitThreshold || ruleEffects.hitCriticalThreshold || 6),
    woundCriticalEnabled: Boolean(ruleEffects.woundCriticalThreshold),
    criticalWoundThreshold: Number(ruleEffects.woundCriticalThreshold || keywordPayload.criticalWoundThreshold || 6),
    damageRerollEnabled: Boolean(ruleEffects.damageReroll),
    // 模式来自效果声明：ones 只重投 1；failed（原文"重投伤害骰"）映射为
    // 全部骰面各重投一次（specific + 1..6），不再硬编码为仅重投 1。
    damageRerollType: ruleEffects.damageRerollMode === "failed" ? "specific" : (ruleEffects.damageRerollMode || "ones"),
    damageRerollValues: ruleEffects.damageRerollMode === "failed" ? [1, 2, 3, 4, 5, 6] : [],
    damageRerollAmount: "all",
    woundRerollAllEnabled: Boolean(ruleWoundReroll) && ruleWoundReroll !== "none",
    woundRerollAllType: ruleWoundReroll === "none" ? "ones" : (ruleWoundReroll || "failed"),
    woundRerollAllValues: ruleWoundRerollValues,
    hazardousEnabled: Boolean(coreProfile.isHazardous),
    hazardousDamage: Number(coreProfile.hazardousDamage || 1),
    precisionEnabled: Boolean(coreProfile.targetsCharacter),
    psychicAttackEnabled: Boolean(coreProfile.isPsychic),
    minimumUnmodifiedHit: Number(coreProfile.unmodifiedHitThreshold || 0),
  });
}

function buildExternalRoundPayload() {
  const payload = buildSelectedRoundPayload();
  payload.simulations = 1000;
  return payload;
}

function renderHistogram(containerId, noteId, histogram, label = "") {
  const container = $("#" + containerId);
  const note = $("#" + noteId);
  if (!container) return;
  if (!histogram?.x?.length) {
    container.innerHTML = "";
    if (note) note.textContent = "暂无分布数据";
    return;
  }
  const total = Number(histogram.total || histogram.y.reduce((sum, value) => sum + Number(value), 0)) || 1;
  const entries = histogram.x
    .map((value, index) => ({ value: Number(value), count: Number(histogram.y[index] || 0) }))
    .filter((entry) => entry.count > 0);
  const maxCount = Math.max(...entries.map((entry) => entry.count)) || 1;
  const percentageOf = (entry) => (entry.count / total) * 100;
  const bins = entries.length > 80
    ? [...entries.slice(0, 79), { value: entries[79].value, count: entries.slice(79).reduce((sum, entry) => sum + entry.count, 0), merged: true }]
    : entries;
  container.innerHTML = bins.map((entry) => {
    const height = Math.max(2, Math.round((entry.count / maxCount) * 100));
    const labelText = entry.merged ? `${entry.value}+` : entry.value;
    const title = `${label}${labelText}：${entry.count.toLocaleString()} 次（${percentageOf(entry).toFixed(1)}%）`;
    return `<div class="distribution-bar" title="${escapeHtml(title)}"><span class="distribution-bar-value">${entry.count.toLocaleString()}</span><i style="height:${height}%"></i><b>${labelText}</b></div>`;
  }).join("");
  const mean = entries.reduce((sum, entry) => sum + entry.value * entry.count, 0) / total;
  if (note) note.textContent = `${total.toLocaleString()} 次模拟 · 均值 ${mean.toFixed(2)} · 悬停柱子查看具体次数`;
}

function renderCalculation(result) {
  state.localCalculation = result;
  const chance = `${(result.chance * 100).toFixed(1)}%`;
  const damage = result.averageDamage.toFixed(2);
  $("#killChance").textContent = chance;
  $("#calcChance").textContent = chance;
  $("#averageDamage").textContent = damage;
  $("#calcDamage").textContent = damage;
  $("#killMeter").style.width = `${result.chance * 100}%`;
  const attackerDraft = getCalculatorDraft("attacker");
  const defenderDraft = getCalculatorDraft("defender");
  const joined = Boolean(defenderDraft?.joinedMembers?.length);
  const defenderDrafts = calculatorSelectionKeys("defender").map((_, index) => getCalculatorDraft("defender", index)).filter(Boolean);
  const hazardousSelfDamage = Number(result.engine?.averages?.hazardousSelfDamage || 0);
  $("#calcNote").textContent = `结果来自当前选择的单位和可调参数（${state.attackMode === "ranged" ? "远程射击" : "近战"}；全歼概率按整个目标单位模型全部被摧毁计算；已按页面中勾选或选择的通用武器规则、阵营技能和单位技能结算${joined ? "；联合单位按护卫→角色分配伤害" : ""}）。伤害分布与平均伤害按防御方模型伤口上限结算（超量伤害不溢出到模型外，与外部计算器口径一致）${hazardousSelfDamage ? `；[危险]平均对进攻单位造成 ${hazardousSelfDamage.toFixed(2)} 点反噬伤害` : ""}。`;
  $("#calcTargetWounds").textContent = defenderDrafts.length > 1
    ? `${defenderDrafts.length} 个防御单位；按列表顺序先后承伤`
    : defenderDraft?.unit?.woundsPerModel ? `${defenderDraft.unit.woundsPerModel}W / 模型${joined ? "（护卫先承伤）" : ""}` : "已按所选目标数据卡结算";
  const engineResult = result.engine || {};
  renderHistogram("damageDistribution", "damageDistributionNote", engineResult.totalDamage, "总伤害 ");
  renderHistogram("killsDistribution", "killsDistributionNote", engineResult.kills, "击杀 ");
  scheduleBattleSessionSave();
}

$("#runCalc").addEventListener("click", async () => {
  const button = $("#runCalc");
  try {
    // 乐观选中后阵营运行时可能仍在后台补载：开算前统一等待就绪
    // （已加载的阵营瞬时返回），并重建缺数据的草稿。
    await Promise.all(["attacker", "defender"].flatMap((side) =>
      calculatorSelectionKeys(side).map((key) => {
        const option = calculatorPickerOptions(side).allOptions.find((candidate) => candidate.key === key);
        const factionId = option?.factionId || option?.faction;
        return factionId ? ensureFactionRuntimeLoaded(factionId) : null;
      }).filter(Boolean)
    ));
    ["attacker", "defender"].forEach((side) => {
      calculatorSelectionKeys(side).forEach((_, index) => {
        const draft = state.calculatorDrafts[side]?.[index];
        // 缺 data 的草稿说明是在阵营水合完成前按空数据构建的，重建即可；
        // 数据完整的草稿保留，避免丢掉用户手动调整过的设置。
        if (draft && !draft.data) state.calculatorDrafts[side][index] = null;
      });
    });
    renderCalculatorDetails();
  } catch (error) {
    console.error(error);
    showToast("阵营数据加载失败，请检查资源是否完整");
    return;
  }
  try { buildExternalRoundPayload(); } catch (error) { showToast(error.message); return; }
  button.disabled = true;
  button.textContent = "模拟中…";
  window.setTimeout(() => {
    try {
      renderCalculation(simulateScenario());
      showToast("模拟完成");
    } catch (error) {
      showToast(error.message);
    }
    button.disabled = false;
    button.textContent = "模拟 1,000 次";
  }, 30);
});

function loadSettingsForm() {
  $("#apiMode").value = state.settings.mode;
  $("#apiKey").value = state.settings.key || "";
  $("#apiEndpoint").value = state.settings.mode === "proxy" && state.settings.endpoint === DEFAULT_GLM_ENDPOINT
    ? ""
    : state.settings.endpoint;
  $("#apiModel").value = state.settings.model;
  $("#rememberKey").checked = state.settings.rememberKey;
  updateEndpointHint();
}

function updateEndpointHint() {
  const mode = $("#apiMode").value;
  $("#apiEndpoint").placeholder = mode === "proxy" ? "https://你的-worker.example.workers.dev/api/chat" : DEFAULT_GLM_ENDPOINT;
  $("#apiEndpoint").disabled = false;
}

$("#apiMode").addEventListener("change", () => {
  const endpoint = $("#apiEndpoint");
  if ($("#apiMode").value === "proxy") {
    if (endpoint.value === DEFAULT_GLM_ENDPOINT) endpoint.value = "";
  } else if (!endpoint.value || /workers\.dev|workers\.com/i.test(endpoint.value)) {
    endpoint.value = DEFAULT_GLM_ENDPOINT;
  }
  updateEndpointHint();
});
$("#settingsForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveSettings({
    mode: $("#apiMode").value,
    key: $("#apiKey").value.trim(),
    endpoint: $("#apiEndpoint").value.trim(),
    model: $("#apiModel").value.trim() || DEFAULT_GLM_MODEL,
    rememberKey: $("#rememberKey").checked,
  });
  $("#connectionStatus").textContent = state.settings.mode === "proxy" ? "代理待连接" : state.settings.key ? "AI 已配置" : "本地预览";
  $("#connectionStatus").classList.toggle("muted", !state.settings.key && state.settings.mode !== "proxy");
  showToast("连接设置已保存");
});

function getRelevantFolders(question) {
  const text = question.toLowerCase();
  const selected = new Set(["规则书"]);
  const factionNames = new Set([state.rosters.attacker.faction, state.rosters.defender.faction].filter(Boolean));
  FACTION_PACKAGES.forEach((definition) => {
    const searchTerms = [definition.name, definition.englishName, ...(definition.aliases || [])]
      .map((term) => String(term || "").toLowerCase())
      .filter(Boolean);
    if (searchTerms.some((term) => text.includes(term))) selected.add(definition.name);
  });
  factionNames.forEach((faction) => selected.add(faction));
  return selected;
}

function getRelevantKinds(question) {
  const text = question.toLowerCase();
  const kinds = new Set(["datasheet", "detachment", "supplement"]);
  if (/勘误|faq|修订|特殊/i.test(text)) kinds.add("rulebook");
  if (/射击|近战|命中|造伤|豁免|伤害|冲锋|移动|掩体|规则|阶段|战斗/i.test(text)) kinds.add("rulebook");
  return kinds;
}

function currentBattleState() {
  return ["attacker", "defender"].map((side) => {
    const roster = state.rosters[side];
    const units = roster.groups.length ? roster.groups.map((group) => {
      const members = group.units.map((unit) => `${unit.name}（${activeModels(unit).length}/${unit.models.length} 模型存活；装备：${Object.entries(countEquipment(unit)).map(([name, count]) => `${count}x ${name}`).join("、") || "无"}）`).join("；");
      return group.category === "联合单位" || /^联合单位/.test(group.title || "")
        ? `【${group.title}，联合单位，成员：${members}】`
        : members;
    }).join("；") : "未建立单位";
    return `${sideLabel(side)}：${roster.name}，阵营=${roster.faction}。单位：${units}`;
  }).join("\n");
}

function relevantExcerpt(content, question) {
  const rosterNames = ["attacker", "defender"].flatMap((side) => getRosterUnits(state.rosters[side]).map((unit) => unit.name));
  const terms = [...rosterNames, ...question.match(/[\u4e00-\u9fffA-Za-z0-9_-]{2,}/g) || []]
    .map((term) => term.trim())
    .filter((term, index, all) => term.length >= 2 && all.indexOf(term) === index)
    .sort((a, b) => b.length - a.length);
  const index = terms.map((term) => content.indexOf(term)).find((position) => position >= 0);
  if (index === undefined) return content.slice(0, 4000);
  return content.slice(Math.max(0, index - 900), index + 4100);
}

async function buildLibraryContext(question) {
  const folders = getRelevantFolders(question);
  await ensureLibraryFilesForFolders(folders);
  const kinds = getRelevantKinds(question);
  const files = await getLibraryFiles();
  const normalized = files.map((file) => ({ ...file, faction: file.faction || BUILTIN_FILE_METADATA[file.name]?.faction || "未分类", kind: file.kind || BUILTIN_FILE_METADATA[file.name]?.kind || "supplement" }));
  const selected = normalized.filter((file) => !LEGACY_AUTO_EXTRACTS.has(file.name) && file.content && folders.has(file.faction) && kinds.has(file.kind));
  const ordered = selected.sort((a, b) => Number(b.faction !== "规则书") - Number(a.faction !== "规则书"));
  const excerpts = ordered.slice(0, 6).map((file) => `【${file.faction}/${KIND_LABELS[file.kind] || "补充"}/${file.name}】\n${relevantExcerpt(file.content, question)}`);
  return { excerpts: excerpts.join("\n\n"), selected: ordered.map((file) => `${file.faction}/${KIND_LABELS[file.kind] || "补充"}/${file.name}`) };
}

function localAssistantReply(text) {
  if (!state.rosters.attacker.groups.length || !state.rosters.defender.groups.length) return "请先在“军表”页导入双方的军表。导入后可在单位详情中记录伤口或移除阵亡模型。";
  if (/射击|击杀|概率|伤害|近战|冲锋/.test(text)) return "已识别为需要战斗计算。配置 AI 后，我会结合当前单位、装备与伤口计算，并在信息不足时追问。";
  if (/计谋|战略|分遣队/.test(text)) return "配置 AI 连接后即可查询这次行动可用的规则与限制。";
  return "这是本地预览模式。请在“设置”页配置 GLM API Key 或 Worker 地址，然后直接描述你要进行的行动。";
}

function appendMessage(role, text) {
  const container = $("#chatMessages");
  const item = document.createElement("div");
  item.className = `message ${role}`;
  item.innerHTML = role === "assistant" ? `<span class="avatar">⚔</span><p>${escapeHtml(text).replace(/\n/g, "<br />")}</p>` : `<p>${escapeHtml(text).replace(/\n/g, "<br />")}</p>`;
  container.appendChild(item);
  container.scrollTop = container.scrollHeight;
}

function assistantUnitNameKey(value) {
  return String(value || "")
    .replace(/[\s\u00a0·・，,。.!！?？()（）\[\]【】_-]/g, "")
    .toLowerCase();
}

function assistantJoinedUnitSummary(resolved) {
  const entry = resolved?.entry;
  const group = entry?.group;
  const joined = Boolean(entry?.rosterUnit && group && (group.category === "联合单位" || /^联合单位/.test(group.title || "")));
  if (!joined) return null;
  return {
    title: group.title,
    rosterKey: resolved.candidate?.key || entry.key,
    members: group.units.filter((unit) => activeModels(unit).length).map((unit) => ({
      name: unit.name,
      role: unit.role || "联合成员",
      livingModels: activeModels(unit).length,
      totalModels: unit.models.length,
    })),
  };
}

function assistantUnitCandidates(name, side = "") {
  const query = assistantUnitNameKey(name);
  if (!query) return [];
  const options = calculatorPickerOptions(side === "attacker" || side === "defender" ? side : "attacker").allOptions;
  const unique = new Map();
  options.forEach((option) => {
    const optionName = assistantUnitNameKey(option.name);
    if (!optionName || !(optionName === query || optionName.includes(query) || query.includes(optionName))) return;
    const priority = option.key.startsWith(`roster:${side}:`) ? (option.joined ? 0 : 1) : option.key.startsWith("roster:") ? (option.joined ? 2 : 3) : 4;
    const identity = option.key.startsWith("roster:") ? option.key : `${option.name}:${option.faction || ""}`;
    const existing = unique.get(identity);
    if (!existing || priority < existing.priority) unique.set(identity, { ...option, priority });
  });
  return [...unique.values()].sort((left, right) => left.priority - right.priority || left.name.length - right.name.length);
}

async function resolveAssistantCalculatorEntry(name, side, rosterKey = "") {
  const rosterCandidate = String(rosterKey || "").startsWith(`roster:${side}:`)
    ? calculatorPickerOptions(side).allOptions.find((option) => option.key === rosterKey)
    : null;
  const candidates = rosterCandidate ? [rosterCandidate] : assistantUnitCandidates(name, side);
  if (!candidates.length) throw new Error(`未找到“${name}”对应的数据卡或当前军表单位。请使用完整单位名称。`);
  const candidate = candidates[0];
  if (candidate.factionId || candidate.faction) await ensureFactionRuntimeLoaded(candidate.factionId || candidate.faction);
  const entry = getCalculatorEntry(side, candidate.key);
  const data = getCalculatorCardData(entry);
  if (!entry || !data?.unit) throw new Error(`“${candidate.name}”没有可计算的结构化数据卡。`);
  return { key: candidate.key, entry, data, candidate };
}

function assistantRuleSuggestions(resolved) {
  const faction = resolved.entry.faction || resolved.candidate.faction;
  const joinedMembers = assistantJoinedUnitSummary(resolved)?.members || [];
  const unitNames = [resolved.entry.name, ...joinedMembers.map((member) => member.name)];
  const rules = window.WarhammerRuleResolver?.rulesForUnits(faction, unitNames) || { faction: [], unit: [] };
  const seen = new Set();
  return [...rules.faction, ...rules.unit]
    .filter((rule) => rule?.name && Array.isArray(rule.controls) && rule.controls.length)
    .filter((rule) => !seen.has(rule.id) && seen.add(rule.id))
    .map((rule) => ({
      name: rule.name,
      controls: rule.controls.map((control) => control.label).filter(Boolean),
      phases: [...new Set([rule.effect, ...(rule.effects || [])].filter(Boolean).map((effect) => effect.phase).filter(Boolean))],
    }));
}

function assistantCombatOptions(resolved, attackMode, side) {
  const phase = attackMode === "melee" ? "melee" : "ranged";
  const faction = resolved.entry.faction || resolved.candidate.faction;
  const skills = assistantRuleSuggestions(resolved)
    .filter((rule) => !rule.phases.length || rule.phases.includes(phase))
    .map((rule) => ({ ...rule, kind: "技能", side }));
  const roster = resolved.entry.rosterUnit ? state.rosters[resolved.entry.rosterSide] : null;
  const detachmentRules = roster
    ? window.WarhammerRuleResolver?.rulesForDetachments(faction, roster.detachmentIds || []).rules || []
    : [];
  const phaseTerms = phase === "melee" ? /近战|肉搏|战斗/i : /射击|远程|开火/i;
  const stratagems = detachmentRules
    .filter((rule) => rule?.type === "stratagem" && Number.isFinite(Number(rule.cp)))
    .filter((rule) => phaseTerms.test(`${rule.timing || ""}\n${rule.text || ""}`))
    .map((rule) => ({
      kind: "计谋", side, name: rule.name, cp: Number(rule.cp), timing: rule.timing || "", target: rule.target || "", status: rule.status || "需确认目标与触发条件",
    }));
  return [...skills, ...stratagems];
}

function assistantProfileSummary(resolved) {
  const { entry, data, candidate } = resolved;
  return {
    name: entry.name,
    faction: entry.faction || candidate.faction || "",
    source: entry.rosterUnit ? "当前军表（存活模型与装备已计入）" : "内置结构化数据卡",
    unit: data.unit,
    weapons: (data.weapons || []).map(({ name, type, attacks, skill, strength, ap, damage, abilities }) => ({ name, type, attacks, skill, strength, ap, damage, abilities })),
    abilities: data.abilities || [],
    joinedUnit: assistantJoinedUnitSummary(resolved),
    availableOptions: assistantRuleSuggestions(resolved),
  };
}

async function executeAssistantToolCall(toolCall) {
  let args;
  try { args = JSON.parse(toolCall.function?.arguments || "{}"); } catch { return { ok: false, error: "工具参数不是有效 JSON。" }; }
  const name = toolCall.function?.name;
  if (name === "find_units") {
    const candidates = assistantUnitCandidates(args.query, args.side).slice(0, 12);
    return candidates.length
      ? { ok: true, units: candidates.map((candidate) => {
        const entry = getCalculatorEntry(candidate.side || args.side || "attacker", candidate.key);
        const joinedUnit = entry ? assistantJoinedUnitSummary({ entry, candidate }) : null;
        return {
          name: candidate.name, faction: candidate.faction || "", source: candidate.key.startsWith("roster:") ? "当前军表" : "内置数据卡",
          rosterKey: candidate.key.startsWith("roster:") ? candidate.key : "", joinedUnit,
        };
      }) }
      : { ok: false, error: `没有找到“${args.query || ""}”。` };
  }
  if (name === "get_unit_profile") {
    try { return { ok: true, profile: assistantProfileSummary(await resolveAssistantCalculatorEntry(args.name, args.side || "attacker", args.rosterKey)) }; } catch (error) { return { ok: false, error: error.message }; }
  }
  if (name === "calculate_combat") {
    if (!args.attacker || !args.defender || !["ranged", "melee"].includes(args.attackMode)) return { ok: false, error: "计算需要 attacker、defender 和 ranged 或 melee 攻击类型。" };
    const previous = {
      selection: { ...state.calculatorSelection }, selections: { attacker: [...calculatorSelectionKeys("attacker")], defender: [...calculatorSelectionKeys("defender")] },
      drafts: state.calculatorDrafts, context: { ...state.combatContext }, attackMode: state.attackMode,
    };
    try {
      const [attacker, defender] = await Promise.all([resolveAssistantCalculatorEntry(args.attacker, "attacker", args.attackerRosterKey), resolveAssistantCalculatorEntry(args.defender, "defender", args.defenderRosterKey)]);
      state.calculatorSelection = { attacker: attacker.key, defender: defender.key };
      state.calculatorSelections = { attacker: [attacker.key], defender: [defender.key] };
      state.calculatorDrafts = { attacker: [], defender: [] };
      state.attackMode = args.attackMode;
      Object.keys(state.combatContext).forEach((key) => { state.combatContext[key] = Boolean(args.context?.[key]); });
      const result = simulateScenario(1000);
      renderCalculation(result);
      renderCalculatorSelectors();
      $$("[data-calc-context]").forEach((input) => { input.checked = Boolean(state.combatContext[input.dataset.calcContext]); });
      $("#calculatorAttackMode").value = state.attackMode;
      // AI 计算与手动计算共享同一场景状态：计算成功后场景保持为当前场景并持久化。
      scheduleBattleSessionSave();
      return {
        ok: true,
        calculator: "本地规则引擎（1,000 次模拟）",
        attacker: assistantProfileSummary(attacker), defender: assistantProfileSummary(defender), attackMode: state.attackMode, context: state.combatContext,
        combatOptions: {
          attacker: assistantCombatOptions(attacker, state.attackMode, "attacker"),
          defender: assistantCombatOptions(defender, state.attackMode, "defender"),
        },
        averageDamage: Number(result.averageDamage.toFixed(2)), killProbability: Number((result.chance * 100).toFixed(1)), killProbabilityUnit: "%",
      };
    } catch (error) {
      state.calculatorSelection = previous.selection;
      state.calculatorSelections = previous.selections;
      state.calculatorDrafts = previous.drafts;
      state.combatContext = previous.context;
      state.attackMode = previous.attackMode;
      return { ok: false, error: error.message };
    }
  }
  return { ok: false, error: `不支持的工具：${name || "unknown"}` };
}

async function requestAssistantCompletion(settings, messages, tools = []) {
  const endpoint = settings.endpoint || (settings.mode === "direct" ? DEFAULT_GLM_ENDPOINT : "");
  if (!endpoint) throw new Error("请先在设置页填入 Worker 地址。");
  const headers = { "Content-Type": "application/json" };
  if (settings.mode === "direct") headers.Authorization = `Bearer ${settings.key}`;
  const payload = { model: settings.model, messages, stream: false };
  if (tools.length) { payload.tools = tools; payload.tool_choice = "auto"; }
  const response = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  const data = await response.json();
  return data.choices?.[0]?.message || null;
}

function formatAssistantToolResult(_route, result) {
  // 单位查找结果（确定性短名称路由 / 模型调用 find_units）：列候选，不编造。
  if (Array.isArray(result?.units)) {
    if (!result.ok || !result.units.length) return result.error || "没有找到匹配单位；请用更完整的名称再试。";
    const listed = result.units.map((unit) => `${unit.name}（${unit.faction || "未分类"}${unit.source ? " · " + unit.source : ""}）`).join("；");
    return `找到 ${result.units.length} 个匹配单位：${listed}。请确认要查询或计算的完整单位名称（同名单位用阵营区分）。`;
  }
  if (_route?.intent === "combat-summary" && Array.isArray(result)) {
    const melee = result.find((item) => item?.attackMode === "melee");
    const ranged = result.find((item) => item?.attackMode === "ranged");
    const failures = result.filter((item) => !item?.ok);
    if (failures.length) return `未能完成完整的一轮伤害比较：${failures.map((item) => item.error || "本地规则引擎没有返回结果。").join("；")}`;
    const describe = (item, label) => `${label}：平均 ${item.averageDamage} 点有效伤害，全歼概率 ${item.killProbability}${item.killProbabilityUnit || "%"}`;
    const reminders = [
      "未启用掩体、半程、冲锋或一次性技能等修正。",
      "可在计算器展开单位技能；若攻击方的技能带有开关，按实际条件开启后会重新结算。",
      "常见需要确认的条件：目标是否有掩体、远程是否在半程、近战是否本回合冲锋，以及是否使用可计算的技能或计谋。",
    ];
    const availableOptions = [...(melee?.attacker?.availableOptions || []), ...(ranged?.attacker?.availableOptions || [])]
      .filter((option, index, all) => all.findIndex((item) => item.name === option.name) === index)
      .map((option) => `${option.name}${option.controls.length ? `（${option.controls.join("、")}）` : ""}`);
    return [
      `结论：${melee?.attacker?.name || ranged?.attacker?.name || "攻击方"}对${melee?.defender?.name || ranged?.defender?.name || "目标"}的一轮攻击比较。`,
      describe(melee, "近战"),
      describe(ranged, "远程"),
      "这两项是各阶段独立结果，不相加；实际一回合能否同时发生取决于单位位置与对局流程。",
      availableOptions.length ? `可计算的可选技能：${availableOptions.join("；")}。` : "可计算的可选技能：当前数据卡没有带开关的已建模选项。",
      `提醒：${reminders.join(" ")}`,
      "计算依据：本地规则引擎（每种攻击方式各进行 1,000 次模拟）。",
    ].join("\n\n");
  }
  if (!result?.ok) return `未能计算：${result?.error || "本地规则引擎没有返回结果。"}`;
  if (result.attackMode !== "ranged" && result.attackMode !== "melee") return JSON.stringify(result);
  const mode = result.attackMode === "ranged" ? "远程射击" : "近战攻击";
  const conditions = Object.entries(result.context || {})
    .filter(([, enabled]) => enabled)
    .map(([key]) => ({ targetWithinHalfRange: "半程", targetHasCover: "目标在掩体", attackerCharged: "攻击者冲锋" }[key] || key));
  return [
    `结论：${result.attacker.name}以${mode}攻击${result.defender.name}，平均造成 ${result.averageDamage} 点有效伤害。`,
    `全歼目标单位的概率：${result.killProbability}${result.killProbabilityUnit || "%"}。`,
    `计算依据：${result.calculator || "本地规则引擎"}${conditions.length ? `；条件：${conditions.join("、")}` : "；未额外启用战场修正"}。`,
  ].join("\n\n");
}

async function callAssistant(text) {
  const settings = state.settings;
  if (!state.tacticalAgent) {
    if (!window.WarhammerTacticalAgent?.create || !window.WarhammerTacticalConstitution?.toolDefinitions) throw new Error("战术 Agent 模块未加载。");
    state.tacticalAgent = window.WarhammerTacticalAgent.create({
      tools: window.WarhammerTacticalConstitution.toolDefinitions,
      request: (messages, tools) => requestAssistantCompletion(state.settings, messages, tools),
      executeTool: executeAssistantToolCall,
      routeQuestion: (question, memory) => window.WarhammerTacticalCorpus?.route?.(question, memory, (query) => assistantUnitCandidates(query).length) || null,
      formatToolResult: formatAssistantToolResult,
      buildContext: async (question) => {
        const library = await buildLibraryContext(question);
        return {
          battle: currentBattleState(),
          library: `已选资料：${library.selected.join("；") || "无可检索文本资料"}\n\n资料摘录：\n${library.excerpts || "暂无文本摘录（PDF 已归档但未转为可检索文本）"}`,
        };
      },
    });
  }
  const route = window.WarhammerTacticalCorpus?.route?.(text, state.tacticalAgent.getMemory(), (query) => assistantUnitCandidates(query).length);
  if (settings.mode === "direct" && !settings.key && !route) return localAssistantReply(text);
  return state.tacticalAgent.answer(text);
}

$("#chatForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = $("#chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  appendMessage("user", text);
  const pending = "正在分析并计算…";
  appendMessage("assistant", pending);
  const pendingNode = $("#chatMessages").lastElementChild;
  try {
    const reply = await callAssistant(text);
    pendingNode.querySelector("p").innerHTML = escapeHtml(reply).replace(/\n/g, "<br />");
    $("#connectionStatus").textContent = state.settings.mode === "proxy" || state.settings.key ? "AI 已连接" : "本地预览";
    $("#connectionStatus").classList.remove("muted");
  } catch (error) {
    console.error(error);
    const detail = error?.message ? `\n\n${error.message}` : "";
    pendingNode.querySelector("p").innerHTML = escapeHtml(`调用失败：${detail || "请检查 API 地址、Key 或浏览器跨域设置。"}\n\n若是 GitHub Pages 直接调用失败，请切换到 Worker 代理模式。`).replace(/\n/g, "<br />");
    showToast("AI 调用失败");
  }
});

$("#chatInput").addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
  event.preventDefault();
  $("#chatForm").requestSubmit();
});

$$('.quick-prompts button').forEach((button) => button.addEventListener("click", () => {
  $("#chatInput").value = button.dataset.prompt;
  $("#chatInput").focus();
}));

loadSettingsForm();
renderRosters();
importBuiltinLibraryFiles();
loadCalculatorCards();

// 空闲时段把全部阵营运行时（规则/分遣队/数据卡包）下载并水合到端侧：
// 打开网页后后台执行（约 2MB gzip），完成后任意单位即点即算、整站可离线。
// 进度通过页面底部徽标实时展示，避免"不知道数据准备好了没有"的困惑；
// 注册失败或非 https 环境静默降级为原有按需加载路径。
function nextIdleBreak() {
  return new Promise((resolve) => {
    if (window.requestIdleCallback) window.requestIdleCallback(() => resolve(), { timeout: 800 });
    else window.setTimeout(resolve, 60);
  });
}

function updateRuntimeStatus(text, done = false) {
  let badge = document.getElementById("runtimeStatus");
  if (!badge) {
    badge = document.createElement("div");
    badge.id = "runtimeStatus";
    badge.className = "runtime-status";
    document.body.appendChild(badge);
  }
  badge.textContent = text;
  badge.classList.toggle("is-done", done);
  badge.hidden = false;
  if (done) window.setTimeout(() => { badge.hidden = true; }, 4000);
}

async function prepareAllFactionRuntimes() {
  const definitions = window.WarhammerFactionRegistry?.list?.() || [];
  const pending = definitions.filter((definition) => !hydratedCalculatorFactions.has(definition.id));
  if (!pending.length) return;
  let done = 0;
  for (const definition of pending) {
    // 逐阵营在空闲间隙执行：网络与解析尽量避开用户正在操作的瞬间。
    await nextIdleBreak();
    try {
      await ensureFactionRuntimeLoaded(definition.id);
    } catch {
      // 单个阵营后台预载失败不影响使用，按需加载路径仍会重试。
    }
    done += 1;
    updateRuntimeStatus(`后台准备阵营数据 ${done}/${pending.length}，期间可正常使用`);
  }
  updateRuntimeStatus("全部阵营数据已就绪，支持离线使用", true);
}

function initRuntimePrecache() {
  if ("serviceWorker" in navigator && window.isSecureContext) {
    navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).catch(() => {});
  }
  window.addEventListener("load", () => {
    const scheduleIdle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 2500));
    scheduleIdle(() => prepareAllFactionRuntimes());
  });
}
initRuntimePrecache();
