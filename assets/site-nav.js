/* site-nav.js : shared frame behaviour (Sept 2026 redesign)
   Load in <head>, no defer, so html.js is set before first paint.
   Owns the single tools list, renders the Instruments panel into
   #instr-panel with every href prefixed by the nav's data-root,
   and marks .reveal elements with .is-in when they scroll into view.
   Dependency free, plain script, works from file:// and on GitHub Pages. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  /* ---- Single source of truth for the tools and records ---- */
  var GROUPS = [
    { title: 'Pump', items: [
      { name: 'Rotor Geometry Solver', href: 'tools/rotor-solver/index.html', mark: 'rotor',
        line: 'Solves the rotor radius for a target stroke volume.' },
      { name: 'Occlusion & Displaced-Volume Model', href: 'tools/peristaltic-roller-displaced-volume-model/index.html', mark: 'occlusion',
        line: 'The tube section under a roller and the volume each roller displaces.' },
      { name: 'Tensioned Tube-Path Model', href: 'tools/peristaltic-tensioned-path-model/index.html', mark: 'path',
        line: 'The taut tube path between rollers and the stroke volume it implies.' },
      { name: 'Pump Testing Protocol', href: 'tools/pump-testing/index.html', mark: 'balance',
        line: 'Gravimetric qualification method, ISO 23783-2 adapted, with the pipette benchmark.' }
    ]},
    { title: 'Electronics', items: [
      { name: 'System Architecture Explorer', href: 'tools/system-architecture-explorer/index.html', mark: 'matrix',
        line: '25 candidate architectures, costed and pin-audited.' },
      { name: 'Dispense Throughput Simulator', href: 'tools/dispense-throughput-simulator/index.html', mark: 'gantt',
        line: 'Schedules six reagent channels over a run and shows where the time goes.' }
    ]},
    { title: 'Interface', items: [
      { name: 'Operator Interface Prototypes', href: 'tools/ui-prototypes/index.html', mark: 'screen',
        line: 'Nine candidate interfaces over five design rounds, at the panel’s native 320 by 240.' },
      { name: 'Live User Interface', href: 'tools/ui-mockup/index.html', mark: 'panel',
        line: 'Every screen of the finished panel, captured from the device, with every button tappable.' }
    ]},
    { title: 'Method', items: [
      { name: 'Spec-Driven Workflow Guide', href: 'tools/gsd-workflow-guide/index.html', mark: 'loop',
        line: 'The spec-driven loop that ran firmware and web tools with an AI assistant.' },
      { name: 'Thesis Timeline', href: 'tools/thesis-timeline/index.html', mark: 'bars',
        line: 'Roadmap and Gantt of the thesis, February to September 2026.' }
    ]},
    { title: 'Records', items: [
      { name: 'Prototype journey', href: 'prototypes/index.html', mark: 'journey',
        line: 'Every build of the pump and alignment modules, in order.' },
      { name: 'Presentations', href: 'decks/index.html', mark: 'deck',
        line: 'Slide decks given during the thesis.' },
      { name: 'All instruments', href: 'tools/index.html', mark: 'grid',
        line: 'The nine tools on one page.' }
    ]}
  ];

  /* Extra rows for phones, where the nav links are collapsed into the panel */
  var NAV_GROUP = { title: 'Navigate', nav: true, items: [
    { name: 'Machine', href: 'index.html#machine', mark: 'machine',
      line: 'The assembled instrument, module by module.' },
    { name: 'Prototypes', href: 'prototypes/index.html', mark: 'journey',
      line: 'The prototype journey.' }
  ]};

  var navEl = null;
  var siteRoot = '';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function renderRow(item) {
    var a = el('a', 'instr__row');
    a.href = siteRoot + item.href;
    var mark = el('span', 'mark mark--' + item.mark);
    mark.setAttribute('aria-hidden', 'true');
    var text = el('span', 'instr__text');
    text.appendChild(el('span', 'instr__name', item.name));
    text.appendChild(el('span', 'instr__line', item.line));
    a.appendChild(mark);
    a.appendChild(text);
    return a;
  }

  function renderGroup(group) {
    var g = el('div', 'instr__group' + (group.nav ? ' instr__group--nav' : ''));
    g.appendChild(el('div', 'instr__title', group.title));
    for (var i = 0; i < group.items.length; i++) g.appendChild(renderRow(group.items[i]));
    return g;
  }

  var phone = window.matchMedia ? window.matchMedia('(max-width: 767px)') : null;

  function renderPanel(panel) {
    panel.innerHTML = '';
    var inner = el('div', 'instr__inner');
    var groups = el('div', 'instr__groups');
    if (phone && phone.matches) groups.appendChild(renderGroup(NAV_GROUP));
    for (var i = 0; i < GROUPS.length; i++) groups.appendChild(renderGroup(GROUPS[i]));
    inner.appendChild(groups);
    panel.appendChild(inner);
  }

  function setupInstruments() {
    navEl = document.querySelector('.site-nav[data-root]');
    var panel = document.getElementById('instr-panel');
    if (!navEl || !panel) return;
    siteRoot = navEl.getAttribute('data-root') || '';
    if (siteRoot === './' || siteRoot === '.') siteRoot = '';

    var btn = navEl.querySelector('.site-nav__instr');
    renderPanel(panel);
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Instruments');

    if (phone) {
      var onChange = function () { renderPanel(panel); };
      if (phone.addEventListener) phone.addEventListener('change', onChange);
      else if (phone.addListener) phone.addListener(onChange);
    }
    if (!btn) return;

    function focusables() {
      return panel.querySelectorAll('a[href], button');
    }
    function isOpen() { return !panel.hidden; }

    function open() {
      panel.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      var first = focusables()[0];
      if (first) first.focus();
    }
    function close(returnFocus) {
      if (!isOpen()) return;
      panel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      if (returnFocus !== false) btn.focus();
    }

    btn.addEventListener('click', function () {
      if (isOpen()) close(); else open();
    });

    panel.addEventListener('click', function (e) {
      var t = e.target;
      while (t && t !== panel) {
        if (t.tagName === 'A') { close(false); return; }
        t = t.parentNode;
      }
    });

    document.addEventListener('click', function (e) {
      if (!isOpen()) return;
      if (panel.contains(e.target) || btn.contains(e.target)) return;
      close(false);
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape' || e.key === 'Esc') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      /* keep Tab inside the button plus the panel while it is open */
      var items = focusables();
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      var active = document.activeElement;
      if (e.shiftKey) {
        if (active === first) { e.preventDefault(); btn.focus(); }
        else if (active === btn) { e.preventDefault(); last.focus(); }
      } else {
        if (active === last) { e.preventDefault(); btn.focus(); }
        else if (active === btn) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---- Reveal on scroll, once, no scroll listener ---- */
  function setupReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduce) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          entries[j].target.classList.add('is-in');
          io.unobserve(entries[j].target);
        }
      }
    }, { threshold: 0.15 });
    for (var k = 0; k < items.length; k++) io.observe(items[k]);
  }

  function init() {
    setupInstruments();
    setupReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.ThesisTools = {
    tools: GROUPS,
    get root() { return siteRoot; }
  };
})();
