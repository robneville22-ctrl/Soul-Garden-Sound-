
import React from 'react';
import { TESTIMONIALS, SITE_SETTINGS } from '../constants';
import { Quote } from 'lucide-react';

const SocialProof: React.FC = () => {
  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-center mb-20 text-[#143D30]">{SITE_SETTINGS.testimonials_heading}</h2>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id} className="p-8 md:p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/80 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out animate-fade-in-up" style={{ animationDelay: `${i * 200}ms` }}>
              <Quote className="w-10 h-10 text-[#143D30]/20 mb-8" />
              <p className="text-xl font-light leading-relaxed italic mb-10 flex-grow text-[#143D30]/80">
                "{t.text}"
              </p>
              <div className="flex items-center gap-5 mt-auto pt-6 border-t border-[#143D30]/10">
                <div className="w-12 h-12 rounded-full bg-[#143D30]/5 flex items-center justify-center text-[#143D30] font-serif text-2xl shadow-inner border border-white/60">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <span className="block font-bold tracking-[0.2em] text-[11px] uppercase text-[#143D30] mb-1">{t.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#143D30]/50">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
