import React, { Component } from 'react';
import Options from './Options.jsx';
import Details from './Details.jsx';
import Tables from './Tables.jsx';
import { runOrganizer } from '../worker.js';

class DataEntry extends Component {
  constructor(props) {
    super(props);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleNumPlayersChange = this.handleNumPlayersChange.bind(this);
    this.handleNumRoundsChange = this.handleNumRoundsChange.bind(this);
    this.handleNumKidsChange = this.handleNumKidsChange.bind(this);
    this.handleTablesChange = this.handleTablesChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {//TODO put back to normal
      options: ['changePeople', 'changeTables'],
      totalPlayers: 42,
      // totalPlayers: 10,
      totalRounds: 4,
      totalKids: 0,
      // tables: [
      //     {
      //       id: 1,
      //       name: 'Table 1',
      //       size: 2
      //     },
      //     {
      //       id: 2,
      //       name: 'Table 2',
      //       size: 2
      //     },
      //     {
      //       id: 3,
      //       name: 'Table 3',
      //       size: 3
      //     },
      //     {
      //       id: 4,
      //       name: 'Table 4',
      //       size: 3
      //     },
      // ],
      tables: [
        {
          id: 1,
          name: 'Table 1',
          size: 4
        },
        {
          id: 2,
          name: 'Table 2',
          size: 4
        },
        {
          id: 3,
          name: 'Table 3',
          size: 4
        },
        {
          id: 4,
          name: 'Table 4',
          size: 6
        },
        {
          id: 5,
          name: 'Table 5',
          size: 6
        },
        {
          id: 6,
          name: 'Table 6',
          size: 6
        },
        {
          id: 7,
          name: 'Table 7',
          size: 6
        },
        {
          id: 8,
          name: 'Table 8',
          size: 6
        }
      ],
      result: {}
    };
  }
//TODO add games list to table object
//TODO handle other options
  handleOptionsChange = (newOptions) => {
    this.setState({
      options: newOptions
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

  handleNumKidsChange = (e) => {
    this.setState({
      totalKids: parseInt(e.target.value) ? parseInt(e.target.value) : 0
    });
  }

  handleTablesChange = (newTables) => {
    this.setState({
      tables: newTables
    });
  }

  handleClearForm = (e) => {
    e.preventDefault();
    this.setState({
      options: ['changePeople'],
      totalPlayers: 0,
      totalRounds: 0,
      totalKids: 0,
      tables: [{
        id: 1,
        name: 'Table 1',
        size: 4
      }],
      result: {}
    });
  }

  handleFormSubmit = (e) => {
  e.preventDefault();

  const formPayload = {
    changePeople: this.state.options.includes('changePeople'),
    changeTables: this.state.options.includes('changeTables'),
    kidsTable: this.state.options.includes('kidsTable'),
    totalPlayers: this.state.totalPlayers,
    totalRounds: this.state.totalRounds,
    totalKids: this.state.options.includes('kidsTable') ? this.state.totalKids : 0,
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
    // this.handleClearForm(e);
    this.props.handleTablesReady(this.state.tables);
    this.props.handleResultReady(result);
  }
}

  render() {
    const {options, totalPlayers, totalRounds, totalKids, tables} = this.state;
    return (
      <div>
        <h2>Enter Your Data</h2>
        <Options
          options={options}
          onOptionsChange={this.handleOptionsChange} />
        <Details
          isKidsTable={options.includes('kidsTable') ? true : false}
          totalPlayers={totalPlayers}
          totalRounds={totalRounds}
          totalKids={totalKids}
          handleNumPlayersChange={this.handleNumPlayersChange}
          handleNumRoundsChange={this.handleNumRoundsChange}
          handleNumKidsChange={this.handleNumKidsChange} />
        <Tables
          tables={tables}
          handleTablesChange={this.handleTablesChange}/>
        <button type='submit' className='button' onClick={this.handleFormSubmit}>Done</button>
      </div>
    );
  }
}
//TODO on form submit, convert options to booleans
//TODO render tables without isKidsTable option for now
//TODO consider mimicing excel and optimizing after randomness not during picking
/*TODO add Configuration and Constraints middle pane or bottom section:
* Runtime options: run once, get the best of x number of times, or maybe run until the conditions are met (with a max/timeout returning the best so far?)
* Constraints: conditions to define best (e.g. no playedWithCount over 3, minimize all playedWithCounts, no stayAtTableCount over 2)
*/
export default DataEntry;
