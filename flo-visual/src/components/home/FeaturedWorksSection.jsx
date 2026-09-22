import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import ScrollReveal from '../ui/ScrollReveal';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

// An editorial arrangement — one exterior, one interior, one film — picked
// for the widest visual span, then composed asymmetrically rather than in a grid.
const PICKS = ['exterior-twilight-cinema', 'interior-grand-lobby', 'france-walkthrough']
  .map((slug) => PROJECTS.find((p) => p.slug === slug))
  .filter(Boolean);

const LAYOUT = [
  { col: 'span 12', height: 'clamp(52vh, 64vh, 720px)', parallax: 34, delay: 0 },
  { col: 'span 5', height: '48vh', parallax: 20, delay: 0.1 },
  { col: 'span 7', height: '50vh', parallax: 26, delay: 0.18 },
];

export default function FeaturedWorksSection() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();

  return (
    <section style={{ padding: 'clamp(4rem, 7vw, 7rem) 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}>
            <div>
              <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: 20, height: 1, background: 'var(--accent-light)' }} />
                {t.featured.dash}
              </span>
              <h2 className="section-heading-large">{t.featured.heading}</h2>
            </div>
            <Link to="/work" className="editorial-btn-ghost">
              {t.featured.all} <ArrowUpRight size={14} className="rtl-flip" />
            </Link>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(1.4rem, 2.4vw, 3rem)', rowGap: 'clamp(2rem, 4vw, 3.5rem)', alignItems: 'start', marginTop: '1.6rem' }}>
          {PICKS.map((project, i) => (
            <ScrollReveal
              key={project.slug}
              variant="up"
              delay={LAYOUT[i].delay}
              className="featured-item"
              style={{ gridColumn: LAYOUT[i].col, marginTop: i === 1 ? 'clamp(1.5rem, 3vw, 2.6rem)' : 0, minWidth: 0 }}
              as="div"
            >
              <WorkCard project={project} index={i} height={LAYOUT[i].height} parallax={LAYOUT[i].parallax} reduced={reduced} t={t} />
            </ScrollReveal>
          ))}
        </div>

        {/* Closing archive row — keeps the space after the cards editorial, not empty */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: 'clamp(2rem, 4vw, 3rem)', paddingTop: '1.2rem', borderTop: '1px solid var(--border-subtle)' }}>
          <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>
            {t.featured.label} — {String(PICKS.length).padStart(2, '0')} SELECTED
          </span>
          <Link to="/work" className="mono-meta hover-underline" style={{ color: 'var(--text-primary)', fontSize: '0.66rem', letterSpacing: '0.16em', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
            {t.featured.all} <ArrowUpRight size={13} className="rtl-flip" />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .featured-item { grid-column: span 12 !important; margin-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}

function WorkCard({ project, index, height, parallax, reduced, t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-parallax, parallax]);

  return (
    <div ref={ref} className="work-card" style={{ position: 'relative', height, overflow: 'hidden', background: 'var(--bg-secondary)' }}>
      <motion.div style={{ position: 'absolute', inset: '-7% 0', y, willChange: 'transform' }}>
        <img
          src={project.poster}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="work-card-media tone-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </motion.div>

      <div className="work-card-scrim" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(12,12,12,0.82) 100%)', pointerEvents: 'none' }} />

      <Link to={`/work/${project.slug}`} aria-label={`${project.title}`} className="work-card-overlay" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.4rem', textDecoration: 'none', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.7)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
            {String(index + 1).padStart(2, '0')} — {project.category}
          </span>
          <span className="work-card-arrow rtl-flip" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', background: 'rgba(245,244,240,0.12)', border: '1px solid rgba(245,244,240,0.4)', color: '#fff' }}>
            <ArrowUpRight size={17} />
          </span>
        </div>

        <div>
          <h3 className="display-headline work-card-title" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.8rem)', margin: 0, lineHeight: 0.98 }}>{project.title}</h3>
          <div className="work-card-view mono-meta" style={{ color: 'rgba(245,244,240,0.85)', fontSize: '0.64rem', letterSpacing: '0.18em', marginTop: '0.5rem' }}>
            {t.common.viewProject} <ArrowUpRight size={13} style={{ verticalAlign: 'middle' }} />
          </div>
        </div>
      </Link>
    </div>
  );
}