import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const context = vm.createContext({ console });
context.globalThis = context;

for (const file of [
  "rules/identity.js",
  "rules/faction-registry.js",
  "rules/effect-schema.js",
  "rules/payload-schema.js",
  "rules/keyword-dictionary.js",
  "rules/combat-state.js",
  "rules/factions.js",
]) {
  const filename = path.join(root, "docs", file);
  vm.runInContext(fs.readFileSync(filename, "utf8"), context, { filename });
}

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

assert(context.WarhammerEffectSchema.validateEffect({ type: "hit-modifier", value: 1 }).length === 0, "已注册效果必须通过 schema 校验");
assert(context.WarhammerEffectSchema.validateEffect({ type: "hit-modifier" }).some((error) => error.includes("value")), "缺少必填字段必须失败");
assert(context.WarhammerEffectSchema.validateEffect({ type: "unknown-effect" }).some((error) => error.includes("未注册")), "未知效果类型必须失败而不是静默忽略");
assert(context.WarhammerEffectSchema.validateEffect({ type: "hit-modifier", value: 1, condition: "skill-name-a" }).some((error) => error.includes("condition")), "条件必须使用稳定语义枚举而不是技能名");
assert(context.WarhammerEffectSchema.validateEffect({ type: "hit-modifier", value: 1, selection: { equals: true } }).some((error) => error.includes("controlId")), "selection 必须引用稳定 controlId");
assert(context.WarhammerEffectSchema.validateEffect({ type: "hit-modifier", value: 1, activation: "skill-name-a" }).some((error) => error.includes("activation")), "activation 必须使用受控语义枚举");
assert(context.WarhammerEffectSchema.validateRules([{ id: "test.rule", controls: [], effects: [{ type: "hit-modifier", value: 1, selection: { controlId: "missing", equals: true } }] }]).some((error) => error.includes("missing")), "effect.selection 必须引用同一规则已声明的控件");
assert(!Object.values(context.WarhammerEffectSchema.schemas).some((schema) => schema.owner === "legacy-adapter"), "核心 effect schema 不得继续暴露技能专用 legacy adapter");

const official = context.WarhammerRuleIdentity.create({
  factionId: "adeptus-custodes",
  scopeId: "aleya",
  englishName: "Tenacious Spirit",
  chineseName: "坚毅灵魂",
  sourceUrl: "https://www.40k.app/factions/adeptus-custodes/units/aleya",
  matchStatus: "official",
  legacyIds: ["custodes-aleya-soul"],
});
assert(official.id === "adeptus-custodes.aleya.tenacious-spirit", "官方英文名必须生成稳定的语义 ID");
assert(official.matchStatus === "official" && official.legacyIds[0] === "custodes-aleya-soul", "稳定 ID 必须保留来源状态和旧 ID");

const translated = context.WarhammerRuleIdentity.create({
  factionId: "adeptus-custodes",
  scopeId: "example-unit",
  englishName: "Unyielding Sentinel",
  chineseName: "不屈哨卫",
  matchStatus: "translated-needs-review",
  notes: "40k.app 未找到匹配条目",
});
assert(translated.id === "adeptus-custodes.example-unit.unyielding-sentinel", "暂译英文名也必须生成可用的稳定 ID");
assert(context.WarhammerRuleIdentity.audit([official, translated]).length === 1, "暂译 ID 必须进入待复核清单");

const registry = context.WarhammerFactionRegistry;
assert(registry.list().length === 23, "阵营注册表必须声明网站 23 个阵营包");
assert(registry.resolve("禁军")?.id === "adeptus-custodes", "阵营别名必须解析到稳定阵营 ID");
assert(registry.resolve("Death Guard")?.data?.catalog.endsWith("死亡守卫-全部数据卡.json"), "阵营包必须拥有自己的数据路径");
assert(registry.resolveUnitName("死亡守卫", "泰丰斯") === "泰弗斯", "单位别名必须由阵营包维护");

context.WarhammerTestFactionRules = {
  factionRules: [{ id: "test-faction.army-rule", name: "测试阵营规则", effects: [] }],
  unitRules: { "测试单位": [{ id: "test-faction.test-unit.test-rule", name: "测试技能", effects: [{ type: "hit-modifier", value: 1 }] }] },
};
registry.register({
  id: "test-faction",
  name: "测试阵营",
  aliases: ["Test Faction"],
  rulesGlobal: "WarhammerTestFactionRules",
  data: { catalog: "data/test/datasheets.json" },
  unitAliases: { "测试单位别名": "测试单位" },
});
const packageCountBeforeCollision = registry.list().length;
let aliasCollisionRejected = false;
try {
  registry.register({ id: "conflicting-faction", name: "冲突阵营", aliases: ["Test Faction"] });
} catch {
  aliasCollisionRejected = true;
}
assert(aliasCollisionRejected && registry.list().length === packageCountBeforeCollision, "阵营别名冲突必须在注册前失败且不能留下半注册包");
for (const file of ["rules/effects.js", "rules/resolver.js"]) {
  const filename = path.join(root, "docs", file);
  vm.runInContext(fs.readFileSync(filename, "utf8"), context, { filename });
}
const testFactionRules = context.WarhammerRuleResolver.rulesForUnit("Test Faction", "测试单位别名");
assert(testFactionRules.faction.length === 1 && testFactionRules.unit.length === 1, "运行时注册第四阵营后 resolver 不得需要新增阵营分支");
const testFactionResolved = context.WarhammerRuleResolver.resolveUnit("Test Faction", "测试单位别名", {}, { phase: "ranged" });
assert(testFactionResolved.attack.hitModifier === 1, "第四阵营的通用命中效果必须正常归约");
assert(testFactionResolved.attack.contributions?.some((item) => item.sourceId === "test-faction.test-unit.test-rule" && item.field === "hitModifier" && item.value === 1), "归约结果必须保留稳定规则 ID 和效果贡献");

const appSource = fs.readFileSync(path.join(root, "docs", "app.js"), "utf8");
const indexSource = fs.readFileSync(path.join(root, "docs", "index.html"), "utf8");
const licenseSource = fs.readFileSync(path.join(root, "LICENSE"), "utf8");
const readmeSource = fs.readFileSync(path.join(root, "README.md"), "utf8");
const pagesReadmeSource = fs.readFileSync(path.join(root, "docs", "README.md"), "utf8");
assert(/clone/i.test(licenseSource) && /personal, non-commercial/i.test(licenseSource), "许可证必须明确允许克隆和个人非商业本地使用");
assert(/Commercial use is strictly prohibited/i.test(licenseSource), "许可证必须明确禁止商业使用");
assert(!/MIT License/.test(licenseSource) && !/MIT 开源|开源项目/.test(`${readmeSource}\n${pagesReadmeSource}`), "限制性许可证不得继续标注为 MIT 或开源");
assert([indexSource, readmeSource, pagesReadmeSource].every((source) => source.includes("转载、公开部署或二次分发需事先获得书面授权") && source.includes("禁止商业使用")), "网页和两份 README 必须醒目标注授权与非商业限制");
assert(/WarhammerFactionRegistry\?\.list\(\)/.test(appSource), "app.js 必须从阵营注册表发现数据包");
assert(!/const DATASHEET_FILES = \{/.test(appSource), "app.js 不得继续手写阵营数据卡路径表");
assert(!/const DATASHEET_ALIASES = \{/.test(appSource), "app.js 不得继续手写阵营单位别名表");
assert(!/const CALCULATOR_CARD_FILES = \[/.test(appSource), "app.js 不得继续手写计算器阵营目录");
assert(/WarhammerPayloadSchema\.createWeaponEffects/.test(appSource), "app.js 必须消费统一武器 payload schema");
assert(/WarhammerPayloadSchema\.createDefenderEffects/.test(appSource), "app.js 必须消费统一防守 payload schema");
assert(/WarhammerKeywordDictionary\.parse/.test(appSource), "app.js 必须通过公共词典解析核心武器词条");
assert(/WarhammerKeywordDictionary\.resolve/.test(appSource), "app.js 必须通过公共归约器把通用武器能力与战斗上下文连接");
for (const field of ["targetWithinHalfRange", "attackerAdvanced", "attackerEngaged", "attackerCharged", "targetHasCover", "usingIndirectFire"]) {
  assert(appSource.includes(field), `计算器必须向核心武器能力提供 ${field} 战斗状态`);
}
assert(/WarhammerCombatState\.validateRangedWeaponAllocation/.test(appSource), "常规射击必须按模型数量校验近距离/手枪与其他远程武器二选一");
assert(/WarhammerCombatState\.validateMeleeWeaponAllocation/.test(appSource), "近战必须按模型数量校验所有额外攻击武器加至多一件其他近战武器");
assert(/WarhammerCombatState\.applyLeaderGrantedDefenses/.test(appSource), "护卫授予领导角色的防御效果必须通过公共分组契约装配");
assert(/WarhammerCombatState\.initializeOptionalExclusiveWeapons/.test(appSource), "互斥武器档案必须通过公共的可选互斥初始化契约装配");
assert(!/const inputType = selectionGroup \? "radio"/.test(appSource) && /const inputType = "checkbox"/.test(appSource), "互斥武器档案必须允许取消选择，不能使用强制 radio");
assert(/最多选一项，可不选/.test(appSource), "互斥武器档案 UI 必须明确提示可以不选");
const contextLabels = [...indexSource.matchAll(/data-calc-context="[^"]+"[^>]*\/>\s*<span>([^<]+)<\/span>/g)].map((match) => match[1]);
assert(contextLabels.length === 10 && contextLabels.every((label) => /（【[^】]+】/.test(label)), "每个通用武器规则条件必须用括号标注触发该选择的关键词");
const indirectContextGroup = indexSource.match(/<fieldset[^>]+data-context-keyword="indirect-fire"[\s\S]*?<\/fieldset>/)?.[0] || "";
assert(["usingIndirectFire", "attackerRemainedStationary", "targetVisibleToFriendly"].every((field) => indirectContextGroup.includes(`data-calc-context="${field}"`)), "曲射的三个条件必须显示在同一关键词分组中");
assert(/oneShotUsed/.test(appSource), "[单发]必须拥有武器级已使用状态并阻止再次攻击");
assert(/precisionTargetsCharacter/.test(appSource) && /isCharacter/.test(appSource), "[精准]必须将武器级角色选择连接到防守分配群组");
assert(/lethalAutoWound/.test(appSource), "[致命一击]必须允许玩家决定是否把暴击命中自动转为致伤");
assert(/core-wound/.test(appSource), "[双联]必须允许玩家按骰面选择致伤重投，而不是强制只重投失败骰");
assert(/hazardousSelfDamage/.test(appSource), "[危险]造成的进攻方反噬必须显示在计算结果中");
assert((appSource.match(/WarhammerCombatState\.resolveHit/g) || []).length >= 2, "命中 UI 与 payload 必须共同消费归约状态");
assert(/WarhammerCombatState\.composeWoundModifier/.test(appSource), "app.js 必须通过单一归约入口组合造伤修正，避免成员修正重复计入");
assert(!/function effectiveHitThresholdForDisplay/.test(appSource), "app.js 不得保留第二套命中阈值算法");
assert(!/function unitHasOathOfMoment|oathWoundBonus|data-calc-oath/i.test(appSource), "app.js 不得以破敌重誓名称或专用状态作为行为契约");
assert(!/martialKatah|data-calc-martial|禁军武艺/.test(appSource), "app.js 不得以禁军武艺名称或专用状态作为行为契约");
assert(!/replace\(\/\^死亡守卫|\["帝皇禁军", "白色疤痕", "星际战士", "死亡守卫"\]|const shorthand = faction ===|const digitalSources = \[\s*\{ faction:/m.test(appSource), "app.js 的单位归一化、军表识别、检索与数字数据源必须由阵营注册表驱动");
assert(/function datasheetFactionMatches[\s\S]*WarhammerFactionRegistry\?\.resolve/.test(appSource), "数据卡阵营匹配必须比较注册表稳定 ID");
const effectsSource = fs.readFileSync(path.join(root, "docs", "rules", "effects.js"), "utf8");
assert(!/case "(?:time-lock|guard-wound-reroll|elite-wound-reroll|deep-daughter|under-strength-bonuses|anti-psyker-weapons|oath-target-hit-modifier|siege-commander|incoming-melee-hit-minus)"/.test(effectsSource), "核心 effects.js 不得按阵营技能名称维护专用 case");
const resolverSource = fs.readFileSync(path.join(root, "docs", "rules", "resolver.js"), "utf8");
assert(!/adeptus-custodes|space-marines|death-guard|帝皇禁军|星际战士|死亡守卫/.test(resolverSource), "核心 resolver.js 不得认识任何具体阵营 ID 或显示名称");
assert(!/\bisFaction\b/.test(resolverSource), "resolver.js 不得保留无消费者的阵营比较接口");
const stylesSource = fs.readFileSync(path.join(root, "docs", "styles.css"), "utf8");
assert(!/calculator-oath-/.test(stylesSource), "旧破敌重誓专用控件样式不得在通用规则控件迁移后残留");

const engineSource = fs.readFileSync(path.join(root, "docs", "engine.js"), "utf8");
assert(!/const WEAPON_DEFAULTS = \{/.test(engineSource), "engine.js 不得维护第二份武器默认值");
assert(!/const DEFENDER_DEFAULTS = \{/.test(engineSource), "engine.js 不得维护第二份防守默认值");
assert(/payloadSchema\.createWeaponEffects/.test(engineSource), "engine.js 必须消费统一 payload schema");

const weaponDefaults = context.WarhammerPayloadSchema.createWeaponEffects();
assert(weaponDefaults.hitModifierValue === 0 && weaponDefaults.hitRerollAllValues.length === 0, "武器 payload 默认值必须来自单一 schema");
const anotherWeaponDefaults = context.WarhammerPayloadSchema.createWeaponEffects();
weaponDefaults.hitRerollAllValues.push(1);
assert(anotherWeaponDefaults.hitRerollAllValues.length === 0, "schema 生成的数组默认值不得在调用之间共享");

const keywords = context.WarhammerKeywordDictionary.parse(["连击 1", "致命一击", "反步兵 4+", "双联"]);
assert(keywords.some((effect) => effect.type === "sustained-hits" && effect.value === 1), "词典必须解析连击 1");
assert(keywords.some((effect) => effect.type === "lethal-hits"), "词典必须解析致命一击");
assert(keywords.some((effect) => effect.type === "anti-keyword" && effect.target === "infantry" && effect.threshold === 4), "词典必须解析反步兵 4+");
assert(keywords.some((effect) => effect.type === "twin-linked"), "词典必须解析双联");
const antiInfantryPayload = context.WarhammerKeywordDictionary.toWeaponPayload(["反步兵 4+"], ["步兵"]);
assert(antiInfantryPayload.woundCriticalEnabled === true && antiInfantryPayload.criticalWoundThreshold === 4, "反步兵 4+ 必须接到暴击造伤阈值");
assert(!antiInfantryPayload.hitCriticalEnabled && antiInfantryPayload.criticalHitThreshold === undefined, "反 X 不得错误改变暴击命中阈值");

const hit = context.WarhammerCombatState.resolveHit({
  baseTarget: 3,
  modifiers: [
    { sourceId: "adeptus-custodes.vigilators.deft-parry", value: -1 },
    { sourceId: "example.attacker.hit-bonus", value: 1 },
  ],
  reroll: { mode: "failed" },
});
assert(hit.modifierTotal === 0 && hit.effectiveTarget === 3, "命中加减修正必须统一归约");
assert(JSON.stringify(hit.successFaces) === JSON.stringify([3, 4, 5, 6]), "UI 成功骰颜色必须来自归约状态");
assert(JSON.stringify(hit.reroll.faces) === JSON.stringify([1, 2]), "默认失败骰重投必须来自同一归约状态");
assert(hit.contributions.length === 2 && hit.contributions[0].sourceId, "归约结果必须保留效果来源");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("架构契约校验通过：稳定 ID、阵营注册、统一 schema、词条字典与命中归约均符合预期。");
}
