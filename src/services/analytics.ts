declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GOOGLE_MEASUREMENT_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;
const SITE_URL = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ?? 'https://anantabyte.com';

function addScript(id: string, src?: string, inline?: string) {
  if (document.head.querySelector(`script#${id}`)) return;
  const script = document.createElement('script');
  script.id = id;
  if (src) {
    script.src = src;
    script.async = true;
  }
  if (inline) {
    script.textContent = inline;
  }
  document.head.appendChild(script);
}

export function initializeAnalytics() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  if (GA_ID) {
    addScript('gtag-js', `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    addScript(
      'gtag-init',
      undefined,
      `window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);} 
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });`
    );
  }

  if (CLARITY_ID) {
    addScript(
      'clarity-init',
      undefined,
      `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, 'clarity', 'script', '${CLARITY_ID}');`
    );
  }
}

export function trackPageView(pathname: string) {
  if (typeof window === 'undefined') return;
  const pageLocation = `${SITE_URL}${pathname}`;
  if (GA_ID && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: pageLocation,
    });
  }
}

export function trackEvent(action: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  if (GA_ID && window.gtag) {
    window.gtag('event', action, params);
  }
  if (CLARITY_ID && window.clarity) {
    window.clarity('set', { event: action, ...params });
  }
}

export function trackLeadSubmission(details: { category?: string; label?: string; value?: number } = {}) {
  trackEvent('lead', {
    event_category: 'contact_form',
    event_label: details.label || 'Lead inquiry',
    value: details.value ?? 1,
    ...details,
  });
}
