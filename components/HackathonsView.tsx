
import React, { useState } from 'react';
import { 
  Trophy, Users, Lightbulb, Calendar, ArrowRight, Code, 
  Terminal, Rocket, Globe, Clock, Zap
} from 'lucide-react';

const styles = `
  .glass-workspace {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }
  
  .hackathon-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .hackathon-card:hover {
    transform: translateY(-4px);
    border-color: rgba(234, 179, 8, 0.5);
    box-shadow: 0 10px 30px -10px rgba(234, 179, 8, 0.2);
  }

  .team-avatar {
    border: 2px solid #1E293B;
    transition: transform 0.2s;
  }
  .team-avatar:hover {
    transform: scale(1.1);
    z-index: 10;
  }
`;

const HackathonsView = () => {
  const [idea, setIdea] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const hackathons = [
    { 
      id: 1, 
      name: "Smart India Hackathon 2025", 
      organizer: "Govt of India", 
      date: "Nov 12-14", 
      mode: "Hybrid", 
      prize: "₹1,00,000",
      tags: ["GovTech", "AI", "Hardware"],
      daysLeft: 14,
      urgent: true
    },
    { 
      id: 2, 
      name: "ETHIndia 2025", 
      organizer: "Devfolio", 
      date: "Dec 02-04", 
      mode: "Bangalore", 
      prize: "$10,000",
      tags: ["Web3", "Blockchain", "DeFi"],
      daysLeft: 35,
      urgent: false
    },
    { 
      id: 3, 
      name: "Code for Good", 
      organizer: "JPMorgan", 
      date: "Oct 28", 
      mode: "Online", 
      prize: "Internship",
      tags: ["Social Good", "Full Stack"],
      daysLeft: 5,
      urgent: true
    }
  ];

  const teammates = [
    { name: "Rahul", role: "Backend", skill: "Node.js", color: "bg-blue-500" },
    { name: "Sarah", role: "Designer", skill: "Figma", color: "bg-pink-500" },
    { name: "Arjun", role: "AI/ML", skill: "Python", color: "bg-green-500" }
  ];

  const generateIdea = () => {
    setGenerating(true);
    setTimeout(() => {
      setIdea("A decentralized marketplace for students to trade used textbooks using smart contracts to ensure fair pricing and condition verification.");
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 font-sans" style={{'--accent-color': '#EAB308', '--accent-glow': 'rgba(234, 179, 8, 0.4)'} as any}>
      <style>{styles}</style>

      {/* Hero */}
      <div className="glass-workspace rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-yellow-500/10 rounded-full blur-[60px]"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
              <Trophy size={12} className="mr-1"/> Win & Build
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Hackathon Command Center</h2>
          <p className="text-gray-400">Find events, build your squad, and ship winning projects.</p>
        </div>

        <div className="flex gap-4 z-10">
           <div className="text-center px-4">
              <div className="text-3xl font-bold text-white">2</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Upcoming</div>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="text-center px-4">
              <div className="text-3xl font-bold text-yellow-400">1</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Winning</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Hackathon Feed */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center">
                 <Rocket className="mr-2 text-yellow-500"/> Recommended for You
              </h3>
              <div className="flex gap-2">
                 <button className="px-3 py-1 text-xs font-bold bg-white/10 text-white rounded-lg hover:bg-white/20">All</button>
                 <button className="px-3 py-1 text-xs font-bold bg-transparent text-gray-500 hover:text-white rounded-lg hover:bg-white/5">Online</button>
                 <button className="px-3 py-1 text-xs font-bold bg-transparent text-gray-500 hover:text-white rounded-lg hover:bg-white/5">Beginner</button>
              </div>
           </div>

           <div className="space-y-4">
              {hackathons.map((hack) => (
                 <div key={hack.id} className="hackathon-card rounded-xl p-5 relative group cursor-pointer">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                       <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gray-800 border border-white/10 flex items-col flex items-center justify-center text-center shrink-0">
                             <div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase">{hack.date.split(' ')[0]}</div>
                                <div className="text-lg font-bold text-white leading-none">{hack.date.split(' ')[1].split('-')[0]}</div>
                             </div>
                          </div>
                          <div>
                             <h4 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">{hack.name}</h4>
                             <div className="flex items-center text-xs text-gray-400 mt-1">
                                <span className="flex items-center mr-3"><Globe size={12} className="mr-1"/> {hack.mode}</span>
                                <span className="flex items-center"><Users size={12} className="mr-1"/> {hack.organizer}</span>
                             </div>
                             <div className="flex gap-2 mt-3">
                                {hack.tags.map(t => (
                                   <span key={t} className="text-[10px] px-2 py-0.5 rounded border border-white/10 bg-white/5 text-gray-300">{t}</span>
                                ))}
                             </div>
                          </div>
                       </div>

                       <div className="flex flex-row md:flex-col justify-between items-end gap-4 min-w-[100px]">
                          <div className="text-right">
                             <div className="text-xs text-gray-500 uppercase font-bold">Prize Pool</div>
                             <div className="text-lg font-bold text-green-400">{hack.prize}</div>
                          </div>
                          <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold text-xs rounded-lg transition-colors shadow-lg shadow-yellow-900/20">
                             Register Now
                          </button>
                       </div>
                    </div>
                    {hack.urgent && (
                       <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">
                          Closing Soon!
                       </div>
                    )}
                 </div>
              ))}
           </div>
        </div>

        {/* Right: Tools */}
        <div className="space-y-6">
           
           {/* Team Finder */}
           <div className="glass-workspace rounded-xl p-6">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center">
                 <Users size={16} className="mr-2"/> Squad Finder
              </h3>
              <p className="text-xs text-gray-400 mb-4">People looking for teammates in your college.</p>
              
              <div className="space-y-3">
                 {teammates.map((mate, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${mate.color} flex items-center justify-center text-white font-bold text-xs`}>
                             {mate.name[0]}
                          </div>
                          <div>
                             <div className="text-sm font-bold text-white">{mate.name}</div>
                             <div className="text-[10px] text-gray-500">{mate.role} • {mate.skill}</div>
                          </div>
                       </div>
                       <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
                          <ArrowRight size={14}/>
                       </button>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-4 py-2 border border-dashed border-white/20 text-gray-400 text-xs font-bold rounded-lg hover:border-yellow-500 hover:text-yellow-500 transition-colors">
                 + Create Team Post
              </button>
           </div>

           {/* Idea Generator */}
           <div className="glass-workspace rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4 text-white font-bold">
                 <Lightbulb className="text-yellow-400" size={18}/> Project Idea Gen
              </div>
              <div className="bg-black/20 p-3 rounded-lg border border-white/5 mb-4 min-h-[80px] relative">
                 {idea ? (
                    <p className="text-xs text-gray-200 leading-relaxed animate-in fade-in">{idea}</p>
                 ) : (
                    <div className="text-center pt-4">
                       <p className="text-xs text-gray-500 italic">Select a track to generate ideas...</p>
                    </div>
                 )}
                 {generating && (
                    <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                       <Zap size={20} className="text-yellow-500 animate-pulse"/>
                    </div>
                 )}
              </div>
              
              <div className="flex gap-2 mb-3">
                 {['Fintech', 'Health', 'EdTech'].map(track => (
                    <button key={track} className="flex-1 py-1 text-[10px] bg-white/5 hover:bg-white/10 rounded text-gray-400 hover:text-white border border-white/5">
                       {track}
                    </button>
                 ))}
              </div>
              <button 
                 onClick={generateIdea}
                 disabled={generating}
                 className="w-full py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-lg text-xs transition-all shadow-lg"
              >
                 {generating ? 'Thinking...' : 'Generate Idea'}
              </button>
           </div>

        </div>
      </div>
    </div>
  );
};

export default HackathonsView;
