/* ============================================
   AYOJAN HOUSE — gallery.js
   Video Slider · Photo Filter · Lightbox · Modal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════
     1. VIDEO HORIZONTAL SLIDER
     Drag + arrow + dot navigation
  ══════════════════════════════════ */
  const vtrack      = document.querySelector('.vslider-track');
  const vOuter      = document.querySelector('.vslider-track-outer');
  const vPrev       = document.querySelector('.vslider-arrow--prev');
  const vNext       = document.querySelector('.vslider-arrow--next');
  const vDots       = document.querySelectorAll('.vslider-dot');
  const vcards      = document.querySelectorAll('.vcard');

  if (vtrack && vcards.length) {
    let vIdx = 0;
    let cardsVisible = getCardsVisible();
    let maxIdx = Math.max(0, vcards.length - cardsVisible);

    function getCardsVisible() {
      if (window.innerWidth <= 640)  return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getCardWidth() {
      if (!vcards[0]) return 0;
      return vcards[0].offsetWidth + 24; // 24px gap
    }

    function vGoTo(idx) {
      cardsVisible = getCardsVisible();
      maxIdx = Math.max(0, vcards.length - cardsVisible);
      vIdx = Math.max(0, Math.min(idx, maxIdx));
      vtrack.style.transform = `translateX(-${vIdx * getCardWidth()}px)`;
      vDots.forEach((d, i) => d.classList.toggle('active', i === vIdx));
      if (vPrev) vPrev.style.opacity = vIdx === 0 ? '0.4' : '1';
      if (vNext) vNext.style.opacity = vIdx >= maxIdx ? '0.4' : '1';
    }

    if (vPrev) vPrev.addEventListener('click', () => vGoTo(vIdx - 1));
    if (vNext) vNext.addEventListener('click', () => vGoTo(vIdx + 1));
    vDots.forEach((d, i) => d.addEventListener('click', () => vGoTo(i)));

    // Drag / swipe on the track
    let dragStart = 0, dragging = false, dragDelta = 0;
    if (vOuter) {
      vOuter.addEventListener('mousedown', e => {
        dragging = true; dragStart = e.clientX; dragDelta = 0;
        vtrack.style.transition = 'none';
      });
      window.addEventListener('mousemove', e => {
        if (!dragging) return;
        dragDelta = e.clientX - dragStart;
        const base = -vIdx * getCardWidth();
        vtrack.style.transform = `translateX(${base + dragDelta}px)`;
      });
      window.addEventListener('mouseup', () => {
        if (!dragging) return;
        dragging = false;
        vtrack.style.transition = '';
        if (dragDelta < -60) vGoTo(vIdx + 1);
        else if (dragDelta > 60) vGoTo(vIdx - 1);
        else vGoTo(vIdx);
      });

      // Touch
      vOuter.addEventListener('touchstart', e => {
        dragStart = e.touches[0].clientX; dragDelta = 0;
        vtrack.style.transition = 'none';
      }, { passive: true });
      vOuter.addEventListener('touchmove', e => {
        dragDelta = e.touches[0].clientX - dragStart;
        const base = -vIdx * getCardWidth();
        vtrack.style.transform = `translateX(${base + dragDelta}px)`;
      }, { passive: true });
      vOuter.addEventListener('touchend', () => {
        vtrack.style.transition = '';
        if (dragDelta < -50) vGoTo(vIdx + 1);
        else if (dragDelta > 50) vGoTo(vIdx - 1);
        else vGoTo(vIdx);
      });
    }

    window.addEventListener('resize', () => vGoTo(vIdx));
    vGoTo(0);
  }


  /* ══════════════════════════════════
     2. PHOTO FILTER TABS
  ══════════════════════════════════ */
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const masonryItems = document.querySelectorAll('.masonry-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      masonryItems.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'slideUp .4s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });


  /* ══════════════════════════════════
     3. PHOTO LIGHTBOX
  ══════════════════════════════════ */
  const lightbox     = document.querySelector('.lightbox');
  const lbImg        = document.querySelector('.lightbox__img');
  const lbPh         = document.querySelector('.lightbox__ph');
  const lbCaption    = document.querySelector('.lightbox__caption');
  const lbCounter    = document.querySelector('.lightbox__counter');
  const lbClose      = document.querySelector('.lightbox__close');
  const lbPrev       = document.querySelector('.lightbox__prev');
  const lbNext       = document.querySelector('.lightbox__next');

  let lbItems = [];    // array of {src, caption, ph}
  let lbCurrent = 0;

  function buildLbItems() {
    lbItems = [];
    document.querySelectorAll('.masonry-item:not(.hidden)').forEach(item => {
      lbItems.push({
        src: item.dataset.src || '',
        caption: item.dataset.caption || '',
        phStyle: item.dataset.phStyle || '',
        phIcon: item.dataset.phIcon || '🖼️'
      });
    });
  }

  function openLightbox(idx) {
    buildLbItems();
    lbCurrent = idx;
    showLbSlide(lbCurrent);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function showLbSlide(idx) {
    if (!lbItems.length) return;
    lbCurrent = (idx + lbItems.length) % lbItems.length;
    const item = lbItems[lbCurrent];

    if (lbImg) {
      if (item.src) {
        lbImg.src = item.src;
        lbImg.style.display = 'block';
        if (lbPh) lbPh.style.display = 'none';
      } else {
        lbImg.style.display = 'none';
        if (lbPh) {
          lbPh.style.display = 'flex';
          lbPh.style.background = item.phStyle || 'linear-gradient(135deg,#6B0F2B,#a01840)';
          lbPh.innerHTML = `<span style="font-size:5rem">${item.phIcon}</span>
            <span style="color:rgba(255,255,255,.6);font-family:'Cormorant Garamond',serif;font-size:1.1rem;">${item.caption}</span>`;
        }
      }
    }
    if (lbCaption) lbCaption.textContent = item.caption;
    if (lbCounter) lbCounter.textContent = `${lbCurrent + 1} / ${lbItems.length}`;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.masonry-item').forEach((item, i) => {
    item.addEventListener('click', () => {
      const visibleItems = Array.from(document.querySelectorAll('.masonry-item:not(.hidden)'));
      const vIdx = visibleItems.indexOf(item);
      openLightbox(vIdx >= 0 ? vIdx : 0);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click',  () => showLbSlide(lbCurrent - 1));
  if (lbNext)  lbNext.addEventListener('click',  () => showLbSlide(lbCurrent + 1));
  if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showLbSlide(lbCurrent - 1);
    if (e.key === 'ArrowRight')  showLbSlide(lbCurrent + 1);
  });


  /* ══════════════════════════════════
     4. VIDEO MODAL
  ══════════════════════════════════ */
  const videoModal   = document.querySelector('.video-modal');
  const vmFrame      = document.querySelector('.video-modal__frame');
  const vmClose      = document.querySelector('.video-modal__close');
  const vmTitle      = document.querySelector('.video-modal__title');

  function openVideoModal(src, title) {
    if (!videoModal) return;
    if (vmTitle) vmTitle.textContent = title || '';
    if (vmFrame) {
      if (src) {
        // Real video file
        vmFrame.innerHTML = `<video controls autoplay style="width:100%;height:100%;object-fit:contain;">
          <source src="${src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>`;
      } else {
        // Placeholder
        vmFrame.innerHTML = `<div class="video-modal__ph">
          <span style="font-size:4rem">🎬</span>
          <span style="color:rgba(255,255,255,.5);font-size:.9rem;letter-spacing:.1em;">Add your video file here</span>
          <span style="color:rgba(255,255,255,.3);font-size:.75rem;">videos/${title || 'event'}.mp4</span>
        </div>`;
      }
    }
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('open');
    if (vmFrame) vmFrame.innerHTML = '';
    document.body.style.overflow = '';
  }

  // Open video modal on vcard click
  document.querySelectorAll('.vcard').forEach(card => {
    card.addEventListener('click', () => {
      const src   = card.dataset.src   || '';
      const title = card.dataset.title || 'Event Video';
      openVideoModal(src, title);
    });
    // Prevent drag-click from opening modal
    card.addEventListener('mousedown', () => { card._dragging = false; });
    card.addEventListener('mousemove', () => { card._dragging = true;  });
    card.addEventListener('click', e => { if (card._dragging) e.stopImmediatePropagation(); });
  });

  if (vmClose) vmClose.addEventListener('click', closeVideoModal);
  if (videoModal) videoModal.addEventListener('click', e => { if (e.target === videoModal) closeVideoModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('open')) closeVideoModal();
  });

});
