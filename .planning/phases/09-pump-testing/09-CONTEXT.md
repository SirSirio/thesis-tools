# Phase 9: Pump Testing — Context

**Gathered:** 2026-07-23
**Status:** Ready for planning (two standards questions gated on the research phase — see Research Questions)

<domain>
## Phase Boundary

Deliver a new **document-first** tool page at `tools/pump-testing/` with two stacked layers:

1. **Top — the "righteous" market-grade protocol.** How a dispensing-accuracy qualification of the peristaltic pump *should* be run if the device went to market. Dispensing-accuracy metrology is the deep, complete core (method, balance/environment requirements, replicates, mass→volume conversion, trueness/precision, reporting/uncertainty). The other go-to-market dimensions — safety, reliability/lifetime, biocompatibility, QMS/regulatory pathway — are **mapped** (structured but lighter), so "if it went to market" is honestly answered without turning into a survey of medical-device regulation.
2. **Bottom — the actual prototype protocol + justified deviations.** The method actually used on the prototype, with the logical explanation for each deviation from the restrictive ideal (prototyping stage; hardware we do not have). **This layer is NOT designed in this phase** — the user will supply the actual protocol; planning focuses on the top layer first and scaffolds the bottom only after the protocol arrives.

**This is a documentation deliverable, not a calculator.** No interactive planner, DoE-grid generator, or results calculator is built in Phase 9 (see Deferred Ideas — that is a future phase wiring this page to the user's data-acquisition app).

**Out of scope:** live results calculation (paste masses → trueness/CV/Z-factor), DoE run-sheet generator, CSV export, and any connection to the acquisition app — all deferred to a future phase. New capabilities beyond "document the protocol" belong in their own phases.
</domain>

<decisions>
## Implementation Decisions

### Tool character
- **D-01:** **Document-first.** The page is an authoritative written protocol (prose + spec tables + expandable method sections), citable via QR like a thesis chapter — not the seed's interactive planner+calculator. Interactivity is light at most (expand/collapse; possibly one small static lookup if it earns its place, but no calculators are required by this phase).
- **D-02:** Purpose is a **thesis artifact** for now: explain what a market-grade protocol would require and defend why the prototype's method justifiably deviates. A later phase will connect the page to the user's actual data-acquisition app; that is where live calculation lands. Do not build calculation logic speculatively now.

### Righteous-protocol breadth
- **D-03:** **Dispensing-accuracy metrology deep + other go-to-market dimensions mapped.** The accuracy protocol (trueness, precision, test method, environmental control, replicate convention, reporting, measurement uncertainty) is fully specified. Safety, reliability/lifetime, biocompatibility, and QMS/regulatory framing are covered as a structured lighter "what full market-readiness also demands" map — not omitted, not treated at equal depth.

### Bottom layer (actual protocol + deviations)
- **D-04:** ~~**Do not design the bottom layer in this phase.** The user will supply the actual prototype testing protocol.~~ **SUPERSEDED 2026-07-23:** the user supplied the actual prototype protocol (`prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/TEST-PROTOCOL.md`), so the deferral precondition is met and the **bottom layer is now IN scope for Phase 9** — authored by the added plan **09-06** as the two-layer counterpart to the top layer. Its structure is the anticipated **ISO-requirement | prototype-reality | justification** deviation table (TEST-PROTOCOL.md §7), plus the reasoning behind the method (two-axis accuracy/precision model, the 0.1 mg-balance binding constraint and its three workarounds, the pipette head-to-head thesis claim, and the honest can/cannot-claim scope). The bottom layer stays document-first (no calculator) per D-01 and cross-links to the top-layer sections it deviates from.

### Claude's Discretion
- Page structure/section ordering, how the two layers visually relate, use of KaTeX for any formulas (mass→volume, CV, uncertainty), EN/IT i18n scope, and whether the one balance-readability→compliant-volume lookup is rendered as a static table or a tiny interactive widget — all left to planning/execution within the document-first, no-calculator constraint. Follow site conventions (dark glassmorphic theme, `← All tools` nav, inline `<style>`/`<script>`, offline/no-CDN, co-located SPEC.md).
</decisions>

## Research Questions (resolve in the research phase, BEFORE planning the top layer's content)

The user explicitly delegated the standards framing to research ("I think you should research this — what is the appropriate ISO should be searched"; methods coverage "should depend on the research and the ISO"). These are **open**, not decided:

- **RQ-1 — Which standard(s) are the appropriate anchor?** For a *modular automated peristaltic dispensing pump, ~5 µL per stroke, point-of-care use, intended to replace a human aliquoting by hand with a pipette*, determine the governing standard(s) for a dispensing-accuracy qualification. Candidates surfaced so far: **ISO 8655** (piston-operated volumetric apparatus — pipette/dispenser accuracy & precision; the device's job is to replace a hand pipette) and **ISO 23783-2** (automated liquid handling systems — the device *is* automated; Annex D single-channel gravimetric method). Also weigh whether a POC/IVD or infusion-pump frame applies (ISO 15197 accuracy-spec *pattern*, IEC 60601-2-24 infusion-pump trumpet curves — verify relevance).
  - **Leading hypothesis (confirm or refute, do not assume):** *dual-frame* — ISO 8655 defines "what good is" (pipette-grade trueness/CV benchmark, n=10, tightening toward larger volumes), while ISO 23783-2 Annex D supplies the automated-system gravimetric **test method** (Table 3 balance-readability→volume grades, evaporation handling, Z-factor per Annex A). The two share the same gravimetric metrological core (ISO 8655-6 is the reference method) and are complementary, not competing.
  - Do **not** anchor by default on ISO 23783-2 just because the seed did. The user's own accuracy note (`.planning/notes/2026-06-17-dispensing-accuracy-standards.md`) argues ISO 8655 is the primary comparator. Resolve this properly.
- **RQ-2 — Methods coverage follows from RQ-1.** Once the anchor is fixed, decide how much of the methods landscape the top layer specifies. Leading intent: fully specify the applicable **gravimetric** method, plus a compact comparison of alternates (photometric; gravimetric-regression for droplet/jet; titrimetric) with an explicit "why gravimetric for this pump / when each alternate applies" rationale. Confirm which alternates the chosen standard(s) actually define and their volume-range applicability.
- **RQ-3 — Verify the go-to-market "mapped" dimensions** against the right frames so the lighter sections are correct, not hand-waved: safety, reliability/lifetime, biocompatibility (e.g. ISO 10993 for fluid-path materials — verify), and QMS/regulatory pathway (ISO 13485; CLIA-waiver bar for field-deployable POC; ISO 22870/15189 POCT framing — all named in the accuracy note's relevance map).
- **RQ-4 — Confirm exact normative values before they are quoted** in the protocol: ISO 8655-2:2022 permissible-error table at 1/5/10 µL (paywalled — get via DTU), the ISO 23783-2 Table 3 balance grades (already extracted in the seed — cross-check), environmental limits, and the Z-factor basis (ISO 8655-6 / Annex A). Flag any number that cannot be verified as `[unverified]` rather than stating it.

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Standards (primary sources — the tool's factual backbone)
- `prototypes/DS_EN ISO 23783-2_2023.pdf` — DTU-licensed. Automated-liquid-handling-system gravimetric method: Annex D (single-channel gravimetric, normative), Table 3 (balance readability → compliant volume), Annex A (Z-factor / mass→volume). A **candidate** anchor — see RQ-1.
- ISO 8655 (2022), Parts 2 and 6 — piston-operated volumetric apparatus (pipette accuracy/precision + gravimetric reference method). The other **candidate** anchor. Get exact permissible-error tables via DTU (paywalled). See RQ-1/RQ-4.

### Standards-landscape reasoning (why the anchor is a live question)
- `.planning/notes/2026-06-17-dispensing-accuracy-standards.md` — the reconsideration the seed missed: argues ISO 8655 (pipette-equivalence) is the primary comparator; device spec is ±10 % / ±10 µL (compound, ISO 15197-pattern); n=10 rationale; relevance map for ISO 13485 / 22870 / 15189 / CLIA and the microdispensing-literature CV benchmarks. **Read this before deciding RQ-1/RQ-3.** (Note: this file is flagged for eventual move to the thesis LaTeX workspace — treat as source, not a permanent repo doc.)

### The prototype's actual method + data (feeds the bottom layer — now IN scope, authored by 09-06)
- `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/TEST-PROTOCOL.md` — **the actual test protocol + rationale the user supplied 2026-07-23.** The primary source for the bottom layer (09-06): §1 two-axis accuracy-vs-precision model (accuracy calibratable, precision not); §2 the 0.1 mg-balance binding constraint + three workarounds (slope method, per-stroke CV via √N, same-instrument pipette comparison); §3–5 why-these-volumes/speeds/replicates rationale; §6 pipette head-to-head thesis claim; **§7 the ISO 23783-2 requirement | prototype reality | justification deviation table (the centerpiece)**; §8 two-stage screen-then-lock strategy; §10 expected plots; §11 honest can/cannot-claim scope.
- `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PROTOTYPE.md` — §2 targets & pass criteria (5 µL/stroke, CV ≤ 5 %, mean ±2 %, benchmark pipette CV 1.5–3 %); §8.1 execution protocol (E2/E3/E5/E7 rigs, why 200-stroke batches vs single-dose n=10, blockers: 0.1 mg balance vs 0.001 mg required, pendant-drop, submerged-outlet trick, roller tagging); §8.2 first result (2.95 µL/stroke, −41 %, non-stationary, step-loss hypothesis); §11 diagnosis. These ARE the documented deviations to seed the bottom-layer table when the user supplies the final protocol.

### Phase seed
- `.planning/phases/09-pump-testing/09-CONTEXT-SEED.md` — raw verified ISO 23783-2 content (Table 3, evaporation D.5.2/D.6.1, prep 6.3, Table D.1, Annex A Z-factor, slope method), pump-specific targets/geometry/DoE, resources table, and the original open decisions. Treat framings in it as **candidates**, not locked (per user's "re-think it").

## Cross-tool references (site context, not primary sources)
- `tools/peristaltic-roller-displaced-volume-model/` — the displaced-volume model behind the E5 link (back-calculate effective inflation factor `k` from measured µL/stroke); also the **KaTeX local-fallback precedent** (`katex/` folder) if any formulas are rendered.
- `tools/rotor-solver/` — rotor geometry (5 µL/stroke design point) the pump under test is built to.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **KaTeX local fallback** (`tools/peristaltic-roller-displaced-volume-model/katex/`: `katex.min.css`, `katex.min.js`, `auto-render.min.js`) — copy this pattern if the protocol renders any formulas (CV, trueness, expanded uncertainty, Z-factor). No CDN.
- **Shared design system** (`assets/style.css`) — dark glassmorphic tokens, glass cards, `← All tools` nav bar, fade-up entrance. The only shared asset a tool uses.
- **EN/IT i18n pattern** — `data-i18n` attribute + inline per-page dictionary + `localStorage` key `lang`, wrapped in try/catch (established across all tool pages). Decide scope in planning; if used, EN/IT key sets must stay identical (LANG-01…LANG-05).

### Established Patterns
- **One self-contained tool page:** own `index.html` with inline `<style>` and inline `<script>`; co-located `SPEC.md` (purpose, inputs, formulas, constants, assumptions). No new shared files; no build tools; offline/USB + GitHub Pages safe.
- **Integration chrome for a new tool:** landing-page card (EN+IT), README tool-table row, repo-root `ROADMAP.md` row, and `CLAUDE.md` folder-structure update — the standard closing steps every tool phase does.
- **No horizontal scroll** at 1280px and 375px — spec tables must wrap headers, not scroll.

### Integration Points
- New card on `index.html` tool grid; new `tools/pump-testing/` folder; README + ROADMAP + CLAUDE.md rows. No changes to `assets/style.css` (keep it byte-stable per site convention).
</code_context>

<specifics>
## Specific Ideas

- The two-layer framing (righteous protocol on top, actual prototype protocol + justified deviations below) is the user's core structural ask — preserve it literally.
- The deviations should read as *reasoned engineering judgment*, not apology: "the ISO requires X; we did Y because we are prototyping and lack Z; here is why Y is still defensible." proto-02 already contains this reasoning (e.g. 0.1 mg balance injects ~2 % of the CV budget → semi-micro needed for the gate; submerged outlet kills pendant-drop + evaporation in one move; n=3 pins the mean to ±0.6 % which is ample for the *mean*, while the *gate* needs single-dose n=10).
- Per user's cross-cutting instruction: the tool must genuinely reconsider the standards question, not inherit the seed's ISO 23783-2 assumption.
</specifics>

<deferred>
## Deferred Ideas

- **App-connected data acquisition + live results calculator (own future phase).** Wire this page to the user's actual data-acquisition app so measured masses flow in and the page computes evaporation correction, Z-factor mass→volume, trueness (systematic error %), precision (CV %), and measurement uncertainty per volume. This is the seed's "Calculator" mode and the interactive "Planner" (balance→compliant-volume lookup, DoE run-grid, CSV run-sheet export) — explicitly out of Phase 9, which is document-first.
- **Auto-generated "documented deviations" paragraph for the thesis** — a nice-to-have export once the bottom layer exists; revisit after the actual protocol is supplied.
- **Relocate `.planning/notes/2026-06-17-dispensing-accuracy-standards.md`** to the thesis LaTeX workspace (the note itself flags this) — housekeeping, not this phase.

### Reviewed Todos (not folded)
None — the 4 pending todos (landing-page restructure, prototype detail links, .agent vs .agents, dispense-sim animation) are unrelated to this phase.
</deferred>

---

*Phase: 9-pump-testing*
*Context gathered: 2026-07-23*
