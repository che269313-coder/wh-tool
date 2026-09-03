import fs from "node:fs";
import path from "node:path";

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const normalizeIdentity = (value) => String(value || "")
  .normalize("NFKC")
  .replace(/[\s\u00a0【】（）()，,。:：/／\-—_]+/g, "")
  .replace(/[’‘＇]/g, "'")
  .toLocaleLowerCase("en");

export function loadPdfDisplayLedger(root) {
  return JSON.parse(fs.readFileSync(path.join(root, "data", "global", "pdf-display-names.json"), "utf8"));
}

export function unitDecisionMap(ledger, factionId) {
  return new Map((ledger.units?.[factionId] || []).map((entry) => [entry.cardId, entry]));
}

function canonicalOf(entry) {
  return typeof entry === "string" ? entry : entry?.canonical;
}

function aliasesByCanonical(packagePayload) {
  const result = new Map();
  for (const [alias, entry] of Object.entries(packagePayload.aliases?.units || {})) {
    const canonical = canonicalOf(entry);
    if (!canonical) continue;
    if (!result.has(canonical)) result.set(canonical, []);
    result.get(canonical).push(alias);
  }
  return result;
}

function abilityDecisionMap(ledger, factionId) {
  const result = new Map();
  for (const entry of ledger.abilities?.[factionId] || []) {
    const key = `${normalizeIdentity(entry.sourceName)}\u0000${normalizeIdentity(entry.englishName)}`;
    if (!result.has(key)) result.set(key, []);
    result.get(key).push(entry);
  }
  return result;
}

function weaponDecisionMap(ledger, factionId) {
  const result = new Map();
  for (const entry of ledger.weapons?.[factionId] || []) {
    const key = `${entry.cardId}\u0000${entry.englishName}`;
    if (!result.has(key)) result.set(key, []);
    result.get(key).push(entry);
  }
  return result;
}

function validateDecisionSource(packagePayload, sourceId, policyLane, label) {
  const factionId = packagePayload.definition.id;
  const sources = packagePayload.sources || [];
  const declared = sources.find((source) => source.id === sourceId);
  if (!declared) throw new Error(`${factionId}/${label}: adjudication source ${sourceId} is not declared`);
  if (declared.kind !== "pdf-extract") {
    throw new Error(`${factionId}/${label}: adjudication source ${sourceId} is not a PDF extract`);
  }

  const priority = packagePayload.sourcePolicy?.[policyLane] || [];
  const selectedIndex = priority.indexOf(sourceId);
  if (selectedIndex < 0) {
    throw new Error(`${factionId}/${label}: ${sourceId} is absent from sourcePolicy.${policyLane}`);
  }
  for (const lowerSource of sources.filter((source) => source.id !== sourceId && source.kind !== "identity")) {
    const lowerIndex = priority.indexOf(lowerSource.id);
    if (lowerIndex >= 0 && lowerIndex < selectedIndex) {
      throw new Error(
        `${factionId}/${label}: ${sourceId} does not outrank ${lowerSource.id} in sourcePolicy.${policyLane}`,
      );
    }
  }
}

function resolveAbilityDisplay(decisions, cardNames, ability) {
  const key = `${normalizeIdentity(ability.name)}\u0000${normalizeIdentity(ability.englishName)}`;
  const candidates = decisions.get(key) || [];
  if (!candidates.length) return ability.name;
  const displays = [...new Set(candidates.map((entry) => entry.display))];
  if (displays.length === 1) return displays[0];

  const normalizedCardNames = new Set(cardNames.map(normalizeIdentity).filter(Boolean));
  const scoped = candidates.filter((entry) => (entry.units || []).some((unit) => normalizedCardNames.has(normalizeIdentity(unit))));
  const scopedDisplays = [...new Set(scoped.map((entry) => entry.display))];
  if (scopedDisplays.length === 1) return scopedDisplays[0];
  if (scopedDisplays.length > 1) {
    throw new Error(`PDF ability-title conflict for ${cardNames[0]}/${ability.englishName}: ${scopedDisplays.join(" | ")}`);
  }
  // This lower-priority/new unit is absent from the PDF comparison. If the
  // same source term has multiple PDF meanings, retaining it is safer than
  // borrowing another unit's title.
  return ability.name;
}

function replaceAbilityLabel(summary, sourceName, display) {
  if (!summary || !sourceName || sourceName === display) return summary;
  return String(summary).replace(
    new RegExp(`(^|[；;\\n])([\\t ]*)${escapeRegExp(sourceName)}(?=[\\t ]*[：:])`, "gu"),
    `$1$2${display}`,
  );
}

function weaponReplacements(decisions) {
  const exactLookup = new Map();
  const replacements = [];
  for (const decision of decisions) {
    const aliases = [...new Set([decision.sourceName, ...(decision.aliases || [])])].filter(Boolean);
    for (const alias of aliases) {
      const existing = exactLookup.get(alias);
      if (existing && existing !== decision.display) {
        throw new Error(`weapon term ${alias} maps to conflicting displays: ${existing} | ${decision.display}`);
      }
      exactLookup.set(alias, decision.display);
    }
    replacements.push({ aliases: aliases.sort((left, right) => right.length - left.length), display: decision.display });
  }
  return { exactLookup, replacements };
}

function replaceWeaponTermsInText(text, replacements, protectedTerms) {
  if (!text || typeof text !== "string") return text;
  // Longer names that merely contain an alias (火箭手枪 containing 手枪)
  // are protected with placeholders so the short alias never corrupts them.
  // Terms that are themselves aliases must NOT be protected: they need the
  // longest-first alias replacement to reach them.
  const aliasSet = new Set(replacements.flatMap(({ aliases }) => aliases));
  const protectedList = [...new Set(protectedTerms || [])]
    .filter((term) => term && !aliasSet.has(term) && replacements.some(({ aliases }) => aliases.some((alias) => alias !== term && term.includes(alias))))
    .sort((left, right) => right.length - left.length);
  const placeholders = [];
  let working = String(text);
  protectedList.forEach((term, index) => {
    if (!working.includes(term)) return;
    const placeholder = `\uE000${index}\uE001`;
    placeholders.push([placeholder, term]);
    working = working.split(term).join(placeholder);
  });
  // Global longest-first order: a longer alias from another decision must win
  // over a shorter alias nested inside it (神官雷射爆裂枪 vs 雷射爆裂枪).
  const orderedPairs = replacements
    .flatMap(({ aliases, display }) => aliases.map((alias) => [alias, display]))
    .sort((left, right) => right[0].length - left[0].length);
  for (const [alias, display] of orderedPairs) {
    if (working.includes(alias)) working = working.split(alias).join(display);
  }
  for (const [placeholder, term] of placeholders) working = working.split(placeholder).join(term);
  return working;
}

function applyWeaponTerms(card, decisions) {
  if (!decisions.length) return card;
  const { exactLookup, replacements } = weaponReplacements(decisions);
  // Two-character aliases (钩爪, 力爪, 圣洁) are too ambiguous for prose
  // replacement; structured name fields and inventory strings still converge.
  const proseReplacements = replacements
    .map(({ aliases, display }) => ({ aliases: aliases.filter((alias) => alias.length >= 3), display }))
    .filter(({ aliases }) => aliases.length);
  const weaponNames = new Set();
  for (const weapon of card.weapons || []) {
    if (weapon?.name) weaponNames.add(weapon.name);
  }
  for (const decision of decisions) {
    weaponNames.add(decision.sourceName);
    weaponNames.add(decision.display);
    for (const alias of decision.aliases || []) weaponNames.add(alias);
  }
  const walk = (node) => {
    if (Array.isArray(node)) {
      node.forEach((item) => { if (item && typeof item === "object") walk(item); });
      return;
    }
    if (!node || typeof node !== "object") return;
    for (const [key, value] of Object.entries(node)) {
      if (typeof value === "string") {
        if (key === "name" && exactLookup.has(value)) node[key] = exactLookup.get(value);
        else if (key === "defaultEquipment") node[key] = replaceWeaponTermsInText(value, replacements, weaponNames);
        else if (key === "text" || key === "abilities" || key === "activeAbilities" || key === "rawText") {
          node[key] = replaceWeaponTermsInText(value, proseReplacements, weaponNames);
        }
      } else if (key === "weaponNames" && Array.isArray(value)) {
        node[key] = value.map((item) => (typeof item === "string" && exactLookup.has(item) ? exactLookup.get(item) : item));
      } else if (value && typeof value === "object") walk(value);
    }
  };
  walk(card);
  return card;
}

export function adjudicateCatalog({ catalog, factionId, packagePayload, ledger }) {
  const units = unitDecisionMap(ledger, factionId);
  const abilities = abilityDecisionMap(ledger, factionId);
  const weapons = weaponDecisionMap(ledger, factionId);
  const packageAliases = aliasesByCanonical(packagePayload);
  const currentCards = new Map((catalog.cards || []).map((card) => [card.id, card]));

  for (const entry of units.values()) {
    const target = currentCards.get(entry.cardId);
    if (!target) throw new Error(`${factionId}/${entry.cardId}: PDF unit-title decision targets a missing card`);
    if (!(entry.aliases || []).includes(target.name) && target.name !== entry.display) {
      throw new Error(`${factionId}/${entry.cardId}: current name ${target.name} is absent from the PDF decision aliases`);
    }
    if (!entry.evidence || !entry.sourceId) throw new Error(`${factionId}/${entry.cardId}: incomplete PDF unit-title provenance`);
    validateDecisionSource(packagePayload, entry.sourceId, "displayName", entry.cardId);
  }
  for (const entry of ledger.abilities?.[factionId] || []) {
    if (!entry.evidence?.length || !entry.sourceId) {
      throw new Error(`${factionId}/${entry.englishName}: incomplete PDF ability-title provenance`);
    }
    if (entry.rawExtractVerified !== true) {
      throw new Error(`${factionId}/${entry.englishName}: report-only ability title is not verified against restored PDF text`);
    }
    validateDecisionSource(packagePayload, entry.sourceId, "rules", entry.englishName);
  }
  for (const entry of ledger.weapons?.[factionId] || []) {
    const label = `${entry.cardId}/${entry.englishName}`;
    if (!entry.evidence || !entry.sourceId) {
      throw new Error(`${factionId}/${label}: incomplete PDF weapon-name provenance`);
    }
    if (entry.rawExtractVerified !== true) {
      throw new Error(`${factionId}/${label}: report-only weapon name is not verified against restored PDF text`);
    }
    validateDecisionSource(packagePayload, entry.sourceId, "profiles", label);
    const target = currentCards.get(entry.cardId);
    if (!target) throw new Error(`${factionId}/${label}: PDF weapon decision targets a missing card`);
    const entries = weapons.get(`${entry.cardId}\u0000${entry.englishName}`) || [];
    if (entries.length > 1) {
      throw new Error(`${factionId}/${label}: duplicate PDF weapon decisions for one identity`);
    }
    const weapon = (target.weapons || []).find((candidate) => String(candidate.englishName || "").trim() === entry.englishName);
    if (!weapon) throw new Error(`${factionId}/${label}: PDF weapon decision targets a missing weapon`);
    const acceptedNames = new Set([entry.sourceName, ...(entry.aliases || [])].filter(Boolean));
    if (!acceptedNames.has(weapon.name)) {
      throw new Error(`${factionId}/${label}: current weapon name ${weapon.name} is absent from the PDF weapon decision aliases`);
    }
  }

  const canonicalBySourceName = new Map();
  for (const card of catalog.cards || []) {
    const decision = units.get(card.id);
    canonicalBySourceName.set(card.name, decision?.display || card.name);
  }

  let unitChanges = 0;
  let abilityChanges = 0;
  const appliedWeaponDecisions = new Set();
  const cards = (catalog.cards || []).map((card) => {
    const unitDecision = units.get(card.id);
    const sourceUnitName = card.name;
    const displayUnitName = unitDecision?.display || sourceUnitName;
    if (displayUnitName !== sourceUnitName) unitChanges += 1;
    const cardNames = [sourceUnitName, displayUnitName, ...(packageAliases.get(sourceUnitName) || [])];
    const abilityNameMap = new Map();
    const canonicalAbilities = (card.abilities || []).map((ability) => {
      const display = resolveAbilityDisplay(abilities, cardNames, ability);
      abilityNameMap.set(ability.name, display);
      if (display !== ability.name) abilityChanges += 1;
      return { ...ability, name: display };
    });
    const canonicalSummary = [...abilityNameMap].reduce(
      (summary, [sourceName, display]) => replaceAbilityLabel(summary, sourceName, display),
      card.unit?.abilities,
    );
    const canonicalActive = [...abilityNameMap].reduce(
      (summary, [sourceName, display]) => replaceAbilityLabel(summary, sourceName, display),
      card.unit?.activeAbilities,
    );
    const canonicalProfiles = (card.modelProfiles || []).map((profile) => ({
      ...profile,
      ...(Array.isArray(profile.matchIncludes) && displayUnitName !== sourceUnitName
        ? { matchIncludes: [...new Set([...profile.matchIncludes, sourceUnitName, displayUnitName])] }
        : {}),
    }));
    const canonicalLeader = card.leader ? {
      ...card.leader,
      eligibleUnits: (card.leader.eligibleUnits || []).map((name) => canonicalBySourceName.get(name) || name),
    } : card.leader;

    const cardWeaponDecisions = (card.weapons || []).map((weapon) => {
      const entries = weapons.get(`${card.id}\u0000${String(weapon.englishName || "").trim()}`);
      return entries?.[0];
    }).filter(Boolean);
    const canonicalWeapons = (card.weapons || []).map((weapon) => {
      const decision = weapons.get(`${card.id}\u0000${String(weapon.englishName || "").trim()}`)?.[0];
      if (!decision || decision.display === weapon.name) return weapon;
      appliedWeaponDecisions.add(`${card.id}\u0000${String(weapon.englishName || "").trim()}`);
      return { ...weapon, name: decision.display };
    });

    const adjudicated = applyWeaponTerms({
      ...card,
      name: displayUnitName,
      unit: card.unit ? {
        ...card.unit,
        name: card.unit.name === sourceUnitName ? displayUnitName : card.unit.name,
        abilities: canonicalSummary,
        activeAbilities: canonicalActive,
      } : card.unit,
      abilities: canonicalAbilities,
      modelProfiles: canonicalProfiles,
      leader: canonicalLeader,
      weapons: canonicalWeapons,
      keywords: (card.keywords || []).map((keyword) => keyword === sourceUnitName ? displayUnitName : keyword),
    }, cardWeaponDecisions);
    return adjudicated;
  });

  return {
    ...catalog,
    _meta: {
      ...(catalog._meta || {}),
      adjudication: {
        source: "data/global/pdf-display-names.json",
        unitDisplayNamesApplied: unitChanges,
        abilityDisplayNamesApplied: abilityChanges,
        weaponDisplayNamesApplied: appliedWeaponDecisions.size,
      },
    },
    cards,
  };
}

export function adjudicateRuleCatalog({ ruleCatalog, factionId, packagePayload, ledger, sourceCards = [] }) {
  const unitDecisions = ledger.units?.[factionId] || [];
  const abilities = abilityDecisionMap(ledger, factionId);
  const packageAliases = aliasesByCanonical(packagePayload);
  const displayByUnitName = new Map();
  for (const decision of unitDecisions) {
    for (const name of [decision.display, ...(decision.aliases || [])].filter(Boolean)) {
      const existing = displayByUnitName.get(name);
      if (existing && existing !== decision.display) {
        throw new Error(`${factionId}: rule unit name ${name} has conflicting PDF titles`);
      }
      displayByUnitName.set(name, decision.display);
    }
  }

  const unitRules = {};
  for (const [sourceUnitName, rules] of Object.entries(ruleCatalog.unitRules || {})) {
    const displayUnitName = displayByUnitName.get(sourceUnitName) || sourceUnitName;
    const cardNames = [sourceUnitName, displayUnitName, ...(packageAliases.get(sourceUnitName) || [])];
    if (unitRules[displayUnitName]) {
      throw new Error(`${factionId}: PDF rule adjudication collapses duplicate unit key ${displayUnitName}`);
    }
    unitRules[displayUnitName] = (rules || []).map((rule) => {
      const englishName = rule.source?.englishName || rule.englishName || "";
      const name = englishName
        ? resolveAbilityDisplay(abilities, cardNames, { name: rule.name, englishName })
        : rule.name;
      return { ...rule, name };
    });
  }

  // Weapon decisions also converge the raw rule text of the owning unit.
  const weaponDecisions = ledger.weapons?.[factionId] || [];
  const cardsById = new Map((sourceCards || []).map((card) => [card.id, card]));
  const decisionsByUnitKey = new Map();
  for (const decision of weaponDecisions) {
    const sourceCard = cardsById.get(decision.cardId);
    if (!sourceCard) {
      throw new Error(`${factionId}/${decision.cardId}/${decision.englishName}: weapon decision cannot be mapped to a source card`);
    }
    const unitKey = displayByUnitName.get(sourceCard.name) || sourceCard.name;
    if (!unitRules[unitKey]) {
      throw new Error(`${factionId}/${unitKey}: weapon decision targets a missing rule unit`);
    }
    if (!decisionsByUnitKey.has(unitKey)) decisionsByUnitKey.set(unitKey, []);
    decisionsByUnitKey.get(unitKey).push(decision);
  }
  if (decisionsByUnitKey.size) {
    const weaponNames = new Set();
    for (const card of sourceCards || []) {
      for (const weapon of card.weapons || []) {
        if (weapon?.name) weaponNames.add(weapon.name);
      }
    }
    for (const decision of weaponDecisions) {
      weaponNames.add(decision.sourceName);
      weaponNames.add(decision.display);
      for (const alias of decision.aliases || []) weaponNames.add(alias);
    }
    for (const [unitKey, decisions] of decisionsByUnitKey) {
      const { exactLookup, replacements } = weaponReplacements(decisions);
      unitRules[unitKey] = unitRules[unitKey].map((rule) => {
        const name = exactLookup.has(rule.name) ? exactLookup.get(rule.name) : rule.name;
        const text = replaceWeaponTermsInText(rule.text, replacements, weaponNames);
        return { ...rule, name, ...(text !== rule.text ? { text } : {}) };
      });
    }
  }
  return { ...ruleCatalog, unitRules };
}

export function aliasesWithPdfCanonicalNames(packagePayload, ledger, sourceCards = []) {
  const factionId = packagePayload.definition.id;
  const units = { ...(packagePayload.aliases?.units || {}) };
  for (const decision of ledger.units?.[factionId] || []) {
    const legacyNames = new Set(decision.aliases || []);
    for (const [alias, entry] of Object.entries(units)) {
      if (!legacyNames.has(canonicalOf(entry))) continue;
      units[alias] = typeof entry === "string"
        ? decision.display
        : { ...entry, canonical: decision.display };
    }
    const canonicalEntry = {
      canonical: decision.display,
      source: decision.evidence,
      scope: "faction",
    };
    for (const alias of [decision.display, decision.englishName, ...(decision.aliases || [])].filter(Boolean)) {
      const existing = units[alias];
      if (existing && canonicalOf(existing) !== decision.display && !legacyNames.has(canonicalOf(existing))) {
        throw new Error(`${factionId}: alias ${alias} conflicts with PDF canonical name ${decision.display}`);
      }
      units[alias] = existing && typeof existing !== "string"
        ? { ...existing, canonical: decision.display }
        : canonicalEntry;
    }
  }

  const weapons = { ...(packagePayload.aliases?.weapons || {}) };
  // A losing backend name must never become a weapon alias when the same
  // spelling is still the live name of a different weapon (orks 大砍刀:
  // Choppa's old name versus Big choppa's current name).
  const liveWeaponOwners = new Map();
  for (const card of sourceCards || []) {
    for (const weapon of card.weapons || []) {
      if (!weapon?.name) continue;
      const owners = liveWeaponOwners.get(weapon.name) || new Set();
      owners.add(weapon.englishName || "");
      liveWeaponOwners.set(weapon.name, owners);
    }
  }
  const isSafeAlias = (alias, englishName) => {
    const owners = liveWeaponOwners.get(alias);
    if (!owners || !owners.size) return true;
    return owners.size === 1 && owners.has(englishName);
  };
  // The English name only becomes an alias when every decision for it agrees
  // on one display (cross-card homographs like "Executioner" stay unresolved).
  const displaysByEnglishName = new Map();
  for (const decision of ledger.weapons?.[factionId] || []) {
    if (!decision.englishName) continue;
    const displays = displaysByEnglishName.get(decision.englishName) || new Set();
    displays.add(decision.display);
    displaysByEnglishName.set(decision.englishName, displays);
  }
  const englishAliasSafe = (englishName) => {
    const displays = displaysByEnglishName.get(englishName);
    return displays && displays.size === 1;
  };
  // A backend alias must map to exactly one display across the faction.
  const displaysByAlias = new Map();
  for (const decision of ledger.weapons?.[factionId] || []) {
    for (const alias of [decision.sourceName, ...(decision.aliases || [])].filter(Boolean)) {
      const displays = displaysByAlias.get(alias) || new Set();
      displays.add(decision.display);
      displaysByAlias.set(alias, displays);
    }
  }
  const aliasSafe = (alias) => {
    const displays = displaysByAlias.get(alias);
    return displays && displays.size === 1;
  };
  // A losing name that is itself another decision's display must not alias
  // away that live canonical (chaos-space-marines 重型近战武器).
  const displayOwners = new Map();
  for (const decision of ledger.weapons?.[factionId] || []) {
    if (!decision.display) continue;
    const owners = displayOwners.get(decision.display) || new Set();
    owners.add(decision.englishName || "");
    displayOwners.set(decision.display, owners);
  }
  const legacyAliasSafe = (alias, englishName) => {
    const owners = displayOwners.get(alias);
    if (owners && [...owners].some((owner) => owner && owner !== englishName)) return false;
    return aliasSafe(alias) && isSafeAlias(alias, englishName);
  };
  for (const decision of ledger.weapons?.[factionId] || []) {
    const legacyNames = new Set([decision.sourceName, ...(decision.aliases || [])].filter(Boolean));
    for (const [alias, entry] of Object.entries(weapons)) {
      if (!legacyNames.has(canonicalOf(entry))) continue;
      weapons[alias] = typeof entry === "string"
        ? decision.display
        : { ...entry, canonical: decision.display };
    }
    const canonicalEntry = {
      canonical: decision.display,
      source: decision.evidence,
      scope: "faction",
    };
    const aliases = [decision.display];
    if (englishAliasSafe(decision.englishName)) aliases.push(decision.englishName);
    for (const alias of [decision.sourceName, ...(decision.aliases || [])]) {
      if (legacyAliasSafe(alias, decision.englishName)) aliases.push(alias);
    }
    for (const alias of [...new Set(aliases)].filter(Boolean)) {
      const existing = weapons[alias];
      if (existing && canonicalOf(existing) !== decision.display && !legacyNames.has(canonicalOf(existing))) {
        throw new Error(`${factionId}: weapon alias ${alias} conflicts with PDF canonical name ${decision.display}`);
      }
      weapons[alias] = existing && typeof existing !== "string"
        ? { ...existing, canonical: decision.display }
        : canonicalEntry;
    }
  }

  return { ...(packagePayload.aliases || {}), units, weapons };
}

export { normalizeIdentity };
