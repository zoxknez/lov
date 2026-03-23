'use client';

import { useState, useEffect } from 'react';
import gallerySlike from '@/lib/gallery-slike.json';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { Maximize2 } from 'lucide-react';

type GalleryImage = {
  src: string;
  alt: string;
  blobPath?: string;
  fallbackSrc?: string;
};

function buildBlobImageSrc(image: GalleryImage) {
  if (!image.blobPath) {
    return getBlobAssetUrl(image.src);
  }

  const params = new URLSearchParams({
    pathname: image.blobPath,
    fallback: image.fallbackSrc ?? image.src,
  });

  return `/api/blob-image?${params.toString()}`;
}

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const galleries = [
    {
      category: 'trophies',
      title: 'Trophies',
      description: 'Trophy animals and field portraits from guided New Zealand hunts.',
      images: [
        { src: '/media/hunting area  and deers/Red Deer Stag.jpg', alt: 'Red Stag Trophy' },
        { src: '/media/hunting area  and deers/Sika  deer Stag.jpg', alt: 'Sika Deer' },
        { src: '/media/hunting area  and deers/Fellow  deer.jpg', alt: 'Fallow Deer' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'Hunting Area Trophy' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'landscape',
      title: 'Country',
      description: 'Bush country, alpine basins, river valleys, and the wider landscape behind the hunt.',
      images: [
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'Alpine Terrain' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', alt: 'Bush Country' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg', alt: 'Mountain Views' },
        { src: '/media/hunting area  and deers/main  photo. small size .png', alt: 'Forest Valleys' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'hunting',
      title: 'In The Hunt',
      description: 'Moments from the stalk, glassing sessions, and time spent moving through country.',
      images: [
        { src: '/media/hunting area  and deers/Red Deer Stag.jpg', alt: 'Successful Hunt' },
        { src: '/media/hunting area  and deers/Sika  deer Stag.jpg', alt: 'Stalking' },
        { src: '/media/hunting area  and deers/Fellow  deer.jpg', alt: 'Field Work' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', alt: 'Trophy Moment' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'lodge',
      title: 'Lodge & Camp Life',
      description: 'Ohakune lodge life, hosted details, and the recovery side of the trip.',
      images: [
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg', alt: 'Lodge Interior' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  dinning area .jpg', alt: 'Dining Area' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  living area.jpg', alt: 'Living Area' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  bedroom 1 .jpg', alt: 'Guest Room' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'recent',
      title: 'Recent Field Photos',
      description: 'Client-provided additions from recent hunts.',
      images: gallerySlike.map((image) => ({
        src: image.localSrc,
        fallbackSrc: image.localSrc,
        blobPath: image.blobPath,
        alt: image.alt,
      })),
    },
  ];

  const categories = ['all', 'trophies', 'landscape', 'hunting', 'lodge', 'recent'];
  const displayedGalleries = selectedCategory === 'all' ? galleries : galleries.filter((g) => g.category === selectedCategory);

  return (
    <section id="gallery" className="relative overflow-hidden bg-forest-950 py-24 md:py-40">
      {/* Decorative Blur */}
      <div className="absolute left-0 bottom-0 h-[600px] w-[600px] rounded-full bg-forest-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-300">In The Field</p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl">
            Gallery
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl">
            Trophy animals, hunt country, lodge life, and the atmosphere of a real New Zealand hunting trip.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`mb-20 flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`group relative overflow-hidden rounded-full px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                selectedCategory === cat
                  ? 'text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* Button Background */}
              <div className={`absolute inset-0 transition-transform duration-500 ${selectedCategory === cat ? 'bg-gold-400 scale-100' : 'bg-white/5 scale-0 group-hover:scale-100 opacity-20'}`} />
              <span className="relative z-10">
                {cat === 'all' ? 'All' : cat === 'landscape' ? 'Country' : cat === 'hunting' ? 'In The Hunt' : cat === 'lodge' ? 'Lodge' : cat === 'recent' ? 'Recent' : 'Trophies'}
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Content */}
        <div className="space-y-32">
          {displayedGalleries.map((gallery, gIdx) => (
            <div 
              key={gallery.category}
              className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${gIdx * 100}ms` }}
            >
              <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-xl">
                   <h3 className="font-display text-4xl font-bold text-white tracking-tight uppercase">{gallery.title}</h3>
                   <div className="mt-4 h-0.5 w-12 bg-gold-400/40" />
                   <p className="mt-6 font-sans text-gray-400 leading-relaxed italic">{gallery.description}</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {gallery.images.map((image, idx) => {
                  const resolvedSrc = buildBlobImageSrc(image);
                  return (
                    <div
                      key={`${gallery.category}-${idx}`}
                      className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/5 bg-forest-900/10 transition-all duration-700 hover:border-gold-500/30"
                    >
                      <img
                        src={resolvedSrc}
                        alt={image.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                         <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-400/20 backdrop-blur-md border border-gold-400/30">
                            <Maximize2 className="h-5 w-5 text-gold-100" />
                         </div>
                         <p className="text-[11px] font-bold uppercase tracking-widest text-white">{image.alt}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
