import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  buildStructuredData,
  getPageMeta,
  ogImage,
  ogImageAlt,
  ogImageHeight,
  ogImageWidth,
  siteName,
} from '../data/seo.js';

const setMeta = (attribute, key, value) => {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector(selector);

  if (value == null) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', value);
};

const setCanonical = (href) => {
  let link = document.head.querySelector('link[rel="canonical"]');

  if (href == null) {
    link?.remove();
    return;
  }

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
};

const setStructuredData = (data) => {
  let script = document.head.querySelector('script[data-seo="jsonld"]');

  if (!data) {
    script?.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seo = 'jsonld';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
};

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);

    document.title = meta.title;

    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.robots);
    setCanonical(meta.canonical);

    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', siteName);
    setMeta('property', 'og:locale', 'en_US');
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', meta.canonical);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:image:type', 'image/png');
    setMeta('property', 'og:image:width', String(ogImageWidth));
    setMeta('property', 'og:image:height', String(ogImageHeight));
    setMeta('property', 'og:image:alt', ogImageAlt);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', ogImage);
    setMeta('name', 'twitter:image:alt', ogImageAlt);

    setStructuredData(buildStructuredData(meta));
  }, [pathname]);

  return null;
}
