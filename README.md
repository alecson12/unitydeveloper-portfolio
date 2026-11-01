# Unity Game Developer Portfolio — Alecson Gantica

A standalone, single-page portfolio for Unity work. Dark, cinematic presentation
built so that **all the words, images and videos live in three content files** and
the rest of the site builds itself from them.

Stack: Vite · React · Tailwind CSS v4 · Framer Motion.

---

## Running it

```bash
npm install
npm run dev          # local preview at http://localhost:5173 (or 5174 from the Claude launch config)
npm run build        # production files in dist/
```

---

## Folder structure (the parts you will touch)

```
UnityPortfolio/
├── public/
│   └── media/                         ← ALL screenshots, recordings, covers
│       ├── rivalis-academia-nexus/    ← one folder per project (folder name = project id)
│       │   ├── cover.svg              ← project cover image
│       │   ├── game-interface/        ← one folder per showcase category
│       │   ├── gameplay-systems/
│       │   ├── ui-ux-improvements/
│       │   └── technical-implementations/
│       ├── your-next-project/         ← template folder for the next project
│       └── profile/                   ← (create it) your portrait, if you add one
│
├── src/
│   ├── content/                       ← THE ONLY FILES YOU NEED TO EDIT
│   │   ├── profile.js                 ← your name, hero text, about me, skills, contact links
│   │   ├── projects.js                ← every project, its categories and its media
│   │   └── sections.js                ← homepage section headings, order and "coming soon" text
│   │
│   ├── components/                    ← building blocks (no content inside)
│   │   ├── Nav.jsx                    sticky navigation
│   │   ├── Hero.jsx                   first screen
│   │   ├── FeaturedProject.jsx        case study with category tabs
│   │   ├── ProjectCard.jsx            cards in "More projects"
│   │   ├── MediaGallery.jsx           image grid + video rows for any media list
│   │   ├── Lightbox.jsx               full-screen viewer (click an image, ← → Esc)
│   │   ├── VideoShowcase.jsx          dedicated video player tile
│   │   ├── About.jsx / Skills.jsx / Contact.jsx / Footer.jsx
│   │   └── Reveal.jsx / Section.jsx / SectionHeading.jsx / ComingSoon.jsx
│   ├── pages/
│   │   ├── Home.jsx                   the single-page homepage
│   │   └── ProjectPage.jsx            full case-study page at  #/project/<id>
│   ├── lib/
│   │   ├── content.js                 helpers that read the content files
│   │   └── router.js                  tiny hash router
│   └── index.css                      colours, fonts and shared styles
│
└── .claude/launch.json                lets Claude preview the site on port 5174
```

Anything in `[square brackets]` inside the content files is a placeholder waiting for your text.

---

## How to add a screenshot

1. Export the screenshot as PNG or JPG (16:9 looks best, any size works).
2. Drop it into the matching category folder, with a readable name:
   `public/media/rivalis-academia-nexus/game-interface/quest-log-panel.png`
3. Open `src/content/projects.js`, find the project → the category → its `media` list,
   and add one entry:

```js
{
  type: 'image',
  src: '/media/rivalis-academia-nexus/game-interface/quest-log-panel.png',
  caption: 'Quest log panel. I built the layout, the tab switching and the scroll behaviour.',
  alt: 'Quest log panel showing three active quests',
},
```

That's it. It appears in the project's tab, opens in the lightbox, and — if the
category's `kind` is `'gameplay'` or `'technical'` — also in the matching homepage
section.

The first image in a category is shown larger; the order in the list is the order
on the page.

## How to add a screen recording (video)

1. Export the clip as `.mp4` (H.264) or `.webm`. Keep it under ~50 MB if you can.
2. Also export one still frame as a PNG/JPG — this is the thumbnail shown before play.
3. Drop both into the category folder, e.g.
   `public/media/rivalis-academia-nexus/gameplay-systems/party-system-demo.mp4`
   `public/media/rivalis-academia-nexus/gameplay-systems/party-system-demo-thumbnail.png`
4. Add an entry with `type: 'video'`:

```js
{
  type: 'video',
  src: '/media/rivalis-academia-nexus/gameplay-systems/party-system-demo.mp4',
  poster: '/media/rivalis-academia-nexus/gameplay-systems/party-system-demo-thumbnail.png',
  caption: 'Party system demo. I implemented the invite flow and the shared HUD.',
  alt: 'Recording of players forming a party',
},
```

Videos get their own full-width player row above the image grid. While a clip is
still being exported you can leave `src: ''` and the site shows a tasteful
"recording coming soon" tile using the poster.

## How to add a new showcase category to a project

In `projects.js`, copy one block inside `sections` and change:

- `id` — lowercase with dashes; also create a folder with that name under the project's media folder
- `kind` — `'ui'`, `'gameplay'` or `'technical'` (decides which homepage section also shows it)
- `title`, `description`, `media`

Categories appear as tabs in the order they are listed.

## How to add a new project

1. Copy the **TEMPLATE** block at the bottom of `src/content/projects.js`.
2. Give it a unique `id` (lowercase, dashes, no spaces) and create
   `public/media/<that-id>/` with a `cover` image and one folder per category.
3. Fill in `title`, `tagline`, `role`, `period`, `tech`, `summary`, `sections`.
4. Set `visible: true` when it's ready. Leave `featured: false` so it goes in the
   "More projects" grid (set `featured: true` to make it the homepage case study).

Each project automatically gets its own page at `#/project/<id>`.

## Where to edit about / skills / contact

All in `src/content/profile.js`:

| What | Key |
| --- | --- |
| Headline, intro, buttons, the three quick facts | `hero` |
| About-me paragraphs, portrait, "at a glance" facts | `about` |
| Skill groups and the chips inside them | `skills` |
| Email / GitHub / LinkedIn / itch links, CV download | `contact` |
| Footer line | `footer` |

To add a portrait: put the image in `public/media/profile/` and set
`about.portrait = '/media/profile/portrait.jpg'`.

To change a section heading, its intro line, or the order of sections, edit
`src/content/sections.js`.

---

## Colours and fonts

Everything visual is driven by the tokens at the top of `src/index.css`
(`--color-accent`, `--color-ink`, fonts, shadows). Change a token and the whole
site follows. Fonts are Sora (headings), Inter (body) and JetBrains Mono (labels),
loaded from Google Fonts in `index.html`.

## Deploying

`npm run build` produces a static `dist/` folder that works on any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages). Because routing uses `#` hashes,
no server configuration is needed.
