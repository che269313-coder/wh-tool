/* Pure derived combat state consumed by both UI and engine adapters. */
(function (root) {
  function resolveHit({ baseTarget, modifiers = [], reroll = { mode: "none" }, criticalTarget = 6, minimumUnmodifiedHit = 0 }) {
    const target = Number(baseTarget || 0);
    const contributions = modifiers
      .map((modifier) => ({ sourceId: String(modifier.sourceId || "unknown"), value: Number(modifier.value || 0) }))
      .filter((modifier) => modifier.value !== 0);
    const modifierTotal = contributions.reduce((sum, modifier) => sum + modifier.value, 0);
    const effectiveTarget = target ? Math.min(6, Math.max(2, target - modifierTotal)) : 0;
    const minimumFace = Math.max(0, Math.min(6, Number(minimumUnmodifiedHit || 0)));
    const successFaces = effectiveTarget ? [1, 2, 3, 4, 5, 6].filter((face) => face >= effectiveTarget && (!minimumFace || face >= minimumFace)) : [];
    const resolvedReroll = { ...reroll };
    if (reroll.mode === "failed") resolvedReroll.faces = [1, 2, 3, 4, 5, 6].filter((face) => face < effectiveTarget);
    else resolvedReroll.faces = [...(reroll.faces || [])].map(Number);
    return Object.freeze({
      baseTarget: target,
      criticalTarget: Number(criticalTarget || 6),
      minimumUnmodifiedHit: minimumFace,
      contributions: Object.freeze(contributions),
      modifierTotal,
      effectiveTarget,
      successFaces: Object.freeze(successFaces),
      reroll: Object.freeze(resolvedReroll),
    });
  }

  function composeWoundModifier({ unitModifier = 0, factionModifier = 0, incomingModifier = 0, conditionalModifier = 0 } = {}) {
    return Number(unitModifier || 0)
      + Number(factionModifier || 0)
      + Number(incomingModifier || 0)
      + Number(conditionalModifier || 0);
  }

  function weaponAttackModifier(modifiers = [], weaponName = "") {
    return (modifiers || [])
      .filter((modifier) => String(modifier.weaponName || "") === String(weaponName || ""))
      .reduce((sum, modifier) => sum + Number(modifier.value || 0), 0);
  }

  function validateRangedWeaponAllocation({ modelCount = 0, closeRangeModelCounts = [], otherModelCounts = [] } = {}) {
    const capacity = Math.max(0, Number(modelCount || 0));
    const closeRangeModels = Math.max(0, ...(closeRangeModelCounts || []).map((value) => Number(value || 0)));
    const otherModels = Math.max(0, ...(otherModelCounts || []).map((value) => Number(value || 0)));
    return Object.freeze({
      valid: closeRangeModels + otherModels <= capacity,
      modelCount: capacity,
      closeRangeModels,
      otherModels,
    });
  }

  function validateMeleeWeaponAllocation({ modelCount = 0, extraAttackModelCounts = [], otherModelCounts = [] } = {}) {
    const capacity = Math.max(0, Number(modelCount || 0));
    const extraAttackModels = Math.max(0, ...(extraAttackModelCounts || []).map((value) => Number(value || 0)));
    const otherModels = (otherModelCounts || []).reduce((sum, value) => sum + Math.max(0, Number(value || 0)), 0);
    return Object.freeze({
      valid: extraAttackModels <= capacity && otherModels <= capacity,
      modelCount: capacity,
      extraAttackModels,
      otherModels,
    });
  }

  function applyLeaderGrantedDefenses(groups = []) {
    const threshold = (groups || [])
      .filter((group) => !group.isLeader)
      .map((group) => Number(group.effects?.leaderFeelNoPain || 0))
      .filter((value) => value >= 2 && value <= 6)
      .reduce((best, value) => best ? Math.min(best, value) : value, 0);
    if (!threshold) return [...groups];
    return groups.map((group) => {
      if (!group.isLeader) return group;
      const currentRegular = group.effects?.feelNoPainEnabled ? Number(group.effects.feelNoPainThreshold || 6) : 0;
      const currentMortal = group.effects?.feelNoPainMortalEnabled ? Number(group.effects.feelNoPainMortalThreshold || 6) : 0;
      return {
        ...group,
        effects: {
          ...group.effects,
          feelNoPainEnabled: true,
          feelNoPainThreshold: currentRegular ? Math.min(currentRegular, threshold) : threshold,
          feelNoPainMortalEnabled: true,
          feelNoPainMortalThreshold: currentMortal ? Math.min(currentMortal, threshold) : threshold,
        },
      };
    });
  }

  function initializeOptionalExclusiveWeapons(weapons = []) {
    const initialized = (weapons || []).map((weapon) => ({ ...weapon }));
    const groups = new Map();
    initialized.forEach((weapon, index) => {
      const group = String(weapon.selectionGroup || "").trim();
      if (!group) return;
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(index);
    });
    groups.forEach((indexes) => {
      if (indexes.length < 2) return;
      const selectedIndex = indexes.find((index) => initialized[index].enabled && initialized[index].defaultSelected);
      indexes.forEach((index) => { initialized[index].enabled = index === selectedIndex; });
    });
    return initialized;
  }

  root.WarhammerCombatState = {
    resolveHit,
    composeWoundModifier,
    weaponAttackModifier,
    validateRangedWeaponAllocation,
    validateMeleeWeaponAllocation,
    applyLeaderGrantedDefenses,
    initializeOptionalExclusiveWeapons,
  };
})(typeof globalThis === "undefined" ? this : globalThis);
