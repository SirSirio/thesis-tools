# Phase 1: Motor & Microstepping Panel - Context

**Gathered:** 2026-05-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Extend `tools/rotor-solver/index.html` with motor operating-point analysis. Add voltage and microstepping inputs to the parameters panel; add six motor columns to the existing geometry table; update the Time column to recalculate with the selected microstepping mode; add an RPM summary card. All changes stay inside the single HTML file — no new files, no changes to `assets/style.css`.

</domain>

<decisions>
## Implementation Decisions

### Layout
- **D-01:** Motor inputs (voltage selector, microstepping dropdown) go in the **existing parameters panel** alongside the current controls — no separate panel.
- **D-02:** Motor outputs are **new columns in the existing geometry table** — not a separate panel below. This keeps all screening dimensions (geometry + motor) in one table for direct per-roller-count comparison.
- **D-03:** The existing step rate slider stays in the parameters panel and is **shared** — it drives both the Time column and the RPM summary card. No second step rate input.

### New Table Columns (6 additions)
- **D-04:** `Rollers in contact` = `Math.floor(N / 2)` — simultaneous rollers pressing on tube at 180° contact arc.
- **D-05:** `Steps / stroke` = `(200 × M_factor) / N` — mechanical steps to complete one stroke at selected microstepping mode.
- **D-06:** `µL / step` = `vol × N / (200 × M_factor)` — volume resolution at selected mode.
- **D-07:** `Torque at rim (g)` = `4800 × torque_fraction / R_mm × 10` — available motor torque expressed as g-force at rotor rim edge.
- **D-08:** `FoS` = `torque_at_rim / (200 × rollers_in_contact)` — factor of safety against worst-case compression load (200 g/roller). Color-coded: **green ≥ 2.0**, **amber 1.0–2.0**, **red < 1.0**. Both the numeric value and color are shown so red rows are still readable (not hidden).
- **D-09:** `Max step rate (steps/s)` — theoretical ceiling derived from supply voltage and L/R time constant. Same value per row (motor property, not geometry-dependent). Formula to be finalised by planner using: L = 1.8 mH, R = 1.25 Ω, I_rated = 2.5 A, V_supply = 12 V or 24 V.

### Updated Existing Column
- **D-10:** `Time` column recalculates using `steps_per_rev = 200 × M_factor` instead of the hardcoded `6400`. Currently hardcoded to 1/32 — will now reflect the selected microstepping mode.

### New Summary Card
- **D-11:** `RPM` card = `step_rate / (200 × M_factor) × 60`. Added alongside existing summary cards.

### Infeasible Rows
- **D-12:** Motor columns show `—` for geometrically infeasible rows, consistent with existing behaviour.

### Motor Constants (hard-coded, v1)
All motor parameters are fixed for the Wantai 42BYGHW811 / DRV8825 combination. No editable motor spec fields in this version.
- Steps/rev (full step): 200 (1.8°/step)
- Holding torque: 4800 g·cm (0.47 N·m) — static, both phases energised, full current
- Rated current: 2.5 A/phase
- Resistance: 1.25 Ω/phase
- Inductance: 1.8 mH/phase → L/R time constant ≈ 1.44 ms
- Driver: DRV8825, voltage supply: 12 V or 24 V (user-selectable)
- Torque fractions per microstepping mode:
  - full = 1.00, 1/2 = 0.70, 1/4 = 0.50, 1/8 = 0.35, 1/16 = 0.20, 1/32 = 0.10

### Documentation
- **D-13:** A notes/footnotes section at the bottom of the page (same pattern as the existing `.note` block) must document: motor model and constants, torque fraction table, FoS formula and threshold explanation, microstepping mode effect on Time column. Every formula shown to the user must be explained in the notes.
- **D-14 (project-wide principle):** Tool-specific specs and constants live **inline in that tool's HTML page** — not in shared files. The only cross-tool shared resource is `assets/style.css`. This keeps each tool self-contained and avoids context bleed between tools.

### Claude's Discretion
- Column ordering within the table (place motor columns after the existing Feasible column, or interleaved — planner decides what is least confusing).
- Exact max step rate formula (planner researches L/R chopper ceiling for DRV8825 at 12V and 24V and documents the formula used).
- Exact color tokens for FoS traffic light (reuse existing `.ok` green and `.no` red from the stylesheet; add an amber token in the inline `<style>` block).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Tool spec (primary reference — read first)
- `tools/rotor-solver/SPEC.md` — canonical spec for this tool: all inputs, outputs, geometry formulas, motor constants, microstepping factors, FoS thresholds, and assumptions. **Read this before anything else.**

### Source file to modify
- `tools/rotor-solver/index.html` — the only file that changes; contains the full page, inline `<style>`, and inline `<script>`. Read the entire file before planning.

### Planning documents
- `.planning/REQUIREMENTS.md` §Motor & Microstepping Panel — MOTOR-01 through MOTOR-04
- `.planning/ROADMAP.md` §Phase 1 — success criteria and scope anchor
- `tools/rotor-solver/SPEC.md` — canonical spec supersedes the original OpenSpec proposal; contains all physics, formulas, and constants

### Motor datasheet
- Motor: Wantai 42BYGHW811 — https://bitbyg.dk/shop/steppermotor-nema17-d-aksel-42byghw811/
- Driver: DRV8825 (Texas Instruments) — microstepping up to 1/32, 8.2–45V motor supply

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.glass-panel` + `.panel-title` — existing glass card pattern; use for any new container if needed.
- `.ok` (green) and `.no` (red) CSS classes — already defined for feasibility badges; reuse for FoS traffic light. Add `.warn` (amber) in the inline `<style>` block.
- `.mc` summary card pattern — used for the 5 existing summary cards; add RPM card with the same markup.
- `select` styled element — already styled (dark background, orange border on focus); reuse for voltage and microstepping dropdowns.

### Established Patterns
- All calculation logic is in the single `upd()` function inside the inline `<script>`. Motor calculations must extend this function — not a separate function.
- `ROWS = [3, 4, 5, 6, 8, 10, 12]` — roller counts iterated. Motor columns are computed inside the same `.map()` loop.
- Step rate is already read as `const SP = +document.getElementById('spS').value` inside `upd()`. Motor panel reuses this value directly.
- Language strings are in the `LANG` object (`en` + `it`). New column headers and labels must be added to both language objects.
- `data-i18n` attributes drive the language switcher. New static labels need the attribute; dynamically computed values do not.

### Integration Points
- Motor inputs (voltage selector, microstepping dropdown) are added to the `.ctrl` grid in the parameters `.glass-panel`.
- New columns are appended to the `<thead>` row and generated inside the `ROWS.map()` that builds table rows.
- RPM summary card is appended to the `#summary` div alongside existing cards.
- `upd()` is the single update function — all new inputs must add event listeners that call `upd()`.

</code_context>

<specifics>
## Specific Ideas

- The user wants motor specs visible on the page as reference documentation — not just used silently in calculations. A collapsible or static notes section listing the motor model, datasheet constants, and torque fraction table is required.
- FoS must show the numeric value AND the colour — user explicitly wants to be able to read red rows and still consider those designs.
- The existing `Time` column footnote (¹, ²) pattern should be extended to cover the new motor columns.

</specifics>

<deferred>
## Deferred Ideas

- **Motor selector** — user mentioned a future dropdown to select different motors and have the constants update accordingly. Deferred: not in this phase. Constants are hard-coded to Proto 1 hardware.
- **Switching strategy output** — bulk dispense at low microstepping + fine final strokes at 1/32. Interesting but deferred: no decision was made on operating point yet. Can be added once Proto 1 operating point is chosen.

</deferred>

---

*Phase: 1-Motor & Microstepping Panel*
*Context gathered: 2026-05-30*
