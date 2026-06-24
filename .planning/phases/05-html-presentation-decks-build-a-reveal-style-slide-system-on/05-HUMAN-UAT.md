---
status: partial
phase: 05-html-presentation-decks-build-a-reveal-style-slide-system-on
source: [05-VERIFICATION.md]
started: 2026-06-24T18:45:00Z
updated: 2026-06-24T18:45:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Test Shared Runtime Interaction
expected: Open `decks/lab-meeting-2026-06/index.html` in a web browser. Press `ArrowRight` or `Space` to step through fragments and advance through all six slides. Press `O` or `Esc` to toggle the overview grid. Refresh the page and confirm deep-linking works. Resize the window to verify 16:9 letterboxing scales appropriately without scrollbars.
result: [pending]

### 2. Test Deck Index & Landing Page
expected: Open `index.html` and verify the "Presentations" tool card exists under the "Hardware prototypes" section. Click it to navigate to `decks/index.html`. On `decks/index.html`, observe the fanned deck cards deal-out animation on load. Using browser DevTools, enable "Prefers reduced motion" and refresh `decks/index.html` to confirm cards display fully statically without animation. Click the "Lab Meeting — June 2026" card and verify it navigates to the seed deck.
result: [pending]

### 3. Test Live Iframe Embeds
expected: In the seed deck (`decks/lab-meeting-2026-06/index.html`), navigate to the "Designing with AI: Rotor Geometry Solver" and "Occlusion & Displaced-Volume Model" slides. Confirm they show the tools embedded within framed panels. Click the embed panel overlay to activate demo mode: confirm that arrow keys interact with the tool and stop advancing the deck slides. Press `Esc` to return control to the deck.
result: [pending]

### 4. Verify Static Media Integration
expected: On the test-campaign slide, ensure the UI displays an image referencing the `assets/test-campaign.png` static file placeholder rather than an iframe embed.
result: [pending]

## Summary

total: 4
passed: 0
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps
