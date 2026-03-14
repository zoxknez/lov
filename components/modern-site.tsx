"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FormEvent, useState } from "react";
import {
  BedDouble,
  CheckCircle2,
  Mail,
  MapPinned,
  PhoneCall,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Instagram,
  Facebook,
  Menu,
  X,
  Target,
  Wind,
  Trophy,
  ArrowRight,
  PlaneLanding,
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeArea, setActiveArea] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"ok" | "error" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const storyY = useTransform(scrollY, [500, 2000], [0, -200]);

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
    setStatus(null);
    setStatusTone(null);

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
      setStatusTone("error");
    } finally {
      setSubmitting(false);
    }
  }

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" as const };

  return (
    <div className="relative min-h-screen bg-[#060907] font-sans selection:bg-[#d9b167] selection:text-black overflow-x-hidden">
      <div className="film-grain" />

      {/* Decorative Side Labels */}
      <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2 hidden xl:block">
        <div className="flex -rotate-90 origin-left items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-white/20">
          <span className="h-px w-12 bg-white/10" />
          <span>New Zealand Alpine Heritage</span>
        </div>
      </div>
      
      <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2 hidden xl:block">
        <div className="flex rotate-90 origin-right items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-white/20">
          <span>Est. 1994</span>
          <span className="h-px w-12 bg-white/10" />
        </div>
      </div>

      <header className={`fixed inset-x-0 top-0 z-[60] transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className={`section-shell mx-auto transition-all duration-700 ${scrolled ? 'max-w-5xl rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl px-8' : 'max-w-none px-12 bg-transparent'}`}>
          <div className="flex items-center justify-between gap-5">
            <a href="#top" className="flex min-w-0 items-center gap-3 group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#d9b167] text-[#060907] transition-transform duration-500 group-hover:rotate-90">
                <Target size={20} />
              </div>
              <span className="font-display text-lg uppercase tracking-[0.3em] text-white">Kaimanawa</span>
            </a>

            <nav className="hidden items-center gap-12 lg:flex">
                {["Home", "Field Journal", "Species", "Areas", "Story", "Planning", "Gallery"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-[10px] uppercase tracking-[0.4em] text-white/50 transition-colors hover:text-[#d9b167]"
                  >
                    {item}
                  </a>
                ))}
            </nav>

            <div className="flex items-center gap-8">
              <div className="hidden flex-col items-end text-[10px] uppercase tracking-[0.2em] text-white/30 lg:flex">
                <LocalTime timezone="Pacific/Auckland" />
                <span>NZ Standard Time</span>
              </div>
              <a href="#contact" className="hidden rounded-full border border-[#d9b167] px-6 py-2 text-[10px] uppercase tracking-[0.3em] text-white transition-all hover:bg-[#d9b167] hover:text-[#060907] lg:block">
                Enquiry
              </a>
              <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative h-screen w-full overflow-hidden" id="home">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.15 }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
              className="relative h-full w-full"
            >
              <Image
                src={heroVisuals[0].image}
                alt="NZ Alpine Wilderness"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
          
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#060907]/40 via-transparent to-[#060907]" />

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
            {fieldJournal.map((entry, index) => (
                <motion.article
                  key={entry.title}
                  {...revealUp}
                  transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.1 }}
                  className={`group relative flex flex-col justify-end overflow-hidden p-8 transition-all duration-700 hover:z-30 hover:-translate-y-4 ${
                    index === 0 ? "md:col-span-2 aspect-[16/10]" : "aspect-[4/5]"
                  } ${index === 1 ? "md:mt-32" : ""}`}
                >
                  <div className="absolute inset-0 z-0 bg-stone-900 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.5 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={entry.image}
                        alt={entry.title}
                        fill
                        className="object-cover opacity-60 grayscale-[40%] transition-transform group-hover:grayscale-0"
                      />
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#060907] via-[#060907]/20 to-transparent" />
                  <div className="relative z-20">
                    <span className="text-[11px] uppercase tracking-[0.4em] text-[#d9b167]">{entry.date}</span>
                    <h3 className="mt-4 font-display text-3xl font-light text-white leading-tight">{entry.title}</h3>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{entry.excerpt}</p>
                    <button className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                      Read Entry <ArrowRight size={14} className="text-[#d9b167]" />
                    </button>
                  </div>
                </motion.article>
              ))}
          </div>
        </section>

        <section className="relative py-32 overflow-hidden" id="species">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none">
             <span className="font-display text-[22vw] font-black text-white/[0.015] leading-none uppercase">Wilderness</span>
          </div>
          
          <motion.div {...revealUp} transition={transition} className="section-shell relative z-10">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#d9b167] font-medium">Species Available</span>
            <h2 className="mt-8 font-display text-4xl font-light tracking-tight leading-tight text-white sm:text-6xl max-w-2xl">The pursuit of legendary trophies</h2>
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
                <motion.div
                  style={{ y: useTransform(scrollY, [1500, 3000], [0, 150]) }}
                  className="h-full w-full relative"
                >
                  <Image
                    src={heroVisuals[activeArea === 0 ? 0 : 1].image}
                    alt={areaHighlights[activeArea].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </motion.div>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#060907]/60 via-transparent to-[#060907]/10" />
            </motion.div>
          </div>
        </section>

        <section className="relative min-h-[80vh] flex items-center overflow-hidden" id="story">
          <div className="absolute -left-12 top-0 pointer-events-none select-none">
             <span className="font-display text-[20vw] font-black text-white/[0.02] leading-none uppercase">Heritage</span>
          </div>

          <motion.div
            style={{ y: storyY }}
            className="absolute inset-0 z-0 origin-center h-[120%]"
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

        <section className="section-shell py-32 relative z-20" id="planning">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
             <span className="font-display text-[25vw] font-black text-white/[0.015] leading-none uppercase">Logistics</span>
          </div>

          <motion.div {...revealUp} transition={transition} className="section-heading mb-20 border-t border-white/5 pt-16 relative z-10">
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

        <section className="section-shell py-32 relative overflow-hidden" id="gallery">
          <div className="absolute left-0 bottom-0 pointer-events-none select-none">
             <span className="font-display text-[20vw] font-black text-white/[0.01] leading-none uppercase">Captures</span>
          </div>

          <motion.div {...revealUp} transition={transition} className="section-heading relative z-10 border-t border-white/5 pt-16">
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

        <section className="relative min-h-screen py-32 overflow-hidden border-t border-white/5" id="contact">
          <div className="absolute right-0 top-0 pointer-events-none select-none">
             <span className="font-display text-[25vw] font-black text-white/[0.012] leading-none uppercase">Enquiry</span>
          </div>

          <div className="section-shell relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
               {/* Left Side: Visual/Context */}
               <motion.div {...revealUp} transition={transition} className="space-y-12">
                  <span className="text-[11px] uppercase tracking-[0.4em] text-[#d9b167] font-medium">Concierge Service</span>
                  <h2 className="font-display text-5xl md:text-8xl font-light text-white leading-[0.9]">Begin the <br/> pursuit.</h2>
                  
                  <div className="grid gap-10 pt-10 border-t border-white/5">
                    <div className="flex gap-6">
                      <div className="h-12 w-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center">
                        <Mail className="text-[#d9b167]" size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Direct Email</p>
                         <p className="mt-1 text-lg text-white font-light">office@kaimanawatrophysafaris.com</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-6">
                      <div className="h-12 w-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center">
                        <PhoneCall className="text-[#d9b167]" size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">WhatsApp / Call</p>
                         <p className="mt-1 text-lg text-white font-light">+64 21 000 000</p>
                      </div>
                    </div>
                  </div>
               </motion.div>

               {/* Right Side: Form */}
               <motion.div 
                 {...revealUp} 
                 transition={{ ...transition, delay: 0.1 }}
                 className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 md:p-16 rounded-sm relative"
               >
                  <form onSubmit={onSubmit} className="space-y-10">
                    <input type="hidden" name="turnstileToken" value={turnstileToken} />
                    <input type="text" name="antiBotField" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

                    <div className="space-y-8">
                      <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Full Name</label>
                          <input required name="fullName" className="block w-full border-b border-white/10 bg-transparent py-4 text-white transition-colors focus:border-[#d9b167] focus:outline-none text-lg" placeholder="e.g. James Wilson" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Email Address</label>
                          <input required type="email" name="email" className="block w-full border-b border-white/10 bg-transparent py-4 text-white transition-colors focus:border-[#d9b167] focus:outline-none text-lg" placeholder="email@address.com" />
                        </div>
                      </div>

                      <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Target Species</label>
                          <select required name="targetSpecies" defaultValue="Red Deer" className="block w-full border-b border-white/10 bg-transparent py-4 text-white transition-colors focus:border-[#d9b167] focus:outline-none text-lg [&>option]:bg-[#060907]">
                            {speciesCatalog.map((s) => (
                              <option key={s.name} value={s.name}>{s.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Preferred Window</label>
                          <input name="preferredMonth" className="block w-full border-b border-white/10 bg-transparent py-4 text-white transition-colors focus:border-[#d9b167] focus:outline-none text-lg" placeholder="e.g. Autumn 2026" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Your Message</label>
                        <textarea required name="message" rows={3} className="block w-full resize-none border-b border-white/10 bg-transparent py-4 text-white transition-colors focus:border-[#d9b167] focus:outline-none text-lg" placeholder="Tell us about your ideal hunt..." />
                      </div>
                    </div>

                    <div className="pt-4">
                      <TurnstileWidget onTokenChange={setTurnstileToken} />
                    </div>

                    <button type="submit" disabled={submitting} className="w-full bg-[#d9b167] py-6 text-[11px] font-bold uppercase tracking-[0.4em] text-[#060907] transition-all hover:bg-white disabled:opacity-50">
                      {submitting ? "Sending..." : "Submit Enquiry"}
                    </button>

                    {status && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mt-6 text-center text-xs tracking-widest uppercase ${statusTone === "ok" ? "text-[#d9b167]" : "text-red-400"}`}>
                        {status}
                      </motion.p>
                    )}
                  </form>
               </motion.div>
            </div>
          </div>
        </section>

        <footer className="bg-[#060907] py-20 border-t border-white/5">
          <div className="section-shell flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm">
                 <Target size={18} className="text-[#d9b167]" />
               </div>
               <span className="font-display text-xl uppercase tracking-[0.3em] text-white">Kaimanawa</span>
            </div>
            
            <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] text-white/40">
              <span className="">© 2026 Kaimanawa Trophy Safaris</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:text-[#d9b167] hover:border-[#d9b167]">
                <Instagram size={18} />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:text-[#d9b167] hover:border-[#d9b167]">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#060907] p-8 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl uppercase tracking-widest text-white">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={32} />
              </button>
            </div>
            <nav className="mt-20 flex flex-col gap-8">
              {["Home", "Field Journal", "Species", "Areas", "Story", "Planning", "Gallery", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-4xl uppercase tracking-tight text-white hover:text-[#d9b167]"
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
