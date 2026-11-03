import { motion } from 'framer-motion'
import PixelWindow from './PixelWindow.jsx'
import { projectHref } from '../lib/router.js'
import { countMedia } from '../lib/content.js'

/** Card for the "Other projects" grid. */
export default function ProjectCard({ project, index = 0 }) {
  const counts = countMedia(project)
  return (
    <motion.a
      href={projectHref(project.id)}
      className="group block"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <PixelWindow label={project.title} badge={project.status} className="px-card-lift">
        <img src={project.cover} alt={project.coverAlt ?? project.title} className={`aspect-video object-cover ${project.pixelArt ? 'pixelated' : ''}`} />
        <div className="border-t-2 border-line p-5">
          <h3 className="font-display text-2xl leading-none tracking-tight text-beige">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-ink-2">{project.tagline}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-pixel text-[12px] tracking-[0.08em] text-dim uppercase">
            {project.platform && <span>{project.platform}</span>}
            <span>{counts.features} {counts.features === 1 ? 'interface' : 'interfaces'}</span>
            <span className="ml-auto text-red opacity-0 transition group-hover:opacity-100">Open ▶</span>
          </div>
        </div>
      </PixelWindow>
    </motion.a>
  )
}
