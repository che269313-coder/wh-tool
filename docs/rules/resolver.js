/* Generic rules adapter. It translates declarative faction data into the
 * calculator's neutral effect fields; engine.js never imports faction data. */
(function (root) {
  const registry = root.WarhammerFactionRegistry;
  const emptyCatalog = Object.freeze({ factionRules: [], unitRules: {} });

  function detachmentsForFaction(faction) {
    const definition = registry?.resolve(faction);
    if (!definition) return [];
    return root.WarhammerDetachmentRegistry?.get(definition.id) || [];
  }

  const normalizedMatchText = (value) => String(value || "")
    .normalize("NFKC")
    .replace(/\*\*/g, "")
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, "")
    .toLocaleLowerCase();

  function matchDetachments(faction, sourceText) {
    const source = normalizedMatchText(sourceText);
    if (!source) return [];
    return detachmentsForFaction(faction)
      .map((detachment) => {
        const positions = (detachment.aliases || [detachment.name, detachment.englishName])
          .map(normalizedMatchText)
          .filter(Boolean)
          .map((alias) => source.indexOf(alias))
          .filter((position) => position >= 0);
        return { detachment, position: positions.length ? Math.min(...positions) : -1 };
      })
      .filter((match) => match.position >= 0)
      .sort((left, right) => left.position - right.position || left.detachment.ordinal - right.detachment.ordinal)
      .map((match) => match.detachment);
  }

  function selectedDetachments(faction, detachmentIds) {
    const wanted = new Set(Array.isArray(detachmentIds) ? detachmentIds : [detachmentIds].filter(Boolean));
    return detachmentsForFaction(faction).filter((detachment) => wanted.has(detachment.id));
  }

  function matchEnhancement(faction, detachmentIds, sourceText) {
    const source = normalizedMatchText(String(sourceText || "").split(/[；;]/)[0]);
    if (!source) return null;
    const enhancements = selectedDetachments(faction, detachmentIds).flatMap((detachment) => detachment.enhancements || []);
    return enhancements.find((enhancement) => [enhancement.name, enhancement.englishName]
      .map(normalizedMatchText)
      .filter(Boolean)
      .some((alias) => source === alias || source.includes(alias))) || null;
  }

  function rulesForDetachments(faction, detachmentIds, enhancementIds = []) {
    const enhancementSet = new Set(enhancementIds || []);
    const detachments = selectedDetachments(faction, detachmentIds);
    return {
      detachments,
      rules: detachments.flatMap((detachment) => [detachment.rule, ...(detachment.stratagems || [])]),
      enhancements: detachments.flatMap((detachment) => (detachment.enhancements || []).filter((item) => enhancementSet.has(item.id))),
    };
  }

  function rulesForUnit(faction, unitName) {
    const definition = registry?.resolve(faction);
    if (!definition) return { faction: [], unit: [] };
    const data = root[definition.rulesGlobal] || emptyCatalog;
    const name = registry.resolveUnitName(definition.id, unitName);
    const factionRules = (data.factionRules || []).filter((rule) => !rule.appliesTo?.unitTag || registry.unitHasTag(definition.id, name, rule.appliesTo.unitTag));
    return { faction: factionRules, unit: data.unitRules?.[name] || [] };
  }

  function rulesForUnits(faction, unitNames) {
    const seen = new Set();
    const factionRules = [];
    const unitRules = [];
    (unitNames || []).filter(Boolean).forEach((name) => {
      const rules = rulesForUnit(faction, name);
      rules.faction.forEach((rule) => { if (!seen.has(rule.id)) { seen.add(rule.id); factionRules.push(rule); } });
      rules.unit.forEach((rule) => { const key = `${name}:${rule.id}`; if (!seen.has(key)) { seen.add(key); unitRules.push({ ...rule, unitName: name }); } });
    });
    return { faction: factionRules, unit: unitRules };
  }

  const selected = (selections, rule, controlId, fallback = false) => {
    for (const id of [rule.id, ...(rule.legacyIds || [])]) {
      const key = `${id}.${controlId}`;
      if (selections && Object.prototype.hasOwnProperty.call(selections, key)) return selections[key];
    }
    return fallback;
  };
  const enabled = (selections, rule, controlId = "enabled") => Boolean(selected(selections, rule, controlId, false));
  const emptyResolution = () => ({
    attack: { hitModifier: 0, woundModifier: 0, hitReroll: null, woundReroll: null, devastating: false, sustainedHits: 0, lethalHits: false, attackModifier: 0, weaponAttackModifiers: [], strengthModifier: 0, apModifier: 0, damageModifier: 0, targetToughnessModifier: 0, targetHitModifier: 0, targetMeleeHitModifier: 0, targetSaveModifier: 0, repeatRanged: false, weaponAttackOverride: null, ignoreHitModifiers: false, contributions: [] },
    defend: { invulnerableSave: 0, damageOverride: 0, incomingDamageModifier: 0, feelNoPain: 0, feelNoPainMortal: 0, incomingApModifier: 0, incomingHitModifier: 0, incomingWoundModifier: 0, incomingWoundWhenStrengthGreater: 0, incomingWoundWhenStrengthGreaterOrEqual: 0, contributions: [] },
    notes: [],
  });

  function applyRules(rules, selections, context, resolution) {
    const { attack, defend, notes } = resolution;
    (rules || []).forEach((rule) => {
      const effects = Array.isArray(rule.effects) ? rule.effects : (rule.effect ? [rule.effect] : []);
      effects.forEach((effect) => {
        const forceLeader = enabled(selections, rule, "forceLeader");
        if (effect.requiresJoined && !context.isJoined && !forceLeader) return;
        if (effect.phase && effect.phase !== context.phase) return;
        root.WarhammerRuleEffects?.apply(effect, { rule, selections, context, attack, defend, selected, enabled });
      });
      if (rule.status) notes.push({ id: rule.id, name: rule.name, status: rule.status });
    });
    return resolution;
  }

  function resolveUnit(faction, unitName, selections = {}, context = {}) {
    const rules = rulesForUnit(faction, unitName).unit;
    return applyRules(rules, selections, context, emptyResolution());
  }

  function unitEffectIsShared(effect) {
    return effect.effectScope === "unit" || effect.scope === "unit" || effect.requiresJoined === true;
  }

  function rulesForUnitScope(faction, unitName, effectScope) {
    return rulesForUnit(faction, unitName).unit.map((rule) => {
      const effects = (Array.isArray(rule.effects) ? rule.effects : (rule.effect ? [rule.effect] : []))
        .filter((effect) => effectScope === "unit" ? unitEffectIsShared(effect) : !unitEffectIsShared(effect));
      return { ...rule, effects, effect: undefined };
    }).filter((rule) => rule.effects.length);
  }

  function resolveUnitScoped(faction, unitName, effectScope, selections = {}, context = {}) {
    return applyRules(rulesForUnitScope(faction, unitName, effectScope), selections, context, emptyResolution());
  }

  function resolveFaction(faction, selections = {}, context = {}) {
    const rules = rulesForUnit(faction, context.unitName || "").faction;
    const { attack, defend, notes } = emptyResolution();
    rules.forEach((rule) => {
      const effects = Array.isArray(rule.effects) ? rule.effects : (rule.effect ? [rule.effect] : []);
      effects.forEach((effect) => {
        if (effect.phase && effect.phase !== context.phase) return;
        root.WarhammerRuleEffects?.apply(effect, { rule, selections, context, attack, defend, selected, enabled });
      });
      if (rule.status) notes.push({ name: rule.name, status: rule.status });
    });
    return { attack, defend, notes };
  }

  function resolveDetachments(faction, detachmentIds, selections = {}, context = {}) {
    const catalog = rulesForDetachments(faction, detachmentIds, context.enhancementIds || []);
    const enhancements = catalog.enhancements.filter((enhancement) => !context.enhancementScope || enhancement.effectScope === context.enhancementScope);
    return applyRules([...catalog.rules, ...enhancements], selections, context, emptyResolution());
  }

  function resolveUnitWithDetachments(faction, unitName, detachmentIds, enhancementIds, selections = {}, context = {}) {
    const unitRules = rulesForUnit(faction, unitName).unit;
    const detachmentRules = rulesForDetachments(faction, detachmentIds, enhancementIds);
    return applyRules(
      [...unitRules, ...detachmentRules.rules, ...detachmentRules.enhancements],
      selections,
      { ...context, enhancementIds },
      emptyResolution(),
    );
  }

  function resolveUnitWithEnhancements(faction, unitName, detachmentIds, enhancementIds, selections = {}, context = {}) {
    const unitRules = context.unitEffectScope
      ? rulesForUnitScope(faction, unitName, context.unitEffectScope)
      : rulesForUnit(faction, unitName).unit;
    const enhancements = rulesForDetachments(faction, detachmentIds, enhancementIds).enhancements
      .filter((enhancement) => !context.enhancementScope || enhancement.effectScope === context.enhancementScope);
    return applyRules([...unitRules, ...enhancements], selections, { ...context, enhancementIds }, emptyResolution());
  }

  root.WarhammerRuleResolver = {
    rulesForUnit,
    rulesForUnits,
    resolveUnit,
    resolveUnitScoped,
    resolveFaction,
    detachmentsForFaction,
    matchDetachments,
    matchEnhancement,
    rulesForDetachments,
    resolveDetachments,
    resolveUnitWithDetachments,
    resolveUnitWithEnhancements,
  };
})(typeof globalThis === "undefined" ? this : globalThis);
