import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, BookOpen, FlaskConical, GraduationCap, Trophy, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from './ui/SpotlightCard';

const programs = [
  {
    id: 'preprimary',
    category: 'Pre-Primary',
    gradeRange: 'Nursery – UKG',
    title: 'Pre-Primary',
    subtitle: 'Play-based foundations for lifelong learning',
    icon: <Sparkles className="w-6 h-6 text-amber-500" />,
    skills: ['Sensory play', 'Phonics & early reading', 'Social-emotional learning', 'Art & Music'],
  },
  {
    id: 'primary',
    category: 'Primary',
    gradeRange: 'Grades I – V',
    title: 'Primary School',
    subtitle: 'Building strong academic foundations',
    icon: <BookOpen className="w-6 h-6 text-brand-indigo" />,
    skills: ['Maths & Science', 'English & Hindi', 'EVS & Social Studies', 'Sports'],
  },
  {
    id: 'middle',
    category: 'Middle',
    gradeRange: 'Grades VI – VIII',
    title: 'Middle School',
    subtitle: 'Expanding knowledge & critical thinking',
    icon: <FlaskConical className="w-6 h-6 text-emerald-500" />,
    skills: ['STEM projects', 'Language Arts', 'History & Geography', 'Lab practicals'],
  },
  {
    id: 'secondary',
    category: 'Secondary',
    gradeRange: 'Grades IX – X',
    title: 'Secondary (CBSE)',
    subtitle: 'Board exam excellence & career readiness',
    icon: <GraduationCap className="w-6 h-6 text-brand-violet" />,
    skills: ['CBSE Board prep', 'Science & Commerce', 'Mathematics', 'Career counselling'],
  },
  {
    id: 'sports',
    category: 'Extra-Curricular',
    gradeRange: 'All Grades',
    title: 'Sports & Fitness',
    subtitle: 'Physical wellness & team spirit',
    icon: <Trophy className="w-6 h-6 text-brand-coral" />,
    skills: ['Cricket & Football', 'Yoga & Athletics', 'Swimming'],
  },
  {
    id: 'arts',
    category: 'Extra-Curricular',
    gradeRange: 'All Grades',
    title: 'Arts & Clubs',
    subtitle: 'Creativity, talent & self-expression',
    icon: <Palette className="w-6 h-6 text-sky-500" />,
    skills: ['Dance & Drama', 'Robotics & Coding', 'Fine Arts', 'Music & Band'],
  },
];

const ageTabs = ['All', 'Pre-Primary', 'Primary', 'Middle', 'Secondary', 'Extra-Curricular'];

export default function Programs() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredPrograms = programs.filter(p => {
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  });

  return (
    <section className="bg-transparent relative pt-20 pb-16 z-10 border-t border-slate-100/10 dark:border-slate-800/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-label-caps text-xs tracking-widest uppercase font-bold mb-3 text-brand-indigo">
            Educational Pathways
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy dark:text-white mb-4 tracking-tight">
            Designed for Every Stage
          </h2>
          <p className="max-w-2xl mx-auto text-brand-slate text-base md:text-lg">
            From the first days of Nursery to the critical board exams of Grade 10, we provide a structured, engaging, and holistic learning environment.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap mb-10">
          {ageTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeTab === tab 
                  ? 'bg-brand-navy text-white border-brand-navy dark:bg-white dark:text-brand-navy dark:border-white' 
                  : 'bg-transparent text-slate-600 border-slate-200 hover:border-slate-300 dark:text-slate-400 dark:border-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program, i) => (
              <motion.div
                key={program.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full"
              >
                <SpotlightCard className="h-full rounded-2xl">
                  <div className="glass dark:glass-dark rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col h-full relative z-10 border-white/40">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-50/50 dark:bg-white/10 flex items-center justify-center border border-slate-100/50 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
                        {program.icon}
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-full text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                        {program.gradeRange}
                      </span>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2">
                        {program.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                        {program.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {program.skills.slice(0, 3).map(skill => (
                        <span
                          key={skill}
                          className="text-[10px] px-2 py-1 rounded bg-slate-50/50 dark:bg-white/5 border border-slate-100/50 dark:border-white/10 text-slate-600 dark:text-slate-400 backdrop-blur-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-brand-navy dark:bg-white text-white dark:text-brand-navy hover:bg-brand-indigo dark:hover:bg-brand-indigo dark:hover:text-white transition-colors shadow-sm"
          >
            Explore Curriculum details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
