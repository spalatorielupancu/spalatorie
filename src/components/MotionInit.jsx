'use client';

// ============================================================
//  Efectele de mișcare ale site-ului — puține și discrete:
//   1. Reveal la scroll (IntersectionObserver) + stagger în cascadă
//   2. Parallax fin în straturi — calculat RELATIV la secțiune, nu la toată pagina
//
//  Reguli:
//   - parallax-ul trece printr-un singur requestAnimationFrame (fluid, fără „jank”)
//   - cine are „Reduce motion” activat în sistem nu primește mișcare
//   - fără JavaScript, conținutul rămâne vizibil (clasa .js se pune abia aici)
// ============================================================

import { useEffect } from 'react';

export default function MotionInit() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];

    root.classList.add('js');

    // ---------- 1. Reveal + stagger ----------
    const revealEls = document.querySelectorAll('.reveal, .reveal-group');
    if (reduce) {
      revealEls.forEach((el) => el.classList.add('visible'));
    } else {
      document.querySelectorAll('.reveal-group').forEach((group) => {
        group.querySelectorAll('.reveal-item').forEach((item, i) => {
          item.style.setProperty('--i', i);
        });
      });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            io.unobserve(entry.target); // o singură dată
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      );
      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // ---------- 2. Parallax într-un singur rAF ----------
    const scopes = reduce ? [] : [...document.querySelectorAll('[data-parallax-scope]')];
    if (scopes.length) {
      const isSmall = () => window.innerWidth < 760;
      let ticking = false;

      const update = () => {
        ticking = false;
        const vh = window.innerHeight;
        // Parallax relativ: distanța secțiunii față de centrul ecranului.
        // depth > 0 = stratul „rămâne în urmă” (pare departe), depth < 0 = se mișcă mai repede (pare aproape).
        const factor = isSmall() ? 0.45 : 1; // pe telefon, mișcare mai mică
        scopes.forEach((scope) => {
          const rect = scope.getBoundingClientRect();
          if (rect.bottom < -100 || rect.top > vh + 100) return; // în afara ecranului: nu calculăm
          const offset = -(rect.top + rect.height / 2 - vh / 2);
          scope.querySelectorAll('[data-depth]').forEach((layer) => {
            const depth = parseFloat(layer.dataset.depth);
            layer.style.setProperty('--py', `${(offset * depth * factor * 0.5).toFixed(1)}px`);
          });
        });
      };

      const request = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };

      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', request, { passive: true });
      update();
      cleanups.push(() => {
        window.removeEventListener('scroll', request);
        window.removeEventListener('resize', request);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
