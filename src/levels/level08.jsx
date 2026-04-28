// File: src/levels/Level08.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu } from 'lucide-react';

export default function Level08({ isStabilized, onSolve, setFrequency, setAmplitude, onWrongAnswer }) {
  const [terminalInput, setTerminalInput] = useState('');
  const [isError, setIsError] = useState(false);

  // State untuk Terminal Emulator Kiri
  const [cmdInput, setCmdInput] = useState('');
  const [termHistory, setTermHistory] = useState([
    "ECHO-OS v1.0.4 initialized.",
    "ACCESS RESTRICTED: Read-only file system.",
    "Type command to modify privileges..."
  ]);
  const bottomRef = useRef(null);

  // Auto-scroll terminal ke bawah setiap ada baris baru
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [termHistory]);

  // Efek kekacauan 3D jika belum stabil
  useEffect(() => {
    if (!isStabilized) {
      setFrequency(10);
      setAmplitude(90);
    }
  }, [isStabilized, setFrequency, setAmplitude]);

  // Handler Terminal Kiri (UNIX Bash)
  const handleCmdSubmit = (e) => {
    e.preventDefault();
    if (isStabilized) return;

    const cmd = cmdInput.trim().toLowerCase();
    const newHistory = [...termHistory, `root@echo-sys:~# ${cmdInput}`];

    // Cek apakah perintahnya benar: chmod 777 /core
    if (cmd === 'chmod 777 /core') {
      newHistory.push("drwxrwxrwx 1 root root /core");
      newHistory.push("SUCCESS: PERMISSION GRANTED.");
      newHistory.push("BYPASSING FIREWALL... COMPILING PAYLOAD...");
      setTermHistory(newHistory);
      
      // Stabilkan 3D Object
      setFrequency(88);
      setAmplitude(45);
    } else {
      newHistory.push(`bash: ${cmd}: command not found or permission denied.`);
      setTermHistory(newHistory);
      
      // Buat efek 3D makin kacau jika salah
      setFrequency(Math.floor(Math.random() * 50) + 10);
      setAmplitude(Math.floor(Math.random() * 50) + 50);
      if (onWrongAnswer) onWrongAnswer();
    }
    setCmdInput('');
  };

  // Handler Terminal Kanan (Final Answer)
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // NEXUS adalah hasil bedah kode dari script JS
    if (terminalInput.toUpperCase() === "NEXUS" && isStabilized) {
      onSolve();
    } else {
      if (onWrongAnswer) onWrongAnswer();
      setIsError(true);
      setTimeout(() => { setIsError(false); setTerminalInput(''); }, 800);
    }
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-8 z-10 pointer-events-auto w-full">
      
      {/* LEFT PANEL: BASH TERMINAL EMULATOR */}
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
          <Terminal size={24} />
          <h2 className="font-mono tracking-[0.2em] text-sm">SYSTEM TERMINAL (UNIX)</h2>
        </div>
        
        {/* Console Box */}
        <div className="flex-1 bg-[#0a0a0a] border border-emerald-primary/20 rounded-lg p-4 font-mono text-xs overflow-y-auto custom-scrollbar flex flex-col">
          <div className="space-y-2 mb-4">
            {termHistory.map((line, idx) => (
              <p key={idx} className={`${line.includes('SUCCESS') ? 'text-gold-accent font-bold' : line.includes('bash:') ? 'text-red-500' : 'text-emerald-primary/80'}`}>
                {line}
              </p>
            ))}
          </div>
          
          {/* Input Bash */}
          {!isStabilized ? (
            <form onSubmit={handleCmdSubmit} className="flex items-center gap-2 mt-auto text-emerald-primary">
              <span className="text-emerald-primary/50">root@echo-sys:~#</span>
              <input 
                type="text" 
                autoFocus
                value={cmdInput} 
                onChange={(e) => setCmdInput(e.target.value)} 
                className="flex-1 bg-transparent outline-none text-emerald-primary"
                spellCheck="false"
              />
            </form>
          ) : (
            <p className="mt-auto text-gold-accent animate-pulse">[ TERMINAL LOCKED: PAYLOAD EXTRACTED ]</p>
          )}
          <div ref={bottomRef} />
        </div>
      </motion.div>

      {/* RIGHT PANEL: SCRIPT REVERSE ENGINEERING */}
      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
          <Code size={24} />
          <h2 className="font-mono tracking-[0.2em] text-sm">PAYLOAD REVERSE ENGINEERING</h2>
        </div>

        <div className="flex-1 bg-midnight/50 border border-emerald-primary/10 rounded-lg p-4 font-mono text-xs mb-6 overflow-hidden relative flex flex-col">
          {!isStabilized ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-4">
               <Cpu size={32} className="text-emerald-primary/20" />
               <p className="text-emerald-primary/40 animate-pulse">// AWAITING ROOT PRIVILEGES...</p>
             </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col space-y-4">
              <p className="text-gold-accent font-bold">// SCRIPT COMPILED. TRACE THE ALGORITHM:</p>
              
              {/* Fake Syntax Highlighter Block */}
              <div className="bg-[#0D0D0D] border border-emerald-primary/30 p-4 rounded text-emerald-primary/80 font-mono text-sm leading-loose shadow-inner">
                <span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">payload</span> = [<span className="text-[#98c379]">"44"</span>, <span className="text-[#98c379]">"4F"</span>, <span className="text-[#98c379]">"52"</span>, <span className="text-[#98c379]">"5F"</span>, <span className="text-[#98c379]">"59"</span>];<br/>
                <span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">mask</span> = <span className="text-[#d19a66]">10</span>;<br/>
                <span className="text-[#c678dd]">let</span> <span className="text-[#61afef]">secret</span> = <span className="text-[#98c379]">""</span>;<br/><br/>
                
                <span className="text-[#c678dd]">for</span> (<span className="text-[#c678dd]">let</span> hex <span className="text-[#c678dd]">of</span> payload) &#123;<br/>
                &nbsp;&nbsp;<span className="text-[#c678dd]">let</span> dec = <span className="text-[#e5c07b]">parseInt</span>(hex, <span className="text-[#d19a66]">16</span>);<br/>
                &nbsp;&nbsp;secret += String.<span className="text-[#e5c07b]">fromCharCode</span>(dec ^ mask);<br/>
                &#125;<br/><br/>
                <span className="text-[#5c6370] italic">// WHAT IS THE VALUE OF 'secret'?</span>
              </div>

              <p className="text-emerald-primary mt-auto animate-pulse pt-2 border-t border-emerald-primary/20"># ENTER TRACED VALUE #</p>
            </motion.div>
          )}
        </div>

        {/* INPUT TERMINAL DENGAN EFEK SHAKE */}
        <motion.form onSubmit={handleFinalSubmit} className="relative" animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
          <input 
            value={isError ? "ACCESS DENIED" : terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            disabled={!isStabilized || isError}
            placeholder={isStabilized ? "EXECUTE COMPILED STRING..." : "LOCKED..."}
            className={`w-full bg-charcoal border rounded p-4 font-mono outline-none transition-colors disabled:opacity-90 ${isError ? 'border-red-500 text-red-500 bg-red-900/20' : 'border-emerald-primary/50 text-emerald-primary placeholder:text-emerald-primary/30 focus:border-gold-accent'}`}
          />
        </motion.form>
      </motion.div>

    </div>
  );
}