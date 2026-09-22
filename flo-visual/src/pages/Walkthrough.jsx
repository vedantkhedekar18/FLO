import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import CinematicVideo from '../components/media/CinematicVideo';
import ParallaxImage from '../components/media/ParallaxImage';
import ScrollReveal from '../components/ui/ScrollReveal';
import { getWalkthrough, getAdjacentWalkthroughs, WALKTHROUGHS } from '../data/walkthroughs';

export default function Walkthrough() {
  const { slug } = useParams();
  const walk = getWalkthrough(slug);
  if (!walk) return <Navigate to="/work" replace />;

  const { prev, next } = getAdjacentWalkthroughs(slug);

  return (
    <PageTransition>
      {/* Cinematic title header */}
      <section style={{ background: 'var(--bg-ink)', color: '#f5f4f0', paddingTop: '7rem' }}>
        <div className="container">
          <ScrollReveal variant="up">
            <span className="mono-meta" style={{ color: 'var(--accent-light)', fontSize: '0.66rem', letterSpacing: '0.24em' }}>
              CINEMATIC WALKTHROUGH — {walk.category}
            </span>
            <h1 className="display-headline" style={{ color: '#fff', marginTop: '1.1rem', maxWidth: '18ch' }}>{walk.title}</h1>
            <div className="mono-meta" style={{ color: 'rgba(245,244,240,0.6)', marginTop: '1rem', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
              {walk.client} · {walk.aspect} · {walk.year}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The player — cinematic, full-width */}
      <section style={{ background: 'var(--bg-ink)', padding: '2.5rem 0 3rem' }}>
        <ScrollReveal variant="clip">
          <div className="container">
            <div style={{ aspectRatio: '16/8' }}>
              <CinematicVideo src={walk.videoUrl} poster={walk.poster} mode="player" title={walk.title} />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Description + credits */}
      <section style={{ background: 'var(--bg-ink)', color: '#f5f4f0', padding: '1.5rem 0 5rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '3rem' }}>
          <ScrollReveal variant="up" className="walk-desc" style={{ gridColumn: 'span 7' }}>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.9, color: 'rgba(245,244,240,0.92)', maxWidth: '640px' }}>
              {walk.description}
            </p>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={0.15} className="walk-credits" style={{ gridColumn: 'span 5' }}>
            <span className="section-label" style={{ color: 'rgba(245,244,240,0.55)' }}>CREDITS</span>
            <div style={{ borderTop: '1px solid rgba(245,244,240,0.14)' }}>
              {walk.credits.map((c) => (
                <div key={c.role} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.9rem 0', borderBottom: '1px solid rgba(245,244,240,0.14)' }}>
                  <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.55)', fontSize: '0.64rem', letterSpacing: '0.14em' }}>{c.role.toUpperCase()}</span>
                  <span className="mono-meta" style={{ color: '#fff', fontSize: '0.7rem' }}>{c.name}</span>
                </div>
              ))}
            </div>
            <Link to="/work" className="editorial-btn-ghost" style={{ marginTop: '2rem', color: '#fff', borderColor: 'rgba(245,244,240,0.4)' }}>
              BACK TO WORKS <ArrowUpRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Frames */}
      {walk.gallery && walk.gallery.length > 0 && (
        <section style={{ background: 'var(--bg-primary)', padding: '5rem 0' }}>
          <div className="container">
            <ScrollReveal>
              <span className="section-label">STILLS FROM THE FILM</span>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '2.5rem', marginTop: '2.5rem' }}>
              {walk.gallery.map((img, i) => (
                <ScrollReveal key={img + i} variant="clipUp" delay={i * 0.1} className="walk-frame" style={{ gridColumn: i === 0 ? 'span 7' : 'span 5' }}>
                  <ParallaxImage src={img} alt={`${walk.title} — still ${i + 1}`} speed={i % 2 === 0 ? 22 : 14} style={{ height: i === 0 ? '50vh' : '40vh' }} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev/next + more films */}
      <section style={{ background: 'var(--bg-primary)', paddingBottom: '5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', paddingTop: '2rem' }}>
          {prev ? (
            <Link to={`/walkthroughs/${prev.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>← PREVIOUS FILM</span>
              <div className="font-display" style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.4rem' }}>{prev.title}</div>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/walkthroughs/${next.slug}`} style={{ textDecoration: 'none', color: 'inherit', textAlign: 'right' }}>
              <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>NEXT FILM →</span>
              <div className="font-display" style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.4rem' }}>{next.title}</div>
            </Link>
          ) : <span />}
        </div>

        <div className="container" style={{ marginTop: '3.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <span className="section-label">ALL WALKTHROUGHS</span>
            <Link to="/walkthroughs" className="mono-meta hover-underline" style={{ color: 'var(--text-secondary)', fontSize: '0.66rem', letterSpacing: '0.14em', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
              ANIMATION ARCHIVE <ArrowUpRight size={13} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-subtle)' }}>
            {WALKTHROUGHS.map((w) => (
              <Link
                key={w.slug}
                to={`/walkthroughs/${w.slug}`}
                className="capability-row"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="capability-title" style={{ fontSize: 'clamp(1.3rem, 3vw, 2.4rem)' }}>{w.title}</span>
                <span className="capability-arrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                  <span className="mono-meta" style={{ fontSize: '0.66rem', letterSpacing: '0.14em' }}>PLAY</span>
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .walk-desc, .walk-credits, .walk-frame { grid-column: span 12 !important; }
        }
      `}</style>
    </PageTransition>
  );
}