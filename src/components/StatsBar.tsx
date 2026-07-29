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
      initial={{ opacity: 0, y: 15 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delayIdx * 0.1, ease: "easeOut" }}
      className="glass dark:glass-dark border-4 border-white/50 dark:border-white/10 px-6 py-6 rounded-2xl shadow-sm flex flex-col items-center justify-center min-w-[160px] md:min-w-[200px]"
    >
      <div className="text-3xl md:text-4xl font-bold text-brand-navy dark:text-white mb-2 tracking-tight">
        {count}
        <span className="text-brand-indigo ml-1">{stat.suffix}</span>
      </div>
      <div className="text-[10px] md:text-xs font-semibold text-brand-slate uppercase tracking-widest text-center">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-20 mt-8 sm:mt-12 py-4 px-4 sm:px-6 max-w-5xl mx-auto">
      <div 
        ref={ref}
        className="flex flex-wrap justify-center gap-4 md:gap-6"
      >
        {stats.map((stat, i) => (
          <StatCounter key={stat.label} stat={stat} delayIdx={i} started={isInView} />
        ))}
      </div>
    </section>
  );
}
