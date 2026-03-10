
import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { SITE_SETTINGS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 bg-white/60 backdrop-blur-2xl border-t border-[#143D30]/5 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-serif font-medium tracking-tight text-[#143D30] mb-8">
              {SITE_SETTINGS.site_name.split(' ').slice(0, 1).join(' ')} <span className="font-light italic">{SITE_SETTINGS.site_name.split(' ').slice(1).join(' ')}</span>
            </div>
            <p className="text-[#143D30]/60 max-w-sm font-light leading-relaxed mb-10 text-[15px]">
              {SITE_SETTINGS.footer_tagline}
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="w-10 h-10 rounded-full border border-[#143D30]/10 flex items-center justify-center text-[#143D30]/60 hover:text-[#143D30] hover:border-[#143D30]/30 transition-all duration-300 hover:-translate-y-1"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#143D30]/10 flex items-center justify-center text-[#143D30]/60 hover:text-[#143D30] hover:border-[#143D30]/30 transition-all duration-300 hover:-translate-y-1"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#143D30]/10 flex items-center justify-center text-[#143D30]/60 hover:text-[#143D30] hover:border-[#143D30]/30 transition-all duration-300 hover:-translate-y-1"><Mail className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-8 text-[#143D30]/40">Navigate</h5>
            <ul className="space-y-5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#143D30]/80">
              <li><a href="#benefits" className="hover:text-[#D8B4FE] transition-colors">{SITE_SETTINGS.nav_benefits}</a></li>
              <li><a href="#services" className="hover:text-[#D8B4FE] transition-colors">{SITE_SETTINGS.nav_services}</a></li>
              <li><a href="#events" className="hover:text-[#D8B4FE] transition-colors">{SITE_SETTINGS.events_heading}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-8 text-[#143D30]/40">Location</h5>
            <p className="text-[15px] font-light leading-relaxed text-[#143D30]/80">
              {SITE_SETTINGS.footer_address_line1}<br />
              {SITE_SETTINGS.footer_address_line2}<br />
              <br />
              <a href={`mailto:${SITE_SETTINGS.footer_email}`} className="hover:text-[#D8B4FE] transition-colors">{SITE_SETTINGS.footer_email}</a><br />
              {SITE_SETTINGS.footer_phone}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-[#143D30]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#143D30]/40">
          <p>{SITE_SETTINGS.footer_copyright}</p>
          <p>{SITE_SETTINGS.footer_made_with}</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-[#143D30] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#143D30] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
