import { useEffect, useRef } from 'react';
import './Lightbox.css';

export default function Lightbox({ isOpen, media, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const root = document.documentElement;
    const body = document.body;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    root.classList.add('image-preview-open');
    body.classList.add('image-preview-open');
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      root.classList.remove('image-preview-open');
      body.classList.remove('image-preview-open');
      Object.assign(body.style, previousBodyStyles);
      window.scrollTo({ top: scrollY, left: scrollX, behavior: 'auto' });
    };
  }, [isOpen]);

  function requestClose() {
    dialogRef.current?.close();
  }

  function handleDialogClick(event) {
    if (event.target === dialogRef.current) requestClose();
  }

  function handleDialogKeyDown(event) {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    requestClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={media?.alt || 'Image preview'}
      aria-describedby="image-preview-instructions"
      onClick={handleDialogClick}
      onClose={onClose}
      onKeyDown={handleDialogKeyDown}
    >
      <button
        ref={closeButtonRef}
        className="lightbox__close"
        type="button"
        aria-label="Close image preview"
        onClick={requestClose}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
      <p className="visually-hidden" id="image-preview-instructions">
        Press Escape, select the close button, or select outside the image to close the preview.
      </p>
      {media && (
        <img
          className="lightbox__img"
          src={media.src}
          alt={media.alt || ''}
        />
      )}
    </dialog>
  );
}
