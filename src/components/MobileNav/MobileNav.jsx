import { useState, useRef, useCallback, useEffect } from 'react';
import useFocusTrap from '../../hooks/useFocusTrap';
import './MobileNav.css';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#main-feed', label: 'Main Feed' },
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Stack' },
];

const EXTERNAL_LINKS = [
  { href: 'mailto:hello@lukeylias.com', label: 'Email' },
  { href: 'https://github.com/lukeylias', label: 'GitHub', external: true },
  { href: 'https://twitter.com/lukeylias', label: 'Twitter', external: true },
];

export default function MobileNav({ onOpenChat }) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const toggleRef = useRef(null);

  useFocusTrap(overlayRef, isOpen);

  const close = useCallback(() => {
    setIsOpen(false);
    toggleRef.current?.focus();
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  return (
    <>
      <header className="mobile-nav">
        <span className="mobile-nav__name">Luke Ylias</span>
        <button
          ref={toggleRef}
          className="mobile-nav__toggle"
          aria-expanded={isOpen}
          aria-controls="mobile-overlay"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={toggle}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </header>

      <div
        ref={overlayRef}
        className={`mobile-overlay${isOpen ? ' is-open' : ''}`}
        id="mobile-overlay"
      >
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={close}>{label}</a>
          ))}
          <button
            className="mobile-overlay__chat-btn"
            onClick={() => { onOpenChat(); close(); }}
            type="button"
          >
            💬 Chat
          </button>
        </nav>
        <div className="mobile-overlay__links">
          {EXTERNAL_LINKS.map(({ href, label, external }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              {...(external ? { target: '_blank', rel: 'noopener' } : {})}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
