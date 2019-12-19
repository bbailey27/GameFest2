import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.renderPlayerRow = this.renderPlayerRow.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  renderPlayerRow(player) {
    return (
      <li key={player.id}>
        <p>Player {player.id + 1}:</p>
        <ol>
          {player.assignedTables.map((tableId, index) => this.renderTableRow(player.id, index, tableId))}
        </ol>
      </li>
    );
  }

  renderTableRow(playerId, tableIndex, tableId) {
    const tableDetails = this.props.tables.find(t => t.id === tableId);
    return (<li key={playerId + '-' + tableIndex}>{tableDetails.name} ({tableDetails.size})</li>);
  }

  renderPlayedWith(playedWithList) {
    return playedWithList.map(player => (<li>{player.id} {player.playedWithCount}</li>));
  }

  render() {
    const {result} = this.props;
    console.log(result);
    return (
      <div>
        <h2>Results</h2>
        <p>Max of Everyone's Max Times Played With Someone: {result.maxPlayedWithCount}</p>
        <p>Average of Everyone's Max Times Played With Someone: {Math.round(result.averageMaxPlayedWithCount * 100) / 100}</p>
        <p>Minimum Number of Unique Tables Visited: {result.minUniqueTablesVisited}</p>
        <ol>
          {result.playerList.length > 0 &&
            result.playerList.sort((a,b) => a.id-b.id).map(player => this.renderPlayerRow(player))}
        </ol>
      </div>
    );

  }
}

export default Results;
