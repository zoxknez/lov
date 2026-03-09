"use client";

import { useMemo, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { commandCenterZones } from "@/lib/data";
import LocalTime from "@/components/local-time";

type CommandCenterProps = {
  daylight: MotionValue<number>;
  isNight?: boolean;
};

export default function CommandCenter({ daylight, isNight }: CommandCenterProps) {
  const [selectedZoneId, setSelectedZoneId] = useState(commandCenterZones[0].id);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.02, 0.2], [0.72, 1]);

  const selectedZone = useMemo(
    () => commandCenterZones.find((zone) => zone.id === selectedZoneId) ?? commandCenterZones[0],
    [selectedZoneId]
  );

  const planningScore = useMemo(() => {
    const tempFactor = Math.max(0, Math.min(100, 100 - Math.abs(11 - selectedZone.feelsLikeC) * 6));
    const windPenalty = Math.min(28, selectedZone.windKmh * 0.9);
    const humidityPenalty = Math.max(0, selectedZone.humidity - 70) * 0.7;
    return Math.max(32, Math.round(tempFactor - windPenalty - humidityPenalty));
  }, [selectedZone.feelsLikeC, selectedZone.humidity, selectedZone.windKmh]);

  const windTier =
    selectedZone.windKmh >= 28 ? "Wind-sensitive" : selectedZone.windKmh >= 18 ? "Moderate adjustment" : "Stable window";
  const planningBand = planningScore >= 78 ? "High comfort" : planningScore >= 60 ? "Balanced comfort" : "Technical comfort";

  return (
    <section className={`section-shell command-center-shell command-center-phase relative z-10 ${isNight ? "is-night" : "is-day"}`}>
      <motion.div className="command-phase-day" style={{ opacity: useTransform(daylight, v => v * 0.56) }} aria-hidden />
      <motion.div className="command-phase-night" style={{ opacity: useTransform(daylight, v => (1 - v) * 0.72) }} aria-hidden />
      <div className="command-center-glow" aria-hidden />
      <motion.div
        style={{ opacity }}
        className="premium-panel hud-shell command-center-panel rounded-[30px] bg-[linear-gradient(160deg,rgba(37,65,50,0.72),rgba(20,36,30,0.56))] p-6 md:p-8"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#d9b167]">Estate Planning Desk</p>
            <h3 className="font-serif text-3xl text-white md:text-4xl">Field conditions, timing, and route context in one visual brief</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="command-live-led" aria-hidden />
            <span className="rounded-full border border-emerald-200/30 bg-emerald-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-emerald-200">
              concierge synced
            </span>
          </div>
        </div>

        <div className="mb-4 grid gap-2 md:grid-cols-3">
          {commandCenterZones.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setSelectedZoneId(zone.id)}
              className={`premium-panel command-zone rounded-xl px-3 py-2 text-left transition ${zone.id === selectedZoneId ? "border-[#dfc28f] bg-[rgba(217,177,103,0.2)]" : "bg-black/25 hover:border-[#dfc28f]/60"
                }`}
            >
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#d9b167]">{zone.region}</p>
              <p className="font-serif text-lg text-white">{zone.name}</p>
            </button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-4">
            <div className="premium-panel command-metric rounded-2xl bg-[rgba(20,48,36,0.42)] p-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#d9b167]">Local estate time</p>
              <p className="mt-1 text-sm text-stone-100"><LocalTime timezone={selectedZone.timezone} /></p>
              <p className="text-xs text-stone-300">{selectedZone.timezone}</p>
            </div>

            <div className="premium-panel command-metric rounded-2xl bg-[rgba(20,48,36,0.42)] p-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#d9b167]">Coordinates / elevation</p>
              <p className="mt-1 text-sm text-stone-100">{selectedZone.coordinates}</p>
              <p className="text-xs text-stone-300">{selectedZone.elevationM}m ASL</p>
            </div>

            <div className="premium-panel command-metric rounded-2xl bg-[rgba(20,48,36,0.42)] p-4">
              <div className="radar-disc">
                <span className="radar-sweep" />
                <span className="radar-ring ring-1" />
                <span className="radar-ring ring-2" />
                <span className="radar-ring ring-3" />
                <span className="radar-blip b1" />
                <span className="radar-blip b2" />
                <span className="radar-blip b3" />
              </div>
              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.14em] text-stone-300">
                Illustrative route pulse visualization
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            <motion.article
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="premium-panel command-feed-card rounded-2xl bg-[rgba(17,38,30,0.45)] p-4"
            >
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#d9b167]">Field conditions</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                <div className="command-chip">
                  <p className="command-chip-label">Temp</p>
                  <p className="command-chip-value">{selectedZone.temperatureC}C</p>
                </div>
                <div className="command-chip">
                  <p className="command-chip-label">Feels</p>
                  <p className="command-chip-value">{selectedZone.feelsLikeC}C</p>
                </div>
                <div className="command-chip">
                  <p className="command-chip-label">Humidity</p>
                  <p className="command-chip-value">{selectedZone.humidity}%</p>
                </div>
                <div className="command-chip">
                  <p className="command-chip-label">Wind</p>
                  <p className="command-chip-value">
                    {selectedZone.windKmh} km/h {selectedZone.windDir}
                  </p>
                </div>
                <div className="command-chip">
                  <p className="command-chip-label">Visibility</p>
                  <p className="command-chip-value">{selectedZone.visibilityKm} km</p>
                </div>
                <div className="command-chip">
                  <p className="command-chip-label">Pressure</p>
                  <p className="command-chip-value">{selectedZone.pressureHpa} hPa</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="command-inline-pill">{planningBand}</span>
                <span className="command-inline-pill">{windTier}</span>
                <span className="command-inline-pill">Risk {selectedZone.riskLevel}</span>
              </div>
              <div className="command-data-stream mt-3" aria-hidden>
                <span className="command-data-stream-bar" />
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="premium-panel command-feed-card rounded-2xl bg-[rgba(17,38,30,0.45)] p-4"
            >
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#d9b167]">Timing brief</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <p className="text-sm text-stone-100">Sunrise: {selectedZone.sunrise}</p>
                <p className="text-sm text-stone-100">Sunset: {selectedZone.sunset}</p>
                <p className="text-sm text-stone-100">Moon: {selectedZone.moonPhase}</p>
                <p className="text-sm text-stone-100">Risk: {selectedZone.riskLevel}</p>
              </div>
              <p className="mt-2 text-sm text-[#f0d8ac]">Preferred field window: {selectedZone.shotWindow}</p>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="premium-panel command-feed-card rounded-2xl bg-[rgba(17,38,30,0.45)] p-4"
            >
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#d9b167]">Observed movement pattern</p>
              <div className="mt-2 space-y-2">
                {selectedZone.species.map((item) => (
                  <div key={item.name} className="rounded-xl border border-white/10 bg-black/20 p-2">
                    <div className="flex items-center justify-between text-sm text-stone-100">
                      <span>{item.name}</span>
                      <span>{item.activity}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/35">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#e9c888] to-[#8ad9a7]" style={{ width: `${item.activity}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-stone-300">{item.status}</p>
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="premium-panel command-feed-card rounded-2xl bg-[rgba(17,38,30,0.45)] p-4"
            >
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#d9b167]">Planning note</p>
              <p className="mt-2 text-sm text-stone-100">{selectedZone.recommendation}</p>
            </motion.article>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
