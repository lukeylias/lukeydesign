import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import Lightbox from '../Lightbox/Lightbox';

const ImagePreviewContext = createContext(null);

export function ImagePreviewProvider({ children }) {
  const [media, setMedia] = useState(null);

  const openPreview = useCallback((nextMedia) => {
    if (!nextMedia?.src) return;
    setMedia(nextMedia);
  }, []);

  const closePreview = useCallback(() => {
    setMedia(null);
  }, []);

  const contextValue = useMemo(() => ({ openPreview }), [openPreview]);

  return (
    <ImagePreviewContext.Provider value={contextValue}>
      {children}
      <Lightbox
        isOpen={Boolean(media)}
        media={media}
        onClose={closePreview}
      />
    </ImagePreviewContext.Provider>
  );
}

export function PreviewableImage({
  alt = '',
  className,
  previewAlt,
  previewLabel,
  previewSrc,
  src,
  triggerClassName = '',
  ...imageProps
}) {
  const context = useContext(ImagePreviewContext);
  const description = (previewAlt ?? alt).trim();
  const canPreview = Boolean(context && src && description);

  if (!canPreview) {
    return <img {...imageProps} className={className} src={src} alt={alt} />;
  }

  const accessibleLabel = previewLabel || `Preview image: ${description}`;

  return (
    <button
      type="button"
      className={`image-preview-trigger ${triggerClassName}`.trim()}
      aria-label={accessibleLabel}
      title="Open image preview"
      onClick={() => context.openPreview({
        src: previewSrc || src,
        alt: description,
      })}
    >
      <img {...imageProps} className={className} src={src} alt={alt} />
    </button>
  );
}
