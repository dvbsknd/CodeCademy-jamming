import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.searchResults = [];
    this.state.playlistName = '';
    this.state.playlistTracks = [];
    this.addTrack = this.addTrack.bind(this);
  }
  addTrack(track) {
    const present = this.state.playlistTracks.find(savedTrack => {
      return savedTrack.id === track.id
    });
    if (!present) {
      const freshTracks = this.playlistTracks.push(track);
      this.setState({ playlistTracks: freshTracks });
    }
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              playListName={this.state.playListName} 
              playlistTracks={this.state.playlistTracks} 
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
