---
slug: proto-02-init
created: 2026-06-17
type: quick
---

# Quick task: Initialize Proto-02

Initialize prototype 2 (corrected-geometry redesign of proto-01) across the docs + tools site.

## Scope

1. **Standards-benchmark note** — ISO 8655 / POCT standards landscape + microdispensing CV
   benchmarks, with sources. Written to `.planning/notes/` for later move to the thesis repo
   (the device replaces a hand pipette → ISO 8655 is the fair comparator).
2. **proto-02 PROTOTYPE.md** — purpose, explicit targets/pass criteria (mean ~5 µL known +
   CV ≤ 5 %), as-designed parameters (N_c=2 → R≈19.7, 4-head gap sweep 1.25/1.45/1.65/1.85 mm,
   screw-clamp lock, 0.10 mm fit), corrected geometry calc, gap-sweep design, n=10 experiment
   plan (E1–E7 incl. wall measurement, gravimetric-vs-flow study), morphological-analysis note,
   open risks.
3. **prototypes/index.html** — proto-02 active journey card + full detail view (purpose,
   targets, parameters, geometry, gap sweep, experiments, risks). proto-03/04/05 as grayed-out
   ghost cards (placeholder thumbs, not clickable) following the roadmap.
4. **Registries** — proto-02 row in `prototypes/PROTOTYPES.md` and `prototypes/SPEC.md`.

## Out of scope

- Multi-liquid mechanism design (deferred to proto-04 discussion)
- Actual CAD / build / test data (no hardware yet)
- Results/measurement sections in the HTML (filled after the build is tested)

## Notes

Executed inline (no planner/executor subagents) per standing feedback for small single-surface
tasks. Verified in-browser via Playwright: journey + proto-02 detail render, KaTeX formulas
render, no horizontal scroll at 375px.
