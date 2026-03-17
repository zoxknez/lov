"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for the premium feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#080808]"
        >
          <div className="flex flex-col items-center gap-6">
            <span className="font-[family-name:var(--font-display)] text-sm tracking-[0.45em] uppercase text-white">
              Kaimanawa
            </span>
            <div className="w-[120px] h-px bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                className="absolute inset-y-0 left-0 w-1/2 bg-[#c8a96e]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
