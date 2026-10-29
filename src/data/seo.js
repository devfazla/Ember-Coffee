import { menuSections } from './menu.js';
import { site } from './site.js';

export const siteUrl = 'https://devfazla.github.io/Ember-Coffee';
export const siteName = 'Ember Coffee';
export const siteDescription =
  'A small coffee room in Portland: house-roasted coffee, pastries baked every morning, and a quiet table by the window.';
export const ogImage = `${siteUrl}/og-image.png`;
export const ogImageAlt = 'Ember Coffee — good coffee, slowly, in a small Portland room';
export const ogImageWidth = 1200;
export const ogImageHeight = 630;

const indexable =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

const pageUrl = (path) => (path === '/' ? `${siteUrl}/` : `${siteUrl}${path}/`);

export const pageMeta = {
  home: {
    key: 'home',
    path: '/',
    label: 'Home',
    pageType: 'WebPage',
    title: 'Ember Coffee — Small room, good coffee. Portland, OR',
    description:
      'A small coffee room in Portland: house-roasted coffee, pastries baked every morning, and a quiet table by the window. Open daily, 7 am to 6 pm.',
    robots: indexable,
    canonical: `${siteUrl}/`,
    changeFrequency: 'weekly',
    priority: '1.0',
    inSitemap: true,
  },
  menu: {
    key: 'menu',
    path: '/menu',
    label: 'Menu',
    pageType: 'WebPage',
    title: 'Coffee & Bakery Menu | Ember Coffee',
    description:
      'Espresso, flat white, pour-over, cold brew, croissants, cardamom buns, and more — the full Ember menu, with prices, baked fresh every morning.',
    robots: indexable,
    canonical: pageUrl('/menu'),
    changeFrequency: 'weekly',
    priority: '0.8',
    inSitemap: true,
  },
  about: {
    key: 'about',
    path: '/about',
    label: 'About',
    pageType: 'AboutPage',
    title: 'Our Story & Team | Ember Coffee',
    description:
      'Ember opened in 2019 with one counter, two stools, and a secondhand grinder. Meet founder Nora Bennett and the small team behind the coffee and the bakery.',
    robots: indexable,
    canonical: pageUrl('/about'),
    changeFrequency: 'monthly',
    priority: '0.6',
    inSitemap: true,
  },
  contact: {
    key: 'contact',
    path: '/contact',
    label: 'Contact',
    pageType: 'ContactPage',
    title: 'Visit & Contact | Ember Coffee',
    description:
      'Find Ember at 214 Ash Street in Portland, open daily 7 am–6 pm. Call (503) 555-0142, email hello@embercafe.coffee, or send us a note.',
    robots: indexable,
    canonical: pageUrl('/contact'),
    changeFrequency: 'monthly',
    priority: '0.6',
    inSitemap: true,
  },
  reserve: {
    key: 'reserve',
    path: '/reserve',
    label: 'Reserve',
    pageType: 'WebPage',
    title: 'Reserve a Table | Ember Coffee',
    description:
      'Hold a table at Ember for one to eight guests. Pick a date and time, and we’ll keep the room quiet and the coffee warm.',
    robots: indexable,
    canonical: pageUrl('/reserve'),
    changeFrequency: 'monthly',
    priority: '0.5',
    inSitemap: true,
  },
  notFound: {
    key: 'notFound',
    path: null,
    label: 'Page not found',
    pageType: 'WebPage',
    title: 'Page Not Found | Ember Coffee',
    description:
      'This page isn’t on the menu. Head back to Ember’s home page for coffee, pastries, and visiting hours.',
    robots: 'noindex, follow',
    canonical: null,
    changeFrequency: null,
    priority: null,
    inSitemap: false,
  },
};

export function getPageMeta(pathname = '/') {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') || '/' : pathname;
  return Object.values(pageMeta).find((page) => page.path === normalized) || pageMeta.notFound;
}

const cafeId = `${siteUrl}/#cafe`;
const websiteId = `${siteUrl}/#website`;
const menuId = `${siteUrl}/menu/#menu`;

const buildCafe = () => ({
  '@type': 'CafeOrCoffeeShop',
  '@id': cafeId,
  name: siteName,
  alternateName: site.name,
  description: siteDescription,
  url: `${siteUrl}/`,
  telephone: site.phoneHref.replace('tel:', ''),
  email: site.email,
  image: ogImage,
  logo: `${siteUrl}/icon-512.png`,
  priceRange: '$$',
  servesCuisine: ['Coffee', 'Bakery', 'Pastries'],
  hasMenu: `${siteUrl}/menu/`,
  acceptsReservations: `${siteUrl}/reserve/`,
  foundingDate: String(site.founded),
  founder: {
    '@type': 'Person',
    name: site.founder,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.line1,
    addressLocality: 'Portland',
    addressRegion: 'OR',
    postalCode: '97204',
    addressCountry: 'US',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '07:00',
    closes: '18:00',
  },
});

const buildWebsite = () => ({
  '@type': 'WebSite',
  '@id': websiteId,
  url: `${siteUrl}/`,
  name: siteName,
  description: siteDescription,
  inLanguage: 'en',
  publisher: { '@id': cafeId },
});

const buildMenu = () => ({
  '@type': 'Menu',
  '@id': menuId,
  name: 'Ember menu',
  inLanguage: 'en',
  hasMenuSection: menuSections.map((section) => ({
    '@type': 'MenuSection',
    name: section.title,
    hasMenuItem: section.items.map((item) => ({
      '@type': 'MenuItem',
      name: item.name,
      offers: {
        '@type': 'Offer',
        price: item.price.replace('$', ''),
        priceCurrency: 'USD',
      },
    })),
  })),
});

const buildWebPage = (meta) => ({
  '@type': meta.pageType,
  '@id': `${meta.canonical}#webpage`,
  url: meta.canonical,
  name: meta.title,
  description: meta.description,
  isPartOf: { '@id': websiteId },
  about: { '@id': cafeId },
  inLanguage: 'en',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: ogImage,
    width: ogImageWidth,
    height: ogImageHeight,
  },
});

const buildBreadcrumb = (meta) => ({
  '@type': 'BreadcrumbList',
  '@id': `${meta.canonical}#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: meta.label,
      item: meta.canonical,
    },
  ],
});

export function buildStructuredData(meta) {
  if (!meta.canonical) return null;

  const webPage = buildWebPage(meta);
  if (meta.key === 'menu') {
    webPage.mainEntity = { '@id': menuId };
  }

  const graph = [buildCafe(), buildWebsite(), webPage];

  if (meta.path !== '/') {
    graph.push(buildBreadcrumb(meta));
  }

  if (meta.key === 'menu') {
    graph.push(buildMenu());
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
