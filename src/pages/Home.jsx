import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import CloudDivider from '../components/CloudDivider.jsx'
import { Background, Services, Highlights } from '../components/AboutMe.jsx'
import Toolkit from '../components/Toolkit.jsx'
import FeaturedProject from '../components/FeaturedProject.jsx'
import UIShowcase from '../components/UIShowcase.jsx'
import ShowcaseList from '../components/ShowcaseList.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import EmptyIsland from '../components/EmptyIsland.jsx'
import Skills from '../components/Skills.jsx'
import Contact from '../components/Contact.jsx'
import { SECTIONS } from '../content/sections.js'
import { GAMEPLAY } from '../content/showcases.js'
import { featuredProject, otherProjects } from '../lib/content.js'

const meta = (id) => SECTIONS.find((s) => s.id === id) ?? { id }

/**
 * Page order:  About Me (hero → background → what I do → highlights → toolkit)
 *              Projects (flagship → UI showcase → more)
 *              Skills & expertise
 *              Contact
 */
export default function Home() {
  const featured = featuredProject()
  const others = otherProjects()

  return (
    <>
      {/* ---------------- ABOUT ME ---------------- */}
      <Hero />

      <Section id="profile" meta={meta('profile')}>
        <Background />
      </Section>

      <Section id="services" meta={meta('services')} tight>
        <Services />
        <div className="mt-6"><Highlights /></div>
      </Section>

      <Section id="toolkit" meta={meta('toolkit')} tight>
        <Toolkit empty={meta('toolkit').empty} />
      </Section>

      <CloudDivider decor={['tree', 'person']} />

      {/* ---------------- PROJECTS ---------------- */}
      <Section id="projects" meta={{ ...meta('projects'), heading: featured?.title ?? meta('projects').heading }}>
        {featured ? <FeaturedProject project={featured} /> : <EmptyIsland message="The flagship project is being prepared." />}
      </Section>

      <Section id="ui-showcase" meta={meta('ui-showcase')}>
        {featured ? <UIShowcase project={featured} /> : <EmptyIsland message="UI captures are being prepared." />}
      </Section>

      <Section id="more-projects" meta={meta('more-projects')} tight>
        {others.length > 0 || GAMEPLAY.length > 0 ? (
          <div className="space-y-8">
            {others.length > 0 && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
              </div>
            )}
            {GAMEPLAY.length > 0 && <ShowcaseList entries={GAMEPLAY} icon="controller" />}
          </div>
        ) : (
          <EmptyIsland message={meta('more-projects').empty} />
        )}
      </Section>

      <CloudDivider decor={['house']} />

      {/* ---------------- SKILLS ---------------- */}
      <Section id="skills" meta={meta('skills')}>
        <Skills />
      </Section>

      <CloudDivider decor={['flag', 'tree']} />

      {/* ---------------- CONTACT ---------------- */}
      <Section id="contact" meta={meta('contact')}>
        <Contact />
      </Section>
    </>
  )
}
