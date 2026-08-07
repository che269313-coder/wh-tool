import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import engine from "../docs/engine.js";

const root = path.resolve(import.meta.dirname, "..");
const context = vm.createContext({});
context.globalThis = context;
for (const file of ["custodes.js", "space-marines.js", "death-guard.js", "effects.js", "resolver.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, "docs", "rules", file), "utf8"), context, { filename: file });
}

const resolve = context.WarhammerRuleResolver.resolveUnit;
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const deathGuardData = JSON.parse(fs.readFileSync(path.join(root, "docs", "data", "死亡守卫", "死亡守卫-全部数据卡.json"), "utf8"));
const deathGuardRules = context.WarhammerDeathGuardRules;
assert(deathGuardRules && Object.keys(deathGuardRules.unitRules || {}).length === deathGuardData.cards.length, "死亡守卫规则目录必须覆盖全部数据卡");
assert(deathGuardData.cards.every((card) => deathGuardRules?.unitRules?.[card.unit.name]?.length), "每个死亡守卫单位都必须至少有一条原文技能规则");
const nurgleGift = deathGuardRules?.factionRules?.find((rule) => rule.id === "death-guard-nurgles-gift");
assert(nurgleGift?.effects?.some((effect) => effect.type === "target-toughness-modifier" && effect.value === -1), "死亡守卫必须声明纳垢赐福的目标T-1效果");
const skullsquirm = deathGuardRules?.factionRules?.find((rule) => rule.id === "death-guard-nurgles-gift");
assert(skullsquirm?.controls?.find((control) => control.id === "plague")?.options?.some(([value]) => value === "skullsquirm"), "死亡守卫必须提供头骨痉挛的额外瘟疫选项");
assert(skullsquirm?.controls?.find((control) => control.id === "plague")?.options?.some(([value]) => value === "rattlejoint"), "死亡守卫必须提供颤骨瘟疫的额外瘟疫选项");
assert(skullsquirm?.controls?.find((control) => control.id === "plague")?.options?.some(([value]) => value === "scabrous"), "死亡守卫必须提供烂魂伤风的额外瘟疫选项");
assert(skullsquirm?.effects?.some((effect) => effect.type === "target-melee-hit-minus" && effect.requiresPlague === "skullsquirm"), "死亡守卫必须声明头骨痉挛的近战命中-1效果");
assert(skullsquirm?.effects?.some((effect) => effect.type === "target-save-modifier" && effect.requiresPlague === "rattlejoint"), "死亡守卫必须声明颤骨瘟疫的保护值-1效果");
const blightlordVolley = deathGuardRules?.unitRules?.["腐毒领主终结者"]?.find((rule) => rule.name === "炽烈连射");
assert(blightlordVolley?.effects?.some((effect) => effect.type === "weapon-strength-modifier"), "腐毒领主终结者必须声明炽烈连射的力量+1");
assert(blightlordVolley?.effects?.some((effect) => effect.type === "weapon-ap-modifier"), "腐毒领主终结者必须声明炽烈连射的AP+1");
const tankHunters = deathGuardRules?.unitRules?.["恶臭疫病引擎"]?.find((rule) => rule.name.includes("坦克猎手"));
assert(tankHunters?.effects?.some((effect) => effect.type === "hit-modifier" && effect.requiresTargetMonsterVehicle), "恶臭疫病引擎必须声明坦克猎手命中+1");
assert(tankHunters?.effects?.some((effect) => effect.type === "wound-modifier" && effect.requiresTargetMonsterVehicle), "恶臭疫病引擎必须声明坦克猎手造伤+1");
assert(tankHunters?.controls?.filter((control) => control.id === "targetMonsterVehicle").length === 0, "坦克猎手不应再显示重复的目标关键词控件");
const contagionGift = deathGuardRules?.unitRules?.["恶瘟投放者"]?.find((rule) => rule.name.includes("传染馈赠"));
assert(contagionGift?.effects?.some((effect) => effect.type === "sustained-hits" && effect.requiresTargetInfected && effect.requiresJoined), "恶瘟投放者必须声明传染馈赠的感染目标连击1效果");
assert(contagionGift?.controls?.some((control) => control.id === "targetInfected"), "传染馈赠必须提供目标已感染选项");
assert(deathGuardData.cards.some((card) => card.name === "有翼纳垢恶魔亲王") && deathGuardData.cards.some((card) => card.name === "恶瘟投放者"), "死亡守卫必须保留有翼纳垢恶魔亲王和恶瘟投放者数据卡");
const defilerCard = deathGuardData.cards.find((card) => card.name === "污染者");
assert(defilerCard?.unit?.movement === 12 && defilerCard.unit.woundsPerModel === 18 && defilerCard.unit.invulnerableSave === 5, "污染者必须更新为 M12/T11/W18/5++");
assert(["魂浆破坏炮", "重型导弹发射器 - 穿甲弹", "重型导弹发射器 - 碎片弹", "重型死神自动炮", "流火岩浆切割器", "电鞭", "剪切爪 - 猛击", "剪切爪 - 横扫"].every((name) => defilerCard.weapons.some((weapon) => weapon.name === name)), "污染者必须保留最新图片中的全部武器配置");
const defilerDamaged = deathGuardRules?.unitRules?.["污染者"]?.find((rule) => rule.name === "受损");
assert(defilerDamaged?.effects?.some((effect) => effect.type === "damaged-hit-minus" && effect.threshold === 6), "污染者受损区间必须为剩余1-6点耐伤");
const deathGuardAliasPairs = [
  ["死亡守卫带翼恶魔亲王", "有翼纳垢恶魔亲王"], ["带翼恶魔亲王", "有翼纳垢恶魔亲王"],
  ["凋败记账官", "书记官"], ["病毒精练者", "生物腐化者"],
  ["死亡守卫旗手", "死亡守卫持像者"], ["死亡守卫恶魔亲王", "纳垢恶魔亲王"],
  ["恶疾使者", "恶瘟投放者"], ["瘟疫散播者", "恶臭病原体"],
  ["烈毒领主", "病毒领主"], ["丧钟使者", "剧毒疫病使者"], ["泰丰斯", "泰弗斯"],
  ["死亡守卫犀牛装甲车", "混沌犀牛战车"], ["凋零引擎", "恶臭疫病引擎"],
  ["瘟疫行尸", "瘟疫行者"], ["凋零霸主终结者", "腐毒领主终结者"],
  ["死亡守卫混沌卵", "纳垢混沌魔物"], ["死亡守卫地狱兽", "地狱兽"],
  ["死亡守卫兰德掠袭者", "混沌兰德掠袭者战车"],
  ["死亡守卫歼灭者型猎食者坦克", "混沌歼灭者型掠食者战车"],
  ["死亡守卫破坏者型猎食者坦克", "混沌破坏者型掠食者战车"],
  ["瘟疫机蜂", "恶臭肿胀机兵"], ["剧毒坩埚", "瘴毒机"],
];
deathGuardAliasPairs.forEach(([alias, canonical]) => assert(
  context.WarhammerRuleResolver.rulesForUnit("死亡守卫", alias).unit.length === context.WarhammerRuleResolver.rulesForUnit("死亡守卫", canonical).unit.length,
  `死亡守卫别名必须映射：${alias} -> ${canonical}`,
));
const mortarionCore = deathGuardRules?.unitRules?.["莫塔里安"]?.find((rule) => rule.name === "核心技能");
assert(mortarionCore?.effects?.some((effect) => effect.type === "fnp" && effect.threshold === 5) && !mortarionCore.controls, "莫塔里安核心技能的不知疼痛5+必须默认启用");
if (nurgleGift) {
  const disabledGift = context.WarhammerRuleResolver.resolveFaction("死亡守卫", {}, { phase: "ranged" });
  const enabledGift = context.WarhammerRuleResolver.resolveFaction("死亡守卫", { "death-guard-nurgles-gift.enabled": true }, { phase: "ranged" });
  assert(disabledGift.attack.targetToughnessModifier === 0 && enabledGift.attack.targetToughnessModifier === -1, "纳垢赐福必须默认关闭并可通过控件启用T-1");
}
if (contagionGift) {
  const contagionEnabled = resolve("死亡守卫", "恶疾使者", {
    [`${contagionGift.id}.enabled`]: true,
    [`${contagionGift.id}.targetInfected`]: true,
    [`${contagionGift.id}.forceLeader`]: true,
  }, { phase: "melee", isJoined: false });
  assert(contagionEnabled.attack.sustainedHits === 1, "恶疾使者别名必须能解析传染馈赠的连击1");
}
if (skullsquirm) {
  const enabledSkullsquirm = context.WarhammerRuleResolver.resolveFaction("死亡守卫", { "death-guard-nurgles-gift.enabled": true, "death-guard-nurgles-gift.plague": "skullsquirm" }, { phase: "melee" });
  const enabledRattlejoint = context.WarhammerRuleResolver.resolveFaction("死亡守卫", { "death-guard-nurgles-gift.enabled": true, "death-guard-nurgles-gift.plague": "rattlejoint" }, { phase: "ranged" });
  assert(enabledSkullsquirm.attack.targetMeleeHitModifier === -1, "头骨痉挛必须可通过三选一控件启用近战命中-1");
  assert(enabledRattlejoint.attack.targetSaveModifier === 1, "颤骨瘟疫必须可通过三选一控件启用保护值-1");
}

const dataRoot = path.join(root, "docs", "data");
const spaceMarineDir = fs.readdirSync(dataRoot).find((name) => {
  const full = path.join(dataRoot, name);
  return fs.statSync(full).isDirectory() && fs.readdirSync(full).some((file) => file.endsWith("全部数据卡.json"));
});
const spaceMarineFile = fs.readdirSync(path.join(dataRoot, spaceMarineDir)).find((file) => file.endsWith("全部数据卡.json"));
const spaceMarineData = JSON.parse(fs.readFileSync(path.join(dataRoot, spaceMarineDir, spaceMarineFile), "utf8"));
const categoryNames = new Set(["传奇英雄人物", "战术小队", "其他步兵", "军表构成", "3", "骑乘", "终结者", "机甲", "载具", "运输载具", "飞行载具", "工事"]);
const structuredSpaceMarineCards = (spaceMarineData.cards || []).filter((card) => card.unit?.name && !categoryNames.has(card.name) && !String(card.name || "").startsWith("⚫"));
assert(structuredSpaceMarineCards.every((card) => !String(card.unit.abilities || "").split("⚫").some((segment) => /^\s*】\s*[：:]/.test(segment))), "星际战士技能文本不能残留孤立的 】： 前缀");
assert(Object.keys(context.WarhammerSpaceMarineRules.unitRules).length === structuredSpaceMarineCards.length && structuredSpaceMarineCards.length === 93, "星际战士规则目录必须覆盖全部 93 个可载入单位");
assert(structuredSpaceMarineCards.every((card) => context.WarhammerSpaceMarineRules.unitRules[card.unit.name]?.length), "每个星际战士单位都必须至少有一条原文技能规则");
const torrentWeapons = structuredSpaceMarineCards.flatMap((card) => (card.weapons || []).filter((weapon) => (weapon.abilities || []).some((ability) => /喷射|torrent/i.test(String(ability)))));
assert(torrentWeapons.length > 0 && torrentWeapons.every((weapon) => String(weapon.skill || "").toLowerCase() === "torrent"), "所有带喷射关键词的武器必须标记为自动命中，不能回退为 7+");

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

const genericCaptainRules = context.WarhammerSpaceMarineRules.unitRules["通用人物"] || [];
assert(genericCaptainRules.some((rule) => rule.name === "战斗之仪"), "通用人物数据卡必须显示战斗之仪");
const peakMoment = genericCaptainRules.find((rule) => rule.name === "巅峰时刻");
assert(peakMoment?.effects?.some((effect) => effect.type === "attack-modifier" && effect.value === 3), "通用人物数据卡必须声明巅峰时刻 A+3");
assert(peakMoment?.effects?.some((effect) => effect.type === "devastating-wounds" && effect.phase === "melee"), "巅峰时刻必须在近战阶段提供毁灭伤害");

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

const spaceMarineRules = context.WarhammerSpaceMarineRules?.unitRules || {};
const passiveInvulnerableRules = Object.values(spaceMarineRules).flat().filter((rule) =>
  rule.effects?.length
    && rule.effects.every((effect) => effect.type === "invulnerable-save")
    && /拥\s*有/.test(rule.text || "")
    && !/一次性|可以|获得|本阶段|持续/.test(rule.text || "")
);
assert(passiveInvulnerableRules.length > 0 && passiveInvulnerableRules.every((rule) => !rule.controls?.length), "拥有型特殊保护必须默认自动结算，不能要求主动勾选");
const thorRule = Object.values(spaceMarineRules).flat().find((rule) => rule.text === "特殊保护：本模型拥有4+特殊保护");
const thor = resolve("星际战士", "托尔连长", {}, { phase: "melee" });
assert(thorRule && !thorRule.controls?.length && thor.defend.invulnerableSave === 4, "托尔连长的4+特殊保护必须无控件且自动进入防御结算");
const siegeCommander = spaceMarineRules["托尔连长"]?.find((rule) => rule.name === "攻城指挥官");
const thorAgainstInfantry = resolve("星际战士", "托尔连长", {}, { phase: "melee" });
const thorAgainstVehicle = resolve("星际战士", "托尔连长", { [`${siegeCommander?.id}.targetMonsterVehicle`]: true }, { phase: "melee" });
assert(siegeCommander?.controls?.some((control) => control.id === "targetMonsterVehicle"), "托尔连长攻城指挥官必须提供巨兽/载具/工事目标控件");
assert(thorAgainstInfantry.attack.strengthModifier === 0 && thorAgainstInfantry.attack.apModifier === 0 && thorAgainstInfantry.attack.damageModifier === 0, "攻城指挥官未选择目标类型时不得改变武器属性");
assert(thorAgainstVehicle.attack.strengthModifier === 2 && thorAgainstVehicle.attack.apModifier === 2 && thorAgainstVehicle.attack.damageModifier === 2, "攻城指挥官对巨兽/载具/工事必须同时提供 S/AP/D +2");

const standardBearerEntry = Object.entries(spaceMarineRules).find(([, rules]) => rules.some((rule) => rule.id === "space-marines-p85-3"));
const standardBearerRule = standardBearerEntry?.[1]?.find((rule) => rule.id === "space-marines-p85-3");
const standardBearerSelections = { "space-marines-p85-3.enabled": true, "space-marines-p85-3.forceLeader": true };
const standardBearerNormal = standardBearerEntry && resolve(spaceMarineData.faction, standardBearerEntry[0], standardBearerSelections, { phase: "melee", isJoined: true, underStartingStrength: false, belowHalfStrength: false });
const standardBearerUnderStarting = standardBearerEntry && resolve(spaceMarineData.faction, standardBearerEntry[0], standardBearerSelections, { phase: "melee", isJoined: true, underStartingStrength: true, belowHalfStrength: false });
const standardBearerBelowHalf = standardBearerEntry && resolve(spaceMarineData.faction, standardBearerEntry[0], standardBearerSelections, { phase: "melee", isJoined: true, underStartingStrength: true, belowHalfStrength: true });
assert(standardBearerRule?.controls?.some((control) => control.id === "underStartingStrength") && standardBearerRule?.controls?.some((control) => control.id === "belowHalfStrength"), "终结者旗手高举旗帜必须提供低于起始模型数量和低于半数两个选项");
assert(standardBearerRule?.effects?.some((effect) => effect.type === "hit-modifier" && effect.condition === "underStartingStrength"), "高举旗帜的命中 +1 必须绑定低于起始模型数量条件");
assert(standardBearerNormal?.attack.hitModifier === 0 && standardBearerNormal?.attack.woundModifier === 0, "高举旗帜在满编时不得提供命中或造伤加成");
assert(standardBearerUnderStarting?.attack.hitModifier === 1 && standardBearerUnderStarting?.attack.woundModifier === 0, "高举旗帜低于起始模型数量时必须提供命中 +1");
assert(standardBearerBelowHalf?.attack.hitModifier === 1 && standardBearerBelowHalf?.attack.woundModifier === 1, "高举旗帜低于半数时必须同时提供命中和造伤 +1");

const ironFatherForgeMaster = spaceMarineRules["铁父费罗斯"]?.find((rule) => rule.name === "铸造之主");
const techmarineBlessing = spaceMarineRules["技术军士"]?.find((rule) => rule.name === "机神祝福");
assert(ironFatherForgeMaster && !ironFatherForgeMaster.controls?.length && !ironFatherForgeMaster.effects?.length, "铸造之主不能把友军载具效果误套到当前模型");
assert(techmarineBlessing && !techmarineBlessing.controls?.length && !techmarineBlessing.effects?.length, "机神祝福不能把友军载具效果误套到当前模型");
for (const [unitName, threshold] of [["泰图斯连长", 5], ["伏尔甘·赫斯坦", 6], ["坎托战团长", 6]]) {
  const core = spaceMarineRules[unitName]?.find((rule) => rule.name === "核心特性");
  assert(core?.effects?.some((effect) => effect.type === "fnp" && effect.threshold === threshold) && !core.controls?.length, `${unitName}核心不知疼痛必须默认生效`);
}
const lysander = spaceMarineRules["莱山德连长"]?.find((rule) => rule.name === "坚毅典范");
const lysanderEnabled = resolve(spaceMarineData.faction, "莱山德连长", { [`${lysander?.id}.enabled`]: true, [`${lysander?.id}.forceLeader`]: true }, { phase: "melee", isJoined: false });
assert(lysander?.effects?.some((effect) => effect.type === "incoming-wound-when-strength-gte") && lysanderEnabled.defend.incomingWoundWhenStrengthGreaterOrEqual === -1, "坚毅典范必须把 S≥T 的造伤 -1 传入防守方效果");
const lionOath = spaceMarineRules["坎托战团长"]?.find((rule) => rule.name === "莱恩誓言");
const lionOathEnabled = resolve(spaceMarineData.faction, "坎托战团长", { [`${lionOath?.id}.enabled`]: true, [`${lionOath?.id}.forceLeader`]: true }, { phase: "melee", isJoined: false });
assert(lionOath?.effects?.some((effect) => effect.type === "attack-modifier" && effect.value === 1) && lionOathEnabled.attack.attackModifier === 1, "莱恩誓言必须提供武器 A+1");
const angelRage = spaceMarineRules["跳跃背包连长"]?.find((rule) => rule.name === "天使之怒");
const angelRageEnabled = resolve(spaceMarineData.faction, "跳跃背包连长", { [`${angelRage?.id}.enabled`]: true, [`${angelRage?.id}.forceLeader`]: true }, { phase: "melee", isJoined: false });
assert(angelRage?.effects?.some((effect) => effect.type === "weapon-strength-modifier" && effect.value === 1) && angelRageEnabled.attack.strengthModifier === 1, "天使之怒必须提供近战武器 S+1");
const essoCard = structuredSpaceMarineCards.find((card) => card.unit.name === "艾索·沙恩");
const subodenCard = structuredSpaceMarineCards.find((card) => card.unit.name === "速不台可汗");
const heavyCaptainCard = structuredSpaceMarineCards.find((card) => card.unit.name === "重装连长");
const genericCaptainCard = structuredSpaceMarineCards.find((card) => card.unit.name === "通用人物");
assert(essoCard?.unit?.invulnerableSave === 4, "艾索·沙恩必须保留 4++");
assert(subodenCard?.weapons?.some((weapon) => weapon.name === "动力长刀“风暴之牙”" && weapon.type === "melee") && subodenCard.weapons.some((weapon) => weapon.name === "动力剑" && weapon.type === "melee"), "速不台可汗必须保留近战武器");
assert(heavyCaptainCard && heavyCaptainCard.weapons?.some((weapon) => weapon.type === "melee"), "重装连长数据卡必须可被找到并包含近战武器");
assert(["格斗武器", "精工动力武器", "动力拳"].every((name) => genericCaptainCard?.weapons?.some((weapon) => weapon.name === name && weapon.type === "melee")), "通用人物数据卡必须保留近战武器");
const neverYieldRule = spaceMarineRules["重装连长"]?.find((rule) => rule.name === "永不屈服");
const neverYield = resolve(spaceMarineData.faction, "重装连长", {}, { phase: "melee", isJoined: false });
assert(neverYieldRule?.effects?.some((effect) => effect.type === "damage-halving") && !neverYieldRule.controls?.length && neverYield.defend.damageMultiplier === 0.5, "永不屈服必须作为默认的被分配攻击 D 减半");

const enabledSkullsquirm = context.WarhammerRuleResolver.resolveFaction("死亡守卫", {
  "death-guard-nurgles-gift.enabled": true,
  "death-guard-nurgles-gift.plague": "skullsquirm",
}, { phase: "melee" });
assert(enabledSkullsquirm.attack.targetMeleeHitModifier === -1, "头骨痉挛必须产出近战命中-1");
assert(context.WarhammerRuleEffects.defenderAttackModifiers(enabledSkullsquirm, "melee").hitModifier === -1, "死亡守卫作为防御方时，头骨痉挛必须映射到进攻方近战命中修正");
assert(context.WarhammerRuleEffects.defenderAttackModifiers(enabledSkullsquirm, "ranged").hitModifier === 0, "头骨痉挛不得影响远程命中");

const deterministic = (values) => {
  let index = 0;
  return () => values[Math.min(index++, values.length - 1)];
};
const simpleMeleeRound = (hitModifier) => engine.simulateRound({
  simulations: 1,
  weaponGroups: [{ name: "回归近战攻击", modelCount: 1, attacks: "1", hit: 2, wound: 2, ap: 0, damage: "1", effects: { hitModifierEnabled: Boolean(hitModifier), hitModifierValue: hitModifier } }],
  defenderGroups: [{ name: "回归目标", modelCount: 1, wounds: 1, save: 7, invulnerableSave: 0, effects: {} }],
}, deterministic([0.2, 0.2, 0]));
assert(simpleMeleeRound(0).averages.totalDamage === 1 && simpleMeleeRound(-1).averages.totalDamage === 0, "近战命中-1必须真实改变最终战斗结算，而不只是显示规则状态");

if (failures.length) {
  console.error("规则回归校验失败：");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("规则回归校验通过：禁军重投、时间枷锁、强制领导和不知疼痛边界均符合预期。");
