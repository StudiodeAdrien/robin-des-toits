'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const previewImages = [
  { src: '/images/realisations/couverture/couverture-1.jpg', alt: 'Rénovation de couverture' },
  { src: '/images/realisations/charpente/charpente-1.jpg', alt: 'Travaux de charpente' },
  { src: '/images/realisations/zinguerie/zinguerie-1.jpg', alt: 'Travaux de zinguerie' },
  { src: '/images/realisations/charpente/pergola-1.jpg', alt: 'Réalisation pergola bois' },
]

export default function GalleryPreview() {
  return (
    <section className="section-padding bg-white" id="realisations">
      <div className="container-tight">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brun-light">
            Nos réalisations
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl">
            Aperçu de nos chantiers
          </h2>
        </AnimatedSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {previewImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brun-dark/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <p className="absolute bottom-3 left-3 text-sm font-medium text-cream opacity-0 transition-opacity group-hover:opacity-100">
                {img.alt}
              </p>
            </motion.div>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center" delay={0.2}>
          <Link href="/galerie" className="btn-outline">
            Voir toutes nos réalisations
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
