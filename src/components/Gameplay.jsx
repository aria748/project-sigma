import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, Float } from '@react-three/drei';
import { ArrowLeft, Unlock, AlertTriangle, Lightbulb, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';


import { LEVEL_DATA } from '../config/levelData';
import Level01 from '../levels/level01';
import Level02 from '../levels/level02';
import Level03 from '../levels/level03';
import Level04 from '../levels/level04';
import Level05 from '../levels/level05';
import Level06 from '../levels/level06';
import Level07 from '../levels/level07';
import Level08 from '../levels/level08';
import Level09 from '../levels/level09';
import Level10 from '../levels/level10';

function InteractiveAnomaly({ frequency, amplitude, isStabilized }) {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += isStabilized ? delta * 0.5 : delta * (frequency / 20);
      meshRef.current.rotation.z += isStabilized ? delta * 0.2 : delta * (amplitude / 20);
    }
  });

  const chaosLevel = isStabilized ? 0 : Math.min((Math.abs(frequency - 88) + Math.abs(amplitude - 45)) / 100, 1);

  return (
    <Float speed={isStabilized ? 2 : 5} floatIntensity={isStabilized ? 1 : 3}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2} color={isStabilized ? "#10B981" : "#FFD226"} />
      <Sphere ref={meshRef} args={[2, 64, 64]} scale={1}>
        <MeshDistortMaterial color={isStabilized ? "#10B981" : "#00243F"} distort={chaosLevel} speed={isStabilized ? 1 : amplitude / 10} roughness={0.1} metalness={0.9} wireframe={!isStabilized && chaosLevel > 0.5} />
      </Sphere>
    </Float>
  );
}

const LEVEL_REGISTRY = { 1: Level01, 2: Level02, 3: Level03, 4: Level04, 5: Level05, 6: Level06, 7: Level07, 8: Level08, 9: Level09, 10: Level10 };

export default function Gameplay({ currentLevel = 1, onBack, onNextLevel, onWrongAnswer, onUseHint }) {
  const [frequency, setFrequency] = useState(20);
  const [amplitude, setAmplitude] = useState(80);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const levelInfo = LEVEL_DATA[currentLevel];
  const CurrentLevelComponent = LEVEL_REGISTRY[currentLevel];
  const isStabilized = frequency === 88 && amplitude === 45;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen w-full flex flex-col p-6 pointer-events-none relative">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 7] }}><Stars radius={100} depth={50} count={2000} factor={4} fade /><InteractiveAnomaly frequency={frequency} amplitude={amplitude} isStabilized={isStabilized} /></Canvas>
      </div>

      <header className="flex justify-between items-center z-10 pointer-events-auto mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-emerald-primary/60 hover:text-emerald-primary font-mono text-sm uppercase transition-colors"><ArrowLeft size={16} /> Abort Mission</button>
        <div className="px-6 py-2 border border-emerald-primary/30 bg-charcoal/50 backdrop-blur rounded-full shadow-hud"><h1 className="font-mono text-emerald-primary font-bold tracking-widest text-sm">STAGE {currentLevel}: {levelInfo?.title}</h1></div>
        
        <div className="flex items-center gap-6">
          {/* TOMBOL HINT */}
          <button 
            onClick={() => {
              setShowHint(true);
              if (onUseHint) onUseHint(); // Panggil hukuman Sanity!
            }}
            className="flex items-center gap-2 text-gold-accent hover:text-white font-mono text-sm uppercase transition-colors px-3 py-1 border border-gold-accent/30 hover:border-gold-accent rounded bg-gold-accent/10"
          >
            <Lightbulb size={16} /> Tactical Hint
          </button>
          <div className="flex items-center gap-2 text-emerald-primary/50 font-mono text-sm"><AlertTriangle size={16} className={isStabilized ? "" : "animate-pulse text-gold-accent"} /> {isStabilized ? "STABLE" : "UNSTABLE"}</div>
        </div>
      </header>

      <div className="flex-1 flex z-10">
        <CurrentLevelComponent isStabilized={isStabilized} onSolve={() => setIsDecrypted(true)} frequency={frequency} amplitude={amplitude} setFrequency={setFrequency} setAmplitude={setAmplitude} onWrongAnswer={onWrongAnswer} />
      </div>

      {/* OVERLAY HINT */}
      <AnimatePresence>
        {showHint && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[60] bg-charcoal/80 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
            <div className="bg-midnight/90 border border-gold-accent p-8 rounded-2xl max-w-lg w-full shadow-[0_0_30px_rgba(255,210,38,0.2)]">
              <div className="flex justify-between items-center mb-6 border-b border-gold-accent/30 pb-4">
                <h3 className="text-gold-accent font-bold font-mono flex items-center gap-2"><Lightbulb size={20} /> TACTICAL INSIGHT</h3>
                <button onClick={() => setShowHint(false)} className="text-gold-accent hover:text-white"><X size={20}/></button>
              </div>
              <p className="text-emerald-primary font-mono text-sm leading-relaxed">{levelInfo?.hint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isDecrypted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-emerald-primary/10 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
          <div className="bg-charcoal border-2 border-gold-accent p-12 rounded-2xl text-center shadow-[0_0_50px_rgba(255,210,38,0.3)]">
            <Unlock size={48} className="text-gold-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gold-accent tracking-widest mb-2">ACCESS GRANTED</h2>
            <p className="text-emerald-primary font-mono text-sm uppercase">Message Decoded: "{levelInfo?.targetCode}"</p>
            <button onClick={onNextLevel} className="mt-8 px-8 py-3 bg-gold-accent text-charcoal font-bold tracking-widest uppercase hover:bg-white transition-colors rounded">Proceed to Next Stage</button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}