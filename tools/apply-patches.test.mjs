import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { applyPatches, getByPath, setByPath } from "./apply-patches.mjs";

function fixtureRoot() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "wh-patches-"));
  fs.mkdirSync(path.join(dir, "data", "factions", "orks"), { recursive: true });
  fs.mkdirSync(path.join(dir, "docs", "catalogs"), { recursive: true });
  return dir;
}

test("path helpers walk and set arrays and objects", () => {
  const target = { cards: [{ name: "a" }] };
  assert.equal(getByPath(target, "cards[0].name"), "a");
  setByPath(target, "cards[0].modelProfiles[0].weaponNames", ["x"]);
  assert.deepEqual(target.cards[0].modelProfiles, [{ weaponNames: ["x"] }]);
  assert.equal(getByPath(target, "missing.path"), undefined);
});

test("path helpers select generated records by stable id instead of array position", () => {
  const target = {
    cards: [
      { id: "orks.beast-snagga-boyz.ebb6b151", name: "豢兽师小子" },
      { id: "orks.boyz.01474b35", name: "蛮人小子", modelProfiles: [{ id: "champion", name: "Boss Nob" }] },
    ],
  };
  assert.equal(getByPath(target, "cards[id=orks.boyz.01474b35].name"), "蛮人小子");
  setByPath(target, "cards[id=orks.boyz.01474b35].modelProfiles[id=champion].name", "老大队长");
  assert.equal(target.cards[1].modelProfiles[0].name, "老大队长");
  assert.equal(target.cards[0].name, "豢兽师小子", "稳定 ID 补丁不得随数组顺序误伤其他卡");
  assert.equal(getByPath(target, "cards[id=orks.missing].name"), undefined);
});

test("applyPatches applies catalog overlays idempotently and syncs the script fallback", () => {
  const dir = fixtureRoot();
  const catalog = { kind: "catalog", cards: [{ name: "队长", modelProfiles: [{ id: "champion", weaponNames: ["动力剑"] }] }] };
  fs.writeFileSync(path.join(dir, "docs", "catalogs", "orks.json"), JSON.stringify(catalog, null, 2));
  fs.writeFileSync(
    path.join(dir, "docs", "catalogs", "orks.js"),
    "(function (root) {\n  const registry = root.WarhammerCalculatorCatalogRegistry;\n  registry.register(\"orks\", " + JSON.stringify(catalog) + ");\n})(typeof globalThis === 'undefined' ? this : globalThis);\n",
  );
  const patch = {
    schemaVersion: 1,
    definition: { id: "orks", name: "欧克兽人", data: {} },
    overrides: [{
      target: "catalog",
      op: "add",
      path: "cards[0].modelProfiles[0].weaponNames",
      value: ["大砍刀"],
      source: "manual-fix",
      rationale: "pdf p7 默认装备修正",
      adjudicatedBy: "user",
      date: "2026-08-14",
    }],
  };
  fs.writeFileSync(path.join(dir, "data", "factions", "orks", "package.json"), JSON.stringify(patch, null, 2));
  const factions = [{ id: "orks", data: {} }];

  const first = applyPatches({ rootDir: dir, factions });
  assert.equal(first.applied.length, 1);
  assert.equal(first.missed.length, 0);
  const updated = JSON.parse(fs.readFileSync(path.join(dir, "docs", "catalogs", "orks.json"), "utf8"));
  assert.deepEqual(updated.cards[0].modelProfiles[0].weaponNames, ["大砍刀"]);
  const jsSource = fs.readFileSync(path.join(dir, "docs", "catalogs", "orks.js"), "utf8");
  assert.ok(jsSource.includes("\"weaponNames\":[\"大砍刀\"]"), "脚本回退包必须同步补丁后的数据");

  const second = applyPatches({ rootDir: dir, factions });
  assert.equal(second.applied.length, 1, "补丁应用必须幂等");
  const again = JSON.parse(fs.readFileSync(path.join(dir, "docs", "catalogs", "orks.json"), "utf8"));
  assert.deepEqual(again, updated);
});

test("dry-run writes nothing; missed paths are reported without being applied", () => {
  const dir = fixtureRoot();
  const catalog = { cards: [{ name: "a" }] };
  fs.writeFileSync(path.join(dir, "docs", "catalogs", "orks.json"), JSON.stringify(catalog));
  fs.writeFileSync(
    path.join(dir, "data", "factions", "orks", "package.json"),
    JSON.stringify({ definition: { id: "orks", data: {} }, overrides: [{ target: "catalog", path: "cards[0].missing", value: 1 }, { target: "catalog", path: "cards[0].name", value: "b" }] }),
  );
  const factions = [{ id: "orks", data: {} }];

  const dry = applyPatches({ rootDir: dir, factions, dryRun: true });
  assert.equal(dry.applied.length, 1);
  assert.equal(dry.missed.length, 1);
  assert.equal(dry.missed[0].path, "cards[0].missing");
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir, "docs", "catalogs", "orks.json"), "utf8")), catalog, "dry-run 不得写文件");

  const real = applyPatches({ rootDir: dir, factions });
  assert.equal(real.missed.length, 1, "未命中路径必须持续上报（0 容忍）");
  assert.equal(JSON.parse(fs.readFileSync(path.join(dir, "docs", "catalogs", "orks.json"), "utf8")).cards[0].name, "b");
});
