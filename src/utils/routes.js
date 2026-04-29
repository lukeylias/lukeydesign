import { findEntryByTypeAndSlug } from '../data';

function normaliseHash(hashValue) {
  if (!hashValue || hashValue === '#') return '#/';
  if (hashValue.startsWith('#/')) return hashValue;
  if (hashValue.startsWith('#')) return `#/${hashValue.slice(1)}`;
  return '#/';
}

function toSegments(hashValue) {
  const cleaned = normaliseHash(hashValue).slice(2);
  if (!cleaned) return [];
  return cleaned.split('/').filter(Boolean);
}

export function parseRoute(hashValue) {
  const hash = normaliseHash(hashValue);
  const segments = toSegments(hash);

  if (segments.length === 0) {
    return { type: 'feed', filter: 'all', hash: '#/' };
  }

  if (segments.length === 1) {
    if (segments[0] === 'blog') return { type: 'feed', filter: 'blog', hash: '#/blog' };
    if (segments[0] === 'case-studies') return { type: 'feed', filter: 'case-studies', hash: '#/case-studies' };
    if (segments[0] === 'experiments') return { type: 'feed', filter: 'experiment', hash: '#/experiments' };
    if (segments[0] === 'stack') return { type: 'stack-list', hash: '#/stack' };
    if (segments[0] === 'about') return { type: 'about', hash: '#/about' };
    return { type: 'not-found', hash };
  }

  if (segments.length >= 2) {
    const [section, ...slugParts] = segments;
    const slug = slugParts.join('/');

    if (section === 'blog') {
      const entry = findEntryByTypeAndSlug('blog', slug);
      if (!entry) return { type: 'reader-not-found', entryType: 'blog', hash, fallbackHref: '#/blog' };
      return { type: 'reader', entryType: 'blog', slug, entry, hash: `#/blog/${slug}` };
    }

    if (section === 'case-studies') {
      const entry = findEntryByTypeAndSlug('case-studies', slug);
      if (!entry) return { type: 'reader-not-found', entryType: 'case-studies', hash, fallbackHref: '#/case-studies' };
      return { type: 'reader', entryType: 'case-studies', slug, entry, hash: `#/case-studies/${slug}` };
    }

    if (section === 'stack') {
      const entry = findEntryByTypeAndSlug('stack', slug);
      if (!entry) return { type: 'reader-not-found', entryType: 'stack', hash, fallbackHref: '#/stack' };
      return { type: 'reader', entryType: 'stack', slug, entry, hash: `#/stack/${slug}` };
    }

    if (section === 'experiments') {
      const entry = findEntryByTypeAndSlug('experiment', slug);
      if (!entry) return { type: 'experiment-not-found', hash, fallbackHref: '#/' };
      return { type: 'experiment', slug, entry, hash: `#/experiments/${slug}` };
    }

    return { type: 'not-found', hash };
  }

  return { type: 'not-found', hash };
}
