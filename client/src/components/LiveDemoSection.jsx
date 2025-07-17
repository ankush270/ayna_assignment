import { useState, useEffect } from 'react';
import { PlayCircle, BarChart3, Users, TrendingUp, Eye, Zap, Sparkles, X, ArrowRight, CheckCircle, Clock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveDemoSection = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    const section = document.querySelector('.live-demo-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const demoData = {
    form: {
      title: 'Interactive Form Builder',
      desc: 'Create and customize forms with our drag-and-drop interface',
      features: ['Drag & Drop Elements', 'Real-time Preview', 'Instant Publishing'],
      stats: { responses: 127, completion: '94%', time: '2.3 min' }
    },
    dashboard: {
      title: 'Live Analytics Dashboard',
      desc: 'Monitor responses and insights in real-time',
      features: ['Real-time Updates', 'Data Visualization', 'Export Options'],
      stats: { views: '1.2k', shares: 89, rating: 4.8 }
    }
  };

  const currentDemo = demoData[activeTab];

  return (
    <section className="live-demo-section py-12 w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-4"
        >
          <Zap className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">Live Preview</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4"
        >
          See It In Action
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Experience our powerful form builder and analytics dashboard firsthand
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative flex justify-center mb-8"
      >
        <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/20">
          {[
            { id: 'form', label: 'Form Builder', icon: PlayCircle },
            { id: 'dashboard', label: 'Analytics', icon: BarChart3 }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1 text-center text-sm font-medium text-gray-600">
                    {activeTab === 'form' ? 'Form Builder Demo' : 'Analytics Dashboard'}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {activeTab === 'form' ? (
                  <div className="space-y-4">
                    <div className="h-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="h-10 bg-indigo-500 rounded-lg flex-1 animate-pulse"></div>
                      <div className="h-10 bg-gray-300 rounded-lg w-20 animate-pulse"></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg animate-pulse"></div>
                      <div className="h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg animate-pulse"></div>
                      <div className="h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="absolute -bottom-4 -right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentDemo.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{currentDemo.desc}</p>
            </div>

            <div className="space-y-3">
              {currentDemo.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {Object.entries(currentDemo.stats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20"
                >
                  <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
                  <div className="text-xs text-gray-500 capitalize">{key}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Try Live Demo
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Live Demo</h3>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              

              <div className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Demo Coming Soon!</h4>
                  <p className="text-gray-600">
                    We're working hard to bring you an interactive demo. Stay tuned for the full experience!
                  </p>
                  <div className="flex items-center justify-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LiveDemoSection; 