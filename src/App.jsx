import Rail from './components/Rail/Rail';
import FeedView from './components/views/FeedView';
import AboutView from './components/views/AboutView';
import StackView from './components/views/StackView';
import ReaderView from './components/views/ReaderView';
import ExperimentView from './components/views/ExperimentView';
import NotFoundView from './components/views/NotFoundView';
import useHashRouter from './hooks/useHashRouter';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/layout.css';

function renderView(route) {
  if (route.type === 'feed') return <FeedView filter={route.filter} />;
  if (route.type === 'stack-list') return <StackView />;
  if (route.type === 'about') return <AboutView />;
  if (route.type === 'reader') return <ReaderView route={route} />;
  if (route.type === 'reader-not-found') {
    return (
      <section aria-label="Reader" className="reader-shell">
        <header className="view-header">
          <h1>Entry not found</h1>
        </header>
        <p className="reader-not-found">This entry does not exist anymore or the URL is incorrect.</p>
        <p>
          <a href={route.fallbackHref}>Go back</a>
        </p>
      </section>
    );
  }
  if (route.type === 'experiment') return <ExperimentView route={route} />;
  if (route.type === 'experiment-not-found') {
    return (
      <section aria-label="Experiment" className="reader-shell">
        <header className="view-header">
          <h1>Experiment not found</h1>
        </header>
        <p className="reader-not-found">The experiment route is invalid.</p>
        <p>
          <a href={route.fallbackHref}>Back to feed</a>
        </p>
      </section>
    );
  }
  return <NotFoundView />;
}

export default function App() {
  const { route } = useHashRouter();

  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to content</a>
      <div className="app-shell">
        <Rail route={route} />
        <main id="main-content" className="main-content">
          {renderView(route)}
        </main>
      </div>
    </>
  );
}
