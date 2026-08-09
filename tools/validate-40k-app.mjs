import { extractDatasheet, extractUnitLinks, identityRows } from "./lib/fortyk-app.mjs";

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const datasheet = {
  slug: "aleya",
  name: "Aleya",
  abilities: [
    { name: "Leader", abilityType: "core" },
    { name: "Tenacious Spirit", abilityType: "datasheet" },
    { name: "Daughter of the Abyss", abilityType: "datasheet" },
  ],
};
const flightChunk = `19:[["$","component",null,{"datasheet":${JSON.stringify(datasheet)}}]]`;
const html = `<script>self.__next_f.push(${JSON.stringify([1, flightChunk])})</script>`;
const extracted = extractDatasheet(html);
assert(extracted?.slug === "aleya" && extracted.abilities.length === 3, "必须从 Next flight HTML 提取结构化 datasheet");

const factionHtml = '<a href="/factions/adeptus-custodes/units/aleya">Aleya</a><a href="/factions/adeptus-custodes/units/vigilators">Vigilators</a><a href="/factions/space-marines/units/captain">Captain</a>';
const links = extractUnitLinks(factionHtml, "adeptus-custodes");
assert(JSON.stringify(links) === JSON.stringify(["aleya", "vigilators"]), "阵营同步只能收集本阵营单位链接并去重");

const rows = identityRows("adeptus-custodes", "https://www.40k.app/factions/adeptus-custodes/units/aleya", extracted);
assert(rows[0].id === "adeptus-custodes.aleya.tenacious-spirit", "官方技能标题必须生成稳定语义 ID");
assert(rows.every((row) => row.matchStatus === "official" && row.sourceUrl.endsWith("/aleya")), "官方映射必须记录状态和来源 URL");
assert(!rows.some((row) => row.englishName === "Leader"), "核心技能不得重复当作数据卡专属技能 ID");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("40k.app 英文身份提取校验通过：单位链接、结构化技能与稳定 ID 均符合预期。");
}
