"use client";

import { useEffect, useMemo, useState } from "react";

const speciesMap: Record<string, number> = {
  "Red Stag": 8400,
  "Fallow Buck": 6300,
  "Wild Boar": 4700,
  "Mixed Expedition": 9800
};

const stayMap: Record<string, number> = {
  "3 Nights": 1900,
  "5 Nights": 3000,
  "7 Nights": 4200
};

const comfortMap: Record<string, number> = {
  "Lodge Suite": 0,
  "Private Chalet": 1700,
  "Family Villa": 2600
};

const transferMap: Record<string, number> = {
  "Premium 4x4": 0,
  "Heli Transfer": 3500
};

const budgetBands = [
  { label: "NZ$15k - 30k", min: 15000, max: 30000 },
  { label: "NZ$30k - 50k", min: 30000, max: 50000 },
  { label: "NZ$50k+", min: 50000, max: Infinity }
];

export type BookingConfig = {
  species: string;
  stay: string;
  comfort: string;
  transfer: string;
  guests: number;
  perHunter: number;
  total: number;
  budgetBand: string;
};

type BookingConfiguratorProps = {
  onConfigChange?: (config: BookingConfig) => void;
};

export default function BookingConfigurator({ onConfigChange }: BookingConfiguratorProps) {
  const [species, setSpecies] = useState("Red Stag");
  const [stay, setStay] = useState("5 Nights");
  const [comfort, setComfort] = useState("Private Chalet");
  const [transfer, setTransfer] = useState("Premium 4x4");
  const [guests, setGuests] = useState(2);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const raw = window.localStorage.getItem("kaimanawa-config");
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<BookingConfig>;
        if (parsed.species && speciesMap[parsed.species]) setSpecies(parsed.species);
        if (parsed.stay && stayMap[parsed.stay]) setStay(parsed.stay);
        if (parsed.comfort && comfortMap[parsed.comfort]) setComfort(parsed.comfort);
        if (parsed.transfer && transferMap[parsed.transfer]) setTransfer(parsed.transfer);
        if (typeof parsed.guests === "number") setGuests(parsed.guests);
      }
    } catch { }
  }, []);

  const quote = useMemo(() => {
    const perHunter = speciesMap[species] + stayMap[stay] + comfortMap[comfort] + transferMap[transfer];
    const total = perHunter * guests;
    const budgetBand = budgetBands.find((band) => total >= band.min && total < band.max)?.label ?? "NZ$50k+";
    return { perHunter, total, budgetBand };
  }, [comfort, guests, species, stay, transfer]);

  const recommendation = useMemo(() => {
    if (species === "Red Stag") return "Recommended guide profile: High-score Red Stag specialist.";
    if (species === "Fallow Buck") return "Recommended guide profile: Wind and terrain specialist.";
    if (species === "Wild Boar") return "Recommended guide profile: Safety and expedition lead.";
    return "Recommended guide profile: Mixed itinerary lead pair.";
  }, [species]);

  useEffect(() => {
    if (!isMounted) return;
    const payload: BookingConfig = {
      species,
      stay,
      comfort,
      transfer,
      guests,
      perHunter: quote.perHunter,
      total: quote.total,
      budgetBand: quote.budgetBand,
    };
    window.localStorage.setItem("kaimanawa-config", JSON.stringify(payload));
    onConfigChange?.(payload);
  }, [comfort, guests, isMounted, onConfigChange, quote.budgetBand, quote.perHunter, quote.total, species, stay, transfer]);

  return (
    <article className="premium-panel rounded-[30px] bg-black/40 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">Program Configurator</p>
          <h3 className="mt-2 font-serif text-3xl text-white">Shape the outline of your stay</h3>
        </div>
        <div className="inline-flex rounded-full border border-white/20 bg-black/25 p-1 text-[10px] uppercase tracking-[0.13em]">
          {[1, 2, 3].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStep(item as 1 | 2 | 3)}
              className={`rounded-full px-3 py-1 transition ${item === step ? "bg-[#d9b167] text-black" : "text-stone-300"}`}
            >
              Step {item}
            </button>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            Species
            <select value={species} onChange={(e) => setSpecies(e.target.value)} className="field-control mt-2">
              {Object.keys(speciesMap).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Stay
            <select value={stay} onChange={(e) => setStay(e.target.value)} className="field-control mt-2">
              {Object.keys(stayMap).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            Accommodation
            <select value={comfort} onChange={(e) => setComfort(e.target.value)} className="field-control mt-2">
              {Object.keys(comfortMap).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Transfer
            <select value={transfer} onChange={(e) => setTransfer(e.target.value)} className="field-control mt-2">
              {Object.keys(transferMap).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {step === 3 && (
        <div className="mt-4">
          <label className="text-sm">
            Hunters in group
            <input
              type="range"
              min={1}
              max={6}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-3 w-full"
            />
            <p className="mt-1 text-xs text-stone-300">{guests} hunters</p>
          </label>
          <p className="mt-3 rounded-xl border border-white/12 bg-black/25 px-3 py-2 text-sm text-stone-200">{recommendation}</p>
        </div>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="premium-panel rounded-xl bg-black/35 p-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Per guest estimate</p>
          <p className="mt-1 text-2xl font-semibold text-[#f0d8ac]">NZ${quote.perHunter.toLocaleString('en-NZ')}</p>
        </div>
        <div className="premium-panel rounded-xl bg-black/35 p-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Group estimate</p>
          <p className="mt-1 text-2xl font-semibold text-[#f0d8ac]">NZ${quote.total.toLocaleString('en-NZ')}</p>
        </div>
        <div className="premium-panel rounded-xl bg-black/35 p-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Budget profile</p>
          <p className="mt-1 text-xl font-semibold text-[#f0d8ac]">{quote.budgetBand}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-stone-300">Indicative pricing only. Final program and pricing are refined through concierge review.</p>
    </article>
  );
}
