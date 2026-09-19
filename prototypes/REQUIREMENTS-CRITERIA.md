# Pump-Module Requirements & Weighted Criteria

> **Scope: pump module only.** These requirements and weights were derived for evaluating
> **pump / multi-liquid dispensing** concepts (proto-NN, the A/B/C architecture study). They are
> **not** a system-wide or per-module rubric — the alignment module, nozzle/shaker, HMI, and the
> system-level electronics/communication architecture each need their own criteria if a formal
> scoring is ever done. Do not reuse this table's weights to score those modules.

Canonical reference for evaluating **pump-module** design concepts. Recorded 2026-07-02 from
Sirio's requirements workshop.

**How to use this table:**

- **Requirements are binary.** A concept either meets them or it is rejected — no partial
  credit, no trading off. Every concept must pass *all* requirements before criteria
  scoring even starts.
- **Criteria are weighted (0–100).** They differentiate between concepts that already pass
  the requirements — use them as the weight column in Pugh / weighted-decision matrices.
- Note the deliberate structure: **Accuracy (10), Reproducibility (5), and Cleanable (50)
  carry low criteria weights because they are already locked in as requirements** — meeting
  the requirement is mandatory; exceeding it is worth little. Don't over-invest there.

---

## Requirements (binary — must pass all)

| # | Category | Requirement | Specification |
|---|----------|-------------|---------------|
| R1 | Performance | Reproducibility | Device must dispense liquid reproducibly to within ±10 %, but not more than 10 µL |
| R2 | Performance | Accuracy | Device must dispense liquid with an accuracy of ±10 %, but not more than 10 µL |
| R3 | Performance | Versatility | Must handle at least 5 different liquids; dispense between 5 and 1000 µL |
| R4 | Performance | Feasibility | Must be feasible to achieve by us. Ideas scored 1–10 (10 = trivial, 1 = impossible), based on similar examples and perceived complexity. **Pass requires ≥ 5** |
| R5 | Field Analysis & Portability | Perform under indoor conditions | Temp 18–25 °C · Humidity 20–60 % · Pressure 800–1050 hPa |
| R6 | Contamination | Prevent cross-contamination | Determined by running the PANPOC protocol |
| R7 | Contamination | Cleanability | Parts in contact with the liquid are either cleanable or disposable |
| R8 | Contamination | Flushable fluid paths | All fluid paths must be either completely drainable or disposable |
| R9 | Safety | Avoid spillage | Device must operate without any visible traces of outside spill within 1 m of the device, when dispensing dyes |
| R10 | Safety | Avoid operator exposure to liquids | Device must operate without any visible dye on the operator's arms and hands, when dispensing dyes |
| R11 | Safety | Electrical safety | Separation of electrical parts from liquid-exposed areas |

---

## Criteria (weighted — differentiate passing concepts)

| Weight | Category | Criterion | Specification |
|--------|----------|-----------|---------------|
| 100 | Performance | Feasibility | Must be feasible |
| 80 | Field Analysis & Portability | Small footprint | Module should have a small footprint |
| 75 | Maintenance | Low calibration | Module should have low calibration requirements |
| 75 | Feasibility | Inexpensive | Low cost of components and assembly |
| 70 | Maintenance | Low-maintenance | Module should be low-maintenance |
| 70 | Maintenance | Repairable | Module should be repairable (all parts easily replaceable) |
| 65 | Performance | Versatility | Module must be capable of handling a wide range of protocols |
| 60 | Performance | Dead volume | Device should have a low amount of dead volume |
| 60 | Automation | Run unsupervised | Module should be able to run unsupervised |
| 60 | Field Analysis & Portability | Lightweight | Module should be lightweight |
| 50 | Contamination | Cleanable | All parts in contact with liquids/sample should be cleanable/disposable |
| 45 | Automation | Capable of integration | Module should be capable of integrating with a larger system |
| 40 | Feasibility | Off-the-shelf parts and 3D printing | Availability of the different parts |
| 40 | Sustainability | End-of-life design | Designed with end-of-life in mind (material recycling, disassembly, part recirculation) |
| 35 | Performance | Ruggedness | Module should be transportable without compromising performance |
| 35 | Field Analysis & Portability | Outdoor conditions | Module should be capable of handling outdoor conditions: temp, humidity, pressure |
| 20 | Sustainability | Minimization of consumables | Module should use as few consumables as possible |
| 10 | Performance | Accuracy | Module must dispense as accurately as possible (as close to target as possible) |
| 10 | Sustainability | Sustainable materials | Materials should be sustainable |
| 5 | Performance | Reproducibility | Performance must be reproducible (high precision) |

---

## Reading the weights — what the table actually prioritizes

The top of the criteria list is **feasibility (100), footprint (80), low calibration (75),
cost (75), maintenance (70×2)**. Performance metrics sit near the bottom *as criteria*
because they are gated *as requirements*. In plain terms:

> Among concepts that all hit ±10 % dispensing, prefer the one that is
> **easiest to actually build, smallest, cheapest to keep calibrated, and easiest to fix**
> — not the one that dispenses most precisely.

This is the lens for architecture decisions like single-motor-vs-multi-motor.
