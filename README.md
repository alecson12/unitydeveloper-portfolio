# Unity Developer Portfolio — Alecson Marwin B. Gantica

A standalone portfolio in a **Clouds + Pixel Art** world: a bright sky with
floating islands outside, deep-navy panels for the work inside. It opens with
**About Me** (photo, background, what I do, toolkit, highlights), then the
**Projects** — Rivalis Academia Nexus shown with the real screenshots and
screen recordings — then **Skills & expertise** and **Contact**.

**All words, images and videos live in five content files.** The rest of the
site builds itself from them.

Stack: Vite · React · Tailwind CSS v4 · Framer Motion.

---

## Running it

```bash
npm install
npm run dev          # local preview at http://localhost:5174 (see .claude/launch.json)
npm run build        # production files in dist/
```

---

## Folder structure (the parts you will touch)

```
UnityPortfolio/
├── Rivalis_VidsAndPics/              ← YOUR ORIGINAL CAPTURES (untouched, not in git)
│
├── public/
│   └── media/                        ← everything the site shows
│       ├── profile/                  ← your photo(s)
│       └── rivalis-academia-nexus/   ← one folder per project (= project id)
│           ├── logo.webp             ← the project's official logo (transparent)
│           ├── entry/                ← one folder per CATEGORY (= category id)
│           │   ├── main-menu/        ← one folder per FEATURE (= feature id)
│           │   │   ├── main-menu-recording.mp4
│           │   │   ├── main-menu-recording-poster.jpg
│           │   │   ├── login.png
│           │   │   └── …
│           │   └── character-creation/
│           ├── hud/  character/  social/  communication/  commerce/  world/  system/
│           └── (profile/)            ← create it for your portrait
│
├── src/
│   ├── content/                      ← THE ONLY FILES YOU NEED TO EDIT
│   │   ├── profile.js                ← name, title, photo, opening intro, skill groups, contact
│   │   ├── about.js                  ← background, timeline, what I do, tools, toolkit, highlights, statement
│   │   ├── projects.js               ← projects → categories → features → media (+ logo)
│   │   ├── showcases.js              ← gameplay programming write-ups (under Projects · more)
│   │   └── sections.js               ← section headings, intros and nav labels
│   │
│   ├── components/                   ← building blocks (no content inside)
│   │   ├── Hero.jsx                  the opening sky scene
│   │   ├── FeaturedProject.jsx       the flagship case-study header
│   │   ├── UIShowcase.jsx            categories → FeatureBlock.jsx, with the sticky category bar
│   │   ├── MediaGallery.jsx          recordings + screenshots of one feature
│   │   ├── VideoShowcase.jsx         poster + play button → real <video>
│   │   ├── Lightbox.jsx              full-screen viewer (click an image, ← → Esc)
│   │   ├── PixelWindow.jsx           the pixel "game window" frame around media
│   │   ├── Sky.jsx / PixelCloud.jsx / Island.jsx / CloudDivider.jsx / PixelIcon.jsx
│   │   └── About.jsx / Skills.jsx / Contact.jsx / ShowcaseList.jsx / …
│   ├── pages/   Home.jsx · ProjectPage.jsx (#/project/<id>)
│   ├── lib/     helpers (content readers, hash router)
│   └── index.css                     colours, fonts, pixel borders, clouds
│
└── .claude/launch.json               lets Claude preview the site on port 5174
```

### Placeholders

Anything in `[square brackets]` in the content files is a placeholder. It shows
with a **dashed outline in local preview** and is **hidden on the published
site**, so nothing unfinished ever reaches visitors. Replace it when you can.

---

## How a project is organised

```
project  →  categories  →  features  →  media
```

| Level | What it is | Example |
| --- | --- | --- |
| **project** | a game | Rivalis Academia Nexus |
| **category** | a group of related UI | Chat & Communication |
| **feature** | one interface with its own highlight | Main Chat |
| **media** | its recordings and screenshots | chat-recording.mp4 |

Each feature shows its name, a one-line summary, a "What it does" list, your
contribution (if written), then its recordings and screenshots. Categories get
a header with a pixel icon and appear in the sticky chip bar.

## Where to put future screenshots and videos

```
public/media/<project id>/<category id>/<feature id>/<readable-name>
```

Example: a new screenshot of the chat window goes in
`public/media/rivalis-academia-nexus/communication/chat/whisper-tab.png`.

### Adding a screenshot

1. Export it as PNG or JPG at its real size. Nothing is cropped on the site.
2. Drop it into the feature's folder with a readable name.
3. In `src/content/projects.js`, find the feature and add to its `media` list:

```js
img('communication/chat', 'whisper-tab.png', 1920, 864, 'The Whisper tab.', 'Chat window on the Whisper tab'),
```

(`img(folder, file, width, height, caption, alt)` — width/height are the pixel
size of the file.) Screenshots **wider than 1000px** are shown large at their
own aspect ratio; **smaller UI crops** are shown at natural size on a dark
display stage. Clicking either opens the lightbox.

### Adding a recording

Phones usually record **HEVC / H.265**, which browsers cannot play. Convert to
**H.264 MP4** first (HandBrake with the "Web" preset works; the files on the
site were made with `ffmpeg -c:v libx264 -crf 23 -vf scale=1920:-2`). Then:

1. Put `my-recording.mp4` and a still frame `my-recording-poster.jpg` in the feature's folder.
2. Add to the feature's `media`:

```js
rec('communication/chat', 'my-recording', 'What the clip shows.', 'Recording of …'),
```

`rec(folder, name, caption, alt)` expects `<name>.mp4` and `<name>-poster.jpg`
side by side. Recordings only load when a visitor presses play, so many clips
on one page stay fast. A recording with `src: ''` shows a "coming soon" tile.

### Adding a feature or a category

Copy a feature block inside the right category (or a whole category block),
give it a new `id`, create the matching folder, and fill in `name`, `summary`,
`functions`, `media`. Icons for categories: `door · person · hud · bag · party ·
chat · shop · map · gear · trophy · code · controller · mail · star`.

### Adding a project

Copy the **TEMPLATE** block at the bottom of `projects.js`, give it a unique
`id`, create `public/media/<id>/…`, fill it in, and set `visible: true`. The
"Other Unity projects" section lists every visible project except the featured
one; each project also gets its own page at `#/project/<id>`.

## The About Me page

Everything about you is in two files:

| What | File → key |
| --- | --- |
| Full name, short name, title, opening headline and intro, photo, the three quick facts | `profile.js` → `name`, `shortName`, `title`, `hero` |
| Background paragraphs, timeline, strengths | `about.js` → `background` |
| What I do (service cards) | `about.js` → `services` — each has `confirmed: true/false` |
| Tools & technologies (tiles in Skills) | `about.js` → `tools` — each has `confirmed: true/false` |
| My development toolkit (tools you built) | `about.js` → `toolkit` |
| Professional highlights (big numbers) and notable contributions | `about.js` → `highlights`, `notable` |
| Personal developer statement | `about.js` → `statement` |
| Skill groups | `profile.js` → `skills` |
| Contact text, availability, links, CV | `profile.js` → `contact` |

**Confirmed vs. unconfirmed.** Services and tools marked `confirmed: false`
appear only in local preview, outlined and labelled "To confirm". Flip one to
`true` once it is real and it goes live. The published site never claims a
skill you have not confirmed.

**Toolkit.** While `toolkit` is empty, local preview shows three sample cards
marked "Sample · preview only" so you can judge the layout; the published site
shows an honest "under construction" island. Copy the template in the file's
comment to add a real entry; media goes in `public/media/toolkit/<id>/`.

**Highlights.** A value of `'auto:features'` or `'auto:videos'` is counted
from `projects.js`; values in `[brackets]` stay hidden until filled.

**Photo.** Replace `public/media/profile/alecson-unity-developer.jpg` (4:5
works best) and, if you rename it, update `hero.photo` in `profile.js`.

## Gameplay programming write-ups

`src/content/showcases.js` holds `GAMEPLAY`, shown under "Projects · more".
It starts empty on purpose and the section shows an "under construction"
island until you add real work. Media goes in `public/media/showcases/<id>/`.

## Section headings and navigation

Headings, intros and nav labels live in `src/content/sections.js`. A section
with a `nav` label appears in the menu (About Me · Projects · Skills · Contact).

---

## The look

Everything visual is driven by the tokens at the top of `src/index.css`.
Outside: a bright pixel-art sky world — the page gradient runs from sky
`#74bfff` through lavender to pink `#ffd4e9`, with drifting clouds, birds,
an airship and floating islands on three parallax layers (`Sky.jsx`). Inside:
deep-navy glass panels (`.px-card`) with pixel borders, and near-black
"windows" (`.px-window`) that make every screenshot and video stand out.
Text tokens flip to light automatically inside a panel, so components use the
same classes in both worlds.

Islands are generated from a seed by `src/components/WorldIsland.jsx` (grass,
soil, rock, optional trees, tower, house, waterfall) — change `seed` or the
flags to get a different island. Headings use **Pixelify Sans**, small labels
**Silkscreen**, body text **Inter** (Google Fonts, loaded in `index.html`).
All decoration is inline SVG; no image files, so it stays crisp at any size.

## About the original captures

`Rivalis_VidsAndPics/` holds your original phone captures (2.4 GB of HEVC
video). The site uses converted H.264 copies in `public/media/` (about 200 MB
in total). The original folder is listed in `.gitignore`, so it stays on your
disk and out of the repository.

## Deploying

`npm run build` produces a static `dist/` folder that works on any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages). Routing uses `#` hashes, so
no server configuration is needed.
