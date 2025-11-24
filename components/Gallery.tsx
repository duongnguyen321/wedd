import React from 'react';
import { useWeddingData } from '../contexts/WeddingContext';

export const Gallery: React.FC = () => {
  const { data } = useWeddingData();
  
  if (!data) return null;
  
  const photos = data.gallery.items;

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-wedding-gold uppercase tracking-widest text-sm font-semibold">{data.gallery.sectionTitle}</span>
          <h2 className="font-script text-4xl md:text-5xl text-stone-800 mt-2">{data.gallery.mainTitle}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((src, index) => (
            <div 
              key={index} 
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img 
                src={src} 
                alt={`Gallery ${index}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="text-white font-serif italic text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                   Happy Day
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};