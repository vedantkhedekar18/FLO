import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowUpRight, Compass } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import TourViewer360 from '../components/tours/TourViewer360';
import ParallaxImage from '../components/media/ParallaxImage';
import ScrollReveal from '../components/ui/ScrollReveal';
import { getTour, TOURS } from '../data/tours';

export default function TourDetail() {
  const { slug } = useParams();
  const tour = getTour(slug);
  if (!tour) return <Navigate to="/360" replace />;

  return (
    <PageTransition>
      <section style={{ background: 'var(--bg-ink)', color: '#f5f4f0', paddingTop: '7rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <ScrollReveal variant="up">
            <span className="mono-meta" style={{ color: 'var(--accent-light)', fontSize: '0.66rem', letterSpacing: '0.24em' }}>
              360° VIRTUAL TOUR — {tour.location}
            </span>
            <h1 className="display-headline" style={{ color: '#fff', marginTop: '1rem', maxWidth: '18ch' }}>{tour.title}</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* The viewer */}
      <section style={{ background: 'var(--bg-ink)', paddingBottom: '5rem' }}>
        <ScrollReveal variant="clip">
          <div className="container">
            <TourViewer360 tour={tour} />
            <div style={{ marginTop: '1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.65)', fontSize: '0.64rem', letterSpacing: '0.14em' }}>
                DRAG / TOUCH TO LOOK · ZOOM WHERE SUPPORTED · FULLSCREEN AVAILABLE
              </span>
              {!tour.tourUrl ? (
                <span className="demo-badge" style={{ color: 'rgba(245,244,240,0.85)', borderColor: 'rgba(245,244,240,0.35)' }}>
                  PROTOTYPE — CONNECT SOURCE IN data/tours.js
                </span>
              ) : (
                <span className="mono-meta" style={{ color: '#c8a97e', fontSize: '0.64rem' }}>LIVE 360 SOURCE ACTIVE</span>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Description */}
      <section style={{ background: 'var(--bg-primary)', padding: '5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '3rem' }}>
          <ScrollReveal variant="up" className="tour-desc" style={{ gridColumn: 'span 7' }}>
            <span className="section-label">ABOUT THIS TOUR</span>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.85, color: 'var(--text-primary)', maxWidth: '620px' }}>{tour.description}</p>
            <Link to="/360" className="editorial-btn-ghost" style={{ marginTop: '2rem' }}>
              ALL 360° TOURS <ArrowUpRight size={14} />
            </Link>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={0.12} className="tour-gallery" style={{ gridColumn: 'span 5' }}>
            <span className="section-label">REFERENCE FRAMES</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {tour.gallery.map((img, i) => (
                <ParallaxImage key={img} src={img} alt={`${tour.title} — ${i + 1}`} speed={i % 2 === 0 ? 12 : 20} style={{ height: i === 0 ? '32vh' : '24vh' }} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* More tours */}
      <section style={{ background: 'var(--bg-primary)', paddingBottom: '5.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <span className="section-label">MORE 360° SPACES</span>
          {TOURS.filter((t) => t.slug !== slug).map((t) => (
            <Link
              key={t.slug}
              to={`/360/${t.slug}`}
              className="capability-row"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span className="capability-title" style={{ fontSize: 'clamp(1.3rem, 3vw, 2.4rem)' }}>{t.title}</span>
              <span className="capability-arrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                <span className="mono-meta" style={{ fontSize: '0.66rem', letterSpacing: '0.14em' }}>ENTER</span>
                <Compass size={15} />
              </span>
            </Link>
          ))}
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .tour-desc, .tour-gallery { grid-column: span 12 !important; }
          }
        `}</style>
      </section>
    </PageTransition>
  );
}