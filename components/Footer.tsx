import React from 'react';
import { useWeddingData } from '../contexts/WeddingContext';

export const Footer: React.FC = () => {
  const { data } = useWeddingData();
  
  if (!data) return null;

  return (
    <footer className="bg-stone-900 text-white py-12 text-center">
      <div className="container mx-auto px-4">
        <h2 className="font-script text-4xl md:text-5xl text-wedding-gold mb-6">
          {data.names.groomShort} & {data.names.brideShort}
        </h2>
        <p className="text-stone-400 text-sm tracking-widest uppercase mb-8">{data.footer.thankYou}</p>
        <div className="text-xs text-stone-600">
          <p>{data.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};