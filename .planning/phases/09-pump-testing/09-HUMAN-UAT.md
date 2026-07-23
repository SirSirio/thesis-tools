---
status: resolved
phase: 09-pump-testing
source: [09-VERIFICATION.md]
started: 2026-07-23T14:40:26Z
updated: 2026-07-23T14:42:00Z
---

## Current Test

[all items resolved by fixes — see commits 8506986, 9d8f8c4]

## Tests

### 1. KaTeX math renders correctly offline
expected: Opening `tools/pump-testing/index.html` from disk (no network) renders all 9 KaTeX formulas (Sections 4–6) with correct math typography.
result: resolved — vendored the 20-file KaTeX woff2 font set into `tools/pump-testing/katex/fonts/` (commit 8506986). The `@font-face url(fonts/...)` rules in `katex.min.css` now resolve offline; all 16 CSS-referenced font families are covered. No longer depends on system-font fallback.

### 2. Section 9 / Section 10 mobile padding
expected: At a ≤640px viewport, `.map-card` (Section 9) and `.layer2-card` (Section 10) read comfortably; no horizontal scroll.
result: resolved — extended the 640px breakpoint to `.layer2-card` (22px 20px, matching `.theory-card`) and `.map-card` (20px 18px, proportional to its 24px 28px desktop padding) (commit 9d8f8c4).

## Summary

total: 2
passed: 2
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps
