import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sun, BookOpen, FlaskConical, UtensilsCrossed, Users, Pencil, Bus, Clock } from 'lucide-react';

const timeline = [
  { time: '8:00 AM', icon: <Clock className="w-5 h-5" />, activity: 'Arrival & Assembly', desc: 'Students gather for morning assembly — prayer, news headlines, and school announcements.', color: 'text-brand-indigo', bg: 'bg-brand-indigo/10', border: 'border-brand-indigo' },
  { time: '8:30 AM', icon: <Sun className="w-5 h-5" />, activity: 'Morning Classes', desc: 'First two periods — core subjects like Mathematics, Science, or Languages.', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500' },
  { time: '10:00 AM', icon: <BookOpen className="w-5 h-5" />, activity: 'Short Break', desc: 'A refreshing 15-minute break — snack time and free play in the courtyard.', color: 'text-brand-coral', bg: 'bg-brand-coral/10', border: 'border-brand-coral' },
  { time: '10:15 AM', icon: <FlaskConical className="w-5 h-5" />, activity: 'Lab / Activity Block', desc: 'Hands-on Science, Computer, or Maths lab sessions for practical learning.', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500' },
  { time: '12:00 PM', icon: <UtensilsCrossed className="w-5 h-5" />, activity: 'Lunch Break', desc: 'Nutritious hot meal, supervised dining, handwashing routine, and social time.', color: 'text-brand-violet', bg: 'bg-brand-violet/10', border: 'border-brand-violet' },
  { time: '12:45 PM', icon: <Pencil className="w-5 h-5" />, activity: 'Afternoon Classes', desc: 'Subjects like Social Studies, Languages, Art, or exam revision for senior grades.', color: 'text-sky-500', bg: 'bg-sky-500/10', border: 'border-sky-500' },
  { time: '2:30 PM', icon: <Users className="w-5 h-5" />, activity: 'Clubs & Activities', desc: 'Sports, drama, robotics, music, dance — extra-curricular enrichment for all grades.', color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500' },
  { time: '3:30 PM', icon: <Bus className="w-5 h-5" />, activity: 'Dismissal', desc: 'Safe hand-off to parents or school transport with daily diary updates.', color: 'text-brand-navy dark:text-white', bg: 'bg-brand-navy/10', border: 'border-brand-navy' },
];

export default function Schedule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-brand-navy py-24 relative overflow-hidden" ref={containerRef}>
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-indigo/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-violet/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <p className="text-sm tracking-widest uppercase font-bold mb-3 text-brand-sky">
            A Day at WonderKids
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Every Moment Counts
          </h2>
          <p className="max-w-2xl mx-auto text-brand-slate text-lg leading-relaxed text-slate-300">
            See how we structure our day to balance rigorous learning with play, creativity, and rest.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Track */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-white dark:bg-brand-navy/10 md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Fill Line */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 w-1 bg-gradient-to-b from-brand-sky to-brand-violet md:-translate-x-1/2 rounded-full z-0"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12">
            {timeline.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={step.time} className={`relative flex items-center md:justify-between w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  
                  {/* Empty space for desktop alternating layout */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Center Node */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="absolute left-6 md:left-1/2 w-8 h-8 md:w-12 md:h-12 bg-brand-navy border-4 border-brand-light rounded-full -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                  >
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-brand-sky" />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="w-full md:w-[45%] pl-16 md:pl-0"
                  >
                    <div className={`glass-dark p-6 md:p-8 rounded-3xl border-t-4 ${step.border} group hover:bg-white dark:bg-brand-navy/5 transition-colors duration-300`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${step.bg} ${step.color}`}>
                          {step.icon}
                        </div>
                        <div>
                          <div className={`text-sm font-bold tracking-wider mb-1 ${step.color}`}>
                            {step.time}
                          </div>
                          <h3 className="text-xl font-bold text-white">
                            {step.activity}
                          </h3>
                        </div>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
