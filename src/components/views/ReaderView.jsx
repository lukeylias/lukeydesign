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
    <article className="reader-shell" aria-labelledby="reader-title">
      <a href={fallbackHref} className="reader-back" onClick={onBackClick}>
        <span className="reader-back__icon" aria-hidden="true">
          <img src="/icons/arrow-right.svg" width="20" height="20" alt="" />
        </span>
        Notes
      </a>
      <header className="reader-header">
        <h1 id="reader-title">{route.entry.title}</h1>
        <p className="reader-summary">{route.entry.summary}</p>
      </header>
      <ReaderBody route={route} />
    </article>
  );
}
