import Reveal from './Reveal.jsx'
import MediaFrame from './MediaFrame.jsx'
import VideoShowcase from './VideoShowcase.jsx'
import Txt from './Txt.jsx'
import { countMedia, hasSource } from '../lib/content.js'
import { projectHref } from '../lib/router.js'

/**
 * The flagship case study header: a numbered line of metadata, the logo,
 * the title and story beside a column of facts, then the lead recording
 * at full width and an index of the UI groups.
 */
export default function FeaturedProject({ project, full = false }) {
  const counts = countMedia(project)
  const cats = (project.categories ?? []).filter((c) => c.features?.length)
  const chips = [project.genre, project.platform, project.status, ...(project.tech ?? [])].filter(Boolean)
  const metaLine = [project.role, project.studio, project.period].filter((v) => v && !/^\s*\[/.test(v))

  return (
    <Reveal>
      <article>
        <p className="label flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-ink">01</span>
          <span className="h-px w-8 bg-line-2" />
          {metaLine.map((m, i) => (
            <span key={i} className="flex items-center gap-4">
              {i > 0 && <span className="text-line-2">·</span>}
              {m}
            </span>
          ))}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            {project.logo && (
              <img src={project.logo} alt={`${project.title} logo`} width="1672" height="941" className="h-auto w-56 sm:w-72" />
            )}
            <h3 className={`font-display font-extrabold leading-[0.98] tracking-[-0.03em] ${project.logo ? 'sr-only' : 'text-5xl sm:text-6xl'}`}>{project.title}</h3>
            {project.tagline && <p className="mt-8 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">{project.tagline}</p>}
            {project.intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{project.intro}</p>}
            <div className="mt-6 space-y-3 text-ink-2">
              {(project.overview ?? []).map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {chips.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {chips.map((c) => <span key={c} className="chip">{c}</span>)}
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <dl className="rows">
              <Fact label="Role" value={project.role} />
              <Fact label="Studio" value={project.studio} />
              <Fact label="Platform" value={project.platform} />
              <Fact label="Engine" value={project.tech?.join(' · ')} />
              <Fact label="Interfaces" value={counts.features} />
              <Fact label="Recordings" value={counts.videos} />
            </dl>
            {project.contribution?.length > 0 && (
              <div className="mt-8">
                <p className="label">My part</p>
                <ul className="mt-3 space-y-2">
                  {project.contribution.map((c, i) => <Txt key={i} as="li" value={c} className="block text-sm leading-relaxed text-ink-2" />)}
                </ul>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#ui-showcase" className="btn btn-primary">Explore the UI →</a>
              {!full && <a href={projectHref(project.id)} className="btn btn-ghost">Full case study</a>}
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-20">
          {project.lead && hasSource(project.lead) ? (
            <VideoShowcase item={project.lead} label={project.title} badge="Lead recording" pixelated={project.pixelArt} />
          ) : (
            <MediaFrame label={project.title} badge={project.status}>
              <img src={project.cover} alt={project.coverAlt ?? project.title} className={`aspect-video object-cover ${project.pixelArt ? 'pixelated' : ''}`} />
            </MediaFrame>
          )}
        </div>

        {cats.length > 0 && (
          <div className="mt-14 sm:mt-20">
            <p className="label">Jump to a group</p>
            <ol className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-10">
              {cats.map((c, i) => (
                <li key={c.id} className="border-t border-line">
                  <a href={`#cat-${c.id}`} className="group flex items-baseline justify-between gap-4 py-4 transition hover:text-accent">
                    <span className="font-display text-lg font-semibold tracking-tight">{c.name}</span>
                    <span className="label transition group-hover:text-accent">{String(i + 1).padStart(2, '0')}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </article>
    </Reveal>
  )
}

function Fact({ label, value }) {
  if (value === undefined || value === null || value === '' || /^\s*\[/.test(String(value))) return null
  return (
    <div className="row flex items-baseline justify-between gap-6 !py-3.5">
      <dt className="label">{label}</dt>
      <dd className="text-right text-sm text-ink">{String(value)}</dd>
    </div>
  )
}
