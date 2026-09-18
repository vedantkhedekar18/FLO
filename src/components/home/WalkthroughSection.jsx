import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import CinematicVideo from '../media/CinematicVideo';
import RevealText from '../ui/RevealText';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

const EASE = [0.16, 1, 0.3, 1];

/**
 * WalkthroughSection — the walkthrough as a framed cinematic screen rather
 * than a small embedded player. The frame settles in with a clip reveal and
 * the video slow-scales as the user scrolls through it.
 */
export default function WalkthroughSection() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const frameY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60]);
  const frameScale = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], reduced ? [1, 1, 1, 1] : [0.94, 1, 1, 1.04]);

  return (
    <section ref={ref} style={{ background: '#0c0c0c', padding: 'clamp(4rem, 7.5vw, 7rem) 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
          <span className="mono-meta" style={{ color: '#c8a97e', fontSize: '0.66rem', letterSpacing: '0.26em' }}>
            {t.walkthrough.dash}
          </span>
          <Link to="/walkthroughs" className="editorial-btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
            {t.walkthrough.cta} <ArrowUpRight size={14} className="rtl-flip" />
          </Link>
        </div>

        <h2 className="display-headline" style={{ color: '#fff', margin: '0 0 clamp(1.8rem, 3.5vw, 3rem)', maxWidth: '16ch' }}>
          {t.walkthrough.heading.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              <RevealText as="span" text={line} delay={0.1 + i * 0.22} />
            </span>
          ))}
        </h2>
      </div>

      {/* The framed cinematic screen */}
      <motion.div
        initial={{ clipPath: 'inset(7% 0 7% 0)' }}
        whileInView={{ clipPath: 'inset(0% 0 0% 0)' }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.15, ease: EASE }}
        style={{ y: frameY, scale: frameScale, marginInline: 'clamp(0.6rem, 2.4vw, 2.5rem)' }}
      >
        <Link
          to="/walkthroughs/france-walkthrough"
          aria-label={t.walkthrough.cta}
          className="cinema-screen"
          style={{
            position: 'relative',
            display: 'block',
            aspectRatio: '21 / 9',
            overflow: 'hidden',
            background: '#000',
            textDecoration: 'none',
          }}
        >
          <CinematicVideo src="/assets/videos/France.mp4" poster="/assets/exterior/14.jpg" mode="background" />

          <span aria-hidden style={{ position: 'absolute', top: 0, insetInlineStart: 0, width: '1.2rem', height: '1.2rem', borderTop: '2px solid rgba(245,244,240,0.85)', borderInlineStart: '2px solid rgba(245,244,240,0.85)', pointerEvents: 'none' }} />
          <span aria-hidden style={{ position: 'absolute', top: 0, insetInlineEnd: 0, width: '1.2rem', height: '1.2rem', borderTop: '2px solid rgba(245,244,240,0.85)', borderInlineEnd: '2px solid rgba(245,244,240,0.85)', pointerEvents: 'none' }} />
          <span aria-hidden style={{ position: 'absolute', bottom: 0, insetInlineStart: 0, width: '1.2rem', height: '1.2rem', borderBottom: '2px solid rgba(245,244,240,0.85)', borderInlineStart: '2px solid rgba(245,244,240,0.85)', pointerEvents: 'none' }} />
          <span aria-hidden style={{ position: 'absolute', bottom: 0, insetInlineEnd: 0, width: '1.2rem', height: '1.2rem', borderBottom: '2px solid rgba(245,244,240,0.85)', borderInlineEnd: '2px solid rgba(245,244,240,0.85)', pointerEvents: 'none' }} />

          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.42) 0%, transparent 38%, transparent 62%, rgba(12,12,12,0.58) 100%)', pointerEvents: 'none' }} />

          <div style={{ position: 'absolute', insetBlockStart: '1.1rem', insetInlineStart: '1.3rem', right: '1.3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.85)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
              {t.walkthrough.sub}
            </span>
          </div>

          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="cinema-play" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', background: 'rgba(245,244,240,0.14)', border: '1px solid rgba(245,244,240,0.5)', backdropFilter: 'blur(2px)' }}>
                <Play size={20} style={{ marginInlineStart: 2 }} fill="currentColor" />
              </span>
            </span>
          </div>
        </Link>
      </motion.div>

      <div className="container" style={{ marginTop: 'clamp(1.6rem, 3vw, 2.4rem)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <p className="mono-meta" style={{ color: 'rgba(245,244,240,0.55)', fontSize: '0.6rem', letterSpacing: '0.18em' }}>
          {t.walkthrough.sub}
        </p>
        <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.55)', fontSize: '0.6rem', letterSpacing: '0.18em' }}>
          4K · CINEMATIC CAMERA PATH
        </span>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .cinema-screen { aspect-ratio: 16 / 9 !important; }
        }
      `}</style>
    </section>
  );
}