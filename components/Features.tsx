import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { LIFE_AREAS } from '../constants';
import { ArrowRight } from 'lucide-react';

const Features: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 bg-gray-50" id="life-areas" ref={elementRef}>
      <div className={`container mx-auto px-4 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🌟 Improve Yourself in Every Area of Life</h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">Kalvi AI helps you grow — not just in studies, but in money, career, and personal wellness.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LIFE_AREAS.map((area) => (
            <div key={area.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 relative overflow-hidden">
              {/* Hover highlight line */}
              <div className={`absolute top-0 left-0 w-full h-1 ${area.color.split(' ')[0].replace('bg-', 'bg-')}`}></div>
              
              <div className={`w-12 h-12 rounded-xl ${area.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <area.icon size={24} />
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-4">{area.title}</h3>
              
              <ul className="space-y-2 mb-6">
                {area.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start">
                    <span className="mr-2 text-green-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <a href="#" className="inline-flex items-center text-primary text-sm font-semibold opacity-80 group-hover:opacity-100 hover:underline">
                Explore <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            Explore All Life Areas
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
