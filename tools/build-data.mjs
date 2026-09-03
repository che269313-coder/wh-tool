/* The only supported build entry for multi-source faction data. */
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const node = process.execPath;
const stages = [
  ["preflight private source inputs", "tools/source-inputs.mjs"],
  ["validate source conflict ledger", "tools/validate-source-conflicts.mjs"],
  ["generate runtime faction registry", "tools/generate-faction-registry.mjs"],
  ["generate browser alias index", "tools/generate-alias-index.mjs"],
  ["generate normalized calculator catalogs", "tools/generate-calculator-catalog.mjs"],
  ["generate PDF-adjudicated website rules", "tools/generate-website-rules.mjs"],
  ["derive model-profile weapon sets", "tools/apply-weaponnames.mjs"],
  ["regenerate Orks rules", "tools/generate-orks-rules.mjs"],
  ["apply adjudicated source overrides", "tools/apply-patches.mjs"],
  ["generate content-addressed deploy version", "tools/generate-build-version.mjs"],
];
if (process.argv.includes("--check")) {
  stages.push(
    ["validate data packages", "--test", "tools/data-packages.test.mjs", "tools/alias-registry.test.mjs", "tools/apply-patches.test.mjs", "tools/audit-regressions.test.mjs", "tools/pdf-priority.test.mjs", "tools/core-ability-normalizer.test.mjs"],
    ["validate datasheets", "tools/validate-datasheets.mjs"],
    ["audit core ability text", "tools/audit-core-ability-text.mjs"],
    ["validate architecture", "tools/validate-architecture.mjs"],
  );
}

for (const [label, ...args] of stages) {
  console.log(`\n== ${label} ==`);
  const result = spawnSync(node, args, { cwd: root, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}
console.log("\nData build completed.");
