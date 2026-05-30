# Phase 1: Motor & Microstepping Panel - Research

**Researched:** 2026-05-30
**Domain:** Static HTML/CSS/JS extension — stepper motor physics, inline DOM manipulation, CSS traffic-light styling
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Motor inputs (voltage selector, microstepping dropdown) go in the **existing parameters panel** alongside the current controls — no separate panel.
- **D-02:** Motor outputs are **new columns in the existing geometry table** — not a separate panel below.
- **D-03:** The existing step rate slider stays in the parameters panel and is **shared** — it drives both the Time column and the RPM summary card. No second step rate input.
- **D-04:** `Rollers in contact` = `Math.floor(N / 2)`
- **D-05:** `Steps / stroke` = `(200 × M_factor) / N`
- **D-06:** `µL / step` = `vol × N / (200 × M_factor)`
- **D-07:** `Torque at rim (g)` = `4800 × torque_fraction / R_mm × 10`
- **D-08:** `FoS` = `torque_at_rim / (200 × rollers_in_contact)` — green ≥ 2.0, amber 1.0–2.0, red < 1.0; numeric value AND colour always shown
- **D-09:** `Max step rate (steps/s)` — theoretical ceiling from L/R formula; same value per row (motor property, not geometry-dependent)
- **D-10:** `Time` column recalculates using `steps_per_rev = 200 × M_factor` instead of hardcoded 6400
- **D-11:** RPM summary card = `step_rate / (200 × M_factor) × 60`
- **D-12:** Motor columns show `—` for infeasible rows, consistent with existing behaviour
- **D-13:** Notes/footnotes section at bottom documents motor model, constants, torque fraction table, FoS formula, Time column change
- **D-14:** Tool-specific constants and formulas live inline in `tools/rotor-solver/index.html` only — no shared files

### Claude's Discretion
- Column ordering within the table (motor columns after Feasible, or interleaved)
- Exact max step rate formula (researched below — see Max Step Rate section)
- Exact color tokens for FoS traffic light (reuse `.ok` green and `.no` red; add `.warn` amber inline)

### Deferred Ideas (OUT OF SCOPE)
- Motor selector dropdown (future phase)
- Switching strategy output (bulk + fine final strokes)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MOTOR-01 | Rotor solver displays voltage selector (12V/24V), microstepping dropdown (full–1/32), step rate input | Existing `select` and `range` patterns confirmed in index.html; event listener pattern is `addEventListener('change', upd)` / `addEventListener('input', upd)` |
| MOTOR-02 | Panel computes seven derived outputs per roller count: steps/stroke, µL/step, torque at rim, compression load range, torque margin indicator (FoS), max step rate, RPM | All formulas confirmed in SPEC.md; max step rate formula derived and verified below |
| MOTOR-03 | All motor params hard-coded for Wantai 42BYGHW811 / DRV8825; no editable fields | Constants confirmed in SPEC.md; no registry or npm involved (pure inline JS) |
| MOTOR-04 | All logic in existing inline `<script>` of `tools/rotor-solver/index.html`; no new files, no assets/style.css changes, no CDN | Project constraint confirmed in CLAUDE.md; index.html read in full |
</phase_requirements>

---

## Summary

Phase 1 is a pure in-file extension of `tools/rotor-solver/index.html`. No new files, no external dependencies, no build steps. The work is: (1) add two inputs to the existing `.ctrl` grid, (2) extend the `upd()` function with motor calculations, (3) append six columns to the geometry table, (4) add one summary card, and (5) extend the notes block.

The existing codebase is clean and well-structured. The `upd()` function reads all inputs, runs `ROWS.map()` to produce table HTML, and outputs summary cards. Motor calculations slot directly into this map loop. The LANG dictionary covers EN/IT strings; new keys must be added to both language objects.

The one area requiring research was the max step rate formula. This is now resolved: the standard inductive ceiling formula `f_max = V / (2 × L × I_rated)` gives **steps/s** and is microstepping-mode independent. At 12V the ceiling is approximately 1,333 steps/s; at 24V approximately 2,667 steps/s. These are conservative theoretical lower bounds — with DRV8825 chopper regulation, practical reliable operation extends significantly higher (empirically 2,000–5,000 steps/s range). The tool should display the formula-derived value and label it "inductive ceiling (theoretical lower bound)".

**Primary recommendation:** Extend `upd()` in a single editing pass: add input reads for `voltSel` and `msSel`, compute the six motor columns inside the existing `ROWS.map()`, add the RPM card to the summary block, and expand both LANG objects with the new i18n keys. Add `.warn` amber class inline. Update the notes block.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Motor parameter storage | Browser (inline JS constants) | — | Static constants; no server or DB needed |
| Motor calculations | Browser (inline `<script>`) | — | All logic lives in `upd()` per CLAUDE.md convention |
| FoS traffic-light styling | Browser (inline `<style>`) | — | Tool-specific CSS lives in the tool's HTML file, not shared stylesheet |
| Voltage / microstepping inputs | Browser (DOM select elements) | — | Same pattern as existing `idSel`, `bSel` dropdowns |
| i18n for new labels | Browser (inline LANG object) | — | Existing pattern — no external i18n file |
| Table column rendering | Browser (JS string template in `ROWS.map()`) | — | Matches existing column generation approach |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vanilla JS | ES2020 (inline) | All calculation and DOM logic | Project constraint: no frameworks, no npm |
| HTML5 | — | Page structure | Static site constraint |
| CSS3 | — | Styling | Shared stylesheet + inline `<style>` per tool |

No external packages. No installation step.

**Version verification:** N/A — no package registry involved. This is a no-dependency static HTML project.

---

## Package Legitimacy Audit

Not applicable. This phase installs zero external packages. All logic is inline JavaScript.

---

## Architecture Patterns

### System Architecture Diagram

```
User changes input (voltage, microstepping, step rate, etc.)
          |
          v
    upd() called
          |
     +----+----+
     |         |
  Geometry   Motor
  calcs per  calcs per
  ROWS.map() ROWS.map()
     |         |
     v         v
  Table HTML  Table HTML
  (geometry   (motor
   columns)    columns)
          |
          v
   document.getElementById('tb').innerHTML = html
          +
   document.getElementById('summary').innerHTML = cards
```

### Recommended Project Structure

No new files or folders. All changes are within:

```
tools/rotor-solver/
  index.html   ← the only file that changes
  SPEC.md      ← update after implementation to record formula used
```

### Pattern 1: Adding Inputs to `.ctrl` Grid

**What:** Drop a new `.cg` div into the existing `.ctrl` grid. Add `addEventListener('change', upd)` at the bottom of the script alongside the existing listeners.

**When to use:** For all new user inputs — matches D-01.

**Example (existing pattern to follow):**
```html
<!-- Existing select in .ctrl grid -->
<div class="cg">
  <label data-i18n="label-id">Tube ID</label>
  <select id="idSel">
    <option value="0.51" selected>0.51 mm</option>
  </select>
</div>
```

```javascript
// New inputs follow the same listener pattern
document.getElementById('voltSel').addEventListener('change', upd);
document.getElementById('msSel').addEventListener('change', upd);
```

### Pattern 2: Extending `upd()` with Motor Variables

**What:** Read the two new selects at the top of `upd()` alongside existing reads. Define the motor constants as `const` block at the top of the script (not inside `upd()`) so they are not redeclared on every call.

**When to use:** Motor parameter reads and constant lookups.

**Example:**
```javascript
// Constants block (top of <script>, not inside upd())
const MOTOR = {
  stepsFullRev: 200,
  holdingTorque: 4800,   // g·cm
  ratedCurrent:  2.5,    // A
  resistance:    1.25,   // Ω
  inductance:    0.0018  // H
};
const MS_FACTOR = {full:1, '1/2':2, '1/4':4, '1/8':8, '1/16':16, '1/32':32};
const TORQUE_FRAC = {full:1.00, '1/2':0.70, '1/4':0.50, '1/8':0.35, '1/16':0.20, '1/32':0.10};

// Inside upd()
const VOLT = +document.getElementById('voltSel').value;  // 12 or 24
const MS   = document.getElementById('msSel').value;     // "full","1/2",etc.
const Mf   = MS_FACTOR[MS];
const Tf   = TORQUE_FRAC[MS];
const stepsRev = MOTOR.stepsFullRev * Mf;

// Max step rate (inductive ceiling, microstepping-mode independent)
const maxStepRate = VOLT / (2 * MOTOR.inductance * MOTOR.ratedCurrent);
// At 12V: ≈ 1333 steps/s; at 24V: ≈ 2667 steps/s
```

### Pattern 3: Motor Columns Inside `ROWS.map()`

**What:** Extend the existing template literal inside `ROWS.map()` with motor columns. Motor columns are computed inside the map; max step rate is pre-computed once outside (same value for every row).

**When to use:** For all six new motor columns — matches D-04 through D-09.

**Example (inside the map callback):**
```javascript
const rollersContact = Math.floor(N / 2);
const stepsPerStroke = stepsRev / N;
const uLperStep      = vol * N / stepsRev;
const torqueRim      = feasible ? (MOTOR.holdingTorque * Tf / R * 10) : null;
const FoS            = feasible ? (torqueRim / (200 * rollersContact)) : null;
const FoSClass       = FoS === null ? '' : FoS >= 2.0 ? 'ok' : FoS >= 1.0 ? 'warn' : 'no';

const motorCols = feasible
  ? `<td>${rollersContact}</td>
     <td>${stepsPerStroke.toFixed(1)}</td>
     <td>${uLperStep.toFixed(3)}</td>
     <td>${torqueRim.toFixed(0)}</td>
     <td><span class="${FoSClass}">${FoS.toFixed(2)}</span></td>
     <td>${Math.round(maxStepRate)}</td>`
  : `<td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>`;
```

### Pattern 4: FoS Traffic-Light CSS

**What:** Add `.warn` amber class to the inline `<style>` block. Reuse existing `.ok` (green) and `.no` (red).

**Existing classes (already in index.html):**
```css
.ok { color: #4cba88; font-weight: 600; }
.no { color: #e05555; font-weight: 500; font-size: 0.82rem; }
```

**Add `.warn` in the same `<style>` block:**
```css
.warn { color: #e8a020; font-weight: 600; }
```

`#e8a020` is amber/orange-gold — visually distinct from both the green `#4cba88` and red `#e05555`, and harmonises with the site's existing `--accent: #ff6b2b` orange palette.

### Pattern 5: Updated `Time` Column (D-10)

**What:** Replace the hardcoded `6400` with `stepsRev` (computed from `M_factor`).

**Existing code (line 487):**
```javascript
const totalSteps = strokes * (6400 / N);
```

**Updated code:**
```javascript
const totalSteps = strokes * (stepsRev / N);
```

`stepsRev = MOTOR.stepsFullRev * Mf` — computed once before the `ROWS.map()`.

### Pattern 6: RPM Summary Card (D-11)

**What:** Append an RPM card to the `#summary` div HTML. Follows the `.mc` card pattern.

**Example:**
```javascript
const RPM = (SP / stepsRev) * 60;
// Append to summary innerHTML:
`<div class="mc"><div class="l">${L['sum-rpm']}</div><div class="n">${RPM.toFixed(1)} <small style="font-size:0.95rem;font-weight:500">RPM</small></div></div>`
```

### Anti-Patterns to Avoid

- **Declaring motor constants inside `upd()`:** They get redeclared on every input event. Define as `const` at script scope.
- **Separate motor panel section:** D-02 is locked — motor columns go in the existing geometry table. No second table, no panel below.
- **Modifying `assets/style.css`:** All new CSS (`.warn`) goes in the inline `<style>` block inside `tools/rotor-solver/index.html` only.
- **Adding a CDN dependency:** Offline constraint is hard. No external scripts.
- **Hiding red FoS rows:** D-08 says red rows remain readable. Only style the cell content (`<span class="no">`), never the row.
- **Second step rate input:** D-03 says the existing `spS` slider is shared. Do not add a duplicate input.
- **Forgetting Italian translations:** Every new `data-i18n` key must have entries in both `LANG.en` and `LANG.it`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Colour-coded cell content | Custom inline style per cell | `.ok` / `.warn` / `.no` CSS classes | Already styled; adding a class string is one token; avoids inline style proliferation |
| i18n for new strings | Hardcoded English strings in JS | LANG object keys with `data-i18n` attributes | Existing infrastructure handles language switching automatically |
| Separate update function for motor | Separate `updMotor()` | Extend existing `upd()` | D-14 and CONTEXT.md code context: single `upd()` is the established pattern |

**Key insight:** The existing code structure is a complete, clean template. Every new feature is an extension, not a new system. The pattern is already established — follow it exactly.

---

## Max Step Rate Formula — Resolved

### Derivation

For a stepper motor winding modelled as an RL circuit, current rises linearly (simplified) when full voltage is applied:

```
I(t) = V × t / L    (linear approximation, valid for t << L/R = τ)
```

For a full step transition, current must swing from −I_rated to +I_rated (change of 2 × I_rated). The minimum time for this transition:

```
T_min = (2 × L × I_rated) / V_supply
```

Maximum step rate (steps/s):

```
f_max = 1 / T_min = V_supply / (2 × L × I_rated)
```

This is microstepping-mode **independent** — one step pulse at 1/32 requires the same minimum time as at full step. The formula gives the theoretical electrical ceiling.

**Source:** Derivation confirmed at daycounter.com/Calculators/Stepper-Motor-Calculator.phtml [CITED: daycounter.com/Calculators/Stepper-Motor-Calculator.phtml] and cross-verified via calculatorultra.com [CITED: calculatorultra.com].

### Values for Wantai 42BYGHW811 at Proto 1 Operating Conditions

| Supply | Formula | f_max |
|--------|---------|-------|
| 12 V | 12 / (2 × 0.0018 × 2.5) | **1,333 steps/s** |
| 24 V | 24 / (2 × 0.0018 × 2.5) | **2,667 steps/s** |

### Interpretation for the Tool

These are **conservative theoretical lower bounds**, not hard ceilings. The DRV8825 is a chopper-regulated driver: it applies full supply voltage to force current up quickly, then chops at high frequency to regulate. Because the driver applies `V_supply` rather than only the rated winding voltage, current rises faster than the linear model assumes. Empirical data for NEMA17 motors with similar specs shows reliable operation at 2,000–5,000 steps/s at 12V with chopper drivers, and roughly double at 24V. [ASSUMED — empirical range from training data; no datasheet-confirmed numbers for this specific motor/driver combination]

**Recommended labeling in the tool:** "Inductive ceiling (theoretical)" with a footnote explaining the formula and the conservative interpretation. This is honest to the user (a thesis tool) and supports the operating-point decision the user is trying to make.

### JavaScript Implementation

```javascript
// Computed once per upd() call, before ROWS.map()
const maxStepRate = Math.round(VOLT / (2 * MOTOR.inductance * MOTOR.ratedCurrent));
// VOLT = 12 or 24 (from voltSel)
// MOTOR.inductance = 0.0018 H
// MOTOR.ratedCurrent = 2.5 A
// At 12V → 1333 steps/s; at 24V → 2667 steps/s
```

---

## Column Ordering Recommendation (Claude's Discretion)

Recommended order — motor columns appended after `Feasible`:

| # | Column | Type |
|---|--------|------|
| 1 | Rollers N | existing |
| 2 | Rotor R (mm) | existing |
| 3 | Rotor OD (mm) | existing |
| 4 | Tube arc (mm) | existing |
| 5 | Arc gap (mm) | existing |
| 6 | Hub clr (mm) | existing |
| 7 | Geom ¹ (µL) | existing |
| 8 | Strokes → 1000 | existing |
| 9 | Time ² (s) | existing (updated) |
| 10 | Feasible | existing |
| 11 | Rollers contact | NEW |
| 12 | Steps / stroke | NEW |
| 13 | µL / step | NEW |
| 14 | Torque rim (g) | NEW |
| 15 | FoS ³ | NEW |
| 16 | Max step rate ⁴ (steps/s) | NEW |

**Rationale:** Geometry columns and feasibility check remain intact (rows 1–10) — existing users lose nothing. Motor columns follow naturally as the next decision layer. Placing `Feasible` before motor columns also means infeasible rows are identified before the motor data is even read, which matches the screening workflow.

**Footnote scheme:** ¹ geometric vol, ² time (updated to remove "1/32 microstepping" hardcoding), ³ FoS formula and threshold explanation, ⁴ max step rate formula.

---

## Common Pitfalls

### Pitfall 1: Torque-at-rim formula units
**What goes wrong:** `torqueRim = 4800 × Tf / R_mm × 10` — the `× 10` is not obvious. Without it, units are g·cm/mm = 10 × g, so the factor converts to grams-force at the rim.
**Why it happens:** The formula mixes g·cm torque with mm radius.
**How to avoid:** Keep the factor explicit and document it in a comment: `// 4800 g·cm × fraction / R_mm × 10 → g-force at rim`.
**Warning signs:** FoS values an order of magnitude off from the SPEC.md known values (FoS ~1.23 for 10 rollers, full step).

### Pitfall 2: Microstepping key mismatch
**What goes wrong:** `MS_FACTOR['1/2']` fails silently if option value is `"half"` or `"0.5"` instead of `"1/2"`.
**Why it happens:** The select option `value` attribute must match the object key exactly.
**How to avoid:** Set `<option value="1/2">1/2</option>` (or whichever key string is used) and verify the key string is identical in `MS_FACTOR` and `TORQUE_FRAC`.
**Warning signs:** `undefined` in calculations; all motor columns show `NaN`.

### Pitfall 3: Forgetting to remove hardcoded 6400 in Time column
**What goes wrong:** Time column still uses 6400 regardless of selected microstepping — contradicts D-10.
**Why it happens:** Line 487 (`const totalSteps = strokes * (6400 / N)`) is easy to overlook during editing.
**How to avoid:** Replace `6400` with `stepsRev` (computed from `MOTOR.stepsFullRev * Mf`). Grep for `6400` after edit to confirm removal.
**Warning signs:** Time column doesn't change when microstepping mode is switched.

### Pitfall 4: Infeasible row motor columns showing calculated values
**What goes wrong:** Motor columns show numbers for infeasible rows instead of `—`.
**Why it happens:** The feasibility check is used for the existing `why`/`cls` variables but the motor column generation is not gated on it.
**How to avoid:** Gate motor column generation on `feasible` flag (see Pattern 3 above). Use a ternary: `feasible ? computedColumns : '—' × 6`.
**Warning signs:** D-12 violated; infeasible rows show partial motor data.

### Pitfall 5: Note block still says "1/32 microstepping, 6400 steps/rev"
**What goes wrong:** The existing English and Italian note strings hardcode `"1⁄32 microstepping, 6400 steps/rev"` for the Time column description.
**Why it happens:** The LANG dictionary note strings must be updated to reflect the dynamic microstepping mode.
**How to avoid:** Update both `LANG.en.note` and `LANG.it.note` to say "at the selected microstepping mode" (removing the hardcoded 1/32 reference). The note is a static string in the LANG object — it cannot reference the current MS selection dynamically, so use generic phrasing.
**Warning signs:** Note still says 1/32 after implementation; user confusion about why the Time column changes.

### Pitfall 6: LANG object missing Italian entries for new keys
**What goes wrong:** Language switcher silently shows `undefined` or blank for new labels in Italian mode.
**Why it happens:** Adding keys only to `LANG.en` and forgetting `LANG.it`.
**How to avoid:** Add every new key to both language objects in the same edit. Check by switching to Italian after implementation.
**Warning signs:** Empty column headers when language is set to IT.

---

## Code Examples

### Complete Motor Constants Block (top of `<script>`)
```javascript
// Source: tools/rotor-solver/SPEC.md — Wantai 42BYGHW811 / DRV8825
const MOTOR = {
  stepsFullRev:  200,     // full steps per revolution (1.8°/step)
  holdingTorque: 4800,    // g·cm — static, both phases energised, full current
  ratedCurrent:  2.5,     // A/phase
  resistance:    1.25,    // Ω/phase
  inductance:    0.0018   // H/phase (1.8 mH)
};
const MS_FACTOR = {
  'full':1, '1/2':2, '1/4':4, '1/8':8, '1/16':16, '1/32':32
};
const TORQUE_FRAC = {
  'full':1.00, '1/2':0.70, '1/4':0.50, '1/8':0.35, '1/16':0.20, '1/32':0.10
};
```

### Motor Reads at Top of `upd()`
```javascript
const VOLT = +document.getElementById('voltSel').value;  // 12 or 24
const MS   =  document.getElementById('msSel').value;   // 'full','1/2',...,'1/32'
const Mf   = MS_FACTOR[MS];
const Tf   = TORQUE_FRAC[MS];
const stepsRev    = MOTOR.stepsFullRev * Mf;
const maxStepRate = Math.round(VOLT / (2 * MOTOR.inductance * MOTOR.ratedCurrent));
```

### Traffic-Light CSS (add to inline `<style>` block)
```css
/* FoS traffic-light — amber tier for 1.0–2.0 range */
.warn { color: #e8a020; font-weight: 600; }
```

### Updated Summary Block (RPM card appended)
```javascript
const RPM = (SP / stepsRev) * 60;
// Append to the end of the summary innerHTML template string:
`<div class="mc"><div class="l">${L['sum-rpm']}</div><div class="n">${RPM.toFixed(1)} <small style="font-size:0.95rem;font-weight:500">RPM</small></div></div>`
```

### Event Listeners (append to existing listeners block)
```javascript
document.getElementById('voltSel').addEventListener('change', upd);
document.getElementById('msSel').addEventListener('change', upd);
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hardcoded 1/32 microstepping in Time column | Dynamic M_factor from msSel dropdown | Phase 1 | Time column now reflects selected mode |
| No motor analysis | FoS, torque, max step rate per configuration | Phase 1 | Operating-point decisions from data |

**Deprecated/outdated patterns in existing code:**
- The LANG `note` values hardcode `"1⁄32 microstepping, 6400 steps/rev"` — both EN and IT strings must be updated in this phase.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Empirical reliable step rate range for NEMA17 / DRV8825 at 12V is approximately 2,000–5,000 steps/s; at 24V roughly double | Max Step Rate, Interpretation section | If wrong: the note in the tool about "practical range" is inaccurate. Low severity — the formula-derived value is the conservative floor and is mathematically correct regardless. |
| A2 | `.warn` amber `#e8a020` is visually distinct and harmonises with the site palette | Architecture Patterns — Pattern 4 | If wrong: colour could clash or be hard to distinguish; easy to adjust during implementation |

---

## Open Questions

1. **Cumulative compression load range (MOTOR-02 mentions this)**
   - REQUIREMENTS.md MOTOR-02 mentions "estimated cumulative compression load range" as a separate output
   - CONTEXT.md D-04 through D-09 define exactly six columns; none explicitly labelled "cumulative compression load range" as a separate column
   - What we know: compression load basis is 200 g/roller × rollers_in_contact = worst-case total load (this is the FoS denominator)
   - What's unclear: whether MOTOR-02 wants a separate "compression load" column (`200 × rollers_contact` in grams) or whether this is already implicit in the FoS column
   - Recommendation: Interpret MOTOR-02's "cumulative compression load range" as informational context provided in the notes section (document the 50–200 g/roller estimate, the 200 g worst-case used in FoS denominator). A separate column for the raw load in grams would be D-04 territory — the planner should either add it or confirm it maps to the FoS footnote.

---

## Environment Availability

Step 2.6: SKIPPED — this phase makes no external dependencies. It is a pure inline HTML/CSS/JS edit to a single existing file. No CLI tools, no runtimes beyond a browser, no databases, no package managers required.

---

## Validation Architecture

`workflow.nyquist_validation` is `false` in `.planning/config.json` — this section is skipped per config.

---

## Security Domain

`security_enforcement: true` in `.planning/config.json`, ASVS level 1.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth in this tool |
| V3 Session Management | No | localStorage used only for language preference (existing feature, not new) |
| V4 Access Control | No | No access-controlled resources |
| V5 Input Validation | Yes (minimal) | Existing `vol` clamping pattern: `Math.max(1, Math.min(25, vol))` — same pattern should apply to new numeric inputs if any are added |
| V6 Cryptography | No | No cryptography involved |

### Known Threat Patterns for Static Client-Side Tools

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via innerHTML injection | Tampering | All values inserted into innerHTML are computed numbers (`toFixed()`, `Math.round()`) — not user string content. The one user-supplied string is `vol` which is parsed as `parseFloat` and clamped before use. No risk beyond what already exists. |
| localStorage abuse | Tampering | Already wrapped in try/catch (LANG-04 shipped). New inputs (voltage, microstepping) do not need persistence — they are ephemeral UI state. No new localStorage writes needed. |

**Security verdict:** Low risk addition. No new attack surfaces. The only inputs are numeric (voltage dropdown — two fixed values; microstepping dropdown — six fixed values; step rate range slider). All fed through `+value` coercion into arithmetic. No user text strings are injected into the DOM.

---

## Sources

### Primary (HIGH confidence)
- `tools/rotor-solver/SPEC.md` — canonical tool spec; all formulas, motor constants, microstepping factors, FoS thresholds verified by reading the file
- `tools/rotor-solver/index.html` — full source file read; all existing patterns confirmed directly
- `.planning/phases/01-motor-microstepping-panel/01-CONTEXT.md` — locked decisions verified by reading the file
- `.planning/REQUIREMENTS.md` — MOTOR-01 through MOTOR-04 verified by reading the file

### Secondary (MEDIUM confidence)
- [daycounter.com Stepper Motor Calculator](https://www.daycounter.com/Calculators/Stepper-Motor-Calculator.phtml) — confirmed `f_max = V / (2 × L × I_rated)` formula derivation from `T = L × I × 2 / V`
- [calculatorultra.com Stepper Motor Maximum Speed Calculator](https://www.calculatorultra.com/en/tool/stepper-motor-maximum-speed-power-calculator.html) — cross-confirmed same formula; confirmed steps/s form cancels steps/rev

### Tertiary (LOW confidence)
- WebSearch results re: NEMA17 practical speed ranges with DRV8825 (empirical ceiling estimates — tagged `[ASSUMED]`)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no packages; all logic is vanilla JS
- Architecture: HIGH — source file read in full; patterns confirmed directly
- Max step rate formula: MEDIUM — formula cross-verified at two calculator sources; practical ceiling is `[ASSUMED]`
- Pitfalls: HIGH — derived from direct reading of the source file and formula analysis

**Research date:** 2026-05-30
**Valid until:** Stable indefinitely — no external dependencies, no npm packages to go stale
