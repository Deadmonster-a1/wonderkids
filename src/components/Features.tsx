import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Shield, UserCheck, FlaskConical, UtensilsCrossed, Bus, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-5 h-5 text-brand-coral" />,
    bg: 'bg-brand-coral/10',
    border: 'group-hover:border-brand-coral/30',
    title: 'Safe & Secure Campus',
    desc: 'CCTV surveillance, gated campus, biometric attendance, and ID-verified staff.',
  },
  {
    icon: <UserCheck className="w-5 h-5 text-brand-indigo" />,
    bg: 'bg-brand-indigo/10',
    border: 'group-hover:border-brand-indigo/30',
    title: 'Qualified Faculty',
    desc: 'B.Ed / M.Ed certified teachers with regular professional development.',
  },
  {
    icon: <FlaskConical className="w-5 h-5 text-emerald-500" />,
    bg: 'bg-emerald-500/10',
    border: 'group-hover:border-emerald-500/30',
    title: 'Modern Labs',
    desc: 'Fully equipped Science, Computer, and Maths labs for practical learning.',
  },
  {
    icon: <UtensilsCrossed className="w-5 h-5 text-amber-500" />,
    bg: 'bg-amber-500/10',
    border: 'group-hover:border-amber-500/30',
    title: 'Nutritious Meals',
    desc: 'Freshly prepared, balanced mid-day meals — no junk food, ever.',
  },
  {
    icon: <Bus className="w-5 h-5 text-brand-violet" />,
    bg: 'bg-brand-violet/10',
    border: 'group-hover:border-brand-violet/30',
    title: 'School Transport',
    desc: 'GPS-tracked buses with trained female attendants across 30+ routes.',
  },
  {
    icon: <Smartphone className="w-5 h-5 text-sky-500" />,
    bg: 'bg-sky-500/10',
    border: 'group-hover:border-sky-500/30',
    title: 'Parent App',
    desc: 'Real-time progress reports, homework, and photo updates daily.',
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="bg-white dark:bg-brand-navy py-24 relative overflow-hidden" ref={ref}>
      {/* Decorative Background Blob */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-sky/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-indigo/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT: Premium Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative h-[500px] sm:h-[600px] hidden md:block"
          >
            {/* Main image */}
            <div className="absolute inset-0 w-[80%] h-[85%] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(11,17,32,0.1)] border-8 border-white z-10">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop"
                alt="Students learning"
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
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Glassmorphism Award Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute top-12 -left-8 glass rounded-2xl p-4 flex items-center gap-3 z-30 shadow-xl"
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl">
                🏆
              </div>
              <div>
                <p className="text-sm font-bold text-brand-navy dark:text-white">Best School 2024</p>
                <p className="text-[10px] uppercase tracking-wider text-brand-slate font-semibold">State Education Board</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Content & Features Grid */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm tracking-widest uppercase font-bold mb-3 text-brand-indigo">
                Why Parents Choose Us
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy dark:text-white mb-6 tracking-tight leading-[1.1]">
                More Than Just <br className="hidden md:block" />
                A School.
              </h2>
              <p className="text-lg text-brand-slate mb-10 leading-relaxed max-w-lg">
                We combine evidence-based education from Nursery to Grade 10 with a warm, nurturing environment — where every student feels seen, safe, and celebrated.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className={`group p-5 rounded-2xl border border-transparent transition-all duration-300 ${f.borderHover} hover:bg-white dark:bg-brand-navy hover:shadow-lg`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.bg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    {f.icon}
                  </div>
                  <h4 className="font-bold text-lg text-brand-navy dark:text-white mb-2">
                    {f.title}
                  </h4>
                  <p className="text-sm text-brand-slate leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
