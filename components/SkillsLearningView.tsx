
import React, { useState, useEffect } from 'react';
import { 
  Code, Terminal, Cpu, Play, CheckCircle2, Circle, 
  ChevronRight, Lock, Shield, Zap, AlertTriangle, 
  Mic, MessageSquare, Award, Star, RefreshCw,
  GitBranch, Box, Check, X, Sword, Hexagon, Sparkles
} from 'lucide-react';

const styles = `
  /* --- THEME VARS --- */
  .skills-theme {
    --accent: #F59E0B;
    --accent-glow: rgba(245, 158, 11, 0.4);
    --glass-bg: rgba(15, 23, 42, 0.6);
    --glass-border: rgba(255, 255, 255, 0.08);
  }

  /* --- GLASS BASE --- */
  .glass-workspace {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }

  /* --- ROADMAP TIMELINE --- */
  .roadmap-line-dashed {
    position: absolute;
    top: 24px;
    left: 24px;
    bottom: 0;
    width: 2px;
    background-image: linear-gradient(to bottom, #334155 50%, transparent 50%);
    background-size: 2px 12px;
    background-repeat: repeat-y;
    z-index: 0;
  }

  /* --- BOSS BATTLE --- */
  .boss-card {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%);
    border: 1px solid rgba(245, 158, 11, 0.3);
    box-shadow: 0 0 30px rgba(245, 158, 11, 0.1);
    transition: all 0.3s ease;
  }
  .boss-card:hover {
    box-shadow: 0 0 50px rgba(245, 158, 11, 0.2);
    border-color: rgba(245, 158, 11, 0.6);
  }
  
  .health-bar {
    height: 8px;
    background: #334155;
    border-radius: 4px;
    overflow: hidden;
  }
  .health-fill {
    height: 100%;
    background: #EF4444;
    transition: width 0.5s ease;
  }

  /* --- HEXAGON BADGE --- */
  .hex-badge {
    width: 60px;
    height: 68px;
    background: var(--accent);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  @keyframes popIn {
    0% { transform: scale(0) rotate(-180deg); opacity: 0; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  /* --- TYPING EFFECT --- */
  .typing-cursor::after {
    content: '|';
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }

  /* --- CONFETTI (Simplified CSS) --- */
  .confetti-piece {
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--accent);
    top: 0;
    opacity: 0;
  }
  @keyframes confetti-fall {
    0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100px) rotate(720deg); opacity: 0; }
  }
`;

const SkillsLearningView = () => {
  // State: Roadmap
  const [skillInput, setSkillInput] = useState('');
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  // State: Challenger
  const [code, setCode] = useState('');
  const [codeFeedback, setCodeFeedback] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // State: Defense
  const [bossAnswer, setBossAnswer] = useState('');
  const [battleState, setBattleState] = useState<'idle' | 'fighting' | 'won'>('idle');
  const [showBadge, setShowBadge] = useState(false);

  // --- HANDLERS ---

  const handleGenerateRoadmap = () => {
    if (!skillInput) return;
    setIsGenerating(true);
    setTimeout(() => {
      setRoadmap([
        { id: 1, title: 'Foundations & Syntax', status: 'completed', days: 'Day 1-5' },
        { id: 2, title: 'DOM Manipulation', status: 'in-progress', days: 'Day 6-12' },
        { id: 3, title: 'Async Patterns (Fetch/Promises)', status: 'locked', days: 'Day 13-20' },
        { id: 4, title: 'State Management', status: 'locked', days: 'Day 21-30' },
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSummarize = () => {
    setIsSummarizing(true);
    setSummary('');
    const text = "Key takeaways from Fireship's React video:\n1. Components are functions.\n2. State is memory.\n3. Hooks allow lifecycle access.\n4. JSX is syntax sugar for createElement.";
    let i = 0;
    const interval = setInterval(() => {
      setSummary(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsSummarizing(false);
      }
    }, 30);
  };

  const handleSubmitChallenge = () => {
    setIsChecking(true);
    setTimeout(() => {
      setCodeFeedback("⚠️ Security Alert: You hardcoded the API Key on line 12. Move it to a .env file and access via process.env.API_KEY.");
      setIsChecking(false);
    }, 1500);
  };

  const handleBossBattle = () => {
    if (!bossAnswer.trim()) return;
    setBattleState('fighting');
    setTimeout(() => {
      setBattleState('won');
      setTimeout(() => setShowBadge(true), 500);
    }, 2000);
  };

  return (
    <div id="skills-tab-content" className="skills-theme space-y-8 animate-in fade-in slide-in-from-bottom-4 font-sans text-slate-200">
      <style>{styles}</style>

      {/* 1. ROADMAP ARCHITECT */}
      <div className="glass-workspace rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center mb-2">
              <GitBranch className="mr-3 text-amber-500" /> Roadmap Architect
            </h2>
            <p className="text-gray-400 text-sm">Turn any topic into a 30-day execution plan.</p>
          </div>
          
          <div className="flex w-full md:w-auto bg-black/30 p-1 rounded-xl border border-white/10">
            <input 
              type="text" 
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="e.g. Learn React in 30 Days"
              className="bg-transparent border-none text-white text-sm px-4 py-2 outline-none w-full md:w-64 placeholder-gray-500"
            />
            <button 
              onClick={handleGenerateRoadmap}
              disabled={isGenerating}
              className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
            >
              {isGenerating ? 'Building...' : 'Build Plan'}
            </button>
          </div>
        </div>

        {roadmap.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timeline */}
            <div className="lg:col-span-2 relative pl-4">
              <div className="roadmap-line-dashed"></div>
              <div className="space-y-8 relative z-10">
                {roadmap.map((step) => (
                  <div key={step.id} className="flex items-start gap-4 group">
                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center bg-[#0F172A] transition-all ${
                      step.status === 'completed' ? 'border-green-500 text-green-500' :
                      step.status === 'in-progress' ? 'border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' :
                      'border-gray-700 text-gray-700'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 size={20} /> : 
                       step.status === 'in-progress' ? <Zap size={20} className="fill-current" /> : 
                       <Lock size={18} />}
                    </div>
                    <div className={`flex-1 p-4 rounded-xl border transition-all ${
                      step.status === 'in-progress' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/5'
                    }`}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`font-bold text-sm ${step.status === 'in-progress' ? 'text-white' : 'text-gray-400'}`}>
                          {step.title}
                        </h3>
                        <span className="text-[10px] uppercase font-bold text-gray-500 bg-black/20 px-2 py-0.5 rounded">{step.days}</span>
                      </div>
                      <div className="text-xs text-gray-500 capitalize">{step.status.replace('-', ' ')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Resource */}
            <div className="bg-black/20 border border-white/5 rounded-xl p-5 h-fit">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <Play size={16} fill="currentColor"/>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase">Recommended</div>
                  <div className="text-sm font-bold text-white">React in 100 Seconds</div>
                </div>
              </div>
              <button 
                onClick={handleSummarize}
                disabled={summary.length > 0 || isSummarizing}
                className="w-full py-2 bg-white/5 hover:bg-white/10 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/20 flex items-center justify-center mb-4 transition-colors"
              >
                <Sparkles size={12} className="mr-2"/> {isSummarizing ? 'Analyzing...' : 'AI Summarize'}
              </button>
              
              {(summary || isSummarizing) && (
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3 text-xs text-gray-300 font-mono leading-relaxed typing-cursor">
                  {summary}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-gray-500 border-2 border-dashed border-white/5 rounded-xl">
            <GitBranch size={40} className="mb-4 opacity-20"/>
            <p>Enter a skill to generate your bootcamp.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 2. PROJECT CHALLENGER */}
        <div className="glass-workspace rounded-2xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Code className="mr-2 text-blue-400" /> Project Challenger
            </h2>
            <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold border border-blue-500/20">
              Active: Weather App
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Specs</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li className="flex items-center"><CheckCircle2 size={12} className="mr-2 text-green-500"/> Use OpenWeather API</li>
              <li className="flex items-center"><CheckCircle2 size={12} className="mr-2 text-green-500"/> CSS Grid Layout</li>
              <li className="flex items-center"><Circle size={12} className="mr-2 text-gray-600"/> Handle Loading/Error States</li>
            </ul>
          </div>

          <div className="relative flex-1">
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Paste your solution code here..."
              className="w-full h-48 bg-[#0F172A] border border-white/10 rounded-xl p-4 font-mono text-xs text-green-400 focus:border-blue-500/50 outline-none resize-none"
            />
            <button 
              onClick={handleSubmitChallenge}
              disabled={isChecking}
              className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg transition-all"
            >
              {isChecking ? 'Reviewing...' : 'Submit Code'}
            </button>
          </div>

          {codeFeedback && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5"/>
              <p className="text-xs text-red-200 leading-relaxed font-medium">
                {codeFeedback}
              </p>
            </div>
          )}
        </div>

        {/* 3. SKILL DEFENSE (BOSS BATTLE) */}
        <div className="glass-workspace rounded-2xl p-1 relative overflow-hidden flex flex-col">
          <div className="bg-[#0F172A]/50 backdrop-blur border-b border-white/5 p-4 flex justify-between items-center rounded-t-xl">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Sword className="mr-2 text-red-500" /> Skill Defense
            </h2>
            <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest animate-pulse">Boss Battle</div>
          </div>

          <div className="boss-card flex-1 m-2 rounded-xl p-6 relative flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background FX */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent opacity-50"></div>
            
            {showBadge ? (
              <div className="z-10 flex flex-col items-center animate-in zoom-in duration-500">
                <div className="hex-badge mb-4 shadow-[0_0_50px_rgba(245,158,11,0.6)]">
                  <Award size={32} className="text-white drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-1">Victory!</h3>
                <p className="text-amber-400 font-bold text-sm mb-6">JS Concept Badge Earned</p>
                <div className="flex gap-2">
                  {[...Array(15)].map((_,i) => (
                    <div key={i} className="confetti-piece" style={{
                      left: `${Math.random()*100}%`,
                      animation: `confetti-fall ${1+Math.random()}s linear forwards`,
                      animationDelay: `${Math.random()*0.5}s`,
                      backgroundColor: ['#F59E0B', '#EF4444', '#3B82F6'][Math.floor(Math.random()*3)]
                    }}></div>
                  ))}
                </div>
                <button onClick={() => {setShowBadge(false); setBattleState('idle'); setBossAnswer('');}} className="text-xs text-gray-400 hover:text-white underline">Replay</button>
              </div>
            ) : (
              <div className="z-10 w-full">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-800 shadow-2xl">
                  <Cpu size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">The Syntax Guardian</h3>
                <div className="w-48 h-2 bg-gray-800 rounded-full mx-auto mb-6 overflow-hidden border border-white/10">
                  <div className={`health-fill ${battleState === 'fighting' ? 'w-1/2' : battleState === 'won' ? 'w-0' : 'w-full'}`}></div>
                </div>
                
                <div className="bg-black/40 border border-red-500/20 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm text-gray-200 font-medium">
                    "Explain the difference between <span className="text-amber-400 font-mono">let</span> and <span className="text-amber-400 font-mono">var</span> in JavaScript scope."
                  </p>
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    value={bossAnswer}
                    onChange={(e) => setBossAnswer(e.target.value)}
                    disabled={battleState !== 'idle'}
                    placeholder="Type your defense..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:border-red-500/50 outline-none transition-all"
                  />
                  <button 
                    onClick={handleBossBattle}
                    className="absolute right-2 top-2 p-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors shadow-lg"
                  >
                    <Sword size={16}/>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SkillsLearningView;
