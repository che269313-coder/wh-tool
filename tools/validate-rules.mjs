import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import engine from "../docs/engine.js";

const root = path.resolve(import.meta.dirname, "..");
const context = vm.createContext({});
context.globalThis = context;
for (const file of ["identity.js", "faction-registry.js", "effect-schema.js", "keyword-dictionary.js", "combat-state.js", "factions.js", "custodes-identities.js", "custodes.js", "space-marines-identities.js", "space-marines.js", "death-guard-identities.js", "death-guard.js", "orks-identities.js", "orks.js", "effects.js", "resolver.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, "docs", "rules", file), "utf8"), context, { filename: file });
}

const resolve = context.WarhammerRuleResolver.resolveUnit;
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const custodesRuleList = [
  ...(context.WarhammerCustodesRules?.factionRules || []),
  ...Object.values(context.WarhammerCustodesRules?.unitRules || {}).flat(),
];
const martialKatahRule = context.WarhammerCustodesRules.factionRules.find((rule) => rule.id === "adeptus-custodes.army.martial-katah");
assert(martialKatahRule?.appliesTo?.unitTag === "adeptus-custodes.martial-katah", "Martial Ka'tah must declare its scope through a stable unit tag");
assert(martialKatahRule?.effects?.some((effect) => effect.type === "sustained-hits" && effect.selection?.controlId === "stance" && effect.selection?.equals === "sustained"), "Martial Ka'tah sustained hits must use a generic selected effect");
assert(martialKatahRule?.effects?.some((effect) => effect.type === "lethal-hits" && effect.selection?.controlId === "stance" && effect.selection?.equals === "lethal"), "Martial Ka'tah lethal hits must use a generic selected effect");
assert(context.WarhammerRuleResolver.rulesForUnit("帝皇禁军", "禁军盾卫").faction.some((rule) => rule.id === martialKatahRule.id), "Custodian units must receive Martial Ka'tah");
assert(!context.WarhammerRuleResolver.rulesForUnit("帝皇禁军", "警戒者").faction.some((rule) => rule.id === martialKatahRule.id), "Anathema Psykana units must not receive Martial Ka'tah");
const martialSustained = context.WarhammerRuleResolver.resolveFaction("帝皇禁军", { "custodes-martial-katah.stance": "sustained" }, { phase: "melee", unitName: "禁军盾卫" });
const martialLethal = context.WarhammerRuleResolver.resolveFaction("帝皇禁军", { "adeptus-custodes.army.martial-katah.stance": "lethal" }, { phase: "melee", unitName: "禁军盾卫" });
const sisterKatah = context.WarhammerRuleResolver.resolveFaction("帝皇禁军", { "adeptus-custodes.army.martial-katah.stance": "lethal" }, { phase: "melee", unitName: "警戒者" });
const unscopedKatah = context.WarhammerRuleResolver.resolveFaction("帝皇禁军", { "adeptus-custodes.army.martial-katah.stance": "lethal" }, { phase: "melee" });
assert(martialSustained.attack.sustainedHits === 1 && martialLethal.attack.lethalHits, "Both legacy and stable Martial Ka'tah selections must resolve");
assert(!sisterKatah.attack.lethalHits && sisterKatah.attack.sustainedHits === 0, "Direct resolution must not leak Martial Ka'tah to Anathema Psykana");
assert(!unscopedKatah.attack.lethalHits, "Unit-scoped faction rules must require a unit context");
assert(!Object.values(context.WarhammerCustodesRules.unitRules).flat().some((rule) => (rule.effects || (rule.effect ? [rule.effect] : [])).some((effect) => ["martial-katah", "second-martial-katah"].includes(effect.type))), "Custodes unit rules must not retain dedicated Martial Ka'tah effect types");
assert(custodesRuleList.every((rule) => /^adeptus-custodes\.[a-z0-9-]+\.[a-z0-9-]+$/.test(rule.id)), "禁军规则必须全部使用阵营.单位.官方英文技能稳定 ID");
assert(custodesRuleList.every((rule) => rule.identity?.matchStatus && rule.legacyIds?.length), "禁军稳定 ID 必须记录英文匹配状态和旧 ID");
assert(context.WarhammerCustodesRules.unitRules["艾雷雅"]?.some((rule) => rule.id === "adeptus-custodes.aleya.tenacious-spirit"), "坚毅灵魂必须使用官方英文 Tenacious Spirit ID");
const removedCustodesLegacyTypes = new Set(["guard-wound-reroll", "elite-wound-reroll", "deep-daughter", "anti-psyker-weapons", "incoming-melee-hit-minus", "time-lock", "high-strength-wound-minus", "under-strength-bonuses"]);
assert(custodesRuleList.every((rule) => (rule.effects || (rule.effect ? [rule.effect] : [])).every((effect) => !removedCustodesLegacyTypes.has(effect.type))), "可声明式表达的禁军技能不得继续使用专用 legacy effect.type");
const pendingCustodesRules = custodesRuleList.filter((rule) => rule.identity?.matchStatus === "translated-needs-review");
assert(pendingCustodesRules.length === 0, "用户已接受的禁军暂译 ID 不得继续标为待复核");

for (const [name, catalog] of [
  ["帝皇禁军", context.WarhammerCustodesRules],
  ["星际战士", context.WarhammerSpaceMarineRules],
  ["死亡守卫", context.WarhammerDeathGuardRules],
  ["欧克兽人", context.WarhammerOrksRules],
]) {
  const schemaErrors = context.WarhammerEffectSchema.validateCatalog(catalog);
  assert(schemaErrors.length === 0, `${name}效果 schema 校验失败：${schemaErrors.join("；")}`);
}

const deathGuardData = JSON.parse(fs.readFileSync(path.join(root, "docs", "data", "死亡守卫", "死亡守卫-全部数据卡.json"), "utf8"));
const deathGuardRules = context.WarhammerDeathGuardRules;
const spaceMarineRuleList = [
  ...(context.WarhammerSpaceMarineRules?.factionRules || []),
  ...Object.values(context.WarhammerSpaceMarineRules?.unitRules || {}).flat(),
];
const deathGuardRuleList = [
  ...(context.WarhammerDeathGuardRules?.factionRules || []),
  ...Object.values(context.WarhammerDeathGuardRules?.unitRules || {}).flat(),
];
const orksRuleList = [
  ...(context.WarhammerOrksRules?.factionRules || []),
  ...Object.values(context.WarhammerOrksRules?.unitRules || {}).flat(),
];
for (const [label, factionId, rules] of [
  ["星际战士", "space-marines", spaceMarineRuleList],
  ["死亡守卫", "death-guard", deathGuardRuleList],
  ["欧克兽人", "orks", orksRuleList],
]) {
  assert(rules.every((rule) => new RegExp(`^${factionId}\\.[a-z0-9-]+\\.[a-z0-9-]+$`).test(rule.id)), `${label}规则必须全部使用阵营.单位.英文技能稳定 ID`);
  assert(rules.every((rule) => rule.identity?.matchStatus && rule.legacyIds?.length), `${label}稳定 ID 必须记录英文匹配状态和旧 ID`);
  assert(rules.every((rule) => rule.legacyIds.some((legacyId) => legacyId !== rule.id)), `${label}每条稳定 ID 必须保留至少一个不同于新 ID 的历史别名`);
  assert(rules.every((rule) => rule.identity?.matchStatus !== "translated-needs-review"), `${label}已接受翻译不得继续标为待复核`);
  assert(new Set(rules.map((rule) => rule.id)).size === rules.length, `${label}稳定 ID 在阵营内必须唯一`);
}
const waagh = context.WarhammerRuleResolver.resolveFaction("欧克兽人", { "orks.army.waaagh.enabled": true }, { phase: "melee", unitName: "野兽头目" });
assert(waagh.attack.strengthModifier === 1 && waagh.attack.attackModifier === 1 && waagh.defend.invulnerableSave === 5, "欧克兽人瓦戈！必须提供近战 S/A +1 和 5+ 无敌豁免");
assert(Object.keys(context.WarhammerOrksRules.unitRules || {}).length === 99, "欧克兽人必须为 99 张数据卡全部生成单位技能目录");
assert(Object.values(context.WarhammerOrksRules.unitRules || {}).every((rules) => rules.length > 0), "欧克兽人每张数据卡都必须至少有一条结构化技能规则，不能回退到旧占位提示");
const orksUnitRule = (unitName, englishName) => context.WarhammerOrksRules.unitRules[unitName]?.find((rule) => rule.source?.englishName === englishName);
const beastboss = orksUnitRule("野兽头目", "Beastboss");
const beastbossResolved = context.WarhammerRuleResolver.resolveUnit("欧克兽人", "野兽头目", {}, { phase: "melee", isJoined: true });
assert(beastboss?.effects?.some((effect) => effect.type === "hit-modifier" && effect.value === 1 && effect.requiresJoined), "欧克兽人野兽头目必须声明领导单位时近战命中 +1");
assert(beastbossResolved.attack.hitModifier === 1, "欧克兽人野兽头目领导单位时近战命中 +1 必须进入计算");
const ferociousRage = orksUnitRule("野兽头目", "Ferocious Rage");
const ferociousResolved = context.WarhammerRuleResolver.resolveUnit("欧克兽人", "野兽头目", { [`${ferociousRage?.id}.charged`]: true }, { phase: "melee" });
assert(ferociousRage?.effects?.some((effect) => effect.type === "devastating-wounds" && effect.selection?.controlId === "charged") && ferociousResolved.attack.devastating, "欧克兽人蛮兽之怒必须按冲锋控件提供毁灭伤害");
const moreDakka = orksUnitRule("大技师", "More Dakka");
const moreDakkaResolved = context.WarhammerRuleResolver.resolveUnit("欧克兽人", "大技师", { [`${moreDakka?.id}.enabled`]: true }, { phase: "ranged", isJoined: true });
assert(moreDakka?.effects?.some((effect) => effect.type === "hit-reroll" && effect.mode === "ones") && moreDakkaResolved.attack.hitReroll === "ones", "欧克兽人更多火力必须提供远程命中 1 重投");
const orksTankHunters = orksUnitRule("坦克破坏者", "Tank Hunters");
const tankResolved = context.WarhammerRuleResolver.resolveUnit("欧克兽人", "坦克破坏者", { [`${orksTankHunters?.id}.targetMonsterVehicle`]: true }, { phase: "ranged" });
assert(orksTankHunters?.effects?.some((effect) => effect.type === "hit-modifier" && effect.requiresTargetMonsterVehicle) && orksTankHunters?.effects?.some((effect) => effect.type === "wound-modifier" && effect.requiresTargetMonsterVehicle)
  && tankResolved.attack.hitModifier === 1 && tankResolved.attack.woundModifier === 1, "欧克兽人坦克猎手必须按凶兽/载具目标提供命中与造伤 +1");
assert(context.WarhammerSpaceMarineRules.unitRules["连长"]?.some((rule) => rule.id === "space-marines.captain.rites-of-battle"), "星际战士连长战斗之仪必须使用官方 Rites of Battle ID");
assert(context.WarhammerSpaceMarineRules.unitRules["跳跃背包连长"]?.find((rule) => rule.name === "战斗之仪")?.id === "space-marines.captain-with-jump-pack.rites-of-battle", "跳跃背包连长技能顺序不得把战斗之仪错配为 Angel's Wrath");
assert(context.WarhammerSpaceMarineRules.unitRules["跳跃背包连长"]?.find((rule) => rule.name === "天使之怒")?.id === "space-marines.captain-with-jump-pack.angels-wrath", "跳跃背包连长天使之怒必须使用官方 Angel's Wrath ID");
assert(context.WarhammerSpaceMarineRules.unitRules["空降仓"]?.find((rule) => rule.name === "空降突击")?.id === "space-marines.drop-pod.drop-pod-assault", "空降仓技能必须在官网能力数量不一致时仍映射 Drop Pod Assault");
assert(context.WarhammerSpaceMarineRules.unitRules["落锤堡"]?.find((rule) => rule.name === "防御工事")?.id === "space-marines.hammerfall-bunker.fortification", "落锤堡能力必须按语义覆盖映射，不能仅按数组顺序配对");
assert(context.WarhammerDeathGuardRules.unitRules["泰弗斯"]?.some((rule) => rule.id === "death-guard.typhus.destroyer-hive"), "泰弗斯毁灭虫群必须使用官方 Destroyer Hive ID");
assert(deathGuardRules && Object.keys(deathGuardRules.unitRules || {}).length === deathGuardData.cards.length, "死亡守卫规则目录必须覆盖全部数据卡");
assert(deathGuardData.cards.every((card) => deathGuardRules?.unitRules?.[card.unit.name]?.length), "每个死亡守卫单位都必须至少有一条原文技能规则");
const nurgleGift = deathGuardRules?.factionRules?.find((rule) => rule.id === "death-guard.army.nurgles-gift");
assert(nurgleGift?.effects?.some((effect) => effect.type === "target-toughness-modifier" && effect.value === -1), "死亡守卫必须声明纳垢赐福的目标T-1效果");
const skullsquirm = deathGuardRules?.factionRules?.find((rule) => rule.id === "death-guard.army.nurgles-gift");
assert(skullsquirm?.controls?.find((control) => control.id === "plague")?.options?.some(([value]) => value === "skullsquirm"), "死亡守卫必须提供头骨痉挛的额外瘟疫选项");
assert(skullsquirm?.controls?.find((control) => control.id === "plague")?.options?.some(([value]) => value === "rattlejoint"), "死亡守卫必须提供颤骨瘟疫的额外瘟疫选项");
assert(skullsquirm?.controls?.find((control) => control.id === "plague")?.options?.some(([value]) => value === "scabrous"), "死亡守卫必须提供烂魂伤风的额外瘟疫选项");
assert(skullsquirm?.effects?.some((effect) => effect.type === "target-melee-hit-minus" && effect.requiresPlague === "skullsquirm")
  && !skullsquirm?.effects?.some((effect) => effect.type === "target-hit-minus" && effect.requiresPlague === "skullsquirm"), "死亡守卫必须声明扭颅疫病只对近战攻击命中-1");
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
  assert(enabledSkullsquirm.attack.targetMeleeHitModifier === -1 && enabledSkullsquirm.attack.targetHitModifier === 0, "扭颅疫病必须可通过三选一控件启用近战攻击命中-1且不影响远程");
  assert(enabledRattlejoint.attack.targetSaveModifier === 1, "颤骨瘟疫必须可通过三选一控件启用保护值-1");
}

const dataRoot = path.join(root, "docs", "data");
const spaceMarineData = JSON.parse(fs.readFileSync(path.join(dataRoot, "星际战士", "星际战士-全部数据卡.json"), "utf8"));
const categoryNames = new Set(["传奇英雄人物", "其他步兵", "军表构成", "3", "骑乘", "终结者", "机甲", "载具", "运输载具", "飞行载具", "工事"]);
const structuredSpaceMarineCards = (spaceMarineData.cards || []).filter((card) => card.unit?.name && !categoryNames.has(card.name) && !String(card.name || "").startsWith("⚫"));
assert(structuredSpaceMarineCards.every((card) => !String(card.unit.abilities || "").split("⚫").some((segment) => /^\s*】\s*[：:]/.test(segment))), "星际战士技能文本不能残留孤立的 】： 前缀");
assert(Object.keys(context.WarhammerSpaceMarineRules.unitRules).length === structuredSpaceMarineCards.length && structuredSpaceMarineCards.length === 101, "星际战士规则目录必须覆盖全部 101 个可载入单位");
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

const genericCaptainRules = context.WarhammerSpaceMarineRules.unitRules["连长"] || [];
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
const trajannInvulnerable = resolve("帝皇禁军", "图拉真元帅", { "custodes-trajan-time-lock.mode": "invulnerable" }, { phase: "melee" });
assert(trajannInvulnerable.defend.invulnerableSave === 2 && !trajannInvulnerable.attack.weaponAttackOverride, "时间枷锁的两个通用选择效果必须互斥，特殊保护选项应覆盖为 2+");
const trajannInvulnerableRanged = resolve("帝皇禁军", "图拉真元帅", { "custodes-trajan-time-lock.mode": "invulnerable" }, { phase: "ranged" });
assert(trajannInvulnerableRanged.defend.invulnerableSave === 0, "时间枷锁的 2+ 特殊保护只能在近战阶段生效");

const custodianVolley = context.WarhammerCustodesRules.unitRules["禁军盾卫"]?.find((rule) => (rule.effects || (rule.effect ? [rule.effect] : [])).some((effect) => effect.type === "repeat-ranged"));
const custodianVolleyMelee = resolve("帝皇禁军", "禁军盾卫", { [`${custodianVolley?.id}.enabled`]: true }, { phase: "melee" });
const custodianVolleyRanged = resolve("帝皇禁军", "禁军盾卫", { [`${custodianVolley?.id}.enabled`]: true }, { phase: "ranged" });
assert((custodianVolley?.effects || (custodianVolley?.effect ? [custodianVolley.effect] : [])).some((effect) => effect.type === "repeat-ranged" && effect.phase === "ranged"), "禁军盾卫重复射击必须显式限定为远程阶段");
assert(!custodianVolleyMelee.attack.repeatRanged && custodianVolleyRanged.attack.repeatRanged, "重复射击不能泄漏到近战阶段");

const shieldCaptainMartialMaster = context.WarhammerCustodesRules.unitRules["盾卫连长"]?.find((rule) => rule.name === "武艺大师");
const standaloneSecondKatah = resolve("帝皇禁军", "盾卫连长", { [`${shieldCaptainMartialMaster?.id}.secondKatah`]: "sustained" }, { phase: "melee", isJoined: false });
assert(shieldCaptainMartialMaster?.effects?.every((effect) => !effect.requiresJoined) && standaloneSecondKatah.attack.sustainedHits === 1, "盾卫连长单独行动时也必须能使用武艺大师");

const aleyaForcedLeader = resolve("帝皇禁军", "艾雷雅", { "custodes-aleya-soul.forceLeader": true }, { phase: "melee", isJoined: false });
assert(aleyaForcedLeader.attack.hitModifier === 1, "艾雷雅强制按已领导单位时必须获得命中 +1");

const allarus = resolve("帝皇禁军", "阿拉鲁斯终结者", {}, { phase: "melee" });
const terminatorCaptain = resolve("帝皇禁军", "终结者盾卫连长", {}, { phase: "melee" });
const allarusTerminators = resolve("帝皇禁军", "阿拉琉斯终结者", {}, { phase: "melee" });
const vigilators = resolve("帝皇禁军", "警戒者", {}, { phase: "melee" });
assert(allarus.defend.feelNoPain === 0, "阿拉鲁斯终结者不能被错误赋予不知疼痛");
assert(terminatorCaptain.defend.feelNoPain === 0, "终结者盾卫连长不能被错误赋予不知疼痛");
assert(allarusTerminators.defend.feelNoPain === 0 && vigilators.defend.feelNoPain === 0, "阿拉琉斯终结者与警戒者不能被错误赋予不知疼痛");

const spaceMarineRules = context.WarhammerSpaceMarineRules?.unitRules || {};
const agathonHeavyBlow = spaceMarineRules["阿加通连长"]?.find((rule) => rule.name === "重拳出击");
const agathonMelee = resolve("星际战士", "阿加通连长", { [`${agathonHeavyBlow?.id}.enabled`]: true, [`${agathonHeavyBlow?.id}.forceLeader`]: true }, { phase: "melee", isJoined: false });
const agathonRanged = resolve("星际战士", "阿加通连长", { [`${agathonHeavyBlow?.id}.enabled`]: true, [`${agathonHeavyBlow?.id}.forceLeader`]: true }, { phase: "ranged", isJoined: false });
assert(agathonHeavyBlow?.effects?.some((effect) => effect.type === "wound-reroll" && effect.phase === "melee"), "重拳出击必须声明为通用的仅近战造伤重投");
assert(agathonMelee.attack.woundReroll === "failed" && agathonRanged.attack.woundReroll === null, "重拳出击只能影响近战武器，不能泄漏到远程武器");
const outriderImpact = spaceMarineRules["先遣者摩托小队"]?.find((rule) => rule.name === "雷霆冲撞");
const outriderImpactSelections = { [`${outriderImpact?.id}.enabled`]: true, [`${outriderImpact?.id}.charged`]: true };
const outriderImpactMelee = resolve("星际战士", "先遣者摩托小队", outriderImpactSelections, { phase: "melee" });
const outriderImpactRanged = resolve("星际战士", "先遣者摩托小队", outriderImpactSelections, { phase: "ranged" });
assert(outriderImpact?.effects?.some((effect) => effect.type === "weapon-strength-modifier" && effect.value === 1 && effect.phase === "melee")
  && outriderImpact?.effects?.some((effect) => effect.type === "damage-modifier" && effect.value === 1 && effect.phase === "melee"), "先遣者摩托小队雷霆冲撞必须声明近战 S 和 D 各+1");
assert(outriderImpactMelee.attack.strengthModifier === 1 && outriderImpactMelee.attack.damageModifier === 1
  && outriderImpactRanged.attack.strengthModifier === 0 && outriderImpactRanged.attack.damageModifier === 0, "先遣者摩托小队冲锋加成只能影响近战攻击");
const oathRule = context.WarhammerSpaceMarineRules?.factionRules?.find((rule) => rule.id === "space-marines.army.oath-of-moment");
assert(oathRule?.effects?.some((effect) => effect.type === "hit-reroll" && effect.activation === "passive"), "破敌重誓命中重投必须声明为通用被动效果");
assert(oathRule?.effects?.some((effect) => effect.type === "wound-modifier" && effect.selection?.controlId === "woundBonus"), "破敌重誓造伤+1必须使用通用 selection 控件");
const oathPassive = context.WarhammerRuleResolver.resolveFaction("星际战士", {}, { phase: "ranged" });
const oathWoundEnabled = context.WarhammerRuleResolver.resolveFaction("星际战士", { "space-marines-oath-of-moment.woundBonus": true }, { phase: "ranged" });
assert(oathPassive.attack.hitReroll === "failed" && oathPassive.attack.woundModifier === 0, "破敌重誓命中重投必须保持被动，造伤默认关闭");
assert(oathWoundEnabled.attack.woundModifier === 1, "旧破敌重誓控件 ID 必须继续启用造伤+1");
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
for (const unitName of ["智库", "先锋军智库", "终结者智库"]) {
  const hood = spaceMarineRules[unitName]?.find((rule) => rule.name === "灵能头冠");
  const normal = resolve("星际战士", unitName, { [`${hood?.id}.forceLeader`]: true }, { phase: "ranged", isJoined: false });
  const psychic = resolve("星际战士", unitName, { [`${hood?.id}.forceLeader`]: true, [`${hood?.id}.incomingPsychic`]: true }, { phase: "ranged", isJoined: false });
  assert(normal.defend.feelNoPain === 0 && psychic.defend.feelNoPain === 4, `${unitName}灵能头冠只能在来袭攻击具有灵能关键词时提供不知疼痛4+`);
}
const hellfireHood = spaceMarineRules["首席智库底格里斯"]?.find((rule) => rule.name === "地狱火头冠");
const hellfireNormal = resolve("星际战士", "首席智库底格里斯", { [`${hellfireHood?.id}.forceLeader`]: true }, { phase: "ranged", isJoined: false });
const hellfirePsychic = resolve("星际战士", "首席智库底格里斯", { [`${hellfireHood?.id}.forceLeader`]: true, [`${hellfireHood?.id}.incomingPsychic`]: true }, { phase: "ranged", isJoined: false });
assert(hellfireNormal.defend.feelNoPain === 0 && hellfireNormal.defend.feelNoPainMortal === 4
  && hellfirePsychic.defend.feelNoPain === 4, "地狱火头冠应只对灵能攻击或致命伤害提供不知疼痛4+");
const lysanderSaveRule = spaceMarineRules["莱山德连长"]?.find((rule) => rule.name === "特殊保护");
const lysanderBase = resolve("星际战士", "莱山德连长", {}, { phase: "melee" });
const lysanderImpervious = resolve("星际战士", "莱山德连长", { [`${spaceMarineRules["莱山德连长"]?.find((rule) => rule.name === "金刚不破")?.id}.enabled`]: true }, { phase: "melee" });
assert(lysanderSaveRule && lysanderSaveRule.effects?.some((effect) => effect.type === "invulnerable-save" && effect.value === 4) && !lysanderSaveRule.controls?.length && lysanderBase.defend.invulnerableSave === 4, "莱山德连长的被动特殊保护必须是 4+ 且自动结算（不能把金刚不破的 2+ 污染为被动值）");
assert(lysanderImpervious.defend.invulnerableSave === 2, "莱山德连长开启金刚不破后必须获得 2+ 特殊保护");
const siegeCommander = spaceMarineRules["托尔连长"]?.find((rule) => rule.name === "攻城指挥官");
const thorAgainstInfantry = resolve("星际战士", "托尔连长", {}, { phase: "melee" });
const thorAgainstVehicle = resolve("星际战士", "托尔连长", { [`${siegeCommander?.id}.targetMonsterVehicle`]: true }, { phase: "melee" });
assert(siegeCommander?.controls?.some((control) => control.id === "targetMonsterVehicle"), "托尔连长攻城指挥官必须提供巨兽/载具/工事目标控件");
assert(thorAgainstInfantry.attack.strengthModifier === 0 && thorAgainstInfantry.attack.apModifier === 0 && thorAgainstInfantry.attack.damageModifier === 0, "攻城指挥官未选择目标类型时不得改变武器属性");
assert(thorAgainstVehicle.attack.strengthModifier === 2 && thorAgainstVehicle.attack.apModifier === 2 && thorAgainstVehicle.attack.damageModifier === 2, "攻城指挥官对巨兽/载具/工事必须同时提供 S/AP/D +2");

const standardBearerEntry = Object.entries(spaceMarineRules).find(([, rules]) => rules.some((rule) => rule.name === "高举旗帜"));
const standardBearerRule = standardBearerEntry?.[1]?.find((rule) => rule.name === "高举旗帜");
const standardBearerSelections = { [`${standardBearerRule?.id}.enabled`]: true, [`${standardBearerRule?.id}.forceLeader`]: true };
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
  const core = spaceMarineRules[unitName]?.find((rule) => rule.effects?.some((effect) => effect.type === "fnp" && effect.threshold === threshold));
  assert(core && !core.controls?.length, `${unitName}核心不知疼痛必须默认生效`);
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
const genericCaptainCard = structuredSpaceMarineCards.find((card) => card.unit.name === "连长");
assert(essoCard?.unit?.invulnerableSave === 4, "艾索·沙恩必须保留 4++");
assert(subodenCard?.weapons?.some((weapon) => weapon.name === "动力长刀“风暴之牙”" && weapon.type === "melee") && subodenCard.weapons.some((weapon) => weapon.name === "动力剑" && weapon.type === "melee"), "速不台可汗必须保留近战武器");
assert(heavyCaptainCard && heavyCaptainCard.weapons?.some((weapon) => weapon.type === "melee"), "重装连长数据卡必须可被找到并包含近战武器");
assert(["格斗武器", "精工动力武器", "动力拳"].every((name) => genericCaptainCard?.weapons?.some((weapon) => weapon.name === name && weapon.type === "melee")), "通用人物数据卡必须保留近战武器");
const neverYieldRule = spaceMarineRules["重装连长"]?.find((rule) => rule.name === "永不屈服");
const neverYield = resolve(spaceMarineData.faction, "重装连长", {}, { phase: "melee", isJoined: false });
assert(neverYieldRule?.effects?.some((effect) => effect.type === "damage-halving") && !neverYieldRule.controls?.length && neverYield.defend.damageMultiplier === 0.5, "永不屈服必须作为默认的被分配攻击 D 减半");

// 2026-08 audit regression: previously-missing/incorrect skill implementations
const kanoCore = spaceMarineRules["卡诺克.瓦"]?.find((rule) => rule.effects?.some((effect) => effect.type === "fnp" && effect.threshold === 5));
assert(kanoCore && !kanoCore.controls?.length, "卡诺克.瓦核心不知疼痛5+必须默认生效（不觉疼痛）");
const coldCalculus = spaceMarineRules["卡诺克.瓦"]?.find((rule) => rule.name === "冷酷演算");
assert(coldCalculus?.effects?.some((effect) => effect.type === "lethal-hits" && effect.requiresTargetMonsterVehicle)
  && coldCalculus?.effects?.some((effect) => effect.type === "sustained-hits" && effect.unlessTargetMonsterVehicle), "冷酷演算必须按目标类型二选一（巨兽/载具致命一击，其余连击1）");
for (const priest of ["牧师", "终结者牧师", "摩托牧师", "跳跃背包牧师"]) {
  const hatred = spaceMarineRules[priest]?.find((rule) => rule.name === "憎恨祷言");
  assert(hatred?.effects?.some((effect) => effect.type === "wound-modifier" && effect.value === 1), `${priest}憎恨祷言必须提供近战造伤+1`);
}
const faith = spaceMarineRules["终结者牧师"]?.find((rule) => rule.name === "信仰护体");
assert(faith?.effects?.some((effect) => effect.type === "fnp-mortal" && effect.threshold === 4) && !faith?.effects?.some((effect) => effect.type === "fnp"), "信仰护体必须仅对致命伤害提供不知疼痛4+，不能作用于普通伤害");
assert(spaceMarineRules["生物学药剂师"]?.some((rule) => rule.effects?.some((effect) => effect.type === "lethal-hits")), "手术式精准必须提供致命一击");
const undying = spaceMarineRules["旗手"]?.find((rule) => rule.name === "不休职责");
assert(undying?.effects?.some((effect) => effect.type === "fnp" && effect.threshold === 4), "旗手不休职责必须提供条件性不知疼痛4+");
const honorGuard = spaceMarineRules["常胜荣誉卫队"]?.find((rule) => rule.name === "极限战士荣誉卫队");
assert(honorGuard?.effects?.some((effect) => effect.type === "incoming-wound-minus"), "极限战士荣誉卫队必须提供被领导时的造伤-1");
const macragge = spaceMarineRules["常胜荣誉卫队"]?.find((rule) => rule.name === "马库拉格旗帜");
assert(macragge?.effects?.some((effect) => effect.type === "attack-modifier") && macragge?.effects?.some((effect) => effect.type === "weapon-strength-modifier"), "马库拉格旗帜必须提供近战武器 S 和 A 都+1");
const stubborn = spaceMarineRules["重装仲裁者小队"]?.find((rule) => rule.name === "拒不屈服");
assert(stubborn?.effects?.some((effect) => effect.type === "save-bonus-vs-d1"), "拒不屈服必须提供对抗 D1 攻击的护甲+1");
const closeRange = spaceMarineRules["侵略者小队"]?.find((rule) => rule.name === "近距离火力");
assert(closeRange?.effects?.some((effect) => effect.type === "weapon-ap-modifier" && effect.value === 1), "近距离火力必须提供 AP+1");
const totalAnnihilation = spaceMarineRules["根除者小队"]?.find((rule) => rule.name === "完全湮灭");
assert(totalAnnihilation?.effects?.some((effect) => effect.type === "damage-reroll")
  && totalAnnihilation.effects.every((effect) => effect.requiresTargetMonsterVehicle), "完全湮灭必须提供对巨兽/载具的命中、造伤和破坏力重投");
const chainRage = spaceMarineRules["终结者小队"]?.find((rule) => rule.name === "一连之怒");
assert(chainRage?.effects?.some((effect) => effect.type === "hit-modifier" && effect.value === 1), "一连之怒必须通过通用命中修正提供对破敌重誓目标的命中+1");
const suppressor = spaceMarineRules["压制者小队"]?.find((rule) => rule.name === "压制火力");
assert(suppressor?.effects?.some((effect) => effect.type === "incoming-hit-minus" && !effect.phase), "压制火力不能被限定为仅远程");
const eternalDuty = spaceMarineRules["救赎者型无畏机甲"]?.find((rule) => rule.name === "永恒职责");
const toughArmor = spaceMarineRules["风暴鸦炮艇"]?.find((rule) => rule.name === "坚韧装甲");
assert(eternalDuty?.effects?.some((effect) => effect.type === "damage-minus") && toughArmor?.effects?.some((effect) => effect.type === "damage-minus"), "永恒职责/坚韧装甲必须提供破坏力-1");
const saboteur = spaceMarineRules["破坏者型猎食者坦克"]?.find((rule) => rule.name === "破坏者");
assert(saboteur?.effects?.some((effect) => effect.type === "ap-vs-infantry" && effect.requiresTargetInfantry), "破坏者必须提供对步兵的 AP+1");
const annihilator = spaceMarineRules["歼灭者型猎食者坦克"]?.find((rule) => rule.name === "歼灭者");
assert(annihilator?.effects?.some((effect) => effect.type === "damage-reroll" && effect.requiresTargetMonsterVehicle), "歼灭者必须提供对巨兽/载具的破坏力重投");
const executioner = spaceMarineRules["处决者型反击者坦克"]?.find((rule) => rule.name === "处决者");
assert(executioner?.effects?.some((effect) => effect.type === "hit-modifier" && effect.condition === "targetBelowHalf"), "处决者必须提供对低于半数目标的命中+1");
const porcupine = spaceMarineRules["豪猪装甲车"]?.find((rule) => rule.name === "火力支援");
assert(porcupine?.effects?.some((effect) => effect.type === "wound-reroll") && !porcupine?.effects?.some((effect) => effect.type === "hit-reroll"), "豪猪火力支援只能提供造伤重投，不得附带命中重投");
const heroics = spaceMarineRules["剑卫旗手"]?.find((rule) => rule.name === "英雄伟业");
assert(heroics?.effects?.some((effect) => effect.type === "attack-modifier") && !heroics?.effects?.some((effect) => effect.requiresJoined), "英雄伟业不得误加 requiresJoined");
const bladeguard = spaceMarineRules["剑卫老兵小队"]?.find((rule) => rule.name === "剑卫");
const bladeguardHit = resolve("星际战士", "剑卫老兵小队", { [`${bladeguard?.id}.mode`]: "hit-ones" }, { phase: "melee" });
const bladeguardSave = resolve("星际战士", "剑卫老兵小队", { [`${bladeguard?.id}.mode`]: "save-ones" }, { phase: "melee" });
assert(bladeguard?.controls?.some((control) => control.id === "mode" && control.type === "select"), "剑卫必须用二选一控件表达命中1或特殊保护1重投");
assert(bladeguardHit.attack.hitReroll === "ones" && !bladeguardHit.defend.saveReroll
  && bladeguardSave.defend.saveReroll === "ones" && !bladeguardSave.attack.hitReroll, "剑卫的两种重投选项必须互斥且分别进入攻击/防御载荷");

const objectiveAnnihilation = spaceMarineRules["仲裁者小队"]?.find((rule) => rule.name === "目标歼灭");
assert(objectiveAnnihilation?.effects?.some((effect) => effect.type === "weapon-attack-modifier" && effect.weaponName === "爆弹步枪" && effect.value === 2 && effect.phase === "ranged")
  && !objectiveAnnihilation?.effects?.some((effect) => effect.type === "attack-modifier"), "目标歼灭必须只给远程爆弹步枪 A+2");
const objectiveAnnihilationResolved = resolve("星际战士", "仲裁者小队", { [`${objectiveAnnihilation?.id}.enabled`]: true }, { phase: "ranged" });
const scopedAttackModifier = context.WarhammerCombatState.weaponAttackModifier;
assert(typeof scopedAttackModifier === "function"
  && scopedAttackModifier(objectiveAnnihilationResolved.attack.weaponAttackModifiers, "爆弹步枪") === 2
  && scopedAttackModifier(objectiveAnnihilationResolved.attack.weaponAttackModifiers, "爆弹手枪") === 0, "武器范围 A 修正必须按稳定武器字段装配，不能泄漏到同单位其他武器");
for (const [unitName, ruleName] of [["侵略者小队", "近距离火力"], ["根除者小队", "完全湮灭"], ["射手型无畏机甲", "射手轰炸"], ["破坏者型猎食者坦克", "破坏者"]]) {
  const rule = spaceMarineRules[unitName]?.find((candidate) => candidate.name === ruleName);
  assert(rule?.effects?.every((effect) => effect.phase === "ranged"), `${unitName}·${ruleName} 的攻击效果必须限定为远程阶段`);
}
const wisdom = spaceMarineRules["无畏机甲"]?.find((rule) => rule.name === "长者智慧【光环】");
assert(wisdom && !wisdom.effects?.length && !wisdom.controls?.length, "长者智慧作用于另一个友军步兵单位，不能错误强化无畏机甲自身");

// 死亡守卫审计回归
const dgUnitRules = context.WarhammerDeathGuardRules?.unitRules || {};
const typhusDefend = resolve("死亡守卫", "泰弗斯", { "death-guard-p25-1.enabled": true, "death-guard-p25-1.forceLeader": true }, { phase: "melee", isJoined: false });
assert(typhusDefend.defend.incomingHitModifier === -1, "泰弗斯毁灭虫群必须提供近战命中-1");
assert(dgUnitRules["混沌犀牛战车"]?.find((rule) => rule.name === "火力支援")?.effects?.some((effect) => effect.type === "wound-reroll")
  && !dgUnitRules["混沌犀牛战车"]?.find((rule) => rule.name === "火力支援")?.effects?.some((effect) => effect.type === "hit-reroll"), "犀牛火力支援只能提供造伤重投");
const scribe = dgUnitRules["书记官"]?.find((rule) => rule.name === "恶意计算");
assert(scribe?.effects?.some((effect) => effect.type === "ignore-hit-modifiers"), "书记官恶意计算必须提供无视命中修正");
const silent = dgUnitRules["死亡寿衣终结者"]?.find((rule) => rule.name === "无声护卫");
assert(silent?.effects?.some((effect) => effect.type === "leader-fnp" && effect.threshold === 4) && !silent?.effects?.some((effect) => effect.type === "fnp"), "无声护卫必须把不知疼痛4+授予领导角色而非护卫");
const silentBodyguardGroups = context.WarhammerCombatState.applyLeaderGrantedDefenses([
  { name: "死亡寿衣终结者", isLeader: false, effects: { leaderFeelNoPain: 4, feelNoPainEnabled: false, feelNoPainMortalEnabled: false } },
  { name: "联合角色", isLeader: true, effects: { feelNoPainEnabled: false, feelNoPainMortalEnabled: false } },
  { name: "其他护卫模型档案", isLeader: false, effects: { feelNoPainEnabled: false, feelNoPainMortalEnabled: false } },
]);
const silentGuardGroup = silentBodyguardGroups.find((group) => group.name === "死亡寿衣终结者");
const silentLeaderGroup = silentBodyguardGroups.find((group) => group.name === "联合角色");
assert(!silentGuardGroup.effects.feelNoPainEnabled && !silentGuardGroup.effects.feelNoPainMortalEnabled, "无声护卫不得让死亡寿衣护卫自身获得不知疼痛4+");
assert(silentLeaderGroup.effects.feelNoPainEnabled && silentLeaderGroup.effects.feelNoPainThreshold === 4
  && silentLeaderGroup.effects.feelNoPainMortalEnabled && silentLeaderGroup.effects.feelNoPainMortalThreshold === 4, "无声护卫必须只把不知疼痛4+授予联合单位中的领导角色");
const silentWithoutLeader = context.WarhammerCombatState.applyLeaderGrantedDefenses([
  { name: "死亡寿衣终结者", isLeader: false, effects: { leaderFeelNoPain: 4, feelNoPainEnabled: false, feelNoPainMortalEnabled: false } },
]);
assert(!silentWithoutLeader[0].effects.feelNoPainEnabled, "死亡寿衣没有被角色领导时不得获得无声护卫的不知疼痛");
const silentWithBetterLeaderFnp = context.WarhammerCombatState.applyLeaderGrantedDefenses([
  { name: "死亡寿衣终结者", isLeader: false, effects: { leaderFeelNoPain: 4 } },
  { name: "已有更好FNP的角色", isLeader: true, effects: { feelNoPainEnabled: true, feelNoPainThreshold: 3, feelNoPainMortalEnabled: true, feelNoPainMortalThreshold: 3 } },
]);
assert(silentWithBetterLeaderFnp[1].effects.feelNoPainThreshold === 3 && silentWithBetterLeaderFnp[1].effects.feelNoPainMortalThreshold === 3, "无声护卫不得把角色自身更好的不知疼痛降级为4+");
assert(dgUnitRules["死亡寿衣终结者"]?.find((rule) => rule.name === "死亡降临")?.id === "death-guard.deathshroud-terminators.death-approaches"
  && silent?.id === "death-guard.deathshroud-terminators.silent-bodyguard", "死亡寿衣终结者已存在的官网英文技能必须优先生成 official 稳定 ID");
assert(dgUnitRules["瘟疫战士"]?.find((rule) => rule.name === "纳垢赐福灌注")?.id === "death-guard.plague-marines.infused-with-the-blessings-of-nurgle", "瘟疫战士官网技能必须优先于本地暂译名匹配");
const malice = dgUnitRules["地狱兽"]?.find((rule) => rule.name === "疫病恶意");
assert(malice?.effects?.some((effect) => effect.type === "wound-modifier" && effect.requiresTargetInfected), "疫病恶意必须要求目标已感染");
const virulent = dgUnitRules["大不净者"]?.find((rule) => rule.name === "纳垢之腐（灵能）");
assert(virulent?.effects?.some((effect) => effect.type === "target-toughness-modifier" && effect.value === -1), "纳垢之腐必须提供目标T-1");
const poison = dgUnitRules["烂格斯"]?.find((rule) => rule.name === "剧毒赐福（灵能）");
assert(poison?.effects?.some((effect) => effect.type === "damage-modifier" && effect.value === 1), "剧毒赐福必须提供伤害D+1");
const trickster = dgUnitRules["纳垢灵"]?.find((rule) => rule.name === "恶作剧制造者");
assert(trickster?.effects?.some((effect) => effect.type === "incoming-hit-minus" && effect.phase === "melee") && !trickster?.effects?.some((effect) => effect.type === "hit-modifier"), "恶作剧制造者必须通过通用近战防守修正实现，不得惩罚纳垢灵自身命中");

const virulentAura = dgUnitRules["病毒领主"]?.find((rule) => /剧毒光环/.test(rule.name));
const virulentSelections = { [`${virulentAura?.id}.enabled`]: true, [`${virulentAura?.id}.forceLeader`]: true };
assert(resolve("死亡守卫", "病毒领主", virulentSelections, { phase: "ranged", isJoined: false }).attack.woundReroll === "failed"
  && resolve("死亡守卫", "病毒领主", virulentSelections, { phase: "melee", isJoined: false }).attack.woundReroll === null, "病毒光环的造伤重投只能影响远程攻击");
const blightlordVolleySelections = { [`${blightlordVolley?.id}.enabled`]: true, [`${blightlordVolley?.id}.targetInfected`]: true };
assert(resolve("死亡守卫", "腐毒领主终结者", blightlordVolleySelections, { phase: "ranged", initialModelCount: 5 }).attack.strengthModifier === 1
  && resolve("死亡守卫", "腐毒领主终结者", blightlordVolleySelections, { phase: "melee", initialModelCount: 5 }).attack.strengthModifier === 0, "炽烈连射的武器加成只能影响远程攻击");
const tankHunterSelections = { [`${tankHunters?.id}.enabled`]: true, [`${tankHunters?.id}.targetMonsterVehicle`]: true };
assert(resolve("死亡守卫", "恶臭疫病引擎", tankHunterSelections, { phase: "ranged" }).attack.hitModifier === 1
  && resolve("死亡守卫", "恶臭疫病引擎", tankHunterSelections, { phase: "melee" }).attack.hitModifier === 0, "坦克猎手的命中与造伤加成只能影响远程攻击");
const inflamedInfections = dgUnitRules["瘟疫军医"]?.find((rule) => rule.name === "感染激化");
const inflamedSelections = { [`${inflamedInfections?.id}.enabled`]: true, [`${inflamedInfections?.id}.targetBelowHalf`]: true };
const inflamedMelee = resolve("死亡守卫", "瘟疫军医", inflamedSelections, { phase: "melee" });
const inflamedRanged = resolve("死亡守卫", "瘟疫军医", inflamedSelections, { phase: "ranged" });
assert(inflamedMelee.attack.hitCriticalThreshold === 4 && !inflamedMelee.defend.hitCriticalThreshold && !inflamedRanged.attack.hitCriticalThreshold, "感染激化只能降低己方近战攻击的暴击命中阈值，不能强化敌方攻击");

// 禁军审计回归
const aleyaPsychic = resolve("帝皇禁军", "艾雷雅", { "custodes-aleya-deep.psychic": true }, { phase: "melee", isJoined: false });
const aleyaPlain = resolve("帝皇禁军", "艾雷雅", {}, { phase: "melee", isJoined: false });
assert(aleyaPlain.defend.feelNoPain === 5 && aleyaPsychic.defend.feelNoPain === 3 && aleyaPsychic.defend.feelNoPainMortal === 3, "深渊之女对灵能攻击必须覆盖为基础不知疼痛3+");
assert(context.WarhammerCustodesRules.unitRules["警戒者"]?.length && !context.WarhammerCustodesRules.unitRules["戒卫者"], "禁军警戒者/戒卫者重复卡必须合并为警戒者");
const trajannCoreDefend = resolve("帝皇禁军", "图拉真元帅", {}, { phase: "melee" });
assert(trajannCoreDefend.defend.feelNoPain === 5 && trajannCoreDefend.defend.feelNoPainMortal === 5, "通用不知疼痛必须同时防止普通伤害与致命伤害");
const prosecutorPurity = context.WarhammerCustodesRules.unitRules["控诉者"]?.find((rule) => /净化处决/.test(rule.name));
const puritySelections = { [`${prosecutorPurity?.id}.enabled`]: true, [`${prosecutorPurity?.id}.targetPsychic`]: true };
assert(resolve("帝皇禁军", "控诉者", puritySelections, { phase: "ranged" }).attack.devastating
  && !resolve("帝皇禁军", "控诉者", puritySelections, { phase: "melee" }).attack.devastating, "纯净处决的毁灭伤害只能影响远程攻击");

const spacedKeywords = context.WarhammerKeywordDictionary.parse(["毁灭伤 害", "洪流"]);
assert(spacedKeywords.some((effect) => effect.type === "devastating-wounds"), "核心词条解析必须容忍 PDF 在毁灭伤害中插入空格");
assert(spacedKeywords.some((effect) => effect.type === "torrent"), "核心词条字典必须识别洪流的官方中文名");
const allCoreWeaponAbilities = context.WarhammerKeywordDictionary.parse([
  "针对载具4+", "突击", "爆炸2", "劈砍1", "近距离", "毁灭伤害", "额外攻击", "危险", "重型",
  "无视掩体", "曲射", "骑枪", "致命一击", "热熔2", "单发", "手枪", "精准", "灵能", "速射3", "连击2", "洪流", "双联",
]);
for (const type of [
  "anti-keyword", "assault", "blast", "cleave", "close-range", "devastating-wounds", "extra-attacks", "hazardous", "heavy",
  "ignores-cover", "indirect-fire", "lance", "lethal-hits", "melta", "one-shot", "pistol", "precision", "psychic", "rapid-fire",
  "sustained-hits", "torrent", "twin-linked",
]) assert(allCoreWeaponAbilities.some((effect) => effect.type === type), `核心词条字典必须声明 ${type} 的稳定语义`);

const halfRangeProfile = context.WarhammerKeywordDictionary.resolve(["速射3", "热熔2"], { targetWithinHalfRange: true });
assert(halfRangeProfile.attackModifier === 3 && halfRangeProfile.damageModifier === 2, "半射程内必须同时结算速射额外攻击和热熔伤害");
const crowdProfile = context.WarhammerKeywordDictionary.resolve(["爆炸2", "劈砍1"], { targetModelCount: 16, allAttacksSameTarget: true });
assert(crowdProfile.attackModifier === 9, "爆炸2与劈砍1对16模型目标必须分别增加6和3次攻击");
const heavyProfile = context.WarhammerKeywordDictionary.resolve(["重型", "无视掩体"], { mode: "ranged", targetHasCover: true, attackerMovedOver3: false, attackerDeployedThisTurn: false, attackerEngaged: false });
assert(heavyProfile.hitModifier === 1, "满足重型条件且武器无视掩体时必须只获得命中+1");
const lanceProfile = context.WarhammerKeywordDictionary.resolve(["骑枪"], { mode: "melee", attackerCharged: true });
assert(lanceProfile.woundModifier === 1, "骑枪必须在本回合冲锋后提供造伤+1");
const indirectProfile = context.WarhammerKeywordDictionary.resolve(["曲射"], { mode: "ranged", usingIndirectFire: true, attackerRemainedStationary: false });
assert(indirectProfile.unmodifiedHitThreshold === 6 && indirectProfile.preventHitRerolls && indirectProfile.grantsTargetCover, "曲射必须强制未修正6命中、禁止命中重投并给予目标掩体");
const closeRangeProfile = context.WarhammerKeywordDictionary.resolve(["近距离"], { mode: "ranged", attackerEngaged: true, attackerMonsterVehicle: false });
const invalidEngagedProfile = context.WarhammerKeywordDictionary.resolve(["速射1"], { mode: "ranged", attackerEngaged: true, attackerMonsterVehicle: false });
assert(closeRangeProfile.canAttack && !invalidEngagedProfile.canAttack, "非凶兽/载具处于交战状态时只能使用近距离/手枪武器");
const validSplitFire = context.WarhammerCombatState.validateRangedWeaponAllocation({ modelCount: 5, closeRangeModelCounts: [1], otherModelCounts: [4] });
const overlappingCarry = context.WarhammerCombatState.validateRangedWeaponAllocation({ modelCount: 5, closeRangeModelCounts: [5], otherModelCounts: [5] });
const overCapacityRanged = context.WarhammerCombatState.validateRangedWeaponAllocation({ modelCount: 3, closeRangeModelCounts: [4], otherModelCounts: [0] });
assert(validSplitFire.valid && overlappingCarry.valid && !overCapacityRanged.valid, "每个模型射击时在手枪与其他远程武器间二选一，同一模型同时携带两组武器只计一次，武器组需求超过模型数才非法");
const validExtraAttacks = context.WarhammerCombatState.validateMeleeWeaponAllocation({ modelCount: 3, extraAttackModelCounts: [3, 3], otherModelCounts: [3] });
const overlappingMeleeCarry = context.WarhammerCombatState.validateMeleeWeaponAllocation({ modelCount: 3, extraAttackModelCounts: [3], otherModelCounts: [3, 1] });
const overCapacityMelee = context.WarhammerCombatState.validateMeleeWeaponAllocation({ modelCount: 2, extraAttackModelCounts: [2], otherModelCounts: [3] });
assert(validExtraAttacks.valid && overlappingMeleeCarry.valid && !overCapacityMelee.valid, "每个模型可使用全部额外攻击武器加至多一件其他近战武器，同一模型携带多件其他近战武器只计一次，需求超过模型数才非法");
const optionalPlasmaProfiles = context.WarhammerCombatState.initializeOptionalExclusiveWeapons([
  { name: "等离子手枪（标准）", selectionGroup: "等离子手枪", enabled: true },
  { name: "等离子手枪（过载）", selectionGroup: "等离子手枪", enabled: true },
  { name: "精工爆弹枪", enabled: true },
]);
assert(optionalPlasmaProfiles.find((weapon) => weapon.name === "等离子手枪（标准）").enabled
  && !optionalPlasmaProfiles.find((weapon) => weapon.name === "等离子手枪（过载）").enabled
  && optionalPlasmaProfiles.find((weapon) => weapon.name === "精工爆弹枪").enabled, "单位携带互斥武器组时必须默认选中首个档案（如泰丰斯悲泣战镰重击/横扫），并保留其他武器选择");
const notCarriedPlasmaProfiles = context.WarhammerCombatState.initializeOptionalExclusiveWeapons([
  { name: "等离子手枪（标准）", selectionGroup: "等离子手枪", enabled: false },
  { name: "等离子手枪（过载）", selectionGroup: "等离子手枪", enabled: false },
]);
assert(notCarriedPlasmaProfiles.every((weapon) => weapon.enabled === false), "单位未携带互斥武器组时必须保持全部不选，不能强制选中");
const explicitDefaultProfile = context.WarhammerCombatState.initializeOptionalExclusiveWeapons([
  { name: "标准", selectionGroup: "等离子", enabled: true, defaultSelected: true },
  { name: "过载", selectionGroup: "等离子", enabled: true },
]);
assert(explicitDefaultProfile[0].enabled && !explicitDefaultProfile[1].enabled, "显式 defaultSelected 必须优先于默认选中首项");
const advancedAssault = context.WarhammerKeywordDictionary.resolve(["突击"], { mode: "ranged", attackerAdvanced: true });
const advancedHeavy = context.WarhammerKeywordDictionary.resolve(["重型"], { mode: "ranged", attackerAdvanced: true });
assert(advancedAssault.canAttack && !advancedHeavy.canAttack, "突进后必须只能选择突击武器");
const psychicProfile = context.WarhammerKeywordDictionary.resolve(["灵能"], { mode: "ranged" });
assert(psychicProfile.isPsychic && psychicProfile.ignoreNegativeHitModifiers, "灵能武器必须标记灵能攻击并允许忽略不利命中修正");
const lifecycleProfile = context.WarhammerKeywordDictionary.resolve(["单发", "危险", "精准", "额外攻击"], { oneShotUsed: true, precisionTargetsCharacter: true });
assert(!lifecycleProfile.canAttack && lifecycleProfile.isHazardous && lifecycleProfile.targetsCharacter && lifecycleProfile.isExtraAttacks, "单发、危险、精准和额外攻击必须进入生命周期/分配语义");
const conditionalLethalVsVehicle = context.WarhammerKeywordDictionary.toWeaponPayload(["致命一击：载具"], ["载具"]);
const conditionalLethalVsInfantry = context.WarhammerKeywordDictionary.toWeaponPayload(["致命一击：载具"], ["步兵"]);
const conditionalSustained = context.WarhammerKeywordDictionary.toWeaponPayload(["连击1：步兵/野兽"], ["野兽"]);
assert(conditionalLethalVsVehicle.lethalHitsEnabled && !conditionalLethalVsInfantry.lethalHitsEnabled && conditionalSustained.sustainedHitsEnabled, "带关键词后缀的通用武器能力必须只对匹配目标生效");
assert(!context.WarhammerKeywordDictionary.parse(["反灵能者2+"]).some((effect) => effect.type === "psychic"), "反灵能者不能把普通武器误标记为灵能攻击");
assert(typeof context.WarhammerCombatState.composeWoundModifier === "function"
  && context.WarhammerCombatState.composeWoundModifier({ unitModifier: 1, factionModifier: 0, incomingModifier: 0, conditionalModifier: 0 }) === 1, "造伤修正必须通过单一归约入口组合，同一单位修正不能重复计入");

for (const rule of [...custodesRuleList, ...spaceMarineRuleList, ...deathGuardRuleList, ...orksRuleList]) {
  assert(!(rule.legacyIds || []).includes(rule.id), `${rule.id} 不得把当前稳定 ID 重复记录为 legacy alias`);
}

const enabledSkullsquirm = context.WarhammerRuleResolver.resolveFaction("死亡守卫", {
  "death-guard-nurgles-gift.enabled": true,
  "death-guard-nurgles-gift.plague": "skullsquirm",
}, { phase: "melee" });
assert(enabledSkullsquirm.attack.targetMeleeHitModifier === -1 && enabledSkullsquirm.attack.targetHitModifier === 0, "扭颅疫病必须只产出近战攻击命中-1");
assert(context.WarhammerRuleEffects.defenderAttackModifiers(enabledSkullsquirm, "melee").hitModifier === -1, "死亡守卫作为防御方时，头骨痉挛必须映射到进攻方近战命中修正");
assert(context.WarhammerRuleEffects.defenderAttackModifiers(enabledSkullsquirm, "ranged").hitModifier === 0, "扭颅疫病不得影响远程命中");

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
