import './experiment.css';

export default function ExperimentChrome({
  title,
  lineCount,
  sourceHref,
  children,
  compact = false,
}) {
  return (
    <section className={`experiment-chrome ${compact ? 'experiment-chrome--compact' : ''}`} aria-label="Experiment container">
      <div className="experiment-chrome__bar">
        <div className="experiment-chrome__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="experiment-chrome__title">{title}</p>
        <p className="experiment-chrome__meta">{lineCount}</p>
      </div>

      <div className="experiment-chrome__body">{children}</div>

      <footer className="experiment-chrome__footer">
        {sourceHref ? (
          <a href={sourceHref} target="_blank" rel="noreferrer">View source ↗</a>
        ) : (
          <span>Source in repository</span>
        )}
      </footer>
    </section>
  );
}
