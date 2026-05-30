---
phase: 01-motor-microstepping-panel
plan: 02
subsystem: rotor-solver
tags: [motor-calculations, table-columns, fos, i18n, rpm-card]
dependency_graph:
  requires:
    - phase: 01-motor-microstepping-panel
      plan: 01
      provides: [voltSel, msSel, MOTOR, MS_FACTOR, TORQUE_FRAC, .warn]
  provides:
    - motor reads in upd() (VOLT/MS/Mf/Tf/stepsRev/maxStepRate)
    - six motor columns per feasible row (rollersContact, stepsPerStroke, uLperStep, torqueRim, FoS, maxStepRate)
    - FoS traffic-light coloring (ok/warn/no classes)
    - dynamic Time column (stepsRev/N replacing hardcoded 6400)
    - RPM summary card
    - six new <th> headers with EN/IT i18n
  affects: [01-03-PLAN.md]
tech-stack:
  added: []
  patterns: [feasible-guard ternary for motor columns, FoS threshold class selection, RPM from stepsRev]
key-files:
  created: []
  modified: [tools/rotor-solver/index.html]
key-decisions:
  - "torqueRim = MOTOR.holdingTorque * Tf / R * 10 — the ×10 converts g·cm/mm to g-force at rim; kept as inline comment per SPEC.md"
  - "maxStepRate is microstepping-independent (inductive ceiling formula); computed once in upd() and referenced inside motorCols for all rows"
  - "LANG.note strings updated with dynamic wording (removed 6400 reference) plus motor footnotes 3 and 4; inline HTML fallback note also updated"
  - "motorCols emits 6 <td>—</td> for infeasible rows; FoS numeric value always visible regardless of colour class (red rows not hidden)"
requirements-completed: [MOTOR-01, MOTOR-02]
duration: 25m
completed: 2026-05-30
---

# Phase 01 Plan 02: Motor & Microstepping Panel — Calculations and Display Summary

**Six motor columns (rollers in contact, steps/stroke, µL/step, torque rim, FoS with traffic light, max step rate) wired into upd() and surfaced in the geometry table, with dynamic Time column and RPM summary card driven by selected microstepping and voltage.**

## Performance

- **Duration:** 25 min
- **Started:** 2026-05-30T10:00:00Z
- **Completed:** 2026-05-30T10:25:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Motor reads added to `upd()`: VOLT, MS, Mf (MS_FACTOR lookup), Tf (TORQUE_FRAC lookup), stepsRev, maxStepRate
- Time column now dynamic: `totalSteps = strokes * (stepsRev / N)` — no hardcoded 6400 remains in index.html
- Six motor column values computed per row inside ROWS.map(): rollersContact, stepsPerStroke, uLperStep, torqueRim (×10 rim conversion), FoS, FoSClass (ok/warn/no thresholds)
- Infeasible rows render `—` for all six motor columns (T-02-02 threat mitigation)
- Six new `<th>` headers appended to thead with data-i18n keys and EN/IT translations
- RPM card added to summary: `RPM = (SP / stepsRev) * 60`
- LANG.en.note and LANG.it.note updated: removed "6400 steps/rev" reference, added motor footnotes ³ and ⁴

## Task Commits

Each task was committed atomically:

1. **Task 1: Add motor reads to upd(), dynamic Time column, compute motor columns** - `f3771c0` (feat)
2. **Task 2: Append six table headers, wire motorCols into rows, add RPM card** - `acd64ab` (feat)

**Plan metadata:** (see final commit below)

## Files Created/Modified

- `tools/rotor-solver/index.html` — motor reads, motor column computations, six <th> headers, motorCols in ROWS.map(), RPM card, updated LANG.note strings

## Decisions Made

- `torqueRim = MOTOR.holdingTorque * Tf / R * 10`: the ×10 factor converts g·cm/mm to g-force at the rim; kept with inline comment per PATTERNS.md Pitfall 1 guidance
- `maxStepRate` is microstepping-independent (V / (2×L×I)), computed once in upd() and re-used in each feasible row's motorCols
- `LANG.note` strings updated in both EN and IT to remove the hardcoded "1⁄32 microstepping, 6400 steps/rev" text and append motor footnotes ³ and ⁴; the inline HTML fallback `<p>` was also updated
- Infeasible row guard: `motorCols = feasible ? ...computed... : '<td>—</td>...'` — fulfills T-02-02 mitigate disposition from threat model

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Updated LANG.note strings and inline note HTML**
- **Found during:** Task 1 (removing hardcoded 6400)
- **Issue:** The `6400` literal persisted in inline HTML `<p data-i18n="note">` and in both `LANG.en.note` and `LANG.it.note` strings after replacing `totalSteps`. Acceptance criteria require no literal 6400 anywhere in index.html.
- **Fix:** Updated inline HTML note fallback, LANG.en.note, and LANG.it.note — replaced "1⁄32 microstepping, 6400 steps/rev" with "at the selected microstepping mode" and appended motor footnotes ³ and ⁴ per PATTERNS.md Section 10.
- **Files modified:** tools/rotor-solver/index.html
- **Verification:** `grep -q '6400'` returns no matches
- **Committed in:** f3771c0 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 2 — missing critical update to note strings)
**Impact on plan:** Required for acceptance criteria compliance (no 6400 anywhere). Aligned with PATTERNS.md Section 10 guidance. No scope creep.

## Issues Encountered

None — all edits applied cleanly.

## Known Stubs

None — all six motor columns are computed from real inputs. RPM card is live. No placeholders or hardcoded display values.

## Threat Flags

No new threat surface. T-02-01 (numeric values only via toFixed/Math.round — no user strings in innerHTML) and T-02-02 (infeasible rows show — via feasible guard) both addressed as planned.

## Next Phase Readiness

- Motor column calculations and display complete — plan 02 contracts fulfilled
- Plan 03 (notes and footnotes) can proceed: LANG.note strings already extended with motor footnotes ³ and ⁴ in this plan
- MOTOR-01 and MOTOR-02 requirements satisfied

## Self-Check: PASSED

- tools/rotor-solver/index.html modified: confirmed (git log f3771c0, acd64ab)
- No literal 6400 in index.html: confirmed (grep)
- stepsRev = MOTOR.stepsFullRev * Mf: confirmed (grep)
- maxStepRate = Math.round(VOLT / ...): confirmed (grep)
- Math.floor(N / 2) rollersContact: confirmed (grep)
- MOTOR.holdingTorque * Tf / R * 10: confirmed (grep)
- FoS >= 2.0 ? 'ok': confirmed (grep)
- class="${FoSClass}": confirmed (grep)
- 16 <th> headers: confirmed (grep count)
- ${motorCols} in return template: confirmed (grep)
- RPM = (SP / stepsRev) * 60: confirmed (grep)
- sum-rpm in summary innerHTML: confirmed (grep)
- th-contact through th-max-step in both LANG.en and LANG.it (2+ lines each): confirmed (grep)
- sum-rpm in both LANG objects: confirmed (3 lines — 2 LANG + 1 summary usage)
- No new files created: confirmed

---
*Phase: 01-motor-microstepping-panel*
*Completed: 2026-05-30*
