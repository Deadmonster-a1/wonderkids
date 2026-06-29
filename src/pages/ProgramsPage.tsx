import React, { useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, useScroll, useTransform } from 'motion/react';
import { Leaf, BookOpen, FlaskConical, GraduationCap, Trophy } from 'lucide-react';
import WaveDivider from '../components/WaveDivider';
import CTA from '../components/CTA';
import ReactLenis from 'lenis/react';

const programs = [
  {
    id: "preprimary",
    title: "Pre-Primary",
    grade: "Nursery – UKG",
    icon: <Leaf className="w-12 h-12 text-primary" />,
    theme: {
      base: "primary",
      bgFixed: "bg-primary-fixed",
      textFixedVariant: "text-primary-fixed-variant",
      bgLight: "bg-primary/10",
      hoverBgLight: "hover:bg-primary/20",
      text: "text-primary",
      border: "hover:border-primary/30"
    },
    desc: "A play-based, sensory-rich foundation that sparks curiosity and a love for learning. We develop early literacy, numeracy, motor skills, and social-emotional intelligence — one story, song, and discovery at a time."
  },
  {
    id: "primary",
    title: "Primary School",
    grade: "Grades I – V",
    icon: <BookOpen className="w-12 h-12 text-secondary" />,
    theme: {
      base: "secondary",
      bgFixed: "bg-secondary-fixed",
      textFixedVariant: "text-secondary-fixed-variant",
      bgLight: "bg-secondary/10",
      hoverBgLight: "hover:bg-secondary/20",
      text: "text-secondary",
      border: "hover:border-secondary/30"
    },
    desc: "Strong academic foundations in Mathematics, Science, English, Hindi, and EVS — delivered through interactive lessons, project-based learning, and collaborative activities that build confidence and independent thinking."
  },
  {
    id: "middle",
    title: "Middle School",
    grade: "Grades VI – VIII",
    icon: <FlaskConical className="w-12 h-12 text-tertiary" />,
    theme: {
      base: "tertiary",
      bgFixed: "bg-tertiary-fixed",
      textFixedVariant: "text-tertiary-fixed-variant",
      bgLight: "bg-tertiary/10",
      hoverBgLight: "hover:bg-tertiary/20",
      text: "text-tertiary",
      border: "hover:border-tertiary/30"
    },
    desc: "Expanding knowledge horizons with Science, Social Studies, advanced Mathematics, and language arts. Students engage in lab practicals, research projects, and interdisciplinary exploration to develop critical and analytical thinking."
  },
  {
    id: "secondary",
    title: "Secondary (CBSE)",
    grade: "Grades IX – X",
    icon: <GraduationCap className="w-12 h-12 text-primary" />,
    theme: {
      base: "primary",
      bgFixed: "bg-primary-fixed",
      textFixedVariant: "text-primary-fixed-variant",
      bgLight: "bg-primary/10",
      hoverBgLight: "hover:bg-primary/20",
      text: "text-primary",
      border: "hover:border-primary/30"
    },
    desc: "CBSE board exam excellence with rigorous subject teaching, regular mock tests, and personalised mentorship. Students choose Science or Commerce streams with dedicated lab access, library resources, and career counselling."
  },
  {
    id: "extracurricular",
    title: "Extra-Curriculars",
    grade: "All Grades",
    icon: <Trophy className="w-12 h-12 text-secondary" />,
    theme: {
      base: "secondary",
      bgFixed: "bg-secondary-fixed",
      textFixedVariant: "text-secondary-fixed-variant",
      bgLight: "bg-secondary/10",
      hoverBgLight: "hover:bg-secondary/20",
      text: "text-secondary",
      border: "hover:border-secondary/30"
    },
    desc: "Holistic development beyond the classroom. Clubs include Robotics & Coding, Fine Arts, Dance & Drama, Cricket, Football, Yoga, and Music — open to all students from Nursery to Grade 10 to discover and nurture their passions."
  },
];

const StickyProgramCard = ({
  i,
  program,
  progress,
  range,
  targetScale,
}: {
  i: number;
  program: typeof programs[0];
  progress: any;
  range: [number, number];
  targetScale: number;
  key?: React.Key;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center w-full h-screen"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 30}px)`,
        }}
        className={`bg-white dark:bg-brand-navy rounded-[3rem] p-10 md:p-16 shadow-xl border-8 border-white hover:${program.theme.border} transition-colors duration-300 relative w-full max-w-3xl origin-top flex flex-col items-start`}
      >
        <div className={`absolute -top-8 ${i % 2 === 0 ? '-right-8 rotate-12' : '-left-8 -rotate-12'} w-32 h-32 ${program.theme.bgFixed} rounded-[2rem] flex items-center justify-center shadow-lg float-slow z-10`}>
          {program.icon}
        </div>
        
        <div className={`inline-block px-4 py-2 ${program.theme.bgFixed} ${program.theme.textFixedVariant} font-label-caps text-sm rounded-full font-bold mb-6`}>
          {program.grade}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-on-surface dark:text-white mb-6">{program.title}</h2>
        <p className="text-xl text-on-surface-variant dark:text-slate-300 leading-relaxed mb-8">
          {program.desc}
        </p>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 py-4 ${program.theme.bgLight} ${program.theme.text} font-bold rounded-full ${program.theme.hoverBgLight} transition-colors`}
        >
          Enroll Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default function ProgramsPage() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <PageWrapper className="pt-32 md:pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="sticky top-32">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="font-display-lg text-5xl md:text-7xl text-primary mb-6"
              >
                Our Programs
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                className="font-body-lg text-xl text-on-surface-variant dark:text-slate-300 mb-8"
              >
                A complete educational journey from Nursery to Grade 10 — built on curiosity, rigour, and care. Scroll to explore each stage.
              </motion.p>
              
              <div className="flex flex-col gap-4">
                {programs.map((p, i) => (
                  <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className={`font-label-caps text-lg text-on-surface-variant dark:text-slate-300 font-bold flex items-center gap-2`}
                  >
                    <span className={`w-2 h-2 rounded-full bg-${p.theme.base}`} /> {p.title}
                    <span className="text-sm font-normal text-on-surface-variant dark:text-slate-300/60">({p.grade})</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Scrolling Stack Content */}
          <div className="lg:col-span-8 col-span-1 border-l-0 lg:border-l-2 border-outline-variant/30 pl-0 lg:pl-12">
            <div className="lg:hidden mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="font-display-lg text-5xl text-primary mb-6"
              >
                Our Programs
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                className="font-body-lg text-xl text-on-surface-variant dark:text-slate-300 mb-8"
              >
                A complete educational journey from Nursery to Grade 10 — built on curiosity, rigour, and care. Scroll to explore.
              </motion.p>
            </div>

            <main
              ref={container}
              className="relative flex w-full flex-col items-center justify-center pb-[50vh] pt-[10vh]"
            >
              {programs.map((program, i) => {
                const targetScale = Math.max(0.8, 1 - (programs.length - i - 1) * 0.05);
                return (
                  <StickyProgramCard
                    key={`p_${i}`}
                    i={i}
                    program={program}
                    progress={scrollYProgress}
                    range={[i * 0.2, 1]}
                    targetScale={targetScale}
                  />
                );
              })}
            </main>
          </div>
          
        </div>
        
        <WaveDivider color="var(--sky)" flip />
        <CTA />
      </PageWrapper>
    </ReactLenis>
  );
}
