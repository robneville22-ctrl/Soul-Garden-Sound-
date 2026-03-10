
import React from 'react';
import { SERVICES } from '../constants';
import { Clock, Sparkles, Music, Heart, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Map icon names to Lucide React components
const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Music,
  Heart,
  Star,
};

// Get icon component or default to Sparkles
const getIcon = (iconName?: string): LucideIcon => {
  if (!iconName) return Sparkles;
  return iconMap[iconName] || Sparkles;
};

const ServicesGrid: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto relative z-10">
      {SERVICES.map((s, i) => {
        const IconComponent = getIcon(s.icon);
        return (
          <div
            key={s.id}
            className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2.5rem] p-8 lg:p-10 hover:shadow-[0_20px_40px_-15px_rgba(20,61,48,0.15)] hover:-translate-y-2 transition-all duration-500 ease-out group overflow-hidden cursor-pointer relative animate-fade-in-up"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="aspect-[16/10] mb-8 overflow-hidden rounded-[2rem] relative shadow-inner">
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              {/* Icon overlay on image */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full p-3.5 shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ease-out">
                <IconComponent className="w-6 h-6 text-[#143D30]" />
              </div>
            </div>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <h4 className="text-3xl font-serif text-[#143D30] group-hover:text-[#1b4e3d] transition-colors">{s.name}</h4>
              </div>
              <span className="text-2xl font-serif text-[#143D30]">${s.price}</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#143D30]/50 mb-5">{s.tagline}</p>
            <p className="text-[#143D30]/70 font-light text-[15px] mb-8 leading-relaxed">
              {s.description}
            </p>
            <div className="flex items-center justify-between pt-6 border-t border-[#143D30]/10 mt-auto">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#143D30]/60">
                <Clock className="w-4 h-4" />
                {s.duration}
              </div>
              <button className="text-[#143D30] text-[11px] font-bold uppercase tracking-[0.2em] group-hover:text-[#D8B4FE] transition-colors flex items-center gap-2">
                Learn More
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesGrid;
