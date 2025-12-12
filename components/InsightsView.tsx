
import React, { useState, useEffect } from 'react';
import { 
  Activity, Sunrise, Sun, Moon, Lightbulb, RefreshCw, 
  BookOpen, AlertTriangle, Smile, Cloud, Bot, Compass, 
  Shield, ArrowRight, Target, Flag, Zap, Brain
} from 'lucide-react';

const styles = `
  /* Advanced Glassmorphism Base (Shared) */
  .glass-workspace {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }
  
  /* Input Fields (Shared) */
  .agent-input {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.3s ease;
  }
  .agent-input:focus {
    background: rgba(30, 41, 59, 0.9);
    border-color: var(--accent-color);
    box-shadow: 0 0 15px var(--accent-glow);
  }

  /* --- INSIGHTS SPECIFIC STYLES --- */
  .energy-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    outline: none;
    background: rgba(255,255,255,0.1);
  }
  .energy-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #06B6D4;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid #0F172A;
    box-shadow: 0 0 10px #06B6D4;
  }
  
  .swot-card {
    backdrop-filter: blur(10px);
    background: rgba(6, 182, 212, 0.03);
    border: 1px solid rgba(6, 182, 212, 0.1);
    transition: all 0.3s;
  }
  .swot-card:hover {
    background: rgba(6, 182, 212, 0.08);
    border-color: rgba(6, 182, 212, 0.3);
    transform: translateY(-2px);
  }

  .retention-bar-bg {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 99px;
    overflow: hidden;
    height: 6px;
  }
  .retention-bar-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 1s ease-out, background-color 0.5s ease;
  }
`;

const InsightsView = () => {
  // Rhythm Finder State
  const [energy, setEnergy] = useState({ morning: 30, afternoon: 60, evening: 85 });
  const [chronotype, setChronotype] = useState('Night Owl');
  
  // Journal State
  const [journalText, setJournalText] = useState('');
  const [sentiment, setSentiment] = useState<'neutral' | 'anxious' | 'calm' | 'positive'>('neutral');
  
  // Retention State
  const [retentionTopics, setRetentionTopics] = useState([
    { id: 1, subject: 'Physics', topic: 'Rotational Motion', lastStudied: 3 }, 
    { id: 2, subject: 'Chemistry', topic: 'Thermodynamics', lastStudied: 7 }, 
    { id: 3, subject: 'Math', topic: 'Integration', lastStudied: 1 }, 
    { id: 4, subject: 'CS', topic: 'Data Structures', lastStudied: 14 }
  ]);
  
  // Notifications
  const [patternAlert, setPatternAlert] = useState(false);

  // Rhythm Logic
  useEffect(() => {
    if (energy.morning > 70 && energy.evening < 50) setChronotype('Early Bird');
    else if (energy.evening > 70 && energy.morning < 50) setChronotype('Night Owl');
    else setChronotype('Flexible');
  }, [energy]);

  // Sentiment Logic
  useEffect(() => {
    const text = journalText.toLowerCase();
    if (text.match(/stress|anx|worry|bad|fail|tired/)) setSentiment('anxious');
    else if (text.match(/happy|good|great|excit|love|calm/)) setSentiment('positive');
    else if (text.length > 10) setSentiment('calm');
    else setSentiment('neutral');
  }, [journalText]);

  // Pattern Hunter Sim
  useEffect(() => {
    const timer = setTimeout(() => setPatternAlert(true), 2500);
    const hideTimer = setTimeout(() => setPatternAlert(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  // Retention Logic (Simplified Forgetting Curve)
  const getRetention = (days: number) => {
    // R = e^(-t/S) approximated
    return Math.max(10, Math.floor(100 * Math.pow(0.85, days)));
  };

  const handleReview = (id: number) => {
    setRetentionTopics(prev => prev.map(t => t.id === id ? { ...t, lastStudied: 0 } : t));
  };

  // SVG Curve Path
  const getCurvePath = () => {
    // Mapping 0-100 inputs to graph coordinates (w: 300, h: 100)
    const m = 100 - energy.morning;
    const a = 100 - energy.afternoon;
    const e = 100 - energy.evening;
    return `M0 ${m} C75 ${m}, 75 ${a}, 150 ${a} C225 ${a}, 225 ${e}, 300 ${e}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 font-sans" style={{'--accent-color': '#06B6D4', '--accent-glow': 'rgba(6, 182, 212, 0.4)'} as any}>
      <style>{styles}</style>

      {/* Pattern Alert Toast */}
      {patternAlert && (
        <div className="fixed top-24 right-8 z-50 bg-white dark:bg-slate-800 border-l-4 border-cyan-500 p-4 rounded-lg shadow-2xl animate-in slide-in-from-right-10 flex items-start gap-3 max-w-sm">
           <div className="bg-cyan-500/20 p-2 rounded-full text-cyan-500"><Lightbulb size={18}/></div>
           <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Pattern Detected</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                 On days you skip <strong>Breakfast</strong> (Tuesdays), your <strong>Focus Score</strong> drops by 40%.
              </p>
           </div>
        </div>
      )}

      {/* 1. RHYTHM FINDER */}
      <div className="glass-workspace rounded-2xl p-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
               <div>
                  <h2 className="text-2xl font-bold text-white flex items-center">
                     <Activity className="mr-3 text-cyan-400"/> Bio-Rhythm Finder
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Calibrate your schedule to your biological clock.</p>
               </div>

               <div className="space-y-4">
                  <div>
                     <div className="flex justify-between text-xs text-gray-400 mb-2 font-bold uppercase">
                        <span className="flex items-center"><Sunrise size={14} className="mr-1"/> Morning Energy</span>
                        <span>{energy.morning}%</span>
                     </div>
                     <input type="range" min="0" max="100" value={energy.morning} onChange={e=>setEnergy({...energy, morning: parseInt(e.target.value)})} className="energy-slider bg-gradient-to-r from-gray-700 to-gray-700"/>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs text-gray-400 mb-2 font-bold uppercase">
                        <span className="flex items-center"><Sun size={14} className="mr-1"/> Afternoon Energy</span>
                        <span>{energy.afternoon}%</span>
                     </div>
                     <input type="range" min="0" max="100" value={energy.afternoon} onChange={e=>setEnergy({...energy, afternoon: parseInt(e.target.value)})} className="energy-slider bg-gradient-to-r from-gray-700 to-gray-700"/>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs text-gray-400 mb-2 font-bold uppercase">
                        <span className="flex items-center"><Moon size={14} className="mr-1"/> Evening Energy</span>
                        <span>{energy.evening}%</span>
                     </div>
                     <input type="range" min="0" max="100" value={energy.evening} onChange={e=>setEnergy({...energy, evening: parseInt(e.target.value)})} className="energy-slider bg-gradient-to-r from-gray-700 to-gray-700"/>
                  </div>
               </div>
            </div>

            <div className="bg-black/30 rounded-xl p-6 border border-white/5 relative">
               <div className="flex justify-between items-center mb-6">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Chronotype Analysis</div>
                  <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold flex items-center">
                     {chronotype === 'Night Owl' ? <Moon size={12} className="mr-1"/> : <Sun size={12} className="mr-1"/>}
                     {chronotype}
                  </div>
               </div>
               
               {/* Curve Graph */}
               <div className="h-32 w-full relative">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
                     <defs>
                        <linearGradient id="curveGradient" x1="0" x2="0" y1="0" y2="1">
                           <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5"/>
                           <stop offset="100%" stopColor="#06B6D4" stopOpacity="0"/>
                        </linearGradient>
                     </defs>
                     <path d={getCurvePath()} fill="none" stroke="#06B6D4" strokeWidth="3" className="transition-all duration-500 ease-out"/>
                     <path d={`${getCurvePath()} V 100 H 0 Z`} fill="url(#curveGradient)" className="transition-all duration-500 ease-out opacity-30"/>
                     {/* Points */}
                     <circle cx="0" cy={100-energy.morning} r="4" fill="white" className="transition-all duration-500"/>
                     <circle cx="150" cy={100-energy.afternoon} r="4" fill="white" className="transition-all duration-500"/>
                     <circle cx="300" cy={100-energy.evening} r="4" fill="white" className="transition-all duration-500"/>
                  </svg>
                  
                  {/* Labels */}
                  <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-mono uppercase">
                     <span>6 AM</span>
                     <span>12 PM</span>
                     <span>9 PM</span>
                  </div>
               </div>

               <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-xs text-gray-300 leading-relaxed">
                     <span className="text-cyan-400 font-bold">AI Action:</span> Since you peak at {chronotype === 'Night Owl' ? 'night' : 'morning'}, I've scheduled "Physics" for {chronotype === 'Night Owl' ? '9 PM' : '7 AM'} today.
                  </p>
               </div>
            </div>

         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
         
         {/* 2. REVISION TRACKER (Replaced Habit Matrix) */}
         <div className="glass-workspace rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10">
               <h3 className="text-lg font-bold text-white flex items-center">
                  <Brain className="mr-2 text-cyan-500"/> Smart Revision Tracker
               </h3>
               <span className="text-[10px] bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded">Spaced Repetition</span>
            </div>

            <div className="space-y-5 relative z-10">
               {retentionTopics.map((item) => {
                  const pct = getRetention(item.lastStudied);
                  let color = 'bg-green-500';
                  let status = 'Good';
                  if (pct < 50) { color = 'bg-red-500'; status = 'Critical'; }
                  else if (pct < 75) { color = 'bg-yellow-500'; status = 'Review Soon'; }

                  return (
                     <div key={item.id} className="group">
                        <div className="flex justify-between items-end mb-1">
                           <div>
                              <div className="text-xs text-gray-400 mb-0.5">{item.subject}</div>
                              <div className="text-sm font-bold text-white">{item.topic}</div>
                           </div>
                           <div className="text-right">
                              <div className={`text-xs font-bold ${pct < 50 ? 'text-red-400' : 'text-cyan-400'}`}>{pct}% Retention</div>
                              <div className="text-[10px] text-gray-500">{item.lastStudied === 0 ? 'Just Reviewed' : `${item.lastStudied}d ago`}</div>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                           <div className="retention-bar-bg flex-1">
                              <div 
                                 className={`retention-bar-fill ${color}`} 
                                 style={{ width: `${pct}%` }}
                              ></div>
                           </div>
                           <button 
                              onClick={() => handleReview(item.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white/10 hover:bg-cyan-600 rounded text-white"
                              title="Mark as Reviewed"
                           >
                              <RefreshCw size={14} className={item.lastStudied === 0 ? 'animate-spin' : ''}/>
                           </button>
                        </div>
                     </div>
                  );
               })}
            </div>
            
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
               <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5"/>
               <p className="text-xs text-gray-300 leading-relaxed">
                  <span className="text-red-400 font-bold">Alert:</span> Thermodynamics retention has dropped to <strong>30%</strong>. Review it today to prevent forgetting.
               </p>
            </div>
         </div>

         {/* 3. INTELLIGENT JOURNAL */}
         <div className="glass-workspace rounded-2xl p-6 flex flex-col h-full min-h-[300px]">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold text-white flex items-center">
                  <BookOpen className="mr-2 text-purple-500"/> Reflection
               </h3>
               <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center transition-all duration-300 ${
                  sentiment === 'anxious' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                  sentiment === 'positive' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                  sentiment === 'calm' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  'bg-gray-800 text-gray-400 border-gray-700'
               }`}>
                  {sentiment === 'anxious' ? <AlertTriangle size={12} className="mr-1"/> : sentiment === 'positive' ? <Smile size={12} className="mr-1"/> : <Cloud size={12} className="mr-1"/>}
                  {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} Vibe
               </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-xl p-3 mb-4">
               <div className="flex items-start gap-2">
                  <Bot className="text-purple-400 mt-0.5 shrink-0" size={16}/>
                  <p className="text-xs text-gray-300 leading-relaxed">
                     I noticed you missed your Mock Test goal yesterday. Was it just a busy day or are you feeling overwhelmed?
                  </p>
               </div>
            </div>

            <textarea 
               value={journalText}
               onChange={(e) => setJournalText(e.target.value)}
               placeholder="Write it out to clear your head..." 
               className="flex-1 bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 resize-none transition-all"
            />
         </div>

      </div>

      {/* 4. AUTO-SWOT ENGINE */}
      <div className="glass-workspace rounded-2xl p-8">
         <h3 className="text-lg font-bold text-white mb-6 flex items-center">
            <Compass className="mr-2 text-pink-500"/> Auto-SWOT Analysis
         </h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Strengths */}
            <div className="swot-card rounded-xl p-5 border-l-4 border-l-green-500">
               <div className="flex items-center gap-2 mb-3 text-green-400 font-bold text-sm uppercase tracking-wide">
                  <Shield size={16}/> Strengths
               </div>
               <div className="space-y-2">
                  <div className="bg-green-500/10 px-3 py-2 rounded-lg text-xs text-green-200 border border-green-500/10">
                     Python (High Mock Scores)
                  </div>
                  <div className="bg-green-500/10 px-3 py-2 rounded-lg text-xs text-green-200 border border-green-500/10">
                     Consistency (7-day streak)
                  </div>
               </div>
            </div>

            {/* Weaknesses */}
            <div className="swot-card rounded-xl p-5 border-l-4 border-l-orange-500 bg-orange-500/5 border-orange-500/10">
               <div className="flex items-center gap-2 mb-3 text-orange-400 font-bold text-sm uppercase tracking-wide">
                  <AlertTriangle size={16}/> Weaknesses
               </div>
               <div className="space-y-2">
                  <div className="bg-orange-500/10 px-3 py-2 rounded-lg text-xs text-orange-200 border border-orange-500/10">
                     Financial Impulse Control
                  </div>
                  <div className="bg-orange-500/10 px-3 py-2 rounded-lg text-xs text-orange-200 border border-orange-500/10">
                     Sleep Schedule (Avg 5h)
                  </div>
               </div>
            </div>

            {/* Opportunities */}
            <div className="swot-card rounded-xl p-5 border-l-4 border-l-blue-500 bg-blue-500/5 border-blue-500/10">
               <div className="flex items-center gap-2 mb-3 text-blue-400 font-bold text-sm uppercase tracking-wide">
                  <Target size={16}/> Opportunities
               </div>
               <div className="space-y-2">
                  <div className="bg-blue-500/10 px-3 py-2 rounded-lg text-xs text-blue-200 border border-blue-500/10 flex justify-between items-center">
                     <span>5 Internships match "Python"</span>
                     <ArrowRight size={12}/>
                  </div>
                  <div className="bg-blue-500/10 px-3 py-2 rounded-lg text-xs text-blue-200 border border-blue-500/10 flex justify-between items-center">
                     <span>Grant for Solar Project</span>
                     <ArrowRight size={12}/>
                  </div>
               </div>
            </div>

            {/* Threats */}
            <div className="swot-card rounded-xl p-5 border-l-4 border-l-red-500 bg-red-500/5 border-red-500/10">
               <div className="flex items-center gap-2 mb-3 text-red-400 font-bold text-sm uppercase tracking-wide">
                  <Flag size={16}/> Threats
               </div>
               <div className="space-y-2">
                  <div className="bg-red-500/10 px-3 py-2 rounded-lg text-xs text-red-200 border border-red-500/10">
                     Burnout Risk (High Stress Lvl)
                  </div>
                  <div className="bg-red-500/10 px-3 py-2 rounded-lg text-xs text-red-200 border border-red-500/10">
                     Exam Date Clash (Nov 12)
                  </div>
               </div>
            </div>

         </div>
      </div>

    </div>
  );
};

export default InsightsView;
