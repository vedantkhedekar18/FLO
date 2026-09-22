import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * PageTransition — fades/slides each routed page in and out.
 * Paired with <AnimatePresence mode="wait"> in App.
 */
export default function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.main>
  );
}