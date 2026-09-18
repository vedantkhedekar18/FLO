import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { SITE } from '../../data/site';
import { CAPABILITIES } from '../../data/capabilities';
import { useLanguage } from '../../i18n/LanguageContext';

const EASE = [0.16, 1, 0.3, 1];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EnquirySection() {
  const { t } = useLanguage();
  const [values, setValues] = useState({ name: '', email: '', company: '', projectType: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'required';
    if (!values.email.trim()) next.email = 'required';
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'format';
    if (!values.message.trim()) next.message = 'required';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('sending');
    window.setTimeout(() => setStatus('success'), 900);
  };

  const resetForm = () => {
    setValues({ name: '', email: '', company: '', projectType: '', message: '' });
    setErrors({});
    setStatus('idle');
  };

  const fieldLabel = (text) => (
    <span className="mono-meta enq-label">{text}</span>
  );

  const errText = (key) => {
    if (!errors[key]) return null;
    if (key === 'email' && errors[key] === 'format') {
      return <span className="enq-error">{t.enquiry.form.invalidEmail}</span>;
    }
    return <span className="enq-error">{t.enquiry.form.invalid}</span>;
  };

  const subtitle =
    status === 'success'
      ? t.enquiry.form.successThanks.replace('{name}', values.name.trim() || '...')
      : t.enquiry.sub;

  return (
    <section style={{ background: 'var(--bg-ink)', color: '#f5f4f0', padding: 'clamp(4.5rem, 8vw, 7.5rem) 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(2rem, 4vw, 4.5rem)', alignItems: 'center' }} className="enquiry-grid">
          <div style={{ gridColumn: 'span 5', minWidth: 0 }}>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="section-label"
              style={{ color: 'rgba(245,244,240,0.45)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.6rem' }}
            >
              <span style={{ width: 20, height: 1, background: 'var(--accent-light)' }} />
              {t.enquiry.dash}
            </motion.span>

            <motion.h2
              className="enquiry-head"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ color: '#f5f4f0', lineHeight: 0.92, margin: 0 }}
            >
              {t.enquiry.heading.map((line, i) => (
                <span key={`${line}-${i}`} style={{ display: 'block', overflow: 'hidden' }}>
                  <motion.span
                    initial={{ y: '110%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, ease: EASE, delay: 0.1 + i * 0.09 }}
                    style={{ display: 'block' }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 1.8, color: 'rgba(245,244,240,0.62)', maxWidth: '420px', margin: '1.6rem 0 0' }}>
              {subtitle}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem', alignItems: 'center' }}>
              <a href={`mailto:${SITE.email}`} className="mono-meta hover-underline" style={{ color: 'rgba(245,244,240,0.85)', fontSize: '0.68rem', letterSpacing: '0.16em', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <Mail size={13} />
                {SITE.email}
              </a>
            </div>
            {t.enquiry.emailNote && (
              <p className="mono-meta" style={{ color: 'rgba(245,244,240,0.28)', fontSize: '0.58rem', letterSpacing: '0.14em', margin: '1.4rem 0 0' }}>
                {t.enquiry.emailNote}
              </p>
            )}
          </div>

          <div style={{ gridColumn: 'span 7', minWidth: 0 }} className="enquiry-form-col">
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="enquiry-form-card"
            >
              <span aria-hidden="true" className="enq-card-art" />

              {status === 'success' ? (
                <div className="enq-success">
                  <span className="mono-meta" style={{ color: '#c8a97e', fontSize: '0.64rem', letterSpacing: '0.22em' }}>
                    {t.enquiry.form.successTitle}
                  </span>
                  <p className="font-display" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.1rem)', fontWeight: 600, lineHeight: 1.4, margin: '1.1rem 0 0', color: '#f5f4f0' }}>
                    {t.enquiry.form.successThanks.replace('{name}', values.name.trim() || '...')}
                  </p>
                  <button type="button" className="enq-btn enq-btn-ghost" onClick={resetForm} style={{ marginTop: '1.8rem' }}>
                    {t.enquiry.form.again}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="enq-row">
                    <div className="enq-field">
                      {fieldLabel(t.enquiry.form.name)}
                      <input
                        id="enq-name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={setField('name')}
                        placeholder={t.enquiry.form.namePlaceholder}
                        aria-invalid={Boolean(errors.name)}
                        className={errors.name ? 'has-error' : ''}
                      />
                      {errText('name')}
                    </div>
                    <div className="enq-field">
                      {fieldLabel(t.enquiry.form.email)}
                      <input
                        id="enq-email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={setField('email')}
                        placeholder={t.enquiry.form.emailPlaceholder}
                        aria-invalid={Boolean(errors.email)}
                        className={errors.email ? 'has-error' : ''}
                      />
                      {errText('email')}
                    </div>
                  </div>

                  <div className="enq-row">
                    <div className="enq-field">
                      {fieldLabel(t.enquiry.form.company)}
                      <input
                        id="enq-company"
                        name="company"
                        type="text"
                        value={values.company}
                        onChange={setField('company')}
                        placeholder={t.enquiry.form.companyPlaceholder}
                      />
                    </div>
                    <div className="enq-field">
                      {fieldLabel(t.enquiry.form.projectType)}
                      <select
                        id="enq-projectType"
                        name="projectType"
                        value={values.projectType}
                        onChange={setField('projectType')}
                      >
                        <option value="" disabled>{t.enquiry.form.projectTypePlaceholder}</option>
                        {CAPABILITIES.map((cap) => (
                          <option key={cap.id} value={cap.id}>
                            {t.capabilities.items[cap.id]?.title || cap.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="enq-field">
                    {fieldLabel(t.enquiry.form.message)}
                    <textarea
                      id="enq-message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={setField('message')}
                      placeholder={t.enquiry.form.messagePlaceholder}
                      aria-invalid={Boolean(errors.message)}
                      className={errors.message ? 'has-error' : ''}
                    />
                    {errText('message')}
                  </div>

                  <div className="enq-submit-row">
                    <button type="submit" className="enq-btn" disabled={status === 'sending'}>
                      {status === 'sending' ? (
                        <span className="enq-sending">
                          <span className="enq-spinner" aria-hidden="true" />
                          {t.enquiry.form.sending}
                        </span>
                      ) : (
                        <>
                          {t.enquiry.form.submit} <ArrowUpRight size={14} className="rtl-flip" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        <style>{`
          .enquiry-form-card {
            position: relative;
            padding: clamp(1.6rem, 3vw, 2.4rem);
            background: rgba(245,244,240,0.04);
            border: 1px solid rgba(245,244,240,0.12);
          }
          .enq-card-art {
            position: absolute;
            inset: 0;
            background: linear-gradient(160deg, rgba(12,12,12,0.86) 0%, rgba(12,12,12,0.66) 100%), url('/assets/exterior/Pool Seating view.jpg') center / cover no-repeat;
            opacity: 0.16;
            pointer-events: none;
            z-index: 0;
          }
          .enquiry-form-card form,
          .enquiry-form-card .enq-success {
            position: relative;
            z-index: 1;
          }
          .enq-label {
            display: block;
            color: rgba(245,244,240,0.5);
            font-size: 0.6rem;
            letter-spacing: 0.18em;
            margin-bottom: 0.45rem;
          }
          .enq-field {
            margin-bottom: 1.4rem;
            min-width: 0;
          }
          .enq-field input,
          .enq-field select,
          .enq-field textarea {
            width: 100%;
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(245,244,240,0.22);
            border-radius: 0;
            color: #f5f4f0;
            font-family: var(--font-mono);
            font-size: 0.82rem;
            letter-spacing: 0.03em;
            padding: 0.65rem 0.15rem;
            outline: none;
            transition: border-color 0.3s var(--transition-smooth);
          }
          .enq-field textarea { resize: vertical; min-height: 88px; }
          .enq-field select { cursor: pointer; }
          .enq-field select option { color: #141414; background: #f5f4f0; }
          .enq-field select:invalid { color: rgba(245,244,240,0.4); }
          .enq-field input::placeholder,
          .enq-field textarea::placeholder { color: rgba(245,244,240,0.28); }
          .enq-field input:focus,
          .enq-field select:focus,
          .enq-field textarea:focus { border-color: var(--accent-light); }
          .enq-field input:hover:not(:focus),
          .enq-field select:hover:not(:focus),
          .enq-field textarea:hover:not(:focus) { border-color: rgba(245,244,240,0.45); }
          .enq-field input.has-error,
          .enq-field textarea.has-error { border-color: #d9836b; }
          .enq-error {
            display: block;
            font-family: var(--font-mono);
            font-size: 0.6rem;
            letter-spacing: 0.05em;
            color: #e0947d;
            margin-top: 0.5rem;
          }
          .enq-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0 2rem;
          }
          .enq-submit-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 0.4rem;
          }
          .enq-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.8rem 1.5rem;
            background: #f5f4f0;
            color: #141414;
            border: 1px solid #f5f4f0;
            cursor: pointer;
            font-family: var(--font-mono);
            font-size: 0.74rem;
            font-weight: 500;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            transition: all 0.3s var(--transition-smooth);
          }
          .enq-btn:hover:not(:disabled) { background: transparent; color: #f5f4f0; }
          .enq-btn:disabled { opacity: 0.6; cursor: progress; }
          .enq-btn-ghost { background: transparent; color: #f5f4f0; border-color: rgba(245,244,240,0.4); }
          .enq-btn-ghost:hover { border-color: #f5f4f0; background: rgba(245,244,240,0.06); }
          .enq-sending { display: inline-flex; align-items: center; gap: 0.7rem; }
          .enq-spinner {
            width: 13px;
            height: 13px;
            border-radius: 50%;
            border: 2px solid rgba(20,20,20,0.25);
            border-top-color: #141414;
            animation: enq-spin 0.7s linear infinite;
          }
          @keyframes enq-spin { to { transform: rotate(360deg); } }
          @media (prefers-reduced-motion: reduce) {
            .enq-spinner { animation: none; }
            .enquiry-form-card, .enq-btn { transition: none; }
          }
          @media (max-width: 900px) {
            .enquiry-grid { grid-template-columns: 1fr; }
            .enquiry-grid > div { grid-column: span 1 !important; }
          }
          @media (max-width: 560px) {
            .enq-row { grid-template-columns: 1fr; gap: 0; }
          }
        `}</style>
      </div>
    </section>
  );
}