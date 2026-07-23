---
status: partial
phase: 09-pump-testing
source: [09-VERIFICATION.md]
started: 2026-07-23T14:40:26Z
updated: 2026-07-23T14:40:26Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. KaTeX math renders correctly offline
expected: Opening `tools/pump-testing/index.html` from disk (no network) renders all 9 KaTeX formulas (Sections 4–6) with correct math typography. Note: `tools/pump-testing/katex/fonts/` is absent, so `@font-face` rules in `katex.min.css` will 404 and math may fall back to system fonts. Confirm whether the fidelity is acceptable or the `fonts/` directory should be vendored (same gap exists in the two precedent KaTeX tools).
result: [pending]

### 2. Section 9 / Section 10 mobile padding
expected: At a ≤640px viewport, `.map-card` (Section 9) and `.layer2-card` (Section 10, 7 instances) read comfortably. The 640px breakpoint currently narrows padding only for `.theory-card`; confirm the newer cards are acceptable on mobile or need the same padding reduction. No horizontal scroll on any width.
result: [pending]

## Summary

total: 2
passed: 0
issues: 0
pending: 2
skipped: 0
blocked: 0

## Gaps
