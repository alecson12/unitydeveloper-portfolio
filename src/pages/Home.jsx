import Start from '../components/Start.jsx'
import Section from '../components/Section.jsx'
import AboutMe from '../components/AboutMe.jsx'
import Skills from '../components/Skills.jsx'
import FeaturedProject from '../components/FeaturedProject.jsx'
import UIShowcase from '../components/UIShowcase.jsx'
import ShowcaseList from '../components/ShowcaseList.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Contact from '../components/Contact.jsx'
import { SECTIONS } from '../content/sections.js'
import { GAMEPLAY } from '../content/showcases.js'
import { featuredProject, otherProjects } from '../lib/content.js'

const meta = (id) => SECTIONS.find((s) => s.id === id) ?? { id }

/**
 * Page order:  Start → About Me → Skills → Projects (flagship, feature by
 * feature, more) → Contact.
 */
export default function Home() {
  const featured = featuredProject()
  const others = otherProjects()
  const hasMore = others.length > 0 || GAMEPLAY.length > 0

  return (
    <>
      <Start />

      <Section id="about" meta={meta('about')}>
        <AboutMe />
      </Section>

      <Section id="skills" meta={meta('skills')}>
        <Skills />
      </Section>

      <Section id="projects" meta={meta('projects')}>
        {featured ? <FeaturedProject project={featured} /> : <EmptyState message="The flagship project is being prepared." />}
      </Section>

      <Section id="ui-showcase" meta={meta('ui-showcase')} tight>
        {featured ? <UIShowcase project={featured} /> : <EmptyState message="UI captures are being prepared." />}
      </Section>

      {hasMore && (
        <Section id="more-projects" meta={meta('more-projects')} tight>
          <div className="space-y-8">
            {others.length > 0 && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
              </div>
            )}
            {GAMEPLAY.length > 0 && <ShowcaseList entries={GAMEPLAY} />}
          </div>
        </Section>
      )}

      <Section id="contact" meta={null}>
        <Contact meta={meta('contact')} />
      </Section>
    </>
  )
}
