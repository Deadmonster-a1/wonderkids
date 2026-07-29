import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface StatsCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  duration?: number;
}

export function StatCard({ value, suffix = '', prefix = '', label, color = 'primary', duration = 1.8 }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  const colorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
      className="flex flex-col items-center text-center"
    >
      <span className={`font-display-lg text-4xl md:text-5xl font-black ${colorMap[color]}`}>
        {prefix}{count}{suffix}
      </span>
      <span className="font-label-caps text-on-surface-variant dark:text-slate-300 text-sm mt-1 font-semibold tracking-wider uppercase">{label}</span>
    </motion.div>
  );
}

export default function StatsRow({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      <StatCard value={500} suffix="+" label="Happy Kids" color="primary" />
      <StatCard value={12} suffix="+" label="Years of Magic" color="secondary" />
      <StatCard value={25} suffix="+" label="Expert Teachers" color="tertiary" />
      <StatCard value={4} suffix=".9★" label="Parent Rating" color="primary" />
    </div>
  );
}
