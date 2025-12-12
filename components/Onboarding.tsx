
import React, { useState, useEffect } from 'react';
import { 
  Zap, BookOpen, Smile, 
  Wallet, TrendingDown, Briefcase, BatteryLow,
  Backpack, Sparkles
} from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  
  // State
  const [companion, setCompanion] = useState<'coach' | 'mentor' | 'bestie' | null>(null);
  const [quest, setQuest] = useState<string | null>(null);
  const [stats, setStats] = useState({ focus: 50, time: 50, stress: 50 });
  
  // Step 4 Animation State
  const [packingIndex, setPackingIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const packingItems = [
    "Packing the Attendance Calculator...",
    "Equipping the Impulse Shield...",
    "Loading Study Playlists...",
    "Calibrating Neural Engine..."
  ];

  // --- HANDLERS ---

  const handleCompanionSelect = (id: 'coach' | 'mentor' | 'bestie') => {
    setCompanion(id);
    localStorage.setItem('kalvi_companion', id);
    // Small delay for interaction feel
    setTimeout(() => setStep(2), 400);
  };

  const handleQuestSelect = (id: string) => {
    setQuest(id);
    localStorage.setItem('kalvi_quest', id);
    setTimeout(() => setStep(3), 400);
  };

  const getEmoji = (type: 'focus' | 'time' | 'stress', value: number) => {
    if (type === 'focus') return value < 30 ? '🧟' : value < 70 ? '😐' : '⚡';
    if (type === 'time') return value < 30 ? '🚫' : value < 70 ? '🕰️' : '🏖️';
    if (type === 'stress') return value < 30 ? '🧊' : value < 70 ? '😰' : '🔥';
    return '';
  };

  // Step 4 Animation Logic
  useEffect(() => {
    if (step === 4) {
      if (packingIndex < packingItems.length) {
        const timer = setTimeout(() => {
          setPackingIndex(prev => prev + 1);
        }, 1000); // 1 second per item
        return () => clearTimeout(timer);
      } else {
        setIsReady(true);
      }
    }
  }, [step, packingIndex]);

  // --- RENDERERS ---

  const renderStep1 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-4xl mx-auto w-full">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-10">
        Who should I be for you?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 'coach', label: 'The Coach', icon: Zap, desc: 'Strict. Pushes you hard. Discipline first.', color: 'from-orange-500 to-red-500' },
          { id: 'mentor', label: 'The Mentor', icon: BookOpen, desc: 'Wise. Calm. Deep understanding.', color: 'from-blue-500 to-cyan-500' },
          { id: 'bestie', label: 'The Bestie', icon: Smile, desc: 'Fun. Casual. Balance is key. ✌️', color: 'from-pink-500 to-purple-500' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleCompanionSelect(item.id as any)}
            className={`relative p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group hover:scale-105 flex flex-col items-center text-center ${companion === item.id ? 'ring-2 ring-white scale-105' : ''}`}
          >
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:animate-bounce`}>
              <item.icon size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-4xl mx-auto w-full">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-10">
        What is your Main Quest?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'money', label: 'The Broke Trap', icon: Wallet, desc: "I'm always out of money.", color: 'text-green-400', border: 'hover:border-green-500/50' },
          { id: 'grades', label: 'The Grade Slump', icon: TrendingDown, desc: "My CGPA is falling.", color: 'text-red-400', border: 'hover:border-red-500/50' },
          { id: 'career', label: 'The Career Fear', icon: Briefcase, desc: "I have no job skills.", color: 'text-purple-400', border: 'hover:border-purple-500/50' },
          { id: 'health', label: 'The Burnout', icon: BatteryLow, desc: "I'm tired and distracted.", color: 'text-orange-400', border: 'hover:border-orange-500/50' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleQuestSelect(item.id)}
            className={`flex items-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group hover:scale-[1.02] ${item.border} ${quest === item.id ? 'bg-white/10 border-white/30' : ''}`}
          >
            <div className={`p-4 rounded-xl bg-black/30 mr-6 ${item.color}`}>
              <item.icon size={32} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-1">{item.label}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-2xl mx-auto w-full">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-10">
        Let's check your inventory.
      </h2>
      
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-10 backdrop-blur-lg">
        
        {/* Focus Slider */}
        <div>
          <div className="flex justify-between text-lg font-bold text-white mb-4">
            <span>Focus Level</span>
            <span className="text-2xl">{getEmoji('focus', stats.focus)}</span>
          </div>
          <input 
            type="range" min="0" max="100" 
            value={stats.focus}
            onChange={(e) => setStats({...stats, focus: parseInt(e.target.value)})}
            className="w-full h-4 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono uppercase">
            <span>Zombie</span>
            <span>Laser</span>
          </div>
        </div>

        {/* Time Slider */}
        <div>
          <div className="flex justify-between text-lg font-bold text-white mb-4">
            <span>Free Time</span>
            <span className="text-2xl">{getEmoji('time', stats.time)}</span>
          </div>
          <input 
            type="range" min="0" max="100" 
            value={stats.time}
            onChange={(e) => setStats({...stats, time: parseInt(e.target.value)})}
            className="w-full h-4 bg-gray-700 rounded-full appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono uppercase">
            <span>None</span>
            <span>Lots</span>
          </div>
        </div>

        {/* Stress Slider */}
        <div>
          <div className="flex justify-between text-lg font-bold text-white mb-4">
            <span>Stress Bar</span>
            <span className="text-2xl">{getEmoji('stress', stats.stress)}</span>
          </div>
          <input 
            type="range" min="0" max="100" 
            value={stats.stress}
            onChange={(e) => setStats({...stats, stress: parseInt(e.target.value)})}
            className="w-full h-4 bg-gray-700 rounded-full appearance-none cursor-pointer accent-red-500 hover:accent-red-400 transition-all"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono uppercase">
            <span>Chill</span>
            <span>Panic</span>
          </div>
        </div>

        <button 
          onClick={() => setStep(4)}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl text-lg hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all transform hover:-translate-y-1"
        >
          Confirm Stats
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="animate-in fade-in zoom-in duration-700 max-w-2xl mx-auto w-full flex flex-col items-center justify-center text-center h-[60vh]">
      
      {/* Central Visual */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div>
        <div className={`w-40 h-40 bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 rounded-3xl flex items-center justify-center shadow-2xl relative z-10 transition-all duration-500 ${isReady ? 'scale-110 border-green-500/50 shadow-[0_0_50px_rgba(16,185,129,0.3)]' : 'animate-bounce'}`}>
          <Backpack size={80} className={`text-white transition-colors duration-500 ${isReady ? 'text-green-400' : ''}`} />
          {isReady && <div className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full animate-in zoom-in">READY</div>}
        </div>
        
        {/* Flying Items Animation (Simulated) */}
        {!isReady && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
             {/* Particles could go here */}
          </div>
        )}
      </div>

      {/* Dynamic Text */}
      <div className="h-20 flex flex-col items-center justify-center">
        {!isReady ? (
          <h3 className="text-xl md:text-2xl font-bold text-blue-200 animate-pulse">
            {packingItems[Math.min(packingIndex, packingItems.length - 1)]}
          </h3>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Inventory Ready.</h3>
            <p className="text-gray-400 mb-8">Level 1 starts now. Good luck, Hero.</p>
            <button 
              onClick={onComplete}
              className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] transition-all flex items-center mx-auto"
            >
              <Sparkles className="mr-2 fill-current" /> Start Game
            </button>
          </div>
        )}
      </div>

      {/* Progress Indicators for packing */}
      {!isReady && (
        <div className="flex gap-2 mt-8">
          {packingItems.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i <= packingIndex ? 'bg-blue-500 scale-110' : 'bg-gray-700'}`}></div>
          ))}
        </div>
      )}

    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] transition-all duration-1000 ${step === 2 ? 'bg-red-600/10' : ''}`}></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10 flex flex-col min-h-screen">
        
        {/* Top Navigation / Progress */}
        <div className="flex justify-between items-center mb-12">
          <div className="text-xl font-bold tracking-tight flex items-center">
            <Sparkles className="text-blue-500 mr-2" /> Kalvi Quest
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                className={`w-3 h-3 rounded-full transition-all duration-500 ${step >= s ? 'bg-white scale-110 shadow-[0_0_10px_white]' : 'bg-white/20'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Main Stage */}
        <div className="flex-1 flex flex-col justify-center">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
