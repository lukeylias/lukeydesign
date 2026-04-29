import about from './about';
import mainFeed from './mainFeed';
import work from './work';
import stack from './stack';
import {
  entries,
  blogAndExperimentEntries,
  caseStudyEntries,
  stackEntries,
} from './entries';

const sections = [about, mainFeed, work, stack];

export default sections;

export { about, mainFeed, work, stack };
export {
  entries,
  blogAndExperimentEntries,
  caseStudyEntries,
  stackEntries,
};

export function findEntryByTypeAndSlug(type, slug) {
  return entries.find((entry) => entry.type === type && entry.slug === slug) || null;
}
