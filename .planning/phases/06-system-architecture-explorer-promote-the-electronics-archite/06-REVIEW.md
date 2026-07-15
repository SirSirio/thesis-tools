---
phase: 06-system-architecture-explorer-promote-the-electronics-archite
reviewed: 2026-07-15T12:00:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - tools/system-architecture-explorer/index.html
  - tools/system-architecture-explorer/SPEC.md
  - prototypes/System-Architecture/ARCHITECTURE.md
  - prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md
  - prototypes/System-Architecture/SOLUTION-MATRIX.md
  - prototypes/PROTOTYPES.md
  - index.html
  - README.md
  - ROADMAP.md
  - CLAUDE.md
findings:
  critical: 0
  warning: 5
  info: 10
  total: 15
status: issues_found
---

# Phase 6: Code Review Report

**Reviewed:** 2026-07-15T12:00:00Z
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

## Summary

Primary code surface is `tools/system-architecture-explorer/index.html` (one large inline script: cost engine, pin-budget engine, localStorage persistence, live SVG diagram). The three review focus areas called out by the workflow were explicitly traced:

- **XSS safety (D-07 source field):** VERIFIED SAFE. `sourceCellContent()` builds the Source/Confidence cell exclusively via `createElement` + `textContent` (index.html:729-747); external links carry `rel="noopener noreferrer"`. No user-typed string ever reaches an `innerHTML` interpolation — the only user-mutable state is numeric (`COMP[k].eur`, `rate`). One caveat: the `escapeHtml()` helper referenced by the T-06-06 comment is dead code (IN-01).
- **localStorage deserialization guards:** VERIFIED SAFE. `loadPersisted()` (index.html:676-688) wraps `JSON.parse` in try/catch, validates each value with `Number.isFinite(v) && v>=0`, only assigns to `.eur`, and validates the rate with `Number.isFinite(savedRate) && savedRate>0`. However, live input handlers are *less* strict than the load-time guards, creating a live-vs-reload inconsistency (WR-05).
- **Broken relative links from the prototypes→tools move:** NONE FOUND. All checked targets resolve: `../../tools/system-architecture-explorer/index.html#matrix|#theory|#diagram` anchors exist in the tool (`id="matrix"` :272, `id="theory"` :199, `id="diagram"` :378); `../../prototypes/System-Architecture/*.md`, `../REQUIREMENTS-CRITERIA.md`, and both `multi-liquid-architecture/ARCHITECTURE-DECISION.md` references resolve on disk; `../../assets/style.css` tokens (`--accent-2`, `--glass-bg`, `--glass-border`, `--radius`, `--font`) all exist in the shared stylesheet. CLAUDE.md's folder tree includes the new tool and the trimmed `prototypes/System-Architecture/` folder.

Real defects found: an input-rewrite loop that corrupts decimal price entry (WR-01), overlapping boxes in the distributed-topology diagram (WR-02), a stale "seventeen" variant count in user-facing prose (WR-03), the exact scenario-toggle/pin-math state-desync hazard flagged by the workflow (WR-04), and asymmetric numeric validation (WR-05), plus ten smaller quality/doc-accuracy items.

## Narrative Findings (AI reviewer)

## Warnings

### WR-01: Price-input rewrite loop destroys in-progress decimal typing (silent 10× price errors)

**File:** `tools/system-architecture-explorer/index.html:764-775`
**Issue:** The `input` handler calls `syncCompRow(k)` on every keystroke, and `syncCompRow` rewrites **all** inputs with that `data-k` — including the one currently being typed into. Typing `3.5` in a € field: after the `.` keystroke, `parseFloat("3.")` → `3`, the field is rewritten to `"3"` (the dot vanishes), the next keystroke produces `35` — a 10× price error that is immediately written into `COMP[k].eur` and persisted to `localStorage` via `persist()`. Clearing a field to retype also fails: `parseFloat('')||0` → `0`, the field is instantly rewritten to `"0"`. Decimal entry is central here — shipped defaults include 2.5, 3.5, 0.7, 25.6. Editing prices is the tool's headline interaction ("Type € directly").
**Fix:** Never rewrite the input that fired the event — only sync its sibling currency field:
```js
b.querySelectorAll('input').forEach(inp=>inp.addEventListener('input',e=>{
  const k=e.target.dataset.k, cur=e.target.dataset.cur, val=parseFloat(e.target.value)||0;
  if(cur==='eur') COMP[k].eur=val; else COMP[k].eur=val*rate;
  syncCompRow(k, e.target); renderMatrix(); persist();
}));
function syncCompRow(k, skip){
  document.querySelectorAll(`#compBody input[data-k="${k}"]`).forEach(inp=>{
    if(inp===skip) return;
    if(inp.dataset.cur==='eur') inp.value=COMP[k].eur.toFixed(2).replace(/\.00$/,'');
    else inp.value=(COMP[k].eur/rate).toFixed(0);
  });
}
```
(`refreshAllDkk()` callers are unaffected — `skip` is simply undefined there.)

### WR-02: Distributed-topology diagram draws the alignment node on top of Pro-Mini nodes 5–6

**File:** `tools/system-architecture-explorer/index.html:611-629`
**Issue:** `buildDiagram()` places the constant alignment box at `{x:650,y:190,w:170,h:48}` (spans x 650–820, y 190–238) for **every** topology class. In the `distributed` class (P6-dist-485, P6-dist-can), the six Pro-Mini boxes are laid out at `startX=(880-680)/2=100`, `nx=100+i*116`, y 190–238 — node 5 (x 564–664) clips the alignment box and node 6 (x 680–780) sits entirely inside it. Two overlapping labelled boxes at the same y render as an unreadable collision in exactly the two variants whose selling point is node topology.
**Fix:** In the distributed branch, offset one of the two rows, e.g. draw the alignment box lower for that class:
```js
const alignY = cls==='distributed' ? 246 : 190;   // clear of the 6-node row
const alignBox = {x:650,y:alignY,w:170,h:48};
```
and lengthen its bus drop line accordingly (`LINE(cx, busY, cx, alignBox.y)` already adapts). Alternatively shrink/shift the 6-node row (`nodeW:86`, `startX:24`) so it ends before x 650.

### WR-03: Tool header says "seventeen candidate architectures" — there are 19

**File:** `tools/system-architecture-explorer/index.html:182-183`
**Issue:** The header prose reads "sort and filter the seventeen candidate architectures", but `VARIANTS` contains 19 entries (the two ESPINT-* rows were added under D-10). SPEC.md, README.md, ROADMAP.md, and the landing-page card all correctly say 19 — the tool's own page is the only place with the stale count, and it is the first sentence a reader sees.
**Fix:** Change "seventeen" → "nineteen" (or avoid the literal: "the candidate architectures"), matching `${VARIANTS.length}` which the row-count line already reports dynamically.

### WR-04: Scenario/filter state desyncs from the DOM on soft reload / back-forward navigation

**File:** `tools/system-architecture-explorer/index.html:481-493, 851-876`
**Issue:** All engine state (`interfaceMode`, `includeShared`, `maxPrice`, `maxCx`, `minCon`) lives in JS globals initialized to hard-coded defaults, and is only updated by `change`/`input` listeners. Browsers (Firefox notably, and Chrome on bfcache restore) restore form-control values on reload/back-navigation **without firing change events**. Result: the "Screen interface (Layer A)" select can display "8-bit parallel (~13 pins)" while `pinsOf()` computes with `interfaceMode='spi'` — the pin-budget column, OVERRUN flags, and diagram labels then contradict the visible control. This is the duplicated-state hazard between the SPI/parallel toggle and the pin math; the same applies to the shared-block toggle and all three filters (matrix shows rows the visible filter says should be hidden).
**Fix:** At init (before the first `renderMatrix()`), seed state from the DOM instead of trusting the literals:
```js
loadPersisted();
document.getElementById('rate').value = rate;
interfaceMode = document.getElementById('ifMode').value;
includeShared = document.getElementById('fShared').value==='full';
maxPrice = +document.getElementById('fPrice').value;
document.getElementById('maxPriceLbl').textContent = maxPrice;
maxCx = +document.getElementById('fCx').value;
minCon = +document.getElementById('fCon').value;
renderComps(); renderMatrix();
```
(or add `autocomplete="off"` to each control, though the JS seeding is the robust fix).

### WR-05: Live inputs accept negative/garbage values that the load-time guards reject — state silently changes on reload

**File:** `tools/system-architecture-explorer/index.html:765-766, 852`
**Issue:** `min="0"` on the number inputs does not prevent typed negatives, and the handlers do no clamping: `parseFloat(e.target.value)||0` accepts `-5` → `COMP[k].eur=-5` (negative costs, negative DKK columns, negative BOM totals). The rate handler `rate=parseFloat(e.target.value)||0.134` likewise accepts negatives (only falsy values fall back), producing negative conversions, and both get persisted. On reload, `loadPersisted()`'s stricter guards (`v>=0`, `savedRate>0`) silently discard them — so the session shows one state and the reload shows another, with no feedback. Validation should be symmetric with the persistence guards.
**Fix:**
```js
const val=Math.max(0, parseFloat(e.target.value)||0);            // price handler
...
const r=parseFloat(e.target.value);                              // rate handler
rate=(Number.isFinite(r)&&r>0)?r:0.134;
```

## Info

### IN-01: `escapeHtml()` is dead code

**File:** `tools/system-architecture-explorer/index.html:716-718`
**Issue:** Defined under the "XSS-safe rendering helpers (T-06-06)" banner but never called anywhere in the file — the safe path uses `textContent` (correctly), so this helper suggests a protection layer that does not actually run.
**Fix:** Delete it, or use it in the `innerHTML` template paths that interpolate `COMP` fields (`renderComps`, `bomHtml`) as defense-in-depth.

### IN-02: Comment/SPEC accuracy — `worstConf` location and the "borderline" OVERRUN claim

**File:** `tools/system-architecture-explorer/index.html:522-524`; `tools/system-architecture-explorer/SPEC.md:234-238`
**Issue:** (a) The `pinConfidenceOf` comment says `worstConf()`/`CONF_RANK` are "defined alongside the source/confidence helpers **above**" — they are defined ~200 lines *below* (:722-725); it works only because calls happen after full script evaluation. (b) SPEC's OVERRUN section claims "T9-fused-*/T51-*/P6-rp-i2c sit right at the SPI/parallel borderline" — tracing `pinsOf()`: T9-fused-485 uses 8+2+3+4=17 > 15 and both T51-* use 17 > 15, i.e. they OVERRUN even in the SPI scenario; only T9-fused-i2c (14 ≤ 15) and P6-rp-i2c are actually borderline.
**Fix:** Reword the comment ("defined below, in the confidence-helpers section") and correct the SPEC sentence to name only the variants that genuinely flip between scenarios.

### IN-03: `bomHtml()` dereferences `COMP[k].label` unguarded while `costOf()` is defensive

**File:** `tools/system-architecture-explorer/index.html:831-832` vs `:700`
**Issue:** `costOf` uses `COMP[k]?.eur||0` (unknown bom key → 0), but `bomHtml`'s `add()` uses `COMP[k].label`/`COMP[k].eur` directly — a future variant with a typo'd bom key would show a cost in the matrix yet throw on row expansion. Inconsistent failure modes hide the data error.
**Fix:** `const c=COMP[k]; if(!c) return `<tr><td colspan="4">⚠ unknown component "${k}"</td></tr>`;` — fail visibly in both paths.

### IN-04: `max485:2` in the USB/UART printer-board variants is unexplained

**File:** `tools/system-architecture-explorer/index.html:468-473`
**Issue:** B-ramps-drv / B-skr-drv / B-skr-tmc declare `b:'USB/UART'` (no RS-485 bus), yet their BOMs include `max485:2` (+€1.4). The original SOLUTION-MATRIX.md rows for these variants list no MAX485. If the transceivers serve an RS-485 alignment-node link, the Bus (B) column mislabels it; if they are copy-paste residue from the RS-485 rows, the cost is inflated.
**Fix:** Either drop `max485:2` from the three B-* BOMs or document the alignment-link rationale in the variant `note` and SPEC.

### IN-05: Reference snapshots disagree with the tool on node counts (7 vs 8)

**File:** `prototypes/System-Architecture/SOLUTION-MATRIX.md:90-91`; `prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md:68`
**Issue:** The snapshot says P6-dist-* is "RS-485 (7 nodes)" with "7× MAX485"; the tool's BOM uses `max485:8` and the diagram computes 8 nodes (brain + alignment + 6 pump nodes). Both files are marked non-authoritative (D-08), but a structural fact like node count silently differing between "reference" and "source of truth" invites mis-citation in the thesis.
**Fix:** One-line caveat in the snapshot ("the live tool adds the alignment node: 8 nodes / 8× MAX485") or update the two row cells.

### IN-06: Half-star glyph U+2BE8 (`⯨`) has poor font coverage

**File:** `tools/system-architecture-explorer/index.html:711`
**Issue:** `stars()` emits `⯨` (LEFT HALF BLACK STAR, U+2BE8) for half-star complexities (4 variants). Coverage in default Windows/macOS system-ui stacks is spotty — it can render as a tofu box precisely in the offline/USB scenario the site targets. SPEC itself writes `★★★★½`.
**Fix:** Use `'½'` (universally covered) instead: `return '★'.repeat(f)+(half?'½':'')+'☆'.repeat(5-f-(half?1:0));`

### IN-07: The diagram — the tool's only architecture visualization — is `aria-hidden="true"`

**File:** `tools/system-architecture-explorer/index.html:378`
**Issue:** `<div id="diagram" aria-hidden="true">` removes the live SVG from the accessibility tree entirely. Unlike decorative blobs, this is primary content; only the caption text ("System diagram — S1-i2c") survives for AT users.
**Fix:** Drop `aria-hidden`, add `role="img"` and an `aria-label` set in `selectVariant()` (e.g. `` `System diagram for ${v.id}: ${v.b} bus, ${v.c}` ``).

### IN-08: Reset clears the persisted rate key but keeps the in-session custom rate

**File:** `tools/system-architecture-explorer/index.html:861-864`
**Issue:** The reset handler removes `sae-rate` from localStorage but leaves the `rate` variable and input at the user's edited value — the very next price edit calls `persist()` and re-writes the custom rate. So "clears the persisted keys" (SPEC) is only true for the instant between reset and the next edit. The button says "Reset prices", so behavior is defensible, but the code and SPEC imply the rate is being un-persisted when it effectively isn't.
**Fix:** Either also reset `rate=0.134; document.getElementById('rate').value=rate; refreshAllDkk(); updateConv();` in the handler, or stop removing `sae-rate` and note in SPEC that reset covers prices only.

### IN-09: BOM detail prints raw floats after DKK-entry conversion

**File:** `tools/system-architecture-explorer/index.html:832`
**Issue:** Typing a DKK price stores `val*rate` unrounded (e.g. `26*0.134 = 3.4840000000000004`); `bomHtml` interpolates `€${COMP[k].eur}` raw, so the expanded BOM can show `€3.4840000000000004` while the € input shows the 2-dp value — visibly inconsistent within one screen.
**Fix:** `<td>€${COMP[k].eur.toFixed(2)}</td>` (line totals already use `toFixed(1)`).

### IN-10: In-card horizontal scroll at mid-width viewports vs the project's no-horizontal-scroll rule

**File:** `tools/system-architecture-explorer/index.html:335, 346, 377`
**Issue:** CLAUDE.md: "No horizontal scroll on any page — table columns must wrap headers before adding scroll." The tool wraps all three tables/diagram in `style="overflow-x:auto"` cards; the `hide-sm` column-dropping only kicks in below 640px, so an 8-column matrix at ~650–780px viewport widths scrolls inside the card rather than wrapping headers first. The page body itself does not scroll horizontally, so this is arguably within the letter of the rule, but the scroll containers are doing work the convention says column-wrapping should do.
**Fix:** Verify the matrix at ~700px; if the card scrolls, either raise the `hide-sm` breakpoint for the two widest columns (`C link`, `Pins free`) to ~780px or allow header wrapping (`th{white-space:normal}` is already the default — check the `.cost`/pill cells forcing width).

---

_Reviewed: 2026-07-15T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
