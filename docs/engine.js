/*
 * Local Monte-Carlo engine for the public Wathammer payload format.
 *
 * The input names intentionally match /simulate and /simulate-round so the
 * same scenario can be sent to the local engine and to the external baseline.
 * This is a rules calculator, not an AI: the AI may choose the inputs, but it
 * never decides the dice result.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.WarhammerEngine = api;
})(typeof globalThis === "undefined" ? this : globalThis, function () {
  const WEAPON_DEFAULTS = {
    hitRerollFixedEnabled: false,
    hitRerollFixedAmount: 1,
    hitRerollFixedType: "ones",
    hitRerollFixedValues: [],
    hitRerollAllEnabled: false,
    hitRerollAllType: "ones",
    hitRerollAllValues: [],
    hitModifierEnabled: false,
    hitModifierValue: 0,
    hitCriticalEnabled: false,
    criticalHitThreshold: 6,
    woundRerollFixedEnabled: false,
    woundRerollFixedAmount: 1,
    woundRerollFixedType: "ones",
    woundRerollFixedValues: [],
    woundRerollAllEnabled: false,
    woundRerollAllType: "ones",
    woundRerollAllValues: [],
    woundModifierEnabled: false,
    woundModifierValue: 0,
    woundCriticalEnabled: false,
    criticalWoundThreshold: 6,
    sustainedHitsEnabled: false,
    sustainedHitsValue: "1",
    lethalHitsEnabled: false,
    devastatingWoundsEnabled: false,
    damageRerollEnabled: false,
    damageRerollType: "ones",
    damageRerollAmount: "1",
    damageRerollValues: [],
    criticalWoundApEnabled: false,
    criticalWoundApValue: 1,
    negatedWoundsEnabled: false,
    negatedWoundsCount: 1,
  };

  const DEFENDER_DEFAULTS = {
    saveRerollFixedEnabled: false,
    saveRerollFixedAmount: 1,
    saveRerollFixedType: "ones",
    saveRerollFixedValues: [],
    saveRerollAllEnabled: false,
    saveRerollAllType: "ones",
    saveRerollAllValues: [],
    feelNoPainEnabled: false,
    feelNoPainThreshold: 6,
    feelNoPainMortalEnabled: false,
    feelNoPainMortalThreshold: 6,
    damageOverride: 0,
    ruleInvulnerableSave: 0,
    oneUseInvulnerableEnabled: false,
    oneUseInvulnerableSave: 2,
  };

  const CHART_NAMES = [
    "hit",
    "wound",
    "woundSuccess",
    "save",
    "totalDamage",
    "kills",
    "criticalHits",
    "sustainedHits",
    "lethalHits",
    "criticalWounds",
    "devastatingWounds",
  ];

  function number(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function integer(value, fallback = 0) {
    return Math.max(0, Math.floor(number(value, fallback)));
  }

  function normalizeWeaponEffects(effects) {
    return { ...WEAPON_DEFAULTS, ...(effects || {}) };
  }

  function normalizeDefenderEffects(effects) {
    return { ...DEFENDER_DEFAULTS, ...(effects || {}) };
  }

  function parseExpression(value) {
    const text = String(value ?? "0").replace(/\s+/g, "").toLowerCase();
    if (/^[+-]?\d+$/.test(text)) return { dice: [], constant: Number(text) };
    const match = text.match(/^(\d*)d(\d+)([+-]\d+)?$/);
    if (!match) throw new Error(`无法解析骰子表达式：${value}`);
    return {
      dice: Array.from({ length: Number(match[1] || 1) }, () => Number(match[2])),
      constant: Number(match[3] || 0),
    };
  }

  function roll(sides, rng) {
    return Math.floor(rng() * Number(sides)) + 1;
  }

  function rollD6(rng) {
    return roll(6, rng);
  }

  function rollExpression(value, rng) {
    const parsed = parseExpression(value);
    return parsed.dice.reduce((sum, sides) => sum + roll(sides, rng), parsed.constant);
  }

  function clampDie(value) {
    return Math.max(1, Math.min(6, value));
  }

  function thresholdSuccess(value, threshold, modifier = 0) {
    return clampDie(Number(value) + number(modifier)) >= number(threshold, 7);
  }

  function criticalThreshold(effects, key, enabledKey) {
    const value = number(effects[key], 6);
    return Math.max(2, Math.min(6, value));
  }

  function matchesReroll(value, type, values, context) {
    if (type === "ones") return value === 1;
    if (type === "failed") return !context.success(value);
    if (type === "non_critical") return value < context.criticalThreshold;
    if (type === "specific") return (values || [1]).map(Number).includes(value);
    return false;
  }

  // The public calculator exposes both a fixed-number reroll and an all-match
  // reroll. Fixed rerolls are selected first; a die rerolled there is not also
  // considered by the all-match option.
  function rerollD6Batch(values, settings, prefix, context, rng) {
    const result = values.slice();
    const used = new Set();
    const fixedEnabled = Boolean(settings[`${prefix}RerollFixedEnabled`]);
    const allEnabled = Boolean(settings[`${prefix}RerollAllEnabled`]);
    const fixedAmountValue = settings[`${prefix}RerollFixedAmount`];
    const fixedAmount = fixedAmountValue === "all" ? result.length : integer(fixedAmountValue, 1);
    const fixedType = settings[`${prefix}RerollFixedType`] || "ones";
    const fixedValues = settings[`${prefix}RerollFixedValues`] || [];
    const allType = settings[`${prefix}RerollAllType`] || "ones";
    const allValues = settings[`${prefix}RerollAllValues`] || [];

    if (fixedEnabled) {
      for (let index = 0; index < result.length && used.size < fixedAmount; index += 1) {
        if (!matchesReroll(result[index], fixedType, fixedValues, context)) continue;
        result[index] = rollD6(rng);
        used.add(index);
      }
    }
    // The public backend treats the two UI choices as alternatives: when a
    // fixed reroll is enabled, the all-match choice is not additionally run.
    if (allEnabled && !fixedEnabled) {
      for (let index = 0; index < result.length; index += 1) {
        if (used.has(index)) continue;
        if (matchesReroll(result[index], allType, allValues, context)) result[index] = rollD6(rng);
      }
    }
    return result;
  }

  function rollDamageExpression(expression, effects, rng) {
    const parsed = parseExpression(expression);
    const values = parsed.dice.map((sides) => roll(sides, rng));
    if (!effects.damageRerollEnabled || !values.length) {
      return values.reduce((sum, value) => sum + value, parsed.constant);
    }

    const type = effects.damageRerollType || "ones";
    const selected = (effects.damageRerollValues || [1]).map(Number);
    const amount = effects.damageRerollAmount === "all"
      ? values.length
      : integer(effects.damageRerollAmount, 1);
    let used = 0;
    for (let index = 0; index < values.length && used < amount; index += 1) {
      const matches = type === "ones"
        ? values[index] === 1
        : type === "specific" && selected.includes(values[index]);
      if (!matches) continue;
      values[index] = roll(parsed.dice[index], rng);
      used += 1;
    }
    return values.reduce((sum, value) => sum + value, parsed.constant);
  }

  function applyFeelNoPain(amount, threshold, rng) {
    let suffered = 0;
    for (let point = 0; point < integer(amount); point += 1) {
      if (rollD6(rng) < number(threshold, 6)) suffered += 1;
    }
    return suffered;
  }

  function makeHistogram(values) {
    const counts = new Map();
    values.forEach((value) => {
      const key = String(Math.round(number(value)));
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    const x = [...counts.keys()].sort((a, b) => Number(a) - Number(b));
    return { x, y: x.map((key) => counts.get(key)), total: values.length };
  }

  function averageHistogram(histogram) {
    if (!histogram || !histogram.x?.length) return 0;
    const total = number(histogram.total, histogram.y.reduce((sum, value) => sum + number(value), 0)) || 1;
    return histogram.x.reduce((sum, value, index) => sum + number(value) * number(histogram.y[index]), 0) / total;
  }

  function quantile(sorted, probability) {
    if (!sorted.length) return 0;
    const position = (sorted.length - 1) * probability;
    const lower = Math.floor(position);
    const upper = Math.ceil(position);
    if (lower === upper) return sorted[lower];
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
  }

  function makeBoxplot(charts) {
    const boxplot = {};
    CHART_NAMES.forEach((name) => {
      const values = [];
      const chart = charts[name];
      if (chart) chart.x.forEach((value, index) => {
        for (let count = 0; count < number(chart.y[index]); count += 1) values.push(number(value));
      });
      values.sort((a, b) => a - b);
      boxplot[name] = {
        max: values.at(-1) || 0,
        median: quantile(values, 0.5),
        min: values[0] || 0,
        q1: quantile(values, 0.25),
        q3: quantile(values, 0.75),
      };
    });
    return boxplot;
  }

  function blankCounters() {
    return {
      hit: 0,
      wound: 0,
      woundSuccess: 0,
      save: 0,
      totalDamage: 0,
      kills: 0,
      criticalHits: 0,
      sustainedHits: 0,
      lethalHits: 0,
      criticalWounds: 0,
      devastatingWounds: 0,
    };
  }

  function addCounters(target, source) {
    CHART_NAMES.forEach((name) => { target[name] += number(source[name]); });
  }

  function modelCount(value, fallback = 1) {
    const count = integer(value, fallback);
    return count || (fallback > 0 ? fallback : 0);
  }

  function normalizedWeapon(group) {
    return {
      name: group?.name || "武器组",
      modelCount: modelCount(group?.modelCount, 1),
      attacks: String(group?.attacks ?? "1"),
      hit: group?.hit === "torrent" ? "torrent" : number(group?.hit, 4),
      wound: number(group?.wound, 4),
      ap: number(group?.ap, 0),
      damage: String(group?.damage ?? "1"),
      effects: normalizeWeaponEffects(group?.effects),
    };
  }

  function normalizedDefender(group, index) {
    return {
      name: group?.name || "防御组",
      modelCount: modelCount(group?.modelCount, 1),
      wounds: Math.max(1, integer(group?.wounds, 1)),
      save: number(group?.save, 7),
      invulnerableSave: number(group?.invulnerableSave, 0),
      allocationOrder: number(group?.allocationOrder, index + 1),
      effects: normalizeDefenderEffects(group?.effects),
    };
  }

  function makeDefenderState(group) {
    return {
      ...group,
      // The public round endpoint keeps a one-use protection at defender
      // group scope. It is not reset for each model in that group.
      oneUseAvailable: Boolean(group.effects.oneUseInvulnerableEnabled),
      models: Array.from({ length: group.modelCount }, () => ({
        remaining: group.wounds,
        fixedSaveRerollsUsed: 0,
      })),
    };
  }

  function getSaveOption(group, model, ap) {
    const candidates = [{ threshold: number(group.save, 7) + number(ap), kind: "armor" }];
    if (number(group.invulnerableSave) > 0) {
      candidates.push({ threshold: number(group.invulnerableSave), kind: "invulnerable" });
    }
    if (number(group.effects.ruleInvulnerableSave) > 0) {
      candidates.push({ threshold: number(group.effects.ruleInvulnerableSave), kind: "ruleInvulnerable" });
    }
    if (group.oneUseAvailable && number(group.effects.oneUseInvulnerableSave) > 0) {
      candidates.push({ threshold: number(group.effects.oneUseInvulnerableSave), kind: "oneUse" });
    }
    candidates.sort((a, b) => a.threshold - b.threshold);
    return candidates[0];
  }

  function resolveSave(group, model, ap, rng) {
    const option = getSaveOption(group, model, ap);
    let value = rollD6(rng);
    let wasFixedRerolled = false;
    const context = {
      criticalThreshold: 6,
      success: (die) => die >= option.threshold,
    };

    const fixedEnabled = Boolean(group.effects.saveRerollFixedEnabled);
    const fixedType = group.effects.saveRerollFixedType || "ones";
    const fixedValues = group.effects.saveRerollFixedValues || [];
    const fixedAmount = group.effects.saveRerollFixedAmount === "all"
      ? Number.POSITIVE_INFINITY
      : integer(group.effects.saveRerollFixedAmount, 1);
    if (fixedEnabled && matchesReroll(value, fixedType, fixedValues, context)) {
      // The public round endpoint treats a fixed save reroll marked
      // "failed" as a reroll of every failed save. The numeric amount is
      // effectively ignored for this specific mode; other fixed modes keep
      // their normal quantity limit.
      const unlimitedFailedReroll = fixedType === "failed";
      if (unlimitedFailedReroll || model.fixedSaveRerollsUsed < fixedAmount) {
        value = rollD6(rng);
        model.fixedSaveRerollsUsed += 1;
        wasFixedRerolled = true;
      }
    }

    if (!wasFixedRerolled && group.effects.saveRerollAllEnabled) {
      const allType = group.effects.saveRerollAllType || "ones";
      const allValues = group.effects.saveRerollAllValues || [];
      if (matchesReroll(value, allType, allValues, context)) value = rollD6(rng);
    }

    const saved = value >= option.threshold;
    // Keep the special protection active until its first failed use. The
    // public round endpoint applies this state at defender-group scope rather
    // than resetting it for each model.
    if (option.kind === "oneUse" && !saved) group.oneUseAvailable = false;
    return { saved, value, option };
  }

  function resolveAttackerGroup(weapon, rng) {
    const effects = weapon.effects;
    const counters = blankCounters();
    const rawHitValues = [];
    for (let modelIndex = 0; modelIndex < weapon.modelCount; modelIndex += 1) {
      const attacks = Math.max(0, integer(rollExpression(weapon.attacks, rng)));
      for (let attackIndex = 0; attackIndex < attacks; attackIndex += 1) rawHitValues.push(weapon.hit === "torrent" ? 6 : rollD6(rng));
    }
    let hitRolls;
    const hitCritical = criticalThreshold(effects, "criticalHitThreshold", "hitCriticalEnabled");
    const woundCritical = criticalThreshold(effects, "criticalWoundThreshold", "woundCriticalEnabled");

    if (weapon.hit === "torrent") {
      hitRolls = rawHitValues.map(() => ({ value: 0, critical: false, success: true }));
    } else {
      const hitModifier = effects.hitModifierEnabled ? number(effects.hitModifierValue) : 0;
      const context = {
        criticalThreshold: hitCritical,
        success: (die) => thresholdSuccess(die, weapon.hit, hitModifier),
      };
      // Reroll quantities are scoped to the whole public weapon-group
      // request, not separately to every model inside modelCount.
      const rerolled = rerollD6Batch(rawHitValues, effects, "hit", context, rng);
      hitRolls = rerolled.map((value) => ({
        value,
        critical: value >= hitCritical,
        success: context.success(value) || value >= hitCritical,
      })).filter((result) => result.success);
    }

    const hitEvents = [];
    for (const hit of hitRolls) {
      counters.hit += 1;
      if (hit.critical) counters.criticalHits += 1;
      let sustained = 0;
      if (hit.critical && effects.sustainedHitsEnabled) {
        const sustainedValue = String(effects.sustainedHitsValue || "1").toLowerCase();
        sustained = sustainedValue === "d3" ? roll(3, rng) : integer(sustainedValue, 1);
      }
      if (sustained) {
        // The public chart's `hit` includes both the original hit and
        // additional sustained hits; `sustainedHits` breaks the latter out.
        counters.hit += sustained;
        counters.sustainedHits += sustained;
        for (let index = 0; index < sustained; index += 1) hitEvents.push({ critical: false, lethal: false });
      }
      const lethal = Boolean(effects.lethalHitsEnabled && hit.critical);
      if (lethal) {
        counters.lethalHits += 1;
        hitEvents.push({ critical: hit.critical, lethal: true });
      } else {
        hitEvents.push({ critical: hit.critical, lethal: false });
      }
    }

    const woundRolls = [];
    hitEvents.forEach((hit) => {
      if (!hit.lethal) woundRolls.push(rollD6(rng));
    });
    const woundModifier = effects.woundModifierEnabled ? number(effects.woundModifierValue) : 0;
    const woundContext = {
      criticalThreshold: woundCritical,
      success: (die) => thresholdSuccess(die, weapon.wound, woundModifier),
    };
    const rerolledWounds = rerollD6Batch(woundRolls, effects, "wound", woundContext, rng);
    let woundIndex = 0;
    const woundEvents = [];
    hitEvents.forEach((hit) => {
      if (hit.lethal) {
        woundEvents.push({ mortal: false, ap: weapon.ap, damage: weapon.damage, lethal: true });
        return;
      }
      const value = rerolledWounds[woundIndex];
      woundIndex += 1;
      const critical = value >= woundCritical;
      if (!woundContext.success(value) && !critical) return;
      counters.criticalWounds += critical ? 1 : 0;
      const mortal = Boolean(effects.devastatingWoundsEnabled && critical);
      if (mortal) counters.devastatingWounds += 1;
      woundEvents.push({
        mortal,
        ap: weapon.ap + (critical && effects.criticalWoundApEnabled ? number(effects.criticalWoundApValue, 1) : 0),
        damage: weapon.damage,
        lethal: false,
      });
    });

    counters.wound = woundEvents.length;
    // Wathammer keeps devastating wounds in `wound`, while its
    // `woundSuccess` series counts wounds that still enter the normal save
    // pipeline (including lethal hits, which bypass the wound roll).
    counters.woundSuccess = woundEvents.filter((event) => !event.mortal).length;
    return { counters, woundEvents };
  }

  function applyNegatedWounds(events, effects, rng) {
    if (!effects.negatedWoundsEnabled || !events.length) return;
    const count = Math.min(events.length, integer(effects.negatedWoundsCount, 1));
    const indexes = events.map((_, index) => index);
    for (let index = indexes.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(rng() * (index + 1));
      [indexes[index], indexes[swap]] = [indexes[swap], indexes[index]];
    }
    indexes.slice(0, count).forEach((index) => { events[index].negated = true; });
  }

  function resolveDamageEvent(event, weaponEffects, defenderGroup, defenderModel, rng) {
    let saved = false;
    let saveResult = null;
    if (!event.mortal) {
      saveResult = resolveSave(defenderGroup, defenderModel, event.ap, rng);
      saved = saveResult.saved;
    }
    if (saved) return { damage: 0, saved: true, killed: false, saveResult };

    let amount = event.negated ? 0 : rollDamageExpression(event.damage, weaponEffects, rng);
    const defenderEffects = defenderGroup.effects;
    if (Number(defenderEffects.damageOverride) > 0 && amount > 0) amount = Number(defenderEffects.damageOverride);
    const fnpEnabled = event.mortal ? defenderEffects.feelNoPainMortalEnabled : defenderEffects.feelNoPainEnabled;
    const fnpThreshold = event.mortal ? defenderEffects.feelNoPainMortalThreshold : defenderEffects.feelNoPainThreshold;
    if (fnpEnabled) amount = applyFeelNoPain(amount, fnpThreshold, rng);

    const before = defenderModel.remaining;
    // The calculator records the full damage roll that gets through a failed
    // save. Excess damage on the final model is not carried to the next model,
    // but it is still present in the damage histogram.
    const inflicted = Math.max(0, amount);
    defenderModel.remaining = Math.max(0, before - inflicted);
    return {
      damage: inflicted,
      saved: false,
      killed: before > 0 && defenderModel.remaining <= 0,
      saveResult,
    };
  }

  function buildDefenders(payload) {
    return (payload.defenderGroups || [])
      .map((group, index) => normalizedDefender(group, index))
      .sort((a, b) => a.allocationOrder - b.allocationOrder)
      .map(makeDefenderState);
  }

  function findTarget(defenders) {
    for (const group of defenders) {
      const model = group.models.find((candidate) => candidate.remaining > 0);
      if (model) return { group, model };
    }
    return null;
  }

  function chartSet(runs) {
    const charts = {};
    CHART_NAMES.forEach((name) => { charts[name] = makeHistogram(runs.map((run) => run[name])); });
    return charts;
  }

  function summaryFromRuns(runs) {
    const charts = chartSet(runs);
    const averages = {};
    CHART_NAMES.forEach((name) => { averages[name] = averageHistogram(charts[name]); });
    return { charts, averages, boxplot: makeBoxplot(charts) };
  }

  function emptyDefenderGroupFallback() {
    return normalizedDefender({ name: "目标", modelCount: 1, wounds: 1, save: 7, invulnerableSave: 0, effects: {} }, 0);
  }

  function simulateRound(payload, rng = Math.random) {
    const simulations = Math.max(1, integer(payload?.simulations, 1000));
    const weapons = (payload?.weaponGroups || []).map(normalizedWeapon);
    const defenderInputs = payload?.defenderGroups?.length ? payload.defenderGroups : [emptyDefenderGroupFallback()];
    const defendersForOrder = defenderInputs
      .map((group, index) => normalizedDefender(group, index))
      .sort((a, b) => a.allocationOrder - b.allocationOrder);
    const weaponRuns = weapons.map(() => []);
    const defenderKillRuns = defendersForOrder.map(() => weapons.map(() => 0));
    const globalRuns = [];

    for (let runIndex = 0; runIndex < simulations; runIndex += 1) {
      const defenders = buildDefenders({ defenderGroups: defendersForOrder });
      const global = blankCounters();
      weapons.forEach((weapon, weaponIndex) => {
        const groupCounters = blankCounters();
        const killsAtStart = defendersForOrder.map(() => 0);
        // The round endpoint stops resolving later weapon groups once every
        // defender model is destroyed. A single group still rolls its entire
        // attack batch, so the stop check belongs between groups.
        if (!findTarget(defenders)) {
          weaponRuns[weaponIndex].push(groupCounters);
          return;
        }
        const groupEvents = [];
        const groupResult = resolveAttackerGroup(weapon, rng);
        addCounters(groupCounters, groupResult.counters);
        groupEvents.push(...groupResult.woundEvents);
        applyNegatedWounds(groupEvents, weapon.effects, rng);
        for (const event of groupEvents) {
          const target = findTarget(defenders);
          if (!target) continue;
          const targetIndex = defenders.indexOf(target.group);
          const result = resolveDamageEvent(event, weapon.effects, target.group, target.model, rng);
          groupCounters.save += result.saveResult?.saved ? 1 : 0;
          groupCounters.totalDamage += result.damage;
          if (result.killed) {
            groupCounters.kills += 1;
            if (targetIndex >= 0) killsAtStart[targetIndex] += 1;
          }
        }
        addCounters(global, groupCounters);
        weaponRuns[weaponIndex].push(groupCounters);
        killsAtStart.forEach((count, index) => {
          defenderKillRuns[index][weaponIndex] += count;
        });
      });
      globalRuns.push(global);
    }

    const globalSummary = summaryFromRuns(globalRuns);
    const series = weapons.map((weapon, index) => {
      const summary = summaryFromRuns(weaponRuns[index]);
      return { ...summary.charts, charts: summary.charts, name: weapon.name, total: simulations };
    });
    const summaryWeaponGroups = weapons.map((weapon, index) => {
      const averages = summaryFromRuns(weaponRuns[index]).averages;
      return {
        name: weapon.name,
        averageDamage: averages.totalDamage,
        averageHits: averages.hit,
        averageWounds: averages.wound,
        averageKills: averages.kills,
        defenderKills: defendersForOrder.map((defender, defenderIndex) => ({
          name: defender.name,
          averageKills: defenderKillRuns[defenderIndex][index] / simulations,
        })),
      };
    });
    const summaryDefenders = defendersForOrder.map((defender, defenderIndex) => ({
      name: defender.name,
      averageKills: defenderKillRuns[defenderIndex].reduce((sum, value) => sum + value, 0) / simulations,
    }));

    return {
      ...globalSummary.charts,
      boxplot: globalSummary.boxplot,
      roundSeries: { weaponGroups: series },
      roundSummary: {
        defenderGroups: summaryDefenders,
        resolutionOrder: {
          defenderGroups: defendersForOrder.map((defender) => defender.name),
          weaponGroups: weapons.map((weapon) => weapon.name),
        },
        weaponGroups: summaryWeaponGroups,
      },
      total: simulations,
      averages: globalSummary.averages,
    };
  }

  function toSingleParams(group, defender, simulations) {
    return {
      simulations,
      hit: group.hit,
      wound: group.wound,
      save: defender.save,
      attacks: group.attacks,
      damage_per_hit: group.damage,
      model_wounds: defender.wounds,
      apValue: group.ap,
      invulnerableSave: defender.invulnerableSave,
      effects: normalizeWeaponEffects(group.effects),
      defenderEffects: normalizeDefenderEffects(defender.effects),
    };
  }

  function simulateSingle(params, rng = Math.random) {
    const simulations = Math.max(1, integer(params?.simulations, 1000));
    const weapon = normalizedWeapon({
      name: "武器",
      modelCount: 1,
      attacks: params?.attacks ?? "1",
      hit: params?.hit,
      wound: params?.wound,
      ap: params?.apValue ?? params?.ap ?? 0,
      damage: params?.damage_per_hit ?? params?.damage ?? "1",
      effects: params?.effects || params,
    });
    const defender = normalizedDefender({
      name: "目标",
      modelCount: 1,
      wounds: params?.model_wounds ?? params?.wounds ?? 1,
      save: params?.save ?? 7,
      invulnerableSave: params?.invulnerableSave ?? 0,
      effects: params?.defenderEffects || params,
    }, 0);
    defender.oneUseAvailable = Boolean(defender.effects.oneUseInvulnerableEnabled);
    const runs = [];

    for (let runIndex = 0; runIndex < simulations; runIndex += 1) {
      const result = resolveAttackerGroup(weapon, rng);
      const model = {
        remaining: Number.POSITIVE_INFINITY,
        fixedSaveRerollsUsed: 0,
      };
      const counter = { ...result.counters, save: 0, totalDamage: 0, kills: 0 };
      applyNegatedWounds(result.woundEvents, weapon.effects, rng);
      for (const event of result.woundEvents) {
        const resolved = resolveDamageEvent(event, weapon.effects, defender, model, rng);
        counter.save += resolved.saveResult?.saved ? 1 : 0;
        counter.totalDamage += resolved.damage;
      }
      counter.kills = Math.floor(counter.totalDamage / defender.wounds);
      runs.push(counter);
    }
    const summary = summaryFromRuns(runs);
    return {
      ...summary.charts,
      boxplot: summary.boxplot,
      total: simulations,
      averages: {
        hits: summary.averages.hit,
        wounds: summary.averages.wound,
        damage: summary.averages.totalDamage,
        kills: summary.averages.kills,
      },
    };
  }

  return {
    parseExpression,
    normalizeWeaponEffects,
    normalizeDefenderEffects,
    averageHistogram,
    simulateSingle,
    simulateRound,
    toSingleParams,
  };
});
