import {
  buildStructuredData,
  ogImage,
  ogImageAlt,
  ogImageHeight,
  ogImageWidth,
  siteName,
} from '../src/data/seo.js';

const escape = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function renderHead(meta) {
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<meta name="robots" content="${escape(meta.robots)}" />`,
  ];

  if (meta.canonical) {
    tags.push(`<link rel="canonical" href="${escape(meta.canonical)}" />`);
  }

  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(siteName)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
  );

  if (meta.canonical) {
    tags.push(`<meta property="og:url" content="${escape(meta.canonical)}" />`);
  }

  tags.push(
    `<meta property="og:image" content="${escape(ogImage)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="${ogImageWidth}" />`,
    `<meta property="og:image:height" content="${ogImageHeight}" />`,
    `<meta property="og:image:alt" content="${escape(ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${escape(ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${escape(ogImageAlt)}" />`,
  );

  const data = buildStructuredData(meta);

  if (data) {
    tags.push(
      `<script type="application/ld+json" data-seo="jsonld">${JSON.stringify(data)}</script>`,
    );
  }

  return tags.join('\n    ');
}
