import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import FeaturedProject from '../components/FeaturedProject.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import MediaGallery from '../components/MediaGallery.jsx'
import ComingSoon from '../components/ComingSoon.jsx'
import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'
import Contact from '../components/Contact.jsx'
import { SECTIONS } from '../content/sections.js'
import { featuredProject, otherProjects, mediaByKind } from '../lib/content.js'

const meta = (id) => SECTIONS.find((s) => s.id === id) ?? { id }

export default function Home() {
  const featured = featuredProject()
  const others = otherProjects()
  const gameplay = mediaByKind('gameplay')
  const technical = mediaByKind('technical')

  return (
    <>
      <Hero />

      <Section id="featured" meta={meta('featured')}>
        {featured ? <FeaturedProject project={featured} /> : <ComingSoon message="The featured case study is being prepared." />}
      </Section>

      <Divider />

      <Section id="projects" meta={meta('projects')}>
        {others.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        ) : (
          <ComingSoon message={meta('projects').comingSoon} />
        )}
      </Section>

      <Divider />

      <Section id="gameplay" meta={meta('gameplay')}>
        <MediaGallery items={gameplay} emptyMessage={meta('gameplay').comingSoon} showSource />
      </Section>

      <Divider />

      <Section id="technical" meta={meta('technical')}>
        <MediaGallery items={technical} emptyMessage={meta('technical').comingSoon} showSource />
      </Section>

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
