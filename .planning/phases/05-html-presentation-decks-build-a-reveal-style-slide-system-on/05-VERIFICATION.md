---
status: human_needed
---

# Phase 05 Verification: HTML Presentation Decks

## Goal Achievement
The overarching phase goal to "Build a reveal-style HTML slide system on the tools site for presentations" has been achieved. The codebase successfully implements:
- `assets/deck.css` and `assets/deck.js` for the presentation runtime.
- `decks/index.html` with fanned card-deck UI, accessible via `index.html`.
- `decks/lab-meeting-2026-06/index.html` the seed deck, with live tool iframes and screenshot placeholders.
- Complete documentation updates in `README.md`, `ROADMAP.md`, `CLAUDE.md`, and `decks/lab-meeting-2026-06/SPEC.md`.

## Must-Haves Checklist vs. Actual Codebase
- [x] Shared deck runtime (`deck.css`, `deck.js`) created and implemented.
- [x] Presentations index page (`decks/index.html`) created with card-deck deal-out effect.
- [x] Main `index.html` updated with a tool card linking to the presentations index.
- [x] Seed lab-meeting deck authored with 6 specific segments, embedding live iframes of `tools/rotor-solver` and `tools/peristaltic-roller-displaced-volume-model#calculator`.
- [x] All documentation updated correctly (`README.md`, `ROADMAP.md`, `CLAUDE.md`, and local `SPEC.md`).

## Identified Gaps

1. ~~**Requirements Tracking Gap:** Requirement IDs `SC-1`, `SC-2`, `SC-3` are tracked as completed in the PLAN frontmatters (`05-*-PLAN.md`). However, these Success Criteria IDs have NOT been added to `.planning/REQUIREMENTS.md`. The requirements traceability matrix must be updated to formally track the deck system requirements.~~ *(Resolved by orchestrator: SC-1, SC-2, SC-3 added to `REQUIREMENTS.md`)*

## Manual / Human Testing Steps

The following steps must be verified manually by a human to fully accept the deliverables:

1. **Test Shared Runtime Interaction:**
   - Open `decks/lab-meeting-2026-06/index.html` in a web browser (via `serve.bat` or `file://`).
   - Press `ArrowRight` or `Space` to step through fragments and advance through all six slides.
   - Press `O` or `Esc` to toggle the overview grid.
   - Refresh the page and confirm deep-linking works (e.g., `#/<number>` restores the correct slide).
   - Resize the window to verify 16:9 letterboxing scales appropriately without scrollbars.

2. **Test Deck Index & Landing Page:**
   - Open `index.html` and verify the "Presentations" tool card exists under the "Hardware prototypes" section. Click it to navigate to `decks/index.html`.
   - On `decks/index.html`, observe the fanned deck cards deal-out animation on load.
   - Using browser DevTools, enable "Prefers reduced motion" and refresh `decks/index.html` to confirm cards display fully statically without animation.
   - Click the "Lab Meeting — June 2026" card and verify it navigates to the seed deck.

3. **Test Live Iframe Embeds:**
   - In the seed deck (`decks/lab-meeting-2026-06/index.html`), navigate to the "Designing with AI: Rotor Geometry Solver" and "Occlusion & Displaced-Volume Model" slides.
   - Confirm they show the tools embedded within framed panels. 
   - Click the embed panel overlay to activate demo mode: confirm that arrow keys interact with the tool and stop advancing the deck slides.
   - Press `Esc` to return control to the deck.

4. **Verify Static Media Integration:**
   - On the test-campaign slide, ensure the UI displays an image referencing the `assets/test-campaign.png` static file placeholder rather than an iframe embed.
