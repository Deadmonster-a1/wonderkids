import React, { Suspense, lazy } from 'react';
import { motion } from 'motion/react';

const Scene = lazy(() => import('./canvas/Scene'));

export default function PageHero3D({ 
  title, 
  description, 
  color = "primary" 
}: { 
  title: React.ReactNode; 
  description: React.ReactNode; 
  color?: string;
}) {
  return (
    <div className="relative w-full h-[30vh] md:h-[40vh] min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden mb-12 md:mb-20 rounded-[2rem] md:rounded-[3rem] mt-4 shadow-xl border-4 md:border-8 border-white/40 dark:border-white/20 mx-auto max-w-[96%]">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-sky via-brand-light to-white dark:from-brand-navy dark:via-[#1e1b4b] dark:to-brand-navy" />
      
      {/* 3D Elements */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-brand-light/30 dark:bg-brand-navy/30 backdrop-blur-sm">
            <div className="w-10 h-10 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin"></div>
          </div>
        }>
          <Scene />
        </Suspense>
      </div>
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        <h1 className={`font-display-lg text-4xl md:text-6xl lg:text-[80px] text-${color} mb-4 md:mb-6 tracking-tight drop-shadow-md leading-tight`}>
          {title}
        </h1>
        <p className="font-body-lg text-xl md:text-2xl text-on-surface-variant dark:text-slate-200 drop-shadow-sm font-medium">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
