import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputs = [
  "docs/data/帝皇禁军/帝皇禁军-结构化数据卡.json",
  "docs/data/星际战士/星际战士-全部数据卡.json",
  "docs/data/死亡守卫/死亡守卫-全部数据卡.json",
];
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

const sourceMarkdown = new Map([
  ["帝皇禁军", "docs/data/帝皇禁军/数据卡-OCR-可检索.md"],
  ["星际战士", "docs/data/星际战士/数据卡-可检索.md"],
  ["死亡守卫", "docs/data/死亡守卫/死亡守卫-数据卡-可检索.md"],
]);
const catalog = inputs.map((file) => {
  const data = JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
  const faction = data.faction || (file.includes("帝皇禁军") ? "帝皇禁军" : file.includes("死亡守卫") ? "死亡守卫" : "星际战士");
  const markdownPath = sourceMarkdown.get(faction);
  const markdown = markdownPath ? fs.readFileSync(path.join(root, markdownPath), "utf8") : "";
  return { ...data, cards: (data.cards || []).map((card) => {
    const extracted = keywordRows(markdown, card.page);
    return { ...card, factionKeywords: card.factionKeywords?.length ? card.factionKeywords : (extracted.factionKeywords.length ? extracted.factionKeywords : [faction]), keywords: card.keywords?.length ? card.keywords : extracted.keywords };
  }) };
});
const output = [
  "// Generated from the structured datasheet JSON files. Do not edit by hand.",
  "// It lets the calculator work when docs/index.html is opened directly with file://.",
  `window.WARHAMMER_CALCULATOR_CATALOG = ${JSON.stringify(catalog)};`,
  "",
].join("\n");

fs.writeFileSync(path.join(root, "docs/calculator-catalog.js"), output, "utf8");
