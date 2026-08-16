import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { applyPatches, getByPath, setByPath } from "./apply-patches.mjs";

function fixtureRoot() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "wh-patches-"));
  fs.mkdirSync(path.join(dir, "data", "factions", "orks"), { recursive: true });
  fs.mkdirSync(path.join(dir, "docs", "catalogs"), { recursive: true });
  fs.mkdirSync(path.join(dir, "docs", "rules"), { recursive: true });
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

test("rules target applies PDF overrides and canonical terminology to text and controls", () => {
  const dir = fixtureRoot();
  const rules = {
    factionRules: [{
      id: "orks.army.waagh",
      name: "瓦戈！",
      text: "可以发起瓦戈！。",
      controls: [{ id: "enabled", label: "本次已发起瓦戈！" }],
    }],
    unitRules: {
      小子: [{ id: "orks.boyz.ability", name: "大瓦戈！先知", text: "咻啊！生效期间。" }],
      屁精: [{ id: "orks.gretchin.ability", name: "咻啊！", text: "阵营技能引用。" }],
    },
  };
  fs.writeFileSync(
    path.join(dir, "docs", "rules", "orks.js"),
    `(function (root) { root.WarhammerOrksRules = ${JSON.stringify(rules)}; })(typeof globalThis === "undefined" ? this : globalThis);\n`,
  );
  const payload = {
    definition: { id: "orks", name: "欧克兽人", rulesGlobal: "WarhammerOrksRules", runtime: { rules: ["rules/orks.js"] } },
    overrides: [
      { target: "rules", path: "factionRules[id=orks.army.waagh].name", value: "WAAAGH!" },
      { target: "rules", path: "factionRules[id=orks.army.waagh].text", value: "PDF 原文：发动 WAAAGH!。" },
    ],
    transforms: [{
      id: "orks-rules-waaagh-term",
      target: "rules",
      kind: "canonical-term",
      fields: ["text", "label"],
      aliases: ["瓦戈！", "咻啊！", "Waaagh!"],
      value: "WAAAGH!",
      source: "pdf-10e-zh",
    }, {
      id: "orks-rules-exact-waaagh-name",
      target: "rules",
      kind: "canonical-term",
      matchMode: "exact",
      fields: ["name"],
      aliases: ["瓦戈！", "咻啊！", "Waaagh!"],
      value: "WAAAGH!",
      source: "pdf-10e-zh",
    }],
  };
  fs.writeFileSync(path.join(dir, "data", "factions", "orks", "package.json"), JSON.stringify(payload, null, 2));

  const report = applyPatches({ rootDir: dir, factions: [payload.definition] });
  assert.equal(report.missed.length, 0);
  assert.equal(report.applied.length, 4);

  const context = vm.createContext({});
  context.globalThis = context;
  vm.runInContext(fs.readFileSync(path.join(dir, "docs", "rules", "orks.js"), "utf8"), context);
  const updated = context.WarhammerOrksRules;
  assert.equal(updated.factionRules[0].name, "WAAAGH!");
  assert.equal(updated.factionRules[0].text, "PDF 原文：发动 WAAAGH!。");
  assert.equal(updated.factionRules[0].controls[0].label, "本次已发起WAAAGH!");
  assert.equal(updated.unitRules["小子"][0].name, "大瓦戈！先知", "通用术语替换不能破坏需单独裁决的完整技能名");
  assert.equal(updated.unitRules["小子"][0].text, "WAAAGH!生效期间。");
  assert.equal(updated.unitRules["屁精"][0].name, "WAAAGH!", "完整等于旧阵营技能名时应采用 PDF 名称");

  const replay = applyPatches({ rootDir: dir, factions: [payload.definition] });
  assert.equal(replay.missed.length, 0, "已裁决为 canonical value 的 transform 二次执行必须视为 already applied");
  assert.equal(replay.applied.length, 4);
});
