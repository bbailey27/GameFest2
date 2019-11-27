import React, { Component } from 'react';
import './App.css';
import DataEntry from './Components/DataEntry.jsx';
import Results from './Components/Results.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleResultReady = this.handleResultReady.bind(this);
    this.handleTablesReady = this.handleTablesReady.bind(this);

    this.state = {
      result: {
        playerList: [],
        maxPlayedWithCount: 0,
        averagePlayedWithCount: 0,
        minUniqueTablesVisited: 0
      }
    }
  }

  handleResultReady = (result) => {
    this.setState({
      result: result
    });
  }

  handleTablesReady = (tables) => {
    this.setState({
      tables: tables
    });
  }

  render() {
    return (
      <div className='App'>
        <h1>GameFest</h1>
        <div className='App-body'>
          <div className='left-pane'>
            <DataEntry
              handleResultReady={this.handleResultReady}
              handleTablesReady={this.handleTablesReady}/>
          </div>
          <div className='right-pane'>
            <Results
              result={this.state.result}
              tables={this.state.tables}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
