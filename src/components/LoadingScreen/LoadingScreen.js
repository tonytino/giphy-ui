import React from 'react';
import './LoadingScreen.css';
import loadingGif from './loading.gif';
import PropTypes from 'prop-types';

function LoadingScreen({ loading }) {
  if (!loading) return null;
  return (
    <div className="LoadingScreen">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
}

LoadingScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
};

LoadingScreen.defaultProps = {};

export default React.memo(LoadingScreen);
