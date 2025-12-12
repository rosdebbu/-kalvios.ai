import React from 'react';
import { Bot, Zap, MessageSquare } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const AgenticDifference: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 bg-gray-50 overflow-hidden" ref={elementRef}>
      <div className={`container mx-auto px-4 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Bot size={18} /> <span>THE AGENTIC DIFFERENCE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🤖 AI That Does, Not Just Tells
          </h2>
          <p className="text-xl text-gray-500">Kalvi AI is your personal life assistant, not just a chatbot.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Left: Normal AI */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm opacity-80 relative">
            <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Normal AI
            </div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mr-4">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Passive Advice</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-tl-xl rounded-tr-xl rounded-br-xl text-gray-600 border border-gray-100">
                "You should make a study plan for your exam."
              </div>
              <div className="bg-gray-50 p-4 rounded-tl-xl rounded-tr-xl rounded-br-xl text-gray-600 border border-gray-100">
                "Try to track your expenses to save money."
              </div>
              <div className="bg-gray-50 p-4 rounded-tl-xl rounded-tr-xl rounded-br-xl text-gray-600 border border-gray-100">
                "Here is a list of internship websites."
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-red-400 font-medium">
              You still have to do all the work ❌
            </div>
          </div>

          {/* Right: Kalvi AI */}
          <div className="bg-white rounded-2xl p-8 border-2 border-primary shadow-2xl relative transform lg:scale-105 z-10">
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Kalvi AI
            </div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Active Improvement</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-tl-xl rounded-tr-xl rounded-br-xl text-gray-800 border border-blue-100 shadow-sm">
                <span className="font-semibold text-primary block mb-1">Study Plan Created ✓</span>
                "I created your 30-day study plan based on your exam date and weak areas. First task added to calendar."
              </div>
              <div className="bg-green-50 p-4 rounded-tl-xl rounded-tr-xl rounded-br-xl text-gray-800 border border-green-100 shadow-sm">
                 <span className="font-semibold text-green-600 block mb-1">Budget Alert ⚠️</span>
                "I analyzed your spending — you're overspending on food by ₹800. I've set a daily limit for next week."
              </div>
              <div className="bg-orange-50 p-4 rounded-tl-xl rounded-tr-xl rounded-br-xl text-gray-800 border border-orange-100 shadow-sm">
                 <span className="font-semibold text-orange-600 block mb-1">Internships Found 💼</span>
                "I found 5 internships matching your skills. Do you want me to track the deadlines for you?"
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-primary font-bold">
              AI does the work, you get the results ✅
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AgenticDifference;
