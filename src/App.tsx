import React from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundBubbles from './components/BackgroundBubbles';
import FloatingElements from './components/FloatingElements';

// Pages
import Home from './pages/Home';
import ProgramsPage from './pages/ProgramsPage';
import AboutUsPage from './pages/AboutUsPage';
import TeachersPage from './pages/TeachersPage';
import AdmissionsPage from './pages/AdmissionsPage';
import ContactPage from './pages/ContactPage';
import AcademicsPage from './pages/AcademicsPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import TeachersAdmin from './pages/admin/TeachersAdmin';
import ProgramsAdmin from './pages/admin/ProgramsAdmin';
import GalleryItemsAdmin from './pages/admin/GalleryItemsAdmin';
import FeeTiersAdmin from './pages/admin/FeeTiersAdmin';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin';
import FaqsAdmin from './pages/admin/FaqsAdmin';
import InquiriesAdmin from './pages/admin/InquiriesAdmin';
import MessagesAdmin from './pages/admin/MessagesAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001
  });
  
  // A playful rolling ball that follows the progress bar
  const ballX = useTransform(scaleX, [0, 1], ["0%", "100%"]);
  const ballRotation = useTransform(scaleX, [0, 1], [0, 720]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-50 pointer-events-none">
      <motion.div 
        className="absolute top-0 left-0 right-0 bottom-0 opacity-90" 
        style={{ scaleX, transformOrigin: "0%", background: 'linear-gradient(90deg, #1A2B4A, #3B4DC8)' }} 
      />
      <motion.div 
        className="absolute top-1/2 -mt-3.5 w-7 h-7 rounded-full shadow-md flex items-center justify-center text-[14px]"
        style={{ left: ballX, rotate: ballRotation, translateX: "-50%", background: '#FF6347' }}
      >
        ⭐
      </motion.div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="bg-surface font-body-md text-on-surface overflow-x-hidden relative selection:bg-primary selection:text-white min-h-screen flex flex-col">
      {!isAdmin && (
        <>
          <ScrollIndicator />
          <BackgroundBubbles />
          <Header />
        </>
      )}
      
      <main className={`relative z-10 flex-grow ${!isAdmin ? 'pt-24' : ''}`}>
        <AnimatePresence mode="wait">
          {/* @ts-expect-error key is a valid React prop but RoutesProps doesn't explicitly include it */}
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="teachers" element={<TeachersAdmin />} />
              <Route path="programs" element={<ProgramsAdmin />} />
              <Route path="gallery" element={<GalleryItemsAdmin />} />
              <Route path="fees" element={<FeeTiersAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="faqs" element={<FaqsAdmin />} />
              <Route path="inquiries" element={<InquiriesAdmin />} />
              <Route path="messages" element={<MessagesAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
              <Route path="*" element={<DashboardPage />} /> {/* Fallback for unbuilt admin pages */}
            </Route>
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdmin && (
        <>
          <FloatingElements />
          <Footer />
        </>
      )}
    </div>
  );
}
