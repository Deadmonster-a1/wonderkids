import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, X, Calendar, AlertTriangle, CheckCircle, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Announcement {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  type: 'INFO' | 'EVENT' | 'ALERT' | 'SUCCESS';
}

export default function AnnouncementPopup() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data, error } = await supabase.from('Announcement').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          setAnnouncements(data);
          setIsVisible(true);
        }
      } catch (err) {
        console.error('Failed to fetch announcements:', err);
      }
    };
    fetchAnnouncements();
  }, []);

  if (!isVisible || announcements.length === 0) return null;

  const current = announcements[currentIndex];

  const getTheme = (type: string) => {
    switch (type) {
      case 'EVENT': return { color: 'text-brand-violet', icon: <Calendar className="w-6 h-6 shrink-0 text-brand-violet" /> };
      case 'ALERT': return { color: 'text-rose-400', icon: <AlertTriangle className="w-6 h-6 shrink-0 text-rose-400" /> };
      case 'SUCCESS': return { color: 'text-emerald-400', icon: <CheckCircle className="w-6 h-6 shrink-0 text-emerald-400" /> };
      default: return { color: 'text-brand-indigo', icon: <Info className="w-6 h-6 shrink-0 text-brand-indigo" /> };
    }
  };

  const theme = getTheme(current.type);

  const nextAnnouncement = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 pointer-events-none drop-shadow-2xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, x: 50, y: 50 }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, x: 50, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-auto min-w-[280px] max-w-[400px] bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            role="status"
          >
            {/* Glossy top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />
            
            {/* Close Button */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-1.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-all z-20 ring-1 ring-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Optional Image */}
            {current.imageUrl && (
              <div className="relative w-full h-48 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  width="400"
                  height="200"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            <div className={`p-6 pb-6 flex flex-col relative z-0 ${current.imageUrl ? '-mt-12 pt-0 z-20' : ''}`}>
              {!current.imageUrl && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/10 rounded-full ring-1 ring-white/20 shrink-0">
                    {theme.icon}
                  </div>
                  <p className="text-lg font-bold text-white line-clamp-2">
                    {current.title}
                  </p>
                </div>
              )}
              
              {current.imageUrl && (
                <p className="text-xl font-bold text-white mb-2 line-clamp-2 drop-shadow-md">
                  {current.title}
                </p>
              )}
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <p className="text-white/80 text-sm leading-relaxed max-h-48 overflow-y-auto custom-scrollbar font-medium">
                    {current.content}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination / Navigation if multiple */}
            {announcements.length > 1 && (
              <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between shrink-0">
                <button
                  onClick={prevAnnouncement}
                  className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Previous announcement"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex gap-1.5 items-center">
                  {announcements.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/20'}`} 
                    />
                  ))}
                </div>

                <button
                  onClick={nextAnnouncement}
                  className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Next announcement"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {/* If single announcement, just a simple CTA or branding bar at bottom */}
            {announcements.length === 1 && (
              <div className="h-1 w-full bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-teal shrink-0" />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
