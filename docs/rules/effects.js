/*
 * Neutral calculator effects.
 *
 * Faction rule files only declare effect.type and data. This registry maps
 * those declarations to the calculator's neutral attack/defence modifiers;
 * neither app.js nor engine.js needs to know a faction or unit name.
 */
(function (root) {
  function defenderAttackModifiers(resolved, phase) {
    const attack = resolved?.attack || {};
    const defend = resolved?.defend || {};
    return {
      hitModifier: Number(attack.targetHitModifier || 0)
        + (phase === "melee" ? Number(attack.targetMeleeHitModifier || 0) : 0)
        + Number(defend.incomingHitModifier || 0),
    };
  }

  function apply(effect, { rule, selections, context, attack, defend, selected, enabled }) {
    const sourceId = rule.identity?.id || rule.id || "unknown-rule";
    const contribute = (bucket, field, value, operation = "add") => {
      bucket.contributions ||= [];
      bucket.contributions.push({ sourceId, effectType: effect.type, field, operation, value: Number(value || 0) });
    };
    if (effect.selection) {
      const actual = selected(selections, rule, effect.selection.controlId, effect.selection.fallback);
      if (actual !== effect.selection.equals) return;
    }
    const hasEnabledControl = (rule.controls || []).some((control) => control.id === "enabled");
    const semanticCondition = effect.condition || effect.requiresTargetInfected || effect.requiresTargetMonsterVehicle
      || effect.requiresTargetInfantry || effect.unlessTargetMonsterVehicle || effect.requiresPlague;
    const active = effect.activation === "passive" || Boolean(effect.selection) || !rule.controls?.length
      || enabled(selections, rule) || (!hasEnabledControl && Boolean(semanticCondition));
    const conditionOverride = effect.conditionOverrideControlId && selected(selections, rule, effect.conditionOverrideControlId, false);
    if (effect.condition === "underStartingStrength" && !context.underStartingStrength && !conditionOverride && !selected(selections, rule, "underStartingStrength", false)) return;
    if (effect.condition === "belowHalfStrength" && !context.belowHalfStrength && !conditionOverride && !selected(selections, rule, "belowHalfStrength", false)) return;
    if (effect.condition === "large-or-led" && !(Number(context.initialModelCount || 0) >= 5 || Number(context.modelCount || 0) >= 5 || context.isJoined || enabled(selections, rule, "forceLeader"))) return;
    if (effect.condition === "targetBelowHalf" && !selected(selections, rule, "targetBelowHalf", false)) return;
    if (effect.requiresTargetInfected && !selected(selections, rule, "targetInfected", false)) return;
    if (effect.requiresTargetMonsterVehicle && !selected(selections, rule, "targetMonsterVehicle", false)) return;
    if (effect.requiresTargetInfantry && !selected(selections, rule, "targetInfantry", false)) return;
    if (effect.unlessTargetMonsterVehicle && selected(selections, rule, "targetMonsterVehicle", false)) return;
    if (effect.requiresPlague && selected(selections, rule, "plague", "none") !== effect.requiresPlague) return;
    switch (effect.type) {
      case "fnp":
        if (active) {
          const threshold = Number(effect.threshold);
          defend.feelNoPain = effect.operation === "override" ? threshold : (defend.feelNoPain ? Math.min(defend.feelNoPain, threshold) : threshold);
          defend.feelNoPainMortal = effect.operation === "override" ? threshold : (defend.feelNoPainMortal ? Math.min(defend.feelNoPainMortal, threshold) : threshold);
        }
        break;
      case "fnp-mortal":
        if (active) {
          const threshold = Number(effect.threshold);
          defend.feelNoPainMortal = effect.operation === "override" ? threshold : (defend.feelNoPainMortal ? Math.min(defend.feelNoPainMortal, threshold) : threshold);
        }
        break;
      case "leader-fnp":
        if (active) {
          const threshold = Number(effect.threshold);
          defend.leaderFeelNoPain = defend.leaderFeelNoPain ? Math.min(defend.leaderFeelNoPain, threshold) : threshold;
        }
        break;
      case "ignore-hit-modifiers": if (active) { attack.ignoreHitModifiers = true; contribute(attack, "ignoreHitModifiers", 1, "enable"); } break;
      case "weapon-attack-override": if (active) attack.weaponAttackOverride = { name: effect.weaponName, value: effect.value }; break;
      case "damage-override": if (active) defend.damageOverride = Number(effect.value); break;
      case "incoming-damage-modifier": if (active) defend.incomingDamageModifier += Number(effect.value || 0); break;
      case "repeat-ranged": if (active) attack.repeatRanged = true; break;
      case "incoming-ap": if (active) defend.incomingApModifier += Number(effect.value || 0); break;
      case "damaged-hit-minus": if (active && Number(context.remainingWounds || 999) <= Number(effect.threshold)) { attack.hitModifier -= 1; contribute(attack, "hitModifier", -1); } break;
      case "hit-reroll": if (active) { attack.hitReroll = effect.mode || "failed"; attack.contributions.push({ sourceId, effectType: effect.type, field: "hitReroll", mode: effect.mode || "failed" }); } break;
      case "wound-reroll": if (active) { attack.woundReroll = effect.mode || "failed"; attack.contributions.push({ sourceId, effectType: effect.type, field: "woundReroll", mode: effect.mode || "failed" }); } break;
      case "hit-modifier": if (active) { attack.hitModifier += Number(effect.value || 0); contribute(attack, "hitModifier", effect.value); } break;
      case "wound-modifier": if (active) { attack.woundModifier += Number(effect.value || 0); contribute(attack, "woundModifier", effect.value); } break;
      case "sustained-hits": if (active) attack.sustainedHits = Math.max(Number(attack.sustainedHits || 0), Number(effect.value || 1)); break;
      case "lethal-hits": if (active) attack.lethalHits = true; break;
      case "devastating-wounds": if (active) attack.devastating = true; break;
      case "attack-modifier": if (active) attack.attackModifier += Number(effect.value || 0); break;
      case "rapid-fire-attack-modifier": if (active) attack.rapidFireAttackModifier += Number(effect.value || 0); break;
      case "target-toughness-modifier": if (active) attack.targetToughnessModifier += Number(effect.value || 0); break;
      case "target-melee-hit-minus": if (active) { const value = Number(effect.value || -1); attack.targetMeleeHitModifier += value; contribute(attack, "targetMeleeHitModifier", value); } break;
      case "target-hit-minus": if (active) { const value = -Math.abs(Number(effect.value || 1)); attack.targetHitModifier = Number(attack.targetHitModifier || 0) + value; contribute(attack, "targetHitModifier", value); } break;
      case "weapon-strength-modifier": if (active) attack.strengthModifier = Number(attack.strengthModifier || 0) + Number(effect.value || 0); break;
      case "weapon-attack-modifier": if (active) {
        attack.weaponAttackModifiers ||= [];
        attack.weaponAttackModifiers.push({ weaponName: String(effect.weaponName), value: Number(effect.value || 0), sourceId });
      } break;
      case "weapon-ap-modifier": if (active) attack.apModifier = Number(attack.apModifier || 0) + Number(effect.value || 0); break;
      case "ap-vs-infantry": if (active) attack.apModifier = Number(attack.apModifier || 0) + Number(effect.value || 1); break;
      case "damage-modifier": if (active) attack.damageModifier = Number(attack.damageModifier || 0) + Number(effect.value || 0); break;
      case "damage-minus": if (active) attack.damageModifier = Number(attack.damageModifier || 0) - 1; break;
      case "damage-reroll": if (active) { attack.damageReroll = true; attack.damageRerollMode = effect.mode || "ones"; attack.contributions.push({ sourceId, effectType: effect.type, field: "damageReroll", mode: effect.mode || "ones" }); } break;
      case "hit-critical-threshold": {
        if (!active) break;
        const threshold = effect.condition === "targetBelowHalf" && selected(selections, rule, "targetBelowHalf", false)
          ? Number(effect.belowHalfValue || effect.value || 0)
          : Number(effect.value || 0);
        if (threshold) {
          attack.hitCriticalThreshold = attack.hitCriticalThreshold
            ? Math.min(Number(attack.hitCriticalThreshold), threshold)
            : threshold;
        }
        break;
      }
      case "wound-critical-threshold": {
        if (!active) break;
        const threshold = Number(effect.value || 0);
        if (threshold) attack.woundCriticalThreshold = attack.woundCriticalThreshold
          ? Math.min(Number(attack.woundCriticalThreshold), threshold)
          : threshold;
        break;
      }
      case "target-save-modifier": if (active) attack.targetSaveModifier = Number(attack.targetSaveModifier || 0) + Number(effect.value || 0); break;
      case "incoming-hit-minus": if (active) { const value = -Math.abs(Number(effect.value || 1)); defend.incomingHitModifier += value; contribute(defend, "incomingHitModifier", value); } break;
      case "incoming-wound-minus": if (active) defend.incomingWoundModifier -= Math.abs(Number(effect.value || 1)); break;
      case "incoming-wound-when-strength-gte": if (active) defend.incomingWoundWhenStrengthGreaterOrEqual = -Math.abs(Number(effect.value || 1)); break;
      case "incoming-wound-when-strength-gt": if (active) defend.incomingWoundWhenStrengthGreater = Number(effect.value || -1); break;
      case "damage-halving": if (active) defend.damageMultiplier = Math.min(Number(defend.damageMultiplier || 1), 0.5); break;
      case "save-bonus-vs-d1": if (active) defend.saveBonusVsDamage1 = true; break;
      case "save-reroll": if (active) { defend.saveReroll = effect.mode || "ones"; defend.contributions.push({ sourceId, effectType: effect.type, field: "saveReroll", mode: effect.mode || "ones" }); } break;
      case "invulnerable-save":
        // Passive (no controls) saves stack by best value. A controllable
        // one-shot/phase override (e.g. 金刚不破's 2+ for the phase) replaces
        // the base save instead of being capped by Math.max.
        if (active) {
          const value = Number(effect.value || 0);
          defend.invulnerableSave = effect.operation === "override"
            ? value
            : (defend.invulnerableSave ? Math.min(Number(defend.invulnerableSave), value) : value);
        }
        break;
      default: throw new Error(`Unregistered effect type: ${effect.type || "<empty>"}`);
    }
  }

  root.WarhammerRuleEffects = { apply, defenderAttackModifiers };
})(typeof globalThis === "undefined" ? this : globalThis);
