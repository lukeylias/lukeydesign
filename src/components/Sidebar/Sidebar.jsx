import ExternalLinkIcon from '../ExternalLinkIcon';
import './Sidebar.css';

const NAV_LINKS = [
  { href: '#/', label: 'Home' },
  { href: '#/notes', label: 'Notes' },
  { href: '#/experiments', label: 'Experiments' },
  { href: '#/stack', label: 'Stack' },
  { href: '#/about', label: 'About' },
];

const EXTERNAL_LINKS = [
  { href: 'mailto:hello@lukeylias.com', label: 'Email' },
  { href: 'https://github.com/lukeylias', label: 'GitHub', external: true },
];

export default function Sidebar({ onOpenChat }) {
  return (
    <aside className="sidebar" role="complementary">
      <div>
        <div className="sidebar__name">Luke Ylias</div>
        <div className="sidebar__tagline">Design, code &amp; AI</div>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href}>{label}</a>
        ))}
        <button className="sidebar__chat-btn" onClick={onOpenChat} type="button">
          💬 Chat
        </button>
      </nav>

      <div className="sidebar__links">
        {EXTERNAL_LINKS.map(({ href, label, external }) => (
          <a
            key={href}
            href={href}
            className={external ? 'external-link' : undefined}
            {...(external ? { target: '_blank', rel: 'noopener' } : {})}
          >
            {label}
            {external && <ExternalLinkIcon />}
          </a>
        ))}
      </div>
    </aside>
  );
}
