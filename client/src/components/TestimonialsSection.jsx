import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, Heart, TrendingUp, Users, Zap, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Alex Kim',
    role: 'Product Manager',
    company: 'TechFlow Inc.',
    quote: 'We improved customer feedback response by 60% in just one week. The real-time analytics helped us identify pain points instantly.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    improvement: '+60%',
    metric: 'Response Rate',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50'
  },
  {
    name: 'Priya Singh',
    role: 'HR Executive',
    company: 'Global Solutions',
    quote: 'Perfect for event feedback collection. No technical setup needed, and the beautiful forms engage our attendees perfectly.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    improvement: '+85%',
    metric: 'Engagement',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50'
  },
  {
    name: 'Jordan Lee',
    role: 'Operations Lead',
    company: 'InnovateCorp',
    quote: 'The dashboard insights are a game changer for our team. We can now make data-driven decisions with confidence.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 5,
    improvement: '+40%',
    metric: 'Efficiency',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50'
  },
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'GrowthLab',
    quote: 'The form builder is incredibly intuitive. We created our customer survey in minutes, not hours.',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    rating: 5,
    improvement: '+75%',
    metric: 'Time Saved',
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-50 to-red-50'
  },
  {
    name: 'Marcus Johnson',
    role: 'Customer Success',
    company: 'ScaleUp',
    quote: 'Our customer satisfaction scores increased dramatically after implementing these feedback forms.',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5,
    improvement: '+90%',
    metric: 'Satisfaction',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50'
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector('.testimonials-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonials-section py-6 w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50/30"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
      
      {/* Section header */}
      <div className="relative text-center mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1.5 rounded-full mb-2"
        >
          <Heart className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">Customer Success</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2"
        >
          Loved by Teams Worldwide
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          See how teams are transforming their feedback collection and improving their processes
        </motion.p>
      </div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative flex justify-center mb-4"
      >
                  <div className="grid grid-cols-3 gap-3 max-w-2xl">
          {[
            { icon: Users, value: '10K+', label: 'Active Users' },
            { icon: TrendingUp, value: '95%', label: 'Satisfaction' },
            { icon: Zap, value: '2.5x', label: 'Faster Setup' }
          ].map(({ icon: Icon, value, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center p-2 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <Icon className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                             <div className="text-xl font-bold text-gray-900 mb-1">{value}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Carousel */}
      <div className="relative max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
                             <div className={`bg-gradient-to-br ${currentTestimonial.bgColor} p-4 md:p-6 rounded-3xl border border-white/20 shadow-xl`}>
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                                     {/* Testimonial Content */}
                   <div className="space-y-3">
                    {/* Quote */}
                    <div className="relative">
                                             <Quote className="w-6 h-6 text-gray-400 mb-2" />
                      <blockquote className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                        "{currentTestimonial.quote}"
                      </blockquote>
                    </div>

                    {/* Author Info */}
                                         <div className="flex items-center gap-2">
                      <div className="relative">
                                                 <img 
                           src={currentTestimonial.avatar} 
                           alt={currentTestimonial.name} 
                           className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg" 
                         />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                                                 <div className="font-bold text-gray-900 text-sm">{currentTestimonial.name}</div>
                        <div className="text-gray-600">{currentTestimonial.role}</div>
                        <div className="text-sm text-gray-500">{currentTestimonial.company}</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-gray-600 ml-2">Verified Customer</span>
                    </div>
                  </div>

                                     {/* Improvement Stats */}
                   <div className="space-y-3">
                    <div className="text-center">
                                             <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${currentTestimonial.color} text-white px-4 py-2 rounded-full text-base font-bold shadow-lg`}>
                        <TrendingUp className="w-5 h-5" />
                        {currentTestimonial.improvement} Improvement
                      </div>
                    </div>
                    
                                         <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                      <div className="text-center">
                                                 <div className="text-xl font-bold text-gray-900 mb-1">{currentTestimonial.improvement}</div>
                        <div className="text-gray-600 font-medium">{currentTestimonial.metric}</div>
                        <div className="text-sm text-gray-500 mt-2">Average improvement across all users</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevTestimonial}
                        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </motion.button>
                      
                      <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentIndex 
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextTestimonial}
                        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
                 className="relative text-center mt-4"
      >
        <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-white/20">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Join thousands of satisfied customers</span>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
            Start Free Trial
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection; 