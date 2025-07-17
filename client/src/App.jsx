import React from 'react'
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import LiveDemoSection from './LiveDemoSection';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';

function App() {
  return (
    <main className="font-inter bg-gradient-to-b from-white to-slate-50 min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LiveDemoSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}

export default App;
