import about from '../../data/about';
import { blogAndExperimentEntries } from '../../data/entries';
import ExternalLinkIcon from '../ExternalLinkIcon';
import {
  findSideProject,
  findWorkProject,
  getCaseStudySnapshot,
  getFeaturedCaseStudyContent,
  getStandardCaseStudySections,
  moreWork,
  normaliseMediaBlock,
  selectedWork,
  sideProjects,
  workAuthorshipNotes,
  workProjects,
  writing,
} from '../../data/portfolio';
import '../../styles/portfolio.css';
import { PreviewableImage } from '../ImagePreview/ImagePreview';

const writingDateBySlug = Object.fromEntries(
  blogAndExperimentEntries.map((entry) => [entry.slug, entry.date]),
);

const experiments = blogAndExperimentEntries
  .filter((entry) => entry.type === 'experiment')
  .map((entry) => ({
    ...entry,
    headline: entry.title,
  }));

function Arrow() {
  return (
    <span className="link-arrow" aria-hidden="true">
      <img src="/icons/arrow-right.svg" width="24" height="24" alt="" />
    </span>
  );
}

function ProjectImage({ media, eager = false }) {
  return (
    <PreviewableImage
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

const SHOW_REEL_PLACEHOLDER = false;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <h2>Connect</h2>
      <nav className="social-links" aria-label="Social profiles">
        <a
          className="external-link"
          href="https://github.com/lukeylias"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ExternalLinkIcon />
        </a>
        <a
          className="external-link"
          href="https://www.linkedin.com/in/lukeylias/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn <ExternalLinkIcon />
        </a>
      </nav>
    </footer>
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

const homeSideProjectDescriptions = {
  sa11y: {
    description: 'Web accessibility tool.',
  },
  a11ycat: {
    description: 'AI accessibility auditor.',
  },
  'figma-plugins': {
    description: 'Three small design tools.',
  },
};

const homeWorkDescriptions = {
  'experimentation-at-nib': 'Redefining how nib identifies, runs and measures product experiments.',
  'accessibility-at-nib': 'Building the playbook, training and community that support accessibility at nib.',
  'stacks-design-system': 'Creating a shared design system for consistent product delivery.',
};

const selectedDescriptions = {
  'iwhi-funnel-redesign': 'Redesigning the quote and join experience for international customers.',
  'offer-management': 'Bringing offer creation, audience selection and delivery into one internal tool.',
};

function EditorialItem({ href, title, description, media, eager = false }) {
  return (
    <article className={`editorial-item${media ? ' editorial-item--with-media' : ''}`}>
      {media && (
        <div className="editorial-item__media">
          <ProjectImage media={media} eager={eager} />
        </div>
      )}
      <a className="editorial-item__link" href={href}>
        <span>{title}</span>
      </a>
      <p>{description}</p>
    </article>
  );
}

function HomeNoteLink({ href, children }) {
  return (
    <a className="editorial-item__link home-note-link" href={href}>
      <span>{children}</span>
    </a>
  );
}

function EditorialColumn({ title, children }) {
  return (
    <section className="editorial-column">
      <h2>{title}</h2>
      <div className="editorial-column__items">{children}</div>
    </section>
  );
}

export function HomePage() {
  return (
    <article className="home-page">
      <header className="home-intro" aria-labelledby="home-title">
        <h1 id="home-title">Luke Ylias</h1>
        <div className="home-intro__copy">
          <p>
            <em>
              Senior Product Designer focused on experimentation, AI and product strategy. I’m also
              hands-on with code, building tools that help me take ideas further.
            </em>
          </p>
        </div>
      </header>

      {SHOW_REEL_PLACEHOLDER && <ReelPlaceholder />}

      <div className="home-index-scroll">
        <div className="home-index">
          <section className="selected-work" aria-labelledby="selected-work-title">
            <h2 id="selected-work-title">Selected case studies</h2>
            <div className="selected-work__grid">
              {selectedWork.map((project, index) => (
                <EditorialItem
                  key={project.slug}
                  href={project.href}
                  title={project.headline}
                  description={selectedDescriptions[project.slug]}
                  media={project.media}
                  eager={index === 0}
                />
              ))}
            </div>
          </section>

          <section className="editorial-index" aria-label="More work and side projects">
            <EditorialColumn title="More work">
              {moreWork.slice(0, 3).map((project) => (
                <EditorialItem
                  key={project.slug}
                  href={project.href}
                  title={project.headline}
                  description={homeWorkDescriptions[project.slug]}
                />
              ))}
            </EditorialColumn>

            <EditorialColumn title="Side projects">
              {sideProjects.map((project) => (
                <EditorialItem
                  key={project.slug}
                  href={project.href}
                  title={project.headline}
                  description={homeSideProjectDescriptions[project.slug].description}
                />
              ))}
            </EditorialColumn>
          </section>
        </div>
      </div>

      <section className="home-notes" aria-labelledby="home-notes-title">
        <h2 id="home-notes-title">Notes</h2>
        <div className="home-notes__items">
          <HomeNoteLink href={writing[0].href}>
            {writing[0].headline}. A voice-first workflow.
          </HomeNoteLink>
          <HomeNoteLink href="#/notes">All notes on design, code, and AI.</HomeNoteLink>
        </div>
      </section>

      <section className="home-about" aria-labelledby="home-about-title">
        <h2 id="home-about-title">About</h2>
        <p>
          <span className="home-about__copy">
            My work spans experimentation, product strategy and delivery, with AI and code
            as part of the day-to-day process.{' '}
          </span>
          <a href="#/about">More about me.</a>
        </p>
      </section>
    </article>
  );
}

function NoteList({ items }) {
  const datedItems = items
    .map((item) => ({
      ...item,
      date: writingDateBySlug[item.slug] || '2026-01-01',
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const groupedItems = datedItems.reduce((groups, item) => {
    const year = item.date.slice(0, 4);
    const group = groups.find((candidate) => candidate.year === year);
    if (group) {
      group.items.push(item);
    } else {
      groups.push({ year, items: [item] });
    }
    return groups;
  }, []);

  return (
    <div className="notes-index">
      {groupedItems.map((group) => (
        <section className="notes-year" key={group.year} aria-labelledby={`notes-year-${group.year}`}>
          <h2 id={`notes-year-${group.year}`} className="notes-year__label">{group.year}</h2>
          <div className="notes-year__items">
            {group.items.map((item) => {
              const [, month, day] = item.date.split('-');

              return (
                <a className="notes-row" key={item.slug} href={item.href}>
                  <span>{item.headline}</span>
                  <time dateTime={item.date}>{day}/{month}</time>
                </a>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export function NotesPage() {
  return (
    <section className="notes-page" aria-labelledby="notes-title">
      <div className="notes-page__content">
        <a className="back-link" href="#/"><Arrow /> Back</a>
        <header className="notes-page__header">
          <h1 id="notes-title">Notes</h1>
        </header>

        <NoteList items={writing} />
      </div>
    </section>
  );
}

export function SideProjectIndexPage() {
  return (
    <section className="index-page index-page--compact" aria-labelledby="side-project-index-title">
      <a className="back-link" href="#/"><Arrow /> Back</a>
      <header className="index-page__header">
        <h1 id="side-project-index-title">Side projects</h1>
        <p>I build my own tools when what I need doesn’t exist.</p>
      </header>
      <CompactLinkList items={sideProjects} />
    </section>
  );
}

export function ExperimentIndexPage() {
  return (
    <section className="index-page index-page--compact" aria-labelledby="experiment-index-title">
      <a className="back-link" href="#/"><Arrow /> Back</a>
      <header className="index-page__header">
        <h1 id="experiment-index-title">Experiments</h1>
      </header>
      <CompactLinkList items={experiments} />
    </section>
  );
}

export function AboutPage() {
  const confirmedCopy = about.content.filter((line) => !line.toLowerCase().startsWith('based in'));

  return (
    <article className="about-page" aria-labelledby="about-title">
      <a className="back-link" href="#/"><Arrow /> Back</a>
      <section className="about-intro">
        <div className="about-intro__copy">
          <h1 id="about-title">About</h1>
          <div className="about-intro__story">
            <p>I’m Luke Ylias, a {confirmedCopy[0]}.</p>
            <p>{confirmedCopy[1]}.</p>
            <p>{confirmedCopy[2]}</p>
            <p>{confirmedCopy[3]}.</p>
          </div>
        </div>
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
              <a className="external-link" href="https://github.com/lukeylias" target="_blank" rel="noreferrer">
                GitHub
                <ExternalLinkIcon />
              </a>
            </li>
            <li>
              <a className="external-link" href="https://www.linkedin.com/in/lukeylias/" target="_blank" rel="noreferrer">
                LinkedIn
                <ExternalLinkIcon />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}

function EmphasizedText({ value, phrases = [] }) {
  if (phrases.length === 0) return value;

  const matches = phrases
    .map((phrase) => ({ phrase, start: value.indexOf(phrase) }))
    .filter((match) => match.start >= 0)
    .sort((a, b) => a.start - b.start);
  const content = [];
  let cursor = 0;

  matches.forEach(({ phrase, start }) => {
    if (start < cursor) return;
    if (start > cursor) content.push(value.slice(cursor, start));
    content.push(<strong key={`${start}-${phrase}`}>{phrase}</strong>);
    cursor = start + phrase.length;
  });

  if (cursor < value.length) content.push(value.slice(cursor));
  return content;
}

function ContentBlock({ block, eager = false }) {
  const mediaBlock = normaliseMediaBlock(block);

  if (mediaBlock.type === 'text') {
    return (
      <p
        className={mediaBlock.placeholder ? 'case-placeholder' : undefined}
        data-content-needed={mediaBlock.placeholderFor || undefined}
      >
        {mediaBlock.placeholder ? <span className="case-placeholder__status">Content needed</span> : null}
        <EmphasizedText value={mediaBlock.value} phrases={mediaBlock.emphasis} />
      </p>
    );
  }
  if (mediaBlock.type === 'list') {
    return (
      <ul className="case-list">
        {mediaBlock.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  if (mediaBlock.type === 'image') {
    return (
      <figure className="case-media">
        <PreviewableImage
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
  if (mediaBlock.type === 'media-placeholder') {
    return (
      <div className="case-media-placeholder" aria-label="Suggested imagery">
        <span className="case-media-placeholder__label">Suggested imagery</span>
        <span className="case-media-placeholder__copy">{mediaBlock.value}</span>
      </div>
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
        <a className="text-link external-link" href={mediaBlock.href} target="_blank" rel="noreferrer">
          {mediaBlock.label || mediaBlock.href}
          <ExternalLinkIcon />
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

  const featuredContent = getFeaturedCaseStudyContent(project);
  const snapshot = getCaseStudySnapshot(project);
  const narrativeSections = featuredContent?.sections || getStandardCaseStudySections(project);
  const projectIndex = workProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = workProjects[(projectIndex + 1) % workProjects.length];

  return (
    <article className="case-study" aria-labelledby="case-study-title">
      <a className="back-link" href="#/"><Arrow /> Back</a>
      <header className="case-study__hero">
        <h1 id="case-study-title">{project.headline}</h1>
        <p className="case-study__summary">{project.body}</p>
        <p className="authorship-note"><em>{workAuthorshipNotes[project.slug]}</em></p>
      </header>

      <figure className="case-study__cover">
        <ProjectImage media={project.media} eager />
      </figure>

      <section
        className="project-overview project-overview--featured"
        aria-label="Project overview"
      >
        <h2>Project snapshot</h2>
        <dl>
          {snapshot.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd
                className={item.placeholder ? 'case-placeholder' : undefined}
                data-content-needed={item.placeholderFor || undefined}
              >
                {item.placeholder ? <span className="case-placeholder__status">Content needed</span> : null}
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {narrativeSections.map((section) => (
        <NarrativeSection
          key={section.title}
          title={section.title}
          blocks={section.blocks}
        />
      ))}

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
      <a className="back-link" href="#/"><Arrow /> Back</a>
      <header className="side-project__hero">
        <p className="eyebrow">Side project</p>
        <h1 id="side-project-title">{project.headline}</h1>
        <p className="side-project__summary">{project.body}</p>
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
      <a className="text-link" href="#/">Back <Arrow /></a>
    </section>
  );
}
