# Ember Coffee

A small, image-led website for Ember, a coffee room in Portland, Oregon. Warm photography, generous whitespace, and one clear path to the menu or a table.

[Live site](https://ember-coffee.devfazla.com/) · [Fazla Rabbi](https://devfazla.com)

![Ember Coffee](public/og-image.png)

## What's inside

- Five routes plus a 404 page, built with React Router
- Responsive layout with an accessible mobile menu
- Menu, story/team, contact, and table reservation pages
- Client-side validation on the contact and reservation forms
- Telegram notifications for messages, reservations, signups, and client errors
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
2. Build the site for the domain root, passing the Telegram secrets.
3. Upload `dist/` as a Pages artifact.
4. Deploy it to GitHub Pages.

In the repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** and enter `ember-coffee.devfazla.com` under **Custom domain**. The workflow also requests enablement automatically, and `public/CNAME` keeps the domain attached to each deployment.

The workflow builds for the domain root. `actions/configure-pages` handles the Pages setup, while the base path stays `/` in `vite.config.js`. To serve the site from a repository subpath instead, set `BASE_PATH=/Ember-Coffee/` for the build and update the domain references below.

## Notifications

Contact messages, table reservations, newsletter signups, and client-side errors are sent to a Telegram chat through a Google Apps Script proxy. The bot token stays in Apps Script properties, so it never ships to the browser.

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy its token.
2. Send the bot a message, then read the chat ID from `https://api.telegram.org/bot<token>/getUpdates` (`result[0].message.chat.id`).
3. Create a project at [script.new](https://script.new), paste [apps-script/telegram-proxy.gs](apps-script/telegram-proxy.gs), and add these under **Project Settings → Script properties**: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and `PROXY_KEY` (any long random string).
4. Deploy with **Deploy → New deployment → Web app**, keeping **Execute as: Me** and **Who has access: Anyone**. Copy the `/exec` URL.
5. Copy `.env.example` to `.env.local` and set `VITE_TELEGRAM_PROXY_URL` to that URL and `VITE_TELEGRAM_PROXY_KEY` to the same `PROXY_KEY`.

For GitHub Pages, add the same two values as repository secrets named `TELEGRAM_PROXY_URL` and `TELEGRAM_PROXY_KEY`; the deploy workflow passes them to the build. Opening the deployed `/exec` URL in a browser returns `{"ok":true}` when the proxy is live.

Each message includes the originating page, the visitor's city, region, and country from [ipwho.is](https://ipwho.is), and the time in Portland. Runtime errors are reported the same way, with repeats of the same error suppressed for five seconds.

The proxy checks the shared key and allows 30 messages per hour. The key is compiled into the public bundle, so it only deters casual abuse; Google's URL Fetch quota is the hard backstop. The bot token itself stays server-side. Without the proxy variables the client is a no-op, so the forms still work locally.

Setting `VITE_TELEGRAM_BOT_TOKEN` and `VITE_TELEGRAM_CHAT_ID` instead of a proxy sends straight from the browser. That is handy for a quick local test, but anyone can read the token from the deployed JavaScript, so the workflow never passes those values into a production build.

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
apps-script/telegram-proxy.gs  Google Apps Script Telegram proxy
public/                        CNAME, icons, manifest, robots.txt, OG image
scripts/seo-postbuild.mjs      static route HTML, 404 fallback, sitemap
scripts/seo-render.mjs         shared head-tag renderer
src/
  assets/                      photography and image map
  components/                  layout, header, footer, SEO, cards, forms
  data/                        site details, menu, SEO metadata
  lib/                         Telegram notification client
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
