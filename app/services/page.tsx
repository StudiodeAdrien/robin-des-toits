import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Découvrez les services de Robin des Toits : rénovation de toiture, charpente, couverture, zinguerie, ossature bois, pergolas et terrasses bois en Charente-Maritime.',
}

const services = [
  {
    id: 'renovation',
    title: 'Rénovation de toiture',
    description:
      'Réfection complète ou partielle de votre toiture pour lui redonner solidité, étanchéité et esthétique. Nous intervenons sur tous types de couvertures : tuiles, ardoises, fibrociment.',
    image: '/images/realisations/couverture/img_5378.jpg',
    details: [
      'Diagnostic complet de votre toiture',
      'Remplacement de la couverture',
      'Traitement et réparation de charpente',
      'Isolation sous toiture',
      'Pose de fenêtres de toit (Velux)',
    ],
  },
  {
    id: 'charpente',
    title: 'Charpente',
    description:
      'Travaux de charpente pour la rénovation, l\'adaptation ou la création de structures bois. Charpente traditionnelle ou industrielle, nous adaptons notre savoir-faire à chaque projet.',
    image: '/images/realisations/charpente/img_0134.jpg',
    details: [
      'Création de charpente traditionnelle',
      'Rénovation et renforcement',
      'Traitement du bois',
      'Surélévation et aménagement de combles',
      'Modification de structure',
    ],
  },
  {
    id: 'couverture',
    title: 'Couverture',
    description:
      'Entretien et rénovation de couverture avec un travail soigné, adapté à chaque bâtiment. Tuiles canal, tuiles mécaniques, ardoises — nous maîtrisons toutes les techniques.',
    image: '/images/realisations/couverture/img_2287.jpg',
    details: [
      'Pose et remplacement de couverture',
      'Entretien préventif',
      'Réparation de fuites',
      'Démoussage et nettoyage',
      'Pose de faîtage et rives',
    ],
  },
  {
    id: 'zinguerie',
    title: 'Zinguerie',
    description:
      'Interventions sur les éléments d\'étanchéité et d\'évacuation des eaux pluviales. La zinguerie est essentielle pour protéger votre habitation des infiltrations.',
    image: '/images/realisations/zinguerie/zinguerie-1.jpg',
    details: [
      'Pose et remplacement de gouttières',
      'Chéneaux et descentes',
      'Noues et abergements',
      'Habillage de lucarne',
      'Raccords d\'étanchéité',
    ],
  },
  {
    id: 'ossature-bois',
    title: 'Ossature bois, pergolas et terrasses',
    description:
      'Réalisation d\'aménagements extérieurs en bois : pergolas pour profiter de votre jardin, terrasses bois pour sublimer vos espaces, et ossatures bois pour vos projets de construction.',
    image: '/images/realisations/charpente/img_5196.jpg',
    details: [
      'Pergolas sur mesure',
      'Terrasses bois',
      'Carports et abris',
      'Ossature bois',
      'Bardage bois',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="bg-brun py-20">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cream/60">
              Nos prestations
            </p>
            <h1 className="font-heading text-4xl text-cream sm:text-5xl">
              Services
            </h1>
            <p className="mt-4 max-w-xl text-cream/80">
              Robin des Toits propose une gamme complète de services pour votre
              toiture et vos aménagements bois en Charente-Maritime.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight space-y-20">
          {services.map((service, i) => (
            <AnimatedSection key={service.id}>
              <div
                className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:w-1/2">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="lg:w-1/2">
                  <h2 className="font-heading text-2xl sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-neutral-600">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-sm text-neutral-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-brun">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary mt-6">
                    Demander un devis
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}
