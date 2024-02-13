import { useState } from 'react';
import css from './ImageGalleryItem.module.css';

import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ image }) => {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    setIsModal(prevState => !prevState);
  };

  return (
    <>
      <li className={css.ImageGalleryItem} key={image.id} onClick={toggleModal}>
        <img
          className={css.ImageGalleryItemImage}
          src={image.webformatURL}
          alt={image.tags}
        />
      </li>
      {isModal && (
        <Modal
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          closeModal={toggleModal}
        />
      )}
    </>
  );
};
