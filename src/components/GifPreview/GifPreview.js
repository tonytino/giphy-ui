import React from 'react';
import './GifPreview.css';
import PropTypes from 'prop-types';

function GifPreview({ title, url, height, width }) {
  const noImageToRender = !url;
  if (noImageToRender) return null;
  return (
    <div className="GifPreview">
      <img src={url} alt={title} height={height} width={width} />
    </div>
  );
}

GifPreview.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

GifPreview.defaultProps = {};

export default React.memo(GifPreview);
