import fs from "node:fs";
import path from "node:path";

const dataRoot = path.resolve("docs/data");
const factionDir = fs.readdirSync(dataRoot).find((name) => {
  const full = path.join(dataRoot, name);
  return fs.statSync(full).isDirectory() && fs.readdirSync(full).some((file) => file.endsWith("全部数据卡.json"));
});
if (!factionDir) throw new Error("未找到星际战士数据卡目录");
const jsonFile = fs.readdirSync(path.join(dataRoot, factionDir)).find((file) => file.endsWith("全部数据卡.json"));
const sourcePath = path.join(dataRoot, factionDir, jsonFile);
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const bullet = String.fromCodePoint(0x26ab);
const markdownFile = fs.readdirSync(path.join(dataRoot, factionDir)).find((file) => file.endsWith(".md") && fs.readFileSync(path.join(dataRoot, factionDir, file), "utf8").includes("| 技"));
const markdown = markdownFile ? fs.readFileSync(path.join(dataRoot, factionDir, markdownFile), "utf8") : "";
const markdownAbilitiesByPage = new Map();
for (const match of markdown.matchAll(/##[^\n]*?第\s*(\d+)\s*页[\s\S]*?(?=\r?\n## |$)/g)) {
  const row = match[0].split(/\r?\n/).find((line) => /\|\s*技(?:<br>)?能\s*\|/.test(line) && line.includes(bullet));
  if (!row) continue;
  const remainder = row.replace(/^\|\s*技(?:<br>)?能\s*\|\s*/, "").replace(/^\s*\|\s*/, "");
  const content = remainder.slice(0, remainder.indexOf(" |") >= 0 ? remainder.indexOf(" |") : remainder.length).replaceAll("<br>", " ").replace(/\s+/g, " ").trim();
  if (content) markdownAbilitiesByPage.set(Number(match[1]), content);
}
const categoryNames = new Set([
  "传奇英雄人物", "战术小队", "其他步兵", "军表构成", "3",
  "骑乘", "终结者", "机甲", "载具", "运输载具", "飞行载具", "工事",
]);
const cards = (source.cards || []).filter((card) => card.unit?.name && !categoryNames.has(card.name) && !String(card.name || "").startsWith("⚫"));
const supported = "计算支持（满足条件时自动结算）";
const displayOnly = "已显示，暂不改变本次骰子";
const cleanAbilityText = (value) => String(value || "")
  .replace(/^\s*】\s*[：:]\s*/, "")
  .replace(/\s+/g, " ")
  .trim();
const controls = (leader = false) => [
  { id: "enabled", type: "checkbox", label: "本次启用此技能" },
  ...(leader ? [{ id: "forceLeader", type: "checkbox", label: "数据卡模式下强行视为已领导单位" }] : []),
];
const nameFromText = (text, index) => {
  const normalized = String(text).replace(/^[】】\]\s：:]+/, "").trim();
  const match = normalized.match(/^([^：:。\n]{1,32})[：:]/);
  return (match?.[1] || (index === 0 ? "核心特性" : `技能 ${index + 1}`)).trim();
};

function effectDescriptors(text) {
  const result = [];
  const leader = /本模型所领导|所领导的单位|本模型所在单位|领导本单位/.test(text);
  const add = (effect) => result.push(/近战阶段/.test(text) ? { ...effect, phase: "melee" } : /射击阶段/.test(text) ? { ...effect, phase: "ranged" } : effect);
  if (/不知疼痛\s*[3456]\s*\+/.test(text)) {
    const threshold = Number(text.match(/不知疼痛\s*([3456])\s*\+/)?.[1]);
    if (threshold) add({ type: "fnp", threshold });
  }
  const fixedSingleDie = /一颗|一枚/.test(text);
  if (!fixedSingleDie && /重投[^。\n]{0,80}命中|命中[^。\n]{0,80}重投/.test(text)) {
    add({ type: "space-hit-reroll", mode: /重投[^。\n]{0,30}(?:为|是)?\s*1|命中结果中(?:的)?\s*1/.test(text) ? "ones" : "failed" });
  }
  if (!fixedSingleDie && /重投[^。\n]{0,80}造伤|造伤[^。\n]{0,80}重投/.test(text)) {
    add({ type: "space-wound-reroll", mode: /重投[^。\n]{0,30}(?:为|是)?\s*1/.test(text) ? "ones" : "failed" });
  }
  if (/命中结果[^。\n]{0,50}[+＋]\s*1/.test(text)) add({ type: "hit-modifier", value: 1, ...(text.includes("低于起始强度") ? { condition: "underStartingStrength" } : {}) });
  if (/造伤结果[^。\n]{0,50}[+＋]\s*1/.test(text)) add({ type: "wound-modifier", value: 1, ...(text.includes("低于半数") ? { condition: "belowHalfStrength" } : {}) });
  if (/造伤结果[^。\n]{0,50}-\s*1/.test(text)) {
    add(/大于等于|大于或等于/.test(text) ? { type: "incoming-wound-when-strength-gte", value: 1 } : { type: "incoming-wound-minus", value: 1 });
  }
  if (/连击\s*\d+/.test(text)) add({ type: "sustained-hits", value: Number(text.match(/连击\s*(\d+)/)?.[1] || 1) });
  if (/致命一击|致命命中/.test(text)) add({ type: "lethal-hits" });
  if (/毁灭伤害|毁灭性伤口/.test(text)) add({ type: "devastating-wounds" });
  const attackBonus = text.match(/(?:武器|本单位|本模型所领导的单位)[^。\n]{0,50}A\s*[+＋]\s*(\d+)/);
  if (attackBonus) add({ type: "attack-modifier", value: Number(attackBonus[1]) });
  const damaged = text.match(/W值为1-([45])[^。\n]{0,20}攻击命中结果\s*-\s*1/);
  if (damaged) add({ type: "damaged-hit-minus", threshold: Number(damaged[1]) });
  else if (/攻击[^。\n]{0,40}命中结果\s*-\s*1/.test(text)) add({ type: "incoming-hit-minus", value: 1 });
  const invulnerable = text.match(/([23456])\s*\+\s*特殊保护/);
  if (invulnerable) add({ type: "invulnerable-save", value: Number(invulnerable[1]) });
  return { effects: result, leader };
}

function toRule(card, text, index) {
  const clean = cleanAbilityText(text);
  const factionOnly = clean.replace(/^[】】\]\s：:]+/, "").trim();
  if (!clean || /^【?阵营技能】?\s*[：:]?\s*破敌重誓\s*$/.test(clean) || factionOnly === "破敌重誓") return null;
  const { effects, leader } = effectDescriptors(clean);
  const declaredEffects = leader ? effects.map((effect) => ({ ...effect, requiresJoined: true })) : effects;
  const id = `space-marines-p${card.page}-${index}`;
  return {
    id,
    name: nameFromText(clean, index),
    text: clean,
    status: effects.length ? supported : displayOnly,
    ...(declaredEffects.length ? { controls: controls(leader), effects: declaredEffects } : {}),
    source: { page: card.page, source: card.source },
  };
}

const unitRules = {};
for (const card of cards) {
  const abilityText = cleanAbilityText(String(card.unit.abilities || "").trim() || markdownAbilitiesByPage.get(Number(card.page)) || "");
  if (!String(card.unit.abilities || "").trim() && abilityText && process.argv.includes("--write-source")) card.unit.abilities = abilityText;
  const segments = abilityText.split(bullet).map((segment) => segment.trim()).filter(Boolean);
  unitRules[card.unit.name] = segments.map((segment, index) => toRule(card, segment, index)).filter(Boolean);
}
if (process.argv.includes("--write-source")) fs.writeFileSync(sourcePath, `${JSON.stringify(source, null, 2)}\n`, "utf8");

const oathText = "破敌重誓：如果你的军队阵营是阿斯塔特修会，则在你的指挥阶段开始时，从对手的军队中选择一个单位，直到你的下个指挥阶段开始时为止，你的军队中拥有本能力的模型攻击那个敌方单位时可以重投命中结果。并且如果你使用的是本文中的分队，军队中的任意单位都不包含圣血天使，黑暗天使，死亡守望，太空野狼关键词之一，则对那个敌方单位的攻击造伤结果也+1";
const output = `/* Generated from ${path.relative(process.cwd(), sourcePath).replaceAll("\\", "/")}. Raw ability text is preserved; update the source JSON and rerun tools/generate-space-marine-rules.mjs. */\n(function (root) {\n  const factionRules = ${JSON.stringify([{ id: "space-marines-oath-of-moment", name: "破敌重誓", text: oathText, status: "计算支持（命中重投和造伤加成由专用控件处理）", uiControl: "oath-wound-bonus", source: { file: "分遣队规则-可检索.md" } }], null, 2)};\n  const unitRules = ${JSON.stringify(unitRules, null, 2)};\n  root.WarhammerSpaceMarineRules = { factionRules, unitRules };\n})(typeof globalThis === "undefined" ? this : globalThis);\n`;
const outputPath = path.resolve("docs/rules/space-marines.js");
fs.writeFileSync(outputPath, output, "utf8");
console.log(`generated ${Object.keys(unitRules).length} units and ${Object.values(unitRules).reduce((sum, rules) => sum + rules.length, 0)} rules -> ${outputPath}`);
