import { useEffect, useRef } from 'react';
import './MediaViewer.css';

export default function MediaViewer({ isOpen, src, alt, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleCancel(e) {
      e.preventDefault();
      onClose();
    }
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  function handleDialogClick(e) {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="media-viewer"
      id="media-viewer"
      aria-labelledby="media-viewer-title"
      onClick={handleDialogClick}
    >
      <div className="media-viewer__titlebar">
        <span className="media-viewer__title" id="media-viewer-title">
          {alt || 'Image'}
        </span>
        <div className="media-viewer__controls">
          <button
            className="modal__btn modal__btn--close"
            aria-label="Close"
            title="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>
      <div className="media-viewer__body">
        {src && (
          <img className="media-viewer__img" src={src} alt={alt || ''} />
        )}
      </div>
    </dialog>
  );
}
