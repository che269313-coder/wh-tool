import fs from "node:fs";
import path from "node:path";
import { compileAbility } from "./faction-rule-compiler.mjs";
import { adjudicateRuleCatalog, loadPdfDisplayLedger } from "./source-adjudication.mjs";
import { writeFileSyncWithRetry } from "./fs-write.mjs";

const sourcePath = path.resolve("docs/data/欧克兽人/欧克兽人-全部数据卡.json");
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8").replace(/^\uFEFF/, ""));
const root = path.resolve(import.meta.dirname, "..");
const packagePayload = JSON.parse(fs.readFileSync(path.join(root, "data/factions/orks/package.json"), "utf8"));
const pdfDisplayLedger = loadPdfDisplayLedger(root);
const supported = "计算支持（满足条件时自动计入）";
const displayOnly = "已结构化，当前仅供查阅";
const melee = "melee";
const ranged = "ranged";

const slug = (value) => String(value || "")
  .normalize("NFKD")
  .replace(/[’']/g, "")
  .replace(/[^a-zA-Z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .toLowerCase();

const cleanText = (value) => String(value || "")
  .replace(/\s+/g, " ")
  .trim();

const phaseFor = (text) => {
  const compact = String(text || "").replace(/\s+/g, "");
  if (/近战阶段|近战攻击|近战武器|近战装备/.test(compact)) return melee;
  if (/射击阶段|远程攻击|远距攻击|射击攻击|远程武器/.test(compact)) return ranged;
  return undefined;
};

const controls = (leader = false) => [
  { id: "enabled", type: "checkbox", label: "本次启用此技能" },
  ...(leader ? [{ id: "forceLeader", type: "checkbox", label: "数据卡模式下强行视为已领导单位" }] : []),
];

function describeEffects(text, abilityName = "") {
  text = `${abilityName} ${text}`.trim();
  const result = [];
  const controlList = [];
  const compact = String(text || "").replace(/\s+/g, "");
  const hasLeader = /(?:此|该|本)模型(?:正?在)?(?:领导|率领|带领)(?:一个)?单位|(?:领导|率领|带领)(?:一个)?单位时|当(?:此|该|本)模型(?:领导|率领|带领)/.test(text);
  const addControl = (control) => {
    if (!controlList.some((item) => item.id === control.id)) controlList.push(control);
  };
  const add = (effect) => result.push({ ...effect, ...(effect.phase || !phaseFor(text) ? {} : { phase: phaseFor(text) }) });
  const select = (effect, controlId, equals) => add({ ...effect, selection: { controlId, equals } });
  const manual = /每场战斗一次|每轮限定|每个回合一次|可以|可重掷|可选择|若如此做|当.+被选择/.test(text);
  const waagh = /咻啊|瓦戈|Waaagh/.test(text);

  const fnp = text.match(/不觉疼痛\s*([3456])\s*\+/);
  if (fnp) add({ type: "fnp", threshold: Number(fnp[1]) });

  const targetMonsterVehicle = /凶兽\s*\(Monster\)|巨兽\s*\(Monster\)|载具\s*\(Vehicle\)|对抗载具|对载具|对凶兽/.test(text);
  const excludesMonsterVehicle = targetMonsterVehicle && /(?:不包括|除外|非)\s*(?:凶兽|巨兽|载具)|凶兽[^。；]{0,8}(?:和|或|\/)[^。；]{0,8}载具[^。；]{0,8}(?:除外|除外)/.test(text);
  if (targetMonsterVehicle) addControl({ id: "targetMonsterVehicle", type: "checkbox", label: "目标为凶兽或载具" });
  const targetWithin9 = /目标距\s*9|目标在目标标记|距9"以内/.test(text);
  if (targetWithin9) addControl({ id: "targetWithin9", type: "checkbox", label: "满足目标距离或目标标记条件" });

  const hitReroll = /重掷命中|重投命中|重掷结果为\s*1\s*的命中|重投结果为\s*1\s*的命中|重掷命中掷骰/.test(text);
  if (hitReroll && !/冲锋掷骰/.test(text)) {
    const mode = /结果为\s*1|中的\s*1/.test(text) ? "ones" : "failed";
    add({ type: "hit-reroll", mode, ...(targetMonsterVehicle ? (excludesMonsterVehicle ? { unlessTargetMonsterVehicle: true } : { requiresTargetMonsterVehicle: true }) : {}) });
  }
  const woundReroll = /重掷致伤|重投致伤|重掷结果为\s*1\s*的致伤|重投结果为\s*1\s*的致伤/.test(text);
  if (woundReroll) {
    const mode = /结果为\s*1|中的\s*1/.test(text) ? "ones" : "failed";
    add({ type: "wound-reroll", mode, ...(targetMonsterVehicle ? (excludesMonsterVehicle ? { unlessTargetMonsterVehicle: true } : { requiresTargetMonsterVehicle: true }) : {}) });
  }

  const incomingHit = /攻击指向此单位|攻击以此单位为目标|对此单位的命中|敌方单位.*命中掷骰减|烟雾拖尾|潜行：|滚滚浓烟/.test(text);
  const hitBonus = /命中(?:掷骰|结果)[^。\n]{0,60}(?:加|增加|改善)\s*1|命中(?:掷骰|结果)[^。\n]{0,12}[+＋]\s*1/.test(text);
  const hitMinus = /命中(?:掷骰|结果)[^。\n]{0,60}(?:减去|减)\s*1|命中(?:掷骰|结果)[^。\n]{0,12}-\s*1/.test(text);
  if (incomingHit && (hitMinus || /烟雾拖尾|潜行：|滚滚浓烟/.test(text))) {
    add({ type: "incoming-hit-minus", value: 1, ...(phaseFor(text) ? { phase: phaseFor(text) } : {}) });
  } else if (hitBonus) {
    add({ type: "hit-modifier", value: 1 });
  }

  const incomingWound = /每次攻击以此单位为目标|若该攻击的力量特性大于此单位的韧性|攻击的力量特性大于此单位/.test(text);
  const woundBonus = /致伤(?:掷骰|结果)[^。\n]{0,60}(?:加|增加|改善)\s*1|致伤(?:掷骰|结果)[^。\n]{0,12}[+＋]\s*1/.test(text);
  const woundMinus = /致伤掷骰减|致伤结果减|致伤掷骰\s*-\s*1/.test(text);
  if (incomingWound && woundMinus) add({ type: "incoming-wound-minus", value: 1 });
  else if (/力量特性大于此单位的韧性/.test(text)) add({ type: "incoming-wound-when-strength-gt", value: -1 });
  else if (woundBonus) add({ type: "wound-modifier", value: 1 });

  if (/力量(?:特性)?和攻击特性各加\s*1|近战武器的力量和攻击特性各加\s*1/.test(text)) {
    add({ type: "weapon-strength-modifier", value: 1, phase: melee });
    add({ type: "attack-modifier", value: 1, phase: melee });
  } else if (/近战武器.*力量特性?\s*加\s*1|近战武器.*力量.*\+\s*1|近战武器力量\s*\+\s*1/.test(text)) {
    add({ type: "weapon-strength-modifier", value: 1, phase: melee });
  } else if (/力量\s*\(S\)特性.*\+\s*1|力量特性\s*\+\s*1/.test(text) && !/韧性/.test(text)) {
    add({ type: "weapon-strength-modifier", value: 1, ...(phaseFor(text) ? { phase: phaseFor(text) } : {}) });
  }

  if (/护甲穿透特性.*(?:提升|加)\s*1|护甲穿透特性\s*\+\s*1|护甲穿透特性.*各?\+\s*1/.test(text) && !/恶化该攻击/.test(text)) {
    add({ type: "weapon-ap-modifier", value: 1, ...(phaseFor(text) ? { phase: phaseFor(text) } : {}) });
  } else if (/恶化该攻击的护甲穿透特性\s*1/.test(text)) {
    add({ type: "incoming-ap", value: 1 });
  }

  const attackBonus = text.match(/攻击(?:次数|特性)[^。\n]{0,40}(?:增加|加)\s*(\d+)|\bA\s*\+\s*(\d+)/);
  if (attackBonus && !/每5个|每个模型/.test(text)) {
    add({ type: "attack-modifier", value: Number(attackBonus[1] || attackBonus[2]) });
  }
  const damageBonus = text.match(/伤害特性(?:值)?\s*(?:增加|加)\s*(\d+)|\bD\s*\+\s*(\d+)/);
  if (damageBonus && !/每5个|每个模型/.test(text)) {
    add({ type: "damage-modifier", value: Number(damageBonus[1] || damageBonus[2]), ...(targetMonsterVehicle ? { requiresTargetMonsterVehicle: true } : {}) });
  }

  const invulnerable = text.match(/([23456])\s*\+\s*无敌豁免|([23456])\s*\+\s*特殊保护|获得\s*([23456])\s*\+\s*无敌/);
  if (invulnerable) add({ type: "invulnerable-save", value: Number(invulnerable[1] || invulnerable[2] || invulnerable[3]) });

  if (/连击\s*1/.test(text)) add({ type: "sustained-hits", value: 1 });
  if (/致命一击/.test(text)) add({ type: "lethal-hits" });
  if (/毁灭伤害/.test(text)) add({ type: "devastating-wounds" });
  if (/命中掷骰为1时可重掷|重掷结果为\s*1\s*的命中|重投结果为\s*1\s*的命中/.test(text) && !result.some((effect) => effect.type === "hit-reroll")) {
    add({ type: "hit-reroll", mode: "ones", ...(targetMonsterVehicle ? { requiresTargetMonsterVehicle: true } : {}) });
  }

  if (/近战阶段中.*被选择进行近战/.test(text) && /致命一击/.test(text) && /连击\s*1/.test(text)) {
    result.length = 0;
    add({ type: "lethal-hits", phase: melee, selection: { controlId: "mode", equals: "lethal" } });
    add({ type: "sustained-hits", value: 1, phase: melee, selection: { controlId: "mode", equals: "sustained" } });
    addControl({ id: "mode", type: "select", label: "本次选择", options: [["none", "不启用"], ["lethal", "致命一击"], ["sustained", "连击 1"]] });
  }

  if (/低于起始兵力|低于起始模型数量/.test(text) && /重掷结果为1的命中|重投结果为1的命中/.test(text)) {
    addControl({ id: "onObjective", type: "checkbox", label: "目标位于目标标记范围内" });
    add({ type: "hit-reroll", mode: "failed", selection: { controlId: "onObjective", equals: true } });
  }

  if (targetWithin9 && /目标标记/.test(text) && /重掷结果为\s*1\s*的命中/.test(text)) {
    result.splice(0, result.length, { type: "hit-reroll", mode: "ones", ...(phaseFor(text) ? { phase: phaseFor(text) } : {}) });
    add({ type: "hit-reroll", mode: "failed", ...(phaseFor(text) ? { phase: phaseFor(text) } : {}), selection: { controlId: "targetWithin9", equals: true } });
  } else if (targetWithin9) {
    result.forEach((effect) => { effect.selection = { controlId: "targetWithin9", equals: true }; });
  }
  if (targetMonsterVehicle) {
    result.forEach((effect) => {
      if (!["hit-reroll", "wound-reroll", "hit-modifier", "wound-modifier", "damage-modifier"].includes(effect.type)) return;
      if (excludesMonsterVehicle) effect.unlessTargetMonsterVehicle = true;
      else effect.requiresTargetMonsterVehicle = true;
    });
  }

  if (/每次进行冲锋移动时[\s\S]*毁灭伤害|完成冲锋移动时[\s\S]*毁灭伤害/.test(text)) {
    addControl({ id: "charged", type: "checkbox", label: "本单位本回合进行过冲锋移动" });
    result.forEach((effect) => { effect.selection = { controlId: "charged", equals: true }; });
  }

  if (/结果为\s*3-4[\s\S]*力量特性\s*\+\s*1[\s\S]*结果为\s*5-6|结果为\s*3-4[\s\S]*远程武器力量/.test(text)) {
    result.length = 0;
    addControl({ id: "mode", type: "select", label: "本次选择", options: [["none", "不启用"], ["strength", "远程武器力量 +1"], ["attacks", "远程武器攻击次数 +1"]] });
    add({ type: "weapon-strength-modifier", value: 1, phase: ranged, selection: { controlId: "mode", equals: "strength" } });
    add({ type: "attack-modifier", value: 1, phase: ranged, selection: { controlId: "mode", equals: "attacks" } });
  }

  // These abilities choose a different friendly/enemy unit. The calculator
  // resolves the currently selected unit only, so applying the effect here
  // would silently buff the wrong unit; keep the complete rule text instead.
  if (/选择[^。\n]{0,80}己方|友军[^。\n]{0,40}(?:获得|具有)|选择一个[^。\n]{0,50}敌方单位|选择[^。\n]{0,50}敌方单位/.test(text)) {
    result.length = 0;
    controlList.length = 0;
  }

  if (/防御工事/.test(text) && result.some((effect) => effect.type === "incoming-hit-minus")) {
    addControl({ id: "targetInFortificationRange", type: "checkbox", label: "目标满足防御工事交战范围条件" });
    result.forEach((effect) => { effect.selection = { controlId: "targetInFortificationRange", equals: true }; });
  }
  if (/滚滚浓烟/.test(text) && result.some((effect) => effect.type === "incoming-hit-minus")) {
    addControl({ id: "targetWithin6", type: "checkbox", label: "敌方单位位于本模型 6\" 内" });
    result.forEach((effect) => { effect.selection = { controlId: "targetWithin6", equals: true }; });
  }

  if (waagh && !/^Waaagh！?$/.test(text.trim()) && !/军队阵营/.test(text)) {
    const waaghEffects = result.filter((effect) => ["hit-modifier", "wound-modifier", "attack-modifier", "devastating-wounds", "invulnerable-save", "weapon-strength-modifier", "fnp", "lethal-hits", "wound-critical-threshold"].includes(effect.type));
    if (waaghEffects.length && /活跃|启动|有效/.test(text)) {
      addControl({ id: "waaghActive", type: "checkbox", label: "瓦戈！对本军队处于启动状态" });
      waaghEffects.forEach((effect) => { effect.selection = { controlId: "waaghActive", equals: true }; });
    }
  }

  if (hasLeader) {
    result.forEach((effect) => { effect.requiresJoined = true; });
    addControl({ id: "forceLeader", type: "checkbox", label: "数据卡模式下强行视为已领导单位" });
  }

  if (manual && result.length && !controlList.some((control) => control.id === "enabled") && !controlList.some((control) => control.id === "waaghActive")) {
    addControl({ id: "enabled", type: "checkbox", label: "本次启用此技能" });
  }

  // Leader auras are passive once the unit is actually joined. The optional
  // forceLeader checkbox only overrides the joined-unit guard; it must not
  // accidentally turn an always-on aura into an inactive rule.
  if (hasLeader && result.length && !controlList.some((control) => control.id === "enabled")) {
    result.forEach((effect) => { effect.activation = "passive"; });
  }

  return { effects: result, controls: controlList, leader: hasLeader };
}

const normalizedRuleName = (value) => String(value || "").replace(/[\s!！]/g, "");
const ensureControl = (described, control) => {
  if (!described.controls.some((candidate) => candidate.id === control.id)) described.controls.push(control);
};
const replaceEffects = (described, effects) => { described.effects.splice(0, described.effects.length, ...effects); };

function applyVerifiedCorrections(cardName, ruleName, described) {
  const card = normalizedRuleName(cardName);
  const name = normalizedRuleName(ruleName);
  if (name === "更多火力") {
    described.effects.filter((effect) => effect.type === "hit-reroll").forEach((effect) => { effect.mode = "ones"; });
  }
  if (card === normalizedRuleName("喷火小子") && name === "烧光一切") {
    ensureControl(described, { id: "rerollMode", type: "select", label: "目标在 6\" 内；若也在目标标记范围内可选全重掷", options: [["none", "不启用"], ["ones", "重掷致伤 1"], ["failed", "重掷全部失败致伤"]] });
    replaceEffects(described, [
      { type: "wound-reroll", mode: "ones", phase: ranged, selection: { controlId: "rerollMode", equals: "ones" } },
      { type: "wound-reroll", mode: "failed", phase: ranged, selection: { controlId: "rerollMode", equals: "failed" } },
    ]);
  }
  if (card === normalizedRuleName("碎骨者·斯拉卡") && name === "大瓦戈先知") {
    ensureControl(described, { id: "waaghActive", type: "checkbox", label: "瓦戈！对本军队处于启动状态" });
    ensureControl(described, { id: "forceLeader", type: "checkbox", label: "数据卡模式下强行视为已领导单位" });
    replaceEffects(described, [
      { type: "hit-modifier", value: 1, phase: melee, requiresJoined: true, effectScope: "unit", activation: "passive" },
      { type: "wound-modifier", value: 1, phase: melee, requiresJoined: true, effectScope: "unit", activation: "passive" },
      { type: "wound-critical-threshold", value: 5, phase: melee, requiresJoined: true, effectScope: "unit", selection: { controlId: "waaghActive", equals: true } },
    ]);
  }
  if (card === normalizedRuleName("碎骨者·斯拉卡") && name === "葛兹古尔的瓦戈旗帜") {
    ensureControl(described, { id: "waaghActive", type: "checkbox", label: "瓦戈！对本军队处于启动状态" });
    replaceEffects(described, [{ type: "lethal-hits", phase: melee, selection: { controlId: "waaghActive", equals: true } }]);
  }
  if (card === normalizedRuleName("重甲强蛮人") && name === "痛扁时刻") {
    ensureControl(described, { id: "waaghActive", type: "checkbox", label: "瓦戈！对本军队处于启动状态" });
    replaceEffects(described, [{ type: "fnp", threshold: 5, selection: { controlId: "waaghActive", equals: true } }]);
  }
  if (card === normalizedRuleName("技师炮") && name === "啪") {
    ensureControl(described, { id: "targetAtStartingStrength", type: "checkbox", label: "目标仍处于起始兵力且不是凶兽/载具" });
    replaceEffects(described, [{ type: "hit-reroll", mode: "ones", phase: ranged, unlessTargetMonsterVehicle: true, selection: { controlId: "targetAtStartingStrength", equals: true } }]);
  }
  if (card === normalizedRuleName("摩克机甲") && name === "大而善射") {
    ensureControl(described, { id: "waaghActive", type: "checkbox", label: "瓦戈！对本军队处于启动状态" });
    replaceEffects(described, [{ type: "hit-modifier", value: 1, phase: ranged, selection: { controlId: "waaghActive", equals: true } }]);
  }
  if (card === normalizedRuleName("强蛮人") && name === "头目的小子们") {
    ensureControl(described, { id: "forceLeader", type: "checkbox", label: "数据卡模式下视为战斧头正在率领此单位" });
    replaceEffects(described, [{ type: "incoming-wound-when-strength-gt", value: -1, requiresJoined: true, effectScope: "unit", activation: "passive" }]);
  }
  if (card === normalizedRuleName("爆炸喷气战机") && name === "爆射机攻击") {
    ensureControl(described, { id: "targetCanFly", type: "checkbox", label: "目标具有飞行关键词（勾选后本技能不生效）" });
    replaceEffects(described, [{ type: "hit-reroll", mode: "ones", phase: ranged, selection: { controlId: "targetCanFly", equals: false, fallback: false } }]);
  }
  if (card === normalizedRuleName("持瓦！旗帜的头目") && name === "瓦戈旗帜") {
    ensureControl(described, { id: "forceLeader", type: "checkbox", label: "数据卡模式下强行视为已领导单位" });
    replaceEffects(described, [{ type: "hit-modifier", value: 1, phase: melee, requiresJoined: true, effectScope: "unit", activation: "passive" }]);
  }
  if (card === normalizedRuleName("突突大技甲") && name === "达卡闪击") {
    ensureControl(described, { id: "targetMonsterVehicle", type: "checkbox", label: "目标具有凶兽或载具关键词（勾选后本技能不生效）" });
    replaceEffects(described, [{
      type: "weapon-attack-modifier",
      weaponName: "闪击加农炮",
      value: 6,
      phase: ranged,
      unlessTargetMonsterVehicle: true,
    }]);
  }
}

function ruleFor(card, ability, index, duplicateCounts) {
  const text = cleanText(ability.text || ability.text_zh || ability.name || `技能 ${index + 1}`);
  const displayName = cleanText(ability.name || ability.name_zh || `技能 ${index + 1}`);
  const englishBaseRaw = cleanText(ability.englishName || ability.name || displayName);
  const englishBase = slug(englishBaseRaw) ? englishBaseRaw : `Source ability ${index + 1}`;
  const duplicateIndex = (duplicateCounts.get(englishBase) || 0) + 1;
  duplicateCounts.set(englishBase, duplicateIndex);
  const englishName = duplicateIndex > 1 ? `${englishBase} ${duplicateIndex}` : englishBase;
  // The supplement-only hardboyz entries have Chinese-only display names;
  // the structured card id still provides a stable ASCII unit scope.
  const cardIdParts = String(card.id || "").split(".");
  const scopeId = cardIdParts[1] && cardIdParts[1] !== "entry"
    ? cardIdParts[1]
    : `entry-${cardIdParts[2]?.slice(0, 8) || slug(card.englishName || card.unit?.name || card.name)}`;
  const abilityId = slug(englishName);
  // Keep the old ordinal ID as an alias; identity.js will replace it with
  // the stable English-name ID while preserving this source-order legacy ID.
  const legacyId = `orks.${scopeId}.ability-${index + 1}`;
  const described = describeEffects(text, displayName);
  const compiled = compileAbility({ id: ability.id, name: displayName, text, category: ability.category || ability.kind });
  const hadDescribedEffects = described.effects.length > 0;
  for (const effect of compiled.effects) {
    if (!described.effects.some((candidate) => candidate.type === effect.type)) described.effects.push(effect);
  }
  if (!hadDescribedEffects) for (const control of compiled.controls) ensureControl(described, control);
  applyVerifiedCorrections(card.name, displayName, described);
  const effects = described.effects;
  const controlsForRule = described.controls.length ? described.controls : undefined;
  return {
    id: legacyId,
    name: displayName,
    text,
    status: effects.length ? supported : displayOnly,
    ...(controlsForRule ? { controls: controlsForRule } : {}),
    ...(effects.length ? { effects } : {}),
    source: {
      file: "欧克兽人-网站原始数据.json",
      record: card.source?.record || card.id,
      englishName,
      kind: ability.kind || "unique",
    },
  };
}

const unitRules = {};
for (const card of source.cards || []) {
  const duplicateCounts = new Map();
  const isFactionWaaagh = (ability) => cleanText(ability.englishName || "").replaceAll("！", "!").toLowerCase() === "waaagh!";
  const abilities = (card.abilities || []).filter((ability) => !isFactionWaaagh(ability));
  const rules = abilities.map((ability, index) => ruleFor(card, ability, index, duplicateCounts));
  if (!rules.length) {
    const fallbackAbility = {
      name: "咻啊！",
      englishName: `Waaagh reference ${card.source?.record || 1}`,
      text: "此单位的瓦戈！效果由欧克兽人阵营技能统一计算。",
      category: "faction",
    };
    rules.push(ruleFor(card, fallbackAbility, 0, duplicateCounts));
  }
  unitRules[card.name || card.unit?.name] = rules;
}

const factionRules = [{
  id: "orks.army.waagh",
  name: "瓦戈！",
  text: "如果你的军队阵营是欧克兽人，每场战斗一次，在己方指挥阶段开始时可以发起瓦戈！。直到你的下一个指挥阶段开始前，具有此能力的单位即使本回合前进也可宣告冲锋；具有此能力的模型所装备的近战武器力量与攻击特性各 +1；具有此能力的模型获得 5+ 无敌豁免。",
  status: "部分计算支持：勾选后计入近战武器力量 +1、近战攻击次数 +1 和 5+ 无敌豁免；前进后冲锋资格保留原文显示。",
  controls: [{ id: "enabled", type: "checkbox", label: "本次战斗已发起瓦戈！" }],
  effects: [
    { type: "weapon-strength-modifier", value: 1, phase: melee, selection: { controlId: "enabled", equals: true } },
    { type: "attack-modifier", value: 1, phase: melee, selection: { controlId: "enabled", equals: true } },
    { type: "invulnerable-save", value: 5, selection: { controlId: "enabled", equals: true } },
  ],
  source: { url: "https://40k.aiinpocket.com/faction/orks/", file: "欧克兽人-网站原始数据.json" },
}];

const adjudicatedCatalog = adjudicateRuleCatalog({
  ruleCatalog: { factionRules, unitRules },
  factionId: "orks",
  packagePayload,
  ledger: pdfDisplayLedger,
});

const output = `/* Generated from docs/data/欧克兽人/欧克兽人-网站原始数据-简体.json. Regenerate with tools/generate-orks-rules.mjs. */\n(function (root) {\n  const factionRules = ${JSON.stringify(adjudicatedCatalog.factionRules, null, 2)};\n  const unitRules = ${JSON.stringify(adjudicatedCatalog.unitRules, null, 2)};\n  const catalog = { factionRules, unitRules };\n  root.WarhammerOrksRules = root.WarhammerOrksRuleIdentities?.apply(catalog) || catalog;\n})(typeof globalThis === "undefined" ? this : globalThis);\n`;
const outputPath = path.resolve("docs/rules/orks.js");
writeFileSyncWithRetry(outputPath, output);
console.log(`generated ${Object.keys(adjudicatedCatalog.unitRules).length} units and ${Object.values(adjudicatedCatalog.unitRules).reduce((sum, rules) => sum + rules.length, 0)} rules -> ${outputPath}`);
