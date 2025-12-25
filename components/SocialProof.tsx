
import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const SocialProof: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">The Experience</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="p-8 rounded-[2rem] bg-white border border-[#143D30]/5 flex flex-col">
              <Quote className="w-10 h-10 text-[#A5B4FC]/40 mb-6" />
              <p className="text-lg font-light leading-relaxed italic mb-8 flex-grow text-[#143D30]/80">
                "{t.text}"
              </p>
              <div>
                <span className="block font-bold tracking-widest text-xs uppercase">{t.name}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-40">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
