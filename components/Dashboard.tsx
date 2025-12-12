
import React, { useState } from 'react';
import { 
  Bell, Search, Menu, X, Mic, Send, Plus, CheckCircle2, 
  ArrowRight, LayoutDashboard, Settings, LogOut, MessageSquare, 
  TrendingUp, Clock, Calendar, Sparkles, Moon, Sun, Wallet, 
  BookOpen, Target, Trophy, Briefcase, Play, Pause, 
  Zap, Brain, ChevronRight, AlertTriangle, 
  Users, Music, Check, MoreHorizontal, ChevronDown,
  Headphones, Wind, CheckSquare, Flame, BarChart3,
  CreditCard, PieChart, FileText, LayoutGrid, Microscope,
  GraduationCap, FileBadge, Network, User, HelpCircle,
  Laptop, Code, Beaker, Globe, Rocket, PenTool
} from 'lucide-react';
import LifeAreaDetail from './LifeAreaDetail';
import SettingsPage from './Settings';

// --- STYLES ---
// Using Tailwind dark mode classes
const GLASS_CARD = "bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/5 rounded-2xl shadow-lg";
const PROGRESS_CIRCLE = (pct: number, color: string) => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <svg className="w-full h-full transform -rotate-90">
      <circle cx="24" cy="24" r="20" className="stroke-gray-200 dark:stroke-[#334155]" strokeWidth="4" fill="transparent" />
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="4" fill="transparent" strokeDasharray={125.6} strokeDashoffset={125.6 * (1 - pct/100)} strokeLinecap="round" />
    </svg>
    <span className="absolute text-[10px] font-bold text-gray-900 dark:text-white">{pct}%</span>
  </div>
);

// --- MAIN DASHBOARD COMPONENT ---

interface DashboardProps {
  onLogout: () => void;
  onOpenChat?: () => void;
  // Appearance Props passed from App
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
  accentColor?: string;
  setAccentColor?: (color: string) => void;
  density?: 'compact' | 'comfortable';
  setDensity?: (density: 'compact' | 'comfortable') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onLogout, 
  onOpenChat,
  theme = 'dark',
  toggleTheme = () => {},
  accentColor = '#2563EB',
  setAccentColor = () => {},
  density = 'comfortable',
  setDensity = () => {}
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLifeAreaId, setActiveLifeAreaId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'profile' | 'ai' | 'notifications' | 'appearance' | 'billing'>('profile');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  if (isSettingsOpen) {
    return (
      <SettingsPage 
        onBack={() => setIsSettingsOpen(false)} 
        onLogout={onLogout} 
        currentTheme={theme === 'dark'} 
        onToggleTheme={toggleTheme}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        density={density}
        setDensity={setDensity}
        initialTab={settingsTab}
      />
    );
  }

  // --- SUB-COMPONENTS FOR DASHBOARD ---

  const Sidebar = () => (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-[#0F172A] border-r border-gray-200 dark:border-white/5 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
      {/* LOGO */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-white/5 shrink-0">
        <LayoutGrid className="text-primary mr-3" size={24} />
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">KALVI AI</span>
      </div>

      {/* MAIN NAV */}
      <div className="p-4 space-y-1 overflow-y-auto flex-1 no-scrollbar">
        <button onClick={() => setActiveLifeAreaId(null)} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-colors font-medium ${!activeLifeAreaId ? 'bg-primary/10 text-primary' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'}`}>
            <LayoutDashboard size={18}/> <span>Home</span>
        </button>
        <button onClick={onOpenChat} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 font-medium transition-colors">
            <MessageSquare size={18}/> <span>AI Chat</span>
        </button>

        <div className="pt-6 pb-2 px-3 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Life Areas</div>

        {/* 1. Money & Finance */}
        <button onClick={() => setActiveLifeAreaId('money')} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 group transition-colors">
            <div className="flex items-center gap-3">
                <Wallet size={18} className="text-emerald-500" />
                <span className="text-sm truncate">Money & Finance</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">78%</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            </div>
        </button>

        {/* 2. Academics */}
        <button onClick={() => setActiveLifeAreaId('academics')} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-blue-500" />
                <span className="text-sm">Academics</span>
            </div>
            <ChevronRight size={14} className="text-gray-400 dark:text-slate-400"/>
        </button>

        {/* 3. Exam Prep (JEE) */}
        <div className="space-y-1">
            <button onClick={() => setActiveLifeAreaId('examprep')} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-900 dark:text-white bg-gray-100 dark:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                    <Target size={18} className="text-orange-500" />
                    <span className="text-sm">Exam Prep (JEE)</span>
                </div>
                <ChevronDown size={14} className="text-gray-500 dark:text-slate-400"/>
            </button>
            <div className="pl-10 pr-3 space-y-1">
                <div className="flex justify-between items-center py-1.5 text-xs text-gray-500 dark:text-slate-400">
                    <span>JEE Main 2026</span>
                    <span className="text-[9px] bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded border border-yellow-200 dark:border-yellow-500/20">Needs Work</span>
                </div>
            </div>
        </div>

        {/* 4. Career */}
        <button onClick={() => setActiveLifeAreaId('career')} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
                <Briefcase size={18} className="text-purple-500" />
                <span className="text-sm">Career</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] text-purple-600 dark:text-purple-400">75%</span>
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            </div>
        </button>

        {/* Other Items */}
        {[
            { id: 'skills', label: 'Skills & Learning', icon: Code, color: 'text-amber-500', pct: '10%', dot: 'bg-amber-500' },
            { id: 'entrepreneurship', label: 'Entrepreneurship', icon: Rocket, color: 'text-emerald-500', pct: '5%', dot: 'bg-emerald-500' },
            { id: 'hackathons', label: 'Hackathons', icon: Trophy, color: 'text-yellow-500', pct: '30%', dot: 'bg-yellow-500' },
            { id: 'internships', label: 'Internships', icon: Briefcase, color: 'text-pink-500', pct: '45%', dot: 'bg-pink-500' },
            { id: 'research', label: 'Research & Projects', icon: Microscope, color: 'text-cyan-500', pct: '40%', dot: 'bg-cyan-500' },
            { id: 'higher-ed', label: 'Higher Education', icon: GraduationCap, color: 'text-red-500', pct: '25%', dot: 'bg-red-500' },
            { id: 'growth', label: 'Personal Growth', icon: Brain, color: 'text-rose-500', pct: '60%', dot: 'bg-rose-500' },
            { id: 'insights', label: 'Insights & Self', icon: Sparkles, color: 'text-blue-500', pct: null, dot: 'bg-blue-500' },
            { id: 'network', label: 'Network', icon: Network, color: 'text-teal-500', pct: '35%', dot: 'bg-teal-500' },
            { id: 'certifications', label: 'Certifications', icon: FileBadge, color: 'text-amber-500', pct: '55%', dot: 'bg-amber-500' },
        ].map(item => (
            <button key={item.id} onClick={() => setActiveLifeAreaId(item.id)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                    <item.icon size={18} className={item.color} />
                    <span className="text-sm truncate">{item.label}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    {item.pct && <span className="text-[10px] text-gray-400 dark:text-slate-500">{item.pct}</span>}
                    {item.dot && <div className={`w-1.5 h-1.5 rounded-full ${item.dot}`}></div>}
                </div>
            </button>
        ))}

      </div>

      {/* BOTTOM ACTIONS */}
      <div className="p-4 border-t border-gray-200 dark:border-white/5 space-y-1 shrink-0">
        <button onClick={() => { setSettingsTab('profile'); setIsSettingsOpen(true); }} className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <Settings size={18}/> <span>Settings</span>
        </button>
        <button onClick={onLogout} className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <LogOut size={18}/> <span>Logout</span>
        </button>
        <div className="pt-2 px-2">
            <button className="flex items-center text-[10px] text-gray-500 dark:text-slate-600 hover:text-gray-700 dark:hover:text-slate-400 transition-colors">
                <ChevronRight size={12} className="rotate-180 mr-1"/> Collapse Sidebar
            </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] text-gray-900 dark:text-white font-sans relative overflow-x-hidden">
      
      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
         {isFabOpen && (
            <div className="flex flex-col items-end gap-3 animate-in slide-in-from-bottom-10 fade-in duration-200 mb-2">
               <button className="flex items-center gap-3 group">
                  <span className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg border border-gray-200 dark:border-white/10">Voice Command</span>
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 flex items-center justify-center text-primary shadow-xl hover:scale-110 transition-transform">
                     <Mic size={20} />
                  </div>
               </button>
               {/* ... other FAB items ... */}
            </div>
         )}
         <button 
            onClick={() => setIsFabOpen(!isFabOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 border border-white/10 ${isFabOpen ? 'bg-slate-700 text-white rotate-45' : 'bg-primary text-white'}`}
         >
            <Plus size={28} />
         </button>
      </div>

      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="lg:ml-64 p-4 md:p-8 relative z-10 min-h-screen flex flex-col">
         
         {/* TOP BAR */}
         <header className="flex justify-between items-center mb-8 sticky top-0 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md z-30 py-2 -mx-4 px-4 md:-mx-8 md:px-8 border-b border-gray-200 dark:border-white/5">
            <div className="flex-1 max-w-xl">
               <div className="relative group">
                  <Search className="absolute left-4 top-2.5 text-gray-400 dark:text-slate-500 group-focus-within:text-primary transition-colors" size={20}/>
                  <input 
                     type="text" 
                     placeholder="Search subjects, notes, ask AI..." 
                     className="w-full bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
                  />
               </div>
            </div>
            <div className="flex items-center space-x-4 ml-4">
               <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
               </button>
               <button className="relative p-2 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#0F172A]"></span>
               </button>
               
               <div className="relative">
                  <button 
                     onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                     className="flex items-center gap-3 focus:outline-none pl-2 border-l border-gray-200 dark:border-white/10"
                  >
                     <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white shadow-lg">
                        RS
                     </div>
                     <div className="hidden md:flex items-center text-sm font-medium text-gray-900 dark:text-white">
                        Rahul <ChevronDown size={14} className="ml-2 text-gray-500 dark:text-slate-400"/>
                     </div>
                  </button>
                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                     <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl py-1 z-50">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5">
                           <p className="text-sm font-bold text-gray-900 dark:text-white">Rahul Sharma</p>
                           <p className="text-xs text-gray-500 dark:text-slate-400">rahul.sharma@example.com</p>
                        </div>
                        <button onClick={() => { setSettingsTab('profile'); setIsSettingsOpen(true); setIsProfileMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white flex items-center"><User size={16} className="mr-2"/> My Profile</button>
                        <button onClick={() => { setSettingsTab('profile'); setIsSettingsOpen(true); setIsProfileMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white flex items-center"><Settings size={16} className="mr-2"/> Settings</button>
                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white flex items-center"><HelpCircle size={16} className="mr-2"/> Help Center</button>
                        <div className="border-t border-gray-100 dark:border-white/5 mt-1">
                           <button onClick={onLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center"><LogOut size={16} className="mr-2"/> Logout</button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </header>

         {activeLifeAreaId ? (
            <LifeAreaDetail id={activeLifeAreaId} onBack={() => setActiveLifeAreaId(null)} />
         ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
               
               {/* 1. WELCOME CARD */}
               <div className="bg-white dark:bg-[#172033] rounded-3xl p-8 relative overflow-hidden shadow-xl dark:shadow-2xl border border-gray-200 dark:border-white/5">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 dark:bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                  <div className="relative z-10">
                     <div className="flex items-start gap-5 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-bold text-white shadow-lg shrink-0">
                           RS
                        </div>
                        <div>
                           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Good morning, Rahul!</h1>
                           <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-slate-400 text-sm">
                              <span>Saturday, December 13, 2025</span>
                              <div className="flex gap-2">
                                 <span className="bg-orange-50 dark:bg-[#2D1B15] text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold border border-orange-100 dark:border-orange-500/20 flex items-center">
                                    <Flame size={12} className="mr-1"/> 7 Day Streak
                                 </span>
                                 <span className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 dark:border-white/10 flex items-center">
                                    <CheckSquare size={12} className="mr-1"/> 3 tasks pending
                                 </span>
                                 <span className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 dark:border-white/10 flex items-center">
                                    <Wallet size={12} className="mr-1"/> ₹1,800 left
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-gray-50 dark:bg-[#1E293B]/80 border border-gray-200 dark:border-white/10 rounded-xl p-1 flex items-center shadow-inner dark:shadow-lg">
                        <Sparkles className="text-primary ml-4 mr-3" size={20} />
                        <input 
                           type="text" 
                           placeholder="Ask Kalvi AI anything..." 
                           className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 outline-none text-base py-3"
                        />
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Mic size={20}/></button>
                        <button className="p-2 bg-primary hover:bg-primary-hover rounded-lg text-white shadow-lg transition-colors ml-1"><Send size={18}/></button>
                     </div>
                  </div>
               </div>

               {/* 2. FOCUS MODE WIDGET */}
               <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/5 rounded-2xl p-2 flex flex-col md:flex-row items-center justify-between shadow-lg">
                  <div className="flex items-center gap-4 px-4 py-2 w-full md:w-auto">
                     <div className="flex items-center gap-3 text-gray-900 dark:text-white font-bold text-sm tracking-wide uppercase">
                        <Headphones size={18} className="text-gray-400 dark:text-slate-300"/> Focus Mode
                     </div>
                     <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-2 hidden md:block"></div>
                     <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                        {['Focus', 'Calm', 'Sleep', 'Energy'].map((mode) => (
                           <button key={mode} className="px-4 py-1.5 rounded-lg bg-gray-100 dark:bg-[#2E3B4E] border border-gray-200 dark:border-white/5 text-gray-600 dark:text-slate-300 text-xs font-medium hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap">
                              {mode === 'Focus' && <Brain size={12}/>}
                              {mode === 'Calm' && <Wind size={12}/>}
                              {mode === 'Sleep' && <Moon size={12}/>}
                              {mode === 'Energy' && <Zap size={12}/>}
                              {mode}
                           </button>
                        ))}
                     </div>
                  </div>
                  <div className="px-4 py-2 text-xs text-gray-500 dark:text-slate-400 font-medium flex items-center">
                     Select a mode to start <span className="font-bold text-gray-900 dark:text-white ml-1 cursor-pointer hover:underline">Expand ↗</span>
                  </div>
               </div>

               {/* 3. ALERTS & TASKS GRID */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Urgent Alerts */}
                  <div className="space-y-4">
                     <div className="flex justify-between items-end mb-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center"><Bell className="mr-2" size={20}/> Urgent Alerts</h3>
                        <button className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white">Clear All</button>
                     </div>
                     
                     {/* Alert 1 */}
                     <div className="bg-white dark:bg-[#1E293B] border-l-4 border-l-red-500 rounded-r-xl p-4 flex gap-4 relative overflow-hidden group hover:bg-gray-50 dark:hover:bg-[#253045] transition-colors border border-t-0 border-r-0 border-b-0 shadow-sm">
                        <div className="mt-1"><AlertTriangle className="text-red-500" size={20} /></div>
                        <div className="flex-1">
                           <h4 className="text-red-600 dark:text-red-400 font-bold text-sm">Google STEP closes in 2 days</h4>
                           <p className="text-gray-500 dark:text-slate-400 text-xs mt-1">Application deadline approaching.</p>
                           <p className="text-gray-400 dark:text-slate-500 text-[10px] mt-2 font-bold uppercase">2 HOURS AGO</p>
                           <div className="flex gap-2 mt-3">
                              <button className="px-4 py-1.5 bg-red-50 dark:bg-[#3F1D1D] hover:bg-red-100 dark:hover:bg-[#4F2525] text-red-600 dark:text-red-300 text-xs font-bold rounded-lg border border-red-200 dark:border-red-500/20 transition-colors">Act Now</button>
                              <button className="px-4 py-1.5 bg-gray-100 dark:bg-[#2E3B4E] hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs font-bold rounded-lg border border-gray-200 dark:border-white/5 transition-colors">Snooze</button>
                           </div>
                        </div>
                        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-900 dark:hover:text-white"><X size={14}/></button>
                     </div>

                     {/* Alert 2 */}
                     <div className="bg-white dark:bg-[#1E293B] border-l-4 border-l-red-500 rounded-r-xl p-4 flex gap-4 relative overflow-hidden group hover:bg-gray-50 dark:hover:bg-[#253045] transition-colors border border-t-0 border-r-0 border-b-0 shadow-sm">
                        <div className="mt-1"><AlertTriangle className="text-red-500" size={20} /></div>
                        <div className="flex-1">
                           <h4 className="text-red-600 dark:text-red-400 font-bold text-sm">Physics Mock Test today 4 PM</h4>
                           <p className="text-gray-500 dark:text-slate-400 text-xs mt-1">Chapter: Rotational Motion</p>
                           <p className="text-gray-400 dark:text-slate-500 text-[10px] mt-2 font-bold uppercase">4 HOURS AGO</p>
                           <div className="flex gap-2 mt-3">
                              <button className="px-4 py-1.5 bg-red-50 dark:bg-[#3F1D1D] hover:bg-red-100 dark:hover:bg-[#4F2525] text-red-600 dark:text-red-300 text-xs font-bold rounded-lg border border-red-200 dark:border-red-500/20 transition-colors">Act Now</button>
                              <button className="px-4 py-1.5 bg-gray-100 dark:bg-[#2E3B4E] hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs font-bold rounded-lg border border-gray-200 dark:border-white/5 transition-colors">Snooze</button>
                           </div>
                        </div>
                     </div>

                     {/* Alert 3 */}
                     <div className="bg-white dark:bg-[#1E293B] border-l-4 border-l-yellow-500 rounded-r-xl p-4 flex gap-4 relative overflow-hidden hover:bg-gray-50 dark:hover:bg-[#253045] transition-colors border border-t-0 border-r-0 border-b-0 shadow-sm">
                        <div className="mt-1"><div className="w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-500 font-bold text-xs">₹</div></div>
                        <div className="flex-1">
                           <h4 className="text-gray-900 dark:text-white font-bold text-sm">85% of food budget used</h4>
                           <p className="text-gray-500 dark:text-slate-400 text-xs mt-1">5 days left in month</p>
                           <p className="text-gray-400 dark:text-slate-500 text-[10px] mt-2 font-bold uppercase">YESTERDAY</p>
                        </div>
                     </div>
                  </div>

                  {/* Right: Today's Tasks */}
                  <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex flex-col h-full shadow-lg">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center"><CheckCircle2 className="mr-2 text-green-500" size={20}/> Today's Tasks</h3>
                        <div className="flex bg-gray-100 dark:bg-[#0F172A] rounded-lg p-0.5 border border-gray-200 dark:border-white/5">
                           <button className="px-3 py-1 text-[10px] font-bold bg-white dark:bg-[#2E3B4E] text-gray-900 dark:text-white rounded shadow-sm">All</button>
                           <button className="px-3 py-1 text-[10px] font-bold text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors">Pending</button>
                           <button className="px-3 py-1 text-[10px] font-bold text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors">Completed</button>
                        </div>
                     </div>

                     <div className="space-y-1 flex-1 overflow-y-auto no-scrollbar pr-1">
                        {[
                           { title: 'Complete Kinematics revision', tag: 'HIGH', time: '1 hr', status: 'done' },
                           { title: 'Watch Organic Chemistry video', tag: 'MEDIUM', time: '45 min', status: 'done' },
                           { title: "Log today's expenses", tag: 'LOW', time: '5 min', status: 'done' },
                           { title: 'Practice 25 MCQs — Thermodynamics', tag: 'HIGH', time: '1.5 hr', status: 'pending' },
                           { title: 'Update resume with new project', tag: 'MEDIUM', time: '30 min', status: 'pending' },
                           { title: 'Read 1 chapter — Aptitude', tag: 'LOW', time: '20 min', status: 'pending' },
                        ].map((task, i) => (
                           <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border border-transparent hover:bg-gray-50 dark:hover:bg-[#2E3B4E] hover:border-gray-200 dark:hover:border-white/5 transition-colors group cursor-pointer ${task.status === 'done' ? 'opacity-70' : ''}`}>
                              {task.status === 'done' ? (
                                 <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white dark:text-[#0F172A] shrink-0"><Check size={12} strokeWidth={4}/></div>
                              ) : (
                                 <div className="w-5 h-5 rounded-full border-2 border-gray-400 dark:border-slate-600 group-hover:border-gray-600 dark:group-hover:border-slate-400 shrink-0"></div>
                              )}
                              
                              <div className="flex-1 min-w-0">
                                 <div className={`text-sm font-medium truncate ${task.status === 'done' ? 'text-gray-400 dark:text-slate-400 line-through' : 'text-gray-900 dark:text-white'}`}>{task.title}</div>
                                 <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                                       task.tag === 'HIGH' ? 'bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20' : 
                                       task.tag === 'MEDIUM' ? 'bg-yellow-50 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20' : 
                                       'bg-green-50 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20'
                                    }`}>{task.tag}</span>
                                    <span className="text-[10px] text-gray-500 dark:text-slate-500 flex items-center"><Clock size={10} className="mr-1"/> {task.time}</span>
                                 </div>
                              </div>
                              <button className="opacity-0 group-hover:opacity-100 text-gray-400 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"><MoreHorizontal size={16}/></button>
                           </div>
                        ))}
                     </div>
                     <div className="pt-3 mt-2 border-t border-gray-200 dark:border-white/5 flex justify-between items-center text-xs text-gray-500 dark:text-slate-400">
                        <span>3/6 completed</span>
                        <button className="text-primary hover:text-primary-hover font-bold flex items-center">+ Add Task</button>
                     </div>
                  </div>
               </div>

               {/* 4. LIFE AREAS GRID */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Card 1: Money */}
                  <div onClick={() => setActiveLifeAreaId('money')} className={`${GLASS_CARD} p-5 cursor-pointer hover:border-emerald-500/50 transition-colors group`}>
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              <Wallet className="text-emerald-500" size={20} />
                           </div>
                           <h4 className="font-bold text-gray-900 dark:text-white text-base">Money & Finance</h4>
                           <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">₹3,200 spent</p>
                        </div>
                        {PROGRESS_CIRCLE(78, '#10B981')}
                     </div>
                     <div className="inline-flex items-center px-2 py-1 rounded bg-orange-50 dark:bg-[#2D1B15] border border-orange-200 dark:border-orange-500/20 text-[10px] font-bold text-orange-600 dark:text-orange-400">
                        <AlertTriangle size={10} className="mr-1.5"/> Food budget low
                     </div>
                     <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex justify-between items-center text-xs text-gray-400 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        <span>Open Details</span>
                        <ArrowRight size={14} />
                     </div>
                  </div>

                  {/* Card 2: Academics */}
                  <div onClick={() => setActiveLifeAreaId('academics')} className={`${GLASS_CARD} p-5 cursor-pointer hover:border-blue-500/50 transition-colors group`}>
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                              <BookOpen className="text-blue-500" size={20} />
                           </div>
                           <h4 className="font-bold text-gray-900 dark:text-white text-base">Academics</h4>
                           <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Semester 5</p>
                        </div>
                        {PROGRESS_CIRCLE(65, '#3B82F6')}
                     </div>
                     <div className="inline-flex items-center px-2 py-1 rounded bg-gray-100 dark:bg-[#172033] border border-gray-200 dark:border-white/10 text-[10px] font-bold text-gray-600 dark:text-slate-300">
                        OS Exam in 12 days
                     </div>
                     <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex justify-between items-center text-xs text-gray-400 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        <span>Open Details</span>
                        <ArrowRight size={14} />
                     </div>
                  </div>
                  
                  {/* Rest of the cards logic would go here */}
               </div>

               <div className="flex justify-center">
                  <button className="px-6 py-2.5 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold text-gray-500 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#253045] transition-all">
                     Show 6 More Areas
                  </button>
               </div>

               {/* 5. WEEKLY PROGRESS */}
               <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center"><BarChart3 className="mr-2 text-indigo-500" size={20}/> Weekly Progress</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                        { label: 'Study Time', value: '24 hrs', trend: '+3 hrs', trendGood: true, icon: Clock, color: 'blue' },
                        { label: 'Topics Done', value: '15', trend: '+5 more', trendGood: true, icon: BookOpen, color: 'purple' },
                        { label: 'Saved', value: '₹800', trend: '+₹200', trendGood: true, icon: Wallet, color: 'emerald' },
                        { label: 'Tasks Done', value: '85%', trend: '+10%', trendGood: true, icon: CheckCircle2, color: 'orange' }
                     ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/5 p-4 rounded-xl relative overflow-hidden shadow-sm">
                           <div className={`absolute top-0 right-0 w-16 h-16 bg-${stat.color}-500/5 rounded-full -mr-4 -mt-4`}></div>
                           <stat.icon className={`text-${stat.color}-500 mb-2`} size={20} />
                           <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                           <div className="text-xs text-gray-500 dark:text-slate-500 font-bold uppercase mb-2">{stat.label}</div>
                           <div className="inline-flex items-center text-[10px] font-bold bg-gray-100 dark:bg-[#0F172A] px-2 py-0.5 rounded text-green-600 dark:text-green-400">
                              <TrendingUp size={10} className="mr-1"/> {stat.trend}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* 6. BOTTOM: INSIGHTS & UPCOMING */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
                  {/* AI Insights */}
                  <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-lg">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center"><Sparkles className="mr-2 text-indigo-400" size={18}/> AI Insights</h3>
                        <button className="text-xs font-bold text-primary hover:text-primary-hover">See All</button>
                     </div>
                     <div className="space-y-3">
                        <div className="bg-gray-50 dark:bg-[#1E293B] p-4 rounded-xl border border-gray-200 dark:border-white/5 relative group">
                           <div className="flex items-start gap-4">
                              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500 dark:text-indigo-400"><Clock size={18}/></div>
                              <div className="flex-1">
                                 <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-2">You study best between <span className="text-gray-900 dark:text-white font-bold">10 PM - 1 AM</span>. I've scheduled hard topics for this time.</p>
                                 <button className="text-xs font-bold text-primary hover:underline">View Schedule →</button>
                              </div>
                              <button className="text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white"><X size={14}/></button>
                           </div>
                        </div>
                        {/* More insights... */}
                     </div>
                  </div>

                  {/* Upcoming */}
                  <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-lg">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center"><Calendar className="mr-2 text-gray-400 dark:text-slate-400" size={18}/> Upcoming</h3>
                        <button className="text-xs font-bold text-gray-500 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white">Full Calendar</button>
                     </div>
                     {/* ... calendar content ... */}
                  </div>
               </div>

            </div>
         )}
      </div>
    </div>
  );
};

export default Dashboard;
