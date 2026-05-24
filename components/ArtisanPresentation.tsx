'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { PHONE_HREF, FACEBOOK_URL, INSTAGRAM_URL, GOOGLE_MAPS_URL } from '@/lib/utils'

export default function ArtisanPresentation() {
  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/artisan.jpg"
                alt="Vincent Cardonna — Artisan couvreur charpentier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute bottom-2 right-3 text-[6px] sm:text-[10px] text-white/30 select-none pointer-events-none">© Robin des Toits</span>
            </div>
          </AnimatedSection>

          {/* Texte */}
          <AnimatedSection delay={0.2}>
            <h2 className="font-artisan font-bold text-4xl text-brun-dark sm:text-5xl">
              Vincent Cardonna
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-brun/60">
              Artisan couvreur charpentier
            </p>
            <p className="mt-6 text-lg leading-relaxed text-neutral-700">
              Artisan couvreur charpentier depuis {new Date().getFullYear() - 2010} ans,
              spécialiste de la rénovation de toiture à Saint-Savinien et en Charente-Maritime.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brun/10 text-brun transition-colors hover:bg-brun hover:text-cream"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brun/10 text-brun transition-colors hover:bg-brun hover:text-cream"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brun/10 text-brun transition-colors hover:bg-brun hover:text-cream"
                aria-label="Google Maps"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <a href={PHONE_HREF} className="btn-call text-base">
                <PhoneIcon />
                Appeler maintenant
              </a>
              <Link href="/contact" className="btn-outline">
                Demander un devis gratuit
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
    </svg>
  )
}
