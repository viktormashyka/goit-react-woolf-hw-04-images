import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import emptyThumbnail from '../../images/empty-thumbnail.png';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, largeImageURL, tags }) => {
  useEffect(() => {
    const handleEscClose = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [closeModal]);

  const handleBackdropClickClose = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClickClose}>
      <div className={css.Modal}>
        <img src={largeImageURL ?? emptyThumbnail} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};
