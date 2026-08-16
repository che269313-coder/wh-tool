import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));

test("every runtime faction is authored by one versioned data package", () => {
  const packagesDir = path.join(root, "data", "factions");
  const packageFiles = fs.readdirSync(packagesDir)
    .filter((name) => fs.existsSync(path.join(packagesDir, name, "package.json")))
    .sort();
  assert.equal(packageFiles.length, 23);

  for (const factionId of packageFiles) {
    const payload = readJson(`data/factions/${factionId}/package.json`);
    assert.equal(payload.schemaVersion, 1, factionId);
    assert.equal(payload.definition.id, factionId, factionId);
    assert.ok(payload.definition.name, factionId);
    assert.deepEqual(payload.sourcePolicy.displayName, ["pdf-11e-zh", "pdf-10e-zh", "40k11e-backend-zh-hant"], factionId);
    assert.deepEqual(payload.sourcePolicy.profiles, ["pdf-11e-zh", "pdf-10e-zh", "40k11e-backend-zh-hant"], factionId);
    assert.equal(payload.sourcePolicy.identity, "official-english-id-only", factionId);
    assert.ok(Array.isArray(payload.sources) && payload.sources.length > 0, factionId);
    assert.ok(payload.aliases && typeof payload.aliases.units === "object", factionId);
    assert.ok(Array.isArray(payload.overrides), factionId);
    assert.equal("unitAliases" in payload.definition, false, factionId);
    assert.equal("digitalUnitAliases" in payload.definition, false, factionId);
    assert.doesNotMatch(JSON.stringify(payload), /docs\/未分类数据卡pdf/, `${factionId}: source evidence must use the source archive`);
    for (const override of payload.overrides) {
      assert.match(override.path, /\[[A-Za-z_$][\w$]*=/, `${factionId}: override paths must select stable records`);
      assert.doesNotMatch(override.path, /(?:^|\.|\[)\d+(?:\]|\.|$)/, `${factionId}: numeric array positions are forbidden`);
      assert.ok(["catalog", "datasheet", "rules"].includes(override.target), factionId);
      assert.ok(override.source && override.rationale, factionId);
    }
  }
});

test("source decisions live outside the public deployment tree", () => {
  const publicAliasSources = fs.existsSync(path.join(root, "docs", "aliases"))
    ? fs.readdirSync(path.join(root, "docs", "aliases")).filter((name) => name.endsWith(".json"))
    : [];
  assert.deepEqual(publicAliasSources, []);
  assert.equal(fs.existsSync(path.join(root, "docs", "patches")), false);
  assert.ok(fs.existsSync(path.join(root, "data", "global", "aliases.json")));
});

test("generated faction registry does not duplicate unit aliases", () => {
  const source = fs.readFileSync(path.join(root, "docs", "rules", "factions.js"), "utf8");
  assert.doesNotMatch(source, /unitAliases\s*:/);
  assert.doesNotMatch(source, /digitalUnitAliases\s*:/);
  assert.doesNotMatch(source, /WarhammerWebsiteUnitAliases/);
  assert.match(source, /Generated from data\/factions\/<id>\/package\.json/);
});

test("Orks PDF adjudication is a stable, traceable package decision", () => {
  const payload = readJson("data/factions/orks/package.json");
  assert.equal(payload.aliases.units["蛮人小子"].canonical, "小子");
  assert.equal(payload.aliases.units.Boyz.canonical, "小子");
  assert.ok(payload.sources.some((source) => source.id === "pdf-10e-zh" && /sources\/pdfs\/orks\/原文/.test(source.evidencePath)));
  assert.ok(payload.overrides.some((override) => override.path === "cards[id=orks.boyz.01474b35].name" && override.value === "小子"));
  assert.ok(payload.overrides.some((override) => override.path === "cards[id=orks.boyz.01474b35].modelProfiles[id=champion].unit" && override.value.woundsPerModel === 2));
});

test("maintainer architecture has one current document, not implementation diaries", () => {
  assert.ok(fs.existsSync(path.join(root, "ARCHITECTURE.md")));
  assert.equal(fs.existsSync(path.join(root, "docs", "plans")), false);
  for (const stale of ["项目架构.md", "资料提取.md", "审核机制.md"]) {
    assert.equal(fs.existsSync(path.join(root, "docs", stale)), false, stale);
  }
});
