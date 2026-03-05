"use client";

import { useEffect, useRef } from "react";

type WeatherMode = "sun" | "wind" | "rain" | "snow";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
};

function buildParticle(width: number, height: number, mode: WeatherMode, wind: number): Particle {
  const baseWind = (wind - 0.5) * 3.2;

  if (mode === "rain") {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: baseWind + (Math.random() - 0.5) * 0.6,
      vy: 5 + Math.random() * 5,
      size: 8 + Math.random() * 10,
      life: 80 + Math.random() * 40
    };
  }

  if (mode === "snow") {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: baseWind * 0.65 + (Math.random() - 0.5) * 0.8,
      vy: 0.8 + Math.random() * 1.6,
      size: 1.2 + Math.random() * 2.8,
      life: 220 + Math.random() * 140
    };
  }

  if (mode === "wind") {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 2 + Math.random() * 3 + baseWind,
      vy: (Math.random() - 0.5) * 0.25,
      size: 16 + Math.random() * 20,
      life: 70 + Math.random() * 30
    };
  }

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: baseWind * 0.3 + (Math.random() - 0.5) * 0.15,
    vy: 0.2 + Math.random() * 0.45,
    size: 1 + Math.random() * 2,
    life: 200 + Math.random() * 160
  };
}

function particleCount(mode: WeatherMode): number {
  if (mode === "rain") return 150;
  if (mode === "snow") return 110;
  if (mode === "wind") return 80;
  return 55;
}

export default function WeatherOverlay({
  mode,
  wind,
  dayCycle
}: {
  mode: WeatherMode;
  wind: number;
  dayCycle: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const modeRef = useRef(mode);
  const windRef = useRef(wind);
  const dayCycleRef = useRef(dayCycle);

  useEffect(() => {
    modeRef.current = mode;
    windRef.current = wind;
    dayCycleRef.current = dayCycle;
  }, [dayCycle, mode, wind]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ctx2d = ctx;

    let rafId = 0;

    function resize() {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
      particlesRef.current = Array.from(
        { length: particleCount(modeRef.current) },
        () => buildParticle(canvasEl.width, canvasEl.height, modeRef.current, windRef.current)
      );
    }

    function step() {
      const width = canvasEl.width;
      const height = canvasEl.height;

      ctx2d.clearRect(0, 0, width, height);

      const activeMode = modeRef.current;
      const activeWind = windRef.current;
      const activeDayCycle = dayCycleRef.current;
      const tone = 0.12 + (1 - activeDayCycle) * 0.36;
      ctx2d.fillStyle = `rgba(4, 8, 6, ${tone})`;
      ctx2d.fillRect(0, 0, width, height);

      for (let i = 0; i < particlesRef.current.length; i += 1) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        if (activeMode === "rain") {
          ctx2d.strokeStyle = `rgba(189, 220, 255, ${0.36 + (1 - activeDayCycle) * 0.28})`;
          ctx2d.lineWidth = 1;
          ctx2d.beginPath();
          ctx2d.moveTo(p.x, p.y);
          ctx2d.lineTo(p.x - p.vx * 1.4, p.y - p.size);
          ctx2d.stroke();
        } else if (activeMode === "snow") {
          ctx2d.fillStyle = `rgba(246, 249, 255, ${0.4 + (1 - activeDayCycle) * 0.25})`;
          ctx2d.beginPath();
          ctx2d.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx2d.fill();
        } else if (activeMode === "wind") {
          ctx2d.strokeStyle = `rgba(224, 231, 245, ${0.18 + (1 - activeDayCycle) * 0.2})`;
          ctx2d.lineWidth = 1;
          ctx2d.beginPath();
          ctx2d.moveTo(p.x, p.y);
          ctx2d.lineTo(p.x - p.size, p.y - p.vy * 3);
          ctx2d.stroke();
        } else {
          ctx2d.fillStyle = `rgba(255, 221, 166, ${0.16 + activeDayCycle * 0.2})`;
          ctx2d.beginPath();
          ctx2d.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx2d.fill();
        }

        if (p.x < -40 || p.x > width + 40 || p.y > height + 40 || p.life < 0) {
          particlesRef.current[i] = buildParticle(width, height, activeMode, activeWind);
          particlesRef.current[i].y = -8;
        }
      }

      rafId = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="weather-canvas" aria-hidden />;
}
