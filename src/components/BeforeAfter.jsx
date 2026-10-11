'use client';

import { useState } from 'react';

// Slider „Înainte / După”. Funcționează cu mouse, deget și tastatură
// (input range invizibil deasupra, deci e accesibil și pentru cititoare de ecran).
export default function BeforeAfter({ before, after, alt }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="ba" style={{ '--pos': `${pos}%` }}>
      <img className="ba-img" src={after} alt={`${alt} — după`} loading="lazy" decoding="async" />
      <div className="ba-before" aria-hidden="true">
        <img className="ba-img" src={before} alt="" loading="lazy" decoding="async" />
      </div>

      <span className="ba-label ba-label--before">Înainte</span>
      <span className="ba-label ba-label--after">După</span>

      <div className="ba-handle" aria-hidden="true">
        <span className="ba-knob">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
          </svg>
        </span>
      </div>

      <input
        className="ba-range"
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compară înainte și după"
      />
    </div>
  );
}
