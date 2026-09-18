import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import ParallaxImage from '../components/media/ParallaxImage';
import CinematicVideo from '../components/media/CinematicVideo';
import RevealText from '../components/ui/RevealText';
import ScrollReveal from '../components/ui/ScrollReveal';
import { useLanguage } from '../i18n/LanguageContext';
import { CAPABILITIES } from '../data/capabilities';

const PRINCIPLES = [
  { index: '01', title: 'Architecture first', text: 'We do not decorate buildings — we reveal them. Every image starts from the architectural idea.' },
  { index: '02', title: 'Motion is meaning', text: 'Buildings are explored in time. Film, walkthroughs, and 360° are not add-ons; they are the language.' },
  { index: '03', title: 'Light is material', text: 'Sun, dusk, weather, and season are treated as materials with the same rigor as stone and timber.' },
  { index: '04', title: 'Fidelity without noise', text: 'Photoreal to a point, then editorial restraint. The image should breathe.' },
];

export default function About() {
  const { t } = useLanguage();
  return (
    <PageTransition>
      {/* Hero */}
      <section style={{ background: 'var(--bg-ink)', color: '#f5f4f0', paddingTop: '7.5rem', paddingBottom: '4.5rem' }}>
        <div className="container">
          <span className="mono-meta" style={{ color: 'var(--accent-light)', fontSize: '0.66rem', letterSpacing: '0.24em' }}>{t.about.kicker}</span>
          <h1 className="display-headline" style={{ color: '#fff', marginTop: '1.3rem', maxWidth: '18ch' }}>
            {t.about.heading.map((line, i) => (
              <span key={i}>
                <RevealText as="span" text={line} delay={i * 0.2} />
                {i < t.about.heading.length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* Cinematic band */}
      <section style={{ height: 'clamp(48vh, 58vh, 580px)', background: '#0c0c0c', position: 'relative', overflow: 'hidden' }}>
        <CinematicVideo src="/assets/videos/France.mp4" poster="/assets/exterior/15.jpg" mode="background" />
      </section>

      {/* Editorial content block — asymmetric images left, heading + copy right */}
      <section style={{ padding: 'clamp(4.5rem, 7vw, 6.5rem) 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 'clamp(2rem, 4vw, 3.5rem)', alignItems: 'start' }}>
            {/* Left — asymmetric architectural images */}
            <div className="about-images" style={{ gridColumn: 'span 6', minWidth: 0, position: 'relative' }}>
              <ScrollReveal variant="clipUp">
                <ParallaxImage
                  src="/assets/exterior/View-1.jpg"
                  alt="Exterior architectural visualization"
                  speed={22}
                  style={{ height: 'clamp(56vh, 68vh, 620px)' }}
                />
              </ScrollReveal>
              <div className="about-small-image" style={{ position: 'absolute', insetInlineEnd: 0, bottom: '-1.6rem', width: '48%', zIndex: 2, boxShadow: '0 10px 48px rgba(0,0,0,0.18)' }}>
                <ScrollReveal variant="up" delay={0.15}>
                  <ParallaxImage
                    src="/assets/interior/Entrance Lobby.jpg"
                    alt="Interior architectural visualization"
                    speed={12}
                    style={{ height: 'clamp(22vh, 30vh, 340px)' }}
                  />
                </ScrollReveal>
              </div>
            </div>

            {/* Right — heading, description and manifesto quote */}
            <div className="about-copy" style={{ gridColumn: 'span 6', minWidth: 0, paddingTop: 'clamp(2rem, 4vw, 4rem)' }}>
              <ScrollReveal variant="right">
                <span className="section-label" style={{ color: 'var(--accent-light)' }}>{t.about.kicker}</span>
                <h1 className="about-main-heading">ABOUT FLO VISUAL</h1>
                <p className="about-body">
                  {t.about.long}
                </p>
              </ScrollReveal>

              <ScrollReveal variant="up" delay={0.12}>
                <blockquote className="about-manifesto-quote">
                  <span className="section-label" style={{ marginBottom: '0.5rem' }}>{t.about.manifesto}</span>
                  <p className="font-display" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 500, lineHeight: 1.6, letterSpacing: '-0.01em', margin: 0, color: 'var(--text-secondary)' }}>
                    {t.hero.tagline} — {t.about.long}
                  </p>
                </blockquote>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <style>{`
          .about-main-heading {
            font-family: var(--font-display);
            font-size: clamp(1.8rem, 3.4vw, 2.8rem);
            font-weight: 700;
            line-height: 1.05;
            letter-spacing: -0.03em;
            text-transform: uppercase;
            color: var(--text-primary);
            margin: 0.9rem 0 0;
          }
          .about-body {
            margin: 1.6rem 0 0;
            font-size: clamp(0.98rem, 1.6vw, 1.2rem);
            line-height: 1.7;
            color: var(--text-secondary);
            text-transform: none;
            letter-spacing: 0.01em;
            max-width: 560px;
          }
          .about-manifesto-quote {
            margin-top: 2.4rem;
            padding-top: 1.8rem;
            border-top: 1px solid var(--border-subtle);
          }
          @media (max-width: 1024px) {
            .about-images, .about-copy { grid-column: span 12 !important; }
            .about-small-image { position: relative !important; inset: auto !important; width: 100% !important; margin-top: 1rem; }
          }
        `}</style>
      </section>

      {/* Principles editorial list */}
      <section style={{ padding: '1.5rem 0 5.5rem', background: 'var(--bg-primary)' }}>
        <div className="container">
          {PRINCIPLES.map((p, i) => (
            <ScrollReveal key={p.index} variant="up" delay={i * 0.05}>
              <div className="capability-row" style={{ display: 'grid', gridTemplateColumns: '6rem minmax(0, 1fr) minmax(0, 1.4fr)', gap: '2rem', alignItems: 'center', cursor: 'inherit' }}>
                <span className="capability-number">{p.index}</span>
                <span className="capability-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.6rem)' }}>{p.title}</span>
                <span className="mono-meta" style={{ color: 'var(--text-secondary)', fontSize: '0.74rem', lineHeight: 1.9, textTransform: 'none', letterSpacing: '0.02em' }}>{p.text}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .about-manifesto { grid-column: span 12 !important; }
            .capability-row { grid-template-columns: 3rem 1fr !important; }
            .capability-row > span:last-child { grid-column: span 2; padding-left: 5rem; }
          }
          @media (max-width: 640px) {
            .capability-row > span:last-child { padding-left: 0; grid-column: span 2; }
          }
        `}</style>
      </section>

      {/* Capabilities quick index */}
      <section style={{ padding: '0 0 5.5rem', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ paddingTop: '4rem' }}>
          <ScrollReveal>
            <span className="section-label">{t.about.offer}</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0 3rem', borderTop: '1px solid var(--border-subtle)' }}>
              {CAPABILITIES.map((cap) => (
                <Link key={cap.id} to={cap.to} className="capability-row" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className="capability-number">{cap.index}</span>
                  <span className="capability-title" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.9rem)' }}>{t.capabilities.items[cap.id]?.title || cap.title}</span>
                  <span className="capability-arrow" style={{ color: 'var(--text-muted)' }}><ArrowUpRight size={16} className="rtl-flip" /></span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team image */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <ScrollReveal variant="clip">
            <ParallaxImage src="/assets/interior/Recharge HR Render.jpg" alt="Inside FLO Visual studio work" speed={26} style={{ height: 'clamp(50vh, 58vh, 540px)' }} />
          </ScrollReveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginTop: '2rem' }}>
            <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.64rem' }}>A FRAME FROM THE WELLNESS FLOOR SERIES</span>
            <Link to="/contact" className="editorial-btn">{t.about.cta} <ArrowUpRight size={14} className="rtl-flip" /></Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}