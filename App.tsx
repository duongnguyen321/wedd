import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  VolumeX,
  Menu,
  X,
  Loader2
} from 'lucide-react';
import { Hero } from './components/Hero';
import { Invitation } from './components/Invitation';
import { Couple } from './components/Couple';
import { Countdown } from './components/Countdown';
import { Gallery } from './components/Gallery';
import { Story } from './components/Story';
import { RSVP } from './components/RSVP';
import { Footer } from './components/Footer';
import { ToastSystem } from './components/ToastSystem';
import { MouseEffect } from './components/MouseEffect';
import { WeddingProvider, useWeddingData } from './contexts/WeddingContext';

const MainContent: React.FC = () => {
  const { data, isLoading } = useWeddingData();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isLoading && data) {
      // Initialize AOS after data is loaded
      AOS.init({
        duration: 1200,
        once: false,
        mirror: false,
        offset: 100,
        easing: 'ease-out-cubic',
      });

      // Create audio element
      const audio = new Audio(data.audio);
      audio.loop = true;
      audioRef.current = audio;

      // Trigger initial fireworks
      const end = Date.now() + 1000;
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#D4AF37', '#E6B8B8', '#F9F7F2']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#D4AF37', '#E6B8B8', '#F9F7F2']
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      }());
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isLoading, data]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed interaction required", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  if (isLoading || !data) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-wedding-cream text-wedding-gold">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-serif italic text-lg animate-pulse">Loading Love Story...</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden font-sans text-stone-700">
      {/* Visual Effects */}
      <MouseEffect />
      <ToastSystem />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-script text-3xl text-wedding-gold font-bold">
                {data.names.groomShort} & {data.names.brideShort}
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {data.navigation.map((item) => (
                <a 
                  key={item.label}
                  href={item.href} 
                  className="text-stone-600 hover:text-wedding-gold transition-colors text-sm font-medium uppercase tracking-wider"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-stone-600 hover:text-wedding-gold focus:outline-none"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
              {data.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-3 py-2 text-stone-600 hover:text-wedding-gold text-base font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Floating Music Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-white/90 shadow-lg text-wedding-gold hover:bg-wedding-gold hover:text-white transition-all duration-300 border border-wedding-gold/20"
        title="Bật/Tắt Nhạc"
      >
        {isMusicPlaying ? <Volume2 className="animate-pulse" size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Main Content */}
      <main>
        <Hero />
        <Invitation />
        <Couple />
        <Countdown targetDate={data.date} />
        <Story />
        <Gallery />
        <RSVP />
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WeddingProvider>
      <MainContent />
    </WeddingProvider>
  );
};

export default App;