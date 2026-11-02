/**
 * =====================================================================
 *  SITE SECTIONS — headings of each homepage block, in page order
 * =====================================================================
 *  `nav` is the short label in the navigation (leave it out to keep a
 *  section off the menu). `index` is the small number beside the label.
 *  `intro` is optional — most sections read better without one.
 * ===================================================================== */

export const SECTIONS = [
  { id: 'start', nav: 'Start' },
  { id: 'about', nav: 'About Me', index: '01', label: 'About', heading: 'Who I am' },
  { id: 'skills', nav: 'Skills', index: '02', label: 'Skills', heading: 'What I can do' },
  { id: 'projects', nav: 'Projects', index: '03', label: 'Projects', heading: 'What I have built' },
  { id: 'ui-showcase', label: 'Case study', heading: 'The UI, feature by feature', intro: 'Tap a screenshot to enlarge it. Press play for the real recording.' },
  { id: 'more-projects', label: 'More work', heading: 'More projects', empty: 'More projects are on the way.' },
  { id: 'contact', nav: 'Contact', label: 'Contact', heading: 'Let’s build the next screen.' },
]
