import React, { useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion, useScroll, useTransform } from 'motion/react';
import { Leaf, BookOpen, FlaskConical, GraduationCap, Trophy } from 'lucide-react';
import WaveDivider from '../components/WaveDivider';
import CTA from '../components/CTA';
import ReactLenis from 'lenis/react';
import PageHero3D from '../components/PageHero3D';
import TiltCard from '../components/ui/TiltCard';
import { useSeo } from '../hooks/useSeo';

const programs = [
  {
    id: "preprimary",
    title: "Pre-Primary",
    grade: "Nursery – UKG",
    icon: <Leaf className="w-16 h-16 text-primary drop-shadow-md" />,
    theme: {
      base: "primary",
      bgFixed: "bg-primary-fixed",
      textFixedVariant: "text-primary-fixed-variant",
      bgLight: "bg-primary/20",
      hoverBgLight: "hover:bg-primary/30",
      text: "text-primary",
      border: "border-primary/20"
    },
    desc: "A play-based, sensory-rich foundation that sparks curiosity and a love for learning. We develop early literacy, numeracy, motor skills, and social-emotional intelligence — one story, song, and discovery at a time."
  },
  {
    id: "primary",
    title: "Primary School",
    grade: "Grades I – V",
    icon: <BookOpen className="w-16 h-16 text-secondary drop-shadow-md" />,
    theme: {
      base: "secondary",
      bgFixed: "bg-secondary-fixed",
      textFixedVariant: "text-secondary-fixed-variant",
      bgLight: "bg-secondary/20",
      hoverBgLight: "hover:bg-secondary/30",
      text: "text-secondary",
      border: "border-secondary/20"
    },
    desc: "Strong academic foundations in Mathematics, Science, English, Hindi, and EVS — delivered through interactive lessons, project-based learning, and collaborative activities that build confidence and independent thinking."
  },
  {
    id: "middle",
    title: "Middle School",
    grade: "Grades VI – VIII",
    icon: <FlaskConical className="w-16 h-16 text-tertiary drop-shadow-md" />,
    theme: {
      base: "tertiary",
      bgFixed: "bg-tertiary-fixed",
      textFixedVariant: "text-tertiary-fixed-variant",
      bgLight: "bg-tertiary/20",
      hoverBgLight: "hover:bg-tertiary/30",
      text: "text-tertiary",
      border: "border-tertiary/20"
    },
    desc: "Expanding knowledge horizons with Science, Social Studies, advanced Mathematics, and language arts. Students engage in lab practicals, research projects, and interdisciplinary exploration to develop critical and analytical thinking."
  },
  {
    id: "secondary",
    title: "Secondary (CBSE)",
    grade: "Grades IX – X",
    icon: <GraduationCap className="w-16 h-16 text-primary drop-shadow-md" />,
    theme: {
      base: "primary",
      bgFixed: "bg-primary-fixed",
      textFixedVariant: "text-primary-fixed-variant",
      bgLight: "bg-primary/20",
      hoverBgLight: "hover:bg-primary/30",
      text: "text-primary",
      border: "border-primary/20"
    },
    desc: "CBSE board exam excellence with rigorous subject teaching, regular mock tests, and personalised mentorship. Students choose Science or Commerce streams with dedicated lab access, library resources, and career counselling."
  },
  {
    id: "extracurricular",
    title: "Extra-Curriculars",
    grade: "All Grades",
    icon: <Trophy className="w-16 h-16 text-secondary drop-shadow-md" />,
    theme: {
      base: "secondary",
      bgFixed: "bg-secondary-fixed",
      textFixedVariant: "text-secondary-fixed-variant",
      bgLight: "bg-secondary/20",
      hoverBgLight: "hover:bg-secondary/30",
      text: "text-secondary",
      border: "border-secondary/20"
    },
    desc: "Holistic development beyond the classroom. Clubs include Robotics & Coding, Fine Arts, Dance & Drama, Cricket, Football, Yoga, and Music — open to all students from Nursery to Grade 10 to discover and nurture their passions."
  },
];

const ProgramCard = ({
  i,
  program,
}: {
  i: number;
  program: typeof programs[0];
  key?: React.Key;
}) => {
  return (
    <div className="w-full mb-12 last:mb-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="relative w-full origin-top"
      >
        <TiltCard maxRotation={4} scale={1.01} className="w-full">
          <div className={`glass bg-white/90 dark:bg-brand-navy/90 rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 lg:p-20 shadow-2xl border-4 md:border-8 border-white/50 dark:border-white/10 ${program.theme.border} transition-colors duration-500 relative flex flex-col items-start overflow-hidden group`}>
            
            {/* Glowing background blob */}
            <div className={`absolute -top-10 md:-top-20 -right-10 md:-right-20 w-48 md:w-64 h-48 md:h-64 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 bg-${program.theme.base}`} />

            <div className={`absolute -top-6 md:-top-8 ${i % 2 === 0 ? '-right-4 md:-right-8 rotate-12' : '-left-4 md:-left-8 -rotate-12'} w-28 md:w-40 h-28 md:h-40 ${program.theme.bgFixed} rounded-[2rem] md:rounded-[3rem] flex items-center justify-center shadow-xl float-slow z-10 border-4 border-white/50`}>
              <div className="scale-75 md:scale-100">
                {program.icon}
              </div>
            </div>
            
            <div className={`inline-block px-4 md:px-6 py-2 md:py-2.5 ${program.theme.bgFixed} ${program.theme.textFixedVariant} font-label-caps text-xs md:text-sm rounded-full font-bold mb-6 md:mb-8 shadow-sm`}>
              {program.grade}
            </div>
            <h2 className="font-display-md text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface dark:text-white mb-4 md:mb-8 relative z-10">{program.title}</h2>
            <p className="font-body-lg text-lg md:text-2xl text-on-surface-variant dark:text-slate-200 leading-relaxed mb-8 md:mb-12 relative z-10 max-w-2xl">
              {program.desc}
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 md:px-10 py-4 md:py-5 ${program.theme.bgLight} ${program.theme.text} font-bold rounded-full ${program.theme.hoverBgLight} transition-colors text-base md:text-lg shadow-sm border border-white/40`}
            >
              Enroll in {program.title}
            </motion.button>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
};

export default function ProgramsPage() {
  useSeo({
    title: 'Our Programs | WonderKids Nursery to Grade 10',
    description: 'A complete educational journey from Nursery to Grade 10 — built on curiosity, rigour, and care. Explore our Pre-Primary, Primary, Middle, and Secondary programs.',
    path: '/programs',
  });

  return (
    <ReactLenis root>
      <PageWrapper className="pt-20 md:pt-24 pb-16 md:pb-20">
        
        <PageHero3D 
          title={<>Our <span className="text-gradient">Programs</span></>}
          description="A complete educational journey from Nursery to Grade 10 — built on curiosity, rigour, and care. Scroll down to explore each stage."
          color="secondary"
        />

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          
          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 hidden lg:block sticky top-32 self-start h-max z-10">
            <div className="bg-white/50 dark:bg-brand-navy/50 glass-dark p-10 rounded-[3rem] border border-white/20">
              <h2 className="font-headline-md text-3xl font-bold text-primary mb-8">Journey Map</h2>
              
              <div className="flex flex-col gap-6 relative">
                <div className="absolute left-3 top-4 bottom-4 w-1 bg-outline-variant/30 rounded-full" />
                {programs.map((p, i) => (
                  <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className={`font-label-caps text-lg text-on-surface-variant dark:text-slate-300 font-bold flex items-center gap-6 relative z-10 cursor-pointer hover:text-${p.theme.base} transition-colors`}
                  >
                    <div className={`w-6 h-6 rounded-full bg-white border-4 border-${p.theme.base} shadow-sm`} /> 
                    <div>
                      <div className={`text-${p.theme.base}`}>{p.title}</div>
                      <div className="text-sm font-normal text-on-surface-variant dark:text-slate-300/60 lowercase">{p.grade}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Scrolling Content */}
          <div className="lg:col-span-8 col-span-1">
            <main className="relative flex w-full flex-col items-center justify-center gap-8 md:gap-16">
              {programs.map((program, i) => (
                <ProgramCard
                  key={`p_${i}`}
                  i={i}
                  program={program}
                />
              ))}
            </main>
          </div>
          
        </div>
        
        <WaveDivider color="var(--sky)" flip />
        <CTA />
      </PageWrapper>
    </ReactLenis>
  );
}
