# Operator Interface, Live: tool spec

`tools/ui-mockup/index.html`. An interactive mock of the finished operator interface (firmware `src/ui/`, V2.2, ESP32-S3 + ILI9341 + XPT2046), built on the device-captured frame set rather than an HTML rebuild, with a two-way linked screen map beside the panel.

## The address contract

Thesis chapter 9 (`09_User-Interface-Module.tex`, the `\livetool` block at the head of §9.3) reserves `sirsirio.github.io/thesis-tools/tools/ui-mockup/` with the promise *"Walk every screen of the finished operator interface in your browser, at the panel's real size."* The path is frozen once the thesis is handed in. If the page ever moves, leave a redirect at this path.

## Why captures, not a rebuild

The firmware draws with LVGL's Montserrat Medium bitmaps at six sizes and `LV_SYMBOL_*` glyphs from Montserrat's private-use range; a browser cannot reproduce them exactly. The device captures are the panel's own framebuffer, read back over USB after a forced refresh and expanded from RGB565 with `(v<<3)|(v>>2)` / `(v<<2)|(v>>4)`, so every pixel is what the panel showed. Serving them pixel-exact and overlaying the firmware's own button geometry and navigation table cannot drift from the firmware. The three known layout clips ("getting lov", "unknow", the lane note under the nozzle dots) are therefore visible and are named on the page.

## Source of the frames

- Generator: `Architecture/tools/ui_shot.py` (pyserial + Pillow) driving the firmware's `DEMO <id>` and `SHOT` console verbs (`src/ui/ui_shot.h`, `ui_demo.h`). Captured 2026-09-14 and 2026-09-15.
- Master set: `…\3. Arduino Coding\Documentation\ui-design\device-shots\` (134 frames × two sizes, plus `README.md` with the per-variant table and a partial `screens.json`). A 4× copy is in the thesis at `latex\Pictures\ui\`.
- Served here: the `@1x` files renamed `screens/<screen>[-<variant>].png`, 320 × 240, 134 files, about 1.6 MB. Copied unchanged. DO NOT EDIT.
- Staged content, to be stated wherever the frames are shown: PANPOC Protocol 1 (dry swab), 16 samples on two racks, recipe `Panpoc bind` = 5 µL IC-RNA + 300 µL ethanol 96 % + 50 µL beads, six pumps drawn as fitted, battery 78 % (placeholder, the sense divider was never fitted), build identity SIMULATOR, log dates counted from a fixed boot epoch (no RTC).
- Two frames are byte-identical to their base and are kept for completeness: `check-unknown` ≡ `check`, `fill4-retry` ≡ `fill4`.

## Frame index

30 screens in the firmware's order (`ui_nav.cpp`), 134 frames. Suffixes: none = base state, `-<word>` = state variant, `-p<n>` = page n, `-modal-<kind>` = confirmation dialog over the base, `-s<n>` = bottle calibration step, `-dark` / `-fr` / `-da` / `-it` / `-es` = theme and language.

| Screen | Frames |
|---|---|
| home | base, unhomed, nocard, battlow, nobatt, norecipes, allempty, twopumps, dark, fr, da, it, es |
| liquids | base, mixed |
| liquid | base, ok, low, empty, uncal, nosensor, nobottle |
| bottle | s0 … s5 (no base) |
| resetwarn | base, lane, input, moved, fromrun |
| resetpick | base, lane, moved, unknown |
| resetclear | base, lane, input |
| resetrun | base, creep, lane, input |
| fill1 | base, none, twopumps |
| fill2 | base |
| fill3 | base, rackin, empty, rackout |
| fill4 | base, retry |
| recipes | base, empty, p2, third |
| redit | base, new, over, nudge, modal-delete |
| rkey | base, bad, empty, mm, dose |
| rname | base, empty, liquid |
| picker | base, none, two, p2 |
| assign | base, none, mixed, rack2, modal-remove |
| check | base, short, unfilled, both, unknown, modal-tight, modal-unknown, modal-air |
| checkliq | base, short, unknown |
| primecheck | base |
| run | base, feed, move, shake, out, rack2, last, dark |
| paused | base, low |
| done | base, stopped, nocard |
| fault | base, input, generic |
| settings | base, p2, dark |
| lang | base |
| diag | base (page 1), p2 … p8, reverse |
| logs | base, nocard, none, reading |
| logdetail | base, p2 … p7, reading, modal-dellog |

The page's `SCREENS` array is the same list with a one-line caption per frame (wording from the device-shots `README.md`). At load the page does not check the folder; the index was verified against the file list when built (134 = 134, no extras).

## Navigation

`LINKS` in the page is the firmware's own table (`ui_shot.py` lines 122–152, extracted from the `scr_*.cpp` handlers on 2026-09-14) and is used for the "Leads to" chips and the map's *next* markers. The hotspot destinations were written from the handlers themselves (firmware report, edge list), including the paths that depend on where the operator came from:

- `liquid` BACK → `liquids` or `check` (`S.liquidFrom`)
- `fill1` BACK → `check` when reached from the run path, else `settings`
- `fill4` YES → `check` when reached from the run path, else `home`; marks the lines filled
- `rkey` / `rname` OK and BACK / CANCEL → `redit`, `diag` or `liquid` (`S.kbFrom`)
- `resetpick` BACK → `settings` or `home`; `resetclear` BACK → `resetpick` (manual) or `resetwarn`
- `home` Start a run and `assign` are gated: position unknown renders `resetwarn-fromrun`
- `check` START RUN: disabled and labelled REFILL FIRST when a liquid is short; otherwise tight → `check-modal-tight`; then unfilled lines → `check-modal-air` (FILL NOW → `fill1`, Start anyway → `primecheck`); otherwise the run
- Modals: primary button inside the card at (28, 140, 264 × 44) carries the named action; the alternative on the scrim at (16, 194, 288 × 44) dismisses or overrides, as the captures show

## Hotspot geometry

Absolute panel pixels from the screen builders (`ui_widgets.cpp`, `scr_*.cpp`), rendered as percentage-positioned transparent `<button>` elements so the panel can be shown at 1×, 2×, 3× or fitted. Standard button row y = 190 … 194, height 44 (52 on `run`); side gutter 8, content width 304; pager arrows at (176, y) and (268, y), 44 × 44; status bar 0 … 26 not clickable. Service-panel page content is offset by the 26 px paged viewport (verified against the `diag`, `diag-p4`, `diag-p5`, `diag-p7` captures). Every frame has at least one hotspot; the audit at build time counted 778 hotspots, 246 of them disabled with a stated reason, none outside 320 × 240, none pointing at a missing frame.

Buttons whose only effect on the device is a repaint of the same screen into a state that was never captured (single tube toggles on `assign`, ALL / NONE, most keyboard keys past the captured text, service jogs and doses) are still tappable and answer with a toast that says so. Disabled controls (REFILL FIRST, MEASURING, OK out of range, NEXT with nothing picked, SKIP IT outside a low-liquid pause, pager ends) explain why.

## Conditions → variant

The conditions panel sets machine state; `resolve(screen)` picks the captured variant. One condition wins per screen, in this order:

| Screen | Rule |
|---|---|
| home | unhomed → nocard → language (fr/da/it/es) → dark → twopumps → base |
| fill1 | twopumps → none selected → base |
| check | short + air → both; short → short; air → unfilled; else base |
| checkliq | short → short; else base |
| run | dark → run-dark for the base step only |
| done | stopped → stopped; no card → nocard; else base |
| settings | page 2 → p2; dark → dark; else base |
| logs | no card → nocard |
| resetwarn / resetpick / resetclear / resetrun | lane-only mask → -lane; from the run path → resetwarn-fromrun |
| assign | none / two recipes (mixed) / rack 2 / base |
| picker | two ticked → two; else base |

Choosing a frame from the map calls `adopt(frame)`, which sets the state fields the frame implies, so the conditions panel and the panel never disagree.

## Timed sequences (page timings, not machine timings)

| Sequence | Frames and dwell |
|---|---|
| Run | feed 1.7 s → base 2.3 s → shake 1.2 s → move 1.4 s → rack2 2.3 s → out 1.5 s → last 1.6 s → `done` |
| Fill | rackin 1.5 s → empty 1.9 s → refill (base) 1.9 s → rackout 1.5 s → `fill4` |
| Reset, both axes | base 2.3 s → creep 1.7 s → `home`, position now known |
| Reset, lane only | resetrun-lane 2.6 s → `home` |
| Bottle calibration | s2 2.4 s → s3; s4 2.4 s → `liquid-ok` |
| Guided demo (service page 1) | home, recipes, assign, check, run-feed, run, run-move, paused, run-rack2, done, looping at the dwell (1 … 30 s, default 5); overlay taps: left third back, right third on, middle pause, top-right exit; exit "reboots", so position unknown again |

PAUSE holds the run index; CONTINUE resumes it. STOP anywhere in a run goes to `done-stopped`. The real machine's figures (about 6 min 40 s for the staged 16-tube run by the timing model, 22 s for a full lane reset, about 20 s for a fill) are stated in the thesis, not reproduced here.

## Page features

- Panel: bezel, `image-rendering: pixelated`, size 1× / 2× / 3× (auto-fit below 320 px of column width), Show touch targets overlay (dashed accent outlines; grey for disabled), press flash (the firmware's `bg_opa 200` press feedback), toast for repaints without a capture, Back (history, also the Backspace key), Home.
- Frame line: frame name, caption, hover hint (button → destination), Leads to chips from `LINKS`.
- Trail: the last ten frames as thumbnails; click to return.
- Map: eight groups (Home, Liquids, Reset position, Fill lines, Recipes, A run, Settings, History), one row per screen with thumbnail, name, purpose and frame count; variant chips open under the current screen; the current screen is outlined in the accent and the screens reachable from it carry a *next* marker; clicking a row resolves the screen under the current conditions, clicking a chip shows that exact frame.
- Play a run: sets the conditions to a runnable machine and taps the real buttons (Start a run → NEXT → START RUN → run plays → DONE), with a ring on each button it presses.
- Stick the lane: pre-empts into `fault`, as the firmware does on an exhausted travel budget.
- Below the stage: the six-frame run flow from the thesis (`fig:ui-run-flow`), the real / staged / faked panels, and provenance.
- All 134 frames are preloaded in the background after load so taps never wait; total about 1.6 MB.
- No dependencies. Shared frame from `assets/FRAME-SNIPPET.html` at depth 2. Reduced motion respected (frame swaps are instant anyway, as `LV_SCR_LOAD_ANIM_NONE` on the device).

## Not modelled

- Independent per-tube assignment, ALL / NONE, typing arbitrary values and names, service jogs and doses: no captures, answered with a toast.
- Only `home` was captured in five languages; only `home`, `run` and `settings` in the dark theme. Elsewhere the panel stays English and light, and the language tap says so.
- The low-liquid automatic pause (`paused-low`) and the `fault-input` / `fault-generic` wordings are reachable from the map, not from a simulated event.
- Real timings and the per-phase countdown.

## Registration

`assets/site-nav.js` (Interface group, mark `panel`, defined in `assets/site.css`), `tools/index.html` (Interface, 2 tools; count of tools updated to ten), `index.html` (second tile in the screen stop and a second route pill, i18n key `tool-ui-live`), `README.md`, `ROADMAP.md`, `CLAUDE.md`.
