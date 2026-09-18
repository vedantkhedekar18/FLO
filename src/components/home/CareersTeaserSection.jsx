import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import ParallaxImage from '../media/ParallaxImage';

const EASE = [0.16, 1, 0.3, 1];

export default function CareersTeaserSection() {
  const { t } = useLanguage();

  return (
    <section style={{ background: 'var(--bg-secondary)', padding: 'clamp(4rem, 7vw, 7rem) 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(1.4rem, 2vw, 2.4rem)', alignItems: 'center' }}>

          <div style={{ gridColumn: 'span 5', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
            <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: 20, height: 1, background: 'var(--accent-light)' }} />
              {t.careersTeaser.dash}
            </span>

            <motion.h2
              className="careers-heading"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ marginTop: 0, marginBottom: 0, lineHeight: 0.92 }}
            >
              {t.careersTeaser.heading.map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </motion.h2>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '320px', margin: 0 }}>
              {t.careersTeaser.sub}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/careers" className="editorial-btn-ghost" style={{ color: 'var(--text-primary)', borderColor: 'var(--text-muted)' }}>
                {t.careersTeaser.cta} <ArrowUpRight size={14} className="rtl-flip" />
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ clipPath: 'inset(0 0 14% 0)', opacity: 0.9 }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.15, ease: EASE }}
            style={{ gridColumn: 'span 7', position: 'relative' }}
          >
            <ParallaxImage src="/assets/interior/Recharge HR Render.jpg" alt="Studio space" speed={0.15} height={480} />
            <span className="mono-meta" style={{ position: 'absolute', bottom: '1rem', insetInlineStart: '1.2rem', color: 'rgba(245,244,240,0.85)', fontSize: '0.58rem', letterSpacing: '0.2em', textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>
              FLO VISUAL — STUDIO
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}