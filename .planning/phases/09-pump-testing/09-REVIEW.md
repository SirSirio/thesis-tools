---
phase: 09-pump-testing
reviewed: 2026-07-23T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - tools/pump-testing/index.html
  - tools/pump-testing/SPEC.md
  - index.html
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
status: issues_found
---

# Phase 09: Code Review Report

**Reviewed:** 2026-07-23
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

`tools/pump-testing/index.html` is a large (1226-line), document-first, two-layer static page. Structural
verification (HTML parser tag-stack check, id/anchor cross-reference, table column-count audit, i18n
key-parity diff) found the file to be well-formed: every tag is properly closed and nested, all 10
table-of-contents anchors resolve to existing section ids, all 7 tables have consistent header/body column
counts, and there are no duplicate `id` attributes. The `index.html` landing-page diff for this phase (the
new Pump Testing Protocol card + its EN/IT language-object entries) is a clean, minimal, correctly-scoped
addition — a full EN/IT key-parity diff across the entire `LANG` object found zero mismatches in either
direction. `assets/style.css` was confirmed untouched across every phase-09 commit, matching the SPEC.md
claim. No hardcoded secrets, `eval`, `innerHTML`-from-untrusted-input, debug artifacts, or dangerous
patterns were found — expected, since this is a static prose/table page with no calculator and no `<input>`
elements, as SPEC.md claims.

Two real defects were found, both in the CSS layer: a missing companion `fonts/` directory for the vendored
KaTeX library (breaking the page's own explicit "must render offline" claim for math glyph fidelity), and a
mobile-breakpoint inconsistency where Section 10's `.layer2-card` family (and Section 9's `.map-card`) do not
receive the same padding reduction that every other section's `.theory-card` gets at 640px. Neither is a
crash or data-loss risk, so both are classified as Warnings rather than Blockers.

## Warnings

### WR-01: Vendored KaTeX ships without its `fonts/` directory — offline math glyphs will fall back to system fonts

**File:** `tools/pump-testing/katex/katex.min.css` (referenced from `tools/pump-testing/index.html:9`)
**Issue:** `tools/pump-testing/katex/` contains only `katex.min.css`, `katex.min.js`, and
`auto-render.min.js` — there is no `fonts/` subdirectory. `katex.min.css` itself declares roughly two dozen
`@font-face` rules such as:
```css
@font-face{font-family:KaTeX_AMS;font-style:normal;font-weight:400;src:url(fonts/KaTeX_AMS-Regular.woff2) format("woff2"),url(fonts/KaTeX_AMS-Regular.woff) format("woff"),url(fonts/KaTeX_AMS-Regular.ttf) format("truetype")}
```
Every one of these `fonts/KaTeX_*.{woff2,woff,ttf}` requests will 404 on this offline, no-CDN page (the
HTML's own comment at line 8 reads "KaTeX: local-only, no CDN — page must render offline from a USB drive").
With the webfonts missing, the browser silently falls back to its generic serif/sans-serif fallback declared
in the KaTeX CSS's own font stacks, so the 9 `.math-block` formulas in Sections 4, 5, and 10 (Formulas
A.1–A.4, trueness/CV, √N scaling, etc.) will render with degraded math typography (wrong italics, missing
proper glyph shaping for symbols like `\dfrac`, `\sqrt`, subscripts) instead of the polished KaTeX look the
page is designed around. This does not crash the page — KaTeX's `auto-render` still runs and lays out the
markup — but it silently undermines the "renders offline exactly as designed" claim baked into the page's
own inline comment.

Note: this exact gap (fonts folder omitted from the vendored `katex/` directory) also exists in the two
precedent tools this page's `katex/` folder was copied from
(`tools/peristaltic-roller-displaced-volume-model/katex/` and
`tools/peristaltic-tensioned-path-model/katex/`), so it is an inherited, site-wide pattern rather than a
defect unique to phase 09 — but it is still a genuine, verifiable "broken/missing local asset reference" in
the reviewed file, and it compounds every time it's copied forward into a new tool.

**Fix:** Copy the KaTeX distribution's `fonts/` directory (the `.woff2`/`.woff`/`.ttf` files under
`katex/dist/fonts/` in any official KaTeX release) into `tools/pump-testing/katex/fonts/`, matching the
relative path `katex.min.css` already expects. Consider fixing this once in the shared precedent
(`peristaltic-roller-displaced-volume-model/katex/`) and re-copying to all three affected tools, since it is
the same gap in all three.

### WR-02: `.layer2-card` and `.map-card` are excluded from the 640px mobile padding reduction that every other section gets

**File:** `tools/pump-testing/index.html:316-320`
**Issue:** The page's only responsive breakpoint is:
```css
@media (max-width: 640px) {
  .tool-nav { padding: 14px 16px; }
  .tool-main { padding: 40px 18px 70px; }
  .theory-card { padding: 22px 20px; }
}
```
This reduces padding only for `.theory-card` (used by Sections 1–8, the top layer). It does not touch
`.layer2-card` (Section 10's bottom layer, 7 card instances, base padding `30px 34px`) or `.map-card`
(Section 9's go-to-market map, base padding `24px 28px`). On a narrow viewport, `.tool-main`'s own horizontal
padding shrinks from its desktop value down to 18px per side, but Section 10's cards keep the full 34px
per-side padding on top of that — the newest, most content-dense section of the page (six-column deviation
table, two multi-row tables, an ordered-list of three "tricks", a `<details>` block, and a two-column
can/cannot scope grid) ends up with the least available content width of any section on mobile, while every
other section tightens up. This is a genuine inconsistency in the responsive design, not present by design
(the surrounding CSS comments explicitly call out `.map-card` as "deliberately less deep" than `.theory-card`
in visual weight, but never mention withholding the mobile padding fix from it).
**Fix:** Add both selectors to the existing breakpoint:
```css
@media (max-width: 640px) {
  .tool-nav { padding: 14px 16px; }
  .tool-main { padding: 40px 18px 70px; }
  .theory-card, .layer2-card { padding: 22px 20px; }
  .map-card { padding: 18px 16px; }
}
```

## Info

### IN-01: `.spec-table tr.row-compliant` reused across three semantically different meanings

**File:** `tools/pump-testing/index.html:158-164, 803-809, 616, 1029`
**Issue:** The `row-compliant` class (accent-tinted background + left accent border) is applied to four
different rows across the page for four different reasons: the ISO-compliant balance-grade band in Table 3
(§3), the pump's expected 20°C row in the Table A.1 excerpt (§4), the "adopted" method row in the methods
comparison table (§8), and the ≥200 µL "compliant" row in Section 10's balance-vs-Table-3 comparison. The
visual language ("this row matters/is highlighted") is consistent, but the class name `row-compliant`
specifically implies ISO compliance, which is not what it means in the Table A.1 and methods-comparison
usages (there it just means "the value we use" / "the method we adopted"). Not a functional bug — CSS
applies identically regardless of semantic meaning — but a future reader skimming the CSS could reasonably
assume every `row-compliant` row denotes ISO-standard compliance, which is false for two of its four uses.
**Fix:** Consider renaming to a semantically neutral class (e.g. `row-highlight`) for the two non-compliance
usages, or add a one-line CSS comment noting the class is reused generically for "the row the reader should
focus on," not strictly for standards-compliance.

### IN-02: `$$\rho_A = \rho_A(t_A,\, p,\, h_r)$$` presents Formula A.2 as self-referential rather than as a named function definition

**File:** `tools/pump-testing/index.html:569`
**Issue:** The KaTeX block reads `\rho_A \;=\; \rho_A(t_A,\, p,\, h_r)`, i.e. "air density equals air
density, as a function of...". This renders correctly and is not a code defect, but as written it defines
`ρ_A` in terms of itself rather than in terms of the (unstated) CIPM-2007 expression — a reader skimming
only the formula (not the prose sentence below it) could momentarily read this as a tautology instead of "ρ_A
is *computed by* the CIPM-2007 function of these three inputs."
**Fix:** Purely cosmetic; could be tightened to `$$\rho_A = f_{\text{CIPM-2007}}(t_A,\, p,\, h_r)$$` if this
formula block is revisited, but the accompanying prose sentence already disambiguates it, so this is
optional.

---

_Reviewed: 2026-07-23_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
