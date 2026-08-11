const STORAGE_KEY = "warhammer-tactical-assistant-settings";
const DB_NAME = "warhammer-tactical-assistant-v1";
const DB_STORE = "library";
const ROSTER_STORAGE_KEY = "warhammer-tactical-assistant-rosters-v2";
const CORE_LIBRARY_FILES = [
  "data/规则书/核心规则-可检索.md",
  "data/规则书/分遣队速查-可检索.md",
  "data/规则书/AI-战斗规则摘要.md",
];
const FACTION_PACKAGES = window.WarhammerFactionRegistry?.list() || [];
const DEFAULT_SETTINGS = {
  mode: "direct",
  key: "",
  endpoint: "https://api.deepseek.com/chat/completions",
  model: "deepseek-v4-flash",
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

const state = {
  settings: loadSettings(),
  messages: [],
  rosters: loadRosters(),
  datasheetCache: {},
  calculatorCards: [],
  calculatorSelection: { attacker: "", defender: "" },
  calculatorSelections: { attacker: [""], defender: [""] },
  calculatorSearch: { attacker: "", defender: "" },
  calculatorPickerSearch: { attacker: [""], defender: [""] },
  calculatorPickerOpen: { attacker: [false], defender: [false] },
  calculatorDrafts: { attacker: [], defender: [] },
  combatContext: {
    targetWithinHalfRange: false,
    attackerAdvanced: false,
    attackerEngaged: false,
    attackerDeployedThisTurn: false,
    attackerMovedOver3: false,
    attackerCharged: false,
    targetHasCover: false,
    usingIndirectFire: false,
    attackerRemainedStationary: false,
    targetVisibleToFriendly: false,
  },
  attackMode: "ranged",
};

const factionLookupEntries = FACTION_PACKAGES.flatMap((definition) => [definition.name, ...definition.aliases].map((name) => [name, definition]));
const DATASHEET_FILES = Object.fromEntries(factionLookupEntries.filter(([, definition]) => definition.data.datasheet).map(([name, definition]) => [name, definition.data.datasheet]));
const DATASHEET_JSON_FILES = Object.fromEntries(factionLookupEntries.filter(([, definition]) => definition.data.catalog).map(([name, definition]) => [name, definition.data.catalog]));
const DATASHEET_ALIASES = Object.fromEntries(factionLookupEntries.map(([name, definition]) => [name, Object.fromEntries(Object.entries(definition.unitAliases).map(([alias, canonical]) => [alias, [canonical]]))]));
const DIGITAL_UNIT_ALIASES = Object.fromEntries(FACTION_PACKAGES.filter((definition) => Object.keys(definition.digitalUnitAliases).length).map((definition) => [definition.name, definition.digitalUnitAliases]));
const hydratedCalculatorFactions = new Set();

// Canonical unit name -> every alias declared by any faction package. Used to
// let the picker search find a card by any of its Chinese aliases (e.g. typing
// 泰丰斯 finds 泰弗斯) without loading any faction runtime data.
const DATASHEET_CANONICAL_ALIASES = Object.values(DATASHEET_ALIASES)
  .flatMap((factionAliases) => Object.entries(factionAliases))
  .reduce((index, [alias, canonicals]) => {
    canonicals.forEach((canonical) => {
      const list = index.get(canonical) || [];
      list.push(alias);
      index.set(canonical, list);
    });
    return index;
  }, new Map());

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function unitNameCandidates(name) {
  const source = String(name || "");
  const normalized = source.replace(/\([^)]*\)/g, "").trim();
  const withoutFactionPrefixes = factionLookupEntries
    .map(([prefix]) => source.startsWith(prefix) ? source.slice(prefix.length).trim() : "")
    .filter(Boolean);
  const aliases = Object.values(DATASHEET_ALIASES).flatMap((factionAliases) => [
    ...(factionAliases[source] || []),
    ...(factionAliases[normalized] || []),
    ...withoutFactionPrefixes.flatMap((candidate) => factionAliases[candidate] || []),
  ]);
  return [...new Set([source, normalized, ...withoutFactionPrefixes, ...aliases].filter(Boolean))];
}

function getUnitProfile(name) {
  return findStructuredCalculatorCard(name)?.data?.unit || null;
}

function loadSettings() {
  try {
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
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

function normalizeRosterUnit(unit) {
  const profile = getUnitProfile(unit.name);
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

function normalizeGroup(group) {
  return { id: group.id || makeId("group"), title: group.title || "单位", category: group.category || "", units: (group.units || []).map(normalizeRosterUnit) };
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
        groups: Array.isArray(roster.groups) ? roster.groups.map(normalizeGroup) : (Array.isArray(roster.units) ? [{ id: makeId("group"), title: "已导入单位", units: roster.units.map(normalizeRosterUnit) }] : []),
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

function calculatorPickerOptions(side) {
  if (!calculatorPickerOptionsCache) {
    const rosterOptions = ["attacker", "defender"].flatMap(calculatorRosterOptions);
    const cardOptions = calculatorCardNames().map((card) => ({
      key: calculatorCardKey(card),
      name: card.name,
      label: `${card.name} · ${card.faction || "datasheet"}`,
      faction: card.faction,
      factionId: card.factionId || "",
      search: [card.name, card.faction, ...(DATASHEET_CANONICAL_ALIASES.get(card.name) || [])].join(" "),
      card,
    }));
    calculatorPickerOptionsCache = { allOptions: [...rosterOptions, ...cardOptions] };
  }
  return calculatorPickerOptionsCache;
}

function calculatorPickerMenuMarkup(side, index, options) {
  const keys = calculatorSelectionKeys(side);
  const key = keys[index] || "";
  const search = state.calculatorPickerSearch[side]?.[index] || "";
  const query = String(search).trim().toLocaleLowerCase();
  const filtered = options.allOptions.filter((option) => !query || `${option.name} ${option.label} ${option.search || ""}`.toLocaleLowerCase().includes(query) || option.key === key);
  if (!filtered.length) return `<span class="calculator-picker-empty">没有匹配单位</span>`;
  const pinned = key ? filtered.find((option) => option.key === key) : null;
  const rest = pinned ? filtered.filter((option) => option.key !== key) : filtered;
  const visible = [...(pinned ? [pinned] : []), ...rest].slice(0, 60);
  const hint = filtered.length > visible.length
    ? `<span class="calculator-picker-more">共 ${filtered.length} 个匹配，显示前 ${visible.length} 个，继续输入缩小范围</span>`
    : "";
  return `${visible.map((option) => `<button type="button" class="calculator-picker-option" data-calculator-picker-option data-side="${side}" data-index="${index}" data-key="${escapeHtml(option.key)}"><strong>${escapeHtml(option.name)}</strong><small>${escapeHtml(option.label)}</small></button>`).join("")}${hint}`;
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

function refreshCalculatorPickerMenu(side, index) {
  const row = document.querySelector(`[data-calculator-picker-row][data-side="${side}"][data-index="${index}"]`);
  const menu = row?.querySelector("[data-calculator-picker-menu]");
  if (!menu) return;
  menu.innerHTML = calculatorPickerMenuMarkup(side, index, calculatorPickerOptions(side));
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
}

async function handleCalculatorPickerOption(event) {
  const option = event.target.closest("[data-calculator-picker-option]");
  if (!option) return;
  const side = option.dataset.side;
  const index = Number(option.dataset.index || 0);
  const selectedOption = calculatorPickerOptions(side).allOptions.find((candidate) => candidate.key === option.dataset.key);
  if (selectedOption?.factionId || selectedOption?.faction) {
    $("#calcNote").textContent = `正在加载${selectedOption.faction || "对应阵营"}数据…`;
    try {
      await ensureFactionRuntimeLoaded(selectedOption.factionId || selectedOption.faction);
    } catch (error) {
      console.error(error);
      showToast("阵营数据加载失败，请检查资源是否完整");
      return;
    }
  }
  const keys = calculatorSelectionKeys(side);
  keys[index] = option.dataset.key || "";
  state.calculatorPickerSearch[side] ||= [];
  state.calculatorPickerSearch[side][index] = "";
  state.calculatorPickerOpen[side] ||= [];
  state.calculatorPickerOpen[side][index] = false;
  state.calculatorSelection[side] = keys[0] || "";
  state.calculatorDrafts[side][index] = null;
  renderCalculatorSelectors();
  $("#calcNote").textContent = "已选择单位；请确认双方后开始计算。";
}

["attacker", "defender"].forEach((side) => {
  const container = $(`#calculator${side === "attacker" ? "Attacker" : "Defender"}Pickers`);
  container?.addEventListener("input", handleCalculatorPickerInput);
  container?.addEventListener("focusin", handleCalculatorPickerFocus);
  container?.addEventListener("click", handleCalculatorPickerClick);
  container?.addEventListener("click", handleCalculatorPickerOption);
  $(`#addCalculator${side === "attacker" ? "Attacker" : "Defender"}`)?.addEventListener("click", () => {
    calculatorSelectionKeys(side).push("");
    state.calculatorPickerSearch[side] ||= [];
    state.calculatorPickerSearch[side].push("");
    state.calculatorPickerOpen[side] ||= [];
    state.calculatorPickerOpen[side].push(false);
    state.calculatorDrafts[side].push(null);
    renderCalculatorSelectors();
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
});

$("#calculatorCoreContext")?.addEventListener("change", (event) => {
  const field = event.target?.dataset?.calcContext;
  if (!field || !Object.prototype.hasOwnProperty.call(state.combatContext, field)) return;
  state.combatContext[field] = Boolean(event.target.checked);
  renderCalculatorDetails();
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

function findStructuredCalculatorCard(name) {
  const aliases = unitNameCandidates(name);
  const normalize = (value) => String(value || "")
    .replace(/[\s\u00a0·•・,，。.!！:：;；/\\_\-—–]/g, "")
    .replace(/[（(][^）)]*[）)]/g, "")
    .toLowerCase();
  const candidates = new Set(aliases.map(normalize));
  return state.calculatorCards.find((card) => card.structured && card.data?.unit && [card.name, card.data.unit.name, card.data.englishName]
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
  return normalizeCalculatorCardData(findStructuredCalculatorCard(entry?.name)?.data);
}

function cloneCalculatorValue(value) {
  return value === undefined ? value : JSON.parse(JSON.stringify(value));
}

function calculatorSource(entry) {
  return entry?.rosterUnit ? "军表" : "数据卡";
}

function weaponMatchesRoster(weapon, rosterUnit) {
  const equipment = Object.keys(countEquipment(rosterUnit || {}));
  if (!equipment.length) return true;
  const candidates = [weapon?.name, weapon?.selectionGroup]
    .map((value) => String(value || "").replace(/[（(].*?[）)]/g, "").trim())
    .filter(Boolean);
  return equipment.some((item) => {
    const normalized = String(item).replace(/[（(].*?[）)]/g, "").trim();
    return normalized && candidates.some((name) => name.includes(normalized) || normalized.includes(name));
  });
}

function weaponModelCount(weapon, rosterUnit, fallback = 1) {
  const models = activeModels(rosterUnit || {});
  if (!models.length) return 0;
  const candidates = [weapon?.name, weapon?.selectionGroup]
    .map((value) => String(value || "").replace(/[（(].*?[）)]/g, "").trim())
    .filter(Boolean);
  if (!candidates.some(Boolean)) return models.length;
  const count = models.filter((model) => model.equipment.some((item) => {
    const normalized = String(item.name || "").replace(/[（(].*?[）)]/g, "").trim();
    return normalized && candidates.some((name) => name.includes(normalized) || normalized.includes(name));
  })).length;
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

function enabledCalculatorWeapons(data, entryName, rosterUnit, options = {}) {
  const baseUnit = data?.unit || {};
  const baseWeapons = (Array.isArray(data?.weapons) ? cloneCalculatorValue(data.weapons) : [])
    .filter((weapon) => !Array.isArray(options.weaponNames) || options.weaponNames.some((name) => weaponMatchesEquipmentText(weapon, name)));
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
  const card = entry.structured ? entry : findStructuredCalculatorCard(entry.name);
  const data = getCalculatorCardData(card || entry);
  const baseUnit = cloneCalculatorValue(data?.unit || {});
  const baseWeapons = enabledCalculatorWeapons(data, entry.name, entry.rosterUnit);
  const rosterUnit = entry.rosterUnit;
  const modelCount = rosterUnit ? activeModels(rosterUnit).length : Math.max(1, Number(baseUnit.models || baseUnit.defaultModels || 1) || 1);
  const joined = rosterUnit && entry.group && (entry.group.category === "联合单位" || /^联合单位/.test(entry.group.title || ""));
  const explicitJoinedMembers = joined ? entry.group.units.filter((member) => activeModels(member).length).flatMap((member) => {
    const memberData = member.id === rosterUnit.id ? data : calculatorDataForUnit(member, entry.faction);
    const memberUnit = cloneCalculatorValue(memberData?.unit || {});
    const explicitLeader = entry.group.units.some((candidate) => /领导|主将|领袖|character|leader/i.test(String(candidate.role || "")));
    const explicitGuard = entry.group.units.some((candidate) => /护卫|bodyguard/i.test(String(candidate.role || "")));
    const memberIndex = entry.group.units.indexOf(member);
    const role = /领导|主将|领袖|character|leader/i.test(String(member.role || "")) ? "角色" : /护卫|bodyguard/i.test(String(member.role || "")) ? "护卫" : (explicitGuard && !explicitLeader ? "角色" : (memberIndex === 0 ? "角色" : "护卫"));
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
  const sourceCard = sourceName && sourceName !== draft.entry?.name ? findStructuredCalculatorCard(sourceName) : null;
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
  return `<section class="calculator-rule-section"><div class="calculator-section-heading"><strong>${heading}</strong></div>${rules.map((rule) => `<div class="calculator-ability"><strong>${escapeHtml(rule.unitName ? `${rule.unitName} · ${rule.name}` : rule.name)}</strong><p>${escapeHtml(rule.text)}</p><small>${escapeHtml(statusFor(rule))}</small>${calculatorRuleControlMarkup(draft, side, rule)}</div>`).join("")}</section>`;
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

function resolvedRerollSelection(draft, kind, sourceKey, weaponIndex, threshold) {
  const selection = rerollSelection(draft, calculatorRerollKey(kind, sourceKey, weaponIndex), threshold);
  return selection.configured ? { type: "specific", values: selection.faces } : { type: "failed", values: [] };
}

function rerollFacesMarkup(draft, side, { kind, sourceKey, weaponIndex, threshold, title, locked = false }) {
  const key = calculatorRerollKey(kind, sourceKey, weaponIndex);
  const selection = rerollSelection(draft, key, threshold);
  const faces = new Set((locked ? [1] : selection.faces).map(Number));
  const stateText = locked ? "规则固定：仅重投 1" : (selection.configured ? "已按所选骰面重投" : "默认重投失败骰");
  return `<div class="calculator-reroll-control ${locked ? "is-locked" : ""}"><strong>${escapeHtml(title)}</strong><small>成功：${threshold}+；${stateText}</small><div class="calculator-reroll-faces">${[1, 2, 3, 4, 5, 6].map((face) => `<label class="${face >= threshold ? "is-success" : "is-failure"} ${faces.has(face) ? "is-selected" : ""}"><input type="checkbox" value="${face}" data-calc-side="${side}" data-calc-reroll-kind="${kind}" data-calc-reroll-key="${escapeHtml(key)}" data-calc-reroll-face ${faces.has(face) ? "checked" : ""} ${locked && face !== 1 ? "disabled" : ""} />${face}</label>`).join("")}</div>${locked ? "" : "<small>可选择成功骰来赌暴击；选择后会覆盖默认的失败骰重投。</small>"}</div>`;
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
  if (!count) return String(constant);
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
  const matches = (item) => {
    const normalized = String(item.name || "").replace(/[（(].*?[）)]/g, "").trim();
    return normalized && candidates.some((name) => name.includes(normalized) || normalized.includes(name));
  };
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
  const hitThreshold = isTorrentWeapon(weapon) ? 0 : parseSkill(weapon.skill);
  const defenderHitModifier = defenderHitModifierForDisplay();
  const sourceRules = resolvedRuleEffects(draft, sourceName).attack || {};
  const factionEffects = resolvedFactionEffects(draft, { unitName: sourceName }).attack || {};
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
  if (sourceRules.hitReroll && hitThreshold > 0 && !coreProfile.preventHitRerolls) {
    const rerollRule = window.WarhammerRuleResolver?.rulesForUnit(draft.entry?.faction, sourceName).unit.find((rule) => rule.effects?.some((effect) => effect.type === "hit-reroll"));
    sections.push(rerollFacesMarkup(draft, side, {
      kind: "rule-hit", sourceKey, weaponIndex, threshold: displayedHitThreshold,
      title: `${rerollRule?.name || "命中重投"} · 命中重投`, locked: sourceRules.hitReroll === "ones",
    }));
  }
  if (factionEffects.hitReroll && hitThreshold > 0 && !coreProfile.preventHitRerolls) {
    const rerollRule = window.WarhammerRuleResolver?.rulesForUnit(draft.entry?.faction, sourceName).faction.find((rule) => (rule.effects || []).some((effect) => effect.type === "hit-reroll"));
    sections.push(rerollFacesMarkup(draft, side, { kind: "faction-hit", sourceKey, weaponIndex, threshold: displayedHitThreshold, title: `${rerollRule?.name || "阵营规则"} · 命中重投` }));
  }
  const hasTwinLinked = coreProfile.effects.some((effect) => effect.type === "twin-linked");
  if (sourceRules.woundReroll || hasTwinLinked) {
    const defenderDraft = getCalculatorDraft("defender");
    const defenderToughness = Number(defenderDraft?.unit?.toughness || 0);
    const attackerStrength = Number(weapon.strength || 0) + Number(sourceRules.strengthModifier || 0);
    const baseWoundThreshold = defenderToughness ? woundTarget(attackerStrength, defenderToughness) : 4;
    const woundModifier = Number(sourceRules.woundModifier || 0) + Number(factionEffects.woundModifier || 0) + defenderWoundModifierForDisplay(attackerStrength, defenderToughness) + Number(coreProfile.woundModifier || 0);
    const woundThreshold = effectiveWoundThresholdForDisplay(baseWoundThreshold, woundModifier);
    const rerollRule = sourceRules.woundReroll
      ? window.WarhammerRuleResolver?.rulesForUnit(draft.entry?.faction, sourceName).unit.find((rule) => (rule.effects || (rule.effect ? [rule.effect] : [])).some((effect) => effect.type === "wound-reroll"))
      : null;
    sections.push(rerollFacesMarkup(draft, side, {
      kind: hasTwinLinked ? "core-wound" : "guard-wound", sourceKey, weaponIndex, threshold: woundThreshold,
      title: hasTwinLinked
        ? `${sourceRules.woundReroll ? `${rerollRule?.name || "单位规则"} + ` : ""}双联 · 造伤重投`
        : `${rerollRule?.name || "造伤重投"} · 造伤重投`,
      locked: !hasTwinLinked && sourceRules.woundReroll === "ones",
    }));
  }
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
  if (!draft.weapons?.length) return `<p class="calculator-missing">这张数据卡还没有结构化武器字段，暂时无法计算。请补充数据卡 JSON 后再试。</p>`;
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
  const card = findStructuredCalculatorCard(unit.name);
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
  const explicitLeader = group.units.some((unit) => /领导|主将|领袖|character|leader/i.test(String(unit.role || "")));
  const explicitGuard = group.units.some((unit) => /护卫|bodyguard/i.test(String(unit.role || "")));
  const members = draft.joinedMembers?.length
    ? draft.joinedMembers
    : group.units.filter((unit) => activeModels(unit).length).map((unit, index) => ({
      id: unit.id,
      name: unit.name,
      role: /领导|主将|领袖|character|leader/i.test(String(unit.role || "")) ? "角色" : /护卫|bodyguard/i.test(String(unit.role || "")) ? "护卫" : (explicitGuard && !explicitLeader ? "角色" : (index === 0 ? "角色" : "护卫")),
      unit: calculatorDataForUnit(unit, defender.faction)?.unit || {},
      modelCount: activeModels(unit).length,
      ruleName: unit.name,
    }));
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
      const ruleHitMode = sourceRules.hitReroll || sharedJoinedRules.hitReroll || sourceFactionEffects.hitReroll;
      const rerollKind = sourceRules.hitReroll || sharedJoinedRules.hitReroll ? "rule-hit" : "faction-hit";
      const ruleHitReroll = ruleHitMode === "ones"
        ? { type: "specific", values: [1] }
        : ruleHitMode === "failed"
          ? resolvedRerollSelection(attackerDraft, rerollKind, sourceKey, weaponIndex, resolvedHitState.effectiveTarget)
          : { type: "none", values: [] };
      const effectiveHitReroll = coreProfile.preventHitRerolls ? { type: "none", values: [] } : ruleHitReroll;
      const hasTwinLinked = coreProfile.effects.some((effect) => effect.type === "twin-linked");
      const ruleWoundMode = sourceRules.woundReroll || sharedJoinedRules.woundReroll || sourceFactionEffects.woundReroll;
      const woundReroll = hasTwinLinked
        ? resolvedRerollSelection(attackerDraft, "core-wound", sourceKey, weaponIndex, woundThreshold)
        : ruleWoundMode === "failed"
          ? resolvedRerollSelection(attackerDraft, "guard-wound", sourceKey, weaponIndex, woundThreshold)
          : { type: ruleWoundMode || "", values: [] };
      return {
        name: `${source.name} · ${weapon.name}`,
        modelCount: Number(weapon.modelCount ?? source.modelCount ?? 1),
        attacks: attackOverride,
        hit: isTorrentWeapon(weapon) ? "torrent" : hitThreshold,
        wound: woundThreshold,
        ap: Math.max(0, Math.abs(Number(weapon.ap || 0)) + Number(sourceRules.apModifier || 0) + Number(sharedJoinedRules.apModifier || 0) + Number(sourceFactionEffects.apModifier || 0) + defenderRuleEffects.incomingApModifier),
        damage: modifyDamageExpression(weapon.damage, Number(sourceRules.damageModifier || 0) + Number(sharedJoinedRules.damageModifier || 0) + Number(sourceFactionEffects.damageModifier || 0) + Number(coreProfile.damageModifier || 0)),
        effects: weaponEffectsFromKeywords(weapon, { hitReroll: effectiveHitReroll }, { ...sourceRules, sustainedHits: Math.max(Number(sourceRules.sustainedHits || 0), Number(sharedJoinedRules.sustainedHits || 0), Number(sourceFactionEffects.sustainedHits || 0)), lethalHits: Boolean(sourceRules.lethalHits || sharedJoinedRules.lethalHits || sourceFactionEffects.lethalHits), devastating: Boolean(sourceRules.devastating || sharedJoinedRules.devastating || sourceFactionEffects.devastating), damageReroll: Boolean(sourceRules.damageReroll || sharedJoinedRules.damageReroll || sourceFactionEffects.damageReroll), woundReroll: woundReroll.type, woundRerollValues: woundReroll.values, hitCriticalThreshold: sourceRules.hitCriticalThreshold || sharedJoinedRules.hitCriticalThreshold || sourceFactionEffects.hitCriticalThreshold, woundCriticalThreshold: sourceRules.woundCriticalThreshold || sharedJoinedRules.woundCriticalThreshold || sourceFactionEffects.woundCriticalThreshold }, { hitModifier: resolvedHitState.modifierTotal, woundModifier, targetKeywords: [...(defenderData.factionKeywords || []), ...(defenderData.keywords || [])], coreProfile }),
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
      .filter((unit) => !findStructuredCalculatorCard(unit.name))
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
  const names = [...new Set([...unitNameCandidates(unitName), ...(DATASHEET_ALIASES[faction]?.[unitName] || [])].filter(Boolean))];
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
  if (!window.pdfjsLib) return "";
  try {
    const buffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
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
  if (window.pdfjsLib) window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
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
  for (const [faction, pages] of Object.entries(DIGITAL_UNIT_ALIASES)) {
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
    const profile = getUnitProfile(unit.name);
    const card = findStructuredCalculatorCard(unit.name);
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
    const card = findStructuredCalculatorCard(unit.name);
    const wounds = Number(card?.data?.unit?.woundsPerModel || getUnitProfile(unit.name)?.woundsPerModel || 0);
    if (!wounds || !Array.isArray(unit.models)) return unit;
    return { ...unit, models: unit.models.map((model) => model.maximumWounds === 1 && model.currentWounds === 1 ? { ...model, maximumWounds: wounds, currentWounds: wounds, woundsSource: "datasheet" } : model) };
  }) }));
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
    damageRerollType: "ones",
    damageRerollAmount: "all",
    woundRerollAllEnabled: Boolean(ruleWoundReroll),
    woundRerollAllType: ruleWoundReroll || "failed",
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
}

$("#runCalc").addEventListener("click", () => {
  const button = $("#runCalc");
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
  $("#apiEndpoint").value = state.settings.endpoint;
  $("#apiModel").value = state.settings.model;
  $("#rememberKey").checked = state.settings.rememberKey;
  updateEndpointHint();
}

function updateEndpointHint() {
  const mode = $("#apiMode").value;
  $("#apiEndpoint").placeholder = mode === "proxy" ? "https://你的-worker.example.workers.dev/api/chat" : "https://api.deepseek.com/chat/completions";
  $("#apiEndpoint").disabled = false;
}

$("#apiMode").addEventListener("change", updateEndpointHint);
$("#settingsForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveSettings({
    mode: $("#apiMode").value,
    key: $("#apiKey").value.trim(),
    endpoint: $("#apiEndpoint").value.trim(),
    model: $("#apiModel").value.trim() || "deepseek-v4-flash",
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
    const units = getRosterUnits(roster).length ? getRosterUnits(roster).map((unit) => `${unit.name}（${activeModels(unit).length}/${unit.models.length} 模型存活；装备：${Object.entries(countEquipment(unit)).map(([name, count]) => `${count}x ${name}`).join("、") || "无"}）`).join("；") : "未建立单位";
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
  return "这是本地预览模式。请在“设置”页配置 DeepSeek API Key 或 Worker 地址，然后直接描述你要进行的行动。";
}

function appendMessage(role, text) {
  const container = $("#chatMessages");
  const item = document.createElement("div");
  item.className = `message ${role}`;
  item.innerHTML = role === "assistant" ? `<span class="avatar">⚔</span><p>${escapeHtml(text).replace(/\n/g, "<br />")}</p>` : `<p>${escapeHtml(text).replace(/\n/g, "<br />")}</p>`;
  container.appendChild(item);
  container.scrollTop = container.scrollHeight;
}

async function callAssistant(text) {
  const settings = state.settings;
  const library = await buildLibraryContext(text);
  const system = `你是战锤40,000对局助手。只能根据提供的资料、当前军表和明确写出的核心流程回答；不要臆造数据卡、分遣队、计谋或版本。

检索工作流：先识别问题是射击、近战、冲锋、移动、计谋还是规则解释；再使用当前双方军表识别阵营和单位；优先查该阵营的数据卡，其次分遣队规则/补充；仅在通用流程时查规则书。在缺少武器档案、目标属性、距离/视线、CP、阶段或版本时明确追问。数字版 PDF 已按原页和表格单元格整理为 Markdown；扫描版禁军数据卡由逐页中文 OCR 生成。两者都用来定位并解释资料，但扫描版 OCR 不能自动拼出 WS/BS、S、AP、D、伤口等数值用于计算。数值计算只接受结构化 JSON/明确文本字段，或先请用户确认原始数据卡。

核心战斗规则摘要（项目内核心规则书）：一回合依次经过指挥、移动、射击、冲锋、近战阶段。射击阶段仅用远程武器，逐个选择可射击单位和合法目标；近战阶段先跟进，再在符合条件的交战/本回合冲锋单位之间按先攻与交替选择结算近战，最后重整。一次攻击通常依次：选武器/目标与攻击次数 → 命中掷骰（WS/BS与修正、暴击）→ 造伤掷骰（力量对坚韧）→ 目标进行护甲或无敌豁免（AP会影响护甲）→ 分配伤害和失去伤口；不觉疼痛在每一点伤口失去时处理。必须以数据卡、武器技能和分遣队规则为准确认重掷、致命命中、连击、毁灭伤害、掩体等特例。警戒射击是对手移动阶段结束时的专门射击，通常仅未修正 6 命中且不可重掷，不能当作常规射击。计算时先用资料构造明确的参数，再建议或调用确定性骰子计算器。

回答简洁：先给结论，再列出依据和缺失项。`;
  const messages = [
    { role: "system", content: system },
    ...state.messages.slice(-8),
    { role: "user", content: `${text}\n\n当前双方军表与伤口：\n${currentBattleState()}\n\n本次选中的资料：${library.selected.join("；") || "无可检索文本资料"}\n\n资料摘录：\n${library.excerpts || "暂无文本摘录（PDF 已归档但未转为可检索文本）"}` },
  ];
  if (settings.mode === "direct" && !settings.key) return localAssistantReply(text);
  const endpoint = settings.endpoint || (settings.mode === "direct" ? "https://api.deepseek.com/chat/completions" : "");
  if (!endpoint) return "请先在设置页填入 Worker 地址。";
  const headers = { "Content-Type": "application/json" };
  if (settings.mode === "direct") headers.Authorization = `Bearer ${settings.key}`;
  const payload = settings.mode === "proxy" ? { messages, model: settings.model } : { model: settings.model, messages, stream: false };
  const response = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || data.output?.[0]?.content?.[0]?.text || "接口没有返回可显示的回答。";
}

$("#chatForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = $("#chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  appendMessage("user", text);
  state.messages.push({ role: "user", content: text });
  const pending = "正在分析并计算…";
  appendMessage("assistant", pending);
  const pendingNode = $("#chatMessages").lastElementChild;
  try {
    const reply = await callAssistant(text);
    pendingNode.querySelector("p").innerHTML = escapeHtml(reply).replace(/\n/g, "<br />");
    state.messages.push({ role: "assistant", content: reply });
    $("#connectionStatus").textContent = state.settings.mode === "proxy" || state.settings.key ? "AI 已连接" : "本地预览";
    $("#connectionStatus").classList.remove("muted");
  } catch (error) {
    console.error(error);
    pendingNode.querySelector("p").innerHTML = "调用失败：请检查 API 地址、Key 或浏览器跨域设置。若是 GitHub Pages 直接调用失败，请切换到 Worker 代理模式。";
    showToast("AI 调用失败");
  }
});

$$('.quick-prompts button').forEach((button) => button.addEventListener("click", () => {
  $("#chatInput").value = button.dataset.prompt;
  $("#chatInput").focus();
}));

loadSettingsForm();
renderRosters();
importBuiltinLibraryFiles();
loadCalculatorCards();
