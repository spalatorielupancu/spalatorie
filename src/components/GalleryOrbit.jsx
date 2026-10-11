'use client';

// ============================================================
//  Galeria are două comportamente:
//
//  DESKTOP (≥ 768 px) — „orbită cinematică” (adaptată după CinematicOrbitHero de pe 21st.dev,
//  fără biblioteca `motion`): secțiunea are 350vh, scena rămâne fixată, iar la scroll pozele trec
//  dintr-un teanc într-o elipsă 3D (cele din față mai mari, cele din spate mai mici). La final,
//  pozele urmăresc ușor mouse-ul și se măresc la hover.
//
//  TELEFON — „teanc care se împrăștie”: când galeria intră în ecran, pozele apar strânse ca un
//  teanc în centru, apoi zboară o singură dată în pozițiile din grilă. Fără scroll blocat.
//
//  Fără JavaScript sau cu „Reduce motion”: grila simplă, totul vizibil.
// ============================================================

import { useEffect, useRef } from 'react';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOutCubic = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

// Poziția fiecărei poze pe elipsă (aceeași matematică precum componenta originală)
function orbitConfig(total) {
  const radiusX = 42; // vw
  const radiusY = 15; // vh
  return Array.from({ length: total }, (_, i) => {
    const angle = (i * Math.PI * 2) / total - Math.PI / 2;
    const depth = Math.sin(angle); // -1 (spate) … 1 (față)
    return {
      from: { x: (i - total / 2) * 4, y: (i - total / 2) * 3, rotate: (i - total / 2) * 3 },
      to: {
        x: Math.cos(angle) * radiusX,
        y: Math.sin(angle) * radiusY + 10, // sub text, ca poza din spate să nu acopere titlul
        rotate: Math.cos(angle) * 15,
        scale: 0.8 + depth * 0.25,
      },
      z: Math.round((depth + 1) * 100),
      fog: 0.55 + 0.45 * ((depth + 1) / 2), // pozele din spate sunt puțin estompate
      parallax: 0.2 + Math.round((depth + 1) * 100) / 200, // pozele din față se mișcă mai mult
    };
  });
}

function startOrbit(root, cards, head, glow) {
  root.classList.add('orbit-on');
  const conf = orbitConfig(cards.length);
  const hoverScale = cards.map(() => 1);
  let hovered = -1;
  let smooth = 0; // progresul scroll-ului, netezit
  let px = 0, py = 0, tpx = 0, tpy = 0; // poziția mouse-ului (-1 … 1), netezită
  let raf = null;
  let active = false;

  const onEnter = (i) => () => (hovered = i);
  const onLeave = (i) => () => hovered === i && (hovered = -1);
  const handlers = cards.map((el, i) => {
    const h = { enter: onEnter(i), leave: onLeave(i) };
    el.addEventListener('pointerenter', h.enter);
    el.addEventListener('pointerleave', h.leave);
    return h;
  });

  const onMove = (e) => {
    tpx = (e.clientX / window.innerWidth - 0.5) * 2;
    tpy = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  const frame = () => {
    raf = null;
    if (!active) return;

    const rect = root.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const target = scrollable > 0 ? clamp(-rect.top / scrollable) : 0;
    smooth += (target - smooth) * 0.08;
    const p = clamp((smooth - 0.1) / 0.8);
    const e = easeInOutCubic(p);
    const spread = p > 0.95;

    px += ((spread ? tpx : 0) - px) * 0.05;
    py += ((spread ? tpy : 0) - py) * 0.05;

    cards.forEach((el, i) => {
      const c = conf[i];
      const dx = lerp(c.from.x, c.to.x, e) - px * 5 * c.parallax * p;
      const dy = lerp(c.from.y, c.to.y, e) - py * 5 * c.parallax * p;
      const rot = lerp(c.from.rotate, c.to.rotate, p);
      hoverScale[i] += ((spread && hovered === i ? 1.15 : 1) - hoverScale[i]) * 0.12;
      const s = lerp(0.6, c.to.scale, p) * hoverScale[i];
      el.style.transform = `translate(calc(-50% + ${dx.toFixed(2)}vw), calc(-50% + ${dy.toFixed(2)}vh)) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(3)})`;
      el.style.zIndex = spread && hovered === i ? 999 : c.z;
      el.style.opacity = lerp(1, hovered === i && spread ? 1 : c.fog, p).toFixed(3);
    });

    const textScale = lerp(0.85, 1, p);
    head.style.opacity = clamp((p - 0.2) / 0.6).toFixed(3);
    head.style.transform = `scale(${textScale.toFixed(3)})`;
    if (glow) glow.style.transform = `translate(-50%, -50%) scale(${textScale.toFixed(3)})`;

    raf = requestAnimationFrame(frame);
  };

  // animăm doar cât timp secțiunea e aproape de ecran
  const io = new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
    if (active && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '200px 0px' });
  io.observe(root);

  return () => {
    io.disconnect();
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onMove);
    cards.forEach((el, i) => {
      el.removeEventListener('pointerenter', handlers[i].enter);
      el.removeEventListener('pointerleave', handlers[i].leave);
      el.style.transform = '';
      el.style.zIndex = '';
      el.style.opacity = '';
    });
    head.style.opacity = '';
    head.style.transform = '';
    if (glow) glow.style.transform = '';
    root.classList.remove('orbit-on');
  };
}

function startStack(gallery, cards) {
  // Măsurăm pozițiile finale din grilă ÎNAINTE de a muta pozele în teanc.
  const g = gallery.getBoundingClientRect();
  const cx = g.left + g.width / 2;
  const cy = g.top + Math.min(g.height / 2, window.innerHeight * 0.4); // teancul stă aproape de titlu
  cards.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--i', i);
    el.style.setProperty('--sx', `${(cx - (r.left + r.width / 2)).toFixed(1)}px`);
    el.style.setProperty('--sy', `${(cy - (r.top + r.height / 2)).toFixed(1)}px`);
    el.style.setProperty('--sr', `${(i % 2 ? 1 : -1) * (3 + i * 2)}deg`);
    el.style.setProperty('--ss', ((g.width * 0.56) / r.width).toFixed(3)); // toate cam de aceeași mărime în teanc
  });
  gallery.classList.add('stack-ready');

  let timer;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      gallery.classList.add('stack-show');
      timer = setTimeout(() => gallery.classList.add('stack-go'), 550);
    },
    { threshold: 0.2 }
  );
  io.observe(gallery);

  return () => {
    io.disconnect();
    clearTimeout(timer);
    gallery.classList.remove('stack-ready', 'stack-show', 'stack-go');
    cards.forEach((el) => ['--i', '--sx', '--sy', '--sr', '--ss'].forEach((v) => el.style.removeProperty(v)));
  };
}

export default function GalleryOrbit({ items, children }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const gallery = root.querySelector('.gallery');
    const cards = [...gallery.querySelectorAll('.gallery-item')];
    const head = root.querySelector('.orbit-head');
    const glow = root.querySelector('.orbit-glow');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 768px)');
    if (reduce) return undefined;

    let stop = () => {};
    const start = () => {
      stop();
      stop = desktop.matches ? startOrbit(root, cards, head, glow) : startStack(gallery, cards);
    };
    start();
    desktop.addEventListener('change', start);
    return () => {
      desktop.removeEventListener('change', start);
      stop();
    };
  }, []);

  return (
    <div className="orbit-track" ref={rootRef}>
      <div className="orbit-stage">
        <div className="orbit-glow" aria-hidden="true" />
        <div className="container orbit-head">{children}</div>
        <div className="gallery">
          {items.map((g, i) => (
            <figure key={g.src} className="gallery-item">
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
                width={i === 0 ? 1400 : 800}
                height={i === 0 ? 1050 : 600}
              />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
