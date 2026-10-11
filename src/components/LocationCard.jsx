'use client';

// Card de locație (adaptat după „LocationMap / expand-map” de pe 21st.dev, fără framer-motion):
//  - închis: card minimalist cu grilă fină, localitatea și o linie care crește la hover;
//  - pe desktop se înclină ușor după mouse (3D);
//  - la apăsare se mărește și „desenează” o hartă stilizată: străzi, clădiri, pioneza care cade.
//  Linkul spre Google Maps stă în textul secțiunii, nu sub card.

import { useRef, useState } from 'react';

// Hartă stilizată (nu e harta reală a zonei): străzi principale și secundare, în procente
const MAIN_ROADS = [
  { x1: 0, y1: 35, x2: 100, y2: 35 },
  { x1: 0, y1: 65, x2: 100, y2: 65 },
  { x1: 30, y1: 0, x2: 30, y2: 100 },
  { x1: 70, y1: 0, x2: 70, y2: 100 },
];
const STREETS = [
  ...[20, 50, 80].map((y) => ({ x1: 0, y1: y, x2: 100, y2: y })),
  ...[15, 45, 55, 85].map((x) => ({ x1: x, y1: 0, x2: x, y2: 100 })),
];
const BUILDINGS = [
  { top: 40, left: 10, w: 15, h: 20 },
  { top: 15, left: 35, w: 12, h: 15 },
  { top: 70, left: 75, w: 18, h: 18 },
  { top: 20, left: 80, w: 10, h: 25 },
  { top: 55, left: 5, w: 8, h: 12 },
  { top: 8, left: 50, w: 12, h: 10 },
];


export default function LocationCard({ label, lat, lng }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  // înclinare 3D după mouse (doar pe dispozitive cu mouse; pe telefon nu se declanșează)
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    cardRef.current.style.setProperty('--rx', `${(-dy * 6).toFixed(2)}deg`);
    cardRef.current.style.setProperty('--ry', `${(dx * 6).toFixed(2)}deg`);
  };
  const onLeave = () => {
    cardRef.current.style.setProperty('--rx', '0deg');
    cardRef.current.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="loc">
      <div className="loc-scene" onPointerMove={onMove} onPointerLeave={onLeave}>
        <button
          ref={cardRef}
          type="button"
          className={`loc-card${expanded ? ' is-open' : ''}`}
          aria-expanded={expanded}
          aria-label={`${label}. ${expanded ? 'Micșorează harta' : 'Mărește harta'}`}
          title={expanded ? 'Micșorează' : 'Mărește harta'}
          onClick={() => setExpanded((v) => !v)}
        >
          <span className="loc-grid" aria-hidden="true" />

          {/* harta stilizată, desenată la deschidere */}
          <span className="loc-map" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              {STREETS.map((l, i) => (
                <line key={`s${i}`} {...l} pathLength="1" className="loc-street" style={{ '--d': `${0.6 + i * 0.08}s` }} />
              ))}
              {MAIN_ROADS.map((l, i) => (
                <line key={`m${i}`} {...l} pathLength="1" className="loc-road" style={{ '--d': `${0.2 + i * 0.1}s` }} />
              ))}
            </svg>
            {BUILDINGS.map((b, i) => (
              <span
                key={i}
                className="loc-building"
                style={{
                  top: `${b.top}%`,
                  left: `${b.left}%`,
                  width: `${b.w}%`,
                  height: `${b.h}%`,
                  '--d': `${0.5 + i * 0.05}s`,
                }}
              />
            ))}
            <span className="loc-pin">
              <svg viewBox="0 0 24 24" width="36" height="36">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <span className="loc-fade" />
          </span>

          <span className="loc-top" aria-hidden="true">
            <svg className="loc-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" x2="9" y1="3" y2="18" />
              <line x1="15" x2="15" y1="6" y2="21" />
            </svg>
            <span className="loc-chip">
              <span className="loc-dot" />
              {expanded ? 'Închide' : 'Deschide harta'}
            </span>
          </span>

          <span className="loc-bottom">
            <span className="loc-label">{label}</span>
            <span className="loc-coords">
              {lat.toFixed(4)}° N · {lng.toFixed(4)}° E
            </span>
            <span className="loc-line" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  );
}
