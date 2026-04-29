import { formatEntryDate } from '../../../utils/entries';
import appRegistry from '../../apps';
import ExperimentChrome from '../../experiments/ExperimentChrome';
import '../../experiments/experiment.css';

export default function ExperimentCard({ entry }) {
  const AppComponent = appRegistry[entry.slug];

  return (
    <article className="feed-card feed-card-experiment">
      <div className="experiment-card__actions">
        <div>
          <p className="feed-eyebrow">experiments/{entry.slug}</p>
          <h2 className="feed-title">{entry.title}</h2>
          <p className="feed-date">{formatEntryDate(entry.date)}</p>
        </div>
        <a href={entry.href} className="experiment-card__open-link" aria-label={`Open experiment page: ${entry.title}`}>
          Open page ↗
        </a>
      </div>
      <p className="feed-summary">{entry.summary}</p>
      {AppComponent ? (
        <ExperimentChrome
          title={`${entry.slug}.tsx`}
          lineCount="~220 LOC"
          sourceHref={entry.sourceHref}
          compact
        >
          <AppComponent />
        </ExperimentChrome>
      ) : null}
    </article>
  );
}
