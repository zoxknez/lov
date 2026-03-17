"use client";

import { useEffect, useRef } from "react";

interface AuroraCanvasProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export default function AuroraCanvas({ className = "", intensity = "medium" }: AuroraCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);

  const opacityMap = { low: 0.7, medium: 1, high: 1.3 };
  const op = opacityMap[intensity];

  return (
    <div ref={ref} className={`aurora ${className}`} aria-hidden="true">
      <div
        className="aurora__blob aurora__blob--1"
        style={{ opacity: 0.55 * op }}
      />
      <div
        className="aurora__blob aurora__blob--2"
        style={{ opacity: 0.35 * op }}
      />
      <div
        className="aurora__blob aurora__blob--3"
        style={{ opacity: 0.45 * op }}
      />
      {/* Extra deep glow at top-center */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "25%",
          width: "50%",
          height: "35%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(25,48,30,0.7) 0%, transparent 75%)",
          filter: "blur(70px)",
          opacity: 0.5 * op,
          pointerEvents: "none"
        }}
      />
      {/* Subtle gold highlight */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "30%",
          height: "25%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(201,146,42,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.6 * op,
          pointerEvents: "none"
        }}
      />
    </div>
  );
}
