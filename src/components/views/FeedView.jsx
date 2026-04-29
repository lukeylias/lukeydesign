import { entries } from '../../data';
import { matchesFeedFilter } from '../../utils/entries';
import FeedList from '../feed/FeedList';
import '../feed/feed.css';

function headingFor(filter) {
  if (filter === 'blog') return 'Blog';
  if (filter === 'case-studies') return 'Case Studies';
  if (filter === 'experiment') return 'Experiments';
  return 'Feed';
}

export default function FeedView({ filter }) {
  const visibleEntries = entries.filter((entry) => matchesFeedFilter(entry, filter));

  return (
    <section aria-label="Feed" className="feed-view">
      <header className="view-header">
        <h1>{headingFor(filter)}</h1>
      </header>
      {visibleEntries.length > 0 ? (
        <FeedList entries={visibleEntries} />
      ) : (
        <p className="feed-empty">No entries available for this filter.</p>
      )}
    </section>
  );
}
