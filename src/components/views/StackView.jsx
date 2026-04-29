import { stackEntries } from '../../data';
import FeedList from '../feed/FeedList';
import '../feed/feed.css';

export default function StackView() {
  return (
    <section aria-label="Stack" className="stack-view">
      <header className="view-header">
        <h1>Stack</h1>
      </header>
      <FeedList entries={stackEntries} />
    </section>
  );
}
