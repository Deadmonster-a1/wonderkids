import React from 'react';
import CTA from '../components/CTA';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';
import { MapPin, Calendar, FileText, CheckCircle } from 'lucide-react';
import FeeStructure from '../components/FeeStructure';
import WaveDivider from '../components/WaveDivider';

const steps = [
  {
    icon: <MapPin className="w-8 h-8" />,
    step: '01',
    title: 'Schedule a Campus Tour',
    desc: 'Visit our campus and experience WonderKids firsthand. Meet our faculty, see our labs, classrooms, sports facilities, and learning spaces.',
    color: 'bg-primary text-white',
    bgLight: 'bg-primary/10',
    textColor: 'text-primary',
  },
  {
    icon: <FileText className="w-8 h-8" />,
    step: '02',
    title: 'Submit Application',
    desc: 'Complete our simple enrollment form online or in-person. We\'ll review your application and respond within 2 business days.',
    color: 'bg-secondary text-white',
    bgLight: 'bg-secondary/10',
    textColor: 'text-secondary',
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    step: '03',
    title: 'Welcome to WonderKids!',
    desc: 'Receive your confirmation, meet your child\'s class teacher, and join the WonderKids family. The journey begins!',
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
  return (
    <PageWrapper className="pt-32 md:pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="font-display-lg text-5xl md:text-7xl text-primary mb-6"
        >
          Admissions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          className="font-body-lg text-xl text-on-surface-variant dark:text-slate-300 max-w-2xl mb-16"
        >
          We welcome families from Nursery to Grade 10. Joining WonderKids is simple — just three steps, and we're with you every moment of the journey.
        </motion.p>

        {/* 3-Step Process */}
        <div className="relative mb-16">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-primary via-secondary to-tertiary opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 150, damping: 20, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`w-32 h-32 ${s.color} rounded-[2rem] flex items-center justify-center shadow-lg mb-6 relative`}
                >
                  {s.icon}
                  <span className={`absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-brand-navy ${s.textColor} rounded-full flex items-center justify-center text-sm font-black border-2 border-current shadow-md`}>
                    {s.step}
                  </span>
                </motion.div>
                <h3 className="font-headline-sm text-xl font-bold text-on-surface dark:text-white mb-3">{s.title}</h3>
                <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grade-wise Age & Cutoff Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold text-on-surface dark:text-white mb-6" >
            Grade-wise Eligibility
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-br from-brand-navy to-brand-indigo">
                  <th className="text-white text-left px-6 py-4 font-semibold" >Section</th>
                  <th className="text-white text-left px-6 py-4 font-semibold" >Age Group</th>
                  <th className="text-white text-left px-6 py-4 font-semibold" >Admission Status</th>
                </tr>
              </thead>
              <tbody>
                {gradeCutoffs.map((row, i) => (
                  <tr
                    key={row.grade}
                    className={`border-t border-slate-100 dark:border-white/10 ${i % 2 === 0 ? 'bg-slate-50 dark:bg-white/5' : 'bg-white dark:bg-brand-navy'}`}
                  >
                    <td className="px-6 py-4 font-semibold text-brand-navy dark:text-white" >{row.grade}</td>
                    <td className="px-6 py-4 text-on-surface-variant dark:text-slate-300" >{row.ageRange}</td>
                    <td className="px-6 py-4" >
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        ✅ {row.deadline}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Info callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container-low border-4 border-dashed border-primary-fixed-dim rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-6 mb-16"
        >
          <div className="w-16 h-16 bg-primary rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-md">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-on-surface dark:text-white text-xl mb-1">Enrollment Open Year-Round</h4>
            <p className="text-on-surface-variant dark:text-slate-300">We accept applications on a rolling basis for most grades. Spots fill quickly — especially for Grade 1 and Grade 6 — so we recommend applying at least 4–6 weeks before your intended start date.</p>
          </div>
        </motion.div>

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
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    gradeApplying: '',
    message: ''
  });
  
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admissions/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit inquiry');
      setSubmitted(true);
      setForm({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        gradeApplying: '',
        message: ''
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-500 rounded-3xl p-12 text-center max-w-3xl mx-auto">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">Application Received!</h3>
        <p className="text-emerald-800 dark:text-emerald-200 mb-6">
          Thank you for considering WonderKids. Our admissions team will review your details and contact you within 2 business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-brand-navy rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-tertiary" />
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-4">Inquire Now</h2>
        <p className="text-brand-slate">Fill out the form below and we'll get back to you shortly.</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-semibold border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Student's Name *</label>
            <input 
              type="text" 
              required
              value={form.studentName}
              onChange={e => setForm({...form, studentName: e.target.value})}
              className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="Child's full name"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Parent/Guardian Name *</label>
            <input 
              type="text" 
              required
              value={form.parentName}
              onChange={e => setForm({...form, parentName: e.target.value})}
              className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Email Address *</label>
            <input 
              type="email" 
              required
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Phone Number *</label>
            <input 
              type="tel" 
              required
              value={form.phone}
              onChange={e => setForm({...form, phone: e.target.value})}
              className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="Your contact number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Grade Applying For *</label>
          <select 
            required
            value={form.gradeApplying}
            onChange={e => setForm({...form, gradeApplying: e.target.value})}
            className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo focus:border-transparent outline-none transition-all dark:text-white"
          >
            <option value="" disabled>Select a grade</option>
            <option value="Nursery">Nursery</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Additional Message (Optional)</label>
          <textarea 
            rows={4}
            value={form.message}
            onChange={e => setForm({...form, message: e.target.value})}
            className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-brand-navy border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-indigo focus:border-transparent outline-none transition-all dark:text-white resize-none"
            placeholder="Any specific questions or requirements?"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-brand-indigo text-white font-bold py-4 rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-brand-indigo/30 hover:shadow-brand-indigo/50 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}
