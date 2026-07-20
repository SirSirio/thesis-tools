---
phase: 08-dispense-choreography-throughput-simulator-tool-interactive-
reviewed: 2026-07-20T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - tools/dispense-throughput-simulator/index.html
  - tools/dispense-throughput-simulator/SPEC.md
  - index.html
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
status: issues_found
---

# Phase 08: Code Review Report

**Reviewed:** 2026-07-20
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Reviewed the Dispense Choreography & Throughput Simulator tool (inline scheduling engine + rendering), its SPEC.md, and the single new tool card added to the landing page `index.html`.

**Scheduling engine — verified correct.** I traced `computeDoseTimes`, `groupDispenseTime` (LPT), and `simulateSchedule` by hand against every benchmark value in SPEC.md at the documented design point (`[600, 200, 175, 25] µL`, 4 rollers, 5 µL/stroke, 180 RPM):

- Dose times `[10, 3.3333, 2.9167, 0.4167] s` — match.
- Interior LPT dispense phases K=1→16.6667, K=2→12.9167, K=3→10.4167, K=4→10.0 — all match.
- Full totals K=1→583.33 s and K=4→376.67 s (with `totalCycles = M+N-1 = 35`, per-cycle +1 s shift on all 35 active cycles, +3×5 s rack changes) — match.
- Throughput 197.5 / 305.7 samples/hr — match.

The LPT sort-and-chunk with a stable original-index tiebreak is the correct minimizer for the "partition into ≤K groups, cost = Σ group maxima" structure. Both `groupDispenseTime` and the Gantt's `stationOffsetsForCycle` use the identical tiebreak on the identical (ascending-station) array ordering, so bar offsets never drift from the engine total.

**Security — clean.** Every value interpolated into `innerHTML` (metrics, Gantt bars/tooltips, dose warnings, rack SVG) is first passed through `parseFloat`/`parseInt` and then `.toFixed()`/arithmetic, so all user-controlled inputs become numbers before reaching the DOM. No injectable string path, no `eval`, no CDN dependency, no secrets. The tool links only `../../assets/style.css` — offline/USB-safe.

**Edge cases — robust.** Division-by-zero is prevented by clamping (`rollers≥1`, `uLPerStroke≥0.01`, `rpm≥1`, volumes→0 on NaN/negative). N=0 is unreachable (remove button disabled at N≤1). N=1, all-zero volumes, and K>active-count all resolve without crashes or NaN in the computed totals.

**Landing page card — parity confirmed.** The new card (lines 666–673) uses `card-title-dispense-sim`, `card-desc-dispense-sim`, and `card-link-tool`; all three keys exist in both the `en` and `it` LANG blocks. Structure mirrors the other tool cards.

The findings below are quality/robustness issues; no blockers were found.

## Warnings

### WR-01: `setRangeFill` produces `--fill: NaN%` when liquid count is 1

**File:** `tools/dispense-throughput-simulator/index.html:549-552` (triggered from `:580` and `:922`)
**Issue:** When `liquidCount === 1`, the concurrency slider gets `min=1` and `max=1`. `setRangeFill` then computes `((+el.value - +el.min) / (+el.max - +el.min)) * 100` = `(1-1)/(1-1)*100` = `0/0` = `NaN`, and sets `--fill: NaN%`. The browser rejects the invalid value, so the slider's fill silently falls back to the gradient default (0%), showing an empty/incorrect track in the single-liquid configuration. Not a crash, but a real degenerate-input defect the rest of the code carefully guards against.
**Fix:** Guard the denominator:
```js
function setRangeFill(el) {
  const range = (+el.max - +el.min);
  const pct = range > 0 ? ((+el.value - +el.min) / range) * 100 : 0;
  el.style.setProperty('--fill', pct + '%');
}
```

### WR-02: Sixth tool card reintroduces the grid orphan the `--feature` span was meant to prevent; comment is now stale

**File:** `index.html:463-472` (CSS + comment) and `index.html:666-673` (new card)
**Issue:** The `.tool-card--feature { grid-column: span 2; }` rule and its comment exist specifically to keep the "merged **5-card** Tools grid" from "falling into a 3+2 orphan row." The Tools grid now has **6** cards, and `system-architecture-explorer` still spans 2 tracks → 7 track-units. `.tools-grid` is `repeat(auto-fill, minmax(290px, 1fr))`, which renders 3 columns at typical desktop widths. Auto-flow then places: row 1 = rotor/occlusion/tensioned, row 2 = sysarch (spans cols 1–2) + gsd, row 3 = **dispense alone** in a 3-wide row — exactly the single-card orphan the feature span was added to avoid. The design intent recorded in the comment is now violated, and the comment ("merged 5-card Tools grid", "5 cards", "filler 6th card") no longer matches reality.
**Fix:** Re-balance the grid for 6 cards — e.g. drop `tool-card--feature` now that the count is even (6 = 3+3), or move the feature span to the new richest-scoped card — and update the stale comment to say 6 cards. Verify visually at desktop and tablet widths before shipping.

## Info

### IN-01: `renderGantt` second guard blanks the panel instead of showing a notice

**File:** `tools/dispense-throughput-simulator/index.html:797`
**Issue:** The primary guard (lines 782–785) correctly follows the "show, don't hide" precedent with an inline "Timeline unavailable" notice. The secondary guard `if (winStartIdx === -1 || winEndIdx === -1) { ganttEl.innerHTML = ''; return; }` instead leaves the panel blank. In practice this branch is unreachable (the chosen window cycles `N` and `min(N+2, SAMPLES)` always exist in the cycles array for N=1..6), so it is effectively dead defensive code — but if it ever did fire it would silently blank the Gantt, contradicting the tool's stated show-don't-hide behavior.
**Fix:** Mirror the primary guard's notice, or remove the now-provably-unreachable branch:
```js
if (winStartIdx === -1 || winEndIdx === -1) {
  ganttEl.innerHTML = '<p class="warn-box" style="display:block">Timeline unavailable for the current inputs.</p>';
  return;
}
```

### IN-02: `rollers` accepts non-integer input despite being a physical roller count

**File:** `tools/dispense-throughput-simulator/index.html:908-909`
**Issue:** `rollers` is read with `parseFloat` and used directly in `strokesPerSec = (rpm/60)*rollers`. The `step="1"` attribute is only a spinner hint, not enforced on manual entry, so a user typing `4.5` yields a fractional roller count that flows into every dose time. No crash, but a physically meaningless value silently produces "valid-looking" results.
**Fix:** Floor to an integer after clamping: `rollers = Math.max(1, Math.floor(parseFloat(...) || 0));`, matching how a discrete roller count should behave.

---

_Reviewed: 2026-07-20_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
