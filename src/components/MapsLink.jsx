'use client';

// Link spre hartă care alege singur aplicația:
// pe iPhone / iPad deschide Apple Maps, în rest (Android, calculator) Google Maps.
// La încărcare (și fără JavaScript) linkul e spre Google Maps; pe iOS se schimbă imediat după afișare.

import { useEffect, useState } from 'react';
import { appleMapsUrl, location } from '@/data/site';

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  // iPadOS se prezintă drept Mac, dar are ecran tactil
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export default function MapsLink({ className, googleLabel, appleLabel, children }) {
  const [apple, setApple] = useState(false);

  useEffect(() => {
    setApple(isIOS());
  }, []);

  return (
    <a className={className} href={apple ? appleMapsUrl : location.mapsUrl} target="_blank" rel="noopener noreferrer">
      {children ?? (apple ? appleLabel : googleLabel)}
    </a>
  );
}
