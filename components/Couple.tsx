import React from 'react';
import { useWeddingData } from '../contexts/WeddingContext';

export const Couple: React.FC = () => {
  const { data } = useWeddingData();
  
  if (!data) return null;

  return (
    <section id="couple" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-wedding-gold uppercase tracking-widest text-sm font-semibold">{data.couple.sectionTitle}</span>
          <h2 className="font-script text-4xl md:text-5xl text-stone-800 mt-2">{data.couple.mainTitle}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Groom */}
          <div className="flex flex-col items-center" data-aos="fade-right">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 group">
              <div className="absolute inset-0 border-2 border-wedding-gold rounded-full transform translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg">
                <img 
                  src={data.couple.groomImage}
                  alt="Groom" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <h3 className="font-serif text-3xl text-stone-800 mb-2">{data.names.groom}</h3>
            <span className="text-wedding-gold font-medium mb-4">{data.couple.groomRole}</span>
            <p className="text-stone-600 text-center max-w-sm italic">
              "{data.couple.groomQuote}"
            </p>
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center" data-aos="fade-left">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 group">
              <div className="absolute inset-0 border-2 border-wedding-gold rounded-full transform -translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg">
                <img 
                  src={data.couple.brideImage}
                  alt="Bride" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <h3 className="font-serif text-3xl text-stone-800 mb-2">{data.names.bride}</h3>
            <span className="text-wedding-gold font-medium mb-4">{data.couple.brideRole}</span>
            <p className="text-stone-600 text-center max-w-sm italic">
              "{data.couple.brideQuote}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};