---
title: OPEN DECISION — per-prototype test-plan & pass-criteria schema
date: 2026-06-15
context: Handed over from a /gsd:explore session in 03. CODING. 03. CODING is
  BLOCKED on this decision before it emits structured test reports.
status: open
---

# Open decision: per-prototype test-plan schema

**This is the next design task on the prototype-tracker work — a good candidate
for its own phase** (`/gsd:spec-phase` → `/gsd:discuss-phase`).

## What needs deciding

Each prototype is different, so the **test plan + pass criteria are defined
per-prototype** in its `PROTOTYPE.md`. We need a *standard structure* for that
plan so reports are comparable and machine-grabbable. Define:

1. **Setpoint grid** — how a prototype's test points (volume × flow) are listed.
2. **Pass targets** — which KPIs gate acceptance and their thresholds (per
   prototype). Candidate KPIs already produced by the app:
   `accuracy_pct`, `precision.cv_pct`, `pulsation.ripple_pct`,
   `transient.rise_time_s`, `drift.drift_slope`, 0–100 `score`.
3. **Verdict rule** — earlier explore narrowed to: targets are *per-prototype*
   (not one global gate, not purely comparative). Confirm and formalize.
4. **Report schema** — the structured file `03. CODING` will emit
   (`proto-NN-*-report.json` proposed) and the distilled snapshot copied back
   into this prototype folder.

## The cross-repo contract (already agreed)

- **Design declares targets here** (`02. Tools`, in `PROTOTYPE.md`).
- **Run + analyze + emit report in `03. CODING`** (data lives there, not here).
- **Distilled snapshot copied back here** because this repo is published
  (GitHub Pages) and can't rely on disk-relative links into the private sibling.

## Who is waiting

`03. CODING/PROTOTYPE-INDEX.md` is the contact point and is **blocked on this
schema** before producing reports. When this is decided, update both sides.

## Reference

- App KPI schema: `03. CODING/app/analysis.py` → `analyze_condition()` /
  `score_condition()`.
- Existing acceptance-gate precedent: `03. CODING` lab-data `SESSION.md`
  "Results / acceptance gate" tables.
