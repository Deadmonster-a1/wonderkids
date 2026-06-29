import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useFetch } from '../hooks/useApi';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string | null;
}

export default function Testimonials() {
  const { data: testimonialsData, loading, error } = useFetch<Testimonial[]>('/testimonials');
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
      transition: { duration: 0.6, type: 'spring', bounce: 0.3 },
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase font-bold mb-3 text-brand-indigo">
            Parent Voices
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy dark:text-white mb-6 tracking-tight">
            Trusted by Families
          </h2>
          <p className="max-w-2xl mx-auto text-brand-slate text-lg leading-relaxed">
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
            <div className="h-[400px] md:h-[300px] relative flex items-center justify-center">
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
                  <div className="bg-white dark:bg-brand-navy rounded-3xl p-8 md:p-12 shadow-[0_20px_40px_rgba(11,17,32,0.06)] border border-slate-100 dark:border-white/10 flex flex-col md:flex-row gap-8 items-center md:items-start relative">
                    
                    {/* Large Quote Icon */}
                    <div className="absolute top-8 right-12 text-brand-sky/20 hidden md:block">
                      <Quote className="w-24 h-24 rotate-180" />
                    </div>

                    {/* Profile Image */}
                    <div className="shrink-0 relative">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10 bg-slate-100 flex items-center justify-center">
                        {testimonials[currentIndex]?.imageUrl ? (
                          <img 
                            src={testimonials[currentIndex].imageUrl} 
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-slate-400">{testimonials[currentIndex]?.name?.charAt(0)}</span>
                        )}
                      </div>
                      {/* Decorative ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-brand-indigo translate-x-2 translate-y-2 -z-10" />
                    </div>

                    {/* Content */}
                    <div className="text-center md:text-left relative z-10">
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-lg md:text-xl text-brand-navy dark:text-white font-medium leading-relaxed mb-6">
                        "{testimonials[currentIndex]?.content}"
                      </p>
                      <div>
                        <h4 className="font-bold text-lg text-brand-navy dark:text-white">
                          {testimonials[currentIndex]?.name}
                        </h4>
                        <p className="text-sm text-brand-slate font-medium">
                          {testimonials[currentIndex]?.role}
                        </p>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white dark:bg-brand-navy border border-slate-200 flex items-center justify-center text-brand-navy dark:text-white hover:border-brand-indigo hover:text-brand-indigo hover:shadow-md transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
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
                className="w-12 h-12 rounded-full bg-white dark:bg-brand-navy border border-slate-200 flex items-center justify-center text-brand-navy dark:text-white hover:border-brand-indigo hover:text-brand-indigo hover:shadow-md transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
