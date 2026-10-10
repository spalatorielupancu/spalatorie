import { Logo } from './Logo';
import { Icon } from './Icons';
import { company, facebookUrl, location, phones, whatsappUrl } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();
  const hasCompany = company.legalName && company.cui;

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Spălătorie profesională de covoare în {location.locality}, jud. {location.county}. Ridicare și livrare la
            domiciliu.
          </p>
          <div className="footer-social">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Icon name="facebook" size={20} />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Icon name="whatsapp" size={20} />
            </a>
            <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Google Maps">
              <Icon name="pin" size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Telefon</h3>
          <ul className="footer-list">
            {phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`}>{p.display}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Informații</h3>
          <ul className="footer-list">
            <li>
              <a href="/confidentialitate/">Politica de confidențialitate</a>
            </li>
            <li>
              <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">
                ANPC — Soluționarea alternativă a litigiilor
              </a>
            </li>
            <li>
              <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer">
                ANPC
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {year} {hasCompany ? company.legalName : 'Spălătoria Lupancu'}
          {hasCompany && (
            <>
              {' '}· CUI {company.cui}
              {company.regCom && <> · {company.regCom}</>}
            </>
          )}
        </p>
        <p>Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
}
