---
status: partial
phase: 06-system-architecture-explorer-promote-the-electronics-archite
source: [06-VERIFICATION.md]
started: 2026-07-15T14:30:00Z
updated: 2026-07-15T14:30:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Physical screen-interface inspection (ARCH-07 end-of-phase human-check)

expected: Physically inspect the owned bitbyg ILI9341 3.2" board (silkscreen / header labels) to resolve the SPI-vs-8-bit-parallel ambiguity from the vendor page. If SPI: raise the tool's screen-interface default confidence from Low to High (one-line change documented in 06-05-SUMMARY.md "Human-Check Outcome"). If 8-bit parallel: flip the default scenario in the tool and re-check the variants flagged OVERRUN. The tool currently ships defaulted to "SPI (unverified)" with both scenarios selectable.
result: [pending]

### 2. Browser click-through pass

expected: Open tools/system-architecture-explorer/index.html via serve.bat (NOT VS Code Live Preview). Verify: editing a price persists across reload (localStorage sae-prices); Reset clears back to defaults; clicking a matrix row highlights it, expands the BOM, and redraws the SVG diagram (try a P6-dist-* variant to check the repositioned node row); sort/filter controls behave; the SPI/parallel scenario toggle changes the pins-free column; no horizontal scroll at ~700px and ~375px viewports; theory section anchors (#theory/#matrix/#diagram) navigate correctly.
result: [pending]

## Summary

total: 2
passed: 0
issues: 0
pending: 2
skipped: 0
blocked: 0

## Gaps
