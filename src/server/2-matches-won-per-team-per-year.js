const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();

function getMatchesWonPerTeamPerYear(matches){
  try {
    let wins = {}

    matches.forEach( match => {
      if(wins[match.season] === undefined){
        wins[match.season] = {};
      }

      if(wins[match.season][match.winner] === undefined){
        wins[match.season][match.winner] = 1;
      } else {
        wins[match.season][match.winner] += 1;
      }
    });

    return wins;
  } catch (error) {
    console.log(`Error counting number of wins per year for each team. ${error}`);
  }
}

let result = getMatchesWonPerTeamPerYear(matches);

saveDataToJSON(result, "matchesWonPerTeamPerYear.json");