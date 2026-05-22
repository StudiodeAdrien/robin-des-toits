'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const testimonials = [
  {
    name: 'Marie L.',
    text: 'Travail impeccable sur notre toiture. Vincent est un artisan sérieux, ponctuel et très professionnel. Je recommande sans hésitation.',
    rating: 5,
  },
  {
    name: 'Philippe D.',
    text: 'Rénovation complète de notre charpente et couverture. Le résultat est remarquable, un vrai travail d\'artisan. Rapport qualité-prix excellent.',
    rating: 5,
  },
  {
    name: 'Isabelle M.',
    text: 'Intervention rapide pour une fuite sur notre toit. Problème résolu en une demi-journée. Très satisfaite du service et de la réactivité.',
    rating: 5,
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-white" id="avis">
      <div className="container-tight">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brun-light">
            Avis clients
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl">
            Ce que disent nos clients
          </h2>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={itemVariants}
              className="rounded-2xl border border-gris/30 bg-cream p-6"
            >
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber-500">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-neutral-700">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-sm font-semibold text-brun">{t.name}</p>
              <p className="text-xs text-neutral-500">Avis Google</p>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection className="mt-8 text-center" delay={0.2}>
          <a
            href="https://www.google.com/maps/place/Vincent+Cardona+-+Robin+des+Toits/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-brun transition-colors hover:text-brun-dark"
          >
            Voir tous les avis sur Google
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
