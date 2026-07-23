# Proto-02 v2.3 — Pump Test Protocol & Rationale

**Device under test:** proto-02 v2.3 head, 5 µL 4-roller peristaltic pump (single bearing per roller, gap 1.52 mm measured, concentric).
**Purpose of this document:** record *why* the test campaign is designed the way it is — not just the run sheet, but the reasoning behind every choice (volumes, speeds, replicate counts, the pipette comparison), what the data will look like, and — honestly — what it can and cannot prove.
**Run sheets:** [`pump-campaign-runsheet-with-240.csv`](pump-campaign-runsheet-with-240.csv) — the **extensive** sweep being run (11 conditions / 76 dispenses, incl. 240 rpm) · [`pump-campaign-runsheet.csv`](pump-campaign-runsheet.csv) — the core 9-condition subset (no 240). The **pipette** and **evaporation-blank** runs are manual (not a CSV) — see §9.
**Measured data:** recorded in [`TEST-RESULTS.md`](TEST-RESULTS.md).

> Confidence tags used throughout: `[Certain]` (follows from measurement/definition), `[Likely]` (well-supported inference), `[Guessing]` (hypothesis to be tested).

---

## 1. What we are actually measuring — two independent questions

A pump has **two** performance axes, and they are *not* the same thing:

| Axis | Question | Metric | Can it be fixed after the fact? |
|------|----------|--------|--------------------------------|
| **Accuracy** | Does it hit the target volume? | mean µL/stroke vs 5 µL | **Yes** — it is a step-count multiplier. Off by 41 %? Command 41 % more steps. |
| **Precision** | Is it *consistent* stroke-to-stroke? | CV = SD/mean (%) | **No** — random scatter cannot be calibrated away. |

This distinction drives the entire design. **Accuracy is calibratable, precision is not.** So precision (CV ≤ 5 %, the pass gate — see §2 of `PROTOTYPE.md`) is the *fundamental* figure of merit; accuracy only needs to be *known*, not perfect. A test that spends all its effort on the mean and skimps on the CV is testing the wrong axis. `[Certain]`

The measured baseline that motivates all of this: v2.3 delivered **2.95 µL/stroke at 180 rpm** (−41 %), and the revolution-count check (E7) confirmed **no missed steps at any speed, including 1/16 microstepping**. So the deficit is **volumetric, not motor step-loss** — it is a real property of the pump to be characterised, not an artefact. `[Certain]`

---

## 2. The binding constraint — a 0.1 mg balance — and how the design works *around* it

Our balance reads to **0.1 mg (0.0001 g)**. This is the single most important limitation, and every design choice below is shaped by it.

### 2.1 Why it matters

ISO 23783-2:2023 **Table 3** sets the minimum balance readability by delivered volume:

| Delivered volume | Required readability | Our 0.1 mg balance |
|------------------|---------------------|--------------------|
| < 0.5 µL | 0.0001 mg | ✗ |
| 0.5 – 20 µL | 0.001 mg | ✗ (100× too coarse) |
| 20 – 200 µL | 0.01 mg | ✗ (10× too coarse) |
| **200 – 10 000 µL** | **0.1 mg** | ✓ **compliant** |

So our balance is metrologically honest **only for deliveries ≥ 200 µL**. A single 5 µL dose = 5 mg; against a ~0.1 mg per-weighing noise floor that is a **~2–3 % floor on every reading**, which at 900 mg (a large collection) becomes ~0.01 % — invisible. `[Certain]`

### 2.2 The three tricks that make a coarse balance sufficient

We never try to weigh 5 µL accurately. Instead:

1. **Mean from the slope.** Fit `delivered = m·strokes + b` using only the **compliant (≥200 µL)** points. The slope `m` = volume per stroke, at ISO grade, with no micro-balance. The 5 µL prediction is `m·1 + b` — it rides on the slope, not on a 5 mg reading.
2. **Per-stroke CV via √N.** Measure the CV of a large collection (300 strokes) where the balance is clean, then `CV_stroke = CV(collection) × √N`. Precision measured where the scale is honest, scaled back to the single stroke. *(Valid if strokes are independent — see §5.3; the CV-vs-volume shape reveals if they are not.)*
3. **Same-instrument comparison (pipette).** Weigh the pump's 5 µL and a calibrated pipette's 5 µL on the *same* balance, same method. The scale's systematic error biases both equally, so the **comparison** is valid even though neither absolute number is ISO grade (§6).

---

## 3. Why these three volumes

Volume levels are set by **stroke count** (the controlled variable), chosen so the *delivered* volume lands where we want on the compliance map — using the pessimistic ~3 µL/stroke figure so the medium/high points stay compliant even if the pump under-delivers.

| Level | Strokes | Delivered (@ ~3–5 µL/stroke) | Role | Compliance |
|-------|---------|------------------------------|------|-----------|
| **Low** | 1 | ~3–5 µL | the **operating dose** — what the device is *for* | indicative (below Table 3) |
| **Medium** | 100 | ~300–500 µL | second compliant anchor for the slope | ✓ ISO |
| **High** | 300 | ~900–1500 µL | cleanest point → the trustworthy CV | ✓ ISO |

**Why not 40 / 200 strokes (nominal 5 µL/stroke)?** Because compliance is on *delivered* volume. At the measured ~3 µL/stroke, 40 strokes delivers only ~120 µL — which falls in the non-compliant 20–200 µL band. Sizing to 100/300 strokes guarantees ≥200 µL delivered in both the optimistic and pessimistic per-stroke cases. `[Certain]`

**Why a spread of volumes at all, if per-stroke should be constant?** Two reasons:
- The **slope** needs ≥2 compliant points to separate the per-stroke volume `m` from any fixed per-delivery offset `b` (priming / first-stroke / last-drop).
- The **CV-vs-volume shape** is diagnostic (§5.3) — it tells us *why* any scatter exists, not just how much.

---

## 4. The speed check — what it really means

We currently run 180 rpm **by assumption** (it is fast), never tested. The speed sweep (60 / 120 / 180 rpm, plus optional 240) is not a formality — it probes a specific physical mechanism and answers a design question.

### 4.1 The mechanism: refill limitation

A peristaltic pump must let the tube **re-expand and refill** in the window between one roller leaving and the next arriving. At 180 rpm with 4 rollers that window is ~83 ms; at 60 rpm it is ~250 ms. If the silicone cannot refill in time, the pump under-delivers — and **the geometry will look perfect while the dose is low**, because nothing dimensional is wrong. This is a *dynamic* deficit, invisible to calipers. `[Likely]`

Because step-loss is ruled out (E7), speed-dependence is now the **prime remaining suspect** for the −41 %.

### 4.2 "Best speed" is a trade-off, not a single number

| Criterion | Wants | Read from |
|-----------|-------|-----------|
| Throughput | fast | analytic (doses/min ∝ rpm) |
| Accuracy | stable per-stroke | mean vs rpm |
| Precision | lowest CV | CV vs rpm |

The sweep draws the trade-off curve; the *choice* applies the priority. `[Certain]`

### 4.3 The deeper point — best speed is a property of the *design*, and it can move

A future head with a different gap changes the torque and refill behaviour, so the best speed can shift. This is why we **must test beyond 180** (add 240) — testing only up to the assumed speed cannot reveal whether 180 already sits past a knee. And it is why a single fixed speed cannot simply be inherited by future pump versions without re-checking (§8). `[Likely]`

---

## 5. The replicate counts — why *fewer* at low volume, not more

This is the least intuitive choice, so it gets the most explanation. Instinct says "the scale is worse at low volume → measure more there." That instinct conflates two things replicates treat very differently.

### 5.1 Replicates fight randomness; they do not fight resolution

The observed scatter combines two sources:

```
SD_observed²  =  SD_pump²  +  SD_scale²
                  (real)      (~0.1 mg floor, fixed per weighing)
```

More replicates give a **more precise estimate of `SD_observed`** — but they cannot change what `SD_observed` *is*. At 5 µL the term is dominated by `SD_scale`, so a CV measured on single 5 µL doses — no matter how many — is mostly a precise estimate of **the balance, not the pump**. `[Certain]`

> **Ruler analogy.** A ruler marked only in centimetres, measuring a millimetre wobble: 3 readings or 3000, you mostly read the same cm mark. The "scatter" reflects the ruler's coarseness, not the true wobble. More readings ≠ finer resolution. Only a better ruler fixes that.

*(One could subtract the known scale noise in quadrature, `SD_pump = √(SD_obs² − SD_scale²)`; but at 5 µL `SD_scale` is nearly the whole signal, so the remainder is buried and no replicate count recovers it.)*

### 5.2 Therefore: replicates go where the scatter is real signal

| Level | n | Why this n |
|-------|---|-----------|
| Low (1 stroke) | **3** | scatter is scale-dominated → extra reps buy little for the pump CV. 3 bounds it. |
| Medium (100) | **5** | compliant → a real, if rough, CV |
| High (300) | **10** | scale-noise negligible → the scatter *is* the pump → this is where the trustworthy CV lives, back-calculated to per-stroke via √N |

The one exception: **1 stroke @ 120 rpm is n=10** — that is the operating-dose cell paired with the pipette head-to-head (§6), where the low-volume CV is a *reported* number and n must match the pipette for a fair comparison. `[Certain]`

### 5.3 What the CV-vs-volume *shape* reveals (the diagnostic payoff)

Reading CV across the volume axis (at fixed speed) tells us the **error structure**, not just its size:

- **Falls as 1/√N** → strokes independent, error random → clean pump. ✓
- **Plateaus** (stops falling) → **roller-systematic** error: one of the 4 rollers is off, and it repeats every rotation so it cannot average away. *This is the single most useful thing the shape can reveal.*
- **Rises at low volume** faster than 1/√N → a **fixed per-delivery** error (priming / first-stroke / last-drop = the intercept `b`) that is a large fraction of a small dose.

---

## 6. The pipette head-to-head — the thesis point

The device exists to **replace a human pipetting by hand**. So the fair benchmark is not ISO perfection — it is *the human it replaces*.

**The argument:**
1. Accuracy (mean) is calibratable → a low mean is not a real defect.
2. Precision (CV) is **not** calibratable → it is the true, honest quality of the mechanism.
3. Therefore: if the pump's CV at 5 µL is **≤ the manual-pipette CV at 5 µL**, the device is *more consistent than the person it replaces*, on the one metric that cannot be faked — even if its mean needs calibration.

**Why it is valid on a coarse balance:** both pump and pipette are weighed on the *same* 0.1 mg balance, same vessel, same fast-tare method, **interleaved** (pump, pipette, pump, pipette…) so any drift hits both equally. The scale's systematic error **cancels in the comparison**. `[Likely]`

**Guards to keep it honest:**
- **Scale floor:** at 5 µL the ~0.1 mg floor sits under *both* CVs. If both come out ~3 %, they may be indistinguishable (both measuring the scale). The 50 µL pipette point (Block 4) checks this — if they separate cleanly there, the 5 µL comparison is real; if not, a finer balance is needed to resolve a difference. `[Certain]`
- **Operator + standard:** the manual CV includes the operator's skill. Frame it as "vs manual pipetting under matched conditions," and back it with the **ISO 8655** benchmark (a good pipette holds CV ≈ 1.5–3 % at 5 µL) so the claim does not rest solely on one person's hand.
- **n = 10 each** for a comparable CV.

---

## 7. ISO grounding and documented deviations

The method is adapted from **ISO 23783-2:2023 Annex D** (single-channel gravimetric — the correct standard for an *automated* liquid handler, closer than the hand-pipette standard ISO 8655). At prototype stage, full compliance is neither possible (balance) nor warranted (single build), so deviations are **documented, not hidden** — which is a stronger methods position than pretending to a compliance we do not have.

| ISO 23783-2 requires | We do | Justification |
|----------------------|-------|---------------|
| Balance 0.001 mg @ 5 µL (Table 3) | 0.1 mg | slope method + same-scale pipette comparison sidestep absolute low-volume accuracy (§2.2) |
| ≥10 evaporation blanks (D.5.2) | 3–5 blanks/session, fast weigh | cheap, saves the low-volume data; fast-tare limits evaporation |
| Pre-rinse tube ≥5× (6.3) | **keep** | free; fixes the run-to-run non-stationarity seen on 2026-07-16 |
| Thermal equilibrium 2 h, log T/RH/P (6.3, Table D.1) | note room temp start/end | enough to flag drift at prototype scale |
| Z-factor density + buoyancy (Annex A) | assume 1.00 mg/µL | < 0.3 % vs a 5 % budget — negligible, documented |
| n = 10 (Part 3 / ISO 8655 convention) | n = 3 / 5 / 10 by volume | prototype means, not certification; stated as such |

**Reporting** (per ISO 23783-3): systematic error (trueness) and random error (precision) reported *together*, with the deviations above stated in the method. Local licensed copy: [`prototypes/DS_EN ISO 23783-2_2023.pdf`](../../DS_EN%20ISO%2023783-2_2023.pdf).

---

## 8. Test strategy — screen once, then lock a reusable protocol

The campaign is **two-stage**, and the second stage is a deliverable in its own right.

**Stage 1 — Screen (this build).** The full factorial (§9) explores the design's behaviour and *finds* the operating point. This is exploratory: we do not yet know the pump.

**Stage 2 — Deep-dive at the winning speed.** Once the best speed is chosen, spend the replicate budget at that one condition — **n ≈ 30** — to get a CV precise enough to *claim* ≤ 5 % rather than "≈". This is where a defensible pass/fail comes from.

**The lasting output is a *fixed reference protocol*:** `[winner speed] × [operating dose + one compliant volume] × n=30 + pipette head-to-head + reinstall check`. This is the standardised routine test.

**For future pump versions:** run the *fixed* reference protocol (so version-to-version differences are attributable to the **design**, not the test conditions) **plus a cheap 3-speed mini-sweep (n=5)** to confirm the refill knee has not moved. You cannot blindly inherit "180 rpm" (§4.3), but you *can* inherit the protocol structure and re-verify the operating point. `[Likely]`

This connects to the project's reframe that the **test system is itself a thesis deliverable**: the factorial's real product is the standardised protocol it lets us lock.

---

## 9. The run sheet (Stage 1)

Pump factorial — running the **extensive** sheet [`pump-campaign-runsheet-with-240.csv`](pump-campaign-runsheet-with-240.csv) (incl. 240 rpm). Microstep = 4 (1/4) is a **constant, not a factor** (E7: volume independent of microstep). Delivered volumes assume ~3–5 µL/stroke.

```
                SPEED →
  STROKES ↓    60rpm   120rpm   180rpm  (240rpm)   role
 ┌──────────┬───────┬────────┬───────┬─────────┐
 │ 1  (~5µL)│  n=3  │ n=10 ★ │  n=3  │    —    │  operating dose
 │100 (~400)│  n=5  │  n=5   │  n=5  │  (n=5)  │  compliant anchor
 │300(~1.2k)│ n=10  │  n=10  │ n=10  │ (n=10)  │  clean CV
 └──────────┴───────┴────────┴───────┴─────────┘
   ★ pump side of the pipette head-to-head
   9 conditions · 61 dispenses  (11 · 76 with 240 rpm)
```

**Non-pump runs** — manual, done in the same session, no separate CSV:
- **Evaporation blanks:** ≥3–5 per session (tare → run one delivery cycle to waste → reweigh → average = the correction added back to every net mass).
- **Pipette head-to-head:** **5 µL × 10**, interleaved 1:1 with the pump's 1-stroke @ 120 rpm cell — then **50 µL × 5** as the floor check (§6). Same balance, boat, and fast-tare method as the pump.

**Controls (mandatory):**
- **Randomise** execution order — prevent tube-wear / drift aliasing onto speed or volume.
- **Pre-wet** the tube ≥5× and **discard a priming run** — fixes the non-stationarity seen on 2026-07-16.
- **Interleave** pump and pipette at 5 µL; record room temp start/end.
- **Re-caliper the gap** before and after — the over-scraped dovetail has no hard datum, so clamp slip would masquerade as drift.

---

## 10. Expected results — the two plots and their confidence

### 10.1 Plot 1 — per-stroke volume vs speed → *accuracy + which-speed*

```
 µL/                     one line per volume level
stroke                   (lines overlap if per-stroke is constant)
  5 ┤ ●━━━━●━━━━●         FLAT      → speed irrelevant, run fast (180 fine)
    │  ╲                            → the −41% is not speed; look elsewhere
  4 ┤   ●─╲                DROOPING  → refill knee; best = speed before the drop
    │        ●──╲___                 → retro-explains proto-01 inversion
  3 ┤            ●         (measured baseline: 2.95 @ 180)
    └───┬─────┬─────┬─────┬──►  rpm
       60    120   180  (240)
   error bars: small on the mean (±0.6% at n≥3 on compliant volumes)
```
Read **across a row** (fixed volume). Error bars on the **mean** are small — the mean is the easy, well-resolved quantity. `[Certain that the mean is well-resolved; Guessing which shape appears]`

### 10.2 Plot 2 — CV vs volume → *precision + error structure*

```
 CV%
  6 ┤●                     large error bars at LOW volume (±25–40%),
    │ ╲                    and floor-contaminated (measuring the scale)
  5 ┤  ╲ ─── ≤5% gate ─────────────────────
    │   ╲                  from the n=10 HIGH-volume point (trustworthy):
  4 ┤ ◇  ●╲                  · falls as 1/√N → random/clean  ✓
    │      ╲___             · plateaus       → roller-systematic
  3 ┤          ●            · low-V blow-up  → priming/first-stroke
    └────┬──────┬──────┬──►  volume
        5µL    400    1200
   ● pump   ◇ manual pipette (5µL benchmark)   dashed = ISO 8655 pipette band
```
Read the **high-volume points** (tight error bars); back-calculate per-stroke CV via ×√N. The **shape** diagnoses the cause; the **● vs ◇** at 5 µL is the thesis comparison. `[Certain on how to read it; Guessing which shape appears]`

### 10.3 Confidence summary

| Quantity | Source | Confidence |
|----------|--------|-----------|
| Mean per-stroke volume | slope of compliant points, n≥3 | **±0.6 %** — solid `[Certain]` |
| Speed effect on mean | Plot 1 across rows | clear knee resolvable; fine splits not `[Likely]` |
| Per-stroke CV | √N from high-volume n=10 | **±25 %** on the CV — indicative, *not* certifiable at n=10 `[Certain]` |
| CV error structure | CV-vs-volume shape | qualitative, robust `[Likely]` |
| Pump vs pipette at 5 µL | same-scale interleaved comparison | valid *if* above the floor (check via 50 µL point) `[Likely]` |

---

## 11. Honest scope — what this campaign can and cannot claim

**Can** `[Certain]`:
- Characterise per-stroke **volume** and its dependence on **speed** and **volume**, to good precision on the mean.
- Locate the **operating point** (best speed) and retro-explain the −41 %.
- Show, head-to-head, whether the pump's precision at the operating dose is **comparable to / better than manual pipetting** — the core thesis claim.

**Cannot** (state these before an examiner does):
- **Certify CV ≤ 5 %.** At n=10 the CV carries ±25 %; a defensible pass needs the Stage-2 n≈30 deep-dive. Until then, report "CV ≈ X %, prototype estimate," not "meets ≤5 %."
- **Prove the *design*, only this *build*.** Single head, single tube, single session — no cross-build reproducibility.
- **Directly measure single-dose precision** — it is *inferred* via √N (assumes independent strokes; the plateau test guards this).
- **Speak to real-use conditions** — water only, no backpressure / downstream needle / real reagent. Pump-only, ideal conditions.

**Two cheap additions that close the biggest gaps** (recommended if time allows):
1. **n ≈ 30 at one deciding cell** (the high-volume CV anchor, or the operating dose) → a certifiable CV instead of an indicative one.
2. **A 5-run reinstall block** (E4): remove/remount the head 5×, re-caliper the gap + one quick volume each → converts "one build" into "one build with known remount variability." Highest-value 5 runs available, because the over-scraped dovetail has no datum.

---

*Cross-references: targets & pass criteria — `PROTOTYPE.md` §2; planned experiments E1–E7 — `PROTOTYPE.md` §8; the −41 % result — `PROTOTYPE.md` §8.2; displaced-volume model (E5 back-calc of effective k) — [`tools/peristaltic-roller-displaced-volume-model`](../../../tools/peristaltic-roller-displaced-volume-model/index.html).*
