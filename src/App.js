import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import List from './components/List';
import SelectCityModal from './components/modals/SelectCityModal';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <List/>
        <SelectCityModal/>
      </div>
    );
  }
}

export default App;
