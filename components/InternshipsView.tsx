
import React, { useState, useRef, useEffect } from 'react';
import { 
  Briefcase, FileText, Layout, Mic, Play, Pause, 
  CheckCircle2, AlertCircle, Wand2, ArrowRight, 
  Upload, Download, Plus, MoreHorizontal, Calendar,
  Mail, X, ChevronRight, Award, RefreshCw, Sparkles,
  PieChart, GripVertical, Video, Send, Search, Filter,
  Shield, AlertTriangle, Layers, Code
} from 'lucide-react';

const styles = `
  /* --- ANIMATIONS --- */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .shimmer-text {
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    animation: shimmer 2s infinite;
  }

  /* --- CLASSES --- */
  .glass-panel {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }

  .paper-shadow {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0,0,0,0.05);
  }

  /* Resume Preview Scaling */
  .resume-preview {
    transform-origin: top center;
    transform: scale(0.7); /* Fit in view */
  }
  @media (min-width: 1024px) {
    .resume-preview {
      transform: scale(0.85); 
    }
  }

  /* Kanban Scroll */
  .kanban-scroll::-webkit-scrollbar {
    height: 8px;
  }
  .kanban-scroll::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.02);
  }
  .kanban-scroll::-webkit-scrollbar-thumb {
    background: rgba(236, 72, 153, 0.3);
    border-radius: 4px;
  }

  /* Input Styling */
  .resume-input {
    background: transparent;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    color: white;
    transition: border-color 0.2s;
  }
  .resume-input:focus {
    outline: none;
    border-color: #EC4899;
  }

  /* Skill Badge Animation */
  .skill-badge {
    transition: all 0.3s ease;
  }
  .skill-badge.active {
    background-color: #EC4899;
    color: white;
    border-color: #EC4899;
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
  }
`;

// --- TYPES ---
type ViewMode = 'feed' | 'architect' | 'tracker' | 'interview';

// --- MOCK DATA & CONSTANTS ---
const USER_SKILLS = ['React', 'C++', 'Node.js', 'TypeScript'];

const SMART_JOBS = [
  { 
    id: 101, role: "Frontend Developer", company: "Zomato", location: "Gurugram",
    stack: ["React", "TypeScript", "Redux"], 
    match: 98, reason: "Perfect fit for your React skills.",
    type: "web", stipend: "₹25,000/mo"
  },
  { 
    id: 102, role: "Embedded Systems Intern", company: "Samsung", location: "Noida",
    stack: ["C++", "Linux", "RTOS"], 
    match: 92, reason: "Strong C++ match based on your projects.",
    type: "system", stipend: "₹35,000/mo"
  },
  { 
    id: 103, role: "Backend Intern", company: "Swiggy", location: "Bangalore",
    stack: ["Java", "Spring Boot", "MySQL"], 
    match: 45, reason: "Requires Java. You are primarily a C++/JS dev.",
    type: "backend", stipend: "₹30,000/mo"
  },
  { 
    id: 104, role: "Full Stack Engineer", company: "Cred", location: "Bangalore",
    stack: ["Node.js", "React", "AWS"], 
    match: 88, reason: "Good match, but they prefer AWS experience.",
    type: "web", stipend: "₹40,000/mo"
  }
];

const MOCK_RESUME = {
  name: "Rahul Sharma",
  role: "Software Engineering Student",
  summary: "Motivated CS student with experience in React and Node.js. Passionate about building scalable web applications.",
  skills: ["React", "TypeScript", "Node.js", "C++", "SQL"],
  experience: [
    { id: 1, role: "Frontend Intern", company: "TechStart", type: "web", points: ["Built a dashboard using React.", "Fixed bugs in the login flow."] },
    { id: 2, role: "IoT Research", company: "College Lab", type: "system", points: ["Programmed microcontrollers using C++.", "Optimized memory usage by 20%."] }
  ]
};

const KANBAN_COLS = [
  { id: 'wishlist', title: 'Wishlist', color: 'border-gray-500' },
  { id: 'applied', title: 'Applied', color: 'border-blue-500' },
  { id: 'interview', title: 'Interview', color: 'border-purple-500' },
  { id: 'offer', title: 'Offer', color: 'border-green-500' },
  { id: 'rejected', title: 'Rejected', color: 'border-red-500' }
];

const MOCK_JOBS = [
  { id: 1, role: "SDE Intern", company: "Google", status: "applied", daysAgo: 14, stale: true },
  { id: 2, role: "React Developer", company: "Swiggy", status: "interview", daysAgo: 2, stale: false },
  { id: 3, role: "Product Intern", company: "Cred", status: "wishlist", daysAgo: 5, stale: false },
];

const InternshipsView = () => {
  const [activeMode, setActiveMode] = useState<ViewMode>('feed');
  
  // Feed State
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);
  const [guardModal, setGuardModal] = useState<any>(null); // Job object if warning needed

  // Resume State
  const [resumeData, setResumeData] = useState(MOCK_RESUME);
  const [atsScore, setAtsScore] = useState(72);
  const [jdText, setJdText] = useState('');
  const [isFixing, setIsFixing] = useState<number | null>(null);
  const [resumeTarget, setResumeTarget] = useState<'generic' | 'web' | 'system'>('generic');

  // Tracker State
  const [jobs, setJobs] = useState(MOCK_JOBS);

  // Interview State
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  // --- HANDLERS ---

  // 1. SMART FEED HANDLERS
  const getFilteredJobs = () => {
    let sorted = [...SMART_JOBS];
    
    // Sort by match score default
    sorted.sort((a, b) => b.match - a.match);

    // If filter applied, bubble up matching stack
    if (activeSkillFilter) {
      sorted = sorted.filter(j => j.stack.includes(activeSkillFilter));
    }
    return sorted;
  };

  const handleApplyClick = (job: any) => {
    if (job.match < 50) {
      setGuardModal(job);
    } else {
      // Proceed to apply (simulated)
      alert(`Applied to ${job.company}!`);
    }
  };

  // 2. RESUME HANDLERS
  const handleMagicFix = (id: number) => {
    setIsFixing(id);
    setTimeout(() => {
      const newExp = resumeData.experience.map(exp => {
        if (exp.id === id) {
          return {
            ...exp,
            points: [
              "Architected a scalable dashboard using React.js, improving load times by 40%.",
              "Resolved critical authentication bugs, increasing user retention by 15%."
            ]
          };
        }
        return exp;
      });
      setResumeData({...resumeData, experience: newExp});
      setAtsScore(89);
      setIsFixing(null);
    }, 1500);
  };

  const handleTailorToJD = () => {
    if (!jdText) return;
    setAtsScore(65);
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        skills: ["AWS", "Docker", "React", "Node.js"], 
        summary: "Results-oriented CS student with proven AWS & Docker skills. Seeking to leverage React expertise for the SDE Intern role."
      }));
      setAtsScore(94);
    }, 2000);
  };

  const handleAutoHierarchy = (target: 'web' | 'system') => {
    setResumeTarget(target);
    // Reorder experience based on type
    const reorderedExp = [...resumeData.experience].sort((a, b) => {
      if (a.type === target) return -1;
      if (b.type === target) return 1;
      return 0;
    });
    setResumeData(prev => ({ ...prev, experience: reorderedExp }));
  };

  // 3. INTERVIEW HANDLERS
  const handleSimulateInterview = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setFeedback({
        score: 7,
        fillers: 12,
        feedback: "Technically sound, but you used 'um' and 'like' too often. Try to pause instead of filling silence. You covered the STAR method well."
      });
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 font-sans text-slate-200" style={{'--accent-color': '#EC4899', '--accent-glow': 'rgba(236, 72, 153, 0.4)'} as any}>
      <style>{styles}</style>

      {/* --- HEADER NAVIGATION --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 glass-panel p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-600/20">
            <Briefcase size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Career Command</h1>
            <p className="text-xs text-pink-400 font-medium">The Recruitment Bot v2.0</p>
          </div>
        </div>
        
        <div className="flex bg-black/20 p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar max-w-full">
          {[
            { id: 'feed', label: 'Smart Feed', icon: Search },
            { id: 'architect', label: 'Resume Architect', icon: FileText },
            { id: 'tracker', label: 'App Tracker', icon: Layout },
            { id: 'interview', label: 'Interview Sim', icon: Mic }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as ViewMode)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                activeMode === mode.id 
                  ? 'bg-pink-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <mode.icon size={16} className="mr-2" />
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- MODE 0: SMART FEED (NEW) --- */}
      {activeMode === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Filters & Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                <Code size={16} className="mr-2"/> Your Tech DNA
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {USER_SKILLS.map(skill => (
                  <button 
                    key={skill}
                    onClick={() => setActiveSkillFilter(activeSkillFilter === skill ? null : skill)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold skill-badge ${
                      activeSkillFilter === skill 
                        ? 'active' 
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Click a skill to reshuffle the feed. The AI highlights jobs that match your selected stack.
              </p>
            </div>

            <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-pink-400 font-bold mb-2">
                <Shield size={18}/> Strategy Guard Active
              </div>
              <p className="text-xs text-pink-200/80">
                I will warn you before you apply to "Reach" jobs where your skill match is low, preventing wasted effort.
              </p>
            </div>
          </div>

          {/* Job Feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-white">Recommended Opportunities</h2>
              <span className="text-xs text-gray-500">{getFilteredJobs().length} Matches Found</span>
            </div>

            {getFilteredJobs().map(job => (
              <div key={job.id} className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all group relative">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black font-bold text-lg shadow-lg">
                      {job.company[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-pink-400 transition-colors">{job.role}</h3>
                      <p className="text-sm text-gray-400">{job.company} • {job.location}</p>
                    </div>
                  </div>
                  
                  {/* Match Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center ${
                    job.match >= 90 ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    job.match >= 70 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {job.match >= 90 ? <Sparkles size={12} className="mr-1"/> : <AlertTriangle size={12} className="mr-1"/>}
                    {job.match}% Match
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map(tech => (
                    <span key={tech} className={`text-[10px] px-2 py-1 rounded border ${
                      USER_SKILLS.includes(tech) 
                        ? 'bg-pink-500/20 text-pink-300 border-pink-500/30' 
                        : 'bg-white/5 text-gray-500 border-white/5'
                    }`}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <p className="text-xs text-gray-400 italic">"{job.reason}"</p>
                  <div className="flex gap-3 items-center">
                    <span className="text-xs font-bold text-white">{job.stipend}</span>
                    <button 
                      onClick={() => handleApplyClick(job)}
                      className="px-4 py-2 bg-white text-black font-bold text-xs rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* STRATEGY GUARD MODAL */}
          {guardModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-[#0F172A] border border-red-500/30 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4 text-red-400">
                    <AlertTriangle size={24}/>
                    <h3 className="text-lg font-bold">Strategy Guard Alert</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    ⚠️ <strong>Low Probability:</strong> This job requires <span className="text-white font-bold">{guardModal.stack[0]}</span>, but your profile is strong in <span className="text-white font-bold">C++/React</span>.
                  </p>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/5 mb-6">
                    <p className="text-xs text-gray-400">
                      <strong className="text-pink-400">Bridge Suggestion:</strong> If you learn <strong>Java Basics (Page 12)</strong>, your match score will jump to 75%.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setGuardModal(null)} 
                      className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => { setGuardModal(null); alert('Applied anyway (High Risk).'); }}
                      className="flex-1 py-2.5 border border-red-500/50 text-red-400 hover:bg-red-500/10 font-bold text-sm rounded-xl transition-colors"
                    >
                      Apply Anyway
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* --- MODE 1: RESUME ARCHITECT --- */}
      {activeMode === 'architect' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)] min-h-[600px]">
          
          {/* Editor Column */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col h-full overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Wand2 className="mr-2 text-pink-500" /> Editor
              </h2>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-xs text-gray-400 font-bold uppercase">ATS Score</span>
                <div className={`text-lg font-bold ${atsScore > 80 ? 'text-green-400' : atsScore > 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {atsScore}/100
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              
              {/* Adaptive Re-Ordering */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-gray-400 uppercase flex items-center">
                    <Layers size={12} className="mr-1"/> Adaptive Context
                  </label>
                  {resumeTarget !== 'generic' && <span className="text-[10px] text-pink-400 animate-pulse">Auto-Sorted Active</span>}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAutoHierarchy('web')} 
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${resumeTarget === 'web' ? 'bg-pink-600 text-white border-pink-600' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
                  >
                    Web Role
                  </button>
                  <button 
                    onClick={() => handleAutoHierarchy('system')} 
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${resumeTarget === 'system' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
                  >
                    Systems Role
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 mt-2">
                  I will reorder your projects to highlight relevant skills for the selected target.
                </p>
              </div>

              {/* JD Scanner */}
              <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
                <label className="text-xs font-bold text-pink-300 uppercase mb-2 block flex items-center">
                  <Sparkles size={12} className="mr-1"/> Tailor to Job Description
                </label>
                <textarea 
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste JD here (e.g. 'Amazon SDE Intern...'). I will optimize your keywords."
                  className="w-full bg-black/20 border border-pink-500/10 rounded-lg p-3 text-xs text-gray-300 focus:border-pink-500/50 outline-none resize-none h-20 mb-2"
                />
                <button 
                  onClick={handleTailorToJD}
                  disabled={!jdText}
                  className="w-full py-2 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center"
                >
                  <RefreshCw size={14} className="mr-2"/> Auto-Optimize Resume
                </button>
              </div>

              {/* Experience Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Experience</h3>
                {resumeData.experience.map((exp, idx) => (
                  <div key={exp.id} className="bg-white/5 border border-white/5 rounded-xl p-4 mb-3 group hover:border-white/10 transition-colors relative overflow-hidden">
                    {/* Visual cue for reordering */}
                    {resumeTarget !== 'generic' && exp.type === resumeTarget && (
                      <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[9px] px-2 py-0.5 rounded-bl-lg font-bold uppercase">
                        Priority Match
                      </div>
                    )}
                    <div className="flex justify-between mb-2">
                      <input 
                        value={exp.role} 
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[idx].role = e.target.value;
                          setResumeData({...resumeData, experience: newExp});
                        }}
                        className="resume-input font-bold text-sm w-1/2" 
                      />
                      <input 
                        value={exp.company} 
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[idx].company = e.target.value;
                          setResumeData({...resumeData, experience: newExp});
                        }}
                        className="resume-input text-right text-xs text-gray-400 w-1/3" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      {exp.points.map((point, pIdx) => (
                        <div key={pIdx} className="flex gap-2 items-start">
                          <span className="text-pink-500 mt-1.5">•</span>
                          <textarea 
                            value={point}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience];
                              newExp[idx].points[pIdx] = e.target.value;
                              setResumeData({...resumeData, experience: newExp});
                            }}
                            className="flex-1 bg-transparent text-xs text-gray-300 border-b border-transparent focus:border-white/20 outline-none resize-none h-auto overflow-hidden"
                            rows={2}
                          />
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => handleMagicFix(exp.id)}
                      disabled={isFixing === exp.id}
                      className="mt-3 flex items-center text-[10px] font-bold text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      {isFixing === exp.id ? (
                        <><RefreshCw size={12} className="mr-1 animate-spin"/> Polishing...</>
                      ) : (
                        <><Wand2 size={12} className="mr-1"/> Rewrite with Action Verbs</>
                      )}
                    </button>
                  </div>
                ))}
                <button className="w-full py-2 border border-dashed border-white/10 text-gray-500 hover:text-white hover:border-white/30 text-xs font-bold rounded-lg transition-colors flex items-center justify-center">
                  <Plus size={14} className="mr-1"/> Add Position
                </button>
              </div>

            </div>
          </div>

          {/* Preview Column */}
          <div className="bg-[#525659] rounded-2xl p-4 md:p-8 overflow-hidden flex items-center justify-center relative shadow-inner">
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70" title="Download PDF"><Download size={18}/></button>
            </div>
            
            {/* A4 Paper Simulation */}
            <div className="bg-white text-black w-[595px] h-[842px] resume-preview paper-shadow p-8 flex flex-col pointer-events-none select-none">
              {/* Header */}
              <div className="border-b-2 border-gray-800 pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wide">{resumeData.name}</h1>
                <p className="text-sm text-gray-600 font-medium mt-1">{resumeData.role}</p>
                <div className="text-xs text-gray-500 mt-2 flex gap-4">
                  <span>email@example.com</span>
                  <span>linkedin.com/in/rahul</span>
                  <span>github.com/rahul</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-1">Professional Summary</h3>
                <p className="text-xs text-gray-700 leading-relaxed">{resumeData.summary}</p>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-1">Experience</h3>
                {resumeData.experience.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-bold">{exp.role}</h4>
                      <span className="text-xs text-gray-600 italic">{exp.company} | Summer 2024</span>
                    </div>
                    <ul className="list-disc list-outside ml-4">
                      {exp.points.map((pt, j) => (
                        <li key={j} className="text-xs text-gray-700 mb-0.5 pl-1">{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-1">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-800 font-medium border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* --- MODE 2: TRACKER (KANBAN) --- */}
      {activeMode === 'tracker' && (
        <div className="glass-panel rounded-2xl p-6 h-[600px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Layout className="mr-2 text-pink-500" /> Pipeline
            </h2>
            <button className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-lg flex items-center transition-colors">
              <Plus size={14} className="mr-1"/> Add Job
            </button>
          </div>

          <div className="flex-1 overflow-x-auto kanban-scroll pb-4">
            <div className="flex gap-4 min-w-[1000px] h-full">
              {KANBAN_COLS.map(col => (
                <div key={col.id} className="w-72 flex-shrink-0 flex flex-col">
                  <div className={`flex items-center justify-between mb-3 px-1 border-b-2 ${col.color} pb-2`}>
                    <h3 className="font-bold text-sm text-gray-300">{col.title}</h3>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                      {jobs.filter(j => j.status === col.id).length}
                    </span>
                  </div>
                  
                  <div className="flex-1 space-y-3 p-1">
                    {jobs.filter(j => j.status === col.id).map(job => (
                      <div key={job.id} className="bg-white/5 border border-white/5 rounded-xl p-4 hover:border-pink-500/30 transition-all cursor-pointer group relative">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-sm text-white">{job.company}</h4>
                          <span className="text-[10px] text-gray-500">{job.daysAgo}d ago</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">{job.role}</p>
                        
                        {job.stale && (
                          <div className="bg-red-500/10 border border-red-500/20 rounded px-2 py-1.5 flex items-center gap-2 mb-2">
                            <AlertCircle size={12} className="text-red-400"/>
                            <span className="text-[10px] text-red-300 font-bold">No reply in 14 days</span>
                          </div>
                        )}

                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          {job.stale ? (
                            <button className="text-[10px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded flex items-center">
                              <Mail size={10} className="mr-1"/> Draft Follow-up
                            </button>
                          ) : (
                            <button className="text-gray-500 hover:text-white"><MoreHorizontal size={14}/></button>
                          )}
                        </div>
                      </div>
                    ))}
                    {/* Add button placeholder */}
                    <button className="w-full py-2 border border-dashed border-white/10 text-gray-500 rounded-xl text-xs hover:border-white/30 hover:text-gray-300 transition-colors">
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODE 3: INTERVIEW SIMULATOR --- */}
      {activeMode === 'interview' && (
        <div className="glass-panel rounded-2xl p-8 min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
          {/* Background Ambient */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-pink-900/10 to-transparent pointer-events-none"></div>
          
          {!isRecording && !feedback ? (
            <div className="text-center max-w-lg relative z-10">
              <div className="w-20 h-20 bg-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-500/30">
                <Mic size={40} className="text-pink-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Mock Interview: Behavioral</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I'll act as a hiring manager. I'll ask you a common question, listen to your answer, and give feedback on your content and delivery.
              </p>
              
              <div className="bg-black/30 p-6 rounded-xl border border-white/10 mb-8 text-left">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2 block">Question 1</span>
                <p className="text-lg font-medium text-white">"Tell me about a time you faced a technical challenge and how you overcame it."</p>
              </div>

              <button 
                onClick={handleSimulateInterview}
                className="px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-full shadow-lg shadow-pink-600/30 transition-all hover:scale-105 flex items-center mx-auto"
              >
                <Mic size={20} className="mr-2"/> Start Recording Answer
              </button>
            </div>
          ) : isRecording ? (
            <div className="text-center relative z-10">
              <div className="mb-8">
                <div className="w-32 h-32 rounded-full border-4 border-pink-500 flex items-center justify-center mx-auto animate-pulse shadow-[0_0_50px_rgba(236,72,153,0.5)]">
                  <div className="w-24 h-24 bg-pink-600 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Listening...</h3>
              <p className="text-gray-400">Speak clearly. Timer: 00:14</p>
              
              <div className="flex justify-center gap-2 mt-8 h-8 items-end">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1.5 bg-pink-500 rounded-full animate-[bounce_1s_infinite]" 
                    style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Award className="mr-2 text-yellow-400"/> AI Feedback
                </h2>
                <button onClick={() => setFeedback(null)} className="text-sm text-gray-400 hover:text-white underline">Try Again</button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-black/30 p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">{feedback.score}/10</div>
                  <div className="text-xs text-gray-500 uppercase font-bold">Overall Score</div>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">{feedback.fillers}</div>
                  <div className="text-xs text-gray-500 uppercase font-bold">Filler Words</div>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">Good</div>
                  <div className="text-xs text-gray-500 uppercase font-bold">STAR Method</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-sm font-bold text-pink-400 uppercase tracking-wider mb-3">Detailed Analysis</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {feedback.feedback}
                </p>
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3">
                  <p className="text-xs text-pink-200">
                    <strong>Suggestion:</strong> In your "Action" part of STAR, focus more on <em>your</em> specific contribution rather than the team's. Use "I" instead of "We".
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default InternshipsView;
