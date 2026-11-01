import { useEffect } from 'react'
import FeaturedProject from '../components/FeaturedProject.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { projectById, visibleProjects } from '../lib/content.js'
import { PROFILE } from '../content/profile.js'

/** Stand-alone case-study page at  #/project/<id> */
export default function ProjectPage({ id }) {
  const project = projectById(id)
  const others = visibleProjects().filter((p) => p.id !== id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = project ? `${project.title} — ${PROFILE.name}` : `${PROFILE.name} — ${PROFILE.title}`
    return () => { document.title = `${PROFILE.name} — ${PROFILE.title}` }
  }, [project])

  if (!project || project.visible === false) {
    return (
      <section className="container-x flex min-h-[70vh] flex-col items-start justify-center pt-24">
        <p className="eyebrow mb-3">Not found</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">That project is not on the site yet.</h1>
        <a href="#" className="mt-6 text-accent">← Back to all work</a>
      </section>
    )
  }

  return (
    <>
      <section className="container-x pt-28 sm:pt-36">
        <Reveal>
          <a href="#projects" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-text">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
            All projects
          </a>
          <p className="eyebrow mb-3 mt-8">Case study</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{project.title}</h1>
        </Reveal>
        <div className="mt-12">
          <FeaturedProject project={project} full />
        </div>
      </section>

      {others.length > 0 && (
        <section className="container-x py-24 sm:py-32">
          <p className="eyebrow mb-6">More work</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </section>
      )}
    </>
  )
}
