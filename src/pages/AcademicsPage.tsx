import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PageWrapper from '../components/PageWrapper';
import WaveDivider from '../components/WaveDivider';
import CTA from '../components/CTA';
import { BookOpen, FlaskConical, Monitor, Library, Trophy, ChevronDown } from 'lucide-react';

const divisions = [
  {
    id: 'preprimary',
    label: 'Pre-Primary',
    grade: 'Nursery – UKG',
    color: '#F59E0B',
    bg: '#FFFBEB',
    subjects: ['English (Phonics & Reading)', 'Early Numeracy', 'Environmental Awareness', 'Art & Craft', 'Music & Movement', 'Physical Education'],
    approach: 'Play-based, Montessori-inspired learning with thematic units. Children learn through stories, songs, sensory activities, and creative exploration.',
    emoji: '🌱',
  },
  {
    id: 'primary',
    label: 'Primary',
    grade: 'Grades I – V',
    color: '#3B4DC8',
    bg: '#EEF2FF',
    subjects: ['Mathematics', 'Science & EVS', 'English Language & Literature', 'Hindi', 'Social Studies', 'Computer Basics', 'Art & Music', 'Physical Education'],
    approach: 'Activity-based and project-driven curriculum aligned with CBSE guidelines. Strong emphasis on conceptual understanding, reading habits, and critical thinking.',
    emoji: '📖',
  },
  {
    id: 'middle',
    label: 'Middle School',
    grade: 'Grades VI – VIII',
    color: '#16A34A',
    bg: '#DCFCE7',
    subjects: ['Mathematics', 'Science (Physics, Chemistry, Biology)', 'Social Science', 'English', 'Hindi / Sanskrit', 'Computer Science', 'Fine Arts / Music'],
    approach: 'Inquiry-based learning with regular lab practicals, research projects, and inter-disciplinary units. Students develop analytical skills, presentation confidence, and collaborative problem-solving.',
    emoji: '🔬',
  },
  {
    id: 'secondary',
    label: 'Secondary (CBSE)',
    grade: 'Grades IX – X',
    color: '#1A2B4A',
    bg: '#EEF2FF',
    subjects: ['Mathematics', 'Science (Physics, Chemistry, Biology)', 'Social Science', 'English (Core)', 'Hindi', 'IT / Computer Applications', 'Optional: Artificial Intelligence'],
    approach: 'Rigorous CBSE board preparation with weekly mock tests, doubt-clearing sessions, and personalised mentorship. Career counselling and stream selection guidance included.',
    emoji: '🎓',
  },
];

const facilities = [
  { icon: <FlaskConical className="w-6 h-6" />, color: '#16A34A', bg: '#DCFCE7', title: 'Science Laboratories', desc: 'Fully equipped Physics, Chemistry, and Biology labs with modern apparatus and safety infrastructure.' },
  { icon: <Monitor className="w-6 h-6" />, color: '#3B4DC8', bg: '#EEF2FF', title: 'Computer Lab', desc: '40+ systems with high-speed internet, programming tools (Scratch, Python), and robotics kits.' },
  { icon: <Library className="w-6 h-6" />, color: '#7C3AED', bg: '#F3E8FF', title: 'Library & Reading Room', desc: '5,000+ books, digital catalog, newspapers, periodicals, and dedicated reading corners for all ages.' },
  { icon: <Trophy className="w-6 h-6" />, color: '#D97706', bg: '#FEF3C7', title: 'Sports Complex', desc: 'Cricket ground, football field, basketball court, indoor badminton, and a dedicated yoga & fitness room.' },
  { icon: <BookOpen className="w-6 h-6" />, color: '#FF6347', bg: '#FFE4E6', title: 'Smart Classrooms', desc: 'Interactive flat-panel displays, digital whiteboards, and online learning integrations in every classroom.' },
  { icon: <Monitor className="w-6 h-6" />, color: '#0891B2', bg: '#E0F7FA', title: 'Robotics & STEM Lab', desc: 'Dedicated space for robotics projects, coding clubs, 3D printing, and hands-on engineering challenges.' },
];

const results = [
  { year: '2022–23', appeared: 156, passed: 155, passRate: '99.4%', distinction: 42 },
  { year: '2023–24', appeared: 168, passed: 168, passRate: '100%', distinction: 51 },
  { year: '2024–25', appeared: 182, passed: 179, passRate: '98.4%', distinction: 63 },
];

function AccordionItem({ division, isOpen, onToggle }: {
  division: typeof divisions[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: isOpen ? division.color : '#E2E8F0' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left transition-colors duration-200"
        style={{ background: isOpen ? division.bg : 'white' }}
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{division.emoji}</span>
          <div>
            <div className="font-bold text-xl text-[#1A2B4A]" >{division.label}</div>
            <div className="text-sm text-[#718096]" >{division.grade}</div>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5" style={{ color: division.color }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 grid md:grid-cols-2 gap-6" style={{ background: division.bg }}>
              <div>
                <h4 className="font-bold text-[#1A2B4A] mb-3 text-sm uppercase tracking-wide" >Subjects Offered</h4>
                <ul className="space-y-2">
                  {division.subjects.map(s => (
                    <li key={s} className="flex items-center gap-2 text-[14px] text-[#4A5568]" >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: division.color }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#1A2B4A] mb-3 text-sm uppercase tracking-wide" >Teaching Approach</h4>
                <p className="text-[14px] text-[#4A5568] leading-relaxed" >
                  {division.approach}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AcademicsPage() {
  const [openDivision, setOpenDivision] = useState<string | null>('primary');

  return (
    <PageWrapper className="pt-32 md:pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">

        {/* Hero */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="font-display-lg text-5xl md:text-7xl text-primary mb-6"
        >
          Academics
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          className="font-body-lg text-xl text-on-surface-variant dark:text-slate-300 max-w-2xl mb-16"
        >
          A rigorous, CBSE-aligned curriculum from Nursery to Grade 10 — designed to build deep understanding, sharpen critical thinking, and inspire a lifelong love of learning.
        </motion.p>

        {/* CBSE affiliation badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          {[
            { label: '🏫 CBSE Affiliated', sub: 'Affiliation No. 123456' },
            { label: '📊 97% Board Pass Rate', sub: 'Class 10 · 2024–25' },
            { label: '🏆 Best School Award', sub: 'State Education Board 2024' },
            { label: '📚 5,000+ Library Books', sub: 'Digital + Physical' },
          ].map(b => (
            <div key={b.label} className="bg-white dark:bg-brand-navy border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="font-bold text-[#1A2B4A] text-sm" >{b.label}</div>
              <div className="text-xs text-[#718096]" >{b.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Curriculum Accordion */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#1A2B4A] mb-3" >Curriculum by Division</h2>
          <p className="text-[#718096] mb-8 text-[16px]" >
            Click any division to explore subjects and teaching approach.
          </p>
          <div className="space-y-4">
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

        {/* Facilities */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#1A2B4A] mb-3" >Facilities & Infrastructure</h2>
          <p className="text-[#718096] mb-8 text-[16px]" >
            State-of-the-art spaces designed for 21st-century learning.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
                className="bg-white dark:bg-brand-navy rounded-2xl p-6 border border-slate-100 dark:border-white/10 shadow-sm transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: f.bg, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-[#1A2B4A] text-lg mb-2" >{f.title}</h3>
                <p className="text-[13px] text-[#718096] leading-relaxed" >{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Board Results */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#1A2B4A] mb-3" >CBSE Class 10 Results</h2>
          <p className="text-[#718096] mb-8 text-[16px]" >
            Consistent excellence in board examinations — a testament to our teaching quality and student dedication.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-br from-brand-navy to-brand-indigo">
                  {['Academic Year', 'Students Appeared', 'Students Passed', 'Pass Rate', 'Distinctions'].map(h => (
                    <th key={h} className="text-white text-left px-6 py-4 font-semibold" >{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r.year} className={`border-t border-slate-100 dark:border-white/10 ${i % 2 === 0 ? 'bg-slate-50 dark:bg-white/5' : 'bg-white dark:bg-brand-navy'}`}>
                    <td className="px-6 py-4 font-semibold text-[#1A2B4A]" >{r.year}</td>
                    <td className="px-6 py-4 text-[#4A5568]" >{r.appeared}</td>
                    <td className="px-6 py-4 text-[#4A5568]" >{r.passed}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        {r.passRate}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#3B4DC8]" >{r.distinction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <WaveDivider color="var(--sky)" flip />
      <CTA />
    </PageWrapper>
  );
}
