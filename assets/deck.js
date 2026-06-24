(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let slideIdx = 0;
    let fragmentIdx = -1;
    
    const slides = Array.from(document.querySelectorAll('.slide'));
    const stage = document.querySelector('.deck-stage');
    
    if (!stage || slides.length === 0) return;
    
    // 1. Scale-to-Fit Stage
    function fitStage() {
      const scaleX = window.innerWidth / 1280;
      const scaleY = window.innerHeight / 720;
      const scale = Math.min(scaleX, scaleY);
      const tx = (window.innerWidth - 1280 * scale) / 2;
      const ty = (window.innerHeight - 720 * scale) / 2;
      stage.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
    }
    window.addEventListener('resize', fitStage);
    fitStage();
    
    // Focus stage on load for key events
    stage.focus();
    
    // 2. Hash Routing
    function updateURL() {
      history.replaceState(null, '', `#/${slideIdx + 1}`);
    }
    
    function readURL() {
      const match = location.hash.match(/^#\/(\d+)$/);
      if (match) {
        let targetIdx = parseInt(match[1], 10) - 1;
        targetIdx = Math.max(0, Math.min(targetIdx, slides.length - 1));
        if (targetIdx !== slideIdx) {
          goToSlide(targetIdx);
        } else {
          // just initializing
          updateHUD();
        }
      } else {
        updateHUD();
      }
    }
    window.addEventListener('hashchange', readURL);
    
    // 3. Slide Stepping
    function goToSlide(idx, landAt) {
      if (idx < 0 || idx >= slides.length) return;
      
      const prev = slides[slideIdx];
      if (prev) {
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
    }
    
    function advance() {
      const frags = Array.from(slides[slideIdx].querySelectorAll('.fragment'))
        .filter(f => !f.hasAttribute('data-fragment-revealed'));
        
      if (frags.length > 0) {
        frags[0].setAttribute('data-fragment-revealed', '');
        fragmentIdx++;
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
      const overview = document.querySelector('.deck-overview');
      if (!overview) return;
      const isHidden = overview.hidden;
      overview.hidden = !isHidden;
      if (isHidden) {
        document.body.setAttribute('data-overview', '');
      } else {
        document.body.removeAttribute('data-overview');
      }
    }
    
    function closeOverview() {
      const overview = document.querySelector('.deck-overview');
      if (overview) overview.hidden = true;
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
    
    // 7. Keydown Handler
    function handleDeckKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        advance();
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        retreat();
        e.preventDefault();
      } else if (e.key === 'o' || e.key === 'O') {
        toggleOverview();
      }
    }
    
    document.addEventListener('keydown', e => {
      if (document.body.hasAttribute('data-demo-active')) {
        if (e.key === 'Escape') {
          deactivateIframe();
          e.stopPropagation();
        }
        return;
      }
      
      if (e.key === 'Escape' && document.body.hasAttribute('data-overview')) {
        closeOverview();
        return;
      }
      
      handleDeckKey(e);
    });
    
    // Init URL/Slide
    readURL();
    if (slideIdx === 0 && !location.hash.match(/^#\/(\d+)$/)) {
        slides[0].classList.add('slide--active');
        updateHUD();
    }
  });
})();
