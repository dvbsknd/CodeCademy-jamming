import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.searchResults = [];
    this.state.playlistName = 'New Playlist';
    this.state.playlistTracks = [{ id: 1, name: 'Test', artist: 'Britnay', album: 'Oops, MF', uri: 'spotify://track1029u32/'}];
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.clearPlaylist = this.clearPlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    const present = this.state.playlistTracks.find(savedTrack => {
      return savedTrack.id === track.id
    });
    if (!present) {
      const freshTracks = this.state.playlistTracks;
      freshTracks.push(track);
      this.setState({ playlistTracks: freshTracks });
      console.log('Track added to playlist:', track.name);
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
    // const tracksToSave = this.state.playlistTracks.map(track => track.uri);
    // const playlistName = this.state.playlistName;
    // Spotify.storePlayList(tracksTosave, playlistName, this.clearPlaylist);
  }
  clearPlaylist() {
    this.setState({
      playlistName: '',
      playlistTracks: []
    })
  }
  search(term) {
    Spotify.search(term)
      .then(result => {
        console.log('Search completed, returned results:', result.tracks.items.length);
        const tracks = result.tracks.items.map(trackdata => { 
          return {
            id: trackdata.id,
            name: trackdata.name,
            artist: trackdata.artists[0].name, 
            album: trackdata.album.name,
            uri: trackdata.uri
          }
        }
        );
        this.setState({ searchResults: tracks });
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName} 
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
