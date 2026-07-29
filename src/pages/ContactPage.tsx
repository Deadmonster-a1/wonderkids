import React, { useState } from 'react';
import FAQ from '../components/FAQ';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import WaveDivider from '../components/WaveDivider';
import PageHero3D from '../components/PageHero3D';
import TiltCard from '../components/ui/TiltCard';
import { useSeo } from '../hooks/useSeo';

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await res.json().catch(() => null);
      
      if (!res.ok) {
        let errorMessage = data?.message || data?.error || 'Failed to send message';
        if (data?.details && Array.isArray(data.details)) {
          errorMessage += ': ' + data.details.map((d: any) => d.message).join(', ');
        }
        throw new Error(errorMessage);
      }
      
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
        
        {/* Contact Info - Glassmorphic TiltCard */}
        <TiltCard maxRotation={4} scale={1.02} className="h-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-secondary/95 glass-dark rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col gap-8 md:gap-10 h-full border-4 md:border-8 border-white/30"
          >
            <div className="absolute top-0 right-0 w-64 md:w-80 h-64 md:h-80 bg-white/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
            
            <h2 className="font-display-md text-4xl md:text-5xl font-bold relative z-10 drop-shadow-sm">Get in Touch</h2>
            
            <div className="space-y-6 md:space-y-8 relative z-10 flex-grow mt-2 md:mt-4">
              {[
                { icon: <MapPin className="w-8 h-8" />, text: '123 Magic Lane, Kidsville, CA 90210' },
                { icon: <Phone className="w-8 h-8" />, text: '(555) 123-4567', href: 'tel:+15551234567' },
                { icon: <Mail className="w-8 h-8" />, text: 'hello@wonderkids.com', href: 'mailto:hello@wonderkids.com' },
              ].map(({ icon, text, href }, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={text} 
                  className="flex items-center gap-4 md:gap-6 group"
                >
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-white/20 backdrop-blur-md rounded-[1rem] md:rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    <div className="scale-75 md:scale-100">{icon}</div>
                  </div>
                  {href ? (
                    <a href={href} className="text-lg md:text-xl font-bold font-body hover:underline hover:text-white/80 transition-colors drop-shadow-sm break-all">{text}</a>
                  ) : (
                    <p className="text-lg md:text-xl font-bold font-body drop-shadow-sm">{text}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Fun placeholder map card */}
            <div className="relative z-10 bg-white/20 backdrop-blur-md border-2 md:border-4 border-white/30 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden h-36 md:h-48 flex items-center justify-center shadow-inner hover:bg-white/30 transition-colors cursor-pointer group">
              <div className="absolute inset-0 bg-secondary/10 pattern-dots" />
              <div className="text-center relative z-10">
                <MapPin className="w-8 md:w-12 h-8 md:h-12 mx-auto mb-2 md:mb-3 opacity-80 group-hover:scale-110 transition-transform drop-shadow-md" />
                <p className="text-white text-sm md:text-base font-bold tracking-wide uppercase font-label-caps">123 Magic Lane</p>
                <span className="text-xs md:text-sm text-white/80 font-bold mt-2 inline-block bg-white/20 px-4 py-1.5 rounded-full">
                  View Map →
                </span>
              </div>
            </div>
          </motion.div>
        </TiltCard>

        {/* Contact Form - Clean, bouncy, bubbly UI */}
        <TiltCard maxRotation={2} className="h-full">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white/90 dark:bg-brand-navy/90 glass-dark p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border-4 md:border-8 border-white dark:border-white/10 h-full relative"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="flex flex-col items-center justify-center text-center h-full gap-4 md:gap-6 py-12"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-20 md:w-28 h-20 md:h-28 bg-primary border-4 border-white shadow-xl rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center"
                >
                  <CheckCircle className="w-10 md:w-16 h-10 md:h-16 text-white" />
                </motion.div>
                <h3 className="font-display-sm text-3xl md:text-4xl font-bold text-brand-navy dark:text-white mt-4">Message Sent! 🎉</h3>
                <p className="text-lg md:text-xl text-brand-slate max-w-sm font-medium">We'll get back to you within 24 hours. Can't wait to chat!</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                  className="mt-4 md:mt-6 px-6 md:px-8 py-3 md:py-4 text-primary font-bold text-base md:text-lg rounded-full bg-primary/10 hover:bg-primary/20 transition-colors shadow-sm"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <>
                <h2 className="font-display-sm text-3xl md:text-4xl font-bold text-brand-navy dark:text-white mb-8 md:mb-10">Send a Message</h2>
                <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit} noValidate>
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="contact-name" className="block font-label-caps text-xs md:text-sm text-brand-slate font-bold uppercase tracking-wider ml-4">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-5 md:px-6 py-4 md:py-5 rounded-full border-4 shadow-inner text-base md:text-lg transition-all duration-300 ${errors.name ? 'border-rose-300 bg-rose-50 focus:border-rose-400' : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-primary/20 focus:border-primary focus:bg-white'}`}
                      placeholder="Your full name"
                      type="text"
                    />
                    {errors.name && <p className="text-rose-500 text-xs md:text-sm font-bold mt-2 ml-4">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="contact-email" className="block font-label-caps text-xs md:text-sm text-brand-slate font-bold uppercase tracking-wider ml-4">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className={`w-full px-5 md:px-6 py-4 md:py-5 rounded-full border-4 shadow-inner text-base md:text-lg transition-all duration-300 ${errors.email ? 'border-rose-300 bg-rose-50 focus:border-rose-400' : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-secondary/20 focus:border-secondary focus:bg-white'}`}
                      placeholder="hello@example.com"
                      type="email"
                    />
                    {errors.email && <p className="text-rose-500 text-xs md:text-sm font-bold mt-2 ml-4">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="contact-message" className="block font-label-caps text-xs md:text-sm text-brand-slate font-bold uppercase tracking-wider ml-4">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className={`w-full px-5 md:px-6 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] border-4 shadow-inner text-base md:text-lg transition-all duration-300 h-32 md:h-40 resize-none ${errors.message ? 'border-rose-300 bg-rose-50 focus:border-rose-400' : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-tertiary/20 focus:border-tertiary focus:bg-white'}`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-rose-500 text-xs md:text-sm font-bold mt-2 ml-4">{errors.message}</p>}
                  </div>

                  <motion.button 
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className={`px-6 md:px-10 py-4 md:py-5 text-white font-display-sm text-xl md:text-2xl font-bold rounded-full w-full shadow-xl flex items-center justify-center gap-4 transition-all duration-300 border-4 border-white/20 mt-2 md:mt-4 ${submitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary'}`}
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
