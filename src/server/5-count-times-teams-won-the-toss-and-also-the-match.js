const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();

function countTimesTeamsWonTheTossAndTheMatch(matches){
  try {
    let counts = matches.filter( match => {
      return match.toss_winner == match.winner;
    }).reduce( (result, match) => {
      if(match.winner in result){
        result[match.winner]++
      } else {
        result[match.winner] = 1
      }

      return result;
    }, {});
    
    return counts;
  } catch (error) {
    console.log(`Error counting times the team won the toss and the match at the same time. ${error}`);
  }
}

let result = countTimesTeamsWonTheTossAndTheMatch(matches);

saveDataToJSON(result, "timesTeamsWonTheTossAndTheMatch.json");