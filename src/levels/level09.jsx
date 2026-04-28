// File: src/levels/Level09.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Compass, Zap } from 'lucide-react';

export default function Level09({ isStabilized, onSolve, setFrequency, setAmplitude, onWrongAnswer }) {
  const [terminalInput, setTerminalInput] = useState('');
  const [isError, setIsError] = useState(false);

  // Koordinat Spasial
  const [coordX, setCoordX] = useState('');
  const [coordY, setCoordY] = useState('');
  const [coordZ, setCoordZ] = useState('');

  // Target Koordinat: X=3, Y=4, Z=5 (Pythagorean triple)
  const TARGET_X = '3';
  const TARGET_Y = '4';
  const TARGET_Z = '5';

  useEffect(() => {
    let matchCount = 0;
    if (coordX === TARGET_X) matchCount++;
    if (coordY === TARGET_Y) matchCount++;
    if (coordZ === TARGET_Z) matchCount++;

    const progress = matchCount / 3;

    if (matchCount === 3) {
      setFrequency(88);
      setAmplitude(45);
    } else {
      // Objek 3D bergetar hebat sebelum koordinatnya pas
      setFrequency(10 + (78 * progress));
      setAmplitude(100 - (55 * progress));
    }
  }, [coordX, coordY, coordZ, setFrequency, setAmplitude]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    // QUASAR adalah hasil terjemahan pulsa optik
    if (terminalInput.toUpperCase() === "QUASAR" && isStabilized) {
      onSolve();
    } else {
      if (onWrongAnswer) onWrongAnswer();
      setIsError(true);
      setTimeout(() => { setIsError(false); setTerminalInput(''); }, 800);
    }
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-8 z-10 pointer-events-auto w-full">
      
      {/* LEFT PANEL: ASTROGATION MATRIX */}
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
            <Compass size={24} />
            <h2 className="font-mono tracking-[0.2em] text-sm">ASTROGATION MATRIX</h2>
          </div>
          
          <div className="bg-midnight/30 p-4 rounded-xl border border-emerald-primary/20 mb-6 font-mono text-xs text-emerald-primary/80 space-y-2">
            <p className="text-gold-accent font-bold mb-2"># TRIANGULATION PROTOCOL:</p>
            <p>Sistem membutuhkan input koordinat [X, Y, Z] yang presisi absolut.</p>
            <div className="mt-4 bg-charcoal/80 p-4 rounded border border-emerald-primary/20 text-emerald-primary text-sm font-mono space-y-3">
              <p>1) X² + Y² = Z²</p>
              <p>2) Y - X = 1</p>
              <p>3) X × Y × Z = 60</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-charcoal/80 border border-emerald-primary/30 p-4 rounded flex flex-col items-center">
              <span className="font-mono text-xs text-emerald-primary/50 mb-2">COORD_X</span>
              <input type="number" value={coordX} onChange={(e) => setCoordX(e.target.value)} className="w-full bg-transparent text-center text-2xl font-mono outline-none border-b-2 text-emerald-primary focus:border-gold-accent transition-colors" placeholder="0" />
            </div>
            <div className="bg-charcoal/80 border border-emerald-primary/30 p-4 rounded flex flex-col items-center">
              <span className="font-mono text-xs text-emerald-primary/50 mb-2">COORD_Y</span>
              <input type="number" value={coordY} onChange={(e) => setCoordY(e.target.value)} className="w-full bg-transparent text-center text-2xl font-mono outline-none border-b-2 text-emerald-primary focus:border-gold-accent transition-colors" placeholder="0" />
            </div>
            <div className="bg-charcoal/80 border border-emerald-primary/30 p-4 rounded flex flex-col items-center">
              <span className="font-mono text-xs text-emerald-primary/50 mb-2">COORD_Z</span>
              <input type="number" value={coordZ} onChange={(e) => setCoordZ(e.target.value)} className="w-full bg-transparent text-center text-2xl font-mono outline-none border-b-2 text-emerald-primary focus:border-gold-accent transition-colors" placeholder="0" />
            </div>
          </div>
        </div>

        <div className={`mt-6 p-3 border rounded text-center font-mono text-xs tracking-widest transition-colors ${isStabilized ? 'bg-emerald-primary/20 border-emerald-primary text-emerald-primary' : 'bg-charcoal/50 border-emerald-primary/30 text-emerald-primary/50'}`}>
          {isStabilized ? "SPATIAL LOCK ACHIEVED." : "AWAITING COORDINATES..."}
        </div>
      </motion.div>

      {/* RIGHT PANEL: PULSE OPTICAL DECODER */}
      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
          <Zap size={24} />
          <h2 className="font-mono tracking-[0.2em] text-sm">OPTICAL PULSE DECODER</h2>
        </div>

        <div className="flex-1 bg-midnight/50 border border-emerald-primary/10 rounded-lg p-4 font-mono text-xs mb-6 overflow-hidden relative flex flex-col">
          {!isStabilized ? (
            <p className="text-emerald-primary/40 animate-pulse">// AWAITING SPATIAL ALIGNMENT...</p>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 space-y-4">
              <div className="p-3 bg-emerald-primary/10 border-l-2 border-gold-accent mb-4">
                <p className="text-emerald-primary/80 uppercase">
                  [!] DATA STREAM INTERCEPTED. 5-BIT PULSE MODULATION DETECTED.
                </p>
              </div>

              {/* BACONIAN/BAUDOT CIPHER VISUALIZATION */}
              <div className="bg-[#0D0D0D] p-4 rounded border border-emerald-primary/20 space-y-3 font-mono text-lg tracking-[0.5em] text-center shadow-inner">
                <div className="text-emerald-primary">● ○ ○ ○ ●</div>
                <div className="text-emerald-primary">● ○ ● ○ ●</div>
                <div className="text-emerald-primary">○ ○ ○ ○ ●</div>
                <div className="text-emerald-primary">● ○ ○ ● ●</div>
                <div className="text-emerald-primary">○ ○ ○ ○ ●</div>
                <div className="text-emerald-primary">● ○ ○ ● ○</div>
              </div>

              <p className="text-emerald-primary/50 mt-auto text-center pt-2"># DECODE THE FREQUENCY #</p>
            </motion.div>
          )}
        </div>

        <motion.form onSubmit={handleTerminalSubmit} className="relative" animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
          <input 
            value={isError ? "ACCESS DENIED" : terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            disabled={!isStabilized || isError}
            placeholder={isStabilized ? "ENTER TRANSLATED STRING..." : "LOCKED..."}
            className={`w-full bg-charcoal border rounded p-4 font-mono outline-none transition-colors disabled:opacity-90 ${isError ? 'border-red-500 text-red-500 bg-red-900/20' : 'border-emerald-primary/50 text-emerald-primary placeholder:text-emerald-primary/30 focus:border-gold-accent'}`}
          />
        </motion.form>
      </motion.div>

    </div>
  );
}