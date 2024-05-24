const { getMatchesData } = require("./../data/data.js");
const saveDataToJSON = require("./saveDataToJSON.js");

function getHighestPlayerOfMatchForEachSeason(matches){
  try {
    let playerOfMatchCounts = {};
    matches.forEach( match => {
      if(playerOfMatchCounts[match.season] == undefined){
        playerOfMatchCounts[match.season] = {};
      }
      
      if(playerOfMatchCounts[match.season][match.player_of_match] == undefined){
          playerOfMatchCounts[match.season][match.player_of_match] = 1;
      } else {
          playerOfMatchCounts[match.season][match.player_of_match] += 1;
      }
    });
    
    let highestPlayerOfMatchPerSeason = {};
    Object.entries(playerOfMatchCounts).forEach( ([season, playerCounts]) => {
      let highestPlayerOfMatch = '';
      let highestPlayerOfMatchCount = 0;

      Object.entries(playerCounts).forEach( ([player, count]) => {
        if (count > highestPlayerOfMatchCount) {
          highestPlayerOfMatch = player;
          highestPlayerOfMatchCount = count;
        }
      });

      highestPlayerOfMatchPerSeason[season] = highestPlayerOfMatch;
    });
    
    // console.log(highestPlayerOfMatchPerSeason);
    return highestPlayerOfMatchPerSeason;
  } catch (error) {
    console.log(`Error getting the player with highest player of match per season. ${error}`);
  }
}

getMatchesData()
  .then((matches) => {
    let result = getHighestPlayerOfMatchForEachSeason(matches);
    saveDataToJSON(result, "highestPlayerOfMatchForEachSeason.json");
  })

