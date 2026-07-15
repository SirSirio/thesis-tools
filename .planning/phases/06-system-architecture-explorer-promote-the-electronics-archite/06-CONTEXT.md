# Phase 6: System Architecture Explorer - Context

**Gathered:** 2026-07-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Promote the ad-hoc cost/complexity matrix built during the 2026-07 architecture
sparring session — currently a standalone, self-contained page at
`prototypes/System-Architecture/index.html` (310 lines, its own duplicated token
block) — into a **first-class tool** at `tools/system-architecture-explorer/`
(`index.html` + `SPEC.md`), so the device's control-architecture decision (which
MCU, which stepper driver, which bus, at what cost and complexity) can be
explored interactively like every other design decision on the site.

**The aim (why the tool exists):** to **choose the best feasible control
architecture given our fixed hardware**, comparing candidates on **price AND
complexity** (and now **pin/connectivity feasibility** — see D-09). It is a
decision aid, not just an option catalogue: it should surface which variants are
actually buildable with what we have and what stock the vendor sells.

The three markdown decision records (`ARCHITECTURE.md`,
`PUMP-CONTROL-CONCEPTS.md`, `SOLUTION-MATRIX.md`) **stay** in
`prototypes/System-Architecture/` as design documentation — matching the
`prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/` precedent (a
design-study folder that is *not* a `proto-NN`). Both directions cross-link; no
orphaned `index.html` is left behind.

**This phase clarifies HOW to promote + upgrade the tool.** The control-electronics
decision itself is NOT made here — the tool prices the options, it doesn't pick one.

</domain>

<decisions>
## Implementation Decisions

### System diagram (new capability — the "Explorer" in the name)
- **D-01:** The tool gains a **live, variant-driven SVG system diagram**. It is
  the thing the table genuinely cannot say, and it honours the promise already
  written in `ARCHITECTURE.md:110` ("See the diagram in index.html") which today
  points at a diagram that does not exist (only a text note block is there).
- **D-02:** **Selection = click a matrix row.** The matrix stays the primary
  interface. Clicking a row selects it (row highlights, diagram redraws for that
  variant, BOM breakdown expands as it does today). One click, one architecture,
  no second control to keep in sync. (Dropdown and "follow-cheapest-row" were
  both considered and rejected — avoids duplicate state.)
- **D-03:** The diagram shows **comms layers + power rails**:
  - **Layer A** — brain (ESP32) ↔ screen (ILI9341), SPI/parallel, fixed.
  - **Layer B** — the system bus (I²C / RS-485 / CAN) drawn with the variant's
    **real node count**.
  - **Layer C** — the per-variant pump-controller topology (ESP32 fused / +RP2040
    node / +STM32 node / 6× Pro-Mini distributed / printer board) and the 6
    driver→motor links.
  - **Alignment node** (its own MCU, constant across variants).
  - **Power block** — PSU sized **60 W (1–2 at once) vs 150 W (all-6)**, the
    **12 V/24 V dual rail** on **common ground**. Power is a real hidden cost of
    parallelism (`SOLUTION-MATRIX.md` "PSU scales with concurrency") and is
    invisible in the table today.

### Page anatomy (two-part tool)
- **D-04:** **Two-part page**, mirroring
  `tools/peristaltic-roller-displaced-volume-model/`: a **reasoning/theory
  section first** — the three comms layers, the "the *driver* matters more than
  the MCU" insight, and the **U5 concurrency axis** as the dominant cost driver —
  **then** the live matrix + variant diagram. A thesis reader arriving via QR
  code sees a self-explanatory tool, not a table of 17 cryptic IDs.
- **D-05:** **The tool becomes canonical for the reasoning prose.** The three
  `.md` records are **trimmed to pointers** for their overlapping explanatory
  passages (which link into the tool's theory section) while keeping their raw
  exploration / audit-trail content that has no home in the tool: fixed
  components, open questions (U5, screen type, physical layout), and the
  "different Arduino per pump" verdict. One home per idea; no drift.

### Price data lifecycle
- **D-06:** **Persist edited prices + the DKK→EUR rate in localStorage**,
  restored on load, all access wrapped in **try/catch** (mirrors the site's
  `lang` handling). The existing **Reset** button clears back to `DEFAULTS` and
  is the escape hatch. A reader who tunes prices to their supplier keeps them
  across visits. (Use a distinct localStorage key — NOT `lang`; e.g.
  `sae-prices` / `sae-rate` — planner to finalise the key name.)
- **D-07:** Add an **optional per-component source field** (vendor URL and/or a
  short price note) shown in the component table, **paired with a confidence tag
  (D-11)**. **bitbyg.dk is the default sourcing vendor** — pull prices/availability
  from there first (open to searching elsewhere). The **owned screen** (ILI9341,
  the specific bitbyg listing, 174 DKK ≈ €23) is the highest-confidence, sourced
  anchor; other parts start as Low/estimate until sourced. Auditable cost model;
  real quotes have a place to land without blocking on sourcing all parts now.

### Source-of-truth split (data)
- **D-08:** **The tool's inline `<script>` is canonical** for the data — the
  `DEFAULTS`, `VARIANTS`, `SHARED_BOM` objects are the single source of truth
  because they are what actually computes. `SOLUTION-MATRIX.md`'s static table is
  trimmed to a **human-readable snapshot that explicitly points to the tool as
  authoritative** ("the live tool computes these; this table is a reference
  view"), matching the existing `ARCHITECTURE.md → index.html` pattern.

### Pin budget / connectivity feasibility (new evaluation axis)
- **D-09:** **Compute pins-free per variant.** The data model gains, per brain/MCU,
  a usable-GPIO count and, per fixed load and per variant, the pins it consumes:
  - **Fixed loads (constant every variant):** the screen — **SPI ~4** (SCK, MOSI,
    MISO, CS) + **DC/RST** + **touch CS/IRQ ~1–2** + the **LM75 temp sensor on the
    shared I²C** (~0 extra once I²C exists). See the owned-screen note under
    Specifics.
  - **Variant loads:** the Layer-B bus transceiver pins (I²C 2 / RS-485 or CAN via
    UART+SPI) and the Layer-C driver links (STEP/DIR ×N for dumb drivers, UART/SPI
    for smart/motion drivers, shared vs per-motor).
  - The tool shows **pins used / available / free** per variant and **flags
    overruns**, making pin feasibility a first-class readout alongside cost and
    complexity. This is the biggest new-data ask — MCU pin maps must be sourced
    (see D-11 confidence tagging).

### Candidate hardware expansion
- **D-10:** **ESP32-with-integrated-screen boards are a candidate option class.**
  The vendor (bitbyg) sells ESP32 boards with a display already integrated — a
  potentially strong option (one part, fewer pins spent on an external screen).
  The vendor does **not** state the selection criteria, so this requires **both
  bitbyg site searches AND general web searches** to establish specs (which
  display, resolution, touch, free GPIO, RAM/PSRAM). Add as one or more variants
  once specs are established, each tagged with a confidence level (D-11).
- **D-12:** **The MCU/brain model carries specs beyond pins — notably RAM and
  PSRAM.** These set how **fluid the on-screen GUI** can be (framebuffer, redraw).
  Each brain candidate records RAM/PSRAM (and pin count) with the UI-fluidity
  implication noted, so "can this MCU actually drive our screen nicely?" is part
  of the comparison, not just "does it have enough pins / is it cheap."

### Sourcing & provenance
- **D-11:** **Every sourced fact carries a confidence level.** Prices, availability,
  pin counts, RAM/PSRAM, and integrated-board specs each get a tag on a defined scale:
  - **High** — manufacturer datasheet or the vendor's own product page states it directly.
  - **Medium** — reputable secondary source, or inferred from a near-identical variant.
  - **Low** — estimate, community forum, or working assumption.
  This applies to the researcher's findings AND to the tool's displayed data (a
  visible confidence marker per sourced value where practical). Default prices and
  component availability are pulled **from bitbyg.dk first** (kept open to search
  elsewhere), and the variant set should **lean toward what bitbyg actually stocks**.

### Claude's Discretion
- Exact SVG drawing mechanics (generate nodes from the variant's `bom`/topology
  vs a small set of hand-authored template layouts switched by variant class);
  diagram placement (above vs below the matrix); redraw animation (must respect
  `prefers-reduced-motion`).
- Final localStorage key name(s) and the serialisation shape.
- How aggressively the two `.md` records are trimmed per-passage under D-05 —
  judge with the exact prose side by side, but the *direction* (tool canonical,
  records → pointers) is locked.
- Exact structure/section order of the reasoning half under D-04.
- Whether the source field (D-07) is a URL, a note, or both per row.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### The thing being promoted (source material — read all four)
- `prototypes/System-Architecture/index.html` — the current 310-line tool: the
  `DEFAULTS` catalogue, 17 `VARIANTS` with per-row `bom`, `SHARED_BOM`, the cost
  engine (`costOf`, `stars`, `bomHtml`), sort/filter controls, DKK↔EUR converter,
  shared-block toggle. This is the code to move to `tools/` and upgrade.
- `prototypes/System-Architecture/ARCHITECTURE.md` — system-level decision record;
  fixed components, three comms layers, the U5 concurrency axis, power rails. Note
  the dangling "See the diagram in index.html" (line ~110) that D-01 resolves.
- `prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md` — the 7-concept menu
  (serial↔6-parallel, dumb↔smart↔motion drivers) with the "who makes the step
  pulses?" mental model — prime source for the D-04 reasoning section.
- `prototypes/System-Architecture/SOLUTION-MATRIX.md` — the static 17-row table +
  component unit-price list; becomes the D-08 reference-view snapshot.

### Precedent tool to mirror (two-part structure, theory + interactive)
- `tools/peristaltic-roller-displaced-volume-model/index.html` — the two-part
  (theory → interactive) tool D-04 mirrors; also the project's canonical
  "no CDN without local fallback" example (`katex/` folder).
- `tools/rotor-solver/index.html` — precedent for a **live variant-driven SVG
  figure** (its top-down geometry diagram with a roller-count selector redraws
  labelled dimensions) — closest analog for the D-01/D-03 diagram.

### Design system & shared chrome
- `assets/style.css` — the only shared resource; all design tokens (bg `#0a0a0c`,
  accent `#ff6b2b`→`#e83535`, glass cards, muted text, `fade-up`). The current
  page **redefines its own copies of these** — the reskin must adopt `style.css`
  tokens instead (Phase-4 D-16 carried forward).
- `index.html` (repo root) — landing page; the tool needs a new card here.
- Any existing tool page — template for the standard `← All tools` nav bar.

### Cross-link targets & related studies
- `prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md`
  — the multi-pump scaling study that owns open unknown **U5** (does the protocol
  need simultaneous multi-liquid dispensing?); this tool prices what U5 costs.
- `prototypes/index.html` — Prototype Design Space; the `System-Architecture/`
  records live under `prototypes/`, so the cross-link geography touches here.

### Sourcing (external — vendor & datasheets; tag findings per D-11)
- **Owned screen (fixed component):**
  `https://bitbyg.dk/shop/3-2-inch-tft-lcd-display-module-spi-touch-screen-onboard-temperature-sensor-pen/`
  — ILI9341 3.2", SPI, resistive touch (pen), onboard LM75 temp on I²C (0x48),
  5 V, 174 DKK. The one High-confidence sourced part. (⚠ listing ambiguity: SPI
  vs 8-bit parallel — confirm before pin-budget math; changes pin count.)
- **Default vendor / component catalogue:** `https://bitbyg.dk/` — pull default
  prices and availability here first; check for **ESP32-with-integrated-screen**
  boards (D-10). Vendor does not state full specs → cross-check on the web.
- MCU/driver datasheets (as needed) for GPIO counts, RAM/PSRAM (D-09, D-12).

### Project guardrails
- `CLAUDE.md` — design system, offline / GitHub-Pages constraints, no-CDN-without-
  local-fallback, inline-logic rule, VS Code Live Preview pitfall. Folder
  structure must be updated with the new tool (SC-6).
- `README.md` (repo root) — tool table needs a new row.
- `ROADMAP.md` (repo root) — repo-level shipped/planned list needs the tool.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- The entire cost engine already exists in
  `prototypes/System-Architecture/index.html` — `DEFAULTS`, `VARIANTS`,
  `SHARED_BOM`, `costOf()`, `stars()`, `conPill()`, `renderComps()`,
  `renderMatrix()`, `bomHtml()`, the sort/filter wiring, the DKK↔EUR converter,
  the shared-block toggle. This is a MOVE-and-upgrade, not a from-scratch build.
- `assets/style.css` tokens replace the page's hand-rolled `:root` block.
- `tools/rotor-solver/index.html` live SVG figure = the pattern for D-01/D-03.
- Site-wide `localStorage` + try/catch pattern (the `lang` switcher) = the
  pattern for D-06 price persistence (different key).

### Established Patterns
- `tools/<slug>/index.html` + co-located `SPEC.md`; standard `← All tools` nav;
  landing-page card; README row; repo-root ROADMAP entry; CLAUDE.md folder update.
- Inline-only logic/styles is the norm — no new shared files (a hard success
  criterion for this phase).
- English-only is the standing precedent for post-i18n tools (the displaced-volume
  model opted out of the ENG/IT toggle) — this tool follows suit unless told otherwise.

### Integration Points
- Landing page `index.html` gains a card/link to the new tool.
- `prototypes/System-Architecture/index.html` is removed after the move; the three
  `.md` records cross-link to the tool and the tool links back to them (D-05, D-08).
- `README.md`, repo-root `ROADMAP.md`, `CLAUDE.md` folder structure updated.
- New `tools/system-architecture-explorer/SPEC.md` per the tool-spec standard —
  documents the component price table, the 17 variant BOMs, the three comms layers,
  the power/PSU model, and the cost-model assumptions (SC-5).

</code_context>

<specifics>
## Specific Ideas

- The tool is called an "Explorer" — the live variant-driven diagram (D-01) is
  what earns that name; a static table would under-deliver on it.
- `ARCHITECTURE.md` already promises a diagram in `index.html` that isn't there —
  D-01 makes the promise true rather than deleting the claim.
- **Fixed vs open hardware — an important distinction the tool must respect:**
  - **FIXED / owned:** the **screen** (the specific bitbyg ILI9341 listing). It is
    a constant in every variant AND it spends real pins (SPI + touch + shared I²C
    for LM75) — so it anchors both the cost and the pin-budget math.
  - **OPEN / not yet chosen:** the **ESP32 brain**. It is the *intended* brain but
    **no ESP32 is actually committed yet** — its exact model (pins, RAM, PSRAM) is
    a variable the tool helps choose, not a given. Do not treat "ESP32" as one
    fixed part; ESP32 variants differ, and RAM/PSRAM drive UI fluidity (D-12).
- The one genuinely-sourced price is the **ILI9341 screen: bitbyg, 174 DKK ≈ €23**
  (High confidence); everything else starts as an estimate until sourced from
  bitbyg/web — hence the source field + confidence tags (D-07, D-11).
- **ESP32 + integrated screen** boards from bitbyg (D-10) could beat a separate
  MCU+screen on both part count and pins — worth pricing as its own variant(s).
- Power is repeatedly flagged in the records as the hidden cost of parallelism
  (bigger PSU, heat, EMI, worse portability for a point-of-care device) — which is
  why it earns a place in the diagram (D-03), not just a BOM line.

</specifics>

<deferred>
## Deferred Ideas

- **URL-encoded shareable price state** (`#`-hash scenario links citable from the
  thesis) — considered under Area 3, deferred in favour of localStorage (D-06).
  Revisit only if a specific priced scenario needs to be cited by link.
- **"Follow the cheapest visible row" diagram mode** — considered for D-02,
  rejected in favour of explicit row-click; could return as a secondary readout.
- **Landing-page redesign for many tools** — a 6th tool makes the pending
  `[ui]` todo ("Redesign and restructure landing page for many tools",
  `index.html`) more pressing, but it stays **out of scope** here; the tool just
  adds one more card to the existing grid.
- **Sourcing all ~20 component prices with real vendor links** — D-07 adds the
  *field*; populating it beyond the ILI9341 is ongoing BOM work, not this phase.

</deferred>

---

*Phase: 6-System Architecture Explorer*
*Context gathered: 2026-07-15*
