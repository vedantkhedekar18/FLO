import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';
import RevealText from '../ui/RevealText';

const EASE = [0.16, 1, 0.3, 1];

/**
 * EditorialShowcaseSection — a magazine-style image showcase.
 * Plates alternate between huge, layered, and full-bleed compositions while
 * the imagery slow-scales, reveals through clip-paths, and drifts with
 * parallax. This is where the real FLO renders become the star.
 */
export default function EditorialShowcaseSection() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();

  const aRef = useRef(null);
  const bRef = useRef(null);
  const cRef = useRef(null);

  const a = useScroll({ target: aRef, offset: ['start end', 'center center'] });
  const aScale = useTransform(a.scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.07]);
  const aY = useTransform(a.scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -10]);

  const b = useScroll({ target: bRef, offset: ['start end', 'end start'] });
  const bY = useTransform(b.scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30]);

  const c = useScroll({ target: cRef, offset: ['start end', 'end start'] });
  const cY = useTransform(c.scrollYProgress, [0, 1], reduced ? [0, 0] : [70, -70]);
  const cScale = useTransform(c.scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.08, 1, 1.08]);

  return (
    <section style={{ background: 'var(--bg-primary)', padding: 'clamp(3.5rem, 6vw, 5.5rem) 0 0' }}>
      {/* Intro row */}
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: 'clamp(1.6rem, 3vw, 2.5rem)' }}>
          <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: 20, height: 1, background: 'var(--accent-light)' }} />
            {t.showcase.dash}
          </span>
          <span className="section-label">{t.showcase.label}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(1.5rem, 3vw, 3rem)', alignItems: 'end', marginBottom: 'clamp(1.6rem, 3.2vw, 2.8rem)' }}>
          <h2 className="display-headline" style={{ gridColumn: 'span 8', color: 'var(--text-primary)', margin: 0 }}>
            {t.showcase.heading.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                <RevealText as="span" text={line} delay={0.05 + i * 0.18} />
              </span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            style={{ gridColumn: 'span 4', fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.85, color: 'var(--text-secondary)', margin: 0 }}
          >
            {t.showcase.sub}
          </motion.p>
        </div>
      </div>

      {/* Plate A — large exterior, full-bleed within the frame */}
      <div ref={aRef} className="container" style={{ paddingBlockEnd: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
        <motion.div
          initial={{ clipPath: 'inset(14% 6% 14% 6%)', opacity: 0.6 }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ width: '100%', position: 'relative', overflow: 'hidden' }}
        >
          <motion.img
            src="/assets/exterior/Final Road Side View.jpg"
            alt="FLO VISUAL — exterior render"
            loading="lazy"
            decoding="async"
            className="tone-image"
            style={{
              width: '100%',
              aspectRatio: '3/2',
              objectFit: 'cover',
              objectPosition: '50% 42%',
              display: 'block',
              scale: aScale,
              y: aY,
              willChange: 'transform',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              padding: '1.2rem 1.4rem',
              background: 'linear-gradient(180deg, transparent 60%, rgba(12,12,12,0.5) 100%)',
              pointerEvents: 'none',
            }}
          >
            <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.85)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>
              01 — {t.showcase.plateExterior}
            </span>
          </motion.div>
        </motion.div>

        {/* Editorial caption bar — keeps the gap under the big plate telling */}
        <div className="plate-meta" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.9rem', paddingTop: '0.9rem', borderTop: '1px solid var(--border-subtle)' }}>
          <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.6rem', letterSpacing: '0.18em' }}>
            {t.showcase.label} — 01
          </span>
          <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.6rem', letterSpacing: '0.18em' }}>
            FLO VISUAL ARCHIVE — CGI
          </span>
        </div>
      </div>

      {/* Plate B — asymmetric interior + floating exterior */}
      <div ref={bRef} className="container" style={{ paddingBlockEnd: 'clamp(2rem, 4vw, 3.5rem)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
          <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.6rem', letterSpacing: '0.18em' }}>
            SEQ — 02 / 03
          </span>
          <span className="mono-meta" style={{ color: 'var(--accent-light)', fontSize: '0.6rem', letterSpacing: '0.18em' }}>
            {t.showcase.label}
          </span>
        </div>
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.15, ease: EASE }}
          style={{ marginInlineStart: 'auto', width: '78%', position: 'relative', overflow: 'hidden' }}
        >
          <motion.img
            src="/assets/interior/Entrance Lobby.jpg"
            alt="FLO VISUAL — interior render"
            loading="lazy"
            decoding="async"
            className="tone-image"
            style={{
              width: '100%',
              aspectRatio: '16/10',
              objectFit: 'cover',
              objectPosition: '50% 42%',
              display: 'block',
              y: bY,
              scale: 1.08,
              willChange: 'transform',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '1.2rem 1.4rem',
              background: 'linear-gradient(180deg, transparent 58%, rgba(12,12,12,0.5) 100%)',
              pointerEvents: 'none',
            }}
          >
            <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.85)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>
              02 — {t.showcase.plateInterior}
            </span>
          </motion.div>
        </motion.div>

        {/* Floating portrait exterior overlapping the interior plate */}
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.95, delay: 0.25, ease: EASE }}
          style={{
            position: 'absolute',
            insetInlineStart: '2%',
            bottom: '-7%',
            width: '34%',
            maxWidth: 380,
            boxShadow: '0 30px 60px -18px rgba(20,20,20,0.35)',
            overflow: 'hidden',
          }}
        >
          <img
            src="/assets/exterior/Cam_7.jpg"
            alt="FLO VISUAL — exterior detail"
            loading="lazy"
            decoding="async"
            className="tone-image"
            style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }}
          />
        </motion.div>
      </div>

      {/* Plate C — full-bleed immersive interior */}
      <div ref={cRef} style={{ position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ clipPath: 'inset(10% 0 10% 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0% 0)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ position: 'relative', height: 'clamp(56vh, 68vh, 800px)' }}
        >
          <motion.img
            src="/assets/interior/Living&Dining Cam.jpg"
            alt="FLO VISUAL — full immersion interior"
            loading="lazy"
            decoding="async"
            className="tone-image"
            style={{
              position: 'absolute',
              inset: '-6% 0',
              width: '100%',
              height: '112%',
              objectFit: 'cover',
              objectPosition: '50% 45%',
              display: 'block',
              scale: cScale,
              y: cY,
              willChange: 'transform',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.42) 0%, transparent 34%, transparent 62%, rgba(12,12,12,0.62) 100%)', pointerEvents: 'none' }} />

          <div className="container" style={{ position: 'absolute', insetInline: 0, top: 0, height: '100%', display: 'flex', alignItems: 'flex-end', paddingBlockEnd: '2.4rem', paddingBlockStart: '2.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', width: '100%', flexWrap: 'wrap' }}>
              <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.7)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>
                03 — FULL IMMERSION
              </span>
              <h3 className="display-headline" style={{ color: '#fff', fontSize: 'clamp(1.4rem, 3vw, 2.5rem)', margin: 0, maxWidth: '12ch', textAlign: 'end' }}>
                <span style={{ display: 'block' }}>
                  <RevealText as="span" text={t.showcase.plateFull} delay={0.35} />
                </span>
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}