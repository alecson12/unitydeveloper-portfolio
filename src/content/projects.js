/**
 * =====================================================================
 *  YOUR PROJECTS — the games whose UI and systems you want to show
 * =====================================================================
 *  This is the ONE file to edit to add a feature, a screenshot, a video,
 *  or a whole new project. The site builds itself from this list.
 *
 *  THE IDEA
 *    project  →  categories  →  features  →  media
 *    A CATEGORY groups related UI (e.g. "Chat & Communication").
 *    A FEATURE is one interface: a name, one line on what it is, up to
 *    four short "what it does" lines, and its screenshots/recordings.
 *    Keep text short — the captures do the talking.
 *
 *  WHERE FILES GO
 *    public/media/<project id>/<category id>/<feature id>/<readable-name>
 *    e.g. public/media/rivalis-academia-nexus/communication/chat/chat-recording.mp4
 *
 *  ADDING A SCREENSHOT
 *    img('<category>/<feature>', 'file.png', width, height, 'Caption', 'Alt text')
 *
 *  ADDING A RECORDING
 *    Export as .mp4 (H.264) — phones often record HEVC/H.265, which browsers
 *    cannot play. Put <name>.mp4 and <name>-poster.jpg side by side, then:
 *    rec('<category>/<feature>', '<name>', 'Caption', 'Alt text')
 *
 *  CONTRIBUTION
 *    `contribution` (on the project and on each feature) is YOUR part.
 *    Only write what you actually did. [Bracketed] text is a reminder:
 *    it shows (outlined) in local preview and is hidden on the live site.
 *
 *  SHOWING / HIDING
 *    visible: false  keeps a project off the site while you prepare it.
 *    featured: true  makes it the flagship project on the homepage.
 *    pixelArt: true  keeps pixel-art screenshots crisp when enlarged.
 * ===================================================================== */

const R = '/media/rivalis-academia-nexus' // shorthand for the Rivalis media folder

/** Helper: a 1920×864 recording with its poster next to it (same name + "-poster.jpg"). */
const rec = (folder, name, caption, alt) => ({
  type: 'video',
  src: `${R}/${folder}/${name}.mp4`,
  poster: `${R}/${folder}/${name}-poster.jpg`,
  width: 1920,
  height: 864,
  caption,
  alt,
})

/** Helper: a screenshot. */
const img = (folder, file, width, height, caption, alt) => ({
  type: 'image',
  src: `${R}/${folder}/${file}`,
  width,
  height,
  caption,
  alt,
})

export const PROJECTS = [
  /* =================================================================
   *  RIVALIS ACADEMIA NEXUS  —  flagship project
   * ================================================================= */
  {
    id: 'rivalis-academia-nexus', // also the folder name under public/media/
    visible: true,
    featured: true,
    pixelArt: false,

    title: 'Rivalis Academia Nexus',
    tagline: 'The complete in-game UI of a mobile MMORPG.',
    platform: 'Mobile',
    genre: 'MMORPG',
    role: 'Unity Developer',
    studio: 'VIIBYTE',
    period: '2023 — Present',
    status: 'Live',
    tech: ['Unity', 'C#'],

    // Official logo (transparent). Shown in the project header instead of a text title.
    logo: `${R}/logo.webp`,
    cover: `${R}/hud/hud-overview/in-game-hud-recording-poster.jpg`,
    coverAlt: 'The in-game HUD of Rivalis Academia Nexus',
    // The lead recording at the top of the case study.
    lead: rec('hud/hud-overview', 'in-game-hud-recording', 'The HUD during play.', 'Recording of the in-game HUD'),

    // One or two sentences. Everything else is in the features below.
    intro: 'Schools, classes, parties, guilds, trading and a live economy — I built every screen players use for it, from login to settings.',
    overview: [],
    // Your part. Keep it honest.
    contribution: [
      'All 21 in-game interfaces, in Unity and C#.',
      'Designed some of the screens myself; implemented every one.',
    ],

    /* ------------------------------------------------------------
     *  CATEGORIES → FEATURES
     *  icon: door · person · hud · bag · party · chat · shop · map · gear ·
     *        trophy · code · controller · mail · star
     * ------------------------------------------------------------ */
    categories: [
      {
        id: 'entry',
        name: 'Entry & Characters',
        icon: 'door',
        features: [
          {
            id: 'main-menu',
            name: 'Main Menu, Login & Server Select',
            summary: 'Title screen, account login and registration, server and channel selection.',
            functions: [
              'Login with show/hide password, Remember me, Forgot password, Google login',
              'Registration form in a scrollable panel',
              'Server list with connection quality; channels with Busy / NON PK status',
            ],
            contribution: '',
            media: [
              rec('entry/main-menu', 'main-menu-recording', 'Title → login → registration → server select.', 'Recording of the main menu flow'),
              img('entry/main-menu', 'login.png', 1055, 849, 'Login.', 'Login panel'),
              img('entry/main-menu', 'registration.png', 1179, 832, 'Registration.', 'Registration panel'),
              img('entry/main-menu', 'server-and-channel-select.png', 1838, 813, 'Server and channel select.', 'Server and channel selection'),
            ],
          },
          {
            id: 'character-creation',
            name: 'Character Creation & Selection',
            summary: 'Customise a character, pick a school and class, name it, choose it from the list.',
            functions: [
              'Face, hair and hair colour tabs with a live 3D preview',
              'School (Sacred Gate, Mystic Peak, Phoenix) and class (Swordsman, Archer, Shaman)',
              'Character list with Create, Start, Delete and Server Select',
            ],
            contribution: '',
            media: [
              rec('entry/character-creation', 'character-creation-recording', 'Creating a character, then the character list.', 'Recording of character creation and selection'),
              img('entry/character-creation', 'character-creation.png', 1816, 850, 'Character creation.', 'Character creation screen'),
              img('entry/character-creation', 'character-selection.png', 1876, 843, 'Character selection.', 'Character selection screen'),
            ],
          },
        ],
      },

      {
        id: 'hud',
        name: 'In-Game HUD',
        icon: 'hud',
        features: [
          {
            id: 'hud-overview',
            name: 'In-Game HUD',
            summary: 'Status, navigation, combat and chat — all within thumb reach.',
            functions: [
              'Avatar with HP / MP / SP / EXP bars and quick buttons',
              'Menu row (Mall, Inventory, Channel, Map, Menu), minimap, joystick',
              'Combat cluster: skills, basic attack, auto-attack, Auto Skills',
              'Mini chat, emote and item quick slots',
            ],
            contribution: '',
            media: [
              rec('hud/hud-overview', 'in-game-hud-recording', 'The HUD during play.', 'Recording of the in-game HUD'),
              img('hud/hud-overview', 'player-avatar-and-bars.png', 541, 257, 'Avatar and bars.', 'Player avatar and status bars'),
              img('hud/hud-overview', 'menu-buttons.png', 471, 105, 'Menu row.', 'HUD menu buttons'),
              img('hud/hud-overview', 'combat-buttons.png', 580, 501, 'Combat cluster.', 'Combat buttons'),
              img('hud/hud-overview', 'chat-and-item-shortcuts.png', 760, 285, 'Mini chat and quick slots.', 'Chat preview and item shortcuts'),
              img('hud/hud-overview', 'joystick.png', 296, 297, 'Joystick.', 'Virtual joystick'),
            ],
          },
          {
            id: 'targeting',
            name: 'Target Frames & Player Info',
            summary: 'Target bars for monsters and players, plus the player information panel.',
            functions: [
              'Target bar with name and HP; buff icons on players',
              'Information panel: profile, class, school, guild, equipment',
              'Whisper, Add Friend, inspect equipped items',
            ],
            contribution: '',
            media: [
              rec('hud/targeting', 'targeting-recording', 'Targeting a monster, then a player.', 'Recording of targeting and the player information panel'),
              img('hud/targeting', 'target-bar-monster.png', 657, 101, 'Monster target.', 'Target bar for a monster'),
              img('hud/targeting', 'target-bar-player.png', 669, 119, 'Player target with buffs.', 'Target bar for a player'),
            ],
          },
          {
            id: 'hud-layout',
            name: 'HUD Layout Customization',
            summary: 'Players move, resize and fade every HUD element themselves.',
            functions: [
              'Tap an element; scale and opacity sliders',
              'Undo / Redo, Reset, Save',
              'Five layout presets, selectable from Settings',
            ],
            contribution: '',
            media: [
              rec('hud/hud-layout', 'hud-layout-editor-recording', 'Adjusting scale and opacity of HUD elements.', 'Recording of the HUD layout editor'),
            ],
          },
        ],
      },

      {
        id: 'character',
        name: 'Inventory, Stats & Skills',
        icon: 'bag',
        features: [
          {
            id: 'inventory',
            name: 'Inventory & Equipment',
            summary: 'Equipment and inventory side by side, with item details and Auto-Potion.',
            functions: [
              'Equip / Bank / Locker tabs with character preview',
              'Paged grid, locked slots, Sort',
              'Item popup: info, attributes, Upgrade / Link / Use',
              'Auto-Potion thresholds for HP / MP / SP',
            ],
            contribution: '',
            media: [
              rec('character/inventory', 'inventory-recording', 'Items, equipping, Auto-Potion.', 'Recording of the inventory and equipment panels'),
            ],
          },
          {
            id: 'stats-skills',
            name: 'Stats & Skills',
            summary: 'Attribute points and skill management in one panel.',
            functions: [
              'POW / DEX / INT / VIT / STA with +/- and Apply confirmation',
              'Skills grouped by Attack, Pow, Support, Etc with Skill Info',
              'Auto attack setup and four skill loadouts',
            ],
            contribution: '',
            media: [
              rec('character/stats-skills', 'stats-and-skills-recording', 'Spending points, browsing skills.', 'Recording of the stats and skills panel'),
            ],
          },
        ],
      },

      {
        id: 'social',
        name: 'Party & Social',
        icon: 'party',
        features: [
          {
            id: 'party',
            name: 'Party',
            summary: 'Groups of up to eight.',
            functions: ['Leader badge, loot and gold rules', 'Member HP and In range indicator', 'Lead, Kick, Disband'],
            contribution: '',
            media: [rec('social/party', 'party-recording', 'The party panel.', 'Recording of the party panel')],
          },
          {
            id: 'party-search',
            name: 'Party Search',
            summary: 'Find a party by area.',
            functions: ['Area filters', 'Cards with leader, class, school, map, channel, rules', 'Join / Full / School states, pagination'],
            contribution: '',
            media: [rec('social/party-search', 'party-search-recording', 'Searching parties by area.', 'Recording of the party search panel')],
          },
          {
            id: 'rankings',
            name: 'Rankings',
            summary: 'Leaderboards by league, currency, guild and level.',
            functions: ['Tabs and class / school filters', 'Medals, avatar, class, school, guild, value', 'Pagination and Refresh'],
            contribution: '',
            media: [rec('social/rankings', 'rankings-recording', 'Browsing the rankings.', 'Recording of the rankings panel')],
          },
        ],
      },

      {
        id: 'communication',
        name: 'Chat & Communication',
        icon: 'chat',
        features: [
          {
            id: 'chat',
            name: 'Main Chat',
            summary: 'Full chat window plus the mini chat on the HUD.',
            functions: ['General, Whisper, Party, Guild, Alliance, Regional, Announcement', 'Colour-coded channels and item links', 'Mini chat opens the full window'],
            contribution: '',
            media: [rec('communication/chat', 'chat-recording', 'Opening chat and switching tabs.', 'Recording of the chat window')],
          },
          {
            id: 'emotes',
            name: 'Quick Emotes & Emote Wheel',
            summary: 'Assign emotes to a radial wheel and fire them from the HUD.',
            functions: ['Five dance-emote slots', 'Checkbox grid to fill the wheel', 'Drag to a slice, release to play'],
            contribution: '',
            media: [
              rec('communication/emotes', 'emotes-recording', 'Setting up emotes, then using the wheel.', 'Recording of the emotes panel and wheel'),
              img('communication/emotes', 'emote-wheel.png', 396, 384, 'The wheel.', 'Emote wheel'),
            ],
          },
          {
            id: 'country-flag',
            name: 'Country Flag',
            summary: 'A flag above your in-game name.',
            functions: ['Searchable country list', 'No flag / Unequip'],
            contribution: '',
            media: [
              rec('communication/country-flag', 'country-flag-recording', 'Picking a flag.', 'Recording of the country flag panel'),
              img('communication/country-flag', 'flag-above-player-name.png', 143, 397, 'In the world.', 'Flag above a player name'),
            ],
          },
        ],
      },

      {
        id: 'commerce',
        name: 'NPCs, Shops & Trading',
        icon: 'shop',
        features: [
          {
            id: 'npc-shop',
            name: 'NPC Dialogue & Shop',
            summary: 'Talk to NPCs and buy from their shops.',
            functions: ['Dialogue choices', 'Shop grid next to the inventory', 'Buy dialog: quantity, MAX, total, gold after'],
            contribution: '',
            media: [rec('commerce/npc-shop', 'npc-dialogue-and-shop-recording', 'Talking to an NPC and buying.', 'Recording of NPC dialogue and shop')],
          },
          {
            id: 'item-shop',
            name: 'Item Shop & Top Up',
            summary: 'The store: two currencies, search, top-up packages.',
            functions: ['Categories and search', 'EP / GP balances', 'Purchase panel and Top Up'],
            contribution: '',
            media: [rec('commerce/item-shop', 'item-shop-recording', 'Browsing, searching, Top Up.', 'Recording of the item shop')],
          },
          {
            id: 'trade',
            name: 'Player Trade',
            summary: 'Item and gold trading between two players.',
            functions: ['Their Offer / Your Offer', 'Gold with MAX', 'Lock → Accept'],
            contribution: '',
            media: [rec('commerce/trade', 'player-trade-recording', 'A trade from offer to accept.', 'Recording of the trade window')],
          },
        ],
      },

      {
        id: 'world',
        name: 'Quests & Navigation',
        icon: 'map',
        features: [
          {
            id: 'quests',
            name: 'Quests & Quest Log',
            summary: 'Accept quests from NPCs and track them.',
            functions: ['Offer panel: tasks, rewards, Accept', 'Ongoing / Completed log with progress', 'Detail and Show Path'],
            contribution: '',
            media: [rec('world/quests', 'quests-recording', 'Taking a quest, browsing the log.', 'Recording of the quest panels')],
          },
          {
            id: 'map',
            name: 'World Map',
            summary: 'Area map with entrances, NPCs and quick travel.',
            functions: ['Player position on a tiled map', 'Entrances and NPC lists', 'Tap a place to move there'],
            contribution: '',
            media: [rec('world/map', 'world-map-recording', 'Opening the map and travelling.', 'Recording of the world map')],
          },
          {
            id: 'bus-routes',
            name: 'Bus Routes',
            summary: 'Bus travel between areas.',
            functions: ['Lines and stops', 'Bus Card requirement', 'Board'],
            contribution: '',
            media: [rec('world/bus-routes', 'bus-routes-recording', 'Choosing a line and stop.', 'Recording of the bus routes panel')],
          },
        ],
      },

      {
        id: 'system',
        name: 'System & Settings',
        icon: 'gear',
        features: [
          {
            id: 'system-menu',
            name: 'System Menu & News',
            summary: 'Every system behind one button, beside the news feed.',
            functions: ['Player card and currencies', 'Club, Friends, Quests, Bank, Macro, Rankings, Emotes, Party Search, Server, Settings', 'News & Events carousel'],
            contribution: '',
            media: [rec('system/system-menu', 'system-menu-recording', 'The menu and the news cards.', 'Recording of the system menu')],
          },
          {
            id: 'settings',
            name: 'Settings',
            summary: 'Video, system and interaction settings with an unsaved-changes guard.',
            functions: ['Screen scale, shadow, detail, FPS', 'UI presets, chat macro style, sensitivities, language', 'Discard / Save dialog'],
            contribution: '',
            media: [rec('system/settings', 'settings-recording', 'Through the settings tabs.', 'Recording of the settings panel')],
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
    id: 'your-next-project', // lowercase, dashes, no spaces
    visible: false,
    featured: false,
    pixelArt: false,

    title: 'Your Next Project',
    tagline: 'One sentence that says what it is.',
    platform: 'PC',
    genre: 'Prototype',
    role: 'Your role',
    period: '2026',
    status: 'Prototype',
    tech: ['Unity', 'C#'],
    logo: null, // optional: '/media/your-next-project/logo.png'
    cover: '/media/your-next-project/cover.png',
    coverAlt: 'Cover image',
    lead: null,
    intro: 'What the project is.',
    overview: [],
    contribution: ['Your part.'],
    categories: [
      {
        id: 'ui',
        name: 'UI',
        icon: 'hud',
        features: [
          {
            id: 'main-menu',
            name: 'Main Menu',
            summary: 'What this screen is for.',
            functions: ['What it does'],
            contribution: '',
            media: [
              { type: 'image', src: '/media/your-next-project/ui/main-menu/main-menu.png', width: 1920, height: 1080, caption: 'Caption', alt: 'Alt text' },
            ],
          },
        ],
      },
    ],
  },
]
