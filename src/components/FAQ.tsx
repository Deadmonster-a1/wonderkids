import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, MessageCircleQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useApi';

interface FAQItemType {
  question: string;
  answer: string;
}

function FAQItem({ faq, isOpen, onClick }: { faq: FAQItemType, isOpen: boolean, onClick: () => void }) {
  return (
    <div className={`border-b border-slate-200 last:border-0 transition-colors duration-300 ${isOpen ? 'bg-slate-50 dark:bg-white/5' : 'hover:bg-slate-50 dark:bg-white/5/50'}`}>
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
      >
        <h3 className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-brand-indigo' : 'text-brand-navy dark:text-white'}`}>
          {faq.question}
        </h3>
        <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-brand-indigo text-white' : 'bg-brand-light dark:bg-brand-navy text-brand-slate'}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
            <div className="p-6 pt-0 text-brand-slate leading-relaxed">
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
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-brand-light dark:bg-brand-navy flex items-center justify-center mx-auto mb-6 text-brand-indigo">
            <MessageCircleQuestion className="w-8 h-8" />
          </div>
          <p className="text-sm tracking-widest uppercase font-bold mb-3 text-brand-indigo">
            Got Questions?
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy dark:text-white mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto text-brand-slate text-lg leading-relaxed">
            Find quick answers to common queries about admissions, facilities, and academic life at WonderKids.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white dark:bg-brand-navy rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">
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

        {/* Contact CTA */}
        <div className="text-center bg-brand-light dark:bg-brand-navy rounded-3xl p-8 border border-slate-100 dark:border-white/10 flex flex-col items-center">
          <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2">Still have questions?</h3>
          <p className="text-brand-slate mb-6">Our admissions team is here to help you.</p>
          <Link
            to="/contact"
            className="px-8 py-3 rounded-full bg-brand-navy text-white font-bold hover:bg-brand-indigo transition-all duration-300 shadow-md hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  );
}
