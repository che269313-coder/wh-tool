import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const readJson = (relative) => JSON.parse(fs.readFileSync(new URL(relative, root), "utf8").replace(/^\ufeff/, ""));

const factions = [
  "灰骑士", "修女会", "星界军", "帝国骑士", "机械修会", "帝国特勤", "混沌星际战士", "千子",
  "吞世者", "混沌恶魔", "混沌骑士", "艾达灵族", "黑暗灵族", "泰伦虫族", "太空死灵", "钛帝国",
  "基因窃取者教派", "沃坦联盟", "帝皇之子",
];

test("generated website datasheets do not classify wargear as abilities", () => {
  for (const faction of factions) {
    const data = readJson(`docs/data/${faction}/${faction}-结构化数据卡.json`);
    for (const card of data.cards || []) {
      assert.equal(card.abilities?.some((ability) => ability.category === "wargear"), false, `${faction} ${card.name}`);
      assert.doesNotMatch(String(card.unit?.abilities || ""), /(?:^|；)装备选项(?:；|$)/, `${faction} ${card.name}`);
    }
  }
});

test("multi-profile compositions account for every default model", () => {
  for (const faction of factions) {
    const raw = readJson(`docs/data/${faction}/${faction}-网站原始数据-简体.json`);
    const structured = readJson(`docs/data/${faction}/${faction}-结构化数据卡.json`);
    raw.units.forEach((entry, index) => {
      const composition = entry.compositions?.find((item) => item.is_default) || entry.compositions?.[0];
      if (!composition || (composition.models || []).length < 2) return;
      const minimumModels = composition.models.reduce((sum, model) => sum + Number(model.min || 0), 0);
      const profiles = structured.cards[index]?.modelProfiles || [];
      const fixedCount = profiles.reduce((sum, profile) => sum + Number(profile.count || 0), 0);
      assert.ok(profiles.some((profile) => profile.remaining) || fixedCount >= minimumModels, `${faction} ${structured.cards[index]?.name} only accounts for ${fixedCount}/${minimumModels} models`);
    });
  }
});

test("Ork Boyz assign Boss Nob as champion and Boyz as the remaining models", () => {
  const data = readJson("docs/data/欧克兽人/欧克兽人-全部数据卡.json");
  const card = data.cards.find((candidate) => candidate.englishName === "Boyz");
  assert.equal(card.modelProfiles.find((profile) => profile.id === "champion")?.englishName, "Boss Nob");
  assert.equal(card.modelProfiles.find((profile) => profile.id === "champion")?.count, 1);
  assert.equal(card.modelProfiles.find((profile) => profile.remaining)?.englishName, "Boy");
});
