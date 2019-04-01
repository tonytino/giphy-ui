import React from 'react';
import './GifPreview.css';
import PropTypes from 'prop-types';

function GifPreview({ height, id,  onClickHandler, title, url, width }) {
  const noImageToRender = !url;
  if (noImageToRender) return null;
  return (
    <div
      className="GifPreview"
      onClick={() => onClickHandler(id)}
    >
      <img src={url} alt={title} height={height} width={width} />
    </div>
  );
}

GifPreview.propTypes = {
  height: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

GifPreview.defaultProps = {};

export default React.memo(GifPreview);
