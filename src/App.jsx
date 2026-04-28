// File: src/App.jsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AccessPortal from './components/AccessPortal';
import MainMenu from './components/MainMenu';
import Gameplay from './components/Gameplay';
import { LEVEL_DATA } from './config/levelData';

export default function App() {
  const [playerName, setPlayerName] = useState('');
  const [gameState, setGameState] = useState('portal'); 
  
  // 1. Inisialisasi Level dari Local Storage
  const [currentLevel, setCurrentLevel] = useState(() => {
    const savedLevel = localStorage.getItem('sigma_level');
    return savedLevel ? parseInt(savedLevel) : 1; // Jika belum ada, mulai dari level 1
  });
  
  // 2. Inisialisasi Sanity dari Local Storage
  const [sanity, setSanity] = useState(() => {
    const savedSanity = localStorage.getItem('sigma_sanity');
    return savedSanity ? parseInt(savedSanity) : 0; // Jika belum ada, mulai dari 0
  }); 

  const [isLocked, setIsLocked] = useState(false);

  // 3. Simpan otomatis ke Local Storage saat Level berubah
  useEffect(() => {
    localStorage.setItem('sigma_level', currentLevel);
  }, [currentLevel]);

  // 4. Simpan otomatis ke Local Storage saat Sanity berubah
  useEffect(() => {
    localStorage.setItem('sigma_sanity', sanity);
  }, [sanity]);

  // Efek Pemulihan Otomatis Sanity
  useEffect(() => {
    if (sanity >= 100) {
      setIsLocked(true);
      const timer = setInterval(() => {
        setSanity(prev => {
          if (prev <= 0) {
            setIsLocked(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 10; 
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sanity]);

  return (
    <div className="min-h-screen bg-charcoal text-emerald-primary font-sans overflow-hidden scanlines">
      <AnimatePresence mode="wait">
        {gameState === 'portal' && (
          <AccessPortal key="portal" onGrant={(name) => { setPlayerName(name); setGameState('menu'); }} />
        )}
        
        {gameState === 'menu' && (
          <MainMenu 
            key="menu"
            playerName={playerName} 
            currentLevel={currentLevel}
            sanity={sanity}
            isLocked={isLocked}
            onPlay={() => !isLocked && setGameState('playing')} 
          />
        )}

        {gameState === 'playing' && (
          <Gameplay 
            key="gameplay"
            currentLevel={currentLevel}
            onBack={() => setGameState('menu')}
            onNextLevel={() => {
              setCurrentLevel(prev => prev + 1);
              setGameState('menu');
            }}
            onWrongAnswer={() => setSanity(prev => Math.min(prev + 20, 100))}
            onUseHint={() => setSanity(prev => Math.min(prev + 15, 100))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}