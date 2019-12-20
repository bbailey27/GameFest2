import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleInput from './Subcomponents/SingleInput';

class Tables extends Component {
  static propTypes = {
    tables: PropTypes.array.isRequired,
    handleTablesChange: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.handleTableNameChange = this.handleTableNameChange.bind(this);
    this.handleTableSizeChange = this.handleTableSizeChange.bind(this);
    this.handleTableGamesChange = this.handleTableGamesChange.bind(this);
    this.addTableRow = this.addTableRow.bind(this);
    this.removeTable = this.removeTable.bind(this);
}

  handleTableNameChange(e) {
    const {tables, handleTablesChange} = this.props;
    const changedTableValue = e.target.value;
    const changedTableId = parseInt(e.target.parentNode.parentNode.id);
    const newTables = tables.map(table => {
      if(table.id === changedTableId) {
        return {...table, name: changedTableValue};
      }
      return table;
    });
    handleTablesChange(newTables);
  }

  handleTableSizeChange(e) {
    const {tables, handleTablesChange} = this.props;
    const changedTableValue = parseInt(e.target.value) ? parseInt(e.target.value) : 0;
    const changedTableId = parseInt(e.target.parentNode.parentNode.id);
    const newTables = tables.map(table => {
      if(table.id === changedTableId) {
        return {...table, size: changedTableValue};
      }
      return table;
    });
    handleTablesChange(newTables);
  }

  handleTableGamesChange(e) {
    const {tables, handleTablesChange} = this.props;
    const changedTableValue = e.target.value;
    const newGameList = changedTableValue.split(',');
    const changedTableId = parseInt(e.target.parentNode.parentNode.id);
    const newTables = tables.map(table => {
      if(table.id === changedTableId) {
        return {...table, games: newGameList};
      }
      return table;
    });
    handleTablesChange(newTables);
  }

  removeTable(e) {
    const {tables, handleTablesChange} = this.props;
    const removedTableId = parseInt(e.target.parentNode.id);
    const newTables = tables.filter(table => table.id !== removedTableId)
    handleTablesChange(newTables);
  }

  addTableRow() {
    const {tables, handleTablesChange} = this.props;
    const newTableNum = tables.length + 1;//TODO handle removed tables causing repeat values
    const tableName = 'Table ' + newTableNum;
    const newTables = tables.concat({
      id: newTableNum,
      name: tableName,
      size: 4,
      games: []
    })
    handleTablesChange(newTables);
  }

  renderTableRows() {
    const {tables} = this.props;
    return (
        <ol className='table-list'>
          {tables.map(table => this.renderTableRow(table))}
        </ol>
    );
  }

  renderTableRow(table) {
    return (
      <li key={table.id} id={table.id} className='table-row'>
        <SingleInput
          inputType='text'
          title='Name: '
          name='tableName'
          controlFunc={this.handleTableNameChange}
          content={table.name}
          />
        <SingleInput
          inputType='number'
          title='Size: '
          name='tableSize'
          controlFunc={this.handleTableSizeChange}
          content={table.size}
          />
        <SingleInput
          inputType='text'
          classNames='game-input'
          title='Games: '
          name='tableGames'
          controlFunc={this.handleTableGamesChange}
          content={table.games.toString()}
          />
        <button type='button' className='remove-button' onClick={this.removeTable}>X</button>
      </li>
    );
  }

  render() {
    return (
      <div className='tables'>
        <h3>Tables</h3>
        <p style={{padding:'0 1rem', marginTop: 0}}>Please enter a comma-separated list of games, with the same number of games as rounds</p>
        {this.renderTableRows()}
        <button type='button' className='button' onClick={this.addTableRow}>Add Table</button>
      </div>
    );
  }

}
export default Tables;
