import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Plus } from 'lucide-react';
import CinematicVideo from '../media/CinematicVideo';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';
import { NAV_LINKS } from '../../data/site';
import { LANGUAGES } from '../../data/translations';

const EASE = [0.16, 1, 0.3, 1];

// Home + primary links; the diamond mark splits them 3 / 3 in the pill.
const NAV_ITEMS = [{ key: 'home', to: '/' }, ...NAV_LINKS];

function Diamond() {
  return (
    <svg className="nav-diamond" width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect x="6.7" y="9.6" width="6" height="6" transform="rotate(45 9.7 12.6)" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13.3" y="9.6" width="6" height="6" transform="rotate(45 16.3 12.6)" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function VideoHero() {
  const reduced = usePrefersReducedMotion();
  const { t, isRTL, lang, changeLanguage } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, reduced ? 0 : -50]);

  const lines = t.hero.title;

  return (
    <section ref={sectionRef} className="full-viewport hero-frame" style={{ overflow: 'hidden' }}>
      {/* Notch clip shape — rounded card with a bottom-center cutout */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="hero-notch" clipPathUnits="objectBoundingBox">
            <path d="M0.014,0 L0.986,0 Q1,0 1,0.028 L1,0.972 Q1,1 0.986,1 L0.596,1 Q0.58,1 0.58,0.97 L0.58,0.93 Q0.58,0.9 0.564,0.9 L0.436,0.9 Q0.42,0.9 0.42,0.93 L0.42,0.97 Q0.42,1 0.404,1 L0.014,1 Q0,1 0,0.972 L0,0.028 Q0,0 0.014,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="hero-card">
        {/* Background video — clipped to the card shape */}
        <motion.div style={{ position: 'absolute', inset: 0, scale: videoScale }}>
          <CinematicVideo src="/assets/videos/France.mp4" poster="/assets/exterior/14.jpg" mode="background" />
        </motion.div>

        <div className="hero-scrim" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '240px', background: 'linear-gradient(180deg, rgba(7,14,28,0.55), transparent)', pointerEvents: 'none' }} />

        {/* Top-right vertical label + coordinates */}
        <motion.div
          className="hero-corner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <div className="mono-meta" style={{ color: 'rgba(245,244,240,0.85)', fontSize: '0.72rem', lineHeight: 1.9, letterSpacing: '0.24em' }}>
            IDEAS<br />TO<br /><span style={{ color: 'var(--gold-light)' }}>SPACES</span>
          </div>
          <div className="mono-meta" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '2rem', color: 'rgba(245,244,240,0.7)', fontSize: '0.68rem', letterSpacing: '0.14em' }}>
            <Plus size={13} style={{ marginTop: 2, color: 'var(--gold-light)' }} />
            <span>43.7102° N<br />7.2620° E</span>
          </div>
        </motion.div>

        {/* Mid-right floating stat card */}
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

        {/* Card content */}
        <div className="hero-inner">
          {/* Row 1 — in-card navbar */}
          <div className="hero-incard-nav">
            <Link
              to="/"
              style={{
                textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'baseline',
                gap: '0.45rem', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem',
                letterSpacing: '0.18em', textTransform: 'uppercase', textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}
            >
              FLO<span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>VISUAL</span>
            </Link>

            <nav className="nav-pill hero-glass">
              {NAV_ITEMS.map((link, i) => {
                const label = link.key === 'home' ? (t.nav.home || 'Home') : t.nav[link.key];
                const active = link.key === 'home';
                return (
                  <span key={link.key} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.7rem' }}>
                    {i === 3 && <Diamond />}
                    <Link to={link.to} className={active ? 'active' : ''}>
                      {active && <span className="nav-dot" />}
                      {label}
                    </Link>
                  </span>
                );
              })}
            </nav>

            <div className="hero-lang">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLanguage(l.code)}
                  className={l.code === lang ? 'active' : ''}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2 — headline block */}
          <motion.div style={{ y: contentY, opacity: contentOpacity }}>
            <motion.span
              className="mono-meta"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem', color: 'rgba(245,244,240,0.78)', letterSpacing: '0.2em' }}
            >
              <span style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid rgba(243,178,95,0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-light)', display: 'inline-block' }} />
              </span>
              FLO VISUAL — {t.hero.badge}
            </motion.span>

            <motion.div key={lang} style={{ y: titleY, marginTop: '1.4rem' }}>
              <h1 className="hero-title" style={{ textShadow: '0 8px 60px rgba(0,0,0,0.45)', lineHeight: 0.92, margin: 0 }}>
                {lines.map((line, i) => {
                  const isGold = i === lines.length - 1;
                  const isSmall = i === lines.length - 2;
                  return (
                    <span key={`${lang}-${i}`} className="hero-title-line" style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', marginTop: '1.5rem' }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--gold-light)' }} />
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
                className="hero-tagline"
                style={{ color: 'rgba(245,244,240,0.88)', marginTop: 0 }}
              >
                {t.hero.tagline}
              </motion.p>
            </div>
          </motion.div>

          {/* Row 3 — footer meta with centered CTA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <span className="mono-meta" style={{ color: 'var(--gold-light)', fontSize: '0.7rem', fontWeight: 600, border: '1px solid rgba(243,178,95,0.5)', borderRadius: 6, padding: '0.25rem 0.5rem', letterSpacing: '0.1em' }}>
                4K
              </span>
              <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.7)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>
                {t.hero.videoLabel.replace(/^(4K|CINE 4K)\s+/i, '')}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.8, ease: EASE }}
              style={{ marginBottom: 'clamp(2.2rem, 4vh, 3.4rem)' }}
            >
              <Link to="/work" className="explore-btn hero-glass">
                Explore Our Work
                <span className="explore-arrow">
                  <ArrowRight size={18} className="rtl-flip" />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
            >
              <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.6)', fontSize: '0.6rem', letterSpacing: '0.22em' }}>{t.hero.scroll}</span>
              <span style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(243,178,95,0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.span
                  animate={reduced ? undefined : { y: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ display: 'inline-flex' }}
                >
                  <ArrowDown size={15} style={{ color: 'var(--gold-light)' }} />
                </motion.span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
