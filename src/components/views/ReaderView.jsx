import { useMemo } from 'react';
import BlogReader from '../reader/BlogReader';
import CaseStudyReader from '../reader/CaseStudyReader';
import StackReader from '../reader/StackReader';
import { getCanonicalRouteForEntryType, navigateBackOrFallback } from '../../utils/navigation';
import '../reader/reader.css';

function ReaderBody({ route }) {
  if (route.entryType === 'blog') return <BlogReader entry={route.entry} />;
  if (route.entryType === 'case-studies') return <CaseStudyReader entry={route.entry} />;
  if (route.entryType === 'stack') return <StackReader entry={route.entry} />;
  return null;
}

export default function ReaderView({ route }) {
  const fallbackHref = useMemo(() => getCanonicalRouteForEntryType(route.entryType), [route.entryType]);

  function onBackClick(event) {
    event.preventDefault();
    const hasInAppHistory = window.history.state?.piInApp === true;
    navigateBackOrFallback({ hasInAppHistory, fallbackHref });
  }

  return (
    <section aria-label="Reader" className="reader-shell">
      <a href={fallbackHref} className="reader-back" onClick={onBackClick}>
        ← Back
      </a>
      <header className="view-header">
        <h1>{route.entry.title}</h1>
      </header>
      <p className="reader-meta">{route.entry.typeLabel}</p>
      <p className="reader-summary">{route.entry.summary}</p>
      <ReaderBody route={route} />
    </section>
  );
}
