import appRegistry from '../apps';
import ExperimentChrome from '../experiments/ExperimentChrome';
import '../experiments/experiment.css';

export default function ExperimentView({ route }) {
  const AppComponent = appRegistry[route.slug];

  if (!AppComponent) {
    return (
      <section aria-label="Experiment" className="reader-shell">
        <header className="view-header">
          <h1>Experiment not found</h1>
        </header>
        <p className="reader-not-found">The experiment is unavailable.</p>
        <p>
          <a href="#/">Back to feed</a>
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Experiment" className="reader-shell experiment-view">
      <a href="#/" className="experiment-view__back">← Back to feed</a>
      <header className="view-header">
        <h1>{route.entry.title}</h1>
      </header>
      <p className="experiment-view__summary">{route.entry.summary}</p>
      <ExperimentChrome
        title={`${route.slug}.tsx`}
        lineCount="~220 LOC"
        sourceHref={route.entry.sourceHref}
      >
        <AppComponent />
      </ExperimentChrome>
    </section>
  );
}
