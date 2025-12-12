
import React, { useState } from 'react';
import { 
  Microscope, Search, Sparkles, FileText, Plus, Upload, 
  Quote, MessageSquare, Lightbulb, Flame, Book, Maximize2, CheckCircle2, Bot 
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

  /* --- RESEARCH STYLES --- */
  .research-card {
    backdrop-filter: blur(12px);
    background: rgba(20, 184, 166, 0.03);
    border: 1px solid rgba(20, 184, 166, 0.15);
    transition: all 0.3s ease;
  }
  .research-card:hover {
    background: rgba(20, 184, 166, 0.08);
    border-color: rgba(20, 184, 166, 0.4);
    transform: translateY(-2px);
  }
  
  .writer-cursor::after {
    content: '|';
    animation: blink 1s step-end infinite;
    color: #2DD4BF;
  }
  @keyframes blink { 50% { opacity: 0; } }
  
  /* Scrollbar for Panels */
  .notebook-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .notebook-scroll::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.02);
  }
  .notebook-scroll::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
  }
`;

const ResearchView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  
  const [activeTab, setActiveTab] = useState<'writer' | 'kanban'>('writer');
  
  // Fake Library Data
  const [library, setLibrary] = useState([
    { id: 1, title: 'AI in Radiology.pdf', tags: ['#AI', '#Medical', '#2024'] },
    { id: 2, title: 'Neural Networks Basics.pdf', tags: ['#DL', '#Theory'] },
    { id: 3, title: 'Quantum Computing Impact.pdf', tags: ['#Quantum', '#Future'] }
  ]);

  // Fake Kanban Data
  const [projects, setProjects] = useState([
    { id: 1, title: 'Solar Energy Grant', status: 'Ideation', deadline: '2 days left', urgent: true },
    { id: 2, title: 'Final Year Thesis', status: 'Drafting', deadline: '2 months left', urgent: false },
    { id: 3, title: 'Conference Paper', status: 'Review', deadline: 'Submitted', urgent: false }
  ]);

  const [editorText, setEditorText] = useState(`The integration of Artificial Intelligence (AI) in radiology represents a paradigm shift in medical diagnostics. 

Traditional methods often rely on subjective interpretation, whereas AI algorithms can identify patterns invisible to the human eye. 

[Smith et al., 2023] demonstrated a 15% increase in early detection rates.`);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult({
        abstract: "AI has revolutionized radiology by enhancing image analysis precision. Recent studies (2023-2024) indicate a 20% reduction in diagnostic errors when using CNN-based models compared to traditional methods.",
        sources: [
          { title: "Deep Learning in Medical Imaging", author: "Dr. A. Sharma", year: "2024" },
          { title: "Automated Diagnosis Systems", author: "IEEE Journal", year: "2023" }
        ]
      });
    }, 1500);
  };

  const insertCitation = (sourceTitle: string) => {
    setEditorText(prev => prev + ` [${sourceTitle}]`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 font-sans" style={{'--accent-color': '#14B8A6', '--accent-glow': 'rgba(20, 184, 166, 0.4)'} as any}>
      <style>{styles}</style>

      {/* 1. AGENTIC SEARCH ENGINE */}
      <div className="glass-workspace rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row gap-8 items-start">
         <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
         
         <div className="flex-1 w-full z-10">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
               <Microscope className="mr-3 text-teal-400"/> Research Assistant
            </h2>
            <p className="text-gray-400 text-sm mb-6">Ask a question. I'll read papers and synthesize an answer.</p>
            
            <div className="relative">
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                 placeholder="e.g. How does AI impact radiology?" 
                 className="agent-input w-full rounded-xl py-4 pl-12 pr-4 text-white text-lg focus:ring-2 focus:ring-teal-500/50"
               />
               <Search className="absolute left-4 top-4.5 text-gray-400" size={24}/>
               <button 
                 onClick={handleSearch}
                 className="absolute right-2 top-2 bg-teal-600 hover:bg-teal-500 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg"
               >
                 {isSearching ? 'Analyzing...' : 'Research'}
               </button>
            </div>

            {searchResult && (
               <div className="mt-6 bg-black/30 border border-teal-500/30 rounded-xl p-6 animate-in slide-in-from-top-2 backdrop-blur-md">
                  <div className="flex items-start gap-3 mb-4">
                     <Sparkles className="text-teal-400 shrink-0 mt-1" size={20}/>
                     <div>
                        <h4 className="text-sm font-bold text-teal-200 uppercase tracking-wider mb-2">AI Synthesis</h4>
                        <p className="text-gray-200 leading-relaxed text-sm typewriter">{searchResult.abstract}</p>
                     </div>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                     <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Sources Found</h5>
                     <div className="flex gap-2 flex-wrap">
                        {searchResult.sources.map((s: any, i: number) => (
                           <div key={i} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded text-xs text-gray-300 flex items-center">
                              <FileText size={12} className="mr-2 text-teal-500"/>
                              {s.title} ({s.year})
                           </div>
                        ))}
                     </div>
                     <button className="mt-4 text-xs font-bold text-teal-400 hover:text-white flex items-center transition-colors">
                        <Plus size={14} className="mr-1"/> Create New Project from this
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-320px)] min-h-[500px]">
         
         {/* --- LEFT COLUMN: TOOLS (30%) --- */}
         <div className="lg:col-span-1 flex flex-col gap-4 h-full overflow-hidden">
            
            {/* Opportunity Hunter */}
            <div className="glass-workspace rounded-xl p-4 border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-500/5 to-transparent flex-shrink-0">
               <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center text-yellow-500 font-bold text-sm">
                     <Lightbulb size={16} className="mr-2"/> Opportunity Hunter
                  </div>
                  <span className="text-[10px] bg-yellow-500/10 text-yellow-300 px-2 py-0.5 rounded border border-yellow-500/20">1 New</span>
               </div>
               <p className="text-xs text-gray-300 mb-2">
                  <strong>Green Energy Grant ($1000)</strong> closes next week. Matches your "Solar Energy" project.
               </p>
               <button className="text-[10px] font-bold text-yellow-400 hover:text-white underline">Apply Now</button>
            </div>

            {/* Kanban / Library Tabs */}
            <div className="flex gap-2">
               <button 
                 onClick={() => setActiveTab('kanban')}
                 className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'kanban' ? 'bg-teal-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
               >
                 Projects
               </button>
               <button 
                 onClick={() => setActiveTab('writer')}
                 className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'writer' ? 'bg-teal-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
               >
                 Library
               </button>
            </div>

            {/* Dynamic Content */}
            <div className="glass-workspace rounded-xl p-4 flex-1 overflow-y-auto notebook-scroll">
               {activeTab === 'kanban' ? (
                  <div className="space-y-3">
                     <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-bold text-gray-400 uppercase">Project Board</h4>
                        <Plus size={14} className="text-gray-400 cursor-pointer hover:text-white"/>
                     </div>
                     {projects.map((p) => (
                        <div key={p.id} className={`research-card p-3 rounded-lg border ${p.urgent ? 'border-red-500/30' : 'border-white/5'}`}>
                           <div className="flex justify-between items-start mb-1">
                              <span className="text-sm font-bold text-gray-200">{p.title}</span>
                              {p.urgent && <Flame size={12} className="text-red-500"/>}
                           </div>
                           <div className="flex justify-between items-center mt-2">
                              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400">{p.status}</span>
                              <span className={`text-[10px] ${p.urgent ? 'text-red-400 font-bold' : 'text-gray-500'}`}>{p.deadline}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="space-y-3">
                     <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-bold text-gray-400 uppercase">My Library</h4>
                        <Upload size={14} className="text-gray-400 cursor-pointer hover:text-white"/>
                     </div>
                     <div className="border-2 border-dashed border-white/10 rounded-lg p-4 text-center mb-4 hover:border-teal-500/30 transition-colors cursor-pointer">
                        <p className="text-[10px] text-gray-500">Drop PDF here to scan</p>
                     </div>
                     {library.map((file) => (
                        <div key={file.id} className="group research-card p-3 rounded-lg flex items-center justify-between">
                           <div className="flex items-center overflow-hidden">
                              <FileText size={16} className="text-teal-500 mr-3 shrink-0"/>
                              <div className="truncate">
                                 <div className="text-xs font-bold text-gray-300 truncate">{file.title}</div>
                                 <div className="flex gap-1 mt-1">
                                    {file.tags.map(t => <span key={t} className="text-[8px] text-gray-500">{t}</span>)}
                                 </div>
                              </div>
                           </div>
                           <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => insertCitation(file.title)}
                                className="p-1.5 hover:bg-teal-500/20 rounded text-teal-400" 
                                title="Cite"
                              >
                                <Quote size={12}/>
                              </button>
                              <button className="p-1.5 hover:bg-teal-500/20 rounded text-teal-400" title="Chat">
                                <MessageSquare size={12}/>
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>

         {/* --- RIGHT COLUMN: SMART WRITER (70%) --- */}
         <div className="lg:col-span-2 glass-workspace rounded-2xl flex flex-col overflow-hidden relative">
            {/* Toolbar */}
            <div className="h-12 border-b border-white/5 bg-black/20 flex items-center px-4 justify-between">
               <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase mr-2">Smart Writer</span>
                  <button className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Make Academic"><Book size={16}/></button>
                  <button className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Expand"><Maximize2 size={16}/></button>
                  <button className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Fix Grammar"><CheckCircle2 size={16}/></button>
               </div>
               <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Saved</span>
               </div>
            </div>

            {/* Editor Canvas */}
            <div className="flex-1 bg-[#1e1e1e] relative p-8 overflow-y-auto">
               <textarea 
                 value={editorText}
                 onChange={(e) => setEditorText(e.target.value)}
                 className="w-full h-full bg-transparent border-none outline-none text-gray-300 font-serif text-lg leading-loose resize-none writer-cursor selection:bg-teal-500/30"
                 placeholder="Start writing your paper..."
               />
               
               {/* Contextual Suggestion (Simulated) */}
               <div className="absolute bottom-8 right-8 max-w-xs bg-teal-900/90 border border-teal-500/30 p-4 rounded-xl shadow-2xl backdrop-blur-md animate-bounce duration-[3000ms]">
                  <div className="flex items-start gap-3">
                     <Bot className="text-teal-400 shrink-0 mt-1" size={18}/>
                     <div>
                        <p className="text-xs text-teal-100 font-bold mb-1">Writing Suggestion</p>
                        <p className="text-xs text-gray-300">
                           Your second paragraph lacks evidence. Drag a citation from the library to support your claim about "subjective interpretation".
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default ResearchView;
