# Phase 8: Dispense Choreography & Throughput Simulator - Pattern Map

**Mapped:** 2026-07-20
**Files analyzed:** 6 (2 new, 4 modified integration edits)
**Analogs found:** 6 / 6

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `tools/dispense-throughput-simulator/index.html` | component (self-contained tool page: input panel + engine + Gantt + animation) | transform (input → simulation → render), event-driven (live recompute on input) | `tools/rotor-solver/index.html` (panel+engine wiring) + `tools/thesis-timeline/index.html` (Gantt) + `tools/system-architecture-explorer/index.html` (single-source-of-truth breakdown fn) | exact (composite — no single file covers all three concerns) |
| `tools/dispense-throughput-simulator/SPEC.md` | config/doc | — | `tools/rotor-solver/SPEC.md` | exact |
| `index.html` (landing page, root) — new tool card | component (card fragment) | request-response (static link) | `tools/system-architecture-explorer` card block, `index.html:650-657` | exact |
| `README.md` (root) — new tool-table row | doc | — | System Architecture Explorer row, `README.md:19` | exact |
| `ROADMAP.md` (root) — move from Planned to Shipped | doc | — | System Architecture Explorer row, `ROADMAP.md:18` | exact |
| `CLAUDE.md` — folder-structure block | doc | — | `tools/system-architecture-explorer/` block in CLAUDE.md folder tree | exact |

## Pattern Assignments

### `tools/dispense-throughput-simulator/index.html` (component, transform + event-driven)

Three analogs cover three distinct concerns of this one file. Compose them; do not pick just one.

---

**Analog A — Live-recompute-on-input panel + engine wiring:** `tools/rotor-solver/index.html`

**Page shell / nav / layout classes** (lines 305-313, adapt text, keep structure):
```html
<div class="bg-blobs" aria-hidden="true">
<div class="blob blob-1"></div>
<div class="blob blob-2"></div>
<div class="blob blob-3"></div>
</div>
<nav class="tool-nav"><a href="../../index.html" data-i18n="nav-back">&larr; Resources</a> <span data-i18n="nav-site">DTU Thesis Tools &middot; Sirio Vittorio Feltrin</span> ...</nav>
<main class="tool-main"><header class="tool-header animate-in" style="--delay: 0s;">
<span class="site-label" data-i18n="tool-label">Design Tool &middot; Peristaltic Pump</span>
<h1 data-i18n="tool-h1">Rotor Geometry Solver</h1>
<p data-i18n="tool-desc">...</p>
</header>
```
Note: phase 8 does not need the i18n (EN/IT) system — `tools/thesis-timeline/index.html` (English-only, no `data-i18n`) is the simpler, more-representative nav precedent for this tool (see nav pattern below); rotor-solver's `.tool-nav`/`.tool-main`/`.tool-header`/`.glass-panel`/`.panel-title` CSS classes are still the ones to reuse, just without the i18n wiring.

**Nav bar (simpler, no i18n — prefer this exact block):** `tools/thesis-timeline/index.html:397-400`
```html
<nav class="tool-nav" aria-label="Breadcrumb">
  <a href="../../index.html">← All tools</a>
  <span>Thesis Roadmap &amp; Timeline</span>
</nav>
```

**Controls grid CSS** (lines 77-180): `.ctrl` (`grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`), `.cg` label/input-row/`.v` value-readout pattern, number input styling, range input styling with the `--fill` custom property trick for the filled-track look. Reuse verbatim for: 6 liquid-volume number inputs, rollers/µL-per-stroke/RPM number inputs, the concurrency `<input type=range>`, and the mode toggle (`<select>` or two-button toggle styled like `select`).

**Range fill helper** (lines 670-673):
```javascript
function setRangeFill(el) {
  const pct = ((+el.value - +el.min) / (+el.max - +el.min)) * 100;
  el.style.setProperty('--fill', pct + '%');
}
```
Call this in `upd()`/`recompute()` for the concurrency slider (`['bossS','spS'].forEach(id => setRangeFill(...))` pattern, line 702).

**Summary/headline stat cards** (`.summary`/`.mc` CSS, lines 181-211; render call, lines 780-786):
```javascript
document.getElementById('summary').innerHTML = `
  <div class="mc"><div class="l">${L['sum-target']}</div><div class="n">${vol.toFixed(1)} <small ...>μL</small></div></div>
  ...`;
```
Use this `.mc` card shape for phase 8's four D-11 headline metrics (total run time, bottleneck station, A1-vs-A2 delta, throughput) — swap `.mc`/`.summary` for `thesis-timeline`'s `.stat`/`.stat-strip` (functionally identical, no i18n baggage — prefer `.stat-strip` naming since this tool has no i18n either, see below).

**Live-recompute event wiring** (lines 805-810, direct reuse — this is THE core pattern):
```javascript
['arcCompN', 'bossS', 'spS'].forEach(id =>
  document.getElementById(id).addEventListener('input', upd));
['idSel', 'bSel', 'voltSel', 'msSel'].forEach(id =>
  document.getElementById(id).addEventListener('change', upd));
document.getElementById('volN').addEventListener('input', upd);
```
For phase 8: bind all liquid-volume `<input type=number>` fields and the concurrency `<input type=range>` via `'input'`; bind the mode `<select>`/toggle and rollers/µL-per-stroke/RPM selects (if selects) via `'change'`. One `recompute()` function does everything downstream — matches D-03 "run time updates live."

**Feasibility "show, don't hide" precedent** (lines 728-737, `.infeasible`/`.ok`/`.no`/`.warn` CSS at 274-280): for phase 8's NaN/zero-input guard (RESEARCH Pitfall 4) — clamp inputs to sane minimums and show an inline warning rather than a blank Gantt, following this exact convention:
```javascript
let why = `<span class="ok">${L['feas-yes']}</span>`;
if (!feasible) {
  const r = [];
  if (arcGap  <= 0) r.push(L['feas-overlap']);
  ...
  why = `<span class="no">✗ ${r.join(', ')}</span>`;
}
```

**Top-down SVG figure precedent** (`buildFigure()`, lines 574-668): string-concatenation SVG builder returning a `<svg viewBox="...">...` string assigned to `innerHTML` of a wrapper div (`document.getElementById('figWrap').innerHTML = buildFigure(g, L);`, line 802) — same technique to use for the D-12 illustrative rack/nozzle-line schematic (hand-built inline SVG, no library), though the rack animation itself should be CSS `@keyframes`/`steps()` per RESEARCH, not JS-redrawn-per-frame.

---

**Analog B — HTML/CSS percentage-based Gantt:** `tools/thesis-timeline/index.html`

**Row/track/bar DOM structure** (lines 636-660, adapt from `Date`-based `pct()` to elapsed-seconds `pct()`):
```javascript
const row = document.createElement('div');
row.className = 'row';
const label = document.createElement('div');
label.className = 'row-label';
label.textContent = t.name;
const track = document.createElement('div');
track.className = 'row-track';
const bar = document.createElement('div');
bar.className = 'bar ' + t.owner + ' ' + t.status;
const left = Math.max(0, pct(t.start));
const right = Math.min(100, pct(t.end));
bar.style.left = left + '%';
bar.style.width = Math.max(0.6, right - left) + '%';
track.appendChild(bar);
row.appendChild(label); row.appendChild(track);
rowsEl.appendChild(row);
```

**Percent-position function** (lines 574-577, swap `Date`/ms domain for plain seconds — no `Date` objects needed per RESEARCH):
```javascript
const toMs = s => new Date(s + 'T00:00:00Z').getTime();
const S = toMs(SPAN.start), E = toMs(SPAN.end), TOT = E - S;
const pct = s => ((toMs(s) - S) / TOT) * 100;
```
Phase 8 equivalent: `const pct = t => ((t - windowStart) / (windowEnd - windowStart)) * 100;` operating directly on cycle-timestamp numbers (seconds), no date parsing at all.

**Row/track/bar CSS** (lines 260-322): `.row { display:flex; align-items:center; height:32px; }`, `.row-label { width: var(--lbl); ... }`, `.row-track { position:relative; flex:1; height:100%; }`, `.bar { position:absolute; top:6px; height:20px; border-radius:6px; ... }`. Reuse directly for the per-station rows; recolor `.bar` variants per liquid instead of per owner (`.bar.sirio/.partner/.shared` → `.bar.liquid-1/.liquid-2/...` or inline `background` per liquid colour).

**Hover tooltip wiring** (lines 663-690, direct reuse):
```javascript
const tt = document.getElementById('tt');
function showTip(e) { /* build tt.innerHTML from e.currentTarget.dataset.*, tt.classList.add('show'); moveTip(e); */ }
function moveTip(e) { /* clamp tooltip position to viewport */ }
function hideTip() { tt.classList.remove('show'); }
document.querySelectorAll('.bar').forEach(b => {
  b.addEventListener('mouseenter', showTip);
  b.addEventListener('mousemove', moveTip);
  b.addEventListener('mouseleave', hideTip);
});
```
Use for bar tooltips showing station/liquid/dose-time/cycle-window per segment.

**CRITICAL anti-pattern — do NOT copy this part** (lines 158-163):
```css
.gantt-scroll { overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch; }
.timeline { position: relative; min-width: 940px; --lbl: 210px; }
```
Phase 8 must give `.timeline` `width: 100%` with **no** `min-width` and **no** `.gantt-scroll`/`overflow-x` wrapper — D-10's steady-state window exists specifically so the chart fits without scrolling, and CLAUDE.md's "no horizontal scroll on any page" is a hard constraint (thesis-timeline's own scroll compromise is the one thing not to inherit). Use a responsive `--lbl` (e.g. `clamp(70px, 22vw, 130px)`) instead of a fixed `210px`, per RESEARCH Pitfall 6.

**Bottleneck-row highlight:** thesis-timeline has no direct "highlighted row" precedent — synthesize from `.bar.active` (lines 304, `box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 0 0 1px rgba(255,255,255,0.15), 0 0 14px rgba(255,107,43,0.28);`) applied to the bottleneck station's `.row`/`.bar` elements (D-09's "bottleneck row is highlighted").

---

**Analog C — Single-source-of-truth breakdown function:** `tools/system-architecture-explorer/index.html`

**Pattern** (`pinsOf()`, lines 1261-1287): one function builds a `terms` array (or equivalent structured breakdown) AND a rolled-up total in the same pass, so the summary number and any expanded/detail view read the SAME computed object — added specifically (commit `260720-pbc`) to eliminate drift between a headline number and its explanation:
```javascript
function pinsOf(v){
  const terms = [];
  let used = 0;
  const add = (label, pins, note) => { terms.push({ label, pins, note }); used += pins; };
  add('Screen (A)', SCREEN_PINS[interfaceMode], 'ILI9341 SPI + touch');
  add('Bus (B)', BUS_PINS[v.b] || 0, `${v.b} attachment`);
  // ...
  const free = avail - used;
  return { used, avail, free, overrun: used > avail, terms };
}
```
**Direct mapping for phase 8:** `simulateSchedule(doseTimes, N, M, K, sampleShift, rackChangeSec, numRackChanges)` (already drafted in RESEARCH.md) must play this exact role — return `{ cycles, totalRunTime, bottleneck, samplesPerHour }` and have EVERY headline stat card AND the Gantt read from that one returned object, never a second independently-computed total. Responsive `.hide-sm` column-hiding pattern (`@media(max-width:640px){#matrix .hide-sm{display:none}}`, line 470) is the precedent for hiding secondary Gantt/table columns at narrow viewports if the per-station table needs it (no direct table columns expected here, but the technique applies if a per-cycle breakdown table is added).

---

### `tools/dispense-throughput-simulator/SPEC.md` (config/doc)

**Analog:** `tools/rotor-solver/SPEC.md`

**Structure to copy** (lines 1-60 shown, full doc follows this shape):
```markdown
# <Tool Name> — Tool Spec

**Tool:** <Display Name>
**File:** `tools/<slug>/index.html`
**Status:** Live

## Purpose
<1-2 sentence purpose>

## Inputs
| Input | ID | Type | Range | Default |
|-------|----|------|-------|---------|
| ... rows for every input field, matching the actual element id ...

## <Outputs> (formulas section)
### Derived constants
\`\`\`
strokesPerSec = (RPM / 60) × rollers
flowRate_uLps = strokesPerSec × µLPerStroke
doseTime_i    = ceil(V_i / µLPerStroke) / strokesPerSec
\`\`\`
### Per-row / per-cycle calculations
\`\`\`
... explicit formulas ...
\`\`\`
### Feasibility checks
| Check | Condition | Fail label |
```
Adapt to phase 8's scheduling engine (flow-rate derivation, LPT grouping, fill/steady/drain cycle formula, rack-change convention) — write out the benchmark numbers (16.67s serial, 10s pipelined ceiling) as the "Known values at the current design point" section CLAUDE.md's SPEC.md standard requires, plus the D-07/A2/A3/A4 assumption footnotes RESEARCH.md flags (fill/drain cycle-count reading, rack-change-does-not-precede-rack-1 convention, rack changes as flat additive overhead).

---

### `index.html` (root) — new landing-page card

**Analog:** System Architecture Explorer card, `index.html:650-657` (most recently shipped tool card)

```html
<a href="tools/dispense-throughput-simulator/index.html" class="tool-card reveal" style="--rd: 0.5s;">
<div class="card-icon" aria-hidden="true">⏱</div>
<div class="card-body">
<h2 class="card-title" data-i18n="card-title-dispense-sim">Dispense Choreography &amp; Throughput Simulator</h2>
<p class="card-desc" data-i18n="card-desc-dispense-sim">Configure up to 6 liquids, per-pump flow parameters, and a concurrency slider to schedule a 6-nozzle indexing line dispensing into a 32-sample rack. Reports total run time, per-station Gantt, bottleneck station, and the A1-vs-A2 (lockstep vs. independent-rate) throughput delta — the empirical answer to whether the pump architecture needs true parallel dispensing.</p>
</div>
<span class="card-link"><span data-i18n="card-link-tool">Open tool</span><span class="arrow" aria-hidden="true">→</span></span>
</a>
```
Notes:
- `card-icon` emoji: pick something distinct from existing icons (⚙ 🧫 〰 🔌 ⬡ 🗓 already used) — e.g. ⏱ or ⏳ (throughput/timing theme).
- Increment `--rd` (reveal delay) to the next stagger step after the last card in whichever section it's placed in (Tools section currently ends at `0.42s` for the GSD card, `index.html:658`).
- If this tool warrants its own EN i18n strings, add `card-title-dispense-sim`/`card-desc-dispense-sim` keys to the landing page's own `LANG` object (root `index.html` has its own i18n system separate from rotor-solver's) — check whether the landing page requires `data-i18n` on every card (it does, per every existing card) — IT translation should follow the same convention if the site's i18n coverage is meant to stay complete; confirm scope with planner (this repo's landing page is bilingual, unlike thesis-timeline/system-architecture-explorer which are English-only tool pages).
- Decide section placement: Tools grid (`section-index 01`, i18n key `section-label-tools`) is the more likely fit given this is a computational solver like rotor-solver/system-architecture-explorer, not a roadmap/deck.

---

### `README.md` (root) — new tool-table row

**Analog:** System Architecture Explorer row, `README.md:19`

```markdown
| [Dispense Choreography & Throughput Simulator](tools/dispense-throughput-simulator/index.html) | Configure up to 6 liquids and pump flow parameters, then schedule a 6-nozzle indexing line (32-sample rack) at a chosen concurrency (1…N). Row-per-station Gantt with bottleneck highlight; headline metrics for total run time, bottleneck station, A1 (lockstep) vs A2 (independent-rate) time saved, and throughput. Illustrative rack-indexing animation. | ✅ Live |
```
Insert as a new row in the `| Tool | Description | Status |` table (`README.md:13-22`), after the System Architecture Explorer row (chronological/most-recent-last convention this table already follows) and before the Prototype Design Space row — or append last, matching whichever ordering convention the planner confirms (current table appears roughly ship-order).

---

### `ROADMAP.md` (root) — Shipped table entry

**Analog:** System Architecture Explorer row, `ROADMAP.md:18`

```markdown
| Dispense Choreography & Throughput Simulator | Cocktail-pipeline scheduler for a 6-nozzle linear indexing line (8×4-sample rack). Concurrency slider 1…N with A1/A2 endpoint markers, lockstep-vs-independent mode toggle, stroke-quantized dose timing (rollers×µL/stroke×RPM), full wall-clock accounting (fill/steady/drain + rack changes). Row-per-station Gantt (steady-state window), bottleneck highlight, A1-vs-A2 time-saved headline, illustrative rack-indexing animation. Answers U5 (does the architecture need per-motor independent rates) empirically. | |
```
Add to the `## Shipped` table (`ROADMAP.md:9-19`) as a new row; remove/do not add a `## Planned` row since this phase goes straight to shipped-on-completion (matches how System Architecture Explorer and prior tools were logged — the `## Planned` table's placeholder row, line 26, stays empty as-is).

---

### `CLAUDE.md` — folder-structure block

**Analog:** the `tools/system-architecture-explorer/` entry already in CLAUDE.md's folder tree

```
│   └── dispense-throughput-simulator/
│       ├── index.html      Dispense Choreography & Throughput Simulator — configurable 6-liquid cocktail-pipeline
│       │                   scheduler for a 6-nozzle indexing line (32-sample rack); concurrency slider with A1/A2
│       │                   endpoint markers, lockstep/independent mode toggle, row-per-station Gantt, bottleneck +
│       │                   A1-vs-A2 delta + throughput headline metrics, illustrative rack animation
│       └── SPEC.md         Tool spec — liquid/flow inputs, scheduling formulas (dose-time, LPT grouping, fill/
│                            steady/drain cycle count), rack-change convention, benchmark, assumptions
```
Insert alphabetically or ship-order (existing tree is NOT strictly alphabetical — `rotor-solver`, `gsd-workflow-guide`, `thesis-timeline`, `peristaltic-tensioned-path-model`, `peristaltic-roller-displaced-volume-model`, `system-architecture-explorer` — appears to be ship-order); append after `system-architecture-explorer/` block, matching that convention.

## Shared Patterns

### Design tokens / glass panel (import only, no edits)
**Source:** `assets/style.css`
**Apply to:** `tools/dispense-throughput-simulator/index.html` (`<link rel="stylesheet" href="../../assets/style.css" />` in `<head>`, matching every existing tool page)
No excerpt needed — this file is imported unchanged, per CLAUDE.md hard rule ("the shared resources between pages are `assets/style.css`..."). Tool-specific `.glass-panel`/`.panel-title`/`.mc`/`.stat` CSS is re-declared inline per tool (rotor-solver and thesis-timeline both re-declare their own copies of these classes locally rather than relying on shared definitions beyond the CSS custom properties `--accent`, `--text`, `--text-muted`, `--radius` from `style.css`) — follow the same inline-redeclare convention, do not attempt to add these classes to the shared stylesheet.

### `← All tools` nav bar
**Source:** `tools/thesis-timeline/index.html:397-400` (cleanest, no-i18n version)
**Apply to:** `tools/dispense-throughput-simulator/index.html`
```html
<nav class="tool-nav" aria-label="Breadcrumb">
  <a href="../../index.html">← All tools</a>
  <span>Dispense Choreography &amp; Throughput Simulator</span>
</nav>
```

### `fade-up`/reveal entrance animation
**Source:** `assets/style.css` (`.animate-in`/`--delay` custom property, used throughout rotor-solver e.g. `tools/rotor-solver/index.html:311,315,357,359,388,404`)
**Apply to:** every major panel/section in the new tool, staggering `--delay` (e.g. `0s`, `0.12s`, `0.22s`, `0.32s`, `0.37s`, `0.42s` — rotor-solver's own stagger sequence is a ready-made cadence to copy).

### `prefers-reduced-motion` guard for the D-12 rack animation
**Source:** RESEARCH.md's own code example (already verified against repo convention: `assets/deck.css`/`assets/deck.js` and the landing page's hero motif both guard reduced-motion)
```css
@media (prefers-reduced-motion: reduce) {
  .rack-track { animation: none; }
}
```
**Apply to:** the D-12 illustrative rack-indexing `@keyframes`/`steps()` animation — no analog file excerpt beyond this convention exists in a *tool* page yet (deck.css/landing page are the only current holders of this guard), so this is a cross-cutting convention to extend into a plain tool page for the first time.

### No-CDN / vendored-only constraint
**Source:** CLAUDE.md ("No CDN-only dependencies") + RESEARCH.md's explicit ruling out of GSAP reuse
**Apply to:** the entire new tool — Gantt, engine, and animation must all be hand-built CSS/SVG/vanilla JS; GSAP (`assets/gsap/gsap.min.js`) is a landing-page-only, page-scoped exception and must NOT be referenced from this tool.

## No Analog Found

None — every distinct concern in this phase (input panel, engine, Gantt, breakdown function, animation, SPEC.md, and all four integration-edit files) has a direct or composite analog already shipped in this codebase. The one genuinely novel element — the D-12 rack-indexing SVG/CSS animation — has no *tool-page* precedent for the animation content itself (only the `prefers-reduced-motion` guard convention carries over from `assets/deck.css`/landing page), but RESEARCH.md's own worked CSS `@keyframes`/`steps()` example (reproduced above) is sufficient to build from; this is flagged here for visibility, not because planning is blocked.

## Metadata

**Analog search scope:** `tools/rotor-solver/`, `tools/thesis-timeline/`, `tools/system-architecture-explorer/`, `tools/peristaltic-roller-displaced-volume-model/` (SPEC.md convention only), root `index.html`, `README.md`, `ROADMAP.md`, `CLAUDE.md`, `assets/style.css` (import-only reference)
**Files scanned:** 9 (full reads: rotor-solver/index.html [819 lines], thesis-timeline/index.html [701 lines], root index.html [targeted, lines 620-696], README.md [54 lines], ROADMAP.md [39 lines], rotor-solver/SPEC.md [targeted, lines 1-60]; targeted reads: system-architecture-explorer/index.html `pinsOf()`/`periphOf()` lines 1261-1330, nav bar lines 497-498, `hide-sm` grep hits)
**Pattern extraction date:** 2026-07-20
