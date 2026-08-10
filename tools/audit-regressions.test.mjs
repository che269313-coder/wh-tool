import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const read = (relative) => fs.readFileSync(new URL(relative, root), "utf8");

function loadKeywordDictionary() {
  const context = vm.createContext({ console });
  context.globalThis = context;
  vm.runInContext(read("docs/rules/keyword-dictionary.js"), context);
  return context.WarhammerKeywordDictionary;
}

test("owner-scoped weapon attack modifiers are assembled with shared modifiers", () => {
  const app = read("docs/app.js");
  const start = app.indexOf("const scopedAttackModifier");
  const source = app.slice(start, start + 500);
  assert.ok(start >= 0);
  assert.match(source, /sourceRules\.weaponAttackModifiers/);
  assert.match(source, /sharedJoinedRules\.weaponAttackModifiers/);
  assert.match(source, /weapon\.name/);
});

test("faction effects are assembled into every weapon profile", () => {
  const app = read("docs/app.js");
  const start = app.indexOf("const sourceFactionEffects");
  const source = app.slice(start, start + 10000);
  assert.ok(start >= 0);
  for (const field of ["attackModifier", "hitModifier", "strengthModifier", "apModifier", "damageModifier"]) {
    assert.match(source, new RegExp(`sourceFactionEffects\\.${field}`), field);
  }
  assert.match(app, /defenderFactionDefend/);
  assert.match(app, /incomingWoundWhenStrengthGreater:\s*Math\.min\([^\n]*defenderFactionDefend\.incomingWoundWhenStrengthGreater/);
  assert.match(app, /Faction hit penalties are already folded[\s\S]{0,160}incomingHitModifier:\s*0/);
});

test("stacked invulnerable saves keep the best threshold", () => {
  const context = vm.createContext({ console });
  context.globalThis = context;
  vm.runInContext(read("docs/rules/effects.js"), context);
  const defend = { invulnerableSave: 0, contributions: [] };
  const input = { rule: { id: "test" }, selections: {}, context: {}, attack: { contributions: [] }, defend, selected: () => false, enabled: () => false };
  context.WarhammerRuleEffects.apply({ type: "invulnerable-save", value: 5, activation: "passive" }, input);
  context.WarhammerRuleEffects.apply({ type: "invulnerable-save", value: 4, activation: "passive" }, input);
  assert.equal(defend.invulnerableSave, 4);
});

test("anti-character aliases resolve from the Chinese weapon keyword path", () => {
  const dictionary = loadKeywordDictionary();
  const payload = dictionary.toWeaponPayload(["针对角色 4+"], ["Character"]);
  assert.equal(payload.criticalWoundThreshold, 4);
});

test("composite anti keywords apply to either target including full-width slash", () => {
  const dictionary = loadKeywordDictionary();
  for (const keyword of ["针对凶兽/载具 3+", "针对凶兽／载具 3+"]) {
    assert.equal(dictionary.toWeaponPayload([keyword], ["Monster"]).criticalWoundThreshold, 3);
    assert.equal(dictionary.toWeaponPayload([keyword], ["Vehicle"]).criticalWoundThreshold, 3);
    assert.equal(dictionary.toWeaponPayload([keyword], ["Infantry"]).criticalWoundThreshold, undefined);
  }
});

test("anti-daemon, anti-walker and anti-epic-hero targets are supported", () => {
  const dictionary = loadKeywordDictionary();
  for (const [keyword, target] of [
    ["针对恶魔 2+", "Daemon"],
    ["针对步行机 2+", "Walker"],
    ["针对史诗英雄 2+", "Epic Hero"],
  ]) {
    assert.equal(dictionary.toWeaponPayload([keyword], [target]).criticalWoundThreshold, 2, keyword);
  }
});

test("negative target suffixes exclude monster and vehicle instead of reversing semantics", () => {
  const dictionary = loadKeywordDictionary();
  assert.equal(dictionary.resolve(["毁灭伤害：非凶兽/载具"], { targetKeywords: ["Infantry"] }).effects.some((effect) => effect.type === "devastating-wounds"), true);
  assert.equal(dictionary.resolve(["毁灭伤害：非凶兽/载具"], { targetKeywords: ["Monster"] }).effects.some((effect) => effect.type === "devastating-wounds"), false);
  assert.equal(dictionary.resolve(["毁灭伤害：非凶兽/载具"], { targetKeywords: ["Vehicle"] }).effects.some((effect) => effect.type === "devastating-wounds"), false);
});

test("rapid fire accepts dice expressions", () => {
  const dictionary = loadKeywordDictionary();
  assert.equal(dictionary.resolve(["速射 D6+3"], { targetWithinHalfRange: true }).attackExpressionModifier, "D6+3");
});

test("traditional-to-simplified conversion preserves non-Chinese Unicode", () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "wh-tool-convert-"));
  const input = path.join(temporaryDirectory, "input.txt");
  const output = path.join(temporaryDirectory, "output.txt");
  try {
    fs.writeFileSync(input, "繁體 Brôkhyr Ûthar mega‑blasta Kromlôk’s", "utf8");
    const result = spawnSync("powershell", [
      "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", new URL("tools/ConvertTo-SimplifiedChinese.ps1", root).pathname.slice(1),
      "-Path", input, "-OutFile", output, "-Overwrite",
    ], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(fs.readFileSync(output, "utf8").replace(/^\ufeff/, ""), "繁体 Brôkhyr Ûthar mega‑blasta Kromlôk’s");
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});
