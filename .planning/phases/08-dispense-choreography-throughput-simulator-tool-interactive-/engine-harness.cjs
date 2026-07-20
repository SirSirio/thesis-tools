#!/usr/bin/env node
/*
 * Engine verification harness for the Dispense Choreography & Throughput Simulator.
 *
 * This is a TEST SCAFFOLD (not shipped product code). It reads the tool's
 * inline <script>, extracts the three pure engine functions by name, evaluates
 * them in isolation, and asserts they reproduce the pinned benchmark of record.
 *
 * REQUIREMENT ON THE EXECUTOR: computeDoseTimes / groupDispenseTime /
 * simulateSchedule MUST be declared at the top level of the inline <script>
 * (NOT nested inside an IIFE or DOMContentLoaded handler), each with its
 * closing brace at column 0, so this regex extraction succeeds.
 *
 * Usage:
 *   node engine-harness.cjs core      # dose times, serial sum, ceiling, LPT, full totals
 *   node engine-harness.cjs metrics   # + A1/A2 delta and throughput figures
 *
 * Benchmark of record (.planning/STATE.md + 08-RESEARCH.md, verified 2026-07-20):
 *   4 rollers x 5 uL/stroke = 20 uL/rev; 180 RPM -> 60 uL/s
 *   liquids 600/200/175/25 uL -> doseTimes [10, 3.3333, 2.9167, 0.4167] s
 *   serial (K=1) 16.6667 s/sample ; pipelined ceiling (K=N) 10 s
 *   full totals: K=1 = 583.33 s ; K=4 = 376.67 s ; delta = 206.67 s
 *   throughput: K=1 18.23 s/sample 197.5 samples/hr ; K=4 11.77 s/sample 305.7 samples/hr
 */
const fs = require('fs');
const path = require('path');

const MODE = process.argv[2] || 'core';
const TOOL = path.resolve(__dirname, '../../../tools/dispense-throughput-simulator/index.html');

const src = fs.readFileSync(TOOL, 'utf8');
function grab(name) {
  const m = src.match(new RegExp('function ' + name + '\\([^)]*\\)[\\s\\S]*?\\n\\}'));
  if (!m) throw new Error('Engine function not found or not top-level: ' + name);
  return m[0];
}
const code = grab('computeDoseTimes') + '\n' + grab('groupDispenseTime') + '\n' + grab('simulateSchedule');
const api = new Function(code + ';return {computeDoseTimes, groupDispenseTime, simulateSchedule};')();

const near = (a, b, tol) => Math.abs(a - b) <= (tol == null ? 0.02 : tol);
function assert(cond, msg) { if (!cond) { console.error('FAIL: ' + msg); process.exit(1); } }

// --- core benchmark ---
const dt = api.computeDoseTimes([600, 200, 175, 25], 4, 5, 180);
const sum = dt.reduce((a, b) => a + b, 0);
assert(near(dt[0], 10), 'doseTime[0] should be 10, got ' + dt[0]);
assert(near(sum, 16.6667), 'serial sum should be 16.6667, got ' + sum);
assert(near(Math.max.apply(null, dt), 10), 'pipelined ceiling should be 10, got ' + Math.max.apply(null, dt));
assert(near(api.groupDispenseTime([10, 3.3333, 2.9167, 0.4167], 2), 12.9167), 'LPT K=2 should be 12.9167');
const t1 = api.simulateSchedule(dt, 4, 32, 1, 1, 5, 3).totalRunTime;
const t4 = api.simulateSchedule(dt, 4, 32, 4, 1, 5, 3).totalRunTime;
assert(near(t1, 583.33), 'total K=1 should be 583.33, got ' + t1);
assert(near(t4, 376.67), 'total K=4 should be 376.67, got ' + t4);

if (MODE === 'core') {
  console.log('ENGINE CORE OK  serial=' + sum.toFixed(4) + '  ceiling=' + Math.max.apply(null, dt).toFixed(2) +
    '  K1=' + t1.toFixed(2) + '  K4=' + t4.toFixed(2));
  process.exit(0);
}

// --- metrics (delta + throughput) ---
if (MODE === 'metrics') {
  const delta = t1 - t4;
  assert(near(delta, 206.67), 'A1/A2 delta should be 206.67, got ' + delta);
  assert(near(t1 / 32, 18.23), 's/sample K=1 should be 18.23, got ' + (t1 / 32));
  assert(near(t4 / 32, 11.77), 's/sample K=4 should be 11.77, got ' + (t4 / 32));
  assert(near(3600 / (t1 / 32), 197.5, 0.5), 'samples/hr K=1 should be ~197.5');
  assert(near(3600 / (t4 / 32), 305.7, 0.5), 'samples/hr K=4 should be ~305.7');
  console.log('ENGINE METRICS OK  delta=' + delta.toFixed(2) +
    '  spsK1=' + (t1 / 32).toFixed(2) + '  sphK4=' + (3600 / (t4 / 32)).toFixed(1));
  process.exit(0);
}

console.error('Unknown mode: ' + MODE + ' (use "core" or "metrics")');
process.exit(2);
