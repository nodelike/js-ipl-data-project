const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();

function getHighestPlayerOfMatchForEachSeason(matches){
  try {
    let playerOfMatchCounts = {}
    for(let match of matches){
        if(playerOfMatchCounts[match.season] == undefined){
            playerOfMatchCounts[match.season] = {};
        } else {
            if(playerOfMatchCounts[match.season][match.player_of_match] == undefined){
                playerOfMatchCounts[match.season][match.player_of_match] = 1;
            } else {
                playerOfMatchCounts[match.season][match.player_of_match] += 1;
            }
        }
    }
    
    let highestPlayerOfMatchPerSeason = {}
    for (let season in playerOfMatchCounts) {
        let highestPlayerOfMatch = '';
        let highestPlayerOfMatchCount = 0;
  
        for (let player in playerOfMatchCounts[season]) {
          if (playerOfMatchCounts[season][player] > highestPlayerOfMatchCount) {
            highestPlayerOfMatch = player;
            highestPlayerOfMatchCount = playerOfMatchCounts[season][player];
          }
        }
  
        highestPlayerOfMatchPerSeason[season] = highestPlayerOfMatch;
      }
    
    // console.log(highestPlayerOfMatchPerSeason);
    return highestPlayerOfMatchPerSeason;
  } catch (error) {
    console.log(`Error counting number of wins per year for each team. ${error}`);
  }
}

let result = getHighestPlayerOfMatchForEachSeason(matches);
saveDataToJSON(result, "highestPlayerOfMatchForEachSeason.json");
