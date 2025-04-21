'use client';

import { useEffect, useRef, useState } from 'react';

const EASTER_EGGS = [
  'COMING SOON',
  'WAIT FOR IT',
  'KENLESS IS BACK',
  'NEW ERA',
  'STAY TUNED',
  '2025',
];

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const fontSize = 12;
    const columns = canvas.width / fontSize;
    
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const characters = '01'.split('');
    let lastEasterEggTime = Date.now();

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.1)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = 'rgba(0, 255, 0, 0.7)';
      context.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Efecto de degradado en la opacidad según la posición
        const opacity = 1 - (y / canvas.height);
        context.fillStyle = `rgba(0, 255, 0, ${Math.max(0.4, opacity * 0.9)})`;
        context.fillText(text, x, y);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      // Easter Eggs
      const now = Date.now();
      if (now - lastEasterEggTime > 5000 && Math.random() > 0.995) {
        const easterEgg = EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)];
        context.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
        context.font = `bold ${Math.random() * 20 + 15}px monospace`;
        
        const x = Math.random() * (canvas.width - 200);
        const y = Math.random() * (canvas.height - 50);
        context.fillText(easterEgg, x, y);
        
        lastEasterEggTime = now;
      }

      requestAnimationFrame(draw);
    };

    const animation = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animation);
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-90"
    />
  );
}; 