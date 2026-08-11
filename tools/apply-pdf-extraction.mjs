/* Apply PDF extraction artifacts to the tracked data pipeline.
 *
 * This script is meant to be run AFTER the in-progress bug-fix work on main
 * has been merged. It is intentionally idempotent: re-running produces the
 * same result. It only touches the files described in the plan:
 *
 *   1. docs/data/<队伍>/<队伍>-结构化数据卡.json      -> unit.defaultEquipment + weapons[].isDefault
 *   2. docs/rules/factions.js                     -> unitAliases（PDF 名 → 规范名）
 *   3. docs/rules/detachments/<factionId>.js       -> aliases（PDF 分遣队名 → 规范名）
 *
 * After running, regenerate catalogs with:
 *   node tools/generate-calculator-catalog.mjs
 *
 * Usage: node tools/apply-pdf-extraction.mjs [--faction=<id>] [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const extractionDir = path.join(root, "docs", "未分类数据卡pdf", "提取结果");

const dryRun = process.argv.includes("--dry-run");
const factionArg = process.argv.find((a) => a.startsWith("--faction="))?.split("=")[1];

// 别名冲突收集：文件内同 key 不同值 / 提取覆盖旧值 / 跨阵营 key 重复。
const aliasConflicts = [];
const seenAliasKeys = new Map();

const factionDirs = {
  necrons: "太空死灵",
  "leagues-of-votann": "沃坦联盟",
  "chaos-knights": "混沌骑士",
  "thousand-sons": "千子",
  "chaos-daemons": "混沌恶魔",
  "agents-of-imperium": "帝国特勤",
  "imperial-knights": "帝国骑士",
  "tau-empire": "钛帝国",
  drukhari: "黑暗灵族",
  aeldari: "艾达灵族",
  orks: "欧克兽人",
  "world-eaters": "吞世者",
  "genestealer-cults": "基因窃取者教派",
  "adepta-sororitas": "修女会",
  "adeptus-mechanicus": "机械修会",
  tyranids: "泰伦虫族",
  "astra-militarum": "星界军",
  "chaos-space-marines": "混沌星际战士",
  "emperors-children": "帝皇之子",
};

const readJson = (file) => {
  let text = fs.readFileSync(file, "utf8");
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  return JSON.parse(text);
};
const writeJson = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");

// 括号配对：从 openIdx 的 `{` 找到配对的 `}` 的绝对下标。
function matchingBrace(source, openIdx) {
  let depth = 0;
  for (let index = openIdx; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    else if (source[index] === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

// 网站阵营的别名存放在 factions.js 的 WarhammerWebsiteUnitAliases 映射中。
// 返回 { open, close, objectClose }：open/close 为该阵营块的花括号绝对下标；
// 若阵营块尚不存在（首次合入），open = -1，objectClose 为映射对象闭合下标。
function locateWebsiteAliasBlock(source, factionId) {
  const decl = source.indexOf("WarhammerWebsiteUnitAliases");
  if (decl < 0) return null;
  const objectOpen = source.indexOf("{", decl);
  const objectClose = matchingBrace(source, objectOpen);
  if (objectClose < 0) return null;
  const body = source.slice(objectOpen + 1, objectClose);
  const keyRe = new RegExp(`"${escapeRe(factionId)}"\\s*:`);
  const keyMatch = body.match(keyRe);
  if (!keyMatch) return { open: -1, close: -1, objectClose };
  const keyIdx = objectOpen + 1 + keyMatch.index;
  const blockOpen = source.indexOf("{", keyIdx);
  if (blockOpen < 0 || blockOpen > objectClose) return { open: -1, close: -1, objectClose };
  const blockClose = matchingBrace(source, blockOpen);
  if (blockClose < 0 || blockClose > objectClose) return { open: -1, close: -1, objectClose };
  return { open: blockOpen, close: blockClose, objectClose };
}

function patchUnitAliases(extraction, factionId) {
  const factionsPath = path.join(root, "docs", "rules", "factions.js");
  let source = fs.readFileSync(factionsPath, "utf8");
  const aliases = extraction.unitAliases || {};
  const entries = Object.entries(aliases);
  if (!entries.length) return 0;
  // Direct packages are registered with `id: "<factionId>"` blocks; website
  // factions share one `unitAliases` template in the `websiteFactions.forEach`
  // loop, so their aliases live in the per-faction map
  // `root.WarhammerWebsiteUnitAliases[factionId]` (initialized above the loop).
  const marker = `id: "${factionId}"`;
  const start = source.indexOf(marker);
  let open;
  let close;
  let block;
  let insertPoint = null;
  if (start >= 0) {
    const blockStart = source.indexOf("unitAliases", start);
    if (blockStart < 0) throw new Error(`factions.js 阵营 ${factionId} 无 unitAliases 块`);
    open = source.indexOf("{", blockStart);
    close = source.indexOf("}", open);
    block = source.slice(open + 1, close);
  } else {
    const located = locateWebsiteAliasBlock(source, factionId);
    if (!located) throw new Error(`factions.js 阵营 ${factionId} 无 unitAliases 块`);
    if (located.open >= 0) {
      open = located.open;
      close = located.close;
      block = source.slice(open + 1, close);
    } else {
      open = -1;
      close = -1;
      block = "";
      insertPoint = located.objectClose;
    }
  }
  const lines = block.split("\n");
  const existing = new Map();
  lines.forEach((line) => {
    const m = line.match(/^\s*("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*"),?\s*$/);
    if (!m) return;
    let key;
    let value;
    try {
      key = JSON.parse(m[1]);
      value = JSON.parse(m[2]);
    } catch {
      return;
    }
    if (existing.has(key) && existing.get(key) !== value) {
      aliasConflicts.push({ factionId, alias: key, oldValue: existing.get(key), newValue: value, source: "文件内重复" });
    }
    existing.set(key, value);
  });
  const additions = entries.filter(([k, v]) => !existing.has(k) || existing.get(k) !== v);
  additions.forEach(([k, v]) => {
    if (existing.has(k) && existing.get(k) !== v) {
      aliasConflicts.push({ factionId, alias: k, oldValue: existing.get(k), newValue: v, source: "提取覆盖旧值" });
    }
    const prior = seenAliasKeys.get(k);
    if (prior && prior.value !== v) {
      aliasConflicts.push({ factionId, alias: k, oldValue: prior.value, newValue: v, source: `跨阵营重复（${prior.factionId} 已有 ${k}→${prior.value}）` });
    }
    seenAliasKeys.set(k, { factionId, value: v });
  });
  if (!additions.length) return 0;
  const pad = lines.find((l) => l.trim().startsWith('"'))?.match(/^\s*/)?.[0] || "    ";
  const extra = additions.map(([k, v]) => `${pad}${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n");
  let updated;
  if (insertPoint == null) {
    updated = source.slice(0, open + 1) + "\n" + extra + source.slice(open + 1);
  } else {
    const prefix = source.slice(0, insertPoint).trimEnd();
    const comma = prefix.endsWith(",") || prefix.endsWith("{") ? "" : ",";
    updated = prefix + comma + `\n    ${JSON.stringify(factionId)}: {\n${extra}\n    },` + source.slice(insertPoint);
  }
  if (!dryRun) fs.writeFileSync(factionsPath, updated, "utf8");
  console.log(`  factions.js ${factionId}: +${additions.length} unitAliases`);
  return additions.length;
}

function patchDetachmentAliases(extraction, factionId) {
  const detPath = path.join(root, "docs", "rules", "detachments", `${factionId}.js`);
  if (!fs.existsSync(detPath)) return 0;
  let source = fs.readFileSync(detPath, "utf8");
  const aliases = extraction.detachmentAliases || {};
  const entries = Object.entries(aliases);
  if (!entries.length) return 0;
  let added = 0;
  for (const [pdfName, canonicalName] of entries) {
    // find detachment block whose name/englishName is canonicalName
    const nameRe = new RegExp(`"name":\\s*"${escapeRe(canonicalName)}"`);
    const match = source.match(nameRe);
    if (!match) {
      console.log(`  !! 分遣队 ${canonicalName} 未在 ${factionId}.js 找到，跳过`);
      continue;
    }
    const blockStart = source.lastIndexOf("{", match.index);
    const blockEnd = matchingBrace(source, blockStart);
    const block = source.slice(blockStart, blockEnd + 1);
    const aliasesIdx = block.indexOf('"aliases"');
    if (aliasesIdx >= 0) {
      const open = block.indexOf("[", aliasesIdx);
      const close = block.indexOf("]", open);
      const arr = block.slice(open + 1, close);
      if (arr.includes(JSON.stringify(pdfName))) continue;
      const absoluteClose = blockStart + close;
      source = source.slice(0, absoluteClose) + (arr.trim() ? ", " : "") + JSON.stringify(pdfName) + source.slice(absoluteClose);
      added += 1;
    } else {
      // insert an aliases array right after the "englishName" field of the detachment
      const eng = block.indexOf('"englishName"');
      const engClose = block.indexOf(",", block.indexOf(":", eng) + 1);
      if (engClose < 0 || engClose > 200) continue;
      const absoluteEngClose = blockStart + engClose;
      source = source.slice(0, absoluteEngClose + 1) + `\n    "aliases": [${JSON.stringify(pdfName)}],` + source.slice(absoluteEngClose + 1);
      added += 1;
    }
  }
  if (added && !dryRun) fs.writeFileSync(detPath, source, "utf8");
  console.log(`  detachments/${factionId}.js: +${added} detachmentAliases`);
  return added;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 从 PDF 默认装备原文解析武器数量：段首数字（或「两」）+ 可选量词视为数量，
// 只保留数量 > 1 的段（数量 1 不需要改写）。段首紧跟人数量词（名/位/员）、
// 名字过长或含叙述性字眼（装备/战士/老兵等）时，视为对"模型"而非"武器"
// 计数，跳过（如「3名老兵装备激光枪、链锯剑」「2个浩劫战士装备浩劫自动炮」）。
const narrativeCountPattern = /装备|携带|分别|其中|战士|士兵|老兵|奴工|成员|其余|其他|幽灵|幽魂|机组|车组|卫兵|警卫|载具|炮手|狙击手/;

function parsePdfWeaponCounts(pdfEquipmentText) {
  const out = [];
  String(pdfEquipmentText || "").split(/[；;，,、]/).forEach((raw, index) => {
    const segment = String(raw || "").trim();
    if (!segment) return;
    let count = 1;
    let name = segment;
    let match = segment.match(/^(\d+)\s*[xX×门个把支套挺枚座]?\s*(?!名|位|员)(.+)$/);
    if (match && match[2].trim()) {
      count = Number(match[1]) || 1;
      name = match[2].trim();
    } else if ((match = segment.match(/^两\s*[xX×门个把支套挺枚座]?\s*(?!名|位|员)(.+)$/)) && match[1].trim()) {
      count = 2;
      name = match[1].trim();
    }
    const normalized = normalizeWeaponName(name);
    if (count > 1 && name && normalized.length >= 2 && normalized.length <= 16 && !narrativeCountPattern.test(name)) {
      out.push({ count, name, index });
    }
  });
  return out;
}

const normalizeWeaponName = (value) => String(value || "")
  .replace(/[\s\u00a0·・,，。:：()（）\[\]【】"“”'"']/g, "")
  .toLowerCase();

const hasCountPrefix = (value) => /^\s*(?:\d+\s*[xX×门个把支套挺枚座]?|两\s*[xX×门个把支套挺枚座]?)\s*/.test(value);

const hasCountSuffix = (value) => /[xX×]\s*\d|\d\s*[xX×]/.test(value);

const sharedCharCount = (left, right) => {
  let shared = 0;
  const seen = new Set();
  for (const char of left) {
    if (!seen.has(char) && right.includes(char)) shared += 1;
    seen.add(char);
  }
  return shared;
};

// 把数量 > 1 的武器在规范名串中改写为「Nx 武器名」。匹配优先级：
// 1) 规范化名字完全一致；2) 双向子串；3) 与 PDF 同位置段落的字符交集
// 相似度（提取通常按位置对齐）；4) 全段字符交集相似度（用于顺序对调，
// 如「暗黑光矛」→「黑暗长矛」）。位置段若已被数量前缀/后缀标记，视为
// 已计数，不再回退匹配（避免给「脉冲步枪×2」再叠加数量）。
function applyDefaultWeaponCounts(canonicalText, pdfCounts) {
  if (!canonicalText || !pdfCounts.length) return canonicalText;
  const tokens = String(canonicalText).split(/([；;，,、])/);
  const segments = tokens.filter((_, index) => index % 2 === 0).map((segment) => segment.trim());
  const separators = tokens.filter((_, index) => index % 2 === 1);
  const originalSegments = segments.slice();
  const used = new Set();
  const charOk = (pdfName, segName) => {
    const shared = sharedCharCount(pdfName, segName);
    return shared >= 2 || (pdfName.length <= 4 && shared >= 1);
  };
  for (const item of pdfCounts) {
    const pdfName = normalizeWeaponName(item.name);
    const positional = item.index < originalSegments.length ? originalSegments[item.index] : "";
    if (positional && (hasCountPrefix(positional) || hasCountSuffix(positional))) continue;
    let best = -1;
    let bestScore = -1;
    for (let index = 0; index < segments.length; index += 1) {
      if (used.has(index)) continue;
      const segment = segments[index];
      if (!segment || hasCountPrefix(segment) || hasCountSuffix(segment)) continue;
      const segName = normalizeWeaponName(segment);
      let score = -1;
      if (segName === pdfName) score = 1e9;
      else if (segName.includes(pdfName) || pdfName.includes(segName)) score = 1e6 + Math.min(segName.length, pdfName.length);
      else if (index === item.index && charOk(pdfName, segName)) score = 1e3 + sharedCharCount(pdfName, segName);
      else if (charOk(pdfName, segName)) score = sharedCharCount(pdfName, segName);
      if (score > bestScore) { bestScore = score; best = index; }
    }
    if (best < 0) continue;
    used.add(best);
    segments[best] = `${item.count}x ${segments[best]}`;
  }
  return segments.map((segment, index) => segment + (separators[index] || "")).join("");
}

function patchDataCards(extraction, factionId) {
  const dirName = factionDirs[factionId];
  if (!dirName) throw new Error(`未知阵营 ${factionId}`);
  const dataDir = path.join(root, "docs", "data", dirName);
  const candidates = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json") && /结构化数据卡|全部数据卡/.test(f));
  const dataFile = candidates.find((f) => f.includes("结构化数据卡")) || candidates[0];
  if (!dataFile) throw new Error(`${dirName} 无数据卡 JSON`);
  const dataPath = path.join(dataDir, dataFile);
  const data = readJson(dataPath);
  const byName = new Map(data.cards.map((c) => [c.name, c]));
  let unitsUpdated = 0;
  let weaponsUpdated = 0;
  const issues = [];
  for (const unit of extraction.units || []) {
    if (!unit.cardName || unit.matchConfidence === "unmatched") continue;
    const card = byName.get(unit.cardName);
    if (!card) {
      issues.push(`数据卡无 ${unit.cardName}（提取自 PDF p${unit.pdfPage} ${unit.pdfName}）`);
      continue;
    }
    if (unit.defaultEquipment) {
      card.unit.defaultEquipment = unit.defaultEquipment;
      // 数据源缺少默认武器数量：从 PDF 原文解析数量（如「2门星镖炮」→ 2），
      // 把数量 > 1 的武器在规范名串中改写为「2x 星镖炮」，供计算页消费。
      const pdfCounts = parsePdfWeaponCounts(unit.pdfDefaultEquipment);
      const counted = applyDefaultWeaponCounts(card.unit.defaultEquipment, pdfCounts);
      if (counted !== card.unit.defaultEquipment) {
        countEnhancedUnits += 1;
        countExamples.push({ factionId, cardName: unit.cardName, before: unit.defaultEquipment, after: counted });
      }
      card.unit.defaultEquipment = counted;
      unitsUpdated += 1;
      const defaults = new Set(unit.isDefaultWeapons || []);
      (card.weapons || []).forEach((w) => {
        const base = String(w.name || "").replace(/[（(].*?[）)]/g, "").trim();
        const shouldDefault = defaults.has(base) || defaults.has(w.name);
        if (w.isDefault !== shouldDefault) {
          w.isDefault = shouldDefault;
          weaponsUpdated += 1;
        }
      });
    } else {
      issues.push(`${unit.cardName} 无默认装备（PDF p${unit.pdfPage} ${unit.pdfName}）`);
    }
  }
  if (!dryRun) writeJson(dataPath, data);
  console.log(`  ${dirName}/${dataFile}: ${unitsUpdated} 单位默认装备，${weaponsUpdated} 武器 isDefault 更新`);
  issues.forEach((i) => console.log(`    !! ${i}`));
  return unitsUpdated;
}

// ---- main ----
const files = fs.readdirSync(extractionDir).filter((f) => f.endsWith(".json")).sort();
if (!files.length) throw new Error(`提取目录为空：${extractionDir}`);

let summary = { factions: 0, units: 0, unitAliases: 0, detachmentAliases: 0 };
let countEnhancedUnits = 0;
const countExamples = [];
const factionStats = [];
for (const file of files) {
  const extraction = readJson(path.join(extractionDir, file));
  const factionId = extraction.factionId;
  if (factionArg && factionId !== factionArg) continue;
  if (!factionDirs[factionId]) {
    console.log(`跳过未知阵营：${factionId}（${file}）`);
    continue;
  }
  console.log(`== ${factionId} (${extraction.faction})`);
  const u = patchDataCards(extraction, factionId);
  const a = patchUnitAliases(extraction, factionId);
  const d = patchDetachmentAliases(extraction, factionId);
  factionStats.push({ factionId, faction: extraction.faction, units: u, unitAliases: a, detachmentAliases: d });
  summary.factions += 1;
  summary.units += u;
  summary.unitAliases += a;
  summary.detachmentAliases += d;
}
if (aliasConflicts.length) {
  console.log(`\n别名冲突 ${aliasConflicts.length} 处（见 docs/issues/别名冲突待审核-2026-08-11.md）：`);
  aliasConflicts.forEach((c) => console.log(`  ${c.factionId} | ${c.alias} | ${c.oldValue} | ${c.newValue} | ${c.source}`));
}
fs.mkdirSync(path.join(root, "docs", "audit"), { recursive: true });
const statsPath = path.join(root, "docs", "audit", `合入统计-${new Date().toISOString().slice(0, 10)}.json`);
fs.writeFileSync(statsPath, JSON.stringify({ dryRun, summary, countEnhancedUnits, countExamples, factionStats, aliasConflicts }, null, 2), "utf8");
console.log(`\n统计已写入 ${path.relative(root, statsPath)}`);
console.log(`\n完成：${summary.factions} 阵营，${summary.units} 单位默认装备（其中 ${countEnhancedUnits} 单位带数量），${summary.unitAliases} unitAliases，${summary.detachmentAliases} detachmentAliases${dryRun ? "（dry-run，未写入）" : ""}`);
console.log("\n下一步：\n  node tools/generate-calculator-catalog.mjs\n  node tools/validate-datasheets.mjs\n  node tools/validate-rules.mjs\n  node tools/validate-detachments.mjs\n  node tools/validate-40k-app.mjs\n  node tools/army-list-aliases.test.mjs");
