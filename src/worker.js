let playerList = [];
let tableList = [];
let totalRounds = 0;
let totalPlayers = 0;
let tableDetails = [];
let options = {};
let algorithmChoice = '';
let algorithmDetails = {};

export function runOrganizer(userInput) {
  initializeData(userInput);
  return runAlgorithm();
}

function initializeData(userInput) {
  totalRounds = userInput.totalRounds;
  totalPlayers = userInput.totalPlayers;
  tableDetails = userInput.tables;
  options = {
    kidsTable: userInput.kidsTable,
    changePeople: userInput.changePeople,
    changeTables: userInput.changeTables
  };
  playerList = getEmptyPlayerList();
  tableList = getEmptyTableList();
  algorithmChoice = userInput.algorithmChoice;
  algorithmDetails = {
    numTimesToRun: userInput.numTimesToRun,
    maxPlayedWithAllowed: userInput.maxPlayedWithAllowed,
    maxAveragePlayedWithAllowed: userInput.maxAveragePlayedWithAllowed,
    minUniqueTablesAllowed: userInput.minUniqueTablesAllowed,
    maxRuns: userInput.maxRuns
  };
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
function runAlgorithm() {
  // Reset data between rounds
  tableList = getEmptyTableList();

  // Start by randomly sorting lists
  playerList.sort(function(a, b){return 0.5 - Math.random()});
  tableList.sort(function(a, b){return 0.5 - Math.random()});

  // Different Run Options
  let result;
  switch (algorithmChoice) {
    case 'runRandomXTimes':
      result = runRandomXTimes(algorithmDetails.numTimesToRun); // 500 is a good number
      break;
    case 'runUntilConstraints':
      result = runUntilConstraints();
      break;
    default:
      result = runRandomXTimes(algorithmDetails.numTimesToRun); // 500 is a good number
      break;
  }
  console.log('RESULT', result);
  return result;
}

// todo add max times to run
function runUntilConstraints() {
  let constraintsMet = false;
  let result = {
    playerList: [],
    maxPlayedWithCount: 100,
    averageMaxPlayedWithCount: 100,
    minUniqueTablesVisited: 0
  };
  let runCount = 0;
  while (!constraintsMet && (runCount < algorithmDetails.maxRuns)) {
    result = runRandomAndChooseBest(result);
    constraintsMet = checkConstraints(result);
    runCount++;
  }
  return result;
}

function checkConstraints(result) {
  const {maxPlayedWithAllowed, maxAveragePlayedWithAllowed, minUniqueTablesAllowed} = algorithmDetails;
  const maxPlayedWithCount = getMaxPlayedWithCount(result.playerList);
  const averageMaxPlayedWithCount = getAverageMaxPlayedWithCount(result.playerList);
  const minUniqueTablesVisited = getMinUniqueTablesVisited(result.playerList);
  const constraintsMet =
    maxPlayedWithCount <= maxPlayedWithAllowed
    && averageMaxPlayedWithCount <= maxAveragePlayedWithAllowed
    && minUniqueTablesVisited >= minUniqueTablesAllowed;
  return constraintsMet;
}

function runRandomAndChooseBest(currentBestRun) {
  // Reset data between runs
  resetRunData();

  const resultPlayerList = chooseRandomly(totalRounds);//returns a cloned version of the global playerList

  // Replace result if better
  return compareResults(resultPlayerList, currentBestRun);
}

function runRandomXTimes(numRuns) {
  let bestRun = {
    playerList: [],
    maxPlayedWithCount: 100,
    averageMaxPlayedWithCount: 100,
    minUniqueTablesVisited: 0
  };
  for (var i = 0; i < numRuns; i++) {
    bestRun = runRandomAndChooseBest(bestRun);
  }
  return bestRun;
}

function average(list) {
  return list.reduce((a,b) => b+=a) / list.length;
}

function getMinUniqueTablesVisited(resultPlayerList) {
  // minimum number of unique tables visited - to help with the changeTables constraint
  // calculated by creating an array of unique tables for each player, getting the lengths of those lists , then finding the minimum value among the players
  return Math.min(...[...new Set(resultPlayerList.map(
    (player) => [...new Set(player.assignedTables)].length))]);
}

function getMaxPlayedWithCount(resultPlayerList) {
  // max times anyone played with anyone else
  // calculated by finding the max playedWith count for each player then taking the max of those values
  return Math.max(...resultPlayerList.map(
    (player) => Math.max(...player.playedWith)
  ));
}

function getAverageMaxPlayedWithCount(resultPlayerList) {
  // average of max times everyone played with a specific person
  // calculated by finding the maxPlayedWithCount for each player and then taking the average of those values
  return average(resultPlayerList.map(
    (player) => Math.max(...player.playedWith)
  ));
}

function compareResults(resultPlayerList, bestRun) {
  const minUniqueTablesVisited = getMinUniqueTablesVisited(resultPlayerList);
  const maxPlayedWithCount = getMaxPlayedWithCount(resultPlayerList);
  const averageMaxPlayedWithCount = getAverageMaxPlayedWithCount(resultPlayerList);
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
