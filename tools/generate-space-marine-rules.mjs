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
  "传奇英雄人物", "其他步兵", "军表构成", "3",
  "骑乘", "终结者", "机甲", "载具", "运输载具", "飞行载具", "工事",
]);
const cards = (source.cards || []).filter((card) => card.unit?.name && !categoryNames.has(card.name) && !String(card.name || "").startsWith("⚫"));
const supported = "计算支持（满足条件时自动结算）";
const displayOnly = "已显示，暂不改变本次骰子";
const cleanAbilityText = (value) => String(value || "")
  .replace(/^\s*】\s*[：:]\s*/, "")
  .replace(/\s+\d+\s+\d+\s*$/, "")
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
  const leader = /本模型所领导|所领导的单位|领导本单位/.test(text);
  const add = (effect) => result.push(/近战阶段/.test(text) ? { ...effect, phase: "melee" } : /射击阶段/.test(text) ? { ...effect, phase: "ranged" } : effect);
  const addPhaseSafe = (effect) => {
    if (/^incoming-/.test(effect.type)) { result.push(effect); return; }
    add(effect);
  };
  // 冷酷演算: mutually exclusive target split (monster/vehicle -> lethal,
  // anything else -> sustained), never both at once.
  if (/以巨兽或载具为目标[^。\n]{0,60}【致命一击】[^。\n]{0,60}以非\s*巨兽载具单位为目标[^。\n]{0,60}【连击1】/.test(text)) {
    return { effects: [
      { type: "lethal-hits", requiresTargetMonsterVehicle: true },
      { type: "sustained-hits", value: 1, unlessTargetMonsterVehicle: true },
    ], leader: false };
  }
  const mortalFnp = text.match(/遭受致命伤害攻击\s*时拥有【不\s*知\s*疼\s*痛\s*([3456])\s*\+】/);
  if (mortalFnp) {
    add({ type: "fnp-mortal", threshold: Number(mortalFnp[1]) });
  } else if (/不(?:知|觉)\s*疼\s*痛\s*[3456]\s*\+/.test(text)) {
    const threshold = Number(text.match(/不(?:知|觉)\s*疼\s*痛\s*([3456])\s*\+/)?.[1]);
    if (threshold) add({ type: "fnp", threshold });
  }
  const fixedSingleDie = /一颗|一枚/.test(text);
  const rerollTarget = (kind) => new RegExp(`重投[^。\\n]{0,80}${kind}(?:\\s*结果|骰|投掷)?[,，和]?|${kind}(?:\\s*结果|骰|投掷)[^。\\n]{0,80}重投`);
  if (!fixedSingleDie && rerollTarget("命中").test(text)) {
    add({ type: "space-hit-reroll", mode: /重投[^。\n]{0,30}(?:为|是)?\s*1|命中(?:结果)?(?:中)?的?\s*1/.test(text) ? "ones" : "failed" });
  }
  if (!fixedSingleDie && rerollTarget("造伤").test(text)) {
    add({ type: "space-wound-reroll", mode: /重投[^。\n]{0,30}(?:为|是)?\s*1/.test(text) ? "ones" : "failed" });
  }
  if (/攻击【低于半数】的目标时，命中\s*结?\s*果\+1/.test(text)) {
    add({ type: "hit-modifier", value: 1, condition: "targetBelowHalf" });
  } else if (/攻击你的【破敌重誓】目标时命中\s*结?\s*果\+1/.test(text)) {
    add({ type: "oath-target-hit-modifier", value: 1 });
  } else if (/命中\s*结?\s*果[^。\n]{0,50}[+＋]\s*1/.test(text)) {
    add({ type: "hit-modifier", value: 1, ...(text.includes("低于起始强度") || text.replace(/\s+/g, "").includes("低于起始模型数量") ? { condition: "underStartingStrength" } : {}) });
  }
  if (/造伤\s*结?\s*果[^。\n]{0,50}[+＋]\s*1/.test(text)) add({ type: "wound-modifier", value: 1, ...(text.includes("低于半数") ? { condition: "belowHalfStrength" } : {}) });
  if (/造伤\s*结?\s*果[^。\n]{0,50}(?:-|减)\s*1/.test(text)) {
    add(/大于等于|大于或等于/.test(text) ? { type: "incoming-wound-when-strength-gte", value: 1 } : { type: "incoming-wound-minus", value: 1 });
  }
  if (/攻击破坏力[^。\n]{0,20}减半/.test(text)) add({ type: "damage-halving" });
  if (/连\s*击\s*\d+/.test(text)) add({ type: "sustained-hits", value: Number(text.match(/连\s*击\s*(\d+)/)?.[1] || 1) });
  if (/致\s*命一击|致\s*命命中/.test(text)) add({ type: "lethal-hits" });
  if (/毁灭伤害|毁灭性伤口/.test(text)) add({ type: "devastating-wounds" });
  const attackBonus = text.match(/(?:武器|本单位|本模型所领导的单位)[^。\n]{0,50}A\s*[+＋]\s*(\d+)/);
  if (attackBonus) add({ type: "attack-modifier", value: Number(attackBonus[1]) });
  if (/近战武器\s*S\s*[+＋]\s*1/.test(text)) add({ type: "weapon-strength-modifier", value: 1 });
  if (/近战武器的S\s*和\s*A\s*都\+1/.test(text)) {
    add({ type: "attack-modifier", value: 1 });
    add({ type: "weapon-strength-modifier", value: 1 });
  }
  const damaged = text.match(/W值为1-([45])[^。\n]{0,20}攻击命中结果\s*(?:-|减)\s*1/);
  if (damaged) add({ type: "damaged-hit-minus", threshold: Number(damaged[1]) });
  else if (/攻击[^。\n]{0,40}命中\s*结?\s*果\s*(?:-|减)\s*1/.test(text)) addPhaseSafe({ type: "incoming-hit-minus", value: 1 });
  const invulnerable = text.match(/([23456])\s*\+\s*特殊保护/);
  if (invulnerable) add({ type: "invulnerable-save", value: Number(invulnerable[1]) });
  if (/攻城指挥官|攻击巨兽[，,、 ]*载具[，,、 ]*工事单位时[\s\S]*S[，, ]*AP[，, ]*D[都均]?增强\s*2/.test(text)) {
    add({ type: "siege-commander", requiresTargetMonsterVehicle: true });
  }
  if (/(?:本)?分配给本模型的[^。\n]{0,25}破坏力(?:降低|-)\s*1/.test(text)) add({ type: "damage-minus" });
  if (/重投(?:命中，造伤，和)?破坏力|重掷破坏力/.test(text)) add({ type: "damage-reroll" });
  if (/对抗破坏力（D）为1的攻击时，护甲保护投掷\s*结?\s*果\+1/.test(text)) add({ type: "save-bonus-vs-d1" });
  if (/射击步兵单位时AP增强1点/.test(text)) add({ type: "ap-vs-infantry", value: 1, requiresTargetInfantry: true });
  if (/AP值增强1点/.test(text)) add({ type: "weapon-ap-modifier", value: 1 });
  const targetMonsterVehicle = /射击目标是巨兽或载具|以巨兽或载具为目标|被分配给巨兽或载具单位/.test(text);
  if (targetMonsterVehicle) {
    for (let index = 0; index < result.length; index += 1) result[index] = { ...result[index], requiresTargetMonsterVehicle: true };
  }
  return { effects: result, leader };
}

function toRule(card, text, index) {
  const clean = cleanAbilityText(text);
  const factionOnly = clean.replace(/^[】】\]\s：:]+/, "").trim();
  if (!clean || /^【?阵营技能】?\s*[：:]?\s*破敌重誓\s*$/.test(clean) || factionOnly === "破敌重誓") return null;
  const { effects, leader } = effectDescriptors(clean);
  // These abilities choose a different friendly unit/model. The calculator
  // currently resolves only the selected unit (and its joined leader), so
  // exposing a checkbox here would falsely apply the buff to the wrong unit.
  const unsupportedExternalTarget = [
    "铸造之主", "机神祝福", "铸造之父", "多重光谱阵列", "雷霆轰炸", "冰雹轰炸",
  ].some((name) => clean.includes(name));
  const supportedEffects = unsupportedExternalTarget ? [] : effects;
  const declaredEffects = leader ? supportedEffects.map((effect) => ({ ...effect, requiresJoined: true })) : supportedEffects;
  // A model that "has" a passive invulnerable save does not need an
  // activation checkbox.  Keep controls for temporary/conditional saves
  // such as "can gain" or "once per battle" abilities.
  const passiveInvulnerableSave = declaredEffects.length > 0
    && declaredEffects.every((effect) => effect.type === "invulnerable-save")
    && /拥\s*有/.test(clean)
    && !/一次性|可以|获得|本阶段|持续/.test(clean);
  const passiveFeelNoPain = declaredEffects.length > 0
    && declaredEffects.every((effect) => effect.type === "fnp")
    && /领袖，不(?:知|觉)疼痛/.test(clean.replace(/\s+/g, ""))
    && !/一次性|可以获得|获得|阶段/.test(clean);
  const passiveDamageHalving = declaredEffects.length > 0
    && declaredEffects.every((effect) => effect.type === "damage-halving")
    && /被分配给本模型/.test(clean)
    && !/一次性|可以|获得|阶段/.test(clean);
  const targetKeywordControls = [
    ...(declaredEffects.some((effect) => effect.requiresTargetMonsterVehicle)
      ? [{ id: "targetMonsterVehicle", type: "checkbox", label: "目标为巨兽、载具或工事" }]
      : []),
    ...(declaredEffects.some((effect) => effect.requiresTargetInfantry)
      ? [{ id: "targetInfantry", type: "checkbox", label: "目标是步兵单位" }]
      : []),
    ...(declaredEffects.some((effect) => effect.condition === "targetBelowHalf")
      ? [{ id: "targetBelowHalf", type: "checkbox", label: "目标低于半数" }]
      : []),
  ];
  const strengthConditionControls = [
    ...(declaredEffects.some((effect) => effect.condition === "underStartingStrength")
      ? [{ id: "underStartingStrength", type: "checkbox", label: "本单位低于起始模型数量（命中 +1）" }]
      : []),
    ...(declaredEffects.some((effect) => effect.condition === "belowHalfStrength")
      ? [{ id: "belowHalfStrength", type: "checkbox", label: "本单位低于半数（造伤 +1）" }]
      : []),
  ];
  const id = `space-marines-p${card.page}-${index}`;
  return {
    id,
    name: nameFromText(clean, index),
    text: clean,
    status: supportedEffects.length ? supported : displayOnly,
    ...(declaredEffects.length ? { ...((passiveInvulnerableSave || passiveFeelNoPain || passiveDamageHalving) ? {} : { controls: targetKeywordControls.length ? targetKeywordControls : [...controls(leader), ...strengthConditionControls] }), effects: declaredEffects } : {}),
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
