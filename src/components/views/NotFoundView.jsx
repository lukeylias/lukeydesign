export default function NotFoundView() {
  return (
    <section aria-label="Not found">
      <header className="view-header">
        <h1>Page not found</h1>
      </header>
      <p>This route does not exist.</p>
      <p>
        <a href="#/">Go back to feed</a>
      </p>
    </section>
  );
}
