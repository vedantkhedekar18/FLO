import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { LANGUAGES } from '../../data/translations';
import { useLanguage } from '../../i18n/LanguageContext';

export default function LanguageSwitcher({ variant = 'dropdown', light = false, align = 'start' }) {
  const { lang, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const textColor = light ? '#ffffff' : 'var(--text-primary)';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  if (variant === 'menu') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          marginTop: '1.4rem',
          alignItems: align,
        }}
      >
        <span className="section-label" style={{ color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.16em' }}>
          LANGUAGE
        </span>
        <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
          {LANGUAGES.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.code)}
                className="hover-underline"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.14em',
                  color: active ? '#c8a983' : 'var(--text-muted)',
                  fontWeight: active ? 600 : 400,
                  padding: '0.2rem 0',
                  textTransform: 'uppercase',
                }}
              >
                {l.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Dropdown style matching the reference image: "EN ⌵"
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          color: textColor,
          fontFamily: 'var(--font-body)',
          fontSize: '0.76rem',
          letterSpacing: '0.2em',
          fontWeight: 500,
          textTransform: 'uppercase',
          padding: '0.2rem 0',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#c8a983')}
        onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
      >
        <span>{current.label}</span>
        <ChevronDown
          size={12}
          style={{
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            opacity: 0.8,
          }}
        />
      </button>

      {/* Language Popup Menu */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.6rem)',
            right: 0,
            minWidth: '120px',
            background: 'rgba(18, 18, 18, 0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '4px',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.45)',
            padding: '0.4rem 0',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {LANGUAGES.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => {
                  changeLanguage(l.code);
                  setOpen(false);
                }}
                style={{
                  background: active ? 'rgba(200, 169, 131, 0.12)' : 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  padding: '0.45rem 1rem',
                  color: active ? '#c8a983' : 'rgba(255, 255, 255, 0.85)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.14em',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                  }
                }}
              >
                <span>{l.name}</span>
                <span style={{ fontSize: '0.66rem', opacity: 0.6, letterSpacing: '0.1em' }}>{l.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}