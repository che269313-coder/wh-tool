const STORAGE_KEY = "warhammer-tactical-assistant-settings";
const DB_NAME = "warhammer-tactical-assistant-v1";
const DB_STORE = "library";
const ROSTER_STORAGE_KEY = "warhammer-tactical-assistant-rosters-v2";
const BUILTIN_LIBRARY_FILES = [
  "data/规则书/11版核心规则简中.pdf",
  "data/规则书/核心规则-可检索.md",
  "data/规则书/分遣队速查表.pdf",
  "data/规则书/分遣队速查-可检索.md",
  "data/规则书/AI-战斗规则摘要.md",
  "data/帝皇禁军/帝皇禁军10版中文老湿腐版1.07.pdf",
  "data/帝皇禁军/数据卡-OCR-可检索.md",
  "data/帝皇禁军/帝皇禁军-全部数据卡.json",
  "data/帝皇禁军/禁军盾卫.数据卡.json",
  "data/星际战士/星际战士11版中文1.0.pdf",
  "data/星际战士/分遣队规则-可检索.md",
  "data/星际战士/数据卡-可检索.md",
  "data/星际战士/星际战士-全部数据卡.json",
  "data/星际战士/冲击者突击艇.数据卡.json",
];
const DEFAULT_SETTINGS = {
  mode: "direct",
  key: "",
  endpoint: "https://api.deepseek.com/chat/completions",
  model: "deepseek-v4-flash",
  calculatorEndpoint: "",
  rememberKey: false,
};

const BUILTIN_FILE_METADATA = {
  "11版核心规则简中.pdf": { faction: "规则书", kind: "rulebook", builtin: true },
  "帝皇禁军10版中文老湿腐版1.07.pdf": { faction: "帝皇禁军", kind: "datasheet", builtin: true },
  "分遣队速查表.pdf": { faction: "规则书", kind: "detachment", builtin: true },
  "星际战士11版中文1.0.pdf": { faction: "星际战士", kind: "datasheet", builtin: true },
  "核心规则-可检索.md": { faction: "规则书", kind: "rulebook", builtin: true },
  "分遣队速查-可检索.md": { faction: "规则书", kind: "detachment", builtin: true },
  "AI-战斗规则摘要.md": { faction: "规则书", kind: "rulebook", builtin: true },
  "数据卡-OCR-可检索.md": { faction: "帝皇禁军", kind: "datasheet", builtin: true },
  "帝皇禁军-全部数据卡.json": { faction: "帝皇禁军", kind: "datasheet", builtin: true },
  "禁军盾卫.数据卡.json": { faction: "帝皇禁军", kind: "datasheet", builtin: true },
  "分遣队规则-可检索.md": { faction: "星际战士", kind: "detachment", builtin: true },
  "数据卡-可检索.md": { faction: "星际战士", kind: "datasheet", builtin: true },
  "星际战士-全部数据卡.json": { faction: "星际战士", kind: "datasheet", builtin: true },
  "冲击者突击艇.数据卡.json": { faction: "星际战士", kind: "datasheet", builtin: true },
};

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
};

const DATASHEET_FILES = {
  "帝皇禁军": "data/帝皇禁军/数据卡-OCR-可检索.md",
  "白色疤痕": "data/星际战士/数据卡-可检索.md",
  "星际战士": "data/星际战士/数据卡-可检索.md",
};
const DATASHEET_ALIASES = {
  "帝皇禁军": {
    "盾卫连长(主将)": ["盾卫连长"],
    "阿拉琉斯终结者": ["阿拉鲁斯终结者"],
    "警戒者": ["戒卫者"],
  },
  "白色疤痕": {
    "苏博登可汗(主将)": ["速不台可汗"],
  },
};
const CALCULATOR_CARD_FILES = [
  "data/帝皇禁军/禁军盾卫.数据卡.json",
  "data/帝皇禁军/帝皇禁军-全部数据卡.json",
  "data/星际战士/冲击者突击艇.数据卡.json",
  "data/星际战士/星际战士-全部数据卡.json",
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

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
    attacker: { name: "进攻方", faction: "", groups: [] },
    defender: { name: "防御方", faction: "", groups: [] },
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
    equipment: Array.isArray(model.equipment) ? model.equipment.map((item) => ({ name: item.name || String(item), count: Math.max(1, Number(item.count || 1)) })) : [],
  };
}

function normalizeRosterUnit(unit) {
  const models = Array.isArray(unit.models) && unit.models.length ? unit.models.map((model) => normalizeModel(model, unit.name)) : Array.from({ length: Math.max(1, Number(unit.models || unit.modelCount || 1)) }, () => normalizeModel({ wounds: unit.wounds, currentWounds: unit.currentWounds, equipment: unit.equipment || [] }, unit.name));
  return {
    id: unit.id || makeId("unit"), name: unit.name || "未命名单位", points: unit.points || "", role: unit.role || "", enhancement: unit.enhancement || "", notes: unit.notes || "", hasComposition: unit.hasComposition !== false, models,
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
        name: roster.name || (side === "attacker" ? "进攻方" : "防御方"),
        faction: roster.faction || "未分类",
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
  return [...new Map(state.calculatorCards.filter((card) => card.name).map((card) => [card.name, card])).values()];
}

function calculatorRosterOptions(side) {
  return state.rosters[side].groups.flatMap((group) => group.units.filter((unit) => activeModels(unit).length).map((unit) => ({
    key: `roster:${side}:${group.id}:${unit.id}`, name: unit.name, label: `${unit.name} · ${group.title}`, side, groupId: group.id, unitId: unit.id,
  })));
}

function renderCalculatorSelectors() {
  ["attacker", "defender"].forEach((side) => {
    const select = $(`#calculator${side === "attacker" ? "Attackers" : "Defenders"}`);
    if (!select) return;
    const rosterOptions = calculatorRosterOptions(side);
    const cardOptions = calculatorCardNames().map((card) => ({ key: `card:${card.faction}:${card.page || card.name}`, name: card.name, label: `${card.name} · 数据卡`, card }));
    select.innerHTML = `<option value="">请选择已导入单位或数据卡</option><optgroup label="当前军表">${rosterOptions.map((option) => `<option value="${escapeHtml(option.key)}">${escapeHtml(option.label)}</option>`).join("")}</optgroup><optgroup label="已收录数据卡">${cardOptions.map((option) => `<option value="${escapeHtml(option.key)}">${escapeHtml(option.label)}</option>`).join("")}</optgroup>`;
    const validKeys = new Set([...rosterOptions, ...cardOptions].map((option) => option.key));
    if (!validKeys.has(state.calculatorSelection[side])) state.calculatorSelection[side] = "";
    select.value = state.calculatorSelection[side];
  });
}

["attacker", "defender"].forEach((side) => {
  const select = $(`#calculator${side === "attacker" ? "Attackers" : "Defenders"}`);
  select?.addEventListener("change", (event) => {
    state.calculatorSelection[side] = event.target.value;
    $("#calcNote").textContent = "已选择单位；请确认双方后开始计算。";
  });
});

function getCalculatorEntry(side) {
  const key = state.calculatorSelection[side];
  if (!key) return null;
  if (key.startsWith("roster:")) {
    const [, rosterSide, groupId, unitId] = key.split(":");
    const found = findUnit(rosterSide, groupId, unitId);
    return found.unit ? { key, name: found.unit.name, rosterUnit: found.unit, faction: state.rosters[rosterSide].faction } : null;
  }
  return calculatorCardNames().find((card) => `card:${card.faction}:${card.page || card.name}` === key) || null;
}

function findStructuredCalculatorCard(name) {
  const aliases = [name, name.replace(/\([^)]*\)/g, "").trim(), ...(DATASHEET_ALIASES["帝皇禁军"]?.[name] || []), ...(DATASHEET_ALIASES["白色疤痕"]?.[name] || [])];
  return state.calculatorCards.find((card) => card.structured && aliases.includes(card.name));
}

function parseSkill(value, fallback = 7) {
  const number = Number(String(value ?? "").replace("+", ""));
  return Number.isFinite(number) ? number : fallback;
}

function buildSelectedRoundPayload() {
  const attacker = getCalculatorEntry("attacker");
  const defender = getCalculatorEntry("defender");
  if (!attacker || !defender) throw new Error("请先选择进攻单位和防御目标");
  const attackerCard = attacker.structured ? attacker : findStructuredCalculatorCard(attacker.name);
  const defenderCard = defender.structured ? defender : findStructuredCalculatorCard(defender.name);
  const attackerData = attackerCard?.data;
  const defenderData = defenderCard?.data;
  if (!attackerData?.unit || !Array.isArray(attackerData.weapons) || !attackerData.weapons.length) throw new Error(`进攻单位“${attacker.name}”没有可计算的结构化武器数据`);
  if (!defenderData?.unit) throw new Error(`防御单位“${defender.name}”没有可计算的属性数据`);
  const attackerModels = attacker.rosterUnit ? activeModels(attacker.rosterUnit).length : Number(attackerData.unit.models || 1);
  const defenderModels = defender.rosterUnit ? activeModels(defender.rosterUnit).length : Number(defenderData.unit.models || 1);
  const toughness = Number(defenderData.unit.toughness || 0);
  const weaponGroups = attackerData.weapons.filter((weapon) => weapon.type === "ranged").map((weapon) => ({
    name: `${attacker.name} · ${weapon.name}`,
    modelCount: attackerModels,
    attacks: weapon.attacks,
    hit: parseSkill(weapon.skill),
    wound: woundTarget(Number(weapon.strength || 0), toughness),
    ap: Math.abs(Number(weapon.ap || 0)),
    damage: weapon.damage,
    effects: emptyWeaponEffects({ sustainedHitsEnabled: weapon.abilities?.some((item) => /连击| sustained/i.test(item)) || false }),
  }));
  if (!weaponGroups.length) throw new Error(`进攻单位“${attacker.name}”没有远程武器`);
  return { simulations: 1000, weaponGroups, defenderGroups: [{ name: defender.name, modelCount: defenderModels, wounds: Number(defenderData.unit.woundsPerModel || 1), save: Number(defenderData.unit.save || 7), invulnerableSave: Number(defenderData.unit.invulnerableSave || 0), allocationOrder: 1, effects: emptyDefenderEffects() }] };
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
    return `<article class="unit-card ${side}"><div class="unit-top"><span class="faction-dot ${side === "attacker" ? "gold" : "red"}"></span><span class="unit-role">${escapeHtml(sideLabel(side))}</span></div><h4>${escapeHtml(unit.name)}</h4><p>${models.length} 个存活模型 · ${escapeHtml(Object.entries(countEquipment(unit)).map(([name, count]) => `${count}x ${name}`).join(" · ") || "无装备")}</p><div class="stat-row"><span>剩余伤口</span><strong>${totalWounds} / ${maxWounds}</strong></div><div class="health-bar ${side === "defender" ? "red" : ""}"><span style="width:${ratio}%"></span></div></article>`;
  }).join("") : '<div class="library-empty">导入双方军表后会在这里显示全部单位。</div>';
  if (overview) overview.innerHTML = ["attacker", "defender"].map((side) => {
    const roster = state.rosters[side];
    const groupMarkup = roster.groups.map((group) => {
      const units = group.units.map((unit) => unitOverviewMarkup(unit, side, group.id)).join("");
      return units ? `<section class="roster-group"><h3>${escapeHtml(group.title)}</h3>${units}</section>` : "";
    }).join("");
    const groups = groupMarkup || '<div class="library-empty">没有存活模型</div>';
    return `<section class="roster-side ${side}"><div class="roster-heading"><div><span>${sideLabel(side)}</span><strong>${escapeHtml(roster.name)}</strong></div><small>${escapeHtml(roster.faction || "未识别阵营")}</small></div>${groups}</section>`;
  }).join("");
  const attackers = state.rosters.attacker;
  const defenders = state.rosters.defender;
  $("#battleTitle").innerHTML = `${escapeHtml(attackers.faction || attackers.name)} <span>vs</span> ${escapeHtml(defenders.faction || defenders.name)}`;
  $("#attackerSummary").textContent = attackers.groups.length ? `${attackers.name} · ${getRosterUnits(attackers).length} 单位` : "未设置";
  $("#defenderSummary").textContent = defenders.groups.length ? `${defenders.name} · ${getRosterUnits(defenders).length} 单位` : "未设置";
  renderCalculatorSelectors();
}

async function getDatasheetExcerpt(faction, unitName) {
  const path = DATASHEET_FILES[faction];
  if (!path) return "";
  if (!state.datasheetCache[path]) {
    try {
      const response = await fetch(path);
      if (!response.ok) return "";
      state.datasheetCache[path] = await response.text();
    } catch {
      return "";
    }
  }
  const text = state.datasheetCache[path] || "";
  const names = [unitName, unitName.replace(/\([^)]*\)/g, "").trim(), ...(DATASHEET_ALIASES[faction]?.[unitName] || [])];
  const hit = names.map((name) => text.indexOf(name)).find((index) => index >= 0);
  if (hit === undefined) return "";
  const start = Math.max(0, text.lastIndexOf("## ", hit));
  const next = text.indexOf("\n## ", hit + 1);
  return text.slice(start, next >= 0 ? next : hit + 6000).slice(0, 7000).trim();
}

async function openUnitDetail(side, groupId, unitId) {
  const { group, unit } = findUnit(side, groupId, unitId);
  if (!unit) return;
  const dialog = $("#unitDetail");
  const detail = $("#unitDetailContent");
  const detailKey = `${side}:${groupId}:${unitId}`;
  dialog.dataset.detailKey = detailKey;
  detail.innerHTML = `<div class="detail-heading"><div><span>${escapeHtml(group.title)}</span><h3>${escapeHtml(unit.name)}${unit.points ? ` · ${escapeHtml(unit.points)}分` : ""}</h3></div><button type="button" data-close-detail>关闭</button></div>${unit.enhancement ? `<p class="detail-note">强化：${escapeHtml(unit.enhancement)}</p>` : ""}<div class="model-list">${unit.models.map((model) => `<article class="model-row ${model.currentWounds <= 0 ? "is-destroyed" : ""}"><div><strong>${escapeHtml(model.name)}</strong><small>${model.equipment.map((item) => `${item.count}x ${item.name}`).join(" · ") || "无装备"}</small></div><label>当前伤口<input type="number" min="0" max="${model.maximumWounds}" value="${model.currentWounds}" data-model-wounds data-side="${side}" data-group-id="${groupId}" data-unit-id="${unit.id}" data-model-id="${model.id}" /></label><label>最大伤口<input type="number" min="1" value="${model.maximumWounds}" data-model-max-wounds data-side="${side}" data-group-id="${groupId}" data-unit-id="${model.id}" /></label>${model.currentWounds > 0 ? `<button type="button" class="delete-unit" data-destroy-model data-side="${side}" data-group-id="${groupId}" data-unit-id="${unit.id}" data-model-id="${model.id}">移除模型</button>` : "<em>已阵亡</em>"}</article>`).join("")}</div><section class="datasheet-preview" data-datasheet-preview><strong>数据卡属性</strong><p class="muted-copy">正在加载…</p></section>`;
  if (!dialog.open) dialog.showModal();
  const excerpt = await getDatasheetExcerpt(state.rosters[side].faction, unit.name);
  if (!dialog.open || dialog.dataset.detailKey !== detailKey) return;
  const preview = detail.querySelector("[data-datasheet-preview]");
  if (preview) preview.innerHTML = excerpt ? `<details><summary>数据卡属性</summary><pre>${escapeHtml(excerpt)}</pre></details>` : `<strong>数据卡属性</strong><p class="muted-copy">未找到该单位的可用数据卡条目；你仍可在上方设置模型伤口。</p>`;
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
  } else model.currentWounds = Math.max(0, Math.min(model.maximumWounds, Number(input.value) || 0));
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

async function importBuiltinLibraryFiles() {
  if (window.pdfjsLib) window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  try {
    const existing = await getLibraryFiles();
    const existingNames = new Set(existing.map((file) => file.name));
    const imported = [];
    for (const path of BUILTIN_LIBRARY_FILES) {
      const name = path.split("/").pop();
      if (existingNames.has(name)) continue;
      try {
        const response = await fetch(path);
        if (!response.ok) continue;
        const blob = await response.blob();
        const file = new File([blob], name, { type: blob.type || "application/pdf" });
        await addLibraryFile(file, BUILTIN_FILE_METADATA[path] || BUILTIN_FILE_METADATA[name] || {});
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

async function loadCalculatorCards() {
  const cards = new Map();
  const categoryNames = new Set(["传奇英雄人物", "通用人物", "战术小队", "其他步兵", "军表构成", "3", "骑乘", "机甲", "载具", "运输载具", "空降仓", "飞行载具", "工事"]);
  for (const path of CALCULATOR_CARD_FILES) {
    try {
      const response = await fetch(path);
      if (!response.ok) continue;
      const parsed = await response.json();
      if (parsed.unit?.name) cards.set(`${parsed.faction}:${parsed.unit.name}`, { faction: parsed.faction, name: parsed.unit.name, structured: true, data: parsed });
      for (const card of parsed.cards || []) {
        if (!card.name || categoryNames.has(card.name) || card.name.startsWith("⚫")) continue;
        const key = `${parsed.faction}:${card.name}`;
        if (!cards.has(key)) cards.set(key, { faction: parsed.faction, name: card.name, page: card.page, structured: false, data: null });
      }
    } catch {
      // 本地 file:// 预览可能禁止 fetch；军表选项仍然可用。
    }
  }
  state.calculatorCards = [...cards.values()];
  renderCalculatorSelectors();
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
  const faction = lines.find((line) => ["帝皇禁军", "白色疤痕", "星际战士"].includes(line.trim()))?.trim() || "未识别阵营";
  const groups = []; let group = null; let unit = null; let inComposition = false; let modelBatch = []; let lastTargets = [];
  const ensureUnitModel = () => {
    if (!unit.models.length) unit.models.push(normalizeModel({ name: unit.name }, unit.name));
    return unit.models;
  };
  const addEquipment = (count, name) => {
    const targets = modelBatch.length ? modelBatch : ensureUnitModel();
    const chosen = count === 1 && lastTargets.length === 1 ? lastTargets : [...targets].sort((a, b) => a.equipment.length - b.equipment.length).slice(0, Math.min(count, targets.length));
    chosen.forEach((model) => model.equipment.push({ name, count: 1 }));
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
      unit = { id: makeId("unit"), name: header[1].trim(), points: header[2], role: "", enhancement: "", notes: "", hasComposition: false, models: [] };
      group.units.push(unit); inComposition = false; modelBatch = []; lastTargets = []; continue;
    }
    if (!unit) continue;
    if (/^进行联合的单位：/.test(trimmed)) { unit.role = trimmed.replace(/^进行联合的单位：/, ""); continue; }
    if (/^强化：/.test(trimmed)) { unit.enhancement = trimmed.replace(/^强化：/, ""); continue; }
    if (/^(单位组成|扩编次数)/.test(trimmed)) { inComposition = /^单位组成/.test(trimmed); if (inComposition) unit.hasComposition = true; continue; }
    const item = raw.match(/^\s*·\s*(\d+)x\s*(.+?)\s*$/);
    if (!item) continue;
    const count = Number(item[1]); const name = item[2]; const depth = (raw.match(/^\s*/)?.[0].replace(/\t/g, "  ").length || 0);
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
  return { name: armyName, faction, groups: groups.filter((item) => item.units.length) };
}

function importArmyToRoster(army, side) {
  if (!army?.groups?.length) return false;
  const roster = state.rosters[side];
  roster.faction = army.faction || "未识别阵营";
  roster.name = army.name || `${roster.faction}军表`;
  roster.groups = army.groups.map(normalizeGroup);
  saveRosters();
  renderRosters();
  return true;
}

function importRosterText(content, side) {
  const parsed = parseArmyList(content);
  if (!parsed) return false;
  if (parsed.attacker || parsed.defender) return importArmyToRoster(parsed[side], side);
  return importArmyToRoster(parsed, side);
}

$$('[data-paste-side]').forEach((button) => button.addEventListener("click", () => {
  const content = $("#rosterPaste")?.value.trim();
  if (!content) {
    showToast("请先粘贴军表内容");
    return;
  }
  if (importRosterText(content, button.dataset.pasteSide)) {
    showToast(`已解析并导入${sideLabel(button.dataset.pasteSide)}军表`);
  } else showToast("未识别军表格式，请检查粘贴内容是否完整");
}));
$("#clearRosterPaste")?.addEventListener("click", () => { $("#rosterPaste").value = ""; });
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
  const chance = result.kills.x.reduce((sum, value, index) => sum + (Number(value) > 0 ? Number(result.kills.y[index] || 0) : 0), 0) / total;
  return { chance, averageDamage, engine: result };
}

function emptyWeaponEffects(overrides = {}) {
  return {
    hitRerollFixedEnabled: false, hitRerollFixedAmount: 1, hitRerollFixedType: "ones", hitRerollFixedValues: [],
    hitRerollAllEnabled: false, hitRerollAllType: "ones", hitRerollAllValues: [], hitModifierEnabled: false, hitModifierValue: 0,
    hitCriticalEnabled: false, criticalHitThreshold: 6, woundRerollFixedEnabled: false, woundRerollFixedAmount: 1, woundRerollFixedType: "ones", woundRerollFixedValues: [],
    woundRerollAllEnabled: false, woundRerollAllType: "ones", woundRerollAllValues: [], woundModifierEnabled: false, woundModifierValue: 0,
    woundCriticalEnabled: false, criticalWoundThreshold: 6, sustainedHitsEnabled: false, sustainedHitsValue: "1", lethalHitsEnabled: false,
    devastatingWoundsEnabled: false, damageRerollEnabled: false, damageRerollType: "ones", damageRerollAmount: "1", damageRerollValues: [],
    criticalWoundApEnabled: false, criticalWoundApValue: 1, negatedWoundsEnabled: false, negatedWoundsCount: 1, ...overrides,
  };
}

function emptyDefenderEffects() {
  return {
    saveRerollFixedEnabled: false, saveRerollFixedAmount: 1, saveRerollFixedType: "ones", saveRerollFixedValues: [],
    saveRerollAllEnabled: false, saveRerollAllType: "ones", saveRerollAllValues: [], feelNoPainEnabled: false,
    feelNoPainThreshold: 6, feelNoPainMortalEnabled: false, feelNoPainMortalThreshold: 6, oneUseInvulnerableEnabled: false, oneUseInvulnerableSave: 2,
  };
}

function buildExternalRoundPayload() {
  const payload = buildSelectedRoundPayload();
  payload.simulations = 1000;
  return payload;
}

async function runExternalCalculator() {
  const endpoint = state.settings.calculatorEndpoint.trim();
  if (!endpoint) throw new Error("请先在设置中配置外部计算器代理地址");
  const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(buildExternalRoundPayload()) });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  const data = await response.json();
  const summary = data.roundSummary || {};
  const weapons = summary.weaponGroups || [];
  const defenders = summary.defenderGroups || [];
  const histogramAverage = (histogram) => {
    if (!histogram?.x?.length || !histogram?.y?.length) return null;
    const total = Number(histogram.total || data.total || histogram.y.reduce((sum, value) => sum + Number(value || 0), 0));
    return histogram.x.reduce((sum, value, index) => sum + Number(value) * Number(histogram.y[index] || 0), 0) / total;
  };
  const histogramKillChance = (histogram) => {
    if (!histogram?.x?.length || !histogram?.y?.length) return null;
    const total = Number(histogram.total || data.total || histogram.y.reduce((sum, value) => sum + Number(value || 0), 0));
    return histogram.x.reduce((sum, value, index) => sum + (Number(value) > 0 ? Number(histogram.y[index] || 0) : 0), 0) / total;
  };
  const averageDamage = histogramAverage(data.totalDamage) ?? weapons.reduce((sum, group) => sum + Number(group.averageDamage || 0), 0);
  const averageHits = histogramAverage(data.hit) ?? weapons.reduce((sum, group) => sum + Number(group.averageHits || 0), 0);
  const averageWounds = histogramAverage(data.wound) ?? weapons.reduce((sum, group) => sum + Number(group.averageWounds || 0), 0);
  const averageKills = histogramKillChance(data.kills) ?? defenders.reduce((sum, group) => sum + Number(group.averageKills || 0), 0);
  $("#externalChance").textContent = `${(averageKills * 100).toFixed(1)}%`;
  $("#externalDamage").textContent = averageDamage.toFixed(2);
  const local = state.localCalculation || simulateScenario(1000);
  const chanceDelta = (local.chance - averageKills) * 100;
  const damageDelta = local.averageDamage - averageDamage;
  $("#externalNote").textContent = `1000 次 · ${averageHits.toFixed(2)} 命中 · ${averageWounds.toFixed(2)} 造伤 · 本地偏差 ${chanceDelta >= 0 ? "+" : ""}${chanceDelta.toFixed(1)} 个百分点 / ${damageDelta >= 0 ? "+" : ""}${damageDelta.toFixed(2)} 伤害`;
  return { averageDamage, averageKills, chanceDelta, damageDelta };
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
  $("#calcNote").textContent = "结果来自当前选择的单位和数据卡属性。";
  $("#calcTargetWounds").textContent = "已按所选目标数据卡结算";
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

$("#runExternalCalc").addEventListener("click", async () => {
  const button = $("#runExternalCalc");
  button.disabled = true;
  button.textContent = "外部计算中…";
  try {
    await runExternalCalculator();
    showToast("外部基准计算完成");
  } catch (error) {
    console.error(error);
    $("#externalNote").textContent = error.message;
    showToast("外部计算失败");
  } finally {
    button.disabled = false;
    button.textContent = "外部基准计算";
  }
});

function loadSettingsForm() {
  $("#apiMode").value = state.settings.mode;
  $("#apiKey").value = state.settings.key || "";
  $("#apiEndpoint").value = state.settings.endpoint;
  $("#apiModel").value = state.settings.model;
  $("#calculatorEndpoint").value = state.settings.calculatorEndpoint;
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
    calculatorEndpoint: $("#calculatorEndpoint").value.trim(),
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
  ["帝皇禁军", "星际战士"].forEach((faction) => {
    const shorthand = faction === "帝皇禁军" ? /禁军|custodes/i : /星际战士|阿斯塔特|space marines/i;
    if (shorthand.test(text)) selected.add(faction);
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
