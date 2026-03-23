'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'link' | 'image' | 'gallery' | 'button';

interface Trail {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [trail, setTrail] = useState<Trail[]>([]);
  const trailIdRef = useRef(0);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 280 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    let lastTrailTime = 0;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add trail particle every ~40ms
      const now = Date.now();
      if (now - lastTrailTime > 40) {
        lastTrailTime = now;
        const id = ++trailIdRef.current;
        setTrail((prev) => [...prev.slice(-6), { id, x: e.clientX, y: e.clientY }]);
        // Remove after 500ms
        setTimeout(() => {
          setTrail((prev) => prev.filter((t) => t.id !== id));
        }, 500);
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="gallery"], .gallery-item')) {
        setCursorState('gallery');
      } else if (target.closest('img, picture, video')) {
        setCursorState('image');
      } else if (target.closest('button[type="submit"], .magnetic-button')) {
        setCursorState('button');
      } else if (target.closest('button, a, .clickable, [role="button"]')) {
        setCursorState('link');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  const ringSize = {
    default: 32,
    link: 56,
    image: 64,
    gallery: 72,
    button: 48,
  }[cursorState];

  const ringColor = {
    default: 'border-gold-400/50',
    link: 'border-white/50',
    image: 'border-gold-300/60',
    gallery: 'border-white/40',
    button: 'border-gold-400/80',
  }[cursorState];

  const ringBg = {
    default: 'bg-transparent',
    link: 'bg-white/5',
    image: 'bg-gold-400/5',
    gallery: 'bg-white/8',
    button: 'bg-gold-400/10',
  }[cursorState];

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      {/* Trail Particles */}
      {trail.map((t, i) => (
        <motion.div
          key={t.id}
          className="absolute rounded-full bg-gold-400"
          style={{
            left: t.x,
            top: t.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0.5, scale: 1, width: 4, height: 4 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}

      {/* Outer Ring */}
      <motion.div
        className={`absolute rounded-full border ${ringColor} ${ringBg} flex items-center justify-center`}
        style={{
          left: smoothX,
          top: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {/* Context Labels */}
        {cursorState === 'gallery' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/70"
          >
            View
          </motion.span>
        )}
        {cursorState === 'image' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[8px] text-gold-300/70"
          >
            ⊕
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="absolute rounded-full bg-gold-400"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorState === 'link' || cursorState === 'button' ? 0 : 1,
          width: 6,
          height: 6,
        }}
        transition={{ type: 'spring', damping: 18, stiffness: 350 }}
      />
    </div>
  );
}
