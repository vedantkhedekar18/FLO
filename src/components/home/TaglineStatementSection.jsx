import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';
import { SITE } from '../../data/site';

const EASE = [0.16, 1, 0.3, 1];

/**
 * TaglineStatementSection — the brand statement that bridges the dark hero
 * into the light editorial page. Large typography on one side, a tall
 * architectural plate that reveals itself (clip + parallax) on the other.
 */
export default function TaglineStatementSection() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [44, -44]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1.05, 1.05, 1.05] : [1.16, 1.05, 1.16]);
  const dashNo = (t.aboutTeaser.dash.match(/^\d\d/) || ['03'])[0];

  return (
    <section
      ref={ref}
      style={{ background: 'var(--bg-primary)', padding: 'clamp(4rem, 6.5vw, 6rem) 0' }}
    >
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'clamp(1.6rem, 3vw, 2.4rem)', flexWrap: 'wrap', gap: '1rem', gridColumn: '1 / -1' }}>
          <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: 20, height: 1, background: 'var(--accent-light)' }} />
            {t.aboutTeaser.dash}
          </span>
          <span className="section-label">{t.aboutTeaser.label}</span>
        </div>

        <div className="statement-grid">
          <div className="statement-copy" style={{ position: 'relative' }}>
            <span aria-hidden="true" className="statement-ghost">{dashNo}</span>
            <motion.h2
              className="tagline-statement"
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ color: 'var(--text-primary)', lineHeight: 1.02 }}
            >
              {t.hero.tagline}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
              style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: 'clamp(1.5rem, 2.6vw, 2.2rem)', alignItems: 'end' }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.9, color: 'var(--text-secondary)', maxWidth: '520px', margin: 0 }}>
                {SITE.about}
              </p>
              <Link to="/about" className="editorial-btn-ghost" style={{ justifySelf: 'start', color: 'var(--text-primary)', borderColor: 'var(--text-muted)' }}>
                {t.aboutTeaser.cta} <ArrowUpRight size={14} className="rtl-flip" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="statement-art"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{ clipPath: 'inset(0 0 100% 0)' }}
          >
            <motion.img
              src="/assets/exterior/GI_1.jpg"
              alt="FLO VISUAL — exterior study"
              loading="lazy"
              decoding="async"
              className="tone-image"
              style={{
                width: '100%',
                height: '58vh',
                minHeight: 400,
                objectFit: 'cover',
                objectPosition: '50% 38%',
                display: 'block',
                y: imgY,
                scale: imgScale,
                willChange: 'transform',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.1rem 1.2rem',
                background: 'linear-gradient(180deg, transparent 55%, rgba(12,12,12,0.55) 100%)',
                pointerEvents: 'none',
              }}
            >
              <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.85)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>
                FLO VISUAL — {t.aboutTeaser.label}
              </span>
            </div>

            <span
              aria-hidden="true"
              className="mono-meta"
              style={{ position: 'absolute', bottom: '0.9rem', insetInlineEnd: '1.2rem', color: 'rgba(245,244,240,0.55)', fontSize: '0.58rem', letterSpacing: '0.22em' }}
            >
              / {dashNo}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}