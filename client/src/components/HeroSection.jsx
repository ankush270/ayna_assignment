import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-16 bg-gradient-to-br from-white to-blue-50 min-h-[70vh] relative overflow-hidden">
    
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Collect Better Feedback,<br className="hidden md:block" /> <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">Instantly.</span>
        </h1>
        <h2 className="text-lg md:text-xl text-gray-600 mb-8 font-medium">
          Create beautiful forms. Share links. See feedback in real-time.
        </h2>
        <div className="flex gap-4">
          <Link to="/register" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors text-base md:text-lg">
            Create a Form
          </Link>
          <Link to="/demo" className="px-6 py-3 bg-white border border-blue-600 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 transition-colors text-base md:text-lg">
            Try Demo
          </Link>
          <Link to="/login" className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors text-base md:text-lg">
            Login
          </Link>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center mb-10 md:mb-0 relative animate-slide-in-right">
        <img
          src="/hero.svg"
          alt="Admin dashboard and mobile form mockup"
          className="max-w-xs md:max-w-md w-full drop-shadow-xl rounded-lg"
        />
      
        <style>{`
          @keyframes slide-in-right {
            0% { opacity: 0; transform: translateX(60px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-slide-in-right {
            animation: slide-in-right 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.2s both;
          }
        `}</style>
      </div>
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-0 top-0 w-2/3 h-2/3 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-40"></div>
      </div>
    </section>
  );
};

export default HeroSection; 