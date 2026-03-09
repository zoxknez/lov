"use client";

import { motion, useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type WeatherMode = "sun" | "wind" | "rain" | "snow";

const sectionMix: Record<string, number> = {
  hero: 0.12,
  estate: 0.2,
  game: 0.24,
  experiences: 0.16,
  insights: 0.14,
  guides: 0.17,
  contact: 0.1
};

export default function AmbientAudio({ mode, dayCycle, activeSection }: { mode: WeatherMode; dayCycle: MotionValue<number>; activeSection: string }) {
  const [enabled, setEnabled] = useState(false);
  const windRef = useRef<HTMLAudioElement | null>(null);
  const rainRef = useRef<HTMLAudioElement | null>(null);
  const toneRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const wind = windRef.current;
    const rain = rainRef.current;
    const tone = toneRef.current;
    if (!wind || !rain || !tone || !enabled) {
      if (wind) wind.pause();
      if (rain) rain.pause();
      if (tone) tone.pause();
      return;
    }
  }, [enabled]);

  useMotionValueEvent(dayCycle, "change", (latestDayCycle: number) => {
    const wind = windRef.current;
    const rain = rainRef.current;
    const tone = toneRef.current;
    if (!wind || !rain || !tone || !enabled) return;

    const nightBoost = 0.08 + (1 - latestDayCycle) * 0.14;
    const sceneBoost = sectionMix[activeSection] ?? 0.12;

    if (wind.paused) wind.play().catch(() => undefined);
    if (tone.paused) tone.play().catch(() => undefined);

    tone.volume = 0.06 + sceneBoost * 0.4 + nightBoost * 0.25;

    if (mode === "rain" || mode === "snow") {
      if (rain.paused) rain.play().catch(() => undefined);
      rain.volume = 0.1 + sceneBoost * 0.58 + nightBoost;
      wind.volume = 0.08 + sceneBoost * 0.42 + nightBoost;
    } else if (mode === "wind") {
      if (!rain.paused) rain.pause();
      wind.volume = 0.14 + sceneBoost * 0.65 + nightBoost;
    } else {
      if (!rain.paused) rain.pause();
      wind.volume = 0.06 + sceneBoost * 0.35 + nightBoost;
    }
  });

  return (
    <>
      <audio ref={windRef} loop preload="none" src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_31f4f8f9ca.mp3?filename=wind-blowing-ambient-11067.mp3" />
      <audio ref={rainRef} loop preload="none" src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_1f4c238f4a.mp3?filename=light-rain-ambient-114354.mp3" />
      <audio ref={toneRef} loop preload="none" src="https://cdn.pixabay.com/download/audio/2022/06/07/audio_3dba6d3b58.mp3?filename=ambient-piano-logo-106694.mp3" />

      <button
        type="button"
        onClick={() => setEnabled((v) => !v)}
        className="audio-toggle premium-panel fixed bottom-5 right-5 z-[92] inline-flex items-center gap-3 rounded-full bg-black/65 px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-stone-100 backdrop-blur-xl border-white/10 transition-all hover:bg-black/80 hover:scale-105"
      >
        <div className="flex h-3 items-center gap-0.5" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              animate={enabled ? { height: ["20%", "100%", "40%", "80%", "20%"] } : { height: "20%" }}
              transition={{ repeat: Infinity, duration: 0.6 + i * 0.1 }}
              className="w-0.5 rounded-full bg-[#d9b167]"
            />
          ))}
        </div>
        <span>{enabled ? "Ambient Active" : "Ambient Static"}</span>
      </button>
    </>
  );
}
