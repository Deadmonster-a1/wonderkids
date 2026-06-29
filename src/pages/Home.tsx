import React from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Programs from '../components/Programs';
import Features from '../components/Features';
import Schedule from '../components/Schedule';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import FeeStructure from '../components/FeeStructure';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import PageWrapper from '../components/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <StatsBar />
      <Programs />
      <Features />
      <Schedule />
      <Gallery />
      <Testimonials />
      <FeeStructure />
      <FAQ />
      <CTA />
    </PageWrapper>
  );
}
