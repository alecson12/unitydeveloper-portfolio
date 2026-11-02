import { motion } from 'framer-motion'
import MediaFrame from './MediaFrame.jsx'
import { projectHref } from '../lib/router.js'
import { countMedia } from '../lib/content.js'

/** Entry in the "More projects" grid: cover, title, one line, metadata. */
export default function ProjectCard({ project, index = 0 }) {
  const counts = countMedia(project)
  return (
    <motion.a
      href={projectHref(project.id)}
      className="group block"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <MediaFrame>
        <img src={project.cover} alt={project.coverAlt ?? project.title} className={`aspect-video object-cover transition duration-500 group-hover:opacity-90 ${project.pixelArt ? 'pixelated' : ''}`} />
      </MediaFrame>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl font-bold tracking-tight transition group-hover:text-accent">{project.title}</h3>
        <span className="label">{String(index + 2).padStart(2, '0')}</span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-ink-2">{project.tagline}</p>
      <p className="label mt-4 flex flex-wrap gap-x-4">
        {project.platform && <span>{project.platform}</span>}
        <span>{counts.features} {counts.features === 1 ? 'interface' : 'interfaces'}</span>
      </p>
    </motion.a>
  )
}
