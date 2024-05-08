const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();
let deliveries = getData().deliveries();

function calculateExtraRunsPerTeam(matches, deliveries){
  try {
    let extraRunsPerTeam = {};
    let matchIDs2016 = {};

    for(let match of matches){
      if(match.season == '2016'){
          matchIDs2016[match.id] = true;
      }
    }

    for(let delivery of deliveries){
      if (delivery.match_id in matchIDs2016) {
        if (delivery.bowling_team in extraRunsPerTeam) {
          extraRunsPerTeam[delivery.bowling_team] += parseInt(delivery.extra_runs);
        } else {
          extraRunsPerTeam[delivery.bowling_team] = parseInt(delivery.extra_runs);
        }
      }
    }
    return extraRunsPerTeam;
  } catch (error) {
    console.log(`Error counting number of extra runs per team in year 2016. ${error}`);
  }
}

let result = calculateExtraRunsPerTeam(matches, deliveries);
saveDataToJSON(result, "extraRunsPerTeam2016.json");