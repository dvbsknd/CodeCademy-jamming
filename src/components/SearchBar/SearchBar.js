import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
    this.handleClick = this.handleClick.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
  }
  updateTerm(e) {
    this.setState({ searchTerm: e.target.value });
  }
  handleClick(e) {
    this.props.onSearch(this.state.searchTerm);
  }
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.updateTerm} />
        <button className="SearchButton" onClick={this.handleClick}>SEARCH</button>
      </div>
    )
  }
}
