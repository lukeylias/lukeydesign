import { useState } from 'react';
import { toEmbedUrl } from '../../utils/media';
import { PreviewableImage } from '../ImagePreview/ImagePreview';
import './MediaBlock.css';

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** 250×250 fixed crop with image preview. */
function ThumbnailMedia({ media }) {
  if (media.type === 'video' || media.type === 'iframe') {
    if (media.poster) {
      return (
        <PreviewableImage
          className="media-block media-block--thumbnail"
          triggerClassName="image-preview-trigger--thumbnail"
          src={media.poster}
          alt={media.alt || 'Video preview image'}
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
    <PreviewableImage
      className="media-block media-block--thumbnail"
      triggerClassName="image-preview-trigger--thumbnail"
      src={media.src}
      alt={media.alt || ''}
    />
  );
}

/** Full-width hero at top of modal. */
function HeroMedia({ media }) {
  if (media.type === 'iframe') return null;

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
    <PreviewableImage
      className="media-block media-block--hero"
      src={media.src}
      alt={media.alt || ''}
    />
  );
}

/** Check if a video src is a direct file. */
function isDirectVideo(src) {
  return /\.(mp4|webm|ogg|mov)([?#]|$)/i.test(src);
}

/** Inline body media with Win98 chrome for images, loading state, and fade-in. */
function BodyMedia({ media, imageIndex }) {
  const [loaded, setLoaded] = useState(false);

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

  // Image or gif — Win98 chrome wrapper with loading state
  const caption = media.alt || 'Image';
  const isLazy = typeof imageIndex === 'number' && imageIndex > 0;

  return (
    <div className="media-block media-block--body media-block--image-window">
      <div className="media-block__titlebar">
        <span className="media-block__titlebar-text">{caption}</span>
      </div>
      <div className="media-block__image-body">
        {!loaded && (
          <div className="media-block__placeholder">
            <div className="media-block__spinner" />
          </div>
        )}
        <PreviewableImage
          src={media.src}
          alt={media.alt || ''}
          className={`media-block__image ${loaded ? 'media-block__image--loaded' : ''}`}
          loading={isLazy ? 'lazy' : undefined}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */

/**
 * Unified media renderer.
 *
 * @param {object}   media      - { type, src, alt?, poster?, aspectRatio? }
 * @param {string}   context    - 'thumbnail' | 'hero' | 'body'
 * @param {number}   imageIndex - running image index for lazy loading (body images only)
 */
export default function MediaBlock({ media, context = 'body', imageIndex }) {
  if (!media?.src) return null;

  switch (context) {
    case 'thumbnail':
      return <ThumbnailMedia media={media} />;
    case 'hero':
      return <HeroMedia media={media} />;
    case 'body':
    default:
      return <BodyMedia media={media} imageIndex={imageIndex} />;
  }
}
