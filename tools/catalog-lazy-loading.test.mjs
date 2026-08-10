import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

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
    assert.match(definition.runtime?.catalog || "", new RegExp(`catalogs/${definition.id}\\.js$`));
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

test("each faction catalog can register without loading another faction", () => {
  const definitions = factionDefinitions();
  const registryPath = path.join(root, "docs/rules/catalog-registry.js");
  assert.ok(fs.existsSync(registryPath), "catalog registry should exist");
  definitions.forEach((definition) => {
    assert.ok(fs.existsSync(path.join(root, "docs", definition.runtime.catalog)), `${definition.id} catalog package should exist`);
  });
  const context = vm.createContext({ console });
  context.globalThis = context;
  vm.runInContext(fs.readFileSync(registryPath, "utf8"), context);
  const first = definitions[0];
  vm.runInContext(read(`docs/${first.runtime.catalog}`), context);
  assert.deepEqual(Object.keys(context.WarhammerCalculatorCatalogRegistry.list()), [first.id]);
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
    "rules/factions/grey-knights.js",
    "rules/detachments/grey-knights.js",
    "catalogs/grey-knights.js",
  ]);
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
