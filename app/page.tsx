'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { GlitchText } from './components/GlitchText';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SecretGame } from './components/SecretGame';
import { bebasNeue } from './fonts';

export default function Home() {
  const [showGame, setShowGame] = useState(false);

  return (
    <main className={`relative flex min-h-[100dvh] flex-col items-center bg-black/80 text-white p-4 overflow-hidden ${bebasNeue.className}`}>
      <AnimatedBackground />
      
      {/* Contenedor central */}
      <div className="flex-1 flex items-center justify-center w-full translate-y-[3vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-8 md:gap-4 relative z-10 w-full max-w-[90vw] md:max-w-none"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-[120px] sm:w-[400px] sm:h-[150px] md:w-[500px] md:h-[200px] relative"
          >
            <Image
              src="/kenlesslogo.png"
              alt="Kenless Logo"
              fill
              className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              priority
            />
          </motion.div>
          
          <div className="flex flex-col items-center">
            <motion.div
              onClick={() => setShowGame(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer touch-manipulation select-none"
            >
              <GlitchText 
                text="??/??/25"
                className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[.25em] drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                y: [0, 5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mt-6 text-3xl sm:text-4xl md:text-5xl text-white/30"
            >
              ↑
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 text-center mb-6 sm:mb-8"
      >
        <motion.p
          animate={{ 
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-sm sm:text-base md:text-lg text-white/50 mb-2 tracking-widest"
        >
          TIME REVEALS ALL SECRETS
        </motion.p>
        <p className="text-xs sm:text-sm text-white/30 tracking-wider">
          MEET YOUR GOALS
        </p>
      </motion.footer>

      <AnimatePresence>
        {showGame && (
          <SecretGame 
            onClose={() => setShowGame(false)} 
          />
        )}
      </AnimatePresence>

      {/* Overlay para prevenir el zoom en móviles */}
      <meta 
        name="viewport" 
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </main>
  );
}
