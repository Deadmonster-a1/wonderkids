import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Image as ImageIcon, CreditCard, MessageSquare, HelpCircle, Settings, LogOut, FileText, Inbox, Mail } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Programs', path: '/admin/programs', icon: <FileText className="w-5 h-5" /> },
  { name: 'Teachers', path: '/admin/teachers', icon: <Users className="w-5 h-5" /> },
  { name: 'Gallery', path: '/admin/gallery', icon: <ImageIcon className="w-5 h-5" /> },
  { name: 'Fees', path: '/admin/fees', icon: <CreditCard className="w-5 h-5" /> },
  { name: 'Testimonials', path: '/admin/testimonials', icon: <MessageSquare className="w-5 h-5" /> },
  { name: 'FAQs', path: '/admin/faqs', icon: <HelpCircle className="w-5 h-5" /> },
  { name: 'Inquiries', path: '/admin/inquiries', icon: <Inbox className="w-5 h-5" /> },
  { name: 'Messages', path: '/admin/messages', icon: <Mail className="w-5 h-5" /> },
  { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-navy flex font-body-md text-on-surface">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-brand-navy border-r border-slate-200 dark:border-white/10 flex flex-col fixed h-full z-20">
        <div className="h-20 flex items-center px-6 border-b border-slate-200 dark:border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-2 group">
            <span className="text-2xl transition-transform group-hover:scale-110">🎓</span>
            <span className="text-xl font-black tracking-tight text-brand-navy dark:text-white">
              Admin<span className="text-brand-indigo">Panel</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-brand-indigo text-white font-bold' 
                    : 'text-brand-slate hover:bg-slate-100 dark:hover:bg-brand-navy/50 hover:text-brand-navy dark:hover:text-white font-medium'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-grow ml-64 flex flex-col min-h-screen">
        <header className="h-20 bg-white dark:bg-brand-navy border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-brand-navy dark:text-white">
            {navItems.find(item => location.pathname.startsWith(item.path))?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-indigo text-white rounded-full flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        <main className="flex-grow p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
