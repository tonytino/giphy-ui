import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { GifModal, GifPreview, LoadingMore, LoadingScreen } from './components';
import appStore from './stores/AppStore';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchMoreGifs = this.fetchMoreGifs.bind(this);
    this.submitSearchOnEnter = this.submitSearchOnEnter.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fetchMoreGifs);
  }

  componentWillMount() {
    window.removeEventListener('scroll', this.fetchMoreGifs);
  }

  fetchMoreGifs() {
    const { getGifs, loadingMore, moreGifsAvailable } = appStore;
    if (!loadingMore && moreGifsAvailable) {
      const { innerHeight, scrollY } = window;
      const { offsetHeight: heightOfBody } = document.body;
      const usersLocation = innerHeight + scrollY;
      const locationToFetchMoreGifsAt = heightOfBody - 200;
      const shouldFetchMoreGifs = usersLocation >= locationToFetchMoreGifsAt;
      if (shouldFetchMoreGifs) getGifs(true);
    }
  }

  submitSearchOnEnter(event) {
    const { clearGifs, getGifs, searchText } = appStore;
    if (event.key === 'Enter' && searchText) {
      clearGifs();
      getGifs();
    }
  }

  renderLoadingScreen() {
    const { loading } = appStore;
    return <LoadingScreen loading={loading} />;
  }

  renderSearchBar() {
    const {
      clearGifs,
      getGifs,
      searchText,
      setEndpoint,
      setSearchText,
    } = appStore;
    return (
      <header className="SearchBar">
        <input
          className="SearchInput"
          type="text"
          value={searchText}
          placeholder="Search Giphy"
          onChange={(evt) => {
            const searchText = evt.target.value;
            if (!searchText) {
              setEndpoint('trending');
              clearGifs();
              getGifs();
            } else {
              setEndpoint('search');
            }
            setSearchText(searchText);
          }}
          onKeyPress={this.submitSearchOnEnter}
        />
        <button
          className="SearchButton"
          onClick={() => {
            if (searchText) {
              clearGifs();
              getGifs();
            }
          }}
        >
          Search
        </button>
      </header>
    );
  }

  renderSortBar() {
    const { gifs } = appStore;
    if (!gifs.length) return null;
    return (
      <div className="SortBar">
        <div className="SortButtons">
          {this.renderSortButton('asc', 'Created Time ↑')}
          {this.renderSortButton('desc', 'Created Time ↓')}
        </div>
      </div>
    );
  }

  renderSortButton(sortDirection, buttonLabel) {
    const { sortGifs } = appStore;
    return (
      <button
        className="SortButton"
        onClick={() => {
          sortGifs(sortDirection);
          window.scroll(0,0); // Scroll to the top after sorting
        }}
      >
        {buttonLabel}
      </button>
    );
  }
  renderGifs() {
    const { gifs } = appStore;
    if (gifs) {
      return (
        <div className="GifsContainer">
          {this.renderSortBar()}
          <div className="Gifs">{gifs.map(this.renderGif)}</div>
        </div>
      );
    }
  }

  renderGif(gif) {
    const { openGifModal } = appStore;
    if (gif) {
      const { id, title, images = {} } = gif;
      const { fixed_width = {} } = images;
      const { url = "", height = "", width = "" } = fixed_width;
      return (
        <GifPreview
          key={id}
          id={id}
          title={title}
          url={url}
          height={height}
          width={width}
          onClickHandler={openGifModal}
        />
      );
    }
  }

  renderGifModal() {
    const { gifInModal, closeGifModal } = appStore;
    if (gifInModal) {
      const { bitly_url, tags, create_datetime, title, images = {} } = gifInModal;
      const { fixed_width = {} } = images;
      const { url = "", height = "", width = "" } = fixed_width;
      return (
        <GifModal
          bitly_url={bitly_url}
          closeModalHandler={closeGifModal}
          createdAt={create_datetime}
          height={height}
          tags={tags}
          title={title}
          url={url}
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
        {this.renderSearchBar()}
        {this.renderGifs()}
        {this.renderGifModal()}
        {this.renderLoadingMore()}
      </div>
    );
  }
}

export default observer(App);
