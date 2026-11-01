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
  firstName: 'Alecson',
  title: 'Unity Game Developer',

  /* ---------- HERO (the first screen) ---------- */
  hero: {
    // Small line above the big headline
    eyebrow: 'Unity · C# · Gameplay & Interface',
    // The big headline. Keep it short — two lines max on a phone.
    headline: 'Building the systems players feel, and the interfaces they never have to think about.',
    // One or two sentences under the headline.
    intro:
      '[Placeholder — write one or two sentences about what you do in Unity, e.g. the kind of systems you build and the kind of games you work on.]',
    primaryButton: { label: 'View featured project', href: '#featured' },
    secondaryButton: { label: 'Get in touch', href: '#contact' },
    // Short facts shown under the buttons. Keep each one to a few words.
    facts: [
      { label: 'Engine', value: 'Unity' },
      { label: 'Language', value: 'C#' },
      { label: 'Focus', value: 'Gameplay · UI · Tools' },
    ],
  },

  /* ---------- ABOUT ME ---------- */
  about: {
    // Each string becomes one paragraph. Add or remove as you like.
    paragraphs: [
      '[Placeholder — a short paragraph about who you are as a game developer: how you got into Unity, what you enjoy building, and what you care about when you build it.]',
      '[Placeholder — a second paragraph: the kind of team role you take, how you work with designers and artists, and what you are looking for next.]',
    ],
    // Optional portrait. Drop a file into  public/media/profile/  and
    // set the path here, e.g. '/media/profile/portrait.jpg'. Leave as
    // null to show a decorative panel instead of a photo.
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
    {
      group: 'Engine & Language',
      items: ['Unity', 'C#'],
    },
    {
      group: 'Game Interface',
      items: ['Unity UI (uGUI)', '[Add the UI tools you used]'],
    },
    {
      group: 'Gameplay & Systems',
      items: ['[e.g. gameplay scripting]', '[e.g. state machines]'],
    },
    {
      group: 'Tools & Workflow',
      items: ['Git', '[e.g. Trello]', '[e.g. Figma / Photoshop]'],
    },
  ],

  /* ---------- CONTACT ---------- */
  contact: {
    text:
      '[Placeholder — one sentence inviting people to reach out: what kind of work or team you are looking for.]',
    // Replace the placeholder values. Remove any line you do not want shown.
    // `href` is the link; `label` is what people see.
    links: [
      { kind: 'email', label: '[your@email.com]', href: 'mailto:[your@email.com]' },
      { kind: 'github', label: '[github.com/your-username]', href: 'https://github.com/[your-username]' },
      { kind: 'linkedin', label: '[linkedin.com/in/your-name]', href: 'https://www.linkedin.com/in/[your-name]' },
      { kind: 'itch', label: '[your-name.itch.io]', href: 'https://[your-name].itch.io' },
    ],
    // Optional link to a downloadable CV. Put the file in  public/  and
    // set e.g. '/Alecson-Gantica-CV.pdf'. Leave null to hide the button.
    cv: null,
  },

  /* ---------- FOOTER ---------- */
  footer: {
    note: 'Designed and built by Alecson Gantica.',
  },
}
