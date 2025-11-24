import React, { useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
  id: number;
}

export const MouseEffect: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      setPoints(prev => [...prev.slice(-15), newPoint]); // Keep last 15 points
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Cleanup old points to prevent memory leak although slice handles most
    const interval = setInterval(() => {
      setPoints(prev => prev.filter(p => Date.now() - p.id < 1000));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {points.map((point, index) => {
        const age = Date.now() - point.id;
        const opacity = 1 - age / 800; // Fade out over 800ms
        
        if (opacity <= 0) return null;

        return (
          <div
            key={point.id}
            className="absolute text-wedding-gold/60"
            style={{
              left: point.x,
              top: point.y,
              opacity: opacity,
              transform: `translate(-50%, -50%) scale(${opacity})`,
              fontSize: `${Math.random() * 10 + 10}px`
            }}
          >
            {index % 2 === 0 ? '♥' : '✦'}
          </div>
        );
      })}
    </div>
  );
};