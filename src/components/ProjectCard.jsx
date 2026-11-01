import { motion } from 'framer-motion'
import PixelWindow from './PixelWindow.jsx'
import { projectHref } from '../lib/router.js'

/** Card for the "Other projects" grid. */
export default function ProjectCard({ project, index = 0 }) {
  const screens = project.screens?.length ?? 0
  return (
    <motion.a
      href={projectHref(project.id)}
      className="group block transition-transform duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <PixelWindow label={project.title} badge={project.status}>
        <img src={project.cover} alt={project.coverAlt ?? project.title} className={`aspect-video object-cover ${project.pixelArt ? 'pixelated' : ''}`} />
        <div className="border-t-2 border-white/10 p-5">
          <h3 className="font-display text-2xl font-semibold leading-none tracking-tight">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{project.tagline}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-pixel text-[9px] tracking-[0.16em] text-dim uppercase">
            {project.period && <span>{project.period}</span>}
            <span>{screens} {screens === 1 ? 'screen' : 'screens'}</span>
            <span className="ml-auto text-accent opacity-0 transition group-hover:opacity-100">Open ▶</span>
          </div>
        </div>
      </PixelWindow>
    </motion.a>
  )
}
