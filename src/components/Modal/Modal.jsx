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
            {item.modalContent ? (
              item.modalContent.map((block, i) => {
                if (block.type === 'text') return <p key={i}>{block.value}</p>;
                if (block.type === 'link') return <p key={i}><a href={block.href} target="_blank" rel="noopener noreferrer">{block.label || block.href}</a></p>;
                if (block.type === 'image') return (
                  <MediaBlock
                    key={i}
                    media={{ type: 'image', src: block.src, alt: block.alt || item.headline }}
                    context="body"
                    onLightbox={lightbox.open}
                  />
                );
                if (block.type === 'video') return (
                  <MediaBlock
                    key={i}
                    media={{ type: 'video', src: block.src, alt: block.alt || item.headline }}
                    context="body"
                  />
                );
                return null;
              })
            ) : (
              <>
                <p>{item.body}</p>
                {item.media?.map((m, i) => (
                  <MediaBlock
                    key={i}
                    media={m}
                    context="body"
                    onLightbox={lightbox.open}
                  />
                ))}
              </>
            )}
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
