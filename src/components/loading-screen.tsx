import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A cinematic, high-end intro that plays once per visit (session-scoped):
 * features a multi-phase sci-fi boot sequence, sweeping ambient lighting,
 * particle grid scanlines, a glowing gold tachyon ring, and a dramatic panel wipe.
 */
export function LoadingScreen() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<'loading' | 'wipe' | 'done'>(() =>
    typeof window !== 'undefined' && sessionStorage.getItem('avenor-intro-seen') === '1' ? 'done' : 'loading');
  const [progress, setProgress] = useState(0);
  const [bootText, setBootText] = useState('INITIALIZING CORE PROTOCOLS...');

  useEffect(() => {
    if (stage === 'done') return;
    if (reduced) { sessionStorage.setItem('avenor-intro-seen', '1'); setStage('done'); return; }
    
    const start = performance.now();
    // Extended cinematic duration (~2.4 seconds) for maximum theatrical impact
    const duration = 2400; 
    let frame: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const value = Math.min(1, elapsed / duration);
      
      // Gorgeous custom cubic easing curve for organic acceleration & deceleration
      const smoothed = value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
      setProgress(smoothed);

      // Dynamic cinematic boot sequence text updates based on progress
      if (value < 0.25) {
        setBootText('ESTABLISHING SECURE NEURAL LINK...');
      } else if (value < 0.55) {
        setBootText('CALIBRATING QUANTUM MATRICES...');
      } else if (value < 0.85) {
        setBootText('SYNCHRONIZING HOLOGRAPHIC FEED...');
      } else {
        setBootText('SYSTEM NOMINAL. ACCESS GRANTED.');
      }

      if (value < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setStage('wipe');
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [stage, reduced]);

  useEffect(() => {
    if (stage !== 'wipe') return;
    const timeout = setTimeout(() => { sessionStorage.setItem('avenor-intro-seen', '1'); setStage('done'); }, 950);
    return () => clearTimeout(timeout);
  }, [stage]);

  return <AnimatePresence>
    {stage !== 'done' && <div className="intro-screen" aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 99999, overflow: 'hidden', background: '#02040a' }}>
      
      {/* Sci-Fi Vignette & Scanline Grid Overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none', zIndex: 4 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(234, 179, 8, 0.12) 0%, rgba(3, 7, 18, 0.95) 75%)', pointerEvents: 'none', zIndex: 5 }} />

      {/* Split Sliding Panels using exact original class names */}
      <motion.div 
        className="intro-panel intro-panel-left" 
        animate={stage === 'wipe' ? { x: '-100%' } : { x: 0 }} 
        transition={{ duration: 0.9, ease: EASE }} 
        style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: '#050811', borderRight: '1px solid rgba(234, 179, 8, 0.25)', zIndex: 10, boxShadow: '15px 0 50px rgba(0,0,0,0.8)' }} 
      />
      <motion.div 
        className="intro-panel intro-panel-right" 
        animate={stage === 'wipe' ? { x: '100%' } : { x: 0 }} 
        transition={{ duration: 0.9, ease: EASE }} 
        style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: '#050811', borderLeft: '1px solid rgba(234, 179, 8, 0.25)', zIndex: 10, boxShadow: '-15px 0 50px rgba(0,0,0,0.8)' }} 
      />

      {/* Central Content Container using exact original class names */}
      <motion.div 
        className="intro-content" 
        animate={stage === 'wipe' ? { opacity: 0, scale: 1.1, filter: 'blur(10px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }} 
        transition={{ duration: 0.45 }} 
        style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
      >
        
        {/* Multi-layered Rotating Tachyon Rings */}
        <div style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', border: '1px dashed rgba(234, 179, 8, 0.25)', animation: 'spin 30s linear infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(234, 179, 8, 0.08)', borderTopColor: '#eab308', animation: 'spin 12s linear infinite reverse', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '230px', height: '230px', borderRadius: '50%', border: '1px dotted rgba(234, 179, 8, 0.3)', animation: 'spin 20s linear infinite', pointerEvents: 'none' }} />

        {/* Dynamic Telemetry Status Text */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(234, 179, 8, 0.7)', marginBottom: '1.25rem', textTransform: 'uppercase' }}
        >
          {bootText}
        </motion.div>

        {/* Wordmark Row using exact original class names */}
        <div className="intro-wordmark-row" aria-label="AVENOR" style={{ display: 'flex', gap: '0.3em', marginBottom: '2.25rem', position: 'relative' }}>
          {'AVENOR'.split('').map((letter, index) => (
            <motion.span key={index} className="intro-letter"
              initial={{ opacity: 0, filter: 'blur(16px)', y: 25, scale: 0.9 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.2 + index * 0.07 }}
              style={{
                display: 'inline-block',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(3rem, 7vw, 5rem)',
                letterSpacing: '0.15em',
                color: '#ffffff',
                textShadow: '0 0 40px rgba(234, 179, 8, 0.65), 0 0 80px rgba(234, 179, 8, 0.3)'
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Loading Bar using exact original class names */}
        <div className="intro-bar" style={{ width: '280px', height: '3px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '9999px', overflow: 'hidden', position: 'relative', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}>
          <motion.div 
            className="intro-bar-fill" 
            style={{ 
              scaleX: progress, 
              transformOrigin: 'left', 
              height: '100%', 
              background: 'linear-gradient(90deg, #ca8a04, #eab308, #fef08a)', 
              boxShadow: '0 0 20px rgba(234, 179, 8, 1)' 
            }} 
          />
        </div>

        {/* Percentage Counter using exact original class names */}
        <p className="intro-percent" style={{ marginTop: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', letterSpacing: '0.3em', color: '#eab308', textShadow: '0 0 12px rgba(234, 179, 8, 0.5)' }}>
          {Math.round(progress * 100).toString().padStart(2, '0')}%
        </p>

      </motion.div>
    </div>}
  </AnimatePresence>;
}