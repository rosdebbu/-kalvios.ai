
import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Zap, MessageCircle, ArrowRight, TrendingUp, 
  Shield, Ghost, Send, X, Sliders, UserPlus, Trophy,
  Flame, Target, Sword, Sparkles
} from 'lucide-react';

const styles = `
  /* Advanced Glassmorphism Base */
  .glass-workspace {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }

  /* --- RIVALRY STYLES --- */
  .vs-badge {
    background: linear-gradient(135deg, #EF4444 0%, #84CC16 100%);
    box-shadow: 0 0 20px rgba(132, 204, 22, 0.4);
    animation: pulse-vs 2s infinite;
  }
  @keyframes pulse-vs {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(132, 204, 22, 0.7); }
    70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(132, 204, 22, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(132, 204, 22, 0); }
  }

  .stat-bar-bg {
    background: rgba(255,255,255,0.1);
    height: 6px;
    border-radius: 4px;
    overflow: hidden;
  }
  .stat-bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 1s ease-out;
  }

  /* --- MATCHMAKER STYLES --- */
  .match-card {
    background: rgba(132, 204, 22, 0.03);
    border: 1px solid rgba(132, 204, 22, 0.15);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .match-card:hover {
    transform: translateY(-5px);
    background: rgba(132, 204, 22, 0.08);
    border-color: rgba(132, 204, 22, 0.4);
    box-shadow: 0 10px 30px -10px rgba(132, 204, 22, 0.15);
  }

  .match-avatar {
    background: conic-gradient(from 0deg, #84CC16, #3B82F6, #EC4899, #84CC16);
    padding: 2px; 
    border-radius: 50%;
  }
  .match-avatar-inner {
    background: #0F172A;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Scrollbar */
  .network-scroll::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }
  .network-scroll::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.02);
  }
  .network-scroll::-webkit-scrollbar-thumb {
    background: rgba(132, 204, 22, 0.3);
    border-radius: 10px;
  }
`;

// Types
interface Profile {
  id: number;
  name: string;
  role: string;
  tagline: string;
  matchReason: string;
  matchScore: number;
  type: 'peer' | 'mentor';
  initials: string;
}

interface RivalStats {
  hours: number;
  tasks: number;
  score: number;
}

const NetworkView = () => {
  // --- STATE ---
  
  // Rivalry Data
  const [userStats, setUserStats] = useState<RivalStats>({ hours: 4.2, tasks: 5, score: 72 });
  const [rivalStats, setRivalStats] = useState<RivalStats>({ hours: 6.5, tasks: 8, score: 85 });
  const [gapMessage, setGapMessage] = useState("🔥 Rahul is winning. He is 2.3 hours ahead.");

  // Matchmaking Data
  const matches: Profile[] = [
    { id: 1, name: "Aditya Verma", role: "JEE Aspirant", tagline: "Physics Geek", matchReason: "Also weak in Thermodynamics", matchScore: 95, type: "peer", initials: "AV" },
    { id: 2, name: "Sneha Gupta", role: "SDE II @ Google", tagline: "NIT Alumni '23", matchReason: "Can refer for Internships", matchScore: 88, type: "mentor", initials: "SG" },
    { id: 3, name: "Karthik R.", role: "Founder @ Build", tagline: "Hackathon Winner", matchReason: "Looking for React Devs", matchScore: 82, type: "peer", initials: "KR" },
    { id: 4, name: "Dr. Anjali", role: "Physics Prof.", tagline: "PhD in Optics", matchReason: "Expert in your weak area", matchScore: 90, type: "mentor", initials: "DA" },
  ];

  // DM Agent State
  const [draftModal, setDraftModal] = useState<{ isOpen: boolean; profile: Profile | null; tone: number; text: string }>({
    isOpen: false,
    profile: null,
    tone: 50,
    text: ""
  });
  const [isTyping, setIsTyping] = useState(false);

  // --- LOGIC: RIVALRY UPDATE ---
  useEffect(() => {
    // Simulate Rival working in real-time
    const interval = setInterval(() => {
      setRivalStats(prev => ({
        ...prev,
        hours: parseFloat((prev.hours + 0.01).toFixed(2))
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const diff = (rivalStats.hours - userStats.hours).toFixed(1);
    setGapMessage(`🔥 Rahul is winning. He is ${diff} hours ahead of you today.`);
  }, [rivalStats.hours, userStats.hours]);


  // --- LOGIC: DM DRAFTER ---
  const openDraftModal = (profile: Profile) => {
    setDraftModal({ 
      isOpen: true, 
      profile, 
      tone: 50, 
      text: "" 
    });
    regenerateDraft(profile, 50);
  };

  const regenerateDraft = (profile: Profile, toneVal: number) => {
    setIsTyping(true);
    setDraftModal(prev => ({ ...prev, text: "" })); // Clear current text

    let baseText = "";
    if (profile.type === 'peer') {
      if (toneVal < 30) baseText = `Yo ${profile.name.split(' ')[0]}! Saw we're both struggling with ${profile.matchReason.split('in ')[1] || 'Physics'}. Wanna sync up and study?`;
      else if (toneVal > 70) baseText = `Hi ${profile.name}, I noticed we have similar academic goals. Would you be open to a joint study session for Thermodynamics?`;
      else baseText = `Hey ${profile.name.split(' ')[0]}, I see we're both focusing on ${profile.matchReason.split('in ')[1] || 'the same topics'}. Would love to connect and share notes!`;
    } else {
      if (toneVal < 30) baseText = `Hey ${profile.name.split(' ')[0]}, big fan of your work at Google! I'm an aspirant too. Got 5 mins for a quick chat?`;
      else if (toneVal > 70) baseText = `Dear ${profile.name}, I am a 3rd year student deeply inspired by your journey to Google. I would appreciate the opportunity to seek your mentorship regarding interview prep.`;
      else baseText = `Hi ${profile.name}, I saw you're an alum working at Google. I'm currently preparing for placements and would love some advice on your interview experience.`;
    }

    // Typewriter effect simulation
    let i = 0;
    const typing = setInterval(() => {
      setDraftModal(prev => ({ ...prev, text: baseText.substring(0, i+1) }));
      i++;
      if (i > baseText.length) {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, 20);
  };

  const handleToneChange = (val: number) => {
    if (draftModal.profile) {
      setDraftModal(prev => ({ ...prev, tone: val }));
      regenerateDraft(draftModal.profile, val);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 font-sans text-slate-200" style={{'--accent-color': '#84CC16', '--accent-glow': 'rgba(132, 204, 22, 0.4)'} as any}>
      <style>{styles}</style>

      {/* 1. THE RIVALRY MONITOR */}
      <div className="glass-workspace rounded-2xl p-1 relative overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F172A]/80 backdrop-blur-md p-4 border-b border-white/5 flex justify-between items-center rounded-t-xl">
          <div className="flex items-center gap-2 text-lime-400 font-bold">
            <Sword size={18} /> VS Mode: Pace Setter
          </div>
          <span className="text-[10px] uppercase font-bold text-gray-500 bg-black/40 px-2 py-1 rounded">Live Tracking</span>
        </div>

        <div className="p-6 md:p-8 bg-gradient-to-b from-[#0F172A] to-[#141d2e] rounded-b-xl relative">
          
          {/* VS Center Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-12 h-12 rounded-full vs-badge flex items-center justify-center text-black font-extrabold text-xl italic border-4 border-[#0F172A]">
              VS
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 relative z-10">
            
            {/* YOU (Left) */}
            <div className="text-right pr-4 md:pr-8 border-r border-white/5">
              <div className="flex justify-end items-center gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">You</h3>
                  <p className="text-xs text-lime-400 font-bold">Level 12</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-600 to-green-600 flex items-center justify-center text-white font-bold border-2 border-lime-400/50 shadow-lg shadow-lime-500/20">ME</div>
              </div>
              
              {/* Metrics */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{userStats.hours} hrs</span>
                    <span>Study Time</span>
                  </div>
                  <div className="stat-bar-bg"><div className="stat-bar-fill bg-lime-500" style={{width: `${(userStats.hours/10)*100}%`}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{userStats.tasks}</span>
                    <span>Tasks</span>
                  </div>
                  <div className="stat-bar-bg"><div className="stat-bar-fill bg-lime-500" style={{width: `${(userStats.tasks/10)*100}%`}}></div></div>
                </div>
              </div>
            </div>

            {/* RIVAL (Right) */}
            <div className="text-left pl-4 md:pl-8">
              <div className="flex justify-start items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white font-bold border-2 border-red-400/50 shadow-lg shadow-red-500/20">RS</div>
                <div>
                  <h3 className="text-xl font-bold text-white">Rahul</h3>
                  <p className="text-xs text-red-400 font-bold">Level 14</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Study Time</span>
                    <span>{rivalStats.hours} hrs</span>
                  </div>
                  <div className="stat-bar-bg"><div className="stat-bar-fill bg-red-500" style={{width: `${(rivalStats.hours/10)*100}%`}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Tasks</span>
                    <span>{rivalStats.tasks}</span>
                  </div>
                  <div className="stat-bar-bg"><div className="stat-bar-fill bg-red-500" style={{width: `${(rivalStats.tasks/10)*100}%`}}></div></div>
                </div>
              </div>
            </div>

          </div>

          {/* Gap Analysis & Action */}
          <div className="mt-8 bg-black/40 rounded-xl p-4 border border-red-500/30 flex flex-col md:flex-row justify-between items-center gap-4 animate-pulse-slow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg text-red-400"><TrendingUp size={20}/></div>
              <div>
                <p className="text-sm font-bold text-white">{gapMessage}</p>
                <p className="text-xs text-gray-400">Recommendation: Do a 45-min sprint now to catch up.</p>
              </div>
            </div>
            <button className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/10 flex items-center transition-colors">
              <Zap size={14} className="mr-2 text-yellow-400"/> Nudge Rival
            </button>
          </div>

        </div>
      </div>

      {/* 2. THE SMART MATCHMAKER */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center">
              <UserPlus className="mr-2 text-lime-500"/> Smart Matchmaker
            </h2>
            <p className="text-sm text-gray-400">People chosen by AI to help you grow.</p>
          </div>
          <div className="flex gap-2">
            <button className="text-xs font-bold text-lime-400 hover:text-white transition-colors">See All Matches</button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4 network-scroll">
          {matches.map(profile => (
            <div key={profile.id} className="match-card min-w-[280px] rounded-2xl p-5 flex flex-col relative group">
              <div className="absolute top-3 right-3 text-[10px] font-bold text-lime-400 bg-lime-500/10 px-2 py-0.5 rounded border border-lime-500/20">
                {profile.matchScore}% Match
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="match-avatar w-12 h-12">
                  <div className="match-avatar-inner text-white font-bold">{profile.initials}</div>
                </div>
                <div>
                  <h4 className="font-bold text-white">{profile.name}</h4>
                  <p className="text-xs text-gray-400">{profile.role}</p>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="bg-black/20 rounded-lg p-2 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Why Matched?</p>
                  <p className="text-xs text-gray-300 flex items-start">
                    <Target size={12} className="mr-1 mt-0.5 text-lime-500"/> {profile.matchReason}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 border border-white/5">{profile.type === 'peer' ? 'Study Buddy' : 'Mentor'}</span>
                  <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 border border-white/5">{profile.tagline.split(' ')[0]}</span>
                </div>
              </div>

              <button 
                onClick={() => openDraftModal(profile)}
                className="mt-4 w-full py-2.5 bg-lime-600 hover:bg-lime-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center group-hover:shadow-lime-500/20"
              >
                Connect & Draft <MessageCircle size={14} className="ml-2"/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. COLD DM AGENT (MODAL) */}
      {draftModal.isOpen && draftModal.profile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0F172A] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#141d2e]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-lime-600 to-emerald-600 flex items-center justify-center text-white font-bold">
                  {draftModal.profile.initials}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Drafting to {draftModal.profile.name.split(' ')[0]}</h3>
                  <div className="flex items-center text-xs text-lime-400">
                    <Sparkles size={10} className="mr-1"/> AI Agent Active
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setDraftModal({ ...draftModal, isOpen: false })}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={20}/>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Tone Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wide">
                  <span>Casual 👋</span>
                  <span>Professional 👔</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={draftModal.tone}
                  onChange={(e) => handleToneChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-lime-500"
                />
              </div>

              {/* Editor */}
              <div className="relative">
                <textarea 
                  value={draftModal.text}
                  onChange={(e) => setDraftModal({...draftModal, text: e.target.value})}
                  className="w-full h-40 bg-black/30 border border-white/10 rounded-xl p-4 text-sm text-gray-200 focus:border-lime-500/50 outline-none resize-none leading-relaxed font-medium"
                />
                {isTyping && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded text-xs text-lime-400 font-bold">
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce delay-200"></span>
                    Writing...
                  </div>
                )}
              </div>

              {/* Context Note */}
              <div className="bg-lime-500/5 border border-lime-500/10 p-3 rounded-lg flex gap-3">
                <Ghost size={16} className="text-lime-500 shrink-0 mt-0.5"/>
                <p className="text-xs text-gray-400">
                  <strong className="text-lime-200">Why this works:</strong> I mentioned your shared interest in <span className="text-white">{draftModal.profile.matchReason.split('in ')[1] || 'your goal'}</span> to make the message feel personal, not spammy.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-white/5 bg-[#141d2e] flex gap-3">
              <button 
                onClick={() => handleToneChange(Math.random() * 100)} // Randomize for 'Regenerate' feel
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-sm rounded-xl transition-colors border border-white/5"
              >
                Regenerate
              </button>
              <button 
                onClick={() => setDraftModal({ ...draftModal, isOpen: false })}
                className="flex-1 py-2.5 bg-lime-600 hover:bg-lime-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg flex items-center justify-center"
              >
                <Send size={16} className="mr-2"/> Send Message
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default NetworkView;
