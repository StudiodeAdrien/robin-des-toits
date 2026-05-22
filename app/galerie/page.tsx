'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import AnimatedSection from '@/components/AnimatedSection'
import CTASection from '@/components/CTASection'

type Category = 'all' | 'couverture' | 'charpente' | 'zinguerie'

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'Toutes' },
  { key: 'couverture', label: 'Couverture' },
  { key: 'charpente', label: 'Charpente' },
  { key: 'zinguerie', label: 'Zinguerie' },
]

interface GalleryImage {
  src: string
  alt: string
  category: Category
  portrait?: boolean
}

const images: GalleryImage[] = [
  { src: '/images/realisations/couverture/img_1447.jpg', alt: 'Toiture en tuiles canal', category: 'couverture' },
  { src: '/images/realisations/couverture/img_0503.jpg', alt: 'Pose de Velux et cheminée', category: 'couverture', portrait: true },
  { src: '/images/realisations/couverture/img_0506.jpg', alt: 'Rénovation couverture', category: 'couverture' },
  { src: '/images/realisations/couverture/img_1071.jpg', alt: 'Couverture tuiles', category: 'couverture' },
  { src: '/images/realisations/couverture/img_0403.jpg', alt: 'Réfection de toiture', category: 'couverture', portrait: true },
  { src: '/images/realisations/couverture/img_2598.jpg', alt: 'Travaux de couverture', category: 'couverture' },
  { src: '/images/realisations/couverture/img_0072.jpg', alt: 'Entretien toiture', category: 'couverture' },
  { src: '/images/realisations/couverture/img_2287.jpg', alt: 'Rénovation toiture ancienne', category: 'couverture' },
  { src: '/images/realisations/couverture/img_0870.jpg', alt: 'Couverture rénovée', category: 'couverture', portrait: true },
  { src: '/images/realisations/couverture/img_4754.jpg', alt: 'Détail couverture', category: 'couverture' },
  { src: '/images/realisations/charpente/img_5172.jpg', alt: 'Pergola avec couverture tuiles', category: 'charpente' },
  { src: '/images/realisations/charpente/img_5196.jpg', alt: 'Carport en bois', category: 'charpente' },
  { src: '/images/realisations/charpente/img_0924.jpg', alt: 'Terrasse bois', category: 'charpente', portrait: true },
  { src: '/images/realisations/charpente/img_0926.jpg', alt: 'Aménagement terrasse', category: 'charpente' },
  { src: '/images/realisations/charpente/img_1195.jpg', alt: 'Charpente traditionnelle', category: 'charpente' },
  { src: '/images/realisations/charpente/img_2698.jpg', alt: 'Structure charpente', category: 'charpente', portrait: true },
  { src: '/images/realisations/charpente/img_0134.jpg', alt: 'Ossature bois', category: 'charpente' },
  { src: '/images/realisations/charpente/img_2187.jpg', alt: 'Travaux de charpente', category: 'charpente' },
  { src: '/images/realisations/charpente/img_0864.jpg', alt: 'Rénovation charpente', category: 'charpente' },
  { src: '/images/realisations/zinguerie/img_4804.jpg', alt: 'Zinguerie autour de Velux', category: 'zinguerie' },
  { src: '/images/realisations/zinguerie/img_0953.jpg', alt: 'Gouttières et descentes', category: 'zinguerie', portrait: true },
  { src: '/images/realisations/zinguerie/img_0555.jpg', alt: 'Travaux de zinguerie', category: 'zinguerie' },
  { src: '/images/realisations/zinguerie/img_2619.jpg', alt: 'Raccords zinc', category: 'zinguerie' },
  { src: '/images/realisations/zinguerie/img_2710.jpg', alt: 'Habillage zinc', category: 'zinguerie' },
  { src: '/images/realisations/zinguerie/img_3232.jpg', alt: 'Détail zinguerie', category: 'zinguerie' },
]

function AnimatedImage({
  src,
  alt,
  portrait,
  onClick,
}: {
  src: string
  alt: string
  portrait?: boolean
  onClick: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div
      ref={ref}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-gris/20 bg-gris/10"
      style={{ aspectRatio: portrait ? '3/4' : '4/3' }}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          'object-cover transition-all duration-1000 ease-in-out',
          isInView && !isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
          'group-hover:scale-105'
        )}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setIsLoading(false)}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brun-dark/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className="absolute bottom-3 left-3 text-sm font-medium text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {alt}
      </p>
      <span className="absolute bottom-2 right-3 text-[10px] text-white/30 select-none pointer-events-none">
        © Robin des Toits
      </span>
    </div>
  )
}

function distributeToColumns(items: GalleryImage[], numCols: number): GalleryImage[][] {
  const cols: GalleryImage[][] = Array.from({ length: numCols }, () => [])
  const heights = new Array(numCols).fill(0)

  items.forEach((item) => {
    const shortest = heights.indexOf(Math.min(...heights))
    cols[shortest].push(item)
    heights[shortest] += item.portrait ? 4 / 3 : 3 / 4
  })

  return cols
}

export default function GaleriePage() {
  const [active, setActive] = useState<Category>('all')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = active === 'all' ? images : images.filter((img) => img.category === active)
  const columns = distributeToColumns(filtered, 3)

  return (
    <>
      <section className="bg-brun py-20">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cream/60">
              Portfolio
            </p>
            <h1 className="font-heading text-4xl text-cream sm:text-5xl">
              Nos réalisations
            </h1>
            <p className="mt-4 max-w-xl text-cream/80">
              Découvrez nos chantiers de couverture, charpente et zinguerie.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  active === cat.key
                    ? 'bg-brun text-cream'
                    : 'border border-gris/50 bg-white text-neutral-700 hover:border-brun hover:text-brun'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Masonry grid — 3 columns */}
          <div className="mx-auto grid w-full max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="grid gap-5">
                {col.map((img) => (
                  <AnimatedImage
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    portrait={img.portrait}
                    onClick={() => setLightbox(img.src)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="Réalisation Robin des Toits"
                width={1200}
                height={900}
                className="h-auto max-h-[85vh] w-auto object-contain"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                aria-label="Fermer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </>
  )
}
