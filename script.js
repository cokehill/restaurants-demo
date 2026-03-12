/**
 * The Village Restaurant & Lounge — script.js
 * Pure vanilla JavaScript. No frameworks. No build step.
 *
 * Features covered:
 *  1. Sticky nav shadow on scroll
 *  2. Smooth-scroll for all anchor links
 *  3. Mobile hamburger menu toggle
 *  4. Close mobile menu when a link is clicked
 *  5. Populate guest-count dropdown (1–20)
 *  6. Booking form → WhatsApp pre-filled message
 *  7. Set current year in footer
 *  8. Intersection Observer for fade-in animations
 */

/* ── Run after the DOM is ready ─────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
  populateGuestSelect();
  initBookingForm();
  setFooterYear();
  initFadeIn();
});


/* ────────────────────────────────────────────────────────
   1. Sticky nav: add shadow class when user scrolls down
──────────────────────────────────────────────────────── */
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}


/* ────────────────────────────────────────────────────────
   2. Mobile hamburger menu
──────────────────────────────────────────────────────── */
function initMobileMenu() {
  const toggle   = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}


/* ────────────────────────────────────────────────────────
   3. Smooth scroll + close mobile menu on link click
──────────────────────────────────────────────────────── */
function initSmoothScroll() {
  const NAV_HEIGHT = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '64',
    10
  );

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Close mobile menu if open
      const navLinks = document.getElementById('nav-links');
      const toggle   = document.getElementById('nav-toggle');
      if (navLinks && navLinks.classList.contains('mobile-open')) {
        navLinks.classList.remove('mobile-open');
        toggle && toggle.classList.remove('is-open');
        toggle && toggle.setAttribute('aria-expanded', 'false');
      }

      // Scroll with offset for fixed navbar
      const targetTop = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}


/* ────────────────────────────────────────────────────────
   4. Populate guest count select (1–20)
──────────────────────────────────────────────────────── */
function populateGuestSelect() {
  const select = document.getElementById('guests');
  if (!select) return;

  for (let i = 1; i <= 20; i++) {
    const option = document.createElement('option');
    option.value = String(i);
    option.textContent = i === 1 ? '1 Guest' : `${i} Guests`;
    if (i === 2) option.selected = true; // default
    select.appendChild(option);
  }
}


/* ────────────────────────────────────────────────────────
   5. Booking form → WhatsApp
──────────────────────────────────────────────────────── */
function initBookingForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  // Set minimum date to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Collect values
    const name    = getValue('name');
    const email   = getValue('email');
    const phone   = getValue('phone');
    const date    = getValue('date');
    const time    = getValue('time');
    const guests  = getValue('guests');
    const message = getValue('message');

    // Format a friendly WhatsApp message
    const whatsappMessage =
      `Hello! I'd like to make a reservation at The Village Restaurant & Lounge:\n\n` +
      `👤 Name: ${name}\n` +
      `📧 Email: ${email}\n` +
      `📞 Phone: ${phone}\n` +
      `📅 Date: ${formatDate(date)}\n` +
      `🕐 Time: ${formatTime(time)}\n` +
      `👥 Guests: ${guests}\n` +
      (message ? `📝 Special Requests: ${message}\n` : '') +
      `\nThank you!`;

    const phoneNumber = '2349151820000'; // international format for WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

/** Get the trimmed value of a form field by id */
function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

/** Format YYYY-MM-DD to a more human-friendly string */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  return d.toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

/** Format HH:MM to 12-hour string */
function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}


/* ────────────────────────────────────────────────────────
   6. Footer: current year
──────────────────────────────────────────────────────── */
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}


/* ────────────────────────────────────────────────────────
   7. Intersection Observer – fade-in on scroll
──────────────────────────────────────────────────────── */
function initFadeIn() {
  // Add the CSS for fade-in dynamically so it degrades gracefully
  const style = document.createElement('style');
  style.textContent = `
    .fade-target {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .fade-target.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Select all cards and section content blocks as fade targets
  const targets = document.querySelectorAll(
    '.feature-card, .offering-card, .highlight-card, .menu-card, ' +
    '.gallery-item, .story-box, .payment-box, .booking-form-box, ' +
    '.info-box, .walkin-box, .address-box, .parking-box, .tile'
  );

  targets.forEach(el => el.classList.add('fade-target'));

  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything immediately
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once only
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}
