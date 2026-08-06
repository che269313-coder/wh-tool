/* Generic rules adapter. It translates declarative faction data into the
 * calculator's neutral effect fields; engine.js never imports faction data. */
(function (root) {
  const custodesNames = new Set(["帝皇禁军", "禁军"]);
  const spaceMarineNames = new Set(["星际战士", "阿斯塔特修会"]);
  const deathGuardNames = new Set(["死亡守卫", "Death Guard"]);
  const anathemaPsykanaUnits = new Set(["灭魔教团百夫长", "艾雷雅", "控诉者", "戒卫者", "警戒者", "猎巫者", "灭魔教团犀牛装甲车"]);
  const isCustodes = (faction) => custodesNames.has(String(faction || "").trim()) || /禁军/.test(String(faction || ""));
  const isSpaceMarines = (faction) => spaceMarineNames.has(String(faction || "").trim()) || /星际战士|阿斯塔特修会/.test(String(faction || ""));
  const isDeathGuard = (faction) => deathGuardNames.has(String(faction || "").trim()) || /死亡守卫|Death Guard/i.test(String(faction || ""));
  const catalog = () => root.WarhammerCustodesRules || { factionRules: [], unitRules: {} };
  const spaceMarineCatalog = () => root.WarhammerSpaceMarineRules || { factionRules: [], unitRules: {} };
  const deathGuardCatalog = () => root.WarhammerDeathGuardRules || { factionRules: [], unitRules: {} };
  const normalizeUnitName = (unitName) => String(unitName || "").replace(/[（(][^）)]*[）)]/g, "").trim();

  function rulesForUnit(faction, unitName) {
    const isCustodesFaction = isCustodes(faction);
    const isSpaceMarineFaction = isSpaceMarines(faction);
    const isDeathGuardFaction = isDeathGuard(faction);
    if (!isCustodesFaction && !isSpaceMarineFaction && !isDeathGuardFaction) return { faction: [], unit: [] };
    const data = isCustodesFaction ? catalog() : (isSpaceMarineFaction ? spaceMarineCatalog() : deathGuardCatalog());
    const aliases = {
      "盾卫连长(主将)": "盾卫连长",
      "阿拉琉斯终结者": "阿拉鲁斯终结者",
      "警戒者": "警戒者",
    };
    const name = aliases[unitName] || normalizeUnitName(unitName);
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
    const attack = { hitModifier: 0, woundModifier: 0, hitReroll: null, woundReroll: null, devastating: false, sustainedHits: 0, lethalHits: false, attackModifier: 0, targetToughnessModifier: 0, targetMeleeHitModifier: 0, martialChoices: [], repeatRanged: false, weaponAttackOverride: null, ignoreHitModifiers: false };
    const defend = { invulnerableSave: 0, damageOverride: 0, feelNoPain: 0, feelNoPainMortal: 0, incomingApModifier: 0, incomingHitModifier: 0, incomingWoundModifier: 0, incomingWoundWhenStrengthGreater: 0, incomingWoundWhenStrengthGreaterOrEqual: 0 };
    const notes = [];
    rules.forEach((rule) => {
      const effects = Array.isArray(rule.effects) ? rule.effects : (rule.effect ? [rule.effect] : []);
      effects.forEach((effect) => {
        const forceLeader = enabled(selections, rule, "forceLeader");
        if (effect.requiresJoined && !context.isJoined && !forceLeader) return;
        if (effect.phase && effect.phase !== context.phase) return;
        root.WarhammerRuleEffects?.apply(effect, { rule, selections, context, attack, defend, selected, enabled });
      });
      if (rule.status) notes.push({ name: rule.name, status: rule.status });
    });
    return { attack, defend, notes };
  }

  function resolveFaction(faction, selections = {}, context = {}) {
    const rules = rulesForUnit(faction, "").faction;
    const attack = { hitModifier: 0, woundModifier: 0, hitReroll: null, woundReroll: null, devastating: false, sustainedHits: 0, lethalHits: false, attackModifier: 0, targetToughnessModifier: 0, targetMeleeHitModifier: 0, martialChoices: [], repeatRanged: false, weaponAttackOverride: null, ignoreHitModifiers: false };
    const defend = { invulnerableSave: 0, damageOverride: 0, feelNoPain: 0, feelNoPainMortal: 0, incomingApModifier: 0, incomingHitModifier: 0, incomingWoundModifier: 0, incomingWoundWhenStrengthGreater: 0, incomingWoundWhenStrengthGreaterOrEqual: 0 };
    const notes = [];
    rules.forEach((rule) => {
      const effects = Array.isArray(rule.effects) ? rule.effects : (rule.effect ? [rule.effect] : []);
      effects.forEach((effect) => root.WarhammerRuleEffects?.apply(effect, { rule, selections, context, attack, defend, selected, enabled }));
      if (rule.status) notes.push({ name: rule.name, status: rule.status });
    });
    return { attack, defend, notes };
  }

  root.WarhammerRuleResolver = { rulesForUnit, rulesForUnits, resolveUnit, resolveFaction, isCustodes, isSpaceMarines, isDeathGuard, isMartialKatahUnit, hasNamedRule };
})(typeof globalThis === "undefined" ? this : globalThis);
