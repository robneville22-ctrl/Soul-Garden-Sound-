
import React from 'react';
import { SERVICES } from '../constants';
import { Clock, DollarSign } from 'lucide-react';

const ServicesGrid: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {SERVICES.map((s) => (
        <div 
          key={s.id} 
          className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out group overflow-hidden cursor-pointer"
        >
          <div className="aspect-[16/10] mb-8 overflow-hidden rounded-2xl">
            <img 
              src={s.image} 
              alt={s.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
          </div>
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-2xl font-serif">{s.name}</h4>
            <span className="text-xl font-medium">${s.price}</span>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#143D30]/40 mb-4">{s.tagline}</p>
          <p className="text-[#143D30]/70 font-light text-sm mb-8 leading-relaxed">
            {s.description}
          </p>
          <div className="flex items-center justify-between pt-6 border-t border-[#143D30]/10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60">
              <Clock className="w-4 h-4" />
              {s.duration}
            </div>
            <button className="text-[#143D30] text-xs font-bold uppercase tracking-widest group-hover:underline underline-offset-4">
              Learn More →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesGrid;
