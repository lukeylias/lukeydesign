import { useEffect, useRef } from 'react';
import MediaBlock from '../MediaBlock/MediaBlock';
import Lightbox from '../Lightbox/Lightbox';
import './Modal.css';

export default function Modal({ isOpen, activeItem, isExpanded, onClose, onToggleExpanded, lightbox }) {
  const dialogRef = useRef(null);

  // Sync dialog open state with React state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Prevent native ESC — we handle it in the parent
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

  // Backdrop click
  function handleDialogClick(e) {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }

  const item = activeItem?.item;

  return (
    <dialog
      ref={dialogRef}
      className={`modal ${isExpanded ? 'modal--expanded' : 'modal--default'}`}
      id="modal"
      aria-labelledby="modal-title"
      onClick={handleDialogClick}
    >
      <div className="modal__titlebar">
        <span className="modal__title" id="modal-title">
          {item?.headline || ''}
        </span>
        <div className="modal__controls">
          <button
            className="modal__btn modal__btn--expand"
            aria-label={isExpanded ? 'Restore' : 'Expand'}
            title={isExpanded ? 'Restore' : 'Expand'}
            onClick={onToggleExpanded}
          >
            {isExpanded ? '❐' : '□'}
          </button>
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

      <div className="modal__body" id="modal-body">
        <div className="modal__body-inner">
        {item && (
          <>
            <h2>{item.headline}</h2>
            <p>{item.body}</p>

            {/* Additional media entries rendered inline */}
            {item.media?.map((m, i) => (
              <MediaBlock
                key={i}
                media={m}
                context="body"
                onLightbox={lightbox.open}
              />
            ))}

            <p>This is placeholder modal content. In production, this would contain the full article, case study, or write-up with rich content including headings, images, code blocks, and embeds.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </>
        )}
        </div>
      </div>

      {/* Inline lightbox — rendered inside dialog to stay above backdrop */}
      <Lightbox
        isOpen={lightbox.isOpen}
        media={lightbox.media}
        onClose={lightbox.close}
        inline
      />
    </dialog>
  );
}
