import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { validatePackageConflicts } from "./validate-source-conflicts.mjs";
import { missingSourceEvidence, missingSourceInputs } from "./source-inputs.mjs";

const resolvedPackage = {
  definition: { id: "orks" },
  sourcePolicy: {
    displayName: ["pdf-10e-zh", "40k11e-backend-zh-hant"],
    unresolvedConflict: "fail-build",
  },
  sources: [{ id: "pdf-10e-zh" }, { id: "40k11e-backend-zh-hant" }],
  overrides: [{ target: "catalog", path: "cards[id=boyz].name", value: "小子" }],
  aliases: { units: { "蛮人小子": { canonical: "小子" } } },
  conflicts: [{
    id: "boyz-name",
    field: "displayName",
    candidates: [
      { source: "pdf-10e-zh", value: "小子" },
      { source: "40k11e-backend-zh-hant", value: "蛮人小子" },
    ],
    resolution: {
      source: "pdf-10e-zh",
      value: "小子",
      overridePaths: ["cards[id=boyz].name"],
      preserveAliases: ["蛮人小子"],
    },
  }],
};

test("known multi-source conflicts must have an executable resolution", () => {
  assert.deepEqual(validatePackageConflicts(resolvedPackage), []);
  const unresolved = structuredClone(resolvedPackage);
  delete unresolved.conflicts[0].resolution;
  assert.ok(validatePackageConflicts(unresolved).some((message) => message.includes("unresolved")));
});

test("conflict resolution must follow source priority and match an override", () => {
  const wrongPriority = structuredClone(resolvedPackage);
  wrongPriority.conflicts[0].resolution.source = "40k11e-backend-zh-hant";
  assert.ok(validatePackageConflicts(wrongPriority).some((message) => message.includes("priority")));

  const missingOverride = structuredClone(resolvedPackage);
  missingOverride.conflicts[0].resolution.overridePaths = ["cards[id=boyz].unit.name"];
  assert.ok(validatePackageConflicts(missingOverride).some((message) => message.includes("override")));
});

test("source preflight reports missing ignored inputs with faction ownership", () => {
  const packages = [{ definition: { id: "orks" }, sources: [{ id: "api", inputPath: "missing/catalog.json" }] }];
  assert.deepEqual(missingSourceInputs(path.resolve("."), packages), [{ factionId: "orks", sourceId: "api", inputPath: "missing/catalog.json" }]);
});

test("source preflight also requires adjudication evidence", () => {
  const packages = [{
    definition: { id: "orks" },
    sources: [{ id: "pdf", evidencePath: "missing/original" }],
    overrides: [{ path: "cards[id=boyz].name", source: "sources/pdfs/missing.pdf#page=1" }],
  }];
  assert.deepEqual(missingSourceEvidence(path.resolve("."), packages), [
    { factionId: "orks", sourceId: "pdf", evidencePath: "missing/original" },
    { factionId: "orks", sourceId: "override:cards[id=boyz].name", evidencePath: "sources/pdfs/missing.pdf" },
  ]);
});
