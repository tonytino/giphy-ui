import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { GifPreview, LoadingScreen } from './components';
import appStore from './stores/AppStore';
import './App.css';

class App extends Component {
  renderLoadingScreen() {
    const { loading } = appStore;
    return <LoadingScreen loading={loading} />;
  }

  renderGifs() {
    const { gifs } = appStore;
    if (gifs) {
      return <div className="Gifs">{gifs.map(this.renderGif)}</div>;
    }
  }

  renderGif(gif) {
    if (gif) {
      const { id, title, images = {} } = gif;
      const { fixed_width = {} } = images;
      const { url, height, width } = fixed_width;
      return (
        <GifPreview
          key={id}
          title={title}
          url={url}
          height={height}
          width={width}
        />
      );
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderLoadingScreen()}
        {this.renderGifs()}
      </div>
    );
  }
}

export default observer(App);
