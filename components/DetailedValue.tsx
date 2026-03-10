
import React from 'react';
import { SITE_SETTINGS } from '../constants';

const DetailedValue: React.FC = () => {
  return (
    <section className="py-32 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 animate-fade-in-up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FBCFE8]/40 to-[#D8B4FE]/40 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-70"></div>
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200"
                alt="Meditation and Healing Atmosphere"
                className="rounded-[2.5rem] shadow-2xl w-full h-[600px] object-cover bg-[#FDF4FF] transition-all duration-1000 relative z-10 group-hover:scale-[1.02]"
                onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                style={{ opacity: 0 }}
              />
              <div className="absolute -bottom-10 -right-4 md:-right-10 w-48 h-48 bg-white/70 backdrop-blur-xl border border-white/60 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-4 z-20 hover:bg-white/90">
                <div className="text-center">
                  <span className="block text-4xl font-serif text-[#143D30] mb-1">100%</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#143D30]/80">Natural</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-10 lg:pl-8 animate-fade-in-up [animation-delay:300ms]">
            <h2 className="text-4xl lg:text-5xl font-serif leading-tight text-[#143D30]">
              {SITE_SETTINGS.mission_title.includes(' & ') ? (
                <>
                  {SITE_SETTINGS.mission_title.split(' & ')[0]} <br />
                  <span className="italic font-light text-[#143D30]/90">& {SITE_SETTINGS.mission_title.split(' & ')[1]}</span>
                </>
              ) : (
                SITE_SETTINGS.mission_title
              )}
            </h2>
            <div className="space-y-6 text-[#143D30]/80 font-light leading-relaxed text-lg">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#143D30]">
                {SITE_SETTINGS.mission_para_1}
              </p>
              <p>
                {SITE_SETTINGS.mission_para_2}
              </p>
              <div className="pt-8 border-t border-[#143D30]/10 mt-8">
                <ul className="space-y-5">
                  {[SITE_SETTINGS.mission_bullet_1, SITE_SETTINGS.mission_bullet_2, SITE_SETTINGS.mission_bullet_3].map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-5 group/item">
                      <span className="w-2 h-2 rounded-full bg-[#143D30]/40 group-hover/item:bg-[#143D30] group-hover/item:scale-150 transition-all duration-300"></span>
                      <span className="text-md tracking-wide group-hover/item:text-[#143D30] transition-colors">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedValue;
