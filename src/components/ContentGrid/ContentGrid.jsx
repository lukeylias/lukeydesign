import GridItem from '../GridItem/GridItem';
import './ContentGrid.css';

export default function ContentGrid({ items, sectionId, onHeadlineClick, onImageClick }) {
  return (
    <div className="content-grid">
      {items.map((item) => (
        <GridItem
          key={item.slug}
          item={item}
          sectionId={sectionId}
          onHeadlineClick={onHeadlineClick}
          onImageClick={onImageClick}
        />
      ))}
    </div>
  );
}
