"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/magnetic-button";
import ParallaxImage from "@/components/parallax-image";
import { galleryPlaceholders, galleryShowcase } from "@/lib/site-content";

const PROOF_LAYOUT = [
  { shell: "left-[1%] top-0 w-[41%] -rotate-[7deg] z-[3]", media: "aspect-[4/5]" },
  { shell: "right-[5%] top-[3rem] w-[38%] rotate-[5deg] z-[2]", media: "aspect-[5/4]" },
  { shell: "left-[9%] top-[19rem] w-[46%] rotate-[2deg] z-[4]", media: "aspect-[6/5]" },
  { shell: "right-0 top-[22rem] w-[36%] -rotate-[5deg] z-[1]", media: "aspect-[4/5]" },
  { shell: "left-[23%] bottom-0 w-[48%] rotate-[3deg] z-[5]", media: "aspect-[16/10]" }
] as const;

function Label({ children, gold = false }: { children: ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/38"}`}>
      {children}
    </p>
  );
}

export default function GalleryLightTable() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reduceMotion ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  };

  return (
    <section id="gallery" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,6,0.99)_0%,rgba(11,10,9,0.98)_42%,rgba(7,7,6,0.99)_100%)]" />
      <div className="gallery-lighttable absolute inset-0 opacity-80" />

      <div className="shell-full relative z-10">
        <motion.div
          {...reveal}
          className="grid gap-8 border-b border-white/[0.08] pb-12 xl:grid-cols-[minmax(0,1fr)_23rem] xl:items-end"
        >
          <div>
            <Label gold>Gallery / Light Table</Label>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.05em] text-white">
              Field proofs,
              <span className="block italic font-light text-white/42">not brochure shots.</span>
            </h2>
          </div>

          <div className="rounded-[1.8rem] border border-white/[0.08] bg-black/24 p-6 backdrop-blur-sm">
            <Label gold>Selection note</Label>
            <p className="mt-4 text-[14px] leading-[1.9] text-white/58">
              Gallery sada izgleda kao radni light table: lokalne demo fotografije su slozene kao
              proof printovi, tako da deo ima karakter i pre nego sto stignu finalni client shot-ovi.
            </p>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_23rem] xl:items-start">
          <div className="min-w-0">
            <motion.div
              {...reveal}
              className="hidden min-h-[54rem] rounded-[2.4rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(15,12,10,0.74),rgba(11,10,9,0.48))] p-8 shadow-[0_45px_140px_rgba(0,0,0,0.38)] lg:block"
            >
              <div className="relative h-full">
                {galleryShowcase.slice(0, 5).map((item, index) => {
                  const layout = PROOF_LAYOUT[index];

                  return (
                    <motion.article
                      key={item.title}
                      initial={reduceMotion ? false : { opacity: 0, y: 18, rotate: 0 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.72,
                        delay: reduceMotion ? 0 : 0.06 * index,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className={`absolute ${layout.shell}`}
                    >
                      <div className="rounded-[1.6rem] bg-[#efe3cf] p-3 text-[#17120d] shadow-[0_22px_80px_rgba(0,0,0,0.28)]">
                        <div className="mb-3 flex items-center justify-between gap-3 px-1">
                          <span className="label text-[8px] tracking-[0.28em] text-[#79654f]">{item.code}</span>
                          <span className="text-[11px] uppercase tracking-[0.2em] text-[#8e7660]">{item.meta}</span>
                        </div>

                        <div className={`relative overflow-hidden rounded-[1rem] bg-black/10 ${layout.media}`}>
                          <ParallaxImage
                            src={item.image}
                            alt={item.title}
                            fill
                            containerClassName="absolute inset-0"
                            imageClassName="transition-transform duration-[1.8s] hover:scale-[1.03]"
                            sizes="(max-width: 1280px) 40vw, 28vw"
                            offset={24}
                          />
                        </div>

                        <div className="px-1 pb-1 pt-4">
                          <h3 className="font-[family-name:var(--font-display)] text-[2rem] leading-[0.94] text-[#17120d]">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-[12px] leading-[1.8] text-[#5c4b3b]">{item.note}</p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>

            <div className="grid gap-5 lg:hidden">
              {galleryShowcase.slice(0, 4).map((item, index) => (
                <motion.article
                  key={item.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.05 * index }}
                  className="rounded-[1.6rem] bg-[#efe3cf] p-3 text-[#17120d] shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3 px-1">
                    <span className="label text-[8px] tracking-[0.28em] text-[#79654f]">{item.code}</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#8e7660]">{item.meta}</span>
                  </div>
                  <div className="relative aspect-[6/5] overflow-hidden rounded-[1rem] bg-black/10">
                    <ParallaxImage
                      src={item.image}
                      alt={item.title}
                      fill
                      containerClassName="absolute inset-0"
                      imageClassName="transition-transform duration-[1.8s] hover:scale-[1.03]"
                      sizes="100vw"
                      offset={18}
                    />
                  </div>
                  <div className="px-1 pb-1 pt-4">
                    <h3 className="font-[family-name:var(--font-display)] text-[1.9rem] leading-[0.96] text-[#17120d]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[12px] leading-[1.8] text-[#5c4b3b]">{item.note}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.12 }}
              className="mt-6 overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-[#080706]/92"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4">
                <Label gold>Contact sheet</Label>
                <p className="label text-[8px] tracking-[0.24em] text-white/32">
                  {String(galleryShowcase.length).padStart(2, "0")} demo frames loaded
                </p>
              </div>

              <div className="grid gap-px bg-white/[0.08] sm:grid-cols-2 xl:grid-cols-3">
                {galleryShowcase.map((item, index) => (
                  <div key={item.title} className="bg-[#0d0b09] p-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem]">
                      <ParallaxImage
                        src={item.image}
                        alt={item.title}
                        fill
                        containerClassName="absolute inset-0"
                        imageClassName="transition-transform duration-[1.8s] hover:scale-[1.04]"
                        sizes="(max-width: 1280px) 50vw, 22vw"
                        offset={14}
                      />
                    </div>
                    <div className="flex items-start justify-between gap-4 px-1 pb-1 pt-3">
                      <div>
                        <p className="label text-[8px] tracking-[0.24em] text-white/26">
                          FRAME {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.55rem] leading-[0.96] text-white">
                          {item.title}
                        </h3>
                      </div>
                      <span className="label mt-1 text-[8px] tracking-[0.24em] text-[#c8a96e]">
                        {item.code}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.aside
            {...reveal}
            transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.08 }}
            className="rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(12,10,9,0.86),rgba(9,8,7,0.72))] p-6"
          >
            <Label gold>Shot list</Label>
            <p className="mt-4 text-[14px] leading-[1.9] text-white/54">
              Ovo vise nije jos jedan editorial grid. Sekcija sada izgleda kao odabir radnih
              proofova sa jasnim razlogom zasto je svaki kadar unutra.
            </p>

            <div className="mt-8 space-y-5">
              {galleryPlaceholders.map((item, index) => (
                <article key={item.title} className="border-b border-white/[0.08] pb-5 last:border-b-0 last:pb-0">
                  <p className="label text-[8px] tracking-[0.24em] text-white/24">
                    SLOT {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.65rem] leading-[0.98] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.85] text-white/50">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-[1.4rem] border border-[#c8a96e]/18 bg-[#c8a96e]/[0.06] p-5">
              <p className="label text-[8px] tracking-[0.24em] text-[#c8a96e]">Demo pack</p>
              <p className="mt-3 text-[13px] leading-[1.85] text-white/56">
                Koristim lokalne stand-in fotografije iz terrain, lodge i species biblioteke, tako da
                gallery vec sada ima pravi ritam i bez finalnih custom snimaka.
              </p>
            </div>

            <MagneticButton
              tag="a"
              href="#contact"
              className="mt-8 inline-flex items-center gap-3 label text-[10px] tracking-[0.3em] text-[#c8a96e] transition-all duration-300 hover:gap-5"
            >
              REQUEST PRIVATE SET <ArrowRight size={13} />
            </MagneticButton>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
