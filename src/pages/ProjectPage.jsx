import { useEffect } from 'react'
import FeaturedProject from '../components/FeaturedProject.jsx'
import UIShowcase from '../components/UIShowcase.jsx'
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
        <p className="label mb-4"><span className="text-accent">/</span>404</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight">That project is not here yet.</h1>
        <a href="#" className="btn btn-ghost mt-8">← Back</a>
      </section>
    )
  }

  return (
    <>
      <section className="container-x pt-32 sm:pt-40">
        <Reveal>
          <a href="#projects" className="label transition hover:text-ink">← All work</a>
          <p className="label mt-10"><span className="text-accent">/</span>Case study</p>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-7xl">{project.title}</h1>
        </Reveal>
        <div className="mt-14">
          <FeaturedProject project={project} full />
        </div>
      </section>

      <section id="ui-showcase" className="container-x mt-20 scroll-mt-20 pb-24 sm:mt-28">
        <UIShowcase project={project} />
      </section>

      {others.length > 0 && (
        <section className="container-x border-t border-line py-24">
          <p className="label mb-8"><span className="text-accent">/</span>More work</p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </section>
      )}
    </>
  )
}
