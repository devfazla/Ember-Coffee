import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pageMeta, siteUrl } from '../src/data/seo.js';
import { renderHead } from './seo-render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const startMarker = '<!--seo:start-->';
const endMarker = '<!--seo:end-->';
const lastmod = (() => {
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cs'], {
      cwd: root,
      encoding: 'utf8',
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
})();

const template = await readFile(join(dist, 'index.html'), 'utf8');

const inject = (html, meta) => {
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error('The SEO markers were not found in dist/index.html');
  }

  return (
    html.slice(0, startIndex + startMarker.length) +
    `\n    ${renderHead(meta)}\n    ` +
    html.slice(endIndex)
  );
};

const routes = [
  pageMeta.home,
  pageMeta.menu,
  pageMeta.about,
  pageMeta.contact,
  pageMeta.reserve,
];

for (const meta of routes) {
  const directory = meta.path === '/' ? dist : join(dist, meta.path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), inject(template, meta));
}

await writeFile(join(dist, '404.html'), inject(template, pageMeta.notFound));

const urls = routes
  .map((meta) =>
    [
      '  <url>',
      `    <loc>${meta.canonical}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${meta.changeFrequency}</changefreq>`,
      `    <priority>${meta.priority}</priority>`,
      '  </url>',
    ].join('\n'),
  )
  .join('\n');

await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log(
  `SEO: wrote ${routes.length} route pages, 404.html, and sitemap.xml for ${siteUrl}`,
);
