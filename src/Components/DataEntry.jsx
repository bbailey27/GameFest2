import React, { Component } from 'react';
import Options from './Options';
import Details from './Details';
import Algorithms from './Algorithms';
import Tables from './Tables';
import StatefulButton from './Subcomponents/StatefulButton';
import { runOrganizer } from '../worker';

const defaultData = {
  firstRun: true,
  options: {
    changePeople: false,
    changeTables: false,
  },
  totalPlayers: 20,
  totalRounds: 4,
  algorithmChoice: 'runRandomXTimes',
  numTimesToRun: 500,
  maxPlayedWithAllowed: 4,
  maxAveragePlayedWithAllowed: 4,
  minUniqueTablesAllowed: 1,
  minAverageUniqueTablesAllowed: 1,
  maxRuns: 50000,
  tables: [
      {
        id: 1,
        name: 'Table 1',
        size: 4,
        games: []
      },
      {
        id: 2,
        name: 'Table 2',
        size: 4,
        games: []
      },
      {
        id: 3,
        name: 'Table 3',
        size: 3,
        games: []
      },
      {
        id: 4,
        name: 'Table 4',
        size: 3,
        games: []
      },
      {
        id: 5,
        name: 'Table 5',
        size: 6,
        games: []
      },
  ],
  result: {}
};

class DataEntry extends Component {
  constructor(props) {
    super(props);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleNumPlayersChange = this.handleNumPlayersChange.bind(this);
    this.handleNumRoundsChange = this.handleNumRoundsChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
    this.handleTablesChange = this.handleTablesChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = JSON.parse(JSON.stringify(defaultData));
  }

  handleOptionsChange = (option, value) => {
    this.setState({
      options: {
        ...this.state.options,
        [option]: value
      }
    });
  }

  handleNumPlayersChange = (e) => {
    this.setState({
      totalPlayers: parseInt(e.target.value) ? parseInt(e.target.value) : 0
    });
  }

  handleNumRoundsChange = (e) => {
    this.setState({
      totalRounds: parseInt(e.target.value) ? parseInt(e.target.value) : 0
    });
  }

  handleNumberChange = (e, property) => {
    this.setState({
      [property]: parseInt(e.target.value) ? parseInt(e.target.value) : 0
    });
  }

  handleAlgorithmChange = (newAlgo) => {
    this.setState({
      algorithmChoice: newAlgo
    });
  }

  handleTablesChange = (newTables) => {
    this.setState({
      tables: newTables
    });
  }

  handleClearForm = (e) => {
    e.preventDefault();
    this.setState(JSON.parse(JSON.stringify(defaultData)));
  }

  handleFormSubmit = (e) => {
  e.preventDefault();

  const formPayload = {
    options: this.state.options,
    totalPlayers: this.state.totalPlayers,
    totalRounds: this.state.totalRounds,
    algorithmChoice: this.state.algorithmChoice,
    numTimesToRun: this.state.numTimesToRun,
    maxPlayedWithAllowed: this.state.maxPlayedWithAllowed,
    maxAveragePlayedWithAllowed: this.state.maxAveragePlayedWithAllowed,
    minUniqueTablesAllowed: this.state.minUniqueTablesAllowed,
    minAverageUniqueTablesAllowed: this.state.minAverageUniqueTablesAllowed,
    maxRuns: this.state.maxRuns,
    numTables: this.state.tables.length,
    tables: this.state.tables
  };

  console.log('Send this in a POST request:', formPayload);
  const totalTableSpots = formPayload.tables.reduce(function(a, b) {
        return a + b.size;
    }, 0);
  if (formPayload.totalPlayers !== totalTableSpots) {
    throw new Error('Number of players must match number of table spots');
  } else {
    let result = runOrganizer(formPayload);
    this.props.handleTablesReady(this.state.tables);
    this.props.handleResultReady(result);
    this.setState({firstRun: false});
  }
}
// TODO change to across the top to have more room for table data entry
  render() {
    const {
      options,
      totalPlayers,
      totalRounds,
      algorithmChoice,
      numTimesToRun,
      maxPlayedWithAllowed,
      maxAveragePlayedWithAllowed,
      minUniqueTablesAllowed,
      minAverageUniqueTablesAllowed,
      maxRuns,
      tables} = this.state;
    return (
      <div className='column'>
        <h2 className='heading'>Enter Your Data</h2>
        <div className='data-entry-section-with-subsections'>
          <Options
            className='data-entry-subsection'
            options={options}
            handleOptionsChange={this.handleOptionsChange} />
          <Details
            className='data-entry-subsection'
            totalPlayers={totalPlayers}
            totalRounds={totalRounds}
            handleNumPlayersChange={this.handleNumPlayersChange}
            handleNumRoundsChange={this.handleNumRoundsChange} />
        </div>
        <Algorithms
          algorithmChoice={algorithmChoice}
          totalRounds={totalRounds}
          options={options}
          numTimesToRun={numTimesToRun}
          maxPlayedWithAllowed={maxPlayedWithAllowed}
          maxAveragePlayedWithAllowed={maxAveragePlayedWithAllowed}
          minUniqueTablesAllowed={minUniqueTablesAllowed}
          minAverageUniqueTablesAllowed={minAverageUniqueTablesAllowed}
          maxRuns={maxRuns}
          handleAlgorithmChange={this.handleAlgorithmChange}
          handleNumberChange={this.handleNumberChange} />
        <Tables
          className='data-entry-section'
          tables={tables}
          handleTablesChange={this.handleTablesChange}/>
        <button type='submit' className='button run-button' onClick={this.handleFormSubmit}>{this.state.firstRun ? 'Run': 'Run Again'}</button>
        <button className='button' onClick={this.handleClearForm}>Clear Form</button>
      </div>
    );
  }
}

export default DataEntry;
