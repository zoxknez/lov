"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorType, setCursorType] = useState<"default" | "tactical" | "link">("default");
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        let ticking = false;
        const moveCursor = (e: MouseEvent) => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                cursorX.set(e.clientX);
                cursorY.set(e.clientY);
                if (!isVisible) setIsVisible(true);
                ticking = false;
            });
        };

        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a, button, [role="button"]');
            const tactical = target.closest('.species-card, .map-intel-card, .trophy-intel-card, .dossier-card');

            setCursorType(link ? "link" : tactical ? "tactical" : "default");
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleOver);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
            {/* Central Dot */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9b167]"
            />

            {/* Main Ring */}
            <motion.div
                style={{ x: springX, y: springY }}
                animate={{
                    scale: cursorType === "link" ? 1.8 : cursorType === "tactical" ? 2.5 : 1,
                    opacity: cursorType === "default" ? 0.4 : 0.8,
                }}
                className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d9b167]/40 ring-1 ring-[#d9b167]/10"
            />

            {/* Scope Crosshair Lines (Nisan) */}
            <motion.div
                style={{ x: springX, y: springY }}
                animate={{ opacity: cursorType === "default" ? 0.3 : 0.6 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
                <div className="absolute top-1/2 left-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-[#d9b167]/40" />
                <div className="absolute top-1/2 left-1/2 h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-[#d9b167]/40" />
            </motion.div>

            {/* Tactical Optics */}
            {cursorType === "tactical" && (
                <motion.div
                    style={{ x: springX, y: springY }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                    {/* Rangefinder Brackets */}
                    <div className="absolute -left-12 -top-12 h-4 w-4 border-l-2 border-t-2 border-[#d9b167]/30" />
                    <div className="absolute -right-12 -top-12 h-4 w-4 border-r-2 border-t-2 border-[#d9b167]/30" />
                    <div className="absolute -bottom-12 -left-12 h-4 w-4 border-b-2 border-l-2 border-[#d9b167]/30" />
                    <div className="absolute -bottom-12 -right-12 h-4 w-4 border-b-2 border-r-2 border-[#d9b167]/30" />

                    {/* Fake Data Stream */}
                    <div className="absolute -right-32 top-0 flex flex-col gap-1 font-mono text-[8px] uppercase tracking-wider text-[#d9b167]/60">
                        <span className="animate-pulse">AZIMUTH: 184°</span>
                        <span>ELEV: +12.4m</span>
                        <span>SIG: OPTIMAL</span>
                    </div>
                </motion.div>
            )}

            {/* Link Pulse */}
            {cursorType === "link" && (
                <motion.div
                    style={{ x: springX, y: springY }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d9b167]/20"
                />
            )}
        </div>
    );
}
