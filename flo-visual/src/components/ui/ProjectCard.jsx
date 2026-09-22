import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Compass, Layers, FileText, PenTool, Camera } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const KIND_LABEL = {
  image: 'CGI',
  video: 'ANIMATION',
  '360': '360° TOUR',
  brochure: 'BROCHURE',
  logo: 'LOGO',
  drone: 'DRONE',
  floorplan: 'FLOOR PLAN',
};

const KIND_ICON = {
  video: <Play size={11} fill="#fff" />,
  '360': <Compass size={12} />,
  floorplan: <Layers size={11} />,
  brochure: <FileText size={11} />,
  logo: <PenTool size={11} />,
  drone: <Camera size={11} />,
};

/**
 * ProjectCard — asymmetric editorial portfolio tile.
 * `layoutId` enables smooth FLIP filtering on the Work page.
 */
export default function ProjectCard({ project, layout = true, eager = false, className = '', style }) {
  const { kind } = project;
  const { t } = useLanguage();

  return (
    <motion.div
      layout={layout}
      initial={layout ? { opacity: 0, scale: 0.97 } : false}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`editorial-project-item ${className}`}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', ...style }}
    >
      <Link to={`/work/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="project-image-box media-frame" style={{ width: '100%', height: '100%' }}>
          <img
            src={project.poster}
            alt={project.title}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="tone-image editorial-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          />

          <div
            className="project-badge"
            style={{
              position: 'absolute',
              top: '1.1rem',
              left: '1.1rem',
              zIndex: 3,
              background: 'rgba(12,12,12,0.72)',
              backdropFilter: 'blur(6px)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.14em',
              padding: '0.35rem 0.7rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              textTransform: 'uppercase',
            }}
          >
            {KIND_ICON[kind]}
            <span>{KIND_LABEL[kind] || project.category}</span>
          </div>

          <div
            className="project-hover-callout"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(12,12,12,0.16)',
              opacity: 0,
              transition: 'opacity 0.4s ease',
              zIndex: 2,
            }}
          >
            <span
              className="mono-meta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                background: 'rgba(245,244,240,0.95)',
                color: 'var(--text-primary)',
                fontWeight: 600,
              }}
            >
              {t.common.viewProject} <ArrowUpRight size={14} className="rtl-flip" />
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <h3
              className="font-display"
              style={{ fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2 }}
            >
              {project.title}
            </h3>
            <div className="mono-meta" style={{ color: 'var(--text-muted)', marginTop: '0.15rem', fontSize: '0.68rem' }}>
              {project.subtitle}
            </div>
          </div>
          <div className="mono-meta" style={{ textAlign: 'right', color: 'var(--text-secondary)', fontSize: '0.64rem', flexShrink: 0 }}>
            {project.category}
            <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>{project.year || ''}</div>
          </div>
        </div>
      </Link>

      <style>{`
        .editorial-project-item:hover .editorial-img { transform: scale(1.045); }
        .editorial-project-item:hover .project-hover-callout { opacity: 1; }
      `}</style>
    </motion.div>
  );
}