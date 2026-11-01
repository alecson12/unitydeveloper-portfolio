import { motion, useReducedMotion } from 'framer-motion'

/**
 * Fades + lifts children into view the first time they scroll on screen.
 * Usage: <Reveal delay={0.1}>...</Reveal>
 */
export default function Reveal({ children, delay = 0, y = 24, className = '', as = 'div', once = true }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}
