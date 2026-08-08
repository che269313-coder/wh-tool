import fs from "node:fs";
import path from "node:path";

const sourcePath = path.resolve("docs/data/死亡守卫/死亡守卫-全部数据卡.json");
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const bullet = "⚫";
const supported = "计算支持（满足条件时自动计入）";
const displayOnly = "已显示，暂不改变本次骰子";

const controls = (leader = false) => [
  { id: "enabled", type: "checkbox", label: "本次启用此技能" },
  ...(leader ? [{ id: "forceLeader", type: "checkbox", label: "数据卡模式下强行视为已领导单位" }] : []),
];

const targetControls = [
  { id: "enabled", type: "checkbox", label: "本次启用此技能" },
  { id: "targetInfected", type: "checkbox", label: "目标已感染" },
];

const monsterVehicleControls = [
  { id: "enabled", type: "checkbox", label: "本次启用此技能" },
];

function abilityName(text, index) {
  const clean = String(text).replace(/^\s*[▪·•-]?\s*/, "").trim();
  const match = clean.match(/^([^：:，,。！？!？]{1,32})[：:]/);
  return (match?.[1] || (index === 0 ? "核心技能" : `技能${index + 1}`)).trim();
}

function phaseFor(text) {
  if (/近战阶段|近战攻击|近战武器|近战装备/.test(text)) return "melee";
  if (/射击阶段|远程攻击/.test(text)) return "ranged";
  return undefined;
}

function effectDescriptors(text) {
  const effects = [];
  const customControls = [];
  const leader = /本模型领导单位|此模型领导单位|该模型领导单位|本模型领导的单位|此模型领导的单位|该模型领导的单位|有角色领导此单位|此模型所领导/.test(text);
  const add = (effect) => effects.push({ ...effect, ...(phaseFor(text) ? { phase: phaseFor(text) } : {}) });
  const fnp = text.match(/不(?:知|觉)\s*疼\s*痛\s*([3456])\s*\+/);
  const leaderFnp = text.match(/有角色领导此单位时[^。]{0,30}该角色[^。]{0,20}不知疼\s*痛\s*([3456])\s*\+/);
  if (fnp && !leaderFnp) add({ type: "fnp", threshold: Number(fnp[1]) });
  if (leaderFnp) add({ type: "leader-fnp", threshold: Number(leaderFnp[1]) });
  const hitRerollText = /命中(?:结?\s*果|骰|投掷).*(?:重掷|重投)|(?:重掷|重投).*命中(?:结?\s*果|骰|投掷)?[,，和]?/;
  const woundRerollText = /造伤(?:结?\s*果|骰|投掷).*(?:重掷|重投)|(?:重掷|重投).*造伤(?:结?\s*果|骰|投掷)?[,，和]?/;
  if (hitRerollText.test(text)) add({ type: "space-hit-reroll", mode: /(?:重掷|重投)\s*命中(?:结?\s*果)?\s*[1一]|命中(?:结?\s*果)?(?:中)?的?\s*[1一]/.test(text) ? "ones" : "failed" });
  if (woundRerollText.test(text)) add({ type: "space-wound-reroll", mode: /(?:重掷|重投)\s*造伤(?:结?\s*果)?\s*[1一]/.test(text) ? "ones" : "failed" });
  const damaged = text.match(/(?:W\s*剩余|剩余)\s*1\s*-\s*([4-7])(?:\s*点耐伤)?[^。]{0,120}命\s*中(?:掷骰)?(?:结?\s*果)?\s*(?:-|减)\s*1/);
  const meleeHitMinus = /近战攻击命中(?:投掷)?结?\s*果\s*(?:-|减)\s*1/.test(text);
  const infectedWoundBonus = /攻击受【感染】的敌方单位\s*时，造伤\s*结?\s*果[+＋]\s*1/.test(text);
  const hitBonus = text.match(/命中(?:\s*与\s*造伤骰)?(?:\s*结?\s*果)?\s*([+＋-])\s*1/);
  if (hitBonus && !damaged && !meleeHitMinus) add({ type: "hit-modifier", value: hitBonus[1] === "-" ? -1 : 1 });
  const woundBonus = text.match(/造伤(?:结?\s*果)?\s*([+＋-])\s*1/);
  if (woundBonus && !infectedWoundBonus) add({ type: "wound-modifier", value: woundBonus[1] === "-" ? -1 : 1 });
  if (infectedWoundBonus) {
    effects.push({ type: "wound-modifier", value: 1, requiresTargetInfected: true });
    customControls.push(...targetControls);
  }
  if (/命\s*中\s*与\s*造伤骰\s*结果\s*各\s*[+＋]\s*1/.test(text)) {
    effects.push({ type: "hit-modifier", value: 1, requiresTargetMonsterVehicle: true });
    effects.push({ type: "wound-modifier", value: 1, requiresTargetMonsterVehicle: true });
    customControls.push(...monsterVehicleControls);
  }
  if (/力\s*量\s*S\s*与\s*穿甲值\s*AP\s*各\s*[+＋]\s*1/.test(text)) {
    effects.push({ type: "weapon-strength-modifier", value: 1, condition: "large-or-led", requiresTargetInfected: true });
    effects.push({ type: "weapon-ap-modifier", value: 1, condition: "large-or-led", requiresTargetInfected: true });
    customControls.push(...targetControls);
  }
  if (/传染馈赠/.test(text) && /连\s*击\s*1/.test(text)) {
    effects.push({ type: "sustained-hits", value: 1, requiresTargetInfected: true });
    customControls.push(...targetControls);
  } else if (/连\s*击\s*(\d+)/.test(text)) {
    add({ type: "sustained-hits", value: Number(text.match(/连\s*击\s*(\d+)/)?.[1] || 1) });
  }
  if (/【骑枪】/.test(text)) add({ type: "weapon-strength-modifier", value: 1 });
  if (/致命一击|致命命中/.test(text)) add({ type: "lethal-hits" });
  if (/毁灭伤害|毁灭性伤口/.test(text)) add({ type: "devastating-wounds" });
  const attackBonus = text.match(/攻击次数\s*A\s*([+＋-])\s*(\d+)|\bA\s*([+＋-])\s*(\d+)/);
  if (attackBonus) {
    const sign = attackBonus[1] || attackBonus[3];
    const amount = Number(attackBonus[2] || attackBonus[4]);
    add({ type: "attack-modifier", value: sign === "-" ? -amount : amount });
  }
  if (damaged) add({ type: "damaged-hit-minus", threshold: Number(damaged[1]) });
  else if (meleeHitMinus) add({ type: "incoming-melee-hit-minus", value: -1 });
  else if (/攻击命\s*中结?\s*果\s*-\s*1|攻击.*命\s*中结?\s*果\s*-\s*1/.test(text)) add({ type: "incoming-hit-minus", value: 1 });
  const invulnerable = text.match(/([23456])\s*\+\s*特殊保护/);
  if (invulnerable) add({ type: "invulnerable-save", value: Number(invulnerable[1]) });
  if (/未修正\s*的命中骰\s*5\+即为暴击命中/.test(text)) add({ type: "hit-critical-threshold", value: 5 });
  if (/命中5\+触发暴击.{0,100}低于其一半的初始数量.{0,30}4\+/.test(text)) {
    effects.push({ type: "hit-critical-threshold", value: 5, belowHalfValue: 4, condition: "targetBelowHalf" });
    customControls.push({ id: "targetBelowHalf", type: "checkbox", label: "目标低于其一半的初始数量" });
  }
  if (/无视对攻击的命中骰与武器技能BS\/WS\s*的\s*修正|无视命中修正/.test(text)) add({ type: "ignore-hit-modifiers" });
  if (/穿甲值AP\+1|穿透值AP\+1|AP增强1点/.test(text)) add({ type: "weapon-ap-modifier", value: 1 });
  if (/韧性值T-1/.test(text)) add({ type: "target-toughness-modifier", value: -1 });
  if (/伤害值D\+1/.test(text)) add({ type: "damage-modifier", value: 1 });
  return { effects, leader, controls: [...new Map(customControls.map((control) => [control.id, control])).values()] };
}

function toRule(card, segment, index) {
  const text = String(segment).replace(/\s+/g, " ").trim();
  if (!text) return null;
  const { effects, leader, controls: customControls } = effectDescriptors(text);
  const joinRequired = leader && !/初始数量不低于5[^。]*或\s*有角色领导此单位/.test(text);
  const declared = joinRequired ? effects.map((effect) => ({ ...effect, requiresJoined: true })) : effects;
  const manual = /每个回合一次|每场战斗一次|可以选择|可重投|使用此能力|选择一个/.test(text);
  const ruleControls = customControls.length ? [...customControls, ...(leader ? controls(true).slice(1) : [])] : (leader || manual ? controls(leader) : []);
  return {
    id: `death-guard-p${card.page}-${index}`,
    name: abilityName(text, index),
    text,
    status: effects.length ? supported : displayOnly,
    ...(declared.length ? { ...(ruleControls.length ? { controls: ruleControls } : {}), effects: declared } : {}),
    source: { page: card.page, source: card.source },
  };
}

const unitRules = {};
for (const card of source.cards || []) {
  const abilityText = String(card.unit?.abilities || "").trim();
  const segments = abilityText.split(bullet).map((segment) => segment.trim()).filter((segment) => segment && !/^纳垢赐福（光环）/.test(segment));
  unitRules[card.unit.name] = segments.map((segment, index) => toRule(card, segment, index)).filter(Boolean);
}

const factionRules = [{
  id: "death-guard-nurgles-gift",
  name: "纳垢赐福",
  text: "纳垢赐福（光环）：当敌方单位处于感染范围内时，该敌方单位模型的韧性值T-1；该单位额外受到以下一种瘟疫的影响（三选一）：头骨痉挛：模型进行近战攻击时命中结果-1；颤骨瘟疫：模型的保护值SV-1；烂魂伤风：模型的移动、领导和目标控制属性各-1。",
  status: "计算支持（T-1与头骨痉挛/颤骨瘟疫会计入伤害计算；烂魂伤风仅显示）",
  controls: [
    { id: "enabled", type: "checkbox", label: "目标受到纳垢赐福（感染范围内）" },
    { id: "plague", type: "select", label: "额外瘟疫（三选一）", options: [["none", "不选择"], ["skullsquirm", "头骨痉挛：近战命中 -1"], ["rattlejoint", "颤骨瘟疫：保护值 SV -1"], ["scabrous", "烂魂伤风：移动/领导/OC -1"]] },
  ],
  effects: [
    { type: "target-toughness-modifier", value: -1 },
    { type: "target-melee-hit-minus", value: -1, requiresPlague: "skullsquirm" },
    { type: "target-save-modifier", value: 1, requiresPlague: "rattlejoint" },
  ],
  source: { file: "死亡守卫-分遣队规则-可检索.md" },
}];

const output = `/* Generated from docs/data/死亡守卫/死亡守卫-全部数据卡.json. Raw ability text is preserved; rerun tools/generate-death-guard-rules.mjs after data changes. */\n(function (root) {\n  const factionRules = ${JSON.stringify(factionRules, null, 2)};\n  const unitRules = ${JSON.stringify(unitRules, null, 2)};\n  root.WarhammerDeathGuardRules = { factionRules, unitRules };\n})(typeof globalThis === "undefined" ? this : globalThis);\n`;
fs.writeFileSync(path.resolve("docs/rules/death-guard.js"), output, "utf8");
console.log(`generated ${Object.keys(unitRules).length} units and ${Object.values(unitRules).reduce((sum, rules) => sum + rules.length, 0)} rules -> docs/rules/death-guard.js`);
