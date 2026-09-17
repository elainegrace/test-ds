/**
 * UX-PORTFOLIO — Design Tokens
 *
 * Source: Figma `92B4Q7GtfJNiLNWDOedM6r`, node `97:3419` ("Newsreader" page @ 1440px).
 * Companion files: `tokens.css` (CSS custom properties), `DESIGN-TOKENS.md` (rules + rationale).
 *
 * PROVENANCE: the Figma file publishes exactly one variable — `Accents/Green` (#34c759).
 * Every other value here was read off raw layer styles and grouped by hand. This is a
 * proposed system, not one Figma currently enforces. Values marked @drift are places where
 * the source file contradicts itself; see DESIGN-TOKENS.md §Open decisions.
 *
 * Two layers, and the distinction matters:
 *   - PRIMITIVES (color, fontSize, space, …) — the raw scales. Don't reach for these in
 *     components when a semantic token exists.
 *   - SEMANTIC (textStyle) — the composed, named styles components should actually consume.
 */

/* ------------------------------------------------------------------ Color */

export const color = {
  /** Page background on every section. */
  bg: '#fcfcfc',
  /** Floating nav pill. Always paired with `effect.blur.glass`. */
  surfaceGlass: 'rgb(245 243 242 / 0.5)',
  /** Image slot fill behind project photos. */
  placeholder: '#d9d9d9',
  /** Darkening overlay on project photos. */
  scrim: 'rgb(0 0 0 / 0.45)',

  /** Project titles, About statement. */
  textPrimary: '#000000',
  /** Body copy, active nav, italic emphasis, contact email, heading marker. */
  textSecondary: '#666666',
  /** Overlines, meta, tags, inactive nav, hero display base. */
  textMuted: '#aeaeae',
  /** Warm grey reserved for standalone serif: the wordmark and the contact links. */
  textSignature: '#6b6a66',

  /** Availability dot. The ONLY value bound to a real Figma variable (`Accents/Green`). */
  accentGreen: '#34c759',
} as const;

/* ------------------------------------------------------------- Typography */

export const font = {
  family: {
    /** Switzer — everything structural. */
    sans: '"Switzer", ui-sans-serif, system-ui, sans-serif',
    /** Newsreader — wordmark, contact links, email, and inline emphasis only. Always italic. */
    serif: '"Newsreader", ui-serif, Georgia, serif',
  },
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
  },
} as const;

/**
 * Size scale, in rem against a 16px root.
 * `xs` (13.3px) is not a designed step — it is a browser-default 0.83em that leaked into
 * the file. Normalise to 13px if you rebuild. @drift
 */
export const fontSize = {
  '2xs': '0.75rem',     // 12px — nav, tags, year
  xs: '0.83125rem',     // 13.3px — overlines, meta values
  sm: '0.875rem',       // 14px — body, wordmark
  base: '1rem',         // 16px — section headings, company name
  lg: '1.125rem',       // 18px — project title
  xl: '1.625rem',       // 26px — About statement
  '2xl': '1.75rem',     // 28px — contact links, display secondary line
  '3xl': '1.875rem',    // 30px — hero display
  '4xl': '2.5rem',      // 40px — contact email
} as const;

export const lineHeight = {
  /** Contact links only — set solid. */
  none: 1,
  /** The system default. Effectively everything. */
  tight: 1.3,
  /** Meta rows and wordmark. Authored in Figma as a flat 20.74px. */
  relaxed: 1.56,
} as const;

/**
 * Tracking is strictly proportional in this design — every value in the file is exactly
 * −2% or −1% of its font size. That makes `em` the correct unit and collapses eleven
 * pixel values into two tokens. This is the cleanest rule in the system; keep it.
 */
export const letterSpacing = {
  /** All text 12–40px. */
  tight: '-0.02em',
  /** Hero display (30px) and nav items (12px). */
  display: '-0.01em',
} as const;

/* ---------------------------------------------------------------- Spacing */

/** Broadly a 4px grid. `18` and `23` are off-grid nudges, not decisions. @drift */
export const space = {
  2: '2px',    // project title → meta row
  4: '4px',    // marker → heading label; status dot → text
  8: '8px',    // logo → company name; writeup stack; year/tag row
  12: '12px',  // tag gap; nav vertical padding
  16: '16px',  // meta row stack; nav horizontal padding; carousel gap
  18: '18px',  // About paragraph gap — off-grid
  23: '23px',  // project photo → details — off-grid
  24: '24px',  // page gutter; nav item gap
  28: '28px',  // statement → body block
  40: '40px',  // section top padding; contact link row gap
} as const;

/* ----------------------------------------------------------------- Layout */

export const layout = {
  canvas: '1440px',        // design frame width
  gutter: '24px',          // left/right page margin, consistent across all sections
  sectionTop: '40px',      // heading offset inside a section
  navWidth: '242px',       // floating nav, centered
  measure: '464px',        // hero copy column
  measureWide: '565px',    // About statement column
  measureBody: '473px',    // About body column
  card: '923px',           // project card and photo width
  cardMediaHeight: '550px',// project photo height
  carouselItem: '336px',   // Extras carousel cell (4 across, 16px gaps → 1392px)
} as const;

export const size = {
  marker: '12px',   // square bullet beside section headings
  icon: '24px',     // arrow-outward on contact links
  logo: '40px',     // company logo in project cards
  avatar: '150px',  // portrait image (Hero and Contact)
} as const;

/* ---------------------------------------------------------------- Effects */

/** No shadows anywhere. Depth comes only from the nav's blur + translucency. */
export const effect = {
  blur: {
    glass: '4px', // backdrop-filter on the nav
  },
  opacity: {
    inactive: 0.6,  // inactive nav items (stacked ON TOP of `color.textMuted`)
    halftone: 0.45, // Extras carousel halftone layer
  },
  blend: {
    halftone: 'overlay',    // Extras carousel halftone layer
    desaturate: 'saturation', // Extras carousel saturation layer
  },
  radius: {
    none: '0', // nothing in this design is rounded
  },
} as const;

/* --------------------------------------------------- Semantic text styles */

export interface TextStyle {
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: number;
  letterSpacing: string;
  color: string;
  fontStyle?: 'italic';
  textTransform?: 'uppercase';
  textAlign?: 'center';
  opacity?: number;
}

/**
 * The layer components should consume. Each entry is a complete, drop-in style object:
 *
 *   <h2 style={textStyle.statement}>…</h2>
 *   const Title = styled.h3(textStyle.projectTitle);
 */
export const textStyle = {
  /** Hero headline. Base grey; emphasis words swap to `displayEmphasis` inline. */
  display: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.light,
    fontSize: fontSize['3xl'],
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.display,
    color: color.textMuted,
  },
  /** Inline italic emphasis inside `display` — "design", "an app", "This just works." */
  displayEmphasis: {
    fontFamily: font.family.serif,
    fontWeight: font.weight.medium,
    fontSize: fontSize['3xl'],
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.display,
    color: color.textSecondary,
    fontStyle: 'italic',
  },
  /** About section thesis line. The only 26px in the system. */
  statement: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.medium,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    color: color.textPrimary,
  },
  /** Contact email — the largest type in the design. */
  email: {
    fontFamily: font.family.serif,
    fontWeight: font.weight.regular,
    fontSize: fontSize['4xl'],
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    color: color.textSecondary,
    fontStyle: 'italic',
  },
  /** resume / linkedin / behance. Pairs with a 24px arrow icon (`size.icon`). */
  serifLink: {
    fontFamily: font.family.serif,
    fontWeight: font.weight.regular,
    fontSize: fontSize['2xl'],
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.tight,
    color: color.textSignature,
    fontStyle: 'italic',
  },
  projectTitle: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.regular,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    color: color.textPrimary,
  },
  /** ABOUT / EXTRAS / SAY HELLO. Uppercase via CSS — keep source strings sentence-case. */
  sectionHeading: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.regular,
    fontSize: fontSize.base,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    color: color.textSecondary,
    textTransform: 'uppercase',
  },
  companyName: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.regular,
    fontSize: fontSize.base,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    color: color.textSecondary,
    textAlign: 'center',
  },
  /**
   * Canonical body copy. Used by About paragraphs.
   * @drift Project descriptions use Light at the same size (`bodyLight`). Converge on this
   * one — Regular holds up better at 14px on a #fcfcfc ground.
   */
  body: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.regular,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    color: color.textSecondary,
  },
  /** @drift Project-description variant of `body`. Retire once the weight question is settled. */
  bodyLight: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.light,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    color: color.textSecondary,
  },
  /**
   * "Elaine Bayhon" signature.
   * @drift Medium Italic in the Hero, plain Italic in the About footer. Medium is used here.
   */
  wordmark: {
    fontFamily: font.family.serif,
    fontWeight: font.weight.medium,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.tight,
    color: color.textSignature,
    fontStyle: 'italic',
  },
  /**
   * PRODUCT DESIGNER / CURRENTLY / HAVE A PROJECT IN MIND?
   * @drift Leading is 1.56 in the Hero but 1.3 in Contact. 1.56 is used here.
   */
  overline: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.medium,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.tight,
    color: color.textMuted,
  },
  /** The value opposite an `overline` — "Open for new roles", "SINGAPORE ・ 12:33 PM". */
  metaValue: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.regular,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.tight,
    color: color.textSecondary,
  },
  /** Year and discipline tags on project cards — "2024-2025", "UX/UI", "WEB". */
  tag: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.regular,
    fontSize: fontSize['2xs'],
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    color: color.textMuted,
  },
  navActive: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.medium,
    fontSize: fontSize['2xs'],
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.display,
    color: color.textSecondary,
  },
  /** Note the double-dim: muted colour AND 0.6 opacity. */
  navInactive: {
    fontFamily: font.family.sans,
    fontWeight: font.weight.light,
    fontSize: fontSize['2xs'],
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.display,
    color: color.textMuted,
    opacity: effect.opacity.inactive,
  },
} satisfies Record<string, TextStyle>;

/* ------------------------------------------------------------------ Types */

export type ColorToken = keyof typeof color;
export type FontSizeToken = keyof typeof fontSize;
export type LineHeightToken = keyof typeof lineHeight;
export type LetterSpacingToken = keyof typeof letterSpacing;
export type SpaceToken = keyof typeof space;
export type LayoutToken = keyof typeof layout;
export type SizeToken = keyof typeof size;
export type TextStyleToken = keyof typeof textStyle;

export const tokens = {
  color,
  font,
  fontSize,
  lineHeight,
  letterSpacing,
  space,
  layout,
  size,
  effect,
  textStyle,
} as const;

export default tokens;
