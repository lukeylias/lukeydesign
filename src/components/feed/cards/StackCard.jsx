import { formatEntryDate } from '../../../utils/entries';

export default function StackCard({ entry }) {
  return (
    <a href={entry.href} className="feed-card-link" aria-label={`Open stack item: ${entry.title}`}>
      <article className="feed-card feed-card-stack">
        <p className="feed-eyebrow">stack/{entry.slug}</p>
        <h2 className="feed-title">{entry.title}</h2>
        <p className="feed-date">{formatEntryDate(entry.date)}</p>
        <p className="feed-summary">{entry.summary}</p>
      </article>
    </a>
  );
}
