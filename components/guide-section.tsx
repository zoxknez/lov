'use client';

import Image from 'next/image';
import { getBlobAssetUrl } from '@/lib/blob-asset';

export default function GuideSection() {
  const guide = {
    name: 'Vuk Mijatovic',
    title: 'Professional Hunting Guide',
    country: 'Professional Guide',
    experience: '35+ years',
    bio: 'With more than 35 years of hunting experience, Vuk Mijatovic brings deep knowledge of New Zealand terrain, animal behaviour, and the patient, fair-chase pace required for successful trophy hunting.',
    image: '/media/hunting%20area%20%20and%20deers/Red%20Deer%20Stag.jpg',
    specialties: [
      'Persistence in the field',
      'Deep understanding of animal behaviour',
      'Sika stalking expertise',
      'Tahr and chamois mountain hunting',
      'Shot selection and recovery discipline',
      'Small-group hunt delivery',
    ],
    philosophy:
      'Every hunt is conducted with respect for the animal, the country, and the traditions of true hunting. The goal is not simply a result, but a result earned through skill, patience, and sound field judgement.',
    notableAchievements: [
      '13.5-inch bull tahr',
      'Multiple gold medal sika deer',
      'Gold medal red stags',
      'Gold medal sambar stag',
    ],
    closing:
      'What Vuk enjoys most about guiding is sharing his passion for hunting and helping clients work toward exceptional trophies in the right way.',
  };

  return (
    <section id="guide" className="relative bg-gray-950 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center md:mb-24">
          <p className="text-sm uppercase tracking-[0.2em] text-[#d9b167]">Lead Guide</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-6xl">
            Your Guide
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            The person setting the pace in the field, reading the country, and helping turn a hard hunt into a well-earned result.
          </p>
        </div>

        {/* Guide Profile */}
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="flex flex-col items-center">
            <div className="relative h-96 w-96 max-w-full overflow-hidden rounded-lg border-2 border-[#d9b167]/30">
              <Image src={getBlobAssetUrl(guide.image)} alt={guide.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#d9b167]">{guide.country}</p>
              <h3 className="mt-2 font-display text-4xl font-bold text-white">{guide.name}</h3>
              <p className="mt-1 text-lg text-gray-400">{guide.title}</p>
              <p className="mt-1 text-[#d9b167]">{guide.experience} of hunting experience</p>
            </div>

            <p className="mt-6 leading-relaxed text-gray-300">{guide.bio}</p>

            {/* Specialties */}
            <div className="mt-8 space-y-2 border-t border-white/10 pt-8">
              <p className="font-display text-lg font-bold text-white">Core Specialties</p>
              <ul className="space-y-2">
                {guide.specialties.map((specialty, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300">
                    <span className="h-2 w-2 rounded-full bg-[#d9b167]" />
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-20 rounded-lg border border-[#d9b167]/20 bg-gradient-to-r from-[#d9b167]/10 to-transparent p-8 md:p-12">
          <p className="font-display text-lg font-bold text-white">Hunting Philosophy</p>
          <p className="mt-4 leading-relaxed text-gray-300">{guide.philosophy}</p>
        </div>

        {/* Notable Achievements */}
        <div className="mt-12">
          <h3 className="mb-8 font-display text-2xl font-bold text-white">Notable Achievements</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guide.notableAchievements.map((achievement, idx) => (
              <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-gray-300">{achievement}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-lg border-2 border-[#d9b167]/30 bg-gradient-to-r from-[#d9b167]/5 via-transparent to-transparent p-8 md:p-12">
          <p className="text-center text-lg leading-relaxed text-gray-300 md:text-xl">{guide.closing}</p>
        </div>
      </div>
    </section>
  );
}
