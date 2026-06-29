import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';
import { Award, Heart, BookOpen, Music, Star, GraduationCap } from 'lucide-react';
import WaveDivider from '../components/WaveDivider';
import CTA from '../components/CTA';
import { useFetch } from '../hooks/useApi';

const iconMap: Record<string, any> = { Heart, BookOpen, GraduationCap, Music, Award, Star };

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

export default function TeachersPage() {
  const { data: teachers, loading, error } = useFetch<TeacherType[]>('/teachers');

  const getColorClasses = (colorTheme: string) => {
    switch (colorTheme) {
      case 'primary': return { bg: 'bg-primary/10', text: 'text-primary', badge: 'bg-primary text-white' };
      case 'secondary': return { bg: 'bg-secondary/10', text: 'text-secondary', badge: 'bg-secondary text-white' };
      case 'tertiary': return { bg: 'bg-tertiary/10', text: 'text-tertiary', badge: 'bg-tertiary text-white' };
      default: return { bg: 'bg-slate-100', text: 'text-slate-600', badge: 'bg-slate-500 text-white' };
    }
  };

  return (
    <PageWrapper className="pt-32 md:pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="font-display-lg text-5xl md:text-7xl text-primary mb-6"
        >
          Our Teachers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          className="font-body-lg text-xl text-on-surface-variant dark:text-slate-300 max-w-2xl mb-12"
        >
          Meet the passionate, certified educators who make the magic happen every day at WonderKids.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-8 bg-surface-container-low rounded-[2rem] border-2 border-outline-variant/30"
        >
          {[
            { value: '100%', label: 'Certified Teachers' },
            { value: '8+', label: 'Years Avg. Experience' },
            { value: '25+', label: 'Staff Members' },
            { value: '1:6', label: 'Teacher–Child Ratio' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black text-primary font-display-lg">{value}</div>
              <div className="text-sm text-on-surface-variant dark:text-slate-300 font-semibold mt-1 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Teacher Cards Grid */}
        {loading ? (
          <div className="text-center py-12 text-brand-slate">Loading teachers...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Failed to load teachers.</div>
        ) : teachers?.length === 0 ? (
          <div className="text-center py-12 text-brand-slate">No teachers found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers?.map((teacher, i) => {
              const Icon = iconMap[teacher.iconName] || Heart;
              const colors = getColorClasses(teacher.colorTheme);
              
              return (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.08 }}
                  className="bg-white dark:bg-brand-navy rounded-[2.5rem] p-8 shadow-lg hover:shadow-2xl border-4 border-transparent hover:border-outline-variant/30 transition-all duration-300 flex flex-col"
                >
                  {/* Avatar + Badge */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-md bg-slate-100 flex items-center justify-center">
                        {teacher.avatarUrl ? (
                          <img src={teacher.avatarUrl} alt={teacher.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl font-bold text-slate-400">{teacher.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${colors.bg} ${colors.text} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface dark:text-white text-xl leading-tight">{teacher.name}</h3>
                      <p className={`text-sm font-bold ${colors.text} mt-0.5`}>{teacher.title}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${colors.badge}`}>
                        {teacher.experience} Experience
                      </span>
                    </div>
                  </div>

                  {/* Specialization pill */}
                  <div className={`inline-flex items-center gap-2 ${colors.bg} ${colors.text} px-4 py-2 rounded-full text-sm font-bold mb-4 self-start`}>
                    {teacher.specialization}
                  </div>

                  {/* Bio */}
                  <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed flex-grow">{teacher.bio}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      
      <WaveDivider color="var(--sky)" flip />
      <CTA />
    </PageWrapper>
  );
}
