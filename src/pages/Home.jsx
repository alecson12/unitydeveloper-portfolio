import Start from '../components/Start.jsx'
import Zone from '../components/Zone.jsx'
import Section from '../components/Section.jsx'
import { Intro, Services, Highlights } from '../components/AboutMe.jsx'
import FavouriteGames, { visibleGames } from '../components/FavouriteGames.jsx'
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
 * The dive, top to bottom:
 *   Start      — above the surface: the wordmark
 *   About Me   — shallow water: who I am (photo, journey, education, strengths), what I do
 *   Skills     — mid water: tools and skills
 *   Projects   — deep water: the flagship case study, feature by feature
 *   Contact    — the floor
 * Sections that share a depth sit in one <Zone>, so the water colour runs
 * continuously and the creatures of that depth swim behind them.
 */
export default function Home() {
  const featured = featuredProject()
  const others = otherProjects()

  return (
    <>
      <Start />

      {/* ---------------- ABOUT ME · shallow water ---------------- */}
      <Zone depth="shallow">
        <Section id="about" meta={meta('about')}>
          <Intro />
        </Section>
        {visibleGames().length > 0 && (
          <Section id="games" meta={meta('games')} tight>
            <FavouriteGames />
          </Section>
        )}
        <Section id="services" meta={meta('services')} tight>
          <Services />
          <div className="mt-6"><Highlights /></div>
        </Section>
      </Zone>

      {/* ---------------- SKILLS · mid water ---------------- */}
      <Zone depth="mid">
        <Section id="skills" meta={meta('skills')}>
          <Skills />
        </Section>
      </Zone>

      {/* ---------------- PROJECTS · deep water ---------------- */}
      <Zone depth="deep">
        <Section id="projects" meta={{ ...meta('projects'), heading: featured?.title ?? meta('projects').heading }}>
          {featured ? <FeaturedProject project={featured} /> : <EmptyState message="The flagship project is being prepared." />}
        </Section>

        <Section id="ui-showcase" meta={meta('ui-showcase')}>
          {featured ? <UIShowcase project={featured} /> : <EmptyState message="UI captures are being prepared." />}
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
            <EmptyState message={meta('more-projects').empty} />
          )}
        </Section>
      </Zone>

      {/* ---------------- CONTACT · the floor ---------------- */}
      <Zone depth="abyss">
        <Section id="contact" meta={meta('contact')}>
          <Contact />
        </Section>
      </Zone>
    </>
  )
}
