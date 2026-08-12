/* Abrazo en Red Colombia — interacciones mínimas */
(function () {
  'use strict';

  // Año actual en el pie de página
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Sombra del header al hacer scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Aparición suave de tarjetas y pasos
  var animated = document.querySelectorAll('.card, .step, .pullquote');
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

  animated.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (Math.min(i, 4) * 70) + 'ms';
    observer.observe(el);
  });
})();
