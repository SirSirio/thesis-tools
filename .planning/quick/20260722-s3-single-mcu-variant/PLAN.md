---
type: quick
slug: s3-single-mcu-variant
created: 2026-07-22
---

# Add ESP32-S3-Nano single-MCU variant + present both design & prototype builds

## Task
Add the ESP32-S3-Nano brain and the single-MCU `SC6-s3exp-i2c` variant to the System
Architecture Explorer, rewrite Part 5 to present both the final "best design" (S3-Nano + one
MCP23017, single MCU) and the "best for prototyping" (DOIT ESP32 + owned Nanos, shared-clock)
solutions with rationale, and run a whole-page consistency pass.

## Changes
- **DEFAULTS:** new `esp32s3` brain (€19.93, gpioUsable 21 Medium, 8 MB octal PSRAM, UI note).
- **Engine:** `brainKeyOf(v)` helper so `pinsOf()`/`bomHtml()` budget S3 rows against 21, not 16;
  diagram brain box + BOM header now brain-aware.
- **VARIANTS:** new `SC6-s3exp-i2c` (fused single-MCU S3 + MCP23017, ENABLE on direct GPIO,
  alignment on expander, `absorbsAlign`). 24 → 25 variants.
- **Part 5:** feasibility table + cost table + full recommendation rewrite → two builds
  (final design SC6-s3exp-i2c €248.30; prototype = DOIT + owned Nanos). "Third route" made a list.
- **Consistency pass:** Open Question #3 (no bare S3) → RESOLVED; brain table ESP32 15→16 + S3 row;
  BOM table + component price table + direction counts (console 9→10, total 25); PIN-BUDGET usable-GPIO
  line + SC6 worked table gains the S3 row and a second-ceiling note; SPEC Part 5 cost figures refreshed.

## Verification
- `node --check` on the extracted engine: passes.
- Real-engine run: SC6-s3exp-i2c = €103.34 / €248.30, pins 20/21 (1 free), fused/console; 25 variants,
  directions sum 25 (console 10, panelnode 11, modular 2, allinone 2); overrun set unchanged.
- Browser render: matrix shows the row, selecting it rebuilds the diagram with no error, recommendation
  block renders correctly.

## Known-open (documented in-page, not bugs)
- ENABLE-gating dose accuracy: bench experiment flagged.
- S3-Nano 21-usable-GPIO is vendor-stated, not datasheet-audited (design sits at 20/21).
