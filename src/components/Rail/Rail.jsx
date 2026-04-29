import { useEffect, useMemo, useRef, useState } from 'react';
import './Rail.css';

const NAV_ITEMS = [
  { label: '~/feed', href: '#/' },
  { label: 'blog/', href: '#/blog' },
  { label: 'case-studies/', href: '#/case-studies' },
  { label: 'experiments/', href: '#/experiments' },
  { label: 'stack/', href: '#/stack' },
  { label: 'about/', href: '#/about' },
];

function isActive(route, href) {
  if (href === '#/') {
    return route.type === 'feed' && route.filter === 'all';
  }
  if (href === '#/blog') {
    return (route.type === 'feed' && route.filter === 'blog')
      || ((route.type === 'reader' || route.type === 'reader-not-found') && route.entryType === 'blog');
  }
  if (href === '#/case-studies') {
    return (route.type === 'feed' && route.filter === 'case-studies')
      || ((route.type === 'reader' || route.type === 'reader-not-found') && route.entryType === 'case-studies');
  }
  if (href === '#/experiments') {
    return (route.type === 'feed' && route.filter === 'experiment')
      || route.type === 'experiment'
      || route.type === 'experiment-not-found';
  }
  if (href === '#/stack') {
    return route.type === 'stack-list'
      || ((route.type === 'reader' || route.type === 'reader-not-found') && route.entryType === 'stack');
  }
  if (href === '#/about') return route.type === 'about';
  return false;
}

export default function Rail({ route }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavRef = useRef(null);

  const navItems = useMemo(
    () => NAV_ITEMS.map((item) => ({ ...item, active: isActive(route, item.href) })),
    [route]
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [route.hash]);

  function onMobileNavKeyDown(event) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

    const links = Array.from(mobileNavRef.current?.querySelectorAll('a') || []);
    const index = links.indexOf(document.activeElement);
    if (index === -1) return;

    event.preventDefault();
    const nextIndex = event.key === 'ArrowRight'
      ? (index + 1) % links.length
      : (index - 1 + links.length) % links.length;

    links[nextIndex]?.focus();
  }

  return (
    <>
      <header className="rail rail-mobile" aria-label="Primary">
        <div className="rail-mobile-top">
          <a className="rail-brand" href="#/">Luke Ylias</a>
          <button
            type="button"
            className="rail-mobile-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-primary-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            Menu
          </button>
        </div>
        <p className="rail-tagline">Design, Code, and AI.</p>

        <nav
          id="mobile-primary-nav"
          ref={mobileNavRef}
          className={`rail-mobile-nav-wrap ${mobileOpen ? 'is-open' : ''}`}
          onKeyDown={onMobileNavKeyDown}
        >
          <ul className="rail-nav rail-nav-mobile">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={item.active ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <aside className="rail rail-desktop" aria-label="Primary">
        <div className="rail-intro">
          <a className="rail-brand" href="#/">Luke Ylias</a>
          <p className="rail-tagline">Design, Code, and AI.</p>
        </div>
        <nav>
          <ul className="rail-nav rail-nav-desktop">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} aria-current={item.active ? 'page' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
