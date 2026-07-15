---
phase: 06-system-architecture-explorer-promote-the-electronics-archite
plan: 05
subsystem: ui
tags: [static-html, cost-calculator, pin-budget, sourcing, confidence-tagging, xss-safety]

# Dependency graph
requires: ["06-01", "06-03"]
provides:
  - "tools/system-architecture-explorer/index.html — DEFAULTS entries carry source {url,note} + confidence (High/Medium/Low, D-11); brain-class entries carry gpioUsable/ram/psram/uiNote; new espscreen (ESP32-2432S024) component + 2 new VARIANTS rows; pinsOf(v) pin-budget engine with a selectable SPI/parallel screen-interface scenario and confidence-tagged OVERRUN/free readout"
  - "19 total VARIANTS (17 original + ESPINT-fused-i2c + ESPINT-dumb-i2c)"
affects: [06-06, 06-07]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "XSS-safe user-typed rendering: source-note/URL built via DOM createElement + textContent (sourceCellContent()), never interpolated into an innerHTML template string; URLs only linked for http(s) scheme"
    - "pinsOf(v) mirrors costOf(v)'s aggregation shape (fixed loads + per-variant loads), applied to GPIO pins instead of euros — same pattern the RESEARCH code sketch recommended"
    - "worstConf(...levels) picks the lowest-confidence tag across a set of inputs feeding a single displayed number, so a computed readout never looks more certain than its weakest source (RESEARCH Pitfall 1)"
    - "Variant-level pinsC field (Layer-C driver-link pins on the brain) mirrors the existing bom:{...} qty-map pattern — 0 when a dedicated pump-node MCU or a printer board's driver sockets absorb the wiring instead of the ESP32 brain"

key-files:
  created: []
  modified:
    - tools/system-architecture-explorer/index.html

key-decisions:
  - "Every ESP32-class variant carries esp32 (or espscreen) in its bom, so 'the variant's brain' for pin-budget purposes is unambiguous: bom.espscreen ? 'espscreen' : 'esp32' — no new brainKey field needed on VARIANTS"
  - "Layer-B bus pins are looked up per bus TYPE (BUS_PINS[v.b]), not multiplied by node count — the brain only pays for its own single attachment to the bus, regardless of how many other nodes share it"
  - "Layer-C driver-link pins are attached per-variant as an explicit pinsC field (mirroring costOf's bom qty-map spirit) rather than derived generically from driver+topology strings, since the same component (e.g. drv8825 x6) costs a different pin count depending on wiring style (S1 shared+EN=8 vs D2 per-motor=12) — a per-component pins field alone could not express that"
  - "esp32.gpioUsable set to 15 (RESEARCH's upper bound of its '~10-15 realistically usable' range, Medium confidence) rather than the low end — this produces a genuinely mixed result set (S1/D2 always overrun even at SPI; T9-fused-*/T51-*/P6-rp-i2c sit right at the SPI/parallel borderline; printer-board variants comfortably fit) instead of either 'everything fits' or 'everything overruns', which better demonstrates the feature's decision-aid value"
  - "espscreen-based variants (ESPINT-*) skip SCREEN_PINS and the LM75 fixed-pin cost entirely in pinsOf(), and skip the SHARED_BOM screen cost line in costOf()/bomHtml() — the integrated board's vendor-stated 9 free IO already accounts for its onboard display+touch, and it doesn't carry the owned external board's LM75 sensor"
  - "Added TWO integrated-screen variants, not one: ESPINT-fused-i2c (TMC2209 smart driver, fits within 9 IO) and ESPINT-dumb-i2c (DRV8825 dumb driver, does NOT fit even at single concurrency) — showing both the flattering and unflattering case is more honest to D-11's sourcing-honesty spirit than cherry-picking only the variant that fits"
  - "interfaceConf (screen-interface confidence) is a top-level `let`, not tied to which scenario the UI toggle currently shows — it represents whether the physical board has been inspected yet, independent of which scenario a reader is currently viewing. Stays 'Low' until the end-of-phase human-check flips it in code"
  - "Deliberately did NOT add the ESP32-2432S028 'Cheap Yellow Display' (CYD) as any DEFAULTS/VARIANTS entry — RESEARCH Pitfall 4 explicitly warns against it since it is not in bitbyg's catalogue; the plan's 'if referenced at all, label reference-only' clause was satisfied by simply not referencing it"
  - "Did not change any existing component's `eur` price when adding its `source`/`confidence` fields — the task scope was adding the sourcing metadata, not reconciling ~20 unsourced estimate prices to bitbyg listings (explicitly deferred per CONTEXT.md's Deferred Ideas: 'Sourcing all ~20 component prices... is ongoing BOM work, not this phase')"

requirements-completed: [ARCH-07, ARCH-08]

# Metrics
duration: 25min
completed: 2026-07-15
---

# Phase 06 Plan 05: Sourcing, Confidence Tags, Brain Specs & Pin-Budget Engine Summary

**Extended the System Architecture Explorer's data model with per-component source/confidence tags (XSS-safe), brain-class RAM/PSRAM/GPIO specs with a UI-fluidity note, two new bitbyg-sourced integrated ESP32+screen variants, and a `pinsOf(v)` pin-budget engine with a selectable SPI/8-bit-parallel screen scenario whose OVERRUN/free readout always carries a confidence marker.**

## Performance

- **Duration:** ~25 min
- **Completed:** 2026-07-15T14:24:42Z
- **Tasks:** 3/3
- **Files modified:** 1

## Accomplishments

- Every `DEFAULTS` entry now carries `confidence` ('High'/'Medium'/'Low', D-11) and an optional `source: {url, note}`; the ILI9341 `screen` entry is the one High-confidence, bitbyg-sourced anchor (174 DKK ≈ €23)
- Added `escapeHtml()`, `confClass()`, `worstConf()`, and `sourceCellContent()` helpers; the component table's Source/Confidence columns render user-typed source notes via `textContent`/DOM nodes only — never interpolated into an `innerHTML` template string. Vendor links are only made clickable for `http(s)://` URLs (a `javascript:` URL renders as plain, non-clickable text)
- Added a High/Medium/Low confidence legend above the component table
- Brain-class `DEFAULTS` entries (`esp32`, `rp2040`, `stm32`, `promini`, `nano`) gained `gpioUsable`, `ram`, `psram`, and a `uiNote` implementing D-12's fluidity framing, each spec individually confidence-tagged (per-claim, not per-source, per RESEARCH Pitfall 3)
- New `espscreen` component (bitbyg ESP32-2432S024, 9 usable IO — **High** confidence, vendor-stated directly) and two new `VARIANTS` rows: `ESPINT-fused-i2c` (fits the 9-IO budget) and `ESPINT-dumb-i2c` (does not fit, shown for honest contrast). The CYD ESP32-2432S028 was deliberately excluded (not bitbyg-stocked, RESEARCH Pitfall 4)
- `costOf()`/`bomHtml()` skip the shared-block screen line for `espscreen`-based variants to avoid double-counting the now-integrated display; `bomHtml()` surfaces the variant's brain RAM/PSRAM/GPIO + fluidity note in the expanded BOM row
- Implemented `pinsOf(v)` mirroring `costOf(v)`'s aggregation shape: `SCREEN_PINS[interfaceMode]` (Layer A, skipped for integrated boards) + LM75 (0 if the system bus is I²C, else +2) + `BUS_PINS[v.b]` (Layer B) + `v.pinsC` (Layer C, 0 for dedicated-node/printer-board variants) vs. the brain's `gpioUsable`
- Added a screen-interface toggle (SPI ⇄ 8-bit parallel) defaulting to SPI, tagged Low confidence and visibly labelled "unverified" in the UI, per the RESEARCH recommendation pending the end-of-phase physical inspection
- Added a "Pins free" matrix column showing either the free-pin count or an `OVERRUN` badge, each paired with a confidence pill from `pinConfidenceOf(v)` — the worst (lowest) of the interface confidence, the brain's GPIO confidence, and the Medium ASSUMED tier covering the bus/driver pin-cost tables
- Verified numerically (Node harness, no browser): switching SPI→parallel flips `T9-fused-i2c` from 1 pin free to `OVERRUN`, and `P6-rp-i2c` lands exactly at 0 free at parallel — confirming a borderline variant's overrun state does change with the scenario toggle, as the plan's `<behavior>` block requires

## Task Commits

1. **Task 1: Add per-component source field + confidence tag, rendered XSS-safely (D-07, D-11)** - `4923153` (feat)
2. **Task 2: Add brain RAM/PSRAM/GPIO specs + the bitbyg integrated-screen variant(s) (D-10, D-12)** - `62c1c61` (feat)
3. **Task 3: Compute and display pins used / available / free per variant with confidence-tagged overrun flags (D-09)** - `48a480e` (feat)

## Files Created/Modified

- `tools/system-architecture-explorer/index.html` — DEFAULTS/VARIANTS extended additively (source/confidence, brain specs, espscreen + 2 new variants, pinsC per variant); new `pinsOf()`/`pinConfidenceOf()`/`SCREEN_PINS`/`BUS_PINS`; new Source/Confidence columns in the component table + a confidence legend; new "Pins free" column + screen-interface toggle in the solution matrix

## Decisions Made

See `key-decisions` in frontmatter above for the full list. Highlights: `esp32.gpioUsable=15` chosen at the upper end of RESEARCH's range to produce a genuinely mixed (not all-pass or all-fail) result set; Layer-C pin costs attached explicitly per-variant (`pinsC`) rather than derived generically, since identical components (e.g. 6× DRV8825) cost different pin counts depending on wiring topology; both a fitting and a non-fitting integrated-screen variant were added for honest contrast rather than cherry-picking the flattering case.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Stale "SPI (fixed, ILI9341)" claim in the comms-layer note contradicted the new selectable scenario**
- **Found during:** Task 3
- **Issue:** The pre-existing `sae-card note` block above the controls stated "**A** brain↔screen = SPI (fixed, ILI9341)" — this became inaccurate once Task 3 made the screen interface a selectable, unverified scenario (and once Task 2 added the integrated-screen variants where Layer A doesn't apply at all)
- **Fix:** Rewrote the note to describe Layer A as selectable (SPI/8-bit-parallel, defaulting to SPI at Low confidence) and to note the integrated-screen exception; also added a one-line mention of the new "Pins free" column
- **Files modified:** tools/system-architecture-explorer/index.html
- **Verification:** Re-read the updated block; no remaining reference to a fixed/certain screen interface
- **Committed in:** 48a480e (Task 3 commit)

**2. [Rule 1 - Bug] costOf()/bomHtml() would have double-counted the screen for integrated-screen variants**
- **Found during:** Task 2, while designing the espscreen variants
- **Issue:** `SHARED_BOM` unconditionally includes `screen:1` when "include shared block" is toggled on. A variant using the integrated `espscreen` component (which already prices its own display) would silently double-bill the screen if this weren't special-cased
- **Fix:** Both `costOf(v)` and `bomHtml(v)` now skip the `screen` line of `SHARED_BOM` when `v.bom.espscreen` is present
- **Files modified:** tools/system-architecture-explorer/index.html
- **Verification:** Numeric Node-harness trace confirmed `ESPINT-fused-i2c` whole-system cost = €119.60 (bom €70.60 + shared-minus-screen €49.00), vs `T9-fused-i2c` whole-system cost = €122.00 (bom €50.00 + full shared block €72.00) — the €2.40 delta matches the espscreen-vs-esp32 price difference exactly, confirming no double-count
- **Committed in:** 62c1c61 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — correctness bugs introduced by this plan's own new features, caught before commit via code trace / numeric verification)
**Impact on plan:** Both fixes are correctness-only, scoped entirely to `tools/system-architecture-explorer/index.html`. No scope creep.

## TDD Gate Compliance

Tasks 1 and 3 were flagged `tdd="true"` in the plan. This repository has no JS test framework, test runner, or `package.json` (hard project constraint: "no build tools, no npm, no frameworks" per `CLAUDE.md`, and `.planning/config.json` has `tdd_mode: false`) — there is no mechanism to write an automated failing test, run it, watch it fail, then watch it pass, for inline-script DOM behavior in a static HTML file. No `test(...)` (RED) or dedicated `feat(...)` (GREEN)-after-`test` commit pair exists for these tasks; each was committed as a single `feat(...)` commit once the `<behavior>` block's requirements were satisfied and verified.

**What was done instead, matching this repo's established precedent** (06-01-SUMMARY.md: "JS syntax was validated with `node --check`"):
- Syntax validated with `node --check` after every task
- Task 1's behavior (HTML-in-note renders as literal text, `javascript:` URLs not linked) verified by code trace: `sourceCellContent()` only ever calls `.textContent =`, never `.innerHTML =`, on user-typed strings, and the URL scheme is regex-gated before an `<a>` is ever created
- Task 3's behavior (scenario toggle flips a borderline variant's overrun state) verified with a live numeric trace via a Node `vm` harness that loads the actual inline script with a stubbed `document`/`localStorage` and calls `pinsOf()` across all 19 variants at both `interfaceMode` values — output included above in Accomplishments, confirming the flip on `T9-fused-i2c` and the exact-0 borderline on `P6-rp-i2c` at parallel

This is a deliberate, documented gap rather than a silent skip — flagging per the instruction to warn under TDD Gate Compliance when RED/GREEN commits are missing.

## Issues Encountered

None beyond the two auto-fixed items above.

## User Setup Required

None — no external service configuration required.

## Human-Check Outcome (Task 3, screen interface SPI vs 8-bit parallel)

**Status: PENDING end-of-phase review**, per `workflow.human_verify_mode: end-of-phase` — this executor did not perform the physical inspection (that happens at end-of-phase review across the whole phase, not mid-plan). The tool ships exactly as the plan's `<action>` specified for this state:

- `interfaceMode` defaults to `'spi'`, `interfaceConf` defaults to `'Low'`
- Both scenarios are selectable via the "Screen interface (Layer A)" control in the matrix's Controls panel
- The UI visibly labels the default as "unverified" (toggle label + a Low-confidence pill)
- The `espscreen` DEFAULTS entry is unaffected by this ambiguity (it's a different, vendor-confirmed board)

**When the physical inspection happens** (per the plan's `<verify><human-check>` instructions), the reviewer should:
1. Inspect the owned bitbyg ILI9341 module's silkscreen/header labels
2. If SPI confirmed: change `interfaceConf` from `'Low'` to `'High'` in the `<script>` block (one-line edit, see the comment directly above the `SCREEN_PINS` declaration)
3. If 8-bit parallel confirmed: change `interfaceMode`'s default from `'spi'` to `'parallel'` AND `interfaceConf` to `'High'`
4. In the running tool, confirm the "Pins free" column and the toggle both reflect the corrected default, and re-check which variants now show `OVERRUN`
5. This same finding should be recorded in `SPEC.md` once it exists (06-07, per `CLAUDE.md`'s documented-ahead-of-creation folder entry)

## Next Plan Readiness

- `tools/system-architecture-explorer/index.html` now has all data D-01/D-03's live SVG diagram (06-06) needs to draw per-variant: `v.b` (Layer B bus type + real node semantics), `v.c`/`v.driver`/`v.dk` (Layer C topology class), `v.bom` (which brain — `esp32` vs `espscreen`), and now `pinsOf(v)` for a feasibility badge the diagram could optionally surface
- The component table's Source/Confidence columns and the matrix's Pins-free column are additive — no existing DOM ids, localStorage keys, or anchors were touched, so 06-06 can proceed without further reconciliation
- 19 total variants now exist (was 17); any 06-06 diagram template-class mapping should account for the two new `ESPINT-*` rows using the `espscreen` brain instead of `esp32`+external `screen`
- The screen-interface SPI/parallel resolution remains genuinely open pending the end-of-phase physical check — 06-06's diagram (if it draws Layer A wiring) should also default to reading `interfaceMode`/`interfaceConf` rather than hardcoding an assumption

---
*Phase: 06-system-architecture-explorer-promote-the-electronics-archite*
*Completed: 2026-07-15*

## Self-Check: PASSED

- FOUND: tools/system-architecture-explorer/index.html
- FOUND commit: 4923153
- FOUND commit: 62c1c61
- FOUND commit: 48a480e
