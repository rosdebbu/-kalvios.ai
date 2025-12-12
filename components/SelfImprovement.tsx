import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Brain, Clock, Coffee, Moon } from 'lucide-react';

const SelfImprovement: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 bg-indigo-50" ref={elementRef}>
      <div className={`container mx-auto px-4 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🧠 Know Yourself. Improve Yourself.</h2>
          <p className="text-xl text-gray-500">Kalvi AI learns your patterns to help you build a better version of yourself.</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Visual */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-indigo-100 relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Brain className="mr-2 text-indigo-600" /> My Insights Dashboard
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Insight Card 1 */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 flex items-start">
                 <div className="bg-white p-2 rounded-lg text-blue-600 mr-4 shadow-sm">
                   <Clock size={20} />
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 text-sm">Peak Focus Time</h4>
                   <p className="text-gray-600 text-sm mt-1">"You are 40% more productive between <strong>8 PM and 11 PM</strong>. I've scheduled your hardest subjects then."</p>
                 </div>
              </div>

              {/* Insight Card 2 */}
              <div className="bg-orange-50 rounded-xl p-5 border border-orange-100 flex items-start">
                 <div className="bg-white p-2 rounded-lg text-orange-600 mr-4 shadow-sm">
                   <Coffee size={20} />
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 text-sm">Burnout Alert</h4>
                   <p className="text-gray-600 text-sm mt-1">"You haven't taken a break in 4 hours. Take a 15-minute walk to reset your focus."</p>
                 </div>
              </div>

              {/* Insight Card 3 */}
              <div className="bg-purple-50 rounded-xl p-5 border border-purple-100 flex items-start">
                 <div className="bg-white p-2 rounded-lg text-purple-600 mr-4 shadow-sm">
                   <Moon size={20} />
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 text-sm">Sleep & Study</h4>
                   <p className="text-gray-600 text-sm mt-1">"On days you sleep less than 6 hours, your quiz scores drop by 15%. Go to bed by 11 PM tonight."</p>
                 </div>
              </div>

               {/* Insight Card 4 */}
               <div className="bg-green-50 rounded-xl p-5 border border-green-100 flex items-start">
                 <div className="bg-white p-2 rounded-lg text-green-600 mr-4 shadow-sm">
                   <span className="font-bold text-lg">₹</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 text-sm">Spending Pattern</h4>
                   <p className="text-gray-600 text-sm mt-1">"You spend ₹1,200/month on snacks. Switching to home food could buy you that course you wanted."</p>
                 </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 -left-10 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
        </div>
      </div>
    </section>
  );
};

export default SelfImprovement;
