# Phase 1: Motor & Microstepping Panel — Pattern Map

**Mapped:** 2026-05-30
**Files analyzed:** 1 (single file modified — `tools/rotor-solver/index.html`)
**Analogs found:** 7 / 7 (all from the same file being modified)

---

## File Classification

| Element to Add / Modify | Role | Data Flow | Closest Analog (in index.html) | Match Quality |
|-------------------------|------|-----------|-------------------------------|---------------|
| `voltSel` select input | control/input | request-response | `idSel` / `bSel` selects (lines 292–302) | exact |
| `msSel` select input | control/input | request-response | `idSel` / `bSel` selects (lines 292–302) | exact |
| Motor constants block | config | — | `ROWS`, `TUBE_AVAIL` constants (lines 439–440) | role-match |
| Motor columns in `ROWS.map()` | template/transform | CRUD | Existing `<td>` column block (lines 500–511) | exact |
| FoS `.warn` CSS class | style | — | `.ok` / `.no` feasibility badge classes (lines 250–251) | exact |
| RPM summary card | component | request-response | Existing `.mc` card block (lines 516–521) | exact |
| New `<th>` headers | template | — | Existing `<th>` block (lines 323–333) | exact |
| LANG keys for new labels | i18n/config | — | Existing `LANG.en` / `LANG.it` objects (lines 349–421) | exact |
| Updated `Time` column formula | transform | — | `totalSteps` line (line 487) | exact |
| Notes/footnotes extension | documentation | — | `.note` block (lines 340, 382, 418) | exact |

---

## Pattern Assignments

### 1. Voltage and Microstepping Select Inputs (D-01)

**Analog:** `idSel` and `bSel` selects — `tools/rotor-solver/index.html` lines 292–302

**HTML pattern** (lines 292–302):
```html
<div class="cg"><label data-i18n="label-id">Tube ID</label><select id="idSel">
  <option value="0.25">0.25 mm</option>
  <option value="0.51" selected="selected">0.51 mm</option>
  <option value="0.76">0.76 mm</option>
  <option value="1.02">1.02 mm</option>
  <option value="1.14">1.14 mm</option>
</select></div>
<div class="cg"><label data-i18n="label-bearing">Roller bearing</label><select id="bSel">
  <option value="16" selected="selected">625-2RS &mdash; 16 mm OD</option>
  <option value="10">MR105ZZ &mdash; 10 mm OD</option>
</select></div>
```

**New inputs to add** (drop into the `.ctrl` grid after the `spS` slider block, lines 309–312):
```html
<div class="cg"><label data-i18n="label-volt">Supply voltage</label><select id="voltSel">
  <option value="12" selected="selected">12 V</option>
  <option value="24">24 V</option>
</select></div>
<div class="cg"><label data-i18n="label-ms">Microstepping</label><select id="msSel">
  <option value="full">Full step</option>
  <option value="1/2">1/2</option>
  <option value="1/4">1/4</option>
  <option value="1/8" selected="selected">1/8</option>
  <option value="1/16">1/16</option>
  <option value="1/32">1/32</option>
</select></div>
```

**Note on option value strings:** The `value` attributes must match the keys in `MS_FACTOR` and `TORQUE_FRAC` exactly (`'full'`, `'1/2'`, `'1/4'`, `'1/8'`, `'1/16'`, `'1/32'`). Mismatch causes silent `undefined` in all motor calculations.

**CSS pattern** (lines 127–139) — already styled, no new CSS needed:
```css
select {
  font-size: 0.88rem;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,107,43,0.25);
  background: rgba(15,10,10,0.7);
  color: var(--text);
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
  width: 100%;
}
select:focus { border-color: var(--accent); }
```

**Event listener pattern** (lines 526–527):
```javascript
['idSel', 'bSel'].forEach(id =>
  document.getElementById(id).addEventListener('change', upd));
```
Add the two new selects to this same pattern:
```javascript
['idSel', 'bSel', 'voltSel', 'msSel'].forEach(id =>
  document.getElementById(id).addEventListener('change', upd));
```

---

### 2. Motor Constants Block (script scope, not inside `upd()`)

**Analog:** `ROWS` and `TUBE_AVAIL` script-scope constants — `tools/rotor-solver/index.html` lines 439–440:
```javascript
const ROWS = [3, 4, 5, 6, 8, 10, 12];
const TUBE_AVAIL = 300;
```

**New constants block** — place immediately after `TUBE_AVAIL` (after line 440):
```javascript
// ── Motor constants — Wantai 42BYGHW811 / DRV8825 ──────────────
// Source: tools/rotor-solver/SPEC.md
const MOTOR = {
  stepsFullRev:  200,     // full steps/rev (1.8°/step)
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

**Rationale for script scope:** Constants defined inside `upd()` are redeclared on every input event. Placing them at script scope (same level as `ROWS`) avoids repeated allocation.

---

### 3. Motor Input Reads at Top of `upd()`

**Analog:** Existing input reads at top of `upd()` — `tools/rotor-solver/index.html` lines 450–458:
```javascript
const ID   = +document.getElementById('idSel').value;
const bOD  = +document.getElementById('bSel').value;
const occ  = +document.getElementById('occS').value;
const boss = +document.getElementById('bossS').value;
const SP   = +document.getElementById('spS').value;
```

**New reads** — add immediately after the existing reads (after `SP`, line 458):
```javascript
const VOLT = +document.getElementById('voltSel').value;  // 12 or 24
const MS   =  document.getElementById('msSel').value;   // 'full','1/2',...,'1/32'
const Mf   = MS_FACTOR[MS];
const Tf   = TORQUE_FRAC[MS];
const stepsRev    = MOTOR.stepsFullRev * Mf;            // steps per full revolution
const maxStepRate = Math.round(VOLT / (2 * MOTOR.inductance * MOTOR.ratedCurrent));
// f_max = V / (2 × L × I_rated) — inductive ceiling (theoretical lower bound)
// At 12V → 1333 steps/s; at 24V → 2667 steps/s
```

---

### 4. Updated `Time` Column (D-10)

**Analog:** Current `totalSteps` line — `tools/rotor-solver/index.html` line 487:
```javascript
const totalSteps = strokes * (6400 / N);
```

**Replace with:**
```javascript
const totalSteps = strokes * (stepsRev / N);
// stepsRev = MOTOR.stepsFullRev * Mf — now dynamic, not hardcoded to 6400 (1/32)
```

**Grep check after edit:** Search for `6400` in `index.html` to confirm complete removal.

---

### 5. Motor Columns Inside `ROWS.map()` (D-04 through D-09)

**Analog:** Existing `<td>` block inside `ROWS.map()` — `tools/rotor-solver/index.html` lines 500–511:
```javascript
return `<tr class="${cls}">
  <td>${N}</td>
  <td>${R.toFixed(1)}</td>
  <td>${OD.toFixed(1)}</td>
  <td>${tubeLen.toFixed(1)}</td>
  <td>${arcGap.toFixed(1)}</td>
  <td>${hubClr.toFixed(1)}</td>
  <td>${geomVol.toFixed(2)}</td>
  <td>${Math.round(strokes)}</td>
  <td>${time.toFixed(1)}</td>
  <td>${why}</td>
</tr>`;
```

**Motor column computations** — add inside the map callback, after `why` is defined (after line 498) and before the `return` statement:
```javascript
// Motor columns (D-04 through D-09)
const rollersContact = Math.floor(N / 2);
const stepsPerStroke = stepsRev / N;
const uLperStep      = vol * N / stepsRev;
const torqueRim      = feasible
  ? MOTOR.holdingTorque * Tf / R * 10   // g·cm × fraction / R_mm × 10 → g-force at rim
  : null;
const FoS            = feasible ? (torqueRim / (200 * rollersContact)) : null;
const FoSClass       = FoS === null ? ''
                     : FoS >= 2.0 ? 'ok'
                     : FoS >= 1.0 ? 'warn'
                     : 'no';

const motorCols = feasible
  ? `<td>${rollersContact}</td>
     <td>${stepsPerStroke.toFixed(1)}</td>
     <td>${uLperStep.toFixed(3)}</td>
     <td>${torqueRim.toFixed(0)}</td>
     <td><span class="${FoSClass}">${FoS.toFixed(2)}</span></td>
     <td>${maxStepRate}</td>`
  : `<td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>`;
```

**Updated return statement** — append `${motorCols}` before the closing `</tr>`:
```javascript
return `<tr class="${cls}">
  <td>${N}</td>
  <td>${R.toFixed(1)}</td>
  <td>${OD.toFixed(1)}</td>
  <td>${tubeLen.toFixed(1)}</td>
  <td>${arcGap.toFixed(1)}</td>
  <td>${hubClr.toFixed(1)}</td>
  <td>${geomVol.toFixed(2)}</td>
  <td>${Math.round(strokes)}</td>
  <td>${time.toFixed(1)}</td>
  <td>${why}</td>
  ${motorCols}
</tr>`;
```

---

### 6. New `<th>` Headers (D-04 through D-09)

**Analog:** Existing `<thead>` row — `tools/rotor-solver/index.html` lines 322–333:
```html
<thead>
<tr>
<th data-i18n="th-rollers">Rollers</th>
<th data-i18n="th-rotor-r">Rotor R<br>(mm)</th>
...
<th data-i18n="th-feasible">Feasible</th>
</tr>
</thead>
```

**New `<th>` cells** — append after `th-feasible` in the same `<tr>`:
```html
<th data-i18n="th-contact">Rollers<br>contact</th>
<th data-i18n="th-steps-stroke">Steps /<br>stroke</th>
<th data-i18n="th-ul-step">&micro;L /<br>step</th>
<th data-i18n="th-torque-rim">Torque rim<br>(g)</th>
<th data-i18n="th-fos">FoS &sup3;</th>
<th data-i18n="th-max-step">Max step rate &sup4;<br>(steps/s)</th>
```

**CSS already handles these** — `tbl th` styling (lines 223–236) applies automatically. Headers use `white-space: normal; line-height: 1.35` so the `<br>` wrapping already works for existing columns.

---

### 7. FoS Traffic-Light CSS (D-08)

**Analog:** Existing feasibility badge classes — `tools/rotor-solver/index.html` lines 250–251:
```css
/* Feasibility badges */
.ok { color: #4cba88; font-weight: 600; }
.no { color: #e05555; font-weight: 500; font-size: 0.82rem; }
```

**Add `.warn`** in the same `<style>` block, immediately after `.no` (after line 251):
```css
.warn { color: #e8a020; font-weight: 600; }
```

`#e8a020` is amber/orange-gold — visually distinct from green `#4cba88` and red `#e05555`, and harmonises with the site's `--accent: #ff6b2b` orange palette.

---

### 8. RPM Summary Card (D-11)

**Analog:** Existing `.mc` cards in `summary` innerHTML — `tools/rotor-solver/index.html` lines 516–521:
```javascript
document.getElementById('summary').innerHTML = `
  <div class="mc"><div class="l">${L['sum-target']}</div><div class="n">${vol.toFixed(1)} <small style="font-size:0.95rem;font-weight:500">μL</small></div></div>
  <div class="mc"><div class="l">${L['sum-geom']}</div><div class="n">${geomVol.toFixed(2)} <small style="font-size:0.95rem;font-weight:500">μL</small></div></div>
  <div class="mc"><div class="l">${L['sum-arc']}</div><div class="n">${arcNeeded.toFixed(1)} <small style="font-size:0.95rem;font-weight:500">mm</small></div></div>
  <div class="mc"><div class="l">${L['sum-feasible']}</div><div class="n">${feasCount} <small style="font-size:0.95rem;font-weight:500">of ${ROWS.length}</small></div></div>
  <div class="mc"><div class="l">${L['sum-minr']}</div><div class="n">${minR !== null ? minR.toFixed(1) + ' <small style="font-size:0.95rem;font-weight:500">mm</small>' : '—'}</div></div>`;
```

**RPM computation** — add before the `summary.innerHTML` assignment:
```javascript
const RPM = (SP / stepsRev) * 60;
```

**Append RPM card** to the end of the template literal:
```javascript
<div class="mc"><div class="l">${L['sum-rpm']}</div><div class="n">${RPM.toFixed(1)} <small style="font-size:0.95rem;font-weight:500">RPM</small></div></div>
```

---

### 9. LANG Object — New Keys (D-13, i18n)

**Analog:** Existing LANG objects — `tools/rotor-solver/index.html` lines 349–421.

**Pattern:** Every new `data-i18n` key must appear in both `LANG.en` and `LANG.it`. The `note` key is an HTML string value; static labels are plain strings.

**New keys for `LANG.en`** (add after `'sum-minr'` entry, line 378, and before `'feas-yes'`):
```javascript
'label-volt':     'Supply voltage',
'label-ms':       'Microstepping',
'sum-rpm':        'Rotor speed',
'th-contact':     'Rollers<br>contact',
'th-steps-stroke':'Steps /<br>stroke',
'th-ul-step':     'μL /<br>step',
'th-torque-rim':  'Torque rim<br>(g)',
'th-fos':         'FoS ³',
'th-max-step':    'Max step rate ⁴<br>(steps/s)',
```

**New keys for `LANG.it`** (add after `'sum-minr'` entry, line 413, and before `'feas-yes'`):
```javascript
'label-volt':     'Tensione alimentazione',
'label-ms':       'Microstepping',
'sum-rpm':        'Velocità rotore',
'th-contact':     'Rulli<br>contatto',
'th-steps-stroke':'Step /<br>ciclo',
'th-ul-step':     'μL /<br>step',
'th-torque-rim':  'Coppia rim<br>(g)',
'th-fos':         'FoS ³',
'th-max-step':    'Step rate max ⁴<br>(steps/s)',
```

**Updated `note` key** — both `LANG.en.note` and `LANG.it.note` must have the hardcoded `"1⁄32 microstepping, 6400 steps/rev"` phrase in the Time footnote replaced with `"at the selected microstepping mode"`. The planner must also append motor footnotes ³ and ⁴ to both note strings.

---

### 10. Notes Block Extension (D-13)

**Analog:** Existing `.note` element — `tools/rotor-solver/index.html` line 340:
```html
<p class="note animate-in" style="--delay: 0.42s;" data-i18n="note">...</p>
```

The `data-i18n="note"` attribute means `applyLang()` replaces the full `innerHTML` from `LANG[lang]['note']`. No structural HTML change is needed — only the LANG `note` string values are updated.

**Pattern for the existing note value** (lines 382, 418 — EN and IT respectively):
```javascript
'note': '<b>¹ Geometric swept volume</b> per stroke = ... <br><b>² Dispense time</b> for 1000 μL at the set step rate, 1⁄32 microstepping, 6400 steps/rev, excludes accel/decel.<br>...'
```

**Changes required in the `note` string:**
1. Replace `"1⁄32 microstepping, 6400 steps/rev"` with `"at the selected microstepping mode"` in both EN and IT.
2. Append motor footnotes ³ and ⁴, and a motor constants reference block. Pattern to follow (same `<b>` + `<br>` style):

```javascript
// Append to LANG.en.note:
'<br><b>³ Factor of Safety (FoS)</b> = torque at rim ÷ (200 g × rollers in contact). ' +
'Green ≥ 2.0 · amber 1.0–2.0 · red &lt; 1.0. Torque at rim (g) = 4800 × torque_fraction ÷ R_mm × 10.' +
'<br><b>⁴ Max step rate (inductive ceiling, theoretical lower bound)</b> = V_supply ÷ (2 × L × I_rated). ' +
'At 12 V → 1333 steps/s; at 24 V → 2667 steps/s. DRV8825 chopper regulation enables higher practical rates.' +
'<br><b>Motor:</b> Wantai 42BYGHW811 — 200 steps/rev (1.8°), 4800 g·cm holding torque, 2.5 A/phase, 1.25 Ω, 1.8 mH. ' +
'Driver: DRV8825. Torque fractions: full=1.00, 1/2=0.70, 1/4=0.50, 1/8=0.35, 1/16=0.20, 1/32=0.10.'
```

---

## Shared Patterns

### `upd()` Function — Single Update Entry Point
**Source:** `tools/rotor-solver/index.html` lines 447–522
**Apply to:** All new motor calculations

All new motor input reads, computations, and DOM writes happen inside the existing `upd()` function. No separate motor update function. This is an absolute project constraint (CONTEXT.md, CLAUDE.md).

Structure of `upd()` — insert points:
1. **After line 458** (`SP` read) — add `VOLT`, `MS`, `Mf`, `Tf`, `stepsRev`, `maxStepRate` reads
2. **Line 487** — replace `6400` with `stepsRev`
3. **After line 498** (`why` defined, before `return`) — add motor column computations
4. **Lines 500–511** (`return` template literal) — append `${motorCols}` before `</tr>`
5. **Before line 516** (`summary.innerHTML`) — compute `RPM`
6. **Line 521** (end of summary template literal) — append RPM card

### Event Listener Pattern
**Source:** `tools/rotor-solver/index.html` lines 524–527
**Apply to:** `voltSel` and `msSel`

```javascript
// Current pattern:
['idSel', 'bSel'].forEach(id =>
  document.getElementById(id).addEventListener('change', upd));

// Extended pattern:
['idSel', 'bSel', 'voltSel', 'msSel'].forEach(id =>
  document.getElementById(id).addEventListener('change', upd));
```

### `data-i18n` Attribute Pattern
**Source:** Any static label in `index.html` (e.g., line 289: `data-i18n="label-vol"`)
**Apply to:** All new `<label>` and `<th>` elements

Every new static label gets `data-i18n="key"`. Dynamic numeric outputs (card values, `<td>` content) do NOT get `data-i18n` — they are set by JS template literals.

### Infeasible Row Guard Pattern
**Source:** `tools/rotor-solver/index.html` lines 482–484, 491–497
**Apply to:** All six motor columns

```javascript
const feasible = (arcGap > 0) && (hubClr > 0) && tubeOK;
// ...
const motorCols = feasible ? `...computed...` : `<td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>`;
```

Motor column values for infeasible rows must always be `—`, never a computed number.

---

## No Analog Found

All patterns have direct analogs in the existing file. No new architectural patterns are needed.

---

## Metadata

**Analog search scope:** `tools/rotor-solver/index.html` (538 lines, read in full — single file project)
**Files scanned:** 1
**Pattern extraction date:** 2026-05-30
