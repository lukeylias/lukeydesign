function renderBlock(block, index) {
  if (block.type === 'text') {
    return <p key={`text-${index}`}>{block.value}</p>;
  }

  if (block.type === 'link') {
    return (
      <p key={`link-${index}`}>
        <a href={block.href} target="_blank" rel="noreferrer">
          {block.label || block.href}
        </a>
      </p>
    );
  }

  if (block.type === 'image') {
    return <img key={`image-${index}`} src={block.src} alt={block.alt || ''} loading="lazy" />;
  }

  if (block.type === 'video') {
    return <video key={`video-${index}`} src={block.src} controls preload="metadata" aria-label={block.alt || 'Video'} />;
  }

  if (block.type === 'heading') {
    return <h2 key={`heading-${index}`} className="reader-section-heading">{block.value}</h2>;
  }

  if (block.type === 'table') {
    return (
      <div key={`table-${index}`} className="reader-table-wrap">
        <table className="reader-table">
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`cell-${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

export default function BlogReader({ entry }) {
  return <div className="reader-content">{entry.modalContent?.map(renderBlock)}</div>;
}
