# UX-PORTFOLIO — Design Tokens

Extracted from Figma `92B4Q7GtfJNiLNWDOedM6r`, node `97:3419` (the `Newsreader` page —
Hero, Work ×4, About, Extras, Contact at 1440px).

| File | Use it for |
|---|---|
| [`tokens.ts`](./tokens.ts) | TS/JS consumers. Typed, `as const`, zero deps. **Start here.** |
| [`tokens.css`](./tokens.css) | Plain CSS / Tailwind `@theme` consumers. Same values as custom properties. |
| `DESIGN-TOKENS.md` | The rules, the rationale, and the decisions still open. |

> **On provenance.** This file publishes exactly **one** Figma variable: `Accents/Green`
> (`#34c759`). Every other value below was read off raw layer styles and grouped by hand, so
> these are *derived* tokens — a proposed system, not one Figma already enforces. Where the
> source contradicts itself it is flagged `@drift` rather than silently normalised.

---

## Rules

Nine rules. If you follow only these, the system holds.

1. **Consume `textStyle`, not primitives.** A component asking for `fontSize.sm` + `color.textSecondary`
   is re-deriving a decision that already has a name. Reach for `textStyle.body`. Primitives
   exist to compose semantic tokens, not to be sprinkled through components.
2. **Two families, two jobs.** Switzer is structural — every heading, label, body, nav item.
   Newsreader is *only* the wordmark, the contact links, the contact email, and italic
   emphasis words set inline inside display copy. Newsreader is **always italic**; there is
   no upright cut in this design.
3. **Tracking is proportional, never absolute.** Every tracking value in the file is exactly
   −2% or −1% of its font size. Use the two `em` tokens. Never reintroduce px tracking — it
   breaks the moment a size changes.
4. **Uppercase in CSS, not in content.** The source strings are shouted (`ABOUT`,
   `PRODUCT DESIGNER`). Author them sentence-case and let `textTransform` do the work, or
   screen readers will spell them out letter by letter.
5. **Whitespace separates, nothing else.** No borders, no dividers, no shadows, no radii.
   The only depth in the design is the nav's translucency + 4px backdrop blur. Adding a
   border is a design change, not a detail.
6. **Inactive nav is double-dimmed.** `color.textMuted` *and* `opacity: 0.6`. It's one
   decision — `textStyle.navInactive` carries both. Don't reapply either by hand.
7. **The gutter is 24px, everywhere.** Every section — Hero through Contact — starts its
   left rail at exactly 24px. It's the one layout constant that never moves; treat it as
   load-bearing.
8. **`accentGreen` is for status only.** One dot, one meaning: open to work. It is the only
   saturated colour in an otherwise monochrome design, and the only real Figma variable.
   Spending it on anything else costs the whole palette its discipline.
9. **Don't add a scale step to fix one layout.** The type scale has nine steps for a
   one-page site, which is already generous. Reach for an existing step first.

### Accessibility note

Measured against `color.bg` (`#fcfcfc`):

| Token | Ratio | WCAG AA (4.5:1) |
|---|---|---|
| `textSecondary` `#666666` | 5.60:1 | passes |
| `textSignature` `#6b6a66` | 5.28:1 | passes |
| `textMuted` `#aeaeae` | **2.16:1** | fails — also below 3:1 for large text |
| `navInactive` (`#aeaeae` @ 60% → `#cdcdcd`) | **1.55:1** | fails |

The ramp is fine down to `textSecondary`. The problem is `textMuted`, which carries
overlines, meta, tags and inactive nav — and the nav then dims it *again* with `opacity: 0.6`,
landing at 1.55:1, which is close to invisible for a lot of people.

This is a deliberate aesthetic in a portfolio and it's your call to keep, but it's the one
place the design would fail an audit. `#747474` clears AA at **4.56:1** and still reads as a
light grey. (`#767676` gets you to 4.43:1 — close, but still short.)

---

## 1. Color

Near-monochrome grey ramp on off-white, with a single green accent.

| Token | Value | Role |
|---|---|---|
| `color.bg` | `#fcfcfc` | Page background on every section |
| `color.surfaceGlass` | `rgba(245, 243, 242, 0.5)` | Floating nav pill (with 4px backdrop blur) |
| `color.placeholder` | `#d9d9d9` | Image slot fill behind project photos |
| `color.scrim` | `rgba(0, 0, 0, 0.45)` | Darkening overlay on project photos |
| `color.textPrimary` | `#000000` | Project titles, About statement |
| `color.textSecondary` | `#666666` | Body, active nav, emphasis, contact email, heading marker |
| `color.textMuted` | `#aeaeae` | Overlines, meta, tags, inactive nav, hero display base |
| `color.textSignature` | `#6b6a66` | Standalone serif: wordmark + contact links |
| `color.accentGreen` | `#34c759` | Availability dot — **the only bound Figma variable** |

`#6b6a66` sits a hair warm of `#666666` and appears only on standalone serif elements, so
it's kept distinct rather than folded into `textSecondary`.

## 2. Typography

**Switzer** — Light 300, Regular 400, Medium 500. **Newsreader** — Italic 400, Medium Italic 500.

### Scale

| Token | px | rem | Used by |
|---|---|---|---|
| `2xs` | 12 | 0.75 | nav, tags, year |
| `xs` | 13.3 | 0.83125 | overlines, meta values |
| `sm` | 14 | 0.875 | body, wordmark |
| `base` | 16 | 1 | section headings, company name |
| `lg` | 18 | 1.125 | project title |
| `xl` | 26 | 1.625 | About statement |
| `2xl` | 28 | 1.75 | contact links, display secondary line |
| `3xl` | 30 | 1.875 | hero display |
| `4xl` | 40 | 2.5 | contact email |

### Line height & tracking

| Token | Value | Applies to |
|---|---|---|
| `lineHeight.none` | `1` | Contact links, set solid |
| `lineHeight.tight` | `1.3` | Effectively everything |
| `lineHeight.relaxed` | `1.56` | Meta rows and wordmark (authored as a flat `20.74px`) |
| `letterSpacing.tight` | `-0.02em` | All text 12–40px |
| `letterSpacing.display` | `-0.01em` | Hero display (30px) and nav items (12px) |

### Text styles

All 16 are exported from `tokens.ts` as complete, drop-in style objects.

| Token | Family / weight | Size | Leading | Tracking | Color |
|---|---|---|---|---|---|
| `display` | Switzer Light | 30 | 1.3 | −0.01em | muted |
| `displayEmphasis` | Newsreader Medium Italic | 30 | 1.3 | −0.01em | secondary |
| `statement` | Switzer Medium | 26 | 1.3 | −0.02em | primary |
| `email` | Newsreader Italic | 40 | 1.3 | −0.02em | secondary |
| `serifLink` | Newsreader Italic | 28 | 1 | −0.02em | signature |
| `projectTitle` | Switzer Regular | 18 | 1.3 | −0.02em | primary |
| `sectionHeading` | Switzer Regular, `uppercase` | 16 | 1.3 | −0.02em | secondary |
| `companyName` | Switzer Regular, centered | 16 | 1.3 | −0.02em | secondary |
| `body` | Switzer Regular | 14 | 1.3 | −0.02em | secondary |
| `bodyLight` | Switzer Light | 14 | 1.3 | −0.02em | secondary |
| `wordmark` | Newsreader Medium Italic | 14 | 1.56 | −0.02em | signature |
| `overline` | Switzer Medium | 13.3 | 1.56 | −0.02em | muted |
| `metaValue` | Switzer Regular | 13.3 | 1.56 | −0.02em | secondary |
| `tag` | Switzer Regular | 12 | 1.3 | −0.02em | muted |
| `navActive` | Switzer Medium | 12 | 1.3 | −0.01em | secondary |
| `navInactive` | Switzer Light, `opacity .6` | 12 | 1.3 | −0.01em | muted |

## 3. Spacing

Broadly a 4px grid, with two off-grid escapes.

| Token | px | Used for |
|---|---|---|
| `space.2` | 2 | Project title → meta row |
| `space.4` | 4 | Marker → heading label; status dot → text |
| `space.8` | 8 | Logo → company name; writeup stack; year/tag row |
| `space.12` | 12 | Tag gap; nav vertical padding |
| `space.16` | 16 | Meta row stack; nav horizontal padding; carousel gap |
| `space.18` | 18 | About paragraph gap — **off-grid** |
| `space.23` | 23 | Project photo → details — **off-grid** |
| `space.24` | 24 | Page gutter; nav item gap |
| `space.28` | 28 | Statement → body block |
| `space.40` | 40 | Section top padding; contact link row gap |

## 4. Layout

| Token | Value | Notes |
|---|---|---|
| `layout.canvas` | 1440px | Design frame width |
| `layout.gutter` | 24px | Left/right page margin, consistent across all sections |
| `layout.sectionTop` | 40px | Heading offset inside a section |
| `layout.navWidth` | 242px | Floating nav, centered; top of Hero/Contact, bottom elsewhere |
| `layout.measure` | 464px | Hero copy column |
| `layout.measureWide` | 565px | About statement column |
| `layout.measureBody` | 473px | About body column |
| `layout.card` | 923px | Project card and photo width |
| `layout.cardMediaHeight` | 550px | Project photo height |
| `layout.carouselItem` | 336px | Extras carousel cell (4 across, 16px gaps → 1392px) |

Section heights as drawn: Hero 659 · Work 809 (×4) · About 674 · Extras 736 · Contact 736.

Two-column split throughout: label/meta rail on the left at the 24px gutter, content starting
around x=493 (Work) or x=488 (About) — roughly a 1/3 : 2/3 division.

**No breakpoints exist in this file.** Everything above is the 1440px composition. Responsive
behaviour is undesigned and will need decisions that can't be extracted.

## 5. Sizing & effects

| Token | Value | Role |
|---|---|---|
| `size.marker` | 12px | Square bullet beside section headings |
| `size.icon` | 24px | Arrow-outward on contact links |
| `size.logo` | 40px | Company logo in project cards |
| `size.avatar` | 150px | Portrait image (Hero and Contact) |
| `effect.blur.glass` | 4px | `backdrop-filter` on the nav |
| `effect.opacity.inactive` | 0.6 | Inactive nav items |
| `effect.opacity.halftone` | 0.45 | Extras carousel halftone layer |
| `effect.blend.halftone` | `overlay` | Extras carousel halftone layer |
| `effect.blend.desaturate` | `saturation` | Extras carousel saturation layer |
| `effect.radius.none` | 0 | Nothing in this design is rounded |

The Extras carousel treatment is a three-layer stack: image, then a halftone layer at
`mix-blend-mode: overlay` / 45% opacity, then a full-bleed `mix-blend-mode: saturation` layer.

---

## Open decisions

Five contradictions in the source. Each is flagged `@drift` in `tokens.ts`; all five are
design calls, so they're surfaced rather than silently resolved.

1. **Body weight.** Project descriptions are Switzer *Light*; About paragraphs at the same
   14px are *Regular*. `tokens.ts` exposes both, with `body` = Regular as canonical.
   → *Recommend Regular:* Light at 14px on `#fcfcfc` is thin, and it compounds rule 9's
   contrast problem. Retire `bodyLight` once you agree.
2. **Wordmark weight.** Newsreader *Medium* Italic in the Hero, plain *Italic* in the About
   footer and contact links. `textStyle.wordmark` uses Medium.
3. **Overline leading.** The 13.3px overline is `20.74px` (1.56) in the Hero but `1.3` in
   Contact. `textStyle.overline` uses 1.56.
4. **The 13.3px step.** Not a designed size — it reads as a browser-default `0.83em` that
   leaked in. Normalise to 13px on any rebuild.
5. **Off-grid spacing.** `18` and `23` look like nudges rather than decisions; `20` and `24`
   would put the system back on the 4px grid.

## Coverage

Every section of node `97:3419` has now been read directly from Figma: Hero (`97:3420`),
Project Card (`97:3461`), About (`97:3590`), Contact details (`97:3660`), and the Extras
carousel cell (`97:3620`) — plus the full node tree and published variables for the page.

Not covered, because it isn't in the file: responsive breakpoints, hover/focus/active states,
motion and transitions, and dark mode.
