/* Pure helpers for roster-instance detachment metadata and state isolation. */
(function (root) {
  function parseMetadata(faction, sourceText, resolver = root.WarhammerRuleResolver) {
    const lines = String(sourceText || "").replace(/\r/g, "").split("\n");
    const separatorIndex = lines.findIndex((line) => /^-+$/.test(line.trim()));
    const headerCandidates = lines
      .slice(0, separatorIndex >= 0 ? separatorIndex : lines.length)
      .map((line, index) => ({ line: line.trim(), index }))
      .filter(({ line }) => line && !/^强化：/.test(line));
    const matched = headerCandidates
      .map((candidate) => ({ ...candidate, detachments: resolver?.matchDetachments(faction, candidate.line) || [] }))
      .filter((candidate) => candidate.detachments.length)
      .sort((left, right) => right.detachments.length - left.detachments.length || left.index - right.index)[0];
    const detachments = matched?.detachments || [];
    return {
      detachmentIds: detachments.map((detachment) => detachment.id),
      detachmentNames: detachments.map((detachment) => detachment.name),
      dp: detachments.reduce((total, detachment) => total + Number(detachment.dp || 0), 0),
      sourceText: matched?.line || "",
    };
  }

  function matchEnhancement(faction, detachmentIds, sourceText, resolver = root.WarhammerRuleResolver) {
    return resolver?.matchEnhancement(faction, detachmentIds, sourceText) || null;
  }

  function sourceKey(calculatorSide, rosterId, unitId) {
    return ["roster", calculatorSide || "unknown", rosterId || "unknown-roster", unitId || "unknown-unit"].join(":");
  }

  function isCharacter(candidate = {}) {
    const role = String(candidate.parentRole || candidate.role || "");
    const keywords = [...(candidate.keywords || []), ...(candidate.factionKeywords || [])].join(" ");
    if (/护卫|bodyguard|普通队员/i.test(role)) return false;
    return /角色|人物|领导|主将|领袖|character|leader/i.test(`${role} ${keywords}`);
  }

  function enhancementTargets(candidates = []) {
    const unique = new Map();
    candidates.filter(isCharacter).forEach((candidate) => {
      const id = candidate.parentId || candidate.id;
      if (id && !unique.has(id)) unique.set(id, { ...candidate, id });
    });
    return [...unique.values()];
  }

  function enhancementIdsForTarget(assignments = {}, candidates = [], targetId) {
    const eligible = new Set(enhancementTargets(candidates).map((candidate) => candidate.id));
    const id = String(targetId || "");
    return eligible.has(id) && assignments[id] ? [assignments[id]] : [];
  }

  function normalizedSearchText(candidate = {}) {
    return [candidate.name, candidate.englishName, candidate.role, candidate.parentRole, ...(candidate.keywords || []), ...(candidate.factionKeywords || [])]
      .filter(Boolean).join(" ").normalize("NFKC").toLocaleLowerCase().replace(/\s+/g, "");
  }

  function matchesTraitGroup(searchText, aliases = []) {
    return aliases.some((alias) => searchText.includes(String(alias || "").normalize("NFKC").toLocaleLowerCase().replace(/\s+/g, "")));
  }

  function matchesEnhancementEligibility(candidate, eligibility) {
    if (!eligibility) return true;
    const searchText = normalizedSearchText(candidate);
    if ((eligibility.exclude || []).some((group) => matchesTraitGroup(searchText, group))) return false;
    if ((eligibility.all || []).some((group) => !matchesTraitGroup(searchText, group))) return false;
    return !(eligibility.any || []).length || eligibility.any.some((group) => matchesTraitGroup(searchText, group));
  }

  root.WarhammerRosterContext = { parseMetadata, matchEnhancement, sourceKey, isCharacter, enhancementTargets, enhancementIdsForTarget, matchesEnhancementEligibility };
})(typeof globalThis === "undefined" ? this : globalThis);
