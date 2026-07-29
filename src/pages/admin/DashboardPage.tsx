import React from 'react';
import { useFetch } from '../../hooks/useApi';
import { Users, FileText, Image as ImageIcon, MessageSquare, Mail, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { data: teachers } = useFetch<any[]>('/teachers');
  const { data: programs } = useFetch<any[]>('/programs');
  const { data: gallery } = useFetch<any[]>('/gallery');
  const { data: testimonials } = useFetch<any[]>('/testimonials');

  const stats = [
    { title: 'Total Teachers', value: teachers?.length || 0, icon: <Users className="w-8 h-8 text-blue-500" />, path: '/admin/teachers' },
    { title: 'Programs', value: programs?.length || 0, icon: <FileText className="w-8 h-8 text-emerald-500" />, path: '/admin/programs' },
    { title: 'Gallery Items', value: gallery?.length || 0, icon: <ImageIcon className="w-8 h-8 text-purple-500" />, path: '/admin/gallery' },
    { title: 'Testimonials', value: testimonials?.length || 0, icon: <MessageSquare className="w-8 h-8 text-orange-500" />, path: '/admin/testimonials' },
    { title: 'Messages', value: 'Manage', icon: <Mail className="w-8 h-8 text-rose-500" />, path: '/admin/messages' },
    { title: 'Inquiries', value: 'Manage', icon: <UserPlus className="w-8 h-8 text-indigo-500" />, path: '/admin/inquiries' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-2">Welcome Back</h2>
        <p className="text-brand-slate">Here's what's happening at WonderKids today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(s => (
          <Link 
            to={s.path}
            key={s.title}
            className="bg-white dark:bg-brand-navy/50 border border-slate-100 dark:border-white/10 rounded-2xl p-6 flex items-center gap-6 hover:shadow-lg transition-all group"
          >
            <div className="w-16 h-16 bg-slate-50 dark:bg-brand-navy rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              {s.icon}
            </div>
            <div>
              <p className="text-brand-slate text-sm font-bold mb-1">{s.title}</p>
              <h3 className="text-3xl font-black text-brand-navy dark:text-white">{s.value}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
