import ContentGrid from '../ContentGrid/ContentGrid';
import './Section.css';

export default function Section({ section, onHeadlineClick, onImageClick }) {
  return (
    <section id={section.id} className="section">
      <div className="section__label">{section.label}</div>
      <hr className="section__divider" />
      {section.type === 'prose' ? (
        <p className="section__about-placeholder">{section.content}</p>
      ) : (
        <ContentGrid
          items={section.items}
          sectionId={section.id}
          onHeadlineClick={onHeadlineClick}
          onImageClick={onImageClick}
        />
      )}
    </section>
  );
}
