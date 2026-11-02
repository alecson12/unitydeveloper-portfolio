import Reveal from './Reveal.jsx'
import PixelWindow from './PixelWindow.jsx'
import PixelIcon from './PixelIcon.jsx'
import VideoShowcase from './VideoShowcase.jsx'
import Txt from './Txt.jsx'
import { countMedia, hasSource } from '../lib/content.js'
import { projectHref } from '../lib/router.js'

/**
 * The flagship case-study header: what the project is, your part in it,
 * the facts, the lead recording and an index of the UI categories.
 */
export default function FeaturedProject({ project, full = false }) {
  const counts = countMedia(project)
  const cats = (project.categories ?? []).filter((c) => c.features?.length)
  const chips = [project.genre, project.platform, project.status, ...(project.tech ?? [])].filter(Boolean)

  return (
    <Reveal>
      <article className="px-card p-5 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col lg:col-span-5">
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => <span key={c} className="px-chip">{c}</span>)}
            </div>
            <h3 className="mt-6 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl">{project.title}</h3>
            {project.tagline && <p className="mt-4 text-lg text-ink-2">{project.tagline}</p>}
            {project.intro && <p className="mt-6 leading-relaxed">{project.intro}</p>}
            <div className="mt-4 space-y-3 text-ink-2">
              {(project.overview ?? []).map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {project.contribution?.length > 0 && (
              <div className="mt-7 border-l-4 border-pink pl-4">
                <p className="font-pixel text-[9px] tracking-[0.18em] text-dim uppercase">My part</p>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed">
                  {project.contribution.map((c, i) => <Txt key={i} as="li" value={c} />)}
                </ul>
              </div>
            )}

            <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 border-t-2 border-line pt-6 sm:grid-cols-3">
              <Fact label="Role" value={project.role} />
              <Fact label="Platform" value={project.platform} />
              <Fact label="Engine" value={project.tech?.join(' · ')} />
              <Fact label="Period" value={project.period} />
              <Fact label="Interfaces" value={counts.features} />
              <Fact label="Captures" value={`${counts.videos} videos · ${counts.images} shots`} />
            </dl>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#ui-showcase" className="px-btn px-btn-primary">Explore the UI</a>
              {!full && <a href={projectHref(project.id)} className="px-btn px-btn-ghost">Full case study</a>}
            </div>
          </div>

          <div className="lg:col-span-7">
            {project.lead && hasSource(project.lead) ? (
              <VideoShowcase item={project.lead} label={project.title} badge="Lead recording" pixelated={project.pixelArt} />
            ) : (
              <PixelWindow label={project.title} badge={project.status}>
                <img src={project.cover} alt={project.coverAlt ?? project.title} className={`aspect-video object-cover ${project.pixelArt ? 'pixelated' : ''}`} />
              </PixelWindow>
            )}

            {cats.length > 0 && (
              <div className="mt-8">
                <p className="font-pixel text-[9px] tracking-[0.18em] text-dim uppercase">Jump to a group</p>
                <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {cats.map((c) => (
                    <li key={c.id}>
                      <a href={`#cat-${c.id}`} className="px-card px-card-lift flex h-full items-center gap-3 bg-cloud-2 px-3 py-3">
                        <PixelIcon name={c.icon} size={20} className="shrink-0" />
                        <span className="font-pixel text-[9px] leading-snug tracking-[0.12em] uppercase">{c.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function Fact({ label, value }) {
  if (value === undefined || value === null || value === '') return null
  return (
    <div>
      <dt className="font-pixel text-[9px] tracking-[0.18em] text-dim uppercase">{label}</dt>
      <Txt as="dd" value={String(value)} className="mt-1.5 text-sm" />
    </div>
  )
}
