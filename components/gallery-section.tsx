'use client';

import { useState, useEffect } from 'react';
import gallerySlike from '@/lib/gallery-slike.json';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const galleries = [
    {
      category: 'trophies',
      title: 'Trophies',
      description: 'The pinnacle of the hunt. Portraits of world-class Red Stag, Fallow, and Sika deer.',
      images: [
        { src: '/media/hunting area  and deers/Red Deer Stag.jpg', alt: 'Red Stag Trophy' },
        { src: '/media/hunting area  and deers/Sika  deer Stag.jpg', alt: 'Sika Deer' },
        { src: '/media/hunting area  and deers/Fellow  deer.jpg', alt: 'Fallow Deer' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'Hunting Area Trophy' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'landscape',
      title: 'Alpine & Bush',
      description: 'The rugged beauty of New Zealand. From misty river valleys to high alpine basins.',
      images: [
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'Alpine Terrain' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', alt: 'Bush Country' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg', alt: 'Mountain Views' },
        { src: '/media/hunting area  and deers/main  photo. small size .png', alt: 'Forest Valleys' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'hunting',
      title: 'The Stalk',
      description: 'Raw moments from the field. Glassing, tracking, and the ultimate reward.',
      images: [
        { src: '/media/hunting area  and deers/Red Deer Stag.jpg', alt: 'Successful Hunt' },
        { src: '/media/hunting area  and deers/Sika  deer Stag.jpg', alt: 'Stalking' },
        { src: '/media/hunting area  and deers/Fellow  deer.jpg', alt: 'Field Work' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', alt: 'Trophy Moment' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'lodge',
      title: 'Lodge Life',
      description: 'Hostelry and recovery. Ohakune base comfort after a long day in the bush.',
      images: [
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg', alt: 'Lodge Interior' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  dinning area .jpg', alt: 'Dining Area' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  living area.jpg', alt: 'Living Area' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  bedroom 1 .jpg', alt: 'Guest Room' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'recent',
      title: 'Recent Success',
      description: 'Latest client captures and field highlights from the current season.',
      images: gallerySlike.map((image) => ({
        src: image.localSrc,
        fallbackSrc: image.localSrc,
        blobPath: image.blobPath,
        alt: image.alt,
      })),
    },
  ];

  const categories = ['all', 'trophies', 'landscape', 'hunting', 'lodge', 'recent'];
  
  // Curated Images for the "All" view
  const curatedAllImages = [
    galleries[0].images[0], // Trophy
    galleries[1].images[0], // Landscape
    galleries[2].images[1], // Experience
    galleries[3].images[0], // Lodge
    galleries[0].images[1], // Trophy 2
    galleries[1].images[3], // Landscape 2
  ];

  const activeGallery = selectedCategory === 'all' 
    ? { title: 'Highlights', description: 'A curated selection of the finest New Zealand hunting moments.', images: curatedAllImages }
    : galleries.find(g => g.category === selectedCategory)!;

  const handleNext = () => setLightboxIndex(prev => (prev !== null ? (prev + 1) % activeGallery.images.length : null));
  const handlePrev = () => setLightboxIndex(prev => (prev !== null ? (prev - 1 + activeGallery.images.length) % activeGallery.images.length : null));

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, activeGallery.images.length]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-forest-950 py-24 md:py-40">
      {/* Decorative Blur */}
      <div className="absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-gold-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[600px] w-[600px] rounded-full bg-forest-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-300">The Visual Archive</p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl">
            Gallery
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </div>

        {/* Filter Navigation */}
        <div className={`mb-16 flex flex-wrap justify-center gap-2 md:gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`group relative overflow-hidden rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                selectedCategory === cat ? 'text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className={`absolute inset-0 transition-transform duration-500 ${selectedCategory === cat ? 'bg-gold-400 scale-100' : 'bg-white/5 scale-0 group-hover:scale-100 opacity-20'}`} />
              <span className="relative z-10">
                {cat === 'all' ? 'All' : cat === 'landscape' ? 'Country' : cat === 'hunting' ? 'Experience' : cat === 'lodge' ? 'Lodge' : cat === 'recent' ? 'Recent' : 'Trophies'}
              </span>
            </button>
          ))}
        </div>

        {/* Active Content Meta */}
        <div className="mb-12 text-center max-w-2xl mx-auto animate-fade-in key={selectedCategory}">
           <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-4">{activeGallery.title}</h3>
           <p className="font-sans text-gray-500 italic text-sm md:text-base leading-relaxed">{activeGallery.description}</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 md:gap-6 h-[600px] md:h-[800px]">
          {activeGallery.images.slice(0, 6).map((image, idx) => {
            const resolvedSrc = buildBlobImageSrc(image);
            // Dynamic Bento Spans
            const gridClasses = [
              "md:col-span-2 md:row-span-2 col-span-2 row-span-1", // Large Feature
              "md:col-span-1 md:row-span-1 col-span-1",
              "md:col-span-1 md:row-span-1 col-span-1",
              "md:col-span-1 md:row-span-1 col-span-1",
              "md:col-span-1 md:row-span-1 col-span-1",
              "hidden md:block md:col-span-2 md:row-span-1", // Wide bottom
            ][idx] || "col-span-1";

            return (
              <div
                key={`${selectedCategory}-${idx}`}
                onClick={() => setLightboxIndex(idx)}
                className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-forest-900/10 cursor-pointer transition-all duration-700 hover:border-gold-500/30 ${gridClasses} animate-fade-up`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <img
                  src={resolvedSrc}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{image.alt}</p>
                   <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gold-400 text-black shadow-glow">
                      <Maximize2 className="h-3.5 w-3.5" />
                   </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Gallery CTA (If needed) */}
        {selectedCategory === 'all' && (
          <div className="mt-16 text-center">
             <button 
               onClick={() => setSelectedCategory('recent')}
               className="font-display text-sm font-bold uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors border-b border-gold-400/20 pb-1"
             >
               Explore Full Archive
             </button>
          </div>
        )}
      </div>

      {/* Simple Lightbox */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/98 p-4 md:p-10 backdrop-blur-2xl animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Area (Full Screen) */}
          <div className="absolute inset-0 cursor-zoom-out" />

          {/* Close Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            className="absolute top-8 right-8 z-[110] text-white/50 hover:text-white transition-all hover:scale-110 p-2 bg-white/5 rounded-full hover:bg-white/10"
          >
            <X className="h-8 w-8" />
          </button>
          
          {/* Controls */}
          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4 md:px-10 pointer-events-none">
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white/50 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:scale-110"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white/50 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:scale-110"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </div>

          {/* Content */}
          <div 
            className="relative z-[105] max-w-6xl w-full h-[70vh] md:h-[80vh] flex items-center justify-center pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={buildBlobImageSrc(activeGallery.images[lightboxIndex])} 
              alt="Gallery Preview"
              className="pointer-events-auto max-w-full max-h-full object-contain rounded-2xl shadow-panel animate-scale-in"
            />
            <div className="absolute bottom-[-80px] text-center w-full animate-fade-up">
               <p className="font-display text-2xl font-bold text-white uppercase tracking-widest">{activeGallery.images[lightboxIndex].alt}</p>
               <p className="text-xs text-gold-500 mt-2 uppercase tracking-[0.4em] font-bold">
                 {lightboxIndex + 1} <span className="text-gray-700 mx-2">/</span> {activeGallery.images.length}
               </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
