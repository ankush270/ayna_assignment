import { useState } from 'react';
import { PlayCircle } from 'lucide-react';

const LiveDemoSection = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 font-poppins">Live Demo Preview</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Sample Form Preview */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="w-full h-40 bg-primary/10 rounded-lg mb-4 animate-pulse" />
          <button
            className="inline-flex items-center px-5 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:scale-105 hover:bg-primary-dark transition-transform focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setOpen(true)}
          >
            <PlayCircle className="mr-2 w-5 h-5" /> Try it
          </button>
        </div>
        {/* Dashboard Preview */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="w-full h-40 bg-primary/5 rounded-lg animate-pulse" />
          <span className="text-gray-500 text-xs mt-2">Dashboard preview</span>
        </div>
      </div>
      {/* Modal (scaffold only) */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Demo Form (Coming Soon)</h3>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LiveDemoSection; 