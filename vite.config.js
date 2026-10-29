import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pageMeta } from './src/data/seo.js';
import { renderHead } from './scripts/seo-render.mjs';

const normalizeBase = (value) => {
  const trimmed = String(value || '').replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
};

const injectHomeSeo = () => ({
  name: 'inject-home-seo',
  transformIndexHtml(html) {
    const start = '<!--seo:start-->';
    const end = '<!--seo:end-->';
    const startIndex = html.indexOf(start);
    const endIndex = html.indexOf(end);

    if (startIndex === -1 || endIndex === -1) {
      throw new Error('index.html is missing the SEO markers');
    }

    return (
      html.slice(0, startIndex + start.length) +
      `\n    ${renderHead(pageMeta.home)}\n    ` +
      html.slice(endIndex)
    );
  },
});

export default defineConfig(({ command, isPreview }) => ({
  base:
    command === 'build' || isPreview
      ? normalizeBase(process.env.BASE_PATH || '/')
      : '/',
  plugins: [react(), injectHomeSeo()],
}));
