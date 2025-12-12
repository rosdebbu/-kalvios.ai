
import React, { useState } from 'react';
import { 
  Flame, Skull, TrendingDown, PieChart, Wallet, ShoppingBag, 
  Music, Bus, DollarSign, Bot, CreditCard, AlertTriangle 
} from 'lucide-react';

const styles = `
  /* Advanced Glassmorphism Base (Shared) */
  .glass-workspace {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }
  
  /* Finance Specific Styles */
  .finance-card {
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
    transition: all 0.3s ease;
  }
  .finance-card:hover {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.4);
  }
  
  .pie-chart {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: conic-gradient(
      #EF4444 0% var(--food-pct), 
      #3B82F6 var(--food-pct) var(--transport-pct), 
      #F59E0B var(--transport-pct) var(--tech-pct),
      #10B981 var(--tech-pct) 100%
    );
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
  }
  .pie-chart::after {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    background: #0F172A;
    border-radius: 50%;
  }
  
  .transaction-item {
    animation: slideDown 0.3s ease-out forwards;
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// --- COMPONENT: BURN RATE SIMULATOR ---
const BurnRateSimulator = ({ currentBurnRate }: { currentBurnRate: number }) => {
  const [balance, setBalance] = useState(5000);
  const [simulatedBurn, setSimulatedBurn] = useState(currentBurnRate || 250); 
  
  const daysLeft = Math.floor(balance / (simulatedBurn > 0 ? simulatedBurn : 1));
  const zeroDate = new Date();
  zeroDate.setDate(zeroDate.getDate() + daysLeft);
  const formattedZeroDate = zeroDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  const isCritical = daysLeft < 10;
  const isWarning = daysLeft < 20;
  const statusColor = isCritical ? 'text-red-500' : isWarning ? 'text-yellow-500' : 'text-emerald-400';
  const progressColor = isCritical ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-emerald-500';

  return (
    <div className="glass-workspace rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 pointer-events-none transition-colors duration-500 ${isCritical ? 'bg-red-600' : 'bg-emerald-600'}`}></div>
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center">
            <Flame className={`mr-2 ${statusColor} animate-pulse`} size={20}/> Burn Rate Simulator
          </h3>
          <p className="text-xs text-gray-400 mt-1">Predict your financial runway.</p>
        </div>
        <div className={`px-3 py-1 rounded-lg border ${isCritical ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
          <span className={`text-xs font-bold ${statusColor}`}>
            {daysLeft} Days Left
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="flex flex-col justify-center bg-black/20 rounded-xl p-4 border border-white/5">
           <div className="text-center mb-4">
             <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Zero Date</div>
             <div className={`text-3xl font-extrabold ${statusColor} drop-shadow-md`}>{formattedZeroDate}</div>
             {isCritical && <div className="text-xs text-red-400 font-bold mt-2 flex items-center justify-center"><Skull size={12} className="mr-1"/> You will go broke soon!</div>}
           </div>
           <div className="relative pt-6 pb-2">
             <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
               <div className={`h-full ${progressColor} transition-all duration-500`} style={{ width: `${Math.min(daysLeft, 100)}%` }}></div>
             </div>
             <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-mono uppercase">
               <span>Today</span>
               <span>{daysLeft} Days</span>
               <span>Zero Date</span>
             </div>
           </div>
        </div>
        <div className="space-y-6">
           <div>
             <div className="flex justify-between text-xs mb-2 font-bold text-gray-300">
               <span>Current Balance</span>
               <span>₹{balance.toLocaleString()}</span>
             </div>
             <input type="range" min="500" max="50000" step="100" value={balance} onChange={(e) => setBalance(parseInt(e.target.value))} className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-200"/>
           </div>
           <div>
             <div className="flex justify-between text-xs mb-2 font-bold text-gray-300">
               <span className="flex items-center"><TrendingDown size={12} className="mr-1 text-red-400"/> Daily Spending</span>
               <span className="text-red-400">-₹{simulatedBurn}/day</span>
             </div>
             <input type="range" min="50" max="2000" step="50" value={simulatedBurn} onChange={(e) => setSimulatedBurn(parseInt(e.target.value))} className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500 hover:accent-red-400"/>
           </div>
           <div className="bg-white/5 p-3 rounded-lg border border-white/5">
             <p className="text-xs text-gray-300 leading-relaxed">
               <span className="text-emerald-400 font-bold">Strategy:</span> Reducing daily spend by <span className="text-white font-bold">₹100</span> extends your runway by <span className="text-white font-bold">{Math.floor(balance/(simulatedBurn-100)) - daysLeft} days</span>.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- MoneyView ---
const MoneyView = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 font-sans" style={{'--accent-color': '#10B981', '--accent-glow': 'rgba(16, 185, 129, 0.4)'} as any}>
      <style>{styles}</style>
      {/* Burn Rate Simulator */}
      <BurnRateSimulator currentBurnRate={250} />
      
      {/* Spending Breakdown & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-workspace rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <PieChart className="mr-2 text-emerald-400"/> Spending Analysis
          </h3>
          <div className="flex flex-col items-center">
            <div className="pie-chart mb-6" style={{'--food-pct': '45%', '--transport-pct': '65%', '--tech-pct': '85%'} as any}>
              <div className="text-center z-10">
                 <div className="text-xs text-gray-400 uppercase font-bold">Total</div>
                 <div className="text-xl font-bold text-white">₹3,200</div>
              </div>
            </div>
            <div className="w-full space-y-3">
               {[
                 { label: 'Food & Dining', val: '45%', color: 'bg-red-500', amt: '₹1,440' },
                 { label: 'Transport', val: '20%', color: 'bg-blue-500', amt: '₹640' },
                 { label: 'Tech & Subs', val: '20%', color: 'bg-amber-500', amt: '₹640' },
                 { label: 'Savings', val: '15%', color: 'bg-emerald-500', amt: '₹480' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between text-sm">
                   <div className="flex items-center">
                     <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                     <span className="text-gray-300">{item.label}</span>
                   </div>
                   <span className="font-bold text-white">{item.amt}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="glass-workspace rounded-2xl p-6 relative overflow-hidden">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                 <CreditCard className="mr-2 text-emerald-400"/> Recent Transactions
              </h3>
              <button className="text-xs text-gray-400 hover:text-white">View All</button>
           </div>
           <div className="space-y-4">
              {[
                { title: 'Swiggy', date: 'Today, 1:20 PM', amt: '-₹240', icon: ShoppingBag, color: 'text-orange-400' },
                { title: 'Spotify Premium', date: 'Yesterday', amt: '-₹119', icon: Music, color: 'text-green-400' },
                { title: 'Uber Auto', date: 'Yesterday', amt: '-₹85', icon: Bus, color: 'text-blue-400' },
                { title: 'Freelance Payout', date: 'Oct 12', amt: '+₹2,500', icon: DollarSign, color: 'text-emerald-400', isIncome: true },
              ].map((t, i) => (
                <div key={i} className="transaction-item flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center ${t.color}`}>
                         <t.icon size={18}/>
                      </div>
                      <div>
                         <div className="font-bold text-gray-200">{t.title}</div>
                         <div className="text-xs text-gray-500">{t.date}</div>
                      </div>
                   </div>
                   <div className={`font-mono font-bold ${t.isIncome ? 'text-emerald-400' : 'text-gray-300'}`}>
                      {t.amt}
                   </div>
                </div>
              ))}
           </div>
           
           {/* Smart Nudge */}
           <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
              <Bot className="text-emerald-400 shrink-0 mt-0.5" size={18}/>
              <p className="text-xs text-emerald-100 leading-relaxed">
                 <span className="font-bold">AI Insight:</span> You spend ₹1,200/month on food delivery on weekends. Cooking pasta at home could save you enough for that Udemy course in 2 months.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyView;
