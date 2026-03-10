
import React from 'react';
import { Sparkles, Music, Users } from 'lucide-react';
import { SITE_SETTINGS } from '../constants';

const ValueProps: React.FC = () => {
  const values = [
    {
      icon: <Music className="w-8 h-8" />,
      title: SITE_SETTINGS.benefits_title_1,
      description: SITE_SETTINGS.benefits_desc_1
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: SITE_SETTINGS.benefits_title_2,
      description: SITE_SETTINGS.benefits_desc_2
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: SITE_SETTINGS.benefits_title_3,
      description: SITE_SETTINGS.benefits_desc_3
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#143D30]/[0.02] to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20 text-center">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col items-center group animate-fade-in-up" style={{ animationDelay: `${i * 200}ms` }}>
              <div className="w-20 h-20 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 flex items-center justify-center text-[#143D30] mb-8 shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ease-out group-hover:shadow-2xl">
                {v.icon}
              </div>
              <h3 className="text-3xl font-serif mb-5 text-[#143D30] group-hover:text-[#1b4e3d] transition-colors">{v.title}</h3>
              <p className="text-[#143D30]/70 font-light leading-relaxed text-lg">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
