
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, BookOpen } from 'lucide-react';

interface NavbarProps {
  onLogin?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-gray-900">
            KALVI AI
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-primary font-medium transition-colors">Features</a>
          <div className="relative group">
            <button className="flex items-center text-gray-600 hover:text-primary font-medium transition-colors">
              For Students <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left p-2">
               <a href="#student-types" className="block px-4 py-2 hover:bg-gray-50 rounded text-gray-700">School</a>
               <a href="#student-types" className="block px-4 py-2 hover:bg-gray-50 rounded text-gray-700">College</a>
               <a href="#student-types" className="block px-4 py-2 hover:bg-gray-50 rounded text-gray-700">Competitive Exams</a>
               <a href="#student-types" className="block px-4 py-2 hover:bg-gray-50 rounded text-gray-700">Govt Exams</a>
               <a href="#student-types" className="block px-4 py-2 hover:bg-gray-50 rounded text-gray-700">Job Seekers</a>
            </div>
          </div>
          <a href="#life-areas" className="text-gray-600 hover:text-primary font-medium transition-colors">Life Areas</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-primary font-medium transition-colors">How It Works</a>
          <a href="#about" className="text-gray-600 hover:text-primary font-medium transition-colors">About</a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <button 
            onClick={onLogin}
            className="px-5 py-2.5 text-primary font-semibold border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={onLogin}
            className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            Get Started Free
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-gray-700 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t lg:hidden p-4 flex flex-col space-y-4">
          <a href="#features" className="text-gray-700 py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#student-types" className="text-gray-700 py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>For Students</a>
          <a href="#life-areas" className="text-gray-700 py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Life Areas</a>
          <a href="#how-it-works" className="text-gray-700 py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
          <hr className="border-gray-100" />
          <button onClick={() => { onLogin?.(); setIsMobileMenuOpen(false); }} className="w-full py-3 text-primary font-semibold border border-primary/20 rounded-lg">Login</button>
          <button onClick={() => { onLogin?.(); setIsMobileMenuOpen(false); }} className="w-full py-3 bg-primary text-white font-semibold rounded-lg">Get Started Free</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
