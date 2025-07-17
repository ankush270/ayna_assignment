const Footer = () => (
  <footer className="border-t border-gray-200 bg-white py-8 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <span className="inline-block w-8 h-8 bg-primary rounded-full" />
        <span className="font-bold text-lg text-gray-900 font-poppins">AYNA</span>
        <span className="text-gray-400 ml-2 text-sm">Collect. Improve. Succeed.</span>
      </div>
      {/* Right: Nav Links */}
      <nav className="flex flex-wrap gap-4 text-gray-500 text-sm">
        <a href="/" className="hover:text-primary transition-colors">Home</a>
        <a href="/login" className="hover:text-primary transition-colors">Login</a>
        <a href="/register" className="hover:text-primary transition-colors">Register</a>
        <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
        <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
        <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
      </nav>
    </div>
  </footer>
);

export default Footer; 