import fs from "node:fs";
import path from "node:path";

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
const safeId = (value) => String(value || "entry").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "entry";
const text = (value) => String(value ?? "").trim();
const packages = {};
for (const [factionId, factionName] of factions) {
  const file = path.join(root, "docs", "data", factionName, `${factionName}-网站原始数据-简体.json`);
  const raw = readJson(file);
  packages[factionId] = (raw.detachments || []).map((entry, index) => {
    const det = entry.detachment || {};
    const id = `${factionId}.detachment.${safeId(det.slug || det.name || index + 1)}`;
    const rules = (entry.abilities || []).map((ability, abilityIndex) => {
      const kind = ability.kind === "stratagem" ? "stratagem" : ability.kind === "enhancement" ? "enhancement" : "ability";
      const name = ability.name_zh || ability.name || `规则 ${abilityIndex + 1}`;
      return {
        id: `${id}.${kind}.${safeId(ability.name || abilityIndex + 1)}`,
        detachmentId: id,
        type: kind,
        name,
        englishName: ability.name || "",
        text: [ability.when_text_zh, ability.effect_text_zh, ability.target_text_zh].filter(Boolean).join("\n\n"),
        effectText: text(ability.effect_text_zh),
        when: text(ability.when_text_zh),
        target: text(ability.target_text_zh),
        cp: ability.cp_cost ?? null,
        points: ability.points_cost ?? null,
        status: "仅供查阅",
        identityStatus: "translated-needs-review",
      };
    });
    return {
      id,
      factionId,
      detachmentNumber: index + 1,
      name: det.name_zh || det.name || `分遣队 ${index + 1}`,
      englishName: det.name || "",
      dp: det.detachment_points ?? 0,
      rule: {
        id: `${id}.rule`, detachmentId: id, type: "detachment-rule",
        name: det.rule_name_zh || det.rule_name || "分遣队规则", englishName: det.rule_name || "",
        text: text(det.rule_text_zh), effectText: text(det.rule_text_zh), status: "仅供查阅",
        identityStatus: "translated-needs-review",
      },
      stratagems: rules.filter((item) => item.type === "stratagem"),
      enhancements: rules.filter((item) => item.type === "enhancement"),
      source: { file: `${factionName}-网站原始数据.json`, record: index + 1, extraction: "faction-full API; raw fields preserved" },
    };
  });
}
const outputDirectory = path.join(root, "docs", "rules", "detachments");
fs.mkdirSync(outputDirectory, { recursive: true });
for (const [factionId, detachments] of Object.entries(packages)) {
  const output = [
    `/* Generated independent detachment package for ${factionId}. */`,
    "(function (root) {",
    "  const registry = root.WarhammerDetachmentRegistry;",
    "  if (!registry) throw new Error('detachment-registry.js must load before faction detachments');",
    `  registry.register(${JSON.stringify(factionId)}, ${JSON.stringify(detachments, null, 2)});`,
    "})(typeof globalThis === 'undefined' ? this : globalThis);",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(outputDirectory, `${factionId}.js`), output, "utf8");
}
console.log(`Generated ${Object.values(packages).flat().length} website detachments in ${Object.keys(packages).length} independent packages -> ${path.relative(root, outputDirectory)}`);
