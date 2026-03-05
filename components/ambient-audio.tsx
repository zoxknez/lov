"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type WeatherMode = "sun" | "wind" | "rain" | "snow";
const hasLocalAudio = false;

const sectionMix: Record<string, number> = {
  hero: 0.12,
  estate: 0.2,
  game: 0.24,
  experiences: 0.16,
  insights: 0.14,
  guides: 0.17,
  contact: 0.1
};

export default function AmbientAudio({ mode, dayCycle, activeSection }: { mode: WeatherMode; dayCycle: number; activeSection: string }) {
  const [enabled, setEnabled] = useState(false);
  const windRef = useRef<HTMLAudioElement | null>(null);
  const rainRef = useRef<HTMLAudioElement | null>(null);
  const toneRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const wind = windRef.current;
    const rain = rainRef.current;
    const tone = toneRef.current;
    if (!hasLocalAudio || !wind || !rain || !tone) return;

    const nightBoost = 0.08 + (1 - dayCycle) * 0.14;
    const sceneBoost = sectionMix[activeSection] ?? 0.12;

    if (!enabled) {
      wind.pause();
      rain.pause();
      tone.pause();
      return;
    }

    wind.play().catch(() => undefined);
    tone.play().catch(() => undefined);
    tone.volume = 0.06 + sceneBoost * 0.4 + nightBoost * 0.25;

    if (mode === "rain" || mode === "snow") {
      rain.play().catch(() => undefined);
      rain.volume = 0.1 + sceneBoost * 0.58 + nightBoost;
      wind.volume = 0.08 + sceneBoost * 0.42 + nightBoost;
    } else if (mode === "wind") {
      rain.pause();
      wind.volume = 0.14 + sceneBoost * 0.65 + nightBoost;
    } else {
      rain.pause();
      wind.volume = 0.06 + sceneBoost * 0.35 + nightBoost;
    }
  }, [activeSection, dayCycle, enabled, mode]);

  if (!hasLocalAudio) {
    return null;
  }

  return (
    <>
      <audio ref={windRef} loop preload="none" src="/audio/wind.mp3" />
      <audio ref={rainRef} loop preload="none" src="/audio/rain.mp3" />
      <audio ref={toneRef} loop preload="none" src="/audio/tone.mp3" />

      <button
        type="button"
        onClick={() => setEnabled((v) => !v)}
        className="audio-toggle premium-panel fixed bottom-5 right-5 z-[92] inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-xs uppercase tracking-[0.12em] text-stone-100"
      >
        {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        {enabled ? `Ambient On - ${activeSection}` : "Ambient Off"}
      </button>
    </>
  );
}
