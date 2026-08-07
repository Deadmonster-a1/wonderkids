import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Shield, UserCheck, FlaskConical, UtensilsCrossed, Bus, Smartphone } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import SpotlightCard from './ui/SpotlightCard';

const features = [
  {
    icon: <Shield className="w-6 md:w-8 h-6 md:h-8 text-brand-coral" />,
    bg: 'bg-brand-coral/10 border-brand-coral/30',
    border: 'hover:border-brand-coral',
    title: 'Safe & Secure Campus',
    desc: 'CCTV surveillance, gated campus, biometric attendance, and ID-verified staff.',
  },
  {
    icon: <UserCheck className="w-6 md:w-8 h-6 md:h-8 text-brand-indigo" />,
    bg: 'bg-brand-indigo/10 border-brand-indigo/30',
    border: 'hover:border-brand-indigo',
    title: 'Qualified Faculty',
    desc: 'B.Ed / M.Ed certified teachers with regular professional development.',
  },
  {
    icon: <FlaskConical className="w-6 md:w-8 h-6 md:h-8 text-emerald-500" />,
    bg: 'bg-emerald-500/10 border-emerald-500/30',
    border: 'hover:border-emerald-500',
    title: 'Modern Labs',
    desc: 'Fully equipped Science, Computer, and Maths labs for practical learning.',
  },
  {
    icon: <UtensilsCrossed className="w-6 md:w-8 h-6 md:h-8 text-amber-500" />,
    bg: 'bg-amber-500/10 border-amber-500/30',
    border: 'hover:border-amber-500',
    title: 'Nutritious Meals',
    desc: 'Freshly prepared, balanced mid-day meals — no junk food, ever.',
  },
  {
    icon: <Bus className="w-6 md:w-8 h-6 md:h-8 text-brand-violet" />,
    bg: 'bg-brand-violet/10 border-brand-violet/30',
    border: 'hover:border-brand-violet',
    title: 'School Transport',
    desc: 'GPS-tracked buses with trained female attendants across 30+ routes.',
  },
  {
    icon: <Smartphone className="w-6 md:w-8 h-6 md:h-8 text-sky-500" />,
    bg: 'bg-sky-500/10 border-sky-500/30',
    border: 'hover:border-sky-500',
    title: 'Parent App',
    desc: 'Real-time progress reports, homework, and photo updates daily.',
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="bg-white dark:bg-brand-navy py-16 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Decorative Background Blob */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-sky/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-indigo/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Premium Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[500px] sm:h-[600px] hidden md:block"
          >
            {/* Main image */}
            <div className="absolute inset-0 w-[80%] h-[85%] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(11,17,32,0.1)] border-8 border-white z-10">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop"
                alt="Students learning"
                width="800"
                height="1000"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Secondary image */}
            <motion.div 
              className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(11,17,32,0.15)] border-[6px] border-white z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop"
                alt="Students collaborating"
                width="600"
                height="600"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Glassmorphism Award Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, ease: "easeOut", duration: 0.5 }}
              className="absolute top-8 -left-4 md:-left-12 glass dark:glass-dark rounded-[1.5rem] p-4 md:p-5 flex items-center gap-3 z-30 shadow-2xl border-4 border-white/50 dark:border-white/10"
            >
              <div className="w-12 h-12 rounded-[1rem] bg-brand-sky/20 flex items-center justify-center text-brand-indigo shadow-inner border-2 border-white">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm md:text-base font-bold text-brand-navy dark:text-white">Best School 2024</p>
                <p className="text-[10px] md:text-xs font-label-caps uppercase tracking-widest text-brand-slate dark:text-slate-300 font-bold">State Education Board</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Content & Features Grid */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <p className="font-label-caps text-xs md:text-sm tracking-widest uppercase font-bold mb-3 md:mb-4 text-brand-indigo bg-brand-indigo/10 px-4 md:px-6 py-1.5 md:py-2 rounded-full inline-block">
                Why Parents Choose Us
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy dark:text-white mb-4 md:mb-6 tracking-tight drop-shadow-sm">
                More Than Just <br className="hidden md:block" />
                A School.
              </h2>
              <p className="text-lg md:text-xl text-brand-slate mb-8 md:mb-12 leading-relaxed font-medium mx-auto lg:mx-0 max-w-xl">
                We combine evidence-based education from Nursery to Grade 10 with a warm, nurturing environment — where every student feels seen, safe, and celebrated.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="h-full"
                >
                  <TiltCard maxRotation={2} scale={1.01} className="h-full">
                    <SpotlightCard className="h-full rounded-[1.5rem] md:rounded-[2rem]">
                      <div className={`group p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] glass dark:glass-dark border-4 border-white/50 dark:border-white/10 transition-all duration-300 ${f.border} hover:bg-white dark:hover:bg-white/5 hover:shadow-xl h-full flex flex-col relative z-10`}>
                        <div className={`w-14 md:w-16 h-14 md:h-16 rounded-[1rem] md:rounded-[1.5rem] flex items-center justify-center mb-4 md:mb-6 border-2 ${f.bg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner`}>
                          {f.icon}
                        </div>
                        <h3 className="font-display-sm font-bold text-xl md:text-2xl text-brand-navy dark:text-white mb-2 md:mb-3">
                          {f.title}
                        </h3>
                        <p className="text-sm md:text-[15px] text-brand-slate leading-relaxed font-medium">
                          {f.desc}
                        </p>
                      </div>
                    </SpotlightCard>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
