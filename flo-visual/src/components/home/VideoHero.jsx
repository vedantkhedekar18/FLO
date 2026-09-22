import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import CinematicVideo from '../media/CinematicVideo';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

export default function VideoHero() {
  const reduced = usePrefersReducedMotion();
  const { lang } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, reduced ? 1 : 0]);

  return (
    <section
      ref={sectionRef}
      className="full-viewport"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#0a0e14',
        overflow: 'hidden',
      }}
    >
      {/* 1. BACKGROUND CINEMATIC VIDEO / HIGH-RES COASTAL POSTER */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          scale: videoScale,
          opacity: videoOpacity,
          willChange: 'transform, opacity',
        }}
      >
        <CinematicVideo
          src="/assets/videos/France.mp4"
          poster="/assets/hero/coastal-hero.jpg"
          mode="background"
        />
      </motion.div>

      {/* 2. BRIGHTNESS BALANCING OVERLAYS — PRESERVES SUNLIT VIBRANCY */}
      {/* Top navbar subtle gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '220px',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.18) 55%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Localized bottom-left soft radial vignette behind typography for crisp legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 70% at 14% 62%, rgba(8, 14, 22, 0.62) 0%, rgba(8, 14, 22, 0.28) 50%, transparent 85%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Soft overall warm ambient grade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 65%, rgba(6, 10, 16, 0.5) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 3. HERO CONTENT CONTAINER — ELEVATED BOTTOM-LEFT ALIGNED */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 clamp(1.8rem, 4.5vw, 4.5rem) clamp(6.5rem, 21vh, 15.5rem)',
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '820px', textAlign: 'left' }}
        >
          {/* Main Headline: "Visualizing a better tomorrow." */}
          <h1
            style={{
              fontFamily: "var(--font-serif), 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(3.1rem, 6.6vw, 6.2rem)',
              lineHeight: 1.06,
              fontWeight: 400,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.015em',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.35)',
            }}
          >
            Visualizing
            <br />
            a better{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: '#c8a983',
                fontWeight: 400,
              }}
            >
              tomorrow.
            </span>
          </h1>

          {/* Subtitle: 2 lines uppercase tracked */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.72rem, 0.9vw, 0.84rem)',
              lineHeight: 1.85,
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.84)',
              margin: 'clamp(1.4rem, 2.4vw, 2rem) 0 0 0',
              maxWidth: '560px',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.4)',
            }}
          >
            ARCHITECTURAL VISUALIZATION, VIRTUAL TOURS
            <br />
            AND IMMERSIVE EXPERIENCES FOR THE BUILT WORLD.
          </p>

          {/* CTA Link: "EXPLORE OUR WORK →" */}
          <div style={{ marginTop: 'clamp(1.6rem, 2.6vw, 2.2rem)' }}>
            <a
              href="#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.76rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#ffffff',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.65)',
                paddingBottom: '5px',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c8a983';
                e.currentTarget.style.borderColor = '#c8a983';
                e.currentTarget.style.gap = '0.9rem';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.65)';
                e.currentTarget.style.gap = '0.65rem';
              }}
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowRight size={14} className="rtl-flip" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}