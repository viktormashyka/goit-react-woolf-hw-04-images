import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ isModal: !prevState.isModal }));
  };

  render() {
    const { image } = this.props;
    return (
      <>
        <li
          className={css.ImageGalleryItem}
          key={image.id}
          onClick={this.toggleModal}
        >
          <img
            className={css.ImageGalleryItemImage}
            src={image.webformatURL}
            alt={image.tags}
          />
        </li>
        {this.state.isModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            closeModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}
