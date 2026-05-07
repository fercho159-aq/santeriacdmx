/* Santería CDMX · Ile Ona Ire — interactions */
(() => {
  'use strict';

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header scroll state
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
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

  // Reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  // Floating WhatsApp intermittent bubble
  const fab = document.getElementById('fabWa');
  const bubble = document.getElementById('fabBubble');
  if (fab && bubble) {
    const messages = [
      '¿Te ayudo? 💬',
      'Agenda hoy 📿',
      '¿Tienes dudas? 🌙',
      'Consulta abierta ✦',
      'Habla conmigo 🔥',
    ];
    let idx = 0;
    const tick = () => {
      bubble.textContent = messages[idx % messages.length];
      idx++;
      fab.classList.add('show-bubble');
      setTimeout(() => fab.classList.remove('show-bubble'), 3500);
    };
    setTimeout(tick, 3000);
    setInterval(tick, 9000);
  }

  // Smooth scroll offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 56;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });
})();
