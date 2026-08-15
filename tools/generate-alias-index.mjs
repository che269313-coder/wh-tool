/* Generate the browser alias bundle from authored faction packages. */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const packagesDir = path.join(root, "data", "factions");
const factionPackages = fs.readdirSync(packagesDir)
  .map((factionId) => path.join(packagesDir, factionId, "package.json"))
  .filter((file) => fs.existsSync(file))
  .map((file) => JSON.parse(fs.readFileSync(file, "utf8")))
  .sort((a, b) => a.order - b.order);

const lines = [
  "/* Generated from data/factions/<id>/package.json and data/global/aliases.json. */",
  "(function (root) {",
  "  const registry = root.WarhammerAliasRegistry;",
  '  if (!registry) throw new Error("alias-registry.js must load before aliases/index.js");',
];
for (const payload of factionPackages) {
  lines.push(`  registry.register(${JSON.stringify({ ...payload.aliases, factionId: payload.definition.id })});`);
}
const globalPayload = JSON.parse(fs.readFileSync(path.join(root, "data", "global", "aliases.json"), "utf8"));
lines.push(`  registry.register(${JSON.stringify({ factionId: "global", ...globalPayload })});`);
lines.push("})(typeof globalThis === 'undefined' ? this : globalThis);", "");

const outputDir = path.join(root, "docs", "aliases");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "index.js"), lines.join("\n"), "utf8");
console.log(`alias index generated: ${factionPackages.length} faction packages + global aliases`);
