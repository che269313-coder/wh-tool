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

  function loadCatalog(definition) {
    const catalogPath = definition.runtime?.catalog;
    if (!catalogPath) return Promise.resolve();
    const fallbackPath = String(catalogPath).replace(/\.json$/, ".js");
    // HTTP(S) 下优先 fetch + JSON.parse：解析开销远小于等价脚本执行，且不占用
    // 主线程脚本编译；file:// 本地预览或 fetch 失败时回退到 .js 脚本包。
    if (typeof root.fetch !== "function") return loadScript(fallbackPath);
    return root.fetch(catalogPath, { cache: "force-cache" })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((catalog) => {
        if (!catalog || typeof catalog !== "object") throw new Error("数据卡包 JSON 无效");
        root.WarhammerCalculatorCatalogRegistry?.register(definition.id, catalog);
      })
      .catch(() => loadScript(fallbackPath));
  }

  function load(faction) {
    const definition = root.WarhammerFactionRegistry?.resolve(faction);
    if (!definition) return Promise.reject(new Error(`未注册阵营：${faction}`));
    if (factionLoads.has(definition.id)) return factionLoads.get(definition.id);
    const scripts = [
      ...(definition.runtime?.rules || []),
      definition.runtime?.detachment,
    ].filter(Boolean);
    const pending = scripts.reduce((chain, source) => chain.then(() => loadScript(source)), Promise.resolve())
      .then(() => loadCatalog(definition))
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
