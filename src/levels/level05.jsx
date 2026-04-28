// File: src/levels/Level05.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Sliders, ShieldAlert } from 'lucide-react';

export default function Level05({ isStabilized, onSolve, setFrequency, setAmplitude, onWrongAnswer }) {
  const [terminalInput, setTerminalInput] = useState('');
  const [isError, setIsError] = useState(false);

  // State Alokasi Daya
  const [alpha, setAlpha] = useState(0);
  const [beta, setBeta] = useState(0);
  const [gamma, setGamma] = useState(0);

  const totalPower = alpha + beta + gamma;

  // Logika Kemenangan Slider: A=40, B=20, G=40
  const isPowerStable = alpha === 40 && beta === 20 && gamma === 40;

  // Kalkulasi feedback 3D: Semakin dekat nilainya, semakin tenang anomali 3D-nya
  useEffect(() => {
    if (isPowerStable) {
      setFrequency(88);
      setAmplitude(45);
    } else {
      // Hitung selisih dari target
      const diff = Math.abs(alpha - 40) + Math.abs(beta - 20) + Math.abs(gamma - 40);
      let progress = 1 - (diff / 150); // Skala kedekatan
      if (progress < 0) progress = 0;
      
      setFrequency(10 + (78 * progress));
      setAmplitude(100 - (55 * progress));
    }
  }, [alpha, beta, gamma, isPowerStable, setFrequency, setAmplitude]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    // PULSAR adalah hasil dekripsi TWSGET dengan key ECHO
    if (terminalInput.toUpperCase() === "PULSAR" && isPowerStable) {
      onSolve();
    } else {
      if (onWrongAnswer) onWrongAnswer();
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setTerminalInput('');
      }, 800);
    }
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-8 z-10 pointer-events-auto w-full">
      
      {/* LEFT PANEL: RESOURCE ALLOCATION */}
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
            <Sliders size={24} />
            <h2 className="font-mono tracking-[0.2em] text-sm">POWER RESOURCE ALLOCATION</h2>
          </div>
          
          <div className="bg-midnight/30 p-4 rounded-xl border border-emerald-primary/20 mb-6 font-mono text-xs text-emerald-primary/80 space-y-2">
            <p className="text-gold-accent font-bold mb-2"># DEDUCTION RULES:</p>
            <p>[RULE 01] ALPHA = 2 × BETA</p>
            <p>[RULE 02] GAMMA = BETA + 20</p>
            <p>[RULE 03] TOTAL YIELD = 100%</p>
          </div>

          {/* Sliders */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs text-emerald-primary">
                <span>Core Alpha</span><span>{alpha}%</span>
              </div>
              <input type="range" min="0" max="100" value={alpha} onChange={(e) => setAlpha(parseInt(e.target.value))} className="w-full accent-emerald-primary cursor-crosshair" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs text-emerald-primary">
                <span>Core Beta</span><span>{beta}%</span>
              </div>
              <input type="range" min="0" max="100" value={beta} onChange={(e) => setBeta(parseInt(e.target.value))} className="w-full accent-emerald-primary cursor-crosshair" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs text-emerald-primary">
                <span>Core Gamma</span><span>{gamma}%</span>
              </div>
              <input type="range" min="0" max="100" value={gamma} onChange={(e) => setGamma(parseInt(e.target.value))} className="w-full accent-emerald-primary cursor-crosshair" />
            </div>
          </div>
        </div>

        <div className={`mt-6 p-4 border rounded text-center font-mono text-xs tracking-widest transition-colors flex justify-between items-center ${isPowerStable ? 'bg-emerald-primary/20 border-emerald-primary text-emerald-primary' : totalPower > 100 ? 'bg-red-900/20 border-red-500/50 text-red-500/80' : 'bg-charcoal/50 border-emerald-primary/30 text-emerald-primary/50'}`}>
          <span>TOTAL OUTPUT:</span>
          <span className={`font-bold text-lg ${totalPower === 100 ? 'text-gold-accent' : ''}`}>{totalPower}%</span>
        </div>
      </motion.div>

      {/* RIGHT PANEL: VIGENERE DECODER */}
      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
          <Terminal size={24} />
          <h2 className="font-mono tracking-[0.2em] text-sm">VIGENÈRE DECODER</h2>
        </div>

        <div className="flex-1 bg-midnight/50 border border-emerald-primary/10 rounded-lg p-4 font-mono text-xs mb-6 overflow-hidden relative flex flex-col">
          <p className="text-emerald-primary/40 mb-4">// AWAITING POWER STABILIZATION...</p>
          
          {isPowerStable ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-gold-accent">
                <ShieldAlert size={16} /> <span>POLYALPHABETIC CIPHER DETECTED</span>
              </div>
              
              <div className="p-4 bg-charcoal border border-emerald-primary/30 rounded space-y-3">
                 <p className="text-emerald-primary/60">CIPHERTEXT:</p>
                 <span className="text-3xl font-bold tracking-[0.4em] text-emerald-primary block">TWSGET</span>
              </div>

              <div className="p-3 bg-emerald-primary/10 border-l-2 border-gold-accent">
                <p className="text-emerald-primary/80 leading-relaxed uppercase">
                  [!] VIGENÈRE CIPHER MEMBUTUHKAN KATA KUNCI (KEY). 
                  <br/>[HINT]: ENTITAS PENGIRIM SINYAL (4 HURUF).
                </p>
              </div>

              <p className="text-emerald-primary mt-auto animate-pulse pt-2"># MASUKKAN HASIL DEKRIPSI #</p>
            </motion.div>
          ) : (
             <div className="flex-1 flex items-center justify-center">
               <div className="font-mono text-emerald-primary/30 animate-pulse text-center space-y-2">
                 <div>SYSTEM UNDERPOWERED / OVERLOADED</div>
                 <div>ADJUST ALPHA, BETA, GAMMA</div>
               </div>
             </div>
          )}
        </div>

        {/* TERMINAL INPUT DENGAN EFEK SHAKE */}
        <motion.form 
          onSubmit={handleTerminalSubmit} 
          className="relative"
          animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <input 
            value={isError ? "ACCESS DENIED" : terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            disabled={!isPowerStable || isError}
            placeholder={isPowerStable ? "ENTER DECRYPTED TEXT..." : "LOCKED..."}
            className={`w-full bg-charcoal border rounded p-4 font-mono outline-none transition-colors disabled:opacity-90
              ${isError 
                ? 'border-red-500 text-red-500 bg-red-900/20' 
                : 'border-emerald-primary/50 text-emerald-primary placeholder:text-emerald-primary/30 focus:border-gold-accent'
              }
            `}
          />
        </motion.form>
      </motion.div>

    </div>
  );
}