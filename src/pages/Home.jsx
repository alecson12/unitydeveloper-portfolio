import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import CloudDivider from '../components/CloudDivider.jsx'
import FeaturedProject from '../components/FeaturedProject.jsx'
import UIShowcase from '../components/UIShowcase.jsx'
import ShowcaseList from '../components/ShowcaseList.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import EmptyIsland from '../components/EmptyIsland.jsx'
import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'
import Contact from '../components/Contact.jsx'
import { SECTIONS } from '../content/sections.js'
import { GAMEPLAY, TECHNICAL } from '../content/showcases.js'
import { featuredProject, otherProjects } from '../lib/content.js'

const meta = (id) => SECTIONS.find((s) => s.id === id) ?? { id }

export default function Home() {
  const featured = featuredProject()
  const others = otherProjects()

  return (
    <>
      <Hero />

      <Section id="featured" meta={{ ...meta('featured'), heading: featured?.title ?? meta('featured').heading }}>
        {featured ? <FeaturedProject project={featured} /> : <EmptyIsland message="The flagship project is being prepared." />}
      </Section>

      <CloudDivider decor={['tree', 'person']} />

      <Section id="ui-showcase" meta={meta('ui-showcase')}>
        {featured ? <UIShowcase project={featured} /> : <EmptyIsland message="UI captures are being prepared." />}
      </Section>

      <CloudDivider decor={['house']} />

      <Section id="gameplay" meta={meta('gameplay')}>
        <ShowcaseList entries={GAMEPLAY} empty={meta('gameplay').empty} icon="controller" />
      </Section>

      <Section id="technical" meta={meta('technical')} tight>
        <ShowcaseList entries={TECHNICAL} empty={meta('technical').empty} icon="code" />
      </Section>

      <Section id="projects" meta={meta('projects')} tight>
        {others.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        ) : (
          <EmptyIsland message={meta('projects').empty} />
        )}
      </Section>

      <CloudDivider decor={['flag', 'tree']} />

      <Section id="about" meta={meta('about')}>
        <About />
      </Section>

      <Section id="skills" meta={meta('skills')} tight>
        <Skills />
      </Section>

      <Section id="contact" meta={meta('contact')}>
        <Contact />
      </Section>
    </>
  )
}
