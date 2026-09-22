import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — fixed 2px bar tracking page scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}