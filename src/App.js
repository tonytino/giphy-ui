import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { LoadingScreen } from './components';
import appStore from './stores/AppStore';
import './App.css';

class App extends Component {
  renderLoadingScreen() {
    const { loading } = appStore;
    return <LoadingScreen loading={loading} />;
  }

  render() {
    return (
      <div className="App">
        {this.renderLoadingScreen()}
      </div>
    );
  }
}

export default observer(App);
