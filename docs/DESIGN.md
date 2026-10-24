# VIMTC design system

The visual world for the Victory International Ministry Training College redesign. Written in the Impeccable "design-schema" style: thesis first, then the tokens that serve it. The home page artboard on the Claude Design canvas is the reference implementation.

## Thesis

**A Standard of Excellence. Equip and Empower.** The college's own words, from its banner and its crest. Every page should feel like a serious institution shown through its own photographs: white ground, clear gray bands, a measured blue, and yellow only where the visitor should act. Not a tech landing page, not a megachurch poster.

Mode: **Persuade** on the home, program and admissions pages. **Read** on policy, beliefs and accreditation pages. **Operate** on the application wizard and the admin dashboard.

## Palette

White, blue and gray. Yellow is reserved for calls to action and the few things that must stand out. Neutrals are cool and tinted, never pure black.

| Role | Value | Use |
|---|---|---|
| white | `#FFFFFF` | page ground, alternate section bands |
| gray | `#F1F2F4` | alternate section bands |
| gray-deep | `#E4E6EA` | quiet panels |
| rule | `#D9DCE2` | every hairline |
| charcoal | `#24272D` | the banner, the header on it, the footer |
| on-charcoal | `#C9CDD5` | secondary text on charcoal |
| ink | `#1F232B` | body text |
| ink-soft | `#545A66` | secondary text on white and gray (7:1) |
| ink-meta | `#6E7482` | metadata at 15px and up (4.6:1) |
| blue | `#2B4C8C` | headings, links, level discs, the one blue panel (request form) |
| blue-lift | `#355A9F` | hover of blue |
| gold | `#7D5A09` | gold as text on white (5.5:1) |
| gold-display | `#A9790C` | gold at display sizes only |
| gold-lit | `#F2C94C` | the yellow: Apply and primary buttons, the banner's third line, focus ring, level discs |

Sections alternate white and gray down the page so each one is plainly its own band. Blue is never a background except the single request-form panel. Red is not a brand colour.

## Type

Three families, three roles.

- **Bricolage Grotesque** (opsz 12–96, 500–800): display and UI. Headings at `letter-spacing: -0.03em`, `line-height: 1.02`, `text-wrap: balance`.
- **Instrument Serif** (regular and italic): the voice. One italic serif word per heading, pull quotes, scripture, dates in ledgers. Never a paragraph.
- **Hanken Grotesk** (400–700): reading. Body 17px, `line-height: 1.6`, measure capped at 34em, `text-wrap: pretty`.

Scale (ratio ≈ 1.25, fluid at the top): 13 · 15 · 17 · 20 · 22–26 · 28–38 · 36–56 · 52–96. Display never exceeds 6rem. Tabular numerals on anything with a number in a column.

## Space and structure

4pt scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Sections alternate tight and generous; "Why" and "Leadership" sit 48px apart because they belong together, the scripture figure gets 128px above it because it is the pause.

Structure is hairline rules, not cards. Lists are index rows with a hairline above each one. A blue panel is used once per page (the request form). Photographs beside text are borderless: no radius, no shadow, and the photograph fills the exact height of the text column. Radius is 28px on the one panel, 999px on controls, 8px on thumbnails.

Banned on every page: eyebrow or kicker labels above headings, section numbers that carry no information, big-number stat tiles, same-size icon cards, gradient text, glass as decoration, text arrows or emoji standing in for icons.

## Motion

One authored moment per page. On the home page it is the banner: the three-line serif headline rises in beats while the college's ten banner photographs pan continuously right to left behind a charcoal veil, as a clean filmstrip with hard edges, one full loop every four minutes. The pan pauses on hover. Nothing else on the page animates on entry except one scroll-linked reveal on the scripture photograph.

Supporting motion is feedback only: 140ms for hover, 260ms for state, 520ms for layout. Easing is `cubic-bezier(0.16, 1, 0.3, 1)`. Exits are faster than entrances. A list that is re-filtered re-appears with a 40ms sibling stagger, capped at 320ms. One scroll-linked reveal is allowed per page when a photograph leads a section.

`prefers-reduced-motion` removes all movement and keeps colour and opacity state changes.

## Browser surfaces

Themed, not default: selection is lit gold on ink, caret is display gold, focus ring is a 3px lit-gold outline offset 3px, scrollbar is navy on paper-deep, underlines sit at 0.18em.

## Copy

Buttons name their action and object: "Find your program", "Request information", "Apply now", "Open the program finder". Facts the college has not supplied stay in square brackets, such as `[NEXT START DATE]`; nothing in brackets is invented. Accreditation is always stated with what it means and what it does not.

## Icons and imagery

Icons are 2px-stroke SVG with round caps, 18–22px, in one family. Photographs are the college's own, never stock. Beside text they are cropped to the text's height; in the banner they run at full height as a strip.
