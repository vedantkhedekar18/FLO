import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * RevealText — masked, staggered word reveal for editorial typography.
 * Each word slides up from a clipped line. Great for large display headers.
 */
export default function RevealText({
  text,
  as = 'span',
  className = '',
  delay = 0,
  stagger = 0.045,
  once = true,
  wordClassName = '',
}) {
  const words = String(text).split(' ');
  const Tag = as;
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            paddingBottom: '0.08em',
            marginBottom: '-0.08em',
          }}
        >
          <motion.span
            className={wordClassName}
            initial={{ y: '115%' }}
            whileInView={{ y: 0 }}
            viewport={{ once, margin: '-6% 0px' }}
            transition={{ duration: 0.75, ease: EASE, delay: delay + i * stagger }}
            style={{ display: 'inline-block', willChange: 'transform' }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}