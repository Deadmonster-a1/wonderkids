import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, BookOpen, Users, Info, GraduationCap, Phone, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'Home', path: '/', icon: <span className="text-lg">🏫</span> },
  { name: 'Academics', path: '/academics', icon: <BookOpen className="w-5 h-5" /> },
  { name: 'Programs', path: '/programs', icon: <GraduationCap className="w-5 h-5" /> },
  { name: 'About', path: '/about', icon: <Info className="w-5 h-5" /> },
  { name: 'Faculty', path: '/teachers', icon: <Users className="w-5 h-5" /> },
  { name: 'Contact', path: '/contact', icon: <Phone className="w-5 h-5" /> },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'pt-4 px-4 sm:px-6' : 'pt-6 px-4 sm:px-8'
        }`}
      >
        <div 
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            isScrolled 
              ? 'max-w-6xl glass dark:glass-dark rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)]' 
              : 'max-w-7xl bg-transparent px-2 py-2'
          }`}
        >
          {/* Logo Area */}
          <Link to="/" className="flex flex-col group">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl transition-transform group-hover:scale-110 group-hover:rotate-[-5deg]">🎓</span>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-brand-navy dark:text-white">
                Wonder<span className="text-brand-indigo">Kids</span>
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-brand-slate font-semibold ml-9 hidden sm:block">
              Nursery · Primary · Secondary
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-slate-900/50 px-2 py-1.5 rounded-full border border-white/60 dark:border-white/10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? 'text-brand-indigo dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navHighlight"
                      className="absolute inset-0 bg-white dark:bg-brand-indigo rounded-full shadow-sm border border-slate-100 dark:border-white/10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 hover:text-brand-indigo dark:hover:text-white transition-colors">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link 
              to="/admissions"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-navy text-white text-sm font-semibold hover:bg-brand-indigo hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Admissions
            </Link>
            
            <button
              className="md:hidden p-2 rounded-full bg-white/80 border border-slate-200 text-brand-navy"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-white/90 dark:bg-slate-900/90 pt-28 px-6"
          >
            <nav className="flex flex-col gap-4 max-w-sm mx-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-4 text-xl font-bold text-brand-navy dark:text-white p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-white/10 hover:border-brand-indigo transition-all"
                  >
                    <span className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-brand-indigo dark:text-white">
                      {link.icon}
                    </span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
              >
                <Link
                  to="/admissions"
                  className="flex items-center justify-center w-full py-4 rounded-2xl bg-brand-indigo text-white font-bold text-lg shadow-lg"
                >
                  Apply Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
