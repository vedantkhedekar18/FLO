import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowUpRight, Play, Compass, Layers, FileText, PenTool, Camera, MapPin, Calendar } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import CinematicVideo from '../components/media/CinematicVideo';
import ParallaxImage from '../components/media/ParallaxImage';
import TourViewer360 from '../components/tours/TourViewer360';
import ProjectCard from '../components/ui/ProjectCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import { getProject, getRelatedProjects, getAdjacentProjects } from '../data/projects';
import { getTour } from '../data/tours';

const KIND_ICON = {
  video: <Play size={13} fill="currentColor" />,
  '360': <Compass size={13} />,
  floorplan: <Layers size={13} />,
  brochure: <FileText size={13} />,
  logo: <PenTool size={13} />,
  drone: <Camera size={13} />,
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) return <Navigate to="/work" replace />;

  const related = getRelatedProjects(project, 3);
  const { prev, next } = getAdjacentProjects(project);
  const tour = getTour(project.slug);

  return (
    <PageTransition>
      {/* ---- Hero media ---- */}
      <section style={{ background: '#0c0c0c', paddingTop: '5.5rem' }}>
        <div style={{ position: 'relative', minHeight: '80vh' }}>
          {project.kind === 'video' ? (
            <CinematicVideo src={project.videoUrl} poster={project.poster} mode="background" />
          ) : (
            <img
              src={project.poster}
              alt={project.title}
              className="tone-image"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.55), transparent 40%, rgba(12,12,12,0.85))', pointerEvents: 'none' }} />

          <div className="container" style={{ position: 'relative', zIndex: 2, minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '3.5rem' }}>
            <ScrollReveal variant="up">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span className="mono-meta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#c8a97e', fontSize: '0.68rem', letterSpacing: '0.2em' }}>
                  {KIND_ICON[project.kind]} {project.category}
                </span>
                <span className="mono-meta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: 'rgba(245,244,240,0.7)', fontSize: '0.66rem' }}>
                  <MapPin size={12} /> {project.client}
                </span>
                <span className="mono-meta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: 'rgba(245,244,240,0.7)', fontSize: '0.66rem' }}>
                  <Calendar size={12} /> {project.year}
                </span>
              </div>
              <h1 className="display-headline" style={{ color: '#fff', marginTop: '1.4rem', maxWidth: '16ch', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
                {project.title}
              </h1>
              <p className="mono-meta" style={{ color: 'rgba(245,244,240,0.72)', fontSize: '0.76rem', marginTop: '1rem', letterSpacing: '0.06em' }}>
                {project.subtitle}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---- Intro / description ---- */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '3rem' }}>
          <div className="proj-desc" style={{ gridColumn: 'span 6' }}>
            <ScrollReveal variant="left">
              <span className="section-label">PROJECT</span>
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', lineHeight: 1.8, color: 'var(--text-primary)', maxWidth: '560px' }}>
                {project.description}
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="right" delay={0.1} className="proj-meta" style={{ gridColumn: 'span 6' }}>
            <span className="section-label">TECHNICAL DETAILS</span>
            <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
              {project.technicalDetails &&
                Object.entries(project.technicalDetails).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.9rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{k.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="mono-meta" style={{ color: 'var(--text-primary)', fontSize: '0.72rem', textAlign: 'right', letterSpacing: '0.04em', textTransform: 'none' }}>{v}</span>
                  </div>
                ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Medium-specific block ---- */}
      {project.kind === 'video' && (
        <section style={{ background: '#0c0c0c', padding: '0 0 5rem' }}>
          <ScrollReveal variant="clip">
            <div className="container">
              <span className="mono-meta" style={{ color: 'var(--accent-light)', fontSize: '0.66rem', letterSpacing: '0.22em', marginBottom: '1.2rem', display: 'block' }}>
                FULL FILM — PLAYER
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="scale">
            <div className="container">
              <div style={{ aspectRatio: '16/8.5' }}>
                <CinematicVideo src={project.videoUrl} poster={project.poster} mode="player" title={project.title} />
              </div>
            </div>
          </ScrollReveal>
          <div className="container" style={{ marginTop: '1.4rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/walkthroughs/france-walkthrough" className="mono-meta hover-underline" style={{ color: '#fff', fontSize: '0.7rem', letterSpacing: '0.14em' }}>
              OPEN DEDICATED WALKTHROUGH EXPERIENCE →
            </Link>
          </div>
        </section>
      )}

      {project.kind === '360' && (
        <section style={{ background: 'var(--bg-secondary)', padding: '4rem 0 5.5rem' }}>
          <div className="container">
            <ScrollReveal>
              <span className="mono-meta" style={{ color: 'var(--accent)', fontSize: '0.66rem', letterSpacing: '0.22em', marginBottom: '1.2rem', display: 'block' }}>
                360° VIRTUAL TOUR
              </span>
              <TourViewer360 tour={tour} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ---- Gallery ---- */}
      {project.gallery && project.gallery.length > 0 && (
        <section style={{ padding: '5.5rem 0', background: 'var(--bg-primary)' }}>
          <div className="container">
            <ScrollReveal>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                <span className="section-label">GALLERY — {project.gallery.length} FRAMES</span>
                <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.64rem' }}>FLO VISUAL STUDIO</span>
              </div>
            </ScrollReveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '2.5rem' }}>
              {project.gallery.map((img, i) => {
                const isVideo = project.kind === 'video' && project.videoUrl && i === 0;
                const span = i % 2 === 0 ? 7 : 5;
                const height = i % 2 === 0 ? '54vh' : '42vh';
                return (
                  <ScrollReveal key={img + i} variant="clipUp" delay={i * 0.06} className="gallery-item" style={{ gridColumn: `span ${span}` }}>
                    {isVideo ? (
                      <CinematicVideo src={project.videoUrl} poster={img} mode="background" />
                    ) : (
                      <ParallaxImage src={img} alt={`${project.title} — frame ${i + 1}`} speed={i % 2 === 0 ? 24 : 14} style={{ height }} />
                    )}
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---- Related ---- */}
      <section style={{ padding: '1rem 0 5.5rem', background: 'var(--bg-primary)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <h2 className="section-heading-large" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 3rem)' }}>Related Works</h2>
              <Link to="/work" className="editorial-btn-ghost">ALL WORKS <ArrowUpRight size={14} /></Link>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '2rem' }}>
            {related.map((p, i) => (
              <div key={p.slug} style={{ gridColumn: `span ${i === 0 ? 6 : 3}` }} className="related-item">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Prev / Next ---- */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}>
          {prev && (
            <Link to={`/work/${prev.slug}`} className="pg-nav" style={{ textDecoration: 'none', color: 'inherit', padding: '2.4rem 1.5rem 2.4rem 0', borderRight: '1px solid var(--border-subtle)' }}>
              <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>← PREVIOUS</span>
              <div className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '0.5rem' }}>{prev.title}</div>
            </Link>
          )}
          {next && (
            <Link to={`/work/${next.slug}`} className="pg-nav" style={{ textDecoration: 'none', color: 'inherit', padding: '2.4rem 0 2.4rem 1.5rem', textAlign: 'right' }}>
              <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.2em' }}>NEXT →</span>
              <div className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '0.5rem' }}>{next.title}</div>
            </Link>
          )}
        </div>
      </section>

      <style>{`
        .pg-nav .font-display { transition: color 0.3s ease; }
        .pg-nav:hover .font-display { color: var(--accent); }

        @media (max-width: 1024px) {
          .proj-desc, .proj-meta, .gallery-item, .related-item { grid-column: span 12 !important; }
          .related-item:nth-child(2), .related-item:nth-child(3) { grid-column: span 6 !important; }
        }
      `}</style>
    </PageTransition>
  );
}