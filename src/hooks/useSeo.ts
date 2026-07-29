import { useEffect } from 'react';

// TODO: replace with the real production domain once one exists (see AUDIT_REPORT.md).
export const SITE_URL = 'https://example.com';
export const SITE_NAME = 'WonderKids School';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Sets per-route title/description/canonical/OG/Twitter tags. Dependency-free (no react-helmet). */
export function useSeo({ title, description, path, image }: SeoOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('name', 'twitter:image', image);
    }
  }, [title, description, path, image]);
}

/** Injects a single sitewide EducationalOrganization JSON-LD block. Values match Footer.tsx's own fallback settings. */
export function useOrganizationJsonLd() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      description:
        'A premium CBSE-affiliated institution dedicated to academic excellence, holistic development, and shaping the global leaders of tomorrow.',
      url: SITE_URL,
      email: 'admissions@wonderkids.edu.in',
      telephone: '+91 98765 43210',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Education Boulevard, Knowledge Park Phase 1, New Delhi - 110001',
      },
    };

    let script = document.head.querySelector<HTMLScriptElement>('script[data-seo="org-jsonld"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'org-jsonld');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, []);
}
