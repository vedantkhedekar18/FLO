import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import ProjectCard from '../components/ui/ProjectCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import { WORK_CATEGORIES, PROJECTS } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';
import { formatTpl } from '../data/translations';

const SPANS = [7, 5, 12, 5, 7]; // asymmetric editorial rhythm

export default function Work() {
  const { t } = useLanguage();
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get('category') || 'ALL';

  const setCategory = (id) => {
    if (id === 'ALL') setParams({}, { replace: true });
    else setParams({ category: id }, { replace: true });
  };

  const filtered = useMemo(() => {
    if (activeCategory === 'ALL') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <PageTransition>
      <section style={{ paddingTop: '9rem', paddingBottom: '8rem', background: 'var(--bg-primary)' }}>
        <div className="container">
          {/* Header */}
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
              <div>
                <span className="section-label">{formatTpl(t.work.label, { count: String(filtered.length).padStart(2, '0') })}</span>
                <h1 className="display-headline" style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
                  {t.work.heading[0]}
                  <br />
                  {t.work.heading[1]}
                </h1>
              </div>
              <p className="mono-meta" style={{ maxWidth: '340px', color: 'var(--text-secondary)', fontSize: '0.72rem', lineHeight: 1.9, textTransform: 'none', letterSpacing: '0.03em' }}>
                {t.work.intro}
              </p>
            </div>
          </ScrollReveal>

          {/* Filter tabs */}
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', padding: '1.6rem 0 2.4rem', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
              {WORK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`filter-tab ${activeCategory === cat.id ? 'is-active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Asymmetric animated grid */}
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', columnGap: '3rem', rowGap: '6rem', marginTop: '5rem' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => {
                const span = SPANS[idx % SPANS.length];
                const offset = idx % SPANS.length === 1 || idx % SPANS.length === 3;
                return (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    eager={idx < 2}
                    className="work-item"
                    style={{ gridColumn: `span ${span}`, marginTop: offset ? '3rem' : 0 }}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div style={{ padding: '6rem 0', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              {t.work.empty}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .work-item { grid-column: span 12 !important; margin-top: 0 !important; }
        }
      `}</style>
    </PageTransition>
  );
}