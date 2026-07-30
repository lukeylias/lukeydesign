import mainFeed from './mainFeed';
import work from './work';

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

const WORK_MEDIA = {
  'iwhi-funnel-redesign': {
    src: '/images/iwhi-select-cover.webp',
    width: 2400,
    height: 1707,
    alt: 'IWHI cover selection experience',
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
    href: `#/work/${project.slug}`,
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
    href: `#/blog/${entry.slug}`,
  }));

export function findWorkProject(slug) {
  return workProjects.find((project) => project.slug === slug) || null;
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
      { type: 'text', startsWith: 'nib is one of' },
      { type: 'text', startsWith: 'The project started as' },
    ],
    problem: [
      { type: 'image', alt: 'IWHI funnel before redesign' },
      { type: 'text', startsWith: 'I dug into ContentSquare' },
    ],
    contribution: [
      { type: 'text', startsWith: 'I also jumped into the codebase' },
    ],
    decisions: [
      { type: 'text', startsWith: 'I shaped a vision' },
      { type: 'image', alt: 'IWHI select cover redesign' },
    ],
    outcomes: [
      { type: 'text', startsWith: 'Internal testing has been' },
    ],
    reflection: [],
  },
  'offer-management': {
    context: [],
    problem: [
      { type: 'text', startsWith: 'The operations team was' },
    ],
    contribution: [
      { type: 'text', startsWith: 'I designed a modern interface' },
    ],
    decisions: [
      { type: 'image', alt: 'Offers landing page' },
    ],
    outcomes: [
      { type: 'text', startsWith: 'Offer creation dropped' },
    ],
    reflection: [
      { type: 'text', startsWith: 'Using a "best, better, good"' },
    ],
  },
  'experimentation-at-nib': {
    context: [
      { type: 'text', startsWith: 'When the experimentation team' },
    ],
    problem: [
      { type: 'image', alt: 'nib experimentation' },
    ],
    contribution: [
      { type: 'text', startsWith: 'I built a lean experimentation process' },
    ],
    decisions: [
      { type: 'text', startsWith: 'One experiment stands out' },
      { type: 'image', alt: 'ContentSquare analysis' },
    ],
    outcomes: [
      { type: 'text', startsWith: 'The result was 13%' },
    ],
    reflection: [
      { type: 'text', startsWith: 'Not every experiment wins' },
      { type: 'text', startsWith: 'One shift I pushed for' },
    ],
  },
  'accessibility-at-nib': {
    context: [],
    problem: [
      { type: 'text', startsWith: 'Accessibility at nib was reactive' },
    ],
    contribution: [
      { type: 'text', startsWith: 'I built an internal Playbook' },
    ],
    decisions: [
      { type: 'image', alt: 'Speaking at nib on accessibility' },
    ],
    outcomes: [
      { type: 'text', startsWith: 'Multiple product teams now' },
    ],
    reflection: [
      { type: 'text', startsWith: 'The biggest shift wasn' },
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
          { type: 'text', startsWith: 'The project started as' },
        ],
      },
      {
        title: 'Evidence and direction',
        selectors: [
          { type: 'image', alt: 'IWHI funnel before redesign' },
          { type: 'text', startsWith: 'I dug into ContentSquare' },
        ],
      },
      {
        title: 'Key decisions',
        selectors: [
          { type: 'text', startsWith: 'I shaped a vision' },
          { type: 'text', startsWith: 'I also jumped into the codebase' },
        ],
        placeholders: [
          'Decision alternatives, constraints, trade-offs, and the effect of each choice',
        ],
      },
      {
        title: 'The shipped experience',
        selectors: [],
        placeholders: [
          'Final flow narrative and additional shipped desktop, mobile, or interaction media',
        ],
      },
      {
        title: 'Impact and evidence',
        selectors: [
          { type: 'text', startsWith: 'Internal testing has been' },
        ],
        placeholders: [
          'Verified quantitative outcomes, measurement method, timeframe, and source',
        ],
      },
      {
        title: 'Reflection',
        selectors: [],
        placeholders: [
          'What changed, what did not, and what Luke would do differently',
        ],
      },
    ],
  },
  'offer-management': {
    sections: [
      {
        title: 'Problem and stakes',
        selectors: [
          { type: 'text', startsWith: 'The operations team was' },
        ],
      },
      {
        title: 'Evidence and direction',
        selectors: [],
        placeholders: [
          'Research, operational evidence, and insights that shaped the direction',
        ],
      },
      {
        title: 'Key decisions',
        selectors: [
          { type: 'text', startsWith: 'I designed a modern interface' },
        ],
        placeholders: [
          'Decision alternatives, constraints, trade-offs, and the effect of each choice',
        ],
      },
      {
        title: 'The shipped experience',
        selectors: [],
        placeholders: [
          'Final workflow narrative and additional shipped screens or interaction media',
        ],
      },
      {
        title: 'Impact and evidence',
        selectors: [
          { type: 'text', startsWith: 'Offer creation dropped' },
        ],
        placeholders: [
          'Measurement method, timeframe, source, and qualitative evidence',
        ],
      },
      {
        title: 'Reflection',
        selectors: [
          { type: 'text', startsWith: 'Using a "best, better, good"' },
        ],
        placeholders: [
          'What Luke would change or explore next',
        ],
      },
    ],
  },
};

function matchesSectionSelector(block, selector) {
  if (!block || block.type !== selector.type) return false;
  if (selector.alt) return block.alt === selector.alt;
  if (selector.startsWith) return block.value?.startsWith(selector.startsWith);
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

export function getFeaturedCaseStudyContent(project) {
  const config = featuredCaseStudyConfigs[project.slug];
  if (!config) return null;

  const facts = getProjectFacts(project);
  const placeholderSnapshotItem = (label, placeholderFor) => ({
    label,
    value: LOREM_SHORT,
    placeholder: true,
    placeholderFor,
  });

  return {
    snapshot: [
      facts?.role && {
        label: 'Role',
        value: facts.role,
      },
      {
        label: 'Contributions',
        value: 'Design · Development · Strategy',
      },
      placeholderSnapshotItem('Worked with', 'Project disciplines and collaborators'),
      placeholderSnapshotItem('Timeframe', 'Project dates and duration'),
    ].filter(Boolean),
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
