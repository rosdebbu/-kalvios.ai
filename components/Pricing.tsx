import React from 'react';
import { PRICING } from '../constants';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">💎 Simple, Student-Friendly Pricing</h2>
          <p className="text-xl text-gray-500">Start free, upgrade when you need the full power of an AI agent.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.isPopular 
                  ? 'bg-gray-900 text-white shadow-2xl scale-105 border-none z-10' 
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={`ml-2 text-sm ${plan.isPopular ? 'text-gray-400' : 'text-gray-500'}`}>/ {plan.period}</span>
                </div>
                <p className={`mt-4 text-sm ${plan.isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.isPopular ? 'text-green-400' : 'text-green-600'}`} />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.isPopular 
                    ? 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/30' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
           Prices include 50% exclusive student discount. Cancel anytime.
        </div>
      </div>
    </section>
  );
};

export default Pricing;