/* Runtime registry for independently loaded faction datasheet packages. */
(function (root) {
  const catalogs = new Map();

  function register(factionId, catalog) {
    const id = String(factionId || "").trim();
    if (!id || !catalog || typeof catalog !== "object") throw new Error("数据卡包需要阵营 ID 和 catalog 对象");
    if (catalogs.has(id)) throw new Error(`重复数据卡包：${id}`);
    catalogs.set(id, catalog);
    return catalog;
  }

  function get(factionId) {
    return catalogs.get(String(factionId || "").trim()) || null;
  }

  function has(factionId) {
    return catalogs.has(String(factionId || "").trim());
  }

  function list() {
    return Object.fromEntries(catalogs);
  }

  root.WarhammerCalculatorCatalogRegistry = { register, get, has, list };
})(typeof globalThis === "undefined" ? this : globalThis);
