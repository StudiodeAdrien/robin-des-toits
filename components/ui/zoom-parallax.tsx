'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { GOOGLE_MAPS_URL } from '@/lib/utils'

interface Image {
  src: string
  alt?: string
}

interface FirstCardText {
  title: string
  description: string
  leaveStart: number // ZoomParallax progress where text starts exiting left
  leaveEnd: number   // ZoomParallax progress where text finishes exiting
  service?: string
}

interface ZoomParallaxProps {
  images: Image[]
  overlayText?: string
  stickyExtend?: number
  firstCardText?: FirstCardText
}

export function ZoomParallax({ images, overlayText, stickyExtend = 0, firstCardText }: ZoomParallaxProps) {
  const container = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [isInView, setIsInView] = useState(false)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    const el = container.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Zoom completes at original scroll distance; extra height keeps sticky pinned
  const totalHeight = 300 + stickyExtend
  const zoomEnd = 200 / (totalHeight - 100)

  const scale4 = useTransform(scrollYProgress, [0, zoomEnd, 1], [1, 4, 4])
  const scale5 = useTransform(scrollYProgress, [0, zoomEnd, 1], [1, 5, 5])
  const scale6 = useTransform(scrollYProgress, [0, zoomEnd, 1], [1, 6, 6])
  const scale8 = useTransform(scrollYProgress, [0, zoomEnd, 1], [1, 8, 8])
  const scale9 = useTransform(scrollYProgress, [0, zoomEnd, 1], [1, 9, 9])

  const textY = useTransform(scrollYProgress, [0, 0.15 * zoomEnd, 0.4 * zoomEnd], ['0%', '0%', '-120%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.15 * zoomEnd, 0.35 * zoomEnd], [1, 1, 0])

  const gradientOpacity = useTransform(scrollYProgress, [0.55 * zoomEnd, 0.85 * zoomEnd], [0, 1])

  // First card text: enters during zoom, centered at zoomEnd, exits synced with next card
  const fcEnterStart = 0.65 * zoomEnd
  const fcLeaveStart = firstCardText?.leaveStart ?? 1
  const fcLeaveEnd = firstCardText?.leaveEnd ?? 1.1

  const fcTextX = useTransform(
    scrollYProgress,
    [fcEnterStart, zoomEnd, fcLeaveStart, fcLeaveEnd],
    ['60%', '0%', '0%', '-60%']
  )
  const fcTextOpacity = useTransform(
    scrollYProgress,
    [fcEnterStart, fcEnterStart + 0.05, fcLeaveStart, fcLeaveEnd],
    [0, 1, 1, 0]
  )

  // Button: continuous vertical slide (bottom → up) across entire lifetime
  const fcButtonY = useTransform(
    scrollYProgress,
    [fcEnterStart, fcLeaveEnd],
    ['300%', '-300%']
  )
  const fcButtonOpacity = useTransform(
    scrollYProgress,
    [fcEnterStart, fcEnterStart + 0.05, fcLeaveStart, fcLeaveEnd],
    [0, 1, 1, 0]
  )

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

  return (
    <>
      <div ref={container} className="relative" style={{ height: `${totalHeight}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {images.map(({ src, alt }, index) => {
            const scale = scales[index % scales.length]

            return (
              <motion.div
                key={index}
                style={{ scale }}
                className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!left-[-25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[-22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
              >
                <div className="relative h-[25vh] w-[25vw]">
                  <img
                    src={src}
                    alt={alt || `Parallax image ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                    style={index === 1 ? { objectPosition: 'center 35%', filter: 'brightness(0.85)' } : undefined}
                  />
                  <span className="absolute bottom-1 right-1.5 text-[5px] sm:text-[8px] text-white/30 select-none pointer-events-none">© Robin des Toits</span>
                </div>
              </motion.div>
            )
          })}

          {overlayText && (
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            >
              <h2 className="text-center font-heading text-[10vw] leading-[0.95] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-[7vw]">
                Des services complets
                <br />
                pour votre toiture
              </h2>
            </motion.div>
          )}

          {stickyExtend > 0 && (
            <motion.div
              style={{ opacity: gradientOpacity }}
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            />
          )}
        </div>
      </div>

      {mounted && firstCardText && createPortal(
        <div
          className="pointer-events-none fixed inset-0"
          style={{ zIndex: 9999, display: isInView ? 'block' : 'none' }}
        >
          <div className="absolute inset-x-0 bottom-16 md:bottom-24 px-8 md:px-16">
            <div className="flex items-end justify-between gap-6">
              <motion.div style={{ x: fcTextX, opacity: fcTextOpacity }}>
                <h3 className="mb-3 font-heading text-6xl font-bold tracking-tight text-white md:text-8xl lg:text-9xl">
                  {firstCardText.title.includes('\n')
                    ? firstCardText.title.split('\n').map((line, i, arr) => (
                        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                      ))
                    : firstCardText.title}
                </h3>
                <p className="max-w-lg text-2xl leading-relaxed text-white/90 md:text-3xl">
                  {firstCardText.description}
                </p>
              </motion.div>
              {/* Desktop: stacked reviews on the right */}
              <motion.div
                style={{ y: fcButtonY, opacity: fcButtonOpacity }}
                className="mb-4 hidden shrink-0 md:flex flex-col gap-3 max-w-md"
              >
                {[
                  { author: 'Jos Van H.', text: "M. Vincent Cardona a récemment remplacé notre toiture. Nous sommes très satisfaits du résultat. Le travail était impeccable." },
                  { author: 'Michèle S.', text: "Je recommande cette entreprise qui m'a donné entière satisfaction quant au devis, délai, travail impeccable." },
                  { author: 'Pascal P.', text: "Bravo pour cet excellent travail ! Un nouveau toit nous abrite en gardant son authenticité. Le travail d'un passionné fait toujours la différence." },
                ].map((review) => (
                  <a
                    key={review.author}
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto block rounded-2xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur-sm transition-colors hover:bg-white/15"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 shrink-0">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="text-sm font-semibold text-white">{review.author}</span>
                      <div className="flex items-center gap-0.5 ml-auto">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FBBC05" className="h-3.5 w-3.5">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-white/80 line-clamp-3">
                      « {review.text} »
                    </p>
                  </a>
                ))}
              </motion.div>

            </div>
          </div>

          {/* Mobile: reviews slide horizontally (right→left) ABOVE title */}
          <div className="absolute top-[10vh] inset-x-0 md:hidden px-4 overflow-visible">
            <motion.div
              style={{ x: fcButtonY, opacity: fcButtonOpacity }}
              className="pointer-events-auto flex flex-col gap-2 overflow-visible"
            >
              {[
                { author: 'Jos Van H.', text: "M. Vincent Cardona a récemment remplacé notre toiture. Nous sommes très satisfaits du résultat. Le travail était impeccable." },
                { author: 'Michèle S.', text: "Je recommande cette entreprise qui m'a donné entière satisfaction quant au devis, délai, travail impeccable." },
                { author: 'Pascal P.', text: "Bravo pour cet excellent travail ! Un nouveau toit nous abrite en gardant son authenticité. Le travail d'un passionné fait toujours la différence." },
              ].map((review) => (
                <a
                  key={review.author}
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-xs font-semibold text-white">{review.author}</span>
                    <div className="flex items-center gap-0.5 ml-auto">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FBBC05" className="h-3 w-3">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-white/80 line-clamp-2">
                    « {review.text} »
                  </p>
                </a>
              ))}
            </motion.div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
