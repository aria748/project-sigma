// File: src/levels/Level10.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Fingerprint, Braces } from 'lucide-react';

export default function Level10({ isStabilized, onSolve, setFrequency, setAmplitude, onWrongAnswer }) {
  const [terminalInput, setTerminalInput] = useState('');
  const [isError, setIsError] = useState(false);

  // Input RSA Factorization
  const [nodeP, setNodeP] = useState('');
  const [nodeQ, setNodeQ] = useState('');
  const [totient, setTotient] = useState('');

  // Target RSA: P*Q = 3127 (Primes are 53 and 59)
  // Totient = (53-1)*(59-1) = 52 * 58 = 3016
  const checkStability = () => {
    const p = parseInt(nodeP);
    const q = parseInt(nodeQ);
    const t = parseInt(totient);
    
    const isPrimesCorrect = (p === 53 && q === 59) || (p === 59 && q === 53);
    const isTotientCorrect = t === 3016;

    return isPrimesCorrect && isTotientCorrect;
  };

  useEffect(() => {
    const isStable = checkStability();
    
    // Hitung progress kedekatan nilai
    let correctCount = 0;
    if (nodeP) correctCount += 0.5;
    if (nodeQ) correctCount += 0.5;
    if (parseInt(totient) === 3016) correctCount += 2; // Totient punya bobot lebih besar

    const progress = Math.min(correctCount / 3, 1);

    if (isStable) {
      setFrequency(88);
      setAmplitude(45);
    } else {
      setFrequency(10 + (78 * progress));
      setAmplitude(100 - (55 * progress));
    }
  }, [nodeP, nodeQ, totient, setFrequency, setAmplitude]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    // ECHOES adalah hasil eksekusi dari script Brainfuck di layar kanan
    if (terminalInput.toUpperCase() === "ECHOES" && checkStability()) {
      onSolve();
    } else {
      if (onWrongAnswer) onWrongAnswer();
      setIsError(true);
      setTimeout(() => { setIsError(false); setTerminalInput(''); }, 800);
    }
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-8 z-10 pointer-events-auto w-full">
      
      {/* LEFT PANEL: ASYMMETRIC CRYPTO-CORE */}
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
            <Fingerprint size={24} />
            <h2 className="font-mono tracking-[0.2em] text-sm">ASYMMETRIC CRYPTO-CORE</h2>
          </div>
          
          <div className="bg-midnight/30 p-4 rounded-xl border border-emerald-primary/20 mb-6 font-mono text-xs text-emerald-primary/80 space-y-2 shadow-inner">
            <p className="text-gold-accent font-bold mb-2"># RSA FACTORIZATION PROTOCOL:</p>
            <p>Public Modulus <span className="text-emerald-primary font-bold">(N) = 3127</span></p>
            <p>Equation 1: N = P × Q <span className="text-emerald-primary/50">(P & Q are Primes)</span></p>
            <p>Equation 2: ϕ(N) = (P - 1) × (Q - 1)</p>
          </div>

          <div className="space-y-4 font-mono text-sm">
            <div className="flex flex-col bg-charcoal/80 border border-emerald-primary/30 p-3 rounded">
              <label className="text-emerald-primary/60 text-xs mb-1">PRIME NODE [P]</label>
              <input type="number" value={nodeP} onChange={(e) => setNodeP(e.target.value)} className="bg-transparent text-emerald-primary outline-none focus:text-gold-accent" placeholder="Enter Prime Number..." />
            </div>
            <div className="flex flex-col bg-charcoal/80 border border-emerald-primary/30 p-3 rounded">
              <label className="text-emerald-primary/60 text-xs mb-1">PRIME NODE [Q]</label>
              <input type="number" value={nodeQ} onChange={(e) => setNodeQ(e.target.value)} className="bg-transparent text-emerald-primary outline-none focus:text-gold-accent" placeholder="Enter Prime Number..." />
            </div>
            <div className="flex flex-col bg-emerald-primary/10 border border-emerald-primary p-3 rounded shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <label className="text-gold-accent text-xs mb-1 font-bold">EULER's TOTIENT [ϕ(N)]</label>
              <input type="number" value={totient} onChange={(e) => setTotient(e.target.value)} className="bg-transparent text-emerald-primary outline-none focus:text-white font-bold" placeholder="Calculate (P-1)*(Q-1)..." />
            </div>
          </div>
        </div>

        <div className={`mt-6 p-3 border rounded text-center font-mono text-xs tracking-widest transition-colors ${checkStability() ? 'bg-emerald-primary/20 border-emerald-primary text-emerald-primary shadow-hud' : 'bg-red-900/20 border-red-500/50 text-red-500/80'}`}>
          {checkStability() ? "CORE STABILIZED. PAYLOAD INJECTED." : "MODULUS UNSTABLE. FACTORIZATION REQUIRED."}
        </div>
      </motion.div>

      {/* RIGHT PANEL: ESOTERIC SCRIPT DECODER */}
      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
          <Braces size={24} />
          <h2 className="font-mono tracking-[0.2em] text-sm">ESOTERIC PAYLOAD PARSER</h2>
        </div>

        <div className="flex-1 bg-midnight/50 border border-emerald-primary/10 rounded-lg p-4 font-mono text-xs mb-6 overflow-hidden relative flex flex-col">
          {!checkStability() ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-red-500/50 animate-pulse">// ERROR: CANNOT PARSE UNSTABLE CORE //</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
              <div className="p-3 bg-red-900/20 border-l-2 border-red-500 mb-4">
                <p className="text-red-500 uppercase font-bold">[CRITICAL] TURING-TAR-PIT DETECTED</p>
                <p className="text-emerald-primary/60 mt-1">Script relies on 8-instruction memory pointer manipulation.</p>
              </div>

              {/* BRAINFUCK SCRIPT - Actual working code that prints "ECHOES" */}
<div className="bg-[#0D0D0D] p-4 rounded border border-emerald-primary/20 shadow-inner flex-1 flex items-center justify-center">
  <p className="text-emerald-primary font-mono text-lg break-all leading-loose text-center tracking-[0.2em]">
    {"++++++++++"}<br/>
    {"[>+++++++>++++++>+++++++>++++++++<<<<-]"} <br/>
    {">-..--.>>++.>-."} {"<<<"} {"++.>>>++++."}
  </p>
</div>

              <p className="text-emerald-primary mt-4 animate-pulse text-center"># COMPILE AND ENTER OUTPUT #</p>
            </motion.div>
          )}
        </div>

        <motion.form onSubmit={handleTerminalSubmit} className="relative" animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
          <input 
            value={isError ? "FATAL EXCEPTION" : terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            disabled={!checkStability() || isError}
            placeholder={checkStability() ? "ENTER EXECUTED STRING..." : "LOCKED..."}
            className={`w-full bg-charcoal border rounded p-4 font-mono outline-none transition-colors disabled:opacity-90 ${isError ? 'border-red-500 text-red-500 bg-red-900/20' : 'border-emerald-primary/50 text-emerald-primary placeholder:text-emerald-primary/30 focus:border-gold-accent'}`}
          />
        </motion.form>
      </motion.div>

    </div>
  );
}