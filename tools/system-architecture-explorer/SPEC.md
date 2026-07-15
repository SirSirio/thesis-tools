# System Architecture Explorer — Tool Spec

**Tool:** System Architecture Explorer
**File:** `tools/system-architecture-explorer/index.html`
**Status:** Live — cost/complexity matrix + pin-budget engine + live SVG diagram (Phase 6)

---

## Purpose

Prices and compares the pump-system control electronics — which brain (MCU), which stepper
driver, and which system bus — across 19 candidate architectures ("variants"). For each variant
it computes: total cost (editable component prices, live), a design-complexity rating, a
pin-budget feasibility check against the brain's usable GPIO, and a live SVG system diagram
showing the three communication layers and the power block. It is the promoted, canonical version
of the cost/complexity matrix originally built in `prototypes/System-Architecture/index.html`
(D-08) — the tool's inline `<script>` is now the single source of truth for this data model.

---

## Confidence-tag legend (D-11)

Every sourced fact in this tool — component prices, pin counts, RAM/PSRAM specs — carries one of
three confidence tags, applied to the *specific claim*, not the source wholesale (a vendor page
can state two contradictory things in the same listing; see the screen open question below):

| Tag | Meaning |
|-----|---------|
| **High** | Vendor product page or datasheet states the fact directly |
| **Medium** | Reputable secondary source (tutorial site, cross-checked across ≥2 sources) or a near-identical variant/part family |
| **Low** | Estimate, forum figure, or unsourced assumption |

A computed readout (e.g. the "Pins free" column) shows the **worst** (lowest) confidence of any
input that fed it — `worstConf()` in the script — so a number never looks more certain than its
weakest source (this mirrors 06-RESEARCH.md's Pitfall 1).

---

## Component price table

Rendered live in the "Component unit prices" section (`#compTable`), editable per-row (typing a
€ or DKK value updates `COMP[k].eur` and persists to localStorage). Defaults below are the
`DEFAULTS` object's shipped values. DKK→EUR conversion rate defaults to **0.134** (editable).

| Component | Role | Default € | Source | Confidence |
|---|---|:--:|---|:--:|
| ESP32 dev board | brain / fused controller | 5.0 | bitbyg DOIT ESP32 30P ≈67.50 DKK (≈€9) — price above not yet reconciled to the listing | Low |
| RP2040 (Pico) | 6-parallel node (PIO) | 4.0 | — (rough estimate) | Low |
| STM32 Blue Pill | 6-parallel node (timers) | 3.0 | — (rough estimate) | Low |
| Arduino Pro-Mini | per-pump node | 2.5 | — (rough estimate) | Low |
| Arduino Nano | alignment / small node | 3.0 | — (rough estimate) | Low |
| ESP32-2432S024 (2.4" integrated LVGL touch) | brain + screen, one part | 25.6 | bitbyg, 183.75–198.75 DKK — resolution/touch chip not stated | Medium |
| DRV8825 | dumb driver (STEP/DIR) | 1.5 | — (rough estimate) | Low |
| TMC2209 | smart driver (UART) | 3.5 | — (rough estimate) | Low |
| TMC5160 | motion driver (SPI) | 12.0 | — (rough estimate) | Low |
| TMC5072 dual-axis | 2 motors/chip (SPI) | 14.0 | — (rough estimate) | Low |
| MAX485 module | RS-485 transceiver / node | 0.7 | — (rough estimate) | Low |
| MCP2515 module | CAN transceiver / node | 2.5 | — (rough estimate) | Low |
| BTT SKR / Octopus | 32-bit printer board | 30.0 | — (rough estimate) | Low |
| Mega2560 + RAMPS | printer board bundle | 18.0 | — (rough estimate) | Low |
| Driver carrier PCB | 6 driver sockets | 4.0 | — (rough estimate) | Low |
| PSU 24V ~60W | 1–2 motors at once | 12.0 | — (rough estimate) | Low |
| PSU 24V ~150W | all-6 at once | 20.0 | — (rough estimate) | Low |
| **Shared block (constant, all variants when "whole-system" toggled on):** | | | | |
| ILI9341 3.2" touch screen (owned) | screen | 23.0 | bitbyg, 174 DKK ≈ €23 — inspected, confirmed SPI (8 pins) | **High** |
| NEMA17 pump stepper ×6 | pump motor | 6.0 (×6) | — (rough estimate) | Low |
| 28BYJ-48 12V + ULN2003 | alignment motor #1 | 2.5 | — (rough estimate) | Low |
| Alignment motor #2 (TBD) | alignment motor #2 | 6.0 | — (rough estimate) | Low |

Only the ILI9341 screen carries a High-confidence, directly-sourced price — it is the "owned,
already-purchased" anchor component. Every other price is a rough hobby-class working estimate
(±20%, per the cost-model assumptions below) not yet reconciled against a specific bitbyg listing;
sourcing the remaining ~20 prices is deferred (out of Phase 6 scope, per CONTEXT.md's Deferred
Ideas — "ongoing BOM work, not this phase").

Prices are editable in the running tool; edits and the DKK→EUR rate persist to localStorage (see
Persistence below). Reset button restores all `DEFAULTS` and clears the persisted keys.

---

## Brain / MCU specs (RAM, PSRAM, GPIO, UI fluidity — D-12)

Every brain-class `DEFAULTS` entry carries `gpioUsable` (+ confidence), `ram`, `psram` (+
confidence), and a `uiNote` describing GUI-fluidity implications:

| Brain | Usable GPIO | Confidence | RAM | PSRAM | UI-fluidity note |
|---|:--:|:--:|---|---|---|
| ESP32 dev board | 15 | Medium | 520 KB SRAM | None | No PSRAM: single-buffered, redraw-on-demand UI is comfortable; full-screen animated transitions are tight |
| RP2040 (Pico) | 26 | Medium | 264 KB SRAM | None | Never drives the screen in any variant (pump-node co-processor only) — RAM is not a GUI concern here |
| STM32 Blue Pill | 30 | Medium | 20 KB SRAM | None | 20 KB is tight beyond step generation, but this MCU never drives the screen — non-issue for GUI fluidity |
| Arduino Pro-Mini | 18 | Medium | 2 KB SRAM | None | Not a brain candidate — per-pump-node role only, never drives the screen |
| Arduino Nano | 18 | Medium | 2 KB SRAM | None | Alignment/small-node role only, never drives the screen |
| ESP32-2432S024 (integrated) | 9 | **High** | 520 KB SRAM | None (32 Mbit flash) | No PSRAM: single-buffered UI comfortable. Integrated display eliminates all Layer-A wiring — the 9 free IO already accounts for the onboard screen + touch |

**Framebuffer arithmetic (once, per 06-RESEARCH.md):** 320×240 @ 16-bit colour ≈ 150 KB; a
full-frame double-buffer needs ~300 KB. Base ESP32's 520 KB SRAM fits one 150 KB framebuffer
comfortably alongside application logic, but a double-buffer is tight once WiFi/BT stack overhead
is accounted for — hence "single-buffered comfortable, animated double-buffer tight," stated once
here rather than re-derived per brain row. WROVER-class boards with 8 MB PSRAM (not currently a
`DEFAULTS` entry, see Open Questions) would make this trivial. RP2040 and STM32 never drive the
screen in any current variant, so their small SRAM is explicitly a non-issue for GUI fluidity, not
an oversight.

---

## Variant BOMs (19 total)

Each row: `id` · concurrency (`at once`) · driver · comms bus (Layer B) · Layer C link description
· complexity (★, 1–5 scale, half-stars shown) · BOM (`bom` object, component→qty). Full BOM detail
(qty × unit price × line total) expands on click in the running tool (`bomHtml()`).

| ID | At once | Driver | Bus (B) | C link | Complexity | BOM |
|---|:--:|---|---|---|:--:|---|
| S1-i2c | 1 | DRV8825 | I²C | STEP/DIR shared+EN | ★☆☆☆☆ | esp32, drv8825×6, carrier, psu60 |
| S1-485 | 1 | DRV8825 | RS-485 | STEP/DIR shared+EN | ★★☆☆☆ | esp32, drv8825×6, carrier, psu60, max485×2 |
| D2-i2c | 2 | DRV8825 | I²C | STEP/DIR per-motor | ★★☆☆☆ | esp32, drv8825×6, carrier, psu60 |
| D2-485 | 2 | DRV8825 | RS-485 | STEP/DIR per-motor | ★★☆☆☆ | esp32, drv8825×6, carrier, psu60, max485×2 |
| P6-rp-i2c | 6 | DRV8825 | I²C | STEP/DIR ×6 | ★★★☆☆ | esp32, rp2040, drv8825×6, carrier, psu150 |
| P6-rp-485 | 6 | DRV8825 | RS-485 | STEP/DIR ×6 | ★★★☆☆ | esp32, rp2040, drv8825×6, carrier, psu150, max485×3 |
| P6-stm-485 | 6 | DRV8825 | RS-485 | STEP/DIR ×6 (timers) | ★★★☆☆ | esp32, stm32, drv8825×6, carrier, psu150, max485×3 |
| P6-dist-485 | 6 | DRV8825 | RS-485 | STEP/DIR, 1/node | ★★★★½ | esp32, promini×6, drv8825×6, psu150, max485×8 |
| P6-dist-can | 6 | DRV8825 | CAN | STEP/DIR, 1/node | ★★★★½ | esp32, promini×6, drv8825×6, psu150, mcp2515×8 |
| T9-fused-i2c | 6 | TMC2209 | I²C | UART (self-steps) | ★★☆☆☆ | esp32, tmc2209×6, carrier, psu150 |
| T9-fused-485 | 6 | TMC2209 | RS-485 | UART (self-steps) | ★★☆☆☆ | esp32, tmc2209×6, carrier, psu150, max485×2 |
| T9-node-485 | 6 | TMC2209 | RS-485 | UART (self-steps) | ★★★☆☆ | esp32, nano, tmc2209×6, carrier, psu150, max485×3 |
| T51-485 | 6 | TMC5160 | RS-485 | SPI (ramp+pos) | ★★★½☆ | esp32, tmc5160×6, carrier, psu150, max485×2 |
| T51-72-485 | 6 | TMC5072×3 | RS-485 | SPI | ★★★½☆ | esp32, tmc5072×3, carrier, psu150, max485×2 |
| B-ramps-drv | 6 | DRV8825 | USB/UART | STEP/DIR sockets | ★★★½☆ | esp32, ramps, drv8825×6, psu150, max485×2 |
| B-skr-drv | 6 | DRV8825 | USB/UART/CAN | STEP/DIR sockets | ★★★½☆ | esp32, skr, drv8825×6, psu150, max485×2 |
| B-skr-tmc | 6 | TMC2209 | USB/UART/CAN | UART sockets | ★★★½☆ | esp32, skr, tmc2209×6, psu150, max485×2 |
| **ESPINT-fused-i2c** | 6 | TMC2209 | I²C | UART (self-steps) | ★★☆☆☆ | espscreen, tmc2209×6, carrier, psu150 |
| **ESPINT-dumb-i2c** | 1 | DRV8825 | I²C | STEP/DIR shared+EN | ★☆☆☆☆ | espscreen, drv8825×6, carrier, psu60 |

The final two rows are the integrated-screen (bitbyg ESP32-2432S024) variants added under D-10.
They are shown as a deliberate contrast pair: `ESPINT-fused-i2c` fits the board's 9 free IO
(smart driver keeps the pin budget comfortable); `ESPINT-dumb-i2c` does **not** fit even at
single concurrency (dumb STEP/DIR+EN wiring alone exceeds 9 pins) — both are shown rather than
cherry-picking only the flattering pairing, per D-11's sourcing-honesty spirit.

Cost is always `Σ(component € × qty in bom)`, plus the shared block (below) when "include shared
block" is toggled on. Shared-block cost double-counting is guarded for integrated-screen variants
(see Cost-model assumptions).

---

## The three comms layers

Every variant is built from the same three communication links; only their implementation changes
row to row.

**Layer A — brain ↔ screen.** The touchscreen is a fixed, owned component: an ILI9341 3.2"
resistive-touch TFT (bitbyg, 174 DKK ≈ €23) wired SPI (owned board inspected and confirmed SPI;
8-bit parallel retained as a counterfactual — see Open Questions) straight to the brain. Because it must render a GUI, the brain is
ESP32-class in every variant. This link is not a per-variant field — it is either the selectable
`interfaceMode` scenario (external ILI9341) or entirely absorbed by the integrated `espscreen`
board (Layer A drawn as skipped in the diagram for those two variants).

**Layer B — the system bus.** How the brain talks to the other modules (pump controller,
alignment node) is a genuinely open choice: **I²C**, **RS-485**, or **CAN**. I²C only makes sense
for a few nodes sharing one small enclosure; **RS-485 is the recommended default** — differential,
ignores motor EMI, ~€0.70/node, unchanged from 2 to 8 nodes; CAN earns its extra cost only with
many nodes and a real need for fault tolerance. The matrix's `Bus (B)` column and the diagram's
Layer-B label show this choice with the variant's real node count.

**Layer C — pump-controller ↔ drivers.** How the controller talks to the six stepper drivers is
set entirely by the driver family: bare STEP/DIR wires for a dumb driver (DRV8825), a shared UART
for a smart driver (TMC2209), or an SPI daisy-chain for a motion controller (TMC5160/TMC5072).
This is the axis the tool's Part-01 theory section argues matters more than brain choice — a smart
driver keeps the MCU idle even at full 6-parallel (`T9-fused-*` rows), while a dumb driver forces
the brain (or a dedicated pump-node MCU) to generate every step pulse.

---

## Pin-budget model (D-09)

`pinsOf(v)` mirrors `costOf(v)`'s aggregation shape — same Σ(fixed + per-variant loads) pattern,
applied to GPIO pins instead of euros — against the variant's brain (`espscreen` if present, else
`esp32`) usable-GPIO count (`gpioUsable`).

```
avail = brain.gpioUsable
used  = (brainKey !== 'espscreen')
          ? SCREEN_PINS[interfaceMode]                 // Layer A, skipped for integrated boards
            + (v.b === 'I²C' ? 0 : 2)                   // LM75 onboard temp sensor: shares I²C bus, else +2
          : 0
        + BUS_PINS[v.b]                                 // Layer B: brain's own bus attachment
        + v.pinsC                                        // Layer C: driver-link pins on the brain (0 if a
                                                           //   dedicated pump-node MCU or printer-board
                                                           //   socket absorbs the wiring instead)
free    = avail - used
overrun = used > avail
```

### SCREEN_PINS (Layer A, external ILI9341 only)

| Scenario | Pins | Confidence | Basis |
|---|:--:|:--:|---|
| SPI (**default, verified**) | 8 | **High** | SCK+MOSI+MISO+CS (4) + DC+RST (2) + touch T_CS/T_IRQ (2) = 8 |
| 8-bit parallel | 13 | Low | 8 data bits + RS/DC+CS+RD+WR+RST ≈ 13; touch already counted in the A0–A3 range |

Selectable in the running tool via the "Screen interface (Layer A)" control; defaults to SPI.
The owned board was **physically inspected (2026-07-15) and confirmed SPI** — SPI is now the
verified default at High confidence (`INTERFACE_CONF.spi = 'High'`). The 8-bit-parallel row is
retained as a selectable counterfactual (Low confidence) so the pin-budget sensitivity to the
interface choice stays visible. See Open Questions for the resolution record.

### BUS_PINS (Layer B, per brain's own bus attachment — not multiplied by node count)

| Bus | Pins | Confidence |
|---|:--:|:--:|
| I²C | 2 | Medium (ASSUMED — standard wiring) |
| RS-485 | 3 | Medium (ASSUMED — standard MAX485 half-duplex wiring) |
| CAN | 4 | Medium (ASSUMED — standard MCP2515 SPI wiring) |
| USB/UART | 2 | Medium (ASSUMED) |
| USB/UART/CAN | 2 | Medium (ASSUMED) |

### Layer C driver-link pins (`pinsC`, per variant — attached explicitly, not derived generically)

| Wiring style | Pins | Variants |
|---|:--:|---|
| DRV8825, shared step-bus + per-driver ENABLE | 8 | S1-*, ESPINT-dumb-i2c |
| DRV8825, per-motor STEP/DIR ×6 | 12 | D2-* |
| Dedicated pump-node MCU or printer-board socket absorbs the wiring | 0 | P6-*, T9-node-485, B-ramps-*, B-skr-* |
| TMC2209 UART, shared segments | 4 | T9-fused-*, ESPINT-fused-i2c |
| TMC5160/TMC5072 SPI daisy-chain | 4 | T51-* |

The same physical component (e.g. 6× DRV8825) costs a different pin count depending on wiring
topology (S1 shared+EN = 8 vs D2 per-motor = 12) — this is why `pinsC` is an explicit per-variant
field mirroring the `bom` qty-map pattern, rather than derived generically from driver name alone.

### OVERRUN rule

A variant's readout is `${free} free` when `used ≤ avail`, or an `OVERRUN` badge when
`used > avail`. Both are paired with a confidence pill from `pinConfidenceOf(v)` — the **worst**
of: the Medium/ASSUMED tier covering the Layer-B/Layer-C tables, the screen-interface confidence
(`INTERFACE_CONF[interfaceMode]` — High for the verified SPI default, Low for the parallel
counterfactual; external-screen variants only), and the brain's own `gpioConf`. `esp32.gpioUsable`
is deliberately set to 15 (the upper end of the 10–15 "realistically usable" range cited in
06-RESEARCH.md) so the result set is genuinely mixed — S1/D2 always overrun even at SPI;
T9-fused-*/T51-*/P6-rp-i2c sit right at the SPI/parallel borderline; printer-board variants
comfortably fit — rather than an uninformative all-pass or all-fail set.

---

## Power / PSU model

| Concurrency | PSU | Rail |
|---|---|---|
| 1–2 motors at once | 24V ~60W (€12) | 24V rail to drivers, 12V rail to logic (regulated), common ground |
| All 6 at once | 24V ~150W (€20) | Same dual-rail, common-ground topology, higher-current supply |

The PSU choice is derived from `v.at` (concurrency), not a separate field: `v.bom.psu150` present
⇒ 150 W, else 60 W. This is drawn explicitly in the live diagram's Power block, alongside the
12V/24V dual rail and common-ground line. Six motors moving at once draw roughly six times the
peak current of one — a real hidden cost of parallel dispensing (bigger PSU, more heat, thicker
wiring, more EMI), on top of whatever the step-generation solution itself costs. This is the tool's
"U5 concurrency axis" finding: concurrency, not driver family or bus choice, sets the cost/PSU
floor.

---

## Live system diagram (D-01/D-02/D-03)

Selecting a matrix row (`selectVariant(v)`, the diagram's only control per D-02 — no dropdown, no
"follow cheapest" auto-mode) redraws a fixed-viewport (880×600) hand-authored SVG via
`buildDiagram(v)`, mirroring `rotor-solver`'s `buildFigure()` technique: template-string assembly,
full rebuild on every state change, no persistent DOM mutation.

**Topology classes** (`topoClassOf(v)`, derived from the variant's existing `bom` keys — no new
data field):

| Class | Trigger | Node count on Layer B | Variants |
|---|---|:--:|---|
| `fused` | brain IS the pump controller (no extra MCU) | 2 (brain + alignment) | 10 variants: S1-*, D2-*, T9-fused-*, T51-*, ESPINT-* |
| `satellite` | one dedicated pump-node MCU (rp2040/stm32/nano) | 3 | P6-rp-*, P6-stm-485, T9-node-485 |
| `distributed` | six independent per-pump nodes (Pro-Mini ×6) | 8 | P6-dist-485, P6-dist-can |
| `printer` | a printer board (RAMPS/SKR) with driver sockets | 3 | B-ramps-drv, B-skr-drv, B-skr-tmc |

Rendered regions, top to bottom: **Layer A** (brain↔screen — external ILI9341 box + link line
labelled with `interfaceMode`/`interfaceConf`, or a single integrated brain+screen box for
`espscreen` variants; the brain box strokes red with a "⚠ pins overrun" caption when
`pinsOf(v).overrun`) → **Layer B** (bus line labelled `${v.b} bus · ${nodeCount} nodes`, the
constant alignment node) → **Layer C** (driver topology + all 6 driver→motor links, driver ICs
coloured by dumb/smart/motion, dashed connector lines for `satellite`/`printer` classes vs solid
for `fused`/`distributed`) → **Power** (PSU box, dual-rail lines, common-ground line). The diagram
auto-selects the first visible (cheapest, by default sort) variant on load and after any
filter/sort that removes the current selection.

---

## Cost-model assumptions (SC-5, ARCH-05)

- All prices are hobby-class estimates, **±20%** (explicit in the running tool's footer note) —
  not quotes, except the ILI9341 screen (High confidence, real bitbyg listing price).
- `costOf(v) = Σ(COMP[k].eur × qty)` over `v.bom`, plus `SHARED_BOM` (6× stepper, screen, alignment
  Nano, DRV8825, 28BYJ-48, alignment motor #2 ≈ €72 total) when "include shared block" is toggled
  to whole-system cost. Controller-electronics-only view (default) excludes the shared block.
- **Double-count guard:** an `espscreen`-based variant already prices its own integrated display as
  part of the brain component — `costOf()`/`bomHtml()` skip the `SHARED_BOM` screen line for
  those two variants so the display is never billed twice.
- Complexity (★, 1–5, half-stars) is a qualitative design/firmware/wiring-maintenance rating, not
  a derived formula — assigned per variant based on node count, driver firmware complexity, and
  bus robustness.
- The DKK→EUR conversion rate (default 0.134) is user-editable and applies uniformly to any DKK
  price typed into the component table; it does not retroactively re-derive already-set € values.

---

## Persistence (D-06)

Edited component prices and the DKK→EUR rate persist to **`localStorage`**, restored on page load,
all access wrapped in `try/catch` (mirrors the site-wide `lang` key idiom):

| Key | Contents |
|---|---|
| `sae-prices` | JSON snapshot of `{componentKey: eur}` for every `COMP` entry |
| `sae-rate` | The DKK→EUR conversion rate as a string |

The Reset button restores all component prices to `DEFAULTS` and removes both keys. These are
distinct from the site's shared `lang` localStorage key — no collision.

---

## Open questions

1. **Screen SPI vs 8-bit parallel — RESOLVED 2026-07-15.** The owned bitbyg ILI9341 module's
   product-page title said "SPI Touch Screen," but the page body described a pin interface
   (A0–A3, D4–D13, I²C D0–D3) characteristic of **8-bit-parallel Uno-shield-class** modules — a
   **sourced vendor-page contradiction**, not a researcher guess. The difference is 8 pins (SPI)
   vs 13 pins (parallel) — enough to flip several 6-parallel variants between "fits" and
   "OVERRUN." **Resolution:** the owned board was physically inspected and confirmed to be **SPI**.
   The tool's default is now SPI at **High confidence** (`INTERFACE_CONF = { spi:'High',
   parallel:'Low' }`); the 8-bit-parallel scenario is retained as a selectable Low-confidence
   counterfactual so the pin-budget sensitivity to interface choice stays visible.
2. **TMC2209 UART wiring mode (T9-* variants).** `pinsC: 4` assumes 2 UART segments × TX/RX for
   6 drivers across the driver family's ≤4-drivers-per-line limit (per
   `prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md`). Whether this uses TMC2209's
   single-wire half-duplex UART mode (which would roughly halve the pin cost) or standard
   full-duplex TX/RX per segment is not confirmed against the Trinamic datasheet. Documented as
   **ASSUMED**, non-blocking for this phase.
3. **Bare ESP32-S3 as a brain candidate.** bitbyg's enumerated 12-product ESP32 catalogue has no
   bare ESP32-S3 (only an S3 board bundled with Ethernet + camera). Not added as a `DEFAULTS`
   entry — would require sourcing outside bitbyg, contradicting D-11's "lean toward what bitbyg
   stocks" guidance. Non-blocking.

---

## Cross-links (D-04/D-05/D-08)

This tool is now the **canonical source** for the reasoning prose and cost/pin-budget data model.
The three original decision records in `prototypes/System-Architecture/` remain the design-study
audit trail (fixed components, open questions, raw exploration) and point back here rather than
duplicating content:

- [`prototypes/System-Architecture/ARCHITECTURE.md`](../../prototypes/System-Architecture/ARCHITECTURE.md) — system-level electronics/comms decision record; fixed components (touchscreen, LM75), points to this tool's `#matrix`/`#theory` anchors
- [`prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md`](../../prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md) — the seven-concept pump-control menu this tool's 19 variants supersede/extend; the driver-vs-MCU "mental model" section is trimmed to a pointer at this tool's `#theory` anchor
- [`prototypes/System-Architecture/SOLUTION-MATRIX.md`](../../prototypes/System-Architecture/SOLUTION-MATRIX.md) — the original static matrix (17 rows); trimmed to a human-readable snapshot explicitly marked as a reference view, not the source of truth (D-08)

The concurrency question this tool prices but does not answer (U5) is owned by
[`prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md`](../../prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md).

---

## Language support

**English only.** Unlike `rotor-solver` and other pre-i18n-era tools, this tool does not implement
the `data-i18n`/`lang` translation pattern — it was built and promoted after the site's language
switcher was already established, and English-only is the precedent for tools added post-i18n
(consistent with the site convention of not retrofitting translation onto every new tool).
