import { useEffect, useMemo, useState } from 'react'
import FeatureBlock from './FeatureBlock.jsx'
import Reveal from './Reveal.jsx'
import EmptyState from './EmptyState.jsx'
import { featuresOf } from '../lib/content.js'

/**
 * A project's UI, organised as categories → features. A thin sticky line
 * of category links follows the reader and marks the one on screen.
 */
export default function UIShowcase({ project }) {
  const cats = useMemo(() => (project.categories ?? []).filter((c) => c.features?.length), [project])
  const features = useMemo(() => featuresOf(project), [project])
  const [active, setActive] = useState(cats[0]?.id ?? '')

  useEffect(() => {
    const els = cats.map((c) => document.getElementById(`cat-${c.id}`)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id.replace('cat-', ''))
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.1] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [cats])

  if (!cats.length) return <EmptyState message="UI captures are being prepared." />

  return (
    <div>
      <CategoryBar cats={cats} active={active} />

      <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
        {cats.map((c, ci) => (
          <section key={c.id} id={`cat-${c.id}`} className="scroll-mt-28">
            <Reveal>
              <p className="label"><span className="text-accent">/</span>Group {String(ci + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-display text-4xl font-extrabold leading-none tracking-[-0.03em] sm:text-5xl lg:text-6xl">{c.name}</h3>
              {c.blurb && <p className="mt-4 max-w-xl text-ink-2">{c.blurb}</p>}
            </Reveal>
            <div className="mt-10 space-y-16 sm:mt-14 sm:space-y-20">
              {c.features.map((f) => (
                <FeatureBlock
                  key={f.id}
                  feature={f}
                  index={features.findIndex((x) => x.id === f.id && x.category.id === c.id)}
                  total={features.length}
                  project={project}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function CategoryBar({ cats, active }) {
  return (
    <div className="sticky top-[72px] z-30 -mx-5 border-b border-line bg-bg/90 px-5 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 xl:-mx-16 xl:px-16 2xl:-mx-20 2xl:px-20">
      <nav aria-label="UI categories" className="overflow-x-auto">
        <ul className="flex min-w-max gap-7 py-4">
          {cats.map((c, i) => (
            <li key={c.id}>
              <a href={`#cat-${c.id}`} className={`label whitespace-nowrap transition ${active === c.id ? 'text-ink' : 'hover:text-ink'}`}>
                <span className={active === c.id ? 'text-accent' : 'text-line-2'}>{String(i + 1).padStart(2, '0')}</span>
                <span className="ml-2">{c.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
