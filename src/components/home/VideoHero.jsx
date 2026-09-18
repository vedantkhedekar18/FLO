import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Plus } from 'lucide-react';
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

  const lines = t.hero.title;

  return (
    <section ref={sectionRef} className="full-viewport" style={{ background: '#081226', overflow: 'hidden' }}>
      <motion.div style={{ position: 'absolute', inset: 0, scale: videoScale, opacity: videoOpacity }}>
        <CinematicVideo src="/assets/videos/France.mp4" poster="/assets/exterior/14.jpg" mode="background" />
      </motion.div>

      <div className="hero-scrim" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '260px', background: 'linear-gradient(180deg, rgba(7,14,28,0.78), rgba(7,14,28,0.28) 62%, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '300px', background: 'linear-gradient(180deg, transparent, rgba(7,13,26,0.8) 100%)', pointerEvents: 'none' }} />

      {/* IDEAS TO SPACES + coordinates */}
      <motion.div
        className="hero-corner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
      >
        <div className="mono-meta" style={{ color: 'rgba(245,244,240,0.85)', fontSize: '0.72rem', lineHeight: 1.8, letterSpacing: '0.24em' }}>
          IDEAS<br />TO<br /><span style={{ color: 'var(--gold-light)' }}>SPACES</span>
        </div>
        <div className="mono-meta" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '2.4rem', color: 'rgba(245,244,240,0.7)', fontSize: '0.68rem', letterSpacing: '0.14em' }}>
          <Plus size={13} style={{ marginTop: 2, color: 'var(--gold-light)' }} />
          <span>43.7102° N<br />7.2620° E</span>
        </div>
      </motion.div>

      {/* Floating stats card */}
      <motion.div
        className="hero-stats-card hero-glass"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.9, ease: EASE }}
      >
        <div className="hero-stats-thumbs">
          <img src="/assets/exterior/15.jpg" alt="Exterior visualization" />
          <img src="/assets/interior/02.jpg" alt="Interior visualization" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.1rem', paddingRight: '0.6rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>15+</div>
            <div className="mono-meta" style={{ color: 'rgba(245,244,240,0.7)', fontSize: '0.62rem', marginTop: '0.3rem', letterSpacing: '0.12em' }}>Years of Experience</div>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.14)' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>120+</div>
            <div className="mono-meta" style={{ color: 'rgba(245,244,240,0.7)', fontSize: '0.62rem', marginTop: '0.3rem', letterSpacing: '0.12em' }}>Homes Delivered</div>
          </div>
        </div>
      </motion.div>

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
              color: 'rgba(245,244,240,0.78)',
              letterSpacing: '0.2em',
            }}
          >
            <span style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid rgba(243,178,95,0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-light)', display: 'inline-block' }} />
            </span>
            FLO VISUAL — {t.hero.badge}
          </motion.span>

          <motion.div
            key={lang}
            style={{ y: titleY, scale: titleScale, marginTop: '1.6rem' }}
          >
            <h1
              className="hero-title"
              style={{
                textShadow: '0 8px 60px rgba(0,0,0,0.45)',
                lineHeight: 0.92,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              {lines.map((line, i) => {
                const isGold = i === lines.length - 1;
                const isSmall = i === lines.length - 2;
                return (
                  <span
                    key={`${lang}-${i}`}
                    className="hero-title-line"
                    style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.14em', marginBottom: '-0.14em' }}
                  >
                    <motion.span
                      initial={{ y: '112%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.95, ease: EASE, delay: 0.45 + i * 0.11 }}
                      className={`${isGold ? 'hero-line-gold' : 'hero-line-white'}${isSmall ? ' hero-line-small' : ''}`}
                      style={{ display: 'inline-block', willChange: 'transform' }}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {line}
                    </motion.span>
                  </span>
                );
              })}
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
            <div style={{ width: '40px', height: '1px', background: 'var(--gold-light)' }} />
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
              className="hero-tagline"
              style={{
                color: 'rgba(245,244,240,0.88)',
                marginTop: 0,
              }}
            >
              {t.hero.tagline}
            </motion.p>
          </div>
        </div>

        {/* Explore CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.8, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}
        >
          <Link to="/work" className="explore-btn hero-glass">
            Explore Our Work
            <span className="explore-arrow">
              <ArrowRight size={18} className="rtl-flip" />
            </span>
          </Link>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <span
              className="mono-meta"
              style={{ color: 'var(--gold-light)', fontSize: '0.7rem', fontWeight: 600, border: '1px solid rgba(243,178,95,0.5)', borderRadius: 6, padding: '0.25rem 0.5rem', letterSpacing: '0.1em' }}
            >
              4K
            </span>
            <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.7)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>
              {t.hero.videoLabel.replace(/^(4K|CINE 4K)\s+/i, '')}
            </span>
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
              <ArrowDown size={15} style={{ color: 'var(--gold-light)' }} />
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
