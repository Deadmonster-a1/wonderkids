import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowUp, Phone } from 'lucide-react';

export default function FloatingElements() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Scroll to Top (desktop mainly, but works everywhere) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-white dark:bg-brand-navy text-[#2D3748] rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 dark:bg-white/5 transition-colors border border-slate-100 dark:border-white/10 pointer-events-auto group hidden md:flex"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Pulse Button */}
      <div className="relative pointer-events-auto">
        <div className="pulse-ring" aria-hidden="true" />
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 z-10"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>

      {/* Mobile Sticky CTA Bar (only visible on small screens when scrolled) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-brand-navy/90 backdrop-blur-md border-t border-slate-200 md:hidden flex gap-3 pointer-events-auto shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-[60]"
          >
            <a
              href="tel:+919876543210"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 text-[#45B7D1] text-[15px] font-semibold"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              <Phone className="w-4 h-4" /> Call
            </a>
            <a
              href="/admissions"
              className="flex-[1.5] flex items-center justify-center py-3 rounded-full text-white text-[15px] font-semibold"
              style={{ background: '#FF6B6B', fontFamily: '"Inter", sans-serif' }}
            >
              Enroll Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
