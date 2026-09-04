import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const context = vm.createContext({ console });
context.globalThis = context;
for (const file of [
  "docs/rules/faction-registry.js",
  "docs/rules/factions.js",
  "docs/rules/effect-schema.js",
  "docs/rules/effects.js",
  "docs/rules/resolver.js",
  "docs/rules/orks.js",
]) vm.runInContext(fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), context);
const rules = context.WarhammerOrksRules.unitRules;
const normalized = (value) => String(value || "").replace(/[\s!！]/g, "");
const find = (unit, name) => Object.entries(rules).find(([candidate]) => normalized(candidate) === normalized(unit))?.[1]
  ?.find((rule) => normalized(rule.name) === normalized(name));
const findByEnglishName = (englishName, predicate = () => true) => Object.values(rules).flat()
  .find((rule) => rule.source?.englishName === englishName && predicate(rule));

test("More Dakka rerolls only hit rolls of one", () => {
  const matches = Object.entries(rules).flatMap(([unit, entries]) => entries.filter((rule) => rule.source?.englishName === "More Dakka").map((rule) => ({ unit, rule })));
  assert.ok(matches.length >= 3);
  for (const { unit, rule } of matches) assert.ok(rule.effects.some((effect) => effect.type === "hit-reroll" && effect.mode === "ones"), unit);
});

test("Burn 'Em All has reroll ones plus an objective-gated full reroll", () => {
  const rule = findByEnglishName("Pyromaniaks");
  assert.ok(rule.effects.some((effect) => effect.type === "wound-reroll" && effect.mode === "ones"));
  assert.ok(rule.effects.some((effect) => effect.type === "wound-reroll" && effect.mode === "failed" && effect.selection));
});

test("Ghazghkull's Great Waaagh Prophet separates leader and Waaagh conditions", () => {
  const prophet = findByEnglishName("Prophet of Da Great Waaagh!");
  for (const type of ["hit-modifier", "wound-modifier"]) {
    assert.ok(prophet.effects.some((effect) => effect.type === type && effect.requiresJoined && !effect.selection));
  }
  assert.ok(prophet.effects.some((effect) => effect.type === "wound-critical-threshold" && effect.value === 5 && effect.selection?.controlId === "waaghActive"));
  const banner = findByEnglishName("Ghazghkull’s Waaagh! Banner");
  assert.ok(banner.effects.some((effect) => effect.type === "lethal-hits" && effect.selection?.controlId === "waaghActive"));
});

test("Waaagh-dependent Ork abilities stay gated", () => {
  assert.ok(findByEnglishName("Krumpin’ Time").effects.some((effect) => effect.type === "fnp" && effect.selection?.controlId === "waaghActive"));
  assert.ok(findByEnglishName("Big an’ Shooty").effects.some((effect) => effect.type === "hit-modifier" && effect.selection?.controlId === "waaghActive"));
});

test("target exclusions are not inverted", () => {
  const mekGun = findByEnglishName("Splat!");
  assert.ok(mekGun.effects.some((effect) => effect.type === "hit-reroll" && effect.mode === "ones" && effect.unlessTargetMonsterVehicle));
  const jet = findByEnglishName("Blastajet Attack Run");
  assert.ok(jet.effects.some((effect) => effect.type === "hit-reroll" && effect.mode === "ones" && effect.selection?.controlId === "targetCanFly" && effect.selection.equals === false));
});

test("joined and melee scopes are preserved", () => {
  const boyz = findByEnglishName("Da Boss’ Ladz");
  assert.ok(boyz.effects.some((effect) => effect.type === "incoming-wound-when-strength-gt" && effect.requiresJoined));
  const banner = findByEnglishName("Waaagh! Banner", (rule) => rule.effects?.length);
  assert.ok(banner.effects.some((effect) => effect.type === "hit-modifier" && effect.phase === "melee" && effect.requiresJoined));
});

test("numeric Ork core FNP and Stealth rules are implemented", () => {
  const all = Object.values(rules).flat();
  const fnp = all.filter((rule) => rule.effects?.some((effect) => effect.type === "fnp"));
  assert.ok(fnp.length >= 10);
  fnp.forEach((rule) => assert.ok(rule.effects?.some((effect) => effect.type === "fnp"), rule.id));
  // 通用核心技能（含潜行）已合并为"核心技能"束；潜行的远程命中 -1 效果必须保留在束的 effects 里。
  const stealthBundles = all.filter(
    (rule) => rule.source?.kind === "core" && String(rule.source?.englishName || "").split(", ").includes("Stealth"),
  );
  assert.ok(stealthBundles.length >= 2);
  stealthBundles.forEach((rule) => assert.ok(rule.effects?.some((effect) => effect.type === "incoming-hit-minus" && effect.phase === "ranged"), rule.id));
});

test("Dakkablitz adds six attacks only to the Blitzkannon against non-Monster/Vehicle targets", () => {
  const rule = findByEnglishName("Dakkablitz");
  assert.ok(rule.controls?.some((control) => control.id === "targetMonsterVehicle"));
  assert.ok(rule.effects.some((effect) => effect.type === "weapon-attack-modifier"
    && effect.weaponName === "闪击加农炮"
    && effect.value === 6
    && effect.phase === "ranged"
    && effect.unlessTargetMonsterVehicle));
});

test("瓦戈！开启后阵营规则必须同时提供近战加值与 5+ 无敌豁免", () => {
  const selections = { "orks.army.waagh.enabled": true };
  const waaghOn = context.WarhammerRuleResolver.resolveFaction("欧克兽人", selections, { phase: "melee" });
  assert.equal(waaghOn.defend.invulnerableSave, 5, "瓦戈！开启后防守方必须获得 5+ 无敌豁免");
  assert.equal(waaghOn.attack.attackModifier, 1, "瓦戈！开启后近战攻击次数 +1");
  assert.ok(waaghOn.attack.strengthModifier === 1, "瓦戈！开启后近战力量 +1");
  const waaghOff = context.WarhammerRuleResolver.resolveFaction("欧克兽人", {}, { phase: "melee" });
  assert.equal(waaghOff.defend.invulnerableSave, 0, "瓦戈！未开启时没有无敌豁免");
  const ranged = context.WarhammerRuleResolver.resolveFaction("欧克兽人", selections, { phase: "ranged" });
  assert.equal(ranged.attack.attackModifier, 0, "瓦戈！的近战加值不得影响远程攻击");
});

test("WAAAGH rule text and controls use the PDF terminology end to end", () => {
  const catalog = context.WarhammerOrksRules;
  const waagh = catalog.factionRules.find((rule) => rule.id === "orks.army.waagh");
  assert.equal(waagh.name, "WAAAGH!");
  assert.match(waagh.text, /军队阵营是兽人/);
  assert.match(waagh.text, /发动 WAAAGH!/);
  assert.equal(waagh.controls.find((control) => control.id === "enabled")?.label, "本次战斗已发动 WAAAGH!");
  const visibleStrings = [
    ...catalog.factionRules,
    ...Object.values(catalog.unitRules).flat(),
  ].flatMap((rule) => [rule.text, rule.status, ...(rule.controls || []).flatMap((control) => [control.label])]).filter(Boolean);
  assert.equal(visibleStrings.some((value) => /瓦戈|咻啊/.test(value)), false, "规则正文、状态和控件不得继续显示繁中旧名");
});
