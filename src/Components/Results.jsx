import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.renderPlayerRow = this.renderPlayerRow.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  download = () => {
    const formattedData = this.formatData(this.props.result.playerList.sort((a,b) => a.id-b.id));
    const encodedData = btoa(formattedData);
    const dataURL = `data:text/octet-stream;base64,${encodedData}`;
    const a = document.createElement("a");
    a.href = dataURL;
    a.setAttribute("download", "gamefest.txt");
    a.click();
  };

  toBijective = n => (n > 26 ? this.toBijective(Math.floor((n - 1) / 26)) : "") + ((n % 26 || 26) + 9).toString(36).toUpperCase();

  formatData = (data) => {
    let formattedData = "";
    data.forEach((player) => {
      const playerTitle = `Player ${this.toBijective(player.id+1)}`;
      let tableData = "";
      player.assignedTables.forEach((tableId, index) => {
        const tableDetails = this.props.tables.find(t => t.id === tableId);
        const tableGame = tableDetails.games[index] && tableDetails.games[index].trim();
        tableData += `Round ${index+1}: ${tableDetails.name}${tableGame ? ` - ${tableGame}` : ''}\n`;
      });
      formattedData += `${playerTitle}\n${tableData}\n\n`;
    });
    return formattedData;
  };

  renderPlayerRow(player) {
    return (
      <li key={player.id} className='result-list-item'>
        <p>Player {player.id + 1}:</p>
        <ol>
          {player.assignedTables.map((tableId, index) => this.renderTableRow(player.id, index, tableId))}
        </ol>
      </li>
    );
  }

  renderTableRow(playerId, tableIndex, tableId) {
    const tableDetails = this.props.tables.find(t => t.id === tableId);
    return (<li key={playerId + '-' + tableIndex} className='result-list-table'>{tableDetails.name} ({tableDetails.size})</li>);
  }

  renderPlayedWith(playedWithList) {
    return playedWithList.map(player => (<li>{player.id} {player.playedWithCount}</li>));
  }

  render() {
    const {result} = this.props;
    return (
      <div className='results'>
        <h2 className='heading'>Results</h2>
        <p>Max times seeing the same person: {result.maxPlayedWithCount}</p>
        <p>Average of everyone's max times seeing one person: {Math.round(result.averageMaxPlayedWithCount * 100) / 100}</p>
        <p>Minimum unique tables visited: {result.minUniqueTablesVisited}</p>
        <p>Average unique tables visited: {Math.round(result.averageUniqueTablesVisited * 100) / 100}</p>
        <button onClick={() => this.download()} className='download-button'>Download This Result</button>
        <ol className='result-list'>
          {result.playerList.length > 0 &&
            result.playerList.sort((a,b) => a.id-b.id).map(player => this.renderPlayerRow(player))}
        </ol>
      </div>
    );

  }
}

export default Results;
