import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 1200, suffix: '+', label: 'Students Enrolled' },
  { value: 18, suffix: '', label: 'Classes (Nursery–Gr.10)' },
  { value: 97, suffix: '%', label: 'Board Pass Rate' },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.round(easeOutQuart(progress) * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, start]);

  return count;
}

function StatCounter({ stat, delayIdx, started }: { stat: StatItem, delayIdx: number, started: boolean }) {
  const count = useCountUp(stat.value, 2000, started);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delayIdx * 0.1, type: "spring", stiffness: 100 }}
      className="flex flex-col items-center justify-center p-6 text-center relative group"
    >
      <div className="text-5xl md:text-6xl font-black text-brand-navy dark:text-white mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300">
        <span className="text-gradient">{count}</span>
        <span className="text-brand-indigo">{stat.suffix}</span>
      </div>
      <div className="text-sm md:text-base font-semibold text-brand-slate tracking-wide">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-20 -mt-16 sm:-mt-20 px-6 max-w-7xl mx-auto">
      <div 
        ref={ref}
        className="glass rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-white/50 overflow-hidden relative"
      >
        {/* Subtle mesh background inside the card */}
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-indigo via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-brand-slate/10">
          {stats.map((stat, i) => (
            <div key={stat.label} className={i < 2 ? "border-b border-brand-slate/10 md:border-b-0" : ""}>
              <StatCounter stat={stat} delayIdx={i} started={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
