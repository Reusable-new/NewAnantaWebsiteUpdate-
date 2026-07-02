import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_IMAGE,
  getAbsoluteUrl,
  getCanonicalUrl,
  getPageDescription,
  getPageTitle,
} from '../services/seo';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
  canonical?: string;
  robots?: string;
  schema?: unknown | unknown[];
};

function updateMeta(name: string, content?: string) {
  if (!content) return;
  const selector = `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateMetaProperty(property: string, content?: string) {
  if (!content) return;
  const selector = `meta[property="${property}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateLink(rel: string, href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

function setJsonLd(schema?: unknown | unknown[]) {
  const id = 'seo-json-ld';
  const existing = document.head.querySelector<HTMLScriptElement>(`script[id="${id}"]`);
  if (!schema) {
    existing?.remove();
    return;
  }

  const payload = Array.isArray(schema) ? schema : [schema];
  const json = JSON.stringify(payload, null, 2);

  if (existing) {
    existing.textContent = json;
    return;
  }

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = json;
  document.head.appendChild(script);
}

export default function SEO({
  title,
  description,
  image,
  pathname,
  canonical,
  robots,
  schema,
}: SEOProps) {
  const location = useLocation();
  const path = pathname ?? location.pathname;
  const pageTitle = getPageTitle(title);
  const pageDescription = getPageDescription(description);
  const canonicalUrl = canonical ?? getCanonicalUrl(path);
  const imageUrl = getAbsoluteUrl(image ?? DEFAULT_IMAGE);

  useEffect(() => {
    document.title = pageTitle;
    updateMeta('description', pageDescription);
    updateMeta('robots', robots ?? 'index,follow');
    updateLink('canonical', canonicalUrl);

    updateMetaProperty('og:type', 'website');
    updateMetaProperty('og:title', pageTitle);
    updateMetaProperty('og:description', pageDescription);
    updateMetaProperty('og:url', canonicalUrl);
    updateMetaProperty('og:image', imageUrl);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', pageTitle);
    updateMeta('twitter:description', pageDescription);
    updateMeta('twitter:image', imageUrl);
    setJsonLd(schema);
  }, [pageTitle, pageDescription, robots, canonicalUrl, imageUrl, schema]);

  return null;
}
