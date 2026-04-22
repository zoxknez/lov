'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, MapPin, Calendar, Quote } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

interface TeamMember {
  name: string;
  role: string;
  origin: string;
  exp: string;
  initials: string;
  bio: string;
  expertise: string;
  images: string[];
}

interface TeamMemberModalProps {
  member: TeamMember | null;
  dict: any;
  onClose: () => void;
}

export default function TeamMemberModal({ member, dict, onClose }: TeamMemberModalProps) {
  useEffect(() => {
    if (member) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-active');
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-active');
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-active');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [member, onClose]);

  const selectedImage = member?.images[0] ?? null;

  return (
    <AnimatePresence>
      {member ? (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:items-center sm:p-5" data-lenis-prevent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/82 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[calc(100svh-1.5rem)] w-full max-w-4xl overflow-y-auto overflow-x-hidden rounded-[1.8rem] border border-white/10 bg-[#070b0a] shadow-[0_30px_110px_rgba(0,0,0,0.58)] sm:max-h-[calc(100svh-2.5rem)] sm:rounded-[2.4rem]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/35 to-transparent" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/65 transition-all duration-300 hover:rotate-90 hover:border-gold-400 hover:bg-gold-500 hover:text-black sm:right-5 sm:top-5"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-[0.88fr_1.12fr]">
              <div className="border-b border-white/8 bg-[linear-gradient(180deg,rgba(15,21,20,0.98),rgba(8,11,10,0.98))] p-4 sm:p-6 md:border-b-0 md:border-r md:p-7">
                <p className="mb-3 text-[9px] font-black uppercase tracking-[0.34em] text-gold-400/55 sm:mb-4">
                  {dict.fieldPortrait}
                </p>

                <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(194,157,84,0.14),transparent_42%),linear-gradient(180deg,rgba(27,33,31,0.96),rgba(10,14,13,0.98))] shadow-[0_18px_60px_rgba(0,0,0,0.32)]">
                  <div className="relative aspect-[5/4] md:aspect-[4/5]">
                    {selectedImage ? (
                      <>
                        <div className="absolute inset-0">
                          <Image
                            src={getBlobAssetUrl(selectedImage)}
                            alt=""
                            fill
                            sizes="(max-width: 767px) 100vw, 38vw"
                            className="object-cover opacity-32 blur-xl scale-105"
                          />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent,rgba(7,10,9,0.18)_55%,rgba(7,10,9,0.72))]" />
                        </div>
                        <div className="absolute inset-[10px] rounded-[1.1rem] border border-white/8 bg-black/14 sm:inset-[14px] sm:rounded-[1.3rem]" />
                        <Image
                          src={getBlobAssetUrl(selectedImage)}
                          alt={member.name}
                          fill
                          sizes="(max-width: 767px) 100vw, 38vw"
                          className="object-contain p-2 sm:p-3"
                        />
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center p-6">
                        <div className="text-center">
                          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-gold-400/25 bg-gold-400/8 font-display text-3xl font-bold uppercase tracking-[0.22em] text-gold-200 shadow-glow">
                            {member.initials}
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/55">
                            {dict.portraitArchivePending}
                          </p>
                          <ImageIcon className="mx-auto mt-3 h-4 w-4 text-white/20" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-[linear-gradient(135deg,rgba(14,20,19,0.94),rgba(7,10,9,0.98))] p-4 sm:p-6 md:p-7">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-glow animate-pulse" />
                  <p className="text-[9px] font-black uppercase tracking-[0.38em] text-gold-400/55">
                    {dict.personnelFile}
                  </p>
                </div>

                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {member.name}
                </h2>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-300/70">
                  {member.role} / {member.origin}
                </p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <span className="flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-200">
                    <Calendar className="h-3 w-3" />
                    {member.exp}
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-300">
                    <MapPin className="h-3 w-3" />
                    {member.origin}
                  </span>
                </div>

                <div className="mt-5 rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-4 sm:p-5">
                  <div className="mb-3 flex items-center gap-2.5">
                    <Quote className="h-4 w-4 text-gold-400/45 sm:h-5 sm:w-5" />
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gold-400/55">
                      {dict.overview}
                    </p>
                  </div>
                  <p className="text-[14px] leading-7 text-gray-200">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-5 rounded-[1.4rem] border border-gold-400/12 bg-[linear-gradient(135deg,rgba(194,157,84,0.08),rgba(255,255,255,0.02))] px-4 py-4 sm:px-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gold-400/55">
                    {dict.specialization}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold uppercase leading-tight tracking-[0.06em] text-white sm:text-xl">
                    {member.expertise}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
