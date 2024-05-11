const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();

function getMatchesWonPerTeamPerSeason(matches){
  try {
    let wins = {}
    for(let match of matches){
        if(wins[match.season] == undefined){
            wins[match.season] = {}
        }

        if(wins[match.season][match.winner] == undefined){
            wins[match.season][match.winner] = 1
        } else {
            wins[match.season][match.winner] += 1 
        }
    }
    
    return wins;
  } catch (error) {
    console.log(`Error counting number of wins per season for each team. ${error}`);
  }
}

let result = getMatchesWonPerTeamPerSeason(matches);
saveDataToJSON(result, "matchesWonPerTeamPerSeason.json");