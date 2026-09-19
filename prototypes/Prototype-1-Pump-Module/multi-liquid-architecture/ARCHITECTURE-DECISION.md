---
id: arch-multi-liquid
slug: multi-liquid-architecture
title: Multi-liquid pump architecture — replicated pumps (A1/A2) vs shared-motor concepts (B/C)
status: provisional-decision-pending-tests
created: 2026-07-02
updated: 2026-07-02
---

# Multi-liquid pump architecture decision

**How the device scales from one pump to the 5–6 needed to handle 5+ liquids (requirement R3).**

This is **not** a prototype in the `proto-NN` series — it is the architecture study that sits
*above* that series. The single-pump prototypes (`proto-01`, `proto-02`, …) refine **one** pump
head; this document decides **how many motors and how the liquids are selected** once that single
pump works. It feeds the future **proto-04 (multi-liquid mechanism)** build. The `proto-NN` streak
is left free to keep expanding on the single-pump problem.

> **Status: provisional decision, pending tests.** The recommendation below (the **A family** —
> replicated pumps, with A1 as the build-first variant and A2 as its upgrade path) is the current
> best call against the [requirements & criteria table](../../REQUIREMENTS-CRITERIA.md), but several
> open unknowns (§5) must be resolved before it is locked. Confidence tags:
> `[Certain] / [Likely] / [Guessing]`.

---

## 1. The question

Currently one pump = one motor = one liquid. To dispense 5–6 different liquids, do we:

- **replicate** the whole pump module N times (N motors), or
- **share** one motor across all liquids and *select* which tube is active by some mechanism?

The sub-question underneath it — the one that actually decides the architecture — is:
**how is an idle liquid line sealed, and how is an active line selected?** Everything else
(pin count, weight, motor size) turned out to be secondary.

**Governing assumption.** This study presumes that, by the time the multi-liquid architecture is
built, the **single pump is within spec** (or very nearly) — i.e. proto-02's successor seals and
dispenses to ±10 %. The architecture question is therefore *how to multiply a working pump*, not
whether the pump works. The seal question (former U1) **and** tube-recovery from compression
(former U2) are treated as **resolved** here — a tube that could not recover from roller compression
could not pump at all — so the live unknowns are what multiplication *adds* (§5).

---

## 2. The four concepts

Option A (one motor per pump) splits into two variants that are **mechanically identical** but differ
entirely in the **control layer** — that distinction matters enough to score them separately.

### Option A1 — Replicated pumps, shared step bus (electrical selection)
Six independent copies of the (working) single-pump module on a common rack — each its own stepper,
rotor, gap-locked head, and tube. The drivers **share one STEP and one DIR line**; selection is by a
**per-driver ENABLE pin**. Only enabled motors move, and any co-enabled motors move in **lockstep**
(identical steps + direction). Idle lines are sealed **for free** by their own parked rollers (no
extra valve; relies on the single pump sealing — now assumed, §1). **One Arduino Nano suffices**
(~8 pins). *Firmware-wise this is essentially Option C's problem* — you **coordinate/sequence which
unit is active** — but the selector is an **electrical enable pin, not a mechanical engagement**, so
there is no moving selector and no engagement wear. **Limitation:** because the step train is shared,
you cannot run two liquids at **independent rates simultaneously** (only one-at-a-time, or several in
lockstep at the same rate).

### Option A2 — Replicated pumps, independent control (per-motor step/dir)
The **same six mechanical modules**, but each motor gets its **own dedicated STEP/DIR** — full
independent control. Any pump can run **at any time, at its own speed/direction, truly in parallel**.
This unlocks: **per-liquid pump configuration** (speed, ramp, stroke count tuned to each liquid),
**simultaneous multi-liquid dispensing** (every nozzle fires its liquid whenever a sample is under
it), and — because each pump is mechanically independent — the option of **different tube sizes /
rotor geometry per liquid** (e.g. a fine tube for a 5 µL reagent, a wider one for a 1000 µL buffer).
**Same motors and drivers as A1 — only the controller changes.** *Pin count is not the blocker:*
6 × (STEP+DIR) + a shared ENABLE + I²C ≈ **15 of the Nano's ~18 usable pins**. *The blocker is step
generation:* the Nano's 3 hardware timers / 16 MHz CPU cannot reliably produce 5–6 **independent,
simultaneous** step trains at the target rate. So A2 wants either a controller with hardware step
generators (**RP2040 PIO** — 8 of them; or **STM32** timers) **or** SPI step-generator driver ICs
(**TMC5160**-class) that make the steps themselves (letting even a Nano *command* them). **A2 is
mechanically identical to A1** — the difference is purely controller + firmware, so **A1 → A2 is a
control-layer upgrade, not a mechanical redesign.** (If only one pump ever runs at a time, a Nano
suffices even under A2 wiring; the capable controller is only needed for genuine parallel motion.)

### Option B — Shared motor, pinch-valve selection *(weak — not recommended)*
One motor spins a single rotor; all tubes ride it; **strong pinch valves, closed by default to
prevent unwanted dispensing**, open only the selected line. The pinches **do seal** — a strong
pinch lets no liquid through — so this design **does not spill**. Its problem is different `[Likely]`:
because every tube rides the one rotor, the rollers keep squeezing *all* lines whenever the motor
turns. The idle (pinched-closed) lines get **pressurized** between the advancing roller and the
closed pinch, which (a) stresses tube, rollers and motor, (b) **wears every tube on every dispense**,
not just the active one, and (c) discharges an **uncontrolled pressure transient** the instant a
pinch releases — a dose spike that hurts accuracy and reproducibility. B is buildable and passes the
requirement gate, but it fights itself; retained for completeness and scored below, not recommended.
Note that clean selection on a shared rotor otherwise **requires per-lane engagement**, which *is*
Option C.

### Option C — Shared motor, per-lane engage/disengage
One motor, one wide rotor, 5–6 tube lanes side by side. Each lane has a head that is **pushed down
to a hard dovetail stop** to engage (gap set by the stop, exactly like the current single pump —
*not* by the actuator's precision), and retracted to disengage. The disengage travel continues into
**pinching the tube against an anvil**, so one two-position mechanism per lane does both jobs:
*engaged* = pumping, *disengaged* = sealed & tube relaxed. Lanes are selected by which heads are
engaged; the firmware can phase-sync engagement to the known roller angle for coordinated
multi-liquid dispensing.

---

## 3. Rationale — why the A family leads, and where B and C fall short

**The lens.** The [criteria table](../../REQUIREMENTS-CRITERIA.md) rewards, among concepts that all
pass the binary requirements, **feasibility (100), small footprint (80), low calibration (75), low
cost (75), maintainability (70×2)** — *not* raw performance, which is already gated as a requirement.
In plain terms: **prefer the architecture easiest to build and keep running**, not the most elegant.

**Why the A family leads — it keeps the fight on ground we're already winning.** The single-pump
campaign is a fight to control **one static gap** (`dVol/dG ≈ 3.4 µL/mm`; proto-02 v2.1 failed to
seal from 0.2–0.45 mm errors). Once that gap is solved (§1 assumption), **A just replicates the
solved part** — the precision problem is banked, six times, statically. No architecture that
*re-creates* the gap dynamically can be safer than one that simply copies a fixed, working one.

**A1 vs A2 — the same machine, two control philosophies.** A1 is the minimum: shared step bus,
enable-pin selection, one Nano. Its firmware is *exactly C's coordination problem* — sequence which
unit runs — but it selects **electrically** (an enable pin) rather than **mechanically** (an
engagement), so it gets C's multi-liquid selection **without C's moving selector or engagement
wear**. Its only real cost is that a shared step train can't drive two liquids at **independent**
rates at once. A2 removes that ceiling by giving each motor its own step/dir: true parallel
dispensing, per-liquid tuning, and the door to **different tube sizes per liquid** — at the price of
a more capable controller. Because the two share identical mechanics, the sensible path is **build
A1, upgrade to A2 if the protocols demand independence** — the mechanical work is never thrown away.

**Option B — the appeal, and why it still fails.** B is genuinely tempting on paper: **one motor**
is the cheapest, lightest, most compact way to move fluid, and pinch valves are simple, cheap,
off-the-shelf parts. If all that were needed were on/off selection, B would look ideal — and its
strong, default-closed pinches *do* seal, so (contrary to a first fear) **it does not spill**. The
failure is mechanical self-conflict: because every tube rides the **one** rotor, the rollers squeeze
**all** lines whenever the motor turns. The idle, pinched-closed lines are therefore **pressurized**
between an advancing roller and a closed valve on every dispense — which (1) stresses tube, rollers
and motor and wastes torque, (2) **wears every tube each time any liquid is dispensed** (≈5–6× the
tube consumption of A, undermining maintenance and the R7/R8 cleanability story), and (3) releases an
**uncontrolled pressure/vacuum transient** the moment a pinch opens — a dose spike at the start of
every dispense that directly threatens the ±10 % accuracy/reproducibility that is the device's whole
point. None of these is a single knockout; **together they make B a design that fights itself**, and
it buys the one-motor saving with damage on the highest-weighted criteria (feasibility, maintenance)
plus the performance requirements. It is documented here in full because ruling it out *for the right
reasons* is itself a result — "just add pinch valves to one pump" is the obvious naive first idea,
and this is precisely why it loses.

**Option C — the appeal, and the catch.** C is the credible compact rival: **one motor, one rotor,
lanes selected by per-lane engage/disengage to a hard stop**, with disengagement doubling as an
anti-siphon pinch. Commercial multichannel lab pumps (Ismatec IPC-style) use exactly this
shared-rotor, per-cartridge-engagement architecture, so it is **industry-proven** `[Likely]`. Its
honest wins are **footprint and weight** — far more compact than a six-module rack. The catch is that
C **re-establishes the occlusion gap on every lane, every cycle, unattended**, on the *same dovetail
hard-stop interface that seated 0.45 mm high in proto-02 v2.1* — i.e. it bets the multi-liquid device
on the exact interface that is currently our known failure mode, and adds 5–6 engagement mechanisms
(each a maintenance item, and — sharing one motor/rotor — a common point of failure). Those
industrial pumps earn their reliability with machined, spring-loaded, hand-tuned cartridges: the
engineering maturity C would demand from us.

**Corrected premises** (both were load-bearing worries that turned out not to bind):
- *"More motors = more Arduinos"* → **false** `[Certain]`. A1 needs one Nano (shared bus + 6 ENABLE,
  ~8 pins of ~18). Even A2 needs one (more capable) controller, not one per motor. Extra cost of N
  motors ≈ €3/driver.
- *"More motors = too heavy / NEMA17 too weak downsized"* → **manageable** `[Likely]`. See §6.

---

## 4. Independent scores (weighted decision matrix)

Each concept is rated **independently** on its own merits — no datum — so every idea gets a final
number. Each is rated **1–5 per criterion** (5 = best), then `score = Σ(weight × rating)`,
normalized to a percentage of the maximum possible (`5 × Σweight = 5025`). Weights are the
[criteria table](../../REQUIREMENTS-CRITERIA.md). A1 and A2 differ **only** in the control-layer cells
(feasibility, versatility, integration).

| Criterion | Weight | A1 | A2 | B | C |
|-----------|-------:|:--:|:--:|:-:|:-:|
| Feasibility | 100 | 5 | 4 | 2 | 3 |
| Small footprint | 80 | 2 | 2 | 4 | 5 |
| Low calibration | 75 | 4 | 4 | 3 | 2 |
| Inexpensive | 75 | 3 | 3 | 4 | 3 |
| Low-maintenance | 70 | 4 | 4 | 2 | 2 |
| Repairable | 70 | 5 | 5 | 2 | 2 |
| Versatility (protocols) | 65 | 4 | 5 | 3 | 3 |
| Dead volume | 60 | 3 | 3 | 3 | 3 |
| Run unsupervised | 60 | 4 | 4 | 2 | 3 |
| Lightweight | 60 | 3 | 3 | 4 | 4 |
| Cleanable | 50 | 4 | 4 | 3 | 3 |
| Capable of integration | 45 | 4 | 5 | 3 | 3 |
| Off-the-shelf + 3D print | 40 | 4 | 4 | 3 | 3 |
| End-of-life design | 40 | 3 | 3 | 3 | 3 |
| Ruggedness | 35 | 4 | 4 | 3 | 2 |
| Outdoor conditions | 35 | 3 | 3 | 3 | 3 |
| Min. consumables | 20 | 3 | 3 | 3 | 3 |
| Accuracy | 10 | 4 | 4 | 2 | 3 |
| Sustainable materials | 10 | 3 | 3 | 3 | 3 |
| Reproducibility | 5 | 5 | 5 | 2 | 3 |
| **Weighted total** (of 5025) | | **3735** | **3745** | **2915** | **2985** |
| **Normalized score** | | **74 %** | **75 %** | **58 %** | **59 %** |
| **Requirement gate** | | ✅ pass | ✅ pass | ✅ pass | ✅ pass |

Two clean clusters: the **replicated-pump family (A1/A2) at 74–75 %** and the **shared-motor family
(B/C) at 58–59 %** — a ~15-point gap that no single rating swing closes.

**A2 = 75 % — top.** Best on **versatility (5)** and **integration (5)** on top of the A-family
strengths (repairability 5, reproducibility 5, feasibility 4). Independent per-motor control gives
**parallel dispensing, per-liquid tuning, and the option of different tube sizes per liquid**. It
costs one **feasibility** point vs A1 (needs a more capable controller for simultaneous independent
stepping). Weak only where the rack is: **footprint (2)** and **lightweight (3)**.

**A1 = 74 % — essentially tied; the simplest build.** Top **feasibility (5)**: the working single
pump replicated with a shared step bus + enable-pin selection, one Nano, minimal wiring and firmware.
It matches A2 everywhere except **versatility (4)** — a shared step train means co-enabled motors run
in lockstep, so no independent simultaneous rates. Its firmware is *C's coordination problem solved
electrically* — enable pins instead of engagement mechanisms.

**C = 59 % — viable fallback.** Wins are real and already maxed: **footprint (5)** — one rotor+motor
vs a rack — and **lightweight (4)**. Held back by doing the gap *dynamically*: **feasibility (3)**
(re-creates the gap per lane, per cycle, unattended, on the dovetail interface that seated 0.45 mm
high in v2.1); **low calibration (2)** (6 gaps re-established each engagement vs A's 6 set once);
**maintenance & repairability (2 each)** (6 engagement mechanisms; shared motor/rotor is a single
point of failure); **run-unsupervised (3)** (actuated seating must be verified every cycle).

**B = 58 % — buildable but self-defeating.** Pinches seal (strong, default-closed → no unwanted
dispensing, **no spillage**) and it is compact (footprint 4) and light (4). But every dispense
**pressurizes and wears every idle line**, and releasing a pinch fires an uncontrolled transient →
weak on **feasibility (2)**, **maintenance (2)**, **accuracy (2)**, **reproducibility (2)**. Passes
the requirement gate but fights itself; not recommended (full discussion §3).

### Is the ranking robust?
The A-family lead is a **cluster gap (~15 pts)**, not a single-criterion artifact. C already maxes
**footprint (5)** and near-maxes **lightweight (4)**, so it cannot climb further where it is strong;
to overtake A it needs either bench data lifting its **feasibility**, or a **hard size envelope**
(U4) that makes footprint a *binary requirement* the rack fails. **A1 vs A2 is not a robustness
question** — they tie within noise, and the choice is set by whether protocols need independent /
parallel dispensing (U5), not by the weights. `[Likely]`

---

## 5. Open unknowns ("incognite") — must be resolved to lock the decision

| # | Incognita | Why it matters | Current stance |
|---|-----------|----------------|----------------|
| U1 | **Single pump within spec (seals as a passive idle valve)** | A's "idle rollers = free valve" rests on the single pump sealing. | **Assumed resolved** — governing premise (§1); the single-pump campaign delivers it. Listed for traceability. |
| U2 | **Tube recovery from compression** | Was flagged as the risk to A's passive-valve seal. | **Assumed resolved** (§1, §5a): the tube must recover from roller compression for the pump to work *at all* — *cyclic* recovery is intrinsic. Prolonged *static* set (parked for days) is a different, slower regime but is **avoided by design** (drained between sessions, R8; released for storage, §5a), so it never governs. E8 = optional longevity data, not a gate. |
| U3 | **Real stall margin of the downsized motor** at the operating point | Sizes the motor with data instead of the SPEC's estimated 200 g/roller load. Decides pancake vs mid-size NEMA17 → A's weight penalty. | Test = E7 (proto-02) with deliberate margin measurement. |
| U4 | **Is there a hard footprint/size envelope?** (PANPOC bench, alignment module, portability) | The *only* thing that flips the decision to C (§4 robustness). | Unknown — needs the system-level integration constraint. |
| U5 | **Do protocols need liquids dispensed at independent rates / simultaneously?** | This is the **A1-vs-A2 selector**. Independent/parallel need → A2 (C's serial-interleave is too limited; B's transient too crude). Purely serial, one-at-a-time → A1 suffices. | Different samples in parallel, or per-liquid tuning → **A2**. Strictly serial → **A1**. |
| U6 | **A2 controller capability** — can the chosen MCU generate 5–6 *independent* step trains at target rate? And is per-liquid **different tube sizing** worth its added calibration? | Sets whether A2 is a Nano-plus-firmware step or needs an RP2040/STM32/step-generator ICs; and whether the different-tube-size option earns its extra calibration burden (criterion weight 75). | Test = E10 (if A2 pursued). `[Likely feasible on RP2040 PIO]` |

### 5a. Design principle — release the squeeze when idle (follow commercial precedent)
Commercial peristaltic pumps **release the tube squeeze when idle** (release levers, removable
cartridges) to avoid compression set. The device adopts the same intent — **release/disengage idle
lines** — but note this is now for **tube longevity**, not seal integrity (U2 is resolved, §1).
Because lines are **drained between sessions** (R8) and the tube must recover from the brief
**cyclic** compression that pumping requires, the parked-rollers seal is fine within a session, and
release is a **simple manual cam for storage** — far cheaper than C's mandatory automated engagement.
`[Adopt as working principle]`

> **Nuance for the thesis record:** "the pump works, so the tube recovers" proves recovery from
> *brief cyclic* compression (milliseconds per roller pass). Prolonged *static* set (one spot held
> for days) is a different, slower viscoelastic regime — but we **avoid** it by draining and
> releasing for storage, so it never governs. E8 is optional longevity characterization, not a gate.

---

## 6. Motor downsizing note (supports A's weight case)

Recomputing the [rotor-solver motor panel](../../../tools/rotor-solver/SPEC.md) formulas at the
**proto-02 operating point** (R = 19.7 mm, 2 rollers in contact, 24 V) — *not* the old proto-01
point in the SPEC's table:

| Motor | Length / weight | Holding torque | FoS @ 1/4-step | FoS @ 1/2-step |
|-------|-----------------|----------------|:--------------:|:--------------:|
| Wantai 42BYGHW811 (current) | 48 mm / ~340 g | 48 N·cm | ~3.0 green | ~4.3 green |
| Mid NEMA17 (17HS13-class, 33 mm) `[Likely]` | 33 mm / ~220 g | ~26–33 N·cm | ~1.7–2.1 | ~2.3–2.9 green |
| Pancake 17HS08 (20 mm) | 20 mm / **140 g** | 16 N·cm | ~1.0 borderline | ~1.4 amber |

- Microstepping is a torque lever: 1/2-step = 70 % torque vs 1/4-step = 50 % → **1.4× gain**, at the
  cost of smoothness/noise (why 1/4 was chosen first). Resolution stays fine (1/2-step ≈ 0.05 µL/step).
- **Six mid-size ≈ 1.3 kg; six pancakes ≈ 0.84 kg; vs 2.0 kg for six Wantais.**
- **Caveat:** the FoS denominator (200 g/roller worst case) is itself a SPEC estimate. **Size the
  motor after E7 measures real stall margin (U3)** — don't buy on the model alone. `[Certain: right order]`

> ### ⚠ 2026-07-30 — the first bench data CONTRADICTS this table. Do not size a motor from it.
>
> A motor-sizing test against the proto-02 v2.3 head
> ([proto-02 `PROTOTYPE.md` §12](../proto-02-5ul-4roller-v2/PROTOTYPE.md)) ran the **"mid NEMA17"
> row above** — a JLB 17HS1352-P4130 (17HS13-class, 34 mm, 220 g, **25 N·cm**), i.e. essentially
> the exact candidate this table predicts at **FoS ~1.7–2.1** — and it **could not start the pump
> even at full step**, the highest-torque mode. A 40 N·cm Creality 42-40 on the same rig started
> and ran, including at 1/8 microstepping.
>
> **Consequences for this section:**
> - **The requirement is bracketed at >25 N·cm and ≤40 N·cm.** The **pancake row (16 N·cm) is ruled
>   out by inference** — it sits below a motor that already failed. A's weight case must be rebuilt
>   on **six 40 mm / 280 g motors ≈ 1.68 kg**, not six pancakes ≈ 0.84 kg.
> - **The FoS column is the suspect.** Either the 200 g/roller denominator flagged in the caveat
>   above is too low, or the test's driver current was set below the JLB's 1.3 A rating. **Measuring
>   the driver current setting decides which** — until then, treat every FoS figure in the table as
>   unvalidated rather than merely estimated.
> - **U3 now has data, and it points the unfavourable way.** It is not yet closed: the bracket's
>   lower bound depends on that unmeasured current setting.
>
> `[Bracket upper bound: Certain · lower bound: conditional on the driver current setting]`

---

## 7. Provisional decision (design-rationale record)

1. **What we're building (provisional):** the **A family** — a rack of 5–6 identical, "dumb" pump
   modules (the working single-pump design, unchanged), each with its own **downsized NEMA17**
   (mid-size or pancake, per U3), electrical bay separated from the fluidics (R11), 2×3 grid to cut
   footprint. **Build A1 first** (one Arduino Nano, shared STEP/DIR, per-module ENABLE) as the MVP;
   treat **A2** (per-motor STEP/DIR on a more capable controller — RP2040/STM32) as a **drop-in
   control-layer upgrade** if protocols need independent/parallel dispensing, per-liquid tuning, or
   different tube sizes — **no mechanical redesign either way**. Idle lines sealed by parked rollers
   (U1/U2 assumed); a simple **manual release cam** per module for storage/longevity (§5a).

2. **Why:** the A family tops the independent scoring (**A2 75 %, A1 74 %** vs **C 59 %, B 58 %**,
   §4) — a ~15-point cluster gap. It keeps the precision fight **static and once-per-module** instead
   of dynamic/per-lane/unattended; it is repairable (swap a module); and because A1 and A2 share
   mechanics, choosing between simplicity (A1) and capability (A2) never wastes the build.

3. **What it must be tested against** (hands to `plan-the-test`): U3/E7 (stall margin & motor size);
   and, if A2 is pursued, U6/E10 (controller can drive N independent step trains). U1 (single-pump
   seal) and U2 (tube compression recovery) are assumed resolved (§1, §5a); E8 tube-longevity is
   optional characterization, not a gate.

4. **What would change it:** a hard footprint envelope (U4) → reconsider **C**. **A1 vs A2 is decided
   by U5** (is independent/parallel dispensing actually required?) and U6 (whether A2's controller is
   trivially available).

---

## 8. Tests to run (continues the proto-02 E-series)

| # | Test | Method | Decides |
|---|------|--------|---------|
| E7† | **Stall margin at operating point** | proto-02 E7 (step-skip), extended to push load until skip → real FoS | U3 — motor downsizing, A's weight penalty |
| E9 | *(if C pursued)* engagement seating repeatability | Actuate hard-stop head in/out ×N, caliper installed gap each time | C feasibility — whether actuated seating matches manual |
| E8 | *(optional — tube longevity, not a gate)* idle compression set | Clamp fresh tube sections at operating gap for 1 h / 24 h / 72 h / 1 wk; measure wall recovery + short seal/CV vs control | Characterizes park/storage behaviour; U2 assumed resolved (§1, §5a) so this is longevity data, not a decision input |
| E10 | *(if A2 pursued)* independent multi-motor stepping | On the candidate controller (RP2040/STM32), generate 5–6 independent step trains at target rate; check for timing dropout under load | U6 — whether A2 is a controller+firmware upgrade or needs dedicated step-generator ICs |

† already in the proto-02 plan; reused here as decision inputs.

---

## 9. Provenance
Distilled from a design-for-target sparring session (2026-07-02). Requirements/criteria weights:
[../../REQUIREMENTS-CRITERIA.md](../../REQUIREMENTS-CRITERIA.md). Single-pump context:
[../proto-02-5ul-4roller-v2/PROTOTYPE.md](../proto-02-5ul-4roller-v2/PROTOTYPE.md). Motor panel:
[../../../tools/rotor-solver/SPEC.md](../../../tools/rotor-solver/SPEC.md).
