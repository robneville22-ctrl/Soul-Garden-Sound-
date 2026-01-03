
import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { SITE_SETTINGS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="pt-20 pb-12 bg-white/50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-serif font-bold tracking-tight text-[#143D30] mb-8">
              {SITE_SETTINGS.site_name.split(' ').slice(0, 1).join(' ')} <span className="font-light italic">{SITE_SETTINGS.site_name.split(' ').slice(1).join(' ')}</span>
            </div>
            <p className="text-[#143D30]/60 max-w-sm font-light leading-relaxed mb-8">
              {SITE_SETTINGS.footer_tagline}
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-[#D8B4FE] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#D8B4FE] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#D8B4FE] transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-40">Navigate</h5>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><a href="#benefits" className="hover:underline">{SITE_SETTINGS.nav_benefits}</a></li>
              <li><a href="#mission" className="hover:underline">{SITE_SETTINGS.nav_mission}</a></li>
              <li><a href="#services" className="hover:underline">{SITE_SETTINGS.nav_services}</a></li>
              <li><a href="#events" className="hover:underline">{SITE_SETTINGS.events_heading}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-40">Location</h5>
            <p className="text-sm font-light leading-relaxed text-[#143D30]/70">
              {SITE_SETTINGS.footer_address_line1}<br />
              {SITE_SETTINGS.footer_address_line2}<br />
              <br />
              {SITE_SETTINGS.footer_email}<br />
              {SITE_SETTINGS.footer_phone}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-[#143D30]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#143D30]/40">
          <p>{SITE_SETTINGS.footer_copyright}</p>
          <p>{SITE_SETTINGS.footer_made_with}</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
