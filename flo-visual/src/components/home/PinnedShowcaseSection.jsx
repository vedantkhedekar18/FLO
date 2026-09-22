import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import CinematicVideo from '../media/CinematicVideo';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

const EASE = [0.16, 1, 0.3, 1];

// Five disciplines, five real FLO media moments. Each step links to its
// dedicated surface (filtered archive, film page, or tours index).
const STEPS = [
  { id: 'exterior', kind: 'image', src: '/assets/exterior/Final Road Side View.jpg', to: '/work?category=EXTERIOR%20CGI' },
  { id: 'interior', kind: 'image', src: '/assets/interior/Grand lobby_05_HR.jpg', to: '/work?category=INTERIOR%20CGI' },
  { id: 'animation', kind: 'video', src: '/assets/videos/France.mp4', poster: '/assets/exterior/15.jpg', to: '/walkthroughs/france-walkthrough' },
  { id: 'tours360', kind: 'image', src: '/assets/interior/Lobby.jpg', to: '/360' },
  { id: 'drone', kind: 'image', src: '/assets/home/Drone.jpg', to: '/work?category=DRONE' },
];

/**
 * PinnedShowcaseSection — the media stays pinned while the viewer moves
 * through five ways of seeing the work. Each step crossfades its record
 * (exterior → interior → animation → 360° → drone) with a cinematic
 * clip-scale reveal, never a plain fade.
 */
export default function PinnedShowcaseSection() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * STEPS.length), STEPS.length - 1);
    setActive(idx);
  });

  const current = STEPS[active];
  const localized = t.pinned.steps[current.id];

  const mediaVariants = {
    enter: reduced
      ? { opacity: 0, clipPath: 'inset(0% 0 0% 0)' }
      : { opacity: 1, clipPath: 'inset(100% 0 0 0)', scale: 1.06 },
    center: reduced
      ? { opacity: 1, clipPath: 'inset(0% 0 0% 0)' }
      : { opacity: 1, clipPath: 'inset(0% 0 0 0)', scale: 1 },
    exit: reduced
      ? { opacity: 0, clipPath: 'inset(0% 0 100% 0)' }
      : { opacity: 0, clipPath: 'inset(0 0 100% 0)', scale: 1.02 },
  };

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: `${STEPS.length * 90}vh`, background: 'var(--bg-ink)' }}>
      <div className="pin-sticky-holder">
        {/* Pinned media */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current.id}
              variants={mediaVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.9, ease: EASE }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {current.kind === 'video' ? (
                <CinematicVideo src={current.src} poster={current.poster} mode="background" />
              ) : (
                <img
                  src={current.src}
                  alt={localized?.label || current.id}
                  loading="lazy"
                  decoding="async"
                  className="tone-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="pin-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(12,12,12,0.86) 0%, rgba(12,12,12,0.42) 52%, transparent 100%)', pointerEvents: 'none' }} />
          <div className="pin-vignette" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 92% at 50% 44%, transparent 54%, rgba(12,12,12,0.55) 100%)', pointerEvents: 'none' }} />
        </div>

        {/* Pinned caption that swaps as the user scrolls */}
        <div className="container" style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingTop: '4.5rem', paddingBottom: '2.8rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 34 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -30 }}
              transition={{ duration: 0.55, ease: EASE }}
              style={{ maxWidth: '660px' }}
            >
              <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.65)', fontSize: '0.64rem', letterSpacing: '0.22em' }}>
                {String(active + 1).padStart(2, '0')} — {t.pinned.dash.replace(/^\d\d — /, '')}
              </span>

              <div style={{ marginTop: '0.8rem', display: 'flex', alignItems: 'center', gap: '1.1rem', flexWrap: 'wrap' }}>
                <Link
                  to={current.to}
                  className="display-headline"
                  style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 3.4rem)', textDecoration: 'none', lineHeight: 1 }}
                >
                  {localized?.label || current.id}
                </Link>
                <span
                  className="rtl-flip"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(245,244,240,0.75)', fontSize: '0.7rem', letterSpacing: '0.16em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}
                >
                  <ArrowUpRight size={18} />
                </span>
              </div>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.8, color: 'rgba(245,244,240,0.72)', maxWidth: '480px', margin: '0.9rem 0 0' }}>
                {localized?.caption}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress */}
          <div style={{ marginTop: '1.6rem', display: 'flex', alignItems: 'center', gap: '1.1rem', flexWrap: 'wrap' }}>
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                aria-label={t.pinned.steps[s.id]?.label || s.id}
                onClick={() => {
                  const el = sectionRef.current;
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setActive(i);
                }}
                style={{
                  width: i === active ? 40 : 10,
                  height: 3,
                  background: i === active ? '#f5f4f0' : 'rgba(245,244,240,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
            <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.6)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
              {String(active + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Inline-end vertical index of all five steps */}
        <div className="pin-index" style={{ position: 'absolute', insetInlineEnd: 'clamp(1.25rem, 3.5vw, 3.5rem)', top: '50%', transform: 'translateY(-50%)', zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                const el = sectionRef.current;
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActive(i);
              }}
              className="pin-index-btn"
              aria-label={t.pinned.steps[s.id]?.label || s.id}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                color: i === active ? '#f5f4f0' : 'rgba(245,244,240,0.38)',
                opacity: i === active ? 1 : 0.7,
                transition: 'color 0.35s ease, opacity 0.35s ease',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .pin-index { display: none !important; } }
      `}</style>
    </section>
  );
}