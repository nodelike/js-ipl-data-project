const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let deliveries = getData().deliveries();

function getBestEconomicalRateInSuperOverBowler(deliveries){
  try {
    let bowlerStats = deliveries.reduce((acc, delivery) => {
      if(delivery.is_super_over == '1'){
        if (delivery.bowler in acc) {
          acc[delivery.bowler].runs += parseInt(delivery.total_runs);
          acc[delivery.bowler].balls++;
        } else {
            acc[delivery.bowler] = {
                runs: parseInt(delivery.total_runs),
                balls: 1
            };
        }
      }

      return acc;
    }, {})

    let bestEconomyRatePlayer = Object.entries(bowlerStats).map(([bowler, bowlerStat]) => {
      let overs = bowlerStat.balls / 6;
      let economyRate = bowlerStat.runs / overs;

      return [bowler, economyRate];
    }, {}).sort((a, b) => a[1] - b[1])
          .slice(0, 1)
          .reduce((acc, [bowler, economyRate]) => {
            acc[bowler] = economyRate;

            return acc;
          }, {});

    return bestEconomyRatePlayer;
  } catch (error) {
    console.log(`Error getting best economical rate bowler in super over. ${error}`);
  }
}

let result = getBestEconomicalRateInSuperOverBowler(deliveries);
saveDataToJSON(result, "bestEconomicalRateInSuperOverBowler.json");