import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCallButton from '@/components/FloatingCallButton'
import SmoothScroll from '@/components/SmoothScroll'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const theArtisan = localFont({
  src: '../public/fonts/the-artisan.otf',
  variable: '--font-artisan',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://robindestoits.fr'),
  title: {
    default: 'Robin des Toits — Couvreur Charpentier à Saint-Savinien',
    template: '%s | Robin des Toits',
  },
  description:
    'Artisan couvreur charpentier spécialiste de la rénovation de toiture à Saint-Savinien et en Charente-Maritime. Plus de 15 ans d\'expérience. Devis gratuit.',
  keywords: [
    'couvreur Saint-Savinien',
    'charpentier Saint-Savinien',
    'rénovation toiture Charente-Maritime',
    'zinguerie Saintes',
    'terrasse bois Charente-Maritime',
    'couvreur Saintes',
    'charpentier Rochefort',
    'toiture Saint-Jean-d\'Angély',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Robin des Toits',
    title: 'Robin des Toits — Couvreur Charpentier à Saint-Savinien',
    description:
      'Artisan couvreur charpentier spécialiste de la rénovation de toiture à Saint-Savinien et en Charente-Maritime. Devis gratuit.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: 'Robin des Toits',
    description:
      'Artisan couvreur charpentier spécialiste de la rénovation de toiture à Saint-Savinien et en Charente-Maritime.',
    url: 'https://robindestoits.fr',
    telephone: '+33606441781',
    email: '82@neuf.fr',
    founder: {
      '@type': 'Person',
      name: 'Vincent Cardonna',
    },
    foundingDate: '2010-10-21',
    areaServed: [
      { '@type': 'City', name: 'Saint-Savinien' },
      { '@type': 'City', name: 'Saintes' },
      { '@type': 'City', name: 'Rochefort' },
      { '@type': 'City', name: 'Saint-Jean-d\'Angély' },
      { '@type': 'City', name: 'Tonnay-Charente' },
      { '@type': 'City', name: 'Pont-l\'Abbé-d\'Arnoult' },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.1895203,
      longitude: 1.2853849,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de couverture et charpente',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rénovation de toiture' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Charpente' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Couverture' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Zinguerie' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ossature bois' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pergolas' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Terrasses bois' } },
      ],
    },
    identifier: {
      '@type': 'PropertyValue',
      name: 'SIRET',
      value: '527 744 957',
    },
  }

  return (
    <html lang="fr" className={`${dmSans.variable} ${dmSerif.variable} ${theArtisan.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  )
}
