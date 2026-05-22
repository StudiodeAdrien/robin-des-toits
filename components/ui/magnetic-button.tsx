"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  magneticStrength?: number;
  textMagneticStrength?: number;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  magneticStrength = 0.3,
  textMagneticStrength = 0.5,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const el = ref.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * magneticStrength, y: middleY * magneticStrength });
    setTextPosition({ x: middleX * textMagneticStrength, y: middleY * textMagneticStrength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setTextPosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    if (href) {
      window.location.href = href;
    }
    onClick?.();
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`pointer-events-auto relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/10 px-8 py-4 backdrop-blur-sm transition-colors hover:bg-white/20 ${className}`}
    >
      <motion.span
        animate={{ x: textPosition.x, y: textPosition.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="relative z-10 text-sm font-medium uppercase tracking-widest text-white"
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
