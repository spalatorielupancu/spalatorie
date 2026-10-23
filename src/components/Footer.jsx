import { Logo } from './Logo';
import { Icon } from './Icons';
import MapsLink from './MapsLink';
import { company, facebookUrl, location, phones, site, whatsappUrl } from '@/data/site';

// Footer minimal: brand, contact, informații legale (obligatorii) și drepturile de autor.
const infoLinks = [
  { text: 'Politica de confidențialitate', href: '/confidentialitate/' },
  { text: 'ANPC — Soluționarea alternativă a litigiilor', href: 'https://anpc.ro/ce-este-sal/', external: true },
  { text: 'ANPC', href: 'https://anpc.ro/', external: true },
];

const ext = { target: '_blank', rel: 'noopener noreferrer' };

export default function Footer() {
  const year = new Date().getFullYear();
  const hasCompany = company.legalName && company.cui;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="footer-logo" aria-label={`${site.name} — acasă`}>
              <Logo />
            </a>
            <p>
              Spălătorie de covoare în {location.locality}, jud. {location.county}. Ridicare și livrare la domiciliu.
            </p>
            <ul className="footer-social">
              {facebookUrl && (
                <li>
                  <a href={facebookUrl} {...ext} aria-label="Facebook">
                    <Icon name="facebook" size={20} />
                  </a>
                </li>
              )}
              <li>
                <a href={whatsappUrl} {...ext} aria-label="WhatsApp">
                  <Icon name="whatsapp" size={20} />
                </a>
              </li>
              <li>
                <MapsLink>
                  <span className="sr-only">Hartă</span>
                  <Icon name="pin" size={20} />
                </MapsLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Contact</h3>
            <ul className="footer-list footer-contact">
              {phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`}>
                    <Icon name="phone" size={18} />
                    {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={whatsappUrl} {...ext}>
                  <Icon name="whatsapp" size={18} />
                  WhatsApp
                </a>
              </li>
              {facebookUrl && (
                <li>
                  <a href={facebookUrl} {...ext}>
                    <Icon name="facebook" size={18} />
                    Facebook
                  </a>
                </li>
              )}
              <li>
                <MapsLink>
                  <Icon name="pin" size={18} />
                  <address>
                    {location.street && <>{location.street}, </>}
                    {location.locality}, jud. {location.county}
                  </address>
                </MapsLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Informații</h3>
            <ul className="footer-list">
              {infoLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} {...(l.external ? ext : {})}>
                    {l.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} {hasCompany ? company.legalName : site.name}
            {hasCompany && (
              <>
                {' '}· CUI {company.cui}
                {company.regCom && <> · {company.regCom}</>}
              </>
            )}
          </p>
          <p>Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
