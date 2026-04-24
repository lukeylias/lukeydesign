import { isLightboxable, toEmbedUrl } from '../../utils/media';
import './MediaBlock.css';

/* ------------------------------------------------------------------ */
/*  Sub-components — keep the public API as a single <MediaBlock>     */
/* ------------------------------------------------------------------ */

/** 250×250 fixed crop, click opens lightbox for images/gifs. */
function ThumbnailMedia({ media, onLightbox }) {
  const lightboxable = isLightboxable(media.type);

  if (media.type === 'video' || media.type === 'iframe') {
    // Poster image or placeholder
    if (media.poster) {
      return (
        <img
          className="media-block media-block--thumbnail"
          src={media.poster}
          alt={media.alt || ''}
          onClick={(e) => { e.stopPropagation(); onLightbox?.({ type: 'image', src: media.poster, alt: media.alt }); }}
        />
      );
    }
    return (
      <div className="media-block media-block--thumbnail media-block--placeholder">
        <span className="media-block__icon">{media.type === 'video' ? '▶' : '⧉'}</span>
      </div>
    );
  }

  return (
    <img
      className="media-block media-block--thumbnail"
      src={media.src}
      alt={media.alt || ''}
      onClick={lightboxable ? (e) => { e.stopPropagation(); onLightbox?.(media); } : undefined}
      style={lightboxable ? { cursor: 'zoom-in' } : undefined}
    />
  );
}

/** Full-width hero at top of modal. Images/gifs lightboxable, video plays inline. */
function HeroMedia({ media, onLightbox }) {
  if (media.type === 'iframe') return null; // iframes don't render as hero

  if (media.type === 'video') {
    return (
      <div className="media-block media-block--hero media-block--video-wrapper">
        <iframe
          src={toEmbedUrl(media.src)}
          title={media.alt || 'Embedded video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="media-block__iframe"
        />
      </div>
    );
  }

  return (
    <img
      className="media-block media-block--hero"
      src={media.src}
      alt={media.alt || ''}
      onClick={(e) => { e.stopPropagation(); onLightbox?.(media); }}
      style={{ cursor: 'zoom-in' }}
    />
  );
}

/** Check if a video src is a direct file (e.g. .mp4, .webm) rather than a streaming embed. */
function isDirectVideo(src) {
  return /\.(mp4|webm|ogg|mov)([?#]|$)/i.test(src);
}

/** Inline body media — images, videos, iframes all supported. */
function BodyMedia({ media, onLightbox }) {
  if (media.type === 'video') {
    if (isDirectVideo(media.src)) {
      return (
        <div className="media-block media-block--body media-block--video-wrapper">
          <video
            src={media.src}
            controls
            playsInline
            preload="metadata"
            className="media-block__iframe"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        </div>
      );
    }
    return (
      <div className="media-block media-block--body media-block--video-wrapper">
        <iframe
          src={toEmbedUrl(media.src)}
          title={media.alt || 'Embedded video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="media-block__iframe"
        />
      </div>
    );
  }

  if (media.type === 'iframe') {
    return (
      <div className="media-block media-block--body media-block--iframe-wrapper" style={{ aspectRatio: media.aspectRatio || '16 / 9' }}>
        <iframe
          src={media.src}
          title={media.alt || 'Embedded app'}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          className="media-block__iframe"
        />
      </div>
    );
  }

  // Image or gif
  const lightboxable = isLightboxable(media.type);
  return (
    <img
      className="media-block media-block--body"
      src={media.src}
      alt={media.alt || ''}
      onClick={lightboxable ? (e) => { e.stopPropagation(); onLightbox?.(media); } : undefined}
      style={lightboxable ? { cursor: 'zoom-in' } : undefined}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */

/**
 * Unified media renderer.
 *
 * @param {object}   media     - { type, src, alt?, poster?, aspectRatio? }
 * @param {string}   context   - 'thumbnail' | 'hero' | 'body'
 * @param {function} onLightbox - called with the media object when lightbox should open
 */
export default function MediaBlock({ media, context = 'body', onLightbox }) {
  if (!media?.src) return null;

  switch (context) {
    case 'thumbnail':
      return <ThumbnailMedia media={media} onLightbox={onLightbox} />;
    case 'hero':
      return <HeroMedia media={media} onLightbox={onLightbox} />;
    case 'body':
    default:
      return <BodyMedia media={media} onLightbox={onLightbox} />;
  }
}
