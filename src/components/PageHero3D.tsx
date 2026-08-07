import React from 'react';
import { motion } from 'motion/react';

export default function PageHero3D({ 
  title, 
  description, 
  color = "brand-navy" 
}: { 
  title: React.ReactNode; 
  description: React.ReactNode; 
  color?: string;
}) {
  return (
    <div className="relative w-full h-[30vh] md:h-[40vh] min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden mb-12 md:mb-20 rounded-[2rem] md:rounded-[3rem] mt-4 border-4 md:border-8 border-white/40 dark:border-white/20 mx-auto max-w-[96%]">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-sky/20 via-brand-light to-white dark:from-brand-navy dark:via-[#1e1b4b] dark:to-brand-navy" />
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        <h1 className={`font-display text-4xl md:text-6xl lg:text-[80px] text-${color} mb-4 md:mb-6 tracking-tight leading-tight font-bold`}>
          {title}
        </h1>
        <p className="font-body-lg text-xl md:text-2xl text-on-surface-variant dark:text-slate-200 font-medium">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
