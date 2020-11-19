import React, { Component } from 'react';
class Search extends Component {
    token = null;
    state = {
      query: "",
      people: []
    };
  
    onChange = e => {
      const { value } = e.target;
      this.setState({
        query: value
      });
       this.search(value);
    };
  
    search = query => {
      const url = `http://localhost:8080//learn/searchByWord?englishWord=${query}`;
      const token = {};
      this.token = token;
  
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ people: data}));
    }
    componentDidMount() {
    //   this.search("");
    }
  
    render() {
      return (
        <form>
          <input
            type="text"
            className="search-box"
            placeholder="Search for..."
            onChange={this.onChange}
          />
          {this.state.people.map(person => (
            <ul key={person.dictionaryId}>
              <li>{person.englishWord}</li>
            </ul>
          ))}
        </form>
      );
    }
  }

  export default Search;