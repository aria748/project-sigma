// File: src/levels/Level07.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Target, Binary } from 'lucide-react';

export default function Level07({ isStabilized, onSolve, setFrequency, setAmplitude, onWrongAnswer }) {
  const [terminalInput, setTerminalInput] = useState('');
  const [isError, setIsError] = useState(false);

  // Input Rotasi Orbit (Derajat 0 - 360)
  const [orbit1, setOrbit1] = useState('');
  const [orbit2, setOrbit2] = useState('');
  const [orbit3, setOrbit3] = useState('');

  // Target Orbit: R1=60, R2=120, R3=180
  const TARGET_R1 = '60';
  const TARGET_R2 = '120';
  const TARGET_R3 = '180';

  useEffect(() => {
    let correct = 0;
    if (orbit1 === TARGET_R1) correct++;
    if (orbit2 === TARGET_R2) correct++;
    if (orbit3 === TARGET_R3) correct++;

    const progress = correct / 3;

    if (correct === 3) {
      setFrequency(88);
      setAmplitude(45);
    } else {
      setFrequency(10 + (78 * progress));
      setAmplitude(100 - (55 * progress));
    }
  }, [orbit1, orbit2, orbit3, setFrequency, setAmplitude]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    // HORIZON adalah hasil XOR Hex "59 5E 43 58 4B 5E 5F" dengan Key "11"
    if (terminalInput.toUpperCase() === "HORIZON" && isStabilized) {
      onSolve();
    } else {
      if (onWrongAnswer) onWrongAnswer();
      setIsError(true);
      setTimeout(() => { setIsError(false); setTerminalInput(''); }, 800);
    }
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-8 z-10 pointer-events-auto w-full">
      
      {/* LEFT PANEL: ORBITAL ALIGNMENT */}
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
            <Target size={24} />
            <h2 className="font-mono tracking-[0.2em] text-sm">ORBITAL ALIGNMENT</h2>
          </div>
          
          <div className="bg-midnight/30 p-4 rounded-xl border border-emerald-primary/20 mb-6 font-mono text-xs text-emerald-primary/80 space-y-2">
            <p className="text-gold-accent font-bold mb-2"># ORBITAL MECHANICS CALIBRATION:</p>
            <p>Jejaring koordinat mematuhi konjungsi 3 cincin orbit.</p>
            <div className="mt-3 bg-charcoal/80 p-3 rounded text-emerald-primary/90 font-mono tracking-widest border border-emerald-primary/20 space-y-2">
              <p>R1 + R2 + R3 = 360°</p>
              <p>R2 = 2 × R1</p>
              <p>R3 = R2 + 60°</p>
            </div>
            <p className="mt-3 text-emerald-primary/50">Tentukan rotasi (0°-360°) untuk setiap cincin (R1, R2, R3).</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-charcoal/80 p-3 border border-emerald-primary/30 rounded">
              <span className="font-mono text-emerald-primary/60">INNER RING [R1]</span>
              <div className="flex items-center gap-2">
                <input type="number" value={orbit1} onChange={(e) => setOrbit1(e.target.value)} placeholder="0" className="w-20 bg-transparent text-right font-mono text-xl outline-none text-emerald-primary focus:text-gold-accent" />
                <span className="text-emerald-primary/30">°</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-charcoal/80 p-3 border border-emerald-primary/30 rounded">
              <span className="font-mono text-emerald-primary/60">MIDDLE RING [R2]</span>
              <div className="flex items-center gap-2">
                <input type="number" value={orbit2} onChange={(e) => setOrbit2(e.target.value)} placeholder="0" className="w-20 bg-transparent text-right font-mono text-xl outline-none text-emerald-primary focus:text-gold-accent" />
                <span className="text-emerald-primary/30">°</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-charcoal/80 p-3 border border-emerald-primary/30 rounded">
              <span className="font-mono text-emerald-primary/60">OUTER RING [R3]</span>
              <div className="flex items-center gap-2">
                <input type="number" value={orbit3} onChange={(e) => setOrbit3(e.target.value)} placeholder="0" className="w-20 bg-transparent text-right font-mono text-xl outline-none text-emerald-primary focus:text-gold-accent" />
                <span className="text-emerald-primary/30">°</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-6 p-3 border rounded text-center font-mono text-xs tracking-widest transition-colors ${isStabilized ? 'bg-emerald-primary/20 border-emerald-primary text-emerald-primary' : 'bg-charcoal/50 border-emerald-primary/30 text-emerald-primary/50'}`}>
          {isStabilized ? "ORBITAL ALIGNMENT LOCKED." : "CALIBRATING DEGREES..."}
        </div>
      </motion.div>

      {/* RIGHT PANEL: EXCLUSIVE-OR DECRYPTION */}
      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
          <Binary size={24} />
          <h2 className="font-mono tracking-[0.2em] text-sm">EXCLUSIVE-OR (XOR) DECODER</h2>
        </div>

        <div className="flex-1 bg-midnight/50 border border-emerald-primary/10 rounded-lg p-4 font-mono text-xs mb-6 overflow-hidden relative flex flex-col">
          <p className="text-emerald-primary/40 mb-4">// AWAITING ORBITAL LOCK...</p>
          
          {isStabilized ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 space-y-4">
              <div className="p-4 bg-charcoal border border-emerald-primary/30 rounded text-center space-y-2">
                 <p className="text-emerald-primary/60">XOR ENCRYPTED CIPHERTEXT (HEX):</p>
                 <span className="text-2xl font-bold tracking-[0.2em] text-emerald-primary block break-words">
                   59 5E 43 58 4B 5E 5F
                 </span>
              </div>

              <div className="p-4 bg-red-900/10 border-l-2 border-red-500 space-y-2">
                <p className="text-red-500 font-bold uppercase">[!] SECURITY BREACH DETECTED</p>
                <p className="text-emerald-primary/80 uppercase leading-relaxed">
                  Data ini dikunci dengan operasi logika <span className="text-gold-accent font-bold">Bitwise XOR</span>.
                </p>
                <p className="text-emerald-primary/80 uppercase">
                  Decryption Key (HEX): <span className="text-white font-bold tracking-widest">11</span>
                </p>
              </div>

              <p className="text-emerald-primary mt-auto animate-pulse pt-2 text-center border-t border-emerald-primary/20 pt-4"># MASUKKAN HASIL TEKS ASCII #</p>
            </motion.div>
          ) : (
             <div className="flex-1 flex items-center justify-center">
               <div className="font-mono text-emerald-primary/30 animate-pulse text-center">
                 # ERR: AZIMUTH OUT OF BOUNDS #
               </div>
             </div>
          )}
        </div>

        <motion.form onSubmit={handleTerminalSubmit} className="relative" animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
          <input 
            value={isError ? "ACCESS DENIED" : terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            disabled={!isStabilized || isError}
            placeholder={isStabilized ? "ENTER ASCII DECRYPTED TEXT..." : "LOCKED..."}
            className={`w-full bg-charcoal border rounded p-4 font-mono outline-none transition-colors disabled:opacity-90 ${isError ? 'border-red-500 text-red-500 bg-red-900/20' : 'border-emerald-primary/50 text-emerald-primary placeholder:text-emerald-primary/30 focus:border-gold-accent'}`}
          />
        </motion.form>
      </motion.div>

    </div>
  );
}