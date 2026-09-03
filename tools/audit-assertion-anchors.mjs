/* 元门禁：断言锚点审计。
 *
 * 显示名会随 PDF 卡面名裁决更新（欧克兽人改名事件，见 repair-logs/），
 * 校验/测试断言必须锚定稳定身份（规则 id 或 englishName），不得把中文显示名当查找输入。
 * 本脚本静态扫描 tools/ 下的断言代码，发现以下模式即失败：
 *
 *   1. 对象["中文名"]                       —— 按显示名索引规则目录
 *   2. resolveUnit/rulesForUnit/resolveFaction/resolve(..., "中文名", ...) —— 第2参数按显示名解析
 *   3. unitName: "中文名"                   —— 按显示名传入战斗上下文
 *   4. .find(... .name === "中文名")        —— 按技能显示名查找规则
 *
 * 豁免方式：
 *   - 行内注释 `// display-name-anchor: <原因>`：显示名是被测对象（别名/裁决测试）或合成夹具；
 *   - ALLOWED_FILES：别名表/夹具测试文件，显示名即测试契约（如 alias-registry.test.mjs）。
 *
 * 单独运行：node tools/audit-assertion-anchors.mjs
 */

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const toolsDir = path.join(root, "tools");
const SELF = "audit-assertion-anchors.mjs";

// 别名表与夹具测试文件：中文显示名就是被测契约本身，整文件豁免。
const ALLOWED_FILES = new Set([
  "alias-registry.test.mjs",
  "pdf-priority.test.mjs",
  "apply-patches.test.mjs",
  "reroll-plan.test.mjs",
  "army-list-aliases.test.mjs",
  "tactical-agent.test.mjs",
  "data-packages.test.mjs",
  "source-contract.test.mjs",
  "validate-combat.mjs",
  "validate-datasheets.mjs",
]);

const MARKER = "display-name-anchor";
const hasCJK = (text) => /[\u4e00-\u9fff]/.test(text || "");

const patterns = [
  { name: "按显示名索引规则目录", regex: /([\w$\])])\s*\[\s*"([^"]*)"\s*\]/g, check: (m) => hasCJK(m[2]) },
  {
    name: "resolver 第2参数为显示名",
    regex: /\b(?:resolveUnit|rulesForUnit|resolveFaction|(?<!Dictionary\.)resolve)\s*\(([^)]*)/g,
    check: (m) => {
      const args = m[1].split(",");
      return args.length > 1 && hasCJK(args[1]);
    },
  },
  { name: "unitName 传入显示名", regex: /unitName:\s*"([^"]*)"/g, check: (m) => hasCJK(m[1]) },
  { name: "按技能显示名 find", regex: /\.name\s*===?\s*"([^"]*)"/g, requireFind: true, check: (m) => hasCJK(m[1]) },
];

const offenders = [];
for (const file of fs.readdirSync(toolsDir)) {
  if (!file.endsWith(".mjs") || file === SELF) continue;
  const filePath = path.join(toolsDir, file);
  const relative = path.relative(root, filePath);
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
    if (line.includes(MARKER)) return;
    if (ALLOWED_FILES.has(file)) return;
    for (const { name, regex, requireFind, check } of patterns) {
      if (requireFind && !/\.find\s*\(/.test(line)) continue;
      for (const match of line.matchAll(regex)) {
        if (!check(match)) continue;
        offenders.push(`${relative}:${index + 1} [${name}] ${trimmed.slice(0, 120)}`);
        break;
      }
    }
  });
}

if (offenders.length) {
  console.error(`断言锚点审计失败：发现 ${offenders.length} 处按中文显示名锚定的断言。`);
  console.error("请改为锚定规则 id / source.englishName；若显示名本身是被测对象，请加行内注释 `// display-name-anchor: 原因`。");
  for (const offender of offenders) console.error(`  - ${offender}`);
  process.exit(1);
}
console.log("Assertion anchor audit passed: no display-name-keyed lookups in validator/test code.");
