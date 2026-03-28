'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

const contourPaths = [
  'M-120 210C76 156 198 288 398 258C582 230 704 148 900 160C1092 172 1230 286 1424 274C1556 266 1690 222 1810 182',
  'M-160 468C50 406 240 566 478 544C700 524 864 420 1080 432C1274 442 1416 546 1630 534C1728 528 1814 498 1898 462',
  'M-90 756C122 696 324 852 576 836C820 820 974 696 1202 706C1426 718 1592 844 1818 828C1912 822 2000 792 2088 754',
  'M-140 1080C92 1008 310 1188 592 1164C816 1146 1000 1020 1240 1038C1492 1056 1658 1170 1902 1154C1996 1148 2090 1114 2190 1068',
  'M-120 1420C110 1350 336 1522 632 1496C870 1476 1068 1342 1322 1360C1566 1378 1734 1498 1988 1480C2080 1474 2170 1440 2266 1396',
  'M-110 1788C132 1704 398 1898 690 1876C946 1858 1132 1714 1406 1728C1678 1742 1862 1888 2146 1860C2240 1852 2338 1820 2450 1774',
  'M-150 2198C94 2122 352 2298 694 2272C956 2252 1170 2118 1448 2142C1726 2166 1902 2298 2198 2268C2290 2258 2396 2224 2510 2176',
  'M-160 2640C112 2544 406 2756 748 2722C1034 2694 1250 2540 1552 2568C1868 2596 2074 2762 2386 2728C2492 2716 2604 2678 2720 2620',
];

function RidgeBand() {
  return (
    <svg viewBox="0 0 1600 520" className="h-full w-full" preserveAspectRatio="none">
      <path
        d="M0 214C118 240 208 198 308 154C398 116 510 86 640 100C792 116 874 196 1002 210C1134 224 1226 176 1320 146C1426 112 1520 124 1600 164V520H0Z"
        fill="rgba(18, 34, 40, 0.56)"
      />
      <path
        d="M0 284C102 258 170 220 248 184C370 126 496 126 618 174C704 208 776 246 890 258C1000 270 1098 236 1216 198C1334 162 1476 152 1600 222V520H0Z"
        fill="rgba(9, 18, 23, 0.76)"
      />
      <path
        d="M0 350C100 318 196 278 314 268C426 260 532 288 644 324C756 360 848 388 956 390C1070 392 1172 350 1286 318C1404 286 1510 292 1600 334V520H0Z"
        fill="rgba(3, 7, 9, 0.94)"
      />
    </svg>
  );
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
}

export default function GlobalBackground() {
  const prefersReducedMotion = useReducedMotion();
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const syncViewport = () => setIsMobile(media.matches);

    syncViewport();
    media.addEventListener('change', syncViewport);

    return () => media.removeEventListener('change', syncViewport);
  }, []);

  // Spotlight: track mouse to create a premium ambient glow
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    let id = 0;
    const spawn = () => {
      const star: ShootingStar = {
        id: ++id,
        x: Math.random() * 100,
        y: Math.random() * 40,
        angle: -20 - Math.random() * 20,
      };
      setStars((s) => [...s, star]);
      setTimeout(() => setStars((s) => s.filter((st) => st.id !== star.id)), 2000);
    };
    const interval = setInterval(spawn, 4000 + Math.random() * 6000);
    setTimeout(spawn, 2000); // first star after 2s
    return () => clearInterval(interval);
  }, [isMobile, prefersReducedMotion]);

  const ambientPools = [
    {
      className: '-left-[12%] top-[4%] h-[18%] w-[42%]',
      background: 'radial-gradient(circle, rgba(38, 72, 64, 0.48) 0%, rgba(38, 72, 64, 0.16) 40%, transparent 76%)',
      animate: { x: [0, 26, 0], y: [0, -16, 0], scale: [1, 1.05, 1] },
      duration: 24,
    },
    {
      className: 'right-[-10%] top-[12%] h-[16%] w-[34%]',
      background: 'radial-gradient(circle, rgba(192, 152, 90, 0.22) 0%, rgba(192, 152, 90, 0.08) 36%, transparent 76%)',
      animate: { x: [0, -22, 0], y: [0, 18, 0], scale: [1.02, 1, 1.02] },
      duration: 28,
    },
    {
      className: 'left-[8%] top-[30%] h-[14%] w-[44%]',
      background: 'linear-gradient(90deg, transparent 0%, rgba(209, 171, 108, 0.18) 24%, rgba(209, 171, 108, 0.08) 56%, transparent 100%)',
      animate: { x: [0, 20, 0], opacity: [0.18, 0.26, 0.18] },
      duration: 18,
    },
    {
      className: 'right-[4%] top-[42%] h-[18%] w-[42%]',
      background: 'radial-gradient(circle, rgba(52, 89, 81, 0.32) 0%, rgba(52, 89, 81, 0.12) 42%, transparent 76%)',
      animate: { x: [0, -24, 0], y: [0, -12, 0], scale: [1, 1.04, 1] },
      duration: 22,
    },
    {
      className: '-left-[8%] top-[58%] h-[16%] w-[38%]',
      background: 'radial-gradient(circle, rgba(185, 148, 92, 0.18) 0%, rgba(185, 148, 92, 0.06) 38%, transparent 76%)',
      animate: { x: [0, 22, 0], y: [0, 16, 0], scale: [1.03, 1, 1.03] },
      duration: 26,
    },
    {
      className: 'right-[-14%] top-[74%] h-[20%] w-[46%]',
      background: 'radial-gradient(circle, rgba(36, 68, 60, 0.4) 0%, rgba(36, 68, 60, 0.12) 40%, transparent 76%)',
      animate: { x: [0, -28, 0], y: [0, -18, 0], scale: [1, 1.06, 1] },
      duration: 30,
    },
    {
      className: 'left-[12%] top-[86%] h-[12%] w-[34%]',
      background: 'linear-gradient(90deg, transparent 0%, rgba(230, 205, 164, 0.12) 24%, rgba(230, 205, 164, 0.04) 54%, transparent 100%)',
      animate: { x: [0, 18, 0], opacity: [0.08, 0.18, 0.08] },
      duration: 16,
    },
  ];

  const ridgeBands = [
    { top: '10%', opacity: 0.42, duration: 26, x: [0, 18, 0], y: [0, -8, 0] },
    { top: '34%', opacity: 0.34, duration: 28, x: [0, -16, 0], y: [0, 10, 0] },
    { top: '58%', opacity: 0.38, duration: 30, x: [0, 14, 0], y: [0, -10, 0] },
    { top: '80%', opacity: 0.32, duration: 32, x: [0, -12, 0], y: [0, 8, 0] },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#020406]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#03070a_0%,#061018_16%,#03070b_32%,#071219_50%,#04090d_68%,#020406_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(213,172,106,0.1),transparent_20%),linear-gradient(135deg,rgba(255,255,255,0.028),transparent_40%)]" />

      {/* Spotlight — follows the cursor, extremely subtle premium feel */}
      {!isMobile && !prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none transition-[background] duration-700 ease-out"
          style={{
            background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(200,169,110,0.038) 0%, transparent 65%)`,
          }}
        />
      )}

      {(isMobile ? ambientPools.slice(0, 3) : ambientPools).map((pool) => (
        <motion.div
          key={pool.className}
          className={`absolute rounded-full blur-[120px] ${pool.className}`}
          style={{ background: pool.background }}
          animate={prefersReducedMotion ? undefined : pool.animate}
          transition={{ duration: pool.duration, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        className={`absolute inset-0 opacity-[0.075] ${isMobile ? 'hidden' : ''}`}
        animate={prefersReducedMotion ? undefined : { y: [0, -18, 0], x: [0, 8, 0] }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 1600 3200" className="h-full w-full text-gold-200/60" preserveAspectRatio="none">
          {contourPaths.map((path, index) => (
            <path
              key={path}
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth={index % 2 === 0 ? 1.05 : 0.9}
              strokeOpacity={index % 2 === 0 ? 0.28 : 0.18}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </motion.div>

      {(isMobile ? ridgeBands.slice(0, 2) : ridgeBands).map((band) => (
        <motion.div
          key={band.top}
          className="absolute inset-x-0 h-[18%]"
          style={{ top: band.top, opacity: band.opacity }}
          animate={prefersReducedMotion ? undefined : { x: band.x, y: band.y }}
          transition={{ duration: band.duration, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        >
          <RidgeBand />
        </motion.div>
      ))}

      <motion.div
        className={`absolute inset-x-[-14%] top-[18%] h-[18%] opacity-[0.28] ${isMobile ? 'hidden' : ''}`}
        animate={prefersReducedMotion ? undefined : { x: [0, 24, 0], y: [0, -14, 0] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        <div className="h-full w-full rounded-[50%] bg-[radial-gradient(circle_at_50%_40%,rgba(12,24,26,0.84),rgba(8,13,16,0.36)_50%,transparent_80%)] blur-[90px]" />
      </motion.div>

      <motion.div
        className={`absolute inset-x-[-18%] top-[48%] h-[22%] opacity-[0.34] ${isMobile ? 'hidden' : ''}`}
        animate={prefersReducedMotion ? undefined : { x: [0, -20, 0], y: [0, 12, 0] }}
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        <div className="h-full w-full rounded-[50%] bg-[radial-gradient(circle_at_50%_38%,rgba(10,19,22,0.82),rgba(7,12,14,0.32)_50%,transparent_82%)] blur-[100px]" />
      </motion.div>

      <motion.div
        className={`absolute inset-x-[-10%] top-[76%] h-[16%] opacity-[0.3] ${isMobile ? 'hidden' : ''}`}
        animate={prefersReducedMotion ? undefined : { x: [0, 18, 0], y: [0, -10, 0] }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        <div className="h-full w-full rounded-[50%] bg-[radial-gradient(circle_at_50%_42%,rgba(12,24,28,0.8),rgba(6,10,12,0.28)_52%,transparent_82%)] blur-[88px]" />
      </motion.div>

      <div className={`absolute inset-0 bg-[linear-gradient(90deg,rgba(245,240,232,0.018)_1px,transparent_1px),linear-gradient(180deg,rgba(245,240,232,0.014)_1px,transparent_1px)] bg-[size:140px_140px] opacity-[0.02] ${isMobile ? 'hidden' : ''}`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(245,240,232,0.014)_12%,transparent_24%,rgba(245,240,232,0.01)_48%,transparent_66%,rgba(245,240,232,0.012)_88%,transparent_100%)]" />
      <div className={`scene-grain absolute inset-[-30%] opacity-[0.026] mix-blend-soft-light ${isMobile ? 'hidden' : ''}`} />
      {/* Shooting Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="pointer-events-none absolute h-px w-24"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            rotate: star.angle,
            background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.6), transparent)',
          }}
          initial={{ opacity: 0, scaleX: 0, x: -50 }}
          animate={{ opacity: [0, 1, 1, 0], scaleX: [0, 1, 1, 0], x: ['-20%', '200%'] }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.34)_48%,rgba(0,0,0,0.78)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#010203]/86" />
    </div>
  );
}
