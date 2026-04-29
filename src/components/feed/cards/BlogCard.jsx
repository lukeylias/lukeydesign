import { formatEntryDate } from '../../../utils/entries';

export default function BlogCard({ entry }) {
  return (
    <a href={entry.href} className="feed-card-link" aria-label={`Read blog: ${entry.title}`}>
      <article className="feed-card feed-card-blog">
        <p className="feed-eyebrow">blog/{entry.slug}</p>
        <h2 className="feed-title">{entry.title}</h2>
        <p className="feed-date">{formatEntryDate(entry.date)}</p>
        <p className="feed-summary">{entry.summary}</p>
      </article>
    </a>
  );
}
