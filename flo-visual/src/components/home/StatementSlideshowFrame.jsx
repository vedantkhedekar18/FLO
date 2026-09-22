import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

// Import SS images directly for Vite bundling and cache-busting
import imgAlWaab from '../../../SS/Al Waab City Walkthrough.jpg';
import imgEntranceLobby from '../../../SS/Entrance Lobby.jpg';
import imgGI1 from '../../../SS/GI_1.jpg';
import imgVisual4 from '../../../SS/Visual_4.jpg';

const EASE = [0.16, 1, 0.3, 1];
const SLIDE_DURATION = 6000; // 6 seconds per slide

const SLIDES = [
  {
    id: 'al-waab',
    src: imgAlWaab || '/SS/Al Waab City Walkthrough.jpg',
    fallbackSrc: '/SS/Al Waab City Walkthrough.jpg',
    alt: 'Al Waab City Walkthrough — Urban Architectural Masterplan',
    title: 'Al Waab City Walkthrough',
    category: 'URBAN MASTERPLAN',
    discipline: 'Pedestrian & Spatial Flow',
  },
  {
    id: 'entrance-lobby',
    src: imgEntranceLobby || '/SS/Entrance Lobby.jpg',
    fallbackSrc: '/SS/Entrance Lobby.jpg',
    alt: 'Entrance Lobby — Curated Interior & Bespoke Joinery',
    title: 'Grand Entrance Lobby',
    category: 'INTERIOR ARCHITECTURE',
    discipline: 'Curated Tactility & Warm Lighting',
  },
  {
    id: 'gi-1',
    src: imgGI1 || '/SS/GI_1.jpg',
    fallbackSrc: '/SS/GI_1.jpg',
    alt: 'Facade Study GI-01 — Daylight Choreography',
    title: 'Facade Study GI-01',
    category: 'EXTERIOR FACADE',
    discipline: 'Natural Light & Materiality',
  },
  {
    id: 'visual-4',
    src: imgVisual4 || '/SS/Visual_4.jpg',
    fallbackSrc: '/SS/Visual_4.jpg',
    alt: 'Waterfront Pavilion Visual 04 — Atmospheric Exterior',
    title: 'Pavilion Visual 04',
    category: 'CINEMATIC ENVIRONMENT',
    discipline: 'Dusk Ambience & Horizon View',
  },
];

export default function StatementSlideshowFrame() {
  const reduced = usePrefersReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Slideshow advances every 6 seconds without interruption
  useEffect(() => {
    if (reduced) return;

    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [nextSlide, reduced]);

  const activeSlide = SLIDES[currentIndex];

  return (
    <div
      className="statement-slideshow-frame"
      role="region"
      aria-roledescription="carousel"
      aria-label="Flo Visual Portfolio Showcase"
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(460px, 60vh, 660px)',
        minHeight: 440,
        borderRadius: '6px',
        overflow: 'hidden',
        background: '#0d0e10',
        boxShadow:
          '0 28px 64px -16px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Inner architectural hairline museum matting border */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '10px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '4px',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      {/* Image crossfade viewport */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduced ? 0.3 : 0.85,
              ease: EASE,
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <motion.img
              src={activeSlide.src}
              onError={(e) => {
                if (activeSlide.fallbackSrc && e.currentTarget.src !== activeSlide.fallbackSrc) {
                  e.currentTarget.src = activeSlide.fallbackSrc;
                }
              }}
              alt={activeSlide.alt}
              loading="eager"
              decoding="async"
              className="tone-image"
              initial={reduced ? false : { scale: 1.04 }}
              animate={reduced ? false : { scale: 1 }}
              transition={{
                duration: 6,
                ease: 'easeOut',
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 42%',
                display: 'block',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Side Navigation Arrows */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '18px',
          right: '18px',
          transform: 'translateY(-50%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 7,
        }}
      >
        <button
          onClick={prevSlide}
          aria-label="Previous architectural image"
          style={{
            pointerEvents: 'auto',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(15, 16, 18, 0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'rgba(245, 244, 240, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: 0.5,
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.background = 'rgba(25, 26, 30, 0.85)';
            e.currentTarget.style.transform = 'scale(1.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.5';
            e.currentTarget.style.background = 'rgba(15, 16, 18, 0.45)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next architectural image"
          style={{
            pointerEvents: 'auto',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(15, 16, 18, 0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'rgba(245, 244, 240, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: 0.5,
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.background = 'rgba(25, 26, 30, 0.85)';
            e.currentTarget.style.transform = 'scale(1.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.5';
            e.currentTarget.style.background = 'rgba(15, 16, 18, 0.45)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
