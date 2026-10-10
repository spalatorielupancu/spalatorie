# Spălătoria Lupancu — site de prezentare

Site static făcut cu **Next.js (React)**, exportat ca HTML gata făcut (bun pentru SEO).
Fără backend, fără formulare, fără baze de date. Contactul se face prin telefon, WhatsApp și Facebook.

## Pornire rapidă

Ai nevoie de **Node.js 20.9+** (recomandat 22 LTS).

```bash
npm install        # o singură dată
npm run dev        # http://localhost:3000, se reîncarcă la fiecare modificare
npm run build      # generează site-ul final în folderul out/
npm run preview    # vezi exact varianta finală din out/
```

## Unde modific ce

| Vreau să schimb… | Fișier |
|---|---|
| Telefoane, WhatsApp, Facebook, localități, servicii, texte, poze | `src/data/site.js` |
| Structura paginii (ordinea secțiunilor, titluri mari) | `src/app/page.jsx` |
| Culori, fonturi, spațieri, animații | `src/app/globals.css` (variabilele de la început) |
| Titlul din Google, descrierea, date SEO | `src/app/layout.jsx` |
| Logo | `src/components/Logo.jsx` și `src/app/icon.svg` |
| Efectele de scroll (parallax, reveal, contoare) | `src/components/MotionInit.jsx` |

### Poze
1. Optimizează poza (lățime max. 1600 px, format WebP, sub ~200 KB): https://squoosh.app
2. Pune fișierul în `public/images/`, de ex. `public/images/covor-persan.webp`
3. În `src/data/site.js` scrie `'/images/covor-persan.webp'` în locul link-ului Unsplash.

Pozele actuale sunt gratuite de pe Unsplash (licența permite uz comercial). Înlocuiește-le treptat cu pozele reale.

## ✅ De făcut înainte de lansare

Toate sunt marcate cu `TODO` în cod (caută „TODO” în editor):

- [ ] **Date firmă** (denumire, CUI, Reg. Com.) în `site.js` → `company`. Obligatorii legal.
- [ ] **Link Facebook** real → `facebookUrl`
- [ ] **Domeniul final** → `site.url`
- [ ] Confirmă că **0752 903 725** are WhatsApp
- [ ] Confirmă împărțirea serviciilor **atelier / domiciliu** și lista de **localități**
- [ ] **Poze reale înainte/după** → `beforeAfter`, apoi `demo: false`
- [ ] Logo-ul original (SVG) în locul variantei refăcute
- [ ] Imagine `public/og.jpg` 1200×630 pentru previzualizarea pe WhatsApp/Facebook
- [ ] Verifică vizual fiecare poză Unsplash (să se potrivească cu serviciul)

## Publicare (Cloudflare Pages, gratuit, uz comercial permis)

1. Urcă proiectul pe GitHub (repo **privat**).
2. Cloudflare → Workers & Pages → Create → Pages → conectează repo-ul.
3. Setări build: **Framework:** Next.js (Static HTML Export) · **Build command:** `npm run build` · **Output:** `out`
4. Adaugă variabila de mediu `NODE_VERSION` = `22`.
5. Custom domains → adaugă domeniul și urmează pașii DNS.

De acum, fiecare `git push` publică automat site-ul.

## După lansare

- Google Search Console: adaugă domeniul și trimite `https://DOMENIU/sitemap.xml`
- Google Business Profile: pune link-ul site-ului în fișa firmei
- Testează pe telefon: butonul de apel, WhatsApp, harta
- PageSpeed Insights: https://pagespeed.web.dev

## Ce NU are site-ul (intenționat)

Fără Google Analytics, fără pixeli, fără cookie-uri de urmărire, deci **nu e nevoie de banner de cookies**.
Dacă adaugi oricare dintre ele, actualizează `src/app/confidentialitate/page.jsx` și adaugă un banner.
