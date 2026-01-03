
import React from 'react';
import { SITE_SETTINGS } from '../constants';

interface HeroProps {
  onOpenBooking: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-6">
            {SITE_SETTINGS.hero_headline_line1} <br />
            <span className="italic">{SITE_SETTINGS.hero_headline_line2}</span>
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide text-[#143D30]/80 max-w-2xl mx-auto mb-8">
            {SITE_SETTINGS.hero_description}
          </p>
          <button
            onClick={onOpenBooking}
            className="bg-[#143D30] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#1b4e3d] transition-all transform hover:scale-105 active:scale-95 shadow-xl"
          >
            {SITE_SETTINGS.hero_button}
          </button>
        </div>

        <div className="relative inline-block mt-8">
          <div className="rounded-[40px] overflow-hidden shadow-2xl max-w-3xl mx-auto border-8 border-white/40 bg-[#F3E8FF]">
            <img
              src={SITE_SETTINGS.hero_image}
              alt={SITE_SETTINGS.hero_image_alt}
              className="w-full h-auto object-cover max-h-[600px] transition-opacity duration-1000"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              style={{ opacity: 0 }}
            />
          </div>

          {/* Floating Pill Menu */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-full px-8 py-5 shadow-2xl flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.15em]">
              <a href="#benefits" className="hover:text-[#D8B4FE] transition-colors">{SITE_SETTINGS.hero_pill_benefits}</a>
              <span className="w-1 h-1 rounded-full bg-[#143D30]/20"></span>
              <a href="#mission" className="hover:text-[#D8B4FE] transition-colors">{SITE_SETTINGS.hero_pill_mission}</a>
              <span className="w-1 h-1 rounded-full bg-[#143D30]/20"></span>
              <a href="#services" className="hover:text-[#D8B4FE] transition-colors">{SITE_SETTINGS.hero_pill_services}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#FBCFE8]/30 blur-[100px] -z-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-[#A5B4FC]/20 blur-[120px] -z-10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;
