import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SITE } from '../../data/site';
import StatementSlideshowFrame from './StatementSlideshowFrame';

const EASE = [0.16, 1, 0.3, 1];

/**
 * TaglineStatementSection — the brand statement that bridges the dark hero
 * into the light editorial page. Large typography on one side, an architectural
 * slideshow plate on the other.
 */
export default function TaglineStatementSection() {
  const { t } = useLanguage();
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      style={{ background: 'var(--bg-primary)', padding: 'clamp(3rem, 5vw, 4.5rem) 0 clamp(1rem, 2vw, 1.5rem)' }}
    >
      <div className="container">
        <div className="statement-grid">
          <div className="statement-copy" style={{ position: 'relative' }}>
            <motion.h2
              className="tagline-statement"
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ color: 'var(--text-primary)', lineHeight: 1.02 }}
            >
              {t.hero.tagline}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
              style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: 'clamp(1.5rem, 2.6vw, 2.2rem)', alignItems: 'end' }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.9, color: 'var(--text-secondary)', maxWidth: '520px', margin: 0 }}>
                {SITE.about}
              </p>
              <Link to="/about" className="editorial-btn-ghost" style={{ justifySelf: 'start', color: 'var(--text-primary)', borderColor: 'var(--text-muted)' }}>
                {t.aboutTeaser.cta} <ArrowUpRight size={14} className="rtl-flip" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="statement-art"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: EASE }}
            style={{ position: 'relative' }}
          >
            <StatementSlideshowFrame />
          </motion.div>
        </div>
      </div>
    </section>
  );
}