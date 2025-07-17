import React from 'react'
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import LiveDemoSection from '../components/LiveDemoSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

const Hero = () => {
  return (
    <main className="font-inter bg-gradient-to-b from-white to-slate-50 min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LiveDemoSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}

export default Hero
