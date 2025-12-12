
import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Headphones, Play, Pause, Volume2, Moon, Sun, CloudRain, Brain, Activity, Zap, Wind, CheckCircle2 } from 'lucide-react';

const FocusAudio: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 bg-purple-50/50 relative overflow-hidden" ref={elementRef}>
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className={`container mx-auto px-4 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Headphones size={16} />
            <span>Focus & Wellness</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Study Better with Science-Backed Audio
          </h2>
          <p className="text-xl text-gray-600">
            Binaural beats, Lo-Fi music, nature sounds — AI plays the right audio at the right time.
          </p>
        </div>

        {/* The Hook Stat */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-xl shadow-purple-900/5 border border-purple-100 mb-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600"></div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="bg-purple-100 p-4 rounded-full">
               <Activity className="text-purple-600 w-8 h-8" />
            </div>
            <div>
               <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
                 🎧 40Hz Gamma Waves = <span className="text-purple-600">23% Better Focus</span>
               </h3>
               <p className="text-gray-500 text-lg">
                 Students using focus audio score higher and feel less stressed. Kalvi AI knows exactly when to play what.
               </p>
            </div>
          </div>
        </div>

        {/* Audio Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 1: Deep Focus */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Brain size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">🧠 Deep Focus</h3>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li>• 40Hz Gamma Binaural</li>
              <li>• Lo-Fi Study Beats</li>
              <li>• Classical Mozart</li>
            </ul>
            <div className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full inline-block">
              Improve concentration by 40%
            </div>
          </div>

          {/* Card 2: Anxiety Relief */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Wind size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">😌 Anxiety Relief</h3>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li>• Alpha & Theta Waves</li>
              <li>• Rain & Nature Sounds</li>
              <li>• Guided Breathing (4-7-8)</li>
            </ul>
            <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full inline-block">
              Calm your mind before exams
            </div>
          </div>

          {/* Card 3: Better Sleep */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Moon size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">😴 Better Sleep</h3>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li>• Delta Waves (Deep)</li>
              <li>• White/Brown/Pink Noise</li>
              <li>• Sleep Meditation</li>
            </ul>
            <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full inline-block">
              Wake up refreshed, not tired
            </div>
          </div>

          {/* Card 4: Energy Boost */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">💪 Energy Boost</h3>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li>• High Beta Waves</li>
              <li>• Upbeat Instrumental</li>
              <li>• Morning Energy Mix</li>
            </ul>
            <div className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full inline-block">
              Start your day energized
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Player Visual */}
          <div className="relative">
            {/* Main Player Mockup */}
            <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl text-white relative z-10 border border-gray-800">
               <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center animate-pulse">
                      <Brain size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm">40Hz Gamma Focus</div>
                      <div className="text-xs text-purple-400">Deep Work Mode</div>
                    </div>
                 </div>
                 <Headphones size={20} className="text-gray-400" />
               </div>

               {/* Waveform Visualization */}
               <div className="flex items-center justify-center space-x-1 h-12 mb-6">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-purple-500 rounded-full animate-bounce"
                      style={{ 
                        height: `${Math.random() * 100}%`,
                        animationDuration: `${0.8 + Math.random() * 0.5}s`
                      }} 
                    ></div>
                  ))}
               </div>

               <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-6">
                 <span>12:34</span>
                 <span>45:00</span>
               </div>

               <div className="flex items-center justify-center space-x-8 mb-6">
                  <Volume2 size={20} className="text-gray-400" />
                  <div className="w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                    <Pause fill="currentColor" size={20} />
                  </div>
                  <Activity size={20} className="text-purple-400" />
               </div>

               {/* Category Tabs */}
               <div className="grid grid-cols-4 gap-2">
                 <button className="bg-purple-600 text-white text-[10px] font-bold py-2 rounded-lg">Focus</button>
                 <button className="bg-gray-800 text-gray-400 text-[10px] font-bold py-2 rounded-lg hover:bg-gray-700">Calm</button>
                 <button className="bg-gray-800 text-gray-400 text-[10px] font-bold py-2 rounded-lg hover:bg-gray-700">Sleep</button>
                 <button className="bg-gray-800 text-gray-400 text-[10px] font-bold py-2 rounded-lg hover:bg-gray-700">Energy</button>
               </div>
            </div>

            {/* AI Notification Bubble */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-purple-100 max-w-xs z-20 animate-bounce duration-[3000ms]">
               <div className="flex items-start space-x-3">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex-shrink-0"></div>
                 <div>
                   <p className="text-xs font-bold text-gray-900 mb-1">AI Suggestion</p>
                   <p className="text-xs text-gray-600">"It's 10 PM. Switching to calmer <span className="text-purple-600 font-bold">Alpha Waves</span> to help you wind down while studying."</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Right: AI Smart Features & Science */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="text-purple-600 mr-2" fill="currentColor" />
                AI plays the right sound at the right time
              </h3>
              <div className="space-y-4">
                 <div className="flex items-start">
                   <div className="bg-purple-100 p-1 rounded mr-3 mt-1"><CheckCircle2 size={14} className="text-purple-700"/></div>
                   <p className="text-gray-600 text-sm"><span className="font-bold text-gray-900">Exam tomorrow?</span> Automatically plays pre-exam anxiety relief.</p>
                 </div>
                 <div className="flex items-start">
                   <div className="bg-purple-100 p-1 rounded mr-3 mt-1"><CheckCircle2 size={14} className="text-purple-700"/></div>
                   <p className="text-gray-600 text-sm"><span className="font-bold text-gray-900">4 hours non-stop?</span> Time for a calming break mix.</p>
                 </div>
                 <div className="flex items-start">
                   <div className="bg-purple-100 p-1 rounded mr-3 mt-1"><CheckCircle2 size={14} className="text-purple-700"/></div>
                   <p className="text-gray-600 text-sm"><span className="font-bold text-gray-900">Morning study?</span> High-energy Beta waves to wake you up.</p>
                 </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
               <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Based on Neuroscience Research</h4>
               <ul className="space-y-2 text-sm text-gray-600">
                 <li className="flex items-center"><Brain size={14} className="mr-2 text-gray-400"/> 40Hz Gamma waves improve memory & focus</li>
                 <li className="flex items-center"><CloudRain size={14} className="mr-2 text-gray-400"/> Nature sounds lower cortisol (stress hormone)</li>
                 <li className="flex items-center"><Wind size={14} className="mr-2 text-gray-400"/> Alpha waves reduce anxiety by 30%</li>
               </ul>
               <div className="mt-4 text-xs text-gray-500 flex items-center">
                 <Headphones size={12} className="mr-1"/> Headphones recommended for Binaural beats
               </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
               <button className="w-full sm:w-auto px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 transition-all hover:-translate-y-0.5">
                 🎧 Try Focus Audio — Free
               </button>
               <span className="text-xs font-medium text-gray-500">Free to use • 50+ Tracks</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FocusAudio;
