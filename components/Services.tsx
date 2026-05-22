'use client'

import { ZoomParallax } from './ui/zoom-parallax'
import { CardsParallax, CARD_SCROLL_VH, LEAVE_POINT, TRANSITION_POINT, TRANSITION_DURATION, type ScrollCardItem } from './ui/scroll-cards'

const FIRST_CARD_VH = 130
const STICKY_EXTEND = 230   // Extra ZoomParallax height so "Rénovation" exit fits within progress [0,1]
const TRAILING_PAD = 100    // Extra scroll at end so last card text can exit

// ─── Sync "Rénovation" exit with "Charpente" enter ───
// These absolute scroll positions cancel out cpScrollRange — invariant to padding/card count
const zpScrollRange = 300 + STICKY_EXTEND - 100
const renoLeaveStart = (300 + FIRST_CARD_VH * LEAVE_POINT) / zpScrollRange
const renoLeaveEnd = (300 + FIRST_CARD_VH * LEAVE_POINT + CARD_SCROLL_VH * TRANSITION_DURATION) / zpScrollRange

const parallaxImages = [
  { src: '/images/realisations/couverture/couverture-hero.jpg', alt: 'Couverture toiture' },
  { src: '/images/realisations/charpente/00e38406.jpg', alt: 'Charpente rénovée' },
  { src: '/images/realisations/charpente/img_5172.jpg', alt: 'Charpente' },
  { src: '/images/realisations/charpente/img_5384.jpg', alt: 'Charpente bois' },
  { src: '/images/realisations/couverture/cab667c9.jpg', alt: 'Rénovation toiture' },
  { src: '/images/realisations/charpente/img_2698.jpg', alt: 'Travaux charpente' },
  { src: '/images/realisations/couverture/img_0403.jpg', alt: 'Couverture' },
]

const scrollCards: ScrollCardItem[] = [
  {
    title: 'Rénovation de toiture',
    description: 'Réfection complète ou partielle de votre toiture pour lui redonner solidité et étanchéité.',
    tag: 'couverture',
    src: '/images/realisations/couverture/couverture-hero.jpg',
    link: '/services',
    service: 'renovation-toiture',
  },
  {
    title: 'Charpente',
    description: 'Rénovation, adaptation ou création de structures bois pour votre habitation.',
    tag: 'charpente',
    src: '/images/realisations/charpente/img_5376.jpg',
    link: '/services',
    service: 'charpente',
    textPosition: 'top',
    badge: {
      highlight: '365j',
      title: 'Intervention toute l\'année',
      subtitle: 'Été comme hiver, nous restons disponibles',
      variant: 'brown',
    },
  },
  {
    title: 'Couverture',
    description: 'Entretien et rénovation de couverture avec un travail soigné, adapté à chaque bâtiment.',
    tag: 'couverture',
    src: '/images/realisations/couverture/img_0072.jpg',
    link: '/services',
    service: 'couverture',
    imageFit: 'contain',
    imagePosition: 'left',
    imageObjectPosition: 'center 60%',
    imageWidth: 50,
    textPosition: 'top',
    textAlign: 'right',
    badge: {
      highlight: '10 ans',
      title: 'de garantie sur tous vos travaux',
      subtitle: 'Sur tous types de travaux — Assurance décennale',
      variant: 'beige',
    },
  },
  {
    title: 'Zinguerie',
    description: "Travaux d'étanchéité et d'évacuation des eaux pluviales : gouttières, chéneaux, noues.",
    tag: 'zinguerie',
    src: '/images/realisations/zinguerie/zinguerie-1.jpg',
    link: '/services',
    service: 'zinguerie',
    imageFit: 'contain',
    imagePosition: 'right',
    textPosition: 'top',
    review: {
      author: 'Isabelle I.',
      text: "Excellent travail, Mr Cardona a vraiment fait notre rénovation comme nous l'espérions dans des conditions difficiles ! Son travail est de qualité et soigné ! Nous recommandons ! Merci à lui nous sommes très contents !",
    },
  },
  {
    title: 'Pergolas',
    description: 'Conception et réalisation de pergolas en bois pour sublimer vos espaces extérieurs.',
    tag: 'bois',
    src: '/images/realisations/charpente/img_5196.jpg',
    link: '/services',
    service: 'pergola',
    imageFit: 'contain',
    imagePosition: 'left',
    textPosition: 'top',
    textAlign: 'right',
    badge: {
      highlight: '0€',
      title: "d'acompte* — Paiement en fin de chantier",
      subtitle: 'Sur tous types de travaux — Vous ne payez qu\'à la fin',
      variant: 'beige',
    },
  },
  {
    title: 'Terrasses bois',
    description: 'Aménagement de terrasses en bois, alliant esthétique et durabilité.',
    tag: 'bois',
    src: '/images/realisations/charpente/terrasse-1.jpg',
    link: '/services',
    service: 'terrasse-bois',
    textPosition: 'top',
    badge: {
      highlight: '50+',
      title: 'Chantiers réalisés chez des particuliers',
      subtitle: '',
      variant: 'brown',
    },
  },
]

export default function Services() {
  return (
    <section id="services">
      <ZoomParallax
        images={parallaxImages}
        overlayText="Des services complets pour votre toiture"
        stickyExtend={STICKY_EXTEND}
        firstCardText={{
          title: 'Rénovation\nde toiture',
          description: 'Réfection complète ou partielle de votre toiture pour lui redonner solidité et étanchéité.',
          leaveStart: renoLeaveStart,
          leaveEnd: renoLeaveEnd,
        }}
      />

      <div style={{ marginTop: `-${STICKY_EXTEND}vh` }}>
        <CardsParallax
          items={scrollCards}
          skipFirstImage
          skipFirstText
          firstCardScrollVh={FIRST_CARD_VH}
          trailingPadVh={TRAILING_PAD}
        />
      </div>
    </section>
  )
}
