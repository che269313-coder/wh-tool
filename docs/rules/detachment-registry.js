/* Registry for independently generated faction detachment packages. */
(function (root) {
  const packages = new Map();

  function register(factionId, detachments) {
    const id = String(factionId || "").trim();
    if (!id || !Array.isArray(detachments)) throw new Error("分遣队包需要阵营 ID 和规则数组");
    if (packages.has(id)) throw new Error(`重复分遣队包：${id}`);
    const frozen = Object.freeze([...detachments]);
    packages.set(id, frozen);
    return frozen;
  }

  function get(factionId) {
    return packages.get(String(factionId || "").trim()) || [];
  }

  function list() {
    return Object.freeze(Object.fromEntries(packages));
  }

  root.WarhammerDetachmentRegistry = { register, get, list };
})(typeof globalThis === "undefined" ? this : globalThis);
