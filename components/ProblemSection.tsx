import React from 'react';
import { PROBLEMS } from '../constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ProblemSection: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-24 bg-red-50/50" ref={elementRef}>
      <div className={`container mx-auto px-4 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">😫 The Student Struggle is Real</h2>
          <p className="text-xl text-gray-500">Do any of these sound familiar?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROBLEMS.map((prob, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl mb-4">{prob.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{prob.title}</h3>
              <p className="text-gray-600 italic">{prob.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-lg md:text-xl font-medium text-gray-700">
            What if AI could organize everything and show you exactly where to improve?
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
