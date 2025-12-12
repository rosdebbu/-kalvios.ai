
import React, { useState, useEffect } from 'react';
import { 
  Rocket, Target, Users, Zap, AlertTriangle, CheckCircle2, 
  BarChart3, FileText, DollarSign, PenTool, Search, 
  ChevronRight, Lightbulb, TrendingUp, Shield, Radar
} from 'lucide-react';

const styles = `
  /* --- THEME VARS --- */
  .startup-theme {
    --accent: #10B981;
    --accent-glow: rgba(16, 185, 129, 0.4);
    --glass-bg: rgba(15, 23, 42, 0.6);
    --glass-border: rgba(255, 255, 255, 0.08);
  }

  /* --- ROADMAP --- */
  .roadmap-track {
    position: relative;
    height: 4px;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .roadmap-progress {
    height: 100%;
    background: var(--accent);
    border-radius: 4px;
    transition: width 0.5s ease;
    box-shadow: 0 0 15px var(--accent-glow);
  }
  .roadmap-node {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #0F172A;
    border: 2px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
  }
  .roadmap-node.active {
    border-color: var(--accent);
    background: var(--accent);
    color: #0F172A;
    box-shadow: 0 0 20px var(--accent-glow);
    transform: translate(-50%, -50%) scale(1.1);
  }
  .roadmap-node.completed {
    border-color: var(--accent);
    background: #0F172A;
    color: var(--accent);
  }

  /* --- RADAR CHART (Simulated) --- */
  .radar-container {
    position: relative;
    width: 200px;
    height: 200px;
  }
  .radar-poly {
    fill: rgba(16, 185, 129, 0.2);
    stroke: #10B981;
    stroke-width: 2;
    transition: all 1s ease;
  }
  .score-circle {
    transition: stroke-dashoffset 1s ease-out;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

  /* --- GLOW CARDS --- */
  .glow-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s ease;
  }
  .glow-card:hover {
    border-color: rgba(16, 185, 129, 0.3);
    box-shadow: 0 10px 40px -10px rgba(16, 185, 129, 0.1);
    transform: translateY(-2px);
  }
`;

const ROADMAP_STEPS = [
  { id: 1, title: 'Ideation', desc: 'Find a problem worth solving.', checklist: ['Identify Pain Point', 'Market Research', 'Competitor Analysis'] },
  { id: 2, title: 'Validation', desc: 'Talk to 10 users. Don\'t build yet.', checklist: ['User Interviews', 'Landing Page Test', 'Pre-orders/Waitlist'] },
  { id: 3, title: 'MVP', desc: 'Build the ugly version first.', checklist: ['Core Feature Dev', 'Beta Launch', 'Feedback Loop'] },
  { id: 4, title: 'Traction', desc: 'Get your first 100 lovers.', checklist: ['Cold Outreach', 'Content Marketing', 'Retention Analysis'] },
];

const GRANTS = [
  { title: "Nidhi Prayas Grant", amount: "₹10 Lakhs", deadline: "5 days left", type: "Equity Free", tag: "Govt" },
  { title: "Y Combinator S25", amount: "$500k", deadline: "Open now", type: "Investment", tag: "Global" },
  { title: "Microsoft Imagine Cup", amount: "$100k", deadline: "Nov 15", type: "Prize", tag: "Student" }
];

const EntrepreneurshipView = () => {
  // State
  const [activeStage, setActiveStage] = useState(1);
  
  // Validator State
  const [ideaInput, setIdeaInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);

  // Deck State
  const [activeTool, setActiveTool] = useState<'canvas' | 'deck'>('canvas');
  const [generatedDeck, setGeneratedDeck] = useState<any[]>([]);

  // --- LOGIC ---

  const handleValidateIdea = () => {
    if (!ideaInput) return;
    setIsValidating(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      let score = 72;
      let truth = "Solid concept, but execution determines success.";
      let comps = "Existing players found.";

      const lower = ideaInput.toLowerCase();
      if (lower.includes('food') || lower.includes('delivery')) {
        score = 45;
        truth = "⚠️ Brutal Reality: Low margins and high burn rate. Zomato/Swiggy moat is too deep.";
        comps = "Zomato, Swiggy, Zepto";
      } else if (lower.includes('social') || lower.includes('connect')) {
        score = 55;
        truth = "⚠️ The 'Network Effect' problem: It's useless until everyone is on it. How will you get the first 1000?";
        comps = "Instagram, LinkedIn, Discord";
      } else if (lower.includes('ai') || lower.includes('saas')) {
        score = 88;
        truth = "🔥 High Potential: B2B SaaS has better margins. Focus on a specific niche problem.";
        comps = "OpenAI wrappers, Jasper";
      }

      setValidationResult({ score, truth, comps });
      setIsValidating(false);
    }, 2000);
  };

  const handleGenerateDeck = () => {
    setGeneratedDeck([
      { slide: 1, title: "The Hook", desc: "Start with a startling statistic or story." },
      { slide: 2, title: "The Problem", desc: "Clearly define the pain point. 'People struggle to...'" },
      { slide: 3, title: "The Solution", desc: "Show your product. Screenshots/Demo." },
      { slide: 4, title: "Why Now?", desc: "Market timing. Why wasn't this built 5 years ago?" },
      { slide: 5, title: "Market Size", desc: "TAM, SAM, SOM. Is this a billion dollar opportunity?" },
    ]);
  };

  return (
    <div id="startup-tab-content" className="startup-theme space-y-8 animate-in fade-in slide-in-from-bottom-4 font-sans text-slate-200">
      <style>{styles}</style>

      {/* HEADER */}
      <div className="glass-workspace p-6 rounded-2xl flex justify-between items-center border-l-4 border-l-emerald-500">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Rocket className="mr-3 text-emerald-400" /> Zero-to-One Incubator
          </h1>
          <p className="text-gray-400 text-sm mt-1">From napkin sketch to funded startup. Follow the process.</p>
        </div>
        <div className="flex gap-4 text-center">
           <div>
             <div className="text-xs text-gray-500 font-bold uppercase">Stage</div>
             <div className="text-emerald-400 font-bold">Validation</div>
           </div>
           <div className="w-px h-8 bg-white/10"></div>
           <div>
             <div className="text-xs text-gray-500 font-bold uppercase">Runway</div>
             <div className="text-white font-bold">₹0</div>
           </div>
        </div>
      </div>

      {/* 1. ZERO-TO-ONE ROADMAP */}
      <div className="glass-workspace p-8 rounded-2xl">
        <h2 className="text-lg font-bold text-white mb-4">The Journey</h2>
        <div className="roadmap-track">
          <div className="roadmap-progress" style={{ width: `${(activeStage / 4) * 100}%` }}></div>
          {ROADMAP_STEPS.map((step, index) => (
            <div 
              key={step.id} 
              className={`roadmap-node ${activeStage === step.id ? 'active' : activeStage > step.id ? 'completed' : ''}`}
              style={{ left: `${((index + 1) / 4) * 100 - 12.5}%` }}
              onClick={() => setActiveStage(step.id)}
            >
              {activeStage > step.id ? <CheckCircle2 size={20} /> : <span className="font-bold text-sm">{step.id}</span>}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-8 text-center text-xs text-gray-500 font-bold uppercase tracking-wider mb-6">
          {ROADMAP_STEPS.map(s => <span key={s.id} className={activeStage === s.id ? 'text-emerald-400' : ''}>{s.title}</span>)}
        </div>

        {/* Dynamic Step Content */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-6 flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-top-2">
           <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">{ROADMAP_STEPS[activeStage-1].title} Phase</h3>
              <p className="text-gray-400 text-sm mb-4">{ROADMAP_STEPS[activeStage-1].desc}</p>
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors">
                Open Full Guide
              </button>
           </div>
           <div className="flex-1 bg-black/20 rounded-lg p-4">
              <h4 className="text-xs font-bold text-emerald-400 uppercase mb-3">Action Checklist</h4>
              <ul className="space-y-2">
                {ROADMAP_STEPS[activeStage-1].checklist.map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-300">
                    <div className="w-4 h-4 border border-gray-500 rounded mr-3 cursor-pointer hover:border-emerald-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 2. IDEA VALIDATOR (VC Agent) - 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
           <div className="glass-workspace p-6 rounded-2xl h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                 <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><AlertTriangle size={18}/></div>
                 <h2 className="text-lg font-bold text-white">The Reality Check</h2>
              </div>
              
              {!validationResult ? (
                <div className="flex-1 flex flex-col">
                   <p className="text-sm text-gray-400 mb-4">Describe your startup idea. I'll act as a brutal VC and tell you why it might fail.</p>
                   <textarea 
                     value={ideaInput}
                     onChange={(e) => setIdeaInput(e.target.value)}
                     className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500/50 outline-none resize-none mb-4"
                     placeholder="e.g. Uber for dog walking in Tier 2 cities..."
                   />
                   <button 
                     onClick={handleValidateIdea}
                     disabled={isValidating || !ideaInput}
                     className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                   >
                     {isValidating ? 'Roasting...' : 'Validate Idea'}
                   </button>
                </div>
              ) : (
                <div className="animate-in zoom-in duration-300">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                         <div className="text-xs text-gray-500 font-bold uppercase">Viability Score</div>
                         <div className={`text-4xl font-extrabold ${validationResult.score > 70 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {validationResult.score}<span className="text-lg text-gray-600">/100</span>
                         </div>
                      </div>
                      {/* Mini Radar SVG */}
                      <svg width="60" height="60" viewBox="0 0 100 100">
                         <polygon points="50,10 90,40 70,90 30,90 10,40" fill="none" stroke="#334155" strokeWidth="2"/>
                         <polygon points={`50,${100-validationResult.score}, 80,40, 60,80, 40,80, 20,40`} fill="rgba(16, 185, 129, 0.4)" stroke="#10B981" strokeWidth="2" />
                      </svg>
                   </div>

                   <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-4">
                      <h4 className="text-xs font-bold text-red-400 uppercase mb-1">The Hard Truth</h4>
                      <p className="text-sm text-gray-200 leading-relaxed">{validationResult.truth}</p>
                   </div>

                   <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mb-6">
                      <h4 className="text-xs font-bold text-blue-400 uppercase mb-1">Competitor Radar</h4>
                      <p className="text-sm text-gray-200">{validationResult.comps}</p>
                   </div>

                   <button onClick={() => {setValidationResult(null); setIdeaInput('');}} className="w-full py-2 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white">
                      Check Another Idea
                   </button>
                </div>
              )}
           </div>
        </div>

        {/* 3. NORTH STAR & FUNDING - 7 Cols */}
        <div className="lg:col-span-7 space-y-6">
           
           {/* Tool Switcher */}
           <div className="glass-workspace p-1 rounded-xl flex gap-1">
              <button 
                onClick={() => setActiveTool('canvas')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${activeTool === 'canvas' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Target size={16} className="mr-2"/> North Star
              </button>
              <button 
                onClick={() => setActiveTool('deck')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${activeTool === 'deck' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <PenTool size={16} className="mr-2"/> Pitch Architect
              </button>
           </div>

           {/* Content Area */}
           <div className="glass-workspace p-6 rounded-2xl min-h-[300px]">
              {activeTool === 'canvas' ? (
                 <div className="animate-in fade-in">
                    <h3 className="text-lg font-bold text-white mb-4">Lean Canvas (The 1-Page Plan)</h3>
                    <div className="grid grid-cols-3 gap-3 h-64">
                       <div className="bg-white/5 border border-white/5 rounded-lg p-3 hover:border-emerald-500/50 transition-colors">
                          <div className="text-xs font-bold text-gray-500 uppercase mb-2">Problem</div>
                          <textarea className="w-full h-full bg-transparent resize-none text-xs text-gray-300 outline-none" placeholder="Top 3 problems..."></textarea>
                       </div>
                       <div className="bg-white/5 border border-white/5 rounded-lg p-3 hover:border-emerald-500/50 transition-colors">
                          <div className="text-xs font-bold text-gray-500 uppercase mb-2">Solution</div>
                          <textarea className="w-full h-full bg-transparent resize-none text-xs text-gray-300 outline-none" placeholder="Top 3 features..."></textarea>
                       </div>
                       <div className="bg-white/5 border border-white/5 rounded-lg p-3 hover:border-emerald-500/50 transition-colors">
                          <div className="text-xs font-bold text-emerald-400 uppercase mb-2">Unfair Advantage</div>
                          <textarea className="w-full h-full bg-transparent resize-none text-xs text-gray-300 outline-none" placeholder="What can't be bought/copied?"></textarea>
                       </div>
                    </div>
                 </div>
              ) : (
                 <div className="animate-in fade-in">
                    <div className="flex justify-between items-center mb-4">
                       <h3 className="text-lg font-bold text-white">Deck Architect</h3>
                       <button onClick={handleGenerateDeck} className="text-xs text-purple-400 hover:text-white font-bold flex items-center">
                          <Zap size={12} className="mr-1"/> Auto-Generate Structure
                       </button>
                    </div>
                    <div className="space-y-2">
                       {(generatedDeck.length > 0 ? generatedDeck : [1,2,3]).map((s, i) => (
                          <div key={i} className="flex items-center p-3 bg-white/5 rounded-lg border border-white/5">
                             <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold mr-3">{typeof s === 'number' ? i+1 : s.slide}</div>
                             <div>
                                <div className="text-sm font-bold text-white">{typeof s === 'number' ? 'Slide Title' : s.title}</div>
                                <div className="text-xs text-gray-500">{typeof s === 'number' ? 'Content description placeholder...' : s.desc}</div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              )}
           </div>

           {/* 4. FUNDING HUNTER */}
           <div className="glass-workspace p-6 rounded-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold text-white flex items-center">
                    <DollarSign className="mr-2 text-yellow-400"/> Funding Hunter
                 </h3>
                 <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded border border-yellow-500/20">Student Friendly</span>
              </div>
              
              <div className="space-y-3">
                 {GRANTS.map((grant, i) => (
                    <div key={i} className="glow-card p-4 rounded-xl flex justify-between items-center group cursor-pointer">
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <h4 className="font-bold text-white text-sm">{grant.title}</h4>
                             <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">{grant.tag}</span>
                          </div>
                          <p className="text-xs text-gray-400">{grant.type} • <span className="text-red-400">{grant.deadline}</span></p>
                       </div>
                       <div className="text-right">
                          <div className="text-sm font-bold text-emerald-400">{grant.amount}</div>
                          <button className="text-[10px] text-gray-500 group-hover:text-white underline mt-1">Draft App</button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default EntrepreneurshipView;
