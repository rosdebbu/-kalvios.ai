import React from 'react';
import { Upload, FolderKanban, BarChart3, TrendingUp, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const HowItWorks: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  const steps = [
    {
      icon: Upload,
      title: "1. Upload",
      desc: "Add your subjects, PDF notes, syllabus, video links, and goals.",
      color: "blue"
    },
    {
      icon: FolderKanban,
      title: "2. Organize",
      desc: "AI automatically categorizes, structures, and tags everything for you.",
      color: "purple"
    },
    {
      icon: BarChart3,
      title: "3. Analyze",
      desc: "AI finds your weak areas, habits, and gaps in preparation.",
      color: "orange"
    },
    {
      icon: TrendingUp,
      title: "4. Improve",
      desc: "Get personalized daily tasks and resources to fix gaps and grow.",
      color: "green"
    }
  ];

  return (
    <section className="py-24 bg-white" id="how-it-works" ref={elementRef}>
      <div className={`container mx-auto px-4 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">📤 Upload. Let AI Organize. Improve.</h2>
          <p className="text-xl text-gray-500">You bring the content, AI brings the intelligence.</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-4 w-[95%] h-1 bg-gradient-to-r from-blue-100 via-purple-100 to-green-100 -translate-y-12 -z-10 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                <div className={`w-24 h-24 rounded-2xl bg-white border-4 border-${step.color}-50 shadow-xl flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300 relative z-10`}>
                  <div className={`w-16 h-16 rounded-xl bg-${step.color}-100 flex items-center justify-center text-${step.color}-600`}>
                    <step.icon size={32} />
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
