import React, { useState, MouseEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Download } from 'lucide-react';

interface ResumeButtonProps {
  resumePath?: string;
  label?: string;
  className?: string;
}

const ResumeButton: React.FC<ResumeButtonProps> = ({
  resumePath = '/PERATCHI_MANIKANDAN_M.pdf',
  label = 'DOWNLOAD RESUME',
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleRipple = (e: MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    
    if ('clientX' in e) {
      handleRipple(e as MouseEvent<HTMLButtonElement>);
    }

    if (prefersReducedMotion) {
      window.open(resumePath, '_blank', 'noopener,noreferrer');
      showToast('✓ Resume opened in a new tab', 'success');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(resumePath, { method: 'HEAD' });
      if (!response.ok) throw new Error('Not found');
      
      setTimeout(() => {
        setIsLoading(false);
        window.open(resumePath, '_blank', 'noopener,noreferrer');
        showToast('✓ Resume opened in a new tab', 'success');
      }, 300);
    } catch {
      setTimeout(() => {
        setIsLoading(false);
        showToast('Resume is currently unavailable.', 'error');
      }, 300);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Trigger a synthetic ripple in the center of the button for keyboard activation
      if (!prefersReducedMotion) {
        const rect = e.currentTarget.getBoundingClientRect();
        const newRipple = { x: rect.width / 2, y: rect.height / 2, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
      }
      handleClick(e);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open Resume"
        onClick={handleClick as any}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isLoading}
        whileHover={prefersReducedMotion ? {} : { y: -3 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.97, transition: { duration: 0.18 } }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`relative inline-flex items-center justify-center gap-2 border-[1.5px] border-[rgba(255,255,255,0.15)] hover:border-[var(--color-primary)] text-[var(--text-primary)] hover:text-[var(--color-primary)] px-8 py-4 rounded-full font-bold transition-colors min-h-[50px] min-w-[180px] tracking-wide text-sm bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(249,115,22,0.05)] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
          isLoading ? 'cursor-wait pointer-events-none' : 'cursor-pointer'
        } ${className}`}
        style={{
          boxShadow: isHovered 
            ? '0 0 20px rgba(249,115,22,0.2), inset 0 0 10px rgba(255,255,255,0.05)' 
            : 'none'
        }}
      >
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ opacity: 0.5, scale: 0 }}
              animate={{ opacity: 0, scale: 2.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute bg-white/20 rounded-full w-24 h-24 pointer-events-none"
              style={{
                left: ripple.x - 48,
                top: ripple.y - 48,
              }}
            />
          ))}
        </AnimatePresence>

        <motion.div
          animate={
            isLoading 
              ? { y: 4, rotate: 0 } 
              : isHovered 
                ? { y: 3, rotate: 8 } 
                : { y: 0, rotate: 0 }
          }
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ 
            filter: isHovered ? 'drop-shadow(0 0 8px rgba(249,115,22,0.6))' : 'none'
          }}
          className="relative z-10"
        >
          <Download size={18} />
        </motion.div>
        
        <span className="relative z-10">{label}</span>
      </motion.button>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border ${
              toast.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            } font-medium text-sm flex items-center gap-2`}
          >
            {toast.type === 'success' && <span className="text-lg">✓</span>}
            {toast.message.replace('✓ ', '')}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResumeButton;
