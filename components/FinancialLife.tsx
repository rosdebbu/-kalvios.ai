import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { TrendingUp, PieChart, Target, Bell, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';

const FinancialLife: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 bg-emerald-50" ref={elementRef}>
      <div className={`container mx-auto px-4 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            💰 Financial Life Area
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Learn Money Skills Your School Never Taught
          </h2>
          <p className="text-xl text-gray-600">
            Budget, save, and invest — AI helps you build wealth starting from just ₹500/month.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Stats & Chat */}
            <div className="space-y-6">
                {/* Hook Stat Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl shadow-emerald-900/5 border border-emerald-100 relative overflow-hidden">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center text-lg z-10 relative">
                        <TrendingUp className="text-emerald-600 mr-2" size={24}/> Power of Starting Early
                    </h3>
                    
                    <div className="space-y-6 relative z-10">
                        {/* Bar 1 */}
                        <div className="group">
                            <div className="flex justify-between items-end mb-1">
                                <div>
                                    <span className="text-sm font-bold text-gray-700 block">Start at Age 18</span>
                                    <span className="text-xs text-gray-500">₹1,000/mo invested</span>
                                </div>
                                <span className="text-2xl font-extrabold text-emerald-600">₹1.17 Crore</span>
                            </div>
                            <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[100%] transition-all duration-1000 group-hover:bg-emerald-400"></div>
                            </div>
                        </div>
                        
                        {/* Bar 2 */}
                        <div className="group">
                             <div className="flex justify-between items-end mb-1">
                                <div>
                                    <span className="text-sm font-bold text-gray-700 block">Start at Age 30</span>
                                    <span className="text-xs text-gray-500">₹1,000/mo invested</span>
                                </div>
                                <span className="text-xl font-bold text-gray-400">₹35 Lakhs</span>
                            </div>
                            <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                                <div className="bg-gray-400 h-full w-[30%]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                        <p className="text-sm text-red-800">
                            Difference: <span className="font-extrabold">₹82 Lakhs</span> just by waiting. Don't miss this.
                        </p>
                    </div>
                </div>

                {/* AI Feature Example */}
                <div className="bg-white rounded-2xl p-6 shadow-xl shadow-blue-900/5 border border-blue-100">
                    <div className="flex items-center mb-4 text-primary font-bold text-sm uppercase tracking-wide">
                        <MessageSquare size={16} className="mr-2" /> How Kalvi AI Helps
                    </div>
                    
                    <div className="space-y-4 font-sans text-sm">
                        <div className="flex justify-end">
                            <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md max-w-[85%]">
                                I'm always broke by month end 😫
                            </div>
                        </div>
                        <div className="flex justify-start">
                             <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm p-4 border border-gray-200 shadow-sm max-w-[95%] relative">
                                <div className="font-bold text-primary mb-2">I analyzed your spending:</div>
                                <div className="bg-white rounded-lg p-2 mb-2 border border-gray-100 text-xs">
                                   <div className="flex justify-between mb-1"><span>🍔 Food delivery</span> <span className="font-bold text-red-500">₹2,200 (44%)</span></div>
                                   <div className="flex justify-between"><span>📺 Unused subs</span> <span>₹200</span></div>
                                </div>
                                <div className="mb-2">
                                   <span className="font-bold text-emerald-600">Fix:</span> Cook 3x/week = Save ₹800/month.
                                </div>
                                <div className="text-gray-500 text-xs mt-2 pt-2 border-t border-gray-200">
                                   That's ₹9,600/year for your laptop! Want me to create this budget?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Features & Learning */}
            <div className="space-y-8">
                 {/* Feature Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { icon: PieChart, color: 'blue', title: 'Track Spending', desc: 'See where your money goes. AI auto-categorizes expenses.' },
                        { icon: Target, color: 'purple', title: 'Save Smartly', desc: 'Set goals for laptop, phone, trip. Track progress automatically.' },
                        { icon: TrendingUp, color: 'emerald', title: 'Learn Investing', desc: 'Understand SIP, mutual funds. Start with ₹500/month.' },
                        { icon: Bell, color: 'red', title: 'Smart Alerts', desc: '"You used 80% of food budget" — AI warns before you overspend.' }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className={`w-10 h-10 rounded-lg bg-${feature.color}-100 text-${feature.color}-600 flex items-center justify-center mb-3`}>
                                <feature.icon size={20} />
                            </div>
                            <h4 className="font-bold text-gray-900">{feature.title}</h4>
                            <p className="text-xs text-gray-600 mt-1 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                 </div>

                 {/* What You'll Learn */}
                 <div className="bg-white/50 backdrop-blur rounded-xl p-6 border border-emerald-100">
                    <h4 className="font-bold text-gray-900 mb-3">What You'll Learn:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                        {["Pocket money management", "Budgeting that actually works", "SIP & Mutual Funds basics", "Safe investments for students", "Ways to earn as a student"].map((item, i) => (
                            <div key={i} className="flex items-center text-sm text-gray-700">
                                <CheckCircle2 className="text-emerald-500 mr-2 w-4 h-4 flex-shrink-0" /> 
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* CTA */}
                 <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center hover:-translate-y-0.5">
                        💰 Start Your Financial Journey
                    </button>
                    <div className="text-xs font-medium text-gray-500 text-center sm:text-left">
                        <p>Free to learn • Indian context</p>
                        <p>Start with ₹500</p>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialLife;