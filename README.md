# Ember Coffee

A small, image-led website for Ember, a coffee room in Portland, Oregon. Warm photography, generous whitespace, and one clear path to the menu or a table.

[Live site](https://ember-coffee.devfazla.com/) · [Fazla Rabbi](https://devfazla.com)

![Ember Coffee](public/og-image.png)

## What's inside

- Five routes plus a 404 page, built with React Router
- Responsive layout with an accessible mobile menu
- Menu, story/team, contact, and table reservation pages
- Client-side validation on the contact and reservation forms
- Expandable reviews on the home page
- Live Google Maps embed for the cafe location
- Per-page SEO, structured data, sitemap, and social cards
- GitHub Pages deployment through GitHub Actions

## Stack

- React 18
- Vite 5
- React Router 6
- Plain CSS with custom properties

No UI framework or CSS utility library.

## Getting started

Node.js 20 or newer is required.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173/`.

## Build and preview

```bash
npm run build
npm run preview
```

`npm run build` runs Vite and then `scripts/seo-postbuild.mjs`, which writes route-specific HTML files, `404.html`, and `sitemap.xml` into `dist/`.

The site uses a custom domain and is served from the root, so preview runs at:

```text
http://localhost:4173/
```

## Deployment

Pushes to `main` trigger [the Pages workflow](.github/workflows/deploy.yml):

1. Install dependencies with `npm ci`.
2. Build with the Pages base path.
3. Upload `dist/` as a Pages artifact.
4. Deploy it to GitHub Pages.

In the repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** and enter `ember-coffee.devfazla.com` under **Custom domain**. The workflow also requests enablement automatically, and `public/CNAME` keeps the domain attached to each deployment.

The workflow builds for the domain root. `actions/configure-pages` handles the Pages setup, while the base path stays `/` in `vite.config.js`. To serve the site from a repository subpath instead, set `BASE_PATH=/Ember-Coffee/` for the build and update the domain references below.

## SEO

- Route-specific `<title>`, description, canonical, Open Graph, and Twitter tags
- Static HTML for every route after the build, so crawlers and social bots get the right metadata without running JavaScript
- Client-side metadata updates on navigation via `src/components/Seo.jsx`
- JSON-LD for `CafeOrCoffeeShop`, `WebSite`, page types, breadcrumbs, and the full menu with prices
- Generated `sitemap.xml` and a `robots.txt`
- 1200×630 Open Graph image, app icons, and a web manifest
- `noindex` on the 404 page

## Project structure

```text
.github/workflows/deploy.yml   GitHub Pages deployment
public/                        CNAME, icons, manifest, robots.txt, OG image
scripts/seo-postbuild.mjs      static route HTML, 404 fallback, sitemap
scripts/seo-render.mjs         shared head-tag renderer
src/
  assets/                      photography and image map
  components/                  layout, header, footer, SEO, cards, forms
  data/                        site details, menu, SEO metadata
  pages/                       Home, Menu, About, Contact, Reserve, NotFound
  styles/                      base, components, pages
index.html                     entry document with SEO markers
vite.config.js                 base path, React, home-page head injection
```

## Editing content

- `src/data/site.js`: address, hours, phone, email, social links, team, timeline, reviews
- `src/data/menu.js`: menu sections, items, prices, featured items
- `src/data/seo.js`: page titles, descriptions, canonical URL, structured data
- `src/assets/images.js`: image imports used across the site

## Author

Designed and built by [Fazla Rabbi](https://devfazla.com).
