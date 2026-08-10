/* Machine-readable contract for every effect accepted by the resolver. */
(function (root) {
  const core = (required = []) => Object.freeze({ owner: "core", required: Object.freeze(required) });
  const schemas = Object.freeze({
    "fnp": core(["threshold"]),
    "fnp-mortal": core(["threshold"]),
    "leader-fnp": core(["threshold"]),
    "ignore-hit-modifiers": core(),
    "damage-override": core(["value"]),
    "incoming-damage-modifier": core(["value"]),
    "repeat-ranged": core(),
    "incoming-ap": core(["value"]),
    "damaged-hit-minus": core(["threshold"]),
    "hit-reroll": core(),
    "wound-reroll": core(),
    "hit-modifier": core(["value"]),
    "wound-modifier": core(["value"]),
    "sustained-hits": core(),
    "lethal-hits": core(),
    "devastating-wounds": core(),
    "attack-modifier": core(["value"]),
    "rapid-fire-attack-modifier": core(["value"]),
    "target-toughness-modifier": core(["value"]),
    "target-melee-hit-minus": core(),
    "target-hit-minus": core(),
    "weapon-strength-modifier": core(["value"]),
    "weapon-attack-modifier": core(["weaponName", "value"]),
    "weapon-ap-modifier": core(["value"]),
    "ap-vs-infantry": core(),
    "damage-modifier": core(["value"]),
    "damage-minus": core(),
    "damage-reroll": core(),
    "weapon-attack-override": core(["weaponName", "value"]),
    "hit-critical-threshold": core(["value"]),
    "wound-critical-threshold": core(["value"]),
    "target-save-modifier": core(["value"]),
    "incoming-hit-minus": core(),
    "incoming-wound-minus": core(),
    "incoming-wound-when-strength-gte": core(),
    "incoming-wound-when-strength-gt": core(["value"]),
    "damage-halving": core(),
    "save-bonus-vs-d1": core(),
    "save-reroll": core(),
    "invulnerable-save": core(["value"]),
  });
  const conditions = Object.freeze(new Set(["underStartingStrength", "belowHalfStrength", "large-or-led", "targetBelowHalf"]));
  const activations = Object.freeze(new Set(["passive"]));
  const phases = Object.freeze(new Set(["ranged", "melee"]));
  const operations = Object.freeze(new Set(["override"]));

  function validateEffect(effect) {
    const errors = [];
    const schema = schemas[effect?.type];
    if (!schema) return [`未注册的 effect.type：${effect?.type || "<empty>"}`];
    schema.required.forEach((field) => {
      if (effect[field] === undefined || effect[field] === null || effect[field] === "") errors.push(`${effect.type} 缺少必填字段 ${field}`);
    });
    if (effect.condition && !conditions.has(effect.condition)) errors.push(`${effect.type} 使用非法 condition：${effect.condition}`);
    if (effect.activation && !activations.has(effect.activation)) errors.push(`${effect.type} 使用非法 activation：${effect.activation}`);
    if (effect.phase && !phases.has(effect.phase)) errors.push(`${effect.type} 使用非法 phase：${effect.phase}`);
    if (effect.operation && !operations.has(effect.operation)) errors.push(`${effect.type} 使用非法 operation：${effect.operation}`);
    if (effect.selection) {
      if (!effect.selection.controlId) errors.push(`${effect.type} selection 缺少 controlId`);
      if (!Object.prototype.hasOwnProperty.call(effect.selection, "equals")) errors.push(`${effect.type} selection 缺少 equals`);
    }
    return errors;
  }

  function validateRules(rules) {
    const errors = [];
    (rules || []).forEach((rule) => {
      const effects = Array.isArray(rule.effects) ? rule.effects : (rule.effect ? [rule.effect] : []);
      const controlIds = new Set((rule.controls || []).map((control) => control.id));
      effects.forEach((effect) => {
        validateEffect(effect).forEach((error) => errors.push(`${rule.id || rule.name || "<rule>"}: ${error}`));
        if (effect.selection?.controlId && !controlIds.has(effect.selection.controlId)) errors.push(`${rule.id || rule.name || "<rule>"}: selection 引用了未声明控件 ${effect.selection.controlId}`);
        if (effect.conditionOverrideControlId && !controlIds.has(effect.conditionOverrideControlId)) errors.push(`${rule.id || rule.name || "<rule>"}: conditionOverrideControlId 引用了未声明控件 ${effect.conditionOverrideControlId}`);
      });
    });
    return errors;
  }

  function validateCatalog(catalog) {
    return validateRules([...(catalog?.factionRules || []), ...Object.values(catalog?.unitRules || {}).flat()]);
  }

  root.WarhammerEffectSchema = { schemas, conditions, activations, phases, operations, validateEffect, validateRules, validateCatalog };
})(typeof globalThis === "undefined" ? this : globalThis);
