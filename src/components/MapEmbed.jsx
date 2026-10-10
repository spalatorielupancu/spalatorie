'use client';

import { useState } from 'react';
import { Icon } from './Icons';

// Harta Google se încarcă doar la cerere: pagina rămâne rapidă
// și nu se trimit date la Google până nu apasă vizitatorul.
export default function MapEmbed({ lat, lng, mapsUrl, label }) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

  return (
    <div className="map">
      {loaded ? (
        <iframe
          title={`Hartă — ${label}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map-placeholder">
          <div className="map-grid" aria-hidden="true" />
          <span className="map-pin" aria-hidden="true">
            <Icon name="pin" size={28} />
          </span>
          <p className="map-label">{label}</p>
          <div className="map-actions">
            <button type="button" className="btn btn--gold btn--sm" onClick={() => setLoaded(true)}>
              Afișează harta
            </button>
            <a className="btn btn--ghost btn--sm" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Deschide în Google Maps
            </a>
          </div>
          <p className="map-note">Harta se încarcă de la Google doar dacă apeși butonul.</p>
        </div>
      )}
    </div>
  );
}
