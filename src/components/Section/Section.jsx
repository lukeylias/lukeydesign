import ContentGrid from '../ContentGrid/ContentGrid';
import './Section.css';

export default function Section({ section, onHeadlineClick, onLightbox }) {
  return (
    <section id={section.id} className="section">
      <div className="section__label">{section.label}</div>
      <hr className="section__divider" />
      {section.type === 'prose' ? (
        Array.isArray(section.content)
          ? <ul className="section__about-list">{section.content.map((line, i) => <li key={i}>{line}</li>)}</ul>
          : <p className="section__about-placeholder">{section.content}</p>
      ) : (
        <ContentGrid
          items={section.items}
          sectionId={section.id}
          onHeadlineClick={onHeadlineClick}
          onLightbox={onLightbox}
        />
      )}
    </section>
  );
}
