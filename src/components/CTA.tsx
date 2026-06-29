import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo via-brand-navy to-brand-violet z-0" />
      
      {/* Decorative Blur Orbs */}
      <motion.div 
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-sky/30 rounded-full blur-[100px] mix-blend-screen pointer-events-none z-0"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-brand-coral/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none z-0"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] z-0" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-brand-navy/10 border border-white/20 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-brand-sky" />
            <span className="text-sm font-bold text-white uppercase tracking-widest">Admissions Open 2025-26</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight leading-[1.1]">
            Ready to shape your child's future?
          </h2>
          
          <p className="text-xl text-brand-light/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the WonderKids family and give your child the foundation they need to thrive in academics, sports, and life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/admissions"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-brand-navy text-brand-indigo rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-brand-sky hover:text-brand-navy dark:text-white hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:-translate-y-1 transition-all duration-300"
            >
              Start Application <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-full font-bold text-lg flex items-center justify-center hover:bg-white dark:bg-brand-navy/10 transition-all duration-300"
            >
              Schedule Campus Tour
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
