/**
 * =====================================================================
 *  YOUR PROFILE — name, hero text, about me, skills, contact
 * =====================================================================
 *  This is the ONE file to edit for everything that is about YOU.
 *  Projects live in  src/content/projects.js
 *
 *  Anything wrapped in [square brackets] is a placeholder waiting for
 *  your real text. Replace it, keep the quotes around it.
 * ===================================================================== */

export const PROFILE = {
  name: 'Alecson Gantica',
  title: 'Unity UI Developer',

  /* ---------- HERO (the first screen) ---------- */
  hero: {
    // Small line above the big headline
    eyebrow: 'Unity · C# · Game UI',
    // The big headline. Keep it short.
    headline: 'Game interfaces, built to be played.',
    // One or two sentences under the headline.
    intro:
      '[Placeholder — one or two sentences about the UI you build in Unity and what you care about when you build it.]',
    primaryButton: { label: 'See the UI', href: '#featured' },
    secondaryButton: { label: 'Contact', href: '#contact' },
    // Short facts shown under the buttons. Keep each one to a few words.
    facts: [
      { label: 'Engine', value: 'Unity' },
      { label: 'Language', value: 'C#' },
      { label: 'Focus', value: 'Game UI' },
    ],
  },

  /* ---------- ABOUT ME ---------- */
  about: {
    // Each string becomes one paragraph. Add or remove as you like.
    paragraphs: [
      '[Placeholder — who you are as a game developer: how you got into Unity, what you enjoy building, and what you care about when you build it.]',
      '[Placeholder — how you work with designers and artists, and what you are looking for next.]',
    ],
    // Optional portrait. Drop a file into  public/media/profile/  and
    // set the path here, e.g. '/media/profile/portrait.jpg'. Leave as
    // null to show a decorative pixel panel instead of a photo.
    portrait: null,
    portraitAlt: 'Portrait of Alecson Gantica',
    // Short "at a glance" list beside the text.
    highlights: [
      { label: 'Based in', value: '[City, Country]' },
      { label: 'Open to', value: '[Full-time / Contract / Remote]' },
      { label: 'Also', value: 'Graphic designer & Krump choreographer' },
    ],
  },

  /* ---------- SKILLS & TECHNOLOGIES ---------- */
  // Groups of skills. Add a group by copying one block.
  // Only list what you have actually used.
  skills: [
    { group: 'Engine & Language', items: ['Unity', 'C#'] },
    { group: 'Game UI', items: ['Unity UI (uGUI)', '[Add the UI tools you used]'] },
    { group: 'Design', items: ['Photoshop', '[e.g. Figma]'] },
    { group: 'Workflow', items: ['Git', '[e.g. Trello]'] },
  ],

  /* ---------- CONTACT ---------- */
  contact: {
    text: '[Placeholder — one sentence inviting people to reach out: what kind of work or team you are looking for.]',
    // Replace the placeholder values. Remove any line you do not want shown.
    links: [
      { kind: 'email', label: '[your@email.com]', href: 'mailto:[your@email.com]' },
      { kind: 'github', label: '[github.com/your-username]', href: 'https://github.com/[your-username]' },
      { kind: 'linkedin', label: '[linkedin.com/in/your-name]', href: 'https://www.linkedin.com/in/[your-name]' },
    ],
    // Optional downloadable CV. Put the file in  public/  and set e.g.
    // '/Alecson-Gantica-CV.pdf'. Leave null to hide the button.
    cv: null,
  },

  footer: {
    note: 'Designed and built by Alecson Gantica.',
  },
}
