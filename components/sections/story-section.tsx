"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Users } from "lucide-react";
import { useRef } from "react";
import { values, teamProfiles, heroVisuals } from "@/lib/site-content";

export default function StorySection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const revealUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 }
  };
  const tr = { duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <section id="story" ref={sectionRef} className="relative py-28 overflow-hidden border-t border-white/[0.06]">
      {/* Parallax background */}
      <motion.div
        style={reduceMotion ? {} : { y: bgY }}
        className="absolute inset-[-10%] z-0"
      >
        <Image
          src={heroVisuals[2].image}
          alt="New Zealand wilderness"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(100deg,rgba(2,4,3,0.97)_0%,rgba(2,4,3,0.82)_40%,rgba(2,4,3,0.94)_100%)]" />

      <div className="section-shell relative z-10">
        <div className="grid xl:grid-cols-[1fr_1.1fr] gap-14 xl:items-start">
          {/* Left: Values */}
          <div>
            <motion.div {...revealUp} transition={tr} className="mb-10">
              <p className="label-xs text-[#c9922a] mb-5">Standards</p>
              <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.92] text-white">
                Earned in the field.<br />
                <em className="not-italic text-white/45">Refined over decades.</em>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/55 font-light max-w-md">
                The brand is built on field discipline, not marketing copy. Every detail of the hunt — shot selection, tracking, camp conduct — is held to a standard the team treats as personal.
              </p>
            </motion.div>

            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.article
                  key={value.title}
                  {...revealUp}
                  transition={{ ...tr, delay: reduceMotion ? 0 : index * 0.07 }}
                  className="card-hover-glow rounded-[1.6rem] border border-white/10 bg-black/30 p-6 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9922a]/25 bg-[#c9922a]/10">
                      <ShieldCheck size={16} className="text-[#c9922a]" />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.6rem] text-white">{value.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/55">{value.text}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Right: Team */}
          <div>
            <motion.p {...revealUp} transition={tr} className="label-xs text-[#c9922a] mb-8">
              The team
            </motion.p>
            <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-1">
              {teamProfiles.map((person, index) => (
                <motion.article
                  key={person.name}
                  {...revealUp}
                  transition={{ ...tr, delay: reduceMotion ? 0 : 0.08 + index * 0.08 }}
                  className="card-hover-glow rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="label-xs text-[#c9922a] mb-3">{person.role}</p>
                      <h3 className="font-display text-3xl text-white">{person.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-white/12 bg-black/20 px-4 py-2 backdrop-blur-sm">
                      <Users size={13} className="text-[#c9922a]" />
                      <span className="label-xs text-white/55">{person.years}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/55">{person.note}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
