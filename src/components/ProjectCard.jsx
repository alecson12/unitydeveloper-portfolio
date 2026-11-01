import { motion } from 'framer-motion'
import { projectHref } from '../lib/router.js'
import { countMedia } from '../lib/content.js'

/** Card for the "More projects" grid. */
export default function ProjectCard({ project, index = 0 }) {
  const n = countMedia(project)
  return (
    <motion.a
      href={projectHref(project.id)}
      className="group glass relative flex flex-col overflow-hidden rounded-2xl transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img src={project.cover} alt={project.coverAlt ?? project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
        {project.status && (
          <span className="absolute left-3 top-3 rounded-md border border-white/10 bg-ink/70 px-2 py-1 font-mono text-[10px] tracking-widest text-muted uppercase backdrop-blur">
            {project.status}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight">{project.title}</h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent"><path d="M7 17L17 7M8 7h9v9" /></svg>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{project.tagline}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 font-mono text-[11px] tracking-wider text-dim uppercase">
          {project.period && <span>{project.period}</span>}
          {project.tech?.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
          <span className="ml-auto">{n} media</span>
        </div>
      </div>
    </motion.a>
  )
}
