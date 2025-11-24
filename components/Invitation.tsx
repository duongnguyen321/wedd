import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { useWeddingData } from '../contexts/WeddingContext';

export const Invitation: React.FC = () => {
  const { data } = useWeddingData();
  
  if (!data) return null;

  // Extract name from query params
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('name') || data.invitation.guestPlaceholder;

  return (
    <section id="event" className="py-20 bg-wedding-cream relative">
      <div className="container mx-auto px-4">
        <div 
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-stone-100"
          data-aos="fade-up"
        >
          <div className="grid md:grid-cols-2">
            {/* Image Side */}
            <div className="h-64 md:h-auto bg-gray-200 relative">
              <img 
                src={data.invitation.image}
                alt="Wedding Decor" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-wedding-gold/10"></div>
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 flex flex-col justify-center text-center">
              <h2 className="font-serif text-3xl text-wedding-gold mb-6">{data.invitation.title}</h2>
              
              <p className="text-stone-500 mb-4 italic">
                {data.invitation.subTitle}
              </p>
              
              <div className="mb-8 p-4 border-y-2 border-wedding-gold/30">
                <h3 className="text-2xl font-bold text-stone-800 capitalize font-script">
                  {guestName}
                </h3>
              </div>

              <p className="text-stone-600 mb-8 leading-relaxed">
                {data.invitation.message}
              </p>

              <div className="space-y-4 text-left md:ml-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-wedding-cream p-2 rounded-full text-wedding-gold">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800">{data.invitation.timeLabel}</h4>
                    <p className="text-stone-600 text-sm">{data.invitation.dateDisplay}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-wedding-cream p-2 rounded-full text-wedding-gold">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800">{data.invitation.timeSubLabel}</h4>
                    <p className="text-stone-600 text-sm">{data.invitation.timeDescription}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-wedding-cream p-2 rounded-full text-wedding-gold">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800">{data.invitation.locationTitle}</h4>
                    <p className="text-stone-600 text-sm">{data.invitation.locationAddress}</p>
                    <a href={data.invitation.mapLink} className="text-xs text-wedding-gold underline hover:text-stone-800 mt-1 block">
                      {data.invitation.mapLabel}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};