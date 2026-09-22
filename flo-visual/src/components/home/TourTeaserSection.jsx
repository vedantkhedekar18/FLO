import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass } from 'lucide-react';
import { TOURS } from '../../data/tours';
import TourViewer360 from '../tours/TourViewer360';
import ScrollReveal from '../ui/ScrollReveal';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

const EASE = [0.16, 1, 0.3, 1];

/**
 * TourTeaserSection — an honest demo of the 360 viewer, framed by a large
 * "STEP INSIDE." statement. No fabricated dialogs — palms, arrow, and the
 * live tour placeholder speak for themselves.
 */
export default function TourTeaserSection() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const tour = TOURS[0];
  if (!tour) return null;

  return (
    <section style={{ padding: 'clamp(4.5rem, 8vw, 7.5rem) 0', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
          <div>
            <span className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass size={13} /> {t.tours.dash}
            </span>
            <h2
              className="display-headline"
              style={{ margin: '1.2rem 0 0', maxWidth: '14ch', lineHeight: 0.95 }}
            >
              {t.tours.heading.split(' ').map((word, i) => (
                <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                  <motion.span
                    initial={{ y: '110%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, ease: EASE, delay: 0.1 + i * 0.1 }}
                    style={{ display: 'inline-block' }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              {!reduced && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
                  style={{ display: 'block', width: '3rem', height: 2, background: 'var(--accent-light)', marginTop: '1rem', transformOrigin: 'left' }}
                />
              )}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.4rem', paddingTop: '0.6rem' }}>
            <p className="mono-meta" style={{ maxWidth: '400px', color: 'var(--text-secondary)', fontSize: '0.7rem', lineHeight: 1.9, textTransform: 'none', letterSpacing: '0.03em', margin: 0 }}>
              {t.tours.sub}
            </p>
            <Link to="/360" className="editorial-btn-ghost" style={{ color: 'var(--text-primary)', borderColor: 'var(--text-muted)' }}>
              {t.tours.cta} <ArrowUpRight size={14} className="rtl-flip" />
            </Link>
          </div>
        </div>

        <ScrollReveal variant="scale">
          <TourViewer360 tour={tour} />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap', marginTop: '1.4rem' }}>
            <h3 className="font-display" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)', fontWeight: 600 }}>
              {tour.title}
            </h3>
            <p className="mono-meta" style={{ maxWidth: '460px', color: 'var(--text-secondary)', fontSize: '0.68rem', lineHeight: 1.9, textTransform: 'none', letterSpacing: '0.03em' }}>
              {tour.description}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}