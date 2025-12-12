
import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Globe, Clock, FileText, CheckCircle2, 
  MapPin, AlertCircle, ArrowRight, Plane, Building2, Sparkles,
  Award, Eye, EyeOff, Utensils, Euro, DollarSign, Calendar,
  Shield, TrendingUp, AlertTriangle, BookOpen
} from 'lucide-react';

const styles = `
  /* --- GLOBAL THEME --- */
  .glass-workspace {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(79, 70, 229, 0.15); /* Indigo tint */
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }

  /* --- DOSSIER STYLES --- */
  .dossier-card {
    background: rgba(79, 70, 229, 0.05);
    border-left: 4px solid #4F46E5;
    transition: all 0.3s ease;
  }
  .dossier-card:hover {
    background: rgba(79, 70, 229, 0.1);
    transform: translateX(4px);
  }

  /* --- TIMELINE STYLES --- */
  .reverse-timeline-line {
    position: absolute;
    left: 24px;
    top: 20px;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #4F46E5 40%, rgba(255,255,255,0.1) 100%);
    z-index: 0;
  }
  
  .timeline-node {
    z-index: 10;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .timeline-node:hover {
    transform: scale(1.15);
    box-shadow: 0 0 15px rgba(79, 70, 229, 0.5);
  }

  /* --- TOGGLE SWITCH --- */
  .lifestyle-toggle {
    position: relative;
    width: 44px;
    height: 24px;
    background: rgba(255,255,255,0.1);
    border-radius: 99px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .lifestyle-toggle.active {
    background: #4F46E5;
  }
  .lifestyle-toggle::after {
    content: '';
    position: absolute;
    left: 2px;
    top: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .lifestyle-toggle.active::after {
    transform: translateX(20px);
  }
`;

// --- TYPES & DATA ---

interface University {
  id: string;
  name: string;
  location: string;
  flag: string; // Emoji
  image: string; // Placeholder color class
  officialReq: string;
  hiddenReality: string;
  researchWeight: 'Low' | 'Medium' | 'High';
  language: { level: string; name: string; roadmapLink: string };
  costs: { tuition: number; rent: number; food: number; insurance: number; currency: string };
  visa: string[];
  intake: string;
}

const UNIVERSITIES: University[] = [
  {
    id: 'tum',
    name: 'Technical University of Munich',
    location: 'Munich, Germany',
    flag: '🇩🇪',
    image: 'bg-blue-600',
    officialReq: 'GRE Not Required. GPA 3.0+',
    hiddenReality: '85% of accepted Indian students had a GATE score or GRE > 315. High rejection rate for generic SOPs.',
    researchWeight: 'High',
    language: { level: 'A2', name: 'German', roadmapLink: 'Start 30-Day German Challenge' },
    costs: { tuition: 0, rent: 850, food: 350, insurance: 110, currency: '€' },
    visa: ['Blocked Account (€11,208)', 'APS Certificate (India)', 'Biometric Photo', 'Admit Letter'],
    intake: 'Winter 2026'
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    location: 'California, USA',
    flag: '🇺🇸',
    image: 'bg-red-700',
    officialReq: 'GRE Optional. GPA 3.5+',
    hiddenReality: 'Research publications are virtually mandatory for MS CS. "Optional" GRE means 168+ Quant is expected.',
    researchWeight: 'High',
    language: { level: 'C1', name: 'English (TOEFL)', roadmapLink: 'Advanced English Prep' },
    costs: { tuition: 4800, rent: 1500, food: 600, insurance: 250, currency: '$' },
    visa: ['I-20 Form', 'SEVIS Fee Payment', 'DS-160 Confirmation', 'Financial Proof ($80k+)'],
    intake: 'Fall 2026'
  }
];

const HigherEducationView = () => {
  // State
  const [selectedUniId, setSelectedUniId] = useState<string>('tum');
  const [cookingAtHome, setCookingAtHome] = useState(true);
  
  // Computed
  const activeUni = UNIVERSITIES.find(u => u.id === selectedUniId) || UNIVERSITIES[0];
  
  // Cost Calculation
  const foodCost = cookingAtHome ? activeUni.costs.food : activeUni.costs.food * 2.5; // Eating out is expensive
  const totalMonthly = activeUni.costs.tuition/6 + activeUni.costs.rent + foodCost + activeUni.costs.insurance; // Approx monthly tuition
  
  // Timeline Logic (Mock Reverse Calculation)
  // Assuming Intake is roughly Oct 2026
  const timeline = [
    { date: 'Aug 2025', title: 'Standardized Tests', desc: `Take GRE/GATE & ${activeUni.language.name}`, status: 'upcoming', alert: false },
    { date: 'Oct 2025', title: 'Draft SOP & LORs', desc: `Focus on: ${activeUni.researchWeight === 'High' ? 'Research Impact' : 'Projects'}`, status: 'upcoming', alert: true },
    { date: 'Dec 2025', title: 'Submit Applications', desc: activeUni.id === 'tum' ? 'Via Uni-Assist' : 'Direct Portal', status: 'upcoming', alert: false },
    { date: 'Apr 2026', title: 'Visa Process', desc: activeUni.id === 'tum' ? 'Book VFS Slot (High Wait)' : 'Wait for I-20', status: 'upcoming', alert: false },
    { date: 'Sep 2026', title: 'Fly & Settle', desc: 'Find accommodation early', status: 'upcoming', alert: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 font-sans text-slate-200" style={{'--accent-color': '#4F46E5', '--accent-glow': 'rgba(79, 70, 229, 0.4)'} as any}>
      <style>{styles}</style>

      {/* 1. HEADER & SELECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 glass-workspace p-6 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-xl ${activeUni.image} flex items-center justify-center text-3xl shadow-lg`}>
            {activeUni.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{activeUni.name}</h1>
              <span className="text-2xl" title="Location">{activeUni.flag}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center"><MapPin size={14} className="mr-1"/> {activeUni.location}</span>
              <span className="flex items-center"><Calendar size={14} className="mr-1"/> Intake: {activeUni.intake}</span>
            </div>
          </div>
        </div>

        {/* Uni Switcher */}
        <div className="flex bg-black/30 p-1 rounded-xl border border-white/10">
          {UNIVERSITIES.map(uni => (
            <button
              key={uni.id}
              onClick={() => setSelectedUniId(uni.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedUniId === uni.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              {uni.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COL: DOSSIER (7 cols) --- */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* THE DEEP SCAN */}
          <div className="glass-workspace rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Eye className="mr-3 text-indigo-400"/> The Hidden Dossier
            </h2>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Official */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-3 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <FileText size={14}/> Official Requirements
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  "{activeUni.officialReq}"
                </p>
              </div>

              {/* Hidden/Real */}
              <div className="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500 opacity-50"></div>
                <div className="flex items-center gap-2 mb-3 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <EyeOff size={14}/> The Reality (Insider Data)
                </div>
                <p className="text-sm text-white font-medium leading-relaxed">
                  {activeUni.hiddenReality}
                </p>
              </div>
            </div>

            {/* Research Weight & Language */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-black/20 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                <div className={`p-3 rounded-lg ${activeUni.researchWeight === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  <BookOpen size={20}/>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold">Research Weight</div>
                  <div className="text-sm font-bold text-white">{activeUni.researchWeight} Priority</div>
                </div>
              </div>

              <div className="flex-1 bg-black/20 p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 uppercase font-bold">Language Barrier</span>
                  <span className="text-xs font-bold text-indigo-400">{activeUni.language.level} Required</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-indigo-500 h-full w-[40%]"></div>
                </div>
                <button className="text-[10px] text-indigo-300 hover:text-white flex items-center transition-colors">
                  <Sparkles size={10} className="mr-1"/> {activeUni.language.roadmapLink}
                </button>
              </div>
            </div>
          </div>

          {/* REVERSE TIMELINE */}
          <div className="glass-workspace rounded-2xl p-8 relative">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Clock className="mr-3 text-indigo-400"/> Reverse Application Timeline
            </h2>
            
            <div className="relative pl-4 space-y-8">
              <div className="reverse-timeline-line"></div>
              
              {timeline.map((item, i) => (
                <div key={i} className="relative flex items-start gap-4 group">
                  {/* Node */}
                  <div className={`timeline-node w-12 h-12 rounded-xl flex items-center justify-center border-2 shrink-0 ${item.alert ? 'bg-orange-500/10 border-orange-500 text-orange-500' : 'bg-[#0F172A] border-indigo-500 text-indigo-400'}`}>
                    <span className="text-xs font-bold text-center leading-tight">
                      {item.date.split(' ')[0]}<br/>
                      <span className="text-[9px] opacity-70">{item.date.split(' ')[1]}</span>
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 p-4 rounded-xl border transition-all ${item.alert ? 'bg-orange-500/5 border-orange-500/30' : 'bg-white/5 border-white/5 hover:border-indigo-500/30'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-bold text-sm ${item.alert ? 'text-orange-200' : 'text-white'}`}>{item.title}</h3>
                      {item.alert && <AlertTriangle size={14} className="text-orange-500"/>}
                    </div>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- RIGHT COL: SIMULATOR (5 cols) --- */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* LIFE SIMULATOR */}
          <div className="glass-workspace rounded-2xl p-6 border-t-4 border-t-indigo-500">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Globe className="mr-2 text-indigo-400"/> Life Simulator
              </h2>
              <div className="text-right">
                <div className="text-[10px] text-gray-500 uppercase font-bold">Est. Monthly Cost</div>
                <div className="text-2xl font-bold text-white font-mono">
                  {activeUni.costs.currency}{Math.round(totalMonthly).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Lifestyle Toggle */}
            <div className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/5 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Utensils size={16} className={cookingAtHome ? 'text-green-400' : 'text-gray-500'}/>
                <span>Cooking at Home?</span>
              </div>
              <div 
                className={`lifestyle-toggle ${cookingAtHome ? 'active' : ''}`}
                onClick={() => setCookingAtHome(!cookingAtHome)}
              ></div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 mb-6">
              {[
                { label: 'Rent (Shared Apt)', value: activeUni.costs.rent, icon: Building2, color: 'text-blue-400' },
                { label: cookingAtHome ? 'Groceries' : 'Eating Out', value: foodCost, icon: Utensils, color: 'text-green-400' },
                { label: 'Health Insurance', value: activeUni.costs.insurance, icon: Shield, color: 'text-red-400' },
                { label: 'Monthly Tuition (Avg)', value: Math.round(activeUni.costs.tuition/6), icon: GraduationCap, color: 'text-purple-400' },
              ].map((cost, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-2 rounded hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3 text-gray-300">
                    <cost.icon size={16} className={cost.color}/> {cost.label}
                  </div>
                  <div className="font-mono font-bold text-gray-200">
                    {activeUni.costs.currency}{cost.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Funding Gap Alert */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3">
              <TrendingUp size={20} className="text-red-400 shrink-0"/>
              <div>
                <h4 className="text-xs font-bold text-red-300 uppercase mb-1">Funding Gap Detected</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Based on your current savings (₹1.5L), you need a <span className="text-white font-bold">Part-Time Job (20hrs/week)</span> to cover living expenses after Month 4.
                </p>
              </div>
            </div>
          </div>

          {/* VISA CHECKLIST */}
          <div className="glass-workspace rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 text-white font-bold">
              <Plane className="text-indigo-400"/> Visa Requirements
            </div>
            
            <div className="space-y-3">
              {activeUni.visa.map((req, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:border-indigo-500/30 transition-colors group cursor-pointer">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-600 group-hover:border-indigo-500 flex items-center justify-center transition-colors">
                    <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{req}</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center shadow-lg">
              <FileText size={14} className="mr-2"/> Download Full Checklist
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HigherEducationView;
