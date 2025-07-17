import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  Zap,
  Shield,
  Globe,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    product: [
      { name: 'Form Builder', href: '/builder' },
      { name: 'Analytics', href: '/analytics' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms', href: '/terms' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];



  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
      <div className="absolute top-0 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                          {/* Top Section */}
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
           {/* Brand Section */}
           <div className="lg:col-span-1">
                         <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
                             <div>
                 <h3 className="font-bold text-2xl text-white">AYNA</h3>
                 <p className="text-gray-400 text-base">Collect. Improve. Succeed.</p>
               </div>
            </div>
            
                         <p className="text-gray-300 mb-3 leading-relaxed text-base">
               Transform your feedback collection.
             </p>

                                      {/* Newsletter Signup */}
             <div className="space-y-2">
               <h4 className="font-semibold text-white flex items-center gap-2 text-base">
                 <Mail className="w-4 h-4" />
                 Stay Updated
               </h4>
               <form onSubmit={handleSubscribe} className="flex gap-2">
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Enter your email"
                   className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
                 />
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   type="submit"
                   className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-1 text-base"
                 >
                   <ArrowRight className="w-3 h-3" />
                 </motion.button>
               </form>
               {isSubscribed && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="text-green-400 text-sm flex items-center gap-1"
                 >
                   <CheckCircle className="w-3 h-3" />
                   Subscribed!
                 </motion.div>
               )}
             </div>
          </div>

                                {/* Links Sections */}
           {Object.entries(footerLinks).map(([category, links]) => (
             <div key={category} className="space-y-2">
               <h4 className="font-semibold text-white capitalize text-base">
                 {category === 'product' && <Zap className="w-4 h-4 inline mr-1" />}
                 {category === 'support' && <Shield className="w-4 h-4 inline mr-1" />}
                 {category === 'legal' && <Globe className="w-4 h-4 inline mr-1" />}
                 {category}
               </h4>
               <ul className="space-y-1">
                 {links.map((link) => (
                   <li key={link.name}>
                     <a
                       href={link.href}
                       className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                     >
                       {link.name}
                     </a>
                   </li>
                 ))}
               </ul>
             </div>
           ))}
        </div>

                 

                          {/* Bottom Section */}
         <div className="border-t border-white/10 pt-3">
           <div className="flex flex-col md:flex-row items-center justify-between gap-3">
             {/* Copyright */}
             <div className="text-gray-400 text-base">
               <span>© 2024 AYNA</span>
             </div>

             {/* Social Links */}
             <div className="flex items-center gap-2">
               {socialLinks.map(({ icon: Icon, href, label }) => (
                 <motion.a
                   key={label}
                   href={href}
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.95 }}
                   className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 rounded flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                   aria-label={label}
                 >
                   <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                 </motion.a>
               ))}
             </div>
           </div>
         </div>
      </div>

                    {/* Contact Info */}
       <div className="relative border-t border-white/10 bg-black/20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
           <div className="flex items-center justify-center text-gray-400 text-sm">
             <Mail className="w-4 h-4 mr-1" />
             <span>hello@ayna.com</span>
           </div>
         </div>
       </div>
    </footer>
  );
};

export default Footer; 