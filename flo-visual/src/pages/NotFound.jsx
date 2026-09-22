import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import RevealText from '../components/ui/RevealText';

export default function NotFound() {
  return (
    <PageTransition>
      <section style={{ paddingTop: '10rem', paddingBottom: '12rem', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="mono-meta" style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.3em' }}>ERROR 404 — SPACE NOT FOUND</span>
          <h1 className="display-headline" style={{ marginTop: '1.6rem' }}>
            <RevealText as="span" text="This page was" />
            <br />
            <RevealText as="span" text="never designed." delay={0.2} />
          </h1>
          <p className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '1.8rem', letterSpacing: '0.08em' }}>
            The render you're looking for doesn't exist — yet.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '2.6rem' }}>
            <Link to="/" className="editorial-btn">BACK TO HOME</Link>
            <Link to="/work" className="editorial-btn-ghost">VIEW WORK</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}