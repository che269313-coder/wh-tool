import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

function registryContext() {
  const context = vm.createContext({ console });
  context.globalThis = context;
  vm.runInContext(read("docs/rules/faction-registry.js"), context);
  vm.runInContext(read("docs/rules/factions.js"), context);
  vm.runInContext(read("docs/rules/alias-registry.js"), context);
  return context;
}

test("faction-scoped aliases allow the same name across factions", () => {
  const context = registryContext();
  const registry = context.WarhammerAliasRegistry;
  registry.register({ factionId: "adepta-sororitas", units: { "犀牛装用车": { canonical: "修女会犀牛装甲车", source: "pdf" } } });
  registry.register({ factionId: "chaos-space-marines", units: { "犀牛装用车": { canonical: "混沌犀牛战车", source: "pdf" } } });
  assert.equal(registry.resolveUnit("adepta-sororitas", "犀牛装用车"), "修女会犀牛装甲车");
  assert.equal(registry.resolveUnit("chaos-space-marines", "犀牛装用车"), "混沌犀牛战车");
  const candidates = [...registry.unitCandidates("犀牛装用车")].map((candidate) => [candidate.factionId, candidate.canonical]).sort();
  assert.deepEqual(candidates, [["adepta-sororitas", "修女会犀牛装甲车"], ["chaos-space-marines", "混沌犀牛战车"]]);
  assert.deepEqual(
    JSON.parse(JSON.stringify(registry.unitCandidates("犀牛装用车", "adepta-sororitas"))),
    [{ factionId: "adepta-sororitas", canonical: "修女会犀牛装甲车", source: "pdf", scope: "faction" }],
  );
});

test("faction registry retries aliases after stripping a faction prefix", () => {
  const context = registryContext();
  const registry = context.WarhammerAliasRegistry;
  registry.register({ factionId: "adeptus-custodes", units: { "百骑长": { canonical: "灭魔教团百骑长" } } });
  assert.equal(context.WarhammerFactionRegistry.resolveUnitName("adeptus-custodes", "帝皇禁军百骑长"), "灭魔教团百骑长");
  assert.equal(context.WarhammerFactionRegistry.resolveUnitName("adeptus-custodes", "帝皇禁军百骑长（10）"), "灭魔教团百骑长");
});

test("same-faction conflicting aliases are rejected", () => {
  const context = registryContext();
  const registry = context.WarhammerAliasRegistry;
  registry.register({ factionId: "orks", units: { "老大": { canonical: "战将" } } });
  assert.throws(() => registry.register({ factionId: "orks", units: { "老大": { canonical: "战争老大" } } }), /别名冲突/);
});

test("global aliases resolve across factions and feed the search haystack", () => {
  const context = registryContext();
  const registry = context.WarhammerAliasRegistry;
  registry.register({ factionId: "space-marines", weapons: { "瘟疫毒刃": { canonical: "瘟疫短刀", scope: "global", source: "roster-import" } } });
  assert.equal(registry.resolveWeapon("death-guard", "瘟疫毒刃"), "瘟疫短刀");
  const haystack = registry.haystackFor("weapons", "death-guard");
  assert.ok(haystack.includes("瘟疫毒刃"));
  assert.ok(haystack.includes("瘟疫短刀"));
});

test("app.js consumes the registry instead of hand-built alias tables", () => {
  const app = fs.readFileSync(path.join(root, "docs", "app.js"), "utf8");
  assert.doesNotMatch(app, /const DATASHEET_ALIASES = \{/);
  assert.doesNotMatch(app, /const DATASHEET_CANONICAL_ALIASES = /);
  assert.match(app, /function unitNameCandidates\(name, faction/);
  assert.match(app, /registry\.unitCandidates\(candidate, faction\)\.map\(\(entry\) => entry\.canonical\)/);
  assert.match(app, /function findStructuredCalculatorCard\(name, faction/);
  assert.match(app, /aliasesForCanonical\?\.\("units", card\.name\)/);
  assert.match(app, /resolveUnit\(faction, unitName\)/);
  assert.match(app, /resolveWeapon\("", cleaned\)/);
});

test("digital unit aliases register per faction and page", () => {
  const context = registryContext();
  const registry = context.WarhammerAliasRegistry;
  registry.register({ factionId: "space-marines", digitalUnits: { "65": ["连长"], "119": ["先遣者摩托小队"] } });
  assert.deepEqual(JSON.parse(JSON.stringify(registry.digitalUnitAliases("space-marines"))), { "65": ["连长"], "119": ["先遣者摩托小队"] });
  const all = registry.allDigitalUnitAliases();
  assert.ok(all["space-marines"]);
  assert.deepEqual(JSON.parse(JSON.stringify(registry.digitalUnitAliases("death-guard"))), {});
});

test("detachment aliases resolve faction-scoped to the canonical name", () => {
  const context = registryContext();
  const registry = context.WarhammerAliasRegistry;
  vm.runInContext(read("docs/aliases/index.js"), context);
  assert.equal(registry.resolveDetachment("adeptus-custodes", "Shield Host"), "盾卫军团");
  assert.equal(registry.resolveDetachment("adeptus-custodes", "盾卫军团"), "盾卫军团");
  assert.equal(registry.resolveDetachment("adeptus-custodes", "不存在"), "不存在");
});

test("runtime does not rebuild detachment aliases from a second source", () => {
  const app = read("docs/app.js");
  assert.doesNotMatch(app, /registerDetachmentAliases/);
  const registry = read("docs/rules/alias-registry.js");
  assert.doesNotMatch(registry, /function registerDetachmentAliases/);
  const resolver = read("docs/rules/resolver.js");
  assert.match(resolver, /aliasesForCanonical\("detachments"/);
  assert.doesNotMatch(resolver, /detachment\.aliases/);
});

test("canonical display names normalize variants incl. numeric suffixes", () => {
  const context = registryContext();
  const registry = context.WarhammerAliasRegistry;
  registry.registerTerms([
    { display: "不知疼痛", aliases: ["不觉疼痛", "不知痛苦"], source: "裁决" },
    { display: "致命破灭", aliases: ["毁灭性决心"], source: "裁决" },
  ]);
  assert.equal(registry.displayNameFor("death-guard", "不觉疼痛"), "不知疼痛");
  assert.equal(registry.displayNameFor("death-guard", "不知痛苦"), "不知疼痛");
  assert.equal(registry.displayNameFor("death-guard", "不觉疼痛5+"), "不知疼痛5+");
  assert.equal(registry.displayNameFor("death-guard", "毁灭性决心D3"), "致命破灭D3");
  assert.equal(registry.displayNameFor("death-guard", "瘟疫喷射"), "瘟疫喷射");
});

test("aliasesForCanonical returns every alias of a canonical name", () => {
  const context = registryContext();
  const registry = context.WarhammerAliasRegistry;
  registry.register({ factionId: "adeptus-custodes", units: { "百骑长": { canonical: "灭魔教团百骑长" }, "百夫长": { canonical: "灭魔教团百骑长" } } });
  const aliases = registry.aliasesForCanonical("units", "灭魔教团百骑长");
  assert.ok(aliases.includes("百骑长"));
  assert.ok(aliases.includes("百夫长"));
  assert.ok(aliases.length >= 2);
});

test("generated aliases/index.js registers factions, detachments, weapons and terms", () => {
  const context = registryContext();
  const indexPath = path.join(root, "docs", "aliases", "index.js");
  assert.ok(fs.existsSync(indexPath), "aliases/index.js should exist");
  vm.runInContext(fs.readFileSync(indexPath, "utf8"), context, { filename: "aliases/index.js" });
  const registry = context.WarhammerAliasRegistry;
  assert.equal(registry.resolveUnit("death-guard", "泰丰斯"), "泰弗斯");
  assert.equal(registry.resolveUnit("adeptus-custodes", "戒卫者"), "警戒者");
  assert.equal(registry.resolveUnit("orks", "小子"), "小子");
  assert.equal(registry.resolveUnit("orks", "蛮人小子"), "小子");
  assert.equal(registry.resolveUnit("orks", "男孩"), "小子");
  assert.equal(registry.resolveUnit("orks", "Boyz"), "小子");
  assert.equal(registry.resolveWeapon("death-guard", "瘟疫毒刃"), "瘟疫短刀");
  assert.equal(registry.resolveDetachment("adeptus-custodes", "盾卫军团"), "盾卫军团");
  assert.equal(registry.displayNameFor("death-guard", "不觉疼痛"), "不知疼痛");
  assert.equal(registry.displayNameFor("death-guard", "不觉疼痛5+"), "不知疼痛5+");
  // 跨源审计裁决：兽人 10 版 PDF 原文 WAAAGH!（vision OCR 验证）优先于繁中源（瓦戈/咻啊）
  assert.equal(registry.displayNameFor("orks", "瓦戈！"), "WAAAGH!");
  assert.equal(registry.displayNameFor("orks", "咻啊！"), "WAAAGH!");
  assert.equal(registry.displayNameFor("orks", "Waaagh!"), "WAAAGH!");
  // FNP 全部变体收敛到「不知疼痛」（繁中站=不觉疼痛，混沌SM/混沌恶魔=痛苦无感，PDF=不知疼痛）
  assert.equal(registry.displayNameFor("chaos-space-marines", "痛苦无感"), "不知疼痛");
  assert.equal(registry.displayNameFor("chaos-space-marines", "痛苦无感5+"), "不知疼痛5+");
  // Stealth：星际战士 11 版 PDF 用「隐蔽」，繁中站用「潜行」
  assert.equal(registry.displayNameFor("adepta-sororitas", "潜行"), "隐蔽");
  // 用户裁决：无敌豁免＝特殊保护，显示为特殊保护
  assert.equal(registry.displayNameFor("orks", "无敌豁免"), "特殊保护");
  // 阵营作用域覆盖：11 版灰骑士官方 PDF 用「不觉疼痛」，其余阵营保持「不知疼痛」
  assert.equal(registry.displayNameFor("grey-knights", "不觉疼痛"), "不觉疼痛");
  assert.equal(registry.displayNameFor("grey-knights", "不觉疼痛4+"), "不觉疼痛4+");
  assert.equal(registry.displayNameFor("grey-knights", "痛苦无感"), "不觉疼痛");
  assert.equal(registry.displayNameFor("chaos-space-marines", "痛苦无感"), "不知疼痛");
  assert.equal(registry.displayNameFor("death-guard", "不觉疼痛5+"), "不知疼痛5+");
  // 4 份已完成 PDF 比对的术语并入抽查
  assert.equal(registry.displayNameFor("world-eaters", "血腥谕旨"), "恐虐赐福");
  assert.equal(registry.displayNameFor("world-eaters", "射击甲板2"), "开火口2");
  assert.equal(registry.displayNameFor("leagues-of-votann", "亲族英雄"), "氏族英豪");
  assert.equal(registry.displayNameFor("adeptus-mechanicus", "防护协议"), "保护协议");
  // 致命破灭的 D3/D6/D6+2/3D6 是致命伤骰值（非关键词），后缀统一显示
  assert.equal(registry.displayNameFor("necrons", "致命破灭D6+2"), "致命破灭D6+2");
  assert.equal(registry.displayNameFor("tau-empire", "致命破灭3D6"), "致命破灭3D6");
  assert.equal(registry.displayNameFor("orks", "致命破灭 D3"), "致命破灭D3");
  const all = registry.allDigitalUnitAliases();
  assert.deepEqual(JSON.parse(JSON.stringify(all["space-marines"])), { "65": ["连长"], "119": ["先遣者摩托小队"] });
  assert.ok(registry.list().length >= 23);
});

test("startup wires the alias registry", () => {
  const app = fs.readFileSync(path.join(root, "docs", "app.js"), "utf8");
  const html = fs.readFileSync(path.join(root, "docs", "index.html"), "utf8");
  assert.match(html, /rules\/alias-registry\.js/);
  assert.match(html, /aliases\/index\.js/);
  assert.doesNotMatch(app, /ingestFactionPackages/);
});
