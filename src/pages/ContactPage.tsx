import React, { useState } from 'react';
import FAQ from '../components/FAQ';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import WaveDivider from '../components/WaveDivider';

export default function ContactPage() {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      setSubmitted(true);
    } catch (err) {
      setApiError('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper className="pt-32 md:pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="font-display-lg text-5xl md:text-7xl text-primary mb-6"
        >
          Contact Us
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          className="font-body-lg text-xl text-on-surface-variant dark:text-slate-300 max-w-2xl"
        >
          Have questions? We're here to help. Reach out to us anytime and we'll get back to you within 24 hours.
        </motion.p>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-[3rem] p-12 text-white shadow-xl relative overflow-hidden flex flex-col gap-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white dark:bg-brand-navy/10 blob-shape -translate-y-1/4 translate-x-1/4"></div>
          <h2 className="text-4xl font-bold relative z-10">Get in Touch</h2>
          
          <div className="space-y-6 relative z-10 flex-grow">
            {[
              { icon: <MapPin className="w-6 h-6" />, text: '123 Magic Lane, Kidsville, CA 90210' },
              { icon: <Phone className="w-6 h-6" />, text: '(555) 123-4567', href: 'tel:+15551234567' },
              { icon: <Mail className="w-6 h-6" />, text: 'hello@wonderkids.com', href: 'mailto:hello@wonderkids.com' },
            ].map(({ icon, text, href }) => (
              <div key={text} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white dark:bg-brand-navy/20 rounded-full flex items-center justify-center shrink-0">
                  {icon}
                </div>
                {href ? (
                  <a href={href} className="text-lg hover:underline hover:text-white/80 transition-colors">{text}</a>
                ) : (
                  <p className="text-lg">{text}</p>
                )}
              </div>
            ))}
          </div>

          {/* Placeholder map card */}
          <div className="relative z-10 bg-white dark:bg-brand-navy/10 border-2 border-white/20 rounded-[1.5rem] overflow-hidden h-40 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-10 h-10 mx-auto mb-2 opacity-60" />
              <p className="text-white/80 text-sm font-semibold">123 Magic Lane, Kidsville</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/60 hover:text-white underline mt-1 inline-block"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-brand-navy p-12 rounded-[3rem] shadow-xl border-8 border-white"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="flex flex-col items-center justify-center text-center h-full gap-4 py-12"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-primary" />
              </motion.div>
              <h3 className="font-headline-sm text-2xl font-bold text-on-surface dark:text-white">Message Sent! 🎉</h3>
              <p className="text-on-surface-variant dark:text-slate-300 max-w-xs">We'll get back to you within 24 hours. Can't wait to chat!</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                className="mt-4 px-6 py-3 text-primary font-bold rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-sm"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-on-surface dark:text-white mb-8">Send a Message</h2>
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="contact-name" className="block font-label-caps text-sm text-on-surface-variant dark:text-slate-300 mb-2 font-bold">
                    Your Name <span className="text-error">*</span>
                  </label>
                  <input
                    id="contact-name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-5 py-3.5 rounded-2xl border-2 ${errors.name ? 'border-error' : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/20'} outline-none transition-all duration-200`}
                    placeholder="Your full name"
                    type="text"
                  />
                  {errors.name && <p className="text-error text-xs mt-1 ml-4">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-label-caps text-sm text-on-surface-variant dark:text-slate-300 mb-2 font-bold">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    id="contact-email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-5 py-3.5 rounded-2xl border-2 ${errors.email ? 'border-error' : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/20'} outline-none transition-all duration-200`}
                    placeholder="hello@example.com"
                    type="email"
                  />
                  {errors.email && <p className="text-error text-xs mt-1 ml-4">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="contact-message" className="block font-label-caps text-sm text-on-surface-variant dark:text-slate-300 mb-2 font-bold">
                    Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-5 py-3.5 rounded-2xl border-2 ${errors.message ? 'border-error' : 'border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/20'} outline-none transition-all duration-200 h-36 resize-none`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && <p className="text-error text-xs mt-1 ml-4">{errors.message}</p>}
                </div>
                <motion.button 
                  whileHover={{ scale: submitting ? 1 : 1.05 }}
                  whileTap={{ scale: submitting ? 1 : 0.95 }}
                  type="submit"
                  disabled={submitting}
                  className={`px-8 py-4 text-white font-bold rounded-full w-full shadow-lg flex items-center justify-center gap-3 text-lg transition-colors ${submitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary'}`}
                >
                  {submitting ? (
                    <>Sending... <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    <>Send Message <Send className="w-5 h-5" /></>
                  )}
                </motion.button>
                {apiError && <p className="text-error text-center font-bold mt-4">{apiError}</p>}
              </form>
            </>
          )}
        </motion.div>
      </div>

      <WaveDivider color="#F7FAFC" flip />
      <FAQ />
    </PageWrapper>
  );
}
