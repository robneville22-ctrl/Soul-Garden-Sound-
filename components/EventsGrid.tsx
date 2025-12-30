
import React from 'react';
import { EVENTS } from '../lib/loadContent';
import { Calendar, MapPin, Ticket } from 'lucide-react';

const EventsGrid: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {EVENTS.map((e) => (
        <div key={e.id} className="bg-[#143D30] text-white rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 items-center group">
          <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shrink-0">
            <img src={e.image} alt={e.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="flex-grow space-y-4">
            <h4 className="text-2xl font-serif">{e.name}</h4>
            <p className="text-white/70 text-sm font-light">{e.teaser}</p>
            <div className="space-y-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                {e.date}
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                {e.location}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#D8B4FE]" />
                <span className="text-xl font-serif">${e.price}</span>
              </div>
              <button className="bg-white text-[#143D30] px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#D8B4FE] transition-colors">
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
