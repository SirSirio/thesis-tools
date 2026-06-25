# Phase 4: Prototype Design Space — Specification

**Created:** 2026-06-15
**Ambiguity score:** 0.19 (gate: ≤ 0.20)
**Requirements:** 6 locked

## Goal

Build a styled, animated **Prototype Design Space** page on the tools site: a vertical "journey" of prototype cards, each an elegant summary (purpose + key achievements) that expands to reveal full per-prototype detail (purpose, parameters with links to the design tools, per-prototype results/KPIs, design reasoning), plus a de-emphasized, collapsed-by-default section at the bottom showcasing the author's functional AI reasoning skills. The HTML page is the **content source of truth**, hand-maintained via chat — no build pipeline, no JSON data model, no runtime fetch. proto-01 is authored end-to-end as the seed.

The space's *primary purpose* is a place where the AI helps **design** new prototypes and the author **looks back** at past ones to improve the process — documentation is a byproduct of that loop, not the goal.

## Background

The prototype tracker today is markdown-only: `prototypes/PROTOTYPES.md` (registry) and `prototypes/Prototype-1-Pump-Module/proto-01-5ul-4roller/PROTOTYPE.md` (deep detail), established from a `/gsd:explore` handover (`.planning/notes/2026-06-15-prototype-tracker-architecture.md`). There is **no visual/published page** for prototypes.

proto-01's real test data already exists in the sibling repo `03. CODING Thesis Out of Drive`:
- `manual-dispense-check/proto-01-5ul-4roller/REPORT.md` — flow + gravimetric calibration. **Measured ≈3.4 µL/stroke (gravimetric) vs 5.0 assumed → under-dispenses ~32%** (delivers ~678 µL gravimetric / ~600 µL flow for a 1 mL command).
- `app/analysis.py` defines the KPI shapes (`accuracy_pct`, `precision.cv_pct`, `pulsation.ripple_pct`, `transient.rise_time_s`, `drift.drift_slope`, 0–100 `score`) — but those KPIs are **not** adopted as a universal schema here.
- The sibling's `PROTOTYPE-INDEX.md` is the cross-repo contact point.

Two architectural decisions were made during spec interview that shrink the original framing:
1. **HTML is the source of truth.** The page replaces a data pipeline — content is authored directly into HTML (and co-located media), edited via chat. No per-prototype JSON, no generator, no build step.
2. **KPIs are per-prototype, defined by the author each time.** There is no universal test-plan/report schema in this phase; each prototype's testing is a semi-separate mini-project discussed on its own. This phase therefore does **not** attempt to unblock `03. CODING` with a global contract.

## Requirements

1. **Prototype Design Space page**: A new styled page exists on the site and is reachable from the landing page.
   - Current: No prototypes page exists; only markdown tracker files
   - Target: A page (target location `prototypes/index.html`, co-located with the tracker; final path confirmed in discuss-phase) using the dark glassmorphic theme, blobs + animate-in pattern, and a `← All tools` nav bar, linked from a card on the landing `index.html`
   - Acceptance: Page loads offline via `serve.bat`, is reachable from a landing-page link, shows the shared theme, and has no horizontal scroll at 1280px and 375px viewport widths

2. **Animated prototype journey with expand/collapse**: Prototypes are presented sequentially along a visual path as animated summary cards that unravel on interaction.
   - Current: No visual representation of prototypes exists
   - Target: Each prototype renders as a summary card (purpose + ≥1 key achievement) positioned on a vertical visual path/journey with entrance animation; clicking a card expands it to reveal the full detail and collapses it again (same interaction family as the GSD-workflow and occlusion tool pages, dressed up)
   - Acceptance: At least proto-01 appears as a summary card on the path; clicking it expands the full detail region and clicking again collapses it; entrance animation is present; behavior works with keyboard/click and without console errors

3. **Per-prototype detail sections**: Each expanded prototype shows a consistent set of sections.
   - Current: This structured detail exists only as prose in `PROTOTYPE.md`
   - Target: Expanded detail contains, in order — **Purpose** (why built / what it tests — concept proof, insight-gathering, etc., stated explicitly), **Parameters** (dimensions/materials in a table, with ≥1 link out to the rotor-solver and/or displaced-volume tool pages), **Results** (per-prototype metrics authored by the user — no fixed KPI schema), **Design reasoning** (the thinking behind it), and optional **pictures**
   - Acceptance: proto-01's expanded view renders all four sections (Purpose, Parameters table, Results, Design reasoning); the Parameters table contains at least one working link to a tool page

4. **proto-01 authored end-to-end**: proto-01 is real, populated content, not placeholder.
   - Current: proto-01 detail lives in markdown with several design-parameter TODOs
   - Target: proto-01's page content is authored from real data — purpose stated, parameters filled (back-filled where known), and Results showing the measured figures from `03. CODING/manual-dispense-check/proto-01-5ul-4roller/REPORT.md` (≈3.4 µL/stroke gravimetric, ~678 µL / −32%, flow vs gravimetric comparison)
   - Acceptance: proto-01 Results display the real measured numbers (gravimetric ≈3.4 µL/stroke and ~32% under-dispense) sourced from the report; no lorem/placeholder text remains in proto-01's sections

5. **Reasoning-skills showcase (de-emphasized)**: A separate, low-prominence, expandable section showcases the author's functional AI reasoning skills.
   - Current: No such section; reasoning skills live only in external Claude chats
   - Target: A visually separated section at the **bottom** of the page, **collapsed by default**, that expands on interaction and transcribes the author's reasoning skills (authored as functional Claude Code skills and transcribed onto the page); seeded with the skill(s) the author hands over, or a clear placeholder if none are provided yet. The section must not compete with the prototypes for focus
   - Acceptance: The skills section exists at the page bottom, is collapsed on load, expands on interaction, is visually distinct/de-emphasized relative to the prototype journey, and renders the provided skill(s) or an explicit placeholder

6. **Design-capture convention**: A documented convention exists for recording each prototype's design discussion and reasoning so the loop is reviewable.
   - Current: No standard place/format captures the design reasoning behind a prototype
   - Target: A documented convention (file/folder structure and where it lives) describing how each prototype's design discussion is captured and surfaced into its page section; the exact mechanism (e.g. `/gsd:thread` vs a per-prototype design-log file) is decided in discuss-phase
   - Acceptance: A written convention exists in the repo and proto-01 has its design reasoning captured per that convention and reflected in its page section

## Boundaries

**In scope:**
- The Prototype Design Space HTML page (styled, animated, linked from landing)
- Animated prototype journey/path with expand-collapse summary→detail cards
- Per-prototype detail: Purpose, Parameters table (+ tool links), Results (per-prototype metrics), Design reasoning, optional pictures
- proto-01 authored end-to-end from real `03. CODING` report data
- A bottom, de-emphasized, expandable reasoning-skills showcase section, seeded with handed-over skills
- A documented design-capture convention (mechanism finalized in discuss-phase)

**Out of scope:**
- A universal JSON/report data model or test-plan/pass-criteria schema — per-prototype and discussed individually, not now
- Unblocking `03. CODING` with a global results contract — handled per-prototype later
- Any build pipeline, generator script, or runtime JSON/markdown fetch — HTML is hand-authored
- Designing new prototypes (proto-02+) within this phase — the *space* is built; using it to design comes after
- Authoring a full library of reasoning skills — seed only; more grow organically
- Per-prototype pass/fail gating or scoring logic — each prototype declares its own metrics, no automated verdict engine
- Editing or restructuring the `03. CODING` repo

## Constraints

- **Static site only:** no build tools, no npm, no frameworks; must work offline from USB and on GitHub Pages (project hard constraint).
- **No CDN-only dependencies:** any external resource needs a local fallback; prefer fully inline (CSS/JS) like existing tool pages.
- **HTML is the content source of truth:** content authored/edited directly in the HTML (and co-located media files); no parallel machine-data file required to render the page.
- **KPIs are per-prototype:** the Results section imposes no fixed metric schema; each prototype declares its own.
- **No cross-repo runtime links:** the page must not depend on disk-relative paths into the private `03. CODING` sibling; proto-01 figures are transcribed/copied in (the published-site rule from the handover).
- **Shared CSS discipline:** reuse `assets/style.css` tokens; tool-specific styles inline in the page. Additive-only changes to `assets/style.css` if any.
- **Deferred to discuss-phase (known unknowns):** the design-capture mechanism (`/gsd:thread` vs design-log file), and the storage/invokability location of the functional reasoning skills (`.claude/skills/` vs co-located in `prototypes/`).

## Acceptance Criteria

- [ ] Page is reachable from a landing-page link and loads offline via `serve.bat` with no console errors
- [ ] No horizontal scroll at 1280px and 375px viewport widths
- [ ] proto-01 appears as a summary card on the visual journey with its purpose and ≥1 achievement, with an entrance animation
- [ ] Clicking the proto-01 card expands the full detail and clicking again collapses it
- [ ] proto-01 expanded view renders Purpose, Parameters (table), Results, and Design-reasoning sections
- [ ] The Parameters table contains ≥1 working link to a design-tool page (rotor-solver and/or displaced-volume model)
- [ ] proto-01 Results show the real measured figures (≈3.4 µL/stroke gravimetric; ~−32% under-dispense) transcribed from the `03. CODING` report — no placeholder text
- [ ] A reasoning-skills section exists at the page bottom, collapsed by default, visually de-emphasized, and expands on interaction
- [ ] The skills section renders the handed-over skill(s) or an explicit placeholder when none are provided
- [ ] A written design-capture convention exists in the repo and proto-01's design reasoning is captured per it
- [ ] Dark glassmorphic theme and `← All tools` nav match existing tools; `assets/style.css` is unchanged or extended additively only
- [ ] No build step, no runtime JSON/markdown fetch, no CDN-only dependency is introduced

## Ambiguity Report

| Dimension          | Score | Min  | Status | Notes                                                        |
|--------------------|-------|------|--------|--------------------------------------------------------------|
| Goal Clarity       | 0.85  | 0.75 | ✓      | Design-space purpose + page deliverable both clear           |
| Boundary Clarity   | 0.80  | 0.70 | ✓      | Explicit out-of-scope: schema, pipeline, proto-02, skill lib |
| Constraint Clarity | 0.80  | 0.65 | ✓      | Static/offline/no-build; 2 items deferred to discuss-phase   |
| Acceptance Criteria| 0.74  | 0.70 | ✓      | 12 pass/fail checks; some UI quality is ui-review territory  |
| **Ambiguity**      | 0.19  | ≤0.20| ✓      | Gate passed                                                  |

Status: ✓ = met minimum, ⚠ = below minimum (planner treats as assumption)

## Interview Log

| Round | Perspective       | Question summary                              | Decision locked                                                                 |
|-------|-------------------|-----------------------------------------------|---------------------------------------------------------------------------------|
| 1     | Researcher/Boundary | Audience/placement of the page?             | Public tool on the GitHub Pages site, linked from landing                       |
| 1     | Researcher        | JSON data model vs markdown tracker?          | (Superseded in R2) initially "JSON = results only"                              |
| 1     | Boundary          | Scope of the page?                            | Generic, multi-prototype renderer (sequential, top-to-bottom)                   |
| 2     | Simplifier        | Build/render mechanism vs no-build rule?      | **HTML is the source of truth** — hand-authored, edited via chat; no pipeline   |
| 2     | Boundary          | Is the universal schema in scope?             | **No** — KPIs are per-prototype, each discussed separately; sibling not unblocked here |
| 2     | Researcher        | Pictures/comments handling?                   | Authored directly into HTML (+ co-located images)                               |
| 3     | Simplifier        | What does THIS phase deliver vs grow later?   | Showcase page + skills section + design-capture convention; designing new protos grows after |
| 3     | Boundary          | What are "reasoning skills"?                  | Functional Claude Code skills, also transcribed into the page showcase          |
| 3     | Boundary          | How is design reasoning captured?             | Deferred to discuss-phase (thread vs design-log)                                |

---

*Phase: 04-prototype-design-space*
*Spec created: 2026-06-15*
*Next step: /gsd:discuss-phase 4 — implementation decisions (page layout & path animation, capture mechanism, skill storage/invokability, exact page path)*
