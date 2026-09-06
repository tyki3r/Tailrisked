import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TailriskedHeroLogoProps {
  className?: string;
  size?: 'hero' | 'nav' | 'compact';
}

export const TailriskedHeroLogo: React.FC<TailriskedHeroLogoProps> = ({
  className = '',
  size = 'hero',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  // Smooth 3D Tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 140,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || size !== 'hero') return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (size === 'nav') {
    return (
      <div className="flex items-center gap-2 group cursor-pointer select-none">
        <span
          className="text-2xl sm:text-3xl font-black tracking-wider text-white font-['Rock_3D',_cursive,_sans-serif] block drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]"
        >
          tailrisked
        </span>
      </div>
    );
  }

  if (size === 'compact') {
    return (
      <div className="flex items-center justify-center select-none">
        <span
          className="text-4xl sm:text-5xl font-black tracking-wider text-white font-['Rock_3D',_cursive,_sans-serif] block drop-shadow-[0_2px_14px_rgba(212,175,55,0.25)]"
        >
          tailrisked
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-center select-none py-3 sm:py-6 perspective-1000 w-full overflow-visible ${className}`}
      id="brand-hero-container"
    >
      {/* Ambient gold glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[550px] h-[180px] bg-[#D4AF37]/8 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none -z-10" />

      {/* Main 3D Tilted Hero with animated physics */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative flex items-center justify-center cursor-default transition-transform duration-75 ease-out w-full"
      >
        {!imgError ? (
          <img
            src="/logo.png"
            alt="tailrisked"
            onError={() => setImgError(true)}
            className="max-h-24 sm:max-h-32 md:max-h-40 w-auto object-contain select-none pointer-events-none drop-shadow-[0_4px_24px_rgba(212,175,55,0.22)]"
          />
        ) : null}

        {imgError && (
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white font-['Rock_3D',_cursive,_sans-serif] tracking-wider text-center leading-none select-none drop-shadow-[0_4px_20px_rgba(212,175,55,0.22)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all"
          >
            tailrisked
          </h1>
        )}
      </motion.div>
    </div>
  );
};
