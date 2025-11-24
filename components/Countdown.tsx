import React, { useState, useEffect } from 'react';
import { useWeddingData } from '../contexts/WeddingContext';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const { data } = useWeddingData();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!data) return null;

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-6">
      <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-wedding-gold/20 mb-2 transform hover:scale-105 transition-transform">
        <span className="text-2xl md:text-4xl font-bold text-stone-700">{value < 10 ? `0${value}` : value}</span>
      </div>
      <span className="text-xs md:text-sm font-medium uppercase tracking-wider text-white">{label}</span>
    </div>
  );

  return (
    <section className="py-20 relative bg-fixed bg-center bg-cover" style={{ backgroundImage: `url("${data.countdown.bgImage}")` }}>
      <div className="absolute inset-0 bg-stone-900/60"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-white font-script text-4xl md:text-6xl mb-12" data-aos="fade-down">
          {data.countdown.title}
        </h2>
        
        <div className="flex flex-wrap justify-center items-center" data-aos="zoom-in">
          <TimeUnit value={timeLeft.days} label={data.countdown.days} />
          <TimeUnit value={timeLeft.hours} label={data.countdown.hours} />
          <TimeUnit value={timeLeft.minutes} label={data.countdown.minutes} />
          <TimeUnit value={timeLeft.seconds} label={data.countdown.seconds} />
        </div>
        
        <div className="mt-12" data-aos="fade-up">
          <p className="text-white/90 text-lg md:text-xl font-light italic max-w-2xl mx-auto">
            "{data.countdown.quote}"
          </p>
        </div>
      </div>
    </section>
  );
};