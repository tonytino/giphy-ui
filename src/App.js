import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { GifPreview, LoadingMore, LoadingScreen } from './components';
import appStore from './stores/AppStore';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchMoreGifs = this.fetchMoreGifs.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fetchMoreGifs);
  }

  componentWillMount() {
    window.removeEventListener('scroll', this.fetchMoreGifs);
  }

  fetchMoreGifs() {
    const { getTrendingGifs, loadingMore, moreGifsAvailable } = appStore;
    if (!loadingMore && moreGifsAvailable) {
      const { innerHeight, scrollY } = window;
      const { offsetHeight: heightOfBody } = document.body;
      const usersLocation = innerHeight + scrollY;
      const locationToFetchMoreGifsAt = heightOfBody - 200;
      const shouldFetchMoreGifs = usersLocation >= locationToFetchMoreGifsAt;
      if (shouldFetchMoreGifs) getTrendingGifs(true);
    }
  }

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
      const { url = "", height = "", width = "" } = fixed_width;
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

  renderLoadingMore() {
    const { loadingMore } = appStore;
    return <LoadingMore loading={loadingMore} />;
  }

  render() {
    return (
      <div className="App">
        {this.renderLoadingScreen()}
        {this.renderGifs()}
        {this.renderLoadingMore()}
      </div>
    );
  }
}

export default observer(App);
