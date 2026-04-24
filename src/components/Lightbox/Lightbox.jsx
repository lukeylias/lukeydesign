import { useRef } from 'react';
import useFocusTrap from '../../hooks/useFocusTrap';
import './Lightbox.css';

/**
 * Lightbox overlay for images/gifs.
 *
 * Two render modes:
 *   1. **Inline** — rendered inside the modal's <dialog> as a sibling of modal__body.
 *      Parent passes `inline` prop; lightbox uses a fixed overlay within the dialog.
 *   2. **Standalone** — rendered at app root for card-thumbnail → lightbox without a modal.
 *      Uses its own <dialog> element.
 *
 * Both share the same visual treatment.
 */
export default function Lightbox({ isOpen, media, onClose, inline = false }) {
  const containerRef = useRef(null);
  useFocusTrap(containerRef, isOpen && !!media);

  if (!isOpen || !media) return null;

  const content = (
    <>
      <div className="lightbox__backdrop" onClick={onClose} />
      <div className="lightbox__container">
        <div className="lightbox__titlebar">
          <span className="lightbox__title">{media.alt || 'Image'}</span>
          <button
            className="modal__btn modal__btn--close"
            aria-label="Close lightbox"
            title="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="lightbox__body">
          <img
            className="lightbox__img"
            src={media.src}
            alt={media.alt || ''}
          />
        </div>
      </div>
    </>
  );

  if (inline) {
    return <div className="lightbox lightbox--inline" ref={containerRef}>{content}</div>;
  }

  // Standalone mode — render as a simple fixed overlay
  return <div className="lightbox lightbox--standalone" ref={containerRef}>{content}</div>;
}
