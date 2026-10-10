'use client';

import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Icon } from './Icons';
import { phones } from '@/data/site';

const links = [
  { href: '/#servicii', label: 'Servicii' },
  { href: '/#cum-lucram', label: 'Cum lucrăm' },
  { href: '/#rezultate', label: 'Rezultate' },
  { href: '/#zona', label: 'Zona' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
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

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}${open ? ' header--open' : ''}`}>
      <div className="container header-inner">
        <a href="/" className="header-logo" aria-label="Spălătoria Lupancu — acasă">
          <Logo />
        </a>

        <nav className="nav" aria-label="Meniu principal">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--gold btn--sm nav-call" href={`tel:${phones[0].tel}`}>
            <Icon name="phone" size={18} />
            {phones[0].display}
          </a>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
}
