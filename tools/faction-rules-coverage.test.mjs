import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const factionIds = [
  "grey-knights", "adepta-sororitas", "astra-militarum", "imperial-knights", "adeptus-mechanicus",
  "agents-of-imperium", "chaos-space-marines", "thousand-sons", "world-eaters", "chaos-daemons",
  "chaos-knights", "aeldari", "drukhari", "tyranids", "necrons", "tau-empire", "genestealer-cults",
  "leagues-of-votann", "emperors-children",
];

function loadCatalog(factionId) {
  const context = vm.createContext({ console });
  context.globalThis = context;
  vm.runInContext(fs.readFileSync(new URL(`docs/rules/factions/${factionId}.js`, root), "utf8"), context);
  return context[`WarhammerWebsiteRules_${factionId.replaceAll("-", "_")}`];
}

function loadEffectSchema() {
  const context = vm.createContext({ console });
  context.globalThis = context;
  vm.runInContext(fs.readFileSync(new URL("docs/rules/effect-schema.js", root), "utf8"), context);
  return context.WarhammerEffectSchema;
}

const catalogs = Object.fromEntries(factionIds.map((id) => [id, loadCatalog(id)]));
const allRules = Object.values(catalogs).flatMap((catalog) => [
  ...(catalog.factionRules || []),
  ...Object.values(catalog.unitRules || {}).flat(),
]);
const findByEnglishName = (factionId, englishName) => Object.values(catalogs[factionId].unitRules || {})
  .flat()
  .find((rule) => rule.source?.englishName === englishName);

test("numeric Feel No Pain abilities are calculator effects", () => {
  const rules = allRules.filter((rule) => /不(?:知|觉)疼痛\s*[3-6]\s*\+/.test(rule.name));
  assert.ok(rules.length >= 20, `expected broad FNP coverage, found ${rules.length}`);
  for (const rule of rules) {
    const threshold = Number(rule.name.match(/([3-6])\s*\+/)?.[1]);
    assert.ok(rule.effects?.some((effect) => effect.type === "fnp" && effect.threshold === threshold), rule.id);
  }
});

test("Stealth abilities reduce incoming ranged hit rolls", () => {
  const rules = allRules.filter((rule) => rule.source?.englishName === "Stealth");
  assert.ok(rules.length >= 10, `expected broad Stealth coverage, found ${rules.length}`);
  for (const rule of rules) {
    assert.ok(rule.effects?.some((effect) => effect.type === "incoming-hit-minus" && effect.phase === "ranged"), rule.id);
  }
});

test("representative joined-unit and critical-wound abilities are modeled", () => {
  const infernalMaster = findByEnglishName("thousand-sons", "Malefic Maelstrom");
  assert.ok(infernalMaster?.effects?.some((effect) => effect.type === "sustained-hits" && effect.value === 1 && effect.phase === undefined && effect.requiresJoined));

  const daemonPrince = findByEnglishName("chaos-daemons", "Prince of Slaanesh");
  assert.ok(daemonPrince?.effects?.some((effect) => effect.type === "wound-critical-threshold" && effect.value === 5 && effect.phase === "melee" && effect.requiresJoined));

  const flawlessBlades = findByEnglishName("emperors-children", "Daemonic Patrons");
  assert.ok(flawlessBlades?.effects?.some((effect) => effect.type === "wound-critical-threshold" && effect.value === 3));
});

test("website faction generation creates a substantial calculable rules layer", () => {
  const implemented = allRules.filter((rule) => rule.effects?.length);
  assert.ok(implemented.length >= 200, `only ${implemented.length} website faction rules have calculator effects`);
  for (const catalog of Object.values(catalogs)) {
    for (const [unitName, rules] of Object.entries(catalog.unitRules || {})) {
      assert.equal(new Set(rules.map((rule) => rule.id)).size, rules.length, `${unitName} has duplicate rule ids`);
    }
  }
});

test("every generated website faction rule satisfies the neutral effect contract", () => {
  const schema = loadEffectSchema();
  for (const [factionId, catalog] of Object.entries(catalogs)) {
    assert.deepEqual([...schema.validateCatalog(catalog)], [], factionId);
  }
});

test("multi-option army rules use explicit mutually exclusive selections", () => {
  const thousandSons = catalogs["thousand-sons"].factionRules[0];
  assert.equal(thousandSons.name, "巫师秘会");
  assert.ok(thousandSons.controls?.some((control) => control.id === "ritual" && control.type === "select"));
  assert.ok(thousandSons.effects.some((effect) => effect.type === "hit-reroll" && effect.mode === "ones" && effect.selection?.equals === "fatedDoomOnes"));
  assert.ok(thousandSons.effects.some((effect) => effect.type === "hit-reroll" && effect.mode === "failed" && effect.selection?.equals === "fatedDoomAll"));
  assert.ok(thousandSons.effects.some((effect) => effect.type === "weapon-ap-modifier" && effect.value === 2 && effect.selection?.equals === "twistFate2"));
  assert.ok(!thousandSons.controls.some((control) => control.id === "enabled"));

  const guard = catalogs["astra-militarum"].factionRules[0];
  assert.ok(guard.controls?.some((control) => control.id === "order" && control.type === "select"));
  assert.ok(guard.effects.some((effect) => effect.type === "hit-modifier" && effect.phase === "ranged" && effect.selection?.equals === "takeAim"));
  assert.ok(guard.effects.some((effect) => effect.type === "rapid-fire-attack-modifier" && effect.value === 1 && effect.selection?.equals === "frontRankFire"));
});

test("high-impact army combat rules have safe opt-in controls", () => {
  const darkPacts = catalogs["chaos-space-marines"].factionRules[0];
  assert.ok(darkPacts.effects.some((effect) => effect.type === "lethal-hits"));
  assert.ok(darkPacts.effects.some((effect) => effect.type === "sustained-hits" && effect.value === 1));

  const blessings = catalogs["world-eaters"].factionRules[0];
  assert.ok(blessings.effects.some((effect) => effect.type === "lethal-hits" && effect.phase === "melee"));
  assert.ok(blessings.effects.some((effect) => effect.type === "devastating-wounds" && effect.requiresTargetInfantry));

  const synapse = catalogs.tyranids.factionRules[0];
  assert.ok(synapse.effects.some((effect) => effect.type === "weapon-strength-modifier" && effect.value === 1 && effect.phase === "melee"));

  const guided = catalogs["tau-empire"].factionRules[0];
  assert.ok(guided.effects.some((effect) => effect.type === "hit-modifier" && effect.value === 1 && effect.phase === "ranged"));
});

test("generic compilation refuses effects that the calculator cannot express faithfully", () => {
  assert.equal(findByEnglishName("aeldari", "Dance of Death").effects.length, 0);
  assert.equal(findByEnglishName("chaos-daemons", "Master of Magicks").effects.length, 0);
  assert.equal(findByEnglishName("tau-empire", "Targeting Array").effects.length, 0);
  const stalker = findByEnglishName("necrons", "Stalker");
  assert.equal(stalker.effects.length, 1);
  assert.equal(JSON.stringify(stalker.effects[0]), JSON.stringify({ type: "incoming-hit-minus", value: 1, phase: "ranged" }));
});
