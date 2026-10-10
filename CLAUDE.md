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
- Paleta: albastru-noapte (`--ink`), auriu șampanie (`--gold`), ivoriu cald (`--paper`). Folosește variabilele CSS, nu culori noi hardcodate.
- Titluri: `--font-display` (Instrument Serif), cu un cuvânt-cheie în `<em>` auriu italic. Text: `--font-sans` (Manrope).
- Secțiunile alternează `section--ink` și `section--paper`.
- Animații: `.reveal`, `.reveal-group` + `.reveal-item`, `data-parallax-scope` + `data-depth`, `data-mouse-depth`, `data-count`. Moderat: premium înseamnă puține efecte, bine făcute.
- Orice animație nouă respectă `prefers-reduced-motion` și nu ascunde conținut dacă JS nu rulează (starea ascunsă doar sub `.js`).
- Mobil întâi: verifică la 390 px lățime, fără scroll orizontal; butonul de apel trebuie să fie mereu ușor de atins.

## SEO
- Metadata în `layout.jsx` (și per pagină), JSON-LD `DryCleaningOrLaundry`, `sitemap.js`, `robots.js`.
- Un singur `<h1>` pe pagină.

## Verificare după modificări
- `npm run build` trebuie să treacă fără erori.
- Nu inventa recenzii, cifre sau afirmații despre firmă. Ce nu e confirmat se marchează cu `TODO`.
