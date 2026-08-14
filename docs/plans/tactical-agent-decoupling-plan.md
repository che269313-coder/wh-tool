# Tactical Agent Decoupling Implementation Plan

**Feature:** Tactical Agent module
**Goal:** Let natural-language tactical questions use an independent agent layer with persistent local conversation memory, while the existing calculator remains the only component that produces numeric combat results.
**Acceptance Criteria:**

- The agent constitution, tool orchestration, examples, and memory live outside `docs/app.js`.
- A question such as “瘟疫战士远程攻击图拉真” is routed to the calculator tool with `ranged`, never estimated by the model.
- The last conversation turns and the latest calculated scenario persist locally and are included in later turns.
- The calculator remains an injected tool adapter; `engine.js` and combat payload contracts remain unchanged.

**Architecture:** `constitution.js` owns stable behavior rules and few-shot examples. `tactical-agent.js` owns model requests, tool-call rounds, and bounded browser-local memory. `app.js` supplies an adapter for data-card lookup and calculator execution, keeping all calculator state changes on the existing UI boundary.
**Tech Stack:** Browser JavaScript, `localStorage`, OpenAI-compatible tool calls, Node test runner.
**前端验证:** Yes — static browser load check plus scripted agent contract tests.

---

### Task 1: Specify the agent contract

**Files:**

- Create: `tools/tactical-agent.test.mjs`
- Create: `docs/assistant/constitution.js`
- Create: `docs/assistant/tactical-agent.js`

**Step 1:** Write a failing test covering module exports, bounded memory, a calculator tool exchange, and remembered scenario state.

**Step 2:** Implement the constitution and generic agent runtime without calculator-specific imports.

**Step 3:** Run `node --test tools/tactical-agent.test.mjs` and verify it passes.

### Task 2: Connect the existing UI through an adapter

**Files:**

- Modify: `docs/app.js`
- Modify: `docs/index.html`
- Modify: `tools/ai-tool-orchestration.test.mjs`

**Step 1:** Write a failing architecture assertion requiring the UI to create the agent and hand it injected tools.

**Step 2:** Replace inline model/tool-loop code with the agent API; retain the current calculator lookup and simulation functions as adapter handlers.

**Step 3:** Run focused tests and syntax checks.

### Task 3: Document the extension boundary

**Files:**

- Create: `docs/assistant/README.md`
- Create: `docs/assistant/corpus/common-scenarios.md`
- Modify: `README.md`

**Step 1:** Document where new rules, examples, tool contracts, and memory migrations belong.

**Step 2:** Add the Plague Marines versus Trajann example without asserting a hard-coded combat result.

**Step 3:** Run the full test suite and architecture validators.
