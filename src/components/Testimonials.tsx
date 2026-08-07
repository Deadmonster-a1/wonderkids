import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useFetch } from '../hooks/useApi';
import TiltCard from './ui/TiltCard';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string | null;
}

export default function Testimonials() {
  const { data: testimonialsData, loading, error } = useFetch<Testimonial[]>('Testimonial');
  const testimonials = testimonialsData || [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: 'spring' as const, bounce: 0.3 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 },
    }),
  };

  const next = () => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-white dark:bg-brand-navy py-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-sky/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-violet/10 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <p className="font-label-caps text-xs md:text-sm tracking-widest uppercase font-bold mb-3 md:mb-4 text-brand-indigo bg-brand-indigo/10 px-4 md:px-6 py-1.5 md:py-2 rounded-full inline-block">
            Parent Voices
          </p>
          <h2 className="font-display-md text-4xl md:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white mb-4 md:mb-6 tracking-tight drop-shadow-sm">
            Trusted by Families
          </h2>
          <p className="max-w-2xl mx-auto text-brand-slate text-lg md:text-xl leading-relaxed font-medium">
            Don't just take our word for it. Hear from the parents who have partnered with us in their child's educational journey.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-brand-slate">Loading testimonials...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Failed to load testimonials.</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 text-brand-slate">No testimonials found.</div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            {/* Main Carousel Area */}
            <div className="h-[450px] md:h-[400px] lg:h-[350px] relative flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-full px-4 md:px-12"
                >
                  <TiltCard maxRotation={4} scale={1.02}>
                    <div className="glass dark:glass-dark rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-2xl border-4 md:border-8 border-white/50 dark:border-white/10 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start relative overflow-hidden">
                      
                      {/* Decorative Gradient Blob */}
                      <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-indigo/10 rounded-full blur-3xl pointer-events-none" />

                      {/* Large Quote Icon */}
                      <div className="absolute top-8 right-8 md:right-12 text-brand-indigo/10 hidden md:block">
                        <Quote className="w-24 h-24 md:w-32 md:h-32 rotate-180 drop-shadow-md" />
                      </div>

                      {/* Profile Image */}
                      <div className="shrink-0 relative">
                        <div className="w-20 h-20 md:w-28 md:h-28 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-4 border-white shadow-xl relative z-10 bg-slate-100 flex items-center justify-center transform -rotate-3">
                          {testimonials[currentIndex]?.imageUrl ? (
                              <img 
                                src={testimonials[currentIndex].imageUrl} 
                                alt={testimonials[currentIndex].name}
                                width="200"
                                height="200"
                                className="w-full h-full object-cover scale-110"
                                loading="lazy"
                              />
                          ) : (
                            <span className="text-3xl font-black text-brand-indigo">{testimonials[currentIndex]?.name?.charAt(0)}</span>
                          )}
                        </div>
                        {/* Decorative ring */}
                        <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] border-4 border-brand-coral translate-x-2 translate-y-2 -z-10" />
                      </div>

                      {/* Content */}
                      <div className="text-center md:text-left relative z-10 flex-1">
                        <div className="flex justify-center md:justify-start gap-1.5 mb-6 md:mb-8">
                          {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shadow-inner border border-amber-200">
                              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                            </div>
                          ))}
                        </div>
                        <p className="text-xl md:text-2xl lg:text-3xl text-brand-navy dark:text-white font-bold leading-relaxed mb-8 md:mb-10 font-display-sm">
                          "{testimonials[currentIndex]?.content}"
                        </p>
                        <div>
                          <h4 className="font-bold text-lg md:text-xl text-brand-navy dark:text-white tracking-tight">
                            {testimonials[currentIndex]?.name}
                          </h4>
                          <p className="text-xs md:text-sm font-label-caps uppercase tracking-widest text-brand-slate font-bold mt-1">
                            {testimonials[currentIndex]?.role}
                          </p>
                        </div>
                      </div>

                    </div>
                  </TiltCard>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-12 md:mt-16 relative z-20">
              <button 
                onClick={prev}
                className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-white dark:bg-white/10 border-4 border-white dark:border-white/20 shadow-lg flex items-center justify-center text-brand-navy dark:text-white hover:border-brand-indigo dark:hover:border-brand-indigo hover:text-brand-indigo transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentIndex 
                        ? 'w-8 h-2.5 bg-brand-indigo' 
                        : 'w-2.5 h-2.5 bg-slate-300 hover:bg-brand-indigo/50'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={next}
                className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-white dark:bg-white/10 border-4 border-white dark:border-white/20 shadow-lg flex items-center justify-center text-brand-navy dark:text-white hover:border-brand-indigo dark:hover:border-brand-indigo hover:text-brand-indigo transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
