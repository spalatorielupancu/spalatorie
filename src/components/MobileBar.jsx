'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icons';

// Bara fixă de jos, doar pe telefon. Apare după ce treci de hero,
// ca să nu dubleze butoanele care sunt deja pe primul ecran.
export default function MobileBar({ tel, whatsappUrl }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`mobile-bar${show ? ' mobile-bar--show' : ''}`}>
      <a href={`tel:${tel}`} className="mobile-bar-call">
        <Icon name="phone" size={20} />
        Sună acum
      </a>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mobile-bar-wa">
        <Icon name="whatsapp" size={20} />
        WhatsApp
      </a>
    </div>
  );
}
