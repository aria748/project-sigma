// File: src/levels/Level03.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Dna, DatabaseBackup } from 'lucide-react';

export default function Level03({ isStabilized, onSolve, setFrequency, setAmplitude, frequency, amplitude, onWrongAnswer }) {
  const [dnaInput, setDnaInput] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  
  // STATE BARU: Indikator Error
  const [isError, setIsError] = useState(false);

  const ALIEN_STRAND = ["T-T-G", "C-C-A", "C-A-T", "C-G-A"];
  const TARGET_DNA = "AACGGTGTAGCT"; 

  useEffect(() => {
    const cleanInput = dnaInput.replace(/[^A-Za-z]/g, '').toUpperCase();
    let matchCount = 0;
    for (let i = 0; i < Math.min(cleanInput.length, TARGET_DNA.length); i++) {
      if (cleanInput[i] === TARGET_DNA[i]) matchCount++;
    }

    const progress = matchCount / TARGET_DNA.length;
    const newFreq = 10 + (78 * progress); 
    const newAmp = 100 - (55 * progress); 
    
    setFrequency(newFreq);
    setAmplitude(newAmp);
    
    if (cleanInput === TARGET_DNA) {
      setFrequency(88);
      setAmplitude(45);
    }
  }, [dnaInput, setFrequency, setAmplitude]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (terminalInput.toUpperCase() === "NOVA" && isStabilized) {
      onSolve();
    } else {
      if (onWrongAnswer) onWrongAnswer();
      setIsError(true); // Aktifkan mode error
      
      setTimeout(() => {
        setIsError(false);
        setTerminalInput('');
      }, 800);
    }
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-8 z-10 pointer-events-auto w-full">
      {/* LEFT PANEL: BIO-DIGITAL SEQUENCER */}
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
            <Dna size={24} />
            <h2 className="font-mono tracking-[0.2em] text-sm">BIO-DIGITAL SEQUENCER</h2>
          </div>
          
          <div className="bg-midnight/30 p-4 rounded-xl border border-emerald-primary/20 mb-6 font-mono text-xs text-emerald-primary/80">
            <p className="mb-2 text-gold-accent font-bold"># PROTOKOL PASANGAN BASA (BASE PAIRING):</p>
            <ul className="space-y-1">
              <li>{">"} Adenine (A) ⇌ Thymine (T)</li>
              <li>{">"} Cytosine (C) ⇌ Guanine (G)</li>
            </ul>
          </div>

          <p className="text-xs font-mono text-emerald-primary/60 mb-4 uppercase tracking-widest">Sinyal Asal (Alien Strand):</p>
          <div className="flex justify-between gap-2 mb-8">
            {ALIEN_STRAND.map((codon, idx) => (
              <div key={idx} className="flex-1 bg-emerald-primary/10 border border-emerald-primary/30 py-3 text-center rounded font-mono font-bold tracking-widest text-emerald-primary">{codon}</div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-emerald-primary/60 uppercase tracking-widest">Sintesis Untaian Pelengkap:</label>
            <input 
              value={dnaInput}
              onChange={(e) => setDnaInput(e.target.value.toUpperCase())}
              placeholder="Ketik sequence..."
              className={`w-full bg-charcoal border rounded p-4 font-mono outline-none tracking-[0.5em] text-center transition-colors ${isStabilized ? 'border-emerald-primary text-emerald-primary shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-emerald-primary/50 text-emerald-primary focus:border-gold-accent'}`}
            />
          </div>
        </div>
        <div className={`mt-6 p-3 border rounded text-center font-mono text-xs tracking-widest transition-colors ${isStabilized ? 'bg-emerald-primary/20 border-emerald-primary text-emerald-primary' : 'bg-charcoal/50 border-emerald-primary/30 text-emerald-primary/50'}`}>
          {isStabilized ? "DNA MATCHED: STRUCTURAL INTEGRITY 100%" : "SYNTHESIZING..."}
        </div>
      </motion.div>

      {/* RIGHT PANEL: CODON TRANSLATION TERMINAL */}
      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
          <DatabaseBackup size={24} />
          <h2 className="font-mono tracking-[0.2em] text-sm">CODON DECODER</h2>
        </div>

        <div className="flex-1 bg-midnight/50 border border-emerald-primary/10 rounded-lg p-4 font-mono text-xs mb-6 overflow-hidden relative flex flex-col">
          <p className="text-emerald-primary/40 mb-4">// MENUNGGU INTEGRITAS DNA...</p>
          {isStabilized ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
              <p className="text-gold-accent mb-4">DNA ALIGNED. PROTEIN DICTIONARY UNLOCKED:</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border-l-2 border-emerald-primary/50 pl-3"><span className="text-emerald-primary/60">AAC</span> = <span className="font-bold text-emerald-primary text-lg">N</span></div>
                <div className="border-l-2 border-emerald-primary/50 pl-3"><span className="text-emerald-primary/60">GCT</span> = <span className="font-bold text-emerald-primary text-lg">A</span></div>
                <div className="border-l-2 border-emerald-primary/50 pl-3"><span className="text-emerald-primary/60">GTA</span> = <span className="font-bold text-emerald-primary text-lg">V</span></div>
                <div className="border-l-2 border-emerald-primary/50 pl-3"><span className="text-emerald-primary/60">TGC</span> = <span className="font-bold text-emerald-primary text-lg">E</span></div>
                <div className="border-l-2 border-emerald-primary/50 pl-3"><span className="text-emerald-primary/60">GGT</span> = <span className="font-bold text-emerald-primary text-lg">O</span></div>
                <div className="border-l-2 border-emerald-primary/50 pl-3"><span className="text-emerald-primary/60">ATA</span> = <span className="font-bold text-emerald-primary text-lg">R</span></div>
              </div>
              <p className="text-emerald-primary mt-auto animate-pulse"># MASUKKAN HASIL TERJEMAHAN CODON #</p>
            </motion.div>
          ) : (
             <div className="flex-1 flex items-center justify-center"><div className="w-16 h-16 border-4 border-emerald-primary/20 border-t-emerald-primary/80 rounded-full animate-spin"></div></div>
          )}
        </div>

        {/* EFEK SHAKE & WARNA MERAH DI SINI */}
        <motion.form 
          onSubmit={handleTerminalSubmit} 
          className="relative"
          animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <input 
            value={isError ? "ACCESS DENIED" : terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            disabled={!isStabilized || isError}
            placeholder={isStabilized ? "TRANSLATE CODON SEQUENCE..." : "LOCKED..."}
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