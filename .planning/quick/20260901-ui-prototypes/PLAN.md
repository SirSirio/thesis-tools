---
type: quick
slug: ui-prototypes
created: 2026-09-01
---

# Publish the operator-interface design record as tools/ui-prototypes/

## Task

Chapter 9 of the thesis (User Interface Module) argues the interface was designed as self-auditing
web pages at the panel's real 320 × 240, and prints a `\livetool` address so the reader can open
them. Publish the five design-record HTML artifacts under one explanatory index page at
`tools/ui-prototypes/` (path frozen — the thesis prints it), per `HANDOVER-ui-prototypes.md` from
the thesis chat. Executed as a quick task on explicit instruction (documentation-only GSD), even
though new tools normally go through a numbered phase.

## Changes

- **rounds/:** the five artifacts copied verbatim from the design record
  (`...\3. Arduino Coding\Documentation\ui-design\`): round-1-five-candidates, round-2-three-candidates,
  round-3-chosen, home-colour-options, home-round2-three-tiles.
- **Two mechanical edits per the handover, nothing else:** (1) the two home studies' Google Fonts
  links repointed to a vendored Montserrat (`assets/fonts/montserrat/` — v31 variable woff2, latin +
  latin-ext, OFL 1.1 license included; rounds 1–3 already made zero network requests); (2) one
  "← All rounds" back-link inserted at the top of each artifact, styled in the artifact's own muted
  mono.
- **index.html:** site-pattern page (blobs, tool-nav, glass, animate-in staggers) presenting the
  record as two unequal arcs — rounds 1–3 designed the interface, rounds 4–5 revisited the home
  screen after use — with the self-audit instrument explained (touch targets / RGB565 / sunlight /
  device dark probes + audit panel), live scaled inert-iframe previews of the artifacts themselves
  (no fabricated screenshots), round-3 feature card with its recorded audit stats, and a provenance
  panel stating the verbatim rule and the frozen address.
- **SPEC.md:** address contract, artifact table with frozen dates, verbatim rule, exact mechanical
  edits, font-vendoring details, preview technique, assumptions.
- **Site integration:** landing-page tool card (`--rd: 0.66s`, EN + IT dictionary entries), README
  tool-table row, root ROADMAP Shipped row, CLAUDE.md folder tree (montserrat + ui-prototypes).

## Verification

- Playwright over `serve.bat` (localhost:7331): index renders at desktop and mobile widths, no
  horizontal scroll, all five iframe previews load real content.
- Network log with all five artifacts loaded: zero non-local requests (offline requirement met).
- `document.fonts.check()` on home-colour-options: Montserrat 400–700 resolves from the vendored
  files; back-link present.
- round-3 audit instrument live-recomputes (69 elements, worst contrast 7.4:1 — matches the recorded
  figure); touch-targets toggle responds.

## Known-open (documented, not bugs)

- The artifacts are light pages inside a dark site — deliberate, stated on the index page and in
  SPEC.md ("published as they were drawn").
- Publication to GitHub Pages (for the supervisors' browsing) requires merging/pushing to the
  deployed branch — outside this task's commits.
