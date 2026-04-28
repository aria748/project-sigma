// File: src/components/MainMenu.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, BookOpen, Play, ShieldAlert, User, Database, Maximize2, X, Radio } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import { LEVEL_DATA } from '../config/levelData';

function SignalAnomaly({ sanity }) {
  const coreRef = useRef();
  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.z += delta * 0.1;
    }
  });

  const isCritical = sanity >= 80;
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} color="#10B981" intensity={2} />
      <Sphere ref={coreRef} visible args={[1.5, 64, 64]} scale={1.2}>
        <MeshDistortMaterial color={isCritical ? "#EF4444" : "#FFD226"} distort={isCritical ? 0.6 : 0.3} speed={isCritical ? 5 : 2} roughness={0.2} metalness={0.8}/>
      </Sphere>
      <mesh scale={2.2}><icosahedronGeometry args={[1, 1]} /><meshBasicMaterial color="#10B981" wireframe transparent opacity={0.15} /></mesh>
    </Float>
  );
}

export default function MainMenu({ playerName, currentLevel, onPlay, sanity, isLocked }) {
  const [showLore, setShowLore] = useState(false);
  const [showLogsOverlay, setShowLogsOverlay] = useState(false);

  // LOGIKA ENDING: Cek apakah level pemain sudah melebihi batas level yang ada
  const totalLevels = Object.keys(LEVEL_DATA).length;
  const isGameFinished = currentLevel > totalLevels;
  
  const levelInfo = isGameFinished ? null : (LEVEL_DATA[currentLevel] || LEVEL_DATA[1]);

  return (
    <div className="relative h-screen w-full bg-charcoal overflow-hidden scanlines">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
          <group position={[3, 0, 0]}><SignalAnomaly sanity={sanity} /></group>
        </Canvas>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 p-8 h-full flex flex-col justify-between pointer-events-none">
        
        {/* HEADER: PLAYER & SANITY */}
        <div className="flex justify-between items-start pointer-events-auto">
          <div className="space-y-1 bg-charcoal/40 backdrop-blur-md p-4 rounded-xl border border-emerald-primary/20 shadow-hud">
            <div className="flex items-center gap-2 text-gold-accent"><User size={18} /><span className="font-mono text-sm tracking-tighter uppercase">Agent Authenticated</span></div>
            <h2 className="text-2xl font-bold text-emerald-primary">{playerName}</h2>
          </div>

          <div className="w-72 bg-charcoal/40 backdrop-blur-md p-4 rounded-xl border border-emerald-primary/20 space-y-3">
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-emerald-primary/70">
              <span>Neural Strain (Sanity)</span>
              <span className={sanity >= 80 ? "text-red-500 animate-pulse font-bold" : ""}>{sanity}%</span>
            </div>
            <div className="h-2 w-full bg-midnight rounded-full overflow-hidden border border-emerald-primary/30 relative">
              <motion.div animate={{ width: `${sanity}%` }} className={`h-full ${sanity >= 80 ? 'bg-red-500' : 'bg-emerald-primary shadow-hud'}`} />
            </div>
            {isLocked && <p className="text-[10px] text-red-500 font-mono animate-pulse text-center">SYSTEM LOCKED: RECOVERING NEURAL PATHWAYS</p>}
          </div>
        </div>

        {/* CENTER AREA */}
        {isGameFinished ? (
          /* TAMPILAN ENDING SETELAH TAMAT */
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="h-[50vh] w-full flex items-center justify-center pointer-events-auto">
            <div className="bg-charcoal/60 backdrop-blur-xl border-2 border-gold-accent/50 rounded-2xl p-12 text-center shadow-[0_0_50px_rgba(255,210,38,0.15)] relative overflow-hidden w-full max-w-4xl">
               <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
               <Radio size={48} className="text-gold-accent mx-auto mb-6 animate-pulse" />
               <h3 className="text-gold-accent text-3xl font-mono tracking-[0.4em] mb-8">TRANSMISSION SUSPENDED</h3>
               <p className="text-emerald-primary text-xl font-light leading-loose tracking-widest uppercase">
                 "Perjalanan tidak berhenti di sini.<br/>Sinyal akan terus dikirim di masa yang akan datang."
               </p>
               <div className="mt-12 inline-block border border-emerald-primary/30 bg-emerald-primary/5 px-6 py-2 rounded">
                 <p className="text-emerald-primary/60 font-mono text-sm tracking-widest animate-pulse">AWAITING FUTURE DIRECTIVES...</p>
               </div>
            </div>
          </motion.div>
        ) : (
          /* TAMPILAN NORMAL (BELUM TAMAT) */
          <div className="flex gap-6 h-[50vh] w-full pointer-events-auto">
            <div className="flex-[2] bg-charcoal/30 backdrop-blur-xl border border-emerald-primary/20 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center shadow-hud">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-primary"></div>
              <div className="flex items-center gap-2 mb-4"><Database className="w-4 h-4 text-emerald-primary/50" /><h3 className="text-xs font-mono text-emerald-primary/50 uppercase tracking-widest">Active Data Packet</h3></div>
              <h4 className="text-5xl font-light text-emerald-primary mb-2">Stage {currentLevel}</h4>
              <h5 className="text-2xl text-gold-accent font-bold italic mb-6">{levelInfo.title}</h5>
              <p className="text-emerald-primary/70 text-sm font-mono leading-relaxed">{levelInfo.lore}</p>
            </div>

            <div className="flex-[1] bg-charcoal/30 backdrop-blur-xl border border-emerald-primary/20 rounded-2xl p-6 flex flex-col shadow-hud">
              <div className="flex justify-between items-center mb-6 border-b border-emerald-primary/20 pb-4">
                <div className="flex items-center gap-2 text-emerald-primary"><BookOpen size={20} /><h3 className="font-mono text-xs uppercase tracking-widest">Logs</h3></div>
                <button onClick={() => setShowLogsOverlay(true)} className="p-1 hover:bg-emerald-primary/10 rounded transition-colors text-emerald-primary hover:text-gold-accent"><Maximize2 size={16} /></button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin">
                {Object.keys(LEVEL_DATA).filter(l => l <= currentLevel).map(l => (
                  <div key={l} className="p-3 bg-emerald-primary/5 rounded border-l-2 border-gold-accent opacity-70">
                    <p className="text-[10px] text-emerald-primary/90 italic line-clamp-3">"{LEVEL_DATA[l].log}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM ACTION */}
        <div className="flex justify-start pointer-events-auto pb-4">
          {!isGameFinished ? (
            <button disabled={isLocked} onClick={() => setShowLore(true)} className={`px-10 py-4 font-bold uppercase tracking-widest rounded-lg transition-all shadow-hud flex items-center gap-3 ${isLocked ? 'bg-charcoal border border-red-500/50 text-red-500/50' : 'bg-emerald-primary text-charcoal hover:scale-105 active:scale-95'}`}>
               <Play size={18} fill="currentColor" /> {isLocked ? 'ACCESS DENIED' : 'INITIALIZE DECRYPTION'}
            </button>
          ) : (
             // Tombol Refresh jika sudah tamat (opsional)
             <button onClick={() => window.location.reload()} className="px-8 py-3 bg-transparent border border-emerald-primary/50 text-emerald-primary font-mono text-xs uppercase tracking-widest rounded hover:bg-emerald-primary/10 transition-colors">
               Disconnect Terminal
             </button>
          )}
        </div>

        {/* --- OVERLAYS (TETAP SAMA) --- */}
        <AnimatePresence>
          {showLogsOverlay && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-charcoal/95 backdrop-blur-lg p-12 flex flex-col pointer-events-auto">
              <div className="flex justify-between items-center border-b border-emerald-primary/20 pb-6 mb-8">
                <h2 className="text-2xl font-bold text-gold-accent flex items-center gap-4 tracking-widest uppercase"><BookOpen size={32} /> Central Intelligence Archives</h2>
                <button onClick={() => setShowLogsOverlay(false)} className="p-2 border border-emerald-primary/20 rounded text-emerald-primary hover:bg-emerald-primary/10"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-8 pr-4">
                {Object.keys(LEVEL_DATA).filter(l => l <= (isGameFinished ? totalLevels : currentLevel)).map(l => (
                  <div key={l} className="p-8 bg-midnight/30 border border-emerald-primary/10 rounded-2xl relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gold-accent/40"></div>
                    <span className="font-mono text-[10px] text-emerald-primary/40 block mb-4 tracking-[0.3em]">RECORD: STAGE_0{l}</span>
                    <p className="text-lg text-emerald-primary/90 leading-relaxed font-light">"{LEVEL_DATA[l].log}"</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {showLore && !isGameFinished && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-charcoal/80 flex items-center justify-center p-8 pointer-events-auto">
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="max-w-2xl w-full bg-charcoal border border-emerald-primary/30 p-10 rounded-2xl relative">
                   <h2 className="text-gold-accent font-mono text-xs mb-6 uppercase tracking-widest"><ShieldAlert size={16} className="inline mr-2"/> Transmission Log</h2>
                   <p className="text-lg text-emerald-primary/90 mb-8 leading-relaxed font-light">{levelInfo?.briefing}</p>
                   <button onClick={() => { setShowLore(false); setTimeout(onPlay, 500); }} className="w-full py-4 bg-emerald-primary/10 border border-emerald-primary/30 hover:bg-emerald-primary/20 uppercase font-mono text-emerald-primary tracking-widest">[ ENGAGE DECRYPTION ]</button>
                </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}