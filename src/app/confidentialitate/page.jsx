import { company, phones, site } from '@/data/site';

export const metadata = {
  title: 'Politica de confidențialitate',
  description: `Cum tratează ${site.name} datele personale.`,
  alternates: { canonical: '/confidentialitate/' },
};

// TODO: dacă adaugi Google Analytics, Facebook Pixel sau un formular,
// pagina trebuie actualizată și trebuie adăugat un banner de cookies.
export default function Confidentialitate() {
  const operator = company.legalName || site.name;

  return (
    <section className="page">
      <div className="container">
        <p className="eyebrow eyebrow--dark">Informații legale</p>
        <h1>Politica de confidențialitate</h1>

        <p>
          Acest site aparține {operator}
          {company.cui && <>, CUI {company.cui}</>}
          {company.regCom && <>, {company.regCom}</>}
          {company.address && <>, cu sediul în {company.address}</>}. Respectăm Regulamentul (UE) 2016/679 (GDPR).
        </p>

        <h2>Ce date colectăm</h2>
        <p>
          Site-ul nu conține formulare, nu folosește cookie-uri de urmărire și nu colectează date personale. Nu folosim
          Google Analytics și nici pixeli de publicitate.
        </p>

        <h2>Când ne contactezi</h2>
        <p>
          Dacă ne suni sau ne scrii pe WhatsApp, folosim numărul și informațiile pe care ni le dai doar pentru a stabili
          programarea, ridicarea și livrarea. Nu le transmitem altor persoane și nu le folosim în scop de marketing.
        </p>

        <h2>Servicii externe</h2>
        <ul>
          <li>
            <strong>Hărți</strong>: site-ul nu încarcă hărți. Linkurile spre hartă deschid Google Maps sau, pe iPhone și
            iPad, Apple Maps; fiecare are propria politică de confidențialitate.
          </li>
          <li>
            <strong>WhatsApp și Facebook</strong>: linkurile deschid aplicațiile respective, care au propriile politici.
          </li>
          <li>
            <strong>Imagini</strong>: unele fotografii sunt încărcate de pe serverele Unsplash.
          </li>
        </ul>

        <h2>Drepturile tale</h2>
        <p>
          Poți cere oricând accesul la datele tale, corectarea sau ștergerea lor, sunând la {phones[0].display}. Ai
          dreptul să depui plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal
          (www.dataprotection.ro).
        </p>
      </div>
    </section>
  );
}
