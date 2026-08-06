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

function abilityName(text, index) {
  const clean = String(text).replace(/^\s*[▪·•-]?\s*/, "").trim();
  const match = clean.match(/^([^：:，,。！？!？]{1,32})[：:]/);
  return (match?.[1] || (index === 0 ? "核心技能" : `技能${index + 1}`)).trim();
}

function phaseFor(text) {
  if (/近战阶段|近战攻击/.test(text)) return "melee";
  if (/射击阶段|远程攻击/.test(text)) return "ranged";
  return undefined;
}

function effectDescriptors(text) {
  const effects = [];
  const leader = /本模型领导单位|此模型领导单位|该模型领导单位|本模型领导的单位|此模型领导的单位|该模型领导的单位|有角色领导此单位|此模型所领导/.test(text);
  const add = (effect) => effects.push({ ...effect, ...(phaseFor(text) ? { phase: phaseFor(text) } : {}) });
  const fnp = text.match(/不知疼痛\s*([3456])\s*\+/);
  if (fnp) add({ type: "fnp", threshold: Number(fnp[1]) });
  if (/命中.*重掷|命中.*重投|重掷.*命中|重投.*命中/.test(text)) add({ type: "space-hit-reroll", mode: /命中1|命中结果为1|重掷命中1/.test(text) ? "ones" : "failed" });
  if (/造伤.*重掷|造伤.*重投|重掷.*造伤|重投.*造伤/.test(text)) add({ type: "space-wound-reroll", mode: /造伤1|造伤结果为1/.test(text) ? "ones" : "failed" });
  const damaged = text.match(/W剩余\s*1-([45])[^。]{0,30}命中结果\s*-\s*1/);
  const hitBonus = text.match(/命中(?:结果)?\s*([+＋-])\s*1/);
  if (hitBonus && !damaged) add({ type: "hit-modifier", value: hitBonus[1] === "-" ? -1 : 1 });
  const woundBonus = text.match(/造伤(?:结果)?\s*([+＋-])\s*1/);
  if (woundBonus) add({ type: "wound-modifier", value: woundBonus[1] === "-" ? -1 : 1 });
  if (/连击\s*(\d+)/.test(text)) add({ type: "sustained-hits", value: Number(text.match(/连击\s*(\d+)/)?.[1] || 1) });
  if (/致命一击|致命命中/.test(text)) add({ type: "lethal-hits" });
  if (/毁灭伤害|毁灭性伤口/.test(text)) add({ type: "devastating-wounds" });
  const attackBonus = text.match(/攻击次数\s*A\s*([+＋-])\s*(\d+)|\bA\s*([+＋-])\s*(\d+)/);
  if (attackBonus) {
    const sign = attackBonus[1] || attackBonus[3];
    const amount = Number(attackBonus[2] || attackBonus[4]);
    add({ type: "attack-modifier", value: sign === "-" ? -amount : amount });
  }
  if (damaged) add({ type: "damaged-hit-minus", threshold: Number(damaged[1]) });
  else if (/攻击命中结果\s*-\s*1|攻击.*命中结果\s*-\s*1/.test(text)) add({ type: "incoming-hit-minus", value: 1 });
  const invulnerable = text.match(/([23456])\s*\+\s*特殊保护/);
  if (invulnerable) add({ type: "invulnerable-save", value: Number(invulnerable[1]) });
  return { effects, leader };
}

function toRule(card, segment, index) {
  const text = String(segment).replace(/\s+/g, " ").trim();
  if (!text) return null;
  const { effects, leader } = effectDescriptors(text);
  const declared = leader ? effects.map((effect) => ({ ...effect, requiresJoined: true })) : effects;
  return {
    id: `death-guard-p${card.page}-${index}`,
    name: abilityName(text, index),
    text,
    status: effects.length ? supported : displayOnly,
    ...(declared.length ? { controls: controls(leader), effects: declared } : {}),
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
  text: "纳垢赐福（光环）：当敌方单位处于感染范围内时，该敌方单位模型的韧性值T-1。计算器中请在确认目标已被感染且位于范围内时启用此选项。",
  status: "计算支持（按目标已感染且在范围内时启用）",
  controls: [{ id: "enabled", type: "checkbox", label: "目标受到纳垢赐福（T-1）" }],
  effects: [{ type: "target-toughness-modifier", value: -1 }],
  source: { file: "死亡守卫-分遣队规则-可检索.md" },
}];

const output = `/* Generated from docs/data/死亡守卫/死亡守卫-全部数据卡.json. Raw ability text is preserved; rerun tools/generate-death-guard-rules.mjs after data changes. */\n(function (root) {\n  const factionRules = ${JSON.stringify(factionRules, null, 2)};\n  const unitRules = ${JSON.stringify(unitRules, null, 2)};\n  root.WarhammerDeathGuardRules = { factionRules, unitRules };\n})(typeof globalThis === "undefined" ? this : globalThis);\n`;
fs.writeFileSync(path.resolve("docs/rules/death-guard.js"), output, "utf8");
console.log(`generated ${Object.keys(unitRules).length} units and ${Object.values(unitRules).reduce((sum, rules) => sum + rules.length, 0)} rules -> docs/rules/death-guard.js`);
