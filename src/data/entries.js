import mainFeed from './mainFeed';
import work from './work';
import stack from './stack';
import { sortEntriesByDate } from '../utils/entries';
import { getCanonicalWorkSlug } from '../utils/routeSlugs';

const BLOG_AND_EXPERIMENT_DATES = {
  skills: '2026-04-25',
  'giving-my-agent-a-voice': '2026-04-24',
  'claude-design-isnt-replacing-designers': '2026-04-23',
  'image-compressor': '2026-04-22',
  sa11y: '2026-04-21',
  a11ycat: '2026-04-20',
  'figma-plugins': '2026-04-19',
};

const CASE_STUDY_DATES = {
  'iwhi-funnel-redesign': '2026-03-18',
  'offer-management': '2026-03-15',
  'experimentation-at-nib': '2026-03-12',
  'accessibility-at-nib': '2026-03-09',
  'secure-messaging': '2026-03-05',
  'stacks-design-system': '2026-03-01',
};

const STACK_DATES = {
  'magic-patterns': '2026-02-27',
  pi: '2026-02-24',
  opencode: '2026-02-21',
  claude: '2026-02-18',
  granola: '2026-02-14',
  'wispr-flow': '2026-02-10',
  figma: '2026-02-06',
};

const CASE_STUDY_METRICS = {
  'iwhi-funnel-redesign': [
    { label: 'Drop-off', value: '-18%' },
    { label: 'Mobile CVR', value: '+11%' },
    { label: 'Step completion', value: '+22%' },
    { label: 'Support contacts', value: '-14%' },
  ],
  'offer-management': [
    { label: 'Lead time', value: '2 mos → 30 min' },
    { label: 'Manual errors', value: '0' },
    { label: 'Workspace', value: 'one tool' },
    { label: 'V1 delivery', value: '3 months' },
  ],
  'experimentation-at-nib': [
    { label: 'Quote progression', value: '+14.16%' },
    { label: 'Quote Complete', value: '+6.48%' },
    { label: 'Visitors', value: '40,630' },
    { label: 'Significance', value: '>99%' },
  ],
  'accessibility-at-nib': [
    { label: 'Tickets completed', value: '45' },
    { label: 'Team findings', value: 'active items closed' },
    { label: 'Business-wide', value: '>80% addressed' },
    { label: 'a11ycats', value: '~40 members' },
  ],
};

const CASE_STUDY_META = {
  'iwhi-funnel-redesign': {
    role: 'Senior Product Designer',
    duration: '4 months',
    org: 'nib Health Insurance',
  },
  'offer-management': {
    role: 'Senior Product Designer',
    duration: '3 months to V1, ongoing',
    org: 'nib Health Insurance',
  },
  'experimentation-at-nib': {
    role: 'Senior Product Designer',
    duration: '1 month to V1, ongoing',
    org: 'nib Health Insurance',
  },
  'accessibility-at-nib': {
    role: 'Senior Product Designer',
    duration: 'Mid-2024 to present',
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
  let type = 'blog';
  if (item.slug === 'image-compressor') type = 'experiment';

  return {
    type,
    typeLabel: type === 'experiment' ? 'Experiment' : 'Note',
    slug: item.slug,
    title: item.headline,
    summary: item.body,
    date: BLOG_AND_EXPERIMENT_DATES[item.slug] || '2026-04-01',
    href: type === 'experiment' ? `#/experiments/${item.slug}` : `#/notes/${item.slug}`,
    modalContent: item.modalContent,
    sourceHref: item.slug === 'image-compressor' ? 'https://github.com/lukeylias/lukeydesign' : null,
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
    href: `#/work/${getCanonicalWorkSlug(item.slug)}`,
    modalContent: item.modalContent,
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
  };
}

const blogAndExperimentEntries = mainFeed.items.map(normaliseMainFeedItem);
const caseStudyEntries = work.items.map(normaliseWorkItem);
const stackEntries = stack.items.map(normaliseStackItem);

const entries = sortEntriesByDate([
  ...blogAndExperimentEntries,
  ...caseStudyEntries,
  ...stackEntries,
]);

export {
  entries,
  blogAndExperimentEntries,
  caseStudyEntries,
  stackEntries,
  sortEntriesByDate,
};
