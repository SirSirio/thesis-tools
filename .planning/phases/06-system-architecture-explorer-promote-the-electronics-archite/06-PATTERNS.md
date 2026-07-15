# Phase 6: System Architecture Explorer - Pattern Map

**Mapped:** 2026-07-15
**Files analyzed:** 10 (2 new, 6 modified, 1 deleted, 1 optional/discretionary)
**Analogs found:** 10 / 10

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `tools/system-architecture-explorer/index.html` (create, promoted) | component (tool page: view + inline calc engine) | CRUD (editable prices) + transform (cost/pin aggregation) + event-driven (row click → redraw) | `prototypes/System-Architecture/index.html` (engine, exact — being moved) · `tools/rotor-solver/index.html` (live SVG + localStorage, exact) · `tools/peristaltic-roller-displaced-volume-model/index.html` (two-part theory/interactive layout, exact) | exact (three-way composite) |
| `tools/system-architecture-explorer/SPEC.md` (create) | config/doc | — | `tools/rotor-solver/SPEC.md` | exact |
| `index.html` (repo root, modify — new card) | component (static HTML fragment) | — | same file, existing `.tool-card` blocks (e.g. lines 306-330) | exact (self-analog) |
| `README.md` (modify — tool table row) | config/doc | — | same file, existing table rows (lines 15-21) | exact (self-analog) |
| `ROADMAP.md` (repo root, modify — Shipped row) | config/doc | — | same file, existing Shipped table (lines 9-17) | exact (self-analog) |
| `CLAUDE.md` (modify — folder structure) | config/doc | — | same file, existing `tools/<slug>/` entries in the folder tree | exact (self-analog) |
| `prototypes/System-Architecture/ARCHITECTURE.md` (modify — trim to pointer) | doc (design record) | — | its own current line 110 (`See the diagram in index.html`) — the pointer idiom this phase resolves and extends | role-match |
| `prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md` (modify — trim to pointer) | doc (design record) | — | `prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md` (design-study doc, not `proto-NN`, precedent for "study folder stays, feeds a canonical tool/decision elsewhere") | role-match |
| `prototypes/System-Architecture/SOLUTION-MATRIX.md` (modify — trim to reference snapshot) | doc (design record → reference view) | — | same precedent as above; D-08's "tool computes, doc snapshots" pattern has no exact prior instance in-repo — closest is the ARCHITECTURE.md→index.html pointer relationship | role-match |
| `prototypes/System-Architecture/index.html` (delete after move) | — | — | — | n/a (deletion, not creation) |
| `prototypes/PROTOTYPES.md` (optional — cross-link row) | doc (registry) | — | its own "Architecture studies (not part of the proto-NN streak)" table (lines 39-43) — already the exact row-shape for a study folder like `System-Architecture/` | exact (if planner adds a row) |

## Pattern Assignments

### `tools/system-architecture-explorer/index.html` (component, CRUD + transform + event-driven)

This file is a **move-and-upgrade of three source patterns**, not a from-scratch build. Do not re-derive any of these — copy them.

---

**1. Source engine to move verbatim — `prototypes/System-Architecture/index.html`**

The entire cost engine, data model, and matrix rendering is unchanged in spirit; only the design tokens and localStorage persistence are new. Full file read (310 lines) — key excerpts:

Data model (lines 140-166):
```javascript
const DEFAULTS = {
  esp32:{label:'ESP32 dev board', role:'brain / fused controller', eur:5},
  rp2040:{label:'RP2040 (Pico)', role:'6-parallel node (PIO)', eur:4},
  // ... 14 more component entries ...
  screen:{label:'ILI9341 3.2" touch', role:'screen (174 DKK)', eur:23, shared:1},
};
const COMP = JSON.parse(JSON.stringify(DEFAULTS));
const SHARED_BOM = {stepperNema:6, screen:1, nano:1, drv8825:1, align28byj:1, alignMot2:1};
const VARIANTS = [
  {id:'S1-i2c', at:1, driver:'DRV8825', dk:'dumb', b:'I²C', c:'STEP/DIR shared+EN', cx:1,
    bom:{esp32:1,drv8825:6,carrier:1,psu60:1}, note:'Cheapest. ESP32 fused, ...'},
  // ... 16 more variant rows ...
];
```

Cost aggregation — the pattern to mirror for the new `pinsOf(v)` function (D-09):
```javascript
function costOf(v){
  let sum=0;
  for(const k in v.bom) sum += (COMP[k]?.eur||0)*v.bom[k];
  if(includeShared) for(const k in SHARED_BOM) sum += (COMP[k]?.eur||0)*SHARED_BOM[k];
  return sum;
}
```

Matrix render + row-click expand (existing precedent for D-02's "click row selects" — currently toggles a detail row; extend to also drive `buildDiagram(v)`):
```javascript
rows.forEach(o=>{
  const v=o.v, dc = v.dk==='dumb'?'drv-dumb':v.dk==='smart'?'drv-smart':'drv-motion';
  const tr=document.createElement('tr'); tr.className='vrow';
  tr.innerHTML=`<td><b>${v.id}</b></td>...<td class="cost">€${o.cost.toFixed(1)}</td>`;
  const det=document.createElement('tr'); det.className='detail hidden';
  det.innerHTML=`<td colspan="7">${bomHtml(v)}</td>`;
  tr.addEventListener('click',()=>det.classList.toggle('hidden'));
  body.appendChild(tr); body.appendChild(det);
});
```
`bomHtml(v)` (lines 276-285) builds the expandable BOM breakdown table from `v.bom` — reuse unchanged, and call `buildDiagram(v)` alongside it in the same click handler for D-02/D-03.

Number-input validation idiom already in this file (Security V5, reuse as-is):
```javascript
// lines 236-237
const k=e.target.dataset.k, cur=e.target.dataset.cur, val=parseFloat(e.target.value)||0;
if(cur==='eur') COMP[k].eur=val; else COMP[k].eur=val*rate;
```

---

**2. Live variant-driven SVG diagram — `tools/rotor-solver/index.html` `buildFigure()` (lines 574-668)**

This is the D-01/D-03 diagram's structural template: a pure function that takes a plain-object geometry/state snapshot and a fixed pixel viewport, and returns an SVG template string (rebuild-on-every-change, not persistent DOM mutation).

```javascript
// Source: tools/rotor-solver/index.html:574-577, 667-668
function buildFigure(g, L) {
  const cx = 380, cy = 300;
  const OUTER = 165;                       // outer roller-edge radius in px (fixed → figure always fits)
  const scale = OUTER / (g.R + g.rollerR);
  // ... trig-positioned nodes (cosd/sind helpers, lines 571-572), template-string SVG assembly ...
  return `<svg viewBox="0 0 760 600" width="100%" style="max-width:660px;height:auto;" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
}
```
Label/status pattern to mirror for the diagram's per-layer captions and the pin-budget "OVERRUN" flag (lines 655-665):
```javascript
let stxt, scol;
if (g.feasible) { stxt = `${g.N} ${L['fig-rollers']} · ${L['feas-yes']}`; scol = tube; }
else {
  const r = [];
  if (g.arcGap <= 0) r.push(L['feas-overlap']);
  if (g.hubClr <= 0) r.push(L['feas-boss']);
  if (!g.tubeOK)     r.push(L['feas-tube']);
  stxt = `${g.N} ${L['fig-rollers']} · ✗ ${r.join(', ')}`; scol = bad;
}
```
**Recommendation for this tool (per RESEARCH.md):** 4-5 hand-authored template layouts keyed by topology class (fused-single-node · +1-satellite-node · +6-satellite-nodes · printer-board), not fully generic layout from `bom` iteration — same spirit (data-driven redraw) but fixed node *positions* per class.

`prefers-reduced-motion` guard (no existing tool has this — new pattern to add):
```css
@media (prefers-reduced-motion: no-preference) {
  #sysDiagram svg { transition: opacity 0.15s ease; }
}
```

---

**3. localStorage try/catch idiom (D-06) — `tools/rotor-solver/index.html:536,547`**

Site-wide established pattern; reuse verbatim with new key names (`sae-prices` / `sae-rate` per CONTEXT.md, final name is planner's call):
```javascript
let currentLang = 'en';
try { currentLang = localStorage.getItem('lang') || 'en'; } catch(e) {}
// ... later, on change:
try { localStorage.setItem('lang', lang); } catch(e) {}
```
Applied shape for this tool (from RESEARCH.md, matches the idiom exactly):
```javascript
function loadPersisted() {
  try {
    const saved = JSON.parse(localStorage.getItem('sae-prices'));
    if (saved) for (const k in saved) if (COMP[k]) COMP[k].eur = saved[k];
    const savedRate = parseFloat(localStorage.getItem('sae-rate'));
    if (!isNaN(savedRate)) rate = savedRate;
  } catch(e) {}
}
function persist() {
  try {
    const snap = {}; for (const k in COMP) snap[k] = COMP[k].eur;
    localStorage.setItem('sae-prices', JSON.stringify(snap));
    localStorage.setItem('sae-rate', String(rate));
  } catch(e) {}
}
```
**Validation note (Security V5/V6):** validate restored values are finite numbers before assigning to `COMP[k].eur` (guard against hand-edited localStorage JSON) — extend the existing `parseFloat(...)||0` idiom rather than adding a schema library.

---

**4. Two-part theory → interactive page layout (D-04) — `tools/peristaltic-roller-displaced-volume-model/index.html`**

Full structural read (1343 lines; relevant sections at lines 1-120 for CSS tokens/classes, 350-470 for Part 1 opening, panel-title/glass-panel markers at 590-591, 682, 944-945).

Nav bar + header (lines 356-376):
```html
<nav class="tool-nav animate-in" style="--delay:0s">
  <a href="../../index.html">← Resources</a>
  <span>Peristaltic Occlusion Model</span>
</nav>
<main class="tool-main">
  <header class="tool-header animate-in" style="--delay:0.05s">
    <div class="section-label">Thesis Tool — Modular Liquid Dispensing · Proto 1</div>
    <h1>Peristaltic Roller Occlusion<br>&amp; Displaced-Volume Model</h1>
    <p> ... two-sentence scope statement ... </p>
  </header>
```

Part divider + theory card (lines 381-394, CSS at 54-70 and 86-108):
```html
<div class="part-label animate-in" style="--delay:0.08s">
  <span class="num">Part 1</span>
  <h2>Tube Cross-Section — The Stadium Model</h2>
</div>
<p class="part-summary animate-in" style="--delay:0.095s"> ... one-paragraph scope ... </p>
<div class="theory-card animate-in" style="--delay:0.11s">
  <div class="theory-section">
    <h3>Purpose &amp; Motivation</h3>
    <p> ... </p>
  </div>
  <div class="theory-section">
    <h3>Symbols</h3>
    <table class="sym-table"> ... </table>
  </div>
</div>
```
`.part-label .num` CSS (pill badge, lines 59-66):
```css
.part-label .num {
  font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--accent);
  background: rgba(255,107,43,0.10);
  border: 1px solid rgba(255,107,43,0.28);
  padding: 4px 13px; border-radius: 100px;
}
```
Interactive calculator panel anchor for deep-linking (line 944, already linked-to from `rotor-solver`'s ΔArc field):
```html
<div class="glass-panel animate-in" id="calculator" style="--delay:0.24s">
  <div class="panel-title">Interactive Calculator — Displaced Volume &amp; Arc Compensation</div>
  ...
</div>
```
**Recommendation:** Part 01 = "The Three Comms Layers & The Driver Insight" (theory: reuses `.theory-card`/`.theory-section` for the A/B/C layer breakdown, the "driver matters more than MCU" argument, and the U5 concurrency axis). Part 02 = "Solution Matrix & System Diagram" (interactive: existing engine + new diagram, `id="calculator"`-style anchor e.g. `id="matrix"`). Section order is Claude's discretion per CONTEXT.md.

This tool **skips the KaTeX include** (lines 8-11 of the displaced-volume-model) — no LaTeX math is needed for cost/BOM reasoning, and RESEARCH.md confirms no new shared/CDN assets should be introduced.

---

### `tools/system-architecture-explorer/SPEC.md` (doc)

**Analog:** `tools/rotor-solver/SPEC.md` (full read, 177 lines) — copy this section structure:

```markdown
# <Tool Name> — Tool Spec

**Tool:** ...
**File:** `tools/.../index.html`
**Status:** ...

## Purpose
## Inputs
| Input | ID | Type | Range | Default |
## Outputs (formulas as fenced code blocks, e.g.)
```
A         = π × (ID/2)²             — tube cross-section area (mm²)
```
## Feasibility checks (table: Check | Condition | Fail label)
## Diagram section (rendering notes: which function draws it, fixed-size rationale)
## Known values at current design point (table)
## Assumptions (bullet list)
## Language support (state explicitly: English-only per site precedent for post-i18n tools)
```
For this tool, adapt to: Purpose · Component price table (with source/confidence columns per D-07/D-11) · 17 variant BOMs · three comms layers (A/B/C) · pin-budget model + assumptions (D-09, flag the screen SPI/parallel ambiguity as `checkpoint:human-verify` per RESEARCH.md) · power/PSU model (60W/150W) · cost-model assumptions (SC-5) · confidence-tag legend (High/Medium/Low, D-11).

---

### `index.html` (repo root) — landing card (component, static)

**Analog:** its own existing `.tool-card` blocks. Full relevant read (lines 280-410, 159-260 for CSS).

Exact markup to copy and adapt (lines 306-313, using the `tool-card` — not `--wide` — variant since this tool has a compact single-purpose description like rotor-solver):
```html
<a href="tools/rotor-solver/index.html" class="tool-card reveal" style="--rd: 0.1s;">
<div class="card-icon" aria-hidden="true">⚙</div>
<div class="card-body">
<h2 class="card-title" data-i18n="card-title-rotor">Peristaltic Rotor Geometry Solver</h2>
<p class="card-desc" data-i18n="card-desc-rotor">...</p>
</div>
<span class="card-link"><span data-i18n="card-link-tool">Open tool</span><span class="arrow" aria-hidden="true">→</span></span>
</a>
```
Section wrapper conventions (lines 296-305): each card sits inside a `<section aria-label="...">` with a numbered `.section-head` (`<span class="section-index">01</span>`) and a `.section-desc` paragraph. Placement decision (which section, or a new "Decision tools" section) is Claude's discretion — CONTEXT.md flags the landing-page redesign itself as out of scope, so the safest move is adding one more card to an existing grid (per RESEARCH.md's Deferred Ideas note).

**Note:** this tool is English-only (no `data-i18n` dictionary entries needed in the card, matching the displaced-volume-model precedent cited in RESEARCH.md's Established Patterns) — but the *landing page itself* is bilingual, so the card's own text nodes should still work without a `data-i18n` key (plain static text, like the `prototypes/index.html` card's fallback pattern) or a new EN/IT pair should be added to the landing page's own `LANG` dictionary if consistency is preferred. Planner should check `index.html`'s LANG object for the existing key-naming convention (`card-title-*`, `card-desc-*`, `card-link-*`) before deciding.

---

### `README.md`, `ROADMAP.md`, `CLAUDE.md` — doc updates (self-analog)

**README.md** — copy the existing table-row shape (lines 15-21), one sentence-dense paragraph per tool covering capability + notable interactive elements + interface language, terminated `| ✅ Live |`.

**ROADMAP.md** (repo root) — copy the existing `## Shipped` table shape (lines 9-17), same one-line-per-feature-cluster density (this tool likely needs 1-2 rows given the diagram + pin-budget additions are separable capabilities, mirroring how rotor-solver got 3 rows for its 3 major additions).

**CLAUDE.md** — add a `tools/system-architecture-explorer/` entry to the folder tree in the same shape as the other `tools/<slug>/` entries (see the file's own folder structure block, which already documents `tools/rotor-solver/`, `tools/peristaltic-roller-displaced-volume-model/`, etc. with one-line purpose comments per file).

---

### `prototypes/System-Architecture/{ARCHITECTURE,PUMP-CONTROL-CONCEPTS,SOLUTION-MATRIX}.md` — trim to pointers (doc)

**Primary analog — the exact idiom this phase extends:** `ARCHITECTURE.md:110`
```markdown
See the diagram in [index.html](index.html).
```
This becomes, after the move: `See the live diagram in the [System Architecture Explorer](../../tools/system-architecture-explorer/index.html#matrix)` (exact anchor id is Claude's discretion) — same one-line pointer shape, corrected target path (Pitfall 2 in RESEARCH.md: both folders are 2 levels deep, so only the *inter-file* link changes, not the `../../assets/` depth).

**Secondary analog — design-study folder that stays put, doc content that isn't duplicated elsewhere:** `prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md` (329 lines) is the in-repo precedent for "a study folder under `prototypes/` that is *not* a `proto-NN`, feeds a downstream artifact, and keeps its own raw exploration content." The System-Architecture docs should follow the same shape: keep audit-trail content with no home in the tool (open questions U5/screen-type/physical-layout, the "different Arduino per pump" verdict) and trim only the passages that duplicate the tool's new theory section.

**D-08's specific ask** (SOLUTION-MATRIX.md becomes "human-readable snapshot, tool is authoritative") has no exact prior instance in-repo — closest is the ARCHITECTURE.md→index.html pointer above, generalized to a full table snapshot with an explicit "the live tool computes these; this is a reference view" preface sentence.

---

## Shared Patterns

### Design tokens — adopt `assets/style.css`, do not redefine
**Source:** `assets/style.css:3-12`
```css
:root {
  --bg:           #0a0a0c;
  --accent:       #ff6b2b;
  --accent-2:     #e83535;
  --accent-glow:  rgba(255, 107, 43, 0.25);
  --glass-bg:     rgba(255, 255, 255, 0.04);
  --glass-border: rgba(255, 107, 43, 0.18);
  --text:         #f0ece8;
  --text-muted:   #7a7068;
  --radius:       16px;
  --font:         -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}
```
**Apply to:** `tools/system-architecture-explorer/index.html` — the current source file redefines its own `:root` (`--bg`, `--card`, `--line`, `--txt`, `--mut`, `--acc`, `--red` at `prototypes/System-Architecture/index.html:8-9`). Map old→new during the reskin: `--card`→`--glass-bg`, `--line`→`--glass-border`, `--txt`→`--text`, `--mut`→`--text-muted`, `--acc`→`--accent`, `--red`→`--accent-2`. Delete the old `:root` block entirely; `<link rel="stylesheet" href="../../assets/style.css" />` supplies the tokens (see `tools/rotor-solver/index.html:7`).

### Tool-page nav bar (`← All tools` / `← Resources`)
**Source:** `tools/peristaltic-roller-displaced-volume-model/index.html:356-359` and `tools/rotor-solver/index.html:311`
```html
<nav class="tool-nav animate-in" style="--delay:0s">
  <a href="../../index.html">← Resources</a>
  <span>Peristaltic Occlusion Model</span>
</nav>
```
**Apply to:** every tool page, including this one — standard chrome, verbatim structure with the `<span>` text swapped to the new tool's short name.

### localStorage try/catch
**Source:** `tools/rotor-solver/index.html:536,547` — see full excerpt under Pattern Assignments above.
**Apply to:** all price/rate persistence (D-06) in `tools/system-architecture-explorer/index.html`.

### Number input validation (Security V5)
**Source:** `prototypes/System-Architecture/index.html:236-237` (`parseFloat(e.target.value)||0`) and `tools/rotor-solver/index.html:680` (`Math.max(1, Math.min(25, vol))`)
**Apply to:** price fields, DKK↔EUR rate field, and any new pin-count/RAM fields exposed as editable inputs — guard `NaN`/negative before use, matching existing idiom rather than introducing validation library.

### XSS-safe rendering for user-typed text (new risk surface, D-07)
**Finding (RESEARCH.md Security Domain):** every existing `innerHTML` call in `prototypes/System-Architecture/index.html` (`bomHtml()`, `renderComps()`, `renderMatrix()`) builds HTML from *code-controlled* data (component labels, fixed strings) — never from free text a user typed into an `<input>`. The new D-07 source-note field is the **first genuinely user-typed string** rendered into the DOM.
**Apply to:** if the source-note/URL field is rendered via `innerHTML` template strings (matching the file's existing style), escape it first or set it via `textContent` on a dedicated node rather than interpolating raw into the template string — do not just copy the `bomHtml()`-style `${c.label}` interpolation unchanged for this one field.

## No Analog Found

None — every file in scope has at least a role-match analog in-repo. The two genuinely new capabilities (D-01/D-03 live diagram, D-09 pin-budget computation) are additive extensions of existing patterns (`buildFigure()`, `costOf()`) rather than unprecedented subsystems, per RESEARCH.md's Architectural Responsibility Map.

## Metadata

**Analog search scope:** `tools/`, `prototypes/System-Architecture/`, `prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/`, `prototypes/PROTOTYPES.md`, `index.html` (repo root), `README.md`, `ROADMAP.md`, `CLAUDE.md`, `assets/style.css`
**Files scanned/read in full or targeted:** `prototypes/System-Architecture/index.html` (310 lines, full), `tools/rotor-solver/index.html` (819 lines, full), `tools/rotor-solver/SPEC.md` (177 lines, full), `tools/peristaltic-roller-displaced-volume-model/index.html` (1343 lines, targeted: 1-120, 350-470), `index.html` repo root (546 lines, targeted: 1-60, 280-410), `README.md` (53 lines, full), `ROADMAP.md` (38 lines, full), `prototypes/PROTOTYPES.md` (68 lines, full), `prototypes/System-Architecture/ARCHITECTURE.md` (targeted: 95-117), `assets/style.css` (targeted: token grep)
**Pattern extraction date:** 2026-07-15
