import { Icon } from '@/components/Icons';
import BeforeAfter from '@/components/BeforeAfter';
import GalleryOrbit from '@/components/GalleryOrbit';
import HowSteps from '@/components/HowSteps';
import LocationCard from '@/components/LocationCard';
import MapsLink from '@/components/MapsLink';
import {
  beforeAfter,
  facebookUrl,
  gallery,
  heroImage,
  location,
  phones,
  services,
  steps,
  whatsappUrl,
} from '@/data/site';

export default function Home() {
  const [main, ...otherPhones] = phones;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src={heroImage.src}
            srcSet={heroImage.srcSet}
            sizes="100vw"
            alt={heroImage.alt}
            fetchPriority="high"
            decoding="async"
            width="2400"
            height="3000"
          />
        </div>
        <div className="hero-veil" aria-hidden="true" />

        <div className="container hero-content">
          <p className="eyebrow hero-in" style={{ '--d': '0.1s' }}>
            <span>
              <span className="hide-sm">Spălătorie de covoare · </span>
              {location.locality}, jud. {location.county}
            </span>
          </p>
          <h1 className="hero-title">
            <span className="line">
              <span style={{ '--d': '0.2s' }}>Covoare curate,</span>
            </span>{' '}
            <span className="line">
              <span style={{ '--d': '0.32s' }}>
                <em>casă sănătoasă.</em>
              </span>
            </span>
          </h1>
          <p className="hero-lead hero-in" style={{ '--d': '0.5s' }}>
            Spălăm covoare în utilaje profesionale și curățăm mochete, canapele și saltele la tine acasă. Ridicăm și
            livrăm la domiciliu.
          </p>
          <a className="btn btn--ink hero-call hero-in" style={{ '--d': '0.62s' }} href={`tel:${main.tel}`}>
            <Icon name="phone" size={20} />
            <span>
              Sună acum<span className="hide-sm"> · {main.display}</span>
            </span>
          </a>
          <a className="hero-wa hero-in" style={{ '--d': '0.72s' }} href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            sau scrie-ne pe <strong>WhatsApp</strong>
          </a>
        </div>
      </section>

      {/* ================= SERVICII ================= */}
      <section id="servicii" className="section section--white">
        <div className="container">
          <header className="section-head reveal">
            <p className="eyebrow">Serviciile noastre</p>
            <h2>
              Tot ce e textil în casă, <em>curat ca nou.</em>
            </h2>
            <p className="lead">Covoarele și păturile le ridicăm și le spălăm la atelier. Restul le curățăm la tine acasă.</p>
          </header>

          <ol className="svc-list reveal-group">
            {services.map((sv, i) => (
              <li key={sv.id} className="svc-row reveal-item">
                <span className="svc-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="svc-title">{sv.title}</h3>
                <p className="svc-text">{sv.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= GALERIE ================= */}
      <section id="galerie" className="section section--mist gallery-section">
        <GalleryOrbit items={gallery.slice(0, 6)}>
          <p className="eyebrow">Galerie</p>
          <h2>
            Frumusețea e în <em>detalii.</em>
          </h2>
          <p className="lead">
            Lână, mătase, culori naturale. Fiecare covor e tratat cu soluții potrivite materialului lui, ca să-și
            păstreze textura și culorile.
          </p>
        </GalleryOrbit>

        {beforeAfter && (
          <div className="container results reveal">
            <div>
              <p className="eyebrow">Înainte și după</p>
              <p className="lead">Trage de bara din mijloc ca să compari.</p>
            </div>
            <BeforeAfter {...beforeAfter} />
          </div>
        )}
      </section>

      {/* ================= CUM LUCRĂM ================= */}
      <section id="cum-lucram" className="section section--white how-section">
        <div className="container">
          <header className="section-head section-head--center reveal">
            <p className="eyebrow">Cum lucrăm</p>
            <h2>
              Simplu, <em>în patru pași.</em>
            </h2>
            <p className="lead">Tu ne suni, noi ne ocupăm de rest. Fără să cari nimic, fără bătăi de cap.</p>
          </header>

          <HowSteps steps={steps} />

          <div className="how-cta reveal">
            <a className="btn btn--ink" href={`tel:${main.tel}`}>
              <Icon name="phone" size={20} />
              Programează-te
            </a>
          </div>
        </div>
      </section>

      {/* ================= ZONA ================= */}
      <section id="zona" className="section section--mist">
        <div className="container zone">
          <div className="zone-text reveal">
            <p className="eyebrow">Zona deservită</p>
            <h2>
              {location.locality} <em>și împrejurimi.</em>
            </h2>
            <p className="lead">
              Ridicăm covoarele de acasă și ți le aducem înapoi curate, în {location.locality} și în localitățile din
              jur.
            </p>
            <p className="zone-links">
              <MapsLink googleLabel="Vezi pe Google Maps ↗" appleLabel="Vezi în Apple Maps ↗" />
            </p>
          </div>
          <div className="reveal">
            <LocationCard label={`${location.locality}, jud. ${location.county}`} lat={location.lat} lng={location.lng} />
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="section section--ink contact">
        <div className="contact-glow" aria-hidden="true" />
        <div className="container contact-inner reveal">
          <p className="eyebrow eyebrow--light">Programări</p>
          <h2>
            Programează <em>ridicarea.</em>
          </h2>
          <p className="lead lead--light">Sună-ne sau scrie-ne pe WhatsApp. Stabilim împreună ziua care îți convine.</p>

          <a href={`tel:${main.tel}`} className="contact-phone">
            {main.display}
          </a>
          {otherPhones.length > 0 && (
            <p className="contact-alt">
              sau{' '}
              {otherPhones.map((p, i) => (
                <span key={p.tel}>
                  {i > 0 && ' · '}
                  <a href={`tel:${p.tel}`}>{p.display}</a>
                </span>
              ))}
            </p>
          )}

          <div className="contact-actions">
            <a className="btn btn--light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={20} />
              WhatsApp
            </a>
            {facebookUrl && (
              <a className="btn btn--ghost" href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="facebook" size={20} />
                Facebook
              </a>
            )}
            <a className="btn btn--ghost" href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" size={20} />
              Recenzii pe Google
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
