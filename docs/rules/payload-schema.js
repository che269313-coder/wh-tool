/* The only defaults used by calculator adapters and the simulation engine. */
(function (root) {
  const weaponEffects = Object.freeze({
    hitRerollFixedEnabled: false, hitRerollFixedAmount: 1, hitRerollFixedType: "ones", hitRerollFixedValues: [],
    hitRerollAllEnabled: false, hitRerollAllType: "ones", hitRerollAllValues: [], hitModifierEnabled: false, hitModifierValue: 0,
    hitCriticalEnabled: false, criticalHitThreshold: 6, woundRerollFixedEnabled: false, woundRerollFixedAmount: 1, woundRerollFixedType: "ones", woundRerollFixedValues: [],
    woundRerollAllEnabled: false, woundRerollAllType: "ones", woundRerollAllValues: [], woundModifierEnabled: false, woundModifierValue: 0,
    woundCriticalEnabled: false, criticalWoundThreshold: 6, sustainedHitsEnabled: false, sustainedHitsValue: "1", lethalHitsEnabled: false,
    devastatingWoundsEnabled: false, damageRerollEnabled: false, damageRerollType: "ones", damageRerollAmount: "1", damageRerollValues: [],
    criticalWoundApEnabled: false, criticalWoundApValue: 1, negatedWoundsEnabled: false, negatedWoundsCount: 1,
    hazardousEnabled: false, hazardousDamage: 1, precisionEnabled: false, psychicAttackEnabled: false, minimumUnmodifiedHit: 0,
  });
  const defenderEffects = Object.freeze({
    saveRerollFixedEnabled: false, saveRerollFixedAmount: 1, saveRerollFixedType: "ones", saveRerollFixedValues: [],
    saveRerollAllEnabled: false, saveRerollAllType: "ones", saveRerollAllValues: [], feelNoPainEnabled: false,
    feelNoPainThreshold: 6, feelNoPainMortalEnabled: false, feelNoPainMortalThreshold: 6, damageOverride: 0, incomingDamageModifier: 0, damageMultiplier: 1,
    ruleInvulnerableSave: 0, oneUseInvulnerableEnabled: false, oneUseInvulnerableSave: 2, leaderFeelNoPain: 0, saveBonusVsDamage1: false,
    feelNoPainPsychicEnabled: false, feelNoPainPsychicThreshold: 6,
  });

  const clone = (value) => Object.fromEntries(Object.entries(value).map(([key, item]) => [key, Array.isArray(item) ? [...item] : item]));
  const createWeaponEffects = (overrides = {}) => ({ ...clone(weaponEffects), ...overrides });
  const createDefenderEffects = (overrides = {}) => ({ ...clone(defenderEffects), ...overrides });

  const api = { weaponEffects, defenderEffects, createWeaponEffects, createDefenderEffects };
  root.WarhammerPayloadSchema = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis === "undefined" ? this : globalThis);
