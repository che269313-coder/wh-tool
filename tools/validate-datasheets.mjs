import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const readJson = (...parts) => JSON.parse(fs.readFileSync(path.join(root, ...parts), "utf8"));

const custodesRaw = readJson("docs", "data", "帝皇禁军", "帝皇禁军-全部数据卡.json");
const custodesProfiles = readJson("docs", "data", "帝皇禁军", "帝皇禁军-结构化数据卡.json");
const spaceMarines = readJson("docs", "data", "星际战士", "星际战士-全部数据卡.json");

assert(custodesProfiles.kind === "datasheet-profiles", "禁军结构化数据卡 kind 必须为 datasheet-profiles");
assert(custodesProfiles.schemaVersion === 1, "禁军结构化数据卡 schemaVersion 必须为 1");

const profilesByName = new Map(custodesProfiles.cards.map((card) => [card.name, card]));
for (const card of custodesRaw.cards) assert(profilesByName.has(card.name), `禁军 OCR 卡缺少结构化档案：${card.name}`);

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
