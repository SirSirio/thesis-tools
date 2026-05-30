---
phase: 01-motor-microstepping-panel
reviewed: 2026-05-30T00:00:00Z
depth: standard
files_reviewed: 1
files_reviewed_list:
  - tools/rotor-solver/index.html
findings:
  critical: 0
  warning: 3
  info: 3
  total: 6
status: issues_found
---

# Phase 1: Code Review Report

**Reviewed:** 2026-05-30
**Depth:** standard
**Files Reviewed:** 1
**Status:** issues_found

---

## Summary

Single-file review of `tools/rotor-solver/index.html` for the Phase 1 motor and microstepping panel additions. The geometry solver base is intact. All six new motor columns (D-04 through D-09) are present. Key-string alignment between `msSel` option values and `MS_FACTOR`/`TORQUE_FRAC` keys is exact. The hardcoded `6400` has been correctly replaced with the dynamic `stepsRev` expression. Infeasibility guard (`feasible ? ... : null`) correctly prevents torque and FoS computations on infeasible rows. The `.warn` amber class is defined only in the inline `<style>` block and is absent from `assets/style.css`. No security-exploitable XSS paths exist — all `innerHTML` interpolations use arithmetic output (`.toFixed()`) or compile-time constant strings.

Three warnings were found: `stepsPerStroke` produces non-integer display values that misrepresent a physically discrete quantity; the `× 10` unit-conversion factor in `torqueRim` is undocumented in code; and `vol` fires a full DOM rewrite on every keystroke including intermediate invalid states. Three info items cover an ambiguous formula in the note text, an unexplained gap in the `ROWS` array, and an untranslated footer paragraph in Italian mode.

No Critical (BLOCKER) issues were found.

---

## Warnings

### WR-01: `stepsPerStroke` is non-integer for many N/mode combinations — column label implies a discrete firmware constant

**File:** `tools/rotor-solver/index.html:571,585`

**Issue:** `stepsPerStroke = stepsRev / N`. For N=3 at 1/8 step this equals `1600 / 3 = 533.333...`; for N=3 at 1/32 step it equals `6400 / 3 = 2133.333...`. The column header `Steps / stroke` suggests a count a firmware developer can directly program into a step loop. The `.toFixed(1)` render (line 585) produces `533.3`, `2133.3`, etc. — values that cannot be used as a step count without rounding, and where the rounding error accumulates over a dispense cycle. Users relying on this column to configure firmware will produce incorrect dispense volumes unless they independently recognize the value must be rounded.

**Fix:** Either round the displayed value to the nearest integer and note the caveat, or add an asterisk when the value is non-integer:

```js
// Option A — always round, add footnote
<td>${Math.round(stepsPerStroke)}</td>

// Option B — flag non-integers
const spsDisplay = Number.isInteger(stepsPerStroke)
  ? stepsPerStroke
  : stepsPerStroke.toFixed(1) + '*';
<td>${spsDisplay}</td>
// * note: fractional — rounds to nearest step in firmware
```

Also add a note that roller counts N=3, 6 do not evenly divide `stepsRev` at 1/8 and 1/32 microstepping.

---

### WR-02: `torqueRim` unit-conversion factor `× 10` is unexplained in code

**File:** `tools/rotor-solver/index.html:573`

**Issue:**

```js
const torqueRim = MOTOR.holdingTorque * Tf / R * 10;
```

`MOTOR.holdingTorque` is in g·cm. `R` is in mm. To obtain g-force at the rim, the formula must divide g·cm by R expressed in cm, not mm. The `× 10` corrects this unit mismatch (mm → cm). This derivation is not stated anywhere in the code. A future maintainer who changes `MOTOR.holdingTorque` to N·m or adds a mm→cm conversion elsewhere would silently introduce a factor-of-10 error. The note (line 411) reproduces the formula but also omits the unit-conversion explanation.

**Fix:** Add an inline comment:

```js
// holdingTorque [g·cm], R [mm] → ÷R gives g·cm/mm = g/10 → ×10 restores g-force at rim
const torqueRim = MOTOR.holdingTorque * Tf / R * 10;
```

---

### WR-03: `vol` number input fires `upd()` on every keystroke including transient invalid states

**File:** `tools/rotor-solver/index.html:623`

**Issue:**

```js
document.getElementById('volN').addEventListener('input', upd);
```

While the user types `15` they first produce `1`, which triggers `upd()` with `vol=1`. The table redraws with a 1 µL design point; then the user types `5` and the table redraws again. For the six geometry rows this is low-cost, but the new motor columns add FoS class assignments and string templating per row. More importantly, the `isNaN` guard on line 511 silently substitutes `vol=5` when the field is blank or holds a partial value like `"1."` — so the user sees the table jump to 5 µL while they are still typing. This is a pre-existing pattern but is more visible now that the table has 16 columns.

**Fix:** Replace `input` with `change` for the number field, which fires only on commit (blur or Enter):

```js
document.getElementById('volN').addEventListener('change', upd);
```

Or, if live update is desired, debounce:

```js
let volTimer;
document.getElementById('volN').addEventListener('input', () => {
  clearTimeout(volTimer);
  volTimer = setTimeout(upd, 180);
});
```

---

## Info

### IN-01: `torque_rim` formula in the note block is ambiguous without parentheses

**File:** `tools/rotor-solver/index.html:411`

**Issue:** The note reads:

> Torque at rim (g) = 4800 × torque_fraction ÷ R_mm × 10

Without explicit parentheses, a reader applying right-to-left precedence or treating `÷` as grouping might compute `4800 × Tf / (R × 10)` (100x too small) instead of `(4800 × Tf / R) × 10`. The code is unambiguous; the prose is not.

**Fix:**

```
Torque at rim (g) = (4800 [g·cm] × torque_fraction ÷ R [mm]) × 10 [mm/cm] — converts g·cm at shaft to g-force at rim
```

The same formula appears identically in `LANG.it.note` (line 460) and should be updated there too.

---

### IN-02: `ROWS` array silently skips odd counts above 6 with no explanation

**File:** `tools/rotor-solver/index.html:484`

**Issue:**

```js
const ROWS = [3, 4, 5, 6, 8, 10, 12];
```

Roller counts 7, 9, and 11 are absent. The rationale — even counts above 6 give symmetric rotor balance — is not stated in any comment. A contributor extending the tool would not know whether the omission is intentional.

**Fix:**

```js
// Even counts preferred above 6: symmetric roller placement avoids rotor imbalance.
// 3 and 5 retained as common odd values for compact designs.
const ROWS = [3, 4, 5, 6, 8, 10, 12];
```

---

### IN-03: Second footer paragraph has no `data-i18n` attribute — shows English text in Italian mode

**File:** `tools/rotor-solver/index.html:362`

**Issue:**

```html
<p data-i18n="footer-university">Technical University of Denmark · Department of Health Technology</p>
<p>Sirio Vittorio Feltrin · 2025–2026</p>
```

The author/date line has no `data-i18n` attribute and is never translated. In Italian mode it remains in English. This is pre-existing behavior and not a Phase 1 regression. Author names and dates are reasonably language-neutral, so this may be intentional.

**Fix (optional):** Either document the intentional omission with an HTML comment, or add `data-i18n="footer-author"` with both language entries if translation is desired.

---

_Reviewed: 2026-05-30_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
