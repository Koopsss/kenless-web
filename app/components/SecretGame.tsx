'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

interface SecretGameProps {
  onClose: () => void;
}

export const SecretGame = ({ onClose }: SecretGameProps) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const correctSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  const handleInput = useCallback((input: string) => {
    if (isSuccess) return;

    setSequence(prev => {
      const newSequence = [...prev, input];
      
      // Verificar si la secuencia hasta ahora es correcta
      for (let i = 0; i < newSequence.length; i++) {
        if (newSequence[i] !== correctSequence[i]) {
          return []; // Reiniciar si hay error
        }
      }

      // Si completamos la secuencia correctamente
      if (newSequence.length === correctSequence.length) {
        setIsSuccess(true);
        return newSequence;
      }

      return newSequence;
    });
  }, [isSuccess, correctSequence]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isSuccess) return;
      handleInput(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSuccess, handleInput]);

  const DirectionButton = ({ direction, icon }: { direction: string; icon: string }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => handleInput(direction)}
      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-green-500/20 rounded-full flex items-center justify-center text-xl sm:text-2xl border border-green-500/30 hover:bg-green-500/30 transition-colors active:bg-green-500/40 touch-manipulation"
    >
      {icon}
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-black p-4 sm:p-6 md:p-8 rounded-lg border border-green-500/30 w-full max-w-[90vw] sm:max-w-2xl mx-auto text-center"
        onClick={e => e.stopPropagation()}
      >
        {!isSuccess && (
          <>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-green-500">Descubre el secreto</h2>
              <p className="text-sm sm:text-base text-green-400/80 mb-3 sm:mb-4">Usa las flechas del teclado o los botones en pantalla...</p>
              <p className="text-xs sm:text-sm text-green-500/60">Pista: Es un código clásico de videojuegos</p>
            </div>

            <div className="flex justify-center gap-2 mb-6 sm:mb-8">
              {correctSequence.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                    sequence[index] ? 'bg-green-500' : 'bg-green-900'
                  }`}
                  initial={false}
                  animate={{
                    scale: sequence[index] ? [1.4, 1] : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-[250px] sm:max-w-[300px] mx-auto place-items-center">
              <div className="col-start-2 w-full flex justify-center">
                <DirectionButton direction="ArrowUp" icon="↑" />
              </div>
              <div className="col-start-1 w-full flex justify-center">
                <DirectionButton direction="ArrowLeft" icon="←" />
              </div>
              <div className="col-start-2 w-full flex justify-center">
                <DirectionButton direction="ArrowDown" icon="↓" />
              </div>
              <div className="col-start-3 w-full flex justify-center">
                <DirectionButton direction="ArrowRight" icon="→" />
              </div>
            </div>
          </>
        )}

        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-base sm:text-lg md:text-xl text-green-500/70 tracking-[0.25em] font-light mb-2"
            >
              EVOLUTION IS INEVITABLE
            </motion.p>
            <div className="relative w-full aspect-video">
              <Image
                src="/logokenlessnew.png"
                alt="Kenless Secret"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 800px"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-xs sm:text-sm text-green-500/40 tracking-[0.15em]"
            >
              THE FUTURE TAKES SHAPE
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}; 