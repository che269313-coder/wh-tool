import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const context = vm.createContext({});
context.globalThis = context;
for (const file of ["custodes.js", "space-marines.js", "effects.js", "resolver.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, "docs", "rules", file), "utf8"), context, { filename: file });
}

const resolve = context.WarhammerRuleResolver.resolveUnit;
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const dataRoot = path.join(root, "docs", "data");
const spaceMarineDir = fs.readdirSync(dataRoot).find((name) => {
  const full = path.join(dataRoot, name);
  return fs.statSync(full).isDirectory() && fs.readdirSync(full).some((file) => file.endsWith("全部数据卡.json"));
});
const spaceMarineFile = fs.readdirSync(path.join(dataRoot, spaceMarineDir)).find((file) => file.endsWith("全部数据卡.json"));
const spaceMarineData = JSON.parse(fs.readFileSync(path.join(dataRoot, spaceMarineDir, spaceMarineFile), "utf8"));
const categoryNames = new Set(["传奇英雄人物", "通用人物", "战术小队", "其他步兵", "军表构成", "3", "骑乘", "终结者", "机甲", "载具", "运输载具", "飞行载具", "工事"]);
const structuredSpaceMarineCards = (spaceMarineData.cards || []).filter((card) => card.unit?.name && !categoryNames.has(card.name) && !String(card.name || "").startsWith("⚫"));
assert(Object.keys(context.WarhammerSpaceMarineRules.unitRules).length === structuredSpaceMarineCards.length && structuredSpaceMarineCards.length === 91, "星际战士规则目录必须覆盖全部 91 个可载入单位");
assert(structuredSpaceMarineCards.every((card) => context.WarhammerSpaceMarineRules.unitRules[card.unit.name]?.length), "每个星际战士单位都必须至少有一条原文技能规则");

const tytusCard = structuredSpaceMarineCards.find((card) => String(card.unit.abilities || "").includes("持续攻势"));
const tytusRule = tytusCard && context.WarhammerRuleResolver.rulesForUnit(spaceMarineData.faction, tytusCard.unit.name).unit.find((rule) => rule.effects?.some((effect) => effect.type === "sustained-hits"));
assert(tytusRule, "泰图斯连长必须声明持续攻势");
if (tytusRule) {
  const disabled = resolve(spaceMarineData.faction, tytusCard.unit.name, {}, { phase: "melee", isJoined: false });
  const enabled = resolve(spaceMarineData.faction, tytusCard.unit.name, { [`${tytusRule.id}.enabled`]: true, [`${tytusRule.id}.forceLeader`]: true }, { phase: "melee", isJoined: false });
  assert(disabled.attack.sustainedHits === 0 && enabled.attack.sustainedHits === 1, "星际战士技能必须默认关闭并能通过控件启用连击");
}

const woundRule = Object.values(context.WarhammerSpaceMarineRules.unitRules).flat().find((rule) => rule.effects?.some((effect) => effect.type === "incoming-wound-when-strength-gte"));
assert(woundRule, "星际战士必须声明 S≥T 时的造伤 -1 技能");

const guardDefault = resolve("帝皇禁军", "禁军盾卫", {}, { phase: "melee" });
assert(guardDefault.attack.woundReroll === "ones", "禁军盾卫默认必须重投造伤 1");

const guardOnObjective = resolve("帝皇禁军", "禁军盾卫", { "custodes-guard-stance.onObjective": true }, { phase: "melee" });
assert(guardOnObjective.attack.woundReroll === "failed", "禁军盾卫在己方目标点必须重投失败造伤");

const trajannAxe = resolve("帝皇禁军", "图拉真元帅", { "custodes-trajan-time-lock.mode": "axe" }, { phase: "melee" });
assert(trajannAxe.attack.weaponAttackOverride?.name === "守望者战斧" && trajannAxe.attack.weaponAttackOverride?.value === 12, "图拉真时间枷锁的战斧攻击次数必须为 12");

const aleyaForcedLeader = resolve("帝皇禁军", "艾雷雅", { "custodes-aleya-soul.forceLeader": true }, { phase: "melee", isJoined: false });
assert(aleyaForcedLeader.attack.hitModifier === 1, "艾雷雅强制按已领导单位时必须获得命中 +1");

const allarus = resolve("帝皇禁军", "阿拉鲁斯终结者", {}, { phase: "melee" });
const terminatorCaptain = resolve("帝皇禁军", "终结者盾卫连长", {}, { phase: "melee" });
assert(allarus.defend.feelNoPain === 0, "阿拉鲁斯终结者不能被错误赋予不知疼痛");
assert(terminatorCaptain.defend.feelNoPain === 0, "终结者盾卫连长不能被错误赋予不知疼痛");

if (failures.length) {
  console.error("规则回归校验失败：");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("规则回归校验通过：禁军重投、时间枷锁、强制领导和不知疼痛边界均符合预期。");
