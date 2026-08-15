import { findEntryByTypeAndSlug } from '../data';
import { findSideProject, findWorkProject } from '../data/portfolio';

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
    return { type: 'home', hash: '#/' };
  }

  if (segments.length === 1) {
    if (segments[0] === 'work' || segments[0] === 'case-studies') {
      return { type: 'home', hash: '#/' };
    }
    if (segments[0] === 'blog') {
      return { type: 'notes', hash: '#/notes' };
    }
    if (segments[0] === 'notes') {
      return { type: 'notes', hash: '#/notes' };
    }
    if (segments[0] === 'side-projects') {
      return { type: 'side-project-index', hash };
    }
    if (segments[0] === 'experiments') return { type: 'experiment-index', hash: '#/experiments' };
    if (segments[0] === 'stack') return { type: 'stack-list', hash: '#/stack' };
    if (segments[0] === 'about') return { type: 'about', hash: '#/about' };
    return { type: 'not-found', hash };
  }

  if (segments.length >= 2) {
    const [section, ...slugParts] = segments;
    const slug = slugParts.join('/');

    if (section === 'work' || section === 'case-studies') {
      const project = findWorkProject(slug);
      if (!project) return { type: 'not-found', hash };
      return { type: 'work-detail', slug: project.slug, project, hash: project.href };
    }

    if (section === 'side-projects') {
      const project = findSideProject(slug);
      if (!project) return { type: 'not-found', hash };
      return { type: 'side-project-detail', slug: project.slug, project, hash: project.href };
    }

    if (section === 'notes' || section === 'blog') {
      if (section === 'blog') {
        const sideProject = findSideProject(slug);
        if (sideProject) {
          return {
            type: 'side-project-detail',
            slug: sideProject.slug,
            project: sideProject,
            hash: sideProject.href,
          };
        }
      }
      const entry = findEntryByTypeAndSlug('blog', slug);
      if (!entry) return { type: 'reader-not-found', entryType: 'blog', hash, fallbackHref: '#/notes' };
      return { type: 'reader', entryType: 'blog', slug, entry, hash: `#/notes/${slug}` };
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
