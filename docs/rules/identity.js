/* Stable rule identities. Display names may change without changing behavior. */
(function (root) {
  const MATCH_STATUSES = new Set(["official", "translated", "translated-needs-review"]);

  function slug(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[’']/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
  }

  function create(input) {
    const factionId = slug(input?.factionId);
    const scopeId = slug(input?.scopeId);
    const abilityId = slug(input?.englishName);
    if (!factionId || !scopeId || !abilityId) throw new Error("规则 ID 需要 factionId、scopeId 和 englishName");
    if (!MATCH_STATUSES.has(input.matchStatus)) throw new Error(`未知的英文名匹配状态：${input.matchStatus}`);
    if (input.matchStatus === "official" && !input.sourceUrl) throw new Error("官方英文名必须记录来源 URL");
    return Object.freeze({
      id: `${factionId}.${scopeId}.${abilityId}`,
      factionId,
      scopeId,
      englishName: String(input.englishName),
      chineseName: String(input.chineseName || ""),
      matchStatus: input.matchStatus,
      sourceUrl: input.sourceUrl || "",
      notes: input.notes || "",
      legacyIds: Object.freeze([...(input.legacyIds || [])]),
    });
  }

  function audit(identities) {
    return (identities || []).filter((identity) => identity?.matchStatus === "translated-needs-review");
  }

  function applyCatalog(catalog, options) {
    const definitions = options?.definitions || {};
    // passthrough：无需稳定身份的合成条目（如 normalizeCoreAbilityRules 生成的"核心技能"束）
    // 跳过身份注册，保持原样。此类条目不来自数据源，且每个单位重复出现，注册会互相冲突。
    const passthrough = options?.passthrough || (() => false);
    const seen = new Set();
    const identify = (rule) => {
      if (passthrough(rule)) return rule;
      const legacyId = rule.id;
      const definition = definitions[legacyId];
      if (!definition) throw new Error(`Missing ${options?.factionId || "faction"} rule identity: ${legacyId}`);
      const stableId = `${slug(options.factionId)}.${slug(definition.scopeId)}.${slug(definition.englishName)}`;
      const identity = create({
        factionId: options.factionId,
        scopeId: definition.scopeId,
        englishName: definition.englishName,
        chineseName: rule.name,
        matchStatus: definition.matchStatus,
        sourceUrl: definition.sourceUrl || (definition.matchStatus === "official" ? `${options.sourceBaseUrl}/units/${definition.scopeId}` : ""),
        notes: definition.notes,
        legacyIds: [...new Set([...(rule.legacyIds || []), legacyId].filter((id) => id && id !== stableId))],
      });
      if (seen.has(identity.id)) throw new Error(`Duplicate stable rule ID: ${identity.id}`);
      seen.add(identity.id);
      return { ...rule, id: identity.id, legacyIds: identity.legacyIds, identity };
    };
    return {
      factionRules: (catalog?.factionRules || []).map(identify),
      unitRules: Object.fromEntries(Object.entries(catalog?.unitRules || {}).map(([name, rules]) => [name, rules.map(identify)])),
    };
  }

  root.WarhammerRuleIdentity = { MATCH_STATUSES, slug, create, audit, applyCatalog };
})(typeof globalThis === "undefined" ? this : globalThis);
