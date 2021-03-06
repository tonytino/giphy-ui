import React, { PureComponent } from 'react';
import './GifModal.css';
import closeIcon from './close-icon.png';
import PropTypes from 'prop-types';

class GifModal extends PureComponent {

  constructor(props) {
    super(props);
    this.closeModalIfEscPressed = this.closeModalIfEscPressed.bind(this);
  }

  closeModalIfEscPressed(evt) {
    const { closeModalHandler } = this.props;
    const escapeKeyCode = 27;
    if (evt.keyCode === escapeKeyCode) closeModalHandler();
  }

  componentDidMount(){
    window.addEventListener("keydown", this.closeModalIfEscPressed);
  }

  componentWillUnmount(){
    window.removeEventListener("keydown", this.closeModalIfEscPressed);
  }

  renderGifModalHeader() {
    const { closeModalHandler, title } = this.props;
    return (
      <div className="GifModalHeader">
        <h3>{title}</h3>
        <div className="CloseModal">
          <img
            src={closeIcon}
            alt="Close Modal"
            height={20}
            width={20}
            onClick={closeModalHandler}
          />
        </div>
      </div>
    );
  }

  renderGif() {
    const { height, title, url, width } = this.props;
    return <img src={url} alt={title} height={height} width={width} />;
  }

  renderGifAttributes() {
    const { bitly_url, createdAt, tags } = this.props;
    const tagsToRender = tags.map(tag => `#${tag}`).join(', ');
    const date = new Date(createdAt);
    const createdDate = date.toDateString();
    const createdTime = date.toLocaleTimeString();
    return (
      <div className="GifAttributes">
        <div className="GifAttribute">
          <div className="Name">Tags:</div>
          <div className="Value">
            {tagsToRender}
          </div>
        </div>
        <div className="GifAttribute">
          <div className="Name">URL:</div>
          <div className="Value">
            <a href={bitly_url}>{bitly_url}</a>
          </div>
        </div>
        <div className="GifAttribute">
          <div className="Name">Created Date:</div>
          <div className="Value">
            {createdDate}
          </div>
        </div>
        <div className="GifAttribute">
          <div className="Name">Created Time:</div>
          <div className="Value">
            {createdTime}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="GifModal">
        <div className="GifModalContent">
          {this.renderGifModalHeader()}
          <div className="GifModalBody">
            {this.renderGif()}
            {this.renderGifAttributes()}
          </div>
        </div>
      </div>
    );
  }
}

GifModal.propTypes = {
  bitly_url: PropTypes.string,
  closeModalHandler: PropTypes.func.isRequired,
  createdAt: PropTypes.string,
  height: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

GifModal.defaultProps = {
  bitly_url: "https://giphy.com/",
  createdAt: "",
  tags: [],
};

export default GifModal;
