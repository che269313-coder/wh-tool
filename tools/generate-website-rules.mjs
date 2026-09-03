import fs from "node:fs";
import path from "node:path";
import { compileAbility, compileFactionAbility } from "./faction-rule-compiler.mjs";
import { normalizeCoreAbilityRules } from "./lib/core-ability-normalizer.mjs";

const root = path.resolve(import.meta.dirname, "..");
const factions = [
  ["grey-knights", "灰骑士"], ["adepta-sororitas", "修女会"], ["astra-militarum", "星界军"],
  ["imperial-knights", "帝国骑士"], ["adeptus-mechanicus", "机械修会"], ["agents-of-imperium", "帝国特勤"],
  ["chaos-space-marines", "混沌星际战士"], ["thousand-sons", "千子"], ["world-eaters", "吞世者"],
  ["chaos-daemons", "混沌恶魔"], ["chaos-knights", "混沌骑士"], ["aeldari", "艾达灵族"],
  ["drukhari", "黑暗灵族"], ["tyranids", "泰伦虫族"], ["necrons", "太空死灵"],
  ["tau-empire", "钛帝国"], ["genestealer-cults", "基因窃取者教派"], ["leagues-of-votann", "沃坦联盟"],
  ["emperors-children", "帝皇之子"],
];
const readJson = (file) => {
  let text = fs.readFileSync(file, "utf8");
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  return JSON.parse(text);
};
const rules = {};
for (const [factionId, factionName] of factions) {
  const data = readJson(path.join(root, "docs", "catalogs", `${factionId}.json`));
  const raw = readJson(path.join(root, "docs", "data", factionName, `${factionName}-网站原始数据-简体.json`));
  const rawCards = new Map((raw.cards || []).map((card) => [card.id, card]));
  const unitRules = {};
  for (const card of data.cards || []) {
    const rawAbilities = new Map((rawCards.get(card.id)?.abilities || []).map((ability) => [ability.id, ability]));
    const usedIds = new Map();
    // 通用核心技能（深入打击、领袖等）只保留技能名清单，不把全文带进部署文件。
    unitRules[card.name] = normalizeCoreAbilityRules((card.abilities || []).filter((ability) => ability.category !== "faction").map((ability) => {
      const count = (usedIds.get(ability.id) || 0) + 1;
      usedIds.set(ability.id, count);
      const compiled = compileAbility({ ...ability, name: rawAbilities.get(ability.id)?.name || ability.name });
      return {
        id: count === 1 ? ability.id : `${ability.id}-${count}`,
        name: ability.name,
        text: ability.text || "",
        status: compiled.status,
        ...(compiled.controls.length ? { controls: compiled.controls } : {}),
        effects: compiled.effects,
        source: { englishName: ability.englishName || "", kind: ability.category || "unique" },
      };
    }));
  }
  const factionRule = raw.faction?.army_rule_name_zh && raw.faction?.army_rule_text_zh ? (() => {
    const factionAbilities = (data.cards || []).flatMap((card) => card.abilities || []).filter((ability) => ability.category === "faction");
    const counts = new Map();
    factionAbilities.forEach((ability) => counts.set(ability.name, (counts.get(ability.name) || 0) + 1));
    const canonical = [...factionAbilities].sort((left, right) => (counts.get(right.name) || 0) - (counts.get(left.name) || 0))[0];
    const ability = {
      id: `${factionId}.army-rule`,
      name: canonical?.name || raw.faction.army_rule_name_zh,
      englishName: canonical?.englishName || "",
      text: raw.faction.army_rule_text_zh,
      category: "faction",
    };
    const compiled = compileFactionAbility({ ...ability, name: raw.faction.army_rule_name_zh });
    return [{ ...ability, status: compiled.status, ...(compiled.controls.length ? { controls: compiled.controls } : {}), effects: compiled.effects, source: { englishName: ability.englishName, kind: "faction" } }];
  })() : [];
  rules[factionId] = { factionRules: factionRule, unitRules };
}
const outputDirectory = path.join(root, "docs", "rules", "factions");
fs.mkdirSync(outputDirectory, { recursive: true });
for (const [factionId, catalog] of Object.entries(rules)) {
  const globalName = `WarhammerWebsiteRules_${factionId.replace(/-/g, "_")}`;
  const output = [
    `/* Generated source-text rule package for ${factionId}. */`,
    "(function (root) {",
    `  root[${JSON.stringify(globalName)}] = ${JSON.stringify(catalog, null, 2)};`,
    "})(typeof globalThis === 'undefined' ? this : globalThis);",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(outputDirectory, `${factionId}.js`), output, "utf8");
}
console.log(`Generated ${factions.length} independent website rule packages -> ${path.relative(root, outputDirectory)}`);
