import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PageWrapper from '../components/PageWrapper';
import WaveDivider from '../components/WaveDivider';
import CTA from '../components/CTA';
import { BookOpen, FlaskConical, Monitor, Library, Trophy, ChevronDown } from 'lucide-react';
import PageHero3D from '../components/PageHero3D';
import TiltCard from '../components/ui/TiltCard';
import { useSeo } from '../hooks/useSeo';

const divisions = [
  {
    id: 'preprimary',
    label: 'Pre-Primary',
    grade: 'Nursery – UKG',
    color: 'bg-amber-500',
    borderColor: 'border-amber-400',
    bg: 'bg-amber-50',
    shadow: 'shadow-amber-500/20',
    subjects: ['English (Phonics & Reading)', 'Early Numeracy', 'Environmental Awareness', 'Art & Craft', 'Music & Movement', 'Physical Education'],
    approach: 'Play-based, Montessori-inspired learning with thematic units. Children learn through stories, songs, sensory activities, and creative exploration.',
    emoji: '🌱',
  },
  {
    id: 'primary',
    label: 'Primary',
    grade: 'Grades I – V',
    color: 'bg-indigo-500',
    borderColor: 'border-indigo-400',
    bg: 'bg-indigo-50',
    shadow: 'shadow-indigo-500/20',
    subjects: ['Mathematics', 'Science & EVS', 'English Language', 'Hindi', 'Social Studies', 'Computer Basics', 'Art & Music', 'Physical Education'],
    approach: 'Activity-based and project-driven curriculum aligned with CBSE guidelines. Strong emphasis on conceptual understanding, reading habits, and critical thinking.',
    emoji: '📖',
  },
  {
    id: 'middle',
    label: 'Middle School',
    grade: 'Grades VI – VIII',
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-400',
    bg: 'bg-emerald-50',
    shadow: 'shadow-emerald-500/20',
    subjects: ['Mathematics', 'Science (Physics, Chemistry, Biology)', 'Social Science', 'English', 'Hindi', 'Computer Science', 'Fine Arts'],
    approach: 'Inquiry-based learning with regular lab practicals, research projects, and inter-disciplinary units. Students develop analytical skills and presentation confidence.',
    emoji: '🔬',
  },
  {
    id: 'secondary',
    label: 'Secondary (CBSE)',
    grade: 'Grades IX – X',
    color: 'bg-sky-500',
    borderColor: 'border-sky-400',
    bg: 'bg-sky-50',
    shadow: 'shadow-sky-500/20',
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'IT Applications', 'Artificial Intelligence'],
    approach: 'Rigorous CBSE board preparation with weekly mock tests, doubt-clearing sessions, and personalised mentorship. Career counselling included.',
    emoji: '🎓',
  },
];

const facilities = [
  { icon: <FlaskConical className="w-8 h-8 text-white" />, color: 'bg-emerald-500', title: 'Science Labs', desc: 'Fully equipped Physics, Chemistry, and Biology labs with modern apparatus.' },
  { icon: <Monitor className="w-8 h-8 text-white" />, color: 'bg-indigo-500', title: 'Computer Lab', desc: '40+ systems with high-speed internet and programming tools (Scratch, Python).' },
  { icon: <Library className="w-8 h-8 text-white" />, color: 'bg-purple-500', title: 'Library Room', desc: '5,000+ books, digital catalog, and dedicated reading corners for all ages.' },
  { icon: <Trophy className="w-8 h-8 text-white" />, color: 'bg-amber-500', title: 'Sports Complex', desc: 'Cricket ground, football field, basketball court, and indoor badminton.' },
  { icon: <BookOpen className="w-8 h-8 text-white" />, color: 'bg-rose-500', title: 'Smart Classes', desc: 'Interactive flat-panel displays and digital whiteboards in every classroom.' },
  { icon: <Monitor className="w-8 h-8 text-white" />, color: 'bg-cyan-500', title: 'Robotics Lab', desc: 'Dedicated space for coding clubs, 3D printing, and hands-on engineering.' },
];

const results = [
  { year: '2022–23', passRate: '99.4%', distinction: 42, color: 'text-amber-500' },
  { year: '2023–24', passRate: '100%', distinction: 51, color: 'text-indigo-500' },
  { year: '2024–25', passRate: '98.4%', distinction: 63, color: 'text-emerald-500' },
];

function AccordionItem({ division, isOpen, onToggle }: {
  division: typeof divisions[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div 
      layout
      className={`rounded-[2rem] overflow-hidden border-4 transition-all duration-300 shadow-xl ${isOpen ? `${division.borderColor} ${division.shadow} ring-4 ring-white/50` : 'border-white/50 dark:border-white/10 hover:border-white'}`}
      style={{ background: isOpen ? 'white' : 'rgba(255, 255, 255, 0.7)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-6 lg:p-8 text-left transition-colors duration-200"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`w-12 md:w-16 h-12 md:h-16 rounded-[1rem] md:rounded-[1.5rem] ${division.color} flex items-center justify-center text-2xl md:text-3xl shadow-inner border-2 border-white/30 transform transition-transform ${isOpen ? 'scale-110 rotate-12' : ''}`}>
            {division.emoji}
          </div>
          <div>
            <div className="font-display-sm text-xl md:text-3xl font-bold text-brand-navy mb-1" >{division.label}</div>
            <div className="text-xs md:text-sm font-label-caps tracking-widest text-brand-slate uppercase font-bold" >{division.grade}</div>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.2 : 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
          <div className={`w-10 md:w-12 h-10 md:h-12 rounded-full ${isOpen ? division.color + ' text-white shadow-lg' : 'bg-slate-100 text-brand-slate'} flex items-center justify-center transition-colors shrink-0 ml-4`}>
            <ChevronDown className="w-5 md:w-6 h-5 md:h-6" />
          </div>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="overflow-hidden bg-slate-50 border-t-2 border-slate-100"
          >
            <div className="p-8 grid md:grid-cols-2 gap-10">
              <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100">
                <h3 className="font-headline-sm text-xl font-bold text-brand-navy mb-4 flex items-center gap-2" >
                  <BookOpen className={`w-5 h-5 text-${division.color.split('-')[1]}-500`} />
                  Subjects Offered
                </h3>
                <ul className="space-y-3">
                  {division.subjects.map(s => (
                    <li key={s} className="flex items-center gap-3 text-base text-brand-slate font-medium" >
                      <span className={`w-2 h-2 rounded-full ${division.color} shadow-sm`} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100">
                <h3 className="font-headline-sm text-xl font-bold text-brand-navy mb-4 flex items-center gap-2" >
                  <Trophy className={`w-5 h-5 text-${division.color.split('-')[1]}-500`} />
                  Teaching Approach
                </h3>
                <p className="text-base text-brand-slate leading-relaxed font-medium" >
                  {division.approach}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AcademicsPage() {
  const [openDivision, setOpenDivision] = useState<string | null>('primary');

  useSeo({
    title: 'Academics | WonderKids School Curriculum',
    description: 'A rigorous, CBSE-aligned curriculum designed to build deep understanding, sharpen critical thinking, and inspire a lifelong love of learning.',
    path: '/academics',
  });

  return (
    <PageWrapper className="pt-20 md:pt-24 pb-16 md:pb-20">
      <PageHero3D 
        title={<><span className="text-gradient">Academics</span></>}
        description="A rigorous, CBSE-aligned curriculum designed to build deep understanding, sharpen critical thinking, and inspire a lifelong love of learning."
        color="tertiary"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 mt-8 md:mt-12">

        {/* CBSE affiliation badges - Soft 3D Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 md:mb-24"
        >
          {[
            { label: '🏫 CBSE Affiliated', sub: 'No. 123456' },
            { label: '📊 97% Pass Rate', sub: 'Class 10' },
            { label: '🏆 Best School', sub: 'State Award' },
          ].map(b => (
            <TiltCard key={b.label} scale={1.05} maxRotation={10}>
              <div className="bg-white dark:bg-brand-navy border-2 md:border-4 border-white dark:border-white/10 rounded-full px-6 md:px-8 py-3 md:py-4 shadow-xl flex flex-col items-center justify-center cursor-pointer">
                <div className="font-bold text-brand-navy dark:text-white text-base md:text-lg mb-0.5 md:mb-1" >{b.label}</div>
                <div className="text-[10px] md:text-xs text-brand-slate font-label-caps uppercase tracking-wider font-bold" >{b.sub}</div>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* Curriculum Accordion */}
        <div className="mb-20 md:mb-32 max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-display-md text-4xl md:text-5xl font-bold text-brand-navy dark:text-white mb-3 md:mb-4" >Curriculum Details</h2>
            <p className="text-lg md:text-xl text-brand-slate" >Click any division to explore subjects and teaching approach.</p>
          </div>
          <div className="space-y-4 md:space-y-6">
            {divisions.map(d => (
              <AccordionItem
                key={d.id}
                division={d}
                isOpen={openDivision === d.id}
                onToggle={() => setOpenDivision(openDivision === d.id ? null : d.id)}
              />
            ))}
          </div>
        </div>

        {/* Facilities Grid with TiltCards */}
        <div className="mb-20 md:mb-32">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-display-md text-4xl md:text-5xl font-bold text-brand-navy dark:text-white mb-3 md:mb-4" >Campus Facilities</h2>
            <p className="text-lg md:text-xl text-brand-slate" >State-of-the-art spaces designed for 21st-century learning.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {facilities.map((f, i) => (
              <TiltCard key={f.title} scale={1.05} maxRotation={15} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="bg-white dark:bg-brand-navy rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 border-4 border-white dark:border-white/10 shadow-xl h-full flex flex-col items-center text-center relative overflow-hidden group"
                >
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300 ${f.color}`} />
                  <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-inner ${f.color} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {f.icon}
                  </div>
                  <h3 className="font-headline-sm text-2xl font-bold text-brand-navy dark:text-white mb-4" >{f.title}</h3>
                  <p className="text-base text-brand-slate leading-relaxed font-medium" >{f.desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Board Results Dashboard Style */}
        <div className="mb-10 md:mb-16">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-display-md text-4xl md:text-5xl font-bold text-brand-navy dark:text-white mb-3 md:mb-4" >CBSE Class 10 Results</h2>
            <p className="text-lg md:text-xl text-brand-slate" >Consistent excellence in board examinations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {results.map((r, i) => (
              <TiltCard key={r.year} maxRotation={10}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: i * 0.15 }}
                  className="bg-white dark:bg-brand-navy border-4 border-white dark:border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 text-center shadow-xl relative overflow-hidden"
                >
                  <h3 className="font-label-caps text-xs md:text-sm tracking-widest uppercase font-bold text-brand-slate mb-4 md:mb-6 bg-slate-100 dark:bg-white/5 py-1.5 md:py-2 rounded-full inline-block px-4 md:px-6">
                    {r.year}
                  </h3>
                  <div className="mb-4 md:mb-6">
                    <div className={`font-display-lg text-5xl md:text-6xl font-bold ${r.color} drop-shadow-sm`}>{r.passRate}</div>
                    <div className="text-xs md:text-sm font-bold text-brand-slate mt-1 md:mt-2 uppercase tracking-wide">Pass Rate</div>
                  </div>
                  <div className="w-full h-px bg-slate-100 dark:bg-white/10 mb-4 md:mb-6" />
                  <div>
                    <div className="font-headline-md text-2xl md:text-3xl font-bold text-brand-navy dark:text-white">{r.distinction}</div>
                    <div className="text-[10px] md:text-xs font-bold text-brand-slate mt-1 uppercase tracking-wide">Distinctions</div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>

      </div>

      <WaveDivider color="var(--sky)" flip />
      <CTA />
    </PageWrapper>
  );
}
