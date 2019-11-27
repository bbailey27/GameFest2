let playerList = [];
let tableList = [];
let totalRounds = 0;
let totalPlayers = 0;
let options = {};

export function runOrganizer(userInput) {
  initializeData(userInput);
  return runAlgorithm(userInput.totalRounds);
}

function initializeData(userInput) {
  totalRounds = userInput.totalRounds;
  totalPlayers = userInput.totalPlayers;
  options = {
    kidsTable: userInput.kidsTable,
    changePeople: userInput.changePeople,
    changeTables: userInput.changeTables
  }
  for (var i=0; i<userInput.totalPlayers; i++) {
    playerList.push({
      id: i,
      assignedTables: [],
      uniqueTables: 0,
      playedWithCount: 0,
      playedWith: new Array(userInput.totalPlayers).fill(0,0)//used as a dictionary to map other player IDs to playedWithCounts
    })
  }
  tableList = userInput.tables.map(function(table) { return {...table, currentPlayers: [], isFull: false}})
}

function resetRunData() {
  tableList.forEach(table => {
    table.isFull = false;
    table.currentPlayers = [];
  });
  playerList.forEach(player => {
    player.assignedTables = [];
    player.uniqueTables = 0;
    player.playedWithCount = 0;
    player.playedWith = new Array(totalPlayers).fill(0,0);//used as a dictionary to map other player IDs to playedWithCounts
  });
  // console.log('empty playerList', playerList);//TODO this doesn't seem to be empty
}

// Randomly pick for each round then chose the best overall run
function runAlgorithm(rounds) {
  // Reset data between rounds
  tableList.forEach(table => {
    table.isFull = false;
    table.currentPlayers = [];
  });

  // Start by randomly sorting lists
  playerList.sort(function(a, b){return 0.5 - Math.random()});
  tableList.sort(function(a, b){return 0.5 - Math.random()});

  //Different Run Options
  const result = runRandomXTimes(1000, totalRounds);
  console.log('RESULT', result);
  return result;
}

function runRandomXTimes(numRuns, numRounds) {
  let bestRun = {
    playerList: [],
    maxPlayedWithCount: 100,
    averagePlayedWithCount: 100,
    minUniqueTablesVisited: 0
  };
  for (var i = 0; i < numRuns; i++) {
    // Reset data between runs
    resetRunData();
    let resultPlayerList = [];
    let maxPlayedWithCount = 100;
    let averagePlayedWithCount = 100;
    let minUniqueTablesVisited = 0;

    resultPlayerList = chooseRandomly(numRounds);//returns a cloned version of the global playerList
    // minimum number of unique tables visited - to help with the changeTables constraint
    // calculated by creating an array of unique tables for each player, getting the lengths of those lists , then finding the minimum value among the players
    // minUniqueTablesVisited = Math.min(...[...new Set(resultPlayerList.map(
      // (player) => [...new Set(player.assignedTables)].length))]);

    // @Wilson ^this was the original line
    // all of the double checking and commented out calculating is trying to figure out which part of that line was producing inaccurate results
    // As bestRun below checks, runs with higher minUniqueTablesVisited counts are better - (e.g. person 1 staying at table 4 all night isn't great)
    // I think the maxPlayedWithCount works better but I've been distracted by this so I don't actually remember

    // It's hard to pinpoint examples with large data sets (and hard to reproduce the issue with smaller ones)
    // The list of player objects will have a few players who only visit 2 unique tables (e.g. 5,4,5,4)
    // But then any method of looping over/reducing that list to find those 2s doesn't seem to find them
    // Reducing to find the min or even to make a list of uniqueTableVisits won't have any 2s in it
    // But running the same code later to double check might get the real answer
    // My most recent attempts at fixes were to clone the player objects in case data is bleeding between runs or something

    minUniqueTablesVisited = Math.min(...resultPlayerList.map(p => p.uniqueTables));
    if (bestRun.minUniqueTablesVisited === 2 && minUniqueTablesVisited === 3) {
      console.log('new player list', resultPlayerList);//This list has 2s
      // let testValue = resultPlayerList.reduce(((min, p) => Math.min(min, p.uniqueTables)), resultPlayerList[0].uniqueTables);
      let testValue = resultPlayerList.reduce(((min, p) => p.uniqueTables < min ? p.uniqueTables : min), resultPlayerList[0].uniqueTables);
      console.log('test minUniqueTablesVisited', testValue);//this is 3
      console.log('old min', bestRun.minUniqueTablesVisited);
      console.log('new minUniqueTablesVisited', minUniqueTablesVisited);//this is 3
      console.log('new uniqueTableVisitsList', ...resultPlayerList.map(p => p.uniqueTables));//this list does not

    }
    // let uniqueTableVisitsList = resultPlayerList.map(
    //   function (player) {
    //     return player.uniqueTables;
    //   }
    // )
    // console.log('TIME TO CHECK EVERYTHING');
    // console.log('original uniqueTableVisitsList', uniqueTableVisitsList);
    //
    // let numUniqueTablesSet = new Set(uniqueTableVisitsList);
    //
    // let numUniqueTablesList = [...numUniqueTablesSet];
    // //TODO fix this. the problem is with the uniqueTableVisitsSet not with the min function
    //
    // minUniqueTablesVisited = Math.min(...numUniqueTablesList);
    //
    // if (minUniqueTablesVisited === 3) {
    //   console.log('unique table visits', uniqueTableVisitsList); //this has only 4s and 3s
    //   let otherUniqueTableVisitsList = resultPlayerList.map(
    //     function (player) {
    //       return player.uniqueTables;
    //     }
    //   )
    //   console.log('unique tables double check', otherUniqueTableVisitsList);
    //   console.log('second try of list')
    //   console.log('num unique tables set', numUniqueTablesSet);
    //   console.log('calculating min of', numUniqueTablesList);
    //   console.log('calculated min', minUniqueTablesVisited)
    //   console.log(resultPlayerList); //this has a 2 in it
    // }

    // max times anyone played with anyone else
    // calculated by finding the max playedWith count for each player then taking the max of those values
    maxPlayedWithCount = Math.max(...resultPlayerList.map(
      (player) => Math.max(...player.playedWith)
    ));
    // average times someone played with someone else
    // calculated by finding the average playedWith count for each player then taking the average of those values
    // TODO this isn't a helpful number - make this average maxPlayedWithCount, or average after removing 0s
    averagePlayedWithCount = average(resultPlayerList.map(
      (player) => average(player.playedWith))
    );



    // Replace result if better
    if (options.changeTables) {
      // debugger;
      if (maxPlayedWithCount <= bestRun.maxPlayedWithCount
        && averagePlayedWithCount <= bestRun.averagePlayedWithCount
        && minUniqueTablesVisited > bestRun.minUniqueTablesVisited) {

        // let doubleCheck = Math.min(...[...new Set(bestRun.playerList.map(
        //   function (player) {
        //     return player.uniqueTables;
        //   }
        // ))]);
        // if (minUniqueTablesVisited > 2) {
        //
        //   console.log('min unique and double check', minUniqueTablesVisited, doubleCheck)
        //   console.log([...new Set(resultPlayerList.map(
        //     function (player) {
        //       return player.uniqueTables;
        //     }
        //   ))]);
        //   resultPlayerList.sort((a,b) => a.id-b.id).forEach((player) => console.log(player.id+1, player.uniqueTables, player.assignedTables))
        // }
        // if (minUniqueTablesVisited === doubleCheck) {
          console.log('replacing', bestRun)
          bestRun = {
            playerList: [...resultPlayerList],
            maxPlayedWithCount: maxPlayedWithCount,
            averagePlayedWithCount: averagePlayedWithCount,
            minUniqueTablesVisited: minUniqueTablesVisited
          }
          console.log('new', bestRun)
          console.log('CHECK');
          let uniqueTableVisitsList = resultPlayerList.map(
            function (player) {
              if(player.uniqueTables === 2) {
                console.log(`PLAYER ${player.id} - 2 UNIQUE TABLES`);
              }
              return player.uniqueTables;//This also sometimes returns 3 instead of 2, not hitting the if
            }
          )
          // TODO fix: There are players where player.uniqueTables is 2 but uniqueTableVisitsList doesn't contain any 2s
          console.log('original uniqueTableVisitsList', uniqueTableVisitsList);
          let numUniqueTablesSet = new Set(uniqueTableVisitsList);
          console.log('set', numUniqueTablesSet);
        // }

      }
    } else if (maxPlayedWithCount <= bestRun.maxPlayedWithCount && averagePlayedWithCount <= bestRun.averagePlayedWithCount) {
      bestRun = {
        playerList: resultPlayerList,
        maxPlayedWithCount: maxPlayedWithCount,
        averagePlayedWithCount: averagePlayedWithCount,
        minUniqueTablesVisited: minUniqueTablesVisited
      }
    }
  }
  if (bestRun.minUniqueTablesVisited > 1) {
    console.log('BEST RUN');
    let doubleCheck = Math.min(...[...new Set(bestRun.playerList.map(
      (player) => player.uniqueTables
    ))]);
    console.log('min unique and double check for best run', bestRun.minUniqueTablesVisited, doubleCheck)//TODO figure out why these are different when the above doubleCheck isn't
    console.log([...new Set(bestRun.playerList.map(
      (player) => player.uniqueTables
    ))]);
    bestRun.playerList.sort((a,b) => a.id-b.id).forEach((player) => console.log(player.id+1, player.uniqueTables, player.assignedTables))
  }
  return bestRun;
}

function average(list) {
  return list.reduce((a,b) => b+=a) / list.length;
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
  return [...playerList];
}

function joinRandomTable() {
  playerList.forEach(function(player) {
    //Chose the first table that's not full
    const tableChoice = tableList.find(table => !table.isFull);
    // Add table to player's list and increment unique count
    if (!(player.assignedTables.includes(tableChoice.id))) {
      player.uniqueTables++;
      // if(player.uniqueTables > 2) {
        // console.log('UNIQUE', player.uniqueTables, player);
        // debugger;
        //ALl of these seemed fine for 2 runs - I don't think this is the problem. it's either something to do with the sets or maybe data carrying between runs?
      // }
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
