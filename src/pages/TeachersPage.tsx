import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';
import { Award, Heart, BookOpen, Music, Star, GraduationCap } from 'lucide-react';
import WaveDivider from '../components/WaveDivider';
import CTA from '../components/CTA';
import { useFetch } from '../hooks/useApi';
import PageHero3D from '../components/PageHero3D';
import TiltCard from '../components/ui/TiltCard';
import { useSeo } from '../hooks/useSeo';

interface TeacherType {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  bio: string;
  avatarUrl: string | null;
  iconName: string;
  colorTheme: string;
}

const iconMap: Record<string, any> = {
  Award, Heart, BookOpen, Music, Star, GraduationCap
};

const FALLBACK_TEACHERS: TeacherType[] = [
  { id: '1', name: 'Sarah Jenkins', title: 'Head of English', specialization: 'Literature', experience: '12', bio: 'Passionate about bringing stories to life and helping students find their unique voice.', avatarUrl: null, iconName: 'BookOpen', colorTheme: 'primary' },
  { id: '2', name: 'Michael Chen', title: 'Science Teacher', specialization: 'Physics', experience: '8', bio: 'Dedicated to making complex scientific concepts accessible through hands-on experiments.', avatarUrl: null, iconName: 'Star', colorTheme: 'secondary' },
  { id: '3', name: 'Priya Sharma', title: 'Math Teacher', specialization: 'Calculus', experience: '15', bio: 'Believes that every student can excel in mathematics with the right guidance and practice.', avatarUrl: null, iconName: 'Award', colorTheme: 'tertiary' },
  { id: '4', name: 'David Thompson', title: 'Music Director', specialization: 'Choir & Band', experience: '10', bio: 'Fostering creativity and teamwork through the universal language of music.', avatarUrl: null, iconName: 'Music', colorTheme: 'primary' },
  { id: '5', name: 'Emma Watson', title: 'Art Teacher', specialization: 'Fine Arts', experience: '6', bio: 'Encouraging self-expression and imagination through various artistic mediums.', avatarUrl: null, iconName: 'Heart', colorTheme: 'secondary' },
  { id: '6', name: 'James Wilson', title: 'PE Instructor', specialization: 'Athletics', experience: '9', bio: 'Promoting physical fitness, sportsmanship, and healthy lifestyle choices.', avatarUrl: null, iconName: 'Award', colorTheme: 'tertiary' }
];

export default function TeachersPage() {
  const { data: teachers, loading } = useFetch<TeacherType[]>('Teacher', FALLBACK_TEACHERS);

  useSeo({
    title: 'Our Faculty | WonderKids School Teachers',
    description: 'Meet the passionate, certified educators who make the magic happen every day at WonderKids School, from Nursery to Grade 10.',
    path: '/teachers',
  });

  const getColorClasses = (colorTheme: string) => {
    switch (colorTheme) {
      case 'primary': return { bg: 'bg-primary', light: 'bg-primary/20', text: 'text-primary', badge: 'bg-primary text-white' };
      case 'secondary': return { bg: 'bg-secondary', light: 'bg-secondary/20', text: 'text-secondary', badge: 'bg-secondary text-white' };
      case 'tertiary': return { bg: 'bg-tertiary', light: 'bg-tertiary/20', text: 'text-tertiary', badge: 'bg-tertiary text-white' };
      default: return { bg: 'bg-slate-500', light: 'bg-slate-200', text: 'text-slate-600', badge: 'bg-slate-500 text-white' };
    }
  };

  return (
    <PageWrapper className="pt-20 md:pt-24 pb-16 md:pb-20">
      <PageHero3D 
        title={<>Our <span className="text-gradient">Teachers</span></>}
        description="Meet the passionate, certified educators who make the magic happen every day at WonderKids."
        color="primary"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32 mt-8 md:mt-12">
        {/* Stats row - Interactive 3D pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 md:mb-24"
        >
          {[
            { value: '100%', label: 'Certified' },
            { value: '8+', label: 'Years Avg. Exp' },
            { value: '25+', label: 'Staff Members' },
            { value: '1:6', label: 'Teacher–Child Ratio' },
          ].map(({ value, label }, i) => (
            <TiltCard key={label} maxRotation={15} scale={1.1}>
              <div className="bg-white/90 dark:bg-brand-navy/90 glass-dark px-6 md:px-10 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2rem] border-2 md:border-4 border-white dark:border-white/10 shadow-xl flex flex-col items-center justify-center min-w-[150px] md:min-w-[200px]">
                <div className="text-3xl md:text-4xl font-black text-primary font-display-lg drop-shadow-sm mb-1 md:mb-2">{value}</div>
                <div className="text-[10px] md:text-xs text-on-surface-variant dark:text-slate-300 font-bold uppercase tracking-widest">{label}</div>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* Teacher Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {teachers.map((teacher, i) => {
              const Icon = iconMap[teacher.iconName] || Heart;
              const colors = getColorClasses(teacher.colorTheme);
              
              return (
                <TiltCard key={teacher.id} maxRotation={10} scale={1.03} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.1 }}
                    className="bg-white/90 dark:bg-brand-navy/90 glass-dark rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10 shadow-xl border-4 border-white dark:border-white/10 flex flex-col h-full relative overflow-hidden group"
                  >
                    {/* Background glow on hover */}
                    <div className={`absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2 ${colors.bg}`} />

                    {/* Avatar + Badge */}
                    <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8 relative z-10">
                      <div className="relative">
                        <div className={`w-20 md:w-24 h-20 md:h-24 rounded-[1rem] md:rounded-[1.5rem] overflow-hidden border-4 border-white shadow-lg bg-white flex items-center justify-center transform group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300`}>
                          {teacher.avatarUrl ? (
                            <img src={teacher.avatarUrl} alt={teacher.name} className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <span className={`text-3xl md:text-4xl font-display-md font-black ${colors.text}`}>{teacher.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className={`absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 w-8 md:w-10 h-8 md:h-10 ${colors.bg} text-white rounded-full flex items-center justify-center border-4 border-white shadow-md transform group-hover:rotate-12 transition-transform duration-300`}>
                          <Icon className="w-4 md:w-5 h-4 md:h-5" />
                        </div>
                      </div>
                      <div>
                        <h2 className="font-display-sm font-bold text-brand-navy dark:text-white text-xl md:text-2xl leading-tight mb-1">{teacher.name}</h2>
                        <p className={`text-xs md:text-sm font-bold ${colors.text} uppercase tracking-wider font-label-caps`}>{teacher.title}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                      <span className={`inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold shadow-inner ${colors.light} ${colors.text}`}>
                        {teacher.specialization}
                      </span>
                      <span className={`inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold shadow-inner bg-slate-100 dark:bg-white/10 text-brand-slate dark:text-slate-200`}>
                        {teacher.experience} Exp
                      </span>
                    </div>

                    {/* Bio */}
                    <div className="w-full h-px bg-slate-100 dark:bg-white/10 mb-4 md:mb-6" />
                    <p className="text-brand-slate dark:text-slate-300 leading-relaxed font-medium flex-grow text-sm md:text-[15px] relative z-10">
                      {teacher.bio}
                    </p>
                  </motion.div>
                </TiltCard>
              );
            })}
          </div>
      </div>
      
      <WaveDivider color="var(--sky)" flip />
      <CTA />
    </PageWrapper>
  );
}
