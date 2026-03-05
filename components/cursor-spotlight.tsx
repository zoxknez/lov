"use client";

import { CSSProperties, useEffect, useState } from "react";

export default function CursorSpotlight({ enabled }: { enabled: boolean }) {
  const [point, setPoint] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function onMove(event: MouseEvent) {
      setPoint({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100
      });
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="cursor-spotlight"
      style={
        {
          "--spot-x": `${point.x}%`,
          "--spot-y": `${point.y}%`
        } as CSSProperties
      }
      aria-hidden
    />
  );
}
