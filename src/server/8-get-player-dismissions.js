const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let deliveries = getData().deliveries();

function getHighestPlayerDismissions(deliveries){
  try {
    let playerDismissalCount= {};
    
    for(let delivery of deliveries){
        if(delivery.player_dismissed && delivery.bowler && delivery.dismissal_kind){
            const dismissalKey = `${delivery.bowler}-${delivery.player_dismissed}`

            if(dismissalKey in playerDismissalCount){
                playerDismissalCount[dismissalKey]++;
            } else {
                playerDismissalCount[dismissalKey] = 1;
            }
        }
    }

    let highestPlayerDismissalCount = 0;
    let highestPlayerDismissalPairs =''
    for(let dismissalPairs in playerDismissalCount){
        if(playerDismissalCount[dismissalPairs] > highestPlayerDismissalCount){
            highestPlayerDismissalCount = playerDismissalCount[dismissalPairs];
            highestPlayerDismissalPairs = dismissalPairs;
        }
    }

    const result = {
        bowler: highestPlayerDismissalPairs.split("-")[0],
        playerDismissed: highestPlayerDismissalPairs.split("-")[1],
        dismissalTimes: highestPlayerDismissalCount
    };
    return result;
  } catch (error) {
    console.log(`Error getting highest player dismissal pair and count. ${error}`);
  }
}

let result = getHighestPlayerDismissions(deliveries);
console.log(result);
saveDataToJSON(result, "highestPlayerDismissed.json");