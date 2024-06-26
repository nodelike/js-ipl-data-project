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

function calculateBowlersEconomyRate(matches, deliveries){
  try {
    let bowlerStats = {};
    let matchIDs2015 = [];

    for(let match of matches){
      if(match.season == '2015'){
          matchIDs2015.push(match.id);
      }
    }
    for(let delivery of deliveries){
      if (matchIDs2015.includes(delivery.match_id)) {
        let isLegalBall = delivery.noball_runs == '0' && delivery.wide_runs =='0';
        if (delivery.bowler in bowlerStats) {
            if(isLegalBall){
              bowlerStats[delivery.bowler].runs += parseInt(delivery.total_runs);
              bowlerStats[delivery.bowler].balls++;
            } else {
              bowlerStats[delivery.bowler].runs += (parseInt(delivery.total_runs) + 1);
            }
        } else {
            bowlerStats[delivery.bowler] = {
                runs: parseInt(delivery.total_runs) + !isLegalBall,
                balls: isLegalBall
            };
        }
      }
    }

    let economyRates = {}
    for(let bowler in bowlerStats){
        let overs = bowlerStats[bowler].balls / 6;
        let economyRate = bowlerStats[bowler].runs / overs;

        economyRates[bowler] = economyRate;
    }
    let sortedEconomyRates = bubbleSortObject(economyRates);

    let result = {};
    let tempCount = 0;
    for(let key in sortedEconomyRates){
      if(tempCount >= 10){
        break;
      } else {
        result[key] = sortedEconomyRates[key];
        tempCount++;
      }
    }

    return result;
  } catch (error) {
    console.log(`Error counting number of extra runs per team in year 2016. ${error}`);
  }
}

let result = calculateBowlersEconomyRate(matches, deliveries);
saveDataToJSON(result, "top10EconomicalPlayers2015.json");