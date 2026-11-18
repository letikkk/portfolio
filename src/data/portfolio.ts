export type ProjectCategory = 'All' | 'Gameplay & Combat' | 'Systems & UI' | 'Tech Demos';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All'>;
  duration: string;
  videoSrc: string;
  aspectRatio: number;
  featured?: boolean;
  summary: string;
  systems: string[];
  tags: string[];
}

export interface StackGroup {
  title: string;
  subtitle: string;
  items: string[];
}

export const PROFILE = {
  name: 'Letik',
  role: 'Full-Stack Roblox Scripter',
  experienceYears: 4,
  visitsLabel: '25M+',
  timezone: 'GMT+3',
  discordHandle: '@letikgg',
  commissionsOpen: true,
  headline: 'Modular Luau systems built for live Roblox games.',
  bio: 'Full-stack Roblox scripter with 4 years of production experience and contributions to 25M+ visit titles. Clean client-server architecture, responsive UI flows, and scalable gameplay loops.',
} as const;

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'Gameplay & Combat',
  'Systems & UI',
  'Tech Demos',
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'katana-combat',
    title: 'Melee Combat & AoE VFX',
    subtitle: 'Katana Combat Prototype',
    category: 'Gameplay & Combat',
    duration: '0:32',
    videoSrc: './videos/katana-combat.mp4',
    aspectRatio: 2.54,
    featured: true,
    summary:
      'Responsive katana melee combat featuring M1 slash chains, spatial hitbox validation, knockback physics on R15 rigs, and an AoE shockwave ability with radial debris.',
    systems: [
      'Custom weapon state machine with cooldown & combo gating',
      'Server-authoritative hitbox verification with debug bounding overlay',
      'Radial shockwave & tweened rock debris VFX replication',
    ],
    tags: ['Combat', 'Hitboxes', 'Client-Server', 'VFX'],
  },
  {
    id: 'tycoon-engine',
    title: 'Tycoon Progression Engine',
    subtitle: "Builder's Empire",
    category: 'Systems & UI',
    duration: '0:50',
    videoSrc: './videos/tycoon-engine.mp4',
    aspectRatio: 1.71,
    summary:
      'Data-driven tycoon loop with scaling cash-per-second income, ProximityPrompt purchase nodes, directional guidance beam, animated building unlocks, and a custom player leaderboard.',
    systems: [
      'Dynamic cash/sec multiplier scaling per unlocked node',
      'ProximityPrompt-driven structure & interactive garage door sequence',
      'Live directional beam guiding players to the next affordable upgrade',
      'Custom Money & Rebirths leaderboard integration',
    ],
    tags: ['Luau', 'Tycoon Loop', 'ProximityPrompts', 'Replica'],
  },
  {
    id: 'simulator-economy',
    title: 'Simulator Economy & Shop UI',
    subtitle: 'Eat a Brainrot',
    category: 'Systems & UI',
    duration: '0:47',
    videoSrc: './videos/simulator-economy.mp4',
    aspectRatio: 2.22,
    summary:
      'Complete simulator monetization and progression suite: tool & Robux/Gamepass storefronts, timed boosts with active HUD countdowns, rebirth handling, and persistent player data.',
    systems: [
      'Modular ToolShop & Gamepass/Product purchase flow with toast feedback',
      'Timed stat boosts with synchronized client countdown indicators',
      'Rebirth reset loop backed by structured DataTemplate & DataManager',
    ],
    tags: ['ProfileStore', 'Monetization', 'Shop UI', 'Signals'],
  },
  {
    id: 'raycast-renderer',
    title: 'Real-Time Raycast Pixel Renderer',
    subtitle: 'DecentRaycast',
    category: 'Tech Demos',
    duration: '0:19',
    videoSrc: './videos/raycast-renderer.mp4',
    aspectRatio: 2.47,
    summary:
      '3D-to-2D viewport surface renderer projecting world geometry onto a movable in-world pixel grid via live raycasts, shading depth and material colors dynamically.',
    systems: [
      'Real-time surface grid raycasting relative to part CFrame & orientation',
      'Per-pixel hit color & distance sampling updated on spatial movement',
    ],
    tags: ['Raycasting', 'CFrame Math', 'Optimization'],
  },
  {
    id: 'drawing-canvas',
    title: '2D Freehand Drawing Canvas',
    subtitle: 'Custom UI Canvas',
    category: 'Tech Demos',
    duration: '0:34',
    videoSrc: './videos/drawing-canvas.mp4',
    aspectRatio: 2.38,
    summary:
      'Smooth freehand UI painting system with an interactive color palette and continuous interpolated strokes across rapid pointer motion.',
    systems: [
      'Pointer interpolation preventing stroke gaps during fast cursor movement',
      'Palette state binding & bounded canvas coordinate mapping',
    ],
    tags: ['UI Systems', 'Input Handling', '2D Canvas'],
  },
];

export function filterProjects(
  projects: readonly ProjectItem[],
  category: ProjectCategory,
): ProjectItem[] {
  if (category === 'All') {
    return [...projects];
  }
  return projects.filter((project) => project.category === category);
}

export const STACK_GROUPS: StackGroup[] = [
  {
    title: 'Core & Paradigms',
    subtitle: 'Foundational languages and architecture',
    items: ['Luau', 'Roblox-TS', 'OOP', 'ECS', 'Modular Client-Server'],
  },
  {
    title: 'Frameworks & Modules',
    subtitle: 'Battle-tested libraries for state, data & motion',
    items: [
      'Knit',
      'ProfileStore',
      'Replica',
      'Promise',
      'ZonePlus',
      'Trove / Maid',
      'Signals',
      'Springs',
      'Networking Modules',
    ],
  },
  {
    title: 'Workflow & Tooling',
    subtitle: 'External-editor pipeline and code hygiene',
    items: ['Rojo', 'Git', 'Wally', 'Aftman', 'Selene', 'StyLua', 'Roblox LSP'],
  },
];

export const COMMISSION_TERMS = {
  acceptedCurrencies: ['USD', 'Robux'],
  percentagePolicy:
    'Percentage (%) deals are only considered if the game is already live and generating steady revenue.',
  outOfScope: [
    'Vehicles',
    'Advanced gun systems (simple guns are fine)',
  ],
  briefChecklist: [
    'Short summary of what you need scripted',
    'Core mechanics / reference videos if any',
    'Target timeline & budget (USD or Robux)',
  ],
  noBareGreetingsNote:
    'Avoid sending just "hi" or "hello" — sharing project details upfront gets a much faster reply.',
} as const;

export const DISCORD_BRIEF_TEMPLATE = `Hi Letik! Looking to commission a script/system:
Scope: [brief description of the system or feature]
References: [links / game examples, if any]
Payment: [USD / Robux]
Timeline: [target deadline]`;
