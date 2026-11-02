import { useEffect } from 'react'
import FeaturedProject from '../components/FeaturedProject.jsx'
import UIShowcase from '../components/UIShowcase.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import CloudDivider from '../components/CloudDivider.jsx'
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
        <p className="eyebrow mb-3">404</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight">That island is not on the map yet.</h1>
        <a href="#" className="px-btn px-btn-ghost mt-8">◀ Back</a>
      </section>
    )
  }

  return (
    <>
      <section className="container-x pt-32 sm:pt-40">
        <Reveal>
          <a href="#featured" className="font-pixel text-[10px] tracking-[0.16em] text-ink-2 uppercase transition hover:text-ink">◀ All work</a>
          <p className="eyebrow mb-4 mt-10 flex items-center gap-3"><span className="inline-block h-2 w-2 bg-purple" />Case study</p>
          <h1 className="font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl">{project.title}</h1>
        </Reveal>
        <div className="mt-12">
          <FeaturedProject project={project} full />
        </div>
      </section>

      <CloudDivider decor={['tree', 'person']} />

      <section id="ui-showcase" className="container-x scroll-mt-24 pb-24">
        <UIShowcase project={project} />
      </section>

      {others.length > 0 && (
        <section className="container-x py-24 sm:py-32">
          <p className="eyebrow mb-8 flex items-center gap-3"><span className="inline-block h-2 w-2 bg-purple" />More work</p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </section>
      )}
    </>
  )
}
