import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useApi';
import TiltCard from './ui/TiltCard';

interface FeeTierType {
  id: string;
  tierName: string;
  grades: string;
  monthlyFee: number;
  annualFee: number;
  isPopular: boolean;
  borderColor: string;
  bgColor: string;
  features: string[];
}

export default function FeeStructure() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { data: feeData, loading, error } = useFetch<FeeTierType[]>('FeeTier');

  return (
    <section className="bg-brand-light dark:bg-brand-navy py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-label-caps text-xs md:text-sm tracking-widest uppercase font-bold mb-3 md:mb-4 text-brand-indigo bg-brand-indigo/10 px-4 md:px-6 py-1.5 md:py-2 rounded-full inline-block">
            Transparent Admissions
          </p>
          <h2 className="font-display-md text-4xl md:text-5xl lg:text-6xl font-black text-brand-navy dark:text-white mb-4 md:mb-6 tracking-tight drop-shadow-sm">
            Fee Structure
          </h2>
          <p className="max-w-2xl mx-auto text-brand-slate text-lg md:text-xl leading-relaxed font-medium">
            We believe in transparent pricing with no hidden charges. Choose to pay monthly or save with our annual payment plan.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12 md:mb-20">
          <div className="bg-white/90 dark:bg-brand-navy/90 glass-dark p-2 rounded-full border-4 border-white/50 dark:border-white/10 inline-flex shadow-lg relative">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-bold transition-colors ${!isAnnual ? 'text-white' : 'text-brand-slate hover:text-brand-navy dark:text-white'}`}
            >
              Pay Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-bold transition-colors flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-brand-slate hover:text-brand-navy dark:text-white'}`}
            >
              Pay Annually
              <span className={`text-[10px] uppercase font-label-caps tracking-widest px-3 py-1 rounded-full ${isAnnual ? 'bg-white/20 text-white' : 'bg-brand-coral/10 text-brand-coral'}`}>
                Save 5%
              </span>
            </button>
            
            {/* Toggle background slider */}
            <motion.div
              className="absolute top-2 bottom-2 w-[calc(50%-8px)] bg-brand-navy rounded-full z-0 shadow-md"
              initial={false}
              animate={{
                left: isAnnual ? 'calc(50% + 4px)' : '8px',
                width: isAnnual ? 'calc(50% - 12px)' : 'calc(50% - 4px)'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
        </div>

        {/* Pricing Cards */}
        {loading ? (
          <div className="text-center py-12 text-brand-slate">Loading fees...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Failed to load fees.</div>
        ) : feeData?.length === 0 ? (
          <div className="text-center py-12 text-brand-slate">No fees available.</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {feeData?.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={plan.isPopular ? 'lg:scale-105 z-10' : ''}
              >
                <TiltCard maxRotation={4} scale={1.02}>
                  <div className={`h-full relative premium-glass premium-shadow rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 transition-all duration-300 ${
                    plan.isPopular 
                      ? 'border-4 md:border-8 border-brand-indigo/50' 
                      : 'border-4 md:border-8 border-white/50 dark:border-white/10'
                  }`}>
                    {plan.isPopular && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                        <div className="bg-gradient-to-r from-brand-indigo to-brand-violet text-white text-[10px] md:text-xs font-black uppercase font-label-caps tracking-widest px-6 py-2 rounded-full shadow-lg border-2 border-white/30">
                          Most Popular
                        </div>
                      </div>
                    )}
                    
                    {/* Background blob */}
                    <div className={`absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${plan.bgColor.replace('bg-', '')}`} />

                    <div className="text-center mb-8 border-b-2 border-slate-100 dark:border-white/10 pb-8 relative z-10">
                      <h3 className="font-display-sm text-2xl md:text-3xl font-black text-brand-navy dark:text-white mb-2">{plan.tierName}</h3>
                      <p className="text-brand-slate text-sm font-bold uppercase font-label-caps tracking-widest mb-6">{plan.grades}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-black text-brand-navy dark:text-white">₹</span>
                        <span className="text-5xl md:text-6xl font-black text-brand-navy dark:text-white tracking-tight drop-shadow-sm font-display-md">
                          {isAnnual ? plan.annualFee.toLocaleString() : plan.monthlyFee.toLocaleString()}
                        </span>
                        <span className="text-brand-slate font-bold">
                          /{isAnnual ? 'yr' : 'mo'}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-10 relative z-10">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full ${plan.bgColor} text-white flex items-center justify-center shadow-inner`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-brand-navy dark:text-slate-300 text-sm md:text-[15px] font-bold leading-tight">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/admissions"
                      className={`block w-full py-4 md:py-5 rounded-full text-center font-bold text-lg transition-all duration-300 relative z-20 border-2 ${
                        plan.isPopular
                          ? 'bg-brand-indigo text-white shadow-xl hover:bg-brand-navy border-white/20'
                          : 'bg-white dark:bg-brand-navy/50 text-brand-navy dark:text-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      Start Enrollment
                    </Link>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 flex items-start gap-4 justify-center max-w-3xl mx-auto bg-amber-50/80 dark:bg-amber-900/10 p-6 rounded-[2rem] border-4 border-amber-200/50 text-amber-800 dark:text-amber-200 glass shadow-lg">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-700/50">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-sm md:text-base font-medium leading-relaxed">
            <strong className="font-bold">Note:</strong> A one-time admission fee of ₹10,000 applies to all new enrolments. Books and uniforms are billed separately at the start of the academic year. Transport fees depend on the route distance.
          </p>
        </div>

      </div>
    </section>
  );
}
