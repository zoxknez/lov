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
  onClose: () => void;
}

export default function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  // Prevent scrolling when modal is open
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
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-active');
    };
  }, [member]);

  if (!member) return null;

  const selectedImage = member.images[0] ?? null;

  return (
    <AnimatePresence>
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative h-full max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#090e0d] p-1 shadow-2xl md:max-h-[85vh] md:rounded-[3rem]"
          >
            {/* ── TACTICAL HUD HEADER (shrink-0) ── */}
            <div className="shrink-0 z-50 p-6 pt-16 sm:p-10 sm:pt-24 pb-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-3xl shadow-premium sm:rounded-[2.5rem] sm:p-6">
              {/* Left: Info card - unified inside the same bar */}
              <div className="flex-1 min-w-0 px-2 sm:px-4">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-glow animate-pulse" />
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gold-400/50 truncate">Personnel File // {member.role}</p>
                </div>
                <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white truncate sm:text-2xl">
                  {member.name}
                </h2>
              </div>

              {/* Right: Close button - part of the unified HUD bar */}
              <div className="shrink-0 pl-2 border-l border-white/10 sm:pl-4">
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 transition-all duration-300 hover:bg-gold-500 hover:text-black hover:rotate-90 hover:border-gold-400 sm:h-12 sm:w-12"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col md:flex-row">
            {/* Left: Image / Gallery Section */}
            <div className="relative h-64 w-full shrink-0 md:h-auto md:w-[45%]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e0d] via-transparent to-transparent md:bg-gradient-to-r" />
              <div className="h-full w-full bg-forest-900/40 relative group overflow-hidden">
                {/* Fallback pattern if no image */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/30 via-transparent to-transparent" />

                {selectedImage ? (
                  <>
                    <Image
                      src={getBlobAssetUrl(selectedImage)}
                      alt={member.name}
                      fill
                      sizes="(max-width: 767px) 100vw, 45vw"
                      className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090e0d] via-transparent to-black/10" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <div className="rounded-[1.6rem] border border-white/10 bg-black/45 p-4 backdrop-blur-2xl">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.35em] text-gold-400/55">Field Portrait</p>
                            <p className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-white">{member.name}</p>
                          </div>
                          <span className="rounded-full border border-gold-400/20 bg-gold-400/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-gold-300">
                            {member.images.length} Photo
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="relative h-full w-full flex items-center justify-center">
                    <div className="text-center p-8">
                       <div className="mb-4 flex justify-center">
                          <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] border-2 border-gold-400/30 bg-gold-400/5 font-display text-3xl font-bold uppercase tracking-widest text-gold-300 shadow-glow md:h-32 md:w-32 md:text-4xl">
                             {member.initials}
                             <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-gold-400 animate-pulse" />
                          </div>
                       </div>
                       <h3 className="mb-1 font-display text-2xl font-bold uppercase tracking-tight text-white">{member.name}</h3>
                       <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400/60">{member.role}</p>

                       <div className="mt-8 rounded-xl border border-white/5 bg-white/5 p-4 text-center opacity-60">
                          <ImageIcon className="mx-auto mb-2 h-4 w-4 text-gold-400" />
                          <p className="text-[8px] uppercase tracking-widest text-gray-400">Portrait Archive Pending</p>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Info Section */}
            <div className="flex flex-1 flex-col overflow-y-auto bg-[linear-gradient(135deg,rgba(15,22,21,0.5),rgba(9,14,13,0.8))] p-8 md:p-14">
              <div className="mb-8">
                <div className="mb-4 flex flex-wrap gap-4">
                  <span className="flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-300">
                    <Calendar className="h-3 w-3" /> {member.exp} Experience
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <MapPin className="h-3 w-3" /> {member.origin}
                  </span>
                </div>

                <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
                  {member.name}
                </h2>
                <div className="mt-4 h-1 w-20 bg-gradient-to-r from-gold-500 to-transparent rounded-full" />
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="relative pl-10">
                   <Quote className="absolute left-0 top-0 h-8 w-8 text-gold-500/20 rotate-180" />
                   <p className="font-display text-xl italic leading-relaxed text-gray-300 md:text-2xl">
                     {member.bio}
                   </p>
                </div>
              </div>

              {/* Stats/Details Grid */}
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: 'Specialization', value: member.expertise },
                  { label: 'Archive Status', value: 'Active' },
                  { label: 'Operational Level', value: 'Lead Tier' }
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] hover:border-gold-500/20">
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400/50">{stat.label}</p>
                    <p className="font-display text-sm font-bold text-white uppercase">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
