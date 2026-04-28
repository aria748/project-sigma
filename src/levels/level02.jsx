// File: src/levels/Level02.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Zap, ToggleLeft, ToggleRight } from 'lucide-react';

export default function Level02({ isStabilized, onSolve, setFrequency, setAmplitude, frequency, amplitude, onWrongAnswer }) {
  const [terminalInput, setTerminalInput] = useState('');
  const [switches, setSwitches] = useState([false, false, false, false]);
  
  // STATE BARU: Indikator Error
  const [isError, setIsError] = useState(false);

  const out1 = switches[0] && !switches[1];
  const out2 = switches[2] || switches[1];
  const out3 = switches[3] !== switches[2];

  const targetAchieved = out1 && out2 && out3;

  useEffect(() => {
    const correctCount = [out1, out2, out3].filter(Boolean).length;
    if (correctCount === 0) { setFrequency(10); setAmplitude(100); }
    else if (correctCount === 1) { setFrequency(30); setAmplitude(80); }
    else if (correctCount === 2) { setFrequency(60); setAmplitude(60); }
    else if (correctCount === 3) { setFrequency(88); setAmplitude(45); } 
  }, [out1, out2, out3, setFrequency, setAmplitude]);

  const toggleSwitch = (index) => {
    const newSwitches = [...switches];
    newSwitches[index] = !newSwitches[index];
    setSwitches(newSwitches);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (terminalInput.toUpperCase() === "ECLIPSE" && targetAchieved) {
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
      {/* LEFT PANEL: LOGIC GATE ARRAY */}
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
            <Cpu size={24} />
            <h2 className="font-mono tracking-[0.2em] text-sm">LOGIC GATE ROUTER</h2>
          </div>
          <p className="text-xs font-mono text-emerald-primary/60 mb-6 leading-relaxed">
            Sistem terkunci oleh 3 gerbang logika. Sesuaikan input sakelar (S1-S4) agar semua output (O1-O3) menghasilkan daya [TRUE].
          </p>

          <div className="flex justify-between mb-8 bg-midnight/30 p-4 rounded-xl border border-emerald-primary/20">
            {switches.map((isOn, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <span className="font-mono text-xs text-emerald-primary/50">S{idx + 1}</span>
                <button onClick={() => toggleSwitch(idx)} className={`transition-colors ${isOn ? 'text-gold-accent' : 'text-emerald-primary/30 hover:text-emerald-primary/60'}`}>
                  {isOn ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
                <span className="font-mono text-xs font-bold text-emerald-primary">{isOn ? '1' : '0'}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className={`flex items-center justify-between p-3 border rounded ${out1 ? 'bg-emerald-primary/20 border-emerald-primary text-emerald-primary' : 'bg-red-900/20 border-red-500/50 text-red-500/80'}`}>
              <div className="flex items-center gap-2"><Zap size={14} /> <span>O1: S1 [AND] (NOT S2)</span></div>
              <span className="font-bold">{out1 ? 'TRUE' : 'FALSE'}</span>
            </div>
            <div className={`flex items-center justify-between p-3 border rounded ${out2 ? 'bg-emerald-primary/20 border-emerald-primary text-emerald-primary' : 'bg-red-900/20 border-red-500/50 text-red-500/80'}`}>
              <div className="flex items-center gap-2"><Zap size={14} /> <span>O2: S3 [OR] S2</span></div>
              <span className="font-bold">{out2 ? 'TRUE' : 'FALSE'}</span>
            </div>
            <div className={`flex items-center justify-between p-3 border rounded ${out3 ? 'bg-emerald-primary/20 border-emerald-primary text-emerald-primary' : 'bg-red-900/20 border-red-500/50 text-red-500/80'}`}>
              <div className="flex items-center gap-2"><Zap size={14} /> <span>O3: S4 [XOR] S3</span></div>
              <span className="font-bold">{out3 ? 'TRUE' : 'FALSE'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT PANEL: DECRYPTION TERMINAL */}
      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
          <Terminal size={24} />
          <h2 className="font-mono tracking-[0.2em] text-sm">DECRYPTION TERMINAL</h2>
        </div>

        <div className="flex-1 bg-midnight/50 border border-emerald-primary/10 rounded-lg p-4 font-mono text-xs mb-6 overflow-hidden relative">
          <p className="text-emerald-primary/40 mb-2">// SECURITY FIREWALL STATUS...</p>
          {targetAchieved ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-accent break-words leading-loose">
              FIREWALL BYPASSED.<br/>DATA FRAGMENT RETRIEVED:<br/><br/>
              <span className="text-emerald-primary">FORMAT: HEXADECIMAL (TO ASCII)</span><br/>
              <span className="text-lg tracking-widest font-bold">45 43 4C 49 50 53 45</span><br/>
            </motion.div>
          ) : (
            <p className="text-red-500/50 animate-pulse mt-4"># ACCESS DENIED: COMPLETE LOGIC ROUTING #</p>
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
            disabled={!targetAchieved || isError}
            placeholder={targetAchieved ? "ENTER ASCII TRANSLATION..." : "SYSTEM LOCKED..."}
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