import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestContext = vm.createContext({ console });
manifestContext.globalThis = manifestContext;
for (const relativePath of ["docs/rules/faction-registry.js", "docs/rules/factions.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, relativePath), "utf8"), manifestContext, { filename: relativePath });
}
const inputs = manifestContext.WarhammerFactionRegistry.list()
  .filter((definition) => definition.data.catalog && definition.runtime.catalog)
  .map((definition) => ({ definition, file: definition.data.catalog }));
const keywordRows = (markdown, page) => {
  const heading = new RegExp(`## 第\\s*${Number(page)}\\s*页[：:]?`);
  const start = markdown.search(heading);
  if (start < 0) return { factionKeywords: [], keywords: [] };
  const next = markdown.slice(start + 1).search(/\n## 第\s*\d+\s*页/);
  const section = markdown.slice(start, next < 0 ? markdown.length : start + 1 + next);
  const followingStart = next < 0 ? -1 : start + 1 + next;
  const followingEnd = followingStart < 0 ? -1 : markdown.slice(followingStart + 1).search(/\n## 第\s*\d+\s*页/);
  const following = followingStart < 0 ? "" : markdown.slice(followingStart, followingEnd < 0 ? markdown.length : followingStart + 1 + followingEnd);
  const read = (label) => {
    const line = section.split(/\r?\n/).find((item) => new RegExp(`^\\|\\s*${label}\\s*\\|`).test(item));
    if (!line) return [];
    const value = line.split("|").slice(2).join(" ").replace(/<br\s*\/?>(?=\S)/gi, " ").replace(/\s+/g, " ").trim();
    return [...new Set(value.replace(/^\s*(?:\d+\s*)+/, "").split(/[，,、]/).map((item) => item.trim()).filter((item) => item && !/^\d+$/.test(item)))];
  };
  const first = { factionKeywords: read("阵营关键词"), keywords: read("关键词") };
  if (first.factionKeywords.length || first.keywords.length || !following) return first;
  const fallbackRead = (label) => {
    const line = following.split(/\r?\n/).find((item) => new RegExp(`^\\|\\s*${label}\\s*\\|`).test(item));
    if (!line) return [];
    return [...new Set(line.split("|").slice(2).join(" ").replace(/<br\s*\/?>(?=\S)/gi, " ").replace(/\s+/g, " ").trim().replace(/^\s*(?:\d+\s*)+/, "").split(/[，,、]/).map((item) => item.trim()).filter((item) => item && !/^\d+$/.test(item)))];
  };
  return { factionKeywords: fallbackRead("阵营关键词"), keywords: fallbackRead("关键词") };
};
const cleanEquipmentText = (value, weapons = []) => String(value ?? "")
  .replace(/(^|[，,、\s])[\u8001\u6e7f\u8150\u9524\u6218\u7fa4](?=\s*[\u4e00-\u9fffA-Za-z0-9])/g, "$1")
  .replace(/[\u6e7f](?=和)/g, "")
  .replace(/\s+/g, " ")
  .trim();
const cleanKeywordList = (values) => [...new Set((Array.isArray(values) ? values : [])
  .map((value) => cleanEquipmentText(value))
  .filter(Boolean))];
const cleanAbilityText = (value) => String(value ?? "")
  .replace(/\s+\d+\s+\d+\s*$/, "")
  .replace(/\s+/g, " ")
  .trim();

const sourceMarkdown = new Map([
  ["帝皇禁军", "docs/data/帝皇禁军/数据卡-OCR-可检索.md"],
  ["星际战士", "docs/data/星际战士/数据卡-可检索.md"],
  ["死亡守卫", "docs/data/死亡守卫/死亡守卫-数据卡-可检索.md"],
  ["欧克兽人", "docs/data/欧克兽人/数据卡-可检索.md"],
]);
const catalogs = inputs.map(({ definition, file }) => {
  const data = JSON.parse(fs.readFileSync(path.join(root, "docs", file), "utf8"));
  const faction = data.faction || definition.name;
  const markdownPath = sourceMarkdown.get(faction);
  const markdown = markdownPath ? fs.readFileSync(path.join(root, markdownPath), "utf8") : "";
  const catalog = { ...data, faction, cards: (data.cards || []).map((card) => {
    const extracted = keywordRows(markdown, card.page);
    const extractedFactionKeywords = cleanKeywordList(extracted.factionKeywords);
    const extractedKeywords = cleanKeywordList(extracted.keywords);
    return {
      ...card,
      unit: card.unit ? { ...card.unit, abilities: cleanAbilityText(card.unit.abilities), defaultEquipment: cleanEquipmentText(card.unit.defaultEquipment, card.weapons) } : card.unit,
      modelProfiles: (card.modelProfiles || []).map((profile) => ({ ...profile, defaultEquipment: cleanEquipmentText(profile.defaultEquipment, card.weapons) })),
      factionKeywords: cleanKeywordList(card.factionKeywords).length ? cleanKeywordList(card.factionKeywords) : (extractedFactionKeywords.length ? extractedFactionKeywords : [faction]),
      keywords: cleanKeywordList(card.keywords).length ? cleanKeywordList(card.keywords) : extractedKeywords,
    };
  }) };
  return { definition, catalog };
});

const index = catalogs.flatMap(({ definition, catalog }) => (catalog.cards || [])
  .filter((card) => card.name)
  .map((card) => ({
    factionId: definition.id,
    faction: catalog.faction || definition.name,
    name: card.name,
    englishName: card.englishName || card.unit?.englishName || "",
    page: card.page ?? null,
  })));
const indexOutput = [
  "// Generated lightweight search index. Full datasheets load per faction.",
  `window.WARHAMMER_CALCULATOR_INDEX = ${JSON.stringify(index)};`,
  "",
].join("\n");

fs.writeFileSync(path.join(root, "docs/calculator-catalog.js"), indexOutput, "utf8");
const catalogDirectory = path.join(root, "docs/catalogs");
fs.mkdirSync(catalogDirectory, { recursive: true });
for (const { definition, catalog } of catalogs) {
  const output = [
    `/* Generated independent datasheet package for ${definition.id}. */`,
    "(function (root) {",
    "  const registry = root.WarhammerCalculatorCatalogRegistry;",
    "  if (!registry) throw new Error('catalog-registry.js must load before faction catalogs');",
    `  registry.register(${JSON.stringify(definition.id)}, ${JSON.stringify(catalog)});`,
    "})(typeof globalThis === 'undefined' ? this : globalThis);",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(root, "docs", definition.runtime.catalog), output, "utf8");
}
console.log(`Generated ${index.length} search entries and ${catalogs.length} independent faction catalogs.`);
