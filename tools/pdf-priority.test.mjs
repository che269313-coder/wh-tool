import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const catalog = (factionId) => JSON.parse(read(`docs/catalogs/${factionId}.json`));
const card = (factionId, cardId) => catalog(factionId).cards.find((candidate) => candidate.id === cardId);
const rulePackage = (relativePath, globalName) => {
  const context = vm.createContext({ console });
  context.globalThis = context;
  vm.runInContext(read(relativePath), context);
  return context[globalName];
};

test("PDF card titles are the canonical unit names across factions", () => {
  const examples = [
    ["orks", "orks.flash-gitz.a8848006", "脏枪混混", "Flash Gitz"],
    ["adepta-sororitas", "adepta-sororitas.23d36c10-cb05-43f4-90e7-f0a3c494bea7", "鞭笞机仆", "Arco-flagellants"],
    ["adeptus-mechanicus", "adeptus-mechanicus.6f208b5a-78ff-48d0-9f9e-324cfbc80e9d", "始祖鸟燧火轰炸机", "Archaeopter Fusilave"],
    ["necrons", "necrons.d82e8a78-72da-45b5-afee-177c0f2e6b26", "冥工末日行者", "Canoptek Doomstalker"],
  ];

  for (const [factionId, cardId, expectedName, englishName] of examples) {
    const found = card(factionId, cardId);
    assert.ok(found, `${factionId}/${englishName} should exist`);
    assert.equal(found.name, expectedName, `${englishName} must use its PDF title`);
    assert.equal(found.unit?.name, expectedName, `${englishName} unit profile must use its PDF title`);
  }
});

test("PDF ability titles replace backend translations in structured and summary data", () => {
  const flashGitz = card("orks", "orks.flash-gitz.a8848006");
  assert.deepEqual(
    flashGitz.abilities.filter((ability) => ["Gun-crazy Show-offs", "Ammo Runt"].includes(ability.englishName)).map((ability) => ability.name),
    ["枪狂炫技", "屁精助手"],
  );
  assert.match(flashGitz.unit.abilities, /枪狂炫技/);
  assert.match(flashGitz.unit.abilities, /屁精助手/);
  assert.doesNotMatch(flashGitz.unit.abilities, /爱炫耀的枪手|弹药格雷特/);

  const sisters = catalog("adepta-sororitas").cards.flatMap((candidate) => candidate.abilities || []);
  assert.ok(sisters.some((ability) => ability.englishName === "Acts of Faith" && ability.name === "信仰之举"));
  assert.ok(!sisters.some((ability) => ability.englishName === "Acts of Faith" && ability.name === "信念之举"));
});

test("no accepted unambiguous or unit-scoped PDF ability title remains at its backend name", () => {
  const ledger = JSON.parse(read("data/global/pdf-display-names.json"));
  for (const [factionId, entries] of Object.entries(ledger.abilities || {})) {
    const decisions = new Map();
    for (const entry of entries) {
      const key = `${entry.sourceName}\u0000${entry.englishName}`;
      if (!decisions.has(key)) decisions.set(key, []);
      decisions.get(key).push(entry);
    }
    const unitDecisions = new Map((ledger.units?.[factionId] || []).map((entry) => [entry.cardId, entry]));
    for (const candidate of catalog(factionId).cards || []) {
      const unitDecision = unitDecisions.get(candidate.id);
      const unitNames = new Set([candidate.name, unitDecision?.display, ...(unitDecision?.aliases || [])].filter(Boolean));
      for (const ability of candidate.abilities || []) {
        const matching = decisions.get(`${ability.name}\u0000${ability.englishName}`) || [];
        if (!matching.length) continue;
        const allDisplays = new Set(matching.map((entry) => entry.display));
        const scopedDisplays = new Set(matching
          .filter((entry) => (entry.units || []).some((name) => unitNames.has(name)))
          .map((entry) => entry.display));
        assert.ok(
          allDisplays.size > 1 && scopedDisplays.size !== 1,
          `${factionId}/${candidate.name}/${ability.englishName} retained backend title ${ability.name}`,
        );
      }
    }
  }
});

test("only ability-title decisions verified against restored PDF text enter the strong ledger", () => {
  const ledger = JSON.parse(read("data/global/pdf-display-names.json"));
  const unsafe = Object.entries(ledger.abilities || {}).flatMap(([factionId, entries]) => entries
    .filter((entry) => entry.rawExtractVerified !== true)
    .map((entry) => `${factionId}/${entry.sourceName}/${entry.display}`));
  assert.deepEqual(unsafe, [], `report-only candidates must fall back to backend names: ${unsafe.slice(0, 10).join("；")}`);
});

test("rule packages and rule UI use the same PDF titles as structured catalogs", () => {
  const sisters = rulePackage("docs/rules/factions/adepta-sororitas.js", "WarhammerWebsiteRules_adepta_sororitas");
  const mechanicus = rulePackage("docs/rules/factions/adeptus-mechanicus.js", "WarhammerWebsiteRules_adeptus_mechanicus");
  const orks = rulePackage("docs/rules/orks.js", "WarhammerOrksRules");
  assert.equal(sisters.unitRules["宫廷官"]?.find((rule) => rule.id === "unique-rapturous-blows")?.name, "狂热打击");
  assert.equal(mechanicus.unitRules["智控数据技师"]?.find((rule) => rule.id === "unique-battle-protocols")?.name, "战斗程序");
  const orkNames = Object.values(orks.unitRules || {}).flat().map((rule) => rule.name);
  assert.ok(orkNames.includes("开火口11"), "Orks rules must use the PDF Firing Deck 11 title");
  assert.ok(!orkNames.includes("射击甲板11"), "Orks rules must not retain the backend Firing Deck 11 title");
  const ruleMarkup = read("docs/app.js").match(/function calculatorRuleMarkup[\s\S]*?function calculatorContextMarkup/)?.[0] || "";
  assert.doesNotMatch(ruleMarkup, /displayNameFor/, "rule packages are canonical and must not be renamed by global terms in the UI");
});

test("every generated rule occurrence agrees with its faction catalog identity", () => {
  const ledger = JSON.parse(read("data/global/pdf-display-names.json"));
  let compared = 0;
  const mismatches = [];
  for (const factionId of Object.keys(ledger.abilities || {})) {
    const relativePath = factionId === "orks" ? "docs/rules/orks.js" : `docs/rules/factions/${factionId}.js`;
    if (!fs.existsSync(path.join(root, relativePath))) continue;
    const globalName = factionId === "orks"
      ? "WarhammerOrksRules"
      : `WarhammerWebsiteRules_${factionId.replaceAll("-", "_")}`;
    const rules = rulePackage(relativePath, globalName);
    const cardsByName = new Map(catalog(factionId).cards.map((candidate) => [candidate.name, candidate]));
    for (const [unitName, unitRules] of Object.entries(rules.unitRules || {})) {
      const abilities = cardsByName.get(unitName)?.abilities || [];
      for (const rule of unitRules || []) {
        const candidates = abilities.filter((ability) => ability.englishName === rule.source?.englishName);
        if (!candidates.length) continue;
        compared += 1;
        if (!candidates.some((ability) => ability.name === rule.name)) {
          mismatches.push(`${factionId}/${unitName}/${rule.source.englishName}: ${rule.name} != ${candidates.map((ability) => ability.name).join("|")}`);
        }
      }
    }
  }
  assert.ok(compared >= 1000, `expected broad rule/catalog identity coverage, compared ${compared}`);
  assert.deepEqual(mismatches, [], mismatches.slice(0, 20).join("\n"));
});

test("card display-name adjudication never overwrites model-profile identity", () => {
  const tankbustas = card("orks", "orks.tankbustas.cd03e48d");
  const gretchin = card("orks", "orks.gretchin.e526e829");
  assert.equal(tankbustas.name, "坦爆队");
  assert.equal(tankbustas.modelProfiles.find((profile) => profile.id === "trooper")?.name, "坦克破坏者");
  assert.notEqual(tankbustas.modelProfiles.find((profile) => profile.id === "trooper")?.name, tankbustas.name);
  assert.equal(gretchin.name, "屁精小队");
  assert.equal(gretchin.modelProfiles.find((profile) => profile.id === "trooper")?.name, "屁精");
  assert.notEqual(gretchin.modelProfiles.find((profile) => profile.id === "trooper")?.name, gretchin.name);
});

test("backend and English unit names remain aliases of the PDF canonical title", () => {
  const context = vm.createContext({ console });
  context.globalThis = context;
  vm.runInContext(read("docs/rules/faction-registry.js"), context);
  vm.runInContext(read("docs/rules/factions.js"), context);
  vm.runInContext(read("docs/rules/alias-registry.js"), context);
  vm.runInContext(read("docs/aliases/index.js"), context);

  assert.equal(context.WarhammerAliasRegistry.resolveUnit("orks", "怪枪小子"), "脏枪混混");
  assert.equal(context.WarhammerAliasRegistry.resolveUnit("orks", "Flash Gitz"), "脏枪混混");
  assert.equal(context.WarhammerAliasRegistry.resolveUnit("orks", "脏枪混混"), "脏枪混混");
  assert.match(
    read("docs/app.js"),
    /resolveUnit\?\.\(faction, rule\.unitName\)/,
    "rule headings must canonicalize their source unit name before rendering",
  );
});

test("every accepted PDF unit-title decision is reflected in generated catalogs", () => {
  const decisionPath = path.join(root, "data/global/pdf-display-names.json");
  assert.ok(fs.existsSync(decisionPath), "the accepted PDF display-name ledger must exist");
  const decisions = JSON.parse(fs.readFileSync(decisionPath, "utf8"));
  let decisionCount = 0;
  for (const [factionId, entries] of Object.entries(decisions.units || {})) {
    const cardsById = new Map(catalog(factionId).cards.map((candidate) => [candidate.id, candidate]));
    for (const entry of entries) {
      decisionCount += 1;
      const found = cardsById.get(entry.cardId);
      assert.ok(found, `${factionId}/${entry.cardId} decision must target a current card`);
      assert.equal(found.name, entry.display, `${factionId}/${entry.cardId} must use the accepted PDF title`);
      assert.equal(found.unit?.name, entry.display, `${factionId}/${entry.cardId} profile must use the accepted PDF title`);
      assert.ok(entry.evidence, `${factionId}/${entry.cardId} must retain page evidence`);
      assert.match(entry.sourceId, /^pdf-/, `${factionId}/${entry.cardId} must identify its PDF source`);
    }
  }
  assert.ok(decisionCount >= 300, "the ledger must cover the audited cross-faction PDF differences");
});

test("the generated provenance accounts for the full cross-faction adjudication", () => {
  const ledger = JSON.parse(read("data/global/pdf-display-names.json"));
  const context = vm.createContext({ console });
  context.globalThis = context;
  vm.runInContext(read("docs/rules/faction-registry.js"), context);
  vm.runInContext(read("docs/rules/factions.js"), context);
  vm.runInContext(read("docs/rules/alias-registry.js"), context);
  vm.runInContext(read("docs/aliases/index.js"), context);

  let appliedUnits = 0;
  let appliedAbilities = 0;
  let acceptedUnits = 0;
  let acceptedAbilities = 0;
  for (const [factionId, entries] of Object.entries(ledger.units || {})) {
    const generated = catalog(factionId);
    appliedUnits += generated._meta?.adjudication?.unitDisplayNamesApplied || 0;
    appliedAbilities += generated._meta?.adjudication?.abilityDisplayNamesApplied || 0;
    for (const entry of entries) {
      acceptedUnits += 1;
      for (const alias of [entry.display, entry.englishName, ...(entry.aliases || [])].filter(Boolean)) {
        assert.equal(
          context.WarhammerAliasRegistry.resolveUnit(factionId, alias),
          entry.display,
          `${factionId}/${alias} must resolve to the PDF title`,
        );
      }
    }
  }
  for (const [factionId, entries] of Object.entries(ledger.abilities || {})) {
    for (const entry of entries) {
      acceptedAbilities += 1;
      assert.match(entry.sourceId, /^pdf-/, `${factionId}/${entry.englishName} must identify its PDF source`);
      assert.ok(entry.evidence?.length, `${factionId}/${entry.englishName} must retain comparison evidence`);
    }
  }
  assert.equal(appliedUnits, acceptedUnits);
  assert.ok(acceptedUnits >= 340);
  assert.ok(appliedAbilities >= 2000, "the build must apply the restored PDF ability-title comparisons globally");
  assert.ok(acceptedAbilities >= 1000, "the ledger must cover the audited cross-faction PDF ability differences");
});

test("PDF canonicalization never collapses two live cards into one display name", () => {
  for (const filename of fs.readdirSync(path.join(root, "docs/catalogs")).filter((name) => name.endsWith(".json"))) {
    const generated = JSON.parse(fs.readFileSync(path.join(root, "docs/catalogs", filename), "utf8"));
    const names = new Set();
    for (const candidate of generated.cards || []) {
      assert.ok(!names.has(candidate.name), `${filename} contains duplicate canonical unit name: ${candidate.name}`);
      names.add(candidate.name);
    }
  }
});
