import { ClipboardList, Link2, BarChart, ArrowRight, CheckCircle, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Create Your Form',
    desc: 'Drag and drop form elements, customize questions, and design your perfect form in minutes',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    time: '2 minutes',
    features: ['Drag & Drop Builder', '100+ Templates', 'Custom Branding'],
  },
  {
    icon: Link2,
    title: 'Share Instantly',
    desc: 'Get a unique link to share with anyone. No registration required for respondents',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    time: '30 seconds',
    features: ['One-Click Sharing', 'QR Code Generation', 'Social Media Ready'],
  },
  {
    icon: BarChart,
    title: 'Analyze Results',
    desc: 'Watch responses pour in real-time with beautiful charts and detailed analytics',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    time: 'Live',
    features: ['Real-time Dashboard', 'Export to Excel', 'Advanced Analytics'],
  },
];

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector('.how-it-works-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section className="how-it-works-section py-8 w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50/30"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      <div className="relative text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-4"
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">Simple 3-Step Process</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3"
        >
          How It Works
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Get started in minutes with our simple, powerful form creation process
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative max-w-2xl mx-auto mb-6"
      >
        <div className="flex items-center justify-between">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                index <= activeStep 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-110' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {index < activeStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-bold text-sm">{index + 1}</span>
                )}
                {index === activeStep && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20"
                  />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={index < activeStep ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {steps.map(({ icon: Icon, title, desc, gradient, bgGradient, time, features }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 + i * 0.2 }}
            className={`relative group cursor-pointer transition-all duration-500 ${
              i === activeStep ? 'scale-105' : 'hover:scale-102'
            }`}
            onClick={() => setActiveStep(i)}
          >
            <div className={`relative h-full rounded-3xl bg-gradient-to-br ${bgGradient} p-5 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 ${
              i === activeStep ? 'ring-2 ring-purple-500/30' : ''
            }`}>
              
              <div className="absolute -top-3 -right-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient} text-white shadow-lg`}>
                  {time}
                </span>
              </div>

              <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-r ${gradient} p-2.5 mb-3 group-hover:scale-110 transition-transform duration-500`}>
                <Icon className="w-6 h-6 text-white" />

                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500`}></div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors text-sm">
                  {desc}
                </p>
           
                <div className="flex items-center gap-2 pt-0.5">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`}></div>
                  <span className="text-sm font-medium text-gray-500">Step {i + 1}</span>
                </div>
              </div>

              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
            </div>

            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

     
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="relative text-center mt-6"
      >
        <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-white/20">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Ready to create your first form?</span>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
            Get Started Free
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorksSection; 