import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CAPABILITIES } from '../../data/capabilities';
import CinematicVideo from '../media/CinematicVideo';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

const EASE = [0.16, 1, 0.3, 1];

/**
 * CapabilitiesSection — large editorial list, not a services grid.
 * Hovering a row cross-fades a floating media preview (image or video),
 * clipped and scaled like a new camera angle arriving in the frame.
 */
export default function CapabilitiesSection() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(CAPABILITIES[0].id);
  const active = CAPABILITIES.find((c) => c.id === activeId);
  const activeLocal = active ? (t.capabilities.items[active.id] || {}) : {};

  return (
    <section style={{ padding: '5rem 0 6rem', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: 20, height: 1, background: 'var(--accent-light)' }} />
              {t.capabilities.dash}
            </span>
            <h2 className="section-heading-large">{t.capabilities.heading}</h2>
          </div>
          <p className="mono-meta" style={{ maxWidth: '380px', color: 'var(--text-secondary)', fontSize: '0.72rem', lineHeight: 1.9, textTransform: 'none', letterSpacing: '0.03em' }}>
            {t.capabilities.description}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem' }} className="capabilities-grid">
          <div style={{ gridColumn: 'span 7' }}>
            {CAPABILITIES.map((cap) => {
              const localized = t.capabilities.items[cap.id];
              return (
                <Link
                  key={cap.id}
                  to={cap.to}
                  className="capability-row"
                  onMouseEnter={() => setActiveId(cap.id)}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <span className="capability-number">{cap.index}</span>
                  <span className="capability-title">{localized?.title || cap.title}</span>
                  <span className="capability-tag mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.66rem', letterSpacing: '0.08em', textTransform: 'none', maxWidth: '260px', display: 'block' }}>
                    <span className="capability-tagline">{localized?.tagline || cap.tagline}</span>
                  </span>
                  <span className="capability-arrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.12em' }}>
                    <span className="capability-arrow-label mono-meta">{t.common.view}</span>
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>

          <div style={{ gridColumn: 'span 5' }} className="capability-preview-col">
            <div style={{ position: 'sticky', top: '6.5rem' }}>
              <div className="media-frame" style={{ height: 'min(62vh, 560px)' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active?.id}
                    initial={reduced ? { opacity: 0 } : { opacity: 1, clipPath: 'inset(0 0 100% 0)', scale: 1.06 }}
                    animate={reduced ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0% 0 0% 0)', scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(100% 0 0 0)', scale: 1.02 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    style={{ height: '100%', width: '100%' }}
                  >
                    {active?.media?.type === 'video' ? (
                      <CinematicVideo
                        src={active.media.src}
                        poster={active.media.poster}
                        mode="background"
                      />
                    ) : (
                      <img
                        src={active?.media?.src}
                        alt={active?.title}
                        loading="lazy"
                        decoding="async"
                        className="tone-image"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem 1.2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'linear-gradient(180deg, rgba(12,12,12,0.6), transparent)',
                  }}
                >
                  <span className="mono-meta" style={{ color: '#fff', fontSize: '0.6rem', letterSpacing: '0.16em' }}>
                    {active?.category || ''}
                  </span>
                  <span className="mono-meta" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.6rem' }}>
                    {active?.index || ''} / {String(CAPABILITIES.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
              <p className="mono-meta" style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.64rem', textTransform: 'none', letterSpacing: '0.04em' }}>
                {t.capabilities.hint}
              </p>

              {/* Active title + ghost index — anchors the sticky preview column */}
              <div style={{ position: 'relative', marginTop: '1.1rem', paddingBottom: '1.2rem' }}>
                <span aria-hidden="true" className="capability-ghost">{active?.index}</span>
                <span className="mono-meta" style={{ position: 'relative', color: 'var(--text-secondary)', fontSize: '0.7rem', letterSpacing: '0.16em', display: 'block' }}>
                  {activeLocal?.title || active?.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .capability-row:hover .capability-arrow { color: var(--text-primary); }
        .capability-row:hover .capability-tagline { color: var(--text-secondary); }

        @media (max-width: 1024px) {
          .capabilities-grid { grid-template-columns: minmax(0, 1fr) !important; }
          .capabilities-grid > div { grid-column: 1 / -1 !important; }
          .capability-title { font-size: clamp(1.4rem, 5.5vw, 2.2rem) !important; }
          .capability-tagline { display: none; }
          .capability-preview-col { display: none; }
        }
      `}</style>
    </section>
  );
}