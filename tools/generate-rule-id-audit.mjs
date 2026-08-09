import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const context = vm.createContext({});
context.globalThis = context;
for (const file of [
  "identity.js",
  "custodes-identities.js", "custodes.js",
  "space-marines-identities.js", "space-marines.js",
  "death-guard-identities.js", "death-guard.js",
]) {
  vm.runInContext(fs.readFileSync(path.join(root, "docs", "rules", file), "utf8"), context, { filename: file });
}

const allRules = (catalog) => [...(catalog?.factionRules || []), ...Object.values(catalog?.unitRules || {}).flat()];
const factions = [
  ["Adeptus Custodes", "adeptus-custodes", allRules(context.WarhammerCustodesRules)],
  ["Space Marines", "space-marines", allRules(context.WarhammerSpaceMarineRules)],
  ["Death Guard", "death-guard", allRules(context.WarhammerDeathGuardRules)],
];
const pending = factions.flatMap(([, , rules]) => rules.filter((rule) => rule.identity?.matchStatus === "translated-needs-review"));
const lines = [
  "# Rule ID English-name audit",
  "",
  "> Stable IDs use English ability titles. `official` means matched to the cached 40k.app title; `translated` means the site had no confirmed matching entry and the project translation has been accepted.",
  "",
  "| Faction | Total | 40k.app official | Accepted translation | Missing identity | Pending review |",
  "| --- | ---: | ---: | ---: | ---: | ---: |",
  ...factions.map(([name, , rules]) => {
    const count = (status) => rules.filter((rule) => rule.identity?.matchStatus === status).length;
    return `| ${name} | ${rules.length} | ${count("official")} | ${count("translated")} | ${rules.filter((rule) => !rule.identity).length} | ${count("translated-needs-review")} |`;
  }),
  "",
  "## Evidence caches",
  "",
  ...factions.map(([name, factionId]) => `- ${name}: \`docs/audit/official-identities-${factionId}.json\``),
  "",
  "## Pending review",
  "",
  pending.length ? pending.map((rule) => `- \`${rule.id}\`: ${rule.name}`).join("\n") : "None. All current translations were accepted on 2026-08-09.",
  "",
  "Regenerate this report with `node tools/generate-rule-id-audit.mjs` after changing an identity map.",
  "",
];

const output = path.join(root, "docs", "audit", "rule-id-review.md");
fs.writeFileSync(output, lines.join("\n"), "utf8");
console.log(`已写入 ${output}：${factions.reduce((sum, [, , rules]) => sum + rules.length, 0)} 条稳定 ID，${pending.length} 条待复核。`);
