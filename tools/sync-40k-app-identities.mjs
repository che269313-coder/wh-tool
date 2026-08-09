import fs from "node:fs";
import path from "node:path";
import { extractDatasheet, extractUnitLinks, identityRows } from "./lib/fortyk-app.mjs";

const factionSlug = process.argv[2];
const outputArg = process.argv[3];
if (!factionSlug) {
  console.error("用法：node tools/sync-40k-app-identities.mjs <faction-slug> [output.json]");
  process.exit(1);
}

const baseUrl = `https://www.40k.app/factions/${factionSlug}`;
const factionResponse = await fetch(baseUrl);
if (!factionResponse.ok) throw new Error(`读取 ${baseUrl} 失败：HTTP ${factionResponse.status}`);
const unitSlugs = extractUnitLinks(await factionResponse.text(), factionSlug);
const units = [];

for (const unitSlug of unitSlugs) {
  const sourceUrl = `${baseUrl}/units/${unitSlug}`;
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    units.push({ slug: unitSlug, sourceUrl, error: `HTTP ${response.status}`, identities: [] });
    continue;
  }
  const datasheet = extractDatasheet(await response.text());
  units.push({
    slug: unitSlug,
    name: datasheet?.name || "",
    sourceUrl,
    identities: datasheet ? identityRows(factionSlug, sourceUrl, datasheet) : [],
    ...(datasheet ? {} : { error: "未在 Next flight 数据中找到 datasheet" }),
  });
}

const outputPath = path.resolve(outputArg || `docs/audit/official-identities-${factionSlug}.json`);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify({ factionId: factionSlug, sourceUrl: baseUrl, units }, null, 2)}\n`, "utf8");
console.log(`已写入 ${outputPath}：${units.length} 个单位，${units.flatMap((unit) => unit.identities).length} 个官方数据卡技能标题。`);
