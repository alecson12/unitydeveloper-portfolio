/**
 * =====================================================================
 *  ABOUT ME — background, what you do, toolkit, highlights, statement
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
      'I built the full in-game interface of Rivalis Academia Nexus — 21 screens from login to settings, including a HUD players can rearrange themselves.',
      '[Placeholder — one sentence on how you got into Unity, one on what you did before Rivalis.]',
    ],
    // Newest first. Only real entries; the rest stay as placeholders.
    timeline: [
      { period: '[2024 — Present]', title: 'UI Developer', place: 'Rivalis Academia Nexus', note: '21 in-game interfaces, Unity + C#.' },
      { period: '[Year — Year]', title: '[Role]', place: '[Studio / team / client]', note: '[One line.]' },
      { period: '[Year]', title: '[Where it started]', place: '[School / self-taught / jam]', note: '' },
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
    { id: 'systems', name: 'Game Systems', icon: 'gear', confirmed: false },
    { id: 'gameplay', name: 'Gameplay Programming', icon: 'star', confirmed: false },
    { id: 'multiplayer', name: 'Online Game Features', icon: 'party', confirmed: false },
    { id: 'optimisation', name: 'Bug Fixing & Optimisation', icon: 'trophy', confirmed: false },
    { id: 'technical', name: 'Technical Implementation', icon: 'map', confirmed: false },
  ],

  /* ---------- TOOLS & TECHNOLOGIES ---------- */
  tools: [
    { name: 'Unity', kind: 'Engine', confirmed: true },
    { name: 'C#', kind: 'Language', confirmed: true },
    { name: 'Photoshop', kind: 'Design', confirmed: true },
    { name: 'Git', kind: 'Workflow', confirmed: true },
    { name: 'Visual Studio', kind: 'IDE', confirmed: false },
    { name: 'GitHub', kind: 'Workflow', confirmed: false },
    { name: 'Blender', kind: '3D', confirmed: false },
    { name: 'Figma', kind: 'Design', confirmed: false },
  ],

  /* ---------- MY DEVELOPMENT TOOLKIT ----------
   *  Tools, editor extensions, reusable systems and utilities you built
   *  yourself. Starts empty on purpose: local preview shows marked sample
   *  cards; the published site shows an "under construction" island.
   *  Media files go in  public/media/toolkit/<id>/
   *
   *  {
   *    id: 'ui-state-machine',
   *    name: 'UI State Machine',
   *    kind: 'Reusable system',            // or: Editor extension · Utility · Automation
   *    summary: 'One sentence: what it does.',
   *    bullets: ['Short line', 'Short line'],
   *    tech: ['Unity', 'C#'],
   *    media: [{ type: 'image', src: '/media/toolkit/ui-state-machine/inspector.png', width: 1920, height: 1080, caption: '…', alt: '…' }],
   *    link: { label: 'Source', href: 'https://github.com/...' },   // optional
   *  }
   */
  toolkit: [],

  /* ---------- PROFESSIONAL HIGHLIGHTS ---------- */
  // Big numbers. 'auto' values are counted from projects.js; [brackets] stay hidden.
  highlights: [
    { label: 'Interfaces shipped', value: 'auto:features', note: '' },
    { label: 'Recordings on this site', value: 'auto:videos', note: '' },
    { label: 'Years in Unity', value: '[0]', note: '' },
    { label: 'Teams / clients', value: '[0]', note: '' },
  ],
  // One line each. Only real ones.
  notable: [
    'Player-facing HUD layout editor: scale, opacity, undo/redo, presets.',
    '[Placeholder — one more thing you are proud of.]',
  ],

  /* ---------- PERSONAL DEVELOPER STATEMENT ---------- */
  // Your words. One short paragraph is enough.
  statement: [
    '[Placeholder — two or three sentences: what good game UI means to you, and what you want to build next.]',
  ],
}
