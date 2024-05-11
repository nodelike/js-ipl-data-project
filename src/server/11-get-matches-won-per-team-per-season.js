const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();

function getMatchesWonPerTeamPerSeason(matches){
  try {
    let wins = matches.reduce( (accumulator, match) => {
        if(accumulator[match.season] == undefined){
            accumulator[match.season] = {};
        }

        if(accumulator[match.season][match.winner] == undefined){
            accumulator[match.season][match.winner] = 1;
        } else {
            accumulator[match.season][match.winner] += 1
        }

        return accumulator;
    }, {});

    return wins;
  } catch (error) {
    console.log(`Error counting number of wins per year for each team. ${error}`);
  }
}

let result = getMatchesWonPerTeamPerSeason(matches);
saveDataToJSON(result, "matchesWonPerTeamPerSeason.json");