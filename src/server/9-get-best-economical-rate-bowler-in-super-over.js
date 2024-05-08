const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();
let deliveries = getData().deliveries();

function bubbleSortObject(object) {
    const keys = Object.keys(object);
    const length = keys.length;
  
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (object[keys[j]] > object[keys[j + 1]]) {
          // Swap the keys
          const temp = keys[j];
          keys[j] = keys[j + 1];
          keys[j + 1] = temp;
        }
      }
    }
  
    const sortedObject = {};
    for(let key of keys){
      sortedObject[key] = object[key];
    }
  
    return sortedObject;
}

function getBestEconomicalRateInSuperOverBowler(eliveries){
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