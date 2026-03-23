'use client';

import Image from 'next/image';
import { getBlobAssetUrl } from '@/lib/blob-asset';

export default function StorySection() {
  const founders = [
    {
      name: 'Alex Sipka',
      role: 'Co-founder',
      origin: 'Serbia',
      experience: '40 years',
      description: 'Veteran hunter whose decades in the field shaped the standards and pace behind the Kaimanawa program.',
      image: '/media/hunting%20area%20%20and%20deers/Sika%20%20deer%20Stag.jpg',
    },
    {
      name: 'Artem Prikazov',
      role: 'Co-founder',
      origin: 'Russia',
      experience: '15 years',
      description: 'Internationally travelled hunter focused on the quality of New Zealand game and the experience around it.',
      image: '/media/hunting%20area%20%20and%20deers/Red%20Deer%20Stag.jpg',
    },
    {
      name: 'Vuk Mijatovic',
      role: 'Guide',
      origin: 'New Zealand field operations',
      experience: '35+ years',
      description: 'Lead field guide with deep knowledge of New Zealand terrain, animal behaviour, and hunt execution.',
      image: '/media/hunting%20area%20%20and%20deers/Fellow%20%20deer.jpg',
    },
  ];

  return (
    <section id="story" className="relative bg-gray-950 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center md:mb-24">
          <p className="text-sm uppercase tracking-[0.2em] text-[#d9b167]">The Story</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-6xl">
            Our Story
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Founded in 2025 to introduce international hunters to the quality of New Zealand trophies and the beauty of its
            wild landscapes.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-20 rounded-lg border border-[#d9b167]/20 bg-gradient-to-r from-[#d9b167]/10 to-transparent p-8 md:p-12">
          <p className="text-center text-lg leading-relaxed text-gray-300 md:text-xl">
            Kaimanawa Trophy Safaris was founded in 2025 by Artem Prikazov and Alex Sipka after years of hunting across Europe
            and abroad. Their aim was simple: create a properly hosted New Zealand hunting program that feels authentic in the
            field and polished in the planning. Across Alex, Artem, and Vuk, the team brings{' '}
            <span className="font-semibold text-[#d9b167]">well over 90 years of hunting experience</span>.
          </p>
        </div>

        {/* Core Values */}
        <div className="mb-20 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="mb-4 font-display text-2xl font-bold text-white">Fair Chase Hunting</h3>
            <p className="text-gray-400">
              The hunt should still feel like a real hunt: earned, physical, respectful of the animal, and true to New Zealand
              country.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="mb-4 font-display text-2xl font-bold text-white">Ethical Hunting Practice</h3>
            <p className="text-gray-400">
              Shot selection, recovery, camp conduct, and respect for the land are treated as part of the standard, not an
              afterthought.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="mb-12 text-center font-display text-3xl font-bold text-white">Meet The Team</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {founders.map((founder) => (
              <div key={founder.name} className="group rounded-lg border border-white/10 overflow-hidden bg-gray-900/50 backdrop-blur transition-all duration-300 hover:border-[#d9b167]/50">
                <div className="relative h-64 w-full overflow-hidden bg-gray-800">
                  <Image
                    src={getBlobAssetUrl(founder.image)}
                    alt={founder.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
                </div>
                <div className="p-6">
                  <h4 className="font-display text-xl font-bold text-white">{founder.name}</h4>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gray-500">{founder.role}</p>
                  <p className="text-sm text-[#d9b167]">{founder.experience}</p>
                  <p className="mt-1 text-sm text-gray-500">{founder.origin}</p>
                  <p className="mt-2 text-sm text-gray-400">{founder.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
