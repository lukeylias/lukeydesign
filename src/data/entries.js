import mainFeed from './mainFeed';
import work from './work';
import stack from './stack';
import { sortEntriesByDate } from '../utils/entries';

const BLOG_DATES = {
  skills: '2026-05-12',
  'giving-my-agent-a-voice': '2026-04-28',
  'claude-design-isnt-replacing-designers': '2026-03-31',
  sa11y: '2026-03-10',
  a11ycat: '2026-02-14',
  'figma-plugins': '2025-12-22',
};

const CASE_STUDY_DATES = {
  'iwhi-funnel-redesign': '2026-01-19',
  'offer-management': '2026-04-17',
  'experimentation-at-nib': '2025-12-11',
  'accessibility-at-nib': '2026-02-26',
  'secure-messaging': '2025-02-12',
  'stacks-design-system': '2025-01-24',
};

const STACK_DATES = {
  'magic-patterns': '2026-05-04',
  pi: '2026-04-06',
  opencode: '2026-03-18',
  claude: '2026-02-02',
  granola: '2026-01-08',
  'wispr-flow': '2025-12-30',
  figma: '2025-12-03',
};

const CASE_STUDY_METRICS = {
  'iwhi-funnel-redesign': [
    { label: 'Drop-off', value: '-18%' },
    { label: 'Mobile CVR', value: '+11%' },
    { label: 'Step completion', value: '+22%' },
    { label: 'Support contacts', value: '-14%' },
  ],
  'offer-management': [
    { label: 'Create time', value: 'weeks → mins' },
    { label: 'Error rate', value: '~0%' },
    { label: 'Ops effort', value: '-2 months/yr' },
    { label: 'Campaign lead', value: '+faster' },
  ],
};

const CASE_STUDY_META = {
  'iwhi-funnel-redesign': {
    role: 'Senior Product Designer',
    duration: '2023–Present',
    org: 'nib Health Insurance',
  },
  'offer-management': {
    role: 'Senior Product Designer',
    duration: '2023–Present',
    org: 'nib Health Insurance',
  },
  'experimentation-at-nib': {
    role: 'Senior Product Designer',
    duration: '2023–Present',
    org: 'nib Health Insurance',
  },
  'accessibility-at-nib': {
    role: 'Senior Product Designer',
    duration: '2023–Present',
    org: 'nib Health Insurance',
  },
  'secure-messaging': {
    role: 'UX Designer',
    duration: '2019–2023',
    org: 'Greater Bank',
  },
  'stacks-design-system': {
    role: 'UX Designer',
    duration: '2019–2023',
    org: 'Greater Bank',
  },
};

function normaliseMainFeedItem(item) {
  const type = 'blog';

  return {
    type,
    typeLabel: 'Blog',
    slug: item.slug,
    title: item.headline,
    summary: item.body,
    date: BLOG_DATES[item.slug] || '2026-04-01',
    href: `#/blog/${item.slug}`,
    modalContent: item.modalContent,
    headerMedia: item.headerMedia || null,
    sourceHref: null,
  };
}

function normaliseWorkItem(item) {
  return {
    type: 'case-studies',
    typeLabel: 'Case Study',
    slug: item.slug,
    title: item.headline,
    summary: item.body,
    date: CASE_STUDY_DATES[item.slug] || '2026-03-01',
    href: `#/case-studies/${item.slug}`,
    modalContent: item.modalContent,
    headerMedia: item.headerMedia || null,
    metrics: CASE_STUDY_METRICS[item.slug] || null,
    role: CASE_STUDY_META[item.slug]?.role || null,
    duration: CASE_STUDY_META[item.slug]?.duration || null,
    org: CASE_STUDY_META[item.slug]?.org || null,
  };
}

function normaliseStackItem(item) {
  return {
    type: 'stack',
    typeLabel: 'Stack',
    slug: item.slug,
    title: item.headline,
    summary: item.body,
    date: STACK_DATES[item.slug] || '2026-02-01',
    href: `#/stack/${item.slug}`,
    modalContent: item.modalContent,
    headerMedia: item.headerMedia || null,
  };
}

const blogEntries = mainFeed.items.map(normaliseMainFeedItem);
const caseStudyEntries = work.items.map(normaliseWorkItem);
const stackEntries = stack.items.map(normaliseStackItem);

const entries = sortEntriesByDate([
  ...blogEntries,
  ...caseStudyEntries,
  ...stackEntries,
]);

export {
  entries,
  blogEntries,
  caseStudyEntries,
  stackEntries,
  sortEntriesByDate,
};
