import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

/**
 * ParallaxImage — a lazy image that drifts vertically against the page
 * scroll. Inner scale prevents edge gaps. Reduced-motion renders flat.
 */
export default function ParallaxImage({ src, alt = '', className = '', speed = 14, style }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <div ref={ref} className={`media-frame ${className}`} style={{ overflow: 'hidden', ...style }}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          scale: 1.12,
          y: reduced ? 0 : y,
          willChange: 'transform',
        }}
      />
    </div>
  );
}