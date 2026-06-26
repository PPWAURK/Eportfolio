export interface Project {
  /** URL-friendly slug for /projects/[slug] routing */
  slug: string;
  /** Title (may include bilingual, e.g. "夜行 · Nightwalk") */
  t: string;
  /** Subtitle / short description */
  sub: string;
  /** Category key: 'photo' | 'dev' | 'film' */
  cat: 'photo' | 'dev' | 'film';
  /** Display label for category (bilingual) */
  catLabel: string;
  /** Year string, e.g. "2025" */
  year: string;
  /** Role description */
  role: string;
  /** Client name */
  client: string;
  /** Solid fill color for hover backgrounds */
  fill: string;
  /** CSS gradient string for preview panels */
  g: string;
  /** Trilingual descriptions: [中文, English, Français] */
  desc: [string, string, string];
  /** Tags array */
  tags: string[];
  /** Whether the project has a live demo / portfolio link */
  link: boolean;
  /** Whether the project has a GitHub repo */
  repo: boolean;
  /** Whether this is placeholder content that should be labeled */
  isPlaceholder?: boolean;
}

export interface Photo {
  /** Image source path (relative to /public) */
  src: string;
  /** Caption / description text */
  cap: string;
  /** Location group key */
  loc: 'italy' | 'nice' | 'spain' | 'strasbourg' | 'paris';
  /** Location display label */
  locLabel: string;
  /** Year taken */
  year: string;
  /** CSS gradient string for placeholder/loading display */
  g: string;
}
