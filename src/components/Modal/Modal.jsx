import { useEffect, useRef } from 'react';
import './Modal.css';

export default function Modal({ isOpen, activeItem, onClose, onImageClick }) {
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
      className="modal"
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
        {item && (
          <>
            <h2>{item.headline}</h2>
            {item.modalContent ? (
              item.modalContent.map((block, i) => {
                if (block.type === 'text') return <p key={i}>{block.value}</p>;
                if (block.type === 'link') return <p key={i}><a href={block.href} target="_blank" rel="noopener">{block.label || block.href}</a></p>;
                if (block.type === 'image') return (
                  <img
                    key={i}
                    src={block.src}
                    alt={block.alt || item.headline}
                    onClick={(e) => {
                      e.stopPropagation();
                      onImageClick?.(block.src, block.alt || item.headline);
                    }}
                  />
                );
                return null;
              })
            ) : (
              <>
                <p>{item.body}</p>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.headline}
                    onClick={(e) => {
                      e.stopPropagation();
                      onImageClick?.(item.image, item.headline);
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </dialog>
  );
}
