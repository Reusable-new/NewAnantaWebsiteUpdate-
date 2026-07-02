export const SITE_NAME = 'Ananta Byte';
export const DEFAULT_TITLE = 'Ananta Byte - IT Solutions';
export const DEFAULT_DESCRIPTION = 'Ananta Byte builds enterprise-ready web, mobile, AI, and cloud solutions for startups, SMEs, and enterprises.';
export const BASE_URL = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ?? 'https://anantabyte.com';
export const DEFAULT_IMAGE = '/image/mobile-og.svg';

export function getAbsoluteUrl(pathname = '') {
  if (!pathname) return BASE_URL;
  if (pathname.startsWith('http://') || pathname.startsWith('https://')) return pathname;
  const sanitizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${BASE_URL}${sanitizedPath}`;
}

export function getPageTitle(title?: string) {
  return title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
}

export function getPageDescription(description?: string) {
  return description?.trim() || DEFAULT_DESCRIPTION;
}

export function getCanonicalUrl(pathname = '') {
  return getAbsoluteUrl(pathname);
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE_URL,
    logo: getAbsoluteUrl('/image/logo.png'),
    sameAs: [
      'https://www.linkedin.com/',
      'https://www.facebook.com/',
      'https://twitter.com/',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-8009976304',
        contactType: 'customer support',
        areaServed: 'IN',
        availableLanguage: ['English'],
      },
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/blog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.url),
    })),
  };
}

export function buildArticleSchema(params: {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    author: {
      '@type': 'Person',
      name: params.author,
    },
    datePublished: params.publishDate,
    image: [getAbsoluteUrl(params.image)],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getAbsoluteUrl(params.url),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/image/logo.png'),
      },
    },
  };
}

export function buildServiceSchema(params: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    areaServed: 'Global',
    url: getAbsoluteUrl(params.url),
  };
}

export function getDefaultSchemas() {
  return [buildOrganizationSchema(), buildWebsiteSchema()];
}
