import React from 'react';
import './LoadingMore.css';
import loadingGif from './Jumping-Balls-128px.gif';
import PropTypes from 'prop-types';

function LoadingMore({ loading }) {
  if (!loading) return null;
  return (
    <div className="LoadingMore">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
}

LoadingMore.propTypes = {
  loading: PropTypes.bool.isRequired,
};

LoadingMore.defaultProps = {};

export default React.memo(LoadingMore);
