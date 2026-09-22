import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import ParallaxImage from '../components/media/ParallaxImage';
import ScrollReveal from '../components/ui/ScrollReveal';
import { TOURS } from '../data/tours';

export default function ToursIndex() {
  return (
    <PageTransition>
      <section style={{ paddingTop: '7rem', paddingBottom: '5.5rem', background: 'var(--bg-primary)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ marginBottom: '3.5rem' }}>
              <span className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Compass size={13} /> 360° VIRTUAL TOURS — {String(TOURS.length).padStart(2, '0')} SPACES
              </span>
              <h1 className="display-headline" style={{ marginTop: '0.6rem' }}>Step Inside<br />The Building</h1>
              <p className="mono-meta" style={{ maxWidth: '480px', color: 'var(--text-secondary)', fontSize: '0.72rem', lineHeight: 1.9, marginTop: '1.4rem', textTransform: 'none', letterSpacing: '0.03em' }}>
                Spherical environments you navigate by looking around — each 360° tour connects to a real host URL once available. Until then, the viewer shows an honest demo state.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '3rem' }}>
            {TOURS.map((tour, i) => (
              <ScrollReveal key={tour.slug} variant="up" delay={i * 0.1} className="tour-card" style={{ gridColumn: i % 2 === 0 ? 'span 7' : 'span 5' }}>
                <Link to={`/360/${tour.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <ParallaxImage src={tour.poster} alt={tour.title} speed={i % 2 === 0 ? 24 : 14} style={{ height: i % 2 === 0 ? '54vh' : '42vh' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginTop: '1.1rem' }}>
                    <div>
                      <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.01em' }}>{tour.title}</h2>
                      <div className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.66rem', marginTop: '0.35rem' }}>
                        {tour.location} · {tour.category}
                      </div>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                      <span className="mono-meta" style={{ fontSize: '0.66rem', letterSpacing: '0.14em' }}>ENTER</span>
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                  {!tour.tourUrl && i === 0 && (
                    <span className="demo-badge" style={{ marginTop: '0.9rem' }}>
                      TOUR EMBED PENDING
                    </span>
                  )}
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .tour-card { grid-column: span 12 !important; }
          }
        `}</style>
      </section>
    </PageTransition>
  );
}