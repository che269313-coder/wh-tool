import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { computeBuildVersion } from "./generate-build-version.mjs";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

function factionDefinitions() {
  const context = vm.createContext({ console });
  context.globalThis = context;
  vm.runInContext(read("docs/rules/faction-registry.js"), context);
  vm.runInContext(read("docs/rules/factions.js"), context);
  return context.WarhammerFactionRegistry.list();
}

test("every faction declares independent runtime resources", () => {
  const definitions = factionDefinitions();
  assert.ok(definitions.length > 3);
  definitions.forEach((definition) => {
    assert.match(definition.runtime?.catalog || "", new RegExp(`catalogs/${definition.id}\\.json$`));
    assert.ok(Array.isArray(definition.runtime?.rules), `${definition.id} should declare rule scripts`);
    assert.match(definition.runtime?.detachment || "", new RegExp(`rules/detachments/${definition.id}\\.js$`));
  });
});

test("the startup document does not eagerly load faction payloads", () => {
  const html = read("docs/index.html");
  assert.match(html, /rules\/catalog-registry\.js/);
  assert.doesNotMatch(html, /rules\/(?:custodes|space-marines|death-guard|orks|website-factions)(?:-identities)?\.js/);
  assert.doesNotMatch(html, /rules\/detachments\/(?:adeptus-custodes|space-marines|death-guard|orks|website-factions)\.js/);
});

test("startup and lazy faction data share one cache-busting build version", () => {
  const html = read("docs/index.html");
  const manifestPath = path.join(root, "docs/build-version.json");
  assert.ok(fs.existsSync(manifestPath), "the deploy cache version must be generated from build content");
  const version = JSON.parse(fs.readFileSync(manifestPath, "utf8")).version;
  assert.match(version, /^data-[a-f0-9]{12}$/);
  assert.equal(computeBuildVersion(root).version, version, "manifest version must equal the current deploy payload hash");
  const changed = computeBuildVersion(root, new Map([
    ["docs/catalogs/orks.json", `${read("docs/catalogs/orks.json")}\nchanged`],
  ])).version;
  assert.notEqual(changed, version, "changing a generated faction payload must change the deploy version");
  for (const source of ["aliases/index.js", "rules/factions.js", "rules/faction-runtime-loader.js", "calculator-catalog.js", "app.js"]) {
    assert.match(html, new RegExp(`${source.replaceAll("/", "\\/").replaceAll(".", "\\.")}\\?v=${version}`));
  }
  assert.match(read("docs/rules/faction-runtime-loader.js"), new RegExp(`BUILD_VERSION = "${version}"`));
});

test("calculator-catalog.js is a lightweight search index", () => {
  const filename = path.join(root, "docs/calculator-catalog.js");
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(filename, "utf8"), context);
  const index = context.window.WARHAMMER_CALCULATOR_INDEX;
  assert.ok(Array.isArray(index));
  assert.ok(index.length > 1000);
  assert.ok(index.every((card) => card.factionId && card.faction && card.name));
  assert.ok(index.every((card) => card.unit === undefined && card.weapons === undefined && card.data === undefined));
  assert.ok(fs.statSync(filename).size < 512 * 1024, "search index should stay below 512 KiB");
});

test("each faction catalog registers one faction at a time (JSON + script fallback)", () => {
  const definitions = factionDefinitions();
  const registryPath = path.join(root, "docs/rules/catalog-registry.js");
  assert.ok(fs.existsSync(registryPath), "catalog registry should exist");
  definitions.forEach((definition) => {
    assert.ok(fs.existsSync(path.join(root, "docs", definition.runtime.catalog)), `${definition.id} catalog JSON should exist`);
    const fallbackPath = String(definition.runtime.catalog).replace(/\.json$/, ".js");
    assert.ok(fs.existsSync(path.join(root, "docs", fallbackPath)), `${definition.id} catalog script fallback should exist`);
  });
  const context = vm.createContext({ console });
  context.globalThis = context;
  vm.runInContext(fs.readFileSync(registryPath, "utf8"), context);
  const first = definitions[0];
  const parsed = JSON.parse(read(`docs/${first.runtime.catalog}`));
  context.WarhammerCalculatorCatalogRegistry.register(first.id, parsed);
  assert.deepEqual(Object.keys(context.WarhammerCalculatorCatalogRegistry.list()), [first.id]);
  assert.throws(() => context.WarhammerCalculatorCatalogRegistry.register(first.id, parsed), /重复数据卡包/);
});

test("JSON catalog deep-equals its script fallback", () => {
  const definitions = factionDefinitions();
  for (const definition of definitions) {
    const jsonPath = path.join(root, "docs", definition.runtime.catalog);
    const jsPath = String(definition.runtime.catalog).replace(/\.json$/, ".js");
    const parsed = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const context = vm.createContext({ console });
    context.globalThis = context;
    vm.runInContext(read("docs/rules/catalog-registry.js"), context);
    vm.runInContext(fs.readFileSync(path.join(root, "docs", jsPath), "utf8"), context, { filename: jsPath });
    const registered = JSON.parse(JSON.stringify(context.WarhammerCalculatorCatalogRegistry.get(definition.id)));
    assert.deepEqual(parsed, registered, `${definition.id} JSON 与脚本包必须内容一致`);
  }
});

test("website rule and detachment packages register one faction at a time", () => {
  const definition = factionDefinitions().find((candidate) => candidate.id === "grey-knights");
  const rulePath = path.join(root, "docs", definition.runtime.rules[0]);
  const detachmentPath = path.join(root, "docs", definition.runtime.detachment);
  assert.ok(fs.existsSync(rulePath), "grey-knights rule package should exist");
  assert.ok(fs.existsSync(detachmentPath), "grey-knights detachment package should exist");

  const ruleContext = vm.createContext({ console });
  ruleContext.globalThis = ruleContext;
  vm.runInContext(fs.readFileSync(rulePath, "utf8"), ruleContext);
  assert.ok(ruleContext.WarhammerWebsiteRules_grey_knights);
  assert.equal(ruleContext.WarhammerWebsiteRules, undefined);

  const detachmentContext = vm.createContext({ console });
  detachmentContext.globalThis = detachmentContext;
  vm.runInContext(read("docs/rules/detachment-registry.js"), detachmentContext);
  vm.runInContext(fs.readFileSync(detachmentPath, "utf8"), detachmentContext);
  assert.deepEqual(Object.keys(detachmentContext.WarhammerDetachmentRegistry.list()), [definition.id]);
});

test("runtime loader requests only the selected faction and caches it", async () => {
  const deployVersion = JSON.parse(read("docs/build-version.json")).version;
  const loaderPath = path.join(root, "docs/rules/faction-runtime-loader.js");
  assert.ok(fs.existsSync(loaderPath), "faction runtime loader should exist");
  const requested = [];
  const context = vm.createContext({
    console,
    document: {
      createElement: () => ({ dataset: {} }),
      head: {
        appendChild(script) {
          requested.push(script.src);
          queueMicrotask(() => script.onload());
        },
      },
    },
    queueMicrotask,
  });
  context.globalThis = context;
  vm.runInContext(read("docs/rules/faction-registry.js"), context);
  vm.runInContext(read("docs/rules/factions.js"), context);
  vm.runInContext(fs.readFileSync(loaderPath, "utf8"), context);

  await context.WarhammerFactionRuntimeLoader.load("灰骑士");
  await context.WarhammerFactionRuntimeLoader.load("grey-knights");

  assert.deepEqual([...requested], [
    `rules/factions/grey-knights.js?v=${deployVersion}`,
    `rules/detachments/grey-knights.js?v=${deployVersion}`,
    `catalogs/grey-knights.js?v=${deployVersion}`,
  ]);
});

test("every catalog carries provenance meta from its authored data package", () => {
  const definitions = factionDefinitions();
  for (const definition of definitions) {
    const jsonPath = path.join(root, "docs", definition.runtime.catalog);
    const parsed = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    assert.ok(parsed._meta, `${definition.id} catalog 必须携带 _meta 溯源`);
    assert.equal(parsed._meta.factionId, definition.id);
    assert.ok(parsed._meta.edition, `${definition.id} _meta 必须声明 edition`);
    assert.ok(parsed._meta.source, `${definition.id} _meta 必须声明 source`);
    const packagePath = path.join(root, "data", "factions", definition.id, "package.json");
    assert.ok(fs.existsSync(packagePath), `${definition.id} package.json should exist`);
    const payload = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    assert.deepEqual(parsed._meta.sourcePolicy, payload.sourcePolicy);
  }
});

test("runtime loader prefers fetch+JSON for catalogs", async () => {
  const fetches = [];
  const context = vm.createContext({
    console,
    document: {
      createElement: () => ({ dataset: {} }),
      head: { appendChild(script) { queueMicrotask(() => script.onload()); } },
    },
    queueMicrotask,
    fetch: async (url, options) => {
      fetches.push({ url, options });
      return { ok: true, json: async () => ({ faction: url }) };
    },
  });
  context.globalThis = context;
  vm.runInContext(read("docs/rules/faction-registry.js"), context);
  vm.runInContext(read("docs/rules/factions.js"), context);
  vm.runInContext(read("docs/rules/catalog-registry.js"), context);
  vm.runInContext(fs.readFileSync(path.join(root, "docs/rules/faction-runtime-loader.js"), "utf8"), context);

  await context.WarhammerFactionRuntimeLoader.load("灰骑士");
  assert.match(context.WarhammerCalculatorCatalogRegistry.get("grey-knights").faction, /^catalogs\/grey-knights\.json/, "注册的 catalog 来源应指向同阵营 JSON 包");
  assert.match(fetches[0].url, /catalogs\/grey-knights\.json\?v=/, "catalog 请求必须带构建版本号，内容变化通过版本号失效缓存");
  assert.notEqual(fetches[0].options?.cache, "no-cache", "版本号已保证新鲜度，不再强制 no-cache 复验以省一次移动端往返");
});

test("runtime loader falls back to script catalog when fetch fails", async () => {
  const deployVersion = JSON.parse(read("docs/build-version.json")).version;
  const requested = [];
  const context = vm.createContext({
    console,
    document: {
      createElement: () => ({ dataset: {} }),
      head: { appendChild(script) { requested.push(script.src); queueMicrotask(() => script.onload()); } },
    },
    queueMicrotask,
    fetch: async () => { throw new Error("file:// fetch blocked"); },
  });
  context.globalThis = context;
  vm.runInContext(read("docs/rules/faction-registry.js"), context);
  vm.runInContext(read("docs/rules/factions.js"), context);
  vm.runInContext(read("docs/rules/catalog-registry.js"), context);
  vm.runInContext(fs.readFileSync(path.join(root, "docs/rules/faction-runtime-loader.js"), "utf8"), context);

  await context.WarhammerFactionRuntimeLoader.load("灰骑士");
  assert.ok(requested.includes(`catalogs/grey-knights.js?v=${deployVersion}`), "fetch 失败必须回退到同版本脚本包");
  assert.ok(!requested.some((source) => source.endsWith(".json")), "脚本注入不应请求 JSON 路径");
});

test("application hydrates catalogs through the faction runtime loader", () => {
  const app = read("docs/app.js");
  assert.match(app, /WARHAMMER_CALCULATOR_INDEX/);
  assert.match(app, /WarhammerFactionRuntimeLoader\?\.load/);
  assert.match(app, /WarhammerCalculatorCatalogRegistry\?\.get/);
  assert.doesNotMatch(app, /embeddedCatalog\.length \? \[\] : CALCULATOR_CARD_FILES/);
  assert.match(app, /async function handleCalculatorPickerOption/);
  assert.match(app, /async function importRosterText/);
});

test("built-in library imports core files first and faction text on demand", () => {
  const app = read("docs/app.js");
  assert.match(app, /async function importBuiltinLibraryFiles\(paths = CORE_LIBRARY_FILES\)/);
  assert.match(app, /async function ensureFactionLibraryFiles/);
  assert.match(app, /await ensureLibraryFilesForFolders\(folders\)/);
  assert.doesNotMatch(app, /for \(const path of BUILTIN_LIBRARY_FILES\)/);
  assert.match(app, /function libraryFileKey/);
  assert.match(app, /new Set\(existing\.map\(libraryFileKey\)\)/);
});
