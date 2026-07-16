# Power, Battery & Motor Selection — Design Record

**Recorded:** 2026-07-16 · **Status:** Decisions made, not yet reflected in the tool
**Companion to:** [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`PUMP-CONTROL-CONCEPTS.md`](PUMP-CONTROL-CONCEPTS.md) · the live
[System Architecture Explorer](../../tools/system-architecture-explorer/index.html)

> **What this is.** A session export from the 2026-07-16 sparring session on battery operation and
> motor selection. It captures reasoning that exists nowhere else, the traps found along the way,
> and the open questions. Confidence tags: `[Certain]` / `[Likely]` / `[Guessing]`.

---

## 1. Where we are — what's already shipped

These were done and committed on 2026-07-16; listed so a fresh session doesn't redo them.

| Item | Outcome |
|---|---|
| **Owned screen interface** | **Physically inspected → confirmed SPI** (8 pins). Tool default flipped to SPI / **High** confidence. The vendor page's SPI-vs-8-bit-parallel contradiction is **resolved**. |
| **Component prices** | Sourced from bitbyg.dk. **13 of 21 High-confidence**; 6 flagged **not stocked**; 2 PSUs Medium (nearest wattage). |
| **Concurrency colours** | Flipped: **6 = green, 2 = amber, 1 = red** (more pumps at once is better). OVERRUN kept red via its own class. |
| **"In plain words" column** | Plain-language 4-bullet description per variant. |

**Consequence of the sourcing pass:** bitbyg's real prices run **2–4.5× the old hobby-class estimates**
(DRV8825 €1.5 → €6.87; NEMA17 €6 → €14.41). Absolute costs rose across every variant. **The relative
ranking between architectures is the durable output — not the absolute euro figures.** `[Certain]`

---

## 2. Decision: run the motor rail at 24 V (not 12 V)

**Decided.** Bench work to date has been at 12 V. Move to 24 V.

### Why — 12 V is silently costing 44% of available torque

At the chosen operating point (**1/4 microstep, 2400 steps/s = 180 RPM**, 4-roller rotor, R = 19.52 mm):

| Rail | Inductive ceiling `f_max = V/(2·L·I)` | vs. 2400 steps/s | Torque derating | **FoS** |
|---|---|---|---|---|
| **12 V** (current bench) | 1333 steps/s | **1.8× over ceiling** | ×0.56 | **1.71** ⚠️ amber |
| **24 V** | 2667 steps/s | under ceiling ✓ | ×1.00 | **3.07** ✅ green |

Load basis: worst-case 200 g/roller × 2 rollers in contact = 400 g at the rim.

**Every battery/motor conclusion below assumes 24 V. At 12 V none of it holds.** `[Certain — derived from
the project's own rotor-solver model]`

### Does anything need changing to switch?

**No — not the code, not the Vref.** `[Certain]`

- Steppers are **current-driven, not voltage-driven.** The DRV8825 is a chopper: it PWMs the supply to
  hold whatever current Vref is set to. Raising 12 V → 24 V does **not** raise motor current.
- The "12 V" on a stepper label is a **nominal voltage** = I_rated × R_phase, not a limit. The
  42BYGHW811 is 2.5 A × 1.25 Ω = **3.1 V nominal** — running it at 24 V is normal and is the whole point
  of a chopper driver.
- DRV8825 supply range is **8.2–45 V**; 24 V sits mid-range.
- Firmware unchanged: same steps/rev, same step/dir timing.

### ⚠ What must be checked before flipping the rail

1. **The 28BYJ-48 alignment motor is genuinely 12 V-rated**, and its ULN2003 is a plain Darlington array
   with **no current regulation**. 24 V across it → 2× current, 4× heating, cooked motor. `[Certain]`
   This is exactly why `ARCHITECTURE.md` specifies a **dual rail on common ground**.
2. **VMOT bulk capacitor ratings** — 16 V or 25 V electrolytics will fail on 24 V. Want **≥35 V**, ideally 50 V.
3. **Don't hot-plug motors.** LC spikes can reach ~2× supply; at 24 V that approaches the DRV8825's 45 V
   absolute max. Keep ≥100 µF close to VMOT. `[Likely]`
4. **Driver heat** — switching losses rise with supply voltage (copper loss doesn't; it's current-limited).

### Free experiment available now

The bench variable PSU can **sweep 12 → 24 V at 2400 steps/s and find where step-skip disappears.** That
directly measures the real inductive ceiling instead of trusting `f_max = V/(2·L·I)`. It is also the
cheapest possible validation of the whole torque chain, and it may resolve **proto-02 test E7**
("confirm 1/4 step @ 180 RPM doesn't skip under real 2-roller load") — running above the ceiling at 12 V
is a prime suspect for any skipping seen so far. `[Likely]`

*Set the PSU current limit to ~1 A for first power-up at 24 V.*

---

## 3. Battery operation — feasible, but duty cycle decides it

### The power numbers

Stepper copper loss `P = 2·I²R` is burned **whether or not the motor does work**:

| | Per motor | ×6 |
|---|---|---|
| **42BYGHW811** (2.5 A, 1.25 Ω) — current | **15.6 W** | **94 W** |
| **JK42HS40-1704** (1.7 A, 1.65 Ω) — candidate | **9.5 W** | **57 W** |
| Useful mechanical output @ 180 RPM | ~1.4 W | ~8.7 W |

~9% efficiency — the motors are heaters that happen to rotate. `[Certain]` This also confirms where the
150 W PSU sizing came from.

### The decisive factor is the ENABLE pin, not the peak

94 W at 24 V is only ~4 A — trivial for any Li-ion pack. The real issue:

- Drivers left energised between dispenses → **94 W continuous** → a 74 Wh bank dies in **~47 min**.
- Drivers disabled between dispenses (~10% duty) → **~9 W average** → **8+ hours**.

An occluded peristaltic tube is **non-backdrivable**, so the pump holds position with the coils dead.
Disabling between dispenses is safe. `[Likely — worth confirming on the bench]`

**→ Battery operation is a firmware discipline, not a hardware limit.** A full 6-pump 1000 µL dispense
costs ~0.32 Wh; a 74 Wh bank buys ~200 of them. `[Guessing — real duty cycle unmeasured]`

### ⭐ Why regulated PD beats a raw battery pack

A **raw Li-ion pack's voltage sags as it discharges**, and torque depends on rail voltage:

| 6S pack state | Rail | f_max | **FoS** |
|---|---|---|---|
| Full | 25.2 V | 2800 | 3.07 ✅ |
| Half | ~22 V | 2444 | ~2.8 ✅ |
| Nearly empty | ~19.8 V | 2200 | **~2.2** ⚠️ |

So pump torque **fades as the battery drains** — a horrible field failure mode: *"dispenses fine in the
morning, skips steps after lunch."* Dosing accuracy that depends on state-of-charge is exactly what a
point-of-care device must not have. `[Certain]`

**A USB-C PD bank has its own regulator** — it holds 28 V steady until cutoff, then stops cleanly.
**It is the only option here that keeps FoS constant across the discharge curve.** That is a stronger
argument than convenience.

### Decision: 24 V (28 V) single source + buck to 12 V

```
PD bank ──CH224A trigger──> 28 V ─┬─> DRV8825 ×6 ─> NEMA 17 pumps
                                  ├─> buck ─> 12 V ─> ULN2003 ─> 28BYJ-48 alignment (~3.6 W)
                                  └─> buck ─> 5 V  ─> ESP32 / screen / logic
```
(common ground — matches `ARCHITECTURE.md`'s existing dual-rail spec)

Rejected: trying to get two voltages from the battery directly. The Anker 737 has 2× USB-C and *could*
run a second trigger at 12 V, but that splits the 140 W and adds a failure point. A €2–12 buck is simpler.

### Costs

| Item | Price |
|---|---|
| **Anker 737 (PowerCore 24K)** — 24,000 mAh = **86.4 Wh**, 140 W PD 3.1, **28 V/5 A**, ~630 g, airline-legal (<100 Wh) | **649–750 DKK ≈ €87–100** (Proshop/avxperten want 1,095–1,159 DKK for the same unit — price-compare) |
| **CH224A** PD 3.1 EPR trigger board | **~€2** |
| **LM2596** buck (4.5–40 V in, 3 A) | 90 DKK ≈ €12 at bitbyg (~€2 elsewhere) |

Alternatives (verify **28 V** support specifically — many "140 W" banks only do 20 V): Targus 140 W
24,000 mAh · ALOGIC Ark 27,000 mAh · Ugreen 145 W · Baseus Blade 2.

### ⚠ Traps — both will bite

1. **CH224K vs CH224A.** Pin-compatible, look identical in listings. **CH224K has no EPR — caps at
   20 V/100 W** → FoS 1.96 (amber). **CH224A does 28 V/140 W** → FoS 2.56 (green). CH224K is older,
   cheaper, and is what most "PD trigger board" listings ship. Check the chip marking or that the
   listing explicitly says **PD3.1 / EPR / 28 V**. `[Likely]` (Both cap at 28 V internally regardless of
   PD 3.1's 36/48 V modes — fine, 28 V is what we want.)
2. **MP2307 buck module (11.25 DKK at bitbyg) maxes at 23 V input** — it will not survive a 24 V rail,
   let alone 28 V. Use the **LM2596** (40 V input). `[Certain]`

**Rejected battery options:** 12 V LiFePO4 (halves the ceiling, FoS ~1.2) · 18 V tool packs (FoS ~1.8) ·
PD 3.0 at 20 V (FoS 1.96, borderline).

---

## 4. Motor selection

### bitbyg stocks only NEMA 17

No NEMA 14, 11, 8, or pancake motors exist in the catalogue — only NEMA 17 and toy-grade micro steppers.
So "stay NEMA 17?" is partly answered by the vendor. `[Certain]`

| Motor | Torque | Current | Mass | Power ×6 | **FoS** | Price |
|---|---|---|---|---|---|---|
| 42BYGHW811 (current, 48 mm) | 0.47 N·m | 2.5 A | ~360 g | 94 W | 3.07 ✅ | 107.50 DKK |
| **JK42HS40-1704 (40 mm)** ⭐ | 0.40 N·m | 1.7 A | **280 g** | **57 W** | **2.35** ✅ | 107.50 DKK |
| 42BYGHW208 (0.4 A, 12 V) | 0.26 N·m | 0.4 A | 200 g | 58 W | **0.57** ❌ | 101.25 DKK |

**Recommendation: JK42HS40-1704** (= 42BYGHW609). Same price, **−22% mass** (480 g saved across six),
**−39% power (94 → 57 W)**, FoS still green.

### ⚠ Trap: the 42BYGHW208 looks perfect and isn't

0.4 A reads like the ideal battery motor. But **37 mH inductance** puts its ceiling at **811 steps/s** —
we run at 2400. Torque collapses to 34% and it **stalls**. Its 30 Ω winding also burns *the same 9.6 W*
as the 1.7 A motor. **Low rated current ≠ low power.** `[Certain]`

### The real gate: occlusion torque is unmeasured

Everything above rests on **"per-roller compression: 50–200 g — *estimated*"** (0.51 mm soft PVC
microbore). That is a **4× uncertainty band** and it dominates every conclusion:

- At **worst-case 200 g/roller** → need ≥0.31 N·m → **NEMA 17 mandatory**, JK42HS40 is the floor.
- At **typical 100 g/roller** → need ≥0.15 N·m → **NEMA 14 / pancakes open up** (~150 g each, ~1 kg
  saved across six) — but that means leaving bitbyg.

**One measurement decides whether the pump bank can halve in mass.** Measure real occlusion torque on
proto-02 (torque wrench, or current-sense on the driver). Worth more than any catalogue search.
→ hands off to `plan-the-test`.

### Other levers, both larger than motor choice

- **Full-stepping doubles torque** (fraction 0.5 → 1.0) at some noise cost — proto-01 §9 chose 1/4 step
  for a noise/torque compromise; that tradeoff is worth revisiting against the battery budget.
- **U5 (serial vs parallel dispensing)** — if dispensing is serial, peak drops to ~10 W and the battery
  question evaporates entirely. **U5 dominates the power architecture.**

---

## 5. Open questions

| # | Question | Notes |
|---|---|---|
| **P1** | **Are there lighter motors outside NEMA 17 / outside bitbyg?** | **Deferred — needs its own search.** Goal: reduce system mass. NEMA 14 (~0.14–0.25 N·m, ~150–200 g) and NEMA 17 pancakes (~0.13 N·m, ~150 g) are the obvious candidates but are **gated on P2**. Also worth considering: geared NEMA 11/8 (backlash matters less for a one-direction peristaltic pump, but gearing cuts speed), and non-stepper options (BLDC + encoder). |
| **P2** | **What is the real per-roller occlusion torque?** ⭐ | The 50–200 g estimate is a 4× band that gates P1 and the whole motor/battery chain. **Highest-value measurement available.** |
| **P3** | Is the ~10% duty-cycle assumption right? | Sets battery runtime. Unmeasured. |
| **P4** | Does disabling drivers between dispenses actually hold position? | Assumed from tube non-backdrivability; confirm on bench. |
| **U5** | Do protocols need simultaneous multi-liquid dispensing? | **Pre-existing, unchanged — dominates PSU/battery sizing.** See [`../Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md`](../Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md). |
| **P5** | Should alignment move to a bipolar stepper on a chopper? | Would run straight off 24 V and **delete the 12 V rail entirely** — one rail, no buck. Let the alignment-module design decide (`alignMot2` is still TBD), not this question. |

---

## 6. Not yet done — planned Explorer work

This was scoped but **not implemented**. Two decisions were taken (self-describing IDs; classify-all +
add key rows) but no code was written.

### 6.1 Variant IDs are unreadable — replace them

Current IDs decode as: `S1`=serial/1-at-once · `D2`=2-at-once · `P6`=parallel/6 · `T9`=**TMC22-09** ·
`T51`=**TMC51**60/5072 · `B`=printer Board · `ESPINT`=ESP32-integrated-screen.

**Verdict: not a learning worth having.** `T9` meaning "TMC2209" is obscure, isn't domain standard, and
a thesis examiner would need a decoder ring — bad for a tool whose job is readability.

**Decision: self-describing IDs** — `6×-Smart-Fused-485`, `1×-Dumb-Fused-I²C`, `6×-Dumb-Printer-USB`.
Readable without a decoder, still short enough to reference in speech.

### 6.2 ⭐ A buried assumption: "the board driving the screen is also the brain"

**All 20 current variants silently assume this.** Layer A (brain↔screen) presumes the brain renders the
GUI. That forecloses genuinely different — and often cheaper/lighter — architectures.

The real axis: **where does the UI live, and where does orchestration live?**

| # | Design type | Note |
|---|---|---|
| 1 | **Fused HMI-brain** | One MCU renders GUI + orchestrates (+ maybe steps). **= all 20 current rows.** |
| 2 | **Smart display + brain** | Nextion/DWIN has its *own* CPU; brain just sends `t0.txt="5µL"` → brain needs far less RAM/PSRAM. ⭐ **Already an open question in `ARCHITECTURE.md`** ("smart serial display vs raw TFT"). |
| 3 | **Headless + phone/web UI** ⭐ | No screen at all. ESP32's built-in WiFi/BLE serves a web UI; the operator's phone *is* the display. **Deletes €23, 8 pins, and all of Layer A.** For a portable point-of-care device, "operator has a phone" is very defensible. |
| 4 | **Host-tethered** | Laptop is the brain over USB; device is a peripheral. |
| 5 | **SBC brain (Pi)** | Linux for GUI + protocol, MCUs for real-time stepping. |
| 6 | **Headless + physical controls** | Encoder + OLED, no touchscreen. Cheapest, most rugged. |

**Decision: add a "Design type" column classifying every row** (all existing → "Fused HMI-brain"), **plus
representative new rows** for the genuinely different types — especially #3 and #2. Matrix ~20 → ~28.
Rejected: full cross-product (explodes to 60+ rows, unusable as a decision aid).

**Each design type wants a quick visual representation** (the existing `buildDiagram()` topology-class
pattern extends naturally).

### 6.3 Remaining tool tasks

- [ ] Add an **expandable power/battery section** to the tool capturing §2–3 above (24 V + buck, PD bank, ENABLE discipline)
- [ ] Record **P1 (lighter motors)** as a visible open question in the tool
- [ ] Add the **Design type** column + new rows (§6.2)
- [ ] **Rename IDs** (§6.1)
- [ ] **Whole-page revisit pass** — must come **last**, it depends on everything above
- [ ] Consider adding the battery + trigger + buck as a **"portable power" BOM option** alongside the PSU rows

### Execution order (dependencies)

```
power/battery section ─┐
motor open question ───┤ (independent, safe first)
                       │
design-type research ──┴─> new rows ──> design-type column ──┐
                                        ID rename ────────────┴─> whole-page pass (LAST)
```

**Note on parallelism:** nearly all of this lands in one file
(`tools/system-architecture-explorer/index.html`), so it **cannot be parallelised** — GSD's wave
scheduler forbids same-wave plans sharing a file, and two agents editing one file is a conflict, not
speed. Only the *research* (design types #2–#6, sourcing Nextion/DWIN/Pi prices) parallelises cleanly,
and `SPEC.md` / `ARCHITECTURE.md` can be updated alongside each other.

---

## 7. Cross-links to update when §6 lands

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — dual-rail section should point here; the "screen type" open
  question connects to design type #2
- [`SOLUTION-MATRIX.md`](SOLUTION-MATRIX.md) — reference snapshot will need regenerating after the ID rename
- [`../../tools/system-architecture-explorer/SPEC.md`](../../tools/system-architecture-explorer/SPEC.md) —
  component table, `PRICES_VERSION`, and the new design-type axis
