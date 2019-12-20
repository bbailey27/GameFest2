let playerList = [];
let tableList = [];
let totalRounds = 0;
let totalPlayers = 0;
let tableDetails = [];
let options = {};

export function runOrganizer(userInput) {
  initializeData(userInput);
  return runAlgorithm(userInput.totalRounds);
}

function initializeData(userInput) {
  totalRounds = userInput.totalRounds;
  totalPlayers = userInput.totalPlayers;
  tableDetails = userInput.tables;
  options = {
    kidsTable: userInput.kidsTable,
    changePeople: userInput.changePeople,
    changeTables: userInput.changeTables
  }
  playerList = getEmptyPlayerList();
  tableList = getEmptyTableList();
}

function getEmptyPlayerList() {
  let newPlayerList = [];
  for (var i=0; i<totalPlayers; i++) {
    const emptyPlayer = {
      id: i,
      assignedTables: [],
      uniqueTables: 0,
      playedWithCount: 0,
      playedWith: new Array(totalPlayers).fill(0,0)//used as a dictionary to map other player IDs to playedWithCounts
    }
    newPlayerList.push(JSON.parse(JSON.stringify(emptyPlayer)));
  }
  return JSON.parse(JSON.stringify(newPlayerList));
}

function getEmptyTableList() {
  const newTableList = tableDetails.map(function(table) { return {...table, currentPlayers: [], isFull: false}});
  return JSON.parse(JSON.stringify(newTableList));
}

function resetRunData() {
  tableList = getEmptyTableList();
  playerList = getEmptyPlayerList();
}

// Randomly pick for each round then chose the best overall run
function runAlgorithm(rounds) {
  // Reset data between rounds
  tableList = getEmptyTableList();

  // Start by randomly sorting lists
  playerList.sort(function(a, b){return 0.5 - Math.random()});
  tableList.sort(function(a, b){return 0.5 - Math.random()});

  //Different Run Options
  const result = runRandomXTimes(500, totalRounds); // 500 is a good number
  console.log('RESULT', result);
  return result;
}

function runRandomXTimes(numRuns, numRounds) {
  let bestRun = {
    playerList: [],
    maxPlayedWithCount: 100,
    averageMaxPlayedWithCount: 100,
    minUniqueTablesVisited: 0
  };
  for (var i = 0; i < numRuns; i++) {
    // Reset data between runs
    resetRunData();
    let resultPlayerList = [];
    let maxPlayedWithCount = 100;
    let averageMaxPlayedWithCount = 100;
    let minUniqueTablesVisited = 0;

    resultPlayerList = chooseRandomly(numRounds);//returns a cloned version of the global playerList
    // minimum number of unique tables visited - to help with the changeTables constraint
    // calculated by creating an array of unique tables for each player, getting the lengths of those lists , then finding the minimum value among the players
    minUniqueTablesVisited = Math.min(...[...new Set(resultPlayerList.map(
      (player) => [...new Set(player.assignedTables)].length))]);
    // max times anyone played with anyone else
    // calculated by finding the max playedWith count for each player then taking the max of those values
    maxPlayedWithCount = Math.max(...resultPlayerList.map(
      (player) => Math.max(...player.playedWith)
    ));
    // average of max times everyone played with a specific person
    // calculated by finding the maxPlayedWithCount for each player and then taking the average of those values
    averageMaxPlayedWithCount = average(resultPlayerList.map(
      (player) => Math.max(...player.playedWith)
    ));

    // Replace result if better
    bestRun = compareResults(resultPlayerList, minUniqueTablesVisited, maxPlayedWithCount, averageMaxPlayedWithCount, bestRun);
  }
  return bestRun;
}

function average(list) {
  return list.reduce((a,b) => b+=a) / list.length;
}

function compareResults(resultPlayerList, minUniqueTablesVisited, maxPlayedWithCount, averageMaxPlayedWithCount, bestRun) {
  const maxPlayedWithCountCheck = options.changePeople ? (maxPlayedWithCount <= bestRun.maxPlayedWithCount) : true;
  const averageMaxPlayedWithCountCheck = options.changePeople ? (averageMaxPlayedWithCount <= bestRun.averageMaxPlayedWithCount) : true;
  const minUniqueTablesVisitedCheck = options.changeTables ? (minUniqueTablesVisited > bestRun.minUniqueTablesVisited) : true;
  const isNewResultBetter = maxPlayedWithCountCheck && averageMaxPlayedWithCountCheck && minUniqueTablesVisitedCheck;
  if (isNewResultBetter) {
    return {
      playerList: resultPlayerList,
      maxPlayedWithCount: maxPlayedWithCount,
      averageMaxPlayedWithCount: averageMaxPlayedWithCount,
      minUniqueTablesVisited: minUniqueTablesVisited
    }
  } else {
    return bestRun;
  }
}

function chooseRandomly(numRounds) {
  for (var i = 0; i < numRounds; i++) {
    // Reset data between rounds
    tableList.forEach(table => {
      table.isFull = false;
      table.currentPlayers = [];
    });

    // Start by randomly sorting lists
    playerList.sort(function(a, b){return 0.5 - Math.random()});
    tableList.sort(function(a, b){return 0.5 - Math.random()});

    // Have each player (random order) find a not-full table (random order)
    joinRandomTable();
  }
  return JSON.parse(JSON.stringify(playerList));
}

function joinRandomTable() {
  playerList.forEach(function(player) {
    //Chose the first table that's not full
    const tableChoice = tableList.find(table => !table.isFull);
    // Add table to player's list and increment unique count
    if (!(player.assignedTables.includes(tableChoice.id))) {
      player.uniqueTables++;
    }
    player.assignedTables.push(tableChoice.id);
    // Add player to table's current players
    tableChoice.currentPlayers.push(player);
    // Mark if the table is full
    if (tableChoice.currentPlayers.length === tableChoice.size) {
      tableChoice.isFull = true;
    }
    // Mark who's playing with each other
    tableChoice.currentPlayers.forEach(function(playerAtTable) {
      if (player.id !== playerAtTable.id) {
        // increment player.playedWith counts for each player at this table
        player.playedWith[playerAtTable.id]++;
        // increment other players in currentPlayers playedWith counts using index/player.id
        playerAtTable.playedWith[player.id]++;
        // increment overall playedWithCount even though it's not used in this algorithm
        player.playedWithCount++;
      }
    });
  })
}
