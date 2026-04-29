import BlogCard from './cards/BlogCard';
import CaseStudyCard from './cards/CaseStudyCard';
import ExperimentCard from './cards/ExperimentCard';
import StackCard from './cards/StackCard';

function cardForEntry(entry) {
  if (entry.type === 'blog') return <BlogCard entry={entry} />;
  if (entry.type === 'case-studies') return <CaseStudyCard entry={entry} />;
  if (entry.type === 'experiment') return <ExperimentCard entry={entry} />;
  if (entry.type === 'stack') return <StackCard entry={entry} />;
  return null;
}

export default function FeedList({ entries }) {
  return (
    <ul className="feed-list" aria-label="Entries">
      {entries.map((entry) => (
        <li key={`${entry.type}-${entry.slug}`} className={`feed-item feed-item-${entry.type}`}>
          {cardForEntry(entry)}
        </li>
      ))}
    </ul>
  );
}
