import React, { Component } from 'react';
import AlbumList from './components/AlbumList';
import Header from './components/Header';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AlbumList/>
      </div>
    );
  }
}

export default App;
