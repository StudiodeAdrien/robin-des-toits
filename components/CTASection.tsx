'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PHONE_HREF } from '@/lib/utils'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-brun py-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cream" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-cream" />
      </div>

      <div className="container-tight relative z-10 px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl text-cream sm:text-4xl">
            Un projet de toiture ?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-cream/80">
            Contactez-nous dès aujourd&apos;hui pour un devis gratuit et sans
            engagement. Déplacement rapide sur Saint-Savinien et alentours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={PHONE_HREF} className="btn-call bg-cream text-brun hover:bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
              </svg>
              06 06 44 17 81
            </a>
            <Link
              href="/contact"
              className="btn-outline border-cream/30 text-cream hover:bg-cream hover:text-brun"
            >
              Demander un devis gratuit
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
