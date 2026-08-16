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

export function adjudicateCatalog({ catalog, factionId, packagePayload, ledger }) {
  const units = unitDecisionMap(ledger, factionId);
  const abilities = abilityDecisionMap(ledger, factionId);
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

  const canonicalBySourceName = new Map();
  for (const card of catalog.cards || []) {
    const decision = units.get(card.id);
    canonicalBySourceName.set(card.name, decision?.display || card.name);
  }

  let unitChanges = 0;
  let abilityChanges = 0;
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
    return {
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
      keywords: (card.keywords || []).map((keyword) => keyword === sourceUnitName ? displayUnitName : keyword),
    };
  });

  return {
    ...catalog,
    _meta: {
      ...(catalog._meta || {}),
      adjudication: {
        source: "data/global/pdf-display-names.json",
        unitDisplayNamesApplied: unitChanges,
        abilityDisplayNamesApplied: abilityChanges,
      },
    },
    cards,
  };
}

export function adjudicateRuleCatalog({ ruleCatalog, factionId, packagePayload, ledger }) {
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
  return { ...ruleCatalog, unitRules };
}

export function aliasesWithPdfCanonicalNames(packagePayload, ledger) {
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
  return { ...(packagePayload.aliases || {}), units };
}

export { normalizeIdentity };
