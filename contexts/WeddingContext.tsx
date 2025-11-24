import React, { createContext, useContext, useEffect, useState } from 'react';
import { WeddingData } from '../types';
import { weddingService } from '../services/api';

interface WeddingContextType {
  data: WeddingData | null;
  isLoading: boolean;
  error: string | null;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<WeddingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initData = async () => {
      try {
        const result = await weddingService.getWeddingData();
        setData(result);
        
        // Update document title dynamically
        document.title = result.meta.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', result.meta.description);

      } catch (err) {
        setError("Failed to load wedding data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, []);

  return (
    <WeddingContext.Provider value={{ data, isLoading, error }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWeddingData = () => {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error('useWeddingData must be used within a WeddingProvider');
  }
  return context;
};