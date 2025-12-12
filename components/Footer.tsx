
import React from 'react';
import { BookOpen, Twitter, Linkedin, Instagram, Youtube, Github } from 'lucide-react';
import { FAQS } from '../constants';

interface FooterProps {
  onStart?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onStart }) => {
  return (
    <>
      {/* SECTION 12: SIMPLE CTA (No Pricing) */}
      <section className="py-24 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Improving Today — It's Free</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Upload your first subject and see Kalvi AI in action.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto mb-8">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
            />
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-black/20 whitespace-nowrap"
            >
              🚀 Get Started Free
            </button>
          </div>
          <div className="text-sm text-blue-200 font-medium">
            No credit card required • Works for all exams • Your data stays private
          </div>
        </div>
      </section>

      {/* SECTION 13: FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">❓ Common Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-medium text-gray-900 list-none hover:bg-gray-100 transition-colors">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-gray-600 px-6 pb-6 text-sm leading-relaxed bg-white pt-2 border-t border-gray-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 text-white mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">KALVI AI</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Your AI-Powered Self-Improvement Companion. Helping students succeed in academics, career, and life.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">For Students</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Life Areas</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <div>&copy; {new Date().getFullYear()} Kalvi AI Inc. All rights reserved.</div>
            <div className="mt-4 md:mt-0 flex items-center">
              Made with <span className="text-red-500 mx-1">❤️</span> for every student's success
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
