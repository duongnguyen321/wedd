import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  life: number;
  type: 'heart' | 'sparkle';
}

export const MouseEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const colors = ['#D4AF37', '#E6B8B8', '#F9F7F2', '#C5A880'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    handleResize();
    window.addEventListener('resize', handleResize);

    const createParticle = (x: number, y: number) => {
      const type = Math.random() > 0.7 ? 'sparkle' : 'heart';
      particles.current.push({
        x,
        y,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        life: 1.0,
        type
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Create fewer particles for better performance
      if (Math.random() > 0.3) {
        createParticle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      // Draw heart shape
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(
        x, y, 
        x - size / 2, y, 
        x - size / 2, y + topCurveHeight
      );
      // bottom left curve
      ctx.bezierCurveTo(
        x - size / 2, y + (size + topCurveHeight) / 2, 
        x, y + (size + topCurveHeight) / 2, 
        x, y + size
      );
      // bottom right curve
      ctx.bezierCurveTo(
        x, y + (size + topCurveHeight) / 2, 
        x + size / 2, y + (size + topCurveHeight) / 2, 
        x + size / 2, y + topCurveHeight
      );
      // top right curve
      ctx.bezierCurveTo(
        x + size / 2, y, 
        x, y, 
        x, y + topCurveHeight
      );
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      // Draw 4-point star
      for(let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * 90) * Math.PI / 180) * size + x, Math.sin((i * 90) * Math.PI / 180) * size + y);
        ctx.lineTo(Math.cos(((i * 90) + 45) * Math.PI / 180) * (size/3) + x, Math.sin(((i * 90) + 45) * Math.PI / 180) * (size/3) + y);
      }
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.life -= 0.015; // Fade out speed
        p.x += p.speedX;
        p.y += p.speedY + 0.5; // Slight gravity

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.life);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.life);
        }
      }

      // Remove dead particles
      particles.current = particles.current.filter(p => p.life > 0);

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[60]"
    />
  );
};