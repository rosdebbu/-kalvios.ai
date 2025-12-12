import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">💬 Students Who Improved with Kalvi AI</h2>
          <p className="text-xl text-gray-500">Real students. Real improvements.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
              <div className="flex text-yellow-400 mb-4 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed flex-grow">"{t.quote}"</p>
              
              <div className="border-t border-gray-200 pt-4">
                 <div className="font-bold text-gray-900">{t.name}</div>
                 <div className="text-xs text-primary font-bold uppercase tracking-wide mt-1">{t.type}</div>
                 <div className="text-sm text-gray-500 mt-1">Achievement: <span className="text-green-600 font-medium">{t.achievement}</span></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 md:gap-16 mt-16 flex-wrap opacity-70">
           <div className="text-center">
             <div className="text-3xl font-bold text-gray-900">10,000+</div>
             <div className="text-sm text-gray-500">Students Improving</div>
           </div>
           <div className="w-px h-12 bg-gray-300 hidden md:block"></div>
           <div className="text-center">
             <div className="text-3xl font-bold text-gray-900">50+</div>
             <div className="text-sm text-gray-500">Exams Supported</div>
           </div>
           <div className="w-px h-12 bg-gray-300 hidden md:block"></div>
           <div className="text-center">
             <div className="text-3xl font-bold text-gray-900">12</div>
             <div className="text-sm text-gray-500">Life Areas</div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
