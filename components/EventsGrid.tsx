
import React from 'react';
import { EVENTS } from '../constants';
import { Calendar, MapPin, Ticket } from 'lucide-react';

const EventsGrid: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto relative z-10">
      {EVENTS.map((e, i) => (
        <div
          key={e.id}
          className="bg-[#143D30] text-white rounded-[2.5rem] p-6 lg:p-8 flex flex-col xl:flex-row gap-6 lg:gap-8 items-center group relative overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(20,61,48,0.4)] hover:-translate-y-2 transition-all duration-500 ease-out animate-fade-in-up"
          style={{ animationDelay: `${i * 200}ms` }}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="w-full xl:w-2/5 aspect-square rounded-[2rem] overflow-hidden shrink-0 shadow-inner">
            <img src={e.image} alt={e.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
          </div>
          <div className="flex-grow space-y-5 w-full">
            <h4 className="text-3xl font-serif leading-tight">{e.name}</h4>
            <p className="text-white/70 text-[15px] font-light leading-relaxed">{e.teaser}</p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                <Calendar className="w-4 h-4 text-[#D8B4FE]" />
                {e.date}
              </div>
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                <MapPin className="w-4 h-4 text-[#D8B4FE]" />
                {e.location}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 mt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#D8B4FE]/80" />
                <span className="text-2xl font-serif">${e.price}</span>
              </div>
              <button className="bg-white text-[#143D30] px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#D8B4FE] transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 duration-300">
                Book Ticket
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsGrid;
