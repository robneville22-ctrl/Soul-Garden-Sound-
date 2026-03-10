
import React from 'react';
import { SITE_SETTINGS } from '../constants';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-4">
        <div className="bg-[#143D30] rounded-[3rem] md:rounded-[4rem] py-24 lg:py-32 px-8 lg:px-16 text-center text-white relative overflow-hidden shadow-2xl animate-fade-in-up">
          {/* Background Aura Gradients for inside the CTA */}
          <div className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-[#D8B4FE]/20 blur-[120px] rounded-full animate-pulse-slow"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-[#FBCFE8]/20 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight">{SITE_SETTINGS.cta_title}</h2>
            <p className="text-white/80 font-light text-xl mb-14 tracking-wide max-w-2xl mx-auto leading-relaxed">
              {SITE_SETTINGS.cta_description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-white text-[#143D30] px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#D8B4FE] hover:text-[#143D30] transition-all transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl duration-300"
              >
                {SITE_SETTINGS.cta_button_primary}
              </button>
              <button className="w-full sm:w-auto border border-white/20 text-white px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                {SITE_SETTINGS.cta_button_secondary}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
