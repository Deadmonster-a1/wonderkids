import React, { useRef, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, ArrowRight, Star, ShieldCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './ui/MagneticButton';

const Scene = lazy(() => import('./canvas/Scene'));
const KidsToysScene = lazy(() => import('./canvas/KidsToysScene'));

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const trustChips = [
    { icon: <ShieldCheck className="w-4 md:w-5 h-4 md:h-5 text-brand-indigo" />, text: "CBSE Affiliated", color: "border-brand-indigo/30 bg-brand-indigo/10" },
    { icon: <Award className="w-4 md:w-5 h-4 md:h-5 text-brand-coral" />, text: "Best School 2024", color: "border-brand-coral/30 bg-brand-coral/10" },
    { icon: <Star className="w-4 md:w-5 h-4 md:h-5 text-amber-500" />, text: "1200+ Students", color: "border-amber-500/30 bg-amber-500/10" }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center pt-28 pb-40 lg:pb-56 overflow-hidden bg-gradient-to-b from-brand-light to-white dark:from-brand-navy dark:to-brand-navy"
    >
      {/* 3D Background */}
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-brand-light/50 dark:bg-brand-navy/50 backdrop-blur-sm z-0">
          <div className="w-12 h-12 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin"></div>
        </div>
      }>
        <Scene />
      </Suspense>

      <motion.div 
        className="max-w-7xl mx-auto px-6 relative z-10 w-full"
        style={{ y: y1, opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Trust Chips Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 mb-6 md:mb-8"
            >
              {trustChips.map((chip, idx) => (
                <div key={idx} className={`glass-dark px-4 md:px-5 py-2 md:py-2.5 rounded-full flex items-center gap-2 text-xs md:text-sm font-bold text-brand-navy dark:text-white border-2 shadow-sm ${chip.color}`}>
                  {chip.icon}
                  {chip.text}
                </div>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-[5rem] xl:text-[6.5rem] font-black tracking-tight leading-[1.1] text-brand-navy dark:text-white mb-6 drop-shadow-sm font-display-lg"
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                className="inline-block"
              >
                Empowering
              </motion.span>
              <br className="hidden lg:block" />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, type: "spring", stiffness: 100 }}
                className="inline-block text-gradient mt-2"
              >
                Every Learner.
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl xl:text-2xl text-brand-slate max-w-2xl mb-8 md:mb-12 leading-relaxed font-medium"
            >
              From Nursery to Grade 10, WonderKids provides a world-class, CBSE-aligned education designed to build character, curiosity, and excellence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto"
            >
              <Link 
                to="/admissions"
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-brand-indigo hover:bg-brand-violet text-white rounded-full font-bold text-lg md:text-xl flex items-center justify-center gap-3 border-4 border-white/20 hover:border-white/40 transition-colors duration-300 shadow-lg"
              >
                Apply for 2025–26 <ArrowRight className="w-5 md:w-6 h-5 md:h-6" />
              </Link>
              
              <Link 
                to="/programs"
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white dark:bg-brand-navy/60 text-brand-navy dark:text-white rounded-full font-bold text-lg md:text-xl flex items-center justify-center gap-3 border-4 border-brand-indigo/20 hover:border-brand-indigo/60 transition-colors duration-300 shadow-md"
              >
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-brand-indigo/10 flex items-center justify-center text-brand-indigo">
                  <Play className="w-4 md:w-5 h-4 md:h-5 fill-current" />
                </div>
                Explore Programs
              </Link>
            </motion.div>
          </div>

          {/* Right: Immersive Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="relative lg:h-[600px] flex items-center justify-center"
            style={{ y: y2 }}
          >
            {/* 3D Kids Elements */}
            <div className="relative w-full aspect-[4/5] lg:aspect-square z-10 group flex items-center justify-center">
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin drop-shadow-md"></div>
                </div>
              }>
                <KidsToysScene />
              </Suspense>
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}
