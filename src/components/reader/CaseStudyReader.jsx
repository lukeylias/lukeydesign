import BlogReader from './BlogReader';

function CaseStudyMeta({ entry }) {
  const metaItems = [
    { label: 'Role', value: entry.role },
    { label: 'Duration', value: entry.duration },
    { label: 'Org', value: entry.org },
  ].filter((item) => item.value);

  if (metaItems.length === 0) return null;

  return (
    <section className="case-study-meta" aria-label="Case study metadata">
      {metaItems.map((item) => (
        <div key={item.label} className="case-study-meta__item">
          <p className="case-study-meta__label">{item.label}</p>
          <p className="case-study-meta__value">{item.value}</p>
        </div>
      ))}
    </section>
  );
}

function MetricsStrip({ metrics }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="metrics-strip metrics-strip-reader" aria-label="Case study outcomes">
      {metrics.map((metric) => (
        <div key={metric.label} className="metrics-strip__item">
          <p className="metrics-strip__value">{metric.value}</p>
          <p className="metrics-strip__label">{metric.label}</p>
        </div>
      ))}
    </section>
  );
}

export default function CaseStudyReader({ entry }) {
  return (
    <>
      <CaseStudyMeta entry={entry} />
      <MetricsStrip metrics={entry.metrics} />
      <BlogReader entry={entry} />
    </>
  );
}
