
import React, { useState } from 'react';
import { 
  Brain, CheckCircle2, Circle, Edit3, Coffee, 
  Wind, Smile, Frown, Meh, Sun, Moon, Calendar,
  TrendingUp, Leaf, Flame
} from 'lucide-react';

const styles = `
  .glass-workspace {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }
  
  .habit-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }
  
  .habit-cell {
    aspect-ratio: 1;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: transparent;
    transition: all 0.2s;
  }
  .habit-cell:hover {
    transform: scale(1.1);
    color: rgba(255,255,255,0.7);
  }
`;

const PersonalGrowthView = () => {
  const [mood, setMood] = useState<'good' | 'meh' | 'bad' | null>(null);
  
  const habits = [
    { id: 1, name: "Read 10 Pages", streak: 5, history: [1,1,1,1,1,0,1] },
    { id: 2, name: "Meditation", streak: 12, history: [1,1,1,1,1,1,1] },
    { id: 3, name: "No Sugar", streak: 2, history: [0,0,1,0,1,1,0] },
    { id: 4, name: "Journaling", streak: 0, history: [1,0,1,0,0,0,0] }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 font-sans" style={{'--accent-color': '#EC4899', '--accent-glow': 'rgba(236, 72, 153, 0.4)'} as any}>
      <style>{styles}</style>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-2">
        <div>
          <h2 className="text-3xl font-extrabold text-white flex items-center mb-2">
            <Leaf className="mr-3 text-pink-500"/> Personal Growth
          </h2>
          <p className="text-gray-400">Track habits, mental health, and daily wins.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5">
          <div className="text-right mr-2">
            <div className="text-xs text-gray-500 font-bold uppercase">Current Mood</div>
            <div className="text-white text-sm font-medium">{mood ? (mood === 'good' ? 'Feeling Great' : mood === 'meh' ? 'It\'s Okay' : 'Rough Day') : 'Check In'}</div>
          </div>
          <button onClick={() => setMood('bad')} className={`p-2 rounded-lg transition-all ${mood === 'bad' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-500 hover:text-red-400'}`}><Frown size={20}/></button>
          <button onClick={() => setMood('meh')} className={`p-2 rounded-lg transition-all ${mood === 'meh' ? 'bg-yellow-500 text-white' : 'bg-gray-800 text-gray-500 hover:text-yellow-400'}`}><Meh size={20}/></button>
          <button onClick={() => setMood('good')} className={`p-2 rounded-lg transition-all ${mood === 'good' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-500 hover:text-green-400'}`}><Smile size={20}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Habit Tracker */}
        <div className="lg:col-span-2 glass-workspace rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center">
              <CheckCircle2 className="mr-2 text-green-400"/> Atomic Habits
            </h3>
            <button className="text-xs font-bold text-pink-400 hover:text-white flex items-center">
              <TrendingUp size={14} className="mr-1"/> View Trends
            </button>
          </div>

          <div className="space-y-4">
            {habits.map((habit) => (
              <div key={habit.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-pink-500/30 transition-colors group">
                <div className="w-32 shrink-0">
                  <div className="text-sm font-bold text-gray-200">{habit.name}</div>
                  <div className="text-xs text-gray-500 flex items-center mt-1">
                    <Flame size={10} className="mr-1 text-orange-500"/> {habit.streak} day streak
                  </div>
                </div>
                
                {/* Visual Grid */}
                <div className="flex-1 flex justify-end gap-1">
                  {habit.history.map((status, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${status ? 'bg-green-500 text-black' : 'bg-gray-800 border border-white/5'}`}
                    >
                      {status ? <CheckCircle2 size={14}/> : <span className="text-[8px] text-gray-600">{['M','T','W','T','F','S','S'][i]}</span>}
                    </div>
                  ))}
                </div>
                
                <button className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all">
                  <CheckCircle2 size={16}/>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Daily Journal & Focus */}
        <div className="space-y-6">
          
          {/* Daily Reflection */}
          <div className="glass-workspace rounded-xl p-6 relative">
            <div className="flex items-center gap-2 mb-4 text-white font-bold">
              <Edit3 className="text-blue-400"/> Daily Reflection
            </div>
            <textarea 
              className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-blue-500/50 resize-none"
              placeholder="What went well today? What can be improved?"
            ></textarea>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-[10px] text-gray-500">Private & Encrypted</span>
              <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors">
                Save Entry
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl flex flex-col items-center justify-center hover:bg-purple-500/20 transition-all group">
              <Wind size={24} className="text-purple-400 mb-2 group-hover:scale-110 transition-transform"/>
              <span className="text-xs font-bold text-gray-300">Breath</span>
              <span className="text-[10px] text-gray-500">2 min</span>
            </button>
            <button className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex flex-col items-center justify-center hover:bg-orange-500/20 transition-all group">
              <Coffee size={24} className="text-orange-400 mb-2 group-hover:scale-110 transition-transform"/>
              <span className="text-xs font-bold text-gray-300">Break</span>
              <span className="text-[10px] text-gray-500">5 min</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PersonalGrowthView;
