"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import MagneticButton from "@/components/magnetic-button";
import { teamProfiles, values } from "@/lib/site-content";

const TEAM_MEDIA = [
  {
    image: "/media/experience-lodge-view.jpg",
    badge: "Founding perspective",
    accent: "Hosted standard"
  },
  {
    image: "/media/experience-alpine-forest.jpg",
    badge: "International viewpoint",
    accent: "Selective standard"
  },
  {
    image: "/media/species/chamois.jpg",
    badge: "Field guide authority",
    accent: "Field standard"
  }
] as const;

const TRUST_MARKS = [
  "Fair chase stays non-negotiable.",
  "Shot discipline and camp conduct remain part of the product.",
  "Small hosted groups protect pace, privacy, and flexibility."
] as const;

function Label({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/42"}`}>
      {children}
    </p>
  );
}

export default function StandardsShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="story" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,7,0.99)_0%,rgba(12,10,8,0.98)_44%,rgba(8,8,8,0.99)_100%)]" />
      <div className="standards-ledger absolute inset-0 opacity-70" />

      <div className="shell-full relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 grid gap-8 xl:grid-cols-[13rem_minmax(0,1fr)] xl:items-end"
        >
          <div className="border-b border-white/[0.07] pb-6 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-8">
            <Label gold>Archive</Label>
            <p className="mt-4 font-[family-name:var(--font-display)] text-[clamp(4rem,9vw,7rem)] leading-none text-[#e8c98a]">
              90+
            </p>
            <p className="mt-3 text-[12px] leading-6 text-white/42">
              years of shared field experience
            </p>
          </div>

          <div className="max-w-[54rem]">
            <Label gold>Standards / Trust Archive</Label>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,5.8vw,6.1rem)] leading-[0.88] tracking-[-0.05em] text-[#f3ede3]">
              Human credibility,
              <span className="block italic font-light text-[#d2c6b2]">not luxury theater.</span>
            </h2>
            <p className="mt-6 max-w-[42rem] text-[15px] leading-[1.95] text-white/58 sm:text-[16px]">
              This section should read like an archive sheet: who stands behind the hunt, what
              standards hold it together, and why the operation feels earned instead of decorated.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[13rem_minmax(0,1fr)]">
          <motion.aside
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="xl:pr-8 xl:border-r xl:border-white/[0.07]"
          >
            <div className="space-y-5">
              <div className="rounded-[1.35rem] border border-[#c8a96e]/18 bg-[linear-gradient(135deg,rgba(200,169,110,0.12),rgba(255,255,255,0.02))] p-4">
                <Label gold>Trust mark</Label>
                <p className="mt-3 text-[13px] leading-6 text-white/66">
                  Smaller groups, cleaner ethics, and a guide layer that reads like field authority.
                </p>
              </div>

              {TRUST_MARKS.map((item, index) => (
                <div key={item} className="border-b border-white/[0.07] pb-5">
                  <p className="label text-[8px] tracking-[0.24em] text-white/24">
                    MARK {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-[13px] leading-6 text-white/54">{item}</p>
                </div>
              ))}
            </div>
          </motion.aside>

          <div className="min-w-0">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: reduceMotion ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[2.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(14,11,9,0.92),rgba(12,10,9,0.82))]"
            >
              <div className="grid gap-0 lg:grid-cols-3">
                {teamProfiles.map((person, index) => {
                  const media = TEAM_MEDIA[index];

                  return (
                    <article
                      key={person.name}
                      className={`min-w-0 ${index !== teamProfiles.length - 1 ? "border-b border-white/[0.08] lg:border-b-0 lg:border-r" : ""} border-white/[0.08]`}
                    >
                      <div className="relative h-[22rem] overflow-hidden">
                        <Image
                          src={media.image}
                          alt={person.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover object-center grayscale contrast-[0.92] brightness-[0.82]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.02),rgba(8,8,8,0.2)_38%,rgba(8,8,8,0.92)_100%)]" />
                        <div className="absolute left-5 top-5 rounded-full border border-white/12 bg-black/20 px-3 py-2 backdrop-blur-md">
                          <Label gold={index === 0}>{media.badge}</Label>
                        </div>
                        <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/16 px-3 py-2">
                          <span className="label text-[8px] tracking-[0.24em] text-white/58">
                            {media.accent}
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <p className="label text-[8px] tracking-[0.24em] text-white/40">{person.role}</p>
                          <h3 className="mt-3 font-[family-name:var(--font-display)] text-[2rem] leading-[0.96] text-white">
                            {person.name}
                          </h3>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
                          <p className="label text-[8px] tracking-[0.24em] text-white/32">Field Record</p>
                          <p className="text-[12px] text-white/44">{person.years} in the field</p>
                        </div>
                        <p className="mt-5 text-[13px] leading-[1.9] text-white/56">{person.note}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: reduceMotion ? 0 : 0.78, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 grid gap-0 overflow-hidden rounded-[2rem] border border-white/[0.08] lg:grid-cols-3"
            >
              {values.map((value, index) => (
                <article
                  key={value.title}
                  className={`bg-[linear-gradient(180deg,rgba(12,10,9,0.9),rgba(12,10,9,0.72))] p-6 ${
                    index !== values.length - 1 ? "border-b border-white/[0.08] lg:border-b-0 lg:border-r" : ""
                  } border-white/[0.08]`}
                >
                  <p className="font-[family-name:var(--font-display)] text-[3rem] leading-none text-white/[0.09]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <Label gold={index === 0}>Clause</Label>
                  <h4 className="mt-4 font-[family-name:var(--font-display)] text-[1.65rem] leading-[1.02] text-white">
                    {value.title}
                  </h4>
                  <p className="mt-4 text-[13px] leading-[1.9] text-white/54">
                    {value.text}
                  </p>
                </article>
              ))}
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-3 max-w-[28rem]">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <CheckCircle2 size={17} className="text-[#c8a96e]" />
                </span>
                <p className="text-[13px] leading-[1.9] text-white/52">
                  The effect should be institutional trust, not glossy reassurance. This is the page
                  proving there are real people and real standards behind the trip.
                </p>
              </div>

              <MagneticButton
                tag="a"
                href="#gallery"
                className="inline-flex items-center gap-3 label text-[10px] tracking-[0.3em] text-[#c8a96e] transition-all duration-300 hover:gap-5"
              >
                VIEW GALLERY <ArrowRight size={13} />
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
