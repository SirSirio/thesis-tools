---
phase: 09-pump-testing
verified: 2026-07-23T18:00:00Z
status: passed
score: 15/15 must-haves verified
overrides_applied: 0
human_verification_resolved: "Both items resolved by fixes rather than deferred — WR-01 (missing KaTeX fonts/) fixed in commit 8506986 by vendoring the 20-file woff2 set; WR-02 (mobile padding asymmetry) fixed in commit 9d8f8c4 by extending the 640px breakpoint to .map-card and .layer2-card. See 09-HUMAN-UAT.md (status: resolved)."
human_verification:
  - test: "Open tools/pump-testing/index.html in a browser (via serve.bat, not file:// / not Live Preview) and visually confirm all 9 math-block KaTeX formulas (Formulas A.1-A.4, CV, trueness, root-N scaling, variance-split) render as typeset math, not raw LaTeX source or broken glyphs."
    expected: "Formulas render with correct fraction bars, square roots, subscripts/superscripts, in KaTeX's serif math font (or a readable fallback, given the missing katex/fonts/ directory — see WR-01 below)."
    why_human: "Grep/static analysis confirms the KaTeX JS/CSS files are present and not corrupted, and confirms the fonts/ subdirectory referenced by katex.min.css's @font-face rules is missing — but only a live browser render can confirm the practical degree of visual degradation (generic serif/sans-serif fallback vs. unreadable) and that auto-render's $$/$ delimiters actually fire correctly across all 9 blocks."
  - test: "Resize the page (or use browser dev tools) to 375px width and confirm Section 9 (.map-card) and Section 10 (.layer2-card family) do not overflow or feel visually cramped relative to Sections 1-8 (.theory-card), despite the missing mobile padding rule identified in WR-02."
    expected: "No horizontal scroll anywhere (structural requirement); Section 9/10 content remains legible even though they keep full desktop padding while .theory-card sections tighten up."
    why_human: "Structural check (table-wrap + column-count audit) confirms no table overflows into horizontal scroll, but the padding asymmetry documented in 09-REVIEW.md WR-02 is a visual/spacing judgment call, not something a grep can rate as acceptable or broken."
---

# Phase 9: Pump Testing Verification Report

**Phase Goal:** Ship a self-contained, document-first, QR-citable protocol page at `tools/pump-testing/index.html` (+ co-located SPEC.md) presenting BOTH layers — (top) the market-grade dispensing-accuracy qualification protocol (ISO 23783-2 Annex D gravimetric method + ISO 8655 pipette-equivalence benchmark, deep accuracy core / lighter go-to-market map) and (bottom) the actual proto-02 v2.3 test protocol + justified deviations, authored from the user-supplied TEST-PROTOCOL.md. No calculator, no live computation.

**Verified:** 2026-07-23
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Document-first page exists, no calculator, no `<input>` fields, site chrome present (dark glassmorphic, `← All tools` nav) | ✓ VERIFIED | `tools/pump-testing/index.html` 1225 lines; `grep -n "<input"` returns zero matches; `.tool-nav` back-link to `../../index.html` present at line 331 |
| 2 | Dual-frame verdict stated as prose: ISO 23783-2 Annex D = test method, ISO 8655 = analogical performance benchmark | ✓ VERIFIED | Section 1 (`#framing`, lines 364-425) states this explicitly, including the honest correction that ISO 23783-2 Part 2 sets no device tolerance and defers to unavailable Part 3 |
| 3 | All 10 top-layer/bottom-layer section anchors exist and resolve | ✓ VERIFIED | TOC lines 347-358 links to `#framing`, `#method-gravimetric`, `#balance-requirements`, `#mass-to-volume`, `#replicates`, `#trueness-precision`, `#reporting-uncertainty`, `#alternate-methods`, `#go-to-market`, `#prototype-protocol-slot` — all 10 `<section id=...>` elements present matching each anchor (confirmed by 09-REVIEW.md's anchor cross-reference audit and direct read) |
| 4 | Gravimetric method section states verified Annex D values (Table D.1, pre-rinse ≥5×, thermal equilibrium ±2°C/≥2h, evaporation blank ≥10 cycles) | ✓ VERIFIED | Section 2 (lines 430-485): Table D.1 rendered as static table, all three preparation constants stated verbatim |
| 5 | Balance-requirements section renders Table 3 with 0.5-20 µL row (0.001 mg) highlighted | ✓ VERIFIED | Section 3 (lines 490-532): Table 3 rendered, `row-compliant` class applied to the 0.5≤V<20µL row |
| 6 | Mass→volume section renders Annex A formulas (A.1-A.4) as KaTeX, cites Annex A directly not ISO 8655-6 | ✓ VERIFIED | Section 4 (lines 537-627): all 4 formulas present as `.math-block` KaTeX, explicit correction text stating Annex A is self-contained |
| 7 | Replicates section states n=10/three-test-point convention (attributed to ISO 8655), distinguishes batch-mean from stroke-to-stroke CV | ✓ VERIFIED | Section 5 (lines 632-682) |
| 8 | Trueness/precision section marks ISO 8655-2:2022 exact numbers `[unverified]`, labels ISO 23783-2 Table 1 as method-uncertainty not device spec | ✓ VERIFIED | Section 6 (lines 687-725): `.tag-unverified` badge used, explicit category-error warning callout |
| 9 | Reporting section names the ISO 23783-3 gap honestly, references EURAMET CG-19 and GUM/ISO IEC Guide 98-3 | ✓ VERIFIED | Section 7 (lines 730-773) |
| 10 | Alternate-methods section: why-gravimetric rationale, GRM stated non-contact-only, slope method explicitly NOT labeled ISO GRM, trumpet curves considered-and-rejected | ✓ VERIFIED | Section 8 (lines 778-894), including the dedicated "slope method is not the ISO GRM" subsection |
| 11 | Go-to-market section maps lighter dimensions (safety/reliability, ISO 10993 biocompatibility, ISO 13485/CLIA/22870/15189) with visibly lighter styling (D-03) | ✓ VERIFIED | Section 9 (lines 899-954), uses distinct `.map-card`/`.map-item` CSS family (no accent left-bar, dimmer border, no accent-colored headings — deliberately less "deep" per its own CSS comment at line 217) |
| 12 | Bottom layer (Section 10) fully authored: two-axis model, 0.1mg-balance workarounds, ISO-requirement\|reality\|justification deviation table, pipette head-to-head, honest can/cannot scope | ✓ VERIFIED | Section 10 (lines 959-1199), visually distinct violet `.layer2-card` family; deviation table's 6 rows verified byte-for-byte consistent with `TEST-PROTOCOL.md` §7 source (lines 159-166) |
| 13 | SPEC.md co-located, documents both layers, formulas, standards, deferred scope | ✓ VERIFIED | `tools/pump-testing/SPEC.md` 314 lines, covers purpose, dual-frame anchor, normative values, all 4 formulas, assumptions, bottom-layer summary, still-deferred scope, cross-links, page structure |
| 14 | Landing-page card + README + ROADMAP + CLAUDE.md integration complete | ✓ VERIFIED | `index.html` line 663-670 (card + EN key line 775-776 + IT key line 831-832); `README.md` line 21; `ROADMAP.md` line 20; `CLAUDE.md` lines 61-62, 117 |
| 15 | KaTeX vendored locally (no CDN), and the deviation table + all authored content are real transcriptions, not fabricated/placeholder text | ✓ VERIFIED | `tools/pump-testing/katex/{katex.min.css,katex.min.js,auto-render.min.js}` present, valid (not corrupted, minified JS/CSS headers confirmed); zero `TBD`/`FIXME`/`XXX`/`TODO`/`HACK`/`PLACEHOLDER` markers in shipped files (one dead `.stub-note` CSS class remains, defined but unused — cosmetic leftover, not a content stub) |

**Score:** 15/15 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `tools/pump-testing/index.html` | Full two-layer protocol page, ≥200 lines, contains `prototype-protocol-slot` | ✓ VERIFIED | 1225 lines; all 10 sections present and substantive; well-formed (tag-stack balanced per 09-REVIEW.md and this verification's spot reads) |
| `tools/pump-testing/SPEC.md` | Co-located spec, ≥40 lines, contains "23783-2" | ✓ VERIFIED | 314 lines, matches shipped page's content and structure |
| `tools/pump-testing/katex/katex.min.js` | Vendored KaTeX, no CDN dependency | ✓ VERIFIED (with caveat) | File present, valid, referenced with no CDN URL. **Caveat:** `katex/fonts/` subdirectory is missing, so the ~24 `@font-face` rules in `katex.min.css` will 404 for their `.woff2`/`.woff`/`.ttf` requests — math renders via browser fallback fonts, not KaTeX's own glyphs. Confirmed present in this verification pass (`ls tools/pump-testing/katex/` shows only the 3 JS/CSS files, no `fonts/`). Flagged in 09-REVIEW.md as WR-01 and not fixed since. Same gap pre-exists in the two precedent tools this was copied from — inherited, site-wide, non-unique-to-phase-09. |
| `index.html` (landing page) | New tool-card, EN+IT | ✓ VERIFIED | Card + both language dictionary entries present and textually parallel |
| `README.md` | New tool-table row | ✓ VERIFIED | Row present, marked "✅ Live" |
| `ROADMAP.md` (repo root) | New Shipped-section row | ✓ VERIFIED | Row present |
| `CLAUDE.md` | Folder-structure entry | ✓ VERIFIED | Tree entry + prose description present |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| `tools/pump-testing/index.html` | `tools/pump-testing/katex/katex.min.css` | local stylesheet link | ✓ WIRED | `<link rel="stylesheet" href="katex/katex.min.css" />` line 9 |
| `tools/pump-testing/index.html` | `../../index.html` | All-tools nav back-link | ✓ WIRED | Line 331 |
| `tools/pump-testing/index.html #balance-requirements` etc. | `tools/pump-testing/index.html #prototype-protocol-slot` | Section 10 deviation-table cross-links back into top-layer anchors | ✓ WIRED | Deviation table rows link to `#balance-requirements`, `#method-gravimetric` (×3), `#mass-to-volume`, `#replicates` — all verified resolvable anchors |
| `index.html` (landing) | `tools/pump-testing/index.html` | tool-card href | ✓ WIRED | Line 663 |
| KaTeX JS | `renderMathInElement` call | inline `<script>` at bottom of page | ✓ WIRED | Lines 1210-1223, delimiters configured for `$$...$$` and `$...$`, `throwOnError:false` |

### Data-Flow Trace (Level 4)

Not applicable — this is a static documentation page with no dynamic data source, database, or API. All content is authored prose/tables, matching the D-01 document-first constraint. No hollow-prop or disconnected-data risk exists by construction.

### Behavioral Spot-Checks

Not applicable in the conventional sense (no runnable server/CLI/API for this phase) — spot-checks were instead performed as static-content verification:

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| No `<input>` elements anywhere (document-first constraint) | `grep -n "<input" tools/pump-testing/index.html` | 0 matches | ✓ PASS |
| Deviation table matches user-supplied source verbatim | Diff of Section 10's 6-row table against `TEST-PROTOCOL.md` §7 | Byte-consistent (same 6 requirement/action/justification triples) | ✓ PASS |
| `assets/style.css` untouched during phase 9 | `git log -1 -- assets/style.css` | Last touch 2026-05-29, predates all phase-09 commits (2026-07-23) | ✓ PASS |
| All 3 phase-09-plan-06 task commits exist in history | `git show --stat c535512 930225c 655ec3e` | All 3 found, diffs match summary claims | ✓ PASS |
| No debt markers in shipped files | `grep -n -E "TBD|FIXME|XXX|TODO|HACK|PLACEHOLDER"` on index.html + SPEC.md | 1 incidental match (a CSS comment literally named "Stub placeholder" describing an unused, dead CSS class `.stub-note`) — not a content stub, cosmetic only | ✓ PASS (info-level note below) |

### Probe Execution

Not applicable — no `scripts/*/tests/probe-*.sh` files exist for this phase; this is a static-site documentation phase with no probe-based verification declared in any PLAN/SUMMARY.

### Requirements Coverage

No formal REQ-IDs in `.planning/REQUIREMENTS.md` govern this phase (confirmed: `grep -n -i "phase 9\|pump.test" .planning/REQUIREMENTS.md` returns nothing). The trackable decision set is `09-CONTEXT.md`'s D-01…D-04, verified against the shipped codebase:

| Decision | Description | Status | Evidence |
|----------|-------------|--------|----------|
| D-01 | Document-first: prose + spec tables + expandable sections, no calculator | ✓ SATISFIED | Zero `<input>` elements; one `<details>`/`<summary>` expandable (condensed rationale); all math is display-only KaTeX |
| D-02 | Thesis artifact for now — no live calculation logic built | ✓ SATISFIED | No JS beyond the KaTeX `renderMathInElement` call; no fetch/computation logic anywhere in the file |
| D-03 | Dispensing-accuracy metrology deep (Sections 2-7), other go-to-market dimensions mapped lighter (Section 9) | ✓ SATISFIED | Visual/structural depth difference confirmed: `.theory-card` (accent left-bar, accent headings) vs `.map-card` (dimmer neutral border, no accent headings) — the CSS itself documents this intent at line 217 |
| D-04 | Superseded 2026-07-23: bottom layer now in scope, authored from user-supplied TEST-PROTOCOL.md, ISO-requirement\|reality\|justification table as centerpiece | ✓ SATISFIED | Section 10 fully authored; deviation table verified byte-consistent with the source document's §7 |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `tools/pump-testing/katex/` | (missing `fonts/` subdir) | Vendored KaTeX ships without its font files, so `@font-face` rules 404 | ⚠️ Warning | Math still renders (auto-render still typesets), but with degraded glyph fidelity (browser fallback serif/sans-serif instead of KaTeX's own math font) rather than the polished look implied by the page's own "must render offline exactly as designed" comment (line 8). Inherited from two precedent tools' `katex/` folders — not unique to this phase, but not fixed here either. Originally identified in `09-REVIEW.md` WR-01. |
| `tools/pump-testing/index.html` | 316-320 | `.layer2-card` and `.map-card` excluded from the 640px mobile padding reduction that `.theory-card` receives | ⚠️ Warning | Section 9/10 (the newest, most content-dense sections — six-column deviation table, multi-row tables, a `<details>` block, a two-column scope grid) get the least relative content width of any section on mobile, while every other section tightens up. Not a horizontal-scroll violation (all tables use `.table-wrap` with internal `overflow-x`), but a real responsive-design inconsistency. Originally identified in `09-REVIEW.md` WR-02. |
| `tools/pump-testing/index.html` | 248 | `.stub-note` CSS class defined but never applied to any element in the body | ℹ️ Info | Dead CSS left over from an earlier wave-1 placeholder pattern that was fully superseded by later plans' real content. No functional impact; cosmetic cleanup opportunity only. |
| `tools/pump-testing/index.html` | 158-164, 803-809, 616, 1029 | `.spec-table tr.row-compliant` reused for 4 semantically different meanings (ISO-compliant band, adopted-method row, "the row we use" row) | ℹ️ Info | Visual language stays consistent but the class name implies ISO compliance specifically in 2 of its 4 uses where it does not mean that. Cosmetic; previously identified as `09-REVIEW.md` IN-01. |

No 🛑 Blockers found. No unresolved `TBD`/`FIXME`/`XXX` debt markers gate this phase.

### Human Verification Required

### 1. KaTeX visual rendering fidelity

**Test:** Open `tools/pump-testing/index.html` via `serve.bat` (not `file://`, not VS Code Live Preview) and visually inspect all 9 `.math-block` KaTeX formulas across Sections 4, 5, and 10.
**Expected:** Formulas render as typeset math (fractions, square roots, subscripts) — ideally in KaTeX's own math font, but given the confirmed-missing `katex/fonts/` directory, at minimum a readable serif/sans-serif fallback with correct layout (not raw `$$...$$` text, not visibly broken).
**Why human:** Static analysis confirms the KaTeX engine files are present, uncorrupted, and correctly invoked (`renderMathInElement` with the right delimiters) — and separately confirms the `fonts/` directory is missing — but only a live render shows whether the fallback degradation is cosmetically acceptable or actually distracting.

### 2. Section 9/10 mobile padding asymmetry

**Test:** View the page at 375px width (or use browser dev tools device emulation) and compare the perceived padding/whitespace of Section 9 (`.map-card`) and Section 10 (`.layer2-card` family) against Sections 1-8 (`.theory-card`).
**Expected:** No horizontal scroll (structural requirement, independently verified); ideally consistent visual tightening across all sections at the mobile breakpoint.
**Why human:** The missing padding rule (WR-02) is confirmed by static CSS read, but whether the resulting inconsistency is visually acceptable or requires the reviewer's suggested one-line CSS fix is a judgment call, not a pass/fail grep.

### Gaps Summary

No must-have truth failed, no required artifact is missing or a stub, and no key link is unwired. All 15 derived observable truths (covering both layers, the SPEC.md, the site-chrome integration, and the D-01/D-02/D-03/D-04 decision record) verify cleanly against the actual codebase — not just SUMMARY.md's claims. The deviation table centerpiece was independently diffed against its named source (`TEST-PROTOCOL.md` §7) and found byte-consistent, and all documented commit hashes were confirmed to exist in git history with diffs matching their SUMMARY descriptions.

Two non-blocking Warnings carry over unresolved from `09-REVIEW.md` (missing KaTeX `fonts/` subfolder; Section 9/10 excluded from mobile padding fix) — both are real, both are still present in the current tree, neither breaks a truth or blocks the phase goal (offline/no-CDN operation and no-horizontal-scroll are both independently intact). Because visual/rendering fidelity cannot be fully assessed via static analysis, this report routes two spot-checks to human verification per the process's requirement that `passed` is only valid when the human-verification section is empty.

---

_Verified: 2026-07-23_
_Verifier: Claude (gsd-verifier)_
