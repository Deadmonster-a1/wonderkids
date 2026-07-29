import React from 'react';
import { motion } from 'motion/react';
import Features from '../components/Features';
import PageWrapper from '../components/PageWrapper';
import { StatCard } from '../components/StatsCounter';
import Gallery from '../components/Gallery';
import WaveDivider from '../components/WaveDivider';
import PageHero3D from '../components/PageHero3D';
import TiltCard from '../components/ui/TiltCard';
import { useSeo } from '../hooks/useSeo';

const milestones = [
  { year: '2012', title: 'WonderKids Founded', desc: 'Opened our doors with 30 children and a passionate team committed to transforming education.' },
  { year: '2015', title: 'Expanded Campus', desc: 'Doubled our space with a new outdoor sports area, Science lab, and Computer room.' },
  { year: '2018', title: 'Award-Winning Curriculum', desc: 'Recognized by the State Education Board for excellence in holistic child development.' },
  { year: '2021', title: 'Reached 1,000 Families', desc: 'Our WonderKids family grew to over 1,000 students across all grades, Nursery to Grade 8.' },
  { year: '2024', title: 'Secondary Section Launched', desc: 'Expanded to Grades 9 and 10 under CBSE affiliation, completing our Nursery-to-Class 10 vision.' },
  { year: '2026', title: '1,200+ Students Strong', desc: 'Today, over 1,200 students call WonderKids home — our proudest milestone yet.' },
];

export default function AboutUsPage() {
  useSeo({
    title: 'About Us | WonderKids School Since 2012',
    description: 'Founded in 2012, WonderKids has grown from a small nursery into a full CBSE-affiliated school from Nursery to Grade 10, guided by a mission of academic excellence.',
    path: '/about',
  });

  return (
    <PageWrapper className="pt-20 md:pt-24 pb-16 md:pb-20">
      
      <PageHero3D 
        title={<>About <span className="text-gradient">WonderKids</span></>}
        description="Founded in 2012, WonderKids has grown from a small nursery into a full CBSE-affiliated school from Nursery to Grade 10. Our mission: to nurture the unique potential of every child through rigorous academics, creative exploration, and compassionate guidance."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        {/* Bento Grid with animated stat counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[220px] md:auto-rows-[250px] mb-20 md:mb-32">
          <TiltCard className="md:col-span-2 md:row-span-2 h-full">
            <div className="bg-primary rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 flex flex-col justify-end relative overflow-hidden shadow-2xl h-full border-4 md:border-8 border-white dark:border-brand-navy border-opacity-50">
              <div className="absolute top-0 right-0 w-64 md:w-80 h-64 md:h-80 bg-white/20 dark:bg-brand-navy/30 blob-shape -translate-y-1/4 translate-x-1/4 blur-2xl"></div>
              <h2 className="font-display-lg text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 relative z-10">Our Mission</h2>
              <p className="font-body-lg text-white/95 text-lg md:text-xl relative z-10 max-w-xl leading-relaxed drop-shadow-md">
                To nurture the unique potential of every student from Nursery to Grade 10 — through academic excellence, character building, and a lifelong love of learning. We believe in education that prepares children not just for exams, but for life.
              </p>
            </div>
          </TiltCard>
          
          <TiltCard className="h-full">
            <div className="glass bg-secondary/90 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-2xl h-full border-4 md:border-8 border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
              <StatCard value={15} suffix="+" label="Years of Excellence" color="primary" duration={2} />
              <div className="mt-4 w-12 md:w-16 h-1.5 bg-white/50 rounded-full" />
              <p className="text-white text-sm md:text-base mt-4 font-bold tracking-wide uppercase">Trusted since 2012</p>
            </div>
          </TiltCard>
          
          <TiltCard className="h-full">
            <div className="glass bg-tertiary/90 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-2xl border-4 md:border-8 border-white/50 relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
              <StatCard value={1200} suffix="+" label="Students Enrolled" color="secondary" duration={2.5} />
              <div className="mt-4 w-12 md:w-16 h-1.5 bg-white/50 rounded-full" />
              <p className="text-white text-sm md:text-base mt-4 font-bold tracking-wide uppercase">Nursery to Grade 10!</p>
            </div>
          </TiltCard>
        </div>

        {/* Vision & Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32"
        >
          {[
            { emoji: '🎯', title: 'Academic Excellence', desc: 'Rigorous, CBSE-aligned curriculum with regular assessments, board exam prep, and 97% pass rate.' },
            { emoji: '🌱', title: 'Holistic Growth', desc: 'Sports, arts, music, robotics, and drama clubs ensure every child discovers and develops their unique talents.' },
            { emoji: '🤝', title: 'Values & Character', desc: 'Respect, empathy, integrity, and community service are woven into every day at WonderKids.' },
          ].map((v, i) => (
            <TiltCard key={v.title} maxRotation={15} scale={1.05}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="glass-dark bg-white/80 dark:bg-brand-navy/80 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl border-4 border-white dark:border-white/10 text-center h-full relative overflow-hidden group"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-indigo/10 rounded-full blur-2xl group-hover:bg-brand-indigo/20 transition-all duration-500"></div>
                <div className="text-6xl mb-6 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">{v.emoji}</div>
                <h3 className="font-headline-sm text-on-surface dark:text-white text-2xl mb-4 font-bold" >{v.title}</h3>
                <p className="font-body text-on-surface-variant dark:text-slate-300 leading-relaxed text-base">{v.desc}</p>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>

        {/* Milestone Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="mb-8 md:mb-12 text-center"
        >
          <span className="font-label-caps text-primary uppercase tracking-widest bg-primary/10 px-4 md:px-6 py-2 md:py-2.5 rounded-full inline-block font-bold mb-4 md:mb-6 text-sm md:text-base">Our Journey</span>
          <h2 className="font-display-md text-4xl md:text-5xl lg:text-6xl text-on-surface dark:text-white mb-8 md:mb-16">Milestones That Shaped Us</h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Playful dashed vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1.5 border-l-4 border-dashed border-primary/30 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 100, damping: 18, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'} pl-16 md:pl-0 relative`}
              >
                {/* Content card */}
                <div className="flex-1 md:max-w-[45%] w-full">
                  <TiltCard maxRotation={5} scale={1.03}>
                    <div className="glass bg-white/90 dark:bg-brand-navy/90 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl border-4 border-white dark:border-white/10 relative overflow-hidden group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      <span className="font-headline-sm text-primary font-black text-xl md:text-2xl mb-2 md:mb-4 block">{m.year}</span>
                      <h3 className="font-bold text-on-surface dark:text-white text-xl md:text-2xl mb-2 md:mb-3">{m.title}</h3>
                      <p className="font-body text-on-surface-variant dark:text-slate-300 text-base md:text-lg">{m.desc}</p>
                    </div>
                  </TiltCard>
                </div>

                {/* Center dot - Bouncy & Colorful */}
                <motion.div 
                  whileHover={{ scale: 1.5, rotate: 180 }}
                  className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-tertiary border-4 border-white shadow-xl flex items-center justify-center cursor-pointer z-10" 
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </motion.div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1 max-w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <WaveDivider color="var(--light)" />
      <Features />
      <Gallery />
    </PageWrapper>
  );
}
