// File: src/levels/Level04.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Network, Binary } from 'lucide-react';

export default function Level04({ isStabilized, onSolve, setFrequency, setAmplitude, onWrongAnswer }) {
  const [terminalInput, setTerminalInput] = useState('');
  const [isError, setIsError] = useState(false);

  // State Grid 3x3 (9 kotak), semuanya dimulai dengan status 'false' (Mati)
  const [grid, setGrid] = useState(Array(9).fill(false));

  // Fungsi saat sebuah node/kotak diklik
  const toggleNode = (index) => {
    if (isStabilized) return; // Jika sudah stabil, kunci grid

    const newGrid = [...grid];
    const row = Math.floor(index / 3);
    const col = index % 3;

    // Toggle dirinya sendiri
    newGrid[index] = !newGrid[index];
    // Toggle Atas
    if (row > 0) newGrid[index - 3] = !newGrid[index - 3];
    // Toggle Bawah
    if (row < 2) newGrid[index + 3] = !newGrid[index + 3];
    // Toggle Kiri
    if (col > 0) newGrid[index - 1] = !newGrid[index - 1];
    // Toggle Kanan
    if (col < 2) newGrid[index + 1] = !newGrid[index + 1];

    setGrid(newGrid);
  };

  // Cek progress: Berapa banyak kotak yang menyala (True)?
  useEffect(() => {
    const activeNodes = grid.filter(Boolean).length;
    const progress = activeNodes / 9; // Persentase dari 0 sampai 1
    
    // Ubah background 3D berdasarkan jumlah node yang menyala
    setFrequency(10 + (78 * progress)); 
    setAmplitude(100 - (55 * progress));

    // Jika ke-9 kotak menyala, maka Stabil (Set freq 88, amp 45)
    if (activeNodes === 9) {
      setFrequency(88);
      setAmplitude(45);
    }
  }, [grid, setFrequency, setAmplitude]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    // "ORION" adalah hasil decode Base64 dari "T1JJT04="
    if (terminalInput.toUpperCase() === "ORION" && isStabilized) {
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
      
      {/* LEFT PANEL: QUANTUM MATRIX */}
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
            <Network size={24} />
            <h2 className="font-mono tracking-[0.2em] text-sm">QUANTUM ENTANGLEMENT MATRIX</h2>
          </div>
          
          <p className="text-xs font-mono text-emerald-primary/60 mb-8 leading-relaxed">
            Aktifkan seluruh sektor (9/9). Peringatan: Status kuantum saling terkait. Membalik satu sektor akan membalik fase sektor ortogonal di sekitarnya.
          </p>

          {/* GRID 3x3 */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-3 gap-3 bg-midnight/30 p-4 rounded-xl border border-emerald-primary/20">
              {grid.map((isActive, idx) => (
                <button 
                  key={idx}
                  onClick={() => toggleNode(idx)}
                  className={`w-16 h-16 rounded transition-all duration-300 flex items-center justify-center font-mono text-xl shadow-hud
                    ${isActive 
                      ? 'bg-emerald-primary border-emerald-primary text-charcoal shadow-[0_0_15px_rgba(16,185,129,0.8)]' 
                      : 'bg-charcoal border-2 border-emerald-primary/20 text-emerald-primary/30 hover:border-emerald-primary/50'
                    }
                  `}
                >
                  {isActive ? '1' : '0'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-6 p-3 border rounded text-center font-mono text-xs tracking-widest transition-colors ${isStabilized ? 'bg-emerald-primary/20 border-emerald-primary text-emerald-primary' : 'bg-charcoal/50 border-emerald-primary/30 text-emerald-primary/50'}`}>
          {isStabilized ? "MATRIX STABILIZED. PAYLOAD REVEALED." : `ACTIVE NODES: ${grid.filter(Boolean).length}/9`}
        </div>
      </motion.div>

      {/* RIGHT PANEL: BASE64 DECODER TERMINAL */}
      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="col-span-6 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
          <Terminal size={24} />
          <h2 className="font-mono tracking-[0.2em] text-sm">DECRYPTION TERMINAL</h2>
        </div>

        <div className="flex-1 bg-midnight/50 border border-emerald-primary/10 rounded-lg p-4 font-mono text-xs mb-6 overflow-hidden relative flex flex-col">
          <p className="text-emerald-primary/40 mb-4">// MENUNGGU STABILITAS MATRIKS...</p>
          
          {isStabilized ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-gold-accent">
                <Binary size={16} /> <span>ENCRYPTED PAYLOAD RECEIVED:</span>
              </div>
              <div className="p-4 bg-charcoal border border-emerald-primary/30 rounded text-center">
                 {/* Ini adalah Base64 dari kata "ORION" */}
                 <span className="text-2xl font-bold tracking-[0.3em] text-emerald-primary">T1JJT04=</span>
              </div>
              <p className="text-emerald-primary/60 border-l-2 border-emerald-primary pl-2 mt-4">
                [SYSTEM WARNING]: STRING FORMAT RECOGNIZED AS <span className="text-gold-accent font-bold">BASE64</span> ALGORITHM.
              </p>
              <p className="text-emerald-primary mt-auto animate-pulse pt-4"># MASUKKAN HASIL DECODE #</p>
            </motion.div>
          ) : (
             <div className="flex-1 flex items-center justify-center">
               <div className="w-16 h-16 grid grid-cols-2 gap-1 animate-pulse opacity-50">
                  <div className="bg-emerald-primary rounded"></div><div className="bg-emerald-primary rounded"></div>
                  <div className="bg-emerald-primary rounded"></div><div className="bg-emerald-primary rounded"></div>
               </div>
             </div>
          )}
        </div>

        {/* EFEK SHAKE & DENIED */}
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
            placeholder={isStabilized ? "ENTER DECODED STRING..." : "LOCKED..."}
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