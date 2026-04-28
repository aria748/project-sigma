import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, RadioReceiver } from 'lucide-react';

export default function Level01({ isStabilized, onSolve, setFrequency, setAmplitude, frequency, amplitude, onWrongAnswer }) {
  const [terminalInput, setTerminalInput] = useState('');
  
  // STATE BARU UNTUK INDIKATOR ERROR
  const [isError, setIsError] = useState(false); 
  
  const TARGET_FREQ = 88;
  const TARGET_AMP = 45;

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (terminalInput.toUpperCase() === "LIFE" && isStabilized) {
      onSolve();
    } else {
      // JIKA JAWABAN SALAH:
      if (onWrongAnswer) onWrongAnswer(); // Tambah Sanity
      setIsError(true); // Aktifkan mode error (merah & bergetar)
      
      // Kembalikan ke keadaan semula setelah 800 milidetik
      setTimeout(() => {
        setIsError(false);
        setTerminalInput(''); // Kosongkan input
      }, 800);
    }
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-8 z-10 pointer-events-auto w-full">
      {/* LEFT PANEL: SIGNAL TUNING */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="col-span-5 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
            <RadioReceiver size={24} />
            <h2 className="font-mono tracking-[0.2em] text-sm">FREQUENCY CALIBRATOR</h2>
          </div>
          
          <p className="text-xs font-mono text-emerald-primary/60 mb-8 leading-relaxed">
            Anomali merespons gelombang harmonik. Temukan titik resonansi yang tepat untuk menstabilkan materi.
          </p>

          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs text-emerald-primary">
                <span>Frequency (MHz)</span>
                <span className={frequency === TARGET_FREQ ? "text-gold-accent font-bold" : ""}>{frequency}</span>
              </div>
              <input 
                type="range" min="0" max="100" value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value))}
                className="w-full accent-emerald-primary cursor-crosshair"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs text-emerald-primary">
                <span>Amplitude (dB)</span>
                <span className={amplitude === TARGET_AMP ? "text-gold-accent font-bold" : ""}>{amplitude}</span>
              </div>
              <input 
                type="range" min="0" max="100" value={amplitude}
                onChange={(e) => setAmplitude(parseInt(e.target.value))}
                className="w-full accent-emerald-primary cursor-crosshair"
              />
            </div>
          </div>
        </div>

        <div className={`mt-8 p-4 border rounded text-center font-mono text-xs tracking-widest transition-colors ${isStabilized ? 'bg-emerald-primary/20 border-emerald-primary text-emerald-primary' : 'bg-red-900/20 border-red-500/50 text-red-500/80'}`}>
          {isStabilized ? "[ MATTER STABILIZED ]" : "[ CALIBRATION REQUIRED ]"}
        </div>
      </motion.div>

      {/* RIGHT PANEL: DECRYPTION TERMINAL */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
        className="col-span-5 col-start-8 bg-charcoal/40 backdrop-blur-xl border border-emerald-primary/30 rounded-2xl p-6 flex flex-col"
      >
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-primary/20 pb-4 text-emerald-primary">
          <Terminal size={24} />
          <h2 className="font-mono tracking-[0.2em] text-sm">DECRYPTION TERMINAL</h2>
        </div>

        <div className="flex-1 bg-midnight/50 border border-emerald-primary/10 rounded-lg p-4 font-mono text-xs mb-6 overflow-hidden relative">
          <p className="text-emerald-primary/40 mb-2">// RAW DATA STREAMING...</p>
          {isStabilized ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-accent break-words leading-loose">
              PATTERN DETECTED:<br/>
              01001100<br/>
              01001001<br/>
              01000110<br/>
              01000101
            </motion.div>
          ) : (
            <p className="text-red-500/50 animate-pulse">#ERROR: SIGNAL TOO CHAOTIC TO PARSE#</p>
          )}
        </div>

        {/* INPUT TERMINAL DENGAN EFEK SHAKE & WARNA MERAH */}
        <motion.form 
          onSubmit={handleTerminalSubmit} 
          className="relative"
          animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}} // Efek getar ke kiri dan kanan
          transition={{ duration: 0.4 }}
        >
          <input 
            value={isError ? "ACCESS DENIED" : terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            disabled={!isStabilized || isError} // Kunci input saat error bermain
            placeholder={isStabilized ? "ENTER TRANSLATION..." : "WAITING FOR SIGNAL..."}
            className={`w-full bg-charcoal border rounded p-4 font-mono outline-none transition-colors disabled:opacity-90
              ${isError 
                ? 'border-red-500 text-red-500 bg-red-900/20' // Warna saat salah
                : 'border-emerald-primary/50 text-emerald-primary placeholder:text-emerald-primary/30 focus:border-gold-accent' // Warna normal
              }
            `}
          />
        </motion.form>
      </motion.div>
    </div>
  );
}