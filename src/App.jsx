import { useEffect, useLayoutEffect, useRef } from 'react';
import {
  AboutPage,
  CaseStudyPage,
  HomePage,
  NotesPage,
  NotFoundPage,
  SideProjectIndexPage,
  SideProjectPage,
  SiteFooter,
  SiteHeader,
} from './components/portfolio/Portfolio';
import ExperimentView from './components/views/ExperimentView';
import ReaderView from './components/views/ReaderView';
import StackView from './components/views/StackView';
import useHashRouter from './hooks/useHashRouter';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/layout.css';
import './styles/portfolio.css';

function titleForRoute(route) {
  if (route.type === 'home') return 'Luke Ylias — Product Designer';
  if (route.type === 'notes') return 'Notes — Luke Ylias';
  if (route.type === 'about') return 'About — Luke Ylias';
  if (route.type === 'work-detail') return `${route.project.headline} — Luke Ylias`;
  if (route.type === 'side-project-detail') return `${route.project.headline} — Luke Ylias`;
  if (route.type === 'side-project-index') return 'Side projects — Luke Ylias';
  if (route.type === 'reader') return `${route.entry.title} — Luke Ylias`;
  return 'Luke Ylias';
}

function renderPage(route) {
  if (route.type === 'home') return <HomePage />;
  if (route.type === 'notes') return <NotesPage />;
  if (route.type === 'about') return <AboutPage />;
  if (route.type === 'work-detail') return <CaseStudyPage slug={route.slug} />;
  if (route.type === 'side-project-detail') return <SideProjectPage slug={route.slug} />;
  if (route.type === 'side-project-index') return <SideProjectIndexPage />;

  // These views remain available for existing deep links, but are intentionally
  // kept outside the new primary navigation.
  if (route.type === 'reader') return <ReaderView route={route} />;
  if (route.type === 'experiment') return <ExperimentView route={route} />;
  if (route.type === 'stack-list') return <StackView />;

  return <NotFoundPage />;
}

export default function App() {
  const { route } = useHashRouter();
  const mainRef = useRef(null);

  useEffect(() => {
    document.title = titleForRoute(route);
  }, [route]);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    mainRef.current?.focus({ preventScroll: true });
  }, [route.hash]);

  function skipToContent(event) {
    event.preventDefault();
    mainRef.current?.focus();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    mainRef.current?.scrollIntoView({
      block: 'start',
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

  return (
    <>
      <a className="skip-nav" href="#main-content" onClick={skipToContent}>
        Skip to content
      </a>
      <div className="site-shell">
        <SiteHeader route={route} />
        <main id="main-content" ref={mainRef} tabIndex="-1">
          <div className="route-view" key={route.hash}>
            {renderPage(route)}
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
