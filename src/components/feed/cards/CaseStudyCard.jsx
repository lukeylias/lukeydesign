import { formatEntryDate } from '../../../utils/entries';

function MetricsStrip({ metrics }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="metrics-strip" aria-label="Case study outcomes">
      {metrics.map((metric) => (
        <div key={metric.label} className="metrics-strip__item">
          <p className="metrics-strip__value">{metric.value}</p>
          <p className="metrics-strip__label">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function CaseStudyCard({ entry }) {
  return (
    <a href={entry.href} className="feed-card-link" aria-label={`Read case study: ${entry.title}`}>
      <article className="feed-card feed-card-case-study">
        <p className="feed-eyebrow">case-studies/{entry.slug}</p>
        <h2 className="feed-title">{entry.title}</h2>
        <p className="feed-date">{formatEntryDate(entry.date)}</p>
        <p className="feed-summary">{entry.summary}</p>
        <MetricsStrip metrics={entry.metrics} />
      </article>
    </a>
  );
}
