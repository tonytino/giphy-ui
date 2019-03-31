import { action, decorate, observable, runInAction } from 'mobx';
import axios from 'axios';
axios.defaults.baseURL = 'https://api.giphy.com/v1/gifs/';
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

class AppStore {
  constructor() {
    this.getTrendingGifs();
  }

  // OBSERVABLES

  gifs = [];
  loading = false;

  // ACTIONS

  // https://developers.giphy.com/docs/#operation--gifs-trending-get
  async getTrendingGifs() {
    const endpoint = `trending?api_key=${API_KEY}&limit=25&json=true`;
    this.loading = true;
    const data = await this.getData(endpoint);
    const { data: gifs = [] } = data || {};
    runInAction(() => {
      this.gifs = gifs;
      this.loading = false;
    });
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
  gifs: observable,
  loading: observable,

  // ACTIONS
  getTrendingGifs: action.bound,
});

const appStore = new AppStore();

export default appStore;
