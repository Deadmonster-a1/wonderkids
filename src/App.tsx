import React from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useOrganizationJsonLd } from './hooks/useSeo';
// Pages
import Home from './pages/Home';
import ProgramsPage from './pages/ProgramsPage';
import AboutUsPage from './pages/AboutUsPage';
import TeachersPage from './pages/TeachersPage';
import AdmissionsPage from './pages/AdmissionsPage';
import ContactPage from './pages/ContactPage';
import AcademicsPage from './pages/AcademicsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

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
import AnnouncementsAdmin from './pages/admin/AnnouncementsAdmin';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  useOrganizationJsonLd();

  return (
    <div className="bg-surface font-body-md text-on-surface relative selection:bg-primary selection:text-white min-h-screen flex flex-col transition-colors duration-300">
      {!isAdmin && (
        <Header />
      )}
      
      <main className={`relative z-10 flex-grow ${!isAdmin ? 'pt-24' : ''}`}>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

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
              <Route path="announcements" element={<AnnouncementsAdmin />} />
              <Route path="*" element={<DashboardPage />} /> {/* Fallback for unbuilt admin pages */}
            </Route>
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdmin && (
        <Footer />
      )}
    </div>
  );
}
