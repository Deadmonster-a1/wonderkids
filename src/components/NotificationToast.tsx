import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, User, MessageSquare } from 'lucide-react';

interface BaseNotification {
  id: string;
  type: 'application' | 'contact';
}

interface AppNotification extends BaseNotification {
  type: 'application';
  studentName: string;
  parentName: string;
  gradeApplying: string;
}

interface ContactNotification extends BaseNotification {
  type: 'contact';
  name: string;
  email: string;
}

type NotificationData = AppNotification | ContactNotification;

export function NotificationToast() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    // Connect to SSE stream
    const eventSource = new EventSource('/api/notifications/stream');

    const handleApplication = (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        const newNotif: AppNotification = { ...data, type: 'application' };
        setNotifications((prev) => [...prev, newNotif]);
        
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== newNotif.id));
        }, 5000);
      } catch (err) {
        console.error('Error parsing application notification', err);
      }
    };

    const handleContact = (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        const newNotif: ContactNotification = { ...data, type: 'contact' };
        setNotifications((prev) => [...prev, newNotif]);
        
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== newNotif.id));
        }, 5000);
      } catch (err) {
        console.error('Error parsing contact notification', err);
      }
    };

    eventSource.addEventListener('new_application', handleApplication);
    eventSource.addEventListener('new_contact', handleContact);

    return () => {
      eventSource.close();
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-brand-navy rounded-xl shadow-lg border border-slate-100 dark:border-white/10 p-4 flex items-start gap-4 min-w-[300px] pointer-events-auto"
            role="status"
          >
            <div className="bg-brand-indigo/10 p-2 rounded-lg text-brand-indigo shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-brand-navy dark:text-white">
                {notif.type === 'application' ? 'New Application!' : 'New Contact Message!'}
              </p>
              {notif.type === 'application' ? (
                <>
                  <p className="text-sm text-brand-slate mt-1 flex items-center gap-1">
                    <User className="w-3 h-3" /> {notif.studentName} ({notif.gradeApplying})
                  </p>
                  <p className="text-xs text-brand-slate/80 mt-1">
                    From: {notif.parentName}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-brand-slate mt-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> {notif.name}
                  </p>
                  <p className="text-xs text-brand-slate/80 mt-1">
                    Email: {notif.email}
                  </p>
                </>
              )}
            </div>
            <button
              onClick={() => removeNotification(notif.id)}
              className="text-brand-slate hover:text-brand-navy dark:hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
