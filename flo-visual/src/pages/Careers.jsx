import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import ParallaxImage from '../components/media/ParallaxImage';
import ScrollReveal from '../components/ui/ScrollReveal';
import RevealText from '../components/ui/RevealText';
import { useLanguage } from '../i18n/LanguageContext';
import { SITE } from '../data/site';

// Real open positions. Titles are role names and are kept identical in every
// language. No descriptions, salary, location or deadlines are published here.
const POSITIONS = [
  '3D Artist Exterior/Interior',
  'Senior Architectural Visualization Artist',
  'Product/Model-Making Artist',
  'Project Manager',
  'Post Production',
];

export default function Careers() {
  const { t } = useLanguage();

  return (
    <PageTransition>
      {/* Editorial header — compact studio intro */}
      <section style={{ paddingTop: '7rem', paddingBottom: '3.5rem', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="careers-header" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 'clamp(1.5rem, 3vw, 3rem)' }}>
            <ScrollReveal style={{ gridColumn: 'span 3' }}>
              <span className="section-label">{t.careersPage.kicker}</span>
            </ScrollReveal>
            <div style={{ gridColumn: 'span 9', minWidth: 0 }}>
              <h1 className="display-headline" style={{ margin: 0 }}>
                {t.careersPage.heading.map((line, i) => (
                  <span key={i} style={{ display: 'block' }}>
                    <RevealText as="span" text={line} delay={i * 0.2} />
                  </span>
                ))}
              </h1>
              <ScrollReveal delay={0.15}>
                <p className="mono-meta" style={{ maxWidth: '520px', color: 'var(--text-secondary)', fontSize: '0.74rem', lineHeight: 1.9, marginTop: '1.6rem', textTransform: 'none', letterSpacing: '0.03em' }}>
                  {t.careersPage.intro}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .careers-header > div { grid-column: span 12 !important; }
          }
        `}</style>
      </section>

      {/* Full-bleed studio band */}
      <section style={{ position: 'relative' }}>
        <ScrollReveal variant="clip">
          <ParallaxImage
            src="/assets/exterior/MNF_AB_Back_03_Final.jpg"
            alt="FLO VISUAL — the studio at work"
            speed={16}
            style={{ height: 'clamp(38vh, 48vh, 560px)' }}
          />
        </ScrollReveal>
        <div style={{ position: 'absolute', insetInlineEnd: 'clamp(1.25rem, 3.5vw, 3.5rem)', bottom: '1.1rem', zIndex: 2 }}>
          <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.8)', fontSize: '0.58rem', letterSpacing: '0.22em', textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
            FLO VISUAL — STUDIO
          </span>
        </div>
      </section>

      {/* Open positions — editorial list on the left, contact route on the right */}
      <section style={{ background: 'var(--bg-primary)', padding: 'clamp(3rem, 5.5vw, 5rem) 0 5.5rem' }}>
        <div className="container">
          <div className="careers-openings" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'start' }}>
            {/* Positions list */}
            <ScrollReveal variant="up" className="careers-positions-col" style={{ gridColumn: 'span 7', minWidth: 0 }}>
              <span className="section-label" style={{ marginBottom: '1.4rem' }}>{t.careersPage.positions}</span>
              <div>
                {POSITIONS.map((role, i) => (
                  <div key={role} className="careers-position">
                    <span className="capability-number" style={{ width: '2.6rem' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="careers-position-title">{role}</span>
                    <span className="careers-position-arrow" aria-hidden="true">
                      <ArrowUpRight size={16} className="rtl-flip" />
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Contact route */}
            <ScrollReveal variant="up" delay={0.12} className="careers-aside-col" style={{ gridColumn: 'span 5', minWidth: 0 }}>
              <p className="mono-meta" style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', lineHeight: 2, textTransform: 'none', letterSpacing: '0.03em', margin: 0, maxWidth: '380px' }}>
                {t.careersPage.note}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
                <Link to="/contact" className="editorial-btn-ghost" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-medium)' }}>
                  {t.careersPage.cta} <ArrowUpRight size={14} className="rtl-flip" />
                </Link>
                <a href={`mailto:${SITE.email}`} className="mono-meta hover-underline" style={{ color: 'var(--text-secondary)', fontSize: '0.64rem', letterSpacing: '0.14em', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', textDecoration: 'none' }}>
                  <Mail size={12} />
                  {SITE.email}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <style>{`
          .careers-position {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr) auto;
            align-items: center;
            gap: clamp(0.8rem, 2vw, 1.6rem);
            padding: clamp(0.9rem, 1.8vw, 1.25rem) 0;
            border-top: 1px solid var(--border-subtle);
            cursor: default;
          }
          .careers-position:last-child { border-bottom: 1px solid var(--border-subtle); }
          .careers-position-title {
            font-family: var(--font-display);
            font-size: clamp(1.05rem, 2.1vw, 1.6rem);
            font-weight: 600;
            letter-spacing: -0.02em;
            line-height: 1.15;
            color: var(--text-primary);
            transition: transform 0.45s var(--transition-smooth), color 0.45s var(--transition-smooth);
          }
          .careers-position-arrow {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: var(--text-muted);
            opacity: 0;
            transform: translateX(-0.5rem);
            transition: opacity 0.45s var(--transition-smooth), transform 0.45s var(--transition-smooth), color 0.45s var(--transition-smooth);
          }
          .careers-position:hover .careers-position-title { transform: translateX(0.5rem); color: var(--accent); }
          .careers-position:hover .careers-position-arrow { opacity: 1; transform: translateX(0); color: var(--accent); }
          html[dir='rtl'] .careers-position:hover .careers-position-title { transform: translateX(-0.5rem); }
          html[dir='rtl'] .careers-position-arrow { transform: translateX(0.5rem); }
          html[dir='rtl'] .careers-position:hover .careers-position-arrow { transform: translateX(0); }
          @media (prefers-reduced-motion: reduce) {
            .careers-position-title, .careers-position-arrow { transition: none; }
          }
          @media (max-width: 1024px) {
            .careers-positions-col, .careers-aside-col { grid-column: span 12 !important; }
          }
        `}</style>
      </section>
    </PageTransition>
  );
}
