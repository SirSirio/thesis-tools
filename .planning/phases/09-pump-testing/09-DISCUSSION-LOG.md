# Phase 9: Pump Testing — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-23
**Phase:** 9-pump-testing
**Areas discussed:** Tool character, Righteous-protocol breadth, Standards anchor + methods (deviations layer touched)

---

## Gray-area selection

Presented four candidate areas; user selected **Tool character**, **Righteous-protocol breadth**, **Standards anchor + methods**. (Deviations layer resolved separately in the close-out.)

Framing surfaced before selection: the seed anchored on ISO 23783-2, but the user's own accuracy note argues ISO 8655 (pipette-equivalence) is the primary comparator, and "go to market" implies more than accuracy — flagged both as live, not settled.

---

## Tool character

| Option | Description | Selected |
|--------|-------------|----------|
| Document-first | Written protocol page (prose + spec tables + expandable sections), light interactivity; citable via QR | ✓ |
| Calculator-first | Seed's interactive planner (balance→volume lookup, DoE grid, CSV) + results calculator | |
| Hybrid (doc spine + embedded calcs) | Documentation backbone with a few embedded widgets | |

**User's choice:** Document-first.
**Notes:** Purpose Q answered free-text: "for now, the idea is to have it as document. In the future, I will add another phase on how to connect it to my actual app for the data acquisition." → Live calculation + app data-acquisition deferred to a future phase; Phase 9 builds no calculators.

## Righteous-protocol breadth

| Option | Description | Selected |
|--------|-------------|----------|
| Accuracy metrology deep + others mapped | Accuracy protocol complete; safety/reliability/biocompat/QMS-regulatory covered lighter | ✓ |
| Accuracy metrology only | Strictly dispensing-accuracy; no market-readiness sections | |
| All dimensions, comparable depth | Every dimension in full depth | |

**User's choice:** Accuracy metrology deep + others mapped.

## Standards anchor + methods

| Option | Description | Selected |
|--------|-------------|----------|
| Dual-frame (8655 "what good is" + 23783-2 "how to run") | Both apply, shared gravimetric core | (leading hypothesis) |
| ISO 8655 primary | Pipette-equivalence lead | |
| ISO 23783-2 primary | Automated-system lead (seed) | |

**User's choice (anchor):** Free-text — "I think you should research this. What is the appropriate ISO should be searched." → delegated to research phase (RQ-1). Dual-frame recorded as leading hypothesis to confirm/refute, not a locked decision.
**User's choice (methods coverage):** Free-text — "This should depend on the research and the ISO." → delegated to research phase (RQ-2), follows from the anchor.

## Deviations layer (bottom) + pending prototype protocol

| Option | Description | Selected |
|--------|-------------|----------|
| Side-by-side deviation table, scaffold now / fill on supply | ISO req \| prototype reality \| justification; seed from proto-02 | |
| Narrative per deviation, scaffold now | Prose per deviation | |
| Wait for the protocol before designing this layer | Focus planning on top layer first | ✓ |

**User's choice:** Wait for the actual protocol before designing the bottom layer. Planning designs the top layer first and leaves a clean slot.

---

## Claude's Discretion

- Page structure/section ordering, how the two layers visually relate, KaTeX use for formulas, EN/IT i18n scope, and static-table-vs-tiny-widget for the balance→compliant-volume lookup — all within the document-first, no-calculator constraint and site conventions.

## Deferred Ideas

- App-connected data acquisition + live results calculator + interactive planner/DoE/CSV (own future phase — the seed's Planner+Calculator).
- Auto-generated "documented deviations" paragraph export for the thesis (after the bottom layer exists).
- Relocate `.planning/notes/2026-06-17-dispensing-accuracy-standards.md` to the thesis LaTeX workspace (housekeeping).
