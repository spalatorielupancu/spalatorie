// ============================================================
//  TOATE DATELE SITE-ULUI SUNT AICI.
//  Ca să schimbi un telefon, un text sau o poză, modifici doar acest fișier.
//  Rândurile marcate cu "TODO" trebuie confirmate cu clientul înainte de lansare.
// ============================================================

export const site = {
  name: 'Spălătoria Lupancu',
  tagline: 'Spălătorie profesională de covoare',
  url: 'https://spalatorialupancu.ro', // domeniul final (SEO, sitemap, previzualizări); www redirecționează aici
  description:
    'Spălătorie profesională de covoare în Satu Mare, jud. Suceava. Ridicare și livrare la domiciliu, curățare mochetă, canapele și saltele direct la tine acasă.',
  yearsExperience: 8,
};

// Primul număr e cel principal (butonul „Sună acum” și WhatsApp).
export const phones = [
  { display: '0752 903 725', tel: '+40752903725' },
  { display: '0753 833 218', tel: '+40753833218' },
  { display: '0746 383 828', tel: '+40746383828' },
];

export const whatsapp = {
  number: '40752903725', // TODO: confirmă că numărul principal are WhatsApp
  message: 'Bună ziua! Aș dori o programare pentru spălarea covoarelor.',
};
export const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`;

// Meniul site-ului (folosit în header și în footer)
export const navLinks = [
  { href: '/#servicii', label: 'Servicii' },
  { href: '/#galerie', label: 'Galerie' },
  { href: '/#cum-lucram', label: 'Cum lucrăm' },
  { href: '/#zona', label: 'Zona' },
  { href: '/#contact', label: 'Contact' },
];

// TODO: înlocuiește cu link-ul real al paginii de Facebook
// Cât timp e gol, butoanele de Facebook nu apar pe site.
export const facebookUrl = '';

export const location = {
  locality: 'Satu Mare',
  county: 'Suceava',
  country: 'RO',
  street: 'Str. Nicolae Labiș nr. 6', // adresa atelierului (apare în footer și în datele pentru Google)
  lat: 47.8366948,
  lng: 25.992857,
  mapsUrl: 'https://maps.app.goo.gl/aTnDJJHDGhdny8xz5',
};

// Pe iPhone / iPad, linkurile spre hartă deschid Apple Maps (pin pe coordonatele exacte).
export const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(site.name)}&ll=${location.lat},${location.lng}`;

// TODO: confirmă lista de localități pentru ridicare/livrare (nu se afișează pe pagină, e folosită pentru Google)
export const serviceArea = [
  'Satu Mare',
  'Rădăuți',
  'Milișăuți',
  'Bădeuți',
  'Arbore',
  'Dărmănești',
];

// Datele firmei (apar în footer și în pagina de confidențialitate) — din documentele primite de la client
export const company = {
  legalName: 'IVY SRA SRL',
  cui: '40126858',
  regCom: 'J33/2346/2021',
  address: 'Satu Mare nr. 608, jud. Suceava', // sediul social
};

// ------------------------------------------------------------
//  POZE
//  Momentan sunt poze gratuite de pe Unsplash (licență Unsplash: uz comercial
//  permis, fără atribuire obligatorie). Înlocuiește-le treptat cu pozele reale
//  ale clientului: pune fișierul în /public/images/ și scrie aici "/images/nume.webp".
// ------------------------------------------------------------
const unsplash = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

// Hero: poza pe tot ecranul, sub un voal albastru-noapte.
// Cerem de la Unsplash variante deja tăiate: late pentru desktop, înalte pentru telefon (fără poze uriașe).
// heroFocusY = unde e centrată tăietura pe verticală (0 = sus, 1 = jos) — aici, spre covor.
const heroId = 'photo-1534889156217-d643df14f14a'; // sufragerie luminoasă cu un covor oriental roșu
const heroFocusY = 0.62;
const heroCrop = (w, ratio, q) =>
  `https://images.unsplash.com/${heroId}?auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=${heroFocusY}&w=${w}&h=${Math.round(w * ratio)}&q=${q}`;
export const heroImage = {
  src: heroCrop(2400, 0.625, 72),
  srcSet: [1200, 1800, 2400].map((w) => `${heroCrop(w, 0.625, 72)} ${w}w`).join(', '),
  mobileSrcSet: [600, 900].map((w) => `${heroCrop(w, 1.75, 70)} ${w}w`).join(', '),
  alt: 'Sufragerie luminoasă cu un covor oriental roșu, curat',
};

export const images = {
  hero: heroImage.src,
  // previzualizarea pe WhatsApp/Facebook: poza din hero (covorul roșu), tăiată 1200×630, JPG (format citit de toate aplicațiile)
  og: `https://images.unsplash.com/${heroId}?fm=jpg&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=${heroFocusY}&w=1200&h=630&q=80`,
  rugFringe: unsplash('photo-1600166898405-da9535204843'), // covor cu franjuri
  carpet: unsplash('photo-1786361928673-02a91f8c92ac'), // mochetă în lumină laterală
  sofa: unsplash('photo-1686178827149-6d55c72d81df'), // curățare tapițerie
  mattress: unsplash('photo-1759176171441-7afca44a5558'), // saltea matlasată
  car: unsplash('photo-1771491237218-cbd4a707497e'), // detailing interior auto
  blankets: unsplash('photo-1734553529922-bc020a21643b'), // pături împăturite
};

// Galerie — poze gratuite de pe Unsplash (licență Unsplash: uz comercial permis).
// TODO: când primești poze reale (covoare spălate, atelier, livrări), înlocuiește-le aici.
// Primele 6 poze se afișează; prima e cea mare.
export const gallery = [
  { src: unsplash('photo-1768411471062-022bc8d7fa6d', 1400), caption: 'Lumină naturală', alt: 'Covor cu motive florale în lumina soarelui' },
  { src: unsplash('photo-1791340447616-c884551ffc44', 800), caption: 'Culori vii', alt: 'Covor albastru cu motive florale roșii și verzi' },
  { src: unsplash('photo-1762012751357-c3eba1d494e8', 800), caption: 'Model clasic', alt: 'Covor roșu cu model geometric tradițional' },
  { src: unsplash('photo-1760444731155-e01b22bd6501', 800), caption: 'Țesătură modernă', alt: 'Covor galben cu textură, întins pe o podea de lemn' },
  { src: unsplash('photo-1764923519969-1e0d5b50cf8c', 800), caption: 'Culori calde', alt: 'Covor persan cu motive portocalii și albastre' },
  { src: unsplash('photo-1777829760610-dd0accb8818f', 800), caption: 'Model oriental', alt: 'Covor oriental alb cu motive roșii și albastre' },
];

// Înainte / după — se afișează DOAR când există o pereche reală de poze a clientului.
// TODO: completează cu { before: '/images/inainte.webp', after: '/images/dupa.webp', alt: '...' }
export const beforeAfter = null;

// ------------------------------------------------------------
//  SERVICII
//  where: 'atelier'  = se ridică de la domiciliu, se spală la noi, se livrează
//         'domiciliu' = se curăță direct la locuința clientului
//  TODO: confirmă cu clientul împărțirea atelier / domiciliu
// ------------------------------------------------------------
export const services = [
  {
    id: 'covoare',
    where: 'atelier',
    title: 'Covoare de toate tipurile',
    text: 'Persane, din lână, sintetice, shaggy sau din mătase. Spălare în utilaje profesionale, tratare pete și uscare controlată.',
    image: images.rugFringe,
    alt: 'Covor cu franjuri după spălare',
  },
  {
    id: 'paturi',
    where: 'atelier',
    title: 'Pături și pilote',
    text: 'Spălate, igienizate și uscate complet, gata de folosit. Fără mirosuri, fără acarieni.',
    image: images.blankets,
    alt: 'Pături curate împăturite',
  },
  {
    id: 'mocheta',
    where: 'domiciliu',
    title: 'Mochetă lipită',
    text: 'Curățare prin injecție-extracție direct la tine, fără să dezlipim nimic. Potrivit pentru case, birouri și spații comerciale.',
    image: images.carpet,
    alt: 'Curățare profesională a mochetei',
  },
  {
    id: 'canapele',
    where: 'domiciliu',
    title: 'Canapele și scaune',
    text: 'Tapițeria se curăță la fața locului: pete, praf, păr de animale și mirosuri neplăcute.',
    image: images.sofa,
    alt: 'Curățare tapițerie canapea',
  },
  {
    id: 'saltele',
    where: 'domiciliu',
    title: 'Saltele',
    text: 'Curățare în profunzime și igienizare. Ideal pentru alergici și pentru casele cu copii mici.',
    image: images.mattress,
    alt: 'Saltea curățată profesional',
  },
  {
    id: 'auto',
    where: 'domiciliu',
    title: 'Detailing interior auto',
    text: 'Scaune, plafon, mochete și portbagaj. Mașina ta, ca nouă pe dinăuntru.',
    image: images.car,
    alt: 'Detailing interior auto',
  },
];

export const steps = [
  {
    title: 'Ne suni sau ne scrii',
    text: 'Stabilim împreună ce trebuie curățat și ziua care îți convine.',
  },
  {
    title: 'Venim la tine',
    text: 'Ridicăm covoarele de la domiciliu sau curățăm pe loc mocheta și tapițeria.',
  },
  {
    title: 'Spălăm în profunzime',
    text: 'Utilaje profesionale, soluții potrivite fiecărui material, uscare controlată și igienizare.',
  },
  {
    title: 'Îți aducem acasă',
    text: 'Covoarele se întorc curate, uscate și parfumate, gata de pus la loc.',
  },
];

export const features = [
  {
    title: 'Utilaje profesionale',
    text: 'Echipamente dedicate pentru spălare, centrifugare și uscare.',
  },
  {
    title: 'Pete și mirosuri',
    text: 'Tratăm petele vechi și eliminăm mirosurile, nu doar le acoperim.',
  },
  {
    title: 'Uscare și igienizare',
    text: 'Uscare rapidă și completă, fără mucegai sau miros de umezeală.',
  },
  {
    title: 'Ridicare și livrare',
    text: 'Nu cari nimic: venim după covoare și le aducem înapoi.',
  },
];
