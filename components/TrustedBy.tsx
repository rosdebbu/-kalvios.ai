import React from 'react';

const TrustedBy: React.FC = () => {
  // Placeholder text for logos since we don't have SVGs
  const colleges = ["IIT Bombay", "BITS Pilani", "NIT Trichy", "VIT Vellore", "SRM", "DTU", "IIIT Hyderabad", "Manipal", "Anna University"];

  return (
    <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-8">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Trusted by 50,000+ students from top institutes</p>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <div className="py-4 animate-marquee whitespace-nowrap flex space-x-12 px-4">
          {colleges.concat(colleges).map((college, idx) => (
            <span key={idx} className="text-2xl font-bold text-gray-300 hover:text-gray-500 transition-colors cursor-default">
              {college}
            </span>
          ))}
        </div>
        <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap flex space-x-12 px-4">
          {colleges.concat(colleges).map((college, idx) => (
             <span key={idx} className="text-2xl font-bold text-gray-300 hover:text-gray-500 transition-colors cursor-default">
              {college}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </section>
  );
};

export default TrustedBy;