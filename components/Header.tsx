
import React from 'react';
import { SITE_SETTINGS } from '../constants';

interface HeaderProps {
  onOpenBooking: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFDF5]/80 backdrop-blur-md border-b border-[#143D30]/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold tracking-tight text-[#143D30]">
          {SITE_SETTINGS.site_name}
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-[0.2em] text-[#143D30]">
          <a href="#benefits" className="hover:opacity-60 transition-opacity">{SITE_SETTINGS.nav_benefits}</a>
          <a href="#mission" className="hover:opacity-60 transition-opacity">{SITE_SETTINGS.nav_mission}</a>
          <a href="#services" className="hover:opacity-60 transition-opacity">{SITE_SETTINGS.nav_services}</a>
        </nav>

        <button
          onClick={onOpenBooking}
          className="bg-[#143D30] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1b4e3d] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#143D30]/10"
        >
          {SITE_SETTINGS.book_button}
        </button>
      </div>
    </header>
  );
};

export default Header;
