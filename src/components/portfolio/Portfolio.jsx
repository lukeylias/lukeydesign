import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import about from '../../data/about';
import useFocusTrap from '../../hooks/useFocusTrap';
import {
  findSideProject,
  findWorkProject,
  getCaseStudySections,
  getFeaturedCaseStudyContent,
  getProjectFacts,
  moreWork,
  normaliseMediaBlock,
  selectedWork,
  sideProjects,
  workProjects,
  writing,
} from '../../data/portfolio';
import '../../styles/portfolio.css';

function Arrow() {
  return (
    <span className="link-arrow" aria-hidden="true">
      <img src="/icons/arrow-right.svg" width="24" height="24" alt="" />
    </span>
  );
}

function ProjectImage({ media, eager = false }) {
  return (
    <img
      src={media.src}
      width={media.width}
      height={media.height}
      alt={media.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
    />
  );
}

export function SiteHeader({ route }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const menuRef = useRef(null);
  const menuTimerRef = useRef(null);
  const workActive = ['home', 'work-detail'].includes(route.type);
  const notesActive = route.type === 'notes' || (route.type === 'reader' && route.entryType === 'blog');
  const aboutActive = route.type === 'about';

  useFocusTrap(menuRef, menuOpen);

  const closeMenu = useCallback((destinationHref = null) => {
    if (!menuOpen || menuClosing) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const exitDuration = prefersReducedMotion ? 0 : 260;

    setMenuClosing(true);
    window.clearTimeout(menuTimerRef.current);
    menuTimerRef.current = window.setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
      if (destinationHref) window.location.hash = destinationHref;
    }, exitDuration);
  }, [menuClosing, menuOpen]);

  const openMenu = useCallback(() => {
    window.clearTimeout(menuTimerRef.current);
    setMenuClosing(false);
    setMenuOpen(true);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') closeMenu();
    }

    document.documentElement.classList.add('menu-open');
    document.body.classList.add('menu-open');
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 701px)');

    function closeOnDesktop(event) {
      if (!event.matches) return;

      window.clearTimeout(menuTimerRef.current);
      setMenuClosing(false);
      setMenuOpen(false);
    }

    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => () => {
    window.clearTimeout(menuTimerRef.current);
  }, []);

  function handleMenuNavigate(event) {
    event.preventDefault();
    closeMenu(event.currentTarget.getAttribute('href'));
  }

  return (
    <header className="site-header">
      <a className="site-brand" href="#/" aria-label="Luke Ylias, home">
        <img src="/icons/luke-portrait-logo.png" width="1024" height="1024" alt="" />
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#/" aria-current={workActive ? 'page' : undefined}>Work</a>
        <a href="#/notes" aria-current={notesActive ? 'page' : undefined}>Notes</a>
        <a href="#/about" aria-current={aboutActive ? 'page' : undefined}>About</a>
      </nav>
      <button
        className="site-menu-toggle"
        type="button"
        aria-controls="mobile-site-menu"
        aria-expanded={menuOpen}
        onClick={openMenu}
      >
        Menu
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-site-menu"
          className={`site-menu-overlay${menuClosing ? ' site-menu-overlay--closing' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="site-menu-overlay__inner">
            <div className="site-menu-overlay__top">
              <span className="site-menu-overlay__brand" aria-hidden="true">
                <img src="/icons/luke-portrait-logo.png" width="1024" height="1024" alt="" />
              </span>
              <button
                className="site-menu-close"
                type="button"
                onClick={() => closeMenu()}
              >
                Close
              </button>
            </div>

            <nav className="site-menu-overlay__nav" aria-label="Mobile navigation">
              <a
                href="#/"
                aria-current={workActive ? 'page' : undefined}
                onClick={handleMenuNavigate}
              >
                Work
              </a>
              <a
                href="#/notes"
                aria-current={notesActive ? 'page' : undefined}
                onClick={handleMenuNavigate}
              >
                Notes
              </a>
              <a
                href="#/about"
                aria-current={aboutActive ? 'page' : undefined}
                onClick={handleMenuNavigate}
              >
                About
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="social-links" aria-label="Social profiles">
        <a
          href="https://github.com/lukeylias"
          target="_blank"
          rel="noreferrer"
          aria-label="Luke Ylias on GitHub"
        >
          <img src="/icons/github.svg" width="128" height="128" alt="" />
        </a>
        <a
          href="https://www.linkedin.com/in/lukeylias/"
          target="_blank"
          rel="noreferrer"
          aria-label="Luke Ylias on LinkedIn"
        >
          <img src="/icons/linkedin.png" width="840" height="779" alt="" />
        </a>
      </nav>
    </footer>
  );
}

function ReelPlaceholder() {
  return (
    <figure className="reel-placeholder" aria-label="Portfolio reel placeholder">
      <div className="reel-placeholder__media">
        <img
          src="/images/iwhi-select-cover.webp"
          width="2400"
          height="1707"
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <img
          src="/images/Offers-Landing-Page.webp"
          width="2400"
          height="1660"
          alt=""
          loading="eager"
          fetchPriority="auto"
          decoding="async"
        />
      </div>
    </figure>
  );
}

function SelectedProjectCard({ project, eager }) {
  return (
    <a className="selected-project" href={project.href}>
      <span className="selected-project__media">
        <ProjectImage media={project.media} eager={eager} />
      </span>
      <span className="selected-project__title">{project.headline}</span>
    </a>
  );
}

function CompactLinkList({ items }) {
  return (
    <ul className="compact-list">
      {items.map((item) => (
        <li key={item.slug}>
          <a href={item.href}>
            <span>{item.headline}</span>
            <Arrow />
          </a>
        </li>
      ))}
    </ul>
  );
}

const sideProjectPresentation = {
  sa11y: {
    icon: '/icons/side-projects/sa11y.svg',
    meta: 'Web accessibility tool',
  },
  a11ycat: {
    icon: '/icons/side-projects/a11ycat.svg',
    meta: 'AI accessibility auditor',
  },
  'figma-plugins': {
    icon: '/icons/side-projects/figma-plugins.svg',
    meta: 'Three design plugins',
  },
};

function SideProjectList({ items }) {
  return (
    <ul className="side-project-list">
      {items.map((item) => {
        const presentation = sideProjectPresentation[item.slug];

        return (
          <li key={item.slug}>
            <a className="side-project-list__item" href={item.href}>
              <span className={`side-project-list__icon side-project-list__icon--${item.slug}`}>
                <img
                  src={presentation.icon}
                  width="48"
                  height="48"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="side-project-list__copy">
                <span className="side-project-list__title">{item.headline}</span>
                <span className="side-project-list__meta">{presentation.meta}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function NoteList({ items }) {
  return (
    <ul className="more-work-list note-list">
      {items.map((item) => (
        <li key={item.slug}>
          <a className="more-work-list__item note-list__item" href={item.href}>
            <span className="more-work-list__copy">
              <span className="more-work-list__title">{item.headline}</span>
              <span className="more-work-list__meta note-list__meta">{item.body}</span>
            </span>
            <span className="more-work-list__arrow" aria-hidden="true">
              <img src="/icons/arrow-right.svg" width="24" height="24" alt="" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function HomePage() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <h1 id="home-title">Luke Ylias</h1>
        <p>I design, write production code, and build AI deeply into my workflow.</p>
      </section>

      <ReelPlaceholder />

      <section className="selected-work section-block" aria-labelledby="selected-work-title">
        <div className="section-heading-row">
          <h2 id="selected-work-title">Selected work</h2>
        </div>
        <div className="selected-work__grid">
          {selectedWork.map((project) => (
            <SelectedProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="portfolio-lists section-block" aria-label="More work and side projects">
        <div>
          <h2>Work</h2>
          <MoreWorkList items={moreWork.slice(0, 3)} />
        </div>
        <div>
          <h2>Side projects</h2>
          <SideProjectList items={sideProjects} />
        </div>
      </section>

      <section className="writing-section section-block" aria-labelledby="notes-preview-title">
        <div className="section-heading-row section-heading-row--split">
          <h2 id="notes-preview-title">Notes</h2>
          <a className="quiet-link" href="#/notes">
            View all
            <Arrow />
          </a>
        </div>
        <NoteList items={writing.slice(0, 3)} />
      </section>
    </>
  );
}

export function NotesPage() {
  return (
    <section className="notes-page" aria-labelledby="notes-title">
      <header className="notes-page__header">
        <p className="eyebrow">Notes</p>
        <h1 id="notes-title">Things I’m learning, building, and thinking through.</h1>
        <p>Notes on design, production code, AI, and the way I work.</p>
      </header>

      <NoteList items={writing} />
    </section>
  );
}

export function SideProjectIndexPage() {
  return (
    <section className="index-page index-page--compact" aria-labelledby="side-project-index-title">
      <header className="index-page__header">
        <p className="eyebrow">Side projects</p>
        <h1 id="side-project-index-title">I build my own tools when what I need doesn’t exist.</h1>
      </header>
      <CompactLinkList items={sideProjects} />
    </section>
  );
}

function MoreWorkList({ items }) {
  return (
    <ul className="more-work-list">
      {items.map((project) => (
        <li key={project.slug}>
          <a className="more-work-list__item" href={project.href}>
            <span className="more-work-list__copy">
              <span className="more-work-list__title">{project.headline}</span>
              {project.selectedLabel && (
                <span className="more-work-list__meta">{project.selectedLabel}</span>
              )}
            </span>
            <span className="more-work-list__arrow" aria-hidden="true">
              <img src="/icons/arrow-right.svg" width="24" height="24" alt="" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function AboutPage() {
  const confirmedCopy = about.content.filter((line) => !line.toLowerCase().startsWith('based in'));

  return (
    <article className="about-page" aria-labelledby="about-title">
      <section className="about-intro">
        <div className="about-intro__copy">
          <p className="eyebrow">About</p>
          <h1 id="about-title">
            I’m Luke Ylias, a {confirmedCopy[0]}.
          </h1>
          <div className="about-intro__story">
            <p>{confirmedCopy[1]}.</p>
            <p>{confirmedCopy[2]}</p>
            <p>{confirmedCopy[3]}.</p>
          </div>
        </div>

        <figure className="about-portrait">
          <img
            src="/assets/me.jpg"
            width="1776"
            height="1184"
            alt="Luke Ylias standing outdoors beneath an arch of trees"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      </section>

      <section className="about-details" aria-label="Experience and profiles">
        <div className="about-history">
          <h2>Experience</h2>
          <div className="history-list">
            <div>
              <p>nib Health Insurance</p>
              <p>Senior Product Designer</p>
              <p>2023–Present</p>
            </div>
            <div>
              <p>Greater Bank</p>
              <p>UX Designer</p>
              <p>2019–2023</p>
            </div>
          </div>
        </div>

        <div className="about-elsewhere">
          <h2>Elsewhere</h2>
          <ul>
            <li>
              <a href="https://github.com/lukeylias" target="_blank" rel="noreferrer">
                GitHub
                <img src="/icons/arrow-up-right.svg" width="20" height="20" alt="" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/lukeylias/" target="_blank" rel="noreferrer">
                LinkedIn
                <img src="/icons/arrow-up-right.svg" width="20" height="20" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}

function ContentBlock({ block, eager = false }) {
  const mediaBlock = normaliseMediaBlock(block);

  if (mediaBlock.type === 'text') {
    return (
      <p
        className={mediaBlock.placeholder ? 'case-placeholder' : undefined}
        data-content-needed={mediaBlock.placeholderFor || undefined}
      >
        {mediaBlock.value}
      </p>
    );
  }
  if (mediaBlock.type === 'image') {
    return (
      <figure className="case-media">
        <img
          src={mediaBlock.src}
          width={mediaBlock.width}
          height={mediaBlock.height}
          alt={mediaBlock.alt || ''}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
        />
      </figure>
    );
  }
  if (mediaBlock.type === 'video') {
    return (
      <video
        src={mediaBlock.src}
        controls
        preload="metadata"
        aria-label={mediaBlock.alt || 'Project video'}
      />
    );
  }
  if (mediaBlock.type === 'link') {
    return (
      <p>
        <a className="text-link" href={mediaBlock.href} target="_blank" rel="noreferrer">
          {mediaBlock.label || mediaBlock.href}
          <img
            className="inline-external-icon"
            src="/icons/arrow-up-right.svg"
            width="18"
            height="18"
            alt=""
          />
        </a>
      </p>
    );
  }
  return null;
}

function NarrativeSection({ title, blocks, className = '' }) {
  if (blocks.length === 0) return null;

  return (
    <section className={`case-section ${className}`.trim()}>
      <h2>{title}</h2>
      <div className="case-section__content">
        {blocks.map((block, index) => (
          <ContentBlock key={`${block.type}-${index}`} block={block} />
        ))}
      </div>
    </section>
  );
}

export function CaseStudyPage({ slug }) {
  const project = findWorkProject(slug);
  if (!project) return <NotFoundPage />;

  const facts = getProjectFacts(project);
  const sections = getCaseStudySections(project);
  const featuredContent = getFeaturedCaseStudyContent(project);
  const projectIndex = workProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = workProjects[(projectIndex + 1) % workProjects.length];

  return (
    <article className="case-study" aria-labelledby="case-study-title">
      <a className="back-link" href="#/"><Arrow /> Selected work</a>
      <header className="case-study__hero">
        <h1 id="case-study-title">{project.headline}</h1>
        <p>{project.body}</p>
      </header>

      <figure className="case-study__cover">
        <ProjectImage media={project.media} eager />
      </figure>

      <section
        className={`project-overview${featuredContent ? ' project-overview--featured' : ''}`}
        aria-label="Project overview"
      >
        <h2>{featuredContent ? 'Project snapshot' : 'Project overview'}</h2>
        <dl>
          {featuredContent
            ? featuredContent.snapshot.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd
                    className={item.placeholder ? 'case-placeholder' : undefined}
                    data-content-needed={item.placeholderFor || undefined}
                  >
                    {item.value}
                  </dd>
                </div>
              ))
            : (
              <>
                {facts?.organisation && (
                  <div>
                    <dt>Organisation</dt>
                    <dd>{facts.organisation}</dd>
                  </div>
                )}
                {facts?.role && (
                  <div>
                    <dt>Role</dt>
                    <dd>{facts.role}</dd>
                  </div>
                )}
                {facts?.dates && (
                  <div>
                    <dt>Employment period</dt>
                    <dd>{facts.dates}</dd>
                  </div>
                )}
              </>
            )}
        </dl>
      </section>

      {featuredContent
        ? featuredContent.sections.map((section) => (
            <NarrativeSection
              key={section.title}
              title={section.title}
              blocks={section.blocks}
            />
          ))
        : (
          <>
            <NarrativeSection
              title="Outcomes"
              blocks={sections.outcomes}
            />
            <NarrativeSection
              title="Context"
              blocks={sections.context}
            />
            <NarrativeSection
              title="The challenge"
              blocks={sections.problem}
            />
            <NarrativeSection
              title="My role"
              blocks={sections.contribution}
            />
            <NarrativeSection
              title="Decisions"
              blocks={sections.decisions}
            />
            <NarrativeSection
              title="What I learned"
              blocks={sections.reflection}
            />
          </>
        )}

      <a className="case-study__next" href={nextProject.href}>
        <span>
          <span className="case-study__next-label">Next project</span>
          <span className="case-study__next-title">{nextProject.headline}</span>
        </span>
        <Arrow />
      </a>
    </article>
  );
}

export function SideProjectPage({ slug }) {
  const project = findSideProject(slug);
  if (!project) return <NotFoundPage />;

  return (
    <article className="side-project" aria-labelledby="side-project-title">
      <a className="back-link" href="#/"><Arrow /> Home</a>
      <header className="side-project__hero">
        <p className="eyebrow">Side project</p>
        <h1 id="side-project-title">{project.headline}</h1>
        <p>{project.body}</p>
      </header>
      <div className="side-project__content">
        {project.modalContent.map((block, index) => (
          <ContentBlock key={`${block.type}-${index}`} block={block} eager={index === 0} />
        ))}
      </div>
    </article>
  );
}

export function NotFoundPage() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <p className="eyebrow">404</p>
      <h1 id="not-found-title">This page could not be found.</h1>
      <a className="text-link" href="#/">Return home <Arrow /></a>
    </section>
  );
}
