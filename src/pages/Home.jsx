import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import UIShowcase from '../components/UIShowcase.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ComingSoon from '../components/ComingSoon.jsx'
import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'
import Contact from '../components/Contact.jsx'
import { SECTIONS } from '../content/sections.js'
import { featuredProject, otherProjects } from '../lib/content.js'

const meta = (id) => SECTIONS.find((s) => s.id === id) ?? { id }

export default function Home() {
  const featured = featuredProject()
  const others = otherProjects()

  return (
    <>
      <Hero />

      <Section id="featured" meta={meta('featured')}>
        {featured ? <UIShowcase project={featured} /> : <ComingSoon message="The featured project is being prepared." />}
      </Section>

      {others.length > 0 && (
        <>
          <Divider />
          <Section id="projects" meta={meta('projects')}>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          </Section>
        </>
      )}

      <Divider />

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

function Divider() {
  return (
    <div className="container-x">
      <div className="hairline" />
    </div>
  )
}
