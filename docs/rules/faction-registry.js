/* Registry shared by data loading, rule lookup and build-time validation. */
(function (root) {
  const packages = new Map();
  const aliases = new Map();

  const normalized = (value) => String(value || "").trim().toLocaleLowerCase();

  function register(definition) {
    if (!definition?.id || !definition?.name) throw new Error("阵营包需要稳定 id 和显示名称");
    if (packages.has(definition.id)) throw new Error(`重复阵营 ID：${definition.id}`);
    const frozen = Object.freeze({
      ...definition,
      aliases: Object.freeze([...(definition.aliases || [])]),
      unitAliases: Object.freeze({ ...(definition.unitAliases || {}) }),
      data: Object.freeze({ ...(definition.data || {}) }),
      mechanics: Object.freeze({ ...(definition.mechanics || {}) }),
      unitTags: Object.freeze(Object.fromEntries(Object.entries(definition.unitTags || {}).map(([tag, value]) => [tag, Object.freeze({ ...value, includeUnits: Object.freeze([...(value.includeUnits || [])]), excludeUnits: Object.freeze([...(value.excludeUnits || [])]) })]))),
      library: Object.freeze((definition.library || []).map((entry) => Object.freeze({ ...entry }))),
      digitalUnitAliases: Object.freeze({ ...(definition.digitalUnitAliases || {}) }),
    });
    const declaredAliases = [frozen.id, frozen.name, ...frozen.aliases];
    declaredAliases.forEach((alias) => {
      const key = normalized(alias);
      const owner = aliases.get(key);
      if (owner && owner !== frozen.id) throw new Error(`阵营别名冲突：${alias} 已属于 ${owner}`);
    });
    packages.set(frozen.id, frozen);
    declaredAliases.forEach((alias) => aliases.set(normalized(alias), frozen.id));
    return frozen;
  }

  function list() {
    return [...packages.values()];
  }

  function resolve(value) {
    return packages.get(aliases.get(normalized(value))) || null;
  }

  function resolveUnitName(faction, unitName) {
    const definition = resolve(faction);
    const source = String(unitName || "").trim();
    if (!definition) return source;
    const withoutPrefix = source.startsWith(definition.name) ? source.slice(definition.name.length).trim() : source;
    return definition.unitAliases[source]
      || definition.unitAliases[withoutPrefix]
      || source.replace(/[（(][^）)]*[）)]/g, "").trim();
  }

  function unitHasTag(faction, unitName, tag) {
    const definition = resolve(faction);
    const config = definition?.unitTags?.[tag];
    if (!definition || !config) return false;
    const name = resolveUnitName(definition.id, unitName);
    if (!name) return false;
    if ((config.excludeUnits || []).includes(name)) return false;
    return Boolean(config.default) || (config.includeUnits || []).includes(name);
  }

  root.WarhammerFactionRegistry = { register, list, resolve, resolveUnitName, unitHasTag };
})(typeof globalThis === "undefined" ? this : globalThis);
