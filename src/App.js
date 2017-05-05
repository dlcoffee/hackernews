import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function isSearched(term) {
  return function(item) {
    return !term || item.title.toLowerCase().includes(term.toLowerCase());
  };
}

class Search extends Component {
  render() {
    const { value, onChange, children } = this.props;

    return (
      <form>
        {children} <input type="text" value={value} onChange={onChange}/>
      </form>
    );
  }
}

class Button extends Component {
  render() {
    const {
      onClick,
      className = "",
      children,
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;

    return (
      <div>
        { list.filter(isSearched(pattern)).map(item =>
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <Button onClick={() => onDismiss(item.objectID)}>
                  Dismiss
                </Button>
              </span>
            </div>
          )
        }
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: '',
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    function isNotId(item) {
      return item.objectID !== id;
    };

    let updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    const { searchTerm, list } = this.state;

    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}>
          Search
        </Search>

        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default App;
