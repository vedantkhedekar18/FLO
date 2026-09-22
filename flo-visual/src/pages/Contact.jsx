import { useState } from 'react';
import { Send, Check, Mail } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import ParallaxImage from '../components/media/ParallaxImage';
import RevealText from '../components/ui/RevealText';
import ScrollReveal from '../components/ui/ScrollReveal';
import { SITE } from '../data/site';
import { CAPABILITIES } from '../data/capabilities';
import { useLanguage } from '../i18n/LanguageContext';

const inputBase = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--border-medium)',
  padding: '0.9rem 0',
  fontSize: '1.05rem',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  borderRadius: 0,
};

export default function Contact() {
  const { t } = useLanguage();
  const { contact, email } = SITE;
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t.contact.error);
      return;
    }
    setError('');
    setSent(true);
  };

  const firstName = form.name.trim().split(' ')[0] || 'friend';

  return (
    <PageTransition>
      <section style={{ paddingTop: '7.5rem', paddingBottom: '5.5rem', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 'clamp(2.5rem, 4vw, 4rem)' }}>
          <div className="contact-intro" style={{ gridColumn: 'span 5', minWidth: 0 }}>
            {/* Studio image — anchors the previously empty left column */}
            <ScrollReveal variant="clip">
              <div style={{ position: 'relative' }}>
                <ParallaxImage
                  src="/assets/interior/Grand lobby_05_HR.jpg"
                  alt="FLO VISUAL — architectural visualization work"
                  speed={18}
                  style={{ height: 'clamp(34vh, 46vh, 520px)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.18) 0%, transparent 42%, rgba(12,12,12,0.58) 100%)', pointerEvents: 'none' }} />
                <span className="mono-meta" style={{ position: 'absolute', top: '1rem', insetInlineStart: '1.1rem', color: 'rgba(245,244,240,0.82)', fontSize: '0.58rem', letterSpacing: '0.22em' }}>
                  01 / CONTACT
                </span>
                <span className="mono-meta" style={{ position: 'absolute', bottom: '1rem', insetInlineStart: '1.1rem', color: 'rgba(245,244,240,0.92)', fontSize: '0.58rem', letterSpacing: '0.22em', textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
                  FLO VISUAL — STUDIO
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="left">
              <span className="section-label" style={{ marginTop: '2.4rem' }}>{t.contact.kicker}</span>
              <h1 className="display-headline" style={{ marginTop: '0.8rem' }}>
                {t.contact.heading.map((line, i) => (
                  <span key={i}>
                    <RevealText as="span" text={line} delay={i * 0.2} />
                    {i < t.contact.heading.length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginTop: '2rem', maxWidth: '420px' }}>
                {t.contact.intro}
              </p>
              <div className="mono-meta" style={{ marginTop: '2.6rem', color: 'var(--text-muted)', fontSize: '0.66rem', letterSpacing: '0.14em', lineHeight: 2.2, display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={12} />
                  <a href={`mailto:${email}`} style={{ textDecoration: 'none' }}>{contact.email}</a>
                </div>
                {contact.phoneVisible && <div>{contact.phone}</div>}
                {contact.addressVisible && <div>{contact.address}</div>}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="right" delay={0.1} className="contact-form-col" style={{ gridColumn: 'span 7' }}>
            {sent ? (
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '3rem', maxWidth: '560px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', color: '#2f7d4f' }}>
                  <Check size={22} />
                  <span className="mono-meta" style={{ fontSize: '0.78rem', letterSpacing: '0.18em' }}>{t.contact.successLabel}</span>
                </span>
                <p className="font-display" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.6rem)', fontWeight: 600, marginTop: '1.4rem', lineHeight: 1.2 }}>
                  {t.contact.successThanksName.replace('{name}', firstName)}
                </p>
                <p className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '0.5rem', textTransform: 'none', letterSpacing: '0.03em' }}>
                  {t.contact.successThanksService.replace('{service}', form.service || 'your project')}
                </p>
                <p className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '1.4rem' }}>
                  THIS IS A PROTOTYPE — FORMS ARE NOT CONNECTED YET.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '0 2.5rem' }}>
                  <div className="form-group">
                    <label className="mono-meta" style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.18em', marginBottom: '0.2rem' }}>{t.contact.form.name}</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder={t.contact.form.namePlaceholder} style={inputBase} autoComplete="name" />
                  </div>
                  <div className="form-group">
                    <label className="mono-meta" style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.18em', marginBottom: '0.2rem' }}>{t.contact.form.email}</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={t.contact.form.emailPlaceholder} style={inputBase} autoComplete="email" />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '2.4rem' }}>
                  <label className="mono-meta" style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.18em', marginBottom: '0.6rem' }}>{t.contact.form.service}</label>
                  <select name="service" value={form.service} onChange={handleChange} style={{ ...inputBase, cursor: 'pointer', appearance: 'none' }}>
                    <option value="">{t.contact.form.servicePlaceholder}</option>
                    {CAPABILITIES.map((c) => (
                      <option key={c.id} value={t.capabilities.items[c.id]?.title || c.title}>
                        {t.capabilities.items[c.id]?.title || c.title}
                      </option>
                    ))}
                    <option value="Full visual package">Full Visual Package</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginTop: '2.4rem' }}>
                  <label className="mono-meta" style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.18em', marginBottom: '0.2rem' }}>{t.contact.form.message}</label>
                  <textarea name="message" rows={5} value={form.message} onChange={handleChange} placeholder={t.contact.form.messagePlaceholder} style={{ ...inputBase, resize: 'vertical', minHeight: '140px', lineHeight: 1.7 }} />
                </div>

                {error && (
                  <p className="mono-meta" style={{ color: '#b3402a', fontSize: '0.66rem', marginTop: '1.2rem' }}>{error}</p>
                )}

                <button type="submit" className="editorial-btn" style={{ marginTop: '2.6rem' }}>
                  {t.contact.submit} <Send size={14} />
                </button>

                <p className="mono-meta" style={{ color: 'var(--text-dim)', fontSize: '0.62rem', marginTop: '1.4rem' }}>
                  PROTOTYPE — SUBMIT IS SIMULATED, NOT SENT.
                </p>
              </form>
            )}
          </ScrollReveal>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .contact-intro, .contact-form-col { grid-column: span 12 !important; }
          }
          @media (max-width: 640px) {
            form > div:first-child { grid-template-columns: 1fr !important; gap: 1.8rem 0 !important; }
          }
        `}</style>
      </section>
    </PageTransition>
  );
}