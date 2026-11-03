/**
 * =====================================================================
 *  ABOUT ME — background, education, what you do, tools, highlights, statement
 * =====================================================================
 *  Everything on the About Me part of the site comes from this file.
 *  Short facts (name, title, photo, contact) live in profile.js.
 *  Keep it short: visitors skim. One idea per line.
 *
 *  PLACEHOLDERS
 *    Text in [square brackets] is a placeholder. It shows with a dashed
 *    outline in local preview and is HIDDEN on the published site.
 *
 *  CONFIRMED / UNCONFIRMED
 *    Services and tools carry  confirmed: true | false.
 *    Unconfirmed items appear only in local preview (marked "to confirm").
 *    Flip one to  confirmed: true  when it is real.
 * ===================================================================== */

export const ABOUT = {
  /* ---------- PROFESSIONAL BACKGROUND ---------- */
  background: {
    // One or two short paragraphs.
    paragraphs: [
      'Unity Developer at VIIBYTE on Rivalis Academia Nexus since 2023. I implemented all 21 in-game interfaces, from login to settings, and designed some of them myself.',
      'Developing games is my dream, so I taught myself Unity in college, starting with school projects.',
    ],
    // Oldest first, so the latest sits at the bottom. Only real entries.
    timeline: [
      { period: '2021', title: 'Started with Unity', place: 'Self-taught, in college', note: 'School projects.' },
      { period: '2023 — Present', title: 'Unity Developer', place: 'VIIBYTE · Rivalis Academia Nexus', note: '21 in-game interfaces, Unity + C#. Implemented all, designed some.' },
    ],
    // Schooling, oldest first. level · school · course (optional) · period
    education: [
      { level: 'Primary', school: 'St. Mary’s College of Meycauayan', period: '2006 — 2009' },
      { level: 'Primary', school: 'Calvario Elementary School', period: '2009 — 2013' },
      { level: 'Secondary', school: 'St. Michael School of Marilao', course: 'Science, Technology, Engineering and Mathematics', period: '2013 — 2019' },
      { level: 'Tertiary', school: 'Pambayang Dalubhasaan ng Marilao', course: 'Bachelor of Science in Information Technology', period: 'Graduate' },
    ],
    // Three short lines.
    strengths: [
      'Game UI from mock-up to working screen',
      'Touch-first: thumb-reach HUDs, joysticks, radial menus',
      'Data-heavy screens: inventory, shops, trading, rankings',
    ],
  },

  /* ---------- WHAT I DO ---------- */
  // Name + icon only. icon: controller · hud · code · gear · party · shop · star · map · trophy
  services: [
    { id: 'unity', name: 'Unity Game Development', icon: 'controller', confirmed: true },
    { id: 'ui', name: 'Game UI / UX Implementation', icon: 'hud', confirmed: true },
    { id: 'csharp', name: 'C# Programming', icon: 'code', confirmed: true },
    { id: 'systems', name: 'Game Systems', icon: 'gear', confirmed: true },
    { id: 'gameplay', name: 'Gameplay Programming', icon: 'star', confirmed: true },
    { id: 'optimisation', name: 'Bug Fixing & Optimisation', icon: 'trophy', confirmed: true },
    { id: 'ui-design', name: 'UI Design', icon: 'map', confirmed: true },
  ],

  /* ---------- TOOLS & TECHNOLOGIES ---------- */
  // The apps you work in. Icons live in  public/media/icons/  (SVG; drawn in
  // the site's colour, so any single-colour icon works). Languages go in the
  // skill groups in profile.js, not here.
  tools: [
    { name: 'Unity', kind: 'Engine', icon: '/media/icons/unity.svg', confirmed: true },
    { name: 'Visual Studio', kind: 'IDE', icon: '/media/icons/visual-studio.svg', confirmed: true },
    { name: 'GitHub', kind: 'Version control', icon: '/media/icons/github.svg', confirmed: true },
    { name: 'Photoshop', kind: 'Design', icon: '/media/icons/photoshop.svg', confirmed: true },
    { name: 'Illustrator', kind: 'Design', icon: '/media/icons/illustrator.svg', confirmed: true },
    { name: 'Trello', kind: 'Planning', icon: '/media/icons/trello.svg', confirmed: true },
  ],

  /* ---------- PROFESSIONAL HIGHLIGHTS ---------- */
  // Big numbers. 'auto' values are counted from projects.js; [brackets] stay hidden.
  highlights: [
    { label: 'Interfaces shipped', value: 'auto:features', note: '' },
    { label: 'Recordings on this site', value: 'auto:videos', note: '' },
    { label: 'Years in Unity', value: '5', note: 'since 2021' },
    { label: 'Players on Rivalis', value: '100K', note: 'almost · live now' },
  ],
  // One line each. Only real ones.
  notable: [
    'Rivalis Academia Nexus is live, with almost 100,000 players and counting.',
    'Player-facing HUD layout editor: scale, opacity, undo/redo, presets.',
  ],

  /* ---------- PERSONAL DEVELOPER STATEMENT ---------- */
  // Your words. One short paragraph is enough.
  statement: [
    '[Placeholder — two or three sentences: what good game UI means to you, and what you want to build next.]',
  ],
}
