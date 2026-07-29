import React from 'react';
import CTA from '../components/CTA';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';
import { MapPin, Calendar, FileText, CheckCircle } from 'lucide-react';
import FeeStructure from '../components/FeeStructure';
import WaveDivider from '../components/WaveDivider';
import PageHero3D from '../components/PageHero3D';
import TiltCard from '../components/ui/TiltCard';
import { useSeo } from '../hooks/useSeo';

const steps = [
  {
    icon: <MapPin className="w-10 h-10" />,
    step: '01',
    title: 'Schedule a Tour',
    desc: 'Visit our campus and experience WonderKids firsthand. Meet our faculty and see our labs.',
    color: 'bg-primary text-white',
    bgLight: 'bg-primary/10',
    textColor: 'text-primary',
  },
  {
    icon: <FileText className="w-10 h-10" />,
    step: '02',
    title: 'Submit Application',
    desc: 'Complete our simple enrollment form online or in-person. We respond within 2 days.',
    color: 'bg-secondary text-white',
    bgLight: 'bg-secondary/10',
    textColor: 'text-secondary',
  },
  {
    icon: <CheckCircle className="w-10 h-10" />,
    step: '03',
    title: 'Welcome!',
    desc: 'Receive confirmation, meet your class teacher, and join the WonderKids family.',
    color: 'bg-tertiary text-white',
    bgLight: 'bg-tertiary/10',
    textColor: 'text-tertiary',
  },
];

const gradeCutoffs = [
  { grade: 'Nursery – UKG', ageRange: '3 – 6 years', deadline: 'Rolling basis' },
  { grade: 'Grade I – V', ageRange: '6 – 11 years', deadline: 'Rolling basis' },
  { grade: 'Grade VI – VIII', ageRange: '11 – 14 years', deadline: 'Rolling basis' },
  { grade: 'Grade IX – X', ageRange: '14 – 16 years', deadline: 'Subject to seat availability' },
];

export default function AdmissionsPage() {
  useSeo({
    title: 'Admissions 2025–26 | WonderKids School',
    description: "We welcome families from Nursery to Grade 10. Joining WonderKids is simple — just three easy steps, and we're with you every moment of the journey.",
    path: '/admissions',
  });

  return (
    <PageWrapper className="pt-20 md:pt-24 pb-16 md:pb-20">
      <PageHero3D 
        title={<>Join <span className="text-gradient">WonderKids</span></>}
        description="We welcome families from Nursery to Grade 10. Joining WonderKids is simple — just three easy steps, and we're with you every moment of the journey."
        color="primary"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 mt-8 md:mt-12">

        {/* 3-Step Process - Rebuilt with TiltCards */}
        <div className="relative mb-20 md:mb-32">
          {/* Playful curvy line behind the steps - Desktop only */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-4 bg-white dark:bg-white/10 rounded-full shadow-inner -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {steps.map((s, i) => (
              <TiltCard key={s.step} scale={1.05} maxRotation={15}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15, delay: i * 0.1 }}
                  className="bg-white/90 dark:bg-brand-navy/90 glass-dark flex flex-col items-center text-center p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl border-4 border-white dark:border-white/20 h-full relative"
                >
                  {/* Floating Number Badge */}
                  <div className={`absolute -top-4 md:-top-6 -right-4 md:-right-6 w-12 md:w-16 h-12 md:h-16 ${s.color} rounded-full flex items-center justify-center font-display-md text-xl md:text-2xl border-4 border-white shadow-lg rotate-12`}>
                    {s.step}
                  </div>

                  {/* Icon circle */}
                  <div className={`w-20 md:w-28 h-20 md:h-28 ${s.color} rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shadow-lg mb-6 md:mb-8 rotate-3 transform transition-transform hover:rotate-12`}>
                    {s.icon}
                  </div>
                  <h2 className="font-headline-md text-xl md:text-2xl font-bold text-on-surface dark:text-white mb-3 md:mb-4">{s.title}</h2>
                  <p className="font-body text-on-surface-variant dark:text-slate-300 leading-relaxed text-base md:text-lg">{s.desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Grade-wise Age & Cutoff List (Replacing boring table) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-display-md text-4xl md:text-5xl font-bold text-on-surface dark:text-white mb-4" >
              Grade Eligibility
            </h2>
            <p className="text-lg md:text-xl text-on-surface-variant dark:text-slate-300">Find the right fit for your child.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {gradeCutoffs.map((row, i) => (
              <motion.div
                key={row.grade}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 dark:bg-brand-navy/80 glass-dark p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between border-2 border-white dark:border-white/10 shadow-sm gap-4 sm:gap-0"
              >
                <div>
                  <h3 className="font-bold text-lg md:text-xl text-brand-navy dark:text-white mb-1">{row.grade}</h3>
                  <p className="text-brand-slate text-xs md:text-sm font-bold opacity-80">{row.ageRange}</p>
                </div>
                <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-sm border border-emerald-200 self-start sm:self-auto">
                  ✅ {row.deadline}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info callout */}
        <TiltCard maxRotation={2} scale={1.01} className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-secondary rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-2xl relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-white/10 pattern-dots" />
            
            <div className="w-20 md:w-24 h-20 md:h-24 bg-white/20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner backdrop-blur-sm relative z-10">
              <Calendar className="w-10 md:w-12 h-10 md:h-12 text-white" />
            </div>
            <div className="relative z-10 text-white text-center md:text-left">
              <h3 className="font-display-md text-3xl md:text-4xl font-bold mb-3">Enrollment Open Year-Round</h3>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
                We accept applications on a rolling basis. Spots fill quickly — especially for Grade 1 and Grade 6 — so we recommend applying at least 4–6 weeks early!
              </p>
            </div>
          </motion.div>
        </TiltCard>

        {/* Admission Form */}
        <AdmissionForm />

      </div>
      
      <WaveDivider color="var(--light)" flip />
      <FeeStructure />
      
      <WaveDivider color="var(--sky)" flip />
      <CTA />
    </PageWrapper>
  );
}

function AdmissionForm() {
  const [form, setForm] = React.useState({
    studentName: '', parentName: '', email: '', phone: '', gradeApplying: '', message: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admissions/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await res.json().catch(() => null);
      
      if (!res.ok) {
        let errorMessage = data?.message || data?.error || 'Failed to submit application';
        if (data?.details && Array.isArray(data.details)) {
          errorMessage += ': ' + data.details.map((d: any) => d.message).join(', ');
        }
        throw new Error(errorMessage);
      }
      
      setSubmitted(true);
    } catch (err: any) {
      alert(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <TiltCard>
        <div className="bg-emerald-400 border-8 border-white rounded-[4rem] p-16 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-28 h-28 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl"
          >
            <CheckCircle className="w-16 h-16 text-emerald-500" />
          </motion.div>
          <h3 className="font-display-md text-4xl font-bold text-white mb-6">Application Received!</h3>
          <p className="text-white/90 text-xl mb-10 max-w-lg mx-auto leading-relaxed">
            Thank you! Our admissions team will review your magical details and contact you within 2 business days.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-10 py-5 bg-white text-emerald-600 font-bold text-xl rounded-full hover:bg-emerald-50 transition-colors shadow-lg"
          >
            Submit Another
          </button>
        </div>
      </TiltCard>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white/90 dark:bg-brand-navy/90 glass-dark rounded-[2.5rem] md:rounded-[4rem] p-6 sm:p-10 md:p-16 shadow-2xl border-4 md:border-8 border-white dark:border-white/10 relative overflow-hidden">
      {/* Soft colorful blur behind the form */}
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-primary via-secondary to-tertiary" />
      
      <div className="text-center mb-8 md:mb-12 mt-4 md:mt-0">
        <h2 className="font-display-md text-4xl md:text-5xl font-bold text-brand-navy dark:text-white mb-2 md:mb-4">Start the Journey</h2>
        <p className="text-lg md:text-xl text-brand-slate">Fill out the quick form below and we'll get right back to you.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-2 md:space-y-3">
            <label htmlFor="admission-student-name" className="block text-xs md:text-sm font-label-caps font-bold text-brand-navy dark:text-white uppercase tracking-wider ml-4">Student's Name</label>
            <input id="admission-student-name" type="text" required value={form.studentName} onChange={e => setForm({...form, studentName: e.target.value})} className="w-full px-5 md:px-6 py-4 md:py-5 rounded-full bg-slate-50 dark:bg-brand-navy/50 border-4 border-transparent hover:border-primary/20 focus:border-primary focus:bg-white transition-all text-base md:text-lg shadow-inner" placeholder="Child's full name" />
          </div>
          <div className="space-y-2 md:space-y-3">
            <label htmlFor="admission-parent-name" className="block text-xs md:text-sm font-label-caps font-bold text-brand-navy dark:text-white uppercase tracking-wider ml-4">Parent/Guardian</label>
            <input id="admission-parent-name" type="text" required value={form.parentName} onChange={e => setForm({...form, parentName: e.target.value})} className="w-full px-5 md:px-6 py-4 md:py-5 rounded-full bg-slate-50 dark:bg-brand-navy/50 border-4 border-transparent hover:border-secondary/20 focus:border-secondary focus:bg-white transition-all text-base md:text-lg shadow-inner" placeholder="Your full name" />
          </div>
          <div className="space-y-2 md:space-y-3">
            <label htmlFor="admission-email" className="block text-xs md:text-sm font-label-caps font-bold text-brand-navy dark:text-white uppercase tracking-wider ml-4">Email Address</label>
            <input id="admission-email" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-5 md:px-6 py-4 md:py-5 rounded-full bg-slate-50 dark:bg-brand-navy/50 border-4 border-transparent hover:border-tertiary/20 focus:border-tertiary focus:bg-white transition-all text-base md:text-lg shadow-inner" placeholder="your@email.com" />
          </div>
          <div className="space-y-2 md:space-y-3">
            <label htmlFor="admission-phone" className="block text-xs md:text-sm font-label-caps font-bold text-brand-navy dark:text-white uppercase tracking-wider ml-4">Phone Number</label>
            <input id="admission-phone" type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-5 md:px-6 py-4 md:py-5 rounded-full bg-slate-50 dark:bg-brand-navy/50 border-4 border-transparent hover:border-primary/20 focus:border-primary focus:bg-white transition-all text-base md:text-lg shadow-inner" placeholder="Your contact number" />
          </div>
        </div>

        <div className="space-y-2 md:space-y-3">
          <label htmlFor="admission-grade" className="block text-xs md:text-sm font-label-caps font-bold text-brand-navy dark:text-white uppercase tracking-wider ml-4">Grade Applying For</label>
          <select id="admission-grade" required value={form.gradeApplying} onChange={e => setForm({...form, gradeApplying: e.target.value})} className="w-full px-5 md:px-6 py-4 md:py-5 rounded-full bg-slate-50 dark:bg-brand-navy/50 border-4 border-transparent hover:border-secondary/20 focus:border-secondary focus:bg-white transition-all text-base md:text-lg shadow-inner appearance-none cursor-pointer">
            <option value="" disabled>Select a grade</option>
            <option value="Nursery">Nursery</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 10">Grade 10</option>
          </select>
        </div>

        <div className="space-y-2 md:space-y-3">
          <label htmlFor="admission-message" className="block text-xs md:text-sm font-label-caps font-bold text-brand-navy dark:text-white uppercase tracking-wider ml-4">Message (Optional)</label>
          <textarea id="admission-message" rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-5 md:px-6 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 dark:bg-brand-navy/50 border-4 border-transparent hover:border-tertiary/20 focus:border-tertiary focus:bg-white transition-all text-base md:text-lg shadow-inner resize-none" placeholder="Any specific questions?" />
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-display-sm text-xl md:text-2xl font-bold py-5 md:py-6 rounded-full hover:opacity-90 transition-all shadow-xl disabled:opacity-50 mt-2 md:mt-4 border-4 border-white/20"
        >
          {loading ? 'Sending Magic...' : 'Submit Inquiry'}
        </motion.button>
      </form>
    </div>
  );
}
