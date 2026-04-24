import GridItem from '../GridItem/GridItem';
import './ContentGrid.css';

export default function ContentGrid({ items, sectionId, onHeadlineClick, onLightbox }) {
  return (
    <div className="content-grid">
      {items.map((item) => (
        <GridItem
          key={item.slug}
          item={item}
          sectionId={sectionId}
          onHeadlineClick={onHeadlineClick}
          onLightbox={onLightbox}
        />
      ))}
    </div>
  );
}
