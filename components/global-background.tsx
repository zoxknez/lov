'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function GlobalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Parallax for topographic lines
  const topoY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const topoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 bg-[#020403] overflow-hidden pointer-events-none">
      {/* Dynamic Fog Layer 1 - Deep Forest */}
      <motion.div 
        className="absolute -top-[50%] -left-[50%] h-[200%] w-[200%] animate-fog opacity-[0.15]"
        style={{
          background: 'radial-gradient(circle at center, rgba(39, 69, 58, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Dynamic Fog Layer 2 - Dark Charcoal */}
      <motion.div 
        className="absolute -bottom-[50%] -right-[50%] h-[200%] w-[200%] animate-fog opacity-[0.12] [animation-delay:-15s]"
        style={{
          background: 'radial-gradient(circle at center, rgba(16, 24, 20, 0.4) 0%, transparent 60%)',
        }}
      />

      {/* Dynamic Fog Layer 3 - Muted Gold (High Horizon) */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full opacity-[0.05]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(200, 169, 110, 0.15) 0%, transparent 80%)',
        }}
      />

      {/* Topographic Contour Layer */}
      <motion.div 
        style={{ y: topoY, scale: topoScale }}
        className="absolute inset-0 opacity-[0.03] contrast-150"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo-grid" width="400" height="400" patternUnits="userSpaceOnUse">
              <path d="M0 200 C 50 150, 150 250, 200 200 S 350 150, 400 200" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold-400" />
              <path d="M0 100 C 100 50, 200 150, 400 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold-400 opacity-50" />
              <path d="M0 300 C 150 250, 250 350, 400 300" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold-400 opacity-30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo-grid)" />
        </svg>
      </motion.div>

      {/* Global Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      
      {/* Global Grain Wrap */}
      <div className="grain pointer-events-none mix-blend-overlay opacity-[0.03]" />
    </div>
  );
}
