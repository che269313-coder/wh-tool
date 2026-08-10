/* Core weapon keywords are independent of faction and datasheet names. */
(function (root) {
  const targets = Object.freeze({
    "步兵": "infantry", infantry: "infantry", "载具": "vehicle", vehicle: "vehicle",
    "巨兽": "monster", "凶兽": "monster", monster: "monster", "工事": "fortification", fortification: "fortification",
    "泰坦级": "titanic", titanic: "titanic", "飞行": "fly", flying: "fly", fly: "fly",
    "灵能者": "psyker", "灵能": "psyker", psyker: "psyker", "人物": "character", "角色": "character", character: "character",
    "恶魔": "daemon", daemon: "daemon", "步行机": "walker", walker: "walker",
    "史诗英雄": "epic-hero", "史诗级英雄": "epic-hero", "epic hero": "epic-hero", "epic-hero": "epic-hero",
    "野兽": "beast", beast: "beast", "集群": "swarm", swarm: "swarm",
  });

  const normalizedText = (values) => (Array.isArray(values) ? values : [values])
    .filter(Boolean)
    .map((value) => String(value).replace(/[\[\]【】]/g, "").replace(/\s+/g, " ").trim())
    .join("；");

  function numericEffects(text, pattern, type, fallback = 0) {
    return [...text.matchAll(pattern)].map((match) => {
      const raw = String(match[1] || "").replace(/\s+/g, "").toUpperCase();
      return { type, value: /^D\d+(?:[+-]\d+)?$/.test(raw) ? raw : Number(raw || fallback) };
    });
  }

  function parseSegment(value) {
    const text = normalizedText(value);
    const effects = [];
    effects.push(...numericEffects(text, /(?:连击|sustained\s*hits?)\s*(d3|\d+)?/gi, "sustained-hits", 1));
    effects.push(...numericEffects(text, /(?:速射|rapid\s*fire)\s*(d\d+(?:\s*[+-]\s*\d+)?|\d+)/gi, "rapid-fire"));
    effects.push(...numericEffects(text, /(?:热熔|melta)\s*(d\d+(?:\s*[+-]\s*\d+)?|\d+)/gi, "melta"));
    effects.push(...numericEffects(text, /(?:爆炸|blast)\s*(d3|\d+)?/gi, "blast", 1));
    effects.push(...numericEffects(text, /(?:劈砍|cleave)\s*(d3|\d+)/gi, "cleave"));
    if (/致命(?:一击|命中)|lethal\s*hits?/i.test(text)) effects.push({ type: "lethal-hits" });
    if (/毁灭\s*性?\s*(?:伤\s*口|伤\s*害)|devastating\s*wounds?/i.test(text)) effects.push({ type: "devastating-wounds" });
    if (/双联|twin-?linked/i.test(text)) effects.push({ type: "twin-linked" });
    if (/喷射|洪流|torrent/i.test(text)) effects.push({ type: "torrent" });
    if (/突击|assault/i.test(text)) effects.push({ type: "assault" });
    if (/近距离|close\s*(?:range|quarters?)/i.test(text)) effects.push({ type: "close-range" });
    if (/额外攻击|extra\s*attacks?/i.test(text)) effects.push({ type: "extra-attacks" });
    if (/危险(?:武器)?|hazardous/i.test(text)) effects.push({ type: "hazardous" });
    if (/重型|heavy/i.test(text)) effects.push({ type: "heavy" });
    if (/无视掩体|ignores?\s*cover/i.test(text)) effects.push({ type: "ignores-cover" });
    if (/曲射|indirect\s*fire/i.test(text)) effects.push({ type: "indirect-fire" });
    if (/骑枪|迅猛冲锋|lance/i.test(text)) effects.push({ type: "lance" });
    if (/单发|一次性(?:武器)?|one[ -]?shot/i.test(text)) effects.push({ type: "one-shot" });
    if (/手枪|pistol/i.test(text)) effects.push({ type: "pistol" });
    if (/精准|precision/i.test(text)) effects.push({ type: "precision" });
    if (/^(?:灵能|psychic)(?:\s*[：:].*)?$/i.test(text)) effects.push({ type: "psychic" });
    const targetLabels = "史诗级英雄|史诗英雄|epic[ -]hero|灵能者|步行机|infantry|vehicle|monster|fortification|titanic|flying|character|daemon|walker|psyker|步兵|载具|巨兽|凶兽|工事|泰坦级|飞行|灵能|人物|角色|恶魔";
    const antiPattern = new RegExp(`(?:反|针对|anti)[- ]?(非)?((?:${targetLabels})(?:\\s*[/／、]\\s*(?:${targetLabels}))*)\\s*([2-6])\\+`, "gi");
    for (const match of text.matchAll(antiPattern)) {
      const resolvedTargets = String(match[2]).split(/[/／、]/).map((label) => targets[String(label).trim().toLowerCase()]).filter(Boolean);
      resolvedTargets.forEach((target) => effects.push({ type: match[1] ? "anti-keyword-exclusion" : "anti-keyword", target, excludedTargets: match[1] ? resolvedTargets : undefined, threshold: Number(match[3]) }));
    }
    const suffix = text.match(/[：:]\s*([^：:]+)$/);
    if (!suffix) return effects;
    const suffixText = suffix[1].trim();
    const negative = /^非/.test(suffixText);
    const conditionalKeywords = suffixText.replace(/^非\s*/, "")
      .split(/[\/／、]/)
      .map((label) => String(label).trim().toLowerCase())
      .map((label) => targets[label] || label)
      .filter(Boolean);
    if (!conditionalKeywords.length) return effects;
    return effects.map((effect) => negative
      ? { ...effect, excludedTargetKeywords: conditionalKeywords }
      : { ...effect, targetKeywords: conditionalKeywords });
  }

  function parse(values) {
    return (Array.isArray(values) ? values : [values])
      .filter(Boolean)
      .flatMap((value) => String(value).split(/[，,；;]/))
      .map((value) => value.trim())
      .filter(Boolean)
      .flatMap(parseSegment);
  }

  const targetAliases = Object.freeze({
    infantry: ["步兵", "infantry"], vehicle: ["载具", "vehicle"], monster: ["巨兽", "凶兽", "monster"],
    fortification: ["工事", "fortification"], titanic: ["泰坦级", "titanic"], fly: ["飞行", "fly", "flying"],
    psyker: ["灵能者", "灵能", "psyker"], character: ["人物", "角色", "character"],
    daemon: ["恶魔", "daemon"], walker: ["步行机", "walker"],
    "epic-hero": ["史诗英雄", "史诗级英雄", "epic hero", "epic-hero"],
    beast: ["野兽", "beast"], swarm: ["集群", "swarm"],
  });

  function matchingTargetSet(targetKeywords = []) {
    const keywordSet = new Set((targetKeywords || []).map((keyword) => String(keyword).trim().toLowerCase()).filter(Boolean));
    Object.entries(targetAliases).forEach(([canonical, aliases]) => {
      if (aliases.some((alias) => keywordSet.has(alias))) keywordSet.add(canonical);
    });
    return keywordSet;
  }

  function effectApplies(effect, targetKeywordSet) {
    if (effect.excludedTargetKeywords?.some((keyword) => targetKeywordSet.has(String(keyword).toLowerCase()))) return false;
    return !effect.targetKeywords?.length || effect.targetKeywords.some((keyword) => targetKeywordSet.has(String(keyword).toLowerCase()));
  }

  function toWeaponPayload(values, targetKeywords = []) {
    const keywordSet = matchingTargetSet(targetKeywords);
    const effects = parse(values).filter((effect) => effectApplies(effect, keywordSet));
    const targetMatches = (target) => (targetAliases[target] || [target]).some((alias) => keywordSet.has(alias));
    const sustained = effects.find((effect) => effect.type === "sustained-hits");
    const anti = effects
      .filter((effect) => (effect.type === "anti-keyword" && targetMatches(effect.target))
        || (effect.type === "anti-keyword-exclusion" && !(effect.excludedTargets || []).some(targetMatches)))
      .sort((left, right) => left.threshold - right.threshold)[0];
    return {
      ...(sustained ? { sustainedHitsEnabled: true, sustainedHitsValue: String(sustained.value) } : {}),
      ...(effects.some((effect) => effect.type === "lethal-hits") ? { lethalHitsEnabled: true } : {}),
      ...(effects.some((effect) => effect.type === "devastating-wounds") ? { devastatingWoundsEnabled: true } : {}),
      ...(effects.some((effect) => effect.type === "twin-linked") ? { woundRerollAllEnabled: true, woundRerollAllType: "failed" } : {}),
      ...(anti ? { woundCriticalEnabled: true, criticalWoundThreshold: anti.threshold } : {}),
    };
  }

  function resolve(values, context = {}) {
    const effects = parse(values).filter((effect) => effectApplies(effect, matchingTargetSet(context.targetKeywords || [])));
    const has = (type) => effects.some((effect) => effect.type === type);
    const numeric = (type, fallback = 0) => effects
      .filter((effect) => effect.type === type)
      .reduce((best, effect) => {
        if (effect.value === "d3") return best === "d3" || Number(best) >= 3 ? best : "d3";
        return Math.max(Number(best || fallback), Number(effect.value || fallback));
      }, fallback);
    const targetModelCount = Math.max(0, Number(context.targetModelCount || 0));
    const crowdBands = Math.floor(targetModelCount / 5);
    const blast = numeric("blast", 0);
    const cleave = numeric("cleave", 0);
    const rapidFireEffects = effects.filter((effect) => effect.type === "rapid-fire");
    const rapidFire = numeric("rapid-fire", 0);
    const rapidFireExpression = rapidFireEffects.find((effect) => typeof effect.value === "string")?.value || "";
    const melta = numeric("melta", 0);
    const isIndirect = has("indirect-fire") && Boolean(context.usingIndirectFire);
    const ignoresCover = has("ignores-cover");
    const grantsTargetCover = isIndirect;
    const targetHasCover = Boolean(context.targetHasCover || grantsTargetCover) && !ignoresCover;
    const heavyInputsKnown = ["attackerEngaged", "attackerDeployedThisTurn", "attackerMovedOver3"]
      .every((key) => Object.prototype.hasOwnProperty.call(context, key));
    const heavyConditionsMet = Boolean(context.heavyConditionsMet)
      || (context.heavyConditionsMet == null && heavyInputsKnown
        && !context.attackerEngaged && !context.attackerDeployedThisTurn && !context.attackerMovedOver3);
    const ineligibilityReasons = [];
    if (has("one-shot") && context.oneShotUsed) ineligibilityReasons.push("这件[单发]武器在本场战斗中已经使用过");
    if (context.mode === "ranged" && context.attackerAdvanced && !has("assault")) ineligibilityReasons.push("突进后只能选择[突击]武器");
    if (context.mode === "ranged" && context.attackerEngaged && !context.attackerMonsterVehicle && !(has("close-range") || has("pistol"))) {
      ineligibilityReasons.push("非凶兽/载具单位处于交战状态时只能选择[近距离]或[手枪]武器");
    }
    if (context.mode === "ranged" && context.attackerEngaged && context.attackerMonsterVehicle && has("blast") && context.targetEngaged !== false) {
      ineligibilityReasons.push("[爆炸]武器不能攻击与攻击单位处于交战状态的目标");
    }
    if (context.usingIndirectFire && !has("indirect-fire")) ineligibilityReasons.push("只有[曲射]武器能以曲射方式攻击不可见目标");
    let hitModifier = targetHasCover ? -1 : 0;
    if (has("heavy") && heavyConditionsMet && !isIndirect) hitModifier += 1;
    if (context.mode === "ranged" && context.attackerEngaged && context.attackerMonsterVehicle && !(has("close-range") || has("pistol"))) hitModifier -= 1;
    const attackModifier = (context.targetWithinHalfRange ? Number(rapidFire || 0) : 0)
      + crowdBands * Number(blast || 0)
      + (context.allAttacksSameTarget ? crowdBands * Number(cleave || 0) : 0);
    return Object.freeze({
      effects: Object.freeze(effects),
      canAttack: ineligibilityReasons.length === 0,
      ineligibilityReasons: Object.freeze(ineligibilityReasons),
      attackModifier,
      attackExpressionModifier: context.targetWithinHalfRange ? rapidFireExpression : "",
      damageModifier: context.targetWithinHalfRange ? Number(melta || 0) : 0,
      hitModifier,
      woundModifier: has("lance") && context.attackerCharged ? 1 : 0,
      unmodifiedHitThreshold: isIndirect
        ? (context.attackerRemainedStationary && context.targetVisibleToFriendly ? 4 : 6)
        : 0,
      preventHitRerolls: isIndirect,
      ignoreNegativeHitModifiers: has("psychic"),
      ignoresCover,
      grantsTargetCover,
      isPsychic: has("psychic"),
      isHazardous: has("hazardous"),
      hazardousDamage: context.attackerMonsterVehicle ? 3 : 1,
      isOneShot: has("one-shot"),
      targetsCharacter: has("precision") && Boolean(context.precisionTargetsCharacter),
      isExtraAttacks: has("extra-attacks"),
      isAssault: has("assault"),
      isCloseRange: has("close-range") || has("pistol"),
      isIndirect,
    });
  }

  root.WarhammerKeywordDictionary = { targets, targetAliases, parse, resolve, toWeaponPayload };
})(typeof globalThis === "undefined" ? this : globalThis);
