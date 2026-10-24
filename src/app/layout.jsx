import { Instrument_Serif, Manrope } from 'next/font/google';
import { preconnect } from 'react-dom';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionInit from '@/components/MotionInit';
import { company, images, location, phones, serviceArea, services, site } from '@/data/site';

// Fonturile se descarcă la build și se servesc de pe site (fără cereri către Google la vizită).
// latin-ext = diacritice românești (ă, â, î, ș, ț).
const display = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Spălătorie covoare ${location.locality}, ${location.county}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: '/',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: images.og, width: 1200, height: 630, alt: `${site.name} — covor curat într-o sufragerie luminoasă` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [images.og],
  },
  formatDetection: { telephone: true },
};

export const viewport = {
  themeColor: '#0B1426',
};

// Date structurate pentru Google (afacere locală)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DryCleaningOrLaundry',
  name: site.name,
  ...(company.legalName && { legalName: company.legalName }),
  ...(company.cui && { taxID: company.cui }),
  description: site.description,
  url: site.url,
  image: images.og,
  telephone: phones.map((p) => p.tel),
  address: {
    '@type': 'PostalAddress',
    ...(location.street && { streetAddress: location.street }),
    addressLocality: location.locality,
    addressRegion: location.county,
    addressCountry: location.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lng },
  hasMap: location.mapsUrl,
  areaServed: serviceArea.map((name) => ({ '@type': 'Place', name })),
  makesOffer: services.map((s) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: s.title },
  })),
};

export default function RootLayout({ children }) {
  // conexiunea spre serverul de poze se deschide din timp, ca poza din hero să apară mai repede
  preconnect('https://images.unsplash.com');

  return (
    <html lang="ro" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        {/* marchează imediat că JS rulează, ca animațiile de apariție să nu „clipească” */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a href="#continut" className="skip-link">
          Sari la conținut
        </a>
        <MotionInit />
        <Header />
        <main id="continut">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
