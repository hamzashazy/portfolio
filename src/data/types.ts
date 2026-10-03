export type Category = "ai" | "automation" | "ecommerce" | "games";

export type Status =
  | "live"
  | "testing"
  | "coming-soon"
  | "shipped"
  | "in-development"
  | "prototype";

export type Platform = "web" | "android" | "ios" | "desktop" | "discord";

export type Frame = "browser" | "phone" | "desktop" | "none";

export type Screenshot = {
  src: string;
  alt: string;
  frame: Frame;
};

/** A short product film. Never preloaded: the page only fetches it when the visitor presses play. */
export type Film = {
  src: string;
  poster: string;
  /** Length in seconds, shown on the play button. */
  seconds: number;
};

export type ProjectLinks = {
  live?: string;
  github?: string;
  playStore?: string;
  releases?: string;
  /** The original product or brand this project belongs to (e.g. the web version of a game). */
  original?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  status: Status;
  /** Short qualifier shown next to the status, e.g. "Play Store review". */
  statusNote?: string;
  platforms: Platform[];
  stack: string[];
  /** Who this was built for / with. Short free text: "Solo build", "Client work", "Built at Miana", "Final year project". */
  role: string;
  year: number;
  /** True for products that are (or are about to be) in market. A future /studio page filters on this. */
  market: boolean;
  featured: boolean;
  order: number;
  /** Cover image; when absent the card renders a branded placeholder from `icon` + category accent. */
  cover?: Screenshot;
  icon?: string;
  screenshots: Screenshot[];
  film?: Film;
  links: ProjectLinks;
  summary: string;
  highlights: string[];
  /** What happens next for this project. */
  next?: string;
};

export const CATEGORIES: { id: Category; label: string; short: string; blurb: string }[] = [
  { id: "ai", label: "AI Products", short: "AI", blurb: "Products with AI at the core: recommendations, semantic matching and LLM agents." },
  { id: "automation", label: "Automation & Systems", short: "Systems", blurb: "Business systems and the AI automations that take manual steps out of them." },
  { id: "ecommerce", label: "Commerce", short: "Stores", blurb: "Storefronts and shopping apps for real brands." },
  { id: "games", label: "Games", short: "Games", blurb: "Mobile games built in Flutter: a physics puzzle on Google Play and a learning adventure for kids." },
];

export const STATUSES: { id: Status; label: string; description: string }[] = [
  { id: "live", label: "Live", description: "Deployed and in use." },
  { id: "testing", label: "In testing", description: "Feature-complete, being hardened before launch." },
  { id: "coming-soon", label: "Coming soon", description: "Submitted or queued for store release." },
  { id: "shipped", label: "Shipped", description: "Delivered and complete." },
  { id: "in-development", label: "In development", description: "Actively being built." },
  { id: "prototype", label: "Prototype", description: "Small, finished experiment." },
];
