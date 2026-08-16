import assert from "node:assert/strict";
import fs from "node:fs";
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

test("rules terminology conflicts must resolve through an executable transform", () => {
  const payload = {
    definition: { id: "orks" },
    sourcePolicy: { rules: ["pdf-10e-zh", "40k11e-backend-zh-hant"], unresolvedConflict: "fail-build" },
    sources: [{ id: "pdf-10e-zh" }, { id: "40k11e-backend-zh-hant" }],
    overrides: [],
    aliases: { units: {} },
    transforms: [{
      id: "orks-rules-waaagh-term",
      target: "rules",
      kind: "canonical-term",
      fields: ["text", "label"],
      aliases: ["瓦戈！", "咻啊！"],
      value: "WAAAGH!",
      source: "pdf-10e-zh",
      rationale: "PDF terminology wins",
    }],
    conflicts: [{
      id: "waaagh-terminology",
      policy: "rules",
      candidates: [
        { source: "pdf-10e-zh", value: "WAAAGH!" },
        { source: "40k11e-backend-zh-hant", value: "瓦戈！/咻啊！" },
      ],
      resolution: { source: "pdf-10e-zh", value: "WAAAGH!", transformIds: ["orks-rules-waaagh-term"] },
    }],
  };
  assert.deepEqual(validatePackageConflicts(payload), []);
  payload.transforms = [];
  assert.ok(validatePackageConflicts(payload).some((message) => message.includes("transform")));
});

test("the supported build regenerates Orks rules before applying adjudication", () => {
  const source = fs.readFileSync(path.join(path.resolve(import.meta.dirname, ".."), "tools", "build-data.mjs"), "utf8");
  const generator = source.indexOf("tools/generate-orks-rules.mjs");
  const patches = source.indexOf("tools/apply-patches.mjs");
  assert.ok(generator >= 0, "build-data must regenerate the Orks rules artifact");
  assert.ok(generator < patches, "raw rules must be generated before PDF adjudication is applied");
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
