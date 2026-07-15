# Phase 6: System Architecture Explorer - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-15
**Phase:** 6-system-architecture-explorer
**Areas discussed:** Architecture diagram, Page anatomy & reskin depth, Price data lifecycle, Source-of-truth split

---

## Architecture diagram — does the tool get one, and how much does it do?

| Option | Description | Selected |
|--------|-------------|----------|
| Live, variant-driven SVG | Diagram redraws per selected variant: brain↔screen (A), Layer-B bus with real node count, Layer-C driver links | ✓ |
| One static SVG diagram | Single hand-drawn generic topology, same for every variant | |
| No diagram — table only | Pure reskin; fix ARCHITECTURE.md's dangling "see the diagram" claim | |

**User's choice:** Live, variant-driven SVG
**Notes:** ARCHITECTURE.md already promises "see the diagram in index.html" but none exists — this makes the promise true and is what makes it an "Explorer" rather than a spreadsheet.

## Architecture diagram — what drives selection?

| Option | Description | Selected |
|--------|-------------|----------|
| Click a matrix row | Matrix stays primary; row-click highlights, redraws diagram, expands BOM | ✓ |
| Separate variant dropdown | Dedicated `<select>` above the diagram, independent of the table | |
| Follow the cheapest visible row | Diagram always shows top-ranked row under current filters | |

**User's choice:** Click a matrix row
**Notes:** One click, one architecture, no second control to keep in sync.

## Architecture diagram — how much does it show?

| Option | Description | Selected |
|--------|-------------|----------|
| Comms + power rails | Layers A/B/C with topology + node count, alignment node, AND power block (PSU 60/150 W, 12/24 V dual rail, common ground) | ✓ |
| Comms layers only | Three labelled layers + topology + node count; no power block | |
| Coarse blocks | Brain → bus → [pump block] + [alignment node] only | |

**User's choice:** Comms + power rails
**Notes:** Power is a real hidden cost of parallelism (SOLUTION-MATRIX.md) and is invisible in the table.

---

## Page anatomy & reskin depth — how much explanatory content?

| Option | Description | Selected |
|--------|-------------|----------|
| Two-part: reasoning + tool | Theory section (comms layers, driver-vs-MCU insight, U5 axis) then live matrix + diagram, like the displaced-volume model | ✓ |
| Lean reskin | Nav + tokens + glass cards, compact calculator; reasoning stays in the .md records | |
| Intro paragraph only | One framing paragraph + existing note block, then straight into the matrix | |

**User's choice:** Two-part: reasoning + tool
**Notes:** Content already exists in ARCHITECTURE.md/PUMP-CONTROL-CONCEPTS.md; tool becomes self-explanatory for a QR-code visitor.

## Page anatomy — what happens to the decision records once prose is ported?

| Option | Description | Selected |
|--------|-------------|----------|
| Records trimmed to pointers | Tool canonical for reasoning prose; records keep raw exploration/audit trail, overlapping passages link into the tool | ✓ |
| Records stay full, tool paraphrases | .md remains complete; tool has a fresh summary — accept drift | |
| Decide during planning | Lock two-part now, judge per-section later | |

**User's choice:** Records trimmed to pointers
**Notes:** One home for each idea; no drift. Records keep U5, fixed components, "different Arduino per pump" verdict.

---

## Price data lifecycle — should edited prices persist?

| Option | Description | Selected |
|--------|-------------|----------|
| localStorage persist + Reset | Save prices + rate to localStorage (try/catch, like `lang`); Reset clears to DEFAULTS | ✓ |
| Session only | Keep today's behaviour — edits lost on reload | |
| URL-encoded shareable state | Encode prices into URL hash for citable scenarios | |

**User's choice:** localStorage persist + Reset
**Notes:** Use a distinct key (not `lang`).

## Price data lifecycle — vendor sourcing?

| Option | Description | Selected |
|--------|-------------|----------|
| Optional source field per component | Per-component vendor URL/note, populated where a real link exists (ILI9341→bitbyg), blank otherwise | ✓ |
| Keep estimates only | Leave unsourced hobby-class estimates with ±20% disclaimer | |
| Global disclaimer, richer notes later | Ship with global note; defer per-component sourcing | |

**User's choice:** Optional source field per component
**Notes:** Makes the cost model auditable; gives real quotes a place to land without sourcing all ~20 parts now.

---

## Source-of-truth split — which representation is canonical?

| Option | Description | Selected |
|--------|-------------|----------|
| Tool JS is canonical | DEFAULTS/VARIANTS/SHARED_BOM in inline script are the source of truth; SOLUTION-MATRIX.md becomes a reference-view snapshot pointing to the tool | ✓ |
| SOLUTION-MATRIX.md is canonical | .md stays master; JS mirrors it (hand-sync, drift risk) | |
| Both, reconciled at planning time | Defer to the planner | |

**User's choice:** Tool JS is canonical
**Notes:** The JS is what actually computes; matches the existing ARCHITECTURE.md → index.html pattern.

---

## Pin budget / connectivity — how far does the feature go?

| Option | Description | Selected |
|--------|-------------|----------|
| Computed pins-free per variant | Model MCU GPIO + per-load pin cost (screen/touch/I²C + bus + drivers); show used/available/free, flag overruns | ✓ |
| Fixed-load pin note only | Static note of what the fixed hardware costs in pins; no per-variant computation | |
| Defer pin budget | Note as deferred enhancement; ship promotion + diagram + sourcing first | |

**User's choice:** Computed pins-free per variant

## Freeform additions (user, second round)

Captured directly into CONTEXT.md decisions/refs — no options presented:

- **Aim restated:** choose the best *feasible* architecture given fixed hardware, on price + complexity (+ pin feasibility). Decision aid, not just a catalogue.
- **Owned screen is fixed:** the specific bitbyg ILI9341 listing (URL added to canonical refs); constant per variant, spends real pins.
- **bitbyg.dk is the default sourcing vendor** — pull prices/availability there first, open to searching elsewhere; lean the variant set toward what bitbyg stocks. (→ D-07, D-11)
- **ESP32-with-integrated-screen** boards from bitbyg are a candidate option class; vendor doesn't state criteria → site + web searches needed. (→ D-10)
- **Confidence level on every searched fact** — High / Medium / Low scale defined. (→ D-11)
- **No ESP32 is actually committed yet** — the brain is open, not fixed; ESP32 model (pins, RAM, PSRAM) is a variable the tool helps choose.
- **ESP32 specs beyond pins — RAM / PSRAM — drive UI fluidity** on the screen; model them per brain candidate. (→ D-12)

---

## Claude's Discretion

- SVG drawing mechanics (generated-from-bom vs template layouts), diagram placement, reduced-motion redraw.
- Final localStorage key name(s) and serialisation shape.
- Per-passage trim aggressiveness on the two `.md` records (direction locked, granularity open).
- Reasoning-section structure/order.
- Whether the D-07 source field is URL, note, or both.

## Deferred Ideas

- URL-encoded shareable price state (citable scenario links) — deferred in favour of localStorage.
- "Follow the cheapest visible row" diagram mode — rejected for explicit row-click.
- Landing-page redesign for many tools — out of scope; tool adds one card.
- Sourcing all ~20 component prices with real vendor links — ongoing BOM work, not this phase.
