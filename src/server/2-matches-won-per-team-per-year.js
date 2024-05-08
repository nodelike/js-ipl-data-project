const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();

function getMatchesWonPerTeamPerYear(matches){
  try {
    let wins = {}
    for(let match of matches){
      if(wins[match.winner] === undefined){
          wins[match.winner] = 1;
      } else {
          wins[match.winner] += 1;
      }
    }
    return wins;
  } catch (error) {
    console.log(`Error counting number of wins per year for each team. ${error}`);
  }
}

let result = getMatchesWonPerTeamPerYear(matches);

saveDataToJSON(result, "matchesWonPerTeamPerYear.json");