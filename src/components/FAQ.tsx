import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, MessageCircleQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useApi';
import TiltCard from './ui/TiltCard';

interface FAQItemType {
  question: string;
  answer: string;
}

function FAQItem({ faq, isOpen, onClick }: { faq: FAQItemType, isOpen: boolean, onClick: () => void }) {
  return (
    <div className={`mb-4 md:mb-6 rounded-[1.5rem] md:rounded-[2rem] border-4 transition-all duration-300 overflow-hidden ${isOpen ? 'bg-white/90 dark:bg-white/5 border-brand-indigo shadow-xl' : 'bg-white/50 dark:bg-transparent dark:glass-dark border-white/50 dark:border-white/10 hover:border-brand-indigo/50 hover:bg-white/80 dark:hover:bg-white/10'}`}>
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full p-6 md:p-8 text-left"
      >
        <h3 className={`text-lg md:text-xl font-bold font-display-sm transition-colors duration-300 ${isOpen ? 'text-brand-indigo drop-shadow-sm' : 'text-brand-navy dark:text-white'}`}>
          {faq.question}
        </h3>
        <div className={`shrink-0 ml-4 w-10 md:w-12 h-10 md:h-12 rounded-[1rem] flex items-center justify-center transition-all duration-300 shadow-inner border-2 ${isOpen ? 'bg-brand-indigo text-white border-white/20 rotate-180 scale-110' : 'bg-brand-light dark:bg-white/5 text-brand-slate border-transparent'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 md:p-8 pt-0 md:pt-0 text-brand-slate text-sm md:text-base leading-relaxed font-medium">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data: faqs, loading, error } = useFetch<FAQItemType[]>('/faqs');

  return (
    <section className="bg-white dark:bg-brand-navy py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="w-20 md:w-24 h-20 md:h-24 rounded-[1.5rem] md:rounded-[2rem] bg-white dark:bg-white/5 flex items-center justify-center mx-auto mb-6 md:mb-8 text-brand-indigo border-4 border-brand-indigo/20 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <MessageCircleQuestion className="w-10 md:w-12 h-10 md:h-12" />
          </div>
          <p className="font-label-caps text-xs md:text-sm tracking-widest uppercase font-bold mb-3 md:mb-4 text-brand-indigo bg-brand-indigo/10 px-4 md:px-6 py-1.5 md:py-2 rounded-full inline-block">
            Got Questions?
          </p>
          <h2 className="font-display-md text-4xl md:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white mb-4 md:mb-6 tracking-tight drop-shadow-sm">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto text-brand-slate text-lg md:text-xl leading-relaxed font-medium">
            Find quick answers to common queries about admissions, facilities, and academic life at WonderKids.
          </p>
        </div>

        {/* FAQ Accordion */}
        <TiltCard maxRotation={2} scale={1.01}>
          <div className="bg-transparent mb-12 md:mb-20 relative z-10">
            {loading ? (
              <div className="p-12 text-center text-brand-slate">Loading FAQs...</div>
            ) : error ? (
              <div className="p-12 text-center text-red-500">Failed to load FAQs.</div>
            ) : faqs?.length === 0 ? (
              <div className="p-12 text-center text-brand-slate">No FAQs available at the moment.</div>
            ) : (
              faqs?.map((faq, index) => (
                <FAQItem 
                  key={index} 
                  faq={faq} 
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))
            )}
          </div>
        </TiltCard>

        {/* Contact CTA */}
        <div className="text-center bg-gradient-to-br from-brand-indigo to-brand-violet rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border-4 md:border-8 border-white/20 flex flex-col items-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <h3 className="font-display-sm text-2xl md:text-3xl font-black text-white mb-2 drop-shadow-sm">Still have questions?</h3>
          <p className="text-brand-indigo-100 font-medium mb-6 md:mb-8 text-sm md:text-base">Our admissions team is here to help you.</p>
          <Link
            to="/contact"
            className="px-8 md:px-12 py-4 md:py-5 rounded-full bg-white text-brand-indigo font-bold text-lg md:text-xl hover:bg-brand-light transition-all duration-300 shadow-xl hover:-translate-y-1 hover:scale-105 border-4 border-transparent hover:border-white/50"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  );
}
