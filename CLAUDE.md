# Reguli proiect — Spălătoria Lupancu

Site de prezentare pentru o spălătorie de covoare din Satu Mare, jud. Suceava. Toate textele de pe site sunt în română, cu diacritice corecte (ș, ț cu virgulă, nu cu sedilă).

## Stack (nu schimba fără să întrebi)
- Next.js App Router, `output: 'export'` → site 100% static. Fără backend, API routes, server actions sau baze de date.
- JavaScript (fără TypeScript), CSS simplu în `src/app/globals.css` (fără Tailwind, fără CSS-in-JS).
- Fără biblioteci de animație: efectele sunt în `src/components/MotionInit.jsx` (IntersectionObserver + un singur requestAnimationFrame).
- Fără formulare. Contact doar prin `tel:`, WhatsApp (`wa.me`) și Facebook.
- `next/image` nu se folosește (nu merge la export static); se folosește `<img>` cu `loading="lazy"`, `width`/`height` și `alt` descriptiv în română.

## Date
- Tot conținutul editabil stă în `src/data/site.js`. Nu scrie telefoane, texte de servicii sau URL-uri de poze direct în componente.

## Design
- Direcție: minimalist, alb + albastru-noapte (`--ink`). Fără auriu, fără alte culori de accent. Fundaluri: `--white`, `--mist` (gri-albăstrui foarte deschis), `--ink` la contact și la cardul hărții (footer-ul e un card `--mist` cu colțuri rotunjite). Folosește variabilele CSS, nu culori noi hardcodate.
- Hero (la fel pe telefon și desktop): poză luminoasă sus cu margine curbată (`heroImage`), apoi text albastru pe alb centrat, buton „Sună acum” și link „sau scrie-ne pe WhatsApp”. Totul încape pe primul ecran.
- Header: logo centrat cu meniul împărțit stânga/dreapta pe desktop; transparent peste hero, alb după scroll (`header--solid`); pe paginile fără hero e alb de la început.
- Meniul de pe telefon: panou compact care coboară sub header, cu fundal întunecat în spate (o atingere îl închide).
- Footer minimal: logo + o frază, Contact (telefoane, WhatsApp, adresă), Informații (confidențialitate + ANPC, obligatorii), drepturi. Fără liste de servicii/meniu repetate.
- Facebook apare doar când `facebookUrl` din `site.js` e completat.
- Linkurile mici (footer, numere secundare) au zonă de atingere de ~40 px.
- Logo-ul preia culoarea textului din jur (alb peste hero/footer, albastru pe alb).
- Titluri: `--font-display` (Instrument Serif), cu un cuvânt-cheie în `<em>` italic. Text: `--font-sans` (Manrope).
- Secțiunile alternează `section--white` și `section--mist`; contactul e `section--ink`.
- Animații: `.reveal`, `.reveal-group` + `.reveal-item`, `data-parallax-scope` + `data-depth` (momentan nefolosit), rândurile titlului din hero (`.line`). Moderat: premium înseamnă puține efecte, bine făcute. Fără bandă defilantă sau contoare. Excepție cerută explicit: galeria (`GalleryOrbit.jsx`, cu propriul requestAnimationFrame) — pe desktop „orbită cinematică” legată de scroll (350vh, scenă fixată, parallax fin după mouse la final); pe telefon pozele pornesc ca un teanc și se împrăștie o singură dată în grilă.
- „Serviciile noastre”: listă simplă (număr, titlu, o frază), cu linii fine, fără poze sau interacțiuni. Simplu, nu încărcat. (Secțiunea „De ce noi” a fost scoasă.)
- „Cum lucrăm” (`HowSteps.jsx`, doar HTML + CSS): bilețele prinse în pioneză pe o foaie liniată; pe desktop în zig-zag, legate de o linie punctată animată (CSS), pe telefon mai mici, în zig-zag stânga–dreapta, legate două câte două de curbe punctate; fiecare bilețel apare separat la scroll.
- „Zona” (`LocationCard.jsx`): în stânga text minimalist (titlu, o frază, link spre hartă (`MapsLink.jsx`: pe iPhone/iPad Apple Maps, în rest Google Maps), centrat pe telefon), fără lista localităților (`serviceArea` rămâne doar pentru Google, în JSON-LD); în dreapta un card albastru-noapte (`--ink`) care se înclină după mouse (desktop) și, la apăsare, desenează o hartă stilizată cu pioneză; coordonatele apar atunci sub „Satu Mare, jud. Suceava”. Nu se încarcă hărți Google pe site.
- Orice animație nouă respectă `prefers-reduced-motion` și nu ascunde conținut dacă JS nu rulează (starea ascunsă doar sub `.js`).
- Mobil întâi: verifică la 390 px lățime, fără scroll orizontal; butonul de apel trebuie să fie mereu ușor de atins (pe telefon: iconița de telefon din header, lângă meniu). Fără bare fixe jos pe ecran.

## SEO
- Metadata în `layout.jsx` (și per pagină), JSON-LD `DryCleaningOrLaundry`, `sitemap.js`, `robots.js`.
- Un singur `<h1>` pe pagină.

## Verificare după modificări
- `npm run build` trebuie să treacă fără erori.
- Nu inventa recenzii, cifre sau afirmații despre firmă. Ce nu e confirmat se marchează cu `TODO`.
