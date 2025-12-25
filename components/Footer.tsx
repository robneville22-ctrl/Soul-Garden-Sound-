
import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-20 pb-12 bg-white/50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-serif font-bold tracking-tight text-[#143D30] mb-8">
              Soul <span className="font-light italic">Garden Sound</span>
            </div>
            <p className="text-[#143D30]/60 max-w-sm font-light leading-relaxed mb-8">
              Healing the mind, body, and spirit through vibrational frequency and energetic restoration. Located in the heart of Austin, TX.
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
              <li><a href="#benefits" className="hover:underline">Benefits</a></li>
              <li><a href="#mission" className="hover:underline">Mission</a></li>
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="#events" className="hover:underline">Events</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-40">Location</h5>
            <p className="text-sm font-light leading-relaxed text-[#143D30]/70">
              1201 Wellness Way<br />
              Austin, TX 78701<br />
              <br />
              hello@soulgardensound.com<br />
              (512) 555-0123
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-[#143D30]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#143D30]/40">
          <p>&copy; 2024 Soul Garden Sound. All rights reserved.</p>
          <p>Made with ❤️ by your friend</p>
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
