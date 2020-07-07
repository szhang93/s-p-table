import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './Table'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>S&P 500 Total Returns by Year</h2>
        </div>
        <Table />
      </div>
    );
  }
}

export default App;
