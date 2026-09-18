import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '../../data/site';
import { useLanguage } from '../../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const location = useLocation();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState('up');

  const lastY = useRef(0);

  const isHome = location.pathname === '/';
  const solid = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setScrollDir(y > lastY.current && y > 120 ? 'down' : 'up');
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const textColor = solid ? 'var(--text-primary)' : '#ffffff';
  const monoColor = solid ? 'var(--text-muted)' : 'rgba(255,255,255,0.72)';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: scrollDir === 'down' && !menuOpen ? '-80px' : 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          transition: 'top 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, padding 0.3s ease, border 0.3s ease',
          background: solid ? 'rgba(245,244,240,0.9)' : 'transparent',
          backdropFilter: solid ? 'blur(14px)' : 'none',
          borderBottom: solid ? '1px solid var(--border-subtle)' : '1px solid transparent',
          padding: solid ? '0.85rem 0' : '1.6rem 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <Link
            to="/"
            className="hover-underline"
            style={{
              textDecoration: 'none',
              color: textColor,
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.45rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textShadow: solid ? 'none' : '0 2px 12px rgba(0,0,0,0.4)',
              transition: 'color 0.3s ease',
            }}
          >
            FLO
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>VISUAL</span>
          </Link>

          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.4rem' }}>
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.key}
                  to={link.to}
                  className="hover-underline"
                  style={{
                    color: active ? textColor : monoColor,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.16em',
                    fontWeight: active ? 600 : 400,
                    textTransform: 'uppercase',
                    borderBottom: active ? '1px solid currentColor' : 'none',
                    paddingBottom: '2px',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {t.nav[link.key]}
                </Link>
              );
            })}
            <LanguageSwitcher light={!solid} />
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            className="mobile-toggle"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              padding: '0.4rem',
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Full-screen mobile drawer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'var(--bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2.5rem',
          overflowY: 'auto',
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.35s ease, visibility 0.35s ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <span className="section-label">NAVIGATION</span>
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.key}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 8vw, 3rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.7rem',
              }}
            >
              <span>{t.nav[link.key]}</span>
              <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                0{idx + 1}
              </span>
            </Link>
          ))}

          <LanguageSwitcher variant="menu" />

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="editorial-btn"
            style={{ marginTop: '1.8rem', alignSelf: 'flex-start' }}
          >
            {t.common.startProject} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}