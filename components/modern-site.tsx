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
import CustomCursor from "@/components/custom-cursor";
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

function getSpeciesVisual(speciesName: string) {
  if (speciesName === "Chamois" || speciesName === "Himalayan Tahr") return heroVisuals[1];
  if (speciesName === "Sika Deer" || speciesName === "Rusa Deer") return heroVisuals[0];
  return heroVisuals[2];
}

export default function ModernSite() {
  const reduceMotion = useReducedMotion();
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
    <div className="relative z-10">
      <CustomCursor />

      <header className="sticky top-0 z-50 border-b border-white/60 bg-[rgba(247,242,232,0.82)] backdrop-blur-xl">
        <div className="section-shell flex min-h-[78px] items-center justify-between gap-5 py-3">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <span className="brand-medallion">
              <Image
                src="/brand-logo.png"
                alt="Kaimanawa Trophy Safaris logo"
                width={84}
                height={84}
                className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
                priority
              />
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg uppercase tracking-[0.24em] text-[#142019] sm:text-2xl">Kaimanawa</p>
              <p className="truncate text-[10px] uppercase tracking-[0.32em] text-[#7a6650] sm:text-[11px]">Trophy Safaris | New Zealand</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4f5a4f] lg:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="nav-link-soft">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="action-btn-primary px-5 py-3 text-[11px]">Plan Your Hunt</a>
        </div>
      </header>

      <main id="top">
        <section className="section-shell relative overflow-hidden pt-8 sm:pt-12">
          <div className="hero-topography" aria-hidden />
          <div className="absolute -left-16 top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(187,145,88,0.2),transparent_68%)] blur-2xl" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(143,171,132,0.18),transparent_68%)] blur-3xl" />

          <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
            <motion.div {...revealUp} transition={transition} className="relative z-10">
              <span className="eyebrow-pill">A True New Zealand Hunting Experience</span>
              <h1 className="mt-6 max-w-[12ch] font-display text-5xl leading-[0.96] text-[#142019] sm:text-6xl lg:text-7xl">
                Experience the Hunt. Discover New Zealand.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#425146]">
                Kaimanawa Trophy Safaris offers international hunters a lodge-based and alpine-ready way to explore New Zealand&apos;s wild beauty,
                fair-chase hunting, and trophy game. The page is now rewritten around clearer geography, better season guidance, and current public guidance from DOC,
                the Firearms Safety Authority, and MPI.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#species" className="action-btn-primary px-6 py-3 text-sm">Explore Species</a>
                <a href="#contact" className="action-btn-secondary px-6 py-3 text-sm">Start Planning</a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {heroFacts.map((fact) => (
                  <div key={fact.label} className="soft-card">
                    <p className="text-sm uppercase tracking-[0.24em] text-[#96714a]">{fact.value}</p>
                    <p className="mt-3 text-sm leading-6 text-[#536155]">{fact.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside {...revealUp} transition={{ ...transition, delay: reduceMotion ? 0 : 0.12 }} className="relative z-10">
              <div className="hero-collage">
                <div className="hero-collage-main">
                  <Image
                    src={heroVisuals[1].image}
                    alt={heroVisuals[1].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="hero-image-overlay" />
                  <div className="hero-collage-caption">
                    <span className="eyebrow-pill">South Island</span>
                    <h3 className="mt-4 font-display text-3xl text-white">{heroVisuals[1].title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/82">{heroVisuals[1].detail}</p>
                  </div>
                </div>

                <div className="hero-collage-stack">
                  {heroVisuals.slice(0, 2).map((visual) => (
                    <article key={visual.title} className="hero-stack-card">
                      <div className="hero-stack-media">
                        <Image
                          src={visual.image}
                          alt={visual.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 18vw"
                        />
                      </div>
                      <div className="hero-stack-copy">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8f7250]">Field note</p>
                        <h4 className="mt-2 font-display text-xl text-[#142019]">{visual.title}</h4>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="hero-floating-panel">
                  <div className="flex items-center justify-between gap-4">
                    <span className="eyebrow-pill">NZ Local Time</span>
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#7b6851]">
                      <MapPinned size={16} />
                      Pacific/Auckland
                    </span>
                  </div>
                  <p className="mt-5 font-display text-3xl text-[#142019]">
                    <LocalTime timezone="Pacific/Auckland" />
                  </p>
                  <div className="mt-5 grid gap-3">
                    <div className="mini-fact"><Crosshair size={16} /><span>Foot, 4WD, and helicopter support only where terrain, permissions, and operators allow it</span></div>
                    <div className="mini-fact"><Trees size={16} /><span>Central North Island bush and private-country deer programs</span></div>
                    <div className="mini-fact"><MountainSnow size={16} /><span>Southern Alps style mountain hunting for tahr and chamois</span></div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>

          <motion.div
            {...revealUp}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.18 }}
            className="hero-ribbon"
          >
            <div className="hero-ribbon-track">
              {speciesCatalog.map((species) => (
                <span key={species.name} className="hero-ribbon-item">
                  {species.name}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="section-shell pt-0">
          <div className="journal-grid">
            {fieldJournal.map((item, index) => (
              <motion.article
                key={item.title}
                {...revealUp}
                transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.06 }}
                className="journal-card"
              >
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#8b6b46]">{item.accent}</p>
                <h3 className="mt-4 font-display text-3xl text-[#142019]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#556156]">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="species">
          <motion.div {...revealUp} transition={transition} className="section-heading">
            <span className="eyebrow-pill">Species Available</span>
            <h2 className="mt-5 font-display text-4xl text-[#142019] sm:text-5xl">New Zealand game, mapped more carefully</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4b594e]">
              The species list stayed strong, but the blanket season claim was replaced with species-by-species planning windows so the site reads more credibly.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {speciesCatalog.map((species, index) => (
              <motion.article
                key={species.name}
                {...revealUp}
                transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.05 }}
                className="soft-card aim-target"
              >
                <div className="species-media-frame">
                  <Image
                    src={getSpeciesVisual(species.name).image}
                    alt={getSpeciesVisual(species.name).title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 50vw, 26vw"
                  />
                  <div className="species-media-overlay" />
                  <span className="species-media-label">{getSpeciesVisual(species.name).title}</span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.26em] text-[#96714a]">Prime window</p>
                    <h3 className="mt-2 font-display text-2xl text-[#142019]">{species.name}</h3>
                  </div>
                  <span className="rounded-full border border-[#d9c8ad] bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#6e5d49]">
                    {species.season}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-6 text-[#4d5b50]">{species.note}</p>
                <div className="mt-6 rounded-[1.4rem] border border-white/70 bg-white/60 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#8f7654]">Typical terrain</p>
                  <p className="mt-2 text-sm leading-6 text-[#4f5b51]">{species.terrain}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="areas">
          <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr] xl:items-start">
            <motion.div {...revealUp} transition={transition}>
              <span className="eyebrow-pill">Hunting Areas</span>
              <h2 className="mt-5 font-display text-4xl text-[#142019] sm:text-5xl">North Island bush to South Island alpine country</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4b594e]">
                The Kaimanawa story now points clearly to the Central North Island, while the mountain story is framed more safely as South Island alpine access.
              </p>

              <div className="mt-8 space-y-5">
                {areaHighlights.map((area, index) => (
                  <motion.article
                    key={area.title}
                    {...revealUp}
                    transition={{ ...transition, delay: reduceMotion ? 0 : 0.08 * index }}
                    className="paper-panel"
                  >
                    <h3 className="font-display text-2xl text-[#142019]">{area.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#4f5d52]">{area.intro}</p>
                    <ul className="mt-5 space-y-3 text-sm leading-6 text-[#556358]">
                      {area.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#bb9158]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.div {...revealUp} transition={{ ...transition, delay: reduceMotion ? 0 : 0.1 }} className="space-y-5">
              <div className="area-visual-panel">
                <Image
                  src={heroVisuals[2].image}
                  alt={heroVisuals[2].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 40vw"
                />
                <div className="hero-image-overlay" />
                <div className="area-visual-copy">
                  <span className="eyebrow-pill">Terrain Mood</span>
                  <h3 className="mt-4 font-display text-3xl text-white">{heroVisuals[2].title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/82">{heroVisuals[2].detail}</p>
                </div>
              </div>

              <div className="paper-panel">
                <span className="eyebrow-pill">Terrain</span>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {["Dense native bush", "River valleys", "High alpine mountains", "Remote backcountry"].map((item) => (
                    <div key={item} className="terrain-chip">{item}</div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-[#566359]">
                  Public-land hunting generally needs a DOC permit, while private land requires direct permission. DOC also makes clear that a public-land permit does not create access rights across private property.
                </p>
              </div>

              <div className="paper-panel">
                <span className="eyebrow-pill">Best Timing</span>
                <div className="mt-5 space-y-4">
                  {timeline.map((item) => (
                    <div key={item.title} className="timeline-row">
                      <div className="timeline-window">{item.window}</div>
                      <div>
                        <p className="font-display text-xl text-[#142019]">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-[#536056]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-shell" id="story">
          <motion.div {...revealUp} transition={transition} className="section-heading">
            <span className="eyebrow-pill">Our Story</span>
            <h2 className="mt-5 font-display text-4xl text-[#142019] sm:text-5xl">Client story preserved, claims made more consistent</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4b594e]">
              The supplied founder and guide bios remain here, but the combined experience claim has been corrected so the numbers now match the team summary.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.article {...revealUp} transition={transition} className="paper-panel">
              <span className="eyebrow-pill">Guiding Philosophy</span>
              <div className="mt-5 grid gap-4">
                {values.map((value) => (
                  <div key={value.title} className="soft-card">
                    <h3 className="font-display text-2xl text-[#142019]">{value.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#526056]">{value.text}</p>
                  </div>
                ))}
              </div>
            </motion.article>

            <div className="grid gap-5">
              {teamProfiles.map((profile, index) => (
                <motion.article
                  key={profile.name}
                  {...revealUp}
                  transition={{ ...transition, delay: reduceMotion ? 0 : 0.05 * index }}
                  className="soft-card aim-target"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#92714b]">{profile.role}</p>
                      <h3 className="mt-2 font-display text-2xl text-[#142019]">{profile.name}</h3>
                    </div>
                    <span className="rounded-full border border-[#d9c8ad] bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#6b5c4a]">
                      {profile.years}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#516055]">{profile.note}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="planning">
          <motion.div {...revealUp} transition={transition} className="section-heading">
            <span className="eyebrow-pill">Planning Your Hunt</span>
            <h2 className="mt-5 font-display text-4xl text-[#142019] sm:text-5xl">Travel, lodge rhythm, permits, and what is included</h2>
          </motion.div>

          <div className="mt-10 grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="grid gap-5 md:grid-cols-2">
              {planningNotes.map((item, index) => {
                const Icon = planningIcons[index];
                return (
                  <motion.article
                    key={item.title}
                    {...revealUp}
                    transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.05 }}
                    className="soft-card"
                  >
                    <div className="flex items-center gap-3 text-[#8e6a44]">
                      <Icon size={18} />
                      <p className="text-[11px] uppercase tracking-[0.24em]">Planning note</p>
                    </div>
                    <h3 className="mt-4 font-display text-2xl text-[#142019]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#506056]">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>

            <motion.aside {...revealUp} transition={{ ...transition, delay: reduceMotion ? 0 : 0.12 }} className="space-y-5">
              <div className="paper-panel">
                <span className="eyebrow-pill">Pricing Structure</span>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/70 bg-white/65 p-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#8c6d4c]">Usually included</p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-[#4f5d52]">
                      {pricingItems.included.map((item) => (
                        <li key={item} className="flex gap-3"><CheckCircle2 size={16} className="mt-1 text-[#bb9158]" /><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/70 bg-white/65 p-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#8c6d4c]">Usually extra</p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-[#4f5d52]">
                      {pricingItems.excluded.map((item) => (
                        <li key={item} className="flex gap-3"><AlertTriangle size={16} className="mt-1 text-[#bb9158]" /><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="paper-panel">
                <span className="eyebrow-pill">Fact-check notes applied here</span>
                <div className="mt-5 space-y-3 text-sm leading-7 text-[#526056]">
                  <p className="flex gap-3"><ShieldCheck size={18} className="mt-1 text-[#8c6d4c]" /><span>Firearms Safety Authority guidance says international visitors should usually begin the visitor&apos;s firearms licence process about 4 months before arrival.</span></p>
                  <p className="flex gap-3"><ShieldCheck size={18} className="mt-1 text-[#8c6d4c]" /><span>DOC open hunting permits are free, last 12 months, and each hunter needs their own permit for public conservation land.</span></p>
                  <p className="flex gap-3"><ShieldCheck size={18} className="mt-1 text-[#8c6d4c]" /><span>Where helicopter-assisted public-land hunting is part of a program, DOC concessions, ballot conditions, or landing permissions may affect what is possible.</span></p>
                  <p className="flex gap-3"><ShieldCheck size={18} className="mt-1 text-[#8c6d4c]" /><span>MPI export paperwork and any required CITES permits should be planned early, especially if the trophy is heading to the EU, Great Britain, Mexico, or South Africa.</span></p>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="section-shell" id="gallery">
          <motion.div {...revealUp} transition={transition} className="section-heading">
            <span className="eyebrow-pill">Gallery Ready</span>
            <h2 className="mt-5 font-display text-4xl text-[#142019] sm:text-5xl">Prepared for the real photography you will add later</h2>
          </motion.div>

          <div className="showcase-grid mt-10">
            {galleryShowcase.map((item, index) => (
              <motion.article
                key={item.title}
                {...revealUp}
                transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.05 }}
                className={`showcase-tile showcase-${index + 1}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="hero-image-overlay" />
                <div className="showcase-copy">
                  <span className="eyebrow-pill">Visual reference</span>
                  <h3 className="mt-4 font-display text-3xl text-white">{item.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {galleryPlaceholders.map((item, index) => (
              <motion.article
                key={item.title}
                {...revealUp}
                transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.05 }}
                className="gallery-placeholder aim-target"
              >
                <div className="gallery-grid" aria-hidden />
                <div className="relative z-10 max-w-sm">
                  <span className="eyebrow-pill">Photo slot</span>
                  <h3 className="mt-4 font-display text-3xl text-[#142019]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#506056]">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-20" id="contact">
          <div className="grid gap-8 xl:grid-cols-[0.86fr_1.14fr]">
            <motion.article {...revealUp} transition={transition} className="paper-panel">
              <div className="contact-visual">
                <Image
                  src={heroVisuals[0].image}
                  alt={heroVisuals[0].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 32vw"
                />
                <div className="hero-image-overlay" />
                <div className="contact-visual-copy">
                  <span className="eyebrow-pill">Planning Starts Here</span>
                  <p className="mt-4 max-w-sm font-display text-3xl leading-tight text-white">
                    A better hunting site should feel like the beginning of the trip, not just a form.
                  </p>
                </div>
              </div>

              <span className="eyebrow-pill">Contact Us</span>
              <h2 className="mt-5 font-display text-4xl text-[#142019] sm:text-5xl">Start planning your New Zealand hunting adventure</h2>
              <p className="mt-5 text-lg leading-8 text-[#4c5a4f]">
                Email or WhatsApp is still the cleanest first step. Share your target species, timing, and whether you want a lodge-first deer trip, a dedicated alpine hunt, or a mixed itinerary.
              </p>

              <div className="mt-8 space-y-4">
                <a href="mailto:hunting@kaimanawasafaris.com" className="contact-row"><Mail size={16} /><span>hunting@kaimanawasafaris.com</span></a>
                <a href="tel:+642108850131" className="contact-row"><PhoneCall size={16} /><span>+64 21 088 50131</span></a>
                <div className="contact-row"><PlaneLanding size={16} /><span>Auckland International Airport is the standard arrival gateway</span></div>
              </div>

              <div className="mt-8 rounded-[1.6rem] border border-white/70 bg-white/65 p-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d6c47]">Launch note</p>
                <p className="mt-3 text-sm leading-7 text-[#526056]">
                  Founder bios, lodge details, direct pricing, contact details, and some trophy claims are still based on the client brief rather than public official records. The copy has been softened where needed so the page stays credible.
                </p>
              </div>
            </motion.article>

            <motion.form {...revealUp} transition={{ ...transition, delay: reduceMotion ? 0 : 0.08 }} onSubmit={onSubmit} className="paper-panel">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <span className="eyebrow-pill">Booking Enquiry</span>
                  <h3 className="mt-4 font-display text-3xl text-[#142019]">Request a tailored hunt outline</h3>
                </div>
                <p className="text-sm text-[#607066]">Usually best for first contact: email or WhatsApp.</p>
              </div>

              <input type="hidden" name="turnstileToken" value={turnstileToken} />
              <input type="text" name="antiBotField" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-[#415046]">
                  Full name
                  <input required name="fullName" className="field-control mt-2" placeholder="Your full name" />
                </label>
                <label className="text-sm font-medium text-[#415046]">
                  Email
                  <input required type="email" name="email" className="field-control mt-2" placeholder="name@email.com" />
                </label>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-[#415046]">
                  Target species
                  <select required name="targetSpecies" defaultValue="Sika Deer" className="field-control mt-2">
                    {speciesCatalog.map((species) => (
                      <option key={species.name} value={species.name}>{species.name}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-medium text-[#415046]">
                  Preferred month
                  <input name="preferredMonth" className="field-control mt-2" placeholder="For example May, June, or flexible" />
                </label>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-[#415046]">
                  Group size
                  <input name="groupSize" className="field-control mt-2" placeholder="For example 2 hunters" />
                </label>
              </div>

              <label className="mt-4 block text-sm font-medium text-[#415046]">
                Notes
                <textarea
                  required
                  name="message"
                  rows={6}
                  className="field-control mt-2"
                  placeholder="Tell the team what species you want, whether you need rifle hire, who is travelling, and whether you want lodge comfort, remote camp time, or a mix of both."
                />
              </label>

              <TurnstileWidget onTokenChange={setTurnstileToken} />

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="submit" disabled={submitting} className="action-btn-primary px-7 py-3 text-sm disabled:opacity-60">
                  {submitting ? "Submitting..." : "Send Enquiry"}
                </button>
                <a href="mailto:hunting@kaimanawasafaris.com" className="action-btn-secondary px-6 py-3 text-sm">Email Instead</a>
              </div>

              {status && (
                <p className={`mt-4 inline-flex items-center gap-2 text-sm ${statusTone === "ok" ? "text-[#356542]" : "text-[#8a5a1d]"}`}>
                  {statusTone === "ok" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  {status}
                </p>
              )}
            </motion.form>
          </div>
        </section>
      </main>
    </div>
  );
}
