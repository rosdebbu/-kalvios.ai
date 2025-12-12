import React from 'react';
import { STUDENT_TYPES } from '../constants';
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const StudentTypes: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 bg-white" id="student-types" ref={elementRef}>
      <div className={`container mx-auto px-4 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for Every Student's Journey</h2>
          <p className="text-xl text-gray-500">Whether you're in school, college, or preparing for a career, Kalvi AI adapts to you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {STUDENT_TYPES.map((type) => (
            <div key={type.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group flex flex-col h-full">
              <div className={`w-14 h-14 rounded-full ${type.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <type.icon size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-sm text-gray-500 mb-4 font-medium">{type.description}</p>
              
              <ul className="space-y-2 mb-6 flex-grow">
                {type.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="mr-2 text-primary">•</span> {feat}
                  </li>
                ))}
              </ul>

              <button className="w-full py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors flex items-center justify-center">
                Find Your Path <ArrowRight size={14} className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentTypes;
