"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function ScrollCompass() {
  const { scrollYProgress } = useScroll();
  const spin = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const [progressLabel, setProgressLabel] = useState("0% scrolled");

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgressLabel(`${Math.round(value * 100)}% scrolled`);
  });

  return (
    <aside className="pointer-events-none fixed right-4 top-1/2 z-[88] hidden -translate-y-1/2 xl:block">
      <div className="premium-panel compass-shell rounded-2xl bg-black/40 p-3">
        <motion.div className="compass-disc" style={{ rotate: spin }}>
          <span className="compass-mark n">N</span>
          <span className="compass-mark e">E</span>
          <span className="compass-mark s">S</span>
          <span className="compass-mark w">W</span>
          <span className="compass-core" />
        </motion.div>
        <p className="mt-2 text-center text-[10px] uppercase tracking-[0.15em] text-[#dfc28f]">{progressLabel}</p>
      </div>
    </aside>
  );
}
