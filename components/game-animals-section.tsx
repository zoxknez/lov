'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { Calendar, Trophy, Target } from 'lucide-react';
import TextReveal from '@/components/text-reveal';

export default function GameAnimalsSection() {
  const animals = [
    {
      name: 'Red Deer',
      scientific: 'Cervus elaphus',
      description: 'Classic New Zealand roar hunting for mature stags in mixed bush, hill country, and alpine basins.',
      trophy: '350-400 SCI',
      season: 'Mar - Apr',
      duration: '2-3 days',
      image: '/media/hunting%20area%20%20and%20deers/Red%20Deer%20Stag.jpg',
      characteristics: ['Roar-led autumn timing', 'Mature stag focus', 'Mixed hill country'],
    },
    {
      name: 'Sika Deer',
      scientific: 'Cervus nippon',
      description: 'The signature Kaimanawa species: elusive bush deer prized for their voice and trophy quality.',
      trophy: '160-200 Douglas',
      season: 'Mar - May',
      duration: '1-2 days',
      image: '/media/hunting%20area%20%20and%20deers/Sika%20%20deer%20Stag.jpg',
      characteristics: ['Kaimanawa story species', 'Dense bush stalking', 'Rut-driven timing'],
    },
    {
      name: 'Himalayan Tahr',
      scientific: 'Hemitragus jemlahicus',
      description: 'A great alpine trophy, pursued in steep Southern Alps country where access shapes every day.',
      trophy: '10-13 inches',
      season: 'May - Jul',
      duration: 'Alpine hunt',
      image: '/media/hunting%20area%20%20and%20deers/Hunting%20%20area%20%20near%20Rotorua%202%20jpg.jpg',
      characteristics: ['Winter coat trophy', 'Remote mountain terrain', 'Alpine basins'],
    },
    {
      name: 'Fallow Deer',
      scientific: 'Dama dama',
      description: 'Selective autumn hunting for palmate bucks on suitable blocks and open country by arrangement.',
      trophy: 'Palmate maturity',
      season: 'Apr - May',
      duration: '2-3 days',
      image: '/media/hunting%20area%20%20and%20deers/Fellow%20%20deer.jpg',
      characteristics: ['Autumn rut focus', 'Selective trophy standard', 'Private-country'],
    },
    {
      name: 'Chamois',
      scientific: 'Rupicapra rupicapra',
      description: 'A true mountain hunt for a wary alpine species that rewards patience and careful glassing.',
      trophy: '8-10 inches',
      season: 'May - Jun',
      duration: 'Alpine hunt',
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
      characteristics: ['Favoured rut period', 'Steep alpine faces', 'Long glassing sessions'],
    },
    {
      name: 'Rusa Deer',
      scientific: 'Rusa timorensis',
      description: 'A dedicated North Island option usually planned separately from autumn deer and alpine programs.',
      trophy: 'Late-winter trophy',
      season: 'Jul - Aug',
      duration: '1-2 days',
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg',
      characteristics: ['Later-winter itinerary', 'Dense cover habitat', 'Specialist add-on'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <section id="species" className="relative overflow-hidden bg-transparent py-24 md:py-40 font-sans species-dossier">
      {/* Dynamic Data-Grid Reveal */}
      <div className="absolute inset-0 bg-forest-950/12 backdrop-blur-[1px] pointer-events-none" />
      {/* Decorative background element */}
      <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-forest-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400 mb-4">
             <TextReveal>Premium Trophies</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl lg:text-9xl uppercase tracking-tighter">
             <TextReveal delay={0.2}>Species Profiles</TextReveal>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 140 }}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" 
          />
          <p className="mx-auto mt-10 max-w-2xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl italic">
             <TextReveal delay={0.4}>
                Trophy programs built around the right terrain, the right seasonal window, and the kind of hunt you want to pursue.
             </TextReveal>
          </p>
        </div>

        {/* Animals Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {animals.map((animal) => (
            <motion.div
              key={animal.name}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-forest-900/10 transition-all duration-700 hover:border-gold-500/40 shadow-premium"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={getBlobAssetUrl(animal.image)}
                  alt={animal.name}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent opacity-90" />
                <div className="absolute top-6 left-6">
                   <div className="rounded-full bg-forest-950/60 px-4 py-2 backdrop-blur-md border border-white/10 shadow-glow">
                      <p className="text-[10px] font-bold italic tracking-[0.2em] text-gold-400 uppercase">{animal.scientific}</p>
                   </div>
                </div>
                <div className="absolute bottom-8 left-10">
                  <h3 className="font-display text-5xl font-bold text-white group-hover:text-gold-200 transition-colors uppercase tracking-tight">{animal.name}</h3>
                </div>
              </div>

              <div className="p-10">
                <p className="mb-10 min-h-[4rem] text-base leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors font-sans italic">
                  {animal.description}
                </p>

                <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gold-400/10 text-gold-400">
                       <Trophy className="h-4 w-4" />
                    </div>
                    <div>
                       <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400/40">Trophy</p>
                       <p className="text-xs font-bold text-gray-200 tracking-wide">{animal.trophy}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gold-400/10 text-gold-400">
                       <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                       <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400/40">Window</p>
                       <p className="text-xs font-bold text-gray-200 tracking-wide">{animal.season}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {animal.characteristics.map((char) => (
                    <span key={char} className="rounded-full border border-gold-400/20 bg-gold-400/5 px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gold-300 transition-colors group-hover:bg-gold-400/10">
                      {char}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="absolute top-0 right-0 p-8 opacity-0 transition-opacity duration-700 group-hover:opacity-10 pointer-events-none transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                 <Target className="h-24 w-24 text-gold-400" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ethical Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-32"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-gold-500/10 bg-forest-900/40 p-1 font-sans shadow-premium backdrop-blur-xl">
             <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 via-transparent to-forest-600/10" />
             <div className="relative p-20 text-center">
                <div className="mx-auto max-w-4xl text-2xl font-light italic leading-relaxed text-gray-200">
                  <TextReveal delay={0.2}>
                    &quot;All hunts follow fair-chase principles. Multiple-species itineraries can be built by arrangement, with the final program shaped by trophy goals, seasonal timing, and the country best suited to the pursuit.&quot;
                  </TextReveal>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
