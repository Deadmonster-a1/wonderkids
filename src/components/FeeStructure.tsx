import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useApi';

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
  const { data: feeData, loading, error } = useFetch<FeeTierType[]>('/fees');

  return (
    <section className="bg-brand-light dark:bg-brand-navy py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase font-bold mb-3 text-brand-indigo">
            Transparent Admissions
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy dark:text-white mb-6 tracking-tight">
            Fee Structure
          </h2>
          <p className="max-w-2xl mx-auto text-brand-slate text-lg leading-relaxed">
            We believe in transparent pricing with no hidden charges. Choose to pay monthly or save with our annual payment plan.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-white dark:bg-brand-navy p-1.5 rounded-full border border-slate-200 inline-flex shadow-sm relative">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${!isAnnual ? 'text-white' : 'text-brand-slate hover:text-brand-navy dark:text-white'}`}
            >
              Pay Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-brand-slate hover:text-brand-navy dark:text-white'}`}
            >
              Pay Annually
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${isAnnual ? 'bg-white dark:bg-brand-navy/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                Save 5%
              </span>
            </button>
            
            {/* Toggle background slider */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-brand-navy rounded-full z-0"
              initial={false}
              animate={{
                left: isAnnual ? 'calc(50% + 3px)' : '6px',
                width: isAnnual ? 'calc(50% - 9px)' : 'calc(50% - 3px)'
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
                className={`relative bg-white dark:bg-brand-navy rounded-3xl p-8 transition-all duration-300 ${
                  plan.isPopular 
                    ? 'border-2 border-brand-indigo shadow-[0_30px_60px_rgba(67,56,202,0.15)] lg:scale-105 z-10' 
                    : 'border border-slate-200 shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-brand-indigo text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8 border-b border-slate-100 dark:border-white/10 pb-8">
                  <h3 className="text-2xl font-black text-brand-navy dark:text-white mb-2">{plan.tierName}</h3>
                  <p className="text-brand-slate text-sm font-medium mb-6">{plan.grades}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-brand-navy dark:text-white">₹</span>
                    <span className="text-5xl font-black text-brand-navy dark:text-white tracking-tight">
                      {isAnnual ? plan.annualFee.toLocaleString() : plan.monthlyFee.toLocaleString()}
                    </span>
                    <span className="text-brand-slate font-medium">
                      /{isAnnual ? 'yr' : 'mo'}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full ${plan.bgColor} text-white flex items-center justify-center`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-brand-slate text-sm font-medium leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/admissions"
                  className={`block w-full py-4 rounded-xl text-center font-bold transition-all duration-300 ${
                    plan.isPopular
                      ? 'bg-brand-indigo text-white shadow-lg hover:bg-brand-navy'
                      : 'bg-brand-light dark:bg-brand-navy text-brand-navy dark:text-white hover:bg-slate-200'
                  }`}
                >
                  Start Enrollment
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 flex items-start gap-3 justify-center max-w-2xl mx-auto bg-amber-50 p-4 rounded-2xl border border-amber-200 text-amber-800">
          <Info className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
          <p className="text-sm font-medium leading-relaxed">
            <strong className="font-bold">Note:</strong> A one-time admission fee of ₹10,000 applies to all new enrolments. Books and uniforms are billed separately at the start of the academic year. Transport fees depend on the route distance.
          </p>
        </div>

      </div>
    </section>
  );
}
