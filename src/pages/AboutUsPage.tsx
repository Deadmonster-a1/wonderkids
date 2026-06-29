import React from 'react';
import { motion } from 'motion/react';
import Features from '../components/Features';
import PageWrapper from '../components/PageWrapper';
import { StatCard } from '../components/StatsCounter';
import Gallery from '../components/Gallery';
import WaveDivider from '../components/WaveDivider';

const milestones = [
  { year: '2012', title: 'WonderKids Founded', desc: 'Opened our doors with 30 children and a passionate team committed to transforming education.' },
  { year: '2015', title: 'Expanded Campus', desc: 'Doubled our space with a new outdoor sports area, Science lab, and Computer room.' },
  { year: '2018', title: 'Award-Winning Curriculum', desc: 'Recognized by the State Education Board for excellence in holistic child development.' },
  { year: '2021', title: 'Reached 1,000 Families', desc: 'Our WonderKids family grew to over 1,000 students across all grades, Nursery to Grade 8.' },
  { year: '2024', title: 'Secondary Section Launched', desc: 'Expanded to Grades 9 and 10 under CBSE affiliation, completing our Nursery-to-Class 10 vision.' },
  { year: '2026', title: '1,200+ Students Strong', desc: 'Today, over 1,200 students call WonderKids home — our proudest milestone yet.' },
];

export default function AboutUsPage() {
  return (
    <PageWrapper className="pt-32 md:pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="font-display-lg text-5xl md:text-7xl text-primary mb-6"
        >
          About WonderKids
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          className="font-body-lg text-xl text-on-surface-variant dark:text-slate-300 max-w-3xl mb-16"
        >
          Founded in 2012, WonderKids has grown from a small nursery into a full CBSE-affiliated school from Nursery to Grade 10. Our mission: to nurture the unique potential of every child through rigorous academics, creative exploration, and compassionate guidance.
        </motion.p>
        
        {/* Bento Grid with animated stat counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] mb-24">
          <motion.div 
            whileHover={{ scale: 1.02, rotate: -1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="md:col-span-2 md:row-span-2 bg-primary rounded-[3rem] p-10 flex flex-col justify-end relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white dark:bg-brand-navy/10 blob-shape -translate-y-1/4 translate-x-1/4"></div>
            <h3 className="text-4xl font-bold text-white mb-4 relative z-10">Our Mission</h3>
            <p className="text-white/90 text-lg relative z-10 max-w-lg">
              To nurture the unique potential of every student from Nursery to Grade 10 — through academic excellence, character building, and a lifelong love of learning. We believe in education that prepares children not just for exams, but for life.
            </p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-secondary rounded-[3rem] p-8 flex flex-col justify-center items-center text-center shadow-xl border-8 border-white"
          >
            <StatCard value={15} suffix="+" label="Years of Excellence" color="primary" duration={2} />
            <div className="mt-4 w-12 h-1 bg-white dark:bg-brand-navy/40 rounded-full" />
            <p className="text-white/80 text-sm mt-3 font-medium">Trusted since 2012</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-tertiary rounded-[3rem] p-8 flex flex-col justify-center items-center text-center shadow-xl"
          >
            <StatCard value={1200} suffix="+" label="Students Enrolled" color="primary" duration={2.5} />
            <div className="mt-4 w-12 h-1 bg-white dark:bg-brand-navy/40 rounded-full" />
            <p className="text-white/80 text-sm mt-3 font-medium">Nursery to Grade 10!</p>
          </motion.div>
        </div>

        {/* Vision & Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-24"
        >
          {[
            { emoji: '🎯', title: 'Academic Excellence', desc: 'Rigorous, CBSE-aligned curriculum with regular assessments, board exam prep, and 97% pass rate.' },
            { emoji: '🌱', title: 'Holistic Growth', desc: 'Sports, arts, music, robotics, and drama clubs ensure every child discovers and develops their unique talents.' },
            { emoji: '🤝', title: 'Values & Character', desc: 'Respect, empathy, integrity, and community service are woven into every day at WonderKids.' },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-brand-navy p-8 rounded-[2rem] shadow-md border border-slate-100 dark:border-white/10 text-center"
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="text-4xl mb-4">{v.emoji}</div>
              <h3 className="font-bold text-on-surface dark:text-white text-xl mb-3" >{v.title}</h3>
              <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Milestone Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="mb-8"
        >
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block font-bold mb-6">Our Journey</span>
          <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-12">Milestones That Shaped Us</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-outline-variant/50 -translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 100, damping: 18, delay: i * 0.05 }}
                className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row pl-16 md:pl-0`}
              >
                {/* Content card */}
                <div className="flex-1 md:max-w-[45%]">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-brand-navy p-8 rounded-[2rem] shadow-md border-4 border-outline-variant/20 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                  >
                    <span className="font-label-caps text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">{m.year}</span>
                    <h4 className="font-bold text-on-surface dark:text-white text-xl mb-2">{m.title}</h4>
                    <p className="text-on-surface-variant dark:text-slate-300">{m.desc}</p>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="relative z-10 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-md shrink-0 absolute left-6 md:left-1/2 md:-translate-x-1/2" />

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
