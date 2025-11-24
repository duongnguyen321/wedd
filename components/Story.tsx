import React from 'react';
import { useWeddingData } from '../contexts/WeddingContext';

export const Story: React.FC = () => {
  const { data } = useWeddingData();
  
  if (!data) return null;
  
  const events = data.story.items;

  return (
    <section id="story" className="py-20 bg-wedding-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-wedding-gold uppercase tracking-widest text-sm font-semibold">{data.story.sectionTitle}</span>
          <h2 className="font-script text-4xl md:text-5xl text-stone-800 mt-2">{data.story.mainTitle}</h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-wedding-gold/30"></div>

          <div className="space-y-12 md:space-y-0">
            {events.map((event, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center justify-between relative group">
                
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-wedding-gold border-4 border-white shadow-md group-hover:scale-125 transition-transform"></div>
                </div>

                {/* Left Side */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-1 text-center md:text-right' : 'md:order-2 md:pl-8 text-center md:text-left'} mb-8 md:mb-0`} data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
                  {index % 2 === 0 ? (
                     <div className="space-y-4">
                        <span className="inline-block px-4 py-1 bg-white rounded-full text-wedding-gold font-bold shadow-sm">{event.year}</span>
                        <h3 className="text-2xl font-serif text-stone-800">{event.title}</h3>
                        <p className="text-stone-600">{event.description}</p>
                     </div>
                  ) : (
                    <div className="overflow-hidden rounded-lg shadow-lg border-4 border-white transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                      <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
                    </div>
                  )}
                </div>

                {/* Right Side */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-2 md:pl-8' : 'md:order-1 text-center md:text-right'} mb-8 md:mb-0`} data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}>
                   {index % 2 !== 0 ? (
                     <div className="space-y-4">
                        <span className="inline-block px-4 py-1 bg-white rounded-full text-wedding-gold font-bold shadow-sm">{event.year}</span>
                        <h3 className="text-2xl font-serif text-stone-800">{event.title}</h3>
                        <p className="text-stone-600">{event.description}</p>
                     </div>
                  ) : (
                    <div className="overflow-hidden rounded-lg shadow-lg border-4 border-white transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                      <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};