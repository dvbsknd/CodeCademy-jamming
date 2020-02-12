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
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.clearPlayList = this.clearPlayList.bind(this);
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
  removeTrack(track) {
    const freshTracks = this.state.playlistTracks.filter(existingTrack => {
      return existingTrack.id !== track.id
    });
    this.setState({ playListTracks: freshTracks });
  }
  updatePlaylistName(newName) {
    this.setState({playlistName: newName});
  }
  savePlaylist() {
    const tracksToSave = this.state.playlistTracks.map(track => track.uri);
    const playListName = this.state.playlistName;
    Spotify.storePlayList(tracksTosave, playlistName, this.clearPlaylist);
  }
  clearPlaylist() {
    this.setState({
      playlistName: '',
      playlistTracks = []
    })
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
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
