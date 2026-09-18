import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { SITE, FOOTER_LINKS } from '../../data/site';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{ background: 'var(--bg-ink)', color: '#f5f4f0', padding: '5rem 0 2.5rem' }}>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr auto', gap: '3rem' }}>
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-display"
              style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '1.4rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
              }}
            >
              FLO&nbsp;<span style={{ color: 'var(--accent-light)' }}>VISUAL</span>
            </Link>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', color: 'rgba(245,244,240,0.55)', marginTop: '1rem', maxWidth: '360px' }}>
              {t.footer.desc}
            </p>
          </div>

          {/* Explore */}
          <div>
            <span className="section-label" style={{ color: 'rgba(245,244,240,0.5)' }}>{t.footer.explore}</span>
            {FOOTER_LINKS.explore.map((l) => (
              <Link key={l.key} to={l.to} className="hover-underline" style={{ display: 'block', color: 'rgba(245,244,240,0.82)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.08em', marginTop: '0.7rem', textDecoration: 'none' }}>
                {t.footer.links[l.key]}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <span className="section-label" style={{ color: 'rgba(245,244,240,0.5)' }}>{t.footer.company}</span>
            {FOOTER_LINKS.company.map((l) => (
              <Link key={l.key} to={l.to} className="hover-underline" style={{ display: 'block', color: 'rgba(245,244,240,0.82)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.08em', marginTop: '0.7rem', textDecoration: 'none' }}>
                {t.footer.links[l.key]}
              </Link>
            ))}
          </div>

          {/* Contact + top */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.2rem' }}>
            <a
              href={`mailto:${SITE.email}`}
              className="editorial-btn"
              style={{ background: '#fff', color: '#141414', borderColor: '#fff' }}
            >
              {t.footer.cta} <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              style={{
                background: 'transparent',
                border: '1px solid rgba(245,244,240,0.25)',
                color: '#fff',
                width: 44,
                height: 44,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(245,244,240,0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: '4rem',
            paddingTop: '1.4rem',
            borderTop: '1px solid rgba(245,244,240,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div className="mono-meta" style={{ color: 'rgba(245,244,240,0.4)', fontSize: '0.62rem' }}>
            © {new Date().getFullYear()} FLO VISUAL — {t.footer.rights}
          </div>
          <div style={{ display: 'flex', gap: '1.2rem' }}>
            {Object.entries(SITE.social).map(([k, href]) => (
              <a key={k} href={href} target="_blank" rel="noreferrer" className="hover-underline" style={{ color: 'rgba(245,244,240,0.6)', fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>
                {k}
              </a>
            ))}
          </div>
        </div>

        <style>{`
          .footer-grid { min-width: 0; }
          @media (max-width: 900px) {
            .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
          }
          @media (max-width: 640px) {
            .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          }
        `}</style>
      </div>
    </footer>
  );
}