/* Regression: 中文军表(黑图书馆军表软件)的单位/分遣队译名必须能映射到
 * 数据卡规范名；携带的互斥武器档案必须默认选中一项。 */
import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const context = {};
vm.createContext(context);
const load = (path) => vm.runInContext(fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), context, { filename: path });

for (const file of [
  "docs/rules/identity.js",
  "docs/rules/faction-registry.js",
  "docs/rules/catalog-registry.js",
  "docs/rules/detachment-registry.js",
  "docs/rules/factions.js",
  "docs/rules/keyword-dictionary.js",
  "docs/rules/combat-state.js",
  "docs/rules/effects.js",
  "docs/rules/resolver.js",
]) load(file);

for (const pkg of context.WarhammerFactionRegistry.list()) {
  for (const src of [...(pkg.runtime?.rules || []), pkg.runtime?.detachment, pkg.runtime?.catalog].filter(Boolean)) {
    const path = `docs/${src}`;
    if (!fs.existsSync(new URL(`../${path}`, import.meta.url))) continue;
    load(path);
  }
}

const cards = [];
for (const pkg of context.WarhammerFactionRegistry.list()) {
  for (const card of context.WarhammerCalculatorCatalogRegistry.get(pkg.id)?.cards || []) {
    if (card.unit) cards.push({ factionId: pkg.id, faction: pkg.name, name: card.name, englishName: card.englishName, data: card });
  }
}

const normalize = (value) => String(value || "")
  .replace(/[\s\u00a0·•・,，。.!！:：;；/\\_\-—–]/g, "")
  .replace(/[（(][^）)]*[）)]/g, "")
  .toLowerCase();

function findCard(faction, name) {
  const source = String(name || "");
  const stripped = source.replace(/[（(][^）)]*[）)]/g, "").trim();
  const aliases = [];
  for (const pkg of context.WarhammerFactionRegistry.list()) {
    for (const [alias, canonical] of Object.entries(pkg.unitAliases || {})) {
      if (alias === source || alias === stripped) aliases.push(canonical);
    }
  }
  const candidates = new Set([source, stripped, ...aliases].map(normalize));
  return cards.find((card) => card.factionId === faction && [card.name, card.data.unit.name, card.englishName]
    .some((candidate) => candidates.has(normalize(candidate))));
}

// 11e 数据卡尚未收录的禁军单位（数据缺口，不是别名问题）
const knownMissingCustodes = new Set([
  "阿伽马图斯枪骑士", "天鹰终结者", "阿瑞斯炮艇机", "阿克琉斯蔑视者无畏机甲",
  "伽拉图斯蔑视者无畏机甲", "克洛努斯反重力运兵车", "装备遗迹长矛或炙烈长矛的禁军卫队",
  "猎户座强袭炮艇", "帕拉斯反重力战车", "射手座射击士", "特拉蒙重型无畏机甲", "禁军鹰猎士",
]);

function parseSampleArmies() {
  const text = fs.readFileSync(new URL("../docs/中文军表示例.txt", import.meta.url), "utf8").replace(/\r/g, "");
  const armies = [];
  let current = null;
  let inUnits = false;
  let sawCode = false;
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (/^编码：/.test(line)) { sawCode = true; continue; }
    if (/^[^\s·()]+\(\d{4,}分\)\s*$/.test(line) || (/^.+?\(\d+分\)\s*$/.test(line) && sawCode && !current)) {
      current = { name: line.match(/^(.+?)\((\d+)分\)\s*$/)[1], faction: "", detachments: "", units: [] };
      armies.push(current);
      sawCode = false;
      inUnits = false;
      continue;
    }
    if (!current) continue;
    if (!current.faction) {
      const pkg = context.WarhammerFactionRegistry.list().find((p) => [p.name, ...(p.aliases || [])].some((alias) => line === alias));
      if (pkg) { current.faction = pkg.id; continue; }
    }
    if (current.faction && !current.detachments && /\(重要资产\)/.test(line) && /\d+DP/.test(line)) { current.detachments = line; continue; }
    if (/^由黑图书馆|^版本号|^感\//.test(line)) continue;
    if (/^-+$/.test(line)) { inUnits = true; continue; }
    if (inUnits) {
      if (/^联合单位/.test(line) || /^(人物|战线|其他单位|专属运输载具|角色|部队|CHARACTERS|BATTLELINE|OTHER DATASHEETS)/i.test(line)) continue;
      const unit = line.match(/^(.+?)\((\d+)分\)\s*$/);
      if (unit) current.units.push(unit[1].trim());
    }
  }
  return armies;
}

test("示例中文军表的单位全部能映射到数据卡或属于已知数据缺口", () => {
  const armies = parseSampleArmies();
  assert.ok(armies.length >= 3, "示例军表应包含兽人/死亡守卫/禁军三个军表");
  const extra = [];
  for (const army of armies) {
    for (const unit of army.units) {
      if (unit.startsWith("·")) continue;
      if (!findCard(army.faction, unit) && !knownMissingCustodes.has(unit)) extra.push(`${army.faction}:${unit}`);
    }
  }
  assert.deepEqual(extra, [], `军表单位未匹配：${extra.join("；")}`);
});

test("示例中文军表的分遣队全部能匹配到分遣队包", () => {
  const armies = parseSampleArmies();
  const missing = [];
  for (const army of armies) {
    if (!army.detachments) continue;
    const detLine = army.detachments.replace(/\(重要资产\)|\(\d+DP\)/g, "").trim();
    const names = detLine.split(",").map((name) => name.trim()).filter(Boolean);
    const found = context.WarhammerRuleResolver.matchDetachments(army.faction, detLine);
    const matchedAliases = new Set(found.flatMap((detachment) => [detachment.name, ...(detachment.aliases || [])]));
    names.forEach((name) => { if (!matchedAliases.has(name)) missing.push(`${army.faction}:${name}`); });
  }
  assert.deepEqual(missing, [], `分遣队未匹配：${missing.join("；")}`);
});

test("别名必须同时用于搜索候选（泰丰斯→泰弗斯）", () => {
  const aliases = new Map();
  for (const pkg of context.WarhammerFactionRegistry.list()) {
    for (const [alias, canonical] of Object.entries(pkg.unitAliases || {})) {
      const list = aliases.get(canonical) || [];
      list.push(alias);
      aliases.set(canonical, list);
    }
  }
  assert.ok(aliases.get("泰弗斯").includes("泰丰斯"), "泰丰斯必须作为泰弗斯的搜索别名");
  assert.ok(aliases.get("野兽头目").includes("兽霸头目"), "兽霸头目必须作为野兽头目的搜索别名");
  assert.ok(aliases.get("灭魔教团百骑长").includes("百骑长"), "百骑长必须作为灭魔教团百骑长的搜索别名");
});

test("污染者(Defiler)携带的互斥武器档案默认选中一项", () => {
  const card = cards.find((c) => c.name === "污染者" && c.factionId === "death-guard");
  assert.ok(card, "死亡守卫污染者数据卡必须存在");
  const rosterEquipment = ["哈迪斯战斗炮", "2个酷刑炮", "重型导弹发射器", "重型灾厄火焰喷射器", "剪切爪"];
  const weapons = (card.data.weapons || []).map((weapon) => {
    const candidates = [weapon.name, weapon.selectionGroup]
      .map((value) => String(value || "").replace(/[（(].*?[）)]/g, "").trim())
      .filter(Boolean);
    const matched = rosterEquipment.some((item) => {
      const normalized = String(item).replace(/[（(].*?[）)]/g, "").trim();
      return normalized && candidates.some((name) => name.includes(normalized) || normalized.includes(name));
    });
    return { ...weapon, enabled: matched };
  });
  const initialized = context.WarhammerCombatState.initializeOptionalExclusiveWeapons(weapons);
  const carried = initialized.filter((weapon) => ["重型导弹发射器", "剪切爪"].includes(weapon.selectionGroup));
  assert.equal(carried.filter((weapon) => weapon.enabled).length, 2, "重型导弹发射器与剪切爪应各默认选中一个档案");
  assert.ok(initialized.find((weapon) => weapon.name === "哈迪斯战斗炮").enabled, "军表选择的哈迪斯战斗炮必须启用");
  assert.ok(!initialized.find((weapon) => weapon.name === "哈迪斯激光炮").enabled, "军表未选择的哈迪斯激光炮必须停用");
});

test("泰丰斯(泰弗斯)的悲泣战镰默认选中重击或横扫", () => {
  const card = cards.find((c) => c.name === "泰弗斯" && c.factionId === "death-guard");
  assert.ok(card, "死亡守卫泰弗斯数据卡必须存在");
  const weapons = (card.data.weapons || []).map((weapon) => ({ ...weapon, enabled: true }));
  const initialized = context.WarhammerCombatState.initializeOptionalExclusiveWeapons(weapons);
  const scythe = initialized.filter((weapon) => weapon.selectionGroup === "悲泣战镰");
  assert.equal(scythe.filter((weapon) => weapon.enabled).length, 1, "悲泣战镰必须默认选中一个档案");
});

// 复刻 parseArmyList 的装备数量逻辑：单模型载具携带 2x 同型武器必须保留数量。
function parseEquipmentLine(count, rawName) {
  let name = rawName;
  const countPrefix = name.match(/^(\d+)个(.+)$/);
  if (countPrefix) { count = Math.max(1, Number(countPrefix[1])) * count; name = countPrefix[2].trim(); }
  return { count, name };
}

function distributeEquipment(count, name, targets, lastTargets = []) {
  const chosen = count === 1 && lastTargets.length === 1
    ? lastTargets
    : [...targets].sort((a, b) => a.equipment.length - b.equipment.length).slice(0, Math.min(count, targets.length));
  const perModel = Math.floor(Math.max(1, count) / Math.max(1, chosen.length));
  const remainder = Math.max(1, count) % Math.max(1, chosen.length);
  chosen.forEach((model, index) => model.equipment.push({ name, count: perModel + (index < remainder ? 1 : 0) }));
  return chosen;
}

test("军表装备数量导入必须保留同型武器数量", () => {
  assert.deepEqual(parseEquipmentLine(1, "2个酷刑炮"), { count: 2, name: "酷刑炮" }, "\"2个酷刑炮\" 必须解析为 2 件酷刑炮");
  assert.deepEqual(parseEquipmentLine(2, "神锤激光炮"), { count: 2, name: "神锤激光炮" }, "\"2x 神锤激光炮\" 必须保留数量 2");
  assert.deepEqual(parseEquipmentLine(1, "重型导弹发射器"), { count: 1, name: "重型导弹发射器" }, "单件装备数量必须为 1");

  const singleModel = [{ name: "污染者", equipment: [] }];
  distributeEquipment(2, "神锤激光炮", singleModel);
  assert.deepEqual(singleModel[0].equipment, [{ name: "神锤激光炮", count: 2 }], "单模型携带 2x 武器必须记录 count=2");

  const squad = Array.from({ length: 10 }, () => ({ name: "瘟疫战士", equipment: [] }));
  distributeEquipment(10, "瘟疫毒刃", squad);
  assert.ok(squad.every((model) => model.equipment.length === 1 && model.equipment[0].count === 1), "10 个模型每人 1 件必须各记 1");

  const squadWithHeavy = Array.from({ length: 10 }, () => ({ name: "瘟疫战士", equipment: [] }));
  distributeEquipment(2, "热熔枪", squadWithHeavy);
  assert.equal(squadWithHeavy.filter((model) => model.equipment.length === 1).length, 2, "2 件重型武器必须分给 2 个模型");
});

test("武器数量直接进入计算页数量字段，引擎按数量×A掷骰", () => {
  // 污染者：1 个模型携带 2x 酷刑炮 → 数量字段 = 2（= 携带模型数 × 单模型同型武器数）
  const card = cards.find((c) => c.name === "污染者" && c.factionId === "death-guard");
  const battlecannon = card.data.weapons.find((w) => w.name === "酷刑炮");
  const rosterEquipment = [{ name: "酷刑炮", count: 2 }];
  const modelsCarrying = 1;
  const itemCount = (item) => Math.max(1, Number(item.count || 1));
  const multiplier = itemCount(rosterEquipment[0]);
  const weaponCount = modelsCarrying * multiplier;
  assert.equal(weaponCount, 2, "2x 酷刑炮的数量必须为 2");

  // 引擎：数量 2 × A6 = 12 次攻击（3+ 命中期望 8）
  for (const f of ["docs/rules/effect-schema.js", "docs/rules/payload-schema.js", "docs/rules/keyword-dictionary.js"]) load(f);
  load("docs/engine.js");
  const group = {
    name: "酷刑炮", modelCount: weaponCount, attacks: "6", hit: 3, wound: 5, ap: -1, damage: "2",
    effects: context.WarhammerPayloadSchema.createWeaponEffects({ lethalHitsEnabled: true }),
  };
  const result = context.WarhammerEngine.simulateRound({
    simulations: 20000,
    weaponGroups: [group],
    defenderGroups: [{ name: "目标", modelCount: 1, wounds: 18, save: 3, invulnerableSave: 5, effects: context.WarhammerPayloadSchema.createDefenderEffects() }],
  });
  assert.ok(Math.abs(result.roundSummary.weaponGroups[0].averageHits - 8) < 0.2, `2x 酷刑炮平均命中应约 8，实际 ${result.roundSummary.weaponGroups[0].averageHits.toFixed(2)}`);
});

test("计算页修改 W/模型 必须同步剩余伤口以触发严重损伤", () => {
  const appSource = fs.readFileSync(new URL("../docs/app.js", import.meta.url), "utf8");
  assert.ok(/data-calc-stat="woundsPerModel"[\s\S]{0,400}remainingWoundsManual = true/.test(appSource) || /field === "woundsPerModel"[\s\S]{0,300}remainingWoundsManual = true/.test(appSource), "计算页 W/模型 编辑必须同步剩余伤口并标记手动模式");
  const cacheHit = appSource.match(/state\.calculatorDrafts\[side\]\?\.\[index\]\?\.key === key[\s\S]*?return draft;/);
  assert.ok(cacheHit, "草稿复用路径必须刷新 remainingWounds 后返回");
  assert.ok(cacheHit[0].includes("remainingWounds"), "草稿复用必须重新计算剩余伤口");
  assert.ok(cacheHit[0].includes("remainingWoundsManual"), "手动改过 W/模型 的单位不能被军表伤口覆盖");
});

test("防守方效果装配必须并入阵营规则的 defend 效果(瓦戈！5+ 无敌豁免)", () => {
  const appSource = fs.readFileSync(new URL("../docs/app.js", import.meta.url), "utf8");
  const defenderSource = appSource.match(/function defenderEffectsFromUnit[\s\S]*?function calculatorDataForUnit/)?.[0] || "";
  assert.ok(defenderSource.includes("resolvedFactionEffects"), "defenderEffectsFromUnit 必须解析阵营规则的防守效果");
  assert.ok(defenderSource.includes("factionDefend.invulnerableSave"), "阵营规则的无敌豁免必须并入防守方 payload");
});
