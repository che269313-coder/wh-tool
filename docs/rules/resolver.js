/* Generic rules adapter. It translates declarative faction data into the
 * calculator's neutral effect fields; engine.js never imports faction data. */
(function (root) {
  const custodesNames = new Set(["帝皇禁军", "禁军"]);
  const anathemaPsykanaUnits = new Set(["灭魔教团百夫长", "艾雷雅", "控诉者", "戒卫者", "警戒者", "猎巫者", "灭魔教团犀牛装甲车"]);
  const isCustodes = (faction) => custodesNames.has(String(faction || "").trim()) || /禁军/.test(String(faction || ""));
  const catalog = () => root.WarhammerCustodesRules || { factionRules: [], unitRules: {} };

  function rulesForUnit(faction, unitName) {
    if (!isCustodes(faction)) return { faction: [], unit: [] };
    const data = catalog();
    const aliases = {
      "盾卫连长(主将)": "盾卫连长",
      "阿拉琉斯终结者": "阿拉鲁斯终结者",
      "警戒者": "警戒者",
    };
    const name = aliases[unitName] || String(unitName || "").replace(/\([^)]*\)/g, "").trim();
    return { faction: data.factionRules || [], unit: data.unitRules?.[name] || [] };
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

  function isMartialKatahUnit(faction, unitName) {
    const normalized = String(unitName || "").replace(/\([^)]*\)/g, "").trim();
    return isCustodes(faction) && !anathemaPsykanaUnits.has(normalized);
  }

  const selected = (selections, rule, controlId, fallback = false) => selections?.[`${rule.id}.${controlId}`] ?? fallback;
  const enabled = (selections, rule, controlId = "enabled") => Boolean(selected(selections, rule, controlId, false));
  const hasNamedRule = (rules, type) => rules.some((rule) => rule.effect?.type === type);

  function resolveUnit(faction, unitName, selections = {}, context = {}) {
    const rules = rulesForUnit(faction, unitName).unit;
    const attack = { hitModifier: 0, woundModifier: 0, woundReroll: null, devastating: false, martialChoices: [], repeatRanged: false, weaponAttackOverride: null, ignoreHitModifiers: false };
    const defend = { invulnerableSave: 0, damageOverride: 0, feelNoPain: 0, feelNoPainMortal: 0, incomingApModifier: 0, incomingHitModifier: 0, incomingWoundModifier: 0, incomingWoundWhenStrengthGreater: 0 };
    const notes = [];
    rules.forEach((rule) => {
      const effect = rule.effect;
      if (!effect) return;
      if (effect.requiresJoined && !context.isJoined) return;
      if (effect.phase && effect.phase !== context.phase) return;
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
          if (context.underStartingStrength) attack.hitModifier += 1;
          if (context.belowHalfStrength) attack.woundModifier += 1;
          break;
        case "incoming-melee-hit-minus": if (context.phase === "melee") defend.incomingHitModifier -= 1; break;
        case "anti-psyker-weapons": if (enabled(selections, rule, "targetPsychic")) attack.devastating = true; break;
        default: break;
      }
      if (rule.status) notes.push({ name: rule.name, status: rule.status });
    });
    return { attack, defend, notes };
  }

  root.WarhammerRuleResolver = { rulesForUnit, rulesForUnits, resolveUnit, isCustodes, isMartialKatahUnit, hasNamedRule };
})(typeof globalThis === "undefined" ? this : globalThis);
