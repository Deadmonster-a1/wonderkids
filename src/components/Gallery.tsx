import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import { useFetch } from '../hooks/useApi';

type GalleryCategory = 'All' | 'Campus' | 'Activities' | 'Events' | 'Sports';

const categories: GalleryCategory[] = ['All', 'Campus', 'Activities', 'Events', 'Sports'];

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

const FALLBACK_GALLERY: GalleryImage[] = [
  { id: '1', title: 'Campus View', category: 'Campus', imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=600&auto=format&fit=crop' },
  { id: '2', title: 'Science Fair', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?q=80&w=600&auto=format&fit=crop' },
  { id: '3', title: 'Art Class', category: 'Activities', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop' },
  { id: '4', title: 'Sports Meet', category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=600&auto=format&fit=crop' },
  { id: '5', title: 'Annual Day', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600&auto=format&fit=crop' },
  { id: '6', title: 'Library', category: 'Campus', imageUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=600&auto=format&fit=crop' },
  { id: '7', title: 'Music Room', category: 'Activities', imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=600&auto=format&fit=crop' },
  { id: '8', title: 'Basketball Match', category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop' }
];

export default function Gallery() {
  const { data: galleryItems, loading } = useFetch<GalleryImage[]>('GalleryItem', FALLBACK_GALLERY);

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = galleryItems.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => (i! > 0 ? i! - 1 : filtered.length - 1));
  const next = () => setLightboxIndex(i => (i! < filtered.length - 1 ? i! + 1 : 0));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, filtered.length]);

  return (
    <section className="bg-brand-light dark:bg-brand-navy py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-label-caps text-xs md:text-sm tracking-widest uppercase font-bold mb-3 md:mb-4 text-brand-indigo bg-brand-indigo/10 px-4 md:px-6 py-1.5 md:py-2 rounded-full inline-block">
            Life at WonderKids
          </p>
          <h2 className="font-display-md text-4xl md:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white mb-4 md:mb-6 tracking-tight drop-shadow-sm">
            Moments of Joy
          </h2>
          <p className="max-w-2xl mx-auto text-brand-slate text-lg md:text-xl leading-relaxed font-medium">
            Take a visual tour of our vibrant campus, engaging activities, and the happy faces that make WonderKids special.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-3 md:gap-4 flex-wrap mb-10 md:mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-bold transition-all duration-300 z-10 border-2 border-transparent"
              style={{ color: activeCategory === cat ? '#fff' : '#64748B' }}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="galleryTab"
                  className="absolute inset-0 bg-brand-navy rounded-full -z-10 shadow-lg border-2 border-brand-navy"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                className="break-inside-avoid"
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(i);
                  }
                }}
              >
                <TiltCard maxRotation={4} scale={1.03}>
                  <div className="relative group cursor-pointer overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border-4 md:border-8 border-white/80 dark:border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-brand-navy/50 backdrop-blur-[2px]">
                      <motion.div 
                        className="w-14 h-14 rounded-[1rem] bg-white/90 shadow-xl flex items-center justify-center border-4 border-white"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        animate={{ scale: 1 }}
                      >
                        <ZoomIn className="w-6 h-6 text-brand-indigo" />
                      </motion.div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/90"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl px-4 md:px-12 flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].imageUrl.replace('w=600', 'w=1600')}
                alt={filtered[lightboxIndex].title}
                className="max-w-full max-h-[85vh] rounded-[2rem] shadow-2xl border-4 md:border-8 border-white/80"
              />
              
              {/* Controls */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-4 md:top-0 md:-right-12 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 border-2 border-white/50"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={prev}
                className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 rounded-full flex items-center justify-center text-brand-navy dark:text-white backdrop-blur-md transition-all duration-300 border border-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={next}
                className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 rounded-full flex items-center justify-center text-brand-navy dark:text-white backdrop-blur-md transition-all duration-300 border border-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Counter */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-white text-sm font-semibold border-white/20 shadow-lg">
                {lightboxIndex + 1} of {filtered.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
