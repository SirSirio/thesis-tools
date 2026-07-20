---
status: complete
---

# Quick Task 260720-pmt — Summary

**Apply the audited, per-specific-MCU GPIO threshold, and correct the integrated-screen boards so
their free-pin count reflects the pins the onboard screen already consumes.**

## Key correction
The ceiling was already per-brain (`brain.gpioUsable`), but two values were wrong/estimated:
- **Bare ESP32 (DOIT 30-pin): 15 → 16** — the audited safe output-capable set (GPIO 4,5,13,14,16–19,
  21–23,25–27,32,33; GPIO5 the one strapping pin kept).
- **Integrated 2.4″ (ESP32-2432S024): 9 → 3** — a real error. The CYD 2.4″ breaks out only GPIO
  21/22/35 (35 input-only, 21 backlight). The onboard screen consumes the rest.
- Integrated 3.2″ (ESP32-2432S032R): unchanged at 3 (already audited: 22/27/35).

## Consequence (correct, and important)
With the 2.4″ board at 3 free pins, **ESPINT-fused-i2c now OVERRUNs (by 4)** instead of falsely showing
"2 free". A 3-free-pin integrated board **cannot fuse pump control** — it can only be a pure brain over
a 2-pin I²C bus to a separate pump node (`ESPINT32-brain-i2c`, which fits at 3). The "All-in-One fused"
option on these boards is not physically feasible; the matrix now says so.

The integrated-screen accounting Sirio described was already modelled correctly: for integrated brains
`Screen (A) = 0` (no second screen attached) and the ceiling is the post-screen free count. The bug was
only the wrong 2.4″ number; fixing it makes the whole thing consistent.

## Files
- `index.html`: esp32 gpioUsable 15→16, espscreen 9→3 (+ corrected uiNotes/source).
- `PIN-BUDGET-ANALYSIS.md`: §1 formula, §2 ESP32 basis, §4 worked table (all deficits recomputed; added
  ESPINT-fused-i2c as an overrun row), §7 audit rows (+ 2 integrated boards) and per-brain ceiling table,
  "fits" list, bibliography (+ CYD source). All 15→16 / 9→3 sweeps done.
- `SPEC.md`: brain-spec table (9→3), ESPINT contrast paragraph rewritten, pin-budget ceiling paragraph.

## Verification
- `node --check`: pass.
- Browser: esp32 rows +1 headroom (T9-fused-i2c 0→1 free, N2-nano-485 1→2, S1-i2c by4→by3); ESPINT-fused-i2c
  now OVERRUN by 4 and dimmed/sunk; ESPINT32-brain-i2c still 0 free (pure brain). 13 feasible / 9 infeasible,
  ordering correct, no overflow. No bare-ESP32 feasibility flips.
