# Phase 6: System Architecture Explorer - Research

**Researched:** 2026-07-15
**Domain:** Static-site interactive tool promotion (vanilla HTML/CSS/JS) + hobby-electronics BOM/pin-budget sourcing (ESP32/RP2040/STM32 ecosystem, bitbyg.dk vendor catalogue)
**Confidence:** MEDIUM — the code-promotion side is HIGH (precedent tools in-repo are exhaustively read); the hardware-sourcing side (D-09/D-10/D-12) is MEDIUM-to-LOW because it depends on a single small Danish hobby vendor's incomplete listings and generic-MCU tutorials rather than datasheets

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**System diagram (new capability — the "Explorer" in the name)**
- **D-01:** The tool gains a **live, variant-driven SVG system diagram**. It is the thing the table genuinely cannot say, and it honours the promise already written in `ARCHITECTURE.md:110` ("See the diagram in index.html") which today points at a diagram that does not exist (only a text note block is there).
- **D-02:** **Selection = click a matrix row.** The matrix stays the primary interface. Clicking a row selects it (row highlights, diagram redraws for that variant, BOM breakdown expands as it does today). One click, one architecture, no second control to keep in sync. (Dropdown and "follow-cheapest-row" were both considered and rejected — avoids duplicate state.)
- **D-03:** The diagram shows **comms layers + power rails**: Layer A (brain↔screen, SPI/parallel, fixed), Layer B (system bus I²C/RS-485/CAN, drawn with the variant's real node count), Layer C (per-variant pump-controller topology + the 6 driver→motor links), Alignment node (own MCU, constant), Power block (PSU sized 60W vs 150W, 12V/24V dual rail, common ground).

**Page anatomy (two-part tool)**
- **D-04:** Two-part page, mirroring `tools/peristaltic-roller-displaced-volume-model/`: reasoning/theory section first (three comms layers, "the *driver* matters more than the MCU" insight, U5 concurrency axis) — then the live matrix + variant diagram.
- **D-05:** The tool becomes canonical for the reasoning prose. The three `.md` records are trimmed to pointers for overlapping explanatory passages while keeping raw exploration/audit-trail content that has no home in the tool (fixed components, open questions, the "different Arduino per pump" verdict).

**Price data lifecycle**
- **D-06:** Persist edited prices + the DKK→EUR rate in localStorage, restored on load, all access wrapped in try/catch (mirrors the site's `lang` handling). Existing Reset button clears back to DEFAULTS. Use a distinct localStorage key — NOT `lang` (e.g. `sae-prices` / `sae-rate` — planner to finalise the key name).
- **D-07:** Add an optional per-component source field (vendor URL and/or a short price note) shown in the component table, paired with a confidence tag (D-11). bitbyg.dk is the default sourcing vendor. The owned screen (ILI9341, the specific bitbyg listing, 174 DKK ≈ €23) is the highest-confidence, sourced anchor; other parts start as Low/estimate until sourced.

**Source-of-truth split (data)**
- **D-08:** The tool's inline `<script>` is canonical for the data — `DEFAULTS`, `VARIANTS`, `SHARED_BOM` are the single source of truth. `SOLUTION-MATRIX.md`'s static table is trimmed to a human-readable snapshot that explicitly points to the tool as authoritative.

**Pin budget / connectivity feasibility (new evaluation axis)**
- **D-09:** Compute pins-free per variant. Data model gains, per brain/MCU, a usable-GPIO count and, per fixed load and per variant, the pins it consumes. Fixed loads (constant every variant): screen (SPI ~4 + DC/RST + touch CS/IRQ ~1-2) + LM75 on shared I²C (~0 extra once I²C exists). Variant loads: Layer-B bus transceiver pins, Layer-C driver links. Tool shows pins used/available/free per variant and flags overruns. This is the biggest new-data ask — MCU pin maps must be sourced (see D-11).

**Candidate hardware expansion**
- **D-10:** ESP32-with-integrated-screen boards are a candidate option class. Vendor (bitbyg) sells ESP32 boards with a display already integrated. Requires both bitbyg site searches AND general web searches to establish specs. Add as one or more variants once specs are established, each tagged with a confidence level (D-11).
- **D-12:** The MCU/brain model carries specs beyond pins — notably RAM and PSRAM. These set how fluid the on-screen GUI can be (framebuffer, redraw). Each brain candidate records RAM/PSRAM (and pin count) with the UI-fluidity implication noted.

**Sourcing & provenance**
- **D-11:** Every sourced fact carries a confidence level: High (datasheet/vendor page states directly), Medium (reputable secondary or near-identical variant), Low (estimate/forum/assumption). Applies to the researcher's findings AND to the tool's displayed data. Default prices and component availability pulled from bitbyg.dk first; variant set should lean toward what bitbyg actually stocks.

### Claude's Discretion
- Exact SVG drawing mechanics (generate nodes from the variant's `bom`/topology vs a small set of hand-authored template layouts switched by variant class); diagram placement (above vs below the matrix); redraw animation (must respect `prefers-reduced-motion`).
- Final localStorage key name(s) and the serialisation shape.
- How aggressively the two `.md` records are trimmed per-passage under D-05 — judge with the exact prose side by side, but the *direction* (tool canonical, records → pointers) is locked.
- Exact structure/section order of the reasoning half under D-04.
- Whether the source field (D-07) is a URL, a note, or both per row.

### Deferred Ideas (OUT OF SCOPE)
- **URL-encoded shareable price state** (`#`-hash scenario links citable from the thesis) — considered under Area 3, deferred in favour of localStorage (D-06). Revisit only if a specific priced scenario needs to be cited by link.
- **"Follow the cheapest visible row" diagram mode** — considered for D-02, rejected in favour of explicit row-click; could return as a secondary readout.
- **Landing-page redesign for many tools** — stays out of scope here; the tool just adds one more card to the existing grid.
- **Sourcing all ~20 component prices with real vendor links** — D-07 adds the *field*; populating it beyond the ILI9341 is ongoing BOM work, not this phase.
</user_constraints>

<phase_requirements>
## Phase Requirements

REQUIREMENTS.md has no `ARCH-*` entries yet — the phase description says candidate IDs are TBD. The table below proposes IDs derived from the 6 ROADMAP success criteria plus the CONTEXT.md decisions that add genuinely new capability beyond "retain current behaviour." **The planner/requirements step should register these in `.planning/REQUIREMENTS.md` before or during planning** — treat the IDs below as a starting draft, not a locked contract.

| ID (proposed) | Description | Research Support |
|----|-------------|------------------|
| ARCH-01 | Tool lives at `tools/system-architecture-explorer/index.html` + co-located `SPEC.md`, adopts `assets/style.css` tokens (not its own `:root` block), standard `← All tools` nav bar | `tools/rotor-solver/index.html` and `tools/peristaltic-roller-displaced-volume-model/index.html` read in full as nav/chrome precedent; CSS custom-property names confirmed in `assets/style.css` |
| ARCH-02 | Tool reachable from landing-page card; listed in `README.md` tool table and repo-root `ROADMAP.md` | `index.html` card markup pattern extracted (icon-tile `.tool-card`/`.tool-card--wide`, i18n data attrs); README table format confirmed |
| ARCH-03 | Tool retains all current behaviour (editable BOM prices, DKK↔EUR converter, 17-variant matrix, sort/filter, expandable per-variant BOM, shared-block toggle) AND gains the D-01/D-02/D-03 live SVG diagram | Full existing `prototypes/System-Architecture/index.html` engine read (`DEFAULTS`, `VARIANTS`, `costOf`, `renderMatrix`, `bomHtml`); `tools/rotor-solver/index.html`'s `buildFigure()` read as the closest in-repo live-SVG-figure precedent |
| ARCH-04 | `prototypes/System-Architecture/` retains the three decision records, cross-linked both ways; no orphaned `index.html` | All three `.md` records read in full; `multi-liquid-architecture/` precedent (design-study folder, not `proto-NN`) and its `PROTOTYPES.md` registry row read as the pattern to mirror |
| ARCH-05 | `SPEC.md` documents component price table, 17 variant BOMs, three comms layers, cost-model assumptions | Existing `SOLUTION-MATRIX.md` component-price table and matrix are the direct source; `tools/peristaltic-roller-displaced-volume-model/SPEC.md`-style documentation pattern implied by co-located-spec convention (not read in full this session — planner should skim it for section headings) |
| ARCH-06 | `CLAUDE.md` folder structure updated; all logic/styles inline; no new shared files | Confirmed against `CLAUDE.md`'s current folder tree and "no new shared files" rule |
| ARCH-07 *(new capability, D-09)* | Data model computes pins-used/available/free per variant across Layer A (screen, fixed) + Layer B (bus) + Layer C (driver links); overruns flagged | See `## Pin Budget Research` below — MEDIUM/LOW confidence, vendor-listing ambiguity on the owned screen's interface is the critical blocker to resolve first |
| ARCH-08 *(new capability, D-10/D-12)* | ESP32-integrated-screen boards added as candidate variant(s); brain candidates record RAM/PSRAM with a UI-fluidity note | See `## Candidate Hardware (D-10) Research` and `## RAM/PSRAM (D-12) Research` below |
</phase_requirements>

## Summary

This phase is two research problems bolted together, and they have very different confidence profiles. The **code-promotion problem** (move `prototypes/System-Architecture/index.html` to `tools/system-architecture-explorer/`, reskin with `assets/style.css` tokens, add localStorage persistence, split into a two-part theory+interactive page) is well-supported: three in-repo precedent tools were read in full and give copy-paste-grade patterns for every sub-problem — the two-part layout (`peristaltic-roller-displaced-volume-model`), the live parametric SVG figure (`rotor-solver`'s `buildFigure()`), and the `lang`-key localStorage try/catch idiom already used site-wide. The existing 310-line cost engine (`DEFAULTS`/`VARIANTS`/`SHARED_BOM`/`costOf`/`bomHtml`) is a straight move, not a rewrite.

The **hardware-sourcing problem** (D-09 pin budgets, D-10 integrated-screen boards, D-12 RAM/PSRAM) is genuinely open and the single most important finding of this research session is a **contradiction on bitbyg's own product page for the owned screen**: the page is titled "SPI Touch Screen" but its body text describes the pin interface as "A0–A3 pins, D4–D13 pins, and I2C interface (D0–D3)" — phrasing that is the standard vendor description for the **8-bit-parallel Uno-shield class** of ILI9341 modules (MCUFRIEND-style), not true 4-wire SPI. This is not a researcher assumption; it is sourced directly from the vendor page and it directly reproduces the ambiguity CONTEXT.md flagged. Until this is physically resolved (continuity-test the board or find better documentation), **every pin-budget number in the tool is downstream of an unverified assumption**, and the difference between the two readings is roughly 6-10 pins (SPI) vs 13-21 pins (parallel + touch + SD) — enough to flip several 6-parallel variants from "fits on a bare ESP32" to "does not fit." The planner should treat pin-budget accuracy as inherently provisional and make the confidence tagging (D-11) load-bearing in the UI, not decorative.

On D-10, bitbyg does stock a genuine integrated ESP32+screen candidate — the **ESP32-2432S024** (2.4", resistive or capacitive touch variant) — and its product page states **9 available IO pins** directly (HIGH confidence, vendor's own words). This is a strong, sourced data point and should anchor the new variant(s). The commonly-cited "Cheap Yellow Display" (ESP32-2432S028, 2.8") is **not** in bitbyg's current catalogue — it surfaced only via general web search and should not be presented as bitbyg-sourced if included at all.

**Primary recommendation:** Move the cost engine unchanged, mirror the displaced-volume-model's two-part structure and the rotor-solver's parametric-SVG technique, keep D-09's pin-budget feature but ship it with a visible confidence marker per number (not just per component), and treat the screen-interface ambiguity as a blocking open question the planner should surface as a `checkpoint:human-verify` task before the pin-budget math is trusted in the shipped tool.

## Architectural Responsibility Map

This is a single-tier static site — there is no browser/server split, no API, no database. The "tiers" below map to responsibility *within* the one HTML file, which is the meaningful boundary for this phase.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Cost/BOM computation (`costOf`, `bomHtml`) | Inline `<script>` (moved as-is) | — | Already correct in the source file; D-08 makes this explicitly canonical |
| Price/rate persistence | Inline `<script>` + `localStorage` | — | Mirrors site's existing `lang` pattern (Browser tier, no server) |
| System diagram rendering (D-01/D-03) | Inline `<script>` (SVG string builder, `rotor-solver` pattern) | — | Client-side only; no external diagram library — matches "no CDN, no build tools" constraint |
| Matrix sort/filter/row-select (D-02) | Inline `<script>` + DOM | — | Existing pattern, unchanged |
| Pin-budget computation (D-09, new) | Inline `<script>`, new data fields on `DEFAULTS`/`VARIANTS` | — | Same engine, additive fields — not a new subsystem |
| Reasoning/theory prose (D-04/D-05) | Static HTML content | `.md` records (trimmed pointers) | Tool becomes canonical per D-05; `.md` files point in, not duplicate |
| Design-system tokens | `assets/style.css` (shared, imported) | — | The one sanctioned shared resource per CLAUDE.md |
| Cross-link chrome (nav, landing card) | Static HTML, per-page | `index.html` (root) | Standard tool-page convention, no new shared file |

## Standard Stack

### Core

No libraries. This is a vanilla-HTML/CSS/JS static site by hard project constraint (`CLAUDE.md`: "no build tools, no npm, no frameworks"). The entire "stack" for this phase is:

| Component | Version | Purpose | Why Standard (for this repo) |
|-----------|---------|---------|-------------------------------|
| Inline `<script>` (ES2017+ vanilla JS) | N/A | Cost engine, diagram builder, DOM rendering | Every existing tool in the repo uses this pattern; no exceptions except the deck runtime (`assets/deck.js`, not applicable here) |
| Inline `<style>` + `assets/style.css` | N/A | Layout + design tokens | Per CLAUDE.md, tool-specific styles are inline; only shared tokens come from `assets/style.css` |
| SVG (hand-built via template strings) | N/A | Live variant-driven system diagram | Matches `rotor-solver`'s `buildFigure()` — no canvas library, no D3, no CDN |

### Supporting

None. No charting library, no diagram library (e.g. Mermaid, D3) should be introduced — it would violate the no-CDN-without-local-fallback rule and there is no local-fallback precedent for such a library in this repo. The rotor-solver figure proves hand-built SVG is sufficient for this complexity level.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hand-built SVG diagram | Mermaid.js (local bundle) | Would need a new local-fallback asset (~500KB+), inconsistent with the site's zero-dependency precedent, and Mermaid's auto-layout doesn't easily express "comms layer + power rail" semantics the way a hand-tuned template can |
| localStorage | IndexedDB | Massive overkill for ~20 numbers + a rate; localStorage + try/catch is the established site pattern (`lang` key) |

**Installation:** None — no package manager, no install step. All code is written directly into `tools/system-architecture-explorer/index.html`.

## Package Legitimacy Audit

**Not applicable.** This phase installs zero external packages (no npm, no pip, no CDN scripts beyond what already exists in the repo). The Package Legitimacy Gate protocol is skipped by design — there is nothing to run `slopcheck` or a registry check against. If a future iteration considers adding a CDN library (e.g., for the diagram), that would be a new phase requiring this audit at that time.

## Architecture Patterns

### System Architecture Diagram

```
Component prices (editable)  →  COMP object (mutated live)
        │                              │
        ▼                              ▼
  compBody <table>            costOf(variant) ──► per-row €
        │                              │
        │                     stars(cx) / conPill(at)
        │                              │
        ▼                              ▼
   user edits price ──────────►  renderMatrix() ──► matrixBody <table>
        │                              │
        │                    [NEW] click row (D-02)
        │                              │
        │                              ▼
        │                    selectedVariant = v
        │                       ┌──────┴──────┐
        │                       ▼             ▼
        │                 bomHtml(v)   buildDiagram(v)  [NEW, D-01/D-03]
        │                 (existing,        │
        │                  expand row)      ▼
        │                          Layer A (fixed: ESP32↔screen SPI/parallel)
        │                          Layer B (variant bus: I²C/RS-485/CAN, N nodes)
        │                          Layer C (variant topology: driver↔motor links ×6)
        │                          + Alignment node (constant) + Power block (60W/150W)
        │
        ▼
[NEW] localStorage.setItem('sae-prices', …)  (D-06, try/catch, on every edit)
        │
        ▼
  on page load: try { restore from localStorage } catch { fall back to DEFAULTS }
```

A reader traces: edit a price → `costOf()` recomputes every variant → `renderMatrix()` re-sorts/filters → click a row → the diagram redraws for that variant's specific topology while Layer A and the power/alignment block stay visually constant (because they *are* constant in the underlying data).

### Recommended Project Structure

```
tools/system-architecture-explorer/
├── index.html      Two-part page: (1) theory section — comms layers, driver-vs-MCU
│                    insight, U5 concurrency axis; (2) live matrix + diagram + BOM.
│                    All CSS in <style>, all JS in <script>, both inline.
└── SPEC.md          Component price table, 17 variant BOMs, three comms layers,
                      pin-budget model + assumptions, cost-model assumptions (SC-5)
```

No `assets/` subfolder is needed here (unlike the KaTeX-dependent displaced-volume-model) — no external library, no offline-fallback asset to co-locate.

### Pattern 1: Two-part theory → interactive page (D-04)

**What:** A `.part-label` divider (`<span class="num">01</span><h2>…</h2>`) precedes each major section; theory content lives in `.theory-card` panels with `.theory-section h3` subheadings; the interactive calculator/matrix follows in a `.glass-panel` with `id="calculator"`-style anchor for deep-linking (the rotor-solver already links to `peristaltic-roller-displaced-volume-model/index.html#calculator`).

**When to use:** Any tool where a thesis reader arriving cold (e.g. via QR code) needs context before the controls make sense — exactly the D-04 rationale ("a thesis reader arriving via QR code sees a self-explanatory tool, not a table of 17 cryptic IDs").

**Example (from `tools/peristaltic-roller-displaced-volume-model/index.html:381-383`):**
```html
<!-- Source: tools/peristaltic-roller-displaced-volume-model/index.html -->
<div class="part-label animate-in" style="--delay:0.08s">
  <span class="num">01</span>
  <h2>Tube Cross-Section — The Stadium Model</h2>
</div>
```
Recommended for this tool: Part 01 = "The Three Comms Layers & The Driver Insight" (theory), Part 02 = "Solution Matrix & System Diagram" (interactive). Section order is Claude's discretion per CONTEXT.md.

### Pattern 2: Parametric live SVG figure (D-01/D-03)

**What:** `rotor-solver`'s `buildFigure(g, L)` builds an SVG as a template-string, driven entirely by a plain-object geometry snapshot (`g`) computed fresh on every `upd()` call — not a persistent DOM/canvas object graph. Positions are computed with trig helper functions (`cosd`/`sind`), fixed pixel constants (`cx`, `cy`, `OUTER`) keep the figure a constant size regardless of input, and a `scale` factor normalizes the real-world geometry into that fixed viewport.

**When to use:** Any tool needing a diagram that must redraw completely on state change without animation-state bugs (rebuild > mutate for this scale of complexity).

**Example (from `tools/rotor-solver/index.html:574-668`):**
```javascript
// Source: tools/rotor-solver/index.html
function buildFigure(g, L) {
  const cx = 380, cy = 300;
  const OUTER = 165;
  const scale = OUTER / (g.R + g.rollerR);
  // ... trig-positioned nodes, template-string SVG assembly ...
  return `<svg viewBox="0 0 760 600" width="100%" style="max-width:660px;height:auto;" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
}
```

**Recommendation for D-01/D-03's diagram:** The 17 variants collapse into a much smaller number of visually distinct *topology classes* (fused-single-node · +1-satellite-node [RP2040/STM32] · +6-satellite-nodes [distributed Pro-Mini] · printer-board-single-box). Rather than fully generative layout (deriving node positions from `bom` object shape at runtime — fragile, hard to keep readable), recommend a **small set of hand-authored template layouts keyed by topology class**, with per-variant *labels/counts* (bus type, node count, driver type, complexity) injected into the template — the same spirit as `buildFigure()` (data-driven redraw) but with fixed node *positions* per class rather than derived ones. This directly matches the CONTEXT.md "Claude's Discretion" framing of the tradeoff (generate-from-topology vs hand-authored templates) and is lower-risk given 4-5 classes vs 17 fully-generic layouts.

**`prefers-reduced-motion`:** No existing tool in this repo currently guards SVG redraws with this media query (`rotor-solver` redraws instantly, no transition). Recommend a CSS rule gating any diagram fade/transition:
```css
@media (prefers-reduced-motion: no-preference) {
  #sysDiagram svg { transition: opacity 0.15s ease; }
}
```
Default (no transition) satisfies the constraint trivially; only add motion if actually implemented, and gate it.

### Pattern 3: localStorage persistence with try/catch (D-06)

**What:** The site-wide `lang` pattern, generalized. Read `LANG.js`'s style but applied to numeric state.

**Example (established site pattern, e.g. `tools/rotor-solver/index.html:536,547`):**
```javascript
// Source: tools/rotor-solver/index.html (existing site-wide pattern)
let currentLang = 'en';
try { currentLang = localStorage.getItem('lang') || 'en'; } catch(e) {}
// ... later, on change:
try { localStorage.setItem('lang', lang); } catch(e) {}
```
**Applied to this tool (D-06, distinct keys — planner to finalize exact names, `sae-prices` / `sae-rate` suggested in CONTEXT.md):**
```javascript
// New pattern for this phase
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

### Anti-Patterns to Avoid

- **Redefining `:root` design tokens in the tool's own `<style>` block:** the current `prototypes/System-Architecture/index.html` does exactly this (its own `--bg`, `--acc`, `--txt` etc., lines 8-9). CONTEXT.md explicitly calls this out as a carried-forward Phase-4 D-16 problem to fix — the reskin must consume `assets/style.css`'s `--bg`, `--accent`, `--text`, `--text-muted`, `--radius` instead of shadowing them.
- **Fully-generic diagram layout from raw `bom` object iteration:** tempting (less code to maintain per-variant) but produces unreadable, inconsistent diagrams across 17 variants with very different node/edge topologies. The template-class approach (Pattern 2) trades a little more authored code for a diagram that's actually legible.
- **Treating "vendor page states it" as automatically HIGH confidence:** the owned-screen SPI/parallel contradiction (see Pin Budget Research below) shows a vendor page can state two contradictory things in the same listing. D-11's confidence scale should be applied to the *specific claim*, not the *source* wholesale.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Number formatting / currency conversion | A new formatting utility | The existing `rate`/`(COMP[k].eur/rate).toFixed(0)` pattern already in the source file | It already works, is tested by use, and D-08 makes the inline script canonical — no reason to rewrite |
| Cost aggregation across BOM + shared block | A new pricing engine | `costOf(v)` unchanged, extend only with pin-cost fields alongside `eur`/`role` on each `DEFAULTS` entry | Same reasoning shape (sum qty × unit value) applies directly to pin costs — adding a `pins` field and a parallel `pinsOf(v)` function mirrors `costOf(v)` exactly |
| SVG diagram interactivity/animation | A charting/diagramming library | Template-string SVG + vanilla event listeners (Pattern 2) | Zero-dependency constraint; `rotor-solver` proves this is sufficient at comparable visual complexity |
| Persisted state validation | A schema library (e.g. zod-like) | Plain `try/catch` + `typeof`/`isNaN` guards, matching the `lang` pattern's simplicity | This is a single-author static site with no user-supplied schema risk beyond malformed localStorage — a full validation library is disproportionate |

**Key insight:** Every "don't hand-roll" item in this phase actually reduces to "don't re-architect what's already correct in the source file being promoted" — this is fundamentally a move-and-extend phase, not a green-field build. The temptation to rewrite while reskinning should be resisted; D-08 makes this explicit for the data layer.

## Pin Budget Research (D-09)

**Confidence: LOW-MEDIUM overall.** Generic MCU pin-out facts are MEDIUM (cross-checked across several tutorial sources, not primary datasheets, in a single research session). The one HIGH-confidence data point is the D-10 integrated board's vendor-stated IO count. The screen-interface question is the critical blocker and is explicitly unresolved.

### Fixed loads (every variant)

| Load | Pins (SPI scenario) | Pins (8-bit parallel scenario) | Confidence | Source |
|------|---------------------|--------------------------------|------------|--------|
| ILI9341 3.2" screen — **owned, bitbyg listing** | SCK+MOSI+MISO+CS (4) + DC+RST (2) ≈ **6** | 8 data bits + RS/DC+CS+RD+WR+RST ≈ **13** | **LOW — contradictory vendor page** | `[CITED: bitbyg.dk product page]` — page title says "SPI Touch Screen"; page body says "uses A0~A3 pins, D4~D13 pins, and I2C interface, D0/D1/D2/D3 available" — the latter phrasing is the standard vendor description for **8-bit-parallel Uno-shield-class** ILI9341 modules, not true SPI. **This contradiction is the finding, not resolved by this research.** |
| Resistive touch (pen) | Shares SPI bus + T_CS + T_IRQ ≈ **+2** (if XPT2046-class SPI touch controller) | Often wired directly to spare analog pins (A0-A3-class, no separate controller) — **may already be counted in the 8-bit scenario's A0-A3 above**, i.e. **+0 extra** | **LOW** | `[CITED: bitbyg.dk]` — touch controller chip is not named on the product page; inferred from the "A0-A3" phrasing pattern common to this module class |
| LM75 temp sensor | I²C, addr 0x48 | I²C, addr 0x48 | **HIGH** for the sensor itself, but **+0 or +2** depending on whether an I²C bus already exists (shared with Layer B if I²C is the chosen system bus) | `[CITED: bitbyg.dk product page — "onboard temperature sensor"]` and `[CITED: ARCHITECTURE.md]` which independently states the same address |

**Recommendation:** Ship the tool with **both** scenarios computable (a single toggle or two pin-budget columns), clearly labeled "if SPI" / "if 8-bit parallel," rather than picking one silently. Flag this as a `checkpoint:human-verify` item for the planner — ideally resolved by physically checking the owned board's silkscreen/continuity before the tool ships with a single confident number.

### Brain/MCU candidates — usable GPIO, RAM, PSRAM

| Candidate | Chip GPIO | Board-usable (excl. strapping/flash/UART/input-only) | RAM | PSRAM | bitbyg price | Confidence |
|-----------|-----------|--------------------------------------------------------|-----|-------|---------------|------------|
| Generic ESP32 dev board (e.g. bitbyg "DOIT ESP32 30P IOT Mainboard") | 48 (chip) | 25 broken out on 30-pin board; **~10-15 realistically usable** after excluding 5 strapping pins (GPIO0,2,5,12,15), 6 flash pins (GPIO6-11), 4 input-only pins (34,35,36,39), UART0 (1,3) | 520 KB SRAM (on-chip) | 0 (standard WROOM-32 has none) | 67.50 DKK | MEDIUM — `[WebSearch: cross-checked across randomnerdtutorials.com, lastminuteengineers.com, circuitstate.com]`, not a primary Espressif datasheet page this session |
| bitbyg "ESP32 Devkitc V4 Wrover IB IPEX" | 48 (chip) | Similar to above (WROVER pinout differs slightly) | 520 KB SRAM | **8 MB (WROVER-class standard)** | 130.00 DKK | LOW-MEDIUM — PSRAM figure is `[ASSUMED]` from the WROVER module family's typical spec, not confirmed on this specific bitbyg listing text |
| RP2040 (e.g. Raspberry Pi Pico form factor, `DEFAULTS.rp2040`) | 30 (chip) | 26 broken out/usable on Pico-class boards | 264 KB SRAM | 0 (no PSRAM support on RP2040) | ~4 EUR (existing `DEFAULTS` estimate) | MEDIUM — `[WebSearch: cross-checked microcontrollerslab.com, deepbluembedded.com, Adafruit product page]` for GPIO count; RAM figure `[ASSUMED]` from well-known RP2040 datasheet spec, not re-verified this session |
| STM32 "Blue Pill" (STM32F103C8T6) | 37 (chip) | ~30 usable after USB/crystal/reset/boot exclusions | **20 KB SRAM** (notably small) | 0 | ~3 EUR (existing `DEFAULTS` estimate) | MEDIUM for GPIO `[WebSearch: microcontrollerslab.com, components101.com]`; RAM figure `[ASSUMED]`, well-known spec but not re-verified — **flag: 20KB is tight for anything beyond simple step generation, but this MCU never drives the screen in any variant, so it's a non-issue for D-12's UI-fluidity question** |
| Arduino Pro Mini (ATmega328P) | ~20 (14 digital D0-D13 + 8 analog A0-A7, A6/A7 analog-only) | ~18 usable (minus reserved RX/TX if serial needed) | **2 KB SRAM** | 0 | ~2.5 EUR (existing `DEFAULTS` estimate) | MEDIUM `[WebSearch: arduino.cc official page + richardelectronics.com, etechnophiles.com]` — **not a brain candidate** (no GUI capability, per-pump-node role only in P6-dist-* variants) |

### D-10 integrated-screen candidates (bitbyg-sourced)

| Candidate | Model | Screen | Touch | Free IO after display | RAM/Flash | Price | Confidence |
|-----------|-------|--------|-------|------------------------|-----------|-------|------------|
| **ESP32 LVGL WiFi/BT 2.4" LCD Touch TFT Module** | ESP32-2432S024 (R=resistive or C=capacitive variant) | 2.4" | Resistive or capacitive (variant-dependent) | **9 available IO ports** | 520 KB SRAM, 32 Mbit flash | 183.75–198.75 DKK | **HIGH** for the "9 IO ports" figure — `[CITED: bitbyg.dk product page, states directly]`. Display resolution and touch-controller chip **not stated** on the page — LOW for those |
| LiLyGo TTGO T-Display 16MB | ESP32 (base) | 1.14", 240×135, ST7789 IPS | **None** — no touch | Not stated | 520 KB SRAM, spec sheet says 4 MB flash (title says "16 MB" — internal contradiction on the page) | 177.50 DKK | MEDIUM — `[CITED: bitbyg.dk]` for existence/price; **disqualifying for this device** since the HMI needs touch input — retained here only as a documented "considered, rejected" note, not a recommended variant |
| *(reference only, NOT stocked by bitbyg)* Cheap Yellow Display, ESP32-2432S028(R), 2.8" | Not in bitbyg catalogue (`produkt-tag/esp32/` page enumerated — 12 products, this is not one of them) | 2.8", 320×240 | Resistive | Only **3 free GPIO** (22, 27, 35) after display+touch+SD+speaker+RGB LED | 520 KB SRAM, no PSRAM standard | N/A — not sold by bitbyg | MEDIUM `[WebSearch: espboards.dev, mischianti.org, GitHub witnessmenow/ESP32-Cheap-Yellow-Display]` for the third-party board's own specs; **do not present this as bitbyg-sourced** — included only to show how severely an integrated screen can eat GPIO, as context for interpreting the ESP32-2432S024 more cautiously (its own touch-controller pin cost is not itemized, so "9 free" should be treated as a floor, not a guarantee, until the exact wiring is confirmed) |

**bitbyg's full ESP32 catalogue (12 products, exhaustively enumerated 2026-07-15 via `produkt-tag/esp32/`):** ESP32 Beginner Starter Kit (299 DKK) · ESP32-S3 ETH PoE Cam board (286.25 DKK, no screen) · KinCony KC868-A8 relay module (636.25 DKK, not a brain candidate) · ESP32 LVGL 2.4" (above) · ESP32-C6-DevKitC-1 (123.75 DKK, RISC-V single-core — architecturally different, note if considered) · 18650 battery shield (48.75-86.25 DKK, power accessory not brain) · TTGO T-Display (above) · ESP32 Devkitc V4 Wrover IB IPEX (130 DKK) · DOIT ESP32 30P (67.50 DKK) · ESP32 USB-C IOT Core 38-pin (82.50 DKK) · LIVE D1 Mini ESP32 (82.50 DKK) · ESP32-CAM-CH340 (93.75 DKK, camera not display). **No bare ESP32-S3 dev board without Ethernet/camera/screen was found in the catalogue** — if a plain ESP32-S3 (for its extra PSRAM/GPIO headroom) is wanted as a D-12 comparison point, it is not currently bitbyg-stocked and would need sourcing elsewhere, contradicting the "lean toward what bitbyg stocks" guidance in D-11.

### Layer B (system bus) pin costs per node

| Bus | Pins per node | Confidence |
|-----|----------------|------------|
| I²C | 2 (SDA, SCL) — shared bus | `[ASSUMED]` — standard I²C wiring, well-known, not separately re-verified this session |
| RS-485 (MAX485 module) | 3 (UART TX, RX, + 1 DE/RE direction-control pin) | `[ASSUMED]` — standard MAX485 half-duplex wiring |
| CAN (MCP2515 module) | 4-5 (SPI: SCK/MOSI/MISO/CS, + optional INT pin) | `[ASSUMED]` — standard MCP2515 SPI wiring |

### Layer C (driver link) pin costs per variant class

| Driver/topology | Pins on the controlling MCU | Confidence |
|------------------|------------------------------|------------|
| DRV8825, shared step-bus + per-driver ENABLE (S1/D2 variants) | 2 shared (STEP+DIR) + 6×ENABLE = **8** | `[ASSUMED]` — matches `ARCHITECTURE-DECISION.md`'s own "~8 pins of ~18" figure for the same wiring style, cross-validated in-repo |
| DRV8825, per-motor STEP/DIR ×6 (P6-* variants) | 6×(STEP+DIR) = **12**, on the pump-node MCU (not the ESP32 brain) | `[ASSUMED]` — direct pin arithmetic |
| TMC2209 UART (T9-* variants), shared bus per `PUMP-CONTROL-CONCEPTS.md` ("≤4 drivers per UART line, so 6 = two short UART segments") | ~4 (2 UART segments × TX/RX) — **may be fewer if single-wire UART mode is used** | `[ASSUMED]`, needs firmware-mode confirmation — see Open Questions |
| TMC5160/TMC5072 SPI daisy-chain (T51-* variants) | Shared SPI bus (SCK/MOSI/MISO, 3) + CS — **1 CS if true daisy-chain wiring, up to 6 if star-wired** | `[ASSUMED]` — TMC5160 datasheet documents SPI daisy-chaining as a supported mode, not re-verified this session |
| Printer boards (B-ramps-*, B-skr-*) | **N/A — model doesn't apply.** BTT Octopus has **8 native driver sockets** (confirmed `[WebSearch: 3dwork.io, global.bttwiki.com]`, MEDIUM); RAMPS 1.4 has 5 native sockets. These are pre-wired sockets, not raw GPIO the firmware must budget — Layer C for these variants is "plug into socket," and only Layer B (USB/UART/CAN to the ESP32 host) consumes brain-side pins | MEDIUM |

## RAM/PSRAM (D-12) Research

See the Brain/MCU candidates table above for the raw numbers. The UI-fluidity implication, as requested by D-12:

- **Framebuffer math:** 320×240 @ 16-bit colour ≈ 150 KB (per CONTEXT.md's own figure). A full-frame double-buffer would need ~300 KB.
- **Base ESP32 (520 KB SRAM, no PSRAM):** a single 150 KB framebuffer fits with room for the rest of the application, but a double-buffer (for tear-free redraws) is tight alongside WiFi/BT stack overhead, which itself consumes a meaningful chunk of that 520 KB. Practical implication: **single-buffered, redraw-on-demand UI is comfortable; full-screen animated transitions are not**, without PSRAM. `[ASSUMED — standard ESP32 LVGL community guidance, not independently verified against a specific memory map this session]`
- **WROVER-class (8 MB PSRAM):** framebuffer(s) trivially fit in PSRAM, leaving internal SRAM for application logic — the standard recommendation for LVGL-driven touch UIs. `[ASSUMED]`
- **RP2040 (264 KB SRAM, no PSRAM, no GUI role):** never drives the screen in any current variant (it's a pump-node co-processor under the ESP32 brain), so this constraint doesn't bind — worth stating explicitly in the SPEC.md so a reader doesn't wonder why RP2040 RAM isn't discussed as a GUI concern.
- **STM32 Blue Pill (20 KB SRAM):** far too small for any GUI role; also never a brain candidate in the current variant set — same non-issue reasoning as RP2040.

**Recommendation:** SPEC.md should state the framebuffer arithmetic once (as CONTEXT.md already frames it) and then simply flag each brain candidate as "PSRAM: yes/no → GUI headroom: comfortable/tight" rather than re-deriving byte counts per row.

## Common Pitfalls

### Pitfall 1: Trusting the pin-budget number as more certain than the sourcing behind it
**What goes wrong:** A computed "pins free: 3" or "OVERRUN" badge reads as authoritative even when it rests on an `[ASSUMED]` bus-wiring convention or the unresolved screen-interface question.
**Why it happens:** Once a formula exists in code, its output *looks* computed/certain regardless of input confidence.
**How to avoid:** Carry the confidence tag from D-11 all the way to the displayed pin-budget readout (not just the component price table) — e.g., a superscript or tooltip on the "pins free" column referencing which inputs were Low confidence.
**Warning signs:** A pin-budget claim in `SPEC.md` or the tool's UI with no adjacent confidence marker.

### Pitfall 2: Relative-link breakage on the file move
**What goes wrong:** `prototypes/System-Architecture/index.html` currently has same-folder links (`SOLUTION-MATRIX.md`, `ARCHITECTURE.md`) that must become `../../prototypes/System-Architecture/*.md` once the tool lives at `tools/system-architecture-explorer/`. Conversely, the three `.md` records' existing link to `index.html` must become a link to the new tool path.
**Why it happens:** Both source folders are at the same depth (`prototypes/System-Architecture/` and `tools/system-architecture-explorer/` are both 2 levels deep), so `../../assets/style.css` doesn't change — but the *inter-file* links inside this specific tool do change, and it's easy to move the file and forget the cross-links.
**How to avoid:** Grep for `System-Architecture` and `SOLUTION-MATRIX.md`/`ARCHITECTURE.md`/`PUMP-CONTROL-CONCEPTS.md` across the repo after the move (a repeat of the `grep -rn "System-Architecture"` search run during this research) to confirm no dangling references remain.
**Warning signs:** 404s on internal links; the `README.md`/`ROADMAP.md`/`CLAUDE.md` updates being the only files touched while the `.md` records' own links to the old `index.html` are left stale.

### Pitfall 3: localStorage key collision
**What goes wrong:** Reusing `lang` or any existing key would silently corrupt the language switcher's stored value (JSON price object where a string is expected, or vice versa).
**Why it happens:** Copy-pasting the `lang` pattern without renaming the key.
**How to avoid:** D-06 already mandates distinct keys (`sae-prices`/`sae-rate` suggested) — the planner should lock the exact key name(s) as one of its first decisions and grep for it before writing to confirm no collision with any other tool's storage key (this site's tools all currently share the single `lang` key; a `sae-*` prefix avoids all existing usage).
**Warning signs:** Language toggle breaking after visiting the new tool, or vice versa.

### Pitfall 4: Presenting a non-bitbyg-stocked board as bitbyg-sourced
**What goes wrong:** The "Cheap Yellow Display" (ESP32-2432S028) is widely documented online and easy to find pin-out data for — much easier than for the boards bitbyg actually stocks. It would be easy to accidentally add it as a variant while implying bitbyg sourcing.
**Why it happens:** Search results for well-known hobbyist boards vastly outnumber results for a small regional vendor's specific SKUs.
**How to avoid:** Cross-check every D-10 candidate against the enumerated bitbyg catalogue list in this document before adding it as a priced variant; if a board isn't in that list, either exclude it or explicitly label it "reference only, not bitbyg-stocked" per D-11's vendor-honesty spirit.
**Warning signs:** A variant whose BOM references a component not present in bitbyg's `produkt-tag/esp32/` listing.

### Pitfall 5: Redefining design tokens instead of adopting `assets/style.css`
**What goes wrong:** The current source file's `:root` block (`--bg`, `--card`, `--line`, `--txt`, `--mut`, `--acc`, `--red`, etc.) uses *different variable names* than `assets/style.css` (`--bg`, `--accent`, `--accent-glow`, `--glass-bg`, `--glass-border`, `--text`, `--text-muted`, `--radius`). A naive copy would keep the old names and either duplicate or silently shadow the shared tokens.
**Why it happens:** The source file predates the shared stylesheet and was never reconciled (explicitly flagged in CONTEXT.md as a Phase-4 D-16 carryover).
**How to avoid:** Do a find-and-replace pass mapping old var names to `assets/style.css`'s names (`--card`→`--glass-bg`, `--line`→`--glass-border`, `--txt`→`--text`, `--mut`→`--text-muted`, `--acc`→`--accent`) rather than keeping a second `:root` block.
**Warning signs:** Two `:root` blocks in the final file, or CSS custom properties not matching any other tool page's names.

## Code Examples

### Extending `costOf`-style aggregation to pins (new, mirrors existing pattern)

```javascript
// Pattern: same shape as existing costOf(v), applied to a new "pins" field
// DEFAULTS entries would gain a `pins` field alongside `eur`/`role`:
// esp32: { label:'ESP32 dev board', role:'brain / fused controller', eur:5, pins: 12 /* usable, MEDIUM confidence */ }

function pinsOf(v) {
  let used = 0;
  for (const k in v.bom) used += (COMP[k]?.pinsUsed || 0) * v.bom[k];
  // fixed loads (screen + LM75) always counted, same as SHARED_BOM's role for cost
  used += SCREEN_PINS[interfaceMode]; // 'spi' | 'parallel' — see screen-ambiguity note
  const avail = BRAIN[v.brainKey]?.pinsAvailable || 0;
  return { used, avail, free: avail - used, overrun: used > avail };
}
```

### Site-wide localStorage try/catch idiom (existing pattern to reuse verbatim, D-06)

```javascript
// Source: tools/rotor-solver/index.html (site-wide established pattern)
let currentLang = 'en';
try { currentLang = localStorage.getItem('lang') || 'en'; } catch(e) {}
try { localStorage.setItem('lang', lang); } catch(e) {}
```

## State of the Art

Not meaningfully applicable — this is a hobby-electronics BOM (DRV8825/TMC2209/ESP32/RP2040 are all long-stable, non-deprecated parts as of this research) and a static-site pattern set that is entirely internal to this repo (no external framework versioning to track). No deprecated/outdated approaches were identified in the source material.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|----------------|
| A1 | Owned screen resolves to SPI interface with ~6-8 total Layer-A pins | Pin Budget Research | **HIGH risk** — if actually 8-bit parallel, pin math for every variant is wrong by 7-13 pins, potentially flipping feasibility verdicts shown to a thesis reader |
| A2 | Touch controller on the owned screen is XPT2046-class SPI (shares the TFT SPI bus) | Pin Budget Research | MEDIUM — affects whether touch adds +2 pins or +0 (if analog-read resistive touch on the 8-bit variant instead) |
| A3 | RP2040 = 264 KB SRAM, STM32F103C8T6 = 20 KB SRAM, ATmega328P (Pro Mini) = 2 KB SRAM | RAM/PSRAM Research | LOW — these are extremely well-known, stable chip specs; error risk is minimal even though not re-verified against a primary datasheet this session |
| A4 | I²C = 2 pins/node, RS-485 = 3 pins/node, CAN(MCP2515) = 4-5 pins/node | Pin Budget Research — Layer B | LOW-MEDIUM — standard wiring conventions, but the exact RS-485 DE/RE pin-sharing option (some modules tie DE/RE together to save a pin) could shift this by ±1 |
| A5 | WROVER-class boards carry 8 MB PSRAM by default | Brain/MCU candidates table | MEDIUM — true for the WROVER module family in general, but not confirmed on bitbyg's specific "Devkitc V4 Wrover IB IPEX" listing text, which didn't state PSRAM explicitly |
| A6 | TMC2209 UART daisy addressing fits in ~4 pins for 6 drivers across 2 segments | Pin Budget Research — Layer C | MEDIUM — depends on whether single-wire half-duplex UART mode (1 pin) or full TX/RX (2 pins) per segment is used; not confirmed against Trinamic datasheet this session |
| A7 | Base (non-WROVER) ESP32's 520 KB SRAM is comfortable for single-buffered LVGL UI but tight for double-buffered | RAM/PSRAM Research | LOW-MEDIUM — general community guidance, not a hard measured number; framing as "comfortable/tight" rather than a precise byte budget mitigates the risk |

**If this table is empty:** N/A — table is populated; see rows above. The screen-interface ambiguity (A1/A2) is the highest-risk item and should be resolved before the pin-budget feature is presented as authoritative in the shipped tool.

## Open Questions (RESOLVED)

1. **Is the owned bitbyg ILI9341 screen actually SPI or 8-bit parallel?**
   - What we know: The vendor page title says "SPI Touch Screen"; the vendor page body text describes a pin interface pattern (A0-A3, D4-D13, D0-D3 for I²C) that is characteristic of 8-bit-parallel Uno-shield-class modules, not true SPI.
   - What's unclear: Which description is accurate for the *specific* board bitbyg ships — vendor listings for this module class are frequently copy-pasted from a generic template regardless of the actual variant sold.
   - Recommendation: Planner should insert a `checkpoint:human-verify` task — physically inspect the owned board's silkscreen/header labels (Sirio already owns this part per CONTEXT.md) before the pin-budget feature ships with confident numbers. Until then, ship both scenarios or clearly mark the figure as unresolved in the UI.
   - **RESOLVED:** via end-of-phase human-check (screen interface) — per `workflow.human_verify_mode: end-of-phase`, the physical inspection is a `<human-check>` in plan 06-05, not a mid-flight checkpoint. The tool ships both scenarios selectable with **SPI as the Low-confidence default**; the end-of-phase reviewer flips the default + confidence tag if inspection shows 8-bit parallel.

2. **Does bitbyg stock a bare ESP32-S3 (no camera/Ethernet/screen), for its extra GPIO/PSRAM headroom as a D-12 comparison point?**
   - What we know: The full 12-product `produkt-tag/esp32/` catalogue was enumerated; only an ESP32-S3-with-Ethernet-and-camera board was found, no bare S3.
   - What's unclear: Whether this is a genuine catalogue gap or whether bitbyg has other S3 boards not tagged `esp32` (e.g. under a different product tag).
   - Recommendation: If the planner/tool wants an ESP32-S3 comparison row, either search bitbyg more broadly (different tags, search box) or explicitly source it elsewhere and flag the vendor mismatch per D-11.
   - **RESOLVED:** non-blocking, documented in SPEC.md as ASSUMED.

3. **Exact TMC2209 UART wiring mode for the 6-driver, 2-segment configuration described in `PUMP-CONTROL-CONCEPTS.md`.**
   - What we know: The record states "≤4 drivers per UART line, so 6 = two short UART segments."
   - What's unclear: Whether this uses TMC2209's single-wire half-duplex UART (shared TX/RX on one pin, address-selected) or standard full-duplex TX/RX per segment — a 2x pin difference.
   - Recommendation: Low-priority for this phase (doesn't block shipping) — note as `[ASSUMED]` in SPEC.md rather than blocking; revisit if the pin-budget feature needs to be precise to the pin for T9-* variants specifically.
   - **RESOLVED:** non-blocking, documented in SPEC.md as ASSUMED.

## Environment Availability

**SKIPPED** — this phase has no external tool/runtime/service dependencies at execution time. All research-time web sourcing (bitbyg.dk, vendor searches) happens during this research pass, not during code execution; the shipped tool is static HTML/CSS/JS with zero runtime dependencies (no build step, no CDN, no CLI tools required to run or view it).

## Validation Architecture

**Skipped** — `workflow.nyquist_validation` is explicitly `false` in `.planning/config.json`.

## Security Domain

`security_enforcement` is `true` in `.planning/config.json` (ASVS level 1, block on high). This is a static, offline-capable, client-only tool with no authentication, no server, and no user accounts — most ASVS categories are structurally not applicable.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | No auth surface exists on this static site |
| V3 Session Management | No | No sessions; localStorage is client-local persisted preferences, not session state |
| V4 Access Control | No | No access-controlled resources |
| V5 Input Validation | Yes | Number inputs (price fields, DKK↔EUR rate) must guard against `NaN`/negative values before use — mirror the existing `parseFloat(e.target.value)||0` and `Math.max(0, …)` idioms already used in the source file (`prototypes/System-Architecture/index.html:236-237`) and in `rotor-solver` (`Math.max(1, Math.min(25, vol))`) |
| V6 Cryptography | No | No secrets, no crypto operations; price data and localStorage content are not sensitive |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|----------------------|
| Malformed/malicious localStorage content (e.g. a hand-edited `sae-prices` key with non-numeric or oversized JSON) causing a JS exception on load | Tampering (low severity — client-only, self-inflicted) | Wrap all `JSON.parse`/`localStorage.getItem` calls in `try/catch` (already mandated by D-06) and validate each restored value is a finite number before assigning to `COMP[k].eur` |
| XSS via user-editable "source note" field (D-07) if ever rendered with `innerHTML` | Tampering / Elevation of Privilege (low severity — single-user local tool, but still a latent bad pattern) | If the D-07 source-note field is free text, render it with `textContent` or escape it before any `innerHTML` insertion — the existing `bomHtml()`/`renderComps()` functions already build HTML via template strings from *code-controlled* data (component labels), not user-typed text; the new source-note field would be the first genuinely user-typed string rendered into the DOM, so it needs explicit escaping that the rest of the file doesn't currently need |

## Sources

### Primary (HIGH confidence)
- `prototypes/System-Architecture/index.html` (in-repo, full read) — the entire existing cost engine, `DEFAULTS`, `VARIANTS`, `SHARED_BOM`, all rendering functions
- `prototypes/System-Architecture/ARCHITECTURE.md`, `PUMP-CONTROL-CONCEPTS.md`, `SOLUTION-MATRIX.md` (in-repo, full read)
- `tools/rotor-solver/index.html` (in-repo, full read) — `buildFigure()` parametric SVG pattern, localStorage `lang` pattern
- `tools/peristaltic-roller-displaced-volume-model/index.html` (in-repo, partial read, structure confirmed) — two-part `.part-label`/`.theory-card` pattern
- `assets/style.css` (in-repo, grepped) — canonical design-token names
- `index.html` (repo root, partial read) — `.tool-card`/`.tool-card--wide` card markup pattern
- `prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md` (in-repo, full read) — cross-validates the "~8 pins of ~18" figure for shared-step-bus wiring independently of this session's pin-budget estimates
- `prototypes/PROTOTYPES.md` (in-repo, full read) — "Architecture studies (not part of proto-NN streak)" table pattern for cross-linking `multi-liquid-architecture/`
- `.planning/config.json` (in-repo) — `nyquist_validation: false`, `security_enforcement: true`
- https://bitbyg.dk/shop/3-2-inch-tft-lcd-display-module-spi-touch-screen-onboard-temperature-sensor-pen/ — owned screen product page (fetched directly), source of the SPI/parallel contradiction
- https://bitbyg.dk/shop/esp32-lvgl-wifibluetooth-2-4inch-lcd-touch-tft-module/ — ESP32-2432S024 product page (fetched directly), source of the "9 available IO ports" HIGH-confidence figure
- https://bitbyg.dk/produkt-tag/esp32/ — full ESP32-tagged catalogue listing (fetched directly), 12 products enumerated

### Secondary (MEDIUM confidence)
- https://bitbyg.dk/shop/lilygo-ttgo-t-display-16-mb-esp32/ — TTGO T-Display product page (fetched)
- ESP32 GPIO/strapping-pin facts — cross-checked via randomnerdtutorials.com, lastminuteengineers.com, circuitstate.com (WebSearch)
- RP2040/Pico GPIO count — cross-checked via microcontrollerslab.com, deepbluembedded.com, Adafruit product listing (WebSearch)
- STM32F103C8T6 GPIO count — cross-checked via microcontrollerslab.com, components101.com (WebSearch)
- Arduino Pro Mini pinout — arduino.cc official page + richardelectronics.com, etechnophiles.com (WebSearch)
- BTT Octopus 8 driver sockets — 3dwork.io, global.bttwiki.com (WebSearch)
- ESP32 vs ESP32-S3 SRAM/PSRAM comparison — ariat-tech.com, jmbom.com, Espressif ESP32-S3 datasheet (referenced, not directly fetched) (WebSearch)

### Tertiary (LOW confidence)
- Cheap Yellow Display (ESP32-2432S028) pin-out and "3 free GPIO" figure — espboards.dev, mischianti.org, GitHub witnessmenow/ESP32-Cheap-Yellow-Display (WebSearch only; **not a bitbyg-stocked product**, included for context only)
- ESP32-S3 ETH PoE Cam "17 free GPIO" figure — cnx-software.com, spotpear.com (WebSearch, describes a *different* non-bitbyg S3 PoE/cam board, only loosely analogous to bitbyg's own S3 ETH PoE Cam listing)

## Metadata

**Confidence breakdown:**
- Standard stack / code-promotion architecture: HIGH — three precedent tools read in full, direct copy-paste-grade patterns found for every sub-requirement
- Pin budget (D-09): LOW-MEDIUM — one HIGH-confidence vendor fact (9 IO ports), one critical unresolved contradiction (screen interface), rest is MEDIUM (cross-checked tutorials) to ASSUMED (well-known but not re-verified chip specs)
- Candidate hardware (D-10): MEDIUM — bitbyg's own catalogue was fully enumerated (HIGH-confidence *inventory*), but per-board wiring detail beyond the stated IO-port count is thin
- RAM/PSRAM (D-12): LOW-MEDIUM — chip specs are well-known/stable but not independently re-verified against primary datasheets this session; UI-fluidity framing is qualitative, not measured

**Research date:** 2026-07-15
**Valid until:** 2026-08-14 (30 days) for the code-promotion findings (stable, in-repo); the bitbyg vendor-catalogue findings (prices, stock, listing text) should be treated as valid for **7 days only** — hobby-electronics vendor stock and listings change without notice, and the screen-interface contradiction specifically should be re-checked at execution time rather than trusted from this snapshot.
