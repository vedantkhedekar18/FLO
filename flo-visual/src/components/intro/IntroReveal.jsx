import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';
import { useLanguage } from '../../i18n/LanguageContext';

const LETTERS = 'FLO VISUAL'.split('');
const EASE = [0.16, 1, 0.3, 1];

function seenBefore() {
  try {
    return sessionStorage.getItem('flo_intro_seen') === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem('flo_intro_seen', '1');
  } catch {
    /* ignore */
  }
}

/**
 * IntroReveal — ~1.2s cinematic letter reveal on first load only.
 * Reduced-motion users get a fast, minimal fade instead.
 */
export default function IntroReveal({ onDone }) {
  const reduced = usePrefersReducedMotion();
  const { t } = useLanguage();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (seenBefore()) {
      onDone?.();
      return;
    }
    markSeen();
    setShown(true);
  }, [onDone]);

  // Auto-dismiss shortly after the reveal so the intro stays ~1.5–2s.
  useEffect(() => {
    if (!shown) return undefined;
    const t = setTimeout(() => setShown(false), reduced ? 450 : 1750);
    return () => clearTimeout(t);
  }, [shown, reduced]);

  if (!shown) return null;

  const finish = () => {
    onDone?.();
  };

  return (
    <AnimatePresence onExitComplete={finish}>
      {shown && (
        <motion.div
          key="intro"
          className="intro-overlay"
          exit={{ y: '-100%', transition: { duration: 0.85, ease: EASE } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: '#0c0c0c',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f5f4f0',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 'min(88vw, 1100px)' }}
          >
            {reduced
              ? <motion.h1 key="r" className="display-headline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>FLO VISUAL</motion.h1>
              : LETTERS.map((letter, i) => (
                  <motion.span
                    key={`${letter}-${i}`}
                    className="display-headline"
                    initial={{ opacity: 0, y: 70, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.06 * i }}
                    style={{
                      display: 'inline-block',
                      fontSize: 'clamp(2.4rem, 8.5vw, 6rem)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                      whiteSpace: 'pre',
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
          </motion.div>

          <motion.p
            className="mono-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0.1 : 0.85, duration: 0.6 }}
            style={{ marginTop: '1.4rem', color: 'rgba(245,244,240,0.55)' }}
          >
            {t.intro.tagline}
          </motion.p>

          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: reduced ? 0 : 0.5, duration: 0.7, ease: EASE }}
            style={{ width: 'min(60vw, 420px)', height: 1, background: 'var(--accent)', marginTop: '2.2rem', transformOrigin: 'left' }}
          />

          <motion.button
            className="mono-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0.15 : 0.95, duration: 0.4 }}
            onClick={finish}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,244,240,0.5)')}
            style={{
              position: 'absolute',
              bottom: '2.2rem',
              background: 'none',
              border: 'none',
              color: 'rgba(245,244,240,0.5)',
              cursor: 'pointer',
              fontSize: '0.62rem',
              letterSpacing: '0.26em',
              paddingTop: '0.4rem',
              borderBottom: '1px solid rgba(245,244,240,0.25)',
              transition: 'color 0.2s ease',
            }}
          >
            {t.intro.enter}
          </motion.button>

          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: reduced ? 0 : 0.35, duration: 0.9, ease: EASE }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '3px',
              background: 'linear-gradient(90deg, var(--accent), transparent)',
              transformOrigin: 'bottom',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}