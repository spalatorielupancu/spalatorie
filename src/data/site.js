// ============================================================
//  TOATE DATELE SITE-ULUI SUNT AICI.
//  Ca să schimbi un telefon, un text sau o poză, modifici doar acest fișier.
//  Rândurile marcate cu "TODO" trebuie confirmate cu clientul înainte de lansare.
// ============================================================

export const site = {
  name: 'Spălătoria Lupancu',
  tagline: 'Spălătorie profesională de covoare',
  // TODO: domeniul final (folosit pentru SEO, sitemap și previzualizările pe WhatsApp/Facebook)
  url: 'https://www.spalatorialupancu.ro',
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

// TODO: înlocuiește cu link-ul real al paginii de Facebook
export const facebookUrl = 'https://www.facebook.com/';

export const location = {
  locality: 'Satu Mare',
  county: 'Suceava',
  country: 'RO',
  // TODO: adresa exactă (stradă, număr), dacă vrea să fie afișată
  street: '',
  lat: 47.8366948,
  lng: 25.992857,
  mapsUrl:
    'https://www.google.com/maps/place/Spalatoria+Lupancu/@47.8367087,25.9825573,15z/data=!4m6!3m5!1s0x4734456697e3c335:0xf3dafa264248813f!8m2!3d47.8366948!4d25.992857',
};

// TODO: confirmă lista de localități pentru ridicare/livrare
export const serviceArea = [
  'Satu Mare',
  'Rădăuți',
  'Milișăuți',
  'Bădeuți',
  'Arbore',
  'Dărmănești',
];

// TODO: date firmă — OBLIGATORII în footer înainte de lansare
export const company = {
  legalName: '', // ex: LUPANCU SERV SRL
  cui: '', // ex: RO12345678
  regCom: '', // ex: J33/123/2018
};

// ------------------------------------------------------------
//  POZE
//  Momentan sunt poze gratuite de pe Unsplash (licență Unsplash: uz comercial
//  permis, fără atribuire obligatorie). Înlocuiește-le treptat cu pozele reale
//  ale clientului: pune fișierul în /public/images/ și scrie aici "/images/nume.webp".
// ------------------------------------------------------------
const unsplash = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

export const images = {
  hero: unsplash('photo-1531162805941-58330188d75c', 1800), // covor cu motive florale albastre/verzi
  rug: unsplash('photo-1660394585016-508f949df960'), // covor persan roșu
  rugFringe: unsplash('photo-1600166898405-da9535204843'), // covor cu franjuri
  carpetClean: unsplash('photo-1742483359033-13315b247c74'), // persoană care curăță un covor
  vacuum: unsplash('photo-1527515637462-cff94eecc1ac'), // aspirare covor
  sofa: unsplash('photo-1686178827149-6d55c72d81df'), // curățare tapițerie
  mattress: unsplash('photo-1759176171441-7afca44a5558'), // saltea matlasată
  car: unsplash('photo-1771491237218-cbd4a707497e'), // detailing interior auto
  blankets: unsplash('photo-1734553529922-bc020a21643b'), // pături împăturite
};

// Înainte / după — TODO: înlocuiește cu o pereche REALĂ de poze ale clientului
// și setează demo: false. Cât timp demo e true, pe imagine apare eticheta „Imagine demonstrativă”.
export const beforeAfter = {
  demo: true,
  before: images.rug,
  after: images.rug,
  alt: 'Covor persan înainte și după spălarea profesională',
};

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
    image: images.vacuum,
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
    icon: 'shield',
    title: 'Utilaje profesionale',
    text: 'Echipamente dedicate pentru spălare, centrifugare și uscare.',
  },
  {
    icon: 'spark',
    title: 'Pete și mirosuri',
    text: 'Tratăm petele vechi și eliminăm mirosurile, nu doar le acoperim.',
  },
  {
    icon: 'waves',
    title: 'Uscare și igienizare',
    text: 'Uscare rapidă și completă, fără mucegai sau miros de umezeală.',
  },
  {
    icon: 'truck',
    title: 'Ridicare și livrare',
    text: 'Nu cari nimic: venim după covoare și le aducem înapoi.',
  },
];
