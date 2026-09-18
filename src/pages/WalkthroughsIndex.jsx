import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import ArchiveVideo from '../components/media/ArchiveVideo';
import ParallaxImage from '../components/media/ParallaxImage';
import ScrollReveal from '../components/ui/ScrollReveal';
import { WALKTHROUGHS } from '../data/walkthroughs';

const SUPPORT_STILLS = [
  '/assets/exterior/14.jpg',
  '/assets/exterior/15.jpg',
  '/assets/exterior/1.jpg',
  '/assets/exterior/View-1.jpg',
  '/assets/exterior/View-3.jpg',
  '/assets/interior/Grand lobby_05_HR.jpg',
];

const STILL_SPANS = [7, 5, 5, 7, 7, 5];
const STILL_HEIGHTS = ['48vh', '36vh', '36vh', '44vh', '44vh', '38vh'];

export default function WalkthroughsIndex() {
  return (
    <PageTransition>
      <section style={{ background: 'var(--bg-ink)', color: '#f5f4f0', paddingTop: '7rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <ScrollReveal variant="up">
            <span className="mono-meta" style={{ color: 'var(--accent-light)', fontSize: '0.66rem', letterSpacing: '0.24em' }}>
              ANIMATION ARCHIVE — {String(WALKTHROUGHS.length).padStart(2, '0')} FILM
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 0.98, letterSpacing: '-0.035em', textTransform: 'uppercase', margin: '1.1rem 0 0' }}>
              FILMS IN MOTION
            </h1>
            <p className="mono-meta" style={{ maxWidth: '520px', color: 'rgba(245,244,240,0.62)', fontSize: '0.72rem', lineHeight: 1.9, marginTop: '1.5rem', textTransform: 'none', letterSpacing: '0.03em' }}>
              One continuous camera path edited to light, material and season — every film below is real FLO VISUAL media, played muted and paused when far off-screen. Click any frame to open the dedicated experience.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ background: 'var(--bg-ink)', paddingBottom: '5rem' }}>
        <div className="container" style={{ display: 'grid', gap: '5rem' }}>
          {WALKTHROUGHS.map((walk, i) => (
            <ScrollReveal key={walk.slug} variant="clip" delay={i * 0.05}>
              <article>
                <Link
                  to={`/walkthroughs/${walk.slug}`}
                  className="archive-film"
                  style={{ position: 'relative', display: 'block', aspectRatio: '21 / 9', overflow: 'hidden', background: '#000', textDecoration: 'none' }}
                  aria-label={`Play ${walk.title}`}
                >
                  <ArchiveVideo src={walk.videoUrl} poster={walk.poster} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.44) 0%, transparent 38%, transparent 60%, rgba(12,12,12,0.66) 100%)', pointerEvents: 'none' }} />
                  <span aria-hidden="true" style={{ position: 'absolute', top: '1rem', insetInlineStart: '1.2rem' }}>
                    <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.9)', fontSize: '0.6rem', letterSpacing: '0.22em' }}>
                      {walk.category} — PLAY FILM
                    </span>
                  </span>
                  <span className="archive-play" aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 72, height: 72, borderRadius: '50%', background: 'rgba(245,244,240,0.14)', border: '1px solid rgba(245,244,240,0.55)', backdropFilter: 'blur(8px)', transition: 'opacity 0.3s ease, transform 0.35s ease', opacity: 0.7, transform: 'scale(0.96)' }}>
                      <span style={{ display: 'grid', placeItems: 'center', color: '#f5f4f0' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="9.5,7.5 16.5,12 9.5,16.5" /></svg>
                      </span>
                    </span>
                  </span>
                  <span aria-hidden="true" style={{ position: 'absolute', bottom: '1rem', insetInlineEnd: '1.2rem' }}>
                    <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.7)', fontSize: '0.56rem', letterSpacing: '0.18em' }}>
                      16:9 — {walk.year}
                    </span>
                  </span>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginTop: '1.2rem' }}>
                  <div>
                    <h2 className="font-display" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 600, letterSpacing: '-0.01em', color: '#f5f4f0' }}>{walk.title}</h2>
                    <div className="mono-meta" style={{ color: 'rgba(245,244,240,0.48)', fontSize: '0.64rem', marginTop: '0.3rem' }}>
                      {walk.client} · {walk.year} · {walk.category}
                    </div>
                  </div>
                  <Link to={`/walkthroughs/${walk.slug}`} className="editorial-btn-ghost" style={{ marginTop: '0.4rem', color: '#f5f4f0', borderColor: 'rgba(245,244,240,0.28)' }}>
                    OPEN FILM <ArrowUpRight size={14} />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--bg-primary)', padding: '5.5rem 0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              <span className="section-label">SUPPORTING IMAGERY — FLO VISUAL ARCHIVE</span>
              <Link to="/work?category=ANIMATION" className="mono-meta hover-underline" style={{ color: 'var(--text-secondary)', fontSize: '0.66rem', letterSpacing: '0.14em', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
                VIEW ANIMATION IN THE WORK CATEGORY <ArrowUpRight size={13} />
              </Link>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '2rem' }}>
            {SUPPORT_STILLS.map((img, i) => (
              <ScrollReveal key={img} variant={i % 3 === 0 ? 'clip' : 'clipUp'} delay={i * 0.06} className="archive-still" style={{ gridColumn: `span ${STILL_SPANS[i]}` }}>
                <ParallaxImage src={img} alt={`FLO Visual archive still ${i + 1}`} speed={i % 2 === 0 ? 22 : 14} style={{ height: STILL_HEIGHTS[i] }} />
              </ScrollReveal>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .archive-film { aspect-ratio: 16 / 9 !important; }
            .archive-still { grid-column: span 12 !important; }
          }
        `}</style>
      </section>

      <section style={{ background: 'var(--bg-ink)', color: '#f5f4f0', padding: '5.5rem 0', borderTop: '1px solid rgba(245,244,240,0.1)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <ScrollReveal variant="up" style={{ gridColumn: 'span 7' }}>
            <span className="mono-meta" style={{ color: 'var(--accent-light)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>GET IN TOUCH</span>
            <h2 className="section-heading-large" style={{ color: '#fff', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Ready to put your project in motion?</h2>
            <p className="mono-meta" style={{ color: 'rgba(245,244,240,0.56)', fontSize: '0.72rem', lineHeight: 1.8, maxWidth: '520px', textTransform: 'none', letterSpacing: '0.03em' }}>
              Every film starts with a conversation about space, light and intention. Tell us what you are building and we will explain how the animation would be made.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={0.1} style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.5rem' }}>
            <Link to="/contact" className="editorial-btn" style={{ color: '#f5f4f0', borderColor: 'rgba(245,244,240,0.45)', padding: '1rem 2.4rem', fontSize: '0.72rem' }}>
              GET IN TOUCH <ArrowUpRight size={14} />
            </Link>
            <span className="mono-meta" style={{ color: 'rgba(245,244,240,0.42)', fontSize: '0.6rem', letterSpacing: '0.18em', textAlign: 'right' }}>
              studio@flovisual.com
            </span>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}