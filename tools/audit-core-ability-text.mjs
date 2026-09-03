/* 审计门禁：部署到浏览器的规则包中，通用核心技能（source.kind === "core"）不得携带大段规则全文。
 *
 * 背景：目录数据里每个单位都内嵌了《核心规则》全文（深入打击、领袖等），
 * 曾多次出现"修一个漏一片"的回归。此脚本扫描全部已部署规则包，任何超长 core 条目都判失败，
 * 由 build-data.mjs --check 调用，也可以单独运行：
 *
 *   node tools/audit-core-ability-text.mjs
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { auditCoreAbilityText, MAX_CORE_TEXT_LENGTH } from "./lib/core-ability-normalizer.mjs";

const root = path.resolve(import.meta.dirname, "..");

const context = vm.createContext({ console });
context.globalThis = context;
const load = (file) => {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
};

// 运行时前置模块（identity 等），与 tools/validate-rules.mjs 的加载顺序保持一致。
load("docs/rules/identity.js");

const packages = [];
for (const file of fs.readdirSync(path.join(root, "docs", "rules", "factions"))) {
  const factionId = file.replace(/\.js$/, "");
  load(path.join("docs", "rules", "factions", file));
  packages.push([factionId, context[`WarhammerWebsiteRules_${factionId.replaceAll("-", "_")}`]]);
}
// 独立维护的阵营规则包（有 identities 前置依赖的先加载 identities）。
const STANDALONE_PACKAGES = [
  ["custodes", "WarhammerCustodesRules"],
  ["space-marines", "WarhammerSpaceMarineRules"],
  ["death-guard", "WarhammerDeathGuardRules"],
  ["orks", "WarhammerOrksRules"],
];
for (const [factionId, globalName] of STANDALONE_PACKAGES) {
  const identities = `docs/rules/${factionId}-identities.js`;
  if (fs.existsSync(path.join(root, identities))) load(identities);
  load(`docs/rules/${factionId}.js`);
  packages.push([factionId, context[globalName]]);
}

const offenders = [];
for (const [factionId, pkg] of packages) {
  if (!pkg?.unitRules) {
    offenders.push(`${factionId}: 规则包缺失或没有 unitRules`);
    continue;
  }
  for (const message of auditCoreAbilityText(pkg.unitRules)) {
    offenders.push(`${factionId}: ${message}`);
  }
}

if (offenders.length) {
  console.error(`核心技能全文审计失败（阈值 ${MAX_CORE_TEXT_LENGTH} 字），共 ${offenders.length} 条：`);
  for (const message of offenders) console.error(`  - ${message}`);
  process.exit(1);
}
assert.equal(offenders.length, 0, "unreachable");
console.log(`Core ability text audit passed: ${packages.length} rule packages, no long core-rule text.`);
