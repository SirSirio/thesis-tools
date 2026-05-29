# Roadmap: Thesis Tools — Modular Automated Liquid Dispensing for Point-of-Care Use

## Overview

The site ships one tool (Peristaltic Rotor Geometry Solver) and grows incrementally as the thesis generates new design decisions needing computational support. Phase 1 extends the existing solver with motor operating-point analysis. Phase 2 adds a language switcher so the same site serves both English and Italian readers. Later phases add new standalone tools from the backlog whenever a new Proto 1 decision demands them.

## Phases

- [ ] **Phase 1: Motor & Microstepping Panel** - Extend the rotor solver with motor operating-point calculations so Proto 1 hardware decisions can be made from calculated data
- [ ] **Phase 2: Language Switcher (ENG/IT)** - Add a toggle on every page so the site serves both English and Italian readers without separate pages
- [ ] **Phase 3: Flow Sensor Calibration Viewer** - Add a tool for visualising and querying the Sensirion flow sensor calibration curve
- [ ] **Phase 4: Dispense Protocol Calculator** - Add a tool for computing multi-step dispense sequences from volume and timing parameters
- [ ] **Phase 5: Tube Occlusion Efficiency Estimator** - Add a tool that derives occlusion efficiency from gravimetric measurement data
- [ ] **Phase 6: BOM / Component Selector** - Add a tool for comparing and selecting bill-of-materials components against design constraints

## Phase Details

### Phase 1: Motor & Microstepping Panel
**Goal**: Add motor and microstepping analysis to the peristaltic rotor solver so Proto 1 operating-point decisions (torque margin, steps per stroke, max reliable step rate) can be made from calculated data rather than guesswork
**Depends on**: Nothing (first phase)
**Requirements**: MOTOR-01, MOTOR-02, MOTOR-03, MOTOR-04
**Success Criteria** (what must be TRUE):
  1. User opens the rotor solver and sees a Motor & Microstepping panel below the geometry results table with voltage selector, microstepping dropdown, and step rate input
  2. After solving geometry and setting motor inputs, all seven derived outputs are displayed (steps per stroke, volume per step, torque at rim, compression load range, torque margin indicator, max reliable step rate, RPM)
  3. Changing any motor input updates all outputs instantly without a page reload
  4. No motor spec input fields are present; the panel uses fixed Wantai 42BYGHW811 / DRV8825 constants silently
  5. No new source files exist and assets/style.css is unchanged after the feature merges
**Plans**: TBD
**UI hint**: yes

### Phase 2: Language Switcher (ENG/IT)
**Goal**: Users can switch between English and Italian on every page, with the choice persisting across sessions, so the site serves both the academic English audience and Italian-speaking readers without maintaining separate pages
**Depends on**: Phase 1
**Requirements**: LANG-01, LANG-02, LANG-03, LANG-04, LANG-05
**Success Criteria** (what must be TRUE):
  1. A language toggle button is visible in the nav bar on every page; it reads "IT" when English is active and "ENG" when Italian is active
  2. Clicking the toggle switches all labelled UI text to the other language immediately, with no page reload; computed values, units, and numbers are unchanged
  3. Selecting Italian and reloading any page returns the page in Italian without requiring the user to toggle again
  4. Navigating from the landing page to a tool page respects the language already chosen
  5. If localStorage is unavailable the page loads in English and the toggle still works for the session without throwing an error; no horizontal scroll appears at 375px or 1280px
**Plans**: TBD
**UI hint**: yes

### Phase 3: Flow Sensor Calibration Viewer
**Goal**: Users can load and inspect the Sensirion flow sensor calibration curve interactively so sensor output can be correctly interpreted during Proto 1 testing
**Depends on**: Phase 2
**Requirements**: BACKLOG-01
**Success Criteria** (what must be TRUE):
  1. User can open the tool and view a rendered calibration curve for the flow sensor
  2. User can query a specific sensor reading and see the corresponding calibrated flow value
  3. Tool works offline with no external dependencies
**Plans**: TBD
**UI hint**: yes

### Phase 4: Dispense Protocol Calculator
**Goal**: Users can compute volume and timing parameters for multi-step dispense sequences so protocol designs can be validated before running hardware experiments
**Depends on**: Phase 3
**Requirements**: BACKLOG-02
**Success Criteria** (what must be TRUE):
  1. User can define a multi-step dispense sequence with per-step volumes and timing
  2. User sees computed total volume, total time, and per-step flow rates
  3. Tool works offline with no external dependencies
**Plans**: TBD
**UI hint**: yes

### Phase 5: Tube Occlusion Efficiency Estimator
**Goal**: Users can derive tube occlusion efficiency from gravimetric measurement data so roller geometry choices can be evaluated against real experimental results
**Depends on**: Phase 4
**Requirements**: BACKLOG-03
**Success Criteria** (what must be TRUE):
  1. User can enter gravimetric measurement data and see computed occlusion efficiency
  2. Results are clearly tied to the rotor geometry parameters already solved by the existing tool
  3. Tool works offline with no external dependencies
**Plans**: TBD
**UI hint**: yes

### Phase 6: BOM / Component Selector
**Goal**: Users can compare candidate components against design constraints and generate a bill of materials so sourcing decisions are traceable and reproducible
**Depends on**: Phase 5
**Requirements**: BACKLOG-04
**Success Criteria** (what must be TRUE):
  1. User can view a list of candidate components filtered by design constraint parameters
  2. User can select components and see a consolidated BOM
  3. Tool works offline with no external dependencies
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Motor & Microstepping Panel | 0/? | Not started | - |
| 2. Language Switcher (ENG/IT) | 0/? | Not started | - |
| 3. Flow Sensor Calibration Viewer | 0/? | Not started | - |
| 4. Dispense Protocol Calculator | 0/? | Not started | - |
| 5. Tube Occlusion Efficiency Estimator | 0/? | Not started | - |
| 6. BOM / Component Selector | 0/? | Not started | - |
