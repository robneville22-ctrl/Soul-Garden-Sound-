
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
    <section className="py-24 bg-[#FFFDF5]/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[#143D30]/10 flex items-center justify-center text-[#143D30] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h3 className="text-2xl font-serif mb-4">{v.title}</h3>
              <p className="text-[#143D30]/70 font-light leading-relaxed">
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
