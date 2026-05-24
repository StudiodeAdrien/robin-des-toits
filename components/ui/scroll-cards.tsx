"use client";

import { FC, useRef, useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { GOOGLE_MAPS_URL } from "@/lib/utils";

export interface ScrollCardItem {
  title: string;
  description: string;
  tag: string;
  src: string;
  link: string;
  textColor?: string;
  service?: string;
  /** 'cover' (default) = full bleed. 'contain' = dezoom, stick to side, bg fill */
  imageFit?: 'cover' | 'contain';
  /** Which side to stick the image when imageFit='contain' */
  imagePosition?: 'left' | 'right';
  /** Position text at top or bottom (default: bottom) */
  textPosition?: 'top' | 'bottom';
  /** Text alignment (default: left) */
  textAlign?: 'left' | 'right';
  /** Custom object-position for the image (e.g. 'center 30%') */
  imageObjectPosition?: string;
  /** Image width % when imageFit='contain' (default: 55) */
  imageWidth?: number;
  /** Google review to display */
  review?: {
    author: string;
    text: string;
  };
  /** Trust badge card in brown area */
  badge?: {
    highlight: string;
    title: string;
    subtitle: string;
    variant?: 'glass' | 'brown' | 'beige';
  };
}

// ─── Tuning constants ───
export const CARD_SCROLL_VH = 140;    // scroll distance per card (vh)
export const LEAVE_POINT = 0.6;       // % of segment where text starts exiting left (earlier than enter)
export const TRANSITION_POINT = 0.75; // % of segment where NEXT text enters right
export const TRANSITION_DURATION = 0.15; // duration of text slide (% of segment)

// ─── Card text (slide right→center→left) ───
const CardText: FC<{
  title: string;
  description: string;
  textColor: string;
  isFirst: boolean;
  segStart: number;
  segSize: number;
  prevSegSize: number;
  progress: MotionValue<number>;
  service?: string;
  textPosition?: 'top' | 'bottom';
  textAlign?: 'left' | 'right';
  imagePosition?: 'left' | 'right';
  review?: { author: string; text: string };
  badge?: { highlight: string; title: string; subtitle: string; variant?: 'glass' | 'brown' | 'beige' };
}> = ({ title, description, textColor, isFirst, segStart, segSize, prevSegSize, progress, service, textPosition = 'bottom', textAlign = 'left', imagePosition, review, badge }) => {
  // Enter: starts at previous card's TRANSITION_POINT
  const enterStart = isFirst
    ? 0
    : Math.max(0, segStart - prevSegSize * (1 - TRANSITION_POINT));
  const enterDuration = isFirst ? 0.35 : TRANSITION_DURATION;
  const enterEnd = enterStart + segSize * enterDuration;

  // Leave: at own LEAVE_POINT (earlier than next card's enter)
  const leaveStart = segStart + segSize * LEAVE_POINT;
  const leaveEnd = leaveStart + segSize * TRANSITION_DURATION;

  const textX = useTransform(
    progress,
    [enterStart, enterEnd, leaveStart, leaveEnd],
    ["60%", "0%", "0%", "-60%"]
  );

  const textOpacity = useTransform(
    progress,
    [enterStart, enterStart + segSize * 0.08, leaveStart, leaveEnd],
    [0, 1, 1, 0]
  );

  // Review: slide from left to right (mirrored text animation, leaves slightly earlier)
  const reviewLeaveStart = segStart + segSize * (LEAVE_POINT - 0.1);
  const reviewLeaveEnd = reviewLeaveStart + segSize * TRANSITION_DURATION;
  const reviewX = useTransform(
    progress,
    [enterStart, enterEnd, reviewLeaveStart, reviewLeaveEnd],
    ["-60%", "0%", "0%", "60%"]
  );
  const reviewOpacity = useTransform(
    progress,
    [enterStart, enterStart + segSize * 0.08, reviewLeaveStart, reviewLeaveEnd],
    [0, 1, 1, 0]
  );

  // Button: continuous vertical slide (bottom → up) across entire lifetime
  const buttonY = useTransform(
    progress,
    [enterStart, leaveEnd],
    ["300%", "-300%"]
  );

  const buttonOpacity = useTransform(
    progress,
    [enterStart, enterStart + segSize * 0.08, leaveStart, leaveEnd],
    [0, 1, 1, 0]
  );

  return (
    <>
      {/* Title + description */}
      <div className={`absolute inset-x-0 px-8 md:px-16 ${
        textPosition === 'top' ? 'top-28 md:top-36' : 'bottom-16 md:bottom-24'
      }`}>
        <motion.div
          style={{ x: textX, opacity: textOpacity }}
          className={textAlign === 'right' ? 'text-right ml-auto max-w-2xl' : ''}
        >
          <h3
            className="mb-3 font-heading text-6xl font-bold tracking-tight md:text-8xl lg:text-9xl"
            style={{ color: textColor }}
          >
            {title}
          </h3>
          <p
            className={`text-2xl leading-relaxed md:text-3xl max-w-lg ${textAlign === 'right' ? 'ml-auto' : ''}`}
            style={{ color: textColor, opacity: 0.9 }}
          >
            {description}
          </p>
        </motion.div>
      </div>

      {/* Button — always at bottom, independent position */}
      {service && (
        <div className="absolute inset-x-0 bottom-16 md:bottom-24 px-8 md:px-16">
          <div className={`flex ${imagePosition === 'left' ? 'justify-start' : 'justify-end'}`}>
            <motion.div
              style={{ y: buttonY, opacity: buttonOpacity }}
              className="mb-4 hidden shrink-0 md:block"
            >
              <a
                href={`/contact?service=${service}`}
                className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Demander un devis gratuit
              </a>
            </motion.div>
          </div>
        </div>
      )}

      {/* Google review card — positioned in bottom half, slides left→right */}
      {review && (
        <div className={`absolute bottom-24 md:bottom-40 px-4 md:px-16 ${
          imagePosition === 'right' ? 'left-0 right-0 md:right-auto' : 'right-0 left-0 md:left-auto'
        }`} style={{ width: undefined }}>
          <motion.div style={{ x: reviewX, opacity: reviewOpacity }} className="md:max-w-[50%]">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto block max-w-sm mx-auto md:mx-0 rounded-2xl border border-white/20 bg-white/10 px-4 md:px-6 py-4 md:py-5 backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 md:h-6 w-4 md:w-6 shrink-0">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-xs md:text-sm font-semibold text-white">{review.author}</span>
                <div className="flex items-center gap-0.5 ml-auto">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FBBC05" className="h-3 md:h-3.5 w-3 md:w-3.5">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-white/80 line-clamp-3">
                « {review.text} »
              </p>
            </a>
          </motion.div>
        </div>
      )}

      {/* Trust badge */}
      {badge && (
        <div className={`absolute ${
          imagePosition
            ? `bottom-20 md:bottom-36 inset-x-0 md:inset-x-auto ${imagePosition === 'left' ? 'md:right-0 md:left-auto' : 'md:left-0 md:right-auto'}`
            : 'bottom-20 md:bottom-36 left-0'
        } px-4 md:px-16`} style={imagePosition ? { width: undefined } : undefined}>
          <motion.div style={{ x: reviewX, opacity: reviewOpacity }} className="flex justify-center">
            <div className={`max-w-xs md:max-w-sm rounded-2xl px-4 md:px-6 py-4 md:py-5 ${
              badge.variant === 'brown'
                ? 'bg-brun border border-brun-dark/30 shadow-lg'
                : badge.variant === 'beige'
                ? 'bg-cream border border-brun/10 shadow-lg'
                : 'border border-white/20 bg-white/10 backdrop-blur-sm'
            }`}>
              <div className="flex items-center gap-3 md:gap-4">
                <span className={`text-5xl md:text-7xl font-bold whitespace-nowrap ${
                  badge.variant === 'beige' ? 'text-brun' : 'text-cream'
                }`}>{badge.highlight}</span>
                <div>
                  <p className={`text-xs md:text-sm font-semibold ${
                    badge.variant === 'beige' ? 'text-brun-dark' : 'text-white'
                  }`}>{badge.title}</p>
                  {badge.subtitle && (
                    <p className={`mt-1 text-[10px] md:text-xs ${
                      badge.variant === 'beige' ? 'text-brun/60' : 'text-white/60'
                    }`}>{badge.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

// ─── Text overlay via portal ───
const TextOverlayPortal: FC<{
  items: ScrollCardItem[];
  progress: MotionValue<number>;
  visible: boolean;
  cardHeights: number[];
  totalContainerH: number;
  skipFirstText?: boolean;
}> = ({ items, progress, visible, cardHeights, totalContainerH, skipFirstText }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const segments = useMemo(() => {
    const scrollRange = totalContainerH - 100; // minus viewport height
    let cum = 0;
    return cardHeights.map((h) => {
      const start = cum / scrollRange;
      const size = h / scrollRange;
      cum += h;
      return { start, size };
    });
  }, [cardHeights, totalContainerH]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9999, display: visible ? "block" : "none" }}
    >
      {items.map((item, i) => {
        if (skipFirstText && i === 0) return null;
        return (
          <CardText
            key={`txt_${i}`}
            title={item.title}
            description={item.description}
            textColor={item.textColor || "white"}
            isFirst={!skipFirstText && i === 0}
            segStart={segments[i].start}
            segSize={segments[i].size}
            prevSegSize={i > 0 ? segments[i - 1].size : segments[0].size}
            progress={progress}
            service={item.service}
            textPosition={item.textPosition}
            textAlign={item.textAlign}
            imagePosition={item.imagePosition}
            review={item.review}
            badge={item.badge}
          />
        );
      })}
    </div>,
    document.body
  );
};

// ─── Main component ───
interface CardsParallaxProps {
  items: ScrollCardItem[];
  skipFirstImage?: boolean;
  skipFirstText?: boolean;
  firstCardScrollVh?: number;
  trailingPadVh?: number;
}

const CardsParallax: FC<CardsParallaxProps> = ({ items, skipFirstImage, skipFirstText, firstCardScrollVh, trailingPadVh = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardHeights = useMemo(
    () => items.map((_, i) =>
      (skipFirstImage && i === 0 && firstCardScrollVh != null) ? firstCardScrollVh : CARD_SCROLL_VH
    ),
    [items.length, skipFirstImage, firstCardScrollVh]
  );

  // Total includes trailing pad so last card's exit fits within progress [0,1]
  const totalContainerH = useMemo(
    () => cardHeights.reduce((a, b) => a + b, 0) + trailingPadVh,
    [cardHeights, trailingPadVh]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky stacking cards — next card slides up over previous */}
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const wrapperH = cardHeights[i] + (isLast ? trailingPadVh : 0);
        return (
        <div
          key={`card_${i}`}
          style={{ height: `${wrapperH}vh` }}
        >
          {!(skipFirstImage && i === 0) && (
            <div className="sticky top-0 h-screen w-full">
              {item.imageFit === 'contain' ? (
                <>
                  {/* Mobile: full-bleed image */}
                  <div className="relative h-full w-full md:hidden overflow-hidden">
                    <Image
                      className="h-full w-full object-cover"
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="100vw"
                      priority={i === 0}
                      style={item.imageObjectPosition ? { objectPosition: item.imageObjectPosition } : undefined}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute bottom-2 right-3 text-[6px] text-white/30 select-none pointer-events-none">© Robin des Toits</span>
                  </div>
                  {/* Desktop: split layout */}
                  <div className="relative hidden md:flex h-full w-full" style={{ backgroundColor: '#3a2a1e' }}>
                    <div
                      className={`relative h-full ${
                        item.imagePosition === 'right' ? 'order-2' : 'order-1'
                      }`}
                      style={{ width: `${item.imageWidth ?? 55}%` }}
                    >
                      <Image
                        className="object-cover"
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes={`${item.imageWidth ?? 55}vw`}
                        priority={i === 0}
                        style={item.imageObjectPosition ? { objectPosition: item.imageObjectPosition } : undefined}
                      />
                    </div>
                    <div
                      className={`h-full ${
                        item.imagePosition === 'right' ? 'order-1' : 'order-2'
                      }`}
                      style={{ width: `${100 - (item.imageWidth ?? 55)}%` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute bottom-2 right-3 text-[6px] sm:text-[10px] text-white/30 select-none pointer-events-none">© Robin des Toits</span>
                  </div>
                </>
              ) : (
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    className="h-full w-full object-cover"
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute bottom-2 right-3 text-[6px] sm:text-[10px] text-white/30 select-none pointer-events-none">© Robin des Toits</span>
                </div>
              )}
            </div>
          )}
        </div>
        );
      })}

      <TextOverlayPortal
        items={items}
        progress={scrollYProgress}
        visible={isInView}
        cardHeights={cardHeights}
        totalContainerH={totalContainerH}
        skipFirstText={skipFirstText}
      />
    </div>
  );
};

export { CardsParallax };
