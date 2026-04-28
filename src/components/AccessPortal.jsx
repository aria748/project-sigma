import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Fingerprint, Cpu } from 'lucide-react';

const LOADING_STEPS = [
  "INITIATING NEURAL HANDSHAKE...",
  "QUERYING S.I.G.M.A DATABASE...",
  "VERIFYING BIOMETRIC SIGNATURE...",
  "BYPASSING SECURITY FIREWALL...",
  "DECRYPTING AGENT CLEARANCE...",
  "ACCESS GRANTED."
];

export default function AccessPortal({ onGrant }) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'authenticating'
  const [loadingIndex, setLoadingIndex] = useState(0);

  // Efek seakan sistem sedang membaca database
  useEffect(() => {
    if (status === 'authenticating') {
      if (loadingIndex < LOADING_STEPS.length) {
        const timer = setTimeout(() => {
          setLoadingIndex(prev => prev + 1);
        }, 600); // Kecepatan munculnya teks terminal (600ms)
        return () => clearTimeout(timer);
      } else {
        // Jika sudah sampai step terakhir ("ACCESS GRANTED"), tunggu 1 detik lalu masuk Main Menu
        setTimeout(() => onGrant(input), 1000);
      }
    }
  }, [status, loadingIndex, onGrant, input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setStatus('authenticating');
    }
  };

  return (
    // Tambahkan class scanlines dan bg-grid di sini
    
    <div className="relative h-screen flex flex-col items-center justify-center scanlines bg-charcoal overflow-hidden">
      
      {/* Background Hologram Grid (Looping berputar sangat pelan) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 150, ease: "linear" }}
        className="absolute inset-0 bg-grid opacity-50"
      />

      <AnimatePresence mode="wait">
        {status === 'idle' ? (
          <motion.div 
            key="input-form"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 flex flex-col items-center space-y-12"
          >
            <div className="text-center space-y-4 relative">
              {/* Looping floating animation */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="flex justify-center mb-6"
              >
                <Cpu className="w-16 h-16 text-emerald-primary/40" />
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, letterSpacing: "0.8em" }}
                animate={{ opacity: 1, letterSpacing: "0.2em" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-5xl font-bold text-gold-accent drop-shadow-[0_0_15px_rgba(255,210,38,0.5)]"
              >
                PROJECT S.I.G.M.A
              </motion.h1>
              <p className="text-emerald-primary/60 font-mono text-sm tracking-[0.3em]">
                AWAITING OPERATIVE INPUT
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative group flex flex-col items-center">
              <div className="absolute -inset-1 bg-emerald-primary/20 rounded-xl blur group-hover:opacity-100 transition duration-1000 opacity-50 animate-pulse"></div>
              
              {/* Kotak Input */}
              <div className="relative flex items-center bg-charcoal/80 backdrop-blur-md border border-emerald-primary/50 rounded-xl p-4 w-96 shadow-hud">
                <Terminal className="mr-3 w-5 h-5 text-emerald-primary" />
                <input 
                  autoFocus
                  className="bg-transparent outline-none flex-1 font-mono placeholder:text-emerald-primary/30 text-emerald-primary text-lg"
                  placeholder="ENTER AGENT ID..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={status !== 'idle'}
                />
              </div>
              
              <motion.span 
                animate={{ opacity: input.length > 0 ? [0.4, 1, 0.4] : 0 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-6 font-mono text-xs text-emerald-primary/60 tracking-widest"
              >
                [ PRESS ENTER TO INITIALIZE SEQUENCE ]
              </motion.span>
            </form>
          </motion.div>
        ) : (
          /* --- AUTHENTICATING SEQUENCE --- */
          <motion.div 
            key="loading-sequence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 w-96 space-y-6"
          >
            <div className="flex items-center gap-4 border-b border-emerald-primary/30 pb-4">
              <Fingerprint className="text-gold-accent animate-pulse w-8 h-8" />
              <div>
                <h2 className="font-mono text-gold-accent text-sm tracking-widest uppercase">Identity Verification</h2>
                <p className="text-emerald-primary/50 text-xs font-mono">Agent: {input.toUpperCase()}</p>
              </div>
            </div>

            <div className="space-y-2 font-mono text-sm">
              {LOADING_STEPS.slice(0, loadingIndex + 1).map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-2 ${idx === LOADING_STEPS.length - 1 ? 'text-gold-accent font-bold mt-6' : 'text-emerald-primary/80'}`}
                >
                  <span>{">"}</span>
                  <span>{step}</span>
                  {idx === loadingIndex && idx !== LOADING_STEPS.length - 1 && (
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      _
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}