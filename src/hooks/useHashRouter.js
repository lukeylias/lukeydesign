import { useEffect, useMemo, useState } from 'react';
import { parseRoute } from '../utils/routes';

export default function useHashRouter() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');

  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#') {
      window.location.replace('#/');
    }

    function onHashChange() {
      const nextHash = window.location.hash || '#/';
      if (window.history.state?.piInApp !== true) {
        window.history.replaceState({ ...(window.history.state || {}), piInApp: true }, '', nextHash);
      }
      setHash(nextHash);
    }

    if (window.history.state?.piInApp !== true) {
      const currentHash = window.location.hash || '#/';
      window.history.replaceState({ ...(window.history.state || {}), piInApp: true }, '', currentHash);
    }

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const route = useMemo(() => parseRoute(hash), [hash]);

  return { route };
}
