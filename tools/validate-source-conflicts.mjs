import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadFactionPackages } from "./source-inputs.mjs";

const sameValue = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const aliasCanonical = (entry) => typeof entry === "string" ? entry : entry?.canonical;

export function validatePackageConflicts(payload) {
  const errors = [];
  const factionId = payload.definition?.id || "unknown";
  const conflicts = Array.isArray(payload.conflicts) ? payload.conflicts : [];
  const conflictIds = new Set();
  const resolvedOverridePaths = new Set();
  const sourceIds = new Set((payload.sources || []).map((source) => source.id));

  for (const conflict of conflicts) {
    const label = `${factionId}/${conflict?.id || "unnamed"}`;
    if (!conflict?.id || conflictIds.has(conflict.id)) errors.push(`${label}: duplicate or missing conflict id`);
    conflictIds.add(conflict?.id);
    const candidates = Array.isArray(conflict?.candidates) ? conflict.candidates : [];
    if (candidates.length < 2) errors.push(`${label}: conflict needs at least two candidates`);
    candidates.forEach((candidate) => {
      if (!sourceIds.has(candidate.source)) errors.push(`${label}: unknown candidate source ${candidate.source}`);
    });

    const resolution = conflict?.resolution;
    if (!resolution) {
      if (payload.sourcePolicy?.unresolvedConflict === "fail-build") errors.push(`${label}: unresolved conflict`);
      continue;
    }
    const winner = candidates.find((candidate) => candidate.source === resolution.source && sameValue(candidate.value, resolution.value));
    if (!winner) errors.push(`${label}: resolution must select one declared candidate value`);

    const policyName = conflict.policy || conflict.field || "displayName";
    const priority = payload.sourcePolicy?.[policyName];
    if (!Array.isArray(priority)) {
      errors.push(`${label}: missing source priority policy ${policyName}`);
    } else {
      const ranked = candidates.map((candidate) => priority.indexOf(candidate.source)).filter((index) => index >= 0);
      const winnerRank = priority.indexOf(resolution.source);
      if (winnerRank < 0 || (ranked.length && winnerRank !== Math.min(...ranked))) {
        errors.push(`${label}: resolution violates ${policyName} source priority`);
      }
    }

    const overridePaths = Array.isArray(resolution.overridePaths) ? resolution.overridePaths : [];
    if (!overridePaths.length) errors.push(`${label}: resolution needs override paths`);
    overridePaths.forEach((overridePath) => {
      const override = (payload.overrides || []).find((entry) => entry.path === overridePath && sameValue(entry.value, resolution.value));
      if (!override) errors.push(`${label}: missing matching override ${overridePath}`);
      resolvedOverridePaths.add(overridePath);
    });
    (resolution.preserveAliases || []).forEach((alias) => {
      const canonical = aliasCanonical(payload.aliases?.units?.[alias]);
      if (!sameValue(canonical, resolution.value)) errors.push(`${label}: losing name must be preserved as alias ${alias}`);
    });
  }

  (payload.overrides || []).forEach((override) => {
    if (/pdf/i.test(String(override.source || "")) && !resolvedOverridePaths.has(override.path)) {
      errors.push(`${factionId}: PDF override is missing from the conflict ledger: ${override.path}`);
    }
  });
  return errors;
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const root = path.resolve(import.meta.dirname, "..");
  const packages = loadFactionPackages(root);
  const errors = packages.flatMap(validatePackageConflicts);
  if (errors.length) {
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }
  const conflictCount = packages.reduce((sum, payload) => sum + (payload.conflicts?.length || 0), 0);
  console.log(`source conflict ledger passed: ${conflictCount} resolved conflicts`);
}
