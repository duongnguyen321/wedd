import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { weddingService } from '../services/api';
import { RSVPData } from '../types';

export const ToastSystem: React.FC = () => {
  const [wishes, setWishes] = useState<RSVPData[]>([]);
  const [currentToast, setCurrentToast] = useState<RSVPData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Initial fetch of wishes
  useEffect(() => {
    const fetchWishes = async () => {
      const data = await weddingService.getWishes();
      setWishes(data);
    };
    fetchWishes();
  }, []);

  // Timer loop for showing toasts
  useEffect(() => {
    if (wishes.length === 0) return;

    const showRandomToast = () => {
      // Pick a random wish
      const randomIndex = Math.floor(Math.random() * wishes.length);
      const wish = wishes[randomIndex];
      
      setCurrentToast(wish);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      // Schedule next toast (random between 1s and 3s + display time)
      const nextDelay = Math.random() * 2000 + 1000 + 4500; 
      timeoutId = setTimeout(showRandomToast, nextDelay);
    };

    let timeoutId = setTimeout(showRandomToast, 2000); // Start after 2s

    return () => clearTimeout(timeoutId);
  }, [wishes]);

  if (!currentToast) return null;

  return (
    <div 
      className={`fixed top-24 right-4 md:right-8 z-40 max-w-sm transition-all duration-700 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-sm border-l-4 border-wedding-gold shadow-lg rounded-lg p-4 flex items-start space-x-3">
        <div className="bg-pink-50 p-2 rounded-full flex-shrink-0 mt-1">
          <Heart size={16} className="text-pink-500 fill-pink-500 animate-pulse" />
        </div>
        <div>
          <h4 className="font-bold text-stone-800 text-sm">{currentToast.name}</h4>
          <p className="text-stone-600 text-sm mt-1 italic line-clamp-3">"{currentToast.wish}"</p>
        </div>
      </div>
    </div>
  );
};