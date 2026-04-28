// File: src/levels/Level06.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity, KeyRound } from 'lucide-react';

export default function Level06({ isStabilized, onSolve, setFrequency, setAmplitude, onWrongAnswer }) {
  const [terminalInput, setTerminalInput] = useState('');
  const [isError, setIsError] = useState(false);

  // Input 4 Resonator
  const [resonators, setResonators] = useState(['', '', '', '']);
  
  // Target Logika: 2^1, 2^3, 2^5, 2^7 -> 2, 8, 32, 128
  const TARGET_RESONATORS = ['2', '8', '32', '128'];

  useEffect(() => {
    let matchCount = 0;
    resonators.forEach((res, i) => {
      if (res === TARGET_RESONATORS[i]) matchCount++;
    });

    const progress = matchCount / 4; // 0 sampai 1
    
    if (matchCount === 4) {
      setFrequency(88);
      setAmplitude(45);
    } else {
      setFrequency(10 + (78 * progress));
      setAmplitude(100 - (55 * progress));
    }
  }, [resonators, setFrequency, setAmplitude]);

  const updateResonator = (index, value) => {
    const newResonators = [...resonators];
    newResonators[index] = value;
    setResonators(newResonators);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    // NEBULA adalah hasil akhir yang benar
    if (terminalInput.toUpperCase() === "NEBULA" && isStabilized) {
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
      
      {/* LEFT PANEL: HARMONIC RESONATORS */}
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
            <Activity size={24} />
            <h2 className="font-mono tracking-[0.2em] text-sm">HARMONIC RESONATORS</h2>
          </div>
          
          <div className="bg-midnight/30 p-4 rounded-xl border border-emerald-primary/20 mb-6 font-mono text-xs text-emerald-primary/80">
            <p className="mb-2 text-gold-accent font-bold"># CALIBRATION HINT:</p>
            <p>Dibutuhkan 4 input daya. Algoritma menunjukkan pola: <span className="text-emerald-primary">Eksponensial Basis 2 ($2^n$).</span></p>
            <p className="mt-2 text-emerald-primary/60">Gunakan hanya <span className="font-bold text-white">Interval Ganjil</span> berurutan untuk nilai 'n'.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="bg-charcoal/80 border border-emerald-primary/30 p-4 rounded-lg flex flex-col items-center">
                <span className="font-mono text-xs text-emerald-primary/50 mb-2">BAND_0{idx + 1}</span>
                <input 
                  type="number"
                  value={resonators[idx]}
                  onChange={(e) => updateResonator(idx, e.target.value)}
                  className={`w-full bg-transparent text-center text-2xl font-mono outline-none border-b-2 transition-colors ${resonators[idx] === TARGET_RESONATORS[idx] ? 'border-gold-accent text-gold-accent' : 'border-emerald-primary/30 text-emerald-primary focus:border-emerald-primary'}`}
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-6 p-3 border rounded text-center font-mono text-xs tracking-widest transition-colors ${isStabilized ? 'bg-emerald-primary/20 border-emerald-primary text-emerald-primary' : 'bg-charcoal/50 border-emerald-primary/30 text-emerald-primary/50'}`}>
          {isStabilized ? "RESONANCE ACHIEVED. DECRYPTION UNLOCKED." : "CALIBRATING FREQUENCIES..."}
        </div>
      </motion.div>

      {/* RIGHT PANEL: MULTI-LAYER DECRYPTION */}
      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
          <KeyRound size={24} />
          <h2 className="font-mono tracking-[0.2em] text-sm">MULTI-LAYER DECRYPTION</h2>
        </div>

        <div className="flex-1 bg-midnight/50 border border-emerald-primary/10 rounded-lg p-4 font-mono text-xs mb-6 overflow-hidden relative flex flex-col">
          <p className="text-emerald-primary/40 mb-4">// WAITING FOR BAND CALIBRATION...</p>
          
          {isStabilized ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 space-y-4">
              <div className="p-4 bg-charcoal border border-emerald-primary/30 rounded text-center">
                 <p className="text-emerald-primary/60 mb-2">ENCRYPTED CIPHERTEXT:</p>
                 <span className="text-2xl font-bold tracking-[0.3em] text-emerald-primary block">44 4F 58 45 48 51</span>
              </div>

              <div className="p-3 bg-emerald-primary/10 border-l-2 border-gold-accent space-y-2">
                <p className="text-gold-accent font-bold uppercase">[!] DECRYPTION PROTOCOL SEQUENCE:</p>
                <ol className="list-decimal list-inside text-emerald-primary/80 uppercase space-y-1">
                  <li>Translate <span className="text-white">Base-16 (Hex)</span> to ASCII.</li>
                  <li>Apply <span className="text-white">Caesar Shift (-3)</span> to all characters.</li>
                  <li>Perform <span className="text-white">Chronological Reversal</span> (Reverse String).</li>
                </ol>
              </div>

              <p className="text-emerald-primary mt-auto animate-pulse pt-2"># ENTER FINAL PLAINTEXT #</p>
            </motion.div>
          ) : (
             <div className="flex-1 flex items-center justify-center">
               <div className="font-mono text-emerald-primary/30 animate-pulse text-center">
                 # ERROR 401: FREQUENCY MISMATCH #
               </div>
             </div>
          )}
        </div>

        <motion.form onSubmit={handleTerminalSubmit} className="relative" animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
          <input 
            value={isError ? "ACCESS DENIED" : terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            disabled={!isStabilized || isError}
            placeholder={isStabilized ? "ENTER FINAL PLAINTEXT..." : "LOCKED..."}
            className={`w-full bg-charcoal border rounded p-4 font-mono outline-none transition-colors disabled:opacity-90 ${isError ? 'border-red-500 text-red-500 bg-red-900/20' : 'border-emerald-primary/50 text-emerald-primary placeholder:text-emerald-primary/30 focus:border-gold-accent'}`}
          />
        </motion.form>
      </motion.div>

    </div>
  );
}