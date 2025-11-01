import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, titleId, children }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const resolvedTitleId = title ? titleId ?? 'modal-title' : titleId ?? undefined;

  return createPortal(
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      {...(resolvedTitleId ? { 'aria-labelledby': resolvedTitleId } : {})}
    >
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close dialog">
          ×
        </button>
        {title ? (
          <header className="modal__header">
            <h2 id={resolvedTitleId}>{title}</h2>
          </header>
        ) : null}
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
