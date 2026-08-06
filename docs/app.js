const STORAGE_KEY = "warhammer-tactical-assistant-settings";
const DB_NAME = "warhammer-tactical-assistant-v1";
const DB_STORE = "library";
const ROSTER_STORAGE_KEY = "warhammer-tactical-assistant-rosters-v2";
const FIXED_CALCULATOR_ENDPOINT = "https://wathammer.com/simulate-round";
const FIXED_CALCULATOR_PAGE = "https://wathammer.com/round";
const BUILTIN_LIBRARY_FILES = [
  "data/规则书/11版核心规则简中.pdf",
  "data/规则书/核心规则-可检索.md",
  "data/规则书/分遣队速查表.pdf",
  "data/规则书/分遣队速查-可检索.md",
  "data/规则书/AI-战斗规则摘要.md",
  "data/帝皇禁军/帝皇禁军10版中文老湿腐版1.07.pdf",
  "data/帝皇禁军/数据卡-OCR-可检索.md",
  "data/帝皇禁军/帝皇禁军-结构化数据卡.json",
  "data/星际战士/星际战士11版中文1.0.pdf",
  "data/星际战士/分遣队规则-可检索.md",
  "data/星际战士/数据卡-可检索.md",
  "data/星际战士/星际战士-全部数据卡.json",
  "data/死亡守卫/死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf",
  "data/死亡守卫/死亡守卫-分遣队规则-可检索.md",
  "data/死亡守卫/死亡守卫-数据卡-可检索.md",
  "data/死亡守卫/死亡守卫-分数表-可检索.md",
  "data/死亡守卫/死亡守卫-全部数据卡.json",
];
const DEFAULT_SETTINGS = {
  mode: "direct",
  key: "",
  endpoint: "https://api.deepseek.com/chat/completions",
  model: "deepseek-v4-flash",
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
  "帝皇禁军-结构化数据卡.json": { faction: "帝皇禁军", kind: "datasheet", builtin: true },
  "分遣队规则-可检索.md": { faction: "星际战士", kind: "detachment", builtin: true },
  "数据卡-可检索.md": { faction: "星际战士", kind: "datasheet", builtin: true },
  "星际战士-全部数据卡.json": { faction: "星际战士", kind: "datasheet", builtin: true },
  "死亡守卫10版中文咸鱼罐头版v1.0.7.1.pdf": { faction: "死亡守卫", kind: "datasheet", builtin: true },
  "死亡守卫-全部数据卡.json": { faction: "死亡守卫", kind: "datasheet", builtin: true },
  "死亡守卫-分遣队规则-可检索.md": { faction: "死亡守卫", kind: "detachment", builtin: true },
  "死亡守卫-数据卡-可检索.md": { faction: "死亡守卫", kind: "datasheet", builtin: true },
  "死亡守卫-分数表-可检索.md": { faction: "死亡守卫", kind: "supplement", builtin: true },
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
  calculatorSearch: { attacker: "", defender: "" },
  calculatorDrafts: { attacker: null, defender: null },
  externalCalculatorEnabled: true,
  attackMode: "ranged",
};

const DATASHEET_FILES = {
  "帝皇禁军": "data/帝皇禁军/数据卡-OCR-可检索.md",
  "白色疤痕": "data/星际战士/数据卡-可检索.md",
  "星际战士": "data/星际战士/数据卡-可检索.md",
  "死亡守卫": "data/死亡守卫/死亡守卫-数据卡-可检索.md",
};
const DATASHEET_JSON_FILES = {
  "帝皇禁军": "data/帝皇禁军/帝皇禁军-结构化数据卡.json",
  "星际战士": "data/星际战士/星际战士-全部数据卡.json",
  "死亡守卫": "data/死亡守卫/死亡守卫-全部数据卡.json",
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
  "死亡守卫": {
    "带翼恶魔亲王": ["有翼纳垢恶魔亲王"],
    "恶疾使者": ["恶瘟投放者"],
    "凋零引擎": ["恶臭疫病引擎"],
    "瘟疫机蜂": ["恶臭肿胀机兵"],
    "装备重型瘟疫榴弹炮的瘟疫机蜂": ["装备重型凋零榴弹炮的恶臭肿胀机兵"],
  },
};
const CALCULATOR_CARD_FILES = [
  "data/帝皇禁军/帝皇禁军-结构化数据卡.json",
  "data/星际战士/星际战士-全部数据卡.json",
  "data/死亡守卫/死亡守卫-全部数据卡.json",
];
const DIGITAL_UNIT_ALIASES = {
  "星际战士": {
    65: ["连长"],
    119: ["先遣者摩托小队"],
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function unitNameCandidates(name) {
  const source = String(name || "");
  const normalized = source.replace(/\([^)]*\)/g, "").trim();
  const aliases = Object.values(DATASHEET_ALIASES).flatMap((factionAliases) => [
    ...(factionAliases[source] || []),
    ...(factionAliases[normalized] || []),
  ]);
  return [...new Set([source, normalized, ...aliases].filter(Boolean))];
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
    woundsSource: model.woundsSource || "",
    equipment: Array.isArray(model.equipment) ? model.equipment.map((item) => ({ name: item.name || String(item), count: Math.max(1, Number(item.count || 1)) })) : [],
  };
}

function normalizeRosterUnit(unit) {
  const profile = getUnitProfile(unit.name);
  const datasheetWounds = Number(profile?.woundsPerModel || 0);
  const models = Array.isArray(unit.models) && unit.models.length ? unit.models.map((model) => {
    const normalized = normalizeModel(model, unit.name);
    if (datasheetWounds && normalized.woundsSource !== "manual" && normalized.maximumWounds === 1) {
      normalized.maximumWounds = datasheetWounds;
      normalized.currentWounds = Math.min(datasheetWounds, normalized.currentWounds === 1 ? datasheetWounds : normalized.currentWounds);
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
  return [...new Map(state.calculatorCards.filter((card) => card.name).map((card) => [`${card.faction || ""}:${card.name}:${card.page || ""}`, card])).values()];
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
    const cardOptions = calculatorCardNames().map((card) => ({ key: `card:${card.faction}:${card.page || card.name}`, name: card.name, label: `${card.name} · ${card.faction || "数据卡"}`, card }));
    const allOptions = [...rosterOptions, ...cardOptions];
    const validKeys = new Set(allOptions.map((option) => option.key));
    if (!validKeys.has(state.calculatorSelection[side])) state.calculatorSelection[side] = "";
    const search = String(state.calculatorSearch[side] || "").trim().toLocaleLowerCase();
    const matchesSearch = (option) => !search || `${option.name} ${option.label}`.toLocaleLowerCase().includes(search);
    const filterOptions = (options) => options.filter((option) => matchesSearch(option) || option.key === state.calculatorSelection[side]);
    const filteredRoster = filterOptions(rosterOptions);
    const filteredCards = filterOptions(cardOptions);
    select.innerHTML = `<option value="">${search ? "未选择（搜索结果）" : "请选择已导入单位或数据卡"}</option><optgroup label="当前军表">${filteredRoster.map((option) => `<option value="${escapeHtml(option.key)}">${escapeHtml(option.label)}</option>`).join("") || "<option disabled>没有匹配单位</option>"}</optgroup><optgroup label="已收录数据卡">${filteredCards.map((option) => `<option value="${escapeHtml(option.key)}">${escapeHtml(option.label)}</option>`).join("") || "<option disabled>没有匹配数据卡</option>"}</optgroup>`;
    select.value = state.calculatorSelection[side];
    const searchInput = $(`#calculator${side === "attacker" ? "Attacker" : "Defender"}Search`);
    if (searchInput && searchInput.value !== state.calculatorSearch[side]) searchInput.value = state.calculatorSearch[side];
  });
  renderCalculatorDetails();
}

["attacker", "defender"].forEach((side) => {
  const select = $(`#calculator${side === "attacker" ? "Attackers" : "Defenders"}`);
  select?.addEventListener("change", (event) => {
    state.calculatorSelection[side] = event.target.value;
    state.calculatorDrafts[side] = null;
    $("#calcNote").textContent = "已选择单位；请确认双方后开始计算。";
    renderCalculatorDetails();
  });
  $(`#calculator${side === "attacker" ? "Attacker" : "Defender"}Search`)?.addEventListener("input", (event) => {
    state.calculatorSearch[side] = event.target.value;
    renderCalculatorSelectors();
  });
});
$("#calculatorAttackMode")?.addEventListener("change", (event) => {
  state.attackMode = event.target.value;
  $("#calcNote").textContent = `已选择${state.attackMode === "ranged" ? "远程射击" : "近战"}；请确认双方后开始计算。`;
  renderCalculatorDetails();
});
$("#enableExternalCalc")?.addEventListener("change", (event) => {
  state.externalCalculatorEnabled = event.target.checked;
  $("#runExternalCalc").disabled = !state.externalCalculatorEnabled;
});

function getCalculatorEntry(side) {
  const key = state.calculatorSelection[side];
  if (!key) return null;
  if (key.startsWith("roster:")) {
    const [, rosterSide, groupId, unitId] = key.split(":");
    const found = findUnit(rosterSide, groupId, unitId);
    return found.unit ? { key, name: found.unit.name, rosterUnit: found.unit, group: found.group, groupId, unitId, faction: state.rosters[rosterSide].faction } : null;
  }
  return calculatorCardNames().find((card) => `card:${card.faction}:${card.page || card.name}` === key) || null;
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
    unit: {
      ...data.unit,
      abilities: data.unit.abilities || sourceAbilities,
    },
  };
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
  const name = String(weapon?.name || "").replace(/[（(].*?[）)]/g, "").trim();
  return equipment.some((item) => {
    const normalized = String(item).replace(/[（(].*?[）)]/g, "").trim();
    return normalized && (name.includes(normalized) || normalized.includes(name));
  });
}

function weaponModelCount(weapon, rosterUnit, fallback = 1) {
  const models = activeModels(rosterUnit || {});
  if (!models.length) return 0;
  const name = String(weapon?.name || "").replace(/[（(].*?[）)]/g, "").trim();
  if (!name) return models.length;
  const count = models.filter((model) => model.equipment.some((item) => {
    const normalized = String(item.name || "").replace(/[（(].*?[）)]/g, "").trim();
    return normalized && (name.includes(normalized) || normalized.includes(name));
  })).length;
  return count || (Object.keys(countEquipment(rosterUnit || {})).length ? 0 : fallback);
}

function weaponMatchesEquipmentText(weapon, equipmentText) {
  const source = String(equipmentText || "");
  if (!source.trim()) return true;
  const name = String(weapon?.name || "").replace(/[（(].*?[）)]/g, "").trim();
  return name && source.includes(name);
}

function applyExclusiveWeaponDefaults(weapons) {
  const groups = new Map();
  weapons.forEach((weapon, index) => {
    const group = String(weapon.selectionGroup || "").trim();
    if (!group) return;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push({ weapon, index });
  });
  groups.forEach((members) => {
    if (members.length < 2) return;
    const selected = members.find(({ weapon }) => weapon.enabled && weapon.defaultSelected)
      || members.find(({ weapon }) => weapon.enabled)
      || members.find(({ weapon }) => weapon.defaultSelected)
      || members[0];
    members.forEach(({ weapon }) => { weapon.enabled = weapon === selected.weapon; });
  });
  return weapons;
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

function enabledCalculatorWeapons(data, entryName, rosterUnit) {
  const baseUnit = data?.unit || {};
  const baseWeapons = Array.isArray(data?.weapons) ? cloneCalculatorValue(data.weapons) : [];
  const defaultEquipment = baseUnit.defaultEquipment || "";
  const defaultModels = Math.max(1, Number(rosterUnit ? activeModels(rosterUnit).length : baseUnit.models || baseUnit.defaultModels || 1) || 1);
  const matching = rosterUnit
    ? baseWeapons.map((weapon) => weaponMatchesRoster(weapon, rosterUnit))
    : baseWeapons.map((weapon) => weaponMatchesEquipmentText(weapon, defaultEquipment));
  const anyMatching = matching.some(Boolean);
  return applyExclusiveWeaponDefaults(baseWeapons.map((weapon, index) => ({
    ...weapon,
    enabled: anyMatching ? matching[index] : true,
    modelCount: weapon.modelCount ?? (rosterUnit ? weaponModelCount(weapon, rosterUnit, defaultModels) : defaultModels),
  })));
}

function getCalculatorDraft(side) {
  const entry = getCalculatorEntry(side);
  const key = state.calculatorSelection[side];
  if (!entry || !key) {
    state.calculatorDrafts[side] = null;
    return null;
  }
  if (state.calculatorDrafts[side]?.key === key) return state.calculatorDrafts[side];
  const card = entry.structured ? entry : findStructuredCalculatorCard(entry.name);
  const data = getCalculatorCardData(card || entry);
  const baseUnit = cloneCalculatorValue(data?.unit || {});
  const baseWeapons = enabledCalculatorWeapons(data, entry.name, entry.rosterUnit);
  const rosterUnit = entry.rosterUnit;
  const modelCount = rosterUnit ? activeModels(rosterUnit).length : Math.max(1, Number(baseUnit.models || baseUnit.defaultModels || 1) || 1);
  const weapons = baseWeapons;
  const joined = rosterUnit && entry.group && (entry.group.category === "联合单位" || /^联合单位/.test(entry.group.title || ""));
  const joinedMembers = joined ? entry.group.units.filter((member) => activeModels(member).length).map((member) => {
    const memberData = member.id === rosterUnit.id ? data : calculatorDataForUnit(member, entry.faction);
    const memberUnit = cloneCalculatorValue(memberData?.unit || {});
    const memberWeapons = enabledCalculatorWeapons(memberData, member.name, member);
    const explicitLeader = entry.group.units.some((candidate) => /领导|主将|领袖|character|leader/i.test(String(candidate.role || "")));
    const explicitGuard = entry.group.units.some((candidate) => /护卫|bodyguard/i.test(String(candidate.role || "")));
    const memberIndex = entry.group.units.indexOf(member);
    const role = /领导|主将|领袖|character|leader/i.test(String(member.role || "")) ? "角色" : /护卫|bodyguard/i.test(String(member.role || "")) ? "护卫" : (explicitGuard && !explicitLeader ? "角色" : (memberIndex === 0 ? "角色" : "护卫"));
    const livingModels = activeModels(member);
    return {
      id: member.id, name: member.name, role, unit: memberUnit, weapons: memberWeapons, modelCount: livingModels.length,
      initialModelCount: member.models.length,
      remainingWounds: livingModels.reduce((sum, model) => sum + Number(model.currentWounds || 0), 0),
    };
  }).sort((a, b) => (a.role === "角色" ? 0 : 1) - (b.role === "角色" ? 0 : 1)) : [];
  const activeRosterModels = rosterUnit ? activeModels(rosterUnit) : [];
  state.calculatorDrafts[side] = {
    key, entry, data, unit: baseUnit, weapons, modelCount: Math.max(1, modelCount || 1), source: calculatorSource(entry), joinedMembers,
    martialKatah: "none", oathWoundBonus: false, ruleSelections: {}, rerollSelections: {},
    initialModelCount: rosterUnit ? rosterUnit.models.length : Math.max(1, Number(baseUnit.models || baseUnit.defaultModels || 1)),
    remainingWounds: rosterUnit ? activeRosterModels.reduce((sum, model) => sum + Number(model.currentWounds || 0), 0) : Number(baseUnit.woundsPerModel || 1) * Math.max(1, modelCount || 1),
  };
  return state.calculatorDrafts[side];
}

function calculatorStat(unit, name, fallback = "") {
  return unit?.[name] ?? fallback;
}

function isTorrentWeapon(weapon) {
  const skill = String(weapon?.skill ?? "").trim().toLowerCase();
  if (skill === "torrent" || skill === "auto-hit" || skill === "自动命中") return true;
  return !/\d+\+/.test(skill) && (weapon?.abilities || []).some((ability) => /喷射|torrent/i.test(String(ability)));
}

function unitHasOathOfMoment(unit, faction = "") {
  return /破敌重誓|oath\s+of\s+moment/i.test(String(unit?.abilities || "")) || /星际战士|阿斯塔特|白色疤痕/i.test(String(faction || ""));
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
    const hasSpecialControl = rule.uiControl === "oath-wound-bonus" && side === "attacker";
    if (!rule.controls?.length && !hasSpecialControl) return rule.status || "仅供查阅";
    const active = (rule.controls || []).some((control) => {
      const value = draft.ruleSelections?.[`${rule.id}.${control.id}`];
      return control.type === "checkbox" ? Boolean(value) : Boolean(value && value !== "none");
    }) || (hasSpecialControl && Boolean(draft.oathWoundBonus));
    return active ? "本次已启用并计入骰子" : "可选效果：默认未启用";
  };
  const specialControlMarkup = (rule) => rule.uiControl === "oath-wound-bonus" && side === "attacker"
    ? `<label class="check-row calculator-rule-control"><input type="checkbox" data-calc-side="${side}" data-calc-oath-wound ${draft.oathWoundBonus ? "checked" : ""} /><span>破敌重誓：造伤 +1</span></label>`
    : "";
  return `<section class="calculator-rule-section"><div class="calculator-section-heading"><strong>${heading}</strong></div>${rules.map((rule) => `<div class="calculator-ability"><strong>${escapeHtml(rule.unitName ? `${rule.unitName} · ${rule.name}` : rule.name)}</strong><p>${escapeHtml(rule.text)}</p><small>${escapeHtml(statusFor(rule))}</small>${calculatorRuleControlMarkup(draft, side, rule)}${specialControlMarkup(rule)}</div>`).join("")}</section>`;
}

function calculatorAbilityMarkup(draft, side) {
  const unit = draft.unit || {};
  const unitNames = [draft.entry?.name, ...(draft.joinedMembers || []).map((member) => member.name)];
  const catalog = window.WarhammerRuleResolver?.rulesForUnits(draft.entry?.faction, unitNames) || { faction: [], unit: [] };
  const factionRulesForUnit = catalog.faction.filter((rule) => rule.effect?.type !== "martial-katah" || unitNames.some((name) => window.WarhammerRuleResolver?.isMartialKatahUnit(draft.entry?.faction, name)));
  const allWeapons = [draft.weapons || [], ...(draft.joinedMembers || []).map((member) => member.weapons || [])].flat();
  const weaponAbilities = [...new Set(allWeapons.flatMap((weapon) => weapon.abilities || []).filter(Boolean))];
  const hasMartialKatah = side === "attacker" && (factionRulesForUnit.some((rule) => rule.effect?.type === "martial-katah") || /禁军武艺/.test([unit.abilities, ...(draft.joinedMembers || []).map((member) => member.unit?.abilities)].join(" ")));
  const martialControl = hasMartialKatah ? `<label class="calculator-martial-control">禁军武艺（仅近战）<select data-calc-side="${side}" data-calc-martial><option value="none" ${draft.martialKatah === "none" ? "selected" : ""}>不启用</option><option value="sustained" ${draft.martialKatah === "sustained" ? "selected" : ""}>连击 1</option><option value="lethal" ${draft.martialKatah === "lethal" ? "selected" : ""}>致命一击</option></select></label>` : "";
  const hasOathOfMoment = side === "attacker" && unitHasOathOfMoment(unit, draft.entry?.faction);
  const oathWoundControl = hasOathOfMoment ? `<label class="check-row calculator-rule-control"><input type="checkbox" data-calc-side="${side}" data-calc-oath-wound ${draft.oathWoundBonus ? "checked" : ""} /><span>破敌重誓：造伤 +1</span></label>` : "";
  const factionRules = calculatorRuleMarkup(draft, side, factionRulesForUnit, "阵营技能");
  const fallbackFaction = !factionRulesForUnit.length && hasOathOfMoment ? `<section class="calculator-rule-section"><div class="calculator-section-heading"><strong>阵营技能</strong></div><div class="calculator-ability"><strong>破敌重誓</strong><p>命中重投骰面会按当前武器显示；可在武器栏选择具体结果。</p>${oathWoundControl}</div></section>` : "";
  const unitRules = calculatorRuleMarkup(draft, side, catalog.unit, "单位技能");
  const legacy = !catalog.unit.length && (unit.abilities || unit.activeAbilities) ? `<section class="calculator-rule-section"><div class="calculator-section-heading"><strong>单位技能</strong></div><div class="calculator-ability"><p>${escapeHtml([unit.abilities, unit.activeAbilities || unit.active].filter(Boolean).join("；"))}</p><small>已显示，等待结构化规则补充。</small></div></section>` : "";
  return `<div class="calculator-abilities">${factionRules}${fallbackFaction}${unitRules}${legacy}${martialControl}${weaponAbilities.length ? `<div class="calculator-ability"><strong>武器关键词</strong><p>${escapeHtml(weaponAbilities.join("、"))}</p><small>武器关键词会自动并入骰子计算。</small></div>` : ""}</div>`;
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

function calculatorWeaponRerollMarkup(weapon, draft, side, sourceName, sourceKey, weaponIndex) {
  if (side !== "attacker") return "";
  const sections = [];
  const hitThreshold = isTorrentWeapon(weapon) ? 0 : parseSkill(weapon.skill);
  const sourceRules = resolvedRuleEffects(draft, sourceName).attack || {};
  if (sourceRules.hitReroll && hitThreshold > 0) {
    const rerollRule = window.WarhammerRuleResolver?.rulesForUnit(draft.entry?.faction, sourceName).unit.find((rule) => rule.effects?.some((effect) => effect.type === "space-hit-reroll"));
    sections.push(rerollFacesMarkup(draft, side, {
      kind: "rule-hit", sourceKey, weaponIndex, threshold: hitThreshold,
      title: `${rerollRule?.name || "命中重投"} · 命中重投`, locked: sourceRules.hitReroll === "ones",
    }));
  }
  if (unitHasOathOfMoment(draft.unit, draft.entry?.faction) && hitThreshold > 0) {
    sections.push(rerollFacesMarkup(draft, side, { kind: "oath-hit", sourceKey, weaponIndex, threshold: hitThreshold, title: "破敌重誓 · 命中重投" }));
  }
  if (sourceRules.woundReroll) {
    const defenderDraft = getCalculatorDraft("defender");
    const woundThreshold = defenderDraft?.unit?.toughness ? woundTarget(Number(weapon.strength || 0), Number(defenderDraft.unit.toughness)) : 4;
    const rerollRule = window.WarhammerRuleResolver?.rulesForUnit(draft.entry?.faction, sourceName).unit.find((rule) => ["guard-wound-reroll", "elite-wound-reroll"].includes(rule.effect?.type));
    sections.push(rerollFacesMarkup(draft, side, {
      kind: "guard-wound", sourceKey, weaponIndex, threshold: woundThreshold,
      title: `${rerollRule?.name || "造伤重投"} · 造伤重投`, locked: sourceRules.woundReroll === "ones",
    }));
  }
  return sections.join("");
}

function calculatorWeaponMarkup(draft, side) {
  if (!draft.weapons?.length) return `<p class="calculator-missing">这张数据卡还没有结构化武器字段，暂时无法计算。请补充数据卡 JSON 后再试。</p>`;
  return `<div class="calculator-weapons"><div class="calculator-section-heading"><strong>武器与攻击参数</strong><small>当前模式：${state.attackMode === "ranged" ? "远程射击" : "近战"}；可勾选参与计算的武器</small></div>${draft.weapons.map((weapon, index) => calculatorWeaponControlMarkup(weapon, side, index, null, draft, draft.entry.name, "unit")).join("")}</div>`;
}

function calculatorWeaponControlMarkup(weapon, side, index, groupIndex = null, draft = null, sourceName = "", sourceKey = "unit") {
  const scope = groupIndex === null
    ? `data-calc-weapon-index="${index}"`
    : `data-calc-group-index="${groupIndex}" data-calc-group-weapon-index="${index}"`;
  const selectionGroup = String(weapon.selectionGroup || "").trim();
  const inputType = selectionGroup ? "radio" : "checkbox";
  const selectionName = selectionGroup ? ` name="calc-weapon-${side}-${groupIndex ?? "unit"}-${escapeHtml(selectionGroup)}"` : "";
  const selectionNote = selectionGroup ? ` · 配装：${escapeHtml(selectionGroup)}（单选）` : "";
  const displayedSkill = isTorrentWeapon(weapon) ? "自动命中" : (weapon.skill ?? "4+");
  return `<div class="calculator-weapon ${weapon.type === state.attackMode ? "is-current" : ""}"><label class="check-row"><input type="${inputType}"${selectionName} data-calc-side="${side}" ${scope} data-calc-weapon-enabled ${weapon.enabled !== false ? "checked" : ""} /><span>${escapeHtml(weapon.name || `武器 ${index + 1}`)} · ${weapon.type === "melee" ? "近战" : "远程"}${selectionNote}</span></label><div class="calculator-weapon-fields"><label>数量<input type="number" min="0" data-calc-side="${side}" ${scope} data-calc-weapon-count value="${escapeHtml(weapon.modelCount ?? 1)}" /></label><label>攻击<input data-calc-side="${side}" ${scope} data-calc-weapon-field="attacks" value="${escapeHtml(weapon.attacks ?? "1")}" /></label><label>命中<input data-calc-side="${side}" ${scope} data-calc-weapon-field="skill" value="${escapeHtml(displayedSkill)}" /></label><label>力量<input type="number" data-calc-side="${side}" ${scope} data-calc-weapon-field="strength" value="${escapeHtml(weapon.strength ?? "0")}" /></label><label>AP<input type="number" data-calc-side="${side}" ${scope} data-calc-weapon-field="ap" value="${escapeHtml(weapon.ap ?? "0")}" /></label><label>伤害<input data-calc-side="${side}" ${scope} data-calc-weapon-field="damage" value="${escapeHtml(weapon.damage ?? "1")}" /></label></div><small class="weapon-keywords">${escapeHtml((weapon.abilities || []).join("、") || "无关键词")}</small>${draft ? calculatorWeaponRerollMarkup(weapon, draft, side, sourceName, sourceKey, index) : ""}</div>`;
}

function calculatorJoinedMembersMarkup(draft, side) {
  if (!draft.joinedMembers?.length) return "";
  const note = side === "defender" ? "护卫先承伤，角色最后承伤；可分别调整属性" : "联合单位中的角色和护卫都会参与本次攻击；可分别调整数量";
  const selectedId = draft.entry?.rosterUnit?.id;
  const members = draft.joinedMembers.map((member, index) => {
    const selected = member.id === selectedId;
    const weapons = selected ? draft.weapons : member.weapons;
    const weaponMarkup = weapons?.length
      ? `<div class="calculator-member-weapons"><strong>武器</strong>${weapons.map((weapon, weaponIndex) => calculatorWeaponControlMarkup(weapon, side, weaponIndex, selected ? null : index, draft, member.name, selected ? "unit" : `member-${index}`)).join("")}</div>`
      : `<small class="weapon-keywords">武器：未结构化提取</small>`;
    return `<div class="calculator-joined-member"><div class="calculator-joined-member-heading"><strong>${escapeHtml(member.name)} · ${escapeHtml(member.role || "组成模型")}</strong><label>模型数量<input type="number" min="1" data-calc-side="${side}" data-calc-group-index="${index}" data-calc-group-model-count value="${escapeHtml(member.modelCount)}" /></label></div><div class="calculator-stats">${[["toughness", "坚韧"], ["save", "护甲"], ["invulnerableSave", "特殊保护"], ["woundsPerModel", "W/模型"]].map(([field, title]) => `<label>${title}<input data-calc-side="${side}" data-calc-group-index="${index}" data-calc-group-stat="${field}" value="${escapeHtml(calculatorStat(member.unit, field, field === "invulnerableSave" ? 0 : ""))}" /></label>`).join("")}</div>${weaponMarkup}</div>`;
  }).join("");
  return `<div class="calculator-joined-members"><div class="calculator-section-heading"><strong>联合单位成员</strong><small>${note}</small></div>${members}${calculatorAbilityMarkup(draft, side)}</div>`;
}

function calculatorDetailMarkup(side) {
  const draft = getCalculatorDraft(side);
  const label = side === "attacker" ? "进攻方" : "防守方";
  if (!draft) return `<article class="calculator-side is-empty"><h3>${label}</h3><p>请选择${label}单位。</p></article>`;
  const unit = draft.unit || {};
  const combined = Boolean(draft.entry.rosterUnit && draft.joinedMembers?.length);
  if (combined) return `<article class="calculator-side ${side}"><div class="calculator-side-heading"><div><span>${label} · ${draft.source}</span><h3>联合单位</h3></div></div>${calculatorJoinedMembersMarkup(draft, side)}</article>`;
  const stats = [["movement", "移速"], ["toughness", "坚韧"], ["save", "护甲"], ["invulnerableSave", "特殊保护"], ["woundsPerModel", "W/模型"], ["leadership", "领导"], ["objectiveControl", "OC"]];
  return `<article class="calculator-side ${side}"><div class="calculator-side-heading"><div><span>${label} · ${draft.source}</span><h3>${escapeHtml(draft.entry.name)}</h3></div><label>模型数量<input type="number" min="1" data-calc-side="${side}" data-calc-model-count value="${escapeHtml(draft.modelCount)}" /></label></div><div class="calculator-stats">${stats.map(([field, title]) => `<label>${title}<input data-calc-side="${side}" data-calc-stat="${field}" value="${escapeHtml(calculatorStat(unit, field, field === "invulnerableSave" ? 0 : ""))}" /></label>`).join("")}</div>${calculatorAbilityMarkup(draft, side)}${calculatorWeaponMarkup(draft, side)}</article>`;
}

function renderCalculatorDetails() {
  const container = $("#calculatorDetails");
  if (!container) return;
  container.innerHTML = `<div class="calculator-detail-grid">${calculatorDetailMarkup("attacker")}${calculatorDetailMarkup("defender")}</div>`;
}

function updateCalculatorDraftFromControl(control) {
  const side = control.dataset.calcSide;
  const draft = state.calculatorDrafts[side];
  if (!draft) return;
  const value = control.type === "checkbox" || control.type === "radio" ? control.checked : control.value;
  if (control.dataset.calcModelCount !== undefined) draft.modelCount = Math.max(1, Number(value) || 1);
  if (control.dataset.calcMartial !== undefined) draft.martialKatah = value;
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
  if (control.dataset.calcOathWound !== undefined) draft.oathWoundBonus = Boolean(value);
  if (control.dataset.calcStat) {
    const field = control.dataset.calcStat;
    draft.unit[field] = ["movement", "toughness", "save", "invulnerableSave", "woundsPerModel", "objectiveControl"].includes(field) ? Math.max(0, Number(value) || 0) : value;
  }
  if (control.dataset.calcGroupIndex !== undefined) {
    const member = draft.joinedMembers?.[Number(control.dataset.calcGroupIndex)];
    if (member) {
      if (control.dataset.calcGroupModelCount !== undefined) {
        member.modelCount = Math.max(1, Number(value) || 1);
        if (draft.entry?.rosterUnit?.id === member.id) draft.modelCount = member.modelCount;
      }
      if (control.dataset.calcGroupStat) {
        const field = control.dataset.calcGroupStat;
        member.unit[field] = Math.max(0, Number(value) || 0);
        if (draft.entry?.rosterUnit?.id === member.id) draft.unit[field] = member.unit[field];
      }
      if (control.dataset.calcGroupWeaponIndex !== undefined) {
        const weapon = member.weapons?.[Number(control.dataset.calcGroupWeaponIndex)];
        if (weapon) {
          if (control.dataset.calcWeaponEnabled !== undefined) setCalculatorWeaponEnabled(member.weapons, Number(control.dataset.calcGroupWeaponIndex), value);
          if (control.dataset.calcWeaponCount !== undefined) weapon.modelCount = Math.max(0, Number(value) || 0);
          if (control.dataset.calcWeaponField) weapon[control.dataset.calcWeaponField] = value;
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

function resolvedRuleEffects(draft, unitName, overrides = {}) {
  if (!window.WarhammerRuleResolver) return { attack: {}, defend: {}, notes: [] };
  return window.WarhammerRuleResolver.resolveUnit(
    draft.entry?.faction,
    unitName,
    draft.ruleSelections || {},
    ruleContextForDraft(draft, unitName, overrides),
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
  const rules = draft ? resolvedRuleEffects(draft, unitName || unit?.name || draft.entry?.name) : { defend: {} };
  const defend = rules.defend || {};
  const effects = emptyDefenderEffects();
  if (defend.feelNoPain) {
    effects.feelNoPainEnabled = true;
    effects.feelNoPainThreshold = defend.feelNoPain;
  }
  if (defend.feelNoPainMortal) {
    effects.feelNoPainMortalEnabled = true;
    effects.feelNoPainMortalThreshold = defend.feelNoPainMortal;
  }
  if (defend.damageOverride) effects.damageOverride = defend.damageOverride;
  if (defend.invulnerableSave) effects.ruleInvulnerableSave = defend.invulnerableSave;
  return effects;
}

function calculatorDataForUnit(unit, faction) {
  const card = findStructuredCalculatorCard(unit.name);
  return getCalculatorCardData(card || { name: unit.name, faction });
}

function buildDefenderGroups(defender, draft, attackerFactionEffects = {}) {
  const group = defender?.group;
  const joined = defender?.rosterUnit && group && (group.category === "联合单位" || /^联合单位/.test(group.title || ""));
  if (!joined) {
    return [{
      name: defender.name,
      modelCount: draft.modelCount,
      wounds: Number(draft.unit.woundsPerModel || 1),
      save: Math.max(2, Number(draft.unit.save || 7) + Number(attackerFactionEffects.targetSaveModifier || 0)),
      invulnerableSave: Number(draft.unit.invulnerableSave || 0),
      allocationOrder: 1,
      effects: defenderEffectsFromUnit(draft.unit, draft, defender.name),
    }];
  }
  const explicitLeader = group.units.some((unit) => /领导|主将|领袖|character|leader/i.test(String(unit.role || "")));
  const explicitGuard = group.units.some((unit) => /护卫|bodyguard/i.test(String(unit.role || "")));
  return group.units.filter((unit) => activeModels(unit).length).map((unit, index) => {
    const isSelected = unit.id === defender.rosterUnit.id;
    const member = draft.joinedMembers?.find((candidate) => candidate.id === unit.id);
    const data = isSelected ? draft.data : calculatorDataForUnit(unit, defender.faction);
    const unitData = isSelected ? draft.unit : (member?.unit || data?.unit || {});
    const roleText = String(unit.role || "");
    const isLeader = /领导|主将|领袖|character|leader/i.test(roleText);
    const role = isLeader ? "角色" : /护卫|bodyguard/i.test(roleText) ? "护卫" : (explicitGuard && !explicitLeader ? "角色" : (index === 0 ? "角色" : "护卫"));
    return {
      name: `${unit.name}（${role}）`,
      modelCount: isSelected ? draft.modelCount : (member?.modelCount || activeModels(unit).length),
      wounds: Number(unitData.woundsPerModel || 1),
      save: Math.max(2, Number(unitData.save || 7) + Number(attackerFactionEffects.targetSaveModifier || 0)),
      invulnerableSave: Number(unitData.invulnerableSave || 0),
      allocationOrder: role === "护卫" ? 1 : 2,
      effects: defenderEffectsFromUnit(unitData, draft, unit.name),
    };
  }).sort((a, b) => a.allocationOrder - b.allocationOrder);
}

function buildSelectedRoundPayload() {
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
  const defenderFactionEffects = resolvedFactionEffects(defenderDraft).attack || {};
  const toughness = Math.max(1, Number(defenderUnit.toughness || 0) + Number(attackerFactionEffects.targetToughnessModifier || 0));
  const defenderFactionHitModifier = state.attackMode === "melee" ? Number(defenderFactionEffects.targetMeleeHitModifier || 0) : 0;
  const defenderRuleEffects = [defender.name, ...(defenderDraft.joinedMembers || []).map((member) => member.name)]
    .map((name) => resolvedRuleEffects(defenderDraft, name).defend || {})
    .reduce((result, effects) => ({
      incomingApModifier: Math.min(result.incomingApModifier, Number(effects.incomingApModifier || 0)),
      incomingHitModifier: Math.min(result.incomingHitModifier, Number(effects.incomingHitModifier || 0)),
      incomingWoundModifier: Math.min(result.incomingWoundModifier, Number(effects.incomingWoundModifier || 0)),
      incomingWoundWhenStrengthGreater: Math.min(result.incomingWoundWhenStrengthGreater, Number(effects.incomingWoundWhenStrengthGreater || 0)),
      incomingWoundWhenStrengthGreaterOrEqual: Math.min(result.incomingWoundWhenStrengthGreaterOrEqual, Number(effects.incomingWoundWhenStrengthGreaterOrEqual || 0)),
    }), { incomingApModifier: 0, incomingHitModifier: 0, incomingWoundModifier: 0, incomingWoundWhenStrengthGreater: 0, incomingWoundWhenStrengthGreaterOrEqual: 0 });
  const attackerSources = attackerDraft.joinedMembers?.length
    ? attackerDraft.joinedMembers.map((member) => member.id === attacker.rosterUnit?.id
      ? {
        id: attacker.rosterUnit?.id, name: attacker.name, unit: attackerUnit, weapons: attackerDraft.weapons, modelCount: attackerDraft.modelCount,
        initialModelCount: attackerDraft.initialModelCount, remainingWounds: attackerDraft.remainingWounds,
      }
      : member)
    : [{ name: attacker.name, unit: attackerUnit, weapons: attackerDraft.weapons, modelCount: attackerDraft.modelCount, initialModelCount: attackerDraft.initialModelCount, remainingWounds: attackerDraft.remainingWounds }];
  const sourceRuleEntries = attackerSources.map((source) => ({
    source,
    effects: resolvedRuleEffects(attackerDraft, source.name, {
      initialModelCount: source.initialModelCount,
      remainingWounds: source.remainingWounds,
      underStartingStrength: Number(source.modelCount || 0) < Number(source.initialModelCount || source.modelCount || 0),
      belowHalfStrength: Number(source.modelCount || 0) * 2 < Number(source.initialModelCount || source.modelCount || 0),
    }).attack || {},
  }));
  // Rules worded as applying to a leader's unit (for example Trajann's ignore
  // modifier, Aleya's under-strength bonus and Martial Master) are shared by
  // every model in an imported joined unit. Source-specific rules remain on
  // their own weapon profiles below.
  const sharedJoinedRules = sourceRuleEntries.reduce((result, entry) => ({
    hitModifier: result.hitModifier + Number(entry.effects.hitModifier || 0),
    woundModifier: result.woundModifier + Number(entry.effects.woundModifier || 0),
    hitReroll: result.hitReroll || entry.effects.hitReroll || null,
    sustainedHits: Math.max(result.sustainedHits, Number(entry.effects.sustainedHits || 0)),
    lethalHits: result.lethalHits || Boolean(entry.effects.lethalHits),
    devastating: result.devastating || Boolean(entry.effects.devastating),
    attackModifier: result.attackModifier + Number(entry.effects.attackModifier || 0),
    strengthModifier: result.strengthModifier + Number(entry.effects.strengthModifier || 0),
    apModifier: result.apModifier + Number(entry.effects.apModifier || 0),
    ignoreHitModifiers: result.ignoreHitModifiers || Boolean(entry.effects.ignoreHitModifiers),
    martialChoices: [...new Set([...result.martialChoices, ...(entry.effects.martialChoices || [])])],
  }), { hitModifier: 0, woundModifier: 0, hitReroll: null, sustainedHits: 0, lethalHits: false, devastating: false, attackModifier: 0, strengthModifier: 0, apModifier: 0, ignoreHitModifiers: false, martialChoices: [] });
  const weaponGroups = attackerSources.flatMap((source) => {
    const sourceRules = sourceRuleEntries.find((entry) => entry.source === source)?.effects || {};
    const sourceKey = !attackerDraft.joinedMembers.length || (source.id && source.id === attacker.rosterUnit?.id) ? "unit" : `member-${attackerDraft.joinedMembers.indexOf(source)}`;
    const hasMartialKatah = state.attackMode === "melee" && (window.WarhammerRuleResolver?.isMartialKatahUnit(attacker.faction, source.name) || /禁军武艺/.test(String(source.unit?.abilities || "")));
    const martialKatah = hasMartialKatah ? [attackerDraft.martialKatah, ...sharedJoinedRules.martialChoices].filter((choice) => choice && choice !== "none") : [];
    const oathOfMoment = unitHasOathOfMoment(source.unit, attacker.faction)
      ? { woundBonus: Boolean(attackerDraft.oathWoundBonus) }
      : {};
    const groups = (source.weapons || []).map((weapon, weaponIndex) => ({ weapon, weaponIndex }))
      .filter(({ weapon }) => weapon.enabled !== false && weapon.type === state.attackMode && Number(weapon.modelCount ?? source.modelCount ?? 1) > 0)
      .map(({ weapon, weaponIndex }) => {
      const attackOverride = sourceRules.weaponAttackOverride?.name === weapon.name
        ? sourceRules.weaponAttackOverride.value
        : (Number(sourceRules.attackModifier || sharedJoinedRules.attackModifier || 0) && Number.isFinite(Number(weapon.attacks))
          ? String(Number(weapon.attacks) + Number(sourceRules.attackModifier || sharedJoinedRules.attackModifier || 0))
          : weapon.attacks);
      const hitModifier = sharedJoinedRules.hitModifier + (sharedJoinedRules.ignoreHitModifiers ? 0 : defenderFactionHitModifier + defenderRuleEffects.incomingHitModifier);
      const effectiveStrength = Number(weapon.strength || 0) + Number(sourceRules.strengthModifier || sharedJoinedRules.strengthModifier || 0);
      const conditionalWoundModifier = effectiveStrength >= toughness
        ? defenderRuleEffects.incomingWoundWhenStrengthGreaterOrEqual
        : (effectiveStrength > toughness ? defenderRuleEffects.incomingWoundWhenStrengthGreater : 0);
      const woundModifier = sharedJoinedRules.woundModifier + defenderRuleEffects.incomingWoundModifier + conditionalWoundModifier;
      const hitThreshold = isTorrentWeapon(weapon) ? 7 : parseSkill(weapon.skill);
      const woundThreshold = woundTarget(effectiveStrength, toughness);
      const oathReroll = unitHasOathOfMoment(source.unit, attacker.faction) && hitThreshold <= 6
        ? resolvedRerollSelection(attackerDraft, "oath-hit", sourceKey, weaponIndex, hitThreshold)
        : { type: "none", values: [] };
      const ruleHitMode = sourceRules.hitReroll || sharedJoinedRules.hitReroll;
      const ruleHitReroll = ruleHitMode === "ones"
        ? { type: "specific", values: [1] }
        : ruleHitMode === "failed"
          ? resolvedRerollSelection(attackerDraft, "rule-hit", sourceKey, weaponIndex, hitThreshold)
          : { type: "none", values: [] };
      const effectiveHitReroll = ruleHitReroll.type !== "none" ? ruleHitReroll : oathReroll;
      const guardReroll = sourceRules.woundReroll === "failed"
        ? resolvedRerollSelection(attackerDraft, "guard-wound", sourceKey, weaponIndex, woundThreshold)
        : { type: sourceRules.woundReroll || "", values: [] };
      return {
        name: `${source.name} · ${weapon.name}`,
        modelCount: Number(weapon.modelCount ?? source.modelCount ?? 1),
        attacks: attackOverride,
        hit: isTorrentWeapon(weapon) ? "torrent" : parseSkill(weapon.skill),
        wound: woundThreshold,
        ap: Math.max(0, Math.abs(Number(weapon.ap || 0)) + Number(sourceRules.apModifier || sharedJoinedRules.apModifier || 0) + defenderRuleEffects.incomingApModifier),
        damage: weapon.damage,
        effects: weaponEffectsFromKeywords(weapon, martialKatah, { ...oathOfMoment, hitReroll: effectiveHitReroll }, { ...sourceRules, sustainedHits: sharedJoinedRules.sustainedHits, lethalHits: sharedJoinedRules.lethalHits, devastating: sharedJoinedRules.devastating, woundReroll: guardReroll.type, woundRerollValues: guardReroll.values }, { hitModifier, woundModifier }),
      };
    });
    return sourceRules.repeatRanged ? [...groups, ...groups.map((group) => ({ ...group, name: `${group.name}（枪林弹雨）` }))] : groups;
  });
  if (!weaponGroups.length) throw new Error(`进攻单位“${attacker.name}”没有${state.attackMode === "ranged" ? "远程" : "近战"}武器`);
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
  const hasCards = state.calculatorCards.some((card) => card.structured && card.data?.unit);
  const unmatched = hasCards
    ? ["attacker", "defender"].flatMap((side) => getRosterUnits(state.rosters[side])
      .filter((unit) => !findStructuredCalculatorCard(unit.name))
      .map((unit) => ({ side, name: unit.name })))
    : [];
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
    return `<section class="roster-side ${side}"><div class="roster-heading"><div><span>${sideLabel(side)}</span><strong>${escapeHtml(roster.name)}</strong></div><small>${escapeHtml(roster.faction || "未识别阵营")}</small></div>${groups}</section>`;
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
  const names = [unitName, unitName.replace(/[（(][^）)]*[）)]/g, "").trim(), ...(DATASHEET_ALIASES[faction]?.[unitName] || [])].filter(Boolean);
  const normalizeName = (value) => String(value || "")
    .replace(/[\s\u00a0·•・,，。.!！:：;；/\\_\-—–]/g, "")
    .replace(/[（(][^）)]*[）)]/g, "")
    .toLowerCase();
  const normalizedNames = new Set(names.map(normalizeName).filter(Boolean));
  const matchesName = (card) => {
    if (!card?.structured || !card.data?.unit) return false;
    if (faction && card.faction && card.faction !== faction) return false;
    return [card.name, card.data.unit.name, card.data.englishName, card.englishName]
      .some((candidate) => normalizedNames.has(normalizeName(candidate)));
  };
  let structured = state.calculatorCards.find(matchesName);
  // Older imported rosters may contain different punctuation or a stale
  // faction label. Resolve directly from the structured catalogue before
  // falling back to the legacy Markdown section.
  if (!structured) {
    const jsonPaths = [...new Set([
      ...(faction && DATASHEET_JSON_FILES[faction] ? [DATASHEET_JSON_FILES[faction]] : []),
      ...Object.values(DATASHEET_JSON_FILES),
    ])];
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
  if (structured?.data?.unit) return { type: "structured", data: structured.data };
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
      return `<article class="datasheet-fallback-row"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value || "—")}</span></article>`;
    }).join("");
    const content = fallbackRows ? `<div class="datasheet-fallback-list">${fallbackRows}</div>` : `<pre>${escapeHtml(preview.text)}</pre>`;
    return `<details open><summary>数据卡属性</summary><div class="datasheet-card-preview">${content}</div></details>`;
  }
  const data = preview.data || {};
  const unit = data.unit || {};
  const save = unit.invulnerableSave ? `${unit.save}+ / ${unit.invulnerableSave}+` : `${unit.save ?? "-"}+`;
  const statRows = [["移动", unit.movement ? `${unit.movement}"` : "-"], ["坚韧", unit.toughness ?? "-"], ["护甲 / 特殊保护", save], ["血量", unit.woundsPerModel ?? "-"], ["领导力", unit.leadership ?? "-"], ["控制值", unit.objectiveControl ?? "-"]];
  const weaponRows = (data.weapons || []).map((weapon) => `<tr><td>${escapeHtml(weapon.name)}</td><td>${weapon.type === "melee" ? "近战" : "射击"}</td><td>${escapeHtml(weapon.attacks ?? "-")}</td><td>${escapeHtml(weapon.skill === "torrent" ? "自动命中" : weapon.skill ?? "-")}</td><td>${escapeHtml(weapon.strength ?? "-")}</td><td>${escapeHtml(weapon.ap ?? "-")}</td><td>${escapeHtml(weapon.damage ?? "-")}</td><td>${escapeHtml((weapon.abilities || []).join("、") || "-")}</td></tr>`).join("");
  const abilities = String(unit.abilities || "").split("⚫").map((item) => item.trim()).filter(Boolean).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `<details open><summary>数据卡属性</summary><div class="datasheet-card-preview"><div class="datasheet-stat-grid">${statRows.map(([label, value]) => `<div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}</div>${unit.defaultEquipment ? `<p class="datasheet-equipment"><strong>默认装备：</strong>${escapeHtml(unit.defaultEquipment)}</p>` : ""}${weaponRows ? `<h4>武器</h4><div class="datasheet-table-wrap"><table><thead><tr><th>武器</th><th>类型</th><th>A</th><th>命中</th><th>S</th><th>AP</th><th>D</th><th>技能</th></tr></thead><tbody>${weaponRows}</tbody></table></div>` : ""}${abilities ? `<h4>技能</h4><ul class="datasheet-abilities">${abilities}</ul>` : ""}</div></details>`;
}

function datasheetPreviewCardMarkup(preview) {
  if (!preview) return datasheetPreviewMarkup(preview);
  if (preview.type !== "structured") return datasheetPreviewMarkup(preview);
  const data = preview.data || {};
  const unit = data.unit || {};
  const save = unit.invulnerableSave ? `${unit.save}+ / ${unit.invulnerableSave}+` : `${unit.save ?? "-"}+`;
  const statRows = [["移动", unit.movement ? `${unit.movement}\"` : "-"], ["坚韧", unit.toughness ?? "-"], ["护甲 / 特殊保护", save], ["血量", unit.woundsPerModel ?? "-"], ["领导力", unit.leadership ?? "-"], ["控制值", unit.objectiveControl ?? "-"]];
  const weaponRows = (data.weapons || []).map((weapon) => `<article class="datasheet-weapon-row"><div class="datasheet-weapon-heading"><strong>${escapeHtml(weapon.name)}</strong><span>${weapon.type === "melee" ? "近战" : "射击"}</span></div><div class="datasheet-weapon-stats"><div><span>A</span><strong>${escapeHtml(weapon.attacks ?? "-")}</strong></div><div><span>命中</span><strong>${escapeHtml(weapon.skill === "torrent" ? "自动" : weapon.skill ?? "-")}</strong></div><div><span>S</span><strong>${escapeHtml(weapon.strength ?? "-")}</strong></div><div><span>AP</span><strong>${escapeHtml(weapon.ap ?? "-")}</strong></div><div><span>D</span><strong>${escapeHtml(weapon.damage ?? "-")}</strong></div></div><small>${escapeHtml((weapon.abilities || []).join("、") || "无关键词")}</small></article>`).join("");
  const abilities = String(unit.abilities || "").split("⚫").map((item) => item.trim()).filter(Boolean).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `<details open><summary>数据卡属性</summary><div class="datasheet-card-preview"><div class="datasheet-stat-grid">${statRows.map(([label, value]) => `<div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}</div>${unit.defaultEquipment ? `<p class="datasheet-equipment"><strong>默认装备：</strong>${escapeHtml(unit.defaultEquipment)}</p>` : ""}${weaponRows ? `<h4>武器</h4><div class="datasheet-weapon-list">${weaponRows}</div>` : ""}${abilities ? `<h4>技能</h4><ul class="datasheet-abilities">${abilities}</ul>` : ""}</div></details>`;
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
  const categoryNames = new Set(["传奇英雄人物", "战术小队", "其他步兵", "军表构成", "3", "骑乘", "终结者", "机甲", "载具", "运输载具", "飞行载具", "工事"]);
  for (const path of CALCULATOR_CARD_FILES) {
    try {
      const response = await fetch(path);
      if (!response.ok) continue;
      const parsed = await response.json();
      if (parsed.unit?.name) cards.set(`${parsed.faction}:${parsed.unit.name}`, { faction: parsed.faction, name: parsed.unit.name, structured: true, data: parsed });
      for (const card of parsed.cards || []) {
        if (!card.name || categoryNames.has(card.name) || card.name.startsWith("⚫") || /爆弹枪|复合武器|雷霆锤/.test(card.name)) continue;
        const key = `${parsed.faction}:${card.name}`;
        const candidate = { faction: parsed.faction, name: card.name, page: card.page, structured: Boolean(card.unit), data: card.unit ? card : null };
        const existing = cards.get(key);
        if (!existing || (candidate.structured && !existing.structured)) cards.set(key, candidate);
      }
    } catch {
      // 本地 file:// 预览可能禁止 fetch；军表选项仍然可用。
    }
  }
  state.calculatorCards = [...cards.values()];
  const digitalSources = [
    { faction: "星际战士", path: "data/星际战士/数据卡-可检索.md" },
  ];
  for (const source of digitalSources) {
    try {
      const response = await fetch(source.path);
      if (!response.ok) continue;
      const parsed = parseDigitalDatasheets(await response.text(), source.faction);
      // The JSON catalogue is extracted directly from the source PDF and is
      // authoritative when present.  Keep the Markdown parser only as a
      // fallback for old/unstructured entries.
      state.calculatorCards = state.calculatorCards.map((card) => !card.data?.unit && parsed.get(`${card.faction}:${card.page}`)
        ? { ...card, structured: true, data: parsed.get(`${card.faction}:${card.page}`) }
        : card);
      for (const [page, names] of Object.entries(DIGITAL_UNIT_ALIASES[source.faction] || {})) {
        const data = parsed.get(`${source.faction}:${page}`);
        names.forEach((name) => {
          if (!data) return;
          const virtualCard = { faction: source.faction, name, page: Number(page), structured: true, data: { ...data, unit: { ...data.unit, name } } };
          const existingIndex = state.calculatorCards.findIndex((card) => card.faction === source.faction && card.name === name);
          if (existingIndex >= 0) state.calculatorCards[existingIndex] = virtualCard;
          else state.calculatorCards.push(virtualCard);
        });
      }
    } catch {
      // 页面离线时仍保留已经加载的军表和 JSON 数据卡。
    }
  }
  applyDatasheetWoundsToRosters();
  renderCalculatorSelectors();
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
    result.set(`${faction}:${heading.page}`, { faction, kind: "datasheet", unit, weapons });
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
      if (model.woundsSource === "manual" || model.maximumWounds !== 1) return;
      model.maximumWounds = wounds;
      model.currentWounds = model.currentWounds === 1 ? wounds : model.currentWounds;
      model.woundsSource = "datasheet";
      changed = true;
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
  const faction = lines.find((line) => ["帝皇禁军", "白色疤痕", "星际战士", "死亡守卫"].includes(line.trim()))?.trim() || "未识别阵营";
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
    feelNoPainThreshold: 6, feelNoPainMortalEnabled: false, feelNoPainMortalThreshold: 6, damageOverride: 0, ruleInvulnerableSave: 0, oneUseInvulnerableEnabled: false, oneUseInvulnerableSave: 2,
  };
}

function weaponEffectsFromKeywords(weapon, martialKatah = [], oathOfMoment = {}, ruleEffects = {}, modifiers = {}) {
  const keywords = (weapon?.abilities || []).join(" ");
  const sustained = keywords.match(/连击\s*(d3|\d+)?|sustained\s*hits?\s*(d3|\d+)?/i);
  const sustainedValue = sustained?.[1] || sustained?.[2] || String(ruleEffects.sustainedHits || 1);
  const hasSustained = Boolean(sustained) || Number(ruleEffects.sustainedHits || 0) > 0;
  const hasLethal = /致命命中|致命一击|lethal/i.test(keywords) || Boolean(ruleEffects.lethalHits);
  const hasDevastating = /毁灭性伤口|毁灭性伤害|毁灭伤害|devastating/i.test(keywords) || Boolean(ruleEffects.devastating);
  const hasTwinLinked = /双联|twin-?linked/i.test(keywords);
  const hitReroll = oathOfMoment?.hitReroll || { type: "none", values: [] };
  const hitValues = [...new Set((hitReroll.values || []).map(Number).filter((value) => value >= 1 && value <= 6))];
  const oathWoundBonus = Boolean(oathOfMoment?.woundBonus);
  const martialChoices = Array.isArray(martialKatah) ? martialKatah : [martialKatah];
  const ruleWoundReroll = ruleEffects.woundReroll || "";
  const ruleWoundRerollValues = [...new Set((ruleEffects.woundRerollValues || []).map(Number).filter((value) => value >= 1 && value <= 6))];
  return emptyWeaponEffects({
    hitRerollAllEnabled: hitReroll.type && hitReroll.type !== "none",
    hitRerollAllType: hitReroll.type || "ones",
    hitRerollAllValues: hitValues,
    hitModifierEnabled: Boolean(modifiers.hitModifier),
    hitModifierValue: Number(modifiers.hitModifier || 0),
    woundModifierEnabled: oathWoundBonus || Boolean(modifiers.woundModifier),
    woundModifierValue: (oathWoundBonus ? 1 : 0) + Number(modifiers.woundModifier || 0),
    sustainedHitsEnabled: hasSustained || martialChoices.includes("sustained"),
    sustainedHitsValue: sustainedValue,
    lethalHitsEnabled: hasLethal || martialChoices.includes("lethal"),
    devastatingWoundsEnabled: hasDevastating || Boolean(ruleEffects.devastating),
    woundRerollAllEnabled: hasTwinLinked || Boolean(ruleWoundReroll),
    woundRerollAllType: ruleWoundReroll || "failed",
    woundRerollAllValues: ruleWoundRerollValues,
  });
}

function buildExternalRoundPayload() {
  const payload = buildSelectedRoundPayload();
  payload.simulations = 1000;
  return payload;
}

function calculatorEndpointError(endpoint) {
  try {
    const target = new URL(endpoint, window.location.href);
    const current = new URL(window.location.href);
    if (target.hostname === "wathammer.com" && target.origin !== current.origin) {
      return `GitHub Pages 不能直接读取固定 Wathammer 接口（服务器未开放跨域）。请点击页面中的“在手机上打开 Wathammer 外部计算页”：${FIXED_CALCULATOR_PAGE}`;
    }
  } catch {
    return "外部计算器地址格式不正确";
  }
  return "外部计算器请求失败";
}

async function runExternalCalculator() {
  if (!state.externalCalculatorEnabled) throw new Error("外部基准已关闭，请先勾选“启用固定外部基准”");
  const endpoint = FIXED_CALCULATOR_ENDPOINT;
  const directError = calculatorEndpointError(endpoint);
  if (directError.includes("GitHub Pages")) {
    const opened = typeof window.open === "function" ? window.open(FIXED_CALCULATOR_PAGE, "_blank", "noopener,noreferrer") : null;
    const message = opened ? "已打开固定 Wathammer 外部计算页，请在该页面完成计算。" : `浏览器未能自动打开外部页面，请点击固定链接：${FIXED_CALCULATOR_PAGE}`;
    $("#externalNote").textContent = message;
    return { opened: Boolean(opened), averageDamage: null, averageKills: null, chanceDelta: null, damageDelta: null };
  }
  const payload = buildExternalRoundPayload();
  const requiredModels = payload.defenderGroups.reduce((sum, group) => sum + Math.max(0, Number(group.modelCount || 0)), 0) || 1;
  const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const contentType = response.headers?.get?.("content-type") || "";
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status || "请求失败"} ${text.slice(0, 240) || calculatorEndpointError(endpoint)}`);
  }
  if (!contentType.includes("json")) {
    const text = await response.text();
    throw new Error(`外部计算器返回的不是 JSON（${contentType || "无 Content-Type"}）：${text.slice(0, 180)}`);
  }
  const data = await response.json();
  const summary = data.roundSummary || {};
  const weapons = summary.weaponGroups || [];
  const histogramAverage = (histogram) => {
    if (!histogram?.x?.length || !histogram?.y?.length) return null;
    const total = Number(histogram.total || data.total || histogram.y.reduce((sum, value) => sum + Number(value || 0), 0));
    return histogram.x.reduce((sum, value, index) => sum + Number(value) * Number(histogram.y[index] || 0), 0) / total;
  };
  const histogramKillChance = (histogram, threshold = 1) => {
    if (!histogram?.x?.length || !histogram?.y?.length) return null;
    const total = Number(histogram.total || data.total || histogram.y.reduce((sum, value) => sum + Number(value || 0), 0));
    return histogram.x.reduce((sum, value, index) => sum + (Number(value) >= threshold ? Number(histogram.y[index] || 0) : 0), 0) / total;
  };
  const averageDamage = histogramAverage(data.totalDamage) ?? weapons.reduce((sum, group) => sum + Number(group.averageDamage || 0), 0);
  const averageHits = histogramAverage(data.hit) ?? weapons.reduce((sum, group) => sum + Number(group.averageHits || 0), 0);
  const averageWounds = histogramAverage(data.wound) ?? weapons.reduce((sum, group) => sum + Number(group.averageWounds || 0), 0);
  const averageKills = histogramKillChance(data.kills, requiredModels);
  if (averageKills === null) {
    $("#externalChance").textContent = "—";
    $("#externalDamage").textContent = averageDamage.toFixed(2);
    $("#externalNote").textContent = "外部结果没有返回完整击杀分布，无法判断整队全歼概率。";
    return { averageDamage, averageKills: null, chanceDelta: null, damageDelta: null };
  }
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
  const attackerDraft = getCalculatorDraft("attacker");
  const defenderDraft = getCalculatorDraft("defender");
  const joined = Boolean(defenderDraft?.joinedMembers?.length);
  $("#calcNote").textContent = `结果来自当前选择的单位和可调参数（${state.attackMode === "ranged" ? "远程射击" : "近战"}；全歼概率按整个目标单位模型全部被摧毁计算；已按页面中勾选或选择的阵营技能、单位技能结算${joined ? "；联合单位按护卫→角色分配伤害" : ""}）。`;
  $("#calcTargetWounds").textContent = defenderDraft?.unit?.woundsPerModel ? `${defenderDraft.unit.woundsPerModel}W / 模型${joined ? "（护卫先承伤）" : ""}` : "已按所选目标数据卡结算";
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
    const result = await runExternalCalculator();
    showToast(result?.opened ? "已打开固定外部计算页" : result?.averageDamage === null ? "请点击固定链接打开外部页面" : "外部基准计算完成");
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
  ["帝皇禁军", "星际战士", "死亡守卫"].forEach((faction) => {
    const shorthand = faction === "帝皇禁军"
      ? /禁军|custodes/i
      : faction === "星际战士"
        ? /星际战士|阿斯塔特|space marines/i
        : /死亡守卫|death guard|瘟疫军团/i;
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
