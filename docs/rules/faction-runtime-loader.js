/* Loads one faction's rule, detachment and datasheet scripts on demand. */
(function (root) {
  const scriptLoads = new Map();
  const factionLoads = new Map();

  function loadScript(source) {
    const path = String(source || "").trim();
    if (!path) return Promise.resolve();
    if (scriptLoads.has(path)) return scriptLoads.get(path);
    const pending = new Promise((resolve, reject) => {
      const script = root.document.createElement("script");
      script.src = path;
      script.async = false;
      script.dataset.factionRuntime = path;
      script.onload = () => resolve(path);
      script.onerror = () => reject(new Error(`无法加载阵营资源：${path}`));
      root.document.head.appendChild(script);
    }).catch((error) => {
      scriptLoads.delete(path);
      throw error;
    });
    scriptLoads.set(path, pending);
    return pending;
  }

  function load(faction) {
    const definition = root.WarhammerFactionRegistry?.resolve(faction);
    if (!definition) return Promise.reject(new Error(`未注册阵营：${faction}`));
    if (factionLoads.has(definition.id)) return factionLoads.get(definition.id);
    const scripts = [
      ...(definition.runtime?.rules || []),
      definition.runtime?.detachment,
      definition.runtime?.catalog,
    ].filter(Boolean);
    const pending = scripts.reduce((chain, source) => chain.then(() => loadScript(source)), Promise.resolve())
      .then(() => definition)
      .catch((error) => {
        factionLoads.delete(definition.id);
        throw error;
      });
    factionLoads.set(definition.id, pending);
    return pending;
  }

  function isLoaded(faction) {
    const definition = root.WarhammerFactionRegistry?.resolve(faction);
    return Boolean(definition && factionLoads.has(definition.id));
  }

  root.WarhammerFactionRuntimeLoader = { load, isLoaded };
})(typeof globalThis === "undefined" ? this : globalThis);
