import mainFeed from './mainFeed';
import work from './work';
import { getCanonicalWorkSlug, getInternalWorkSlug } from '../utils/routeSlugs';

const WORK_ORDER = [
  'iwhi-funnel-redesign',
  'offer-management',
  'experimentation-at-nib',
  'accessibility-at-nib',
  'stacks-design-system',
  'secure-messaging',
];

const SIDE_PROJECT_ORDER = [
  'sa11y',
  'a11ycat',
  'figma-plugins',
];

const WRITING_ORDER = [
  'giving-my-agent-a-voice',
  'claude-design-isnt-replacing-designers',
  'skills',
];

export const workAuthorshipNotes = {
  'iwhi-funnel-redesign': 'This case study was written by hand, in my own words.',
  'offer-management': 'Written by hand from my direct experience of the project.',
  'experimentation-at-nib': 'I wrote this case study by hand from the work behind it.',
  'accessibility-at-nib': 'Written by hand, based on my experience leading this work.',
  'stacks-design-system': 'This account was written by hand from my own project experience.',
  'secure-messaging': 'I wrote this case study by hand, drawing on my direct involvement.',
};

export const writingAuthorshipNotes = {
  'giving-my-agent-a-voice': 'This note was written by hand, in my own words.',
  'claude-design-isnt-replacing-designers': 'Written by hand from my own perspective and experience.',
  skills: 'I wrote this note by hand, in my own words.',
};

const WORK_MEDIA = {
  'iwhi-funnel-redesign': {
    src: '/images/iwhi-select-cover.webp',
    width: 2400,
    height: 1707,
    alt: 'International funnel cover selection experience',
  },
  'offer-management': {
    src: '/images/Offers-Landing-Page.webp',
    width: 2400,
    height: 1660,
    alt: 'Offer management landing page',
  },
  'experimentation-at-nib': {
    src: '/images/nib-exp.webp',
    width: 2400,
    height: 1350,
    alt: 'nib experimentation work',
  },
  'accessibility-at-nib': {
    src: '/images/meatnib.webp',
    width: 2048,
    height: 1365,
    alt: 'Luke speaking about accessibility at nib',
  },
  'stacks-design-system': {
    src: '/images/gb-design-system.webp',
    width: 2400,
    height: 1500,
    alt: 'Greater Bank design system',
  },
  'secure-messaging': {
    src: '/images/messaging.webp',
    width: 2400,
    height: 1500,
    alt: 'Secure messaging product design',
  },
};

const imageDimensions = {
  '/images/iwhi-before.webp': { width: 2400, height: 1500 },
  '/images/iwhi-select-cover.webp': { width: 2400, height: 1707 },
  '/images/Offers-Landing-Page.webp': { width: 2400, height: 1660 },
  '/images/nib-exp.webp': { width: 2400, height: 1350 },
  '/images/contentsquare.webp': { width: 2400, height: 1800 },
  '/images/meatnib.webp': { width: 2048, height: 1365 },
  '/images/gb-frontline.webp': { width: 1800, height: 2400 },
  '/images/messaging.webp': { width: 2400, height: 1500 },
  '/images/figma-slide.webp': { width: 2400, height: 1500 },
  '/images/gb-design-system.webp': { width: 2400, height: 1500 },
  '/images/gb-ui-kit.webp': { width: 2400, height: 1500 },
  '/images/CleanShot_2025-12-17_at_10.26.46_2x-9ef7e969-729e-40b3-ac74-5883bfd8c85f.png': {
    width: 2048,
    height: 1277,
  },
};

const imageAliases = {
  '/images/iwhi-before.jpg': '/images/iwhi-before.webp',
  '/images/iwhi-select-cover.jpg': '/images/iwhi-select-cover.webp',
  '/images/Offers-Landing-Page.jpg': '/images/Offers-Landing-Page.webp',
  '/images/nib-exp.jpg': '/images/nib-exp.webp',
  '/images/contentsquare.jpg': '/images/contentsquare.webp',
  '/images/meatnib.jpeg': '/images/meatnib.webp',
  '/images/gb-frontline.jpg': '/images/gb-frontline.webp',
  '/images/messaging.jpg': '/images/messaging.webp',
  '/images/figma-slide.jpg': '/images/figma-slide.webp',
  '/images/gb-design-system.jpg': '/images/gb-design-system.webp',
  '/images/gb-ui-kit.jpg': '/images/gb-ui-kit.webp',
};

function findBySlug(items, slug) {
  return items.find((item) => item.slug === slug) || null;
}

export const workProjects = WORK_ORDER
  .map((slug) => findBySlug(work.items, slug))
  .filter(Boolean)
  .map((project) => ({
    ...project,
    routeSlug: getCanonicalWorkSlug(project.slug),
    href: `#/work/${getCanonicalWorkSlug(project.slug)}`,
    media: WORK_MEDIA[project.slug],
    selectedLabel: getProjectFacts(project)?.organisation || null,
  }));

export const selectedWork = workProjects.slice(0, 2);
export const moreWork = workProjects.slice(2);

export const sideProjects = SIDE_PROJECT_ORDER
  .map((slug) => findBySlug(mainFeed.items, slug))
  .filter(Boolean)
  .map((project) => ({
    ...project,
    href: `#/side-projects/${project.slug}`,
  }));

export const writing = WRITING_ORDER
  .map((slug) => findBySlug(mainFeed.items, slug))
  .filter(Boolean)
  .map((entry) => ({
    ...entry,
    href: `#/notes/${entry.slug}`,
  }));

export function findWorkProject(slug) {
  const internalSlug = getInternalWorkSlug(slug);
  return workProjects.find((project) => project.slug === internalSlug) || null;
}

export function findSideProject(slug) {
  return sideProjects.find((project) => project.slug === slug) || null;
}

export function normaliseMediaBlock(block) {
  if (block.type !== 'image') return block;
  const src = imageAliases[block.src] || block.src;
  return {
    ...block,
    src,
    ...(imageDimensions[src] || {}),
  };
}

export function getProjectFacts(project) {
  const firstBlock = project.modalContent?.[0];
  if (firstBlock?.type !== 'text' || !firstBlock.value.includes(' - ')) return null;
  const [organisation, roleAndDates] = firstBlock.value.split(' - ');
  const splitAt = roleAndDates.lastIndexOf(', ');
  if (splitAt === -1) return { organisation, role: roleAndDates, dates: null };
  return {
    organisation,
    role: roleAndDates.slice(0, splitAt),
    dates: roleAndDates.slice(splitAt + 2),
  };
}

const caseStudySectionSelectors = {
  'iwhi-funnel-redesign': {
    context: [
      { type: 'text', startsWith: 'The International Workers Health Insurance funnel' },
      { type: 'text', startsWith: 'The funnel also assumed people were ready to join' },
    ],
    problem: [
      { type: 'image', alt: 'International funnel before-and-after comparison' },
      { type: 'text', startsWith: 'I reviewed Contentsquare data' },
      { type: 'text', startsWith: 'The evidence pointed to two priorities' },
    ],
    contribution: [
      { type: 'text', startsWith: 'I owned the end-to-end experience' },
      { type: 'text', startsWith: 'To keep the implementation consistent' },
    ],
    decisions: [
      { type: 'text', startsWith: 'We separated quoting from joining' },
      { type: 'media-placeholder', startsWith: 'Journey diagram' },
      { type: 'image', alt: 'International funnel cover selection redesign' },
    ],
    shipped: [
      { type: 'media-placeholder', startsWith: 'Mobile screen sequence' },
      { type: 'text', startsWith: 'The final experience creates' },
      { type: 'text', startsWith: 'Quoting and joining are separated' },
    ],
    outcomes: [
      { type: 'text', startsWith: 'Following its January launch' },
    ],
    reflection: [
      { type: 'text', startsWith: 'The hardest part was accounting' },
      { type: 'text', startsWith: 'I would involve developers and technical product specialists' },
    ],
  },
  'offer-management': {
    context: [],
    problem: [
      { type: 'text', startsWith: 'The offer team relied on Excel sheets' },
      { type: 'text', startsWith: 'From initial idea to a live customer offer' },
    ],
    contribution: [
      { type: 'text', startsWith: 'I owned the research' },
    ],
    decisions: [
      { type: 'text', startsWith: 'Rather than digitising each existing step' },
      { type: 'text', startsWith: 'The largest change was bringing audience selection' },
      { type: 'media-placeholder', startsWith: 'Early concept or target-state system design' },
    ],
    shipped: [
      { type: 'text', startsWith: 'The initial V1 launched internally' },
      { type: 'text', startsWith: 'The release removed most of the manual handoffs' },
      { type: 'media-placeholder', startsWith: 'Final screen sequence' },
    ],
    outcomes: [
      { type: 'text', startsWith: 'The core workflow now takes around 30 minutes' },
      { type: 'text', startsWith: 'Marketing and offer teams spend less time' },
    ],
    reflection: [
      { type: 'text', startsWith: 'The main learning was that mapping the visible steps' },
      { type: 'text', startsWith: 'Recurring sessions helped us uncover those details' },
    ],
  },
  'experimentation-at-nib': {
    context: [
      { type: 'text', startsWith: 'At the end of 2025' },
      { type: 'text', startsWith: 'Before the handover' },
    ],
    problem: [
      { type: 'text', startsWith: 'I reviewed three years of qualitative research' },
      { type: 'text', startsWith: 'The work identified four focus areas' },
      { type: 'list', startsWith: 'Starting the quote feels like too much commitment' },
      { type: 'text', startsWith: 'Organising experiments around these problems' },
      { type: 'media-placeholder', startsWith: 'Visual summary of the four problem areas' },
    ],
    contribution: [
      { type: 'text', startsWith: 'I initially ran experiments end to end' },
    ],
    decisions: [
      { type: 'text', startsWith: 'The previous cadence assumed only one experiment' },
      { type: 'text', startsWith: 'I introduced parallel and overlapping experiments' },
      { type: 'text', startsWith: 'Each experiment is tied to a problem area' },
      { type: 'text', startsWith: 'I also reset how success was measured' },
    ],
    shipped: [
      { type: 'text', startsWith: 'One larger experiment addressed' },
      { type: 'image', alt: 'Contentsquare analysis of the quote welcome form' },
      { type: 'text', startsWith: 'The control presented seven fields' },
      { type: 'text', startsWith: 'A simple first question also routed international visitors' },
      { type: 'media-placeholder', startsWith: 'Control and treatment screens' },
    ],
    outcomes: [
      { type: 'text', startsWith: 'The experiment ran from 14 May' },
      { type: 'text', startsWith: 'Quote Complete increased by 6.48%' },
      { type: 'text', startsWith: 'The program now supports parallel and overlapping experiments' },
      { type: 'media-placeholder', startsWith: 'Redacted Optimizely result' },
    ],
    reflection: [
      { type: 'text', startsWith: 'The hardest part was aligning teams' },
      { type: 'text', startsWith: 'The remaining challenge is helping more people' },
    ],
  },
  'accessibility-at-nib': {
    context: [
      { type: 'text', startsWith: 'I began this work in mid-2024' },
      { type: 'text', startsWith: 'Accessibility was handled reactively' },
      { type: 'text', startsWith: 'I led the work independently at first' },
    ],
    problem: [
      { type: 'text', startsWith: 'The first deliverable was a single-page guide' },
      { type: 'text', startsWith: 'I created a11ycats at the same time' },
      { type: 'text', startsWith: 'An external accessibility agency then completed' },
      { type: 'text', startsWith: 'After the audit, I expanded the initial guidance' },
      { type: 'list', startsWith: 'Identify common accessibility issues' },
    ],
    contribution: [
      { type: 'text', startsWith: 'The website included videos and practical examples' },
      { type: 'text', startsWith: 'I then presented to around six product teams' },
      { type: 'text', startsWith: 'The hands-on format gave teams direct experience' },
    ],
    decisions: [
      { type: 'text', startsWith: 'Accessibility checks began appearing in delivery workflows' },
    ],
    outcomes: [
      { type: 'text', startsWith: 'My product team completed 45 accessibility tickets' },
      { type: 'text', startsWith: 'The guidance, playbook and hands-on sessions' },
      { type: 'text', startsWith: 'I joined a panel for International Accessibility Day' },
      { type: 'text', startsWith: 'I also contributed to early concepts' },
    ],
    reflection: [
      { type: 'text', startsWith: 'The hardest part was making the work sustainable' },
      { type: 'text', startsWith: 'If I approached it again' },
    ],
  },
  'stacks-design-system': {
    context: [
      { type: 'text', startsWith: 'Greater Bank is a customer-owned' },
    ],
    problem: [
      { type: 'text', startsWith: 'When I joined Greater Bank' },
    ],
    contribution: [
      { type: 'text', startsWith: 'The design system grew alongside this' },
    ],
    decisions: [
      { type: 'image', alt: 'Figma migration presentation' },
      { type: 'text', startsWith: 'I evaluated tools and landed on Supernova' },
      { type: 'image', alt: 'Greater Bank design system' },
    ],
    outcomes: [
      { type: 'text', startsWith: 'The V1 included foundational styles' },
      { type: 'image', alt: 'Greater Bank UI kit' },
    ],
    reflection: [],
  },
  'secure-messaging': {
    context: [
      { type: 'text', startsWith: 'Greater Bank is a customer-owned' },
      { type: 'text', startsWith: 'When COVID hit' },
    ],
    problem: [
      { type: 'image', alt: 'Greater Bank frontline research' },
    ],
    contribution: [
      { type: 'text', startsWith: 'I was the sole designer' },
    ],
    decisions: [
      { type: 'text', startsWith: 'The biggest constraint was technical' },
      { type: 'image', alt: 'Secure messaging design' },
    ],
    outcomes: [
      { type: 'text', startsWith: '"I would change banks for this"' },
    ],
    reflection: [],
  },
};

const LOREM_SHORT = 'Lorem ipsum dolor sit amet.';
const LOREM_PARAGRAPH = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const featuredCaseStudyConfigs = {
  'iwhi-funnel-redesign': {
    sections: [
      {
        title: 'Problem and stakes',
        selectors: [
          { type: 'text', startsWith: 'The International Workers Health Insurance funnel' },
          { type: 'text', startsWith: 'The funnel also assumed people were ready to join' },
        ],
      },
      {
        title: 'Evidence and direction',
        selectors: [
          { type: 'image', alt: 'International funnel before-and-after comparison' },
          { type: 'text', startsWith: 'I reviewed Contentsquare data' },
          { type: 'text', startsWith: 'The evidence pointed to two priorities' },
        ],
      },
      {
        title: 'Key decisions',
        selectors: [
          { type: 'text', startsWith: 'I owned the end-to-end experience' },
          { type: 'text', startsWith: 'We separated quoting from joining' },
          { type: 'media-placeholder', startsWith: 'Journey diagram' },
          { type: 'text', startsWith: 'To keep the implementation consistent' },
        ],
      },
      {
        title: 'The shipped experience',
        selectors: [
          { type: 'media-placeholder', startsWith: 'Mobile screen sequence' },
          { type: 'text', startsWith: 'The final experience creates' },
          { type: 'text', startsWith: 'Quoting and joining are separated' },
        ],
      },
      {
        title: 'Impact and evidence',
        selectors: [
          { type: 'text', startsWith: 'Following its January launch' },
        ],
      },
      {
        title: 'Reflection',
        selectors: [
          { type: 'text', startsWith: 'The hardest part was accounting' },
          { type: 'text', startsWith: 'I would involve developers and technical product specialists' },
        ],
      },
    ],
  },
  'offer-management': {
    sections: [
      {
        title: 'Problem and stakes',
        selectors: [
          { type: 'text', startsWith: 'The offer team relied on Excel sheets' },
          { type: 'text', startsWith: 'From initial idea to a live customer offer' },
        ],
      },
      {
        title: 'Evidence and direction',
        selectors: [
          { type: 'text', startsWith: 'We started with working sessions' },
          { type: 'text', startsWith: 'We set up recurring sessions' },
          { type: 'media-placeholder', startsWith: 'Current-state Miro workflow' },
        ],
      },
      {
        title: 'Key decisions',
        selectors: [
          { type: 'text', startsWith: 'I owned the research' },
          { type: 'text', startsWith: 'Rather than digitising each existing step' },
          { type: 'text', startsWith: 'The largest change was bringing audience selection' },
          { type: 'media-placeholder', startsWith: 'Early concept or target-state system design' },
        ],
      },
      {
        title: 'The shipped experience',
        selectors: [
          { type: 'text', startsWith: 'The initial V1 launched internally' },
          { type: 'text', startsWith: 'The release removed most of the manual handoffs' },
          { type: 'media-placeholder', startsWith: 'Final screen sequence' },
        ],
      },
      {
        title: 'Impact and evidence',
        selectors: [
          { type: 'text', startsWith: 'The core workflow now takes around 30 minutes' },
          { type: 'text', startsWith: 'Marketing and offer teams spend less time' },
        ],
      },
      {
        title: 'Reflection',
        selectors: [
          { type: 'text', startsWith: 'The main learning was that mapping the visible steps' },
          { type: 'text', startsWith: 'Recurring sessions helped us uncover those details' },
        ],
      },
    ],
  },
  'experimentation-at-nib': {
    sections: [
      {
        title: 'Context and mandate',
        selectors: [
          { type: 'text', startsWith: 'At the end of 2025' },
          { type: 'text', startsWith: 'Before the handover' },
        ],
      },
      {
        title: 'Evidence and focus areas',
        selectors: [
          { type: 'text', startsWith: 'I reviewed three years of qualitative research' },
          { type: 'text', startsWith: 'The work identified four focus areas' },
          { type: 'list', startsWith: 'Starting the quote feels like too much commitment' },
          { type: 'text', startsWith: 'Organising experiments around these problems' },
          { type: 'media-placeholder', startsWith: 'Visual summary of the four problem areas' },
        ],
      },
      {
        title: 'Building the operating model',
        selectors: [
          { type: 'text', startsWith: 'The previous cadence assumed only one experiment' },
          { type: 'text', startsWith: 'I introduced parallel and overlapping experiments' },
          { type: 'text', startsWith: 'Each experiment is tied to a problem area' },
          { type: 'text', startsWith: 'I also reset how success was measured' },
          { type: 'text', startsWith: 'I initially ran experiments end to end' },
        ],
      },
      {
        title: 'A representative experiment',
        selectors: [
          { type: 'text', startsWith: 'One larger experiment addressed' },
          { type: 'image', alt: 'Contentsquare analysis of the quote welcome form' },
          { type: 'text', startsWith: 'The control presented seven fields' },
          { type: 'text', startsWith: 'A simple first question also routed international visitors' },
          { type: 'media-placeholder', startsWith: 'Control and treatment screens' },
        ],
      },
      {
        title: 'Impact and evidence',
        selectors: [
          { type: 'text', startsWith: 'The experiment ran from 14 May' },
          { type: 'text', startsWith: 'Quote Complete increased by 6.48%' },
          { type: 'text', startsWith: 'The program now supports parallel and overlapping experiments' },
          { type: 'media-placeholder', startsWith: 'Redacted Optimizely result' },
        ],
      },
      {
        title: 'Reflection',
        selectors: [
          { type: 'text', startsWith: 'The hardest part was aligning teams' },
          { type: 'text', startsWith: 'The remaining challenge is helping more people' },
        ],
      },
    ],
  },
  'accessibility-at-nib': {
    sections: [
      {
        title: 'Context and impetus',
        selectors: [
          { type: 'text', startsWith: 'I began this work in mid-2024' },
          { type: 'text', startsWith: 'Accessibility was handled reactively' },
          { type: 'text', startsWith: 'I led the work independently at first' },
        ],
      },
      {
        title: 'Starting with practical guidance',
        selectors: [
          { type: 'text', startsWith: 'The first deliverable was a single-page guide' },
          { type: 'text', startsWith: 'I created a11ycats at the same time' },
          { type: 'media-placeholder', startsWith: 'Original single-page guide' },
        ],
      },
      {
        title: 'Establishing the remediation baseline',
        selectors: [
          { type: 'text', startsWith: 'An external accessibility agency then completed' },
          { type: 'media-placeholder', startsWith: 'Redacted audit summary' },
        ],
      },
      {
        title: 'Developing the interactive playbook',
        selectors: [
          { type: 'text', startsWith: 'After the audit, I expanded the initial guidance' },
          { type: 'list', startsWith: 'Identify common accessibility issues' },
          { type: 'text', startsWith: 'The website included videos and practical examples' },
          { type: 'media-placeholder', startsWith: 'Interactive playbook pages' },
        ],
      },
      {
        title: 'Building participation',
        selectors: [
          { type: 'text', startsWith: 'I then presented to around six product teams' },
          { type: 'text', startsWith: 'The hands-on format gave teams direct experience' },
          { type: 'media-placeholder', startsWith: 'Roadshow deck' },
        ],
      },
      {
        title: 'Impact and visibility',
        selectors: [
          { type: 'text', startsWith: 'My product team completed 45 accessibility tickets' },
          { type: 'text', startsWith: 'The guidance, playbook and hands-on sessions' },
          { type: 'text', startsWith: 'Accessibility checks began appearing in delivery workflows' },
          { type: 'text', startsWith: 'I joined a panel for International Accessibility Day' },
          { type: 'text', startsWith: 'I also contributed to early concepts' },
        ],
      },
      {
        title: 'Reflection',
        selectors: [
          { type: 'text', startsWith: 'The hardest part was making the work sustainable' },
          { type: 'text', startsWith: 'If I approached it again' },
        ],
      },
    ],
  },
};

function matchesSectionSelector(block, selector) {
  if (!block || block.type !== selector.type) return false;
  if (selector.alt) return block.alt === selector.alt;
  if (selector.startsWith) {
    if (typeof block.value === 'string') return block.value.startsWith(selector.startsWith);
    if (Array.isArray(block.items)) return block.items[0]?.startsWith(selector.startsWith);
  }
  return false;
}

export function getCaseStudySections(project) {
  const selectors = caseStudySectionSelectors[project.slug];
  if (!selectors) return null;

  return Object.fromEntries(
    Object.entries(selectors).map(([key, sectionSelectors]) => [
      key,
      sectionSelectors
        .map((selector) => project.modalContent.find((block) => matchesSectionSelector(block, selector)))
        .filter(Boolean)
        .map(normaliseMediaBlock),
    ]),
  );
}

function placeholderSnapshotItem(label, placeholderFor) {
  return {
    label,
    value: LOREM_SHORT,
    placeholder: true,
    placeholderFor,
  };
}

export function getCaseStudySnapshot(project) {
  const facts = getProjectFacts(project);

  return [
    facts?.role
      ? { label: 'Role', value: facts.role }
      : placeholderSnapshotItem('Role', 'Confirmed role for this project'),
    project.contributions
      ? { label: 'Contributions', value: project.contributions }
      : placeholderSnapshotItem('Contributions', 'Concise list of Luke’s contributions'),
    project.workedWith
      ? { label: 'Worked with', value: project.workedWith }
      : placeholderSnapshotItem('Worked with', 'Project disciplines and collaborators'),
    project.timeframe
      ? { label: 'Timeframe', value: project.timeframe }
      : placeholderSnapshotItem('Timeframe', 'Project dates and duration'),
  ];
}

function placeholderBlock(placeholderFor) {
  return {
    type: 'text',
    value: LOREM_PARAGRAPH,
    placeholder: true,
    placeholderFor,
  };
}

export function getStandardCaseStudySections(project) {
  const sections = getCaseStudySections(project) || {};
  const blocksOrPlaceholder = (blocks, placeholderFor) => (
    blocks?.length ? blocks : [placeholderBlock(placeholderFor)]
  );

  return [
    {
      title: 'Context and problem',
      blocks: blocksOrPlaceholder(
        [...(sections.context || []), ...(sections.problem || [])],
        'Context, problem, and stakes for this project',
      ),
    },
    {
      title: 'Contributions',
      blocks: blocksOrPlaceholder(
        sections.contribution,
        'A clear account of Luke’s contributions',
      ),
    },
    {
      title: 'Key decisions',
      blocks: blocksOrPlaceholder(
        sections.decisions,
        'Decision alternatives, constraints, trade-offs, and their effects',
      ),
    },
    {
      title: 'The shipped experience',
      blocks: [placeholderBlock('Final shipped experience narrative and supporting media')],
    },
    {
      title: 'Impact and evidence',
      blocks: blocksOrPlaceholder(
        sections.outcomes,
        'Verified outcomes, measurement method, timeframe, and source',
      ),
    },
    {
      title: 'Reflection',
      blocks: blocksOrPlaceholder(
        sections.reflection,
        'What changed, what did not, and what Luke would do differently',
      ),
    },
  ];
}

export function getFeaturedCaseStudyContent(project) {
  const config = featuredCaseStudyConfigs[project.slug];
  if (!config) return null;

  return {
    snapshot: getCaseStudySnapshot(project),
    sections: config.sections.map((section) => ({
      title: section.title,
      blocks: [
        ...section.selectors
          .map((selector) => project.modalContent.find((block) => matchesSectionSelector(block, selector)))
          .filter(Boolean)
          .map(normaliseMediaBlock),
        ...(section.placeholders || []).map((placeholderFor) => ({
          type: 'text',
          value: LOREM_PARAGRAPH,
          placeholder: true,
          placeholderFor,
        })),
      ],
    })),
  };
}
