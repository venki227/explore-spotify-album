import React, { Component } from 'react';
import AlbumList from './components/AlbumList';
import Header from './components/Header';
import ArtistSearch from './components/ArtistSearch';
import './App.scss';

class App extends Component {
  state = {
    selectedArtist: {
      id:'1mYsTxnqsietFxj1OgoGbG',
      name:'A.R. Rahman'
    }
  }

  onArtistSeleted(artist) {
    this.setState({
      selectedArtist: artist
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <ArtistSearch selectedArtist= {this.state.selectedArtist} onArtistSeleted={this.onArtistSeleted.bind(this)}/>
        <AlbumList selectedArtist={this.state.selectedArtist}/>
      </div>
    );
  }
}

export default App;
