
import React from 'react';
import { SITE_SETTINGS } from '../constants';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="bg-[#143D30] rounded-[4rem] py-24 px-8 text-center text-white relative overflow-hidden">
          {/* Background Aura Gradients for inside the CTA */}
          <div className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-[#D8B4FE]/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-[#FBCFE8]/10 blur-[100px] rounded-full"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif mb-8">{SITE_SETTINGS.cta_title}</h2>
            <p className="text-white/70 font-light text-lg mb-12 tracking-wide">
              {SITE_SETTINGS.cta_description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-white text-[#143D30] px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#D8B4FE] hover:text-[#143D30] transition-all transform hover:scale-105 active:scale-95 shadow-xl"
              >
                {SITE_SETTINGS.cta_button_primary}
              </button>
              <button className="w-full sm:w-auto border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
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
