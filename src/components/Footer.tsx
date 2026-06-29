import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useApi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: settings } = useFetch<Record<string, string>>('/settings');

  const schoolName = settings?.schoolName || 'WonderKids School';
  const contactEmail = settings?.contactEmail || 'admissions@wonderkids.edu.in';
  const contactPhone = settings?.contactPhone || '+91 98765 43210';
  const address = settings?.address || '123 Education Boulevard, Knowledge Park Phase 1, New Delhi - 110001';

  return (
    <footer className="bg-brand-navy pt-20 pb-10 text-brand-slate">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <span className="text-3xl transition-transform group-hover:scale-110 group-hover:rotate-[-5deg]">🎓</span>
              <span className="text-2xl font-black tracking-tight text-white">
                {schoolName.split(' ')[0]}<span className="text-brand-indigo">{schoolName.split(' ').slice(1).join(' ')}</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-8">
              A premium CBSE-affiliated institution dedicated to academic excellence, holistic development, and shaping the global leaders of tomorrow.
            </p>
            <div className="flex gap-4">
              {settings?.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-brand-navy/5 flex items-center justify-center text-white hover:bg-brand-indigo transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings?.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-brand-navy/5 flex items-center justify-center text-white hover:bg-brand-indigo transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings?.twitterUrl && (
                <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-brand-navy/5 flex items-center justify-center text-white hover:bg-brand-indigo transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings?.youtubeUrl && (
                <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-brand-navy/5 flex items-center justify-center text-white hover:bg-brand-indigo transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-brand-indigo transition-colors">About Us</Link></li>
              <li><Link to="/academics" className="hover:text-brand-indigo transition-colors">Academics</Link></li>
              <li><Link to="/programs" className="hover:text-brand-indigo transition-colors">Programs</Link></li>
              <li><Link to="/admissions" className="hover:text-brand-indigo transition-colors">Admissions</Link></li>
              <li><Link to="/teachers" className="hover:text-brand-indigo transition-colors">Our Faculty</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Information</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="hover:text-brand-indigo transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-brand-indigo transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-indigo transition-colors">Mandatory Disclosure</a></li>
              <li><a href="#" className="hover:text-brand-indigo transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-indigo transition-colors">Terms of Service</a></li>
              <li><Link to="/admin/login" className="hover:text-brand-indigo transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-indigo shrink-0 mt-0.5" />
                <span className="text-sm">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-indigo shrink-0" />
                <span className="text-sm">{contactPhone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-indigo shrink-0" />
                <span className="text-sm">{contactEmail}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-slate/60 text-center md:text-left">
            © {currentYear} {schoolName}. All rights reserved. CBSE Affiliation No: 1234567.
          </p>
          <div className="text-sm text-brand-slate/60">
            Designed with <span className="text-brand-coral">♥</span> for Education
          </div>
        </div>
      </div>
    </footer>
  );
}
