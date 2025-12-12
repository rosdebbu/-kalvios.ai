
import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, FileText, Mic, Play, Pause, Zap, 
  Target, BarChart3, Clock, AlertTriangle, CheckCircle2, 
  Brain, Crosshair, ChevronRight, X, Sparkles, BookOpen,
  TrendingUp, Activity, Headphones, Calendar
} from 'lucide-react';

const styles = `
  /* --- ANIMATIONS --- */
  @keyframes wave {
    0%, 100% { height: 20%; }
    50% { height: 100%; }
  }
  
  @keyframes pulse-orange {
    0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
    100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
  }

  @keyframes scan {
    0% { top: 0; opacity: 0; }
    50% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  /* --- CLASSES --- */
  .glass-panel {
    background: rgba(30, 41, 59, 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }

  .pattern-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 4px;
  }
  
  .pattern-cell {
    aspect-ratio: 1;
    border-radius: 4px;
    position: relative;
    transition: all 0.3s ease;
  }
  .pattern-cell:hover {
    transform: scale(1.2);
    z-index: 10;
    box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
    border: 1px solid rgba(255,255,255,0.5);
  }

  .wave-bar {
    width: 4px;
    background: #F97316;
    border-radius: 99px;
    animation: wave 1s ease-in-out infinite;
  }
  .wave-bar.paused {
    animation-play-state: paused;
    height: 20% !important;
    transition: height 0.3s ease;
  }

  .speedometer-circle {
    transition: stroke-dashoffset 1s ease-out;
    transform: rotate(135deg);
    transform-origin: 50% 50%;
  }

  /* Custom Scrollbar */
  .exam-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .exam-scroll::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.02);
  }
  .exam-scroll::-webkit-scrollbar-thumb {
    background: rgba(249, 115, 22, 0.3);
    border-radius: 4px;
  }
`;

const ExamPrepView = () => {
  // --- STATE ---
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<string[] | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [vivaState, setVivaState] = useState<'idle' | 'listening' | 'processing' | 'feedback'>('idle');
  const [vivaHistory, setVivaHistory] = useState([
    { role: 'ai', text: "Ready for a quick Viva? Explain the Second Law of Thermodynamics in simple terms." }
  ]);

  // --- MOCK DATA ---
  const heatmapData = [
    { topic: "Rotational", years: [1, 0.8, 1, 0.6, 1], prob: "High" },
    { topic: "Thermodynamics", years: [0.4, 1, 0.8, 1, 0.2], prob: "Med" },
    { topic: "Optics", years: [1, 1, 1, 0.8, 1], prob: "Critical" },
    { topic: "Electrostatics", years: [0.2, 0.4, 0.2, 0, 0.2], prob: "Low" },
  ];

  const mistakes = [
    { id: 1, type: "Calculation", count: 3, subject: "Math", desc: "Sign errors in Integration" },
    { id: 2, type: "Conceptual", count: 1, subject: "Physics", desc: "Misunderstood Friction direction" },
    { id: 3, type: "Time Mgmt", count: 5, subject: "General", desc: "Missed last 5 questions" },
  ];

  // --- HANDLERS ---

  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      setPredictionResult([
        "Derive expression for Moment of Inertia of solid sphere.",
        "Carnot Engine efficiency numerical (Temp range: 300K-600K).",
        "Young's Double Slit Experiment: Fringe width variation."
      ]);
    }, 2500);
  };

  const handleVivaSim = () => {
    if (vivaState === 'idle') {
      setVivaState('listening');
      setTimeout(() => {
        setVivaState('processing');
        setTimeout(() => {
          setVivaHistory(prev => [
            ...prev,
            { role: 'user', text: "Entropy of an isolated system always increases. It's basically the measure of disorder." },
            { role: 'ai', text: "Correct. You mentioned 'disorder', which is key. 8/10. Now, what is the condition for a reversible process?" }
          ]);
          setVivaState('idle');
        }, 1500);
      }, 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 font-sans text-slate-200" style={{'--accent-color': '#F97316', '--accent-glow': 'rgba(249, 115, 22, 0.4)'} as any}>
      <style>{styles}</style>

      {/* HEADER */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 border-l-4 border-l-orange-500">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center">
              <Crosshair size={12} className="mr-1"/> Strategic Command
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">JEE Main 2026 Strategy</h1>
          <p className="text-gray-400 text-sm mt-1">284 Days Left • <span className="text-orange-400 font-bold">Phase 2: Mastery</span></p>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="text-center">
              <div className="text-xs text-gray-500 font-bold uppercase">Syllabus</div>
              <div className="text-2xl font-bold text-white">72%</div>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="text-center">
              <div className="text-xs text-gray-500 font-bold uppercase">Accuracy</div>
              <div className="text-2xl font-bold text-green-400">85%</div>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="text-center">
              <div className="text-xs text-gray-500 font-bold uppercase">Predicted</div>
              <div className="text-2xl font-bold text-orange-400">98%ile</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- ZONE 1: THE WAR ROOM (Inputs & Pattern Hunter) --- */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* Dropzone */}
           <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center hover:border-orange-500/50 hover:bg-orange-500/5 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                 <Upload className="text-gray-400 group-hover:text-orange-400" size={20} />
              </div>
              <h3 className="text-sm font-bold text-white">Ingest Past Papers</h3>
              <p className="text-xs text-gray-500 mt-1">Drop PDF to update predictions</p>
           </div>

           {/* Pattern Hunter */}
           <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-white flex items-center">
                    <Target className="mr-2 text-orange-500"/> Pattern Hunter
                 </h3>
                 <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-1 rounded">5 Year Analysis</span>
              </div>

              <div className="space-y-4">
                 {/* Heatmap Header */}
                 <div className="flex text-[10px] text-gray-500 font-mono justify-end gap-[14px] pr-2">
                    <span>'20</span><span>'21</span><span>'22</span><span>'23</span><span>'24</span>
                 </div>
                 
                 {heatmapData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between group">
                       <span className="text-xs font-bold text-gray-300 w-24 truncate">{item.topic}</span>
                       <div className="flex gap-1">
                          {item.years.map((opacity, idx) => (
                             <div 
                                key={idx} 
                                className="w-6 h-6 rounded bg-orange-500 transition-all hover:scale-110" 
                                style={{ opacity: Math.max(0.1, opacity) }}
                                title={`${Math.round(opacity*100)}% Frequency`}
                             ></div>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                 <p className="text-xs text-gray-300 leading-relaxed">
                    <span className="text-red-400 font-bold flex items-center mb-1"><AlertTriangle size={12} className="mr-1"/> High Probability Alert</span>
                    <strong>Optics</strong> has appeared in every paper since 2020. Prioritize this week.
                 </p>
              </div>

              <button 
                 onClick={handlePredict}
                 disabled={isPredicting}
                 className="w-full mt-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center relative overflow-hidden"
              >
                 {isPredicting ? (
                    <>
                       <div className="absolute inset-0 bg-white/10 w-full h-full animate-[scan_1.5s_infinite]"></div>
                       <span className="relative z-10">Scanning 50+ Papers...</span>
                    </>
                 ) : (
                    <><Sparkles size={16} className="mr-2"/> Generate Predictions</>
                 )}
              </button>

              {predictionResult && (
                 <div className="mt-4 bg-black/40 rounded-xl p-3 border border-orange-500/30 animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-xs font-bold text-orange-400 mb-2 uppercase">Likely Questions</h4>
                    <ul className="space-y-2">
                       {predictionResult.map((q, i) => (
                          <li key={i} className="text-[10px] text-gray-300 flex items-start">
                             <span className="mr-2 text-orange-500">•</span> {q}
                          </li>
                       ))}
                    </ul>
                 </div>
              )}
           </div>

        </div>

        {/* --- ZONE 2: ACTIVE RECALL ENGINE (Center) --- */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* Viva Bot */}
           <div className="glass-panel p-6 rounded-2xl flex flex-col h-[400px] relative">
              <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                 <h3 className="text-lg font-bold text-white flex items-center">
                    <Mic className="mr-2 text-blue-400"/> AI Viva Bot
                 </h3>
                 <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${vivaState === 'idle' ? 'bg-gray-800 text-gray-500' : 'bg-red-500/20 text-red-400 animate-pulse'}`}>
                    {vivaState === 'listening' ? 'Listening...' : vivaState === 'processing' ? 'Grading...' : 'Idle'}
                 </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 mb-4 exam-scroll pr-2">
                 {vivaHistory.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                          {msg.role === 'ai' ? <Brain size={14} className="text-white"/> : <span className="text-[10px] font-bold">ME</span>}
                       </div>
                       <div className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${msg.role === 'ai' ? 'bg-white/5 border border-white/5 text-gray-200' : 'bg-blue-600 text-white'}`}>
                          {msg.text}
                       </div>
                    </div>
                 ))}
              </div>

              <div className="relative">
                 <button 
                    onClick={handleVivaSim}
                    className={`w-full py-4 rounded-xl flex items-center justify-center font-bold text-sm transition-all shadow-lg ${vivaState === 'listening' ? 'bg-red-600 text-white animate-pulse' : 'bg-white text-gray-900 hover:bg-gray-200'}`}
                 >
                    {vivaState === 'listening' ? <Mic size={18} className="mr-2"/> : <Mic size={18} className="mr-2"/>}
                    {vivaState === 'listening' ? 'Tap to Stop' : 'Tap to Speak Answer'}
                 </button>
              </div>
           </div>

           {/* Audio Revision */}
           <div className="glass-panel p-4 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                    <Headphones size={20} className="text-white"/>
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-orange-400 uppercase tracking-wide mb-0.5">Generating Podcast...</div>
                    <div className="text-sm font-bold text-white truncate">Weak Areas: Rotational & Optics</div>
                 </div>
                 <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                 >
                    {isPlaying ? <Pause size={16}/> : <Play size={16} className="ml-1"/>}
                 </button>
              </div>
              
              {/* Waveform */}
              <div className="flex items-center justify-center gap-1 h-8 mt-4 px-2 opacity-50 group-hover:opacity-100 transition-opacity">
                 {[...Array(24)].map((_, i) => (
                    <div 
                       key={i} 
                       className={`wave-bar flex-1 ${!isPlaying ? 'paused' : ''}`} 
                       style={{ animationDelay: `${i * 0.05}s` }}
                    ></div>
                 ))}
              </div>
           </div>

        </div>

        {/* --- ZONE 3: EXECUTION (Right) --- */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* Readiness Gauge */}
           <div className="glass-panel p-6 rounded-2xl text-center relative">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Exam Readiness</h3>
              <div className="relative w-40 h-20 mx-auto overflow-hidden">
                 <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[12px] border-gray-700"></div>
                 <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[12px] border-transparent border-t-orange-500 border-r-orange-500 rotate-[-45deg]" style={{transform: 'rotate(-45deg)'}}></div> 
                 {/* CSS Gauge Simulation using border tricks is complex, using simplified visual */}
                 <svg className="w-full h-full" viewBox="0 0 200 100">
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#334155" strokeWidth="20" strokeLinecap="round"/>
                    <path d="M 20 100 A 80 80 0 0 1 140 30" fill="none" stroke="#F97316" strokeWidth="20" strokeLinecap="round" className="speedometer-circle"/>
                 </svg>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl font-extrabold text-white">68%</div>
              </div>
              <p className="text-xs text-gray-400 mt-2">You need <span className="text-white font-bold">+12%</span> to reach your goal.</p>
           </div>

           {/* Mock Test Card */}
           <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h3 className="text-lg font-bold text-white">Full Mock #4</h3>
                    <p className="text-xs text-orange-400 font-bold mt-1 flex items-center"><Clock size={12} className="mr-1"/> Tomorrow, 9:00 AM</p>
                 </div>
                 <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition-colors">
                    Reschedule
                 </button>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                 <h4 className="text-xs font-bold text-red-400 uppercase mb-3 flex items-center"><X size={14} className="mr-1"/> Mistake Log (Last Test)</h4>
                 <div className="space-y-2">
                    {mistakes.map(m => (
                       <div key={m.id} className="flex justify-between items-center text-xs">
                          <span className="text-gray-300">{m.desc}</span>
                          <span className="bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded font-mono font-bold">-{m.count}</span>
                       </div>
                    ))}
                 </div>
              </div>
              
              <button className="w-full mt-4 py-3 bg-white text-orange-900 font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                 Start Mock Now
              </button>
           </div>

        </div>

      </div>
    </div>
  );
};

export default ExamPrepView;
