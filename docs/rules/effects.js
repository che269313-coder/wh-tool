/*
 * Neutral calculator effects.
 *
 * Faction rule files only declare effect.type and data. This registry maps
 * those declarations to the calculator's neutral attack/defence modifiers;
 * neither app.js nor engine.js needs to know a faction or unit name.
 */
(function (root) {
  function apply(effect, { rule, selections, context, attack, defend, selected, enabled }) {
    if (effect.condition === "underStartingStrength" && !context.underStartingStrength) return;
    if (effect.condition === "belowHalfStrength" && !context.belowHalfStrength) return;
    switch (effect.type) {
      case "fnp":
        if (enabled(selections, rule) || !rule.controls?.length) defend.feelNoPain = Math.max(defend.feelNoPain, Number(effect.threshold));
        break;
      case "ignore-hit-modifiers": attack.ignoreHitModifiers = true; break;
      case "time-lock": {
        const mode = selected(selections, rule, "mode", "none");
        if (mode === "axe" && context.phase === "melee") attack.weaponAttackOverride = { name: "守望者战斧", value: 12 };
        if (mode === "invulnerable") defend.invulnerableSave = 2;
        break;
      }
      case "second-martial-katah": {
        const choice = selected(selections, rule, "secondKatah", "none");
        if (context.phase === "melee" && choice !== "none") attack.martialChoices.push(choice);
        break;
      }
      case "damage-override": if (enabled(selections, rule)) defend.damageOverride = Number(effect.value); break;
      case "guard-wound-reroll": attack.woundReroll = enabled(selections, rule, "onObjective") ? "failed" : "ones"; break;
      case "repeat-ranged": if (context.phase === "ranged" && enabled(selections, rule)) attack.repeatRanged = true; break;
      case "elite-wound-reroll": if (enabled(selections, rule, "targetElite")) attack.woundReroll = "failed"; break;
      case "high-strength-wound-minus": defend.incomingWoundWhenStrengthGreater = -1; break;
      case "incoming-ap": defend.incomingApModifier += Number(effect.value || 0); break;
      case "damaged-hit-minus": if ((!rule.controls?.length || enabled(selections, rule)) && Number(context.remainingWounds || 999) <= Number(effect.threshold)) attack.hitModifier -= 1; break;
      case "deep-daughter":
        defend.feelNoPainMortal = Math.max(defend.feelNoPainMortal, 3);
        if (enabled(selections, rule, "psychic")) defend.feelNoPain = Math.max(defend.feelNoPain, 3);
        break;
      case "under-strength-bonuses":
        if (context.underStartingStrength || enabled(selections, rule, "forceLeader")) attack.hitModifier += 1;
        if (context.belowHalfStrength || selected(selections, rule, "belowHalf", false)) attack.woundModifier += 1;
        break;
      case "incoming-melee-hit-minus": if (context.phase === "melee") defend.incomingHitModifier -= 1; break;
      case "anti-psyker-weapons": if (enabled(selections, rule, "targetPsychic")) attack.devastating = true; break;
      case "space-hit-reroll": if (!rule.controls?.length || enabled(selections, rule)) attack.hitReroll = effect.mode || "failed"; break;
      case "space-wound-reroll": if (!rule.controls?.length || enabled(selections, rule)) attack.woundReroll = effect.mode || "failed"; break;
      case "hit-modifier": if (!rule.controls?.length || enabled(selections, rule)) attack.hitModifier += Number(effect.value || 0); break;
      case "wound-modifier": if (!rule.controls?.length || enabled(selections, rule)) attack.woundModifier += Number(effect.value || 0); break;
      case "sustained-hits": if (!rule.controls?.length || enabled(selections, rule)) attack.sustainedHits = Math.max(Number(attack.sustainedHits || 0), Number(effect.value || 1)); break;
      case "lethal-hits": if (!rule.controls?.length || enabled(selections, rule)) attack.lethalHits = true; break;
      case "devastating-wounds": if (!rule.controls?.length || enabled(selections, rule)) attack.devastating = true; break;
      case "attack-modifier": if (!rule.controls?.length || enabled(selections, rule)) attack.attackModifier += Number(effect.value || 0); break;
      case "target-toughness-modifier": if (!rule.controls?.length || enabled(selections, rule)) attack.targetToughnessModifier += Number(effect.value || 0); break;
      case "incoming-hit-minus": if (!rule.controls?.length || enabled(selections, rule)) defend.incomingHitModifier -= Math.abs(Number(effect.value || 1)); break;
      case "incoming-wound-minus": if (!rule.controls?.length || enabled(selections, rule)) defend.incomingWoundModifier -= Math.abs(Number(effect.value || 1)); break;
      case "incoming-wound-when-strength-gte": if (!rule.controls?.length || enabled(selections, rule)) defend.incomingWoundWhenStrengthGreaterOrEqual = -Math.abs(Number(effect.value || 1)); break;
      case "invulnerable-save": if (!rule.controls?.length || enabled(selections, rule)) defend.invulnerableSave = Math.max(Number(defend.invulnerableSave || 0), Number(effect.value || 0)); break;
      default: break;
    }
  }

  root.WarhammerRuleEffects = { apply };
})(typeof globalThis === "undefined" ? this : globalThis);
