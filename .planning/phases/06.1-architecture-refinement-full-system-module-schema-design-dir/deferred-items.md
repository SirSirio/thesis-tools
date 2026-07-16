# Deferred Items — Phase 06.1

## Requirement ID registration gap (pre-existing, out of scope for 06.1-03)

`requirements mark-complete D-06 D-07 D-08 D-09 D-10 D-11 D-12 SC-2 SC-3` (run at the end of
06.1-03) returned `not_found` for all seven `D-*` IDs, and `already_complete` for `SC-2`/`SC-3` —
but those two are a **different phase's** requirements. `.planning/REQUIREMENTS.md` has no entries
at all for Phase 06.1; its `D-06`...`D-12` and `SC-2`/`SC-3` IDs are defined only in
`06.1-CONTEXT.md` (phase-local numbering) and collide with unrelated Phase 5 IDs of the same name
in the top-level registry (`SC-2`/`SC-3` there belong to the Presentations Index / lab-meeting
deck work).

This is a structural gap from when Phase 06.1 was inserted mid-roadmap ("URGENT" — see
`.planning/STATE.md` Roadmap Evolution) — Phase 06.1's own requirement IDs were never added to
`.planning/REQUIREMENTS.md`'s traceability table, and the ID collision means blindly appending
them under the existing `D-*`/`SC-*` names would misattribute completions to Phase 5's rows.

**Not fixed here** — this is a cross-phase registry/namespacing decision (which requirements
registry Phase 06.1 uses, whether to prefix its IDs to disambiguate) outside this plan's file
scope (`tools/system-architecture-explorer/index.html` only). Deferred for whoever next touches
`.planning/REQUIREMENTS.md` structure, or for an explicit decision at milestone close.

**Also true of Plans 06.1-01 and 06.1-02** — same `not_found` result would apply to their
requirement IDs (`D-13`...`D-18`, `SC-4`, `SC-5`), not something introduced by 06.1-03.

**Also true of Plan 06.1-05** (the phase's final plan) — `requirements mark-complete D-13 D-15
D-18 SC-6` returned `not_found` for all four, confirming this is a standing structural gap across
every plan in the phase, not something any individual plan can fix from within its own file scope.

## Stale `TBD` in prototypes/System-Architecture/POWER-AND-MOTORS.md (out of scope for 06.1-05)

06.1-05's overall `<verification>` step 1 greps the whole `prototypes/System-Architecture/`
directory for `TBD` and expects zero matches. A match was found:
`POWER-AND-MOTORS.md:219` — "`alignMot2` is still TBD" inside decision row **P5** of that file's
own open-questions table.

`POWER-AND-MOTORS.md` is a pre-existing tracked file (committed in `009818b`, before this phase)
that is **not** in 06.1-05's `files_modified` list or file scope
(`ARCHITECTURE.md`/`PUMP-CONTROL-CONCEPTS.md`/`SOLUTION-MATRIX.md`/`index.html`/`README.md`/
`CLAUDE.md` only) and was never assigned to any plan in this phase's read/write scope. Its `alignMot2`
reference now contradicts D-13's resolution (2× `align28byj`, no separate `alignMot2` part) — the
same drift class 06.1-05 exists to fix, but in a file outside this plan's explicit boundary.

**Not fixed here** — fixing it would mean editing a file not authorized by this plan's file-scope
directive. Flagging for whoever next touches `POWER-AND-MOTORS.md`, or for a follow-up
consistency-pass task if Sirio wants the whole `prototypes/System-Architecture/` directory (not just
the three canonical decision records) swept for `TBD`/stale strings.
