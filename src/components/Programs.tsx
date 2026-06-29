import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, BookOpen, FlaskConical, GraduationCap, Trophy, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const programs = [
  {
    id: 'preprimary',
    category: 'Pre-Primary',
    gradeRange: 'Nursery – UKG',
    title: 'Pre-Primary',
    subtitle: 'Play-based foundations for lifelong learning',
    icon: <Sparkles className="w-8 h-8 text-amber-500" />,
    skills: ['Sensory play', 'Phonics & early reading', 'Social-emotional learning', 'Art & Music'],
    gradient: 'from-amber-500/10 to-amber-500/5',
    borderHover: 'hover:border-amber-500/50',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 'primary',
    category: 'Primary',
    gradeRange: 'Grades I – V',
    title: 'Primary School',
    subtitle: 'Building strong academic foundations',
    icon: <BookOpen className="w-8 h-8 text-brand-indigo" />,
    skills: ['Maths & Science', 'English & Hindi', 'EVS & Social Studies', 'Sports'],
    gradient: 'from-brand-indigo/10 to-brand-indigo/5',
    borderHover: 'hover:border-brand-indigo/50',
    className: 'md:col-span-1 md:row-span-2 flex flex-col justify-between',
  },
  {
    id: 'middle',
    category: 'Middle',
    gradeRange: 'Grades VI – VIII',
    title: 'Middle School',
    subtitle: 'Expanding knowledge & critical thinking',
    icon: <FlaskConical className="w-8 h-8 text-emerald-500" />,
    skills: ['STEM projects', 'Language Arts', 'History & Geography', 'Lab practicals'],
    gradient: 'from-emerald-500/10 to-emerald-500/5',
    borderHover: 'hover:border-emerald-500/50',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'secondary',
    category: 'Secondary',
    gradeRange: 'Grades IX – X',
    title: 'Secondary (CBSE)',
    subtitle: 'Board exam excellence & career readiness',
    icon: <GraduationCap className="w-8 h-8 text-brand-violet" />,
    skills: ['CBSE Board prep', 'Science & Commerce', 'Mathematics', 'Career counselling'],
    gradient: 'from-brand-violet/10 to-brand-violet/5',
    borderHover: 'hover:border-brand-violet/50',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 'sports',
    category: 'Extra-Curricular',
    gradeRange: 'All Grades',
    title: 'Sports & Fitness',
    subtitle: 'Physical wellness & team spirit',
    icon: <Trophy className="w-8 h-8 text-brand-coral" />,
    skills: ['Cricket & Football', 'Yoga & Athletics', 'Swimming'],
    gradient: 'from-brand-coral/10 to-brand-coral/5',
    borderHover: 'hover:border-brand-coral/50',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'arts',
    category: 'Extra-Curricular',
    gradeRange: 'All Grades',
    title: 'Arts & Clubs',
    subtitle: 'Creativity, talent & self-expression',
    icon: <Palette className="w-8 h-8 text-sky-500" />,
    skills: ['Dance & Drama', 'Robotics & Coding', 'Fine Arts', 'Music & Band'],
    gradient: 'from-sky-500/10 to-sky-500/5',
    borderHover: 'hover:border-sky-500/50',
    className: 'md:col-span-2 md:row-span-1',
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
    <section className="bg-brand-light dark:bg-brand-navy relative pt-32 pb-24 z-10">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase font-bold mb-3 text-brand-indigo">
            Educational Pathways
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy dark:text-white mb-6 tracking-tight">
            Designed for Every Stage
          </h2>
          <p className="max-w-2xl mx-auto text-brand-slate text-lg leading-relaxed">
            From the first days of Nursery to the critical board exams of Grade 10, we provide a structured, engaging, and holistic learning environment.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 flex-wrap mb-12">
          {ageTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 z-10"
              style={{ color: activeTab === tab ? '#fff' : '#64748B' }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeProgramTab"
                  className="absolute inset-0 bg-brand-navy rounded-full -z-10 shadow-md"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program, i) => (
              <motion.div
                key={program.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.05, type: "spring" }}
                className={`group relative bg-white dark:bg-brand-navy rounded-[2rem] p-8 border border-slate-100 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] ${program.borderHover} ${activeTab === 'All' ? program.className : 'col-span-1 row-span-1'}`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-brand-navy shadow-sm flex items-center justify-center border border-slate-50 group-hover:scale-110 transition-transform duration-500">
                      {program.icon}
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-white dark:bg-brand-navy/60 backdrop-blur-sm rounded-full text-brand-navy dark:text-white border border-white/40 shadow-sm">
                      {program.gradeRange}
                    </span>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-2 tracking-tight">
                      {program.title}
                    </h3>
                    <p className="text-sm text-brand-slate font-medium mb-4">
                      {program.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {program.skills.slice(0, activeTab === 'All' && program.id !== 'primary' ? 3 : 4).map(skill => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1 rounded-full font-medium bg-white dark:bg-brand-navy/60 border border-slate-200/50 text-brand-slate"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-8 right-8 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center shadow-lg">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[15px] bg-white dark:bg-brand-navy border border-slate-200 text-brand-navy dark:text-white hover:border-brand-indigo hover:text-brand-indigo hover:shadow-md transition-all duration-300 group"
          >
            Explore Curriculum details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
