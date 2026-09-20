(function() {
  /* ────────────────────────────────────────────────────────────────────
     Shared deck runtime.

     2026-09-20: additive state API for the thesis-defense deck.
     slideIdx / fragmentIdx / slides are hoisted to the IIFE scope so the
     window.Deck getters can read them; the registration functions
     (Deck.slide, Deck.enter) exist synchronously, before DOMContentLoaded,
     because the assembled defense deck runs its per-part <script> blocks
     during parsing, right after this file. Everything that existed before
     behaves exactly as it did, except the hash, which now carries the step
     as a second segment and still accepts the old one-segment form.
     ──────────────────────────────────────────────────────────────────── */

  let slideIdx = 0;
  let fragmentIdx = -1;
  let slides = [];

  const api = window.Deck || (window.Deck = {});
  const builders = Object.create(null);
  const enterHooks = Object.create(null);

  /* Deck.slide is both the timeline-builder registry (Deck.slide(cue, fn))
     and, coerced to a number, the current 1-based slide. Deck.slideNo is the
     plain getter for code that wants a number without coercion. */
  function registerSlide(cue, fn) { builders[cue] = fn; return api; }
  registerSlide.valueOf = function () { return slideIdx + 1; };
  registerSlide.toString = function () { return String(slideIdx + 1); };
  api.slide = registerSlide;

  api.enter = function (cue, fn) {
    (enterHooks[cue] || (enterHooks[cue] = [])).push(fn);
    return api;
  };
  api.builderFor = function (cue) { return builders[cue] || null; };
  api.entersFor  = function (cue) { return enterHooks[cue] || []; };

  function stepsOf(i) {
    const s = slides[i];
    return s ? s.querySelectorAll('.fragment').length : 0;
  }
  function cueOf(i) {
    const s = slides[i];
    return s ? (s.getAttribute('data-cue') || null) : null;
  }
  function indexOfCue(cue) {
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].getAttribute('data-cue') === cue) return i;
    }
    return -1;
  }

  Object.defineProperty(api, 'slideNo', { get: function () { return slideIdx + 1; } });
  Object.defineProperty(api, 'index',   { get: function () { return slideIdx; } });
  Object.defineProperty(api, 'step',    { get: function () { return fragmentIdx + 1; } });
  Object.defineProperty(api, 'count',   { get: function () { return slides.length; } });
  Object.defineProperty(api, 'steps',   { get: function () { return stepsOf(slideIdx); } });
  Object.defineProperty(api, 'cue',     { get: function () { return cueOf(slideIdx); } });
  Object.defineProperty(api, 'el',      { get: function () { return slides[slideIdx] || null; } });
  Object.defineProperty(api, 'state',   { get: function () {
    return {
      slide: slideIdx + 1,
      step: fragmentIdx + 1,
      cue: cueOf(slideIdx),
      count: slides.length,
      steps: stepsOf(slideIdx)
    };
  } });

  document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    slides = Array.from(document.querySelectorAll('.slide'));
    const stage = document.querySelector('.deck-stage');

    if (!stage || slides.length === 0) return;

    // 1. Scale-to-Fit Stage
    function fitStage() {
      const scaleX = window.innerWidth / 1280;
      const scaleY = window.innerHeight / 720;
      const scale = Math.min(scaleX, scaleY);
      const tx = (window.innerWidth - 1280 * scale) / 2;
      const ty = (window.innerHeight - 720 * scale) / 2;
      stage.style.position = 'absolute';
      stage.style.left = '0px';
      stage.style.top = '0px';
      stage.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    }
    window.addEventListener('resize', fitStage);
    fitStage();

    // Focus stage on load for key events
    stage.focus();

    /* ── Additive state API: event + hash ───────────────────────────── */
    let suppressState = false;

    function emitState(remote) {
      if (suppressState) return;
      document.dispatchEvent(new CustomEvent('deck:state', {
        detail: {
          slide: slideIdx + 1,
          step: fragmentIdx + 1,
          cue: cueOf(slideIdx),
          count: slides.length,
          steps: stepsOf(slideIdx),
          remote: !!remote
        }
      }));
    }

    // 2. Hash Routing  (#/<slide>/<step>; the one-segment form still reads)
    function updateURL() {
      history.replaceState(null, '', `#/${slideIdx + 1}/${fragmentIdx + 1}`);
    }

    function readURL() {
      const match = location.hash.match(/^#\/(\d+)(?:\/(\d+))?$/);
      if (match) {
        const n = parseInt(match[1], 10);
        const step = match[2] === undefined ? 0 : parseInt(match[2], 10);
        goToState(n, step);
      } else {
        updateHUD();
      }
    }
    window.addEventListener('hashchange', readURL);

    // 3. Slide Stepping
    function goToSlide(idx, landAt) {
      if (idx < 0 || idx >= slides.length) return;

      const prev = slides[slideIdx];
      if (prev && prev !== slides[idx]) {
        prev.classList.remove('slide--active');
        prev.classList.add('slide--leaving');
        setTimeout(() => prev.classList.remove('slide--leaving'), 450);
      }

      slideIdx = idx;
      fragmentIdx = landAt === 'last'
        ? slides[slideIdx].querySelectorAll('.fragment').length - 1
        : -1;

      slides[slideIdx].querySelectorAll('.fragment').forEach((f, i) => {
        if (i <= fragmentIdx) {
          f.setAttribute('data-fragment-revealed', '');
        } else {
          f.removeAttribute('data-fragment-revealed');
        }
      });

      slides[slideIdx].classList.add('slide--active');
      updateURL();
      updateHUD();
      emitState();
    }

    /* Reveal exactly `s` fragments on the current slide (0 = none). */
    function applyStep(s) {
      const frags = slides[slideIdx].querySelectorAll('.fragment');
      fragmentIdx = Math.max(-1, Math.min((s | 0) - 1, frags.length - 1));
      frags.forEach((f, i) => {
        if (i <= fragmentIdx) f.setAttribute('data-fragment-revealed', '');
        else f.removeAttribute('data-fragment-revealed');
      });
    }

    function goToState(n, step, remote) {
      if (!slides.length) return;
      const idx = Math.max(0, Math.min((n | 0) - 1, slides.length - 1));
      const wasIdx = slideIdx;
      suppressState = true;
      if (idx !== wasIdx) {
        goToSlide(idx);
      } else {
        slides[idx].classList.add('slide--active');
      }
      applyStep(step == null ? 0 : step);
      suppressState = false;
      updateURL();
      updateHUD();
      emitState(remote);
    }

    function goToCue(cue, step, remote) {
      const idx = indexOfCue(cue);
      if (idx < 0) return false;
      goToState(idx + 1, step, remote);
      return true;
    }

    function advance() {
      const frags = Array.from(slides[slideIdx].querySelectorAll('.fragment'))
        .filter(f => !f.hasAttribute('data-fragment-revealed'));

      if (frags.length > 0) {
        frags[0].setAttribute('data-fragment-revealed', '');
        fragmentIdx++;
        updateURL();
        emitState();
      } else {
        goToSlide(slideIdx + 1);
      }
    }

    function retreat() {
      if (fragmentIdx >= 0) {
        const revealed = Array.from(slides[slideIdx].querySelectorAll('[data-fragment-revealed]'));
        if (revealed.length > 0) {
          revealed[revealed.length - 1].removeAttribute('data-fragment-revealed');
        }
        fragmentIdx--;
        updateURL();
        emitState();
      } else {
        goToSlide(slideIdx - 1, 'last');
      }
    }

    // 4. HUD
    function updateHUD() {
      const progressFill = document.querySelector('.deck-progress-fill');
      if (progressFill) {
        progressFill.style.width = ((slideIdx + 1) / slides.length) * 100 + '%';
      }

      const counter = document.querySelector('.deck-counter');
      if (counter) {
        counter.textContent = (slideIdx + 1) + ' / ' + slides.length;
      }
    }

    document.querySelectorAll('.deck-arrow').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('deck-prev')) retreat();
        if (btn.classList.contains('deck-next')) advance();
      });
    });

    let idleTimer;
    function resetIdleTimer() {
      const hud = document.querySelector('.deck-hud');
      if (!hud) return;
      hud.classList.remove('hud-idle');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => hud.classList.add('hud-idle'), 3000);
    }
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keydown', resetIdleTimer);
    resetIdleTimer();

    // 5. Overview Grid
    function toggleOverview() {
      let overview = document.querySelector('.deck-overview');
      if (!overview) {
        overview = document.createElement('div');
        overview.className = 'deck-overview';
        overview.hidden = true;

        // Header
        const header = document.createElement('div');
        header.className = 'deck-overview-header';
        const pageTitle = document.title.split('—')[0].trim() || 'Presentation';
        header.innerHTML = `
          <div class="site-label" style="margin-bottom: 10px;">Overview</div>
          <h1 class="site-title" style="font-size: 2.5rem;">${pageTitle}</h1>
        `;
        overview.appendChild(header);

        // Grid
        const grid = document.createElement('div');
        grid.className = 'deck-overview-grid';
        overview.appendChild(grid);

        const observer = new ResizeObserver(entries => {
          for (let entry of entries) {
            const w = entry.contentRect.width;
            entry.target.style.setProperty('--thumb-scale', w / 1280);
          }
        });
        overview.__resizeObserver = observer;

        slides.forEach((slide, idx) => {
          const thumb = document.createElement('div');
          thumb.className = 'deck-overview-thumb';

          // Observer will be attached when overview is shown

          // Clone
          const clone = slide.cloneNode(true);
          clone.classList.remove('slide', 'slide--active', 'slide--leaving');
          clone.classList.add('deck-overview-clone');

          // Reveal fragments & hide iframes
          clone.querySelectorAll('.fragment').forEach(f => f.setAttribute('data-fragment-revealed', ''));
          clone.querySelectorAll('iframe').forEach(ifr => {
            const placeholder = document.createElement('div');
            placeholder.className = 'iframe-placeholder';
            placeholder.textContent = 'Interactive Demo';
            ifr.parentNode.replaceChild(placeholder, ifr);
          });
          /* A cloned <video> would fetch and decode a second copy of the clip
             for every thumbnail, so the overview shows the poster instead. */
          clone.querySelectorAll('video').forEach(vid => {
            const still = document.createElement('img');
            still.className = vid.className;
            still.setAttribute('style', vid.getAttribute('style') || '');
            const poster = vid.getAttribute('poster');
            if (poster) still.src = poster;
            still.alt = '';
            vid.parentNode.replaceChild(still, vid);
          });
          /* Slides more than two away have had their lazy src cleared; without
             this the thumbnail renders the alt sentence as body copy. */
          clone.querySelectorAll('img[data-src]:not([src])').forEach(im => { im.alt = ''; });

          thumb.appendChild(clone);

          // Badge
          const badge = document.createElement('div');
          badge.className = 'deck-overview-badge';
          badge.textContent = idx + 1;
          thumb.appendChild(badge);

          thumb.addEventListener('click', () => {
            goToSlide(idx);
            closeOverview();
          });
          grid.appendChild(thumb);
        });
        document.body.appendChild(overview);
      }
      const isHidden = overview.hidden;
      overview.hidden = !isHidden;
      if (isHidden) {
        document.body.setAttribute('data-overview', '');
        if (overview.__resizeObserver) {
          overview.querySelectorAll('.deck-overview-thumb').forEach(t => overview.__resizeObserver.observe(t));
        }
      } else {
        document.body.removeAttribute('data-overview');
        if (overview.__resizeObserver) {
          overview.__resizeObserver.disconnect();
        }
      }
    }

    function closeOverview() {
      const overview = document.querySelector('.deck-overview');
      if (overview) {
        overview.hidden = true;
        if (overview.__resizeObserver) {
          overview.__resizeObserver.disconnect();
        }
      }
      document.body.removeAttribute('data-overview');
    }

    document.querySelectorAll('.deck-overview-thumb').forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        goToSlide(idx);
        closeOverview();
      });
    });

    // 6. iframe Focus Capture
    document.querySelectorAll('.iframe-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        const wrapper = overlay.closest('.iframe-wrapper');
        const iframe = wrapper.querySelector('iframe');
        overlay.style.display = 'none';
        iframe.removeAttribute('tabindex');
        iframe.focus();
        document.body.setAttribute('data-demo-active', '');
      });
    });

    function deactivateIframe() {
      document.querySelectorAll('.iframe-wrapper').forEach(wrapper => {
        const overlay = wrapper.querySelector('.iframe-overlay');
        const iframe = wrapper.querySelector('iframe');
        if (overlay) overlay.style.display = '';
        if (iframe) {
          iframe.setAttribute('tabindex', '-1');
          iframe.blur();
        }
      });
      document.body.removeAttribute('data-demo-active');
      if (stage) stage.focus();
    }

    document.addEventListener('click', e => {
      if (!document.body.hasAttribute('data-demo-active')) return;
      if (!e.target.closest('.iframe-wrapper')) {
        deactivateIframe();
      }
    });

    /* ── Blackout (b) and fullscreen (f) ────────────────────────────── */
    function toggleBlackout() {
      let ov = document.querySelector('.deck-blackout');
      if (!ov) {
        ov = document.createElement('div');
        ov.className = 'deck-blackout';
        ov.setAttribute('style',
          'position:fixed;inset:0;background:#000;z-index:9998;');
        ov.hidden = true;
        document.body.appendChild(ov);
      }
      ov.hidden = !ov.hidden;
      if (ov.hidden) document.body.removeAttribute('data-blackout');
      else document.body.setAttribute('data-blackout', '');
    }

    function toggleFullscreen() {
      const d = document;
      if (!d.fullscreenElement) {
        const el = d.documentElement;
        const req = el.requestFullscreen || el.webkitRequestFullscreen;
        if (req) { try { req.call(el); } catch (e) {} }
      } else {
        const exit = d.exitFullscreen || d.webkitExitFullscreen;
        if (exit) { try { exit.call(d); } catch (e) {} }
      }
    }

    /* ── Type a slide number, then Enter ────────────────────────────── */
    let numBuffer = '';
    let numTimer = null;
    function pushDigit(d) {
      numBuffer += d;
      clearTimeout(numTimer);
      numTimer = setTimeout(() => { numBuffer = ''; }, 2000);
    }
    function commitNumber() {
      if (!numBuffer) return false;
      const n = parseInt(numBuffer, 10);
      numBuffer = '';
      clearTimeout(numTimer);
      if (!isNaN(n)) { goToState(n, 0); return true; }
      return false;
    }

    function instrumentsOpen() {
      const panel = document.getElementById('instr-panel');
      return !!(panel && !panel.hidden);
    }

    /* site-nav.js listens for Escape on document in the bubble phase and was
       registered first, so by the time the deck's own handler runs the panel
       is already hidden. This capture-phase probe records whether the panel
       was open when the key went down, and the deck handler honours it. */
    let escapeTakenByPanel = false;
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') escapeTakenByPanel = instrumentsOpen();
    }, true);

    // 7. Keydown Handler
    function handleDeckKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        advance();
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        retreat();
        e.preventDefault();
      } else if (e.key === 'Home') {
        goToState(1, 0);
        e.preventDefault();
      } else if (e.key === 'End') {
        goToState(slides.length, 0);
        e.preventDefault();
      } else if (e.key === 'Enter') {
        if (commitNumber()) e.preventDefault();
      } else if (e.key.length === 1 && e.key >= '0' && e.key <= '9') {
        pushDigit(e.key);
      } else if (e.key === 'b' || e.key === 'B') {
        toggleBlackout();
        e.preventDefault();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
        e.preventDefault();
      } else if (e.key === 'o' || e.key === 'O') {
        toggleOverview();
      }
    }

    document.addEventListener('keydown', e => {
      if (document.body.hasAttribute('data-demo-active')) {
        if (e.key === 'Escape') {
          deactivateIframe();
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }

      if (e.key === 'Escape') {
        /* The Instruments panel owns Escape while it is open; site-nav.js
           closes it on the same event. Only an already-closed panel lets
           Escape reach the overview. */
        if (escapeTakenByPanel || instrumentsOpen()) { escapeTakenByPanel = false; return; }
        toggleOverview();
        e.preventDefault();
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      handleDeckKey(e);
    });

    /* ── Publish the navigation half of the API ─────────────────────── */
    api.goToState = goToState;
    api.goToCue = goToCue;
    api.advance = advance;
    api.retreat = retreat;
    api.overview = toggleOverview;
    api.closeOverview = closeOverview;
    api.blackout = toggleBlackout;
    api.fullscreen = toggleFullscreen;
    api.slides = function () { return slides.slice(); };
    api.reducedMotion = reducedMotion;

    // Init URL/Slide
    readURL();
    if (slideIdx === 0 && !location.hash.match(/^#\/(\d+)/)) {
      slides[0].classList.add('slide--active');
      updateURL();
      updateHUD();
      emitState();
    }
    api.ready = true;
    document.dispatchEvent(new CustomEvent('deck:ready'));
  });
})();
