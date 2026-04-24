import MediaBlock from '../MediaBlock/MediaBlock';
import { getThumbnail } from '../../utils/media';
import './GridItem.css';

export default function GridItem({ item, sectionId, onHeadlineClick, onLightbox }) {
  const thumbnailMedia = getThumbnail(item);

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
      {thumbnailMedia && (
        <MediaBlock
          media={thumbnailMedia}
          context="thumbnail"
          onLightbox={onLightbox}
        />
      )}
    </article>
  );
}
