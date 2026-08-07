import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const readJson = (...parts) => JSON.parse(fs.readFileSync(path.join(root, ...parts), "utf8"));

const custodesProfiles = readJson("docs", "data", "帝皇禁军", "帝皇禁军-结构化数据卡.json");
const spaceMarines = readJson("docs", "data", "星际战士", "星际战士-全部数据卡.json");
const deathGuard = readJson("docs", "data", "死亡守卫", "死亡守卫-全部数据卡.json");
const catalogContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "docs", "calculator-catalog.js"), "utf8"), catalogContext);
const catalogCards = catalogContext.window.WARHAMMER_CALCULATOR_CATALOG.flatMap((catalog) => catalog.cards || []);

assert(custodesProfiles.kind === "datasheet-profiles", "禁军结构化数据卡 kind 必须为 datasheet-profiles");
assert(custodesProfiles.schemaVersion === 1, "禁军结构化数据卡 schemaVersion 必须为 1");

const profilesByName = new Map(custodesProfiles.cards.map((card) => [card.name, card]));
for (const [label, profiles, names] of [
  ["帝皇禁军队长成员", custodesProfiles.cards, ["控诉者", "戒卫者", "猎巫者"]],
  ["星际战士队长成员", spaceMarines.cards, ["战术护甲步兵", "常胜荣誉卫队"]],
]) {
  for (const name of names) {
    const card = profiles.find((candidate) => candidate.name === name);
    assert(Array.isArray(card?.modelProfiles) && card.modelProfiles.length >= 2, `${label} ${name} 必须声明队长与普通队员模型配置`);
    assert(card?.modelProfiles?.some((profile) => profile.id === "champion" && Number(profile.count) === 1), `${label} ${name} 缺少队长配置`);
    assert(card?.modelProfiles?.some((profile) => profile.id !== "champion"), `${label} ${name} 缺少普通成员配置`);
  }
}
assert(custodesProfiles.cards.length === 20, "禁军结构化数据卡必须保留 20 份当前档案");
assert(custodesProfiles.cards.filter((card) => Number.isInteger(card.page)).length >= 18, "禁军结构化数据卡至少应保留 18 份带来源页码的档案");

const requiredUnitFields = ["name", "models", "movement", "toughness", "save", "woundsPerModel", "leadership", "objectiveControl"];
const warnings = [];
const validateCard = (card, label, { strictWeapons = false } = {}) => {
  assert(card?.name, `${label} 缺少 name`);
  assert(card?.unit, `${label} 缺少 unit`);
  for (const field of requiredUnitFields) assert(card?.unit?.[field] !== undefined && card?.unit?.[field] !== null && card?.unit?.[field] !== "", `${label} 缺少 unit.${field}`);
  assert(Number(card?.unit?.woundsPerModel) > 0, `${label} 的 woundsPerModel 必须大于 0`);
  if (strictWeapons) assert(Array.isArray(card?.weapons) && card.weapons.length > 0, `${label} 缺少武器档`);
  for (const weapon of card?.weapons || []) {
    for (const field of ["name", "type", "attacks", "skill", "strength", "ap", "damage"]) {
      const valid = weapon?.[field] !== undefined && weapon?.[field] !== null && weapon?.[field] !== "";
      if (strictWeapons) assert(valid, `${label} 的武器缺少 ${field}`);
      else if (!valid) warnings.push(`${label} 的武器 ${weapon?.name || "未命名"} 缺少 ${field}`);
    }
    const validType = ["ranged", "melee"].includes(weapon?.type);
    if (strictWeapons) assert(validType, `${label} 的武器 ${weapon?.name || "未命名"} type 无效`);
    else if (!validType) warnings.push(`${label} 的武器 ${weapon?.name || "未命名"} type 无效`);
  }
};

custodesProfiles.cards.forEach((card) => validateCard(card, `禁军 ${card.name}`, { strictWeapons: true }));
spaceMarines.cards.filter((card) => card.unit).forEach((card) => validateCard(card, `星际战士 ${card.name}`));
assert(deathGuard.kind === "datasheet-profiles" && deathGuard.schemaVersion === 1, "死亡守卫结构化数据卡必须使用 schemaVersion 1");
const thorCard = catalogCards.find((card) => card.unit?.name === "托尔连长");
const mortarionCard = catalogCards.find((card) => card.unit?.name === "莫塔里安");
const hellbruteCard = deathGuard.cards.find((card) => card.unit?.name === "地狱兽");
assert(thorCard?.factionKeywords?.includes("阿斯塔特修会") && thorCard?.factionKeywords?.includes("帝国之拳"), "托尔连长必须保留阵营关键词");
assert(thorCard?.keywords?.includes("步兵") && thorCard?.keywords?.includes("人物"), "托尔连长必须保留单位关键词");
assert(mortarionCard?.factionKeywords?.includes("死亡守卫") && mortarionCard?.keywords?.includes("凶兽"), "莫塔里安必须保留阵营和单位关键词");
for (const name of ["莱山德连长", "罗伯特·基里曼", "重装连长", "终结者连长", "跳跃背包连长"]) {
  const card = catalogCards.find((candidate) => candidate.unit?.name === name);
  assert(card?.unit?.invulnerableSave === 4, `${name} 必须保留 4+ 特殊保护（PDF 技能原文）`);
}
const lysanderCard = catalogCards.find((card) => card.unit?.name === "莱山德连长");
assert(lysanderCard?.unit?.abilities?.includes("本模型拥有4+特殊保护"), "莱山德连长技能原文必须包含基础 4+ 特殊保护");
assert(lysanderCard?.unit?.abilities?.includes("金刚不破"), "莱山德连长技能原文必须保留金刚不破");
const leadingPdfWatermark = /^[\s]*[\u8001\u6e7f\u8150\u9524\u6218\u7fa4](?=\s*[\u4e00-\u9fffA-Za-z0-9])/;
assert(!catalogCards.some((card) => leadingPdfWatermark.test(card.unit?.defaultEquipment || "")), "默认装备不应残留 PDF 水印片段");
assert(!catalogCards.some((card) => /[\u6e7f](?=和)/.test(card.unit?.defaultEquipment || "")), "默认装备不应残留嵌入式 PDF 水印片段");
assert(!catalogCards.some((card) => [...(card.factionKeywords || []), ...(card.keywords || [])].some((value) => leadingPdfWatermark.test(value))), "关键词不应残留 PDF 水印片段");
assert(hellbruteCard?.weapons?.filter((weapon) => weapon.type === "melee").length === 4, "地狱兽必须保留数据卡上的 4 把近战武器");
assert(hellbruteCard?.weapons?.some((weapon) => weapon.name === "地狱兽铁拳" && weapon.type === "melee"), "地狱兽必须包含近战地狱兽铁拳");
assert(deathGuard.cards.length === 36, "死亡守卫数据卡必须覆盖 PDF 中的 36 张卡");
const deathshroud = deathGuard.cards.find((card) => card.name === "死亡寿衣终结者");
const plagueMarines = deathGuard.cards.find((card) => card.name === "瘟疫战士");
for (const [label, card] of [["死亡寿衣终结者", deathshroud], ["瘟疫战士", plagueMarines]]) {
  assert(Array.isArray(card?.modelProfiles) && card.modelProfiles.length === 2, `${label} 必须声明队长与普通队员模型配置`);
  assert(card?.modelProfiles?.some((profile) => profile.id === "champion" && Number(profile.count) === 1), `${label} 缺少 1 个队长配置`);
  assert(card?.modelProfiles?.some((profile) => profile.id === "trooper" && profile.remaining === true), `${label} 缺少剩余普通队员配置`);
}
assert(Number(deathshroud?.modelProfiles?.find((profile) => profile.id === "champion")?.weaponMultipliers?.["瘟疫喷射拳套"]) === 2, "死亡寿衣终结者冠军必须有额外一把瘟疫喷射拳套");
const deathGuardNames = new Set();
deathGuard.cards.forEach((card) => {
  assert(!deathGuardNames.has(card.name), `死亡守卫存在重复单位名：${card.name}`);
  deathGuardNames.add(card.name);
  validateCard(card, `死亡守卫 ${card.name}`, { strictWeapons: true });
  for (const weapon of card.weapons || []) {
    if (/洪流|喷射|torrent/i.test((weapon.abilities || []).join(" "))) {
      assert(String(weapon.skill).toLowerCase() === "torrent", `死亡守卫 ${card.name} 的喷射武器必须标记为 torrent`);
    }
  }
});

const bladeChampion = profilesByName.get("剑锋冠军");
const swordModes = bladeChampion?.weapons?.filter((weapon) => weapon.selectionGroup === "宝库之剑") || [];
assert(swordModes.length === 3, "剑锋冠军必须保留宝库之剑的三种互斥模式");
assert(swordModes.some((weapon) => weapon.name.includes("炫光")), "剑锋冠军缺少宝库之剑（炫光）");

const rulesContext = { globalThis: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "docs", "rules", "custodes.js"), "utf8"), rulesContext);
const rules = rulesContext.globalThis.WarhammerCustodesRules?.unitRules || {};
const textFor = (name) => (rules[name] || []).map((rule) => rule.text || "").join("\n");
assert(!/不知疼痛/.test(textFor("阿拉鲁斯终结者")), "阿拉鲁斯终结者不应被错误赋予不知疼痛");
assert(!/不知疼痛/.test(textFor("终结者盾卫连长")), "终结者盾卫连长不应被错误赋予不知疼痛");

if (failures.length) {
  console.error("数据卡校验失败：");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`数据卡校验通过：禁军 ${custodesProfiles.cards.length} 张结构化档案；星际战士 ${spaceMarines.cards.filter((card) => card.unit).length} 张结构化档案。`);
warnings.forEach((warning) => console.warn(`遗留数据警告：${warning}`));
