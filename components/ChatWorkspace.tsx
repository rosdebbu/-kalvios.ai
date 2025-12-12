
import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Mic, Paperclip, Bot, User, Sparkles, 
  PanelRightClose, PanelRightOpen, Copy, Download, 
  LayoutGrid, History, FolderOpen, Settings,
  Zap, Briefcase, GraduationCap, Wallet, Brain,
  CheckCircle2, Circle, Clock, MoreHorizontal, ArrowRight,
  BarChart3, Calendar, FileText, ChevronRight, Play, Maximize2,
  TrendingUp, AlertTriangle, CheckSquare, Plus, File, Link as LinkIcon,
  X, Search, Sidebar, ChevronDown
} from 'lucide-react';

// --- Types ---

interface ChatWorkspaceProps {
  onBack: () => void;
}

type ModeType = 'academic' | 'finance' | 'career' | 'life';

interface Source {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'text';
  selected: boolean;
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  citations?: number[];
  type: 'text' | 'widget';
  widget?: {
    type: 'plan' | 'budget' | 'doc';
    title: string;
    data: any;
  };
  timestamp: Date;
}

interface ArtifactState {
  type: 'empty' | 'plan' | 'budget' | 'doc';
  content: any;
  isTyping?: boolean;
}

// --- Constants & Data ---

const MODES: { id: ModeType; label: string; icon: any; color: string; bg: string; border: string }[] = [
  { id: 'academic', label: 'Academic Tutor', icon: GraduationCap, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'finance', label: 'Financial Advisor', icon: Wallet, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'career', label: 'Career Coach', icon: Briefcase, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'life', label: 'Life Coach', icon: Brain, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
];

const INITIAL_SOURCES: Source[] = [
  { id: '1', title: 'Physics_Thermodynamics_Ch4.pdf', type: 'pdf', selected: true },
  { id: '2', title: 'My_Bank_Statement_Oct.csv', type: 'text', selected: false },
  { id: '3', title: 'IIT_Bombay_Curriculum.web', type: 'link', selected: true },
];

const INITIAL_PLAN_DATA = {
  title: "JEE Physics: Thermodynamics Mastery",
  progress: 35,
  tasks: [
    { id: 1, title: "Review Laws of Thermodynamics", time: "45 min", status: "completed", tag: "Concept" },
    { id: 2, title: "Solve HCV Objective 1 & 2", time: "60 min", status: "in-progress", tag: "Practice" },
    { id: 3, title: "Watch 'Entropy Visualized' Lecture", time: "20 min", status: "pending", tag: "Video" },
    { id: 4, title: "Attempt PYQ 2021-2023", time: "90 min", status: "pending", tag: "Test" },
  ]
};

const INITIAL_BUDGET_DATA = {
  totalBudget: 5000,
  spent: 3200,
  categories: [
    { name: "Food & Dining", spent: 2200, limit: 2500, color: "bg-orange-500" },
    { name: "Transport", spent: 500, limit: 1000, color: "bg-blue-500" },
    { name: "Books", spent: 300, limit: 1000, color: "bg-green-500" },
    { name: "Subscriptions", spent: 200, limit: 500, color: "bg-purple-500" },
  ]
};

// --- Helper Components ---

const SourceChip = ({ source, toggle }: { source: Source, toggle: (id: string) => void }) => (
  <div 
    onClick={() => toggle(source.id)}
    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 group ${source.selected ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}
  >
    <div className={`p-2 rounded-lg ${source.selected ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-500'}`}>
      {source.type === 'pdf' ? <FileText size={16}/> : source.type === 'link' ? <LinkIcon size={16}/> : <File size={16}/>}
    </div>
    <div className="flex-1 min-w-0">
      <div className={`text-sm font-medium truncate ${source.selected ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>{source.title}</div>
      <div className="text-[10px] text-gray-600 uppercase font-bold mt-0.5">{source.type}</div>
    </div>
    {source.selected && <CheckCircle2 size={16} className="text-blue-400" />}
  </div>
);

// --- Main Component ---

const ChatWorkspace: React.FC<ChatWorkspaceProps> = ({ onBack }) => {
  // State
  const [activeMode, setActiveMode] = useState<ModeType>('academic');
  const [sources, setSources] = useState<Source[]>(INITIAL_SOURCES);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [artifact, setArtifact] = useState<ArtifactState>({ type: 'empty', content: null });
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMode = MODES.find(m => m.id === activeMode) || MODES[0];

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleSource = (id: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      type: 'text',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // 2. Simulate Agent Logic
    setTimeout(() => {
      const lower = text.toLowerCase();
      let aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: '',
        citations: [],
        type: 'text',
        timestamp: new Date()
      };

      if (lower.includes('plan') || lower.includes('study')) {
        aiMsg.content = "Based on **Physics_Thermodynamics_Ch4.pdf**, I've created a study plan focused on the Second Law and Entropy.";
        aiMsg.citations = [1];
        aiMsg.type = 'widget';
        aiMsg.widget = { type: 'plan', title: 'Thermodynamics Master Plan', data: INITIAL_PLAN_DATA };
        setArtifact({ type: 'plan', content: INITIAL_PLAN_DATA, isTyping: true });
        setRightPanelOpen(true);
        setTimeout(() => setArtifact(prev => ({...prev, isTyping: false})), 1500);
      
      } else if (lower.includes('budget') || lower.includes('money')) {
        aiMsg.content = "Analyzing **My_Bank_Statement_Oct.csv**... You have overspent on Food & Dining by 15% this month.";
        aiMsg.citations = [2];
        aiMsg.type = 'widget';
        aiMsg.widget = { type: 'budget', title: 'Monthly Spending Analysis', data: INITIAL_BUDGET_DATA };
        setArtifact({ type: 'budget', content: INITIAL_BUDGET_DATA });
        setRightPanelOpen(true);

      } else {
        aiMsg.content = "I can help with that. I'm reviewing your selected sources to provide a contextual answer.";
      }

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-[#0B1120] text-gray-100 overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- COLUMN 1: SOURCES (Left, Fixed 280px) --- */}
      <div className="w-[280px] flex flex-col border-r border-white/5 bg-[#0F172A]">
        {/* Header */}
        <div className="h-16 flex items-center px-5 border-b border-white/5 gap-3">
          <div 
            onClick={onBack} 
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors"
          >
            <LayoutGrid size={16} className="text-gray-400"/>
          </div>
          <span className="font-bold text-gray-200">Notebook</span>
        </div>

        {/* Sources List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          <div>
            <div className="flex justify-between items-center px-1 mb-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Context Sources</h3>
              <button className="text-gray-500 hover:text-white transition-colors"><Plus size={14}/></button>
            </div>
            <div className="space-y-1">
              {sources.map(s => (
                <SourceChip key={s.id} source={s} toggle={toggleSource} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1 mb-3">Memories</h3>
            <div className="p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Brain size={14} className="text-purple-400"/>
                <span className="text-sm font-medium text-gray-300">Exam Goal: JEE 2026</span>
              </div>
              <p className="text-xs text-gray-500 pl-6">Target: IIT Bombay CSE</p>
            </div>
          </div>

        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">RS</div>
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-200">Rahul Sharma</div>
              <div className="text-[10px] text-gray-500">Free Plan</div>
            </div>
            <Settings size={14} className="text-gray-500"/>
          </div>
        </div>
      </div>

      {/* --- COLUMN 2: MAIN CHAT (Center, Fluid) --- */}
      <div className="flex-1 flex flex-col relative bg-[#0B1120]">
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 sticky top-0 bg-[#0B1120]/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-3 relative">
            <div className={`p-2 rounded-lg ${currentMode.bg} ${currentMode.color}`}>
              <currentMode.icon size={18} />
            </div>
            
            {/* Mode Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                className="flex flex-col items-start hover:bg-white/5 p-1 rounded-lg transition-colors group"
              >
                <span className="text-sm font-bold text-white flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                  {currentMode.label} <ChevronDown size={14} className={`text-gray-600 transition-transform ${isModeDropdownOpen ? 'rotate-180' : ''}`}/>
                </span>
                <span className="text-[10px] text-gray-500">
                  Using {sources.filter(s => s.selected).length} sources
                </span>
              </button>

              {isModeDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#1E293B] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                  {MODES.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => { setActiveMode(mode.id); setIsModeDropdownOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5 ${activeMode === mode.id ? 'bg-white/5 text-white' : 'text-gray-400'}`}
                    >
                      <div className={`p-1.5 rounded-lg ${mode.bg} ${mode.color}`}>
                        <mode.icon size={14} />
                      </div>
                      {mode.label}
                      {activeMode === mode.id && <CheckCircle2 size={14} className="ml-auto text-blue-400"/>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={`p-2 rounded-lg transition-colors ${rightPanelOpen ? 'text-blue-400 bg-blue-500/10' : 'text-gray-500 hover:text-white'}`}
            >
              <Sidebar size={18} className="rotate-180"/>
            </button>
          </div>
        </header>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth no-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center pb-20 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className={`w-20 h-20 rounded-3xl ${currentMode.bg} border ${currentMode.border} flex items-center justify-center mb-8 shadow-2xl shadow-${currentMode.color.split('-')[1]}-500/10`}>
                 <Sparkles size={40} className={currentMode.color} />
               </div>
               <h2 className="text-3xl font-bold text-white mb-3">Hello, Rahul.</h2>
               <p className="text-gray-400 text-center max-w-md mb-8 text-lg">
                 I'm ready to help with your {currentMode.label.toLowerCase()}. <br/> What should we work on today?
               </p>
               
               <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                 {['Create a study plan', 'Analyze my spending', 'Draft a resume', 'Quiz me on Physics'].map(cmd => (
                   <button 
                     key={cmd}
                     onClick={() => handleSendMessage(cmd)}
                     className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-sm font-medium text-gray-300 transition-all text-left hover:scale-[1.02] active:scale-95"
                   >
                     {cmd}
                   </button>
                 ))}
               </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] rounded-2xl p-5 ${
                msg.role === 'user' 
                  ? 'bg-white/10 text-white rounded-br-sm' 
                  : 'bg-transparent text-gray-200 pl-0'
              }`}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <Bot size={12} className={currentMode.color} /> Agent Response
                  </div>
                )}
                
                <p className="leading-relaxed text-[15px] whitespace-pre-wrap">{msg.content}</p>
                
                {/* Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {msg.citations.map(c => (
                      <div key={c} className="flex items-center gap-1 px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20 cursor-pointer hover:bg-blue-500/20">
                        <FileText size={10}/> Source {c}
                      </div>
                    ))}
                  </div>
                )}

                {/* Widget Preview inside chat */}
                {msg.type === 'widget' && msg.widget && (
                  <div 
                    onClick={() => { setArtifact({ type: msg.widget!.type, content: msg.widget!.data }); setRightPanelOpen(true); }}
                    className="mt-4 p-3 bg-gray-800/50 border border-white/10 rounded-xl hover:border-blue-500/50 hover:bg-gray-800 transition-all cursor-pointer flex items-center gap-4 group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center ${currentMode.color}`}>
                      {msg.widget.type === 'plan' ? <CheckSquare size={20}/> : <BarChart3 size={20}/>}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 font-bold uppercase mb-0.5">Generated Artifact</div>
                      <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{msg.widget.title}</div>
                    </div>
                    <ArrowRight size={16} className="text-gray-500 group-hover:translate-x-1 transition-transform"/>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500 pl-1">
              <Bot size={16} className={currentMode.color} />
              <span className="text-xs font-medium animate-pulse">Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} className="h-20" /> {/* Spacer */}
        </div>

        {/* Floating Input */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-30">
          <div className="bg-[#1E293B]/80 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl shadow-black/50 flex items-center gap-2 ring-1 ring-white/5 transition-all focus-within:ring-blue-500/50 focus-within:border-blue-500/50">
            
            {/* Attachment Button */}
            <div className="pl-1">
              <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Plus size={18} className="text-gray-400 group-hover:text-white"/>
              </button>
            </div>

            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              placeholder={`Message ${currentMode.label}...`}
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 py-3 px-2 max-h-32 min-h-[48px] resize-none"
              rows={1}
            />
            
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <Mic size={20} />
            </button>
            <button 
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className={`p-2.5 rounded-full transition-all ${inputValue.trim() ? 'bg-blue-600 text-white shadow-lg hover:scale-105' : 'bg-white/5 text-gray-600'}`}
            >
              <Send size={18} fill={inputValue.trim() ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      {/* --- COLUMN 3: ARTIFACT CANVAS (Right, Collapsible) --- */}
      {rightPanelOpen && (
        <div className="w-[400px] xl:w-[500px] flex flex-col bg-[#0F172A] border-l border-white/5 z-20 shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0F172A]">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
              {artifact.type !== 'empty' && (
                <>
                  <div className={`w-2 h-2 rounded-full ${currentMode.bg.replace('/10', '')}`}></div>
                  {artifact.type === 'plan' ? 'Study Plan' : artifact.type === 'budget' ? 'Financial Report' : 'Document'}
                </>
              )}
              {artifact.type === 'empty' && 'Workspace'}
            </div>
            <div className="flex gap-1">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><Maximize2 size={16}/></button>
              <button onClick={() => setRightPanelOpen(false)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><X size={16}/></button>
            </div>
          </header>

          {/* Canvas Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#0B1120]">
            
            {/* EMPTY STATE */}
            {artifact.type === 'empty' && (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
                <LayoutGrid size={48} className="mb-4 stroke-1"/>
                <p className="text-sm">Artifacts will appear here</p>
              </div>
            )}

            {/* PLAN STATE */}
            {artifact.type === 'plan' && artifact.content && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-6 rounded-2xl border border-blue-500/20">
                  <h2 className="text-xl font-bold text-white mb-1">{artifact.content.title}</h2>
                  <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
                    <Clock size={12}/> Target: Today
                  </div>
                  
                  <div className="mt-6 flex items-end justify-between mb-2">
                    <span className="text-xs text-gray-400 font-bold uppercase">Progress</span>
                    <span className="text-sm font-bold text-white">{artifact.content.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[35%] rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  {artifact.content.tasks.map((task: any) => (
                    <div key={task.id} className="group flex items-start gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:border-blue-500/30 transition-all cursor-pointer">
                      <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center ${task.status === 'completed' ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-600'}`}>
                        {task.status === 'completed' && <CheckSquare size={12}/>}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{task.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400">{task.time}</span>
                          <span className="text-[10px] text-gray-500">{task.tag}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BUDGET STATE */}
            {artifact.type === 'budget' && artifact.content && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 text-center">
                  <div className="text-xs text-emerald-400 font-bold uppercase mb-1">Total Spent</div>
                  <div className="text-3xl font-bold text-white">₹{artifact.content.spent}</div>
                  <div className="text-xs text-gray-400 mt-1">Limit: ₹{artifact.content.totalBudget}</div>
                </div>

                <div className="space-y-4">
                  {artifact.content.categories.map((cat: any, i: number) => (
                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold text-gray-300">{cat.name}</span>
                        <span className={cat.spent > cat.limit ? 'text-red-400' : 'text-gray-400'}>₹{cat.spent} / ₹{cat.limit}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${cat.spent > cat.limit ? 'bg-red-500' : cat.color}`} 
                          style={{ width: `${Math.min((cat.spent / cat.limit) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default ChatWorkspace;
