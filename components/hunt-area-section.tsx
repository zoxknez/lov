'use client';

import { getBlobAssetUrl } from '@/lib/blob-asset';

export default function HuntAreaSection() {
  const regions = [
    {
      name: 'North Island | Central Plateau',
      location: 'Taupo, Turangi, and Kaimanawa country',
      description:
        'Native bush, river valleys, and rugged hill country. This is the heart of the Kaimanawa sika story and a strong region for red deer, fallow deer, and selected rusa programs by arrangement.',
      species: ['Red Deer', 'Sika Deer', 'Fallow Deer', 'Rusa Deer'],
      terrain: ['Dense native bush', 'River valleys', 'Hill country', 'Mixed private and public access'],
      accessNote: 'The main lodge base is in Ohakune, with daily hunt logistics built around the species and block being hunted.',
      image: '/media/hunting%20area%20%20and%20deers/Hunting%20%20area%20%20near%20Rotorua.jpg',
    },
    {
      name: 'South Island | Southern Alps Access',
      location: 'Southern Alps and West Coast access country',
      description:
        'Steep alpine basins, exposed faces, and remote backcountry for Himalayan tahr, chamois, and selected mountain red deer programs.',
      species: ['Himalayan Tahr', 'Chamois', 'Red Deer'],
      terrain: ['High alpine basins', 'Steep river valleys', 'Rocky faces', 'Remote backcountry'],
      accessNote: 'Helicopter support is used where the terrain, weather, permissions, and operator approvals make it the right tool for the hunt.',
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
    },
  ];

  const seasonWindows = [
    {
      window: 'Late March to April',
      title: 'Red Deer Roar',
      description: 'The classic autumn window for mature red stags and one of the main travel periods for international hunters.',
    },
    {
      window: 'Late March to early May',
      title: 'Sika Rut',
      description: 'The prime sika period tied closely to the Kaimanawa story and the Central North Island program.',
    },
    {
      window: 'April to mid-May',
      title: 'Fallow Rut',
      description: 'Best timing for selective fallow trophy hunting, even though fallow can be hunted more widely through the year.',
    },
    {
      window: 'May to June',
      title: 'Chamois Focus',
      description: 'A favoured buck period in alpine country, with weather and access shaping the final itinerary.',
    },
    {
      window: 'Late May to mid-July',
      title: 'Tahr Rut',
      description: 'The main trophy period for bull tahr, when winter conditions get harder but coat quality is at its best.',
    },
    {
      window: 'July to August',
      title: 'Rusa Program',
      description: 'Usually run as a separate later-winter North Island option rather than folded into the main autumn deer season.',
    },
  ];

  const accessNotes = [
    'Hunts may involve foot travel, 4WD access, and helicopter support where the hunt genuinely requires it.',
    'Programs can include both private and public land, depending on species, season, and permissions.',
    'Remote alpine camps are part of the experience when the hunt pushes beyond lodge-based country.',
  ];

  return (
    <section id="hunt" className="relative bg-gradient-to-b from-gray-950 to-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center md:mb-24">
          <p className="text-sm uppercase tracking-[0.2em] text-[#d9b167]">Where You Hunt</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-6xl">
            Hunting Territory
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Our programs are built around the right country first, then matched to the species, the seasonal window, and the
            pace your group wants in the field.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="mb-12 font-display text-3xl font-bold text-white">Core Hunting Regions</h3>
          <div className="grid gap-12 md:grid-cols-2">
            {regions.map((region) => (
              <div
                key={region.name}
                className="group overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-gray-900/40 to-gray-950 backdrop-blur transition-all duration-300 hover:border-[#d9b167]/50"
              >
                <div className="relative h-64 w-full overflow-hidden bg-gray-800">
                  <img
                    src={getBlobAssetUrl(region.image)}
                    alt={region.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="font-display text-2xl font-bold text-white">{region.name}</h4>
                    <p className="text-sm text-[#d9b167]">{region.location}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="mb-4 text-gray-300">{region.description}</p>

                  <div className="mb-4 space-y-4 border-t border-white/10 pt-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Species</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {region.species.map((sp) => (
                          <span key={sp} className="rounded-full bg-[#d9b167]/20 px-3 py-1 text-xs text-[#d9b167]">
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Terrain</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {region.terrain.map((item) => (
                          <span key={item} className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="border-t border-white/10 pt-4 text-sm leading-relaxed text-gray-400">{region.accessNote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 rounded-lg border border-[#d9b167]/20 bg-gradient-to-r from-[#d9b167]/10 to-transparent p-8 md:p-12">
          <h3 className="mb-4 font-display text-2xl font-bold text-white">How Access Works</h3>
          <ul className="space-y-3">
            {accessNotes.map((note) => (
              <li key={note} className="flex items-start gap-3 text-gray-300">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#d9b167]" />
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-10">
            <h3 className="font-display text-3xl font-bold text-white">Season Windows</h3>
            <p className="mt-3 max-w-3xl text-gray-400">
              The main travel window runs from March through July, with dedicated rusa programs usually sitting later in winter.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {seasonWindows.map((item) => (
              <div key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#d9b167]">{item.window}</p>
                <h4 className="mt-3 font-display text-2xl font-bold text-white">{item.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
