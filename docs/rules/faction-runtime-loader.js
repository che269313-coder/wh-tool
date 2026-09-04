/* Loads one faction's rule, detachment and datasheet scripts on demand. */
(function (root) {
  const BUILD_VERSION = "data-6f3c983f79bf";
  const scriptLoads = new Map();
  const factionLoads = new Map();

  function versionedPath(source) {
    const path = String(source || "").trim();
    if (!path) return "";
    return `${path}${path.includes("?") ? "&" : "?"}v=${encodeURIComponent(BUILD_VERSION)}`;
  }

  function loadScript(source) {
    const path = versionedPath(source);
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
    // catalog 与脚本包共用同一构建版本号：内容变化必然改变版本号与 URL，
    // 因此走默认 HTTP 缓存（长缓存 + 版本失效）即可保证新鲜度，不再每次
    // no-cache 强制复验——手机端复访可省一次网络往返。
    return root.fetch(versionedPath(catalogPath))
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
    // 脚本并行请求（async=false 注入仍保持执行顺序），移动端点击选择单位时
    // 不再为串行链多付 2 个 RTT；待全部就绪后再拉取数据卡包。
    const pending = Promise.all(scripts.map((source) => loadScript(source)))
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
