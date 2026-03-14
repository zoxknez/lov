"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FormEvent, useState } from "react";
import {
  AlertTriangle,
  BedDouble,
  CheckCircle2,
  Crosshair,
  Mail,
  MapPinned,
  MountainSnow,
  PhoneCall,
  PlaneLanding,
  ShieldCheck,
  Trees,
  UtensilsCrossed
} from "lucide-react";
import LocalTime from "@/components/local-time";
import TurnstileWidget from "@/components/turnstile-widget";
import {
  areaHighlights,
  fieldJournal,
  galleryShowcase,
  galleryPlaceholders,
  heroFacts,
  heroVisuals,
  navigation,
  planningNotes,
  pricingItems,
  speciesCatalog,
  teamProfiles,
  timeline,
  values
} from "@/lib/site-content";

const revealUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 }
};

const planningIcons = [BedDouble, UtensilsCrossed, PlaneLanding, MapPinned, ShieldCheck] as const;

export default function ModernSite() {
  const reduceMotion = useReducedMotion();
  const [activeArea, setActiveArea] = useState(0);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"idle" | "ok" | "err">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      targetSpecies: String(formData.get("targetSpecies") ?? ""),
      message: String(formData.get("message") ?? ""),
      preferredMonth: String(formData.get("preferredMonth") ?? ""),
      groupSize: String(formData.get("groupSize") ?? ""),
      accommodation: "Lodge base + remote camp if required",
      transferMode: "4WD with helicopter support where lawful and required",
      programLength: "Custom by species",
      budgetBand: "Pricing on request",
      antiBotField: String(formData.get("antiBotField") ?? ""),
      turnstileToken
    };

    setSubmitting(true);
    setStatus("");
    setStatusTone("idle");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { ok?: boolean; forwarded?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error ?? "Failed");

      setStatus(
        result.forwarded === false
          ? "Request received. Forwarding needs a manual check, but your note has been stored."
          : "Request received. Kaimanawa Trophy Safaris will follow up with planning details."
      );
      setStatusTone("ok");
      setTurnstileToken("");
      event.currentTarget.reset();
    } catch {
      setStatus("Submission failed. Please retry or contact the team directly by email or WhatsApp.");
      setStatusTone("err");
    } finally {
      setSubmitting(false);
    }
  }

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" as const };

  return (
    <div className="relative z-10 bg-[#060907]">
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-gradient-to-b from-[#060907]/60 to-transparent">
        <div className="section-shell flex min-h-[90px] items-center justify-between gap-5 py-4">
          <a href="#top" className="flex min-w-0 items-center gap-3 group">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/20 backdrop-blur-md transition-colors group-hover:bg-white/10">
              <span className="font-display text-xl text-white">K</span>
            </span>
            <div className="min-w-0">
              <p className="font-display text-xl uppercase tracking-[0.24em] text-white sm:text-2xl">Kaimanawa</p>
              <p className="truncate text-[10px] uppercase tracking-[0.4em] text-white/50 sm:text-[11px]">Trophy Safaris | New Zealand</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80 lg:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="rounded-full bg-white px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-transform hover:scale-105">Plan Your Hunt</a>
        </div>
      </header>

      <main id="top" className="bg-[#060907]">
        <section className="relative flex min-h-screen flex-col items-center justify-center pt-24 overflow-hidden" id="hero">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 z-0 origin-center"
          >
            <Image
              src={heroVisuals[1].image}
              alt="Southern Alps New Zealand"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#060907]/40 via-[#060907]/20 to-[#060907]/90 mix-blend-multiply" />
          <div className="absolute inset-0 z-0 bg-black/10" />

          <div className="section-shell relative z-10 flex w-full flex-col justify-center text-center">
            <motion.div {...revealUp} transition={transition} className="mx-auto max-w-4xl">
              <span className="inline-block rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white backdrop-blur-md">
                A True New Zealand Experience
              </span>
              <h1 className="mt-8 font-display text-6xl leading-[0.95] text-white sm:text-7xl lg:text-8xl">
                Experience the Hunt. <br/> Discover New Zealand.
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
                Explore New Zealand&apos;s finest alpine and bush trophies, with carefully planned windows to ensure prime hunting conditions across every season.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a href="#species" className="rounded-full bg-white px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-black transition-transform hover:scale-105">
                  Explore Species
                </a>
                <a href="#contact" className="rounded-full border border-white/30 bg-black/30 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                  Start Planning
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            {...revealUp}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.2 }}
            className="section-shell relative z-10 mt-auto w-full pb-10 pt-20"
          >
            <div className="grid grid-cols-2 gap-6 divide-x divide-white/10 border-t border-white/10 pt-8 lg:grid-cols-4">
              {heroFacts.map((fact) => (
                <div key={fact.label} className="pl-6 first:pl-0">
                  <p className="font-display text-xl text-white sm:text-2xl">{fact.value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/60">{fact.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="section-shell pt-10 pb-20">
          <div className="grid gap-x-16 gap-y-24 md:grid-cols-2">
            {fieldJournal.map((item, index) => (
              <motion.article
                key={item.title}
                {...revealUp}
                transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.1 }}
                className={`relative border-t border-white/10 pt-8 ${index % 2 !== 0 ? 'md:mt-32' : 'md:mt-0'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#d9b167]">{item.accent}</span>
                  <div className="h-px flex-grow bg-white/5" />
                </div>
                <h3 className="mt-8 font-display text-4xl font-light tracking-tight leading-tight text-white pr-8">{item.title}</h3>
                <p className="mt-6 text-sm leading-relaxed text-stone-300 max-w-sm">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="species">
          <motion.div {...revealUp} transition={transition} className="section-heading border-t border-white/5 pt-16">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#d9b167] font-medium">Species Available</span>
            <h2 className="mt-6 font-display text-4xl font-light tracking-tight text-white sm:text-6xl">New Zealand game, mapped more carefully</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-300">
              Explore New Zealand&apos;s finest alpine and bush trophies, with carefully planned windows to ensure prime hunting conditions across every season.
            </p>
          </motion.div>

          <div className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-[4vw] px-[4vw] lg:-mx-[min(4vw, (100vw-1180px)/2)] lg:px-[min(4vw, (100vw-1180px)/2)]">
            {speciesCatalog.map((species, index) => (
              <motion.article
                key={species.name}
                {...revealUp}
                transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.05 }}
                className="group relative flex-none w-[85vw] sm:w-[450px] aspect-[4/5] flex-col justify-end overflow-hidden bg-stone-900 snap-center sm:snap-start shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                  className="absolute inset-0 z-0 origin-center"
                >
                  <Image
                    src={species.image || heroVisuals[2].image}
                    alt={species.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 85vw, 450px"
                  />
                </motion.div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#060907]/95 via-[#060907]/30 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
                
                <div className="relative z-20 p-8">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#d9b167]">{species.season}</span>
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-light text-white">{species.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/80 line-clamp-2 md:line-clamp-none md:opacity-0 md:h-0 md:-translate-y-4 md:transition-all md:duration-500 group-hover:md:opacity-100 group-hover:md:h-auto group-hover:md:translate-y-0 text-shadow-sm">{species.note}</p>
                  
                  <div className="mt-5 border-t border-white/10 pt-5 opacity-0 transition-all duration-500 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:block">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#d9b167]">Terrain</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/90">{species.terrain}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-shell pt-32" id="areas">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center border-t border-white/5 pt-16">
            <motion.div {...revealUp} transition={transition}>
              <span className="text-[11px] uppercase tracking-[0.4em] text-[#d9b167] font-medium">Hunting Areas</span>
              <h2 className="mt-6 font-display text-4xl font-light tracking-tight leading-tight text-white sm:text-5xl">North Island bush to South Island alpine country</h2>
              <p className="mt-8 text-lg leading-relaxed text-stone-300">
                From the dense native blocks of the Central North Island to the rugged, high-country peaks of the Southern Alps.
              </p>

              <div className="mt-16 flex flex-col">
                {areaHighlights.map((area, index) => (
                  <button
                    key={area.title}
                    onClick={() => setActiveArea(index)}
                    className={`group text-left border-t ${activeArea === index ? 'border-[#d9b167]' : 'border-white/10'} pt-8 pb-6 transition-colors duration-500`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={`font-display text-2xl md:text-3xl transition-colors duration-500 ${activeArea === index ? 'text-[#d9b167]' : 'text-white group-hover:text-white/80'}`}>
                        {area.title}
                      </h3>
                      <span className={`text-2xl font-light transition-transform duration-500 transform ${activeArea === index ? 'text-[#d9b167] rotate-45' : 'text-white/30 group-hover:text-white/60'}`}>
                        +
                      </span>
                    </div>
                    <div className={`overflow-hidden transition-all duration-700 ease-in-out pr-8 ${activeArea === index ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm leading-relaxed text-stone-300">{area.intro}</p>
                      <ul className="mt-6 space-y-4 text-sm text-stone-400">
                        {area.details.map((detail) => (
                          <li key={detail} className="flex gap-4">
                            <span className="text-[#d9b167]/50 mt-1">•</span>
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div {...revealUp} transition={{ ...transition, delay: reduceMotion ? 0 : 0.1 }} className="relative aspect-[4/5] w-full overflow-hidden bg-[#060907]">
              <motion.div
                key={activeArea}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={heroVisuals[activeArea === 0 ? 0 : 1].image}
                  alt={areaHighlights[activeArea].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#060907]/60 via-transparent to-[#060907]/10" />
            </motion.div>
          </div>
        </section>

        <section className="relative min-h-[80vh] flex items-center overflow-hidden" id="story">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 z-0 origin-center"
          >
            <Image
              src="https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&w=2000&q=80"
              alt="New Zealand Heritage"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#060907] via-[#060907]/60 to-transparent" />
          
          <div className="section-shell relative z-10 grid gap-16 lg:grid-cols-2">
            <motion.div {...revealUp} transition={transition} className="max-w-xl">
              <span className="text-[11px] uppercase tracking-[0.4em] text-[#d9b167] font-medium">Our Story</span>
              <h2 className="mt-8 font-display text-5xl font-light tracking-tight leading-tight text-white md:text-7xl">A tradition of guided pursuit</h2>
              <p className="mt-8 text-lg leading-relaxed text-white/80">
                Built on decades of field experience and a commitment to the fair-chase ethics that define New Zealand hunting.
              </p>
              
              <div className="mt-12 space-y-12">
                {values.map((value) => (
                  <div key={value.title} className="border-l border-[#d9b167]/40 pl-8 transition-colors hover:border-[#d9b167]">
                    <h3 className="font-display text-2xl text-white font-light">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{value.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-shell py-32" id="planning">
          <motion.div {...revealUp} transition={transition} className="section-heading mb-20 border-t border-white/5 pt-16">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#d9b167] font-medium">Planning Your Hunt</span>
            <h2 className="mt-8 font-display text-4xl font-light tracking-tight leading-tight text-white sm:text-6xl text-center max-w-4xl mx-auto">Logistics, travel, and permits</h2>
          </motion.div>

          <div className="grid gap-px bg-white/5 border border-white/5">
            <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3">
              {planningNotes.map((item, index) => {
                const Icon = planningIcons[index];
                return (
                  <motion.article
                    key={item.title}
                    {...revealUp}
                    transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.05 }}
                    className="bg-[#060907] p-10 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                        <Icon size={20} className="text-[#d9b167]" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40">Step 0{index + 1}</span>
                    </div>
                    <h3 className="font-display text-2xl text-white font-light mb-4">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-stone-400">{item.text}</p>
                  </motion.article>
                );
              })}
              
              <div className="bg-[#0c120e] p-10 flex flex-col justify-center border-l border-white/5">
                <h3 className="font-display text-2xl text-white font-light mb-6">Pricing Structure</h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#d9b167] mb-4">Included</p>
                    <ul className="space-y-2 text-sm text-stone-300">
                      {pricingItems.included.map((item) => (
                        <li key={item} className="flex gap-3"><span className="text-[#d9b167]">✓</span><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Extra</p>
                    <ul className="space-y-2 text-sm text-stone-400">
                      {pricingItems.excluded.map((item) => (
                        <li key={item} className="flex gap-3"><span className="text-white/20">•</span><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div {...revealUp} transition={transition} className="mt-24 grid gap-12 lg:grid-cols-2 border-t border-white/5 pt-16">
            <div className="space-y-8">
              <span className="text-[11px] uppercase tracking-[0.4em] text-[#d9b167] font-medium">Important Logistics</span>
              <div className="grid gap-8">
                <p className="flex gap-6"><span className="text-[#d9b167] text-xl font-light">01</span><span className="text-sm leading-relaxed text-stone-400">Firearms Safety Authority guidance says international visitors should usually begin the visitor&apos;s firearms licence process about 4 months before arrival.</span></p>
                <p className="flex gap-6"><span className="text-[#d9b167] text-xl font-light">02</span><span className="text-sm leading-relaxed text-stone-400">DOC open hunting permits are free, last 12 months, and each hunter needs their own permit for public conservation land.</span></p>
              </div>
            </div>
            <div className="space-y-8 lg:border-l lg:border-white/5 lg:pl-16">
              <span className="text-[11px] uppercase tracking-[0.4em] text-white/30 font-medium opacity-0 lg:opacity-100 hidden lg:block">Regulatory Detail</span>
              <div className="grid gap-8">
                <p className="flex gap-6"><span className="text-[#d9b167] text-xl font-light">03</span><span className="text-sm leading-relaxed text-stone-400">Where helicopter-assisted public-land hunting is part of a program, DOC concessions, ballot conditions, or landing permissions may affect what is possible.</span></p>
                <p className="flex gap-6"><span className="text-[#d9b167] text-xl font-light">04</span><span className="text-sm leading-relaxed text-stone-400">MPI export paperwork and any required CITES permits should be planned early, especially if the trophy is heading to the EU, Great Britain, Mexico, or South Africa.</span></p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="section-shell" id="gallery">
          <motion.div {...revealUp} transition={transition} className="section-heading border-t border-white/5 pt-16">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#d9b167] font-medium">Gallery Ready</span>
            <h2 className="mt-8 font-display text-4xl font-light tracking-tight leading-tight text-white sm:text-5xl">Moments from the field, captured in the wild</h2>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryShowcase.map((item, index) => (
              <motion.article
                key={item.title}
                {...revealUp}
                transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.1 }}
                className={`group relative overflow-hidden bg-stone-900 ${index % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/5] md:mt-24'}`}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                  className="absolute inset-0 z-0 origin-center"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#060907]/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                <div className="relative z-20 p-10 h-full flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#d9b167]">Atmospheric Reference</span>
                  <h3 className="mt-4 font-display text-3xl font-light text-white">{item.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/5" id="contact">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[50vh] lg:min-h-0 overflow-hidden bg-stone-900">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 z-0 origin-center"
              >
                <Image
                  src="https://images.unsplash.com/photo-1547970810-dc1eef47299a?auto=format&fit=crop&w=1600&q=80"
                  alt="Contact Concierge"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#060907]/60 to-transparent" />
              <div className="relative z-20 p-12 md:p-24 h-full flex flex-col justify-end bg-black/20">
                <span className="text-[11px] uppercase tracking-[0.4em] text-[#d9b167] font-medium">Concierge</span>
                <h2 className="mt-6 font-display text-5xl font-light tracking-tight leading-tight text-white md:text-7xl">Plan your campaign</h2>
                <div className="mt-12 space-y-8">
                  <a href="mailto:hunting@kaimanawasafaris.com" className="group flex items-center gap-6 text-white/80 transition-colors hover:text-white">
                    <Mail size={24} className="text-[#d9b167]" />
                    <span className="text-sm tracking-[0.2em] uppercase font-light">hunting@kaimanawasafaris.com</span>
                  </a>
                  <a href="tel:+642108850131" className="group flex items-center gap-6 text-white/80 transition-colors hover:text-white">
                    <PhoneCall size={24} className="text-[#d9b167] transition-transform group-hover:scale-110" />
                    <span className="text-sm tracking-[0.2em] uppercase font-light">+64 21 088 50131</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#060907] p-12 md:p-24 lg:p-32">
              <motion.form {...revealUp} transition={{ ...transition, delay: 0.1 }} onSubmit={onSubmit} className="max-w-xl mx-auto">
                <div className="mb-16">
                  <h3 className="font-display text-4xl font-light text-white mb-4">Inquiry details</h3>
                  <div className="h-px w-24 bg-[#d9b167]" />
                </div>

                <input type="hidden" name="turnstileToken" value={turnstileToken} />
                <input type="text" name="antiBotField" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

                <div className="space-y-12">
                  <div className="grid gap-12 md:grid-cols-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block">
                      Legal Name
                      <input required name="fullName" className="mt-4 block w-full border-b border-white/10 bg-transparent py-4 text-white transition-colors focus:border-[#d9b167] focus:outline-none" placeholder="Your name" />
                    </label>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block">
                      Electronic Mail
                      <input required type="email" name="email" className="mt-4 block w-full border-b border-white/10 bg-transparent py-4 text-white transition-colors focus:border-[#d9b167] focus:outline-none" placeholder="email@address.com" />
                    </label>
                  </div>

                  <div className="grid gap-12 md:grid-cols-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block">
                      Targeted Game
                      <select required name="targetSpecies" defaultValue="Sika Deer" className="mt-4 block w-full border-b border-white/10 bg-transparent py-4 text-white transition-colors focus:border-[#d9b167] focus:outline-none [&>option]:bg-stone-900">
                        {speciesCatalog.map((species) => (
                          <option key={species.name} value={species.name}>{species.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block">
                      Preferred Window
                      <input name="preferredMonth" className="mt-4 block w-full border-b border-white/10 bg-transparent py-4 text-white transition-colors focus:border-[#d9b167] focus:outline-none" placeholder="e.g. Autumn '26" />
                    </label>
                  </div>

                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block">
                    Message Summary
                    <textarea
                      required
                      name="message"
                      rows={3}
                      className="mt-4 block w-full resize-none border-b border-white/10 bg-transparent py-4 text-white transition-colors focus:border-[#d9b167] focus:outline-none"
                      placeholder="Share your requirements..."
                    />
                  </label>
                </div>

                <div className="mt-8">
                  <TurnstileWidget onTokenChange={setTurnstileToken} />
                </div>

                <div className="mt-16">
                  <button type="submit" disabled={submitting} className="group relative w-full overflow-hidden border border-[#d9b167] py-6 px-4 text-[11px] font-bold uppercase tracking-[0.4em] text-white transition-all hover:bg-[#d9b167] hover:text-black disabled:opacity-60">
                    <span className="relative z-10">{submitting ? "Processing..." : "Submit Campaign Request"}</span>
                  </button>
                </div>

                {status && (
                  <p className={`mt-8 text-center text-sm tracking-wide ${statusTone === "ok" ? "text-[#d9b167]" : "text-amber-400"}`}>
                    {statusTone === "ok" ? "Request successfully dispatched to the concierge." : status}
                  </p>
                )}
              </motion.form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
