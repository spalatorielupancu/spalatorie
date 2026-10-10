import { LogoMark } from '@/components/Logo';
import { Icon } from '@/components/Icons';
import BeforeAfter from '@/components/BeforeAfter';
import MapEmbed from '@/components/MapEmbed';
import MobileBar from '@/components/MobileBar';
import {
  beforeAfter,
  facebookUrl,
  features,
  images,
  location,
  phones,
  serviceArea,
  services,
  site,
  steps,
  whatsappUrl,
} from '@/data/site';

const atelier = services.filter((s) => s.where === 'atelier');
const domiciliu = services.filter((s) => s.where === 'domiciliu');
const marqueeWords = ['Covoare', 'Mochetă lipită', 'Canapele', 'Saltele', 'Pături', 'Scaune', 'Detailing auto'];

function ServiceCard({ s }) {
  return (
    <article className="service reveal-item">
      <div className="service-media">
        <img src={s.image} alt={s.alt} loading="lazy" decoding="async" width="800" height="600" />
      </div>
      <div className="service-body">
        <h4>{s.title}</h4>
        <p>{s.text}</p>
      </div>
    </article>
  );
}

export default function Home() {
  const main = phones[0];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero" data-parallax-scope>
        <div className="hero-bg layer" data-depth="0.35">
          <img src={images.hero} alt="" fetchPriority="high" decoding="async" />
        </div>
        <div className="hero-veil" aria-hidden="true" />
        <div className="hero-mark layer" data-depth="-0.12" aria-hidden="true">
          <div className="mouse-layer" data-mouse-depth="0.8">
            <LogoMark draw />
          </div>
        </div>

        <div className="container hero-content">
          <p className="eyebrow hero-in" style={{ '--d': '0.1s' }}>
            {site.name} · {location.locality}, jud. {location.county}
          </p>
          <h1 className="hero-title hero-in" style={{ '--d': '0.25s' }}>
            Covoare curate,
            <br />
            <em>casă sănătoasă.</em>
          </h1>
          <p className="hero-lead hero-in" style={{ '--d': '0.4s' }}>
            Spălăm covoare de toate tipurile în utilaje profesionale și curățăm mochete, canapele și saltele direct la
            tine acasă. Ridicăm și livrăm la domiciliu.
          </p>
          <div className="hero-actions hero-in" style={{ '--d': '0.55s' }}>
            <a className="btn btn--gold" href={`tel:${main.tel}`}>
              <Icon name="phone" size={20} />
              Sună acum · {main.display}
            </a>
            <a className="btn btn--ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={20} />
              Scrie-ne pe WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-badge hero-in" style={{ '--d': '0.8s' }}>
          <div className="mouse-layer" data-mouse-depth="-0.5">
            <span className="hero-badge-inner">
              <Icon name="truck" size={22} />
              Ridicare și livrare
              <br />
              la domiciliu
            </span>
          </div>
        </div>

        <a href="#servicii" className="scroll-hint" aria-label="Mergi la servicii">
          <span />
        </a>
      </section>

      {/* ================= CIFRE ================= */}
      <section className="stats" aria-label="Pe scurt">
        <div className="container stats-grid reveal-group">
          <div className="stat reveal-item">
            <span className="stat-num">
              <span data-count={site.yearsExperience}>{site.yearsExperience}</span>+
            </span>
            <span className="stat-label">ani de experiență</span>
          </div>
          <div className="stat reveal-item">
            <span className="stat-num">Sute</span>
            <span className="stat-label">de clienți mulțumiți</span>
          </div>
          <div className="stat reveal-item">
            <span className="stat-num">
              <span data-count={services.length}>{services.length}</span>
            </span>
            <span className="stat-label">tipuri de servicii</span>
          </div>
          <div className="stat reveal-item">
            <span className="stat-num">
              <Icon name="home" size={34} />
            </span>
            <span className="stat-label">la atelier sau la tine acasă</span>
          </div>
        </div>
      </section>

      {/* ================= SERVICII ================= */}
      <section id="servicii" className="section section--paper">
        <div className="container">
          <header className="section-head reveal">
            <p className="eyebrow eyebrow--dark">Serviciile noastre</p>
            <h2>
              Tot ce e textil în casă, <em>curat ca nou.</em>
            </h2>
            <span className="rule" aria-hidden="true" />
          </header>

          <div className="service-group">
            <div className="service-group-head reveal">
              <span className="service-group-icon">
                <Icon name="truck" />
              </span>
              <div>
                <h3>Ridicăm, spălăm, livrăm</h3>
                <p>Venim după ele, le spălăm la atelier și ți le aducem înapoi curate și uscate.</p>
              </div>
            </div>
            <div className="services-grid services-grid--2 reveal-group">
              {atelier.map((s) => (
                <ServiceCard key={s.id} s={s} />
              ))}
            </div>
          </div>

          <div className="service-group">
            <div className="service-group-head reveal">
              <span className="service-group-icon">
                <Icon name="home" />
              </span>
              <div>
                <h3>Venim la tine acasă</h3>
                <p>Curățăm profesional, direct la locuința ta, ce nu se poate muta.</p>
              </div>
            </div>
            <div className="services-grid reveal-group">
              {domiciliu.map((s) => (
                <ServiceCard key={s.id} s={s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BANDĂ ================= */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="marquee-set">
              {marqueeWords.map((w) => (
                <span key={w + k}>
                  {w}
                  <LogoMark className="marquee-mark" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ================= ÎNAINTE / DUPĂ ================= */}
      <section id="rezultate" className="section section--ink">
        <div className="container results">
          <div className="results-text reveal">
            <p className="eyebrow">Rezultate</p>
            <h2>
              Diferența se vede <em>din prima.</em>
            </h2>
            <p className="lead-dim">
              Trage de bara din mijloc ca să compari. Petele vechi, praful din profunzime și mirosurile pleacă, iar
              culorile își recapătă viața.
            </p>
            <ul className="checks">
              <li>Îndepărtarea petelor și a mirosurilor neplăcute</li>
              <li>Uscare rapidă și igienizare completă</li>
              <li>Soluții potrivite fiecărui tip de material</li>
            </ul>
          </div>
          <div className="reveal">
            <BeforeAfter {...beforeAfter} />
          </div>
        </div>
      </section>

      {/* ================= CUM LUCRĂM ================= */}
      <section id="cum-lucram" className="section section--paper">
        <div className="container how">
          <div className="how-pin">
            <p className="eyebrow eyebrow--dark">Cum lucrăm</p>
            <h2>
              Simplu, <em>în patru pași.</em>
            </h2>
            <p className="lead-dark">Tu ne suni, noi ne ocupăm de rest. Fără să cari nimic, fără bătăi de cap.</p>
            <a className="btn btn--ink" href={`tel:${main.tel}`}>
              <Icon name="phone" size={20} />
              Programează-te
            </a>
          </div>
          <ol className="how-steps">
            {steps.map((st, i) => (
              <li key={st.title} className="how-step reveal">
                <span className="how-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= DE CE NOI ================= */}
      <section className="section section--ink why" data-parallax-scope>
        <div className="why-mark layer" data-depth="0.25" aria-hidden="true">
          <LogoMark />
        </div>
        <div className="container">
          <header className="section-head section-head--center reveal">
            <p className="eyebrow">De ce noi</p>
            <h2>
              {site.yearsExperience} ani de <em>calitate, experiență și încredere.</em>
            </h2>
          </header>
          <div className="features reveal-group">
            {features.map((f) => (
              <div key={f.title} className="feature reveal-item">
                <span className="feature-icon">
                  <Icon name={f.icon} size={26} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ZONA ================= */}
      <section id="zona" className="section section--paper">
        <div className="container zone">
          <div className="reveal">
            <p className="eyebrow eyebrow--dark">Zona deservită</p>
            <h2>
              {location.locality} <em>și împrejurimi.</em>
            </h2>
            <p className="lead-dark">
              Ridicăm și livrăm covoarele la domiciliu în {location.locality} (jud. {location.county}) și în
              localitățile din jur. Nu-ți vezi localitatea? Sună-ne și găsim o soluție.
            </p>
            <ul className="chips">
              {serviceArea.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <MapEmbed
              lat={location.lat}
              lng={location.lng}
              mapsUrl={location.mapsUrl}
              label={`${site.name} · ${location.locality}, jud. ${location.county}`}
            />
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="section section--ink contact" data-parallax-scope>
        <div className="contact-glow layer" data-depth="0.3" aria-hidden="true" />
        <div className="container contact-inner reveal">
          <LogoMark className="contact-mark" draw />
          <p className="eyebrow">Programări</p>
          <h2>
            Covoare curate, <em>fără efort.</em>
          </h2>
          <p className="lead-dim">Sună-ne sau scrie-ne pe WhatsApp. Stabilim împreună ziua ridicării.</p>

          <div className="contact-phones">
            {phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="contact-phone">
                <Icon name="phone" size={20} />
                {p.display}
              </a>
            ))}
          </div>

          <div className="contact-actions">
            <a className="btn btn--gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={20} />
              WhatsApp
            </a>
            <a className="btn btn--ghost" href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="facebook" size={20} />
              Facebook
            </a>
            <a className="btn btn--ghost" href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" size={20} />
              Recenzii pe Google
            </a>
          </div>
        </div>
      </section>

      {/* ================= BARĂ FIXĂ PE TELEFON ================= */}
      <MobileBar tel={main.tel} whatsappUrl={whatsappUrl} />
    </>
  );
}
