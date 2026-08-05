/*
 * Neutral calculator effects.
 *
 * Faction rule files only declare effect.type and data. This registry maps
 * those declarations to the calculator's neutral attack/defence modifiers;
 * neither app.js nor engine.js needs to know a faction or unit name.
 */
(function (root) {
  function apply(effect, { rule, selections, context, attack, defend, selected, enabled }) {
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
      case "damaged-hit-minus": if (Number(context.remainingWounds || 999) <= Number(effect.threshold)) attack.hitModifier -= 1; break;
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
      default: break;
    }
  }

  root.WarhammerRuleEffects = { apply };
})(typeof globalThis === "undefined" ? this : globalThis);
