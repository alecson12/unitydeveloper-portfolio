/**
 * =====================================================================
 *  YOUR PROJECTS — every game, prototype and showcase on the site
 * =====================================================================
 *  This is the ONE file to edit to add a screenshot, a video, a new
 *  showcase category, or a whole new project. Nothing else needs to
 *  change — the site reads this list and builds itself.
 *
 *  HOW MEDIA WORKS
 *    1. Put the file in:  public/media/<project id>/<category folder>/
 *       Use readable names, e.g.  quest-tracker-panel.png
 *    2. Add an entry to the matching `media` list below:
 *         { type: 'image', src: '/media/<project id>/<folder>/file.png',
 *           caption: 'What this shows and what you built.',
 *           alt: 'Short description for screen readers.' }
 *       For a screen recording use  type: 'video'  and add a `poster`
 *       image (a screenshot used as the thumbnail before play):
 *         { type: 'video', src: '/media/.../clip.mp4',
 *           poster: '/media/.../clip-thumbnail.png',
 *           caption: '...', alt: '...' }
 *       A video with an empty src ('') shows a "recording coming soon"
 *       tile — handy while you are still exporting the clip.
 *
 *  SHOWCASE CATEGORIES (`sections`)
 *    Each category gets its own tab on the project page.
 *    `kind` tells the homepage which site-wide section the media also
 *    appears in:
 *        'gameplay'  → "Gameplay Programming"
 *        'technical' → "Technical Showcase"
 *        'ui'        → shown only inside the project
 *
 *  SHOWING / HIDING A PROJECT
 *    `visible: false` keeps a project off the site while you prepare it.
 *    `featured: true` puts it in the big case-study slot on the homepage
 *    (the first featured + visible project wins).
 * ===================================================================== */

export const PROJECTS = [
  /* =================================================================
   *  RIVALIS ACADEMIA NEXUS
   * ================================================================= */
  {
    id: 'rivalis-academia-nexus', // also the folder name under public/media/
    visible: true,
    featured: true,

    title: 'Rivalis Academia Nexus',
    tagline: 'A Unity MMORPG — game interface, gameplay systems and technical implementation work.',
    role: '[Your role — e.g. Unity Developer]',
    period: '[Start — End, e.g. 2024 — Present]',
    team: '[Team size or studio name, or remove this line]',
    status: 'In development',
    tech: ['Unity', 'C#'],
    // Shown on the project card and at the top of the case study.
    cover: '/media/rivalis-academia-nexus/cover.svg',
    coverAlt: 'Rivalis Academia Nexus cover image',
    // Optional external links. Remove the ones you do not have.
    links: [
      // { label: 'Play / Store page', href: 'https://...' },
      // { label: 'Trailer', href: 'https://...' },
    ],

    // One or two short paragraphs. Keep it about what YOU did.
    summary: [
      '[Placeholder — describe the project in one or two sentences: what kind of MMORPG it is and what the player does.]',
      '[Placeholder — describe your part in it: which areas you owned, who you worked with, and what you are most proud of.]',
    ],

    // Optional. Short, honest highlights — only things you actually did.
    highlights: [
      '[Placeholder — one contribution per line]',
      '[Placeholder — e.g. “Built the …”, “Reworked the …”]',
    ],

    sections: [
      {
        id: 'game-interface',
        kind: 'ui',
        title: 'Game Interface Development',
        description:
          '[Placeholder — what interface work you did on this game and how you approached it.]',
        media: [
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/game-interface/placeholder-01.svg',
            caption: '[Placeholder caption — what this screen is and what you built in it.]',
            alt: 'Placeholder for a game interface screenshot',
          },
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/game-interface/placeholder-02.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a game interface screenshot',
          },
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/game-interface/placeholder-03.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a game interface screenshot',
          },
        ],
      },
      {
        id: 'gameplay-systems',
        kind: 'gameplay',
        title: 'Gameplay Systems',
        description:
          '[Placeholder — which gameplay systems you worked on and what made them interesting to build.]',
        media: [
          {
            type: 'video',
            src: '', // ← paste the path to your .mp4 / .webm here when ready
            poster: '/media/rivalis-academia-nexus/gameplay-systems/placeholder-recording-thumbnail.svg',
            caption: '[Placeholder — screen recording of a gameplay system in action.]',
            alt: 'Placeholder for a gameplay recording',
          },
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/gameplay-systems/placeholder-01.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a gameplay screenshot',
          },
        ],
      },
      {
        id: 'ui-ux-improvements',
        kind: 'ui',
        title: 'UI/UX Improvements',
        description:
          '[Placeholder — what you improved, why it needed improving, and how the result is better for players.]',
        media: [
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/ui-ux-improvements/placeholder-01.svg',
            caption: '[Placeholder caption — e.g. before / after]',
            alt: 'Placeholder for a UI/UX improvement screenshot',
          },
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/ui-ux-improvements/placeholder-02.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a UI/UX improvement screenshot',
          },
        ],
      },
      {
        id: 'technical-implementations',
        kind: 'technical',
        title: 'Technical Implementations',
        description:
          '[Placeholder — the under-the-hood work: tools, architecture, optimisation, pipelines.]',
        media: [
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/technical-implementations/placeholder-01.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a technical implementation screenshot',
          },
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/technical-implementations/placeholder-02.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a technical implementation screenshot',
          },
        ],
      },
    ],
  },

  /* =================================================================
   *  TEMPLATE — copy this block to add another project.
   *  Set  visible: true  when it is ready to show.
   * ================================================================= */
  {
    id: 'your-next-project', // folder name under public/media/ — lowercase, dashes, no spaces
    visible: false,
    featured: false,

    title: 'Your Next Project',
    tagline: 'One sentence that says what it is.',
    role: 'Your role',
    period: '2025',
    team: 'Solo',
    status: 'Prototype',
    tech: ['Unity', 'C#'],
    cover: '/media/your-next-project/cover.svg',
    coverAlt: 'Cover image',
    links: [],
    summary: ['What the project is.', 'What you did on it.'],
    highlights: [],
    sections: [
      {
        id: 'screenshots',
        kind: 'gameplay',
        title: 'Screenshots',
        description: 'A few words about what these show.',
        media: [
          {
            type: 'image',
            src: '/media/your-next-project/screenshots/placeholder-screenshot.svg',
            caption: 'Caption',
            alt: 'Alt text',
          },
        ],
      },
    ],
  },
]
