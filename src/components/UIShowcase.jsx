import { useEffect, useMemo, useState } from 'react'
import FeatureBlock from './FeatureBlock.jsx'
import PixelIcon from './PixelIcon.jsx'
import Reveal from './Reveal.jsx'
import EmptyState from './EmptyState.jsx'
import { featuresOf } from '../lib/content.js'

/**
 * A project's UI, organised as categories → features. A sticky bar of
 * category chips follows the reader and highlights the category on screen.
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

      <div className="mt-12 space-y-20 sm:mt-16 sm:space-y-28">
        {cats.map((c, ci) => (
          <section key={c.id} id={`cat-${c.id}`} className="scroll-mt-40">
            <CategoryHeader category={c} index={ci} />
            <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
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
    <div className="sticky top-[76px] z-30">
      <nav aria-label="UI categories" className="px-card -mx-1 overflow-x-auto px-3 py-2.5 backdrop-blur-md">
        <ul className="flex min-w-max gap-2">
          {cats.map((c) => (
            <li key={c.id}>
              <a href={`#cat-${c.id}`} className={`px-chip whitespace-nowrap transition-colors ${active === c.id ? 'px-chip-active' : 'hover:bg-white/15'}`}>
                <PixelIcon name={c.icon} size={12} accent={active === c.id ? '#ffb6d8' : undefined} />
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function CategoryHeader({ category: c, index }) {
  return (
    <Reveal>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-4 sm:gap-5">
          <span className="px-card grid h-14 w-14 shrink-0 place-items-center sm:h-16 sm:w-16">
            <PixelIcon name={c.icon} size={30} accent="#ffb6d8" />
          </span>
          <div>
            <p className="eyebrow">Category {String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 font-display text-4xl leading-none tracking-tight sm:text-5xl">{c.name}</h3>
            {c.blurb && <p className="mt-3 max-w-xl text-ink-2">{c.blurb}</p>}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
