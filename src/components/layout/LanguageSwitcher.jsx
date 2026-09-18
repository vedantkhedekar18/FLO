import { LANGUAGES } from '../../data/translations';
import { useLanguage } from '../../i18n/LanguageContext';

export default function LanguageSwitcher({ variant = 'inline', light = false, align = 'start' }) {
  const { lang, changeLanguage } = useLanguage();
  const baseColor = light ? 'rgba(255,255,255,0.72)' : 'var(--text-muted)';

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
        <span className="section-label">LANGUAGE</span>
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
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  color: active ? 'var(--accent)' : 'var(--text-muted)',
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

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.55rem',
        borderLeft: light ? '1px solid rgba(255,255,255,0.22)' : '1px solid var(--border-subtle)',
        paddingLeft: '1.15rem',
      }}
    >
      {LANGUAGES.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            onClick={() => changeLanguage(l.code)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              color: active ? 'var(--accent)' : baseColor,
              fontWeight: active ? 600 : 400,
              padding: '0.1rem 0.12rem',
              transition: 'color 0.25s ease',
            }}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}