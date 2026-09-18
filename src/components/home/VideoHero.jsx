import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import CinematicVideo from '../media/CinematicVideo';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

const EASE = [0.16, 1, 0.3, 1];

export default function VideoHero() {
  const reduced = usePrefersReducedMotion();
  const { t, isRTL, lang } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.18]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, reduced ? 0 : -55]);
  const titleScale = useTransform(scrollYProgress, [0, 0.6], [1, reduced ? 1 : 0.965]);

  return (
    <section ref={sectionRef} className="full-viewport" style={{ background: '#0c0c0c', overflow: 'hidden' }}>
      <motion.div style={{ position: 'absolute', inset: 0, scale: videoScale, opacity: videoOpacity }}>
        <CinematicVideo src="/assets/videos/France.mp4" poster="/assets/exterior/14.jpg" mode="background" />
      </motion.div>

      <div className="hero-scrim" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '240px', background: 'linear-gradient(180deg, rgba(8,8,8,0.72), rgba(8,8,8,0.28) 62%, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '280px', background: 'linear-gradient(180deg, transparent, rgba(12,12,12,0.72) 100%)', pointerEvents: 'none' }} />

      <motion.div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: 'clamp(7rem, 14vh, 9.5rem)',
          paddingBottom: '3rem',
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <div>
          <motion.span
            className="mono-meta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.7rem',
              color: 'rgba(245,244,240,0.75)',
              letterSpacing: '0.2em',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8a97e', display: 'inline-block' }} />
            FLO VISUAL — {t.hero.badge}
          </motion.span>

          <motion.div
            key={lang}
            style={{ y: titleY, scale: titleScale, marginTop: '1.6rem' }}
          >
            <h1
              className="hero-title"
              style={{
                color: '#fff',
                textShadow: '0 8px 60px rgba(0,0,0,0.55)',
                lineHeight: 0.92,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              {t.hero.title.map((line, i) => (
                <span
                  key={`${lang}-${i}`}
                  className="hero-title-line"
                  style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.14em', marginBottom: '-0.14em' }}
                >
                  <motion.span
                    initial={{ y: '112%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.95, ease: EASE, delay: 0.45 + i * 0.11 }}
                    style={{ display: 'inline-block', willChange: 'transform' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </motion.div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.4rem',
              marginTop: '1.6rem',
            }}
          >
            <div style={{ width: '40px', height: '1px', background: 'var(--accent-light)' }} />
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
              className="hero-tagline"
              style={{
                color: 'rgba(245,244,240,0.85)',
                marginTop: 0,
              }}
            >
              {t.hero.tagline}
            </motion.p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div className="mono-meta" style={{ color: 'rgba(245,244,240,0.6)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>
            {t.hero.videoLabel}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
          >
            <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.6)', fontSize: '0.6rem', letterSpacing: '0.22em' }}>{t.hero.scroll}</span>
            <motion.span
              animate={reduced ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={15} style={{ color: '#fff' }} />
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}