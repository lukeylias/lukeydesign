import { useState, useEffect, useCallback } from 'react';

function parseHash() {
  const hash = location.hash;
  if (!hash || !hash.startsWith('#/')) return null;
  const parts = hash.substring(2).split('/');
  if (parts.length < 2) return null;
  return { section: parts[0], slug: parts.slice(1).join('/') };
}

export default function useHashRouter() {
  const [route, setRoute] = useState(() => parseHash());

  useEffect(() => {
    function onPopState() {
      setRoute(parseHash());
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const setHash = useCallback((section, slug) => {
    history.pushState({ modal: true, section, slug }, '', `#/${section}/${slug}`);
    setRoute({ section, slug });
  }, []);

  const clearHash = useCallback(() => {
    history.pushState({}, '', location.pathname);
    setRoute(null);
  }, []);

  return { route, setHash, clearHash };
}
