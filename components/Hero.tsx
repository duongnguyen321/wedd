import React from 'react';
import { useWeddingData } from '../contexts/WeddingContext';

export const Hero: React.FC = () => {
  const { data } = useWeddingData();
  
  if (!data) return null;

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={data.hero.image}
          alt="Wedding Background" 
          className="w-full h-full object-cover object-center transform scale-105"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <div data-aos="fade-down" data-aos-duration="1500">
          <p className="text-lg md:text-xl tracking-[0.2em] uppercase font-light mb-4">{data.hero.greeting}</p>
        </div>
        
        <div data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="300">
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl mb-6 leading-tight">
            {data.names.groomShort} <span className="text-wedding-gold">&</span> {data.names.brideShort}
          </h1>
        </div>

        <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
          <div className="w-16 h-1 bg-wedding-gold mx-auto mb-6"></div>
          <p className="text-xl md:text-3xl font-serif italic mb-2">{data.hero.date}</p>
          <p className="text-sm md:text-base font-light tracking-wider">{data.hero.subTitle}</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};