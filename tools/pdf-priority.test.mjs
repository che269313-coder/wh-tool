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
  assert.doesNotMatch(flashGitz.unit.abilities, /华丽枪|酱菜枪/);
  const snazzgun = flashGitz.weapons.find((weapon) => weapon.englishName === "Snazzgun");
  assert.equal(snazzgun?.name, "魔改炫枪", "Snazzgun must use the PDF weapon title");
  const choppa = flashGitz.weapons.find((weapon) => weapon.englishName === "Choppa");
  assert.equal(choppa?.name, "砍刀", "Choppa must use the PDF weapon title");
  assert.ok(!flashGitz.weapons.some((weapon) => weapon.name === "华丽枪"));
  assert.ok(!flashGitz.wargearOptions?.some((group) => group.options?.some((option) => option.name === "华丽枪")));
  assert.equal(flashGitz.unit.defaultEquipment, "魔改炫枪；砍刀");
  const trooper = flashGitz.modelProfiles.find((profile) => profile.id === "trooper");
  assert.deepEqual(trooper?.weaponNames, ["魔改炫枪", "砍刀", "Ammo Runt"]);
  assert.equal(trooper?.defaultEquipment, "魔改炫枪；砍刀");
  const gunCrazy = flashGitz.abilities.find((ability) => ability.englishName === "Gun-crazy Show-offs");
  assert.match(gunCrazy?.text || "", /魔改炫枪/);
  assert.doesNotMatch(gunCrazy?.text || "", /酱菜枪|华丽枪/);
  assert.doesNotMatch(JSON.stringify(flashGitz), /华丽枪|酱菜枪/, "the Snazzgun backend names must not leak anywhere in the card");

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

test("every accepted PDF weapon decision is applied in generated catalogs", () => {
  const ledger = JSON.parse(read("data/global/pdf-display-names.json"));
  let acceptedWeapons = 0;
  let appliedWeapons = 0;
  for (const [factionId, entries] of Object.entries(ledger.weapons || {})) {
    const generated = catalog(factionId);
    appliedWeapons += generated._meta?.adjudication?.weaponDisplayNamesApplied || 0;
    const cardsById = new Map(generated.cards.map((candidate) => [candidate.id, candidate]));
    for (const entry of entries) {
      acceptedWeapons += 1;
      const found = cardsById.get(entry.cardId);
      assert.ok(found, `${factionId}/${entry.cardId} weapon decision must target a current card`);
      const weapon = (found.weapons || []).find((candidate) => String(candidate.englishName || "").trim() === entry.englishName);
      assert.ok(weapon, `${factionId}/${entry.cardId}/${entry.englishName} weapon decision must target a current weapon`);
      assert.equal(weapon.name, entry.display, `${factionId}/${entry.cardId}/${entry.englishName} must use the accepted PDF weapon title`);
      assert.ok(entry.evidence, `${factionId}/${entry.cardId}/${entry.englishName} must retain page evidence`);
      assert.match(entry.sourceId, /^pdf-/, `${factionId}/${entry.cardId}/${entry.englishName} must identify its PDF source`);
    }
  }
  assert.equal(appliedWeapons, acceptedWeapons, "every accepted weapon decision must change the catalog");
  assert.ok(acceptedWeapons >= 100, "the ledger must cover the audited cross-faction PDF weapon differences");
});

test("no accepted PDF weapon decision keeps its backend name in the owning card", () => {
  const ledger = JSON.parse(read("data/global/pdf-display-names.json"));
  const splitTokens = (value) => String(value || "").split(/[；;，,、]/).map((token) => token.trim()).filter(Boolean);
  const uncoveredOccurrence = (text, alias, vocabulary) => {
    const source = String(text || "");
    if (!source.includes(alias)) return false;
    let cursor = 0;
    while (true) {
      const index = source.indexOf(alias, cursor);
      if (index < 0) return false;
      const covered = vocabulary.some((term) => term.length > alias.length && term.includes(alias) && (() => {
        const termIndex = source.lastIndexOf(term, index + alias.length - 1);
        return termIndex >= 0 && termIndex <= index && index + alias.length <= termIndex + term.length;
      })());
      if (!covered) return true;
      cursor = index + alias.length;
    }
  };
  for (const [factionId, entries] of Object.entries(ledger.weapons || {})) {
    const cardsById = new Map(catalog(factionId).cards.map((candidate) => [candidate.id, candidate]));
    for (const entry of entries) {
      const found = cardsById.get(entry.cardId);
      const aliases = [entry.sourceName, ...(entry.aliases || [])].filter(Boolean);
      const vocabulary = (found.weapons || []).map((weapon) => weapon.name).filter(Boolean);
      for (const alias of aliases) {
        assert.ok(!(found.weapons || []).some((weapon) => weapon.name === alias), `${factionId}/${entry.cardId}: weapon named ${alias} survived adjudication`);
        for (const token of splitTokens(found.unit?.defaultEquipment)) {
          assert.notEqual(token, alias, `${factionId}/${entry.cardId}: default equipment retains ${alias}`);
        }
        for (const profile of found.modelProfiles || []) {
          assert.ok(!(profile.weaponNames || []).includes(alias), `${factionId}/${entry.cardId}/${profile.id}: weaponNames retain ${alias}`);
          for (const token of splitTokens(profile.defaultEquipment)) {
            assert.notEqual(token, alias, `${factionId}/${entry.cardId}/${profile.id}: profile equipment retains ${alias}`);
          }
        }
        for (const group of found.wargearOptions || []) {
          for (const option of group.options || []) {
            if (typeof option.name === "string") assert.notEqual(option.name, alias, `${factionId}/${entry.cardId}: option retains ${alias}`);
          }
        }
        const texts = [
          found.unit?.abilities,
          found.unit?.activeAbilities,
          ...(found.abilities || []).map((ability) => ability.text || ""),
          found.extraction?.rawText || "",
        ];
        if (alias.length < 3) continue; // short aliases are too ambiguous for prose adjudication
        for (const text of texts) {
          assert.ok(
            !uncoveredOccurrence(text, alias, vocabulary),
            `${factionId}/${entry.cardId}/${entry.englishName}: ${alias} remains in card text`,
          );
        }
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
  // 核心技能（含射击甲板/开火口）已合并为"核心技能"束，PDF 标题检查覆盖名字与束文本。
  const orkStrings = Object.values(orks.unitRules || {}).flat().flatMap((rule) => [rule.name, rule.text || ""]);
  assert.ok(orkStrings.some((value) => value.includes("开火口11")), "Orks rules must use the PDF Firing Deck 11 title");
  assert.ok(!orkStrings.some((value) => value.includes("射击甲板11")), "Orks rules must not retain the backend Firing Deck 11 title");
  const flashGitzRules = orks.unitRules["脏枪混混"] || [];
  assert.match(
    flashGitzRules.map((rule) => rule.text || "").join("\n"),
    /魔改炫枪/,
    "Orks rules must use the PDF Snazzgun weapon title",
  );
  assert.doesNotMatch(
    flashGitzRules.map((rule) => rule.text || "").join("\n"),
    /华丽枪|酱菜枪/,
    "Orks rules must not retain backend Snazzgun terms",
  );
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
        // 核心技能束（normalizeCoreAbilityRules 产物）的 englishName 是逗号清单，逐项比对。
        const englishNames = String(rule.source?.englishName || "").split(", ").filter(Boolean);
        const isCoreBundle = rule.id === "core-bundle" || rule.name === "核心技能";
        const candidates = abilities.filter((ability) => englishNames.includes(ability.englishName));
        if (!candidates.length) continue;
        compared += 1;
        if (isCoreBundle) {
          const bundleNames = String(rule.text || "").split("，");
          for (const ability of candidates) {
            if (!bundleNames.includes(ability.name)) {
              mismatches.push(`${factionId}/${unitName}/${ability.englishName}: 核心技能束缺少目录名 ${ability.name}`);
            }
          }
        } else if (!candidates.some((ability) => ability.name === rule.name)) {
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
  assert.equal(context.WarhammerAliasRegistry.resolveWeapon("orks", "华丽枪"), "魔改炫枪");
  assert.equal(context.WarhammerAliasRegistry.resolveWeapon("orks", "魔改炫枪"), "魔改炫枪");
  assert.equal(context.WarhammerAliasRegistry.resolveWeapon("orks", "Snazzgun"), "魔改炫枪");
  assert.equal(context.WarhammerAliasRegistry.resolveWeapon("orks", "鼻涕虫枪"), "手铳");
  assert.equal(context.WarhammerAliasRegistry.resolveWeapon("orks", "大砍刀"), "大砍刀", "a losing name that is still a live weapon name must not alias away");
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
  let acceptedWeapons = 0;
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
  for (const entries of Object.values(ledger.weapons || {})) {
    for (const entry of entries) {
      acceptedWeapons += 1;
      assert.match(entry.sourceId, /^pdf-/, `${entry.cardId}/${entry.englishName} must identify its PDF source`);
      assert.ok(entry.evidence, `${entry.cardId}/${entry.englishName} must retain page evidence`);
    }
  }
  assert.equal(appliedUnits, acceptedUnits);
  assert.ok(acceptedUnits >= 340);
  assert.ok(appliedAbilities >= 2000, "the build must apply the restored PDF ability-title comparisons globally");
  assert.ok(acceptedAbilities >= 1000, "the ledger must cover the audited cross-faction PDF ability differences");
  assert.ok(acceptedWeapons >= 100, "the ledger must cover the audited cross-faction PDF weapon differences");
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
