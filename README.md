# Homepage — design reference

This is a design mockup created in a visual design tool, exported as a
standalone page. Treat it as a REFERENCE MOCKUP, not production code:
the markup and inline styles carry the design's precise values — colors,
font sizes, spacing, radii, shadows, layout — which an implementation
should replicate faithfully in its own components and styling system
rather than copy wholesale.

## Contents

- `Main.dc.html` — the artboard (a Design Component: an `<x-dc>`
  template + a small logic class). The values to replicate live in its
  inline `style="…"` attributes and the `<helmet><style>` block.
- `support.js`, `vendor/react*.js` — the runtime that renders the
  component in a browser; not part of the design.

## Viewing

Serve the folder (e.g. `python3 -m http.server`) and open `Main.dc.html`;
some browsers block the scripts over file://.

## Media

- `media/img/` — photos taken from exploria.pk (the client's own site and media library).
  Swap in higher-resolution originals before launch; most are only 1000–1600 px wide.
  Some (e.g. `k2-summit.jpg`, `mehrgarh.jpg`, `folk-dance.jpg`) may not be the client's own
  shots — confirm usage rights before going live.
- Fonts: Source Serif 4 (headings) + Jost (text), both Google Fonts.
  `exploria-logo-reversed.png` is a quick recolour of the logo for dark
  backgrounds — ask the client for an official light version.
- `media/video/` — clips by Asif Khan from Pexels (free licence, compressed to 2–3 MB each):
  `hero-hunza.mp4` (pexels.com/video/19150364), `indus-winter.mp4` (19803831),
  `autumn-katpana.mp4` (19400737). Each has a `-poster.jpg` fallback frame.

## New homepage and tour pages (for client review)

| File | What it is |
| --- | --- |
| `index.html` | New homepage, served at `/` |
| `tour.html` | Tour page template, served at `/tours/<slug>` (see `vercel.json`) |
| `js/data.js` | All content: group departures, tours, map places, months |
| `js/common.js` | Shared header, phone menu, WhatsApp button, forms |
| `js/home.js`, `js/tour.js` | Page scripts |
| `css/site.css`, `css/tour.css` | Styles |

The original concept is still at `/Main.dc.html`.

**Adding a new group departure:** copy the Blossom entry in `DEPARTURES`
in `js/data.js` and change its details (give it a new `slug`). It appears
on the homepage and gets its own page at `/tours/<slug>`. Add a matching
card to `TOURS` so it shows in the tours row and the hero search.

To test locally, serve the folder and open `tour.html?t=<slug>`.
