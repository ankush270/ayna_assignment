import { Wrench, Link, BarChart2, Shield, Sparkles, Zap, Eye, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: Wrench,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    title: 'Drag & Drop Form Builder',
    desc: 'Create stunning forms with our intuitive drag-and-drop interface. No coding required!',
    badge: 'Popular',
    stats: '2min setup',
  },
  {
    icon: Link,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    title: 'Instant Public Sharing',
    desc: 'Generate shareable links instantly. No user accounts needed for respondents.',
    badge: 'Fast',
    stats: '1-click share',
  },
  {
    icon: BarChart2,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    title: 'Real-time Analytics',
    desc: 'Watch responses pour in with live dashboards and beautiful data visualizations.',
    badge: 'Live',
    stats: 'Real-time',
  },
  {
    icon: Shield,
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    title: 'Enterprise Security',
    desc: 'Bank-level encryption keeps your data safe. GDPR compliant and privacy-first.',
    badge: 'Secure',
    stats: '99.9% uptime',
  },
];

const FeaturesSection = () => {
  const [animatedCards, setAnimatedCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setAnimatedCards(prev => [...prev, index]);
            }, index * 150);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50"></div>
      <div className="absolute top-6 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-6 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      
      {/* Section header */}
      <div className="relative text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">Why Choose Us</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
          Powerful Features for Modern Forms
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Everything you need to create, share, and analyze forms with style and efficiency
        </p>
      </div>

      {/* Features grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, gradient, bgGradient, title, desc, badge, stats }, i) => (
          <div
            key={title}
            className={`feature-card relative group cursor-pointer transition-all duration-700 ${
              animatedCards.includes(i) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Card background with gradient */}
            <div className={`relative h-full rounded-3xl bg-gradient-to-br ${bgGradient} p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2`}>
              
              {/* Badge */}
              <div className="absolute -top-3 -right-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient} text-white shadow-lg`}>
                  {badge}
                </span>
              </div>

              {/* Icon container with animated background */}
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-500`}>
                <Icon className="w-8 h-8 text-white" />
                
                {/* Animated ring effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500`}></div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors text-sm">
                  {desc}
                </p>
                
                {/* Stats indicator */}
                <div className="flex items-center gap-2 pt-1">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`}></div>
                  <span className="text-sm font-medium text-gray-500">{stats}</span>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Subtle border glow on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="relative text-center mt-10">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
          <Zap className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">Ready to get started?</span>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
            Try for Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 