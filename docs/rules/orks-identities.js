/* Stable rule identities for the Orks package. */
(function (root) {
  const definitions = {
    "orks.army.waagh": {
      scopeId: "army",
      englishName: "Waaagh!",
      matchStatus: "translated",
      notes: "英文名取自网站后端的阵营规则字段；规则正文来源为第11版网站资料。",
    },
  };
  const apply = (catalog) => {
    const unitDefinitions = {};
    Object.values(catalog?.unitRules || {}).flat().forEach((rule) => {
      const source = rule.source || {};
      if (!rule.id || !source.englishName || !source.record) return;
      unitDefinitions[rule.id] = {
        scopeId: rule.id.split(".")[1],
        englishName: source.englishName,
        matchStatus: "translated",
        notes: "英文技能名取自第11版网站后端；中文显示名来自网站繁体转简体结果。",
      };
    });
    return root.WarhammerRuleIdentity.applyCatalog(catalog, {
      factionId: "orks",
      definitions: { ...definitions, ...unitDefinitions },
      sourceBaseUrl: "https://40k.aiinpocket.com/faction/orks",
    });
  };
  root.WarhammerOrksRuleIdentities = { definitions, apply };
})(typeof globalThis === "undefined" ? this : globalThis);
