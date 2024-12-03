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
  options = userInput.options;
  playerList = getEmptyPlayerList();
  tableList = getEmptyTableList();
  algorithmChoice = userInput.algorithmChoice;
  algorithmDetails = {
    numTimesToRun: userInput.numTimesToRun,
    maxPlayedWithCount: userInput.maxPlayedWithAllowed,
    averageMaxPlayedWithCount: userInput.maxAveragePlayedWithAllowed,
    minUniqueTablesVisited: userInput.minUniqueTablesAllowed,
    averageUniqueTablesVisited: userInput.minAverageUniqueTablesAllowed,
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
    case 'runRandomNTimes':
      result = runRandomNTimes(algorithmDetails.numTimesToRun); // 500 is a good number
      break;
    case 'runUntilConstraints':
        result = runRandomNTimes(algorithmDetails.maxRuns);
        break;
    default:
      result = runRandomNTimes(algorithmDetails.numTimesToRun); // 500 is a good number
      break;
  }
  console.log('RESULT', result);
  return result;
}


function runRandomAndChooseBest(currentBestRun) {
  // Reset data between runs
  resetRunData();

  const resultPlayerList = chooseRandomly(totalRounds);//returns a deep copy of the global playerList
  const resultStats = getResultStats(resultPlayerList);

  // Replace result if better
  return compareResults({playerList: resultPlayerList, ...resultStats}, currentBestRun);
}

function runRandomNTimes(numRuns) {
  let bestRun = {
    playerList: [],
    maxPlayedWithCount: 100,
    averageMaxPlayedWithCount: 100,
    minUniqueTablesVisited: 0,
    averageUniqueTablesVisited: 0,
  };
  for (var i = 0; i < numRuns; i++) {
    const {result, better} = runRandomAndChooseBest(bestRun);
    bestRun = result;
    if (algorithmChoice === 'runUntilConstraints' && better) {
      // If constraints were provided, compare the new result to the constraints and break early if they've been met
      if (compareResults(result, algorithmDetails).better) {
        break;
      }
    }
  }
  return bestRun;
}

function average(list) {
  return list.reduce((a,b) => b+=a) / list.length;
  // return Math.round(average * 10) / 10; //Can round this value to make it less important in the comparison
}

function getMinUniqueTablesVisited(minUniqueTablesVisitedPerPlayer) {
  // minimum number of unique tables visited - to help with the changeTables constraint
  // calculated by finding the minimum value among the players
  return Math.min(...minUniqueTablesVisitedPerPlayer);
}

function getAverageUniqueTablesVisitedCount(minUniqueTablesVisitedPerPlayer) {
  // average of max times everyone played with a specific person
  // calculated by finding the maxPlayedWithCount for each player and then taking the average of those values
  return average(minUniqueTablesVisitedPerPlayer);
}

function getMaxPlayedWithCount(maxPlayedWithCountsPerPlayer) {
  // max times anyone played with anyone else
  // calculated by finding the max playedWith count for each player then taking the max of those values
  return Math.max(...maxPlayedWithCountsPerPlayer);
}

function getAverageMaxPlayedWithCount(maxPlayedWithCountsPerPlayer) {
  // average of max times everyone played with a specific person
  // calculated by finding the maxPlayedWithCount for each player and then taking the average of those values
  return average(maxPlayedWithCountsPerPlayer);
}

function getResultStats(resultPlayerList) {
  const maxPlayedWithCountsPerPlayer = resultPlayerList.map((player) => Math.max(...player.playedWith));
  const maxPlayedWithCount = getMaxPlayedWithCount(maxPlayedWithCountsPerPlayer);
  const averageMaxPlayedWithCount = getAverageMaxPlayedWithCount(maxPlayedWithCountsPerPlayer);

  const minUniqueTablesVisitedPerPlayer = resultPlayerList.map(player => player.uniqueTables);
  const minUniqueTablesVisited = getMinUniqueTablesVisited(minUniqueTablesVisitedPerPlayer);
  const averageUniqueTablesVisited = getAverageUniqueTablesVisitedCount(minUniqueTablesVisitedPerPlayer);
  return {
    maxPlayedWithCount,
    averageMaxPlayedWithCount,
    minUniqueTablesVisited,
    averageUniqueTablesVisited
  }
}

// Compare a new result's stats to the current best run or the algorithm constraints
function compareResults(newResult, comparisonStats) {
  const maxPlayedWithCountCheck = options.changePeople ? (newResult.maxPlayedWithCount <= comparisonStats.maxPlayedWithCount) : true;
  const averageMaxPlayedWithCountCheck = options.changePeople ? (newResult.averageMaxPlayedWithCount <= comparisonStats.averageMaxPlayedWithCount) : true;
  const minUniqueTablesVisitedCheck = options.changeTables ? (newResult.minUniqueTablesVisited >= comparisonStats.minUniqueTablesVisited) : true;
  const averageUniqueTablesVisitedCheck = options.changeTables ? (newResult.averageUniqueTablesVisited >= comparisonStats.averageUniqueTablesVisited) : true;

  const isNewResultBetter = maxPlayedWithCountCheck && averageMaxPlayedWithCountCheck && minUniqueTablesVisitedCheck && averageUniqueTablesVisitedCheck;
  return {
    result: isNewResultBetter ? JSON.parse(JSON.stringify(newResult)) : JSON.parse(JSON.stringify(comparisonStats)),
    better: isNewResultBetter
  };
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
    // Mark who's playing with each other
    tableChoice.currentPlayers.forEach((playerAtTable) => {
      // increment player.playedWith counts for each player at this table
      player.playedWith[playerAtTable.id]++;
      // increment other players in currentPlayers playedWith counts using index/player.id
      playerAtTable.playedWith[player.id]++;
    });

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
  })
}
