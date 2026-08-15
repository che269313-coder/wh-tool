import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function missingSourceInputs(root, packages) {
  return packages.flatMap((payload) => (payload.sources || [])
    .filter((source) => source.inputPath && !fs.existsSync(path.join(root, source.inputPath)))
    .map((source) => ({
      factionId: payload.definition?.id || "unknown",
      sourceId: source.id || "unknown",
      inputPath: source.inputPath,
    })));
}

const evidenceFilename = (value) => String(value || "").split("#", 1)[0];

export function missingSourceEvidence(root, packages) {
  const references = packages.flatMap((payload) => {
    const factionId = payload.definition?.id || "unknown";
    const declared = (payload.sources || [])
      .filter((source) => source.evidencePath)
      .map((source) => ({ factionId, sourceId: source.id || "unknown", evidencePath: evidenceFilename(source.evidencePath) }));
    const overrides = (payload.overrides || [])
      .filter((override) => /^sources[\\/]/i.test(String(override.source || "")))
      .map((override) => ({ factionId, sourceId: `override:${override.path || "unknown"}`, evidencePath: evidenceFilename(override.source) }));
    return [...declared, ...overrides];
  });
  return references.filter((entry) => !fs.existsSync(path.join(root, entry.evidencePath)));
}

export function loadFactionPackages(root) {
  const packagesDir = path.join(root, "data", "factions");
  return fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packagesDir, entry.name, "package.json"))
    .filter(fs.existsSync)
    .map((filename) => JSON.parse(fs.readFileSync(filename, "utf8")));
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const root = path.resolve(import.meta.dirname, "..");
  const packages = loadFactionPackages(root);
  const missing = missingSourceInputs(root, packages);
  const missingEvidence = missingSourceEvidence(root, packages);
  if (missing.length || missingEvidence.length) {
    console.error("Faction source inputs are not hydrated; generated deploy artifacts remain usable, but rebuild is blocked:");
    missing.forEach((entry) => console.error(`- ${entry.factionId}/${entry.sourceId}: ${entry.inputPath}`));
    missingEvidence.forEach((entry) => console.error(`- ${entry.factionId}/${entry.sourceId}: ${entry.evidencePath}`));
    console.error("Restore the private source snapshot under docs/data/ and sources/pdfs/ before running the rebuild pipeline.");
    process.exit(1);
  }
  console.log(`source preflight passed: ${packages.length} faction packages`);
}
