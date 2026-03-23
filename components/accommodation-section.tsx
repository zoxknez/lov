'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Wifi, Utensils, Users } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import TextReveal from '@/components/text-reveal';

export default function AccommodationSection() {


  const lodges = [
    {
      name: 'Ohakune Lodge Base',
      location: 'Ohakune, North Island',
      description: 'A comfortable base for Central North Island hunting programs and the hosted rhythm of the trip.',
      features: [
        'Private bedrooms',
        'Heating and fireplace',
        'Chef-prepared meals',
        'Communal lounge',
      ],
      image: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg',
      capacity: '2-4 hunters',
      type: 'Primary Base',
    },
    {
      name: 'Remote Alpine Camps',
      location: 'South Island alpine country',
      description: 'Simple field camps used when the hunt calls for more reach into serious mountain country.',
      features: [
        'Backcountry atmosphere',
        'Full mountain immersion',
        'Weather-led access',
        'Hunt-focused living',
      ],
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
      capacity: '1-2 hunters',
      type: 'Backcountry',
    },
  ];

  const amenities = [
    {
      icon: Utensils,
      title: 'Hosted Dining',
      description: 'Chef-prepared meals tailored to the group, the hunting schedule, and any dietary preferences.',
    },
    {
      icon: Wifi,
      title: 'Connectivity',
      description: 'Lodge Wi-Fi for international coordination, while camps offer a full reset from signal.',
    },
    {
      icon: MapPin,
      title: 'Strategic Basing',
      description: 'Ohakune works as a perfect North Island base, with alpine access planned separately.',
    },
    {
      icon: Users,
      title: 'Personal Hosting',
      description: 'Trips are usually run for 2-4 hunters so the program stays personal and flexible.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <section id="stay" className="relative overflow-hidden bg-transparent py-24 md:py-40 font-sans standards-ledger">
      {/* Warm Hospitality Gloom */}
      <div className="absolute inset-0 bg-black/28 backdrop-blur-[1px] pointer-events-none" />
      {/* Background radial glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400 mb-4">
             <TextReveal>Where You Rest</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl lg:text-9xl uppercase tracking-tighter">
             <TextReveal delay={0.2}>Lodge & Camps</TextReveal>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 140 }}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" 
          />
          <p className="mx-auto mt-10 max-w-2xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl italic">
             <TextReveal delay={0.4}>
                Comfortable lodge hosting where it makes sense, with remote camps only when the hunt really needs extra reach.
             </TextReveal>
          </p>
        </div>

        {/* Lodges Display */}
        <div className="mb-40 space-y-32">
          {lodges.map((lodge, idx) => (
            <motion.div
              key={lodge.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`group relative grid gap-16 items-center md:grid-cols-2`}
            >
              <div className={`relative aspect-video w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-premium transition-all duration-700 group-hover:border-gold-500/40 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <Image
                  src={getBlobAssetUrl(lodge.image)}
                  alt={lodge.name}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent opacity-80" />
                <div className="absolute top-8 left-8">
                   <div className="rounded-full bg-forest-950/60 px-5 py-2 backdrop-blur-md border border-white/10 shadow-glow">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-gold-400 uppercase">{lodge.type}</p>
                   </div>
                </div>
              </div>

              <div className={`p-4 ${idx % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                <div className={`flex items-center gap-3 text-gold-400 mb-6 ${idx % 2 === 1 ? 'justify-end' : ''}`}>
                  <MapPin className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{lodge.location}</span>
                </div>
                <h3 className="font-display text-5xl font-bold text-white md:text-6xl leading-tight mb-8 uppercase tracking-tighter">
                   <TextReveal delay={0.2}>{lodge.name}</TextReveal>
                </h3>
                <p className="font-sans text-lg leading-relaxed text-gray-400 mb-10 max-w-xl mx-auto md:mx-0 italic">
                   {lodge.description}
                </p>
                
                <div className={`flex flex-wrap gap-x-10 gap-y-5 border-t border-white/5 pt-10 ${idx % 2 === 1 ? 'justify-end' : ''}`}>
                   {lodge.features.map((feature) => (
                     <div key={feature} className="flex items-center gap-4 transition-transform group-hover:translate-y-[-2px]">
                        <div className="h-2 w-2 rounded-full bg-gold-400/30" />
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{feature}</span>
                     </div>
                   ))}
                </div>
                
                <div className={`mt-14 flex items-center gap-6 ${idx % 2 === 1 ? 'justify-end' : ''}`}>
                   <div className="h-px w-20 bg-gold-400/20 group-hover:w-32 transition-all duration-700" />
                   <div className="bg-gold-400/5 px-4 py-2 rounded-full border border-gold-400/10 transition-colors group-hover:bg-gold-400/10">
                      <p className="text-[10px] font-bold tracking-[0.4em] text-gold-400 uppercase">SPACE: {lodge.capacity}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Amenities Row */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-40 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {amenities.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <motion.div 
                key={amenity.title} 
                variants={itemVariants}
                className="group relative rounded-3xl border border-white/5 bg-forest-900/10 p-10 transition-all duration-700 hover:border-gold-500/30 hover:bg-forest-900/40 shadow-premium"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-900 text-gold-400 border border-white/5 shadow-glow transition-transform group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>
                <h4 className="font-display text-2xl font-bold text-white mb-4 uppercase tracking-tight">{amenity.title}</h4>
                <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors font-sans">{amenity.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dining Accent */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-32"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-forest-900/40 p-1 font-sans shadow-premium backdrop-blur-xl">
             <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-forest-600/10" />
             <div className="relative flex flex-col items-center justify-center p-16 md:p-24 text-center">
                <Utensils className="h-16 w-16 text-gold-400 mb-10 opacity-30 animate-pulse" />
                <h3 className="mb-8 font-display text-4xl font-bold text-white md:text-5xl uppercase tracking-tighter">
                   <TextReveal>Wilderness Dining</TextReveal>
                </h3>
                <div className="max-w-4xl text-xl font-light italic leading-relaxed text-gray-200">
                  <TextReveal delay={0.4}>
                    &quot;Meals at the lodge are prepared around the rhythm of the hunt, not the other way around. The goal is simple: excellent food, reliable hospitality, and a stay that feels relaxed after long days in the bush or the hills.&quot;
                  </TextReveal>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
