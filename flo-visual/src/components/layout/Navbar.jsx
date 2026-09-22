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

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: scrollDir === 'down' && !menuOpen ? '-90px' : 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          transition: 'top 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, padding 0.3s ease, border 0.3s ease',
          background: solid
            ? 'rgba(18, 18, 18, 0.92)'
            : 'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 60%, transparent 100%)',
          backdropFilter: solid ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(16px)' : 'none',
          borderBottom: 'none',
          padding: solid ? '1rem clamp(1.8rem, 4.5vw, 4.5rem)' : '1.8rem clamp(1.8rem, 4.5vw, 4.5rem)',
        }}
      >
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo "FLO VISUAL" */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'baseline',
              fontFamily: 'var(--font-body)',
              fontSize: '1.12rem',
              textTransform: 'uppercase',
              transition: 'opacity 0.2s ease',
            }}
          >
            <span style={{ color: '#ffffff', fontWeight: 700, letterSpacing: '0.14em' }}>
              FLO
            </span>
            <span style={{ color: '#c8a983', fontWeight: 500, letterSpacing: '0.28em', marginLeft: '0.45rem' }}>
              VISUAL
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.4rem, 2.2vw, 2.8rem)' }}>
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.key}
                  to={link.to}
                  style={{
                    color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.82)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.76rem',
                    letterSpacing: '0.22em',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderBottom: active ? '1px solid rgba(255,255,255,0.7)' : '1px solid transparent',
                    paddingBottom: '2px',
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.82)';
                  }}
                >
                  {t.nav[link.key]}
                </Link>
              );
            })}

            {/* Vertical Divider "|" */}
            <span
              aria-hidden="true"
              style={{
                width: '1px',
                height: '13px',
                background: 'rgba(255, 255, 255, 0.35)',
                margin: '0 0.3rem',
                display: 'inline-block',
              }}
            />

            {/* Language dropdown "EN ⌵" */}
            <LanguageSwitcher variant="dropdown" light={true} />
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