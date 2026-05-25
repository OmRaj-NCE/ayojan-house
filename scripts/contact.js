/* ============================================
   AYOJAN HOUSE — contact.js  (FINAL VERSION)
   Real Formspree email + full validation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Event Type Pills ── */
  const pills      = document.querySelectorAll('.event-pill');
  const eventInput = document.getElementById('event-type-val');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      if (eventInput) eventInput.value = pill.dataset.type;
    });
  });

  /* ── Budget Range Slider ── */
  const budgetSlider  = document.getElementById('budget-slider');
  const budgetDisplay = document.getElementById('budget-display');
  const budgetHidden  = document.getElementById('budget-val');
  const budgetLabels  = [
    { val: 50000,   label: '₹50K',    text: 'Under ₹50,000' },
    { val: 75000,   label: '₹75K',    text: '₹50K – ₹75K' },
    { val: 100000,  label: '₹1 Lakh', text: '₹75K – ₹1 Lakh' },
    { val: 150000,  label: '₹1.5L',   text: '₹1L – ₹1.5 Lakh' },
    { val: 200000,  label: '₹2L',     text: '₹1.5L – ₹2 Lakh' },
    { val: 300000,  label: '₹3L',     text: '₹2L – ₹3 Lakh' },
    { val: 500000,  label: '₹5L',     text: '₹3L – ₹5 Lakh' },
    { val: 1000000, label: '₹10L+',   text: 'Above ₹10 Lakh' },
  ];

  function updateBudget(idx) {
    const entry = budgetLabels[idx];
    if (budgetDisplay) budgetDisplay.textContent = entry.label + (idx === budgetLabels.length - 1 ? '+' : '');
    if (budgetHidden)  budgetHidden.value = entry.text;
    const pct = (idx / (budgetLabels.length - 1)) * 100;
    if (budgetSlider) budgetSlider.style.setProperty('--pct', pct + '%');
  }

  if (budgetSlider) {
    budgetSlider.addEventListener('input', () => updateBudget(parseInt(budgetSlider.value)));
    updateBudget(parseInt(budgetSlider.value));
  }

  /* ── Floating Labels for <select> ── */
  document.querySelectorAll('.field-wrap select').forEach(sel => {
    function checkFilled() {
      sel.closest('.field-wrap').classList.toggle('filled', sel.value !== '');
    }
    sel.addEventListener('change', checkFilled);
    checkFilled();
  });

  /* ── Today highlight in office hours ── */
  const dayMap = { 0: 2, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1 };
  const hoursRows = document.querySelectorAll('.hours-row');
  const todayRow = hoursRows[dayMap[new Date().getDay()]];
  if (todayRow) todayRow.classList.add('hours-row--today');

  /* ── Date min = today ── */
  const dateInput = document.getElementById('event-date');
  if (dateInput) {
    const t = new Date();
    dateInput.min = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
  }

  /* ── Character counter ── */
  const msgArea  = document.getElementById('message');
  const msgCount = document.getElementById('msg-count');
  if (msgArea && msgCount) {
    msgArea.addEventListener('input', () => {
      msgCount.textContent = msgArea.value.length;
    });
  }

  /* ── Field Validation ── */
  function validateField(input) {
    const wrap = input.closest('.field-wrap');
    const err  = wrap ? wrap.querySelector('.field-error') : null;
    let valid = true, msg = '';

    if (input.required && !input.value.trim()) {
      valid = false; msg = 'This field is required.';
    } else if (input.type === 'email' && input.value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        valid = false; msg = 'Enter a valid email address.';
      }
    } else if (input.type === 'tel' && input.value) {
      if (!/^[6-9]\d{9}$/.test(input.value.replace(/\s/g,''))) {
        valid = false; msg = 'Enter a valid 10-digit Indian mobile number.';
      }
    }

    if (wrap) wrap.classList.toggle('has-error', !valid);
    if (input) input.classList.toggle('error', !valid);
    if (err) err.textContent = msg;
    return valid;
  }

  /* ── Form Submit with Formspree ── */
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.querySelector('.submit-btn');
  const successBox = document.querySelector('.form-success');

  if (form) {
    // Live validation
    form.querySelectorAll('input[required], textarea[required]').forEach(f => {
      f.addEventListener('blur',  () => validateField(f));
      f.addEventListener('input', () => {
        if (f.closest('.field-wrap').classList.contains('has-error')) validateField(f);
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate all required fields first
      let allValid = true;
      form.querySelectorAll('input[required], textarea[required]').forEach(f => {
        if (!validateField(f)) allValid = false;
      });
      if (!allValid) {
        // Scroll to first error
        const firstErr = form.querySelector('.has-error');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Loading state
      if (submitBtn) submitBtn.classList.add('loading');

      /* ════════════════════════════════════════════
         FORMSPREE INTEGRATION
         ─────────────────────────────────────────
         Step 1: Go to https://formspree.io
         Step 2: Sign up free (no credit card needed)
         Step 3: Click "New Form" → name it "Ayojan House Contact"
         Step 4: Copy the form endpoint — looks like:
                 https://formspree.io/f/xabcdefg
         Step 5: Replace YOUR_FORMSPREE_ID below with
                 just the ID part (e.g. xabcdefg)
         ════════════════════════════════════════════ */
      const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // ← REPLACE THIS

      const formData = new FormData(form);
      // Add hidden fields
      formData.set('_subject', `New Event Enquiry — ${formData.get('event_type') || 'Event'} — Ayojan House`);
      formData.set('_replyto', formData.get('email') || '');

      try {
        let success = false;

        if (FORMSPREE_ID !== 'YOUR_FORMSPREE_ID') {
          // Real submission to Formspree
          const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
          success = res.ok;
          if (!res.ok) {
            const data = await res.json();
            console.error('Formspree error:', data);
          }
        } else {
          // Demo mode — simulate success after delay
          await new Promise(r => setTimeout(r, 1800));
          success = true;
          console.info('Demo mode: Replace YOUR_FORMSPREE_ID in contact.js with your real Formspree ID to receive emails.');
        }

        if (submitBtn) submitBtn.classList.remove('loading');

        if (success) {
          // Hide form, show success
          form.style.display = 'none';
          if (successBox) {
            successBox.classList.add('show');
            successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          launchConfetti();
        } else {
          alert('Something went wrong. Please call us directly at +91 82108 56330.');
        }

      } catch (err) {
        if (submitBtn) submitBtn.classList.remove('loading');
        console.error('Form error:', err);
        alert('Network error. Please call us at +91 82108 56330 or WhatsApp us.');
      }
    });
  }

  /* ── Confetti burst on success ── */
  function launchConfetti() {
    const colors = ['#C9A84C', '#E2C97A', '#6B0F2B', '#FFFDF5', '#8C1535', '#ffffff'];
    for (let i = 0; i < 70; i++) {
      const el = document.createElement('div');
      const size = 5 + Math.random() * 9;
      el.style.cssText = `
        position:fixed;
        top:-12px;
        left:${Math.random() * 100}vw;
        width:${size}px;
        height:${size}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        border-radius:${Math.random() > .45 ? '50%' : '2px'};
        z-index:9998;
        pointer-events:none;
        animation: confettiFall ${1.4 + Math.random() * 2.2}s ease-in forwards;
        animation-delay:${Math.random() * 0.7}s;
      `;
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
  }

});
