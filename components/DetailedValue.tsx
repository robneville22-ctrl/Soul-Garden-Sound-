
import React from 'react';
import { SITE_SETTINGS } from '../constants';

const DetailedValue: React.FC = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200" 
                alt="Meditation and Healing Atmosphere" 
                className="rounded-3xl shadow-2xl w-full h-[550px] object-cover bg-[#FDF4FF] transition-opacity duration-1000"
                onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                style={{ opacity: 0 }}
              />
              <div className="absolute -bottom-10 -right-4 md:-right-10 w-48 h-48 bg-[#E9D5FF] backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 duration-500">
                <div className="text-center">
                  <span className="block text-3xl font-serif text-[#143D30]">100%</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#143D30]/70">Natural</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#143D30]">
              {SITE_SETTINGS.mission_title.includes(' & ') ? (
                <>
                  {SITE_SETTINGS.mission_title.split(' & ')[0]} <br />
                  & {SITE_SETTINGS.mission_title.split(' & ')[1]}
                </>
              ) : (
                SITE_SETTINGS.mission_title
              )}
            </h2>
            <div className="space-y-6 text-[#143D30]/80 font-light leading-relaxed">
              <p>
                {SITE_SETTINGS.mission_para_1}
              </p>
              <p>
                {SITE_SETTINGS.mission_para_2}
              </p>
              <div className="pt-4">
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-[#143D30]"></span>
                    <span>{SITE_SETTINGS.mission_bullet_1}</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-[#143D30]"></span>
                    <span>{SITE_SETTINGS.mission_bullet_2}</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-[#143D30]"></span>
                    <span>{SITE_SETTINGS.mission_bullet_3}</span>
                  </li>
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
