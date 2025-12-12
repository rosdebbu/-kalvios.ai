
import React from 'react';
import { Play, CheckCircle, Upload } from 'lucide-react';

interface HeroProps {
  onStart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gray-50">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white text-primary rounded-full text-sm font-semibold mb-8 border border-blue-100 shadow-sm animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          The AI Platform for Complete Self-Improvement
        </div>

        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
          Upload Your Syllabus. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Let AI Help You Improve.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          Kalvi AI organizes your entire student life — notes, exams, money, and career. 
          It doesn't just give advice; it actively helps you grow.
        </p>

        <p className="text-sm md:text-base text-gray-500 font-medium mb-10 max-w-4xl mx-auto">
          For School • College • Competitive Exams (JEE, NEET, UPSC) • Job Seekers
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-xl hover:bg-primary-hover shadow-xl shadow-primary/25 transition-all hover:-translate-y-1 w-full sm:w-auto"
          >
            🚀 Start Your Improvement Journey
          </button>
          <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 text-lg font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center w-full sm:w-auto">
            <Play className="w-5 h-5 mr-2 fill-current" /> See How It Works
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium mb-16">
          <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1.5 text-success" /> Free to start</span>
          <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1.5 text-success" /> Works for all exams</span>
          <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1.5 text-success" /> Upload your content</span>
        </div>

        {/* Dashboard Mockup Visual */}
        <div className="relative mx-auto max-w-5xl mt-8">
           {/* Floating "Upload" card */}
           <div className="absolute -top-12 left-4 md:-left-8 z-20 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center space-x-4 animate-bounce duration-[2000ms]">
              <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                <Upload size={24} />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-400 uppercase">Step 1</div>
                <div className="text-sm font-bold text-gray-900">Uploading Physics Notes...</div>
              </div>
           </div>

           {/* Floating "Improvement" card */}
           <div className="absolute -top-4 right-4 md:-right-12 z-20 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center space-x-4 animate-pulse">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <TrendingUpIcon />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-gray-400 uppercase">Result</div>
                <div className="text-sm font-bold text-gray-900">Exam Readiness: +15%</div>
              </div>
           </div>

           {/* Main Interface */}
           <div className="bg-white rounded-t-2xl shadow-2xl border border-gray-200 overflow-hidden">
             <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4 space-x-2">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <div className="p-2 md:p-6 bg-gray-100">
                <div className="grid grid-cols-12 gap-4">
                   {/* Sidebar */}
                   <div className="hidden md:block col-span-3 space-y-2">
                      <div className="h-8 w-full bg-white rounded-lg border border-gray-200 shadow-sm"></div>
                      <div className="h-8 w-full bg-white rounded-lg border border-gray-200 shadow-sm"></div>
                      <div className="h-8 w-full bg-blue-50 border border-blue-200 rounded-lg shadow-sm"></div>
                      <div className="h-8 w-full bg-white rounded-lg border border-gray-200 shadow-sm"></div>
                   </div>
                   {/* Main */}
                   <div className="col-span-12 md:col-span-9 space-y-4">
                      {/* Top Stats */}
                      <div className="grid grid-cols-3 gap-4">
                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <div className="h-2 w-12 bg-gray-100 mb-2 rounded"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded"></div>
                         </div>
                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <div className="h-2 w-12 bg-gray-100 mb-2 rounded"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded"></div>
                         </div>
                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <div className="h-2 w-12 bg-gray-100 mb-2 rounded"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded"></div>
                         </div>
                      </div>
                      {/* Big Content */}
                      <div className="bg-white h-64 rounded-xl shadow-sm border border-gray-200 flex items-center justify-center flex-col">
                         <div className="text-gray-300 font-bold text-4xl mb-4">AI Analysis Dashboard</div>
                         <div className="text-gray-400">Your roadmap to improvement</div>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// Helper icon
const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

export default Hero;
