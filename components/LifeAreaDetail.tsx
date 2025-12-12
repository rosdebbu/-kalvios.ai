
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Upload, Target, Search, Trophy, Users, Briefcase, 
  Heart, MessageCircle, Microscope, GitBranch, Lightbulb, GraduationCap, 
  CheckSquare, Brain, Battery, Layers, Activity, Clock, Share2, Mail, 
  FileBadge, Award, Hourglass, ArrowRight, Zap, RefreshCw, AlertTriangle,
  CheckCircle2, Lock, ChevronRight, Download, Play, TrendingUp, Plus,
  FileText, HelpCircle, MousePointer2, ChevronDown, BookOpen, BarChart3,
  X, PenTool, Layout, Library, MessageSquare, Quote, MoveRight,
  MoreHorizontal, Sparkles, File, Wallet, PieChart, CreditCard, DollarSign,
  Coffee, ShoppingBag, Bus, Monitor, MapPin, Globe, Linkedin, Github, Save,
  Flame, TrendingDown, Calendar, Skull, ScanLine, FileQuestion, AlertCircle, Check,
  RotateCw, School, Network, MousePointer, Mic, Volume2, Pause, Paperclip,
  Maximize2, Radio, UploadCloud, Timer, Hash, UserCheck, Split, Compass,
  Book, FileCheck, Edit3, ClipboardList, PenLine, Bot, MicOff, Video, Sliders,
  Send, User, Sun, Moon, Sunrise, Sunset, Shield, Flag, Cloud,
  LayoutGrid, Smile, Code, Music, Building2, Leaf, Rocket
} from 'lucide-react';
import InsightsView from './InsightsView';
import MoneyView from './MoneyView';
import ResearchView from './ResearchView';
import HigherEducationView from './HigherEducationView';
import PersonalGrowthView from './PersonalGrowthView';
import NetworkView from './NetworkView';
import CertificationsView from './CertificationsView';
import HackathonsView from './HackathonsView';
import InternshipsView from './InternshipsView';
import SmartNotebook from './SmartNotebook';
import ExamPrepView from './ExamPrepView';
import SkillsLearningView from './SkillsLearningView';
import EntrepreneurshipView from './EntrepreneurshipView';

// --- VISUAL ENGINE STYLES ---
const styles = `
  /* Advanced Glassmorphism Base */
  .glass-workspace {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }
  
  /* Input Fields */
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

  /* --- EXAM PREP STYLES --- */
  
  .digital-font {
    font-family: 'Courier Prime', 'Courier New', monospace;
    font-variant-numeric: tabular-nums;
  }
  
  .exam-timeline-line {
    position: absolute;
    top: 2rem;
    bottom: 0;
    left: 19px;
    width: 2px;
    background-image: linear-gradient(to bottom, #334155 50%, transparent 50%);
    background-size: 2px 10px;
    background-repeat: repeat-y;
  }

  .heatmap-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }
  .heatmap-cell {
    aspect-ratio: 1;
    border-radius: 4px;
    transition: transform 0.2s;
  }
  .heatmap-cell:hover {
    transform: scale(1.1);
    z-index: 10;
    border: 1px solid white;
  }

  /* --- CAREER VIEW STYLES --- */
  .radar-chart {
    filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3));
  }
  .radar-polygon {
    fill: rgba(139, 92, 246, 0.2);
    stroke: #8B5CF6;
    stroke-width: 2;
    transition: all 1s ease-out;
  }
  .ats-score-circle {
    transition: stroke-dashoffset 1.5s ease-in-out;
  }

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
  
  .transaction-item {
    animation: slideDown 0.3s ease-out forwards;
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// --- TYPES & HELPERS ---
const LoadingState = ({ color }: { color: string }) => (
  <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
    <div className={`w-12 h-12 border-4 border-gray-700 border-t-${color}-500 rounded-full animate-spin mb-4`}></div>
    <p className="text-gray-400 text-sm font-mono animate-pulse">AI Agent is analyzing data...</p>
  </div>
);

// --- CareerView ---
const CareerView = () => {
  // Helper Icon for Career View
  const WandIcon = ({ className, size }: { className?: string, size?: number }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M15 4V2" />
      <path d="M15 16v-2" />
      <path d="M8 9h2" />
      <path d="M20 9h2" />
      <path d="M17.8 11.8 19 13" />
      <path d="M15 9h0" />
      <path d="M17.8 6.2 19 5" />
      <path d="m3 21 9-9" />
      <path d="M12.2 6.2 11 5" />
    </svg>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 font-sans" style={{'--accent-color': '#8B5CF6', '--accent-glow': 'rgba(139, 92, 246, 0.4)'} as any}>
      <style>{styles}</style>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Resume ATS Score */}
          <div className="glass-workspace rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden text-center">
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
             
             <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <FileText className="mr-2 text-purple-400"/> Resume ATS Score
             </h3>
             
             <div className="relative w-40 h-40 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="80" cy="80" r="70" fill="transparent" stroke="#1e293b" strokeWidth="10"/>
                   <circle cx="80" cy="80" r="70" fill="transparent" stroke="#8b5cf6" strokeWidth="10" strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round" className="ats-score-circle"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-4xl font-extrabold text-white">75</span>
                   <span className="text-xs text-purple-300 font-bold uppercase">Good</span>
                </div>
             </div>

             <p className="text-sm text-gray-400 mb-6 max-w-xs">
                Your resume is optimized for <span className="text-white font-bold">Frontend Dev</span> roles but lacks <span className="text-red-400">backend keywords</span>.
             </p>

             <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 transition-all w-full flex items-center justify-center">
                <WandIcon className="mr-2" size={16}/> AI Fix Resume
             </button>
          </div>

          {/* 2. Skills Radar */}
          <div className="glass-workspace rounded-2xl p-6 lg:col-span-2 relative">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-xl font-bold text-white flex items-center">
                      <Briefcase className="mr-2 text-purple-400"/> Career Readiness
                   </h3>
                   <p className="text-xs text-gray-400">Target Role: Full Stack Engineer</p>
                </div>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs border border-purple-500/20">Gap Analysis</span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Simulated Radar Chart */}
                <div className="relative h-64 w-full flex items-center justify-center">
                   <svg viewBox="0 0 100 100" className="w-64 h-64 radar-chart overflow-visible">
                      <polygon points="50,10 90,35 90,75 50,90 10,75 10,35" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
                      <polygon points="50,20 80,40 70,70 50,80 30,70 20,40" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" strokeWidth="2" className="radar-polygon animate-in zoom-in duration-1000"/>
                      {/* Labels */}
                      <text x="50" y="5" textAnchor="middle" fill="#94a3b8" fontSize="4">React</text>
                      <text x="95" y="35" textAnchor="start" fill="#94a3b8" fontSize="4">Node.js</text>
                      <text x="95" y="80" textAnchor="start" fill="#94a3b8" fontSize="4">DSA</text>
                      <text x="50" y="98" textAnchor="middle" fill="#94a3b8" fontSize="4">System Design</text>
                      <text x="5" y="80" textAnchor="end" fill="#94a3b8" fontSize="4">Soft Skills</text>
                      <text x="5" y="35" textAnchor="end" fill="#94a3b8" fontSize="4">Projects</text>
                   </svg>
                </div>

                <div className="space-y-4">
                   <h4 className="text-sm font-bold text-gray-300 uppercase">Action Plan</h4>
                   {[
                      { title: 'Build a System Design Project', impact: 'High', color: 'text-red-400' },
                      { title: 'Practice 20 Graph Problems', impact: 'Medium', color: 'text-orange-400' },
                      { title: 'Learn Docker basics', impact: 'Medium', color: 'text-blue-400' }
                   ].map((action, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                         <div className={`w-2 h-2 rounded-full ${action.color === 'text-red-400' ? 'bg-red-500' : action.color === 'text-orange-400' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                         <div className="flex-1">
                            <div className="text-sm font-bold text-gray-200">{action.title}</div>
                            <div className={`text-xs ${action.color}`}>Impact: {action.impact}</div>
                         </div>
                         <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400"><ChevronRight size={16}/></button>
                      </div>
                   ))}
                </div>
             </div>
          </div>

       </div>
       
       {/* 3. Job Tracker (Kanban-lite) */}
       <div className="glass-workspace rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-white flex items-center">
                <Target className="mr-2 text-green-400"/> Application Tracker
             </h3>
             <button className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center">
                <Plus size={14} className="mr-1"/> Add Job
             </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {['Wishlist', 'Applied', 'Interview', 'Offer'].map((status, colIndex) => (
                <div key={status} className="bg-white/5 rounded-xl p-3 border border-white/5 min-h-[200px]">
                   <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 px-1">{status}</h4>
                   <div className="space-y-2">
                      {/* Fake Cards */}
                      {colIndex === 1 && (
                         <div className="bg-gray-800 p-3 rounded-lg border border-white/10 shadow-sm group cursor-pointer hover:border-purple-500/50 transition-all">
                            <div className="flex justify-between items-start mb-2">
                               <div className="w-8 h-8 rounded bg-white flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-5 h-5"/></div>
                               <span className="text-[10px] text-gray-500">2d ago</span>
                            </div>
                            <div className="font-bold text-sm text-white">SDE Intern</div>
                            <div className="text-xs text-gray-400">Google</div>
                         </div>
                      )}
                      {colIndex === 2 && (
                         <div className="bg-gray-800 p-3 rounded-lg border border-white/10 shadow-sm group cursor-pointer hover:border-purple-500/50 transition-all">
                            <div className="flex justify-between items-start mb-2">
                               <div className="w-8 h-8 rounded bg-[#0A66C2] flex items-center justify-center text-white font-bold text-xs">In</div>
                               <span className="text-[10px] text-orange-400 font-bold">Tomorrow</span>
                            </div>
                            <div className="font-bold text-sm text-white">Frontend Dev</div>
                            <div className="text-xs text-gray-400">LinkedIn</div>
                         </div>
                      )}
                   </div>
                </div>
             ))}
          </div>
       </div>

    </div>
  );
};

// --- MAIN WRAPPER COMPONENT ---

interface LifeAreaDetailProps {
  id: string;
  onBack: () => void;
}

const LifeAreaDetail: React.FC<LifeAreaDetailProps> = ({ id, onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
      <style>{styles}</style>
      
      {/* Header */}
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="mr-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><ArrowLeft size={20} /></button>
        <div>
          <h2 className="text-2xl font-bold text-white capitalize">{id === 'examprep' ? 'Exam Prep' : id === 'skills' ? 'Skills & Learning' : id === 'entrepreneurship' ? 'Entrepreneurship' : id} Dashboard</h2>
          <p className="text-sm text-gray-400">AI-Powered Optimization Engine</p>
        </div>
      </div>

      {id === 'money' ? ( <MoneyView /> ) : 
       id === 'academics' ? ( <SmartNotebook /> ) : 
       id === 'examprep' ? ( <ExamPrepView /> ) : 
       id === 'career' ? ( <CareerView /> ) : 
       id === 'research' ? ( <ResearchView /> ) : 
       id === 'network' ? ( <NetworkView /> ) : 
       id === 'insights' ? ( <InsightsView /> ) : 
       id === 'higher-ed' ? ( <HigherEducationView /> ) : 
       id === 'growth' ? ( <PersonalGrowthView /> ) : 
       id === 'certifications' ? ( <CertificationsView /> ) : 
       id === 'hackathons' ? ( <HackathonsView /> ) : 
       id === 'internships' ? ( <InternshipsView /> ) : 
       id === 'skills' ? ( <SkillsLearningView /> ) :
       id === 'entrepreneurship' ? ( <EntrepreneurshipView /> ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-3xl border border-white/5 text-center px-4">
           <div className="w-20 h-20 rounded-2xl bg-gray-800 flex items-center justify-center mb-6 shadow-xl"><ConstructionIcon id={id} /></div>
           <h3 className="text-2xl font-bold text-white mb-3">Module Under Construction</h3>
           <p className="text-gray-400 max-w-md text-lg leading-relaxed">Kalvi AI is currently learning this domain. The <span className="text-white font-bold capitalize">{id}</span> module will be available in the next update.</p>
           <button onClick={onBack} className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors">Go Back</button>
        </div>
      )}
    </div>
  );
};

// Helper for icon
const ConstructionIcon = ({ id }: { id: string }) => {
  if (id === 'academics') return <BookOpen size={40} className="text-blue-500"/>;
  if (id === 'career') return <Briefcase size={40} className="text-purple-500"/>;
  if (id === 'examprep') return <Target size={40} className="text-orange-500"/>;
  if (id === 'growth') return <Brain size={40} className="text-rose-500"/>;
  if (id === 'research') return <Microscope size={40} className="text-teal-500"/>;
  if (id === 'network') return <Network size={40} className="text-lime-500"/>;
  if (id === 'insights') return <Activity size={40} className="text-cyan-500"/>;
  return <Zap size={40} className="text-gray-500"/>;
}

export default LifeAreaDetail;
