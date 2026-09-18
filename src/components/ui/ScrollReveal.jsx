import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const VARIANTS = {
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  up: { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -36 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -64 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 64 }, show: { opacity: 1, x: 0 } },
  clip: {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    show: { clipPath: 'inset(0 0% 0 0)' },
  },
  clipUp: {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    show: { clipPath: 'inset(0% 0 0 0)' },
  },
  scale: { hidden: { opacity: 0, scale: 1.06 }, show: { opacity: 1, scale: 1 } },
};

/**
 * ScrollReveal — wrapper that animates children into view on scroll.
 * variant: fade | up | down | left | right | clip | clipUp | scale
 */
export default function ScrollReveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.85,
  once = true,
  className = '',
  margin = '-12% 0px',
  as = 'div',
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      variants={VARIANTS[variant] || VARIANTS.fade}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}