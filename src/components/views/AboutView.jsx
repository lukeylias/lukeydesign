import about from '../../data/about';

export default function AboutView() {
  return (
    <section aria-label="About" className="about-view">
      <header className="view-header">
        <h1>About</h1>
      </header>
      <div className="prose-block">
        {about.content.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}
