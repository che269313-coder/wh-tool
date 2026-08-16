/* Apply JSON patch overlays to generated artifacts (P2 patch layer).
 *
 * Usage: node tools/apply-patches.mjs [--faction=<id>] [--dry-run]
 *
 * Reads overrides from data/factions/<id>/package.json, applies each in order to
 * the declared target ("catalog" | "datasheet"), rewrites the artifact and
 * keeps the catalog .js fallback in sync. Missed paths fail the run
 * (0-tolerance adjudication policy). Application is idempotent.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");

function loadDefinitions() {
  const context = vm.createContext({ console });
  context.globalThis = context;
  for (const file of ["docs/rules/faction-registry.js", "docs/rules/factions.js"]) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }
  return context.WarhammerFactionRegistry.list();
}

const pathPattern = /(?:^|\.)([A-Za-z_$][\w$]*|\d+)|\[(\d+)\]|\[([A-Za-z_$][\w$]*)=([^\]]+)\]/g;

function pathTokens(pathExpr) {
  return [...String(pathExpr || "").matchAll(pathPattern)].map((match) => {
    if (match[3] !== undefined) {
      const rawValue = String(match[4] || "").trim();
      const value = rawValue.replace(/^(["'])(.*)\1$/, "$2");
      return { kind: "selector", field: match[3], value };
    }
    return { kind: "key", key: match[1] !== undefined ? match[1] : Number(match[2]) };
  });
}

function selectedIndex(cursor, token) {
  if (!Array.isArray(cursor)) return -1;
  return cursor.findIndex((item) => String(item?.[token.field]) === token.value);
}

export function getByPath(target, pathExpr) {
  let cursor = target;
  const tokens = pathTokens(pathExpr);
  for (const token of tokens) {
    if (cursor == null) return undefined;
    if (token.kind === "selector") {
      const index = selectedIndex(cursor, token);
      if (index < 0) return undefined;
      cursor = cursor[index];
    } else {
      cursor = cursor[token.key];
    }
  }
  return tokens.length ? cursor : undefined;
}

export function setByPath(target, pathExpr, value) {
  const tokens = pathTokens(pathExpr);
  if (!tokens.length) throw new Error("补丁 path 为空：" + pathExpr);
  let cursor = target;
  for (let i = 0; i < tokens.length - 1; i += 1) {
    const token = tokens[i];
    const next = tokens[i + 1];
    if (token.kind === "selector") {
      const index = selectedIndex(cursor, token);
      if (index < 0) throw new Error(`补丁选择器未命中：${token.field}=${token.value}`);
      cursor = cursor[index];
      continue;
    }
    if (cursor[token.key] == null) cursor[token.key] = next.kind === "selector" || typeof next.key === "number" ? [] : {};
    cursor = cursor[token.key];
  }
  const last = tokens[tokens.length - 1];
  if (last.kind === "selector") {
    const index = selectedIndex(cursor, last);
    if (index < 0) throw new Error(`补丁选择器未命中：${last.field}=${last.value}`);
    cursor[index] = value;
  } else {
    cursor[last.key] = value;
  }
  return target;
}

export function syncCatalogScript(rootDir, factionId, data) {
  const jsPath = path.join(rootDir, "docs", "catalogs", factionId + ".js");
  if (!fs.existsSync(jsPath)) return false;
  const source = fs.readFileSync(jsPath, "utf8");
  const regIdx = source.indexOf("registry.register(");
  if (regIdx < 0) throw new Error(factionId + " catalog 脚本缺少 registry.register 调用");
  const openBrace = source.indexOf("{", regIdx);
  let depth = 0;
  let close = -1;
  for (let i = openBrace; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") { depth -= 1; if (depth === 0) { close = i; break; } }
  }
  if (close < 0) throw new Error(factionId + " catalog 脚本无法定位数据对象");
  fs.writeFileSync(jsPath, source.slice(0, openBrace) + JSON.stringify(data) + source.slice(close + 1), "utf8");
  return true;
}

export function syncCalculatorIndex(rootDir, factionId, data) {
  const indexPath = path.join(rootDir, "docs", "calculator-catalog.js");
  if (!fs.existsSync(indexPath)) return false;
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(indexPath, "utf8"), context, { filename: "docs/calculator-catalog.js" });
  const existing = Array.isArray(context.window.WARHAMMER_CALCULATOR_INDEX)
    ? context.window.WARHAMMER_CALCULATOR_INDEX
    : [];
  const definition = loadDefinitions().find((candidate) => candidate.id === factionId);
  const replacement = (data.cards || []).filter((card) => card.name).map((card) => ({
    id: card.id || "",
    factionId,
    faction: data.faction || definition?.name || factionId,
    name: card.name,
    englishName: card.englishName || card.unit?.englishName || "",
    page: card.page ?? null,
  }));
  const first = existing.findIndex((entry) => entry.factionId === factionId);
  const kept = existing.filter((entry) => entry.factionId !== factionId);
  const insertAt = first < 0 ? kept.length : existing.slice(0, first).filter((entry) => entry.factionId !== factionId).length;
  kept.splice(insertAt, 0, ...replacement);
  const output = [
    "// Generated lightweight search index. Full datasheets load per faction.",
    `window.WARHAMMER_CALCULATOR_INDEX = ${JSON.stringify(kept)};`,
    "",
  ].join("\n");
  fs.writeFileSync(indexPath, output, "utf8");
  return true;
}

function loadRulesTarget(rootDir, definition) {
  const context = vm.createContext({ console });
  context.globalThis = context;
  context.WarhammerRuleIdentity = { applyCatalog: (catalog) => catalog };
  let targetPath = "";
  for (const relativePath of definition.runtime?.rules || []) {
    const scriptPath = path.join(rootDir, "docs", relativePath);
    if (!fs.existsSync(scriptPath)) continue;
    vm.runInContext(fs.readFileSync(scriptPath, "utf8"), context, { filename: scriptPath });
    if (context[definition.rulesGlobal]) targetPath = scriptPath;
  }
  return { target: context[definition.rulesGlobal], targetPath };
}

function syncRulesScript(targetPath, definition, data) {
  const identitiesGlobal = String(definition.rulesGlobal || "").replace(/Rules$/, "RuleIdentities");
  const output = [
    "/* Generated rule catalog with adjudicated multi-source overrides. Do not edit by hand. */",
    "(function (root) {",
    `  const catalog = ${JSON.stringify(data, null, 2)};`,
    `  const identities = root[${JSON.stringify(identitiesGlobal)}];`,
    `  root[${JSON.stringify(definition.rulesGlobal)}] = identities?.apply(catalog) || catalog;`,
    "})(typeof globalThis === \"undefined\" ? this : globalThis);",
    "",
  ].join("\n");
  fs.writeFileSync(targetPath, output, "utf8");
}

function replaceCanonicalTerm(target, transform) {
  const aliases = [...new Set(transform.aliases || [])]
    .filter(Boolean)
    .sort((left, right) => right.length - left.length);
  if (!aliases.length || !transform.value) return { replacements: 0, canonicalMatches: 0 };
  const fields = new Set(transform.fields || []);
  const scopeKeys = new Set(transform.scopeKeys || []);
  const escaped = aliases.map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(escaped.join("|"), "giu");
  let replacements = 0;
  let canonicalMatches = 0;
  const visit = (value, inScope = scopeKeys.size === 0) => {
    if (!value || typeof value !== "object") return;
    for (const [key, item] of Object.entries(value)) {
      const childInScope = inScope || scopeKeys.has(key);
      if (typeof item === "string" && childInScope && fields.has(key)) {
        if (item.includes(transform.value)) canonicalMatches += 1;
        if (transform.matchMode === "exact") {
          if (aliases.some((alias) => alias.localeCompare(item, undefined, { sensitivity: "accent" }) === 0)) {
            value[key] = transform.value;
            replacements += 1;
          }
        } else {
          value[key] = item.replace(pattern, () => { replacements += 1; return transform.value; });
        }
      } else if (item && typeof item === "object") visit(item, childInScope);
    }
  };
  visit(target);
  return { replacements, canonicalMatches };
}

export function applyPatches({ rootDir = root, factions = loadDefinitions(), dryRun = false, onlyFaction = "" } = {}) {
  const report = { applied: [], missed: [] };
  const packageDir = path.join(rootDir, "data", "factions");
  if (!fs.existsSync(packageDir)) return report;
  const definitions = new Map(factions.map((definition) => [definition.id, definition]));
  for (const factionId of fs.readdirSync(packageDir).sort()) {
    if (onlyFaction && factionId !== onlyFaction) continue;
    const file = path.join(packageDir, factionId, "package.json");
    if (!fs.existsSync(file)) continue;
    const payload = JSON.parse(fs.readFileSync(file, "utf8"));
    const definition = definitions.get(factionId) || payload.definition;
    if (!definition) { report.missed.push({ factionId, path: "*", reason: "未注册阵营" }); continue; }
    const byTarget = new Map();
    for (const patch of payload.overrides || []) {
      const entries = byTarget.get(patch.target) || [];
      entries.push(patch);
      byTarget.set(patch.target, entries);
    }
    for (const transform of payload.transforms || []) {
      if (!byTarget.has(transform.target)) byTarget.set(transform.target, []);
    }
    for (const [targetName, patches] of byTarget) {
      let targetPath = "";
      let target;
      if (targetName === "catalog") targetPath = path.join(rootDir, "docs", "catalogs", factionId + ".json");
      else if (targetName === "datasheet") targetPath = path.join(rootDir, "docs", definition.data?.catalog || "");
      else if (targetName === "rules") ({ target, targetPath } = loadRulesTarget(rootDir, definition));
      else { report.missed.push({ factionId, path: "*", reason: "未知 target：" + targetName }); continue; }
      if (!targetPath || !fs.existsSync(targetPath)) { report.missed.push({ factionId, path: "*", reason: "目标文件不存在" }); continue; }
      if (!target) target = JSON.parse(fs.readFileSync(targetPath, "utf8"));
      for (const transform of (payload.transforms || []).filter((entry) => entry.target === targetName)) {
        if (transform.kind !== "canonical-term") {
          report.missed.push({ factionId, path: transform.id || "*", reason: "unsupported transform kind" });
          continue;
        }
        const { replacements, canonicalMatches } = replaceCanonicalTerm(target, transform);
        if (!replacements && !canonicalMatches) report.missed.push({ factionId, path: transform.id || "*", reason: "transform matched no fields" });
        else report.applied.push({ factionId, target: targetName, path: `transform:${transform.id}` });
      }
      for (const patch of patches) {
        const found = getByPath(target, patch.path);
        if (found === undefined && patch.op !== "add") { report.missed.push({ factionId, path: patch.path, reason: "路径不存在" }); continue; }
        try {
          setByPath(target, patch.path, patch.value);
          report.applied.push({ factionId, target: targetName, path: patch.path });
        } catch (error) {
          report.missed.push({ factionId, path: patch.path, reason: error.message });
        }
      }
      if (!dryRun) {
        fs.writeFileSync(targetPath, JSON.stringify(target, null, 2) + "\n", "utf8");
        if (targetName === "catalog") {
          syncCatalogScript(rootDir, factionId, target);
          syncCalculatorIndex(rootDir, factionId, target);
        } else if (targetName === "rules") syncRulesScript(targetPath, definition, target);
      }
    }
  }
  return report;
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const onlyFaction = args.find((item) => item.startsWith("--faction="))?.split("=")[1] || "";
  const report = applyPatches({ dryRun, onlyFaction });
  report.applied.forEach((item) => console.log(`APPLIED ${item.factionId}/${item.target} ${item.path}`));
  report.missed.forEach((item) => console.error(`MISSED  ${item.factionId} ${item.path} — ${item.reason}`));
  console.log(`patches: ${report.applied.length} applied, ${report.missed.length} missed${dryRun ? " (dry-run)" : ""}`);
  if (report.missed.length) process.exit(1);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) main();
