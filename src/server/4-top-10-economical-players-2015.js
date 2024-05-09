const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();
let deliveries = getData().deliveries();

function calculateBowlersEconomyRate(matches, deliveries){
  try {
    
    let matchIDs2015 = matches.filter( match => {
      return match.season == "2015";
    }).map( match => {
      return match.id;
    });

    let bowlerStats = deliveries.filter( delivery => {
      return matchIDs2015.includes(delivery.match_id)
    }).reduce( (stats, delivery) => {

      if (delivery.bowler in stats) {
        stats[delivery.bowler].runs += parseInt(delivery.total_runs);
        stats[delivery.bowler].balls++;
      } else {
        stats[delivery.bowler] = {
              runs: parseInt(delivery.total_runs),
              balls: 1
          };
      }

      return stats;
    }, {});

    let economyRates = Object.entries(bowlerStats).map( ([bowler, stats]) => {
      let overs = stats.balls / 6
      let economyRate = stats.runs / overs;
      
      return [bowler, economyRate];
    }).sort((a, b) => {
      return a[1] - b[1];
    }).slice(0, 10).reduce( (result, [bowler, economyRate]) => {
      result[bowler] = economyRate;
      return result;
    }, {});
    
    return economyRates;
  } catch (error) {
    console.log(`Error getting top 10 economical players in 2015. ${error}`);
  }
}

let result = calculateBowlersEconomyRate(matches, deliveries);
saveDataToJSON(result, "top10EconomicalPlayers2015.json");