// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Eye, EyeOff, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
 
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Form submitted:', formData);
     
//     }
//   };

//   const togglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md"
//       >

//         <div className="text-center mb-8">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//             className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
//           >
//             <Lock className="w-8 h-8 text-white" />
//           </motion.div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
//           <p className="text-gray-600">Sign in to your account to continue</p>
//         </div>

   
//         <motion.form
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           onSubmit={handleSubmit}
//           className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
//         >
          
//           <div className="mb-6">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                   errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                 }`}
//                 placeholder="Enter your email"
//               />
//             </div>
//             {errors.email && (
//               <motion.p
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-red-500 text-sm mt-1"
//               >
//                 {errors.email}
//               </motion.p>
//             )}
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                   errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                 }`}
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={togglePassword}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.password && (
//               <motion.p
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-red-500 text-sm mt-1"
//               >
//                 {errors.password}
//               </motion.p>
//             )}
//           </div>

     
//           <div className="flex items-center justify-between mb-6">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="ml-2 text-sm text-gray-600">Remember me</span>
//             </label>
//             <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
//               Forgot password?
//             </a>
//           </div>

        
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center group"
//           >
//             Sign in
//             <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </motion.button>

//           <div className="my-6 flex items-center">
//             <div className="flex-1 border-t border-gray-300"></div>
//             <span className="px-4 text-sm text-gray-500">or continue with</span>
//             <div className="flex-1 border-t border-gray-300"></div>
//           </div>

      
//           <div className="grid grid-cols-2 gap-3">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="button"
//               className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <Github className="w-5 h-5 mr-2" />
//               <span className="text-sm font-medium">GitHub</span>
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="button"
//               className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <Chrome className="w-5 h-5 mr-2" />
//               <span className="text-sm font-medium">Google</span>
//             </motion.button>
//           </div>

         
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
//                 Sign up
//               </a>
//             </p>
//           </div>
//         </motion.form>

       
//         <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
//         <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login; 