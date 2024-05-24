const { getMatchesData, getDeliveresData } = require("./../data/data.js");
const saveDataToJSON = require("./saveDataToJSON.js");

function calculateExtraRunsPerTeam(matches, deliveries){
  try {
    // let extraRunsPerTeam = {};
    let matchIDs2016 = matches.filter( match => {
      return match.season == '2016';
    }).map( match => {
      return match.id;
    });

    let extraRunsPerTeam = deliveries.filter( delivery => {
      return matchIDs2016.includes(delivery.match_id);
    }).reduce( (acc, delivery) => {

      if (delivery.bowling_team in acc) {
        acc[delivery.bowling_team] += parseInt(delivery.extra_runs);
      } else {
        acc[delivery.bowling_team] = parseInt(delivery.extra_runs);
      }

      return acc;
    }, {});
    
    return extraRunsPerTeam;
  } catch (error) {
    console.log(`Error counting number of extra runs per team in year 2016. ${error}`);
  }
}
getMatchesData()
  .then(async (matches) => {
    let deliveries = await getDeliveresData();
    let result = calculateExtraRunsPerTeam(matches, deliveries);
    saveDataToJSON(result, "extraRunsPerTeam2016.json");
  })