import data from '../data.json';
import { WeddingData, RSVPData, RSVPStats } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'wedding_rsvp_data';

// Extensive seed data to simulate a populated database
const SEED_DATA: RSVPData[] = [
  { name: "Minh & Hằng", wish: "Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử nhé! ❤️", attendance: "yes", timestamp: 1 },
  { name: "Team Dev", wish: "Happy Wedding! Bug-free marriage nhé bro 🐞🚫", attendance: "yes", timestamp: 2 },
  { name: "Cô Ba", wish: "Mừng hạnh phúc hai cháu. Chúc hai cháu đầu bạc răng long.", attendance: "yes", timestamp: 3 },
  { name: "Thảo Vy", wish: "Xinh dâu đẹp rể quá chừng! Chúc mừng hạnh phúc nha bạn tôi.", attendance: "yes", timestamp: 4 },
  { name: "Anh Tuấn", wish: "Chúc mừng ông bạn đã có người rước nhé haha 🤣", attendance: "yes", timestamp: 5 },
  { name: "Lan Anh", wish: "Chúc Xương mãi xinh đẹp và hạnh phúc bên anh xã nhé 💕", attendance: "yes", timestamp: 6 },
  { name: "Hội Bạn Cũ C3", wish: "Mãi bên nhau bạn nhé! Hẹn 28/12 quẩy tới bến.", attendance: "yes", timestamp: 7 },
  { name: "Chú Bảy", wish: "Chúc hai cháu hạnh phúc viên mãn.", attendance: "maybe", timestamp: 8 },
  { name: "Gia đình bác Hùng", wish: "Chúc mừng gia đình có thêm dâu hiền rể thảo.", attendance: "yes", timestamp: 9 },
  { name: "Bé Mập", wish: "Em chúc anh chị hạnh phúc ạ! Nhớ chừa phần gà rán cho em nha 🍗", attendance: "yes", timestamp: 10 },
  { name: "Trần Văn Nam", wish: "Chúc hai bạn những ngày tháng tới đây ngập tràn niềm vui và tiếng cười.", attendance: "yes", timestamp: 11 },
  { name: "Ngọc Huyền", wish: "So happy for you two! Love you guys ❤️", attendance: "yes", timestamp: 12 },
  { name: "Đức Thịnh", wish: "Chúc mừng hạnh phúc! Xin lỗi vì không về kịp nhưng quà sẽ bank nha 💸", attendance: "no", timestamp: 13 },
  { name: "Thu Hà", wish: "Cặp đôi đẹp nhất năm đây rồi! Chúc mừng chúc mừng 🎉", attendance: "yes", timestamp: 14 },
  { name: "Nhóm Đồng Nghiệp", wish: "Sếp Hiếu cưới vợ rồi, anh em chuẩn bị tinh thần quẩy nào!", attendance: "yes", timestamp: 15 }
];

export const weddingService = {
  // Service to get website configuration data
  getWeddingData: async (): Promise<WeddingData> => {
    await delay(800); // Simulate network request
    return data as WeddingData;
  },

  // Service to post RSVP and Wishes
  submitRSVP: async (entry: Omit<RSVPData, 'timestamp'>): Promise<boolean> => {
    await delay(1000); // Simulate network processing

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
    // Get local data
    const stored = localStorage.getItem(STORAGE_KEY);
    const localData = stored ? JSON.parse(stored) as RSVPData[] : [];
    
    // Merge with seed data for stats
    const allData = [...SEED_DATA, ...localData];
    
    return allData.reduce((acc, curr) => {
      acc.total++;
      if (curr.attendance === 'yes') acc.yes++;
      else if (curr.attendance === 'maybe') acc.maybe++;
      else if (curr.attendance === 'no') acc.no++;
      return acc;
    }, { total: 0, yes: 0, maybe: 0, no: 0 } as RSVPStats);
  },

  // New service to get list of wishes for Toasts
  getWishes: async (): Promise<RSVPData[]> => {
    // Get local data
    const stored = localStorage.getItem(STORAGE_KEY);
    const localData = stored ? JSON.parse(stored) as RSVPData[] : [];
    
    // Combine seed data and local data to create a "full" list
    // In a real app, this would fetch from a backend
    const allWishes = [...SEED_DATA, ...localData];
    
    // Filter out empty wishes and sort by newest (simulated by ID or simply array order)
    // We shuffle them slightly to make it interesting
    return allWishes
      .filter(w => w.wish && w.wish.trim().length > 0)
      .sort(() => Math.random() - 0.5);
  }
};