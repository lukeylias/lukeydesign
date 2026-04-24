import about from './about';
import mainFeed from './mainFeed';
import work from './work';
import stack from './stack';

const sections = [about, mainFeed, work, stack];

export default sections;

export function findItem(sectionId, slug) {
  const section = sections.find((s) => s.id === sectionId);
  if (!section || !section.items) return null;
  const item = section.items.find((i) => i.slug === slug);
  return item ? { section, item } : null;
}
