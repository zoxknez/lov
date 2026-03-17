"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type CursorMode = "default" | "interactive" | "field";

function subscribeToHydration() {
  return () => {};
}

export default function CustomCursor() {
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const visibleRef = useRef(false);
  const pathname = usePathname();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 24, stiffness: 220, mass: 0.48 });
  const cursorYSpring = useSpring(cursorY, { damping: 24, stiffness: 220, mass: 0.48 });
  const haloXSpring = useSpring(cursorX, { damping: 18, stiffness: 120, mass: 0.8 });
  const haloYSpring = useSpring(cursorY, { damping: 18, stiffness: 120, mass: 0.8 });

  useEffect(() => {
    if (!mounted) return;

    const moveCursor = (event: MouseEvent) => {
      cursorX.set(event.clientX - 28);
      cursorY.set(event.clientY - 28);

      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      visibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const interactive = target.closest("a, button, [role='button'], .interactive");
      const field = target.closest("input, textarea, select, label");

      if (interactive) {
        setMode("interactive");
        return;
      }

      if (field) {
        setMode("field");
        return;
      }

      setMode("default");
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, [mounted, pathname]);

  if (!mounted) {
    return null;
  }

  if (window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const outerBorderColor =
    mode === "interactive"
      ? "rgba(232, 201, 138, 0.96)"
      : mode === "field"
        ? "rgba(255, 255, 255, 0.48)"
        : "rgba(200, 169, 110, 0.42)";

  const innerBorderColor =
    mode === "interactive"
      ? "rgba(255, 255, 255, 0.82)"
      : mode === "field"
        ? "rgba(255, 255, 255, 0.38)"
        : "rgba(255, 255, 255, 0.22)";

  const accentColor =
    mode === "interactive"
      ? "rgba(232, 201, 138, 1)"
      : mode === "field"
        ? "rgba(255, 255, 255, 0.88)"
        : "rgba(200, 169, 110, 0.84)";

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[9997] h-24 w-24 rounded-full pointer-events-none blur-[18px]"
        style={{
          x: haloXSpring,
          y: haloYSpring,
          background:
            "radial-gradient(circle, rgba(200,169,110,0.28) 0%, rgba(200,169,110,0.12) 30%, transparent 72%)",
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          scale: mode === "interactive" ? 1.2 : mode === "field" ? 0.85 : 1,
          opacity: mode === "interactive" ? 0.9 : mode === "field" ? 0.4 : 0.6
        }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      />

      <motion.div
        className="fixed left-0 top-0 z-[9999] flex h-14 w-14 pointer-events-none items-center justify-center transform-gpu"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0
        }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{
            scale: mode === "interactive" ? 1.18 : mode === "field" ? 0.92 : 1
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.span
            className="absolute inset-0 rounded-full border"
            animate={{
              borderColor: outerBorderColor,
              boxShadow:
                mode === "interactive"
                  ? "0 0 0 1px rgba(255,255,255,0.05), 0 0 30px rgba(200,169,110,0.22)"
                  : mode === "field"
                    ? "0 0 0 1px rgba(255,255,255,0.03), 0 0 18px rgba(255,255,255,0.08)"
                    : "0 0 0 1px rgba(255,255,255,0.03), 0 0 24px rgba(200,169,110,0.16)"
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          />

          <motion.span
            className="absolute inset-[12px] rounded-full border"
            animate={{
              borderColor: innerBorderColor,
              scale: mode === "interactive" ? 1.08 : 1,
              rotate: mode === "interactive" ? 45 : 0,
              opacity: mode === "field" ? 0.55 : 0.88
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          />

          <motion.span
            className="absolute left-1/2 top-[3px] w-px -translate-x-1/2 rounded-full"
            animate={{ height: mode === "interactive" ? 13 : 10, backgroundColor: accentColor }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          <motion.span
            className="absolute bottom-[3px] left-1/2 w-px -translate-x-1/2 rounded-full"
            animate={{ height: mode === "interactive" ? 13 : 10, backgroundColor: accentColor }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          <motion.span
            className="absolute left-[3px] top-1/2 h-px -translate-y-1/2 rounded-full"
            animate={{ width: mode === "interactive" ? 13 : 10, backgroundColor: accentColor }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          <motion.span
            className="absolute right-[3px] top-1/2 h-px -translate-y-1/2 rounded-full"
            animate={{ width: mode === "interactive" ? 13 : 10, backgroundColor: accentColor }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />

          <motion.span
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            animate={{
              scale: mode === "interactive" ? 1.2 : 1,
              backgroundColor: accentColor,
              boxShadow:
                mode === "interactive"
                  ? "0 0 18px rgba(232,201,138,0.45)"
                  : "0 0 12px rgba(200,169,110,0.28)"
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
