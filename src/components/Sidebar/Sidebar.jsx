import './Sidebar.css';

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

export default function Sidebar() {
  return (
    <aside className="sidebar" role="complementary">
      <div>
        <div className="sidebar__name">Luke Ylias</div>
        <div className="sidebar__tagline">Design &amp; technology</div>
      </div>

      <p className="sidebar__bio">
        Placeholder bio — a short paragraph about what Luke does, interests, and current focus.
      </p>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href}>{label}</a>
        ))}
        <a href="chatbot.html">Chatbot (v1)</a>
      </nav>

      <div className="sidebar__links">
        {EXTERNAL_LINKS.map(({ href, label, external }) => (
          <a
            key={href}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener' } : {})}
          >
            {label}
          </a>
        ))}
      </div>
    </aside>
  );
}
