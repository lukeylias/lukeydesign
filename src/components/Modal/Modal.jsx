import { useEffect, useRef } from 'react';
import MediaBlock from '../MediaBlock/MediaBlock';
import appRegistry from '../apps/index';
import './Modal.css';

/**
 * Groups modalContent blocks into segments:
 * - consecutive non-image blocks are wrapped in { type: 'text-group', blocks: [...] }
 * - image/gif blocks become { type: 'media', block, index }
 * Returns an array of segments + total image count.
 */
function groupModalContent(modalContent) {
  const segments = [];
  let textGroup = [];
  let imageIndex = 0;

  function flushText() {
    if (textGroup.length > 0) {
      segments.push({ type: 'text-group', blocks: textGroup });
      textGroup = [];
    }
  }

  for (const block of modalContent) {
    if (block.type === 'image') {
      flushText();
      segments.push({ type: 'media', block, index: imageIndex++ });
    } else if (block.type === 'app') {
      flushText();
      segments.push({ type: 'app', block });
    } else {
      textGroup.push(block);
    }
  }
  flushText();

  return { segments, imageCountFromContent: imageIndex };
}

function renderTextBlock(block, i, item) {
  if (block.type === 'text') return <p key={i}>{block.value}</p>;
  if (block.type === 'link') {
    const isExternal = block.href && (block.href.startsWith('http') || block.href.startsWith('//'));
    return (
      <p key={i}>
        <a href={block.href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {block.label || block.href}{isExternal && !block.label?.includes('↗') && ' ↗'}
        </a>
      </p>
    );
  }
  if (block.type === 'table') return (
    <table key={i} className="modal__table">
      <thead>
        <tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {block.rows.map((row, j) => (
          <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
  if (block.type === 'video') return (
    <MediaBlock
      key={i}
      media={{ type: 'video', src: block.src, alt: block.alt || item.headline }}
      context="body"
    />
  );
  return null;
}

export default function Modal({ isOpen, activeItem, isExpanded, onClose, onToggleExpanded }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      const body = dialog.querySelector('#modal-body');
      if (body) body.scrollTop = 0;
    }
    else if (!isOpen && dialog.open) dialog.close();
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
    if (e.target === dialogRef.current) onClose();
  }

  const item = activeItem?.item;

  // Build body content with image breakout
  let bodyContent = null;
  if (item) {
    if (item.modalContent) {
      const { segments, imageCountFromContent } = groupModalContent(item.modalContent);

      const isAppOnly = segments.length === 1 && segments[0].type === 'app';

      const contentElements = segments.map((seg, i) => {
        if (seg.type === 'text-group') {
          return (
            <div className="modal__body-text" key={`tg-${i}`}>
              {seg.blocks.map((block, j) => renderTextBlock(block, j, item))}
            </div>
          );
        }
        if (seg.type === 'app') {
          const AppComponent = appRegistry[seg.block.app];
          return AppComponent ? <AppComponent key={`app-${i}`} /> : null;
        }
        // media segment
        return (
          <MediaBlock
            key={`img-${i}`}
            media={{ type: 'image', src: seg.block.src, alt: seg.block.alt || item.headline }}
            context="body"
            imageIndex={seg.index}
          />
        );
      });

      // Append item.media if present (with offset)
      const mediaElements = item.media?.map((m, i) => {
        const isImage = m.type === 'image' || m.type === 'gif';
        return (
          <MediaBlock
            key={`m-${i}`}
            media={m}
            context="body"
            imageIndex={isImage ? imageCountFromContent + i : undefined}
          />
        );
      }) || [];

      bodyContent = (
        <>
          {!isAppOnly && <div className="modal__body-text"><h2>{item.headline}</h2></div>}
          {contentElements}
          {mediaElements}
        </>
      );
    } else {
      // No modalContent — simple body + media
      const mediaElements = item.media?.map((m, i) => {
        const isImage = m.type === 'image' || m.type === 'gif';
        return (
          <MediaBlock
            key={`m-${i}`}
            media={m}
            context="body"
            imageIndex={isImage ? i : undefined}
          />
        );
      }) || [];

      bodyContent = (
        <>
          <div className="modal__body-text">
            <h2>{item.headline}</h2>
            <p>{item.body}</p>
          </div>
          {mediaElements}
        </>
      );
    }
  }

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
          {bodyContent}
        </div>
      </div>
    </dialog>
  );
}
