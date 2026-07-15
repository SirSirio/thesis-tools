---
phase: 06-system-architecture-explorer-promote-the-electronics-archite
verified: 2026-07-15T18:30:00Z
status: passed
human_verification_resolved: 2026-07-15T15:45:00Z
score: 8/8 must-haves verified; both human-verification items resolved (see 06-HUMAN-UAT.md)
overrides_applied: 0
human_verification:
  - test: "Physically inspect the owned bitbyg ILI9341 3.2\" module's silkscreen/header labels to resolve the SPI-vs-8-bit-parallel vendor-page contradiction (Open Question #1 in SPEC.md)."
    expected: "If SPI confirmed: flip `interfaceConf` from 'Low' to 'High' in tools/system-architecture-explorer/index.html (comment sits directly above the SCREEN_PINS declaration, ~line 490). If 8-bit parallel confirmed: flip `interfaceMode` default to 'parallel' AND `interfaceConf` to 'High'. Re-check in the running tool which variants flip OVERRUN state, and update SPEC.md's Open Question #1 status."
    why_human: "Requires physically reading labels on a real, owned circuit board (bitbyg ILI9341); no codebase artifact can resolve this. This is the ARCH-07 requirement's explicit 'end-of-phase human-check' clause (D-09), correctly deferred rather than blocking — the tool ships both scenarios with the ambiguity visibly labelled Low-confidence/unverified in the UI."
  - test: "Open tools/system-architecture-explorer/index.html in a browser: (1) edit a component price (both € and DKK fields, including a decimal like 3.5), reload the page, confirm the edit persisted; (2) click Reset, confirm DEFAULTS restored and a subsequent reload shows DEFAULTS; (3) click a matrix row, confirm the diagram redraws and the row highlights; (4) exercise the three filters (max price, max complexity, concurrency) and the shared-block toggle; (5) check the page at ~700px and 375px viewport widths for horizontal scroll inside the table cards."
    expected: "Price edits (including in-progress decimal typing) survive reload; Reset clears storage and restores DEFAULTS; row click redraws the diagram and highlights the row; filters/sort/toggle all work; no horizontal scroll at the tested widths (or table cards scroll internally without the page itself scrolling, per code-review IN-10's borderline finding)."
    why_human: "Browser DOM behaviour, localStorage round-trip across an actual reload, and visual/viewport rendering cannot be verified by static grep or a Node vm harness. WR-01/WR-04/WR-05 (input-rewrite loop, DOM/state desync, negative-value clamping) were all found and fixed by code review via manual reasoning, not automated tests, and deserve one live click-through pass before shipping."
---

# Phase 6: System Architecture Explorer Verification Report

**Phase Goal:** Promote the electronics/communication architecture cost-and-complexity matrix — built ad-hoc at `prototypes/System-Architecture/index.html` — into a first-class, integrated tool at `tools/system-architecture-explorer/`, so the device's control-architecture decision (which MCU, which stepper driver, which bus, at what cost and complexity) can be explored interactively like every other design decision on the site.
**Verified:** 2026-07-15T18:30:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Tool lives at `tools/system-architecture-explorer/index.html` with co-located `SPEC.md`, dark-glass theme, `← All tools` nav bar (ARCH-01) | ✓ VERIFIED | File exists (902 lines); `<link rel="stylesheet" href="../../assets/style.css" />` present; nav bar `<a href="../../index.html">← All tools</a>` at line 164; local `:root{--ok;--warn;--blue}` block contains only tool-specific status colours, `grep -Ec -- '--(card\|line\|txt\|mut\|acc\|red)\b'` returns 0 (no shared-token shadowing) |
| 2 | Tool reachable from landing page, README, repo-root ROADMAP (ARCH-02) | ✓ VERIFIED | `index.html:330` `.tool-card` with `href="tools/system-architecture-explorer/index.html"`, i18n keys `card-title-sysarch`/`card-desc-sysarch` present in both EN (line 451-452) and IT (line 490-491) dictionaries; `README.md:19` tool-table row ends `✅ Live`; repo-root `ROADMAP.md:18` Shipped row present |
| 3 | Tool retains all prior behaviour (editable BOM, DKK↔EUR, sort/filter, BOM expand, shared-block toggle) AND gains the live variant-driven SVG diagram with row-click selection (ARCH-03) | ✓ VERIFIED | `renderMatrix()`/`renderComps()`/`bomHtml()`/sort-header listeners/`fShared`/`fPrice`/`fCx`/`fCon` all present and wired (index.html:751-897); `buildDiagram(v)` + `selectVariant(v)` + row click handler present; Node vm harness built all 19 variants' diagrams with 0 errors, topology class distribution 10 fused / 4 satellite / 2 distributed / 3 printer (sums to 19, matches 06-06-SUMMARY's claim exactly) |
| 4 | `prototypes/System-Architecture/` retains the three decision records, cross-linked both ways, no orphaned `index.html` (ARCH-04) | ✓ VERIFIED | `prototypes/System-Architecture/index.html` does not exist; `ARCHITECTURE.md`, `PUMP-CONTROL-CONCEPTS.md`, `SOLUTION-MATRIX.md` present; repo-wide grep for `System-Architecture/index.html` finds only historical mentions in `.planning/` docs (expected — planning artifacts describe the pre-move state) and zero live `.md`/`.html` references; all three records' links repointed to `../../tools/system-architecture-explorer/index.html#matrix\|#theory\|#diagram`; `PROTOTYPES.md:44` cross-links the study back to the tool |
| 5 | `SPEC.md` documents component price table, variant BOMs, three comms layers, pin-budget model, power/PSU model, cost-model assumptions with confidence tags (ARCH-05) | ✓ VERIFIED | `tools/system-architecture-explorer/SPEC.md` (371 lines) contains all named sections: price table with source/confidence columns, 19-row variant BOM table, "The three comms layers" section, pin-budget model with `pinsOf(v)` formula/`SCREEN_PINS`/`BUS_PINS`/`pinsC` tables, power/PSU model, cost-model assumptions, confidence-tag legend, open questions, persistence, cross-links |
| 6 | `CLAUDE.md` folder structure updated; logic/styles remain inline; no new shared files (ARCH-06) | ✓ VERIFIED | `CLAUDE.md:48-50` lists `tools/system-architecture-explorer/` (index.html + SPEC.md); `CLAUDE.md:67-70` shows `prototypes/System-Architecture/` with only the three `.md` records; `git log --stat` across the phase's commit range (`c2c7fcc..9d6b534`) shows zero touches to `assets/style.css`, `assets/deck.css`, `assets/deck.js` |
| 7 | Pin-budget model computes pins-used/available/free per variant across Layer A+B+C with confidence-flagged overruns; owned screen's SPI-vs-parallel interface resolved via end-of-phase human-check, SPI/Low default until then (ARCH-07) | ✓ VERIFIED (data model) / pending human-check (expected) | `pinsOf(v)` exists and was independently exercised via a Node vm harness: SPI scenario gives T9-fused-i2c 1 free, P6-rp-i2c 5 free, S1-i2c OVERRUN(-3), ESPINT-fused-i2c 3 free, ESPINT-dumb-i2c OVERRUN(-1); switching to parallel flips T9-fused-i2c to OVERRUN(-4) and lands P6-rp-i2c exactly at 0 free — matches 06-05-SUMMARY's claimed numbers exactly. `interfaceMode` defaults to `'spi'`, `interfaceConf` defaults to `'Low'`, both visibly labelled "unverified" in the UI (index.html:305,307). Physical inspection is an explicitly-deferred end-of-phase human-check per the requirement text itself, not a gap — routed to Human Verification below |
| 8 | ESP32-integrated-screen board(s) added as candidate variant(s); brain candidates record RAM/PSRAM/usable-GPIO with UI-fluidity note; per-component source field + confidence tag (ARCH-08) | ✓ VERIFIED | `espscreen` DEFAULTS entry (ESP32-2432S024, 9 usable IO, High confidence) plus two VARIANTS rows (`ESPINT-fused-i2c` fits, `ESPINT-dumb-i2c` overruns — both shown per D-11 honesty); all 6 brain-class DEFAULTS entries carry `gpioUsable`/`ram`/`psram`/`uiNote`; `sourceCellContent()` builds Source/Confidence cells via `createElement`+`textContent` only (never raw `innerHTML` interpolation of user-typed text), confirmed by code review (VERIFIED SAFE, 06-REVIEW.md) |

**Score:** 8/8 truths verified at the codebase level (all automatable scope). 2 items carry an explicitly-scoped, pre-planned human-verification component (screen physical inspection; browser click-through) that does not block the phase per `workflow.human_verify_mode: end-of-phase` but must still be surfaced, not silently marked passed.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `tools/system-architecture-explorer/index.html` | Promoted, reskinned, persistent, two-part, live-diagram tool | ✓ VERIFIED | 902 lines; `node --check` passes on extracted script; Node vm harness ran the full engine (DEFAULTS/VARIANTS/costOf/pinsOf/buildDiagram) with zero runtime errors across all 19 variants |
| `tools/system-architecture-explorer/SPEC.md` | Canonical spec: prices, BOMs, comms layers, pin-budget, power model, assumptions | ✓ VERIFIED | 371 lines, all required sections present, cross-checked line-by-line against shipped DEFAULTS/VARIANTS |
| `prototypes/System-Architecture/index.html` | DELETED after move | ✓ VERIFIED DELETED | File does not exist |
| `prototypes/System-Architecture/{ARCHITECTURE,PUMP-CONTROL-CONCEPTS,SOLUTION-MATRIX}.md` | Retained, trimmed to pointers, repointed links | ✓ VERIFIED | All three files present; repointed `../../tools/system-architecture-explorer/index.html#anchor` links confirmed via grep; SOLUTION-MATRIX.md carries the D-08 "reference view" preface blockquote (lines 19-22) |
| `index.html` (landing page) | New tool card | ✓ VERIFIED | `.tool-card` at line 330, bilingual i18n keys present |
| `README.md` / repo-root `ROADMAP.md` | Tool table row / Shipped row | ✓ VERIFIED | Both present and descriptive of the shipped 19-variant/pin-budget/diagram feature set |
| `CLAUDE.md` | Updated folder tree | ✓ VERIFIED | Both the new tool entry and the trimmed `prototypes/System-Architecture/` entry present |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `tools/system-architecture-explorer/index.html` | `assets/style.css` | `<link rel="stylesheet" href="../../assets/style.css">` | WIRED | Confirmed present at line 7; token usage (`var(--accent)`, `var(--glass-bg)`, etc.) throughout the inline `<style>` block |
| `tools/system-architecture-explorer/index.html` | `localStorage` (`sae-prices`/`sae-rate`) | `loadPersisted()`/`persist()` try/catch | WIRED | Both functions present (lines 678-697); `loadPersisted()` called before first render; `persist()` called from price/rate input handlers and the reset handler clears both keys |
| `prototypes/System-Architecture/*.md` | `tools/system-architecture-explorer/index.html#{matrix,theory,diagram}` | Markdown links | WIRED | All checked link targets resolve; anchors `id="matrix"` (:272), `id="theory"` (:199), `id="diagram"` (:378) all exist in the tool |
| Matrix row click | `#diagram` redraw + row highlight + BOM expand | `selectVariant(v)`/`highlightRow(v.id)`/`det.classList.toggle` | WIRED | Confirmed via code read (lines 815-836) and a full DOM-click simulation reported in 06-06-SUMMARY (independently spot-checked: `buildDiagram()` runs error-free for all 19 variants via vm harness) |
| Price/DKK/rate inputs | `COMP[k].eur` / `rate` state → `renderMatrix()`/`persist()` | `input` event listeners | WIRED | Confirmed present; WR-01 (rewrite-loop) and WR-05 (negative-value clamp) fixes both present in the current file (verified by direct code read, not just review claim) |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|---------------------|--------|
| Solution matrix (`#matrixBody`) | `VARIANTS` (19 entries) × `costOf(v)` | In-file `DEFAULTS`/`VARIANTS`/`SHARED_BOM` constants, live-computed | Yes — independently re-executed via Node vm harness, real per-variant costs/complexity/pin numbers, not static/empty placeholders | ✓ FLOWING |
| Pin-budget column (`Pins free`) | `pinsOf(v)` | `SCREEN_PINS`/`BUS_PINS`/`v.pinsC`/brain `gpioUsable` | Yes — harness confirms scenario-dependent, non-trivial output (verified exact match to 06-05-SUMMARY's numeric claims: T9-fused-i2c 1→OVERRUN, P6-rp-i2c 5→0 across the SPI/parallel toggle) | ✓ FLOWING |
| Live SVG diagram (`#diagram`) | `buildDiagram(v)` via `selectVariant(v)` | `topoClassOf(v)` derived from `v.bom` keys | Yes — harness built all 19 diagrams (10/4/2/3 class split) with zero runtime errors; not a static placeholder SVG | ✓ FLOWING |
| Component price table (`#compBody`) | `COMP` (mutable copy of `DEFAULTS`) + `loadPersisted()` | localStorage `sae-prices`/`sae-rate`, validated with `Number.isFinite` guards | Yes — restore path code-traced; guard logic matches load-time vs. live-input symmetry after the WR-05 fix | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Inline script has valid JS syntax | `node --check` on extracted `<script>` body | Exits 0 | ✓ PASS |
| `VARIANTS.length === 19` (matches all docs/UI copy) | Node vm harness, `VARIANTS.length` | `19` | ✓ PASS |
| `pinsOf(v)` produces scenario-dependent, non-hollow output | Node vm harness across 5 representative variants, both scenarios | Matches 06-05-SUMMARY's exact numeric claims | ✓ PASS |
| `buildDiagram(v)` runs error-free for every variant | Node vm harness, all 19 variants | 0 errors; 10/4/2/3 topology-class split | ✓ PASS |
| WR-01..WR-05 code-review fixes present in shipped file | Direct grep/read of fix locations (lines 764-772, 611-625, 182, 860-897) | All 5 fixes present and match the commit diffs (`95e7bab`, `b2ad2f2`, `26f6b20`, `3c21f21`, `9d6b534`) | ✓ PASS |
| Browser-only behaviours (reload persistence, click-through, viewport scroll) | — | Not executable outside a browser | ? SKIP — routed to Human Verification |

### Probe Execution

Step 7c: SKIPPED — no `scripts/*/tests/probe-*.sh` convention exists in this repo (static offline HTML site, no test-probe tooling); no PLAN/SUMMARY declares a probe script. Verification instead used ad hoc Node `vm` harnesses (documented above), matching the executors' own stated verification method (06-05/06-06-SUMMARY: "no JS test framework... verified via a Node vm harness").

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|--------------|--------|----------|
| ARCH-01 | 06-01 | Tool at canonical path, style.css tokens, nav bar | ✓ SATISFIED | Truth #1 |
| ARCH-02 | 06-04 | Reachable from landing/README/ROADMAP | ✓ SATISFIED | Truth #2 |
| ARCH-03 | 06-01, 06-06 | Full behaviour parity + live diagram | ✓ SATISFIED | Truth #3 |
| ARCH-04 | 06-03 | Decision records retained, cross-linked, no orphan | ✓ SATISFIED | Truth #4 |
| ARCH-05 | 06-07 | SPEC.md documents full model | ✓ SATISFIED | Truth #5 |
| ARCH-06 | 06-04 | CLAUDE.md updated, no new shared files | ✓ SATISFIED | Truth #6 |
| ARCH-07 | 06-05 | Pin-budget model + confidence-flagged overruns; screen interface resolved via end-of-phase human-check | ✓ SATISFIED (data model); human-check PENDING (expected, non-blocking) | Truth #7 |
| ARCH-08 | 06-05 | Integrated-screen variant(s), RAM/PSRAM/GPIO, source+confidence | ✓ SATISFIED | Truth #8 |

No orphaned requirements: all 8 ARCH-01–08 IDs registered in `REQUIREMENTS.md` (2026-07-15) are claimed by exactly one plan's frontmatter `requirements:` field (ARCH-03 appears in both 06-01 and 06-06, reflecting incremental delivery of the same requirement across two plans — not a gap).

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `tools/system-architecture-explorer/index.html` | 428 | `label:'Alignment motor #2 (TBD)'` | ℹ️ Info | Not a code-debt marker — this is a user-facing data label honestly flagging an undecided hardware pick (alignment motor #2 model not yet chosen), already carrying `confidence:'Low'` per the tool's own sourcing-honesty convention (D-11). Consistent with SPEC.md's price table, which documents this row identically. Not a blocker. |
| `tools/system-architecture-explorer/index.html` | 716-718 | `escapeHtml()` defined but never called (dead code, IN-01 in 06-REVIEW.md) | ℹ️ Info | Not fixed in the review's `critical_warning` scope (only critical+warning were fixed; info items were left open by design). Does not weaken the actual XSS mitigation, which uses `textContent`/`createElement` exclusively. |
| `tools/system-architecture-explorer/index.html` | 335, 346, 377 | In-card `overflow-x:auto` at mid-width viewports (IN-10 in 06-REVIEW.md) | ℹ️ Info / ⚠️ routed to human check | Reviewer judged this "arguably within the letter of the [no-horizontal-scroll] rule" since the page body itself doesn't scroll — only the table cards do. Routed to the browser click-through human-verification item below rather than treated as a code defect, since it requires visual viewport inspection to confirm severity. |

No 🛑 Blocker-level anti-patterns found. All 5 code-review Warnings (WR-01 through WR-05) were fixed in commits `95e7bab`, `b2ad2f2`, `26f6b20`, `3c21f21`, `9d6b534` — independently re-verified present in the current file (not just trusted from 06-REVIEW.md's `fixed: true` claim).

### Human Verification Required

### 1. Physical screen-interface inspection (ARCH-07's deferred verification clause)

**Test:** Physically inspect the owned bitbyg ILI9341 3.2" module's silkscreen/header labels to determine SPI vs. 8-bit-parallel wiring (SPEC.md Open Question #1).
**Expected:** Either flip `interfaceConf` to `'High'` (SPI confirmed) or flip both `interfaceMode` to `'parallel'` and `interfaceConf` to `'High'` (parallel confirmed), per the exact one-line-edit procedure documented in SPEC.md and 06-05-SUMMARY.md.
**Why human:** Requires reading physical labels on a real circuit board; no codebase artifact resolves this. This is not a gap — it is the explicit, pre-planned end-of-phase human-check the phase's own requirement text (ARCH-07) calls for, and the tool ships correctly defaulted to the unverified, Low-confidence SPI scenario in the meantime.

### 2. Browser click-through pass (persistence, selection, viewport)

**Test:** Open the tool in a real browser and exercise: (a) price-edit-then-reload persistence, including decimal typing (the exact bug WR-01 fixed); (b) Reset-then-reload clears to DEFAULTS; (c) row click redraws the diagram, highlights the row, and expands the BOM; (d) all three filters + shared-block toggle; (e) page at ~700px and 375px width for horizontal scroll inside the table cards (IN-10).
**Expected:** All behaviours work as coded; no page-level horizontal scroll at either tested width.
**Why human:** DOM/localStorage/viewport behaviour in a real browser cannot be verified by static grep or a headless Node vm harness. The executors themselves noted (06-01-SUMMARY, 06-05-SUMMARY) that no interactive browser was available during execution — code was validated via `node --check` and vm-harness numeric traces only, which is strong but not a substitute for one live pass, especially since WR-01/WR-04/WR-05 were exactly the kind of interactive-only bugs a static check would miss.

### Gaps Summary

No blocking gaps. All 8 must-have truths (mapped 1:1 to ARCH-01 through ARCH-08) are verified against the actual codebase — not just SUMMARY.md claims — using independent evidence: direct file reads, repo-wide grep for dangling links, git-log diffing to confirm no shared files were touched, and Node `vm` harnesses that re-executed the tool's actual inline script (not a description of it) to confirm `VARIANTS.length===19`, `pinsOf()`'s scenario-dependent output matches the SUMMARY's claimed numbers exactly, and `buildDiagram()` builds all 19 variants error-free with the claimed 10/4/2/3 topology split.

The only reason status is `human_needed` rather than `passed` is two pre-planned, explicitly-scoped human-verification items (the physical screen inspection and one live browser click-through pass) — both were anticipated by the phase's own plans (`workflow.human_verify_mode: end-of-phase`, the former 06-02 checkpoint folded into 06-05, and code-review finding IN-10) rather than being newly discovered gaps. Per the verification decision tree, any non-empty human-verification list forces `human_needed` even when every other check passes — this is by design, not a defect in the phase's completion.

---

*Verified: 2026-07-15T18:30:00Z*
*Verifier: Claude (gsd-verifier)*
