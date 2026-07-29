import React from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Programs from '../components/Programs';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import PageWrapper from '../components/PageWrapper';
import { NotificationToast } from '../components/NotificationToast';
import AnnouncementBanner from '../components/AnnouncementBanner';
import { useSeo } from '../hooks/useSeo';

export default function Home() {
  useSeo({
    title: 'WonderKids School | CBSE Nursery to Grade 10',
    description: 'From Nursery to Grade 10, WonderKids provides a world-class, CBSE-aligned education designed to build character, curiosity, and excellence.',
    path: '/',
  });

  return (
    <PageWrapper>
      <AnnouncementBanner />
      <Hero />
      <StatsBar />
      <Programs />
      <Features />
      <FAQ />
      <CTA />
      <NotificationToast />
    </PageWrapper>
  );
}
