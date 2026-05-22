'use client'

import AnimatedSection from './AnimatedSection'
import { InterventionMap } from './ui/intervention-map'

export default function ZoneIntervention() {
  return (
    <section className="section-padding" id="zone">
      <div className="container-tight">
        <AnimatedSection className="text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brun-light invisible select-none" aria-hidden="true">
            Zone d&apos;intervention
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl">
            Nous intervenons près de chez vous
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Robin des Toits se déplace rapidement sur Saint-Savinien et dans
            toute la Charente-Maritime pour vos travaux de toiture, charpente et
            zinguerie.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-10" delay={0.2}>
          <InterventionMap />
        </AnimatedSection>

      </div>
    </section>
  )
}
