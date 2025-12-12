
import React from 'react';
import { 
  FileBadge, BookOpen, CheckCircle2, Play, Award, 
  Share2, ChevronRight, Lock, Star
} from 'lucide-react';

const styles = `
  .glass-workspace {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }
  
  .cert-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.3s ease;
  }
  .cert-card:hover {
    transform: translateY(-5px);
    border-color: rgba(245, 158, 11, 0.5);
    box-shadow: 0 15px 30px -10px rgba(0,0,0,0.5);
  }

  .roadmap-line {
    position: absolute;
    top: 24px;
    left: 24px;
    bottom: 0;
    width: 2px;
    background: rgba(255, 255, 255, 0.1);
    z-index: 0;
  }
  
  .progress-ring-circle {
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
`;

const CertificationsView = () => {
  const activeCourses = [
    { id: 1, title: 'Complete Web Development Bootcamp', platform: 'Udemy', progress: 65, total: 40, completed: 26 },
    { id: 2, title: 'Machine Learning A-Z', platform: 'Coursera', progress: 12, total: 55, completed: 6.5 }
  ];

  const earnedCerts = [
    { id: 1, title: 'Python Basic', issuer: 'HackerRank', date: 'Oct 2024', color: 'border-yellow-500/50' },
    { id: 2, title: 'React Developer', issuer: 'Meta', date: 'Sep 2024', color: 'border-blue-500/50' }
  ];

  const roadmapSteps = [
    { id: 1, title: 'HTML & CSS', status: 'completed' },
    { id: 2, title: 'JavaScript Fundamentals', status: 'completed' },
    { id: 3, title: 'React & Redux', status: 'in-progress' },
    { id: 4, title: 'Backend (Node.js)', status: 'locked' },
    { id: 5, title: 'Database (MongoDB)', status: 'locked' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 font-sans" style={{'--accent-color': '#F59E0B', '--accent-glow': 'rgba(245, 158, 11, 0.4)'} as any}>
      <style>{styles}</style>

      {/* Hero */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-2">
        <div>
          <h2 className="text-3xl font-extrabold text-white flex items-center mb-2">
            <FileBadge className="mr-3 text-amber-500"/> Certifications & Skills
          </h2>
          <p className="text-gray-400">Track your courses, earn badges, and verify your skills.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-amber-900/20 border border-amber-500/30 px-4 py-2 rounded-xl text-center">
              <div className="text-xs text-amber-400 font-bold uppercase">Skill Level</div>
              <div className="text-white font-bold text-lg">Intermediate</div>
           </div>
           <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center">
              <div className="text-xs text-gray-400 font-bold uppercase">Badges</div>
              <div className="text-white font-bold text-lg">5</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Active Learning */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Active Courses */}
           <div className="glass-workspace rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-white flex items-center"><BookOpen className="mr-2 text-amber-500"/> Active Courses</h3>
                 <button className="text-xs text-gray-400 hover:text-white">View All</button>
              </div>
              <div className="space-y-4">
                 {activeCourses.map(course => (
                    <div key={course.id} className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center gap-4 group hover:border-amber-500/30 transition-colors">
                       <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                          <Play size={20} fill="currentColor" />
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between mb-1">
                             <h4 className="font-bold text-gray-200 text-sm">{course.title}</h4>
                             <span className="text-xs text-amber-400 font-bold">{course.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mb-1">
                             <div className="h-full bg-amber-500 rounded-full" style={{width: `${course.progress}%`}}></div>
                          </div>
                          <div className="text-[10px] text-gray-500">{course.completed}hrs / {course.total}hrs • {course.platform}</div>
                       </div>
                       <button className="p-2 bg-white/10 rounded-lg hover:bg-amber-600 hover:text-white transition-colors text-gray-400">
                          <ChevronRight size={16}/>
                       </button>
                    </div>
                 ))}
              </div>
           </div>

           {/* Skill Roadmap */}
           <div className="glass-workspace rounded-2xl p-6 relative">
              <h3 className="text-lg font-bold text-white mb-6">Full Stack Developer Roadmap</h3>
              <div className="relative pl-4 space-y-6">
                 <div className="roadmap-line"></div>
                 {roadmapSteps.map((step, i) => (
                    <div key={step.id} className="relative flex items-center gap-4 z-10">
                       <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center bg-[#0F172A] transition-colors ${
                          step.status === 'completed' ? 'border-green-500 text-green-500' : 
                          step.status === 'in-progress' ? 'border-amber-500 text-amber-500' : 
                          'border-gray-700 text-gray-700'
                       }`}>
                          {step.status === 'completed' ? <CheckCircle2 size={20}/> : step.status === 'locked' ? <Lock size={18}/> : <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"/>}
                       </div>
                       <div className={`flex-1 p-3 rounded-xl border ${
                          step.status === 'in-progress' ? 'bg-amber-500/10 border-amber-500/30' : 
                          'bg-white/5 border-white/5'
                       }`}>
                          <div className="text-sm font-bold text-gray-200">{step.title}</div>
                          <div className="text-[10px] text-gray-500 uppercase font-bold mt-0.5">{step.status.replace('-', ' ')}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

        </div>

        {/* Right: Vault & Verification */}
        <div className="space-y-6">
           
           {/* Certificate Vault */}
           <div className="glass-workspace rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                 <Award className="mr-2 text-yellow-400"/> Certificate Vault
              </h3>
              <div className="grid grid-cols-1 gap-4">
                 {earnedCerts.map(cert => (
                    <div key={cert.id} className={`cert-card p-4 rounded-xl border-l-4 ${cert.color}`}>
                       <div className="flex justify-between items-start mb-2">
                          <Award size={24} className="text-yellow-500"/>
                          <button className="text-gray-500 hover:text-white"><Share2 size={14}/></button>
                       </div>
                       <h4 className="font-bold text-white text-sm">{cert.title}</h4>
                       <p className="text-xs text-gray-400">{cert.issuer} • {cert.date}</p>
                    </div>
                 ))}
                 
                 {/* Empty State / Add New */}
                 <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-amber-500/30 hover:bg-amber-500/5 transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-amber-500 mb-2">
                       <Plus size={20}/>
                    </div>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-amber-400">Upload Certificate</span>
                 </div>
              </div>
           </div>

           {/* Skill Verification */}
           <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl p-6 shadow-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                 <Star className="text-yellow-300 fill-current" size={24}/>
                 <h3 className="font-bold text-lg">Verify Skills</h3>
              </div>
              <p className="text-sm text-amber-100 mb-6 leading-relaxed">
                 Take a 15-min AI-proctored test to earn the <strong>Gold React Badge</strong> and boost your profile visibility.
              </p>
              <button className="w-full py-3 bg-white text-orange-700 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                 Start Assessment
              </button>
           </div>

        </div>

      </div>
    </div>
  );
};

// Helper Icon
const Plus = ({size}: {size:number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

export default CertificationsView;
