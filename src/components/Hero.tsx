import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, ArrowRight, Star, ShieldCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    { icon: <ShieldCheck className="w-4 h-4 text-brand-indigo" />, text: "CBSE Affiliated" },
    { icon: <Award className="w-4 h-4 text-brand-coral" />, text: "Best School 2024" },
    { icon: <Star className="w-4 h-4 text-amber-500" />, text: "1200+ Students" }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center pt-28 pb-20 overflow-hidden bg-brand-light dark:bg-brand-navy"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated gradients */}
        <motion.div 
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full mix-blend-multiply filter blur-[100px] opacity-70"
          style={{ background: 'radial-gradient(circle, rgba(67, 56, 202, 0.2) 0%, transparent 70%)' }}
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full mix-blend-multiply filter blur-[80px] opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(109, 40, 217, 0.15) 0%, transparent 70%)' }}
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230b1120' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

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
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
            >
              {trustChips.map((chip, idx) => (
                <div key={idx} className="glass px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold text-brand-navy dark:text-white border-white/60">
                  {chip.icon}
                  {chip.text}
                </div>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-tight leading-[1.05] text-brand-navy dark:text-white mb-6"
            >
              Empowering <br className="hidden lg:block" />
              <span className="text-gradient">Every Learner.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-brand-slate max-w-xl mb-10 leading-relaxed"
            >
              From Nursery to Grade 10, WonderKids provides a world-class, CBSE-aligned education designed to build character, curiosity, and excellence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link 
                to="/admissions"
                className="w-full sm:w-auto px-8 py-4 bg-brand-navy text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-brand-indigo hover:shadow-[0_8px_30px_rgba(67,56,202,0.3)] hover:-translate-y-1 transition-all duration-300"
              >
                Apply for 2025–26 <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link 
                to="/programs"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-brand-navy text-brand-navy dark:text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 border border-slate-200 hover:border-brand-indigo hover:text-brand-indigo transition-all duration-300 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-brand-indigo">
                  <Play className="w-3 h-3 fill-current" />
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
            {/* Main Image Container */}
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white z-10 group">
              <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop" 
                alt="Students collaborating"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Glass overlay badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-4 flex items-center gap-4 z-20">
                <div className="w-12 h-12 rounded-full bg-brand-indigo/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Now Accepting</p>
                  <p className="text-white/70 text-xs">Applications for Next Year</p>
                </div>
              </div>
            </div>

            {/* Decorative Floating Image 1 */}
            <motion.div 
              className="absolute -bottom-8 -left-8 w-40 aspect-square rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white z-20 hidden md:block"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop" 
                alt="Classroom"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Decorative Floating Image 2 */}
            <motion.div 
              className="absolute -top-8 -right-8 w-48 aspect-square rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white z-0 hidden md:block"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1427504494785-319ce8372ac0?w=400&auto=format&fit=crop" 
                alt="Learning"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}
