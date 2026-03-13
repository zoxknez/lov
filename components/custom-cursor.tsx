"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "interactive" | "focus";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.22 });
  const ringY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.22 });
  const coreX = useSpring(x, { stiffness: 420, damping: 30, mass: 0.12 });
  const coreY = useSpring(y, { stiffness: 420, damping: 30, mass: 0.12 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMode = () => {
      const active = media.matches && !reduceMotion.matches;
      setEnabled(active);

      if (active) {
        document.body.classList.add("custom-crosshair");
      } else {
        document.body.classList.remove("custom-crosshair");
      }
    };

    syncMode();
    media.addEventListener("change", syncMode);
    reduceMotion.addEventListener("change", syncMode);

    return () => {
      media.removeEventListener("change", syncMode);
      reduceMotion.removeEventListener("change", syncMode);
      document.body.classList.remove("custom-crosshair");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest(".aim-target")) {
        setMode("focus");
        return;
      }

      if (target.closest("a, button, input, textarea, select, label")) {
        setMode("interactive");
        return;
      }

      setMode("default");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled || !visible) return null;

  const scale = mode === "focus" ? 1.45 : mode === "interactive" ? 1.18 : 1;
  const opacity = mode === "default" ? 0.72 : 0.96;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] hidden lg:block">
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale, opacity }}
        className="reticle-ring"
      >
        <span className="reticle-line reticle-line-h" />
        <span className="reticle-line reticle-line-v" />
      </motion.div>

      <motion.div
        style={{ x: coreX, y: coreY }}
        animate={{ scale: mode === "focus" ? 1.25 : 1 }}
        className="reticle-core"
      />

      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: mode === "focus" ? 1 : 0 }}
        className="reticle-brackets"
      >
        <span className="reticle-corner reticle-corner-tl" />
        <span className="reticle-corner reticle-corner-tr" />
        <span className="reticle-corner reticle-corner-bl" />
        <span className="reticle-corner reticle-corner-br" />
      </motion.div>
    </div>
  );
}
