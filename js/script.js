/* =============================================================================
   ZAFFRA AGRO EXPORT — interactions & animations
   ============================================================================= */

(function () {
  'use strict';

  /* ── DOM ready ──────────────────────────────────────────────────────────── */
  const header   = document.getElementById('site-header');
  const mobilePanel = document.getElementById('mobile-panel');
  const toggleBtn   = document.querySelector('.mobile-toggle');
  const closeBtn    = document.querySelector('.mobile-panel-close');

  /* ── Scroll-aware header ─────────────────────────────────────────────────── */
  function onScroll () {
    const y = window.scrollY || window.pageYOffset;
    if (!header) return;
    if (y > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ─────────────────────────────────────────────────────────── */
  function openMenu () {
    if (!mobilePanel || !toggleBtn) return;
    mobilePanel.classList.add('open');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    mobilePanel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu () {
    if (!mobilePanel || !toggleBtn) return;
    mobilePanel.classList.remove('open');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobilePanel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (closeBtn)  closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Reveal on scroll (Intersection Observer) ────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── Animated stat counters ─────────────────────────────────────────────── */
  function animateCounter (el) {
    const target  = parseFloat(el.dataset.count);
    const suffix  = el.dataset.suffix || '';
    const prefix  = el.dataset.prefix || '';
    const decimals = target % 1 !== 0 ? 1 : 0;
    const duration = 1800;
    const start    = performance.now();

    function step (now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = eased * target;
      el.textContent = prefix + val.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('[data-count]');
  if (counterEls.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(function (el) { cio.observe(el); });
  }

  /* ── Hero image load trigger ─────────────────────────────────────────────── */
  var heroImgPanel = document.querySelector('.hero-image-panel');
  if (heroImgPanel) {
    var heroImg = heroImgPanel.querySelector('img');
    if (heroImg) {
      if (heroImg.complete) {
        heroImgPanel.classList.add('loaded');
      } else {
        heroImg.addEventListener('load', function () {
          heroImgPanel.classList.add('loaded');
        });
      }
    }
  }

  /* Map interaction moved to Leaflet.js in countries.html */

  /* ── Contact form ────────────────────────────────────────────────────────── */
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
      setTimeout(function () {
        var success = form.querySelector('.form-success');
        if (success) success.classList.add('show');
        form.querySelectorAll('input, select, textarea').forEach(function (f) {
          f.value = '';
        });
        if (btn) { btn.textContent = 'Send Enquiry'; btn.disabled = false; }
      }, 1200);
    });
  }

  /* ── Smooth hash scroll fix for fixed header ─────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var offset = 90;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

}());
