/* ============================================
   AYOJAN HOUSE — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Custom Cursor ─── */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animCursor() {
    if (dot)  { dot.style.left  = mx + 'px'; dot.style.top  = my + 'px'; }
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(animCursor);
  })();
  document.querySelectorAll('a,button,.service-card,.faq-item__q').forEach(el => {
    el.addEventListener('mouseenter', () => ring && ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring && ring.classList.remove('hovered'));
  });
  // Hide default cursor on touch devices
  if ('ontouchstart' in window) {
    if (dot)  dot.style.display  = 'none';
    if (ring) ring.style.display = 'none';
    document.documentElement.style.cursor = 'auto';
  }

  /* ─── Nav Scroll ─── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ─── Hamburger Mobile Nav ─── */
  const hamburger   = document.querySelector('.nav__hamburger');
  const mobileNav   = document.querySelector('.nav__mobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile .nav__link');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileLinks.forEach(l => l.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ─── Active nav link ─── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(l => {
    const href = l.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      l.classList.add('active');
    }
  });

  /* ─── Scroll Reveal ─── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ─── Counter Animation ─── */
  function animCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();
    const suffix = el.dataset.suffix || '';
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animCounter(e.target); cObs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  /* ─── Testimonials Slider ─── */
  const track   = document.querySelector('.testimonials__track');
  const dots    = document.querySelectorAll('.testimonials__dot');
  const prevBtn = document.querySelector('.testimonials__btn--prev');
  const nextBtn = document.querySelector('.testimonials__btn--next');
  if (track) {
    const cards = track.querySelectorAll('.testimonial-card');
    let current = 0;
    let autoplay = null;
    const total = cards.length;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
    function startAuto() {
      autoplay = setInterval(() => goTo(current + 1), 5000);
    }
    function stopAuto() {
      clearInterval(autoplay);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); }));

    // Pause on hover
    const sliderWrap = document.querySelector('.testimonials__slider');
    if (sliderWrap) {
      sliderWrap.addEventListener('mouseenter', stopAuto);
      sliderWrap.addEventListener('mouseleave', startAuto);
    }

    goTo(0);
    startAuto();
  }

  /* ─── FAQ Accordion ─── */
  document.querySelectorAll('.faq-item__q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked if was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ─── Button Ripple ─── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = document.createElement('span');
      r.classList.add('ripple-effect');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.width = r.style.height = size + 'px';
      r.style.left = (e.clientX - rect.left - size / 2) + 'px';
      r.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
      this.style.position = 'relative';
      this.appendChild(r);
      r.addEventListener('animationend', () => r.remove());
    });
  });

  /* ─── Stagger child reveals ─── */
  document.querySelectorAll('.stagger-children').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
      child.classList.add('reveal');
    });
  });

});
