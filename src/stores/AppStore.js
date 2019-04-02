import { action, computed, decorate, observable, runInAction } from 'mobx';
import axios from 'axios';
axios.defaults.baseURL = 'https://api.giphy.com/v1/gifs/';
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

class AppStore {
  constructor() {
    this.getGifs();
  }

  // OBSERVABLES

  endpoint = "trending";
  gifs = [];
  idOfGifInModal = "";
  loading = false;
  loadingMore = false;
  // "pagination": {
  //   "total_count": 109260,
  //   "count": 25,
  //   "offset": 0
  // },
  pagination = {};
  searchText = "";

  // ACTIONS

  clearGifs() {
    this.gifs = [];
  }

  async getGifs(getMore = false) {
    const { endpoint, gifs, requestParams } = this;
    const endpointAndParams = `${endpoint}${requestParams}`;

    if (getMore) this.loadingMore = true
    else this.loading = true;

    const data = await this.getData(endpointAndParams);
    let { data: fetchedGifs = [], pagination = {} } = data || {};

    if (getMore) fetchedGifs = [...gifs, ...fetchedGifs];

    runInAction(() => {
      this.gifs = fetchedGifs;
      this.pagination = pagination;
      if (getMore) this.loadingMore = false
      else this.loading = false;
    });
  }

  openGifModal(idOfGif = "") {
    this.idOfGifInModal = idOfGif;
  }

  closeGifModal() {
    this.idOfGifInModal = "";
  }

  setEndpoint(endpoint = "trending") {
    this.endpoint = endpoint;
  }

  setSearchText(text = "") {
    this.searchText = text;
  }

  sortGifs(sortType) {
    const { gifs } = this;
    const sortedGifs = gifs.slice().sort((gifA, gifB) => {
      const gifACreatedTime = new Date(gifA.create_datetime);
      const gifBCreatedTime = new Date(gifB.create_datetime);
      if (sortType === "asc") {
        return gifACreatedTime - gifBCreatedTime;
      } else {
        return gifBCreatedTime - gifACreatedTime;
      }
    });
    this.gifs = sortedGifs;
  }

  // COMPUTED

  get countOfGifs() {
    const { gifs = [] } = this;
    return gifs.length ? gifs.length : 0;
  }

  get gifInModal() {
    const { gifs = [], idOfGifInModal = "" } = this;
    return gifs.find(gif => gif.id === idOfGifInModal);
  }

  // Returns boolean indicating whether all gifs available have been fetched
  get moreGifsAvailable() {
    const { countOfGifs, pagination } = this;
    const { total_count: totalGifsAvailable = 0 } = pagination;
    return countOfGifs <= totalGifsAvailable;
  }

  get requestParams() {
    const { countOfGifs = 0, endpoint, searchText } = this;
    let searchQuery = '';
    if (endpoint === 'search') searchQuery = `&q=${searchText}`;
    return `?api_key=${API_KEY}&offset=${countOfGifs}${searchQuery}&limit=25&json=true`;
  }

  // HELPERS

  async getData(endpoint) {
    if (endpoint) {
      try {
        const response = await axios.get(endpoint);
        if (response && response.data) return response.data;
      } catch (error) {
        console.error('An error occurred while fetching GIFs', error);
      }
    }
  }
}

decorate(AppStore, {
  // OBSERVABLES
  endpoint: observable,
  gifs: observable,
  idOfGifInModal: observable,
  loading: observable,
  loadingMore: observable,
  pagination: observable,
  searchText: observable,

  // ACTIONS
  clearGifs: action.bound,
  getGifs: action.bound,
  openGifModal: action.bound,
  closeGifModal: action.bound,
  setEndpoint: action.bound,
  setSearchText: action.bound,
  sortGifs: action.bound,

  // COMPUTED
  countOfGifs: computed,
  gifInModal: computed,
  moreGifsAvailable: computed,
  requestParams: computed,
});

const appStore = new AppStore();

export default appStore;
