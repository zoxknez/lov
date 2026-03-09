"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";

type WeatherMode = "sun" | "wind" | "rain" | "snow";

type Particle = { x: number; y: number; v: number; w: number; size: number; o: number };

export default function WeatherParticles({ mode }: { mode: WeatherMode }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        // Initialize particles based on mode
        particles.current = [];
        const count = mode === "rain" ? 120 : mode === "snow" ? 180 : 0;

        for (let i = 0; i < count; i++) {
            particles.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                v: mode === "rain" ? 12 + Math.random() * 8 : 1 + Math.random() * 2,
                w: Math.random() * 2 - 1,
                size: mode === "rain" ? 1 : 2 + Math.random() * 2,
                o: Math.random() * 0.4 + 0.1
            });
        }

        return () => window.removeEventListener("resize", resize);
    }, [mode]);

    useAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (!canvas || (mode !== "rain" && mode !== "snow")) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (mode === "rain") {
            ctx.strokeStyle = "rgba(174, 194, 224, 0.4)";
            ctx.lineWidth = 1;
            ctx.lineCap = "round";
            ctx.beginPath();
            particles.current.forEach((p) => {
                p.y += p.v;
                p.x += p.w;
                if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.w * 2, p.y + p.v);
            });
            ctx.stroke();
        } else if (mode === "snow") {
            ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
            particles.current.forEach((p) => {
                p.y += p.v;
                p.x += p.w;
                if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    });

    if (mode === "sun" || mode === "wind") return null;

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[85] opacity-50 transition-opacity duration-1000"
            style={{ mixBlendMode: mode === "snow" ? "normal" : "screen" }}
        />
    );
}
