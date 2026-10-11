'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Icon } from './Icons';
import { navLinks, phones } from '@/data/site';

const links = navLinks;
const left = links.slice(0, 3);
const right = links.slice(3);

// Pe prima pagină, header-ul e transparent peste poza din hero și devine alb la scroll.
// Pe celelalte pagini (fără hero) e alb de la început.
export default function Header() {
  const isHome = usePathname() === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = !isHome || scrolled || open;
  const navList = (items) => (
    <ul>
      {items.map((l) => (
        <li key={l.href}>
          <a href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className={`header${solid ? ' header--solid' : ''}${open ? ' header--open' : ''}`}>
      <div className="container header-inner">
        <nav className="nav nav--left" aria-label="Meniu principal">
          {navList(left)}
        </nav>

        <a href="/" className="header-logo" aria-label="Spălătoria Lupancu — acasă">
          <Logo />
        </a>

        <div className="nav nav--right">
          {navList(right)}
          <a className="btn btn--sm header-call" href={`tel:${phones[0].tel}`}>
            <Icon name="phone" size={16} />
            {phones[0].display}
          </a>
        </div>

        {/* pe telefon: apel rapid (iconiță) + meniu */}
        <div className="header-mobile">
          <a className="header-call-icon" href={`tel:${phones[0].tel}`} aria-label={`Sună acum: ${phones[0].display}`}>
            <Icon name="phone" size={20} />
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="meniu-mobil"
            aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* fundal întunecat în spatele meniului de pe telefon; o atingere îl închide */}
      <div className="menu-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
      <nav id="meniu-mobil" className="mobile-menu" aria-label="Meniu">
        {navList(links)}
        <a className="btn btn--ink mobile-menu-call" href={`tel:${phones[0].tel}`}>
          <Icon name="phone" size={20} />
          Sună acum · {phones[0].display}
        </a>
      </nav>
    </header>
  );
}
