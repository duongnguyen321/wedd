import data from '../data.json';
import { WeddingData, RSVPData, RSVPStats } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'wedding_rsvp_data';

// Seed some initial data so the toast system isn't empty on first load
const SEED_DATA: RSVPData[] = [
  { name: "Bạn bè chú rể", wish: "Chúc hai bạn trăm năm hạnh phúc!", attendance: "yes", timestamp: 1 },
  { name: "Người thân", wish: "Sớm sinh quý tử nhé!", attendance: "yes", timestamp: 2 },
  { name: "Đồng nghiệp", wish: "Mãi mãi bên nhau nhé bro!", attendance: "yes", timestamp: 3 }
];

export const weddingService = {
  // Service to get website configuration data
  getWeddingData: async (): Promise<WeddingData> => {
    await delay(800); // Simulate network request
    return data as WeddingData;
  },

  // Service to post RSVP and Wishes
  submitRSVP: async (entry: Omit<RSVPData, 'timestamp'>): Promise<boolean> => {
    await delay(1500); // Simulate network processing

    try {
      const currentData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const newEntry: RSVPData = {
        ...entry,
        timestamp: Date.now(),
      };
      
      const updatedData = [...currentData, newEntry];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      
      return true;
    } catch (error) {
      console.error("Failed to save RSVP", error);
      return false;
    }
  },

  // Service to get statistics
  getRSVPStats: async (): Promise<RSVPStats> => {
    await delay(500);
    const stored = localStorage.getItem(STORAGE_KEY);
    const currentData = stored ? JSON.parse(stored) as RSVPData[] : SEED_DATA;
    
    return currentData.reduce((acc, curr) => {
      acc.total++;
      if (curr.attendance === 'yes') acc.yes++;
      else if (curr.attendance === 'maybe') acc.maybe++;
      else if (curr.attendance === 'no') acc.no++;
      return acc;
    }, { total: 0, yes: 0, maybe: 0, no: 0 } as RSVPStats);
  },

  // New service to get list of wishes for Toasts
  getWishes: async (): Promise<RSVPData[]> => {
    // Return immediately to not block UI
    const stored = localStorage.getItem(STORAGE_KEY);
    let wishes = stored ? JSON.parse(stored) as RSVPData[] : [];
    
    // Merge with seed data if empty just for demo purposes
    if (wishes.length === 0) {
      wishes = SEED_DATA;
    }
    
    // Filter out empty wishes
    return wishes.filter(w => w.wish && w.wish.trim().length > 0);
  }
};