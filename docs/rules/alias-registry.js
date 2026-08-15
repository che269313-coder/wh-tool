/* Unified alias registry for units, weapons and detachments.
 *
 * Alias entries carry a faction scope and a source. Faction-scoped aliases
 * resolve only inside their own faction (same-name units across factions are
 * allowed), global entries resolve everywhere. app.js consumes exactly this
 * API; faction manifests, roster import and picker search all share it.
 */
(function (root) {
  const normalize = (value) => String(value || "").normalize("NFKC").trim().toLocaleLowerCase();

  const factions = new Map(); // factionId -> { units, weapons, detachments } : Map<aliasKey, entry>
  const globalEntries = { units: new Map(), weapons: new Map(), detachments: new Map() };
  const digitals = new Map(); // factionId -> Map<page, [names]>（数字版数据卡按页别名）
  const terms = new Map();          // normalizedTerm -> { display, aliases, factions:Set|null }（规范显示名裁决，null=全局）
  const factionTerms = new Map();    // factionId -> Map<normalizedTerm, entry>

  function kindEntries(factionId, kind) {
    let target = factions.get(factionId);
    if (!target) {
      target = { units: new Map(), weapons: new Map(), detachments: new Map() };
      factions.set(factionId, target);
    }
    return target[kind];
  }

  function insert(factionId, kind, alias, entry) {
    const key = normalize(alias);
    const canonical = String(entry?.canonical || "");
    if (!key || !canonical) return;
    const record = { canonical, source: String(entry?.source || ""), scope: entry?.scope === "global" ? "global" : "faction" };
    const bucket = record.scope === "global" ? globalEntries[kind] : kindEntries(factionId, kind);
    const existing = bucket.get(key);
    if (existing && normalize(existing.canonical) !== normalize(canonical)) {
      throw new Error(kind + " 别名冲突：" + alias + "（" + existing.canonical + " vs " + canonical + "）");
    }
    bucket.set(key, record);
  }

  function register(payload) {
    const factionId = String(payload?.factionId || "");
    if (!factionId) throw new Error("别名包需要 factionId");
    Object.entries(payload?.units || {}).forEach(([alias, entry]) => insert(factionId, "units", alias, typeof entry === "string" ? { canonical: entry } : entry));
    Object.entries(payload?.weapons || {}).forEach(([alias, entry]) => insert(factionId, "weapons", alias, typeof entry === "string" ? { canonical: entry } : entry));
    Object.entries(payload?.detachments || {}).forEach(([alias, entry]) => insert(factionId, "detachments", alias, typeof entry === "string" ? { canonical: entry } : entry));
    if (payload?.digitalUnits && typeof payload.digitalUnits === "object") {
      const pages = new Map();
      Object.entries(payload.digitalUnits).forEach(([page, names]) => {
        const list = (Array.isArray(names) ? names : [names]).filter(Boolean).map(String);
        if (list.length) pages.set(String(page), list);
      });
      if (pages.size) digitals.set(factionId, pages);
    }
    registerTerms(payload?.terms);
    return payload;
  }

  function termEntryFor(faction, name) {
    const key = normalize(name);
    const definition = root.WarhammerFactionRegistry?.resolve(faction);
    const local = factionTerms.get(definition?.id || "")?.get(key);
    if (local) return local;
    return terms.get(key) || null;
  }

  function registerTerms(list) {
    (list || []).forEach((term) => {
      const display = String(term?.display || "");
      if (!display) return;
      const entry = { display, aliases: (term?.aliases || []).map(String), factions: Array.isArray(term?.factions) && term.factions.length ? new Set(term.factions.map(String)) : null };
      const targets = entry.factions ? [...entry.factions] : [null];
      targets.forEach((factionId) => {
        const bucket = factionId ? (factionTerms.get(factionId) || factionTerms.set(factionId, new Map()).get(factionId)) : terms;
        const put = (aliasKey) => { if (aliasKey && !bucket.has(aliasKey)) bucket.set(aliasKey, entry); };
        put(normalize(display));
        (entry.aliases || []).forEach((alias) => put(normalize(alias)));
      });
    });
  }

  function displayNameFor(faction, name) {
    const source = String(name || "");
    const exact = termEntryFor(faction, source);
    if (exact) return exact.display;
    // 阈值类技能名（不觉疼痛5+、致命破灭D3）按"词干 + 数值后缀"匹配规范显示名。
    const suffixMatch = source.match(/^(.+?)(\d*D?\d+(?:\+\d+)?\+?)$/);
    if (suffixMatch) {
      const base = termEntryFor(faction, suffixMatch[1]);
      if (base) return base.display + suffixMatch[2];
    }
    return source;
  }

  function digitalUnitAliases(faction) {
    const definition = root.WarhammerFactionRegistry?.resolve(faction);
    const pages = digitals.get(definition?.id || "");
    if (!pages) return {};
    return Object.fromEntries([...pages.entries()]);
  }

  function allDigitalUnitAliases() {
    return Object.fromEntries([...digitals.entries()].map(([factionId, pages]) => [factionId, Object.fromEntries([...pages.entries()])]));
  }

  function lookup(kind, faction, name) {
    const key = normalize(name);
    if (!key) return null;
    const definition = root.WarhammerFactionRegistry?.resolve(faction);
    const local = kindEntries(definition?.id || "", kind).get(key);
    if (local) return local.canonical;
    const globalEntry = globalEntries[kind].get(key);
    if (globalEntry) return globalEntry.canonical;
    return null;
  }

  function resolve(kind, faction, name) {
    return lookup(kind, faction, name) ?? String(name || "");
  }

  function candidates(kind, name, faction = "") {
    const key = normalize(name);
    if (!key) return [];
    const results = [];
    const definition = root.WarhammerFactionRegistry?.resolve(faction);
    if (definition) {
      const entry = kindEntries(definition.id, kind).get(key);
      if (entry) results.push({ factionId: definition.id, canonical: entry.canonical, source: entry.source, scope: "faction" });
    } else {
      factions.forEach((target, factionId) => {
        const entry = target[kind].get(key);
        if (entry) results.push({ factionId, canonical: entry.canonical, source: entry.source, scope: "faction" });
      });
    }
    const globalEntry = globalEntries[kind].get(key);
    if (globalEntry) results.push({ factionId: "*", canonical: globalEntry.canonical, source: globalEntry.source, scope: "global" });
    return results;
  }

  function aliasesForCanonical(kind, canonical, faction = "") {
    const key = normalize(canonical);
    if (!key) return [];
    const aliases = new Set();
    const definition = root.WarhammerFactionRegistry?.resolve(faction);
    if (definition) {
      kindEntries(definition.id, kind).forEach((entry, alias) => { if (normalize(entry.canonical) === key) aliases.add(alias); });
    } else {
      factions.forEach((target) => {
        target[kind].forEach((entry, alias) => { if (normalize(entry.canonical) === key) aliases.add(alias); });
      });
    }
    globalEntries[kind].forEach((entry, alias) => { if (normalize(entry.canonical) === key) aliases.add(alias); });
    return [...aliases];
  }

  function haystackFor(kind, faction) {
    const parts = [];
    const definition = root.WarhammerFactionRegistry?.resolve(faction);
    const local = kindEntries(definition?.id || "", kind);
    local.forEach((entry, alias) => { parts.push(alias, entry.canonical); });
    globalEntries[kind].forEach((entry, alias) => { parts.push(alias, entry.canonical); });
    return parts.filter(Boolean).join(" ");
  }

  root.WarhammerAliasRegistry = {
    register,
    registerTerms,
    displayNameFor,
    digitalUnitAliases,
    allDigitalUnitAliases,
    resolveUnit: (faction, name) => resolve("units", faction, name),
    lookupUnit: (faction, name) => lookup("units", faction, name),
    resolveWeapon: (faction, name) => resolve("weapons", faction, name),
    resolveDetachment: (faction, name) => resolve("detachments", faction, name),
    unitCandidates: (name, faction) => candidates("units", name, faction),
    weaponCandidates: (name, faction) => candidates("weapons", name, faction),
    detachmentCandidates: (name, faction) => candidates("detachments", name, faction),
    aliasesForCanonical,
    haystackFor,
    list: () => [...factions.keys()],
  };
})(typeof globalThis === "undefined" ? this : globalThis);
