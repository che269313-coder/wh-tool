import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const app = fs.readFileSync(new URL("../docs/app.js", import.meta.url), "utf8");
const worker = fs.readFileSync(new URL("../worker/pages-proxy.js", import.meta.url), "utf8");

test("chat injects calculator tools into the independent tactical agent instead of estimating", () => {
  const html = fs.readFileSync(new URL("../docs/index.html", import.meta.url), "utf8");
  assert.match(html, /assistant\/corpus\.js/);
  assert.match(html, /assistant\/constitution\.js/);
  assert.match(html, /assistant\/tactical-agent\.js/);
  assert.match(app, /WarhammerTacticalAgent\.create/);
  assert.match(app, /toolDefinitions/);
  assert.match(app, /routeQuestion: \(question, memory\) => window\.WarhammerTacticalCorpus\?\.route\?\.\(question, memory, \(query\) => assistantUnitCandidates\(query\)\.length\)/);
  assert.match(app, /formatToolResult:\s*formatAssistantToolResult/);
  assert.match(app, /async function executeAssistantToolCall/);
  assert.match(app, /simulateScenario\(1000\)/);
  assert.doesNotMatch(app, /function aiAssistantTools\(\)/);
});

test("chat can resolve a named unit to existing roster or catalog data before calculating", () => {
  assert.match(app, /async function resolveAssistantCalculatorEntry/);
  assert.match(app, /ensureFactionRuntimeLoaded/);
  assert.match(app, /calculatorRosterOptions/);
});

test("AI preserves roster joined-unit instances and returns only combat-relevant follow-ups", () => {
  assert.match(app, /function assistantJoinedUnitSummary/);
  assert.match(app, /joinedUnit:\s*assistantJoinedUnitSummary/);
  assert.match(app, /function assistantCombatOptions/);
  assert.match(app, /attackerRosterKey/);
  assert.match(app, /defenderRosterKey/);
  assert.match(app, /assistantCombatOptions\(attacker, state\.attackMode, "attacker"\)/);
  assert.match(app, /assistantCombatOptions\(defender, state\.attackMode, "defender"\)/);
});

test("battle view prioritizes conversation and does not duplicate roster cards", () => {
  const html = fs.readFileSync(new URL("../docs/index.html", import.meta.url), "utf8");
  assert.ok(html.indexOf('class="assistant-card"') < html.indexOf('class="hero-grid"'), "chat should precede result cards");
  assert.doesNotMatch(html, /id="battleRoster"/);
  assert.doesNotMatch(html, /ai-routing-note/);
  assert.doesNotMatch(html, /AI 只负责理解诉求/);
});

test("combat summaries distinguish separate phases and expose calculable option reminders", () => {
  assert.match(app, /function assistantRuleSuggestions/);
  assert.match(app, /availableOptions:/);
  assert.match(app, /各阶段独立结果，不相加/);
  assert.match(app, /按实际条件开启后会重新结算/);
});

test("Worker forwards OpenAI-compatible tool calls to the model", () => {
  assert.match(worker, /tools:\s*Array\.isArray\(body\.tools\)/);
  assert.match(worker, /tool_choice:\s*body\.tool_choice/);
});

test("offline startup does not wait for the optional PDF CDN before local tools load", () => {
  const html = fs.readFileSync(new URL("../docs/index.html", import.meta.url), "utf8");
  assert.doesNotMatch(html, /<script\s+src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/pdf\.js\/[^>]+defer><\/script>/);
  assert.match(app, /async function ensurePdfJsLoaded\(\)/);
  assert.match(app, /await ensurePdfJsLoaded\(\)/);
});
