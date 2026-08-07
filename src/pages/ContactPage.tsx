import React, { useState } from 'react';
import FAQ from '../components/FAQ';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import WaveDivider from '../components/WaveDivider';
import PageHero3D from '../components/PageHero3D';
import TiltCard from '../components/ui/TiltCard';
import { useSeo } from '../hooks/useSeo';
import { submitPost } from '../hooks/useApi';

export default function ContactPage() {
  useSeo({
    title: 'Contact Us | WonderKids School',
    description: "Have questions about WonderKids School? Reach out anytime — we're here to help and typically respond within 24 hours.",
    path: '/contact',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    
    setErrors({});
    setApiError(null);
    setSubmitting(true);
    
    try {
      await submitPost('ContactSubmission', form);
      setSubmitted(true);
    } catch (err: any) {
      setApiError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper className="pt-20 md:pt-24 pb-16 md:pb-20">
      
      <PageHero3D 
        title={<>Say <span className="text-gradient">Hello!</span></>}
        description="Have questions? We're here to help. Reach out to us anytime and we'll get back to you within 24 hours."
        color="secondary"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32 mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
        
        {/* Floating background elements for the contact section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-brand-light via-brand-sky/10 to-brand-coral/5 blur-[100px] -z-10 rounded-full pointer-events-none" />
        
        {/* Contact Info - Glassmorphic TiltCard */}
        <TiltCard maxRotation={2} scale={1.01} className="h-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-gradient-to-br from-brand-navy to-secondary text-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] relative overflow-hidden flex flex-col gap-8 md:gap-10 h-full border-4 md:border-[6px] border-white/20"
          >
            {/* Background Ornaments */}
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary/40 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-tertiary/30 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold relative z-10 drop-shadow-sm">Get in Touch</h2>
            <p className="text-white/80 font-medium text-lg relative z-10 -mt-4">We would love to hear from you. Drop us a line!</p>
            
            <div className="space-y-6 md:space-y-8 relative z-10 flex-grow mt-2">
              {[
                { icon: <MapPin className="w-7 h-7 md:w-8 md:h-8" />, text: '123 Magic Lane, Kidsville, CA 90210' },
                { icon: <Phone className="w-7 h-7 md:w-8 md:h-8" />, text: '(555) 123-4567', href: 'tel:+15551234567' },
                { icon: <Mail className="w-7 h-7 md:w-8 md:h-8" />, text: 'hello@wonderkids.com', href: 'mailto:hello@wonderkids.com' },
              ].map(({ icon, text, href }, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={text} 
                  className="flex items-center gap-5 md:gap-6 group"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] group-hover:scale-110 group-hover:bg-white/20 group-hover:rotate-3 transition-all duration-300">
                    <div className="text-white drop-shadow-sm">{icon}</div>
                  </div>
                  {href ? (
                    <a href={href} className="text-lg md:text-xl font-bold font-body hover:text-tertiary transition-colors drop-shadow-sm break-all">{text}</a>
                  ) : (
                    <p className="text-lg md:text-xl font-bold font-body drop-shadow-sm">{text}</p>
                  )}
                </motion.div>
              ))}
            </div>


          </motion.div>
        </TiltCard>

        {/* Contact Form - Clean, bouncy, bubbly UI */}
        <TiltCard maxRotation={1} className="h-full">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white dark:bg-brand-navy/95 p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-sm border border-slate-100 dark:border-white/10 h-full relative"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-center h-full gap-4 md:gap-6 py-12"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  className="w-20 md:w-28 h-20 md:h-28 bg-gradient-to-tr from-brand-indigo to-brand-violet border-4 border-white shadow-md rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center"
                >
                  <CheckCircle className="w-10 md:w-16 h-10 md:h-16 text-white" />
                </motion.div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-brand-navy dark:text-white mt-4">Message Sent</h3>
                <p className="text-lg md:text-xl text-brand-slate max-w-sm font-medium">We'll get back to you within 24 hours. We look forward to connecting with you.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                  className="mt-4 md:mt-6 px-6 md:px-8 py-3 md:py-4 text-brand-indigo font-bold text-base md:text-lg rounded-xl bg-brand-indigo/10 hover:bg-brand-indigo/20 transition-colors shadow-sm"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy dark:text-white mb-8 md:mb-10 flex items-center gap-3">
                  Send a Message
                </h2>
                <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit} noValidate>
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="contact-name" className="block font-label-caps text-xs md:text-sm text-brand-slate font-bold uppercase tracking-wider ml-2">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-5 md:px-6 py-4 md:py-5 rounded-2xl md:rounded-3xl border-2 text-base md:text-lg outline-none transition-all duration-300 shadow-sm ${errors.name ? 'border-rose-400 bg-rose-50 focus:ring-4 focus:ring-rose-200' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md focus:border-primary focus:shadow-md focus:ring-4 focus:ring-primary/20'}`}
                      placeholder="Jane Doe"
                      type="text"
                    />
                    {errors.name && <p className="text-rose-500 text-xs md:text-sm font-bold mt-2 ml-2">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="contact-email" className="block font-label-caps text-xs md:text-sm text-brand-slate font-bold uppercase tracking-wider ml-2">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className={`w-full px-5 md:px-6 py-4 md:py-5 rounded-2xl md:rounded-3xl border-2 text-base md:text-lg outline-none transition-all duration-300 shadow-sm ${errors.email ? 'border-rose-400 bg-rose-50 focus:ring-4 focus:ring-rose-200' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-secondary/50 hover:shadow-md focus:border-secondary focus:shadow-md focus:ring-4 focus:ring-secondary/20'}`}
                      placeholder="hello@example.com"
                      type="email"
                    />
                    {errors.email && <p className="text-rose-500 text-xs md:text-sm font-bold mt-2 ml-2">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="contact-message" className="block font-label-caps text-xs md:text-sm text-brand-slate font-bold uppercase tracking-wider ml-2">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className={`w-full px-5 md:px-6 py-4 md:py-5 rounded-2xl md:rounded-3xl border-2 text-base md:text-lg outline-none transition-all duration-300 h-32 md:h-40 resize-none shadow-sm ${errors.message ? 'border-rose-400 bg-rose-50 focus:ring-4 focus:ring-rose-200' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-tertiary/50 hover:shadow-md focus:border-tertiary focus:shadow-md focus:ring-4 focus:ring-tertiary/20'}`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-rose-500 text-xs md:text-sm font-bold mt-2 ml-2">{errors.message}</p>}
                  </div>

                  <motion.button 
                    whileHover={{ scale: submitting ? 1 : 1.02, translateY: -2 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className={`px-6 md:px-10 py-4 md:py-5 text-white font-display text-xl md:text-2xl font-bold rounded-2xl w-full flex items-center justify-center gap-4 transition-all duration-300 shadow-md hover:shadow-lg mt-4 ${submitting ? 'bg-brand-indigo/70 cursor-not-allowed' : 'bg-brand-indigo hover:bg-brand-violet'}`}
                  >
                    {submitting ? (
                      <>Sending Magic... <Loader2 className="w-6 h-6 animate-spin" /></>
                    ) : (
                      <>Send Message <Send className="w-6 h-6" /></>
                    )}
                  </motion.button>
                  {apiError && <p className="text-rose-500 text-center font-bold mt-4">{apiError}</p>}
                </form>
              </>
            )}
          </motion.div>
        </TiltCard>
      </div>

      <WaveDivider color="#F7FAFC" flip />
      <FAQ />
    </PageWrapper>
  );
}
