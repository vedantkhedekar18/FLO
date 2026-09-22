import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CAPABILITIES } from '../../data/capabilities';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

// 8 projects mapping the capabilities to the Russian project names from the reference video
const WOODLAND_PROJECTS = [
  {
    capabilityId: 'exterior-cgi',
    projectName: 'Альбатрос',
    type: 'Жилой дом из клееного бруса',
    category: 'Дома',
    bedrooms: 4,
    floors: 2,
    style: 'Бревенчатые',
    area: '300 - 500 м²',
    img: '/assets/exterior/14.jpg',
  },
  {
    capabilityId: 'interior-cgi',
    projectName: 'Любинка',
    type: 'Жилой дом из клееного бруса',
    category: 'Дома',
    bedrooms: 3,
    floors: 2,
    style: 'Модерн',
    area: '300 - 500 м²',
    img: '/assets/interior/Grand lobby_05_HR.jpg',
  },
  {
    capabilityId: 'animation-walkthrough',
    projectName: 'Сен Тропе',
    type: 'Жилой дом из клееного бруса',
    category: 'Дома',
    bedrooms: 5,
    floors: 2,
    style: 'Фахверк',
    area: '500+ м²',
    img: '/assets/exterior/15.jpg',
  },
  {
    capabilityId: 'virtual-tours-360',
    projectName: 'Сан Сити',
    type: 'Жилой дом из клееного бруса',
    category: 'Бани',
    bedrooms: 2,
    floors: 1,
    style: 'Модерн',
    area: '100 - 300 м²',
    img: '/assets/interior/Lobby.jpg',
  },
  {
    capabilityId: 'brochure-design',
    projectName: 'Пушкино',
    type: 'Жилой дом из клееного бруса',
    category: 'Дома',
    bedrooms: 4,
    floors: 2,
    style: 'Бревенчатые',
    area: '300 - 500 м²',
    img: '/assets/home/brochure design.jpg',
  },
  {
    capabilityId: 'logo-design',
    projectName: 'Ренессанс',
    type: 'Жилой дом из клееного бруса',
    category: 'Бани',
    bedrooms: 3,
    floors: 2,
    style: 'Шале',
    area: '300 - 500 м²',
    img: '/assets/exterior/Cam_7.jpg',
  },
  {
    capabilityId: 'drone-shoot',
    projectName: 'Барминка',
    type: 'Жилой дом из клееного бруса',
    category: 'Беседки',
    bedrooms: 1,
    floors: 1,
    style: 'Бревенчатые',
    area: '100 - 300 м²',
    img: '/assets/home/Drone.jpg',
  },
  {
    capabilityId: 'plans-isometric',
    projectName: 'Венеж',
    type: 'Жилой дом из клееного бруса',
    category: 'Дома',
    bedrooms: 3,
    floors: 2,
    style: 'Минимализм',
    area: '300 - 500 м²',
    img: '/assets/floor-plans/GROUND FLOOR.jpg',
  },
];

export default function WoodlandCapabilitiesSection() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const heroHeadingRef = useRef(null);
  const cardImageRefs = useRef([]);

  // Scroll tracking container and trigger
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  // Trigger tracks exactly the first 100vh scroll through the section
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ['start start', 'end start'],
  });

  // Seamless scroll transforms:
  // As user scrolls down, main hero image scales gently and slowly fades/disappears,
  // while headline & header drift up and fade out smoothly.
  const mainImageOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.92],
    reduced ? [1, 1, 1] : [1, 0.65, 0]
  );
  const mainImageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1, 1.07]
  );
  const mainImageDarken = useTransform(
    scrollYProgress,
    [0, 0.85],
    reduced ? [0.35, 0.35] : [0.35, 0.95]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.45],
    reduced ? [1, 1] : [1, 0]
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 0.45],
    reduced ? [0, 0] : [0, -45]
  );

  const displayedProjects = WOODLAND_PROJECTS;

  useEffect(() => {
    if (reduced) return;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const hero = heroHeadingRef.current;
    const projectImages = cardImageRefs.current.filter(Boolean);

    if (!hero && projectImages.length === 0) return;

    const lenisInstance = window.lenis;

    if (!lenisInstance || typeof lenisInstance.on !== 'function') {
      return;
    }

    let currentSkew = 0;
    let currentTilt = 0;
    let currentScale = 1;
    let targetSkew = 0;
    let targetTilt = 0;
    let targetScale = 1;
    let lastScrollY = window.scrollY;
    let lastVelocity = 0;
    let nextFrame = 0;

    const applyMotion = () => {
      if (Math.abs(lastVelocity) < 0.001) {
        targetSkew = 0;
        targetTilt = 0;
        targetScale = 1;
      }

      currentSkew += (targetSkew - currentSkew) * 0.08;
      currentTilt += (targetTilt - currentTilt) * 0.08;
      currentScale += (targetScale - currentScale) * 0.08;

      if (hero) {
        hero.style.transform = `perspective(1200px) rotateX(${currentTilt}deg) skewY(${currentSkew}deg) scale(${currentScale})`;
        hero.style.transformOrigin = 'center';
        hero.style.transformStyle = 'preserve-3d';
        hero.style.willChange = 'transform';
      }

      projectImages.forEach((img) => {
        const imageSkew = currentSkew * 0.5;
        const imageTilt = currentTilt * 0.5;
        const imageScale = 1 - Math.min(Math.abs(lastVelocity) * 0.0003, 0.02);
        img.style.transform = `perspective(1200px) rotateX(${imageTilt}deg) skewY(${imageSkew}deg) scale(${imageScale})`;
        img.style.transformOrigin = 'center';
        img.style.willChange = 'transform';
        img.style.transformStyle = 'preserve-3d';
      });

      nextFrame = requestAnimationFrame(applyMotion);
    };

    const handleScroll = (event) => {
      const rawVelocity = typeof event?.velocity === 'number'
        ? event.velocity
        : (window.scrollY - lastScrollY) * 0.8;

      const velocity = clamp(rawVelocity, -80, 80);
      lastScrollY = window.scrollY;
      lastVelocity = velocity;

      const skew = velocity * 0.03;
      const tilt = velocity * 0.015;
      const scale = 1 - Math.min(Math.abs(velocity) * 0.0006, 0.04);

      targetSkew = clamp(skew, -2.5, 2.5);
      targetTilt = clamp(tilt, -1.2, 1.2);
      targetScale = clamp(scale, 0.96, 1);
    };

    lenisInstance.on('scroll', handleScroll);
    nextFrame = requestAnimationFrame(applyMotion);

    return () => {
      cancelAnimationFrame(nextFrame);
      lenisInstance.off('scroll', handleScroll);
    };
  }, [reduced]);

  return (
    <section
      ref={containerRef}
      className="woodland-wrapper"
      style={{
        background: '#121212',
        color: '#ffffff',
        position: 'relative',
      }}
    >
      {/* 100vh INVISIBLE SCROLL MEASUREMENT TRIGGER (NOT STICKY) */}
      <div
        ref={triggerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          pointerEvents: 'none',
          visibility: 'hidden',
        }}
      />

      {/* 1. STICKY MAIN HERO IMAGE WITH SLOW DISAPPEARANCE ANIMATION */}
      <div
        className="woodland-sticky-hero"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Background Main Image with slow zoom and fade-out */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            scale: mainImageScale,
            opacity: mainImageOpacity,
            willChange: 'transform, opacity',
            backgroundImage: 'url(/assets/exterior/Final%20Road%20Side%20View.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 42%',
          }}
        />

        {/* Ambient Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(12,12,12,0.62) 0%, rgba(12,12,12,0.3) 38%, rgba(18,18,18,0.92) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Dynamic Darkening Layer as main image slowly disappears */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#121212',
            opacity: mainImageDarken,
            pointerEvents: 'none',
          }}
        />

        {/* NON-STICKY HEADER — FADES & DRIFTS UP WITH SCROLL */}
        <motion.header
          className="woodland-header"
          style={{
            opacity: textOpacity,
            y: textY,
            width: '100%',
            maxWidth: '1520px',
            margin: '0 auto',
            padding: '1.8rem clamp(1.25rem, 4vw, 3.5rem) 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <h1
            ref={heroHeadingRef}
            style={{
              margin: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '-0.06em',
              lineHeight: 1,
              color: '#ffffff',
              transformStyle: 'preserve-3d',
              perspective: '1200px',
            }}
          >
            woodland
          </h1>
          <div style={{ width: '10.5rem', height: '2.6rem' }} />
        </motion.header>

        {/* Bottom space placeholder to balance hero content */}
        <div style={{ height: '7rem' }} />
      </div>

      {/* 2. ROLL-UP LAYER: ROLLS UP OVER THE MAIN IMAGE WITH 2-COLUMN GRID & FILTER */}
      <div
        id="woodland-grid"
        className="woodland-rollup-layer"
        style={{
          position: 'relative',
          zIndex: 10,
          background: '#121212',
          marginTop: '-150px', // Overlaps bottom of hero so the filter is visible immediately
          boxShadow: '0 -35px 80px rgba(0, 0, 0, 0.85)',
          paddingTop: '1.5rem',
          willChange: 'transform',
        }}
      >
        {/* 2-COLUMN PROJECTS GRID (ROLLING UP OVER THE MAIN IMAGE) */}
        <div
          className="woodland-projects-grid-container"
          style={{
            width: '100%',
            maxWidth: '1520px',
            margin: '0 auto',
            padding: '0 clamp(1rem, 3vw, 2.5rem) 6rem',
          }}
        >
          <div
            className="woodland-projects-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'clamp(18px, 2vw, 28px)',
            }}
          >
            {displayedProjects.map((item) => {
              const cap = CAPABILITIES.find((c) => c.id === item.capabilityId);
              const localized = t.capabilities?.items?.[item.capabilityId] || {};
              const capTitle = localized?.title || cap?.title || item.projectName;
              const capTagline = localized?.tagline || cap?.tagline || item.type;
              const linkTarget = cap?.to || '/work';

              return (
                <Link
                  key={item.capabilityId}
                  to={linkTarget}
                  style={{
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '22px',
                    textDecoration: 'none',
                    color: 'inherit',
                    aspectRatio: '16/10',
                    background: '#181818',
                    transform: 'translateY(0)',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.18)',
                    transition:
                      'transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-radius 0.45s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.28)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.18)';
                  }}
                >
                  {/* Image: clean presentation, softly curved corners */}
                  <img
                    ref={(node) => {
                      if (node) cardImageRefs.current.push(node);
                    }}
                    className="woodland-card-media"
                    src={item.img}
                    alt={`${item.projectName} — ${capTitle}`}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: '22px',
                      transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1), filter 0.35s ease',
                      transform: 'scale(1)',
                      filter: 'saturate(0.96) contrast(1.02)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.06)';
                      e.currentTarget.style.filter = 'saturate(1.04) contrast(1.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.filter = 'saturate(0.96) contrast(1.02)';
                    }}
                  />

                  {/* Bottom gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, transparent 40%, rgba(12, 12, 12, 0.45) 70%, rgba(10, 10, 10, 0.92) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 'clamp(1.2rem, 2.8vw, 2.4rem)',
                      borderRadius: '22px',
                      transition: 'opacity 0.35s ease, transform 0.45s ease',
                    }}
                    onMouseEnter={(e) => {
                      const text = e.currentTarget.querySelectorAll('h3, p');
                      text.forEach((el) => {
                        el.style.transform = 'translateY(-4px)';
                        el.style.textShadow = '0 10px 25px rgba(0,0,0,0.48)';
                        el.style.filter = 'drop-shadow(0 8px 12px rgba(0,0,0,0.22))';
                      });
                    }}
                    onMouseLeave={(e) => {
                      const text = e.currentTarget.querySelectorAll('h3, p');
                      text.forEach((el) => {
                        el.style.transform = 'translateY(0)';
                        el.style.textShadow = 'none';
                        el.style.filter = 'none';
                      });
                    }}
                  >
                    {/* Russian project name + Capability title in serif bold */}
                    <h3
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: 'clamp(1.25rem, 2vw, 1.85rem)',
                        fontWeight: 600,
                        color: '#ffffff',
                        margin: '0 0 0.35rem 0',
                        letterSpacing: '-0.01em',
                        transition:
                          'transform 0.45s cubic-bezier(0.16,1,0.3,1), text-shadow 0.45s ease, filter 0.45s ease',
                        transform: 'translateY(0)',
                      }}
                    >
                      {item.projectName}
                      <span
                        style={{
                          fontSize: '0.85em',
                          fontWeight: 400,
                          opacity: 0.85,
                          marginLeft: '0.6rem',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        / {capTitle}
                      </span>
                    </h3>

                    {/* Subtitle / Tagline from Capabilities */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.72rem, 1vw, 0.84rem)',
                        lineHeight: 1.5,
                        color: 'rgba(240, 240, 240, 0.72)',
                        margin: 0,
                        maxWidth: '90%',
                        transition:
                          'transform 0.45s cubic-bezier(0.16,1,0.3,1), text-shadow 0.45s ease, filter 0.45s ease',
                        transform: 'translateY(0)',
                      }}
                    >
                      <span
                        style={{
                          color: 'rgba(255,255,255,0.92)',
                          marginRight: '0.5rem',
                        }}
                      >
                        {item.type}
                      </span>
                      — {capTagline}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .woodland-nav { display: none !important; }
          .woodland-projects-grid { grid-template-columns: 1fr !important; }
          .woodland-filter-controls {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .woodland-rollup-layer {
            margin-top: -110px !important;
          }
        }
      `}</style>
    </section>
  );
}
