import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import emptyThumbnail from '../../images/empty-thumbnail.png';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscClose);
  }

  handleEscClose = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClose);
  }

  handleBackdropClickClose = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClickClose}>
        <div className={css.Modal}>
          <img
            src={largeImageURL ? largeImageURL : emptyThumbnail}
            alt={tags}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}
