import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputs = [
  "docs/data/帝皇禁军/帝皇禁军-结构化数据卡.json",
  "docs/data/星际战士/星际战士-全部数据卡.json",
  "docs/data/死亡守卫/死亡守卫-全部数据卡.json",
];
const catalog = inputs.map((file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8")));
const output = [
  "// Generated from the structured datasheet JSON files. Do not edit by hand.",
  "// It lets the calculator work when docs/index.html is opened directly with file://.",
  `window.WARHAMMER_CALCULATOR_CATALOG = ${JSON.stringify(catalog)};`,
  "",
].join("\n");

fs.writeFileSync(path.join(root, "docs/calculator-catalog.js"), output, "utf8");
