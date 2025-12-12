
import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, FileText, Mic, Play, Pause, Send, Bot, 
  Sparkles, Network, MessageSquare, Plus, X, 
  ChevronRight, Brain, Scan, CheckCircle2, AlertCircle,
  MoreHorizontal, Download, Share2, Headphones, Layers,
  Maximize2, RotateCw
} from 'lucide-react';

const styles = `
  /* --- ANIMATIONS --- */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes wave {
    0%, 100% { height: 20%; }
    50% { height: 100%; }
  }

  @keyframes pulse-glow {
    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
  }

  /* --- CLASSES --- */
  .glass-panel {
    background: rgba(30, 41, 59, 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }

  .mind-node {
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: grab;
    transition: box-shadow 0.3s ease, transform 0.2s ease;
    animation: float 6s ease-in-out infinite;
    z-index: 10;
  }
  .mind-node:active {
    cursor: grabbing;
    animation: none;
  }
  .mind-node:hover {
    z-index: 20;
    filter: brightness(1.1);
  }
  
  .wave-bar {
    width: 4px;
    background: #6366F1;
    border-radius: 99px;
    animation: wave 1s ease-in-out infinite;
  }
  .wave-bar.paused {
    animation-play-state: paused;
    height: 20% !important;
    transition: height 0.3s ease;
  }

  /* Custom Scrollbar */
  .smart-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .smart-scroll::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.02);
  }
  .smart-scroll::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 4px;
  }
`;

const SmartNotebook = () => {
  const [activeView, setActiveView] = useState<'chat' | 'map'>('chat');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [userDraft, setUserDraft] = useState('');

  // --- MOCK DATA ---
  const sources = [
    { id: 1, name: "Physics_Ch4_Thermodynamics.pdf", size: "2.4 MB", status: "ready" },
    { id: 2, name: "Lecture_Recording_Oct12.mp3", size: "14 MB", status: "processing" },
  ];

  const chatHistory = [
    { role: 'ai', content: "I've analyzed the Thermodynamics PDF. The core concept is **Entropy** and the **Second Law**. Would you like a mind map or a quiz?", citations: [] },
    { role: 'user', content: "Explain the Carnot Cycle briefly.", citations: [] },
    { role: 'ai', content: "The Carnot cycle is a theoretical ideal thermodynamic cycle proposed by French physicist Sadi Carnot. It provides an upper limit on the efficiency that any classical thermodynamic engine can achieve.", citations: ['p.14', 'p.15'] },
  ];

  const insights = [
    { id: 1, text: "Efficiency of a Carnot engine depends only on temperatures of source & sink.", type: "fact" },
    { id: 2, text: "Entropy never decreases in an isolated system.", type: "law" },
    { id: 3, text: "Adiabatic process: No heat exchange (Q=0).", type: "formula" },
  ];

  // --- MIND MAP LOGIC ---
  const [nodes, setNodes] = useState([
    { id: 1, label: "Thermodynamics", x: 50, y: 50, type: 'root', color: 'bg-indigo-600' },
    { id: 2, label: "Zeroth Law", x: 20, y: 30, type: 'child', color: 'bg-slate-800' },
    { id: 3, label: "Carnot Cycle", x: 80, y: 30, type: 'child', color: 'bg-slate-800' },
    { id: 4, label: "Entropy", x: 50, y: 80, type: 'child', color: 'bg-slate-800' },
    { id: 5, label: "Efficiency", x: 85, y: 15, type: 'leaf', color: 'bg-slate-800' },
  ]);

  // Simple drag handler (simulation)
  const handleDragStart = (e: React.MouseEvent, id: number) => {
    // In a real app, we'd implement full DND. 
    // Here we just prevent default to stop text selection.
    // e.preventDefault();
  };

  // --- HANDLERS ---

  const handleAnalyzeDraft = () => {
    if (!userDraft.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        score: 85,
        missing: ["Reversible Process conditions", "Unit consistency (Kelvin)"],
        feedback: "Great explanation of the First Law, but you missed the conditions required for a process to be reversible."
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[700px] bg-[#0F172A] text-slate-200 font-sans overflow-hidden rounded-3xl border border-white/5 relative shadow-2xl">
      <style>{styles}</style>

      {/* --- HEADER --- */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0F172A]/90 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm">Thermodynamics Master Unit</h1>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              AI Active • 2 Sources
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
            <Share2 size={18}/>
          </button>
          <button 
            onClick={() => setShowAnalysis(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/20 flex items-center"
          >
            <Scan size={14} className="mr-2"/> Analyze My Answer
          </button>
        </div>
      </header>

      {/* --- MAIN GRID --- */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        
        {/* COL 1: KNOWLEDGE BASE (20%) */}
        <div className="col-span-12 lg:col-span-3 border-r border-white/5 bg-[#0F172A]/50 flex flex-col relative">
          
          {/* Analysis Overlay */}
          {showAnalysis && (
            <div className="absolute inset-0 bg-[#0F172A] z-20 flex flex-col animate-in slide-in-from-left duration-300">
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-indigo-900/10">
                <h3 className="text-sm font-bold text-white flex items-center"><Scan size={16} className="mr-2 text-indigo-400"/> Self-Analysis</h3>
                <button onClick={() => setShowAnalysis(false)} className="text-slate-400 hover:text-white"><X size={16}/></button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto smart-scroll">
                {!analysisResult ? (
                  <>
                    <p className="text-xs text-slate-400 mb-4">Paste your summary or answer below. AI will grade it against the source material.</p>
                    <textarea 
                      value={userDraft}
                      onChange={(e) => setUserDraft(e.target.value)}
                      placeholder="e.g. The Second Law states that..."
                      className="w-full h-48 bg-slate-900/50 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-indigo-500 resize-none mb-4"
                    />
                    <button 
                      onClick={handleAnalyzeDraft}
                      disabled={isAnalyzing}
                      className="w-full py-3 bg-white text-indigo-900 font-bold text-sm rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center"
                    >
                      {isAnalyzing ? 'Scanning...' : 'Check My Understanding'}
                    </button>
                  </>
                ) : (
                  <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-indigo-500/30 text-3xl font-bold text-white mb-2 relative">
                        {analysisResult.score}
                        <span className="absolute text-[10px] bottom-3 text-slate-400">%</span>
                      </div>
                      <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Understanding Score</div>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                      <h4 className="text-xs font-bold text-red-400 mb-2 flex items-center"><AlertCircle size={12} className="mr-1"/> Missing Concepts</h4>
                      <ul className="space-y-1">
                        {analysisResult.missing.map((m: string, i: number) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start">
                            <span className="mr-2 text-red-500">•</span> {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <h4 className="text-xs font-bold text-green-400 mb-2 flex items-center"><CheckCircle2 size={12} className="mr-1"/> AI Feedback</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{analysisResult.feedback}</p>
                    </div>

                    <button onClick={() => {setAnalysisResult(null); setUserDraft('');}} className="w-full py-2 border border-white/10 rounded-lg text-xs text-slate-400 hover:text-white">Start Over</button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="p-4 border-b border-white/5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Sources</h3>
            {/* Dropzone */}
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-indigo-500/30 hover:bg-white/5 transition-all cursor-pointer group">
              <Upload className="mx-auto text-slate-500 group-hover:text-indigo-400 mb-2 transition-colors" size={20} />
              <p className="text-[10px] text-slate-400">Drop PDF, Audio, or Paste URL</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2 smart-scroll">
            {sources.map(source => (
              <div key={source.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                  <FileText size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-200 truncate">{source.name}</div>
                  <div className="text-[10px] text-slate-500 flex items-center mt-0.5">
                    {source.status === 'processing' ? (
                      <span className="text-yellow-500 flex items-center"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse mr-1.5"/> Processing</span>
                    ) : (
                      <span className="text-green-500 flex items-center">Ready</span>
                    )}
                    <span className="mx-1">•</span> {source.size}
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white"><MoreHorizontal size={14}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* COL 2: COGNITIVE CANVAS (50%) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col relative bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
          
          {/* View Switcher */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/10 flex">
            <button 
              onClick={() => setActiveView('chat')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center transition-all ${activeView === 'chat' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <MessageSquare size={14} className="mr-2"/> Deep Chat
            </button>
            <button 
              onClick={() => setActiveView('map')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center transition-all ${activeView === 'map' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <Network size={14} className="mr-2"/> Mind Map
            </button>
          </div>

          {/* VIEW A: CHAT */}
          {activeView === 'chat' && (
            <div className="flex-1 flex flex-col pt-16 animate-in fade-in duration-300">
              <div className="flex-1 overflow-y-auto p-6 space-y-6 smart-scroll">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                      {msg.role === 'ai' ? <Bot size={16}/> : <span className="text-xs font-bold">ME</span>}
                    </div>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'ai' ? 'bg-white/5 border border-white/5 text-slate-200' : 'bg-indigo-600 text-white'}`}>
                      <p>{msg.content}</p>
                      {msg.citations.length > 0 && (
                        <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                          {msg.citations.map(cit => (
                            <span key={cit} className="text-[10px] bg-white/10 px-2 py-0.5 rounded hover:bg-white/20 cursor-pointer transition-colors text-indigo-200">
                              {cit}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-white/5 bg-[#0F172A]/50 backdrop-blur">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ask about specific concepts..." 
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                  <button className="absolute right-2 top-2 p-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-colors">
                    <Send size={16}/>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW B: MIND MAP */}
          {activeView === 'map' && (
            <div className="flex-1 relative overflow-hidden cursor-move bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] animate-in fade-in duration-300">
              {/* Connector Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="2" />
                <line x1="80%" y1="30%" x2="85%" y2="15%" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="2" />
              </svg>

              {/* Nodes */}
              {nodes.map(node => (
                <div 
                  key={node.id}
                  onMouseDown={(e) => handleDragStart(e, node.id)}
                  className={`mind-node flex items-center justify-center text-center shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-md
                    ${node.type === 'root' ? 'w-32 h-32 rounded-full bg-indigo-600 p-4 border-4 border-indigo-400/20 font-bold text-white' : 
                      node.type === 'leaf' ? 'w-20 h-20 rounded-full bg-slate-800 p-2 text-[10px] text-slate-400 hover:border-indigo-500' :
                      'w-24 h-24 rounded-full bg-slate-800 p-2 text-xs text-slate-300 font-semibold hover:border-indigo-500'
                    }
                  `}
                  style={{ top: `${node.y}%`, left: `${node.x}%`, animationDelay: `${node.id * 0.5}s` }}
                >
                  {node.label}
                </div>
              ))}
              
              <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-slate-400 pointer-events-none">
                Click a node to expand • Drag to move
              </div>
            </div>
          )}
        </div>

        {/* COL 3: AUDIO & INSIGHTS (30%) */}
        <div className="col-span-12 lg:col-span-3 border-l border-white/5 bg-[#0F172A]/50 flex flex-col">
          
          {/* Feature A: Audio Overview */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Audio Overview</h3>
              <div className="flex items-center text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                <Headphones size={10} className="mr-1"/> Podcast Mode
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
                  <Play fill="white" size={16} className="text-white ml-0.5"/>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Concept Deep Dive</div>
                  <div className="text-[10px] text-slate-400">12 min • 2 Hosts (AI)</div>
                </div>
              </div>

              {/* Waveform Animation */}
              <div className="flex items-center justify-center gap-1 h-8 mb-4 opacity-80">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`wave-bar flex-1 ${!isPlaying ? 'paused' : ''}`} 
                    style={{ animationDelay: `${i * 0.1}s`, backgroundColor: isPlaying ? '#6366F1' : '#334155' }}
                  ></div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center shadow-md"
                >
                  {isPlaying ? <><Pause size={12} className="mr-2"/> Pause</> : <><Play size={12} className="mr-2"/> Play</>}
                </button>
                <span className="text-[10px] font-mono text-slate-400 bg-black/20 px-2 py-1 rounded">1.5x Speed</span>
              </div>
            </div>
          </div>

          {/* Feature B: Saved Insights */}
          <div className="flex-1 overflow-y-auto p-4 smart-scroll">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pinned Insights</h3>
              <button className="text-[10px] text-indigo-400 hover:text-white transition-colors flex items-center">
                <Layers size={12} className="mr-1"/> Flashcards
              </button>
            </div>

            <div className="space-y-3">
              {insights.map((insight) => (
                <div key={insight.id} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group relative">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-slate-400 hover:text-white"><Share2 size={12}/></button>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold mb-2 inline-block border ${
                    insight.type === 'law' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    insight.type === 'formula' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    'bg-green-500/10 text-green-400 border-green-500/20'
                  }`}>
                    {insight.type}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {insight.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SmartNotebook;
