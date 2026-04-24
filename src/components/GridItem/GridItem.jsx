import './GridItem.css';

export default function GridItem({ item, sectionId, onHeadlineClick, onImageClick }) {
  return (
    <article className="grid-item" data-slug={item.slug}>
      <a
        href="#"
        className="grid-item__headline"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onHeadlineClick?.(item, sectionId);
        }}
      >
        {item.headline}
      </a>
      <p className="grid-item__body">{item.body}</p>
      {item.image && (
        <img
          src={item.image}
          alt={item.headline}
          className="grid-item__image"
          onClick={(e) => {
            e.stopPropagation();
            onImageClick?.(item.image, item.headline);
          }}
        />
      )}
    </article>
  );
}
