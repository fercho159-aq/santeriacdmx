/* Santería CDMX · Ile Ona Ire — interactions */
(() => {
  'use strict';

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const hamb = document.getElementById('hamb');
  const nav = document.querySelector('.primary-nav');
  if (hamb && nav) {
    hamb.addEventListener('click', () => {
      const open = nav.classList.toggle('mobile-open');
      hamb.classList.toggle('is-open', open);
      hamb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('mobile-open');
        hamb.classList.remove('is-open');
        hamb.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Subtle reveal on scroll (opacity only, no stagger)
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  // Floating WhatsApp bubble — single static message, appears once shortly after load
  const fab = document.getElementById('fabWa');
  if (fab) {
    setTimeout(() => fab.classList.add('show-bubble'), 2400);
    setTimeout(() => fab.classList.remove('show-bubble'), 7200);
  }

  // Smooth scroll offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 64;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });
})();
