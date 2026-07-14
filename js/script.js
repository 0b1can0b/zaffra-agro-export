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

  // Inject Zaffra logo and header at the top of the mobile menu
  if (mobilePanel && !mobilePanel.querySelector('.mobile-menu-header')) {
    const headerContainer = document.createElement('div');
    headerContainer.className = 'mobile-menu-header';
    headerContainer.style.display = 'flex';
    headerContainer.style.justifyContent = 'space-between';
    headerContainer.style.alignItems = 'center';
    headerContainer.style.width = '100%';
    headerContainer.style.marginBottom = '1.25rem';
    
    headerContainer.innerHTML = `
      <a href="index.html" class="brand" style="border-left:none; padding-left:0; margin-left:0;">
        <svg class="brand-mark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:36px; height:36px;"><defs><linearGradient id="goldGradM" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#F2D270" /><stop offset="50%" stop-color="#C89020" /><stop offset="100%" stop-color="#8A5A19" /></linearGradient></defs><path d="M10 15 H90 M50 15 L10 85 H50 M30 50 H70" fill="none" stroke="url(#goldGradM)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span class="brand-word" style="border-left: 1px solid rgba(255,255,255,0.15); padding-left: 12px; margin-left: 4px; font-size:18px;">ZAFFRA<small style="font-size:7px; margin-top:4px;">AGRO EXPORT LLP</small></span>
      </a>
    `;
    
    const closeBtnEl = mobilePanel.querySelector('.mobile-panel-close');
    if (closeBtnEl) {
      headerContainer.appendChild(closeBtnEl);
    }
    
    mobilePanel.prepend(headerContainer);
  }

  // Inject "Products" parent item in mobile menu if not present
  if (mobilePanel) {
    const aboutLink = mobilePanel.querySelector('a[href="about.html"]');
    const productsLink = mobilePanel.querySelector('a[href="products.html"]');
    if (aboutLink && !productsLink) {
      const aboutLi = aboutLink.closest('li');
      if (aboutLi) {
        const productsLi = document.createElement('li');
        productsLi.innerHTML = '<a href="products.html">Products</a>';
        aboutLi.after(productsLi);
      }
    }
  }

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
