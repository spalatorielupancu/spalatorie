'use client';

// ============================================================
//  Efectele de mișcare ale site-ului, adaptate din „TEHNICI WEB”:
//   1. Reveal la scroll (IntersectionObserver) + stagger în cascadă
//   2. Parallax în straturi — calculat RELATIV la secțiune, nu la toată pagina
//   3. Parallax cu mouse-ul (doar desktop)
//   4. Progress bar de scroll
//   5. Contoare animate
//
//  Reguli:
//   - totul trece printr-un singur requestAnimationFrame (fluid, fără „jank”)
//   - cine are „Reduce motion” activat în sistem nu primește mișcare
//   - fără JavaScript, conținutul rămâne vizibil (clasa .js se pune abia aici)
// ============================================================

import { useEffect } from 'react';

export default function MotionInit() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
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
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );
      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // ---------- 5. Contoare ----------
    const counters = document.querySelectorAll('[data-count]');
    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = Number(el.dataset.count);
          countIO.unobserve(el);
          if (reduce) {
            el.textContent = target;
            return;
          }
          const start = performance.now();
          const dur = 1400;
          const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => countIO.observe(el));
    cleanups.push(() => countIO.disconnect());

    // ---------- 2/3/4. Scroll + mouse într-un singur rAF ----------
    const bar = document.getElementById('scroll-progress');
    const scopes = reduce ? [] : [...document.querySelectorAll('[data-parallax-scope]')];
    const mouseLayers = reduce || !finePointer ? [] : [...document.querySelectorAll('[data-mouse-depth]')];
    const isSmall = () => window.innerWidth < 760;

    let mx = 0;
    let my = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;

      if (bar) {
        const max = document.documentElement.scrollHeight - vh;
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }

      // Parallax relativ: distanța secțiunii față de centrul ecranului.
      // depth > 0 = stratul „rămâne în urmă” (pare departe), depth < 0 = se mișcă mai repede (pare aproape).
      // Pentru hero, offset = 0 la încărcare, deci nimic nu e deplasat la început.
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

      mouseLayers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.mouseDepth);
        layer.style.setProperty('--mx', `${(mx * depth * 24).toFixed(1)}px`);
        layer.style.setProperty('--my', `${(my * depth * 24).toFixed(1)}px`);
      });
    };

    const request = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      request();
    };

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    if (mouseLayers.length) window.addEventListener('mousemove', onMouse, { passive: true });
    update();

    cleanups.push(() => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      window.removeEventListener('mousemove', onMouse);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <div id="scroll-progress" aria-hidden="true" />;
}
