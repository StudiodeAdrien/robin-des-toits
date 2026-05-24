'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MorphingText } from './ui/morphing-text'

const specialites = [
  'de la rénovation de votre <strong>toiture</strong>',
  'de votre <strong>charpente</strong>',
  'de la <strong>couverture</strong> de votre toiture',
  'de votre <strong>zinguerie</strong>',
  'de votre prochaine <strong>pergola</strong>',
  'de votre future <strong>terrasse en bois</strong>',
]

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/realisations/couverture/hero.jpg"
          alt="Toiture rénovée par Robin des Toits"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brun-dark/90 via-brun-dark/70 to-brun-dark/40" />
        <span className="absolute bottom-2 right-3 text-[6px] sm:text-[10px] text-white/20 select-none pointer-events-none z-10">© Robin des Toits</span>
      </div>

      <div className="relative z-10 text-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="font-artisan font-bold text-6xl leading-tight text-cream sm:text-7xl lg:text-9xl">
            Robin des Toits
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6"
          >
            <p className="text-xl text-cream/80 sm:text-2xl lg:text-3xl">
              Spécialiste
              <MorphingText
                texts={specialites}
                className="block h-[1.2em] w-full text-center sm:inline-block sm:w-[22ch] sm:translate-y-[0.26em] sm:align-baseline sm:text-left lg:w-[24ch] [&_strong]:font-bold [&_strong]:text-cream"
              />
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
