'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  const [glitchText, setGlitchText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      
      const glitchDuration = 500;
      let glitchCount = 0;
      const maxGlitches = 8;
      
      const glitchEffect = setInterval(() => {
        if (glitchCount < maxGlitches) {
          const randomChars = '!@#$%^&*<>[]1234567890'.split('');
          const newText = text
            .split('')
            .map(char => Math.random() > 0.3 ? randomChars[Math.floor(Math.random() * randomChars.length)] : char)
            .join('');
          setGlitchText(newText);
          glitchCount++;
        } else {
          clearInterval(glitchEffect);
          setGlitchText(text);
          setIsGlitching(false);
        }
      }, 50);

      setTimeout(() => {
        clearInterval(glitchEffect);
        setGlitchText(text);
        setIsGlitching(false);
      }, glitchDuration);
    }, 1000);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`
        relative
        ${isGlitching ? 'before:content-[""] before:absolute before:inset-0 before:bg-white before:mix-blend-difference before:animate-glitch' : ''}
      `}>
        <div className={`
          relative
          ${isGlitching ? 'after:content-[""] after:absolute after:inset-0 after:bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.1)_3px,rgba(255,255,255,0.1)_3px)] after:pointer-events-none after:animate-scan' : ''}
        `}>
          <motion.span
            className={`
              block
              ${isGlitching ? 'animate-shake mix-blend-difference' : ''}
            `}
            animate={isGlitching ? {
              x: [-3, 3, -3, 0],
              y: [2, -2, 2, 0],
            } : {}}
            transition={{ duration: 0.05, repeat: isGlitching ? Infinity : 0 }}
          >
            {glitchText}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}; 