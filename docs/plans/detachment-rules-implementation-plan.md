# Detachment Rules Implementation Plan

**Feature:** 11th-edition detachment rules for Adeptus Custodes, Space Marines, and Death Guard

## Goal

Add a faction-neutral detachment package and calculator workflow. Imported rosters preset their detachment and unit enhancements, manual datasheet use defaults to no detachment, and attacker/defender roster instances never share mutable detachment state.

## Acceptance Criteria

1. The three supported factions expose all 44 detachments from the project source files, including their detachment rule, stratagems, enhancements, points, eligibility text, and source traceability.
2. A calculator unit that does not come from an imported roster starts with “no detachment”.
3. Importing a roster detects its detachment from the roster header and maps each `强化：` line to the specific imported unit that owns it.
4. The calculator offers a detachment selector and enhancement selector; imported defaults remain editable.
5. Two Space Marine rosters can each contain the same datasheet name while retaining distinct roster identity, detachment selection, enhancement assignment, and calculator rule selections.
6. Detachment behaviour is selected by stable ID and semantic effect type, never by a Chinese display name.
7. Damage-calculator-relevant effects use the shared effect schema and resolver. Movement, deployment, CP economy, objectives, and other unsupported subsystems remain complete display-only rules instead of approximate calculations.
8. Existing faction/unit/core-weapon behaviour remains green under the full validation suite.
9. Architecture documentation explains how to add another faction’s detachments, how roster isolation works, which rules may enter the calculator, and the required regression gates.

## Architecture

- Add a generated, declarative detachment catalog with stable faction-prefixed IDs. Generation reads the three root `*-detachments.txt` source files and emits browser-loadable data without faction branches in the resolver.
- Extend faction manifests with `detachmentsGlobal` and source metadata. The generic resolver lists, matches, and resolves detachments through the manifest.
- Keep detachment selection on the roster instance for imported units and on the calculator draft for standalone datasheets. Enhancement assignment stays on the concrete roster unit/draft, so mirror matches and duplicate datasheet names cannot collide.
- Reuse the existing rule controls and effect pipeline. A detachment rule, stratagem, or enhancement may declare calculator effects; entries without a safe semantic mapping are still rendered with original text and an explicit display-only status.
- Treat the source text as input evidence, not runtime behaviour. Generated code is the latest rules state; corrections belong in `docs/errata/` and generator overrides rather than runtime patch chains.

## Tech Stack

- Browser JavaScript modules loaded by `docs/index.html`
- Node.js generator and VM-based validation scripts
- Existing `WarhammerFactionRegistry`, `WarhammerRuleResolver`, `WarhammerRuleEffects`, and calculator draft model

## Implementation Tasks

### Task 1: Freeze the detachment data contract

**Files:**
- Create: `tools/lib/parse-detachments.mjs`
- Create: `tools/generate-detachment-rules.mjs`
- Create: `docs/rules/detachments.js`
- Modify: `docs/rules/factions.js`
- Test: `tools/validate-detachments.mjs`

Steps:
1. Write failing assertions for faction counts (10/24/10), globally unique stable IDs, required text fields, and enhancement ownership.
2. Parse every detachment, rule, stratagem, and enhancement from the three source files.
3. Generate the browser catalog and add faction manifest pointers.
4. Re-run generation and assert byte-for-byte idempotence.

### Task 2: Add generic lookup, matching, and resolution

**Files:**
- Modify: `docs/rules/resolver.js`
- Modify: `docs/rules/effect-schema.js`
- Modify: `docs/rules/effects.js`
- Test: `tools/validate-detachments.mjs`

Steps:
1. Write failing tests for lookup by stable ID, roster-header alias matching, no-selection behaviour, and effect isolation.
2. Add generic `detachmentsForFaction`, `matchDetachment`, and `resolveDetachment` APIs.
3. Add only the neutral effect types needed by calculator-relevant detachment rules.
4. Verify the resolver contains no faction or skill-name conditionals.

### Task 3: Preserve roster identity and imported defaults

**Files:**
- Modify: `docs/app.js`
- Test: `tools/validate-detachments.mjs`

Steps:
1. Write failing tests using two same-faction rosters with duplicate unit names and different detachments.
2. Extend roster normalization and parsing with `detachmentId`, source name, and per-unit enhancement ID/name.
3. Key calculator drafts by concrete roster side/unit identity and initialize defaults from that roster only.
4. Confirm standalone datasheets initialize with no detachment.

### Task 4: Add calculator controls and effect composition

**Files:**
- Modify: `docs/app.js`
- Modify: `docs/styles.css`
- Modify: `docs/index.html`
- Test: `tools/validate-detachments.mjs`

Steps:
1. Write failing UI/state assertions for selector options, imported preset, manual switching, enhancement assignment, and mirror-match independence.
2. Render detachment and enhancement controls with source labels.
3. Render full detachment rule/stratagem/enhancement text and existing semantic controls.
4. Merge resolved detachment effects into calculator payloads without duplicating faction or unit effects.
5. Perform browser smoke verification for desktop and narrow widths.

### Task 5: Map safe calculator effects for all three factions

**Files:**
- Modify: `tools/generate-detachment-rules.mjs`
- Modify: `docs/rules/detachments.js`
- Test: `tools/validate-detachments.mjs`

Steps:
1. Add tests for representative passive, conditional, stratagem, and enhancement effects in each faction.
2. Encode only effects whose trigger and scope the current calculator can ask the player to select.
3. Mark unsupported entries display-only while preserving their full text.
4. Audit every mapped effect against its source entry and record corrections separately.

### Task 6: Document extension and run regression gates

**Files:**
- Modify: `docs/项目架构.md`
- Modify: `docs/资料提取.md`
- Modify: `docs/README.md`
- Test: `tools/validate-detachments.mjs`, `tools/validate-rules.mjs`, `tools/validate-architecture.mjs`, `tools/validate-combat.mjs`, `tools/validate-datasheets.mjs`, `tools/validate-40k-app.mjs`

Steps:
1. Document the package boundary, stable-ID rules, generation flow, effect admission rule, roster-instance isolation, and correction workflow.
2. Run every validator and generator-idempotence check.
3. Review the final diff for accidental name-based behaviour or cross-faction branches.
4. Do not stage, commit, or push; the user requested local review before any Git publication step.

## Frontend Verification

Required. Verify imported/default/manual flows, duplicate same-name units from two rosters, selector labelling, rule text readability, and responsive layout. If local browser execution remains blocked by workstation policy, record that limitation and rely on static/UI-state tests until the user’s review environment runs it.
