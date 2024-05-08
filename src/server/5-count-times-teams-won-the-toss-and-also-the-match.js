const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();

function countTimesTeamsWonTheTossAndTheMatch(matches){
  try {
    let counts = {}
    for(let match of matches){
        if(match.toss_winner == match.winner){
            if(counts[match.winner] == undefined){
                counts[match.winner] = 1;
            } else {
                counts[match.winner]++;
            }
        }
    }
    console.log(counts);
    return counts;
  } catch (error) {
    console.log(`Error counting number of wins per year for each team. ${error}`);
  }
}

let result = countTimesTeamsWonTheTossAndTheMatch(matches);

saveDataToJSON(result, "timesTeamsWonTheTossAndTheMatch.json");