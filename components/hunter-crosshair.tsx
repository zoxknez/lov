"use client";

import { useEffect, useRef } from "react";

export default function HunterCrosshair() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let ox = tx;
    let oy = ty;
    let ix = tx;
    let iy = ty;

    function onMove(event: MouseEvent) {
      tx = event.clientX;
      ty = event.clientY;
    }

    function frame() {
      ox += (tx - ox) * 0.18;
      oy += (ty - oy) * 0.18;
      ix += (tx - ix) * 0.38;
      iy += (ty - iy) * 0.38;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${ix}px, ${iy}px, 0)`;
      }

      rafId = requestAnimationFrame(frame);
    }

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="crosshair-outer" aria-hidden>
        <span className="crosshair-line h" />
        <span className="crosshair-line v" />
      </div>
      <div ref={innerRef} className="crosshair-inner" aria-hidden />
    </>
  );
}
