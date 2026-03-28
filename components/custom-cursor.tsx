'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorState = 'default' | 'link' | 'image' | 'gallery' | 'button';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Cursor trail — two lagging springs that follow the main cursor
  const trail1X = useSpring(cursorX, { damping: 40, stiffness: 120, mass: 0.9 });
  const trail1Y = useSpring(cursorY, { damping: 40, stiffness: 120, mass: 0.9 });
  const trail2X = useSpring(cursorX, { damping: 60, stiffness: 70, mass: 1.4 });
  const trail2Y = useSpring(cursorY, { damping: 60, stiffness: 70, mass: 1.4 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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

  const bracketSize = {
    default: 40,
    link: 56,
    image: 64,
    gallery: 72,
    button: 48,
  }[cursorState];

  const cursorColor = {
    default: 'text-gold-400/60',
    link: 'text-white/80',
    image: 'text-gold-300',
    gallery: 'text-white/40',
    button: 'text-gold-400',
  }[cursorState];

  const bracketColor = {
    default: 'border-gold-400/20',
    link: 'border-white/40',
    image: 'border-gold-300/60',
    gallery: 'border-white/20',
    button: 'border-gold-400/70',
  }[cursorState];

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[99999] hidden lg:block">

      {/* Trail dot 1 — slightly lagging */}
      <motion.div
        className="absolute rounded-full bg-gold-400"
        style={{
          left: trail1X,
          top: trail1Y,
          translateX: '-50%',
          translateY: '-50%',
          width: 5,
          height: 5,
          opacity: 0.18,
          filter: 'blur(1px)',
        }}
      />

      {/* Trail dot 2 — more lagging */}
      <motion.div
        className="absolute rounded-full bg-gold-400"
        style={{
          left: trail2X,
          top: trail2Y,
          translateX: '-50%',
          translateY: '-50%',
          width: 3,
          height: 3,
          opacity: 0.09,
          filter: 'blur(1.5px)',
        }}
      />
      
      {/* 1. Dynamic Corner Brackets (The Target Box) */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{
          left: smoothX,
          top: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: bracketSize,
          height: bracketSize,
        }}
      >
         {/* Brackets */}
         <div className={`absolute inset-0 border-[0.5px] ${bracketColor} opacity-40`} />
         
         <motion.div 
           initial={false}
           animate={{ inset: cursorState === 'default' ? -2 : 2 }}
           className="absolute inset-0"
         >
            {/* Top Left */}
            <div className={`absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 ${bracketColor}`} />
            {/* Top Right */}
            <div className={`absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 ${bracketColor}`} />
            {/* Bottom Left */}
            <div className={`absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 ${bracketColor}`} />
            {/* Bottom Right */}
            <div className={`absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 ${bracketColor}`} />
         </motion.div>

         {/* Context Indicators */}
         <AnimatePresence>
            {cursorState !== 'default' && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 className="absolute -bottom-6 flex flex-col items-center"
               >
                  <span className={`text-[7px] font-black uppercase tracking-[0.4em] ${cursorColor}`}>
                    {cursorState === 'image' ? 'SCAN' : cursorState === 'link' ? 'SELECT' : cursorState === 'gallery' ? 'VIEW' : 'AUTH'}
                  </span>
                  <div className={`h-px w-8 ${cursorColor} opacity-20 mt-1`} />
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>

      {/* 2. Central Crosshair (The Nišan) */}
      <motion.div
        className={`absolute flex items-center justify-center ${cursorColor}`}
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
         {/* Precise Crosshair Lines */}
         <div className="relative h-6 w-6">
            <motion.div 
              animate={{ rotate: cursorState !== 'default' ? 90 : 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
               {/* Vertical */}
               <div className="absolute h-full w-[1.5px] bg-current opacity-60" />
               <div className="absolute h-1.5 w-[1.5px] bg-black top-2" />
               <div className="absolute h-1.5 w-[1.5px] bg-black bottom-2" />
               
               {/* Horizontal */}
               <div className="absolute h-[1.5px] w-full bg-current opacity-60" />
               <div className="absolute h-[1.5px] w-1.5 bg-black left-2" />
               <div className="absolute h-[1.5px] w-1.5 bg-black right-2" />
            </motion.div>

            {/* Central Target Dot (Wait, users asked for crosshair, we leave center clear for surgical precision) */}
            <motion.div 
              animate={{ scale: cursorState === 'default' ? 1 : 1.5 }}
              className="absolute left-1/2 top-1/2 h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current shadow-glow" 
            />
         </div>

         {/* Axiom Telemetry Markers */}
         <div className="absolute h-20 w-20 flex items-center justify-center pointer-events-none opacity-20">
            {/* X-Axis Ticks */}
            <div className="absolute w-full h-px flex justify-between px-2">
               <div className="h-1 w-[1px] bg-current" />
               <div className="h-1 w-[1px] bg-current" />
            </div>
            {/* Y-Axis Ticks */}
            <div className="absolute h-full w-px flex flex-col justify-between py-2">
               <div className="w-1 h-[1px] bg-current" />
               <div className="w-1 h-[1px] bg-current" />
            </div>
         </div>
      </motion.div>

      {/* 3. Outer Radial Telemetry (Optional, adds "High End" feel) */}
      <motion.div
        className={`absolute rounded-full border border-current opacity-[0.03]`}
        style={{
          left: smoothX,
          top: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: bracketSize * 2,
          height: bracketSize * 2,
        }}
      />
    </div>
  );
}
