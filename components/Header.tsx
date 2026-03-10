
import React from 'react';
import { SITE_SETTINGS } from '../constants';

interface HeaderProps {
  onOpenBooking: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <div className="text-3xl font-serif font-medium tracking-tight text-[#143D30] hover:opacity-80 transition-opacity cursor-pointer">
          {SITE_SETTINGS.site_name}
        </div>

        <nav className="hidden md:flex items-center space-x-12 text-[11px] font-bold uppercase tracking-[0.25em] text-[#143D30]">
          <a href="#benefits" className="relative group py-2">
            {SITE_SETTINGS.nav_benefits}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#143D30]/40 transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
          <a href="#services" className="relative group py-2">
            {SITE_SETTINGS.nav_services}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#143D30]/40 transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
          <a href="#events" className="relative group py-2">
            {SITE_SETTINGS.events_heading}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#143D30]/40 transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
        </nav>

        <button
          onClick={onOpenBooking}
          className="bg-[#143D30] text-white px-8 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#1b4e3d] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_8px_20px_rgba(20,61,48,0.2)] hover:shadow-[0_12px_25px_rgba(20,61,48,0.3)]"
        >
          {SITE_SETTINGS.book_button}
        </button>
      </div>
    </header>
  );
};

export default Header;
