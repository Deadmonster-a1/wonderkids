import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useFetch } from '../hooks/useApi';

type GalleryCategory = 'All' | 'Campus' | 'Activities' | 'Events' | 'Sports';

const categories: GalleryCategory[] = ['All', 'Campus', 'Activities', 'Events', 'Sports'];

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export default function Gallery() {
  const { data: galleryItemsData, loading, error } = useFetch<GalleryImage[]>('/gallery');
  const galleryItems = galleryItemsData || [];

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = galleryItems.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => (i! > 0 ? i! - 1 : filtered.length - 1));
  const next = () => setLightboxIndex(i => (i! < filtered.length - 1 ? i! + 1 : 0));

  return (
    <section className="bg-brand-light dark:bg-brand-navy py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase font-bold mb-3 text-brand-indigo">
            Life at WonderKids
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy dark:text-white mb-6 tracking-tight">
            Moments of Joy
          </h2>
          <p className="max-w-2xl mx-auto text-brand-slate text-lg leading-relaxed">
            Take a visual tour of our vibrant campus, engaging activities, and the happy faces that make WonderKids special.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 flex-wrap mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 z-10"
              style={{ color: activeCategory === cat ? '#fff' : '#64748B' }}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="galleryTab"
                  className="absolute inset-0 bg-brand-navy rounded-full -z-10 shadow-md"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        {loading ? (
          <div className="text-center py-12 text-brand-slate">Loading gallery...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Failed to load gallery images.</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-brand-slate">No images found in this category.</div>
        ) : (
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
                  className="relative group cursor-pointer overflow-hidden break-inside-avoid rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-brand-navy/60 backdrop-blur-[2px]">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-white dark:bg-brand-navy/20 backdrop-blur-md flex items-center justify-center border border-white/30"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                    >
                      <ZoomIn className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
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
                className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
              />
              
              {/* Controls */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-4 md:top-0 md:-right-12 w-12 h-12 bg-white dark:bg-brand-navy/10 hover:bg-white dark:bg-brand-navy/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>
              
              <button
                onClick={prev}
                className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-brand-navy/10 hover:bg-white dark:bg-brand-navy/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 border border-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={next}
                className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-brand-navy/10 hover:bg-white dark:bg-brand-navy/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 border border-white/20"
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
